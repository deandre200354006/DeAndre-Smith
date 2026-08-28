import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __dir = path.dirname(fileURLToPath(import.meta.url));

const W = ['400','500','600','700','800','900'];
const faces = W.map(w => {
  const b64 = fs.readFileSync(path.join(__dir, 'fonts', `archivo-${w}.ttf`)).toString('base64');
  return `@font-face{font-family:Archivo;font-weight:${w};font-style:normal;src:url(data:font/ttf;base64,${b64}) format('truetype');}`;
}).join('\n');

export function shell(body, { size = 1080, css = '' } = {}) {
  return `<!doctype html><html><head><meta charset="utf-8"><style>
${faces}
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${size}px;height:${size}px;overflow:hidden}
body{font-family:Archivo,sans-serif;-webkit-font-smoothing:antialiased;text-rendering:geometricPrecision}
.stage{position:relative;width:${size}px;height:${size}px;overflow:hidden}
svg{display:block}
${css}
</style></head><body><div class="stage">${body}</div>
<script>
(function(){
  document.querySelectorAll('.fit').forEach(function(el){
    var max = parseFloat(el.dataset.max), min = parseFloat(el.dataset.min || 24);
    var box = el.parentElement;
    var avail = box.clientWidth || el.clientWidth;
    var size = max;
    el.style.fontSize = size + 'px';
    // widest authored line must fit the container
    for (var i = 0; i < 200 && size > min; i++) {
      var over = false;
      el.querySelectorAll('span').forEach(function(sp){ if (sp.scrollWidth > avail + 0.5) over = true; });
      if (!over) break;
      size -= 1;
      el.style.fontSize = size + 'px';
    }
  });
})();
</script>
</body></html>`;
}
