import fs from 'node:fs'; import path from 'node:path'; import { chromium } from 'playwright';
const files = process.argv.slice(2);
const cells = files.map(f=>{const b64=fs.readFileSync(path.join('out',f)).toString('base64');
 return `<div style="width:520px"><img src="data:image/png;base64,${b64}" style="width:520px;height:520px;display:block;border:1px solid #999"><div style="font:600 15px monospace;padding:5px 0">${f}</div></div>`;}).join('');
const html=`<html><body style="margin:0;background:#fff;display:flex;flex-wrap:wrap;gap:14px;padding:14px;width:1120px">${cells}</body></html>`;
const b=await chromium.launch();const p=await b.newPage({viewport:{width:1120,height:600}});
await p.setContent(html,{waitUntil:'load'});
await p.screenshot({path:'/tmp/claude-0/-home-user-DeAndre-Smith/f65e40de-8f9b-59aa-acf7-db300e182a48/scratchpad/spot.png',fullPage:true});
await b.close();console.log('spot');
