import { C } from './tokens.js';

/* Brand lockup: wordmark with an arch that echoes the chest rail. */
export function logo({ color = C.ink, size = 30, mark = true } = {}) {
  const h = size * 0.62;
  return `<div style="display:flex;align-items:center;gap:${size*0.34}px">
    ${mark ? `<svg width="${size*1.5}" height="${h}" viewBox="0 0 60 26" style="display:block">
      <path d="M6 24 L6 15 C6 7 14 3 30 3 C46 3 54 7 54 15 L54 24"
            fill="none" stroke="${color}" stroke-width="7" stroke-linecap="round"/>
    </svg>` : ''}
    <span style="font-weight:900;font-size:${size}px;letter-spacing:.10em;color:${color};line-height:1">UPSY</span>
  </div>`;
}

/* Small uppercase eyebrow / kicker. */
export function eyebrow(text, { color = C.terra, size = 24 } = {}) {
  return `<div style="font-weight:800;font-size:${size}px;letter-spacing:.17em;text-transform:uppercase;color:${color};line-height:1">${text}</div>`;
}

/* Locked headline. `lines` is an array — one entry per rendered line. */
export function headline(lines, { size = 92, color = C.ink, lh = 0.94, track = '-0.03em', align = 'left', weight = 900, min = 30 } = {}) {
  const spans = lines.map(l => `<span style="display:block;white-space:nowrap">${l}</span>`).join('');
  return `<h1 class="fit" data-max="${size}" data-min="${min}" style="font-weight:${weight};font-size:${size}px;line-height:${lh};letter-spacing:${track};color:${color};text-align:${align}">${spans}</h1>`;
}

/* ---- OFFER ------------------------------------------------
   Bundle offer, exactly as supplied. No invented claims.      */
export const OFFER = {
  price:   '$89.99',
  base:    '$69.99 + $7 shipping',
  items:   ['Upsy frame', 'Parent stool', 'Baby sponge', '$15 store credit', 'Free shipping'],
  short:   ['Parent stool', 'Baby sponge', '$15 credit', 'Free shipping'],
};

/* Full-width bottom offer bar. */
export function offerBar({ bg = C.ink, fg = C.cream, accent = C.terraLt } = {}) {
  return `<div style="position:absolute;left:0;right:0;bottom:0;background:${bg};padding:26px 76px 28px;display:flex;align-items:center;gap:26px">
    <div style="font-weight:900;font-size:52px;letter-spacing:-.02em;color:${fg};line-height:1;white-space:nowrap">${OFFER.price}</div>
    <div style="width:2px;height:46px;background:${fg};opacity:.28"></div>
    <div style="font-weight:600;font-size:23px;line-height:1.32;color:${fg};opacity:.94">
      Bundle: ${OFFER.items.join(' &middot; ')}
    </div>
  </div>`;
}

/* Compact corner offer tag. */
export function offerTag({ bg = C.terra, fg = '#FFFFFF', right = 76, bottom = 76 } = {}) {
  return `<div style="position:absolute;right:${right}px;bottom:${bottom}px;background:${bg};color:${fg};border-radius:22px;padding:20px 26px 22px;max-width:330px">
    <div style="font-weight:800;font-size:19px;letter-spacing:.14em;text-transform:uppercase;opacity:.88;line-height:1">Bundle</div>
    <div style="font-weight:900;font-size:58px;letter-spacing:-.03em;line-height:1.02;margin:4px 0 6px">${OFFER.price}</div>
    <div style="font-weight:600;font-size:20px;line-height:1.3;opacity:.95">${OFFER.short.join(' &middot; ')}</div>
  </div>`;
}

/* Thin single-line offer note (for busier layouts). */
export function offerLine({ color = C.inkSoft } = {}) {
  return `<div style="font-weight:700;font-size:22px;letter-spacing:.01em;color:${color};line-height:1.35">
    <span style="color:${C.terra};font-weight:900">${OFFER.price}</span> bundle &middot; ${OFFER.short.join(' &middot; ')}
  </div>`;
}

/* Structural panel label (BEFORE / AFTER etc.) */
export function panelLabel(text, { color = C.inkMute, size = 21 } = {}) {
  return `<div style="font-weight:800;font-size:${size}px;letter-spacing:.20em;text-transform:uppercase;color:${color};line-height:1">${text}</div>`;
}
