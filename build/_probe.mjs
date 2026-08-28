import fs from 'node:fs'; import { chromium } from 'playwright';
const src='data:image/png;base64,'+fs.readFileSync(process.argv[2]).toString('base64');
const b=await chromium.launch(); const p=await b.newPage();
const r=await p.evaluate(async src=>{
  const img=new Image(); img.src=src; await img.decode();
  const c=document.createElement('canvas'); c.width=img.width;c.height=img.height;
  const x=c.getContext('2d'); x.drawImage(img,0,0);
  const d=x.getImageData(0,0,c.width,c.height).data;
  const L=(i,j)=>{const k=(j*c.width+i)*4;return Math.round(0.299*d[k]+0.587*d[k+1]+0.114*d[k+2]);};
  const probe={};
  // suspected shadow band, upper-right of the left mat
  for (const [nm,i,j] of [['shadowA',300,500],['shadowB',380,520],['shadowC',450,540],['shadowD',300,540],
                          ['matTop',250,600],['matMid',200,660],['postWhite',150,300],['cradleWhite',120,60],
                          ['cradleGrey',180,45],['bgFar',700,600],['babyDiaper',700,430],['babyFoam',690,300]])
    probe[nm]=[i,j,L(i,j)];
  return probe;
}, src);
await b.close();
for(const [k,v] of Object.entries(r)) console.log(k.padEnd(12), 'x='+String(v[0]).padStart(3), 'y='+String(v[1]).padStart(3), 'lum='+v[2]);
