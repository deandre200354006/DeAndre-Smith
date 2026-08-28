import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

export async function shoot(pages, outDir, size = 1080) {
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch({ args: ['--font-render-hinting=none'] });
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  const done = [];
  for (const { file, html } of pages) {
    await page.setContent(html, { waitUntil: 'load' });
    await page.evaluate(() => document.fonts.ready);
    const out = path.join(outDir, file);
    await page.screenshot({ path: out });
    done.push(out);
    process.stdout.write('.');
  }
  await browser.close();
  console.log('\nrendered ' + done.length);
  return done;
}
