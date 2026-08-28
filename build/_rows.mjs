import fs from 'node:fs'; import { chromium } from 'playwright';
const src = 'data:image/png;base64,' + fs.readFileSync(process.argv[2]).toString('base64');
const b = await chromium.launch(); const p = await b.newPage();
const out = await p.evaluate(async (src) => {
  const img = new Image(); img.src = src; await img.decode();
  const c = document.createElement('canvas'); c.width = img.width; c.height = img.height;
  const x = c.getContext('2d'); x.drawImage(img, 0, 0);
  const d = x.getImageData(0, 0, c.width, c.height).data;
  const ink = (i, j) => { const k = (j * c.width + i) * 4;
    return (0.299*d[k] + 0.587*d[k+1] + 0.114*d[k+2]) < 244; };
  const rows = {};
  for (const j of [40,120,200,260,320,400,480,540,580,620,660,700,740,760]) {
    const runs = []; let start = -1;
    for (let i = 0; i < c.width; i++) {
      if (ink(i, j) && start < 0) start = i;
      else if (!ink(i, j) && start >= 0) { if (i - start > 3) runs.push([start, i]); start = -1; }
    }
    if (start >= 0) runs.push([start, c.width]);
    rows[j] = runs;
  }
  return rows;
}, src);
await b.close();
for (const [j, runs] of Object.entries(out)) console.log('y=' + String(j).padStart(3), runs.map(r=>r[0]+'-'+r[1]).join('  '));
