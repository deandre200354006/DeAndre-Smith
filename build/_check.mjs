import fs from 'node:fs'; import { chromium } from 'playwright';
const a = fs.readFileSync('build/assets/product.png').toString('base64');
const c = fs.readFileSync('build/assets/product-child.png').toString('base64');
const html = `<html><body style="margin:0;display:flex">
 <div style="background:#0E1A21;padding:20px"><img src="data:image/png;base64,${a}" style="height:420px"></div>
 <div style="background:#C4571A;padding:20px"><img src="data:image/png;base64,${a}" style="height:420px"></div>
 <div style="background:#0E1A21;padding:20px"><img src="data:image/png;base64,${c}" style="height:420px"></div>
 <div style="background:#F8F3EA;padding:20px"><img src="data:image/png;base64,${c}" style="height:420px"></div>
</body></html>`;
const b = await chromium.launch(); const p = await b.newPage({viewport:{width:1400,height:480}});
await p.setContent(html,{waitUntil:'load'});
await p.screenshot({path:'/tmp/claude-0/-home-user-DeAndre-Smith/f65e40de-8f9b-59aa-acf7-db300e182a48/scratchpad/cut.png',fullPage:true});
await b.close(); console.log('ok');
