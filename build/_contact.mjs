import fs from 'node:fs'; import path from 'node:path'; import { chromium } from 'playwright';
import { CONCEPTS, fileFor, HEADLINES } from './concepts.js';
const cells = CONCEPTS.map(c => {
  const f = fileFor(c);
  const b64 = fs.readFileSync(path.join('out', f)).toString('base64');
  return `<div style="width:340px">
    <img src="data:image/png;base64,${b64}" style="width:340px;height:340px;display:block;border:1px solid #d8d2c8">
    <div style="font:700 12px/1.3 monospace;padding:6px 0 2px;color:#0E1A21">${f}</div>
    <div style="font:500 11px/1.3 -apple-system,sans-serif;color:#6B7C86">#${c.h} &middot; ${c.construction}</div>
  </div>`;
}).join('');
const html = `<html><body style="margin:0;background:#F8F3EA;font-family:sans-serif;padding:34px;width:1180px">
  <div style="font:900 34px/1 sans-serif;letter-spacing:-.02em;color:#0E1A21;margin-bottom:6px">Upsy &middot; 30 statics</div>
  <div style="font:600 15px/1.4 sans-serif;color:#6B7C86;margin-bottom:26px">10 locked headlines &times; 3 constructions &middot; 1:1 &middot; 1080&times;1080</div>
  <div style="display:flex;flex-wrap:wrap;gap:22px">${cells}</div></body></html>`;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1180, height: 800 } });
await p.setContent(html, { waitUntil: 'load' });
await p.screenshot({ path: 'out/_contact-sheet.png', fullPage: true });
await b.close(); console.log('contact sheet ->', 'out/_contact-sheet.png');
