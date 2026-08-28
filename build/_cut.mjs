import fs from 'node:fs'; import { chromium } from 'playwright';
const src = 'data:image/png;base64,' + fs.readFileSync(process.argv[2]).toString('base64');
const b = await chromium.launch(); const p = await b.newPage();
const out = await p.evaluate(async (src) => {
  const img = new Image(); img.src = src; await img.decode();
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
  const x = c.getContext('2d'); x.drawImage(img, 0, 0);
  const d = x.getImageData(0, 0, c.width, c.height).data;
  const at = (i, j) => { const k = (j * c.width + i) * 4; return [d[k], d[k+1], d[k+2], d[k+3]]; };
  const lum = ([r,g,bb]) => 0.299*r + 0.587*g + 0.114*bb;
  // corner + edge samples
  const samples = { tl: at(2,2), tr: at(c.width-3,2), bl: at(2,c.height-3), br: at(c.width-3,c.height-3),
                    midTop: at(c.width>>1, 2), midBot: at(c.width>>1, c.height-3) };
  // luminance histogram in 16 buckets
  const hist = new Array(16).fill(0);
  for (let k = 0; k < d.length; k += 4) hist[Math.min(15, Math.floor(lum([d[k],d[k+1],d[k+2]]) / 16))]++;
  // column ink profile (non-background pixels per column) to find the gap between the two units
  const colInk = [];
  for (let i = 0; i < c.width; i++) { let n = 0;
    for (let j = 0; j < c.height; j++) if (lum(at(i,j)) < 238) n++;
    colInk.push(n); }
  return { w: c.width, h: c.height, samples, hist, colInk };
}, src);
await b.close();
console.log('size', out.w, 'x', out.h);
console.log('corner samples:', JSON.stringify(out.samples));
console.log('lum histogram (16 buckets):', out.hist.join(' '));
const ci = out.colInk;
let s = ''; for (let i = 0; i < ci.length; i += 12) s += (ci[i] > 300 ? '#' : ci[i] > 120 ? '+' : ci[i] > 20 ? '.' : ' ');
console.log('column ink profile (each char = 12px):');
console.log(s);
fs.writeFileSync('/tmp/colink.json', JSON.stringify(ci));
