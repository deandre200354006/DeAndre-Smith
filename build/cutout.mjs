/* Cut the supplied product photo into transparent-background assets.
   1. Flood-fill the white background inward from the border, with a
      conservative threshold so the product's own white plastic and the
      soap foam are not keyed out.
   2. Keep only the meaningful connected components inside each crop,
      so neither asset carries fragments of the other unit. */
import fs from 'node:fs'; import path from 'node:path'; import { chromium } from 'playwright';

const SRC = process.argv[2];
const T = Number(process.argv[3] || 250);
const OUTDIR = path.join('build', 'assets');
fs.mkdirSync(OUTDIR, { recursive: true });
const src = 'data:image/png;base64,' + fs.readFileSync(SRC).toString('base64');

const CROPS = [
  { name: 'product.png', x0: 0, x1: 543, y0: 0, y1: 771, keep: 'largest', T: 248, close: 2,
    // the neighbouring unit's mat overlaps this window between these rows
    exclude: [{ x0: 498, x1: 543, y0: 546, y1: 680 }] },
  { name: 'product-child.png', x0: 543, x1: 847, y0: 18, y1: 700, keep: 'major', T: 252, close: 2 },
];

const b = await chromium.launch();
const p = await b.newPage();
const res = await p.evaluate(async ({ src, CROPS, T }) => {
  const img = new Image(); img.src = src; await img.decode();
  const W = img.width, H = img.height;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const cx = c.getContext('2d'); cx.drawImage(img, 0, 0);
  const id = cx.getImageData(0, 0, W, H); const d = id.data;
  const lum = k => 0.299*d[k] + 0.587*d[k+1] + 0.114*d[k+2];

  const flood = (T) => {
    const bg = new Uint8Array(W * H); const stack = [];
    const push = (i, j) => { if (i<0||j<0||i>=W||j>=H) return;
      const n = j*W+i; if (bg[n]) return; if (lum(n*4) < T) return; bg[n]=1; stack.push(n); };
    for (let i = 0; i < W; i++) { push(i, 0); push(i, H-1); }
    for (let j = 0; j < H; j++) { push(0, j); push(W-1, j); }
    while (stack.length) { const n = stack.pop(); const i = n % W, j = (n - i) / W;
      push(i+1,j); push(i-1,j); push(i,j+1); push(i,j-1); }
    return bg;
  };

  /* Morphological closing on the object mask: dilate then erode.
     Seals the narrow channels the flood leaks through, restoring the
     product's white plastic and the soap foam without keeping the
     drop shadow. */
  const close = (mask, w, h, R) => {
    const dil = new Uint8Array(w*h), ero = new Uint8Array(w*h);
    for (let j=0;j<h;j++) for (let i=0;i<w;i++) { let v=0;
      for (let dj=-R;dj<=R && !v;dj++) for (let di=-R;di<=R;di++) {
        const ni=i+di, nj=j+dj; if(ni<0||nj<0||ni>=w||nj>=h) continue;
        if (mask[nj*w+ni]) { v=1; break; } }
      dil[j*w+i]=v; }
    for (let j=0;j<h;j++) for (let i=0;i<w;i++) { let v=1;
      for (let dj=-R;dj<=R && v;dj++) for (let di=-R;di<=R;di++) {
        const ni=i+di, nj=j+dj;
        if(ni<0||nj<0||ni>=w||nj>=h||!dil[nj*w+ni]) { v=0; break; } }
      ero[j*w+i]=v; }
    return ero;
  };

  // a pixel counts as background if the flood reached it, or it falls in an exclusion rect
  let bg = null, obj = null;
  const isBg = (cr, si, sj) => !obj[sj * (cr.x1 - cr.x0) + si];

  const out = [];
  for (const cr of CROPS) {
    const cw = cr.x1 - cr.x0, ch = cr.y1 - cr.y0;
    bg = flood(cr.T ?? T);
    obj = new Uint8Array(cw * ch);
    for (let sj = 0; sj < ch; sj++) for (let si = 0; si < cw; si++) {
      const gx = si + cr.x0, gy = sj + cr.y0;
      let ex = false;
      if (cr.exclude) for (const e of cr.exclude)
        if (gx >= e.x0 && gx < e.x1 && gy >= e.y0 && gy < e.y1) ex = true;
      obj[sj*cw + si] = (!ex && !bg[gy*W + gx]) ? 1 : 0;
    }
    if (cr.close) obj = close(obj, cw, ch, cr.close);
    // label connected components of NON-background pixels inside the window
    const lab = new Int32Array(cw * ch).fill(-1);
    const areas = [];
    for (let s = 0; s < cw * ch; s++) {
      if (lab[s] !== -1) continue;
      const si = s % cw, sj = (s - si) / cw;
      if (isBg(cr, si, sj)) { lab[s] = -2; continue; }
      const id2 = areas.length; let area = 0; const st = [s]; lab[s] = id2;
      while (st.length) { const q = st.pop(); area++;
        const qi = q % cw, qj = (q - qi) / cw;
        for (const [di, dj] of [[1,0],[-1,0],[0,1],[0,-1]]) {
          const ni = qi + di, nj = qj + dj;
          if (ni<0||nj<0||ni>=cw||nj>=ch) continue;
          const nn = nj*cw + ni; if (lab[nn] !== -1) continue;
          if (isBg(cr, ni, nj)) { lab[nn] = -2; continue; }
          lab[nn] = id2; st.push(nn); } }
      areas.push(area);
    }
    const maxA = Math.max(...areas);
    const minKeep = cr.keep === 'largest' ? maxA : Math.max(600, maxA * 0.02);
    const keep = areas.map(a => a >= minKeep);

    const o = document.createElement('canvas'); o.width = cw; o.height = ch;
    const ox = o.getContext('2d');
    const oid = ox.createImageData(cw, ch);
    for (let s = 0; s < cw * ch; s++) {
      const si = s % cw, sj = (s - si) / cw;
      const k = ((sj + cr.y0) * W + (si + cr.x0)) * 4;
      const on = lab[s] >= 0 && keep[lab[s]];
      oid.data[s*4]   = d[k]; oid.data[s*4+1] = d[k+1];
      oid.data[s*4+2] = d[k+2]; oid.data[s*4+3] = on ? 255 : 0;
    }
    ox.putImageData(oid, 0, 0);
    // tight bounding box
    let minX=1e9,minY=1e9,maxX=-1,maxY=-1;
    for (let s = 0; s < cw*ch; s++) if (oid.data[s*4+3]) {
      const si = s % cw, sj = (s - si) / cw;
      if(si<minX)minX=si; if(si>maxX)maxX=si; if(sj<minY)minY=sj; if(sj>maxY)maxY=sj; }
    const w = maxX-minX+1, h = maxY-minY+1;
    const t = document.createElement('canvas'); t.width = w; t.height = h;
    t.getContext('2d').drawImage(o, minX, minY, w, h, 0, 0, w, h);
    out.push({ name: cr.name, w, h, comps: areas.length, kept: keep.filter(Boolean).length, data: t.toDataURL('image/png') });
  }
  return out;
}, { src, CROPS, T });
await b.close();

for (const o of res) {
  fs.writeFileSync(path.join(OUTDIR, o.name), Buffer.from(o.data.split(',')[1], 'base64'));
  console.log(o.name.padEnd(20), o.w + 'x' + o.h, '| components', o.comps, '-> kept', o.kept);
}
