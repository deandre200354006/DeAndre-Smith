import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { shell } from './shell.js';
import { shoot } from './render.mjs';
import { LAYOUTS } from './layouts.js';
import { CONCEPTS, HEADLINES, fileFor } from './concepts.js';
import { setProductPhoto, setPhotoDims } from './art.js';

const __dir = path.dirname(fileURLToPath(import.meta.url));
const ROOT  = path.resolve(__dir, '..');
const OUT   = path.join(ROOT, 'out');
const ASSET = path.join(__dir, 'assets');

/* Optional: swap the vector stand-in for a real transparent-PNG cutout. */
const asDataUri = (f) => {
  const p = path.join(ASSET, f);
  if (!fs.existsSync(p)) return null;
  const ext = path.extname(p).slice(1).toLowerCase();
  const mime = ext === 'jpg' ? 'jpeg' : ext;
  return `data:image/${mime};base64,${fs.readFileSync(p).toString('base64')}`;
};
const pngSize = (f) => { const p = path.join(ASSET, f); if (!fs.existsSync(p)) return null;
  const b = fs.readFileSync(p); return { w: b.readUInt32BE(16), h: b.readUInt32BE(20) }; };
const photo = { product: asDataUri('product.png'), productChild: asDataUri('product-child.png') };
setPhotoDims({ product: pngSize('product.png'), productChild: pngSize('product-child.png') });
if (photo.product || photo.productChild) {
  setProductPhoto(photo);
  console.log('using real product photo:', Object.entries(photo).filter(([, v]) => v).map(([k]) => k).join(', '));
} else {
  console.log('using vector product stand-in (drop build/assets/product.png to override)');
}

/* Guard: every rendered headline must reconstruct the locked text exactly. */
const bad = CONCEPTS.filter(c => c.lines.join(' ').replace(/\s+/g, ' ').trim() !== HEADLINES[c.h]);
if (bad.length) { console.error('LOCKED HEADLINE MISMATCH:', bad.map(fileFor)); process.exit(1); }

const only = process.argv[2];
const list = only ? CONCEPTS.filter(c => fileFor(c).includes(only)) : CONCEPTS;

const pages = list.map(c => {
  const fn = LAYOUTS[c.layout];
  if (!fn) throw new Error(`no layout "${c.layout}" for ${fileFor(c)}`);
  return { file: fileFor(c), html: shell(fn(c)) };
});

console.log(`rendering ${pages.length} statics at 1080x1080 ...`);
await shoot(pages, OUT, 1080);
console.log('->', path.relative(ROOT, OUT));
