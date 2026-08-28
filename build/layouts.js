import * as A from './art.js';
import * as S from './scenes.js';
import { C } from './tokens.js';
import { logo, eyebrow, headline, offerBar, offerTag, offerLine, panelLabel, quoteBlock } from './chrome.js';

const P = 76;                                   // safe margin
const abs = (css, inner) => `<div style="position:absolute;${css}">${inner}</div>`;
const offerFor = (c) => c.offer === 'bar' ? offerBar()
                      : c.offer === 'tag' ? offerTag()
                      : '';

/* =====================================================================
   1. HERO — product in situ, environment carries the argument
   ===================================================================== */
export function hero(c) {
  const bottom = c.offer === 'bar' ? 128 : P;
  const floor  = c.offer === 'bar' ? 852 : 934;
  const bg = c.stall
    ? A.showerStall(1080, floor + 150, { glass: true })
    : `<rect width="1080" height="1080" fill="${C.cream}"/>`;
  return `
  ${S.svg(`
    ${bg}
    ${c.stall ? '' : S.floorLine(floor)}
    ${S.shadow(300, floor + 6, 190)}
    ${S.shadow(690, floor + 8, 120)}
    ${S.sceneParentChild({ x: 150, floor, k: c.k || 0.62, gap: c.gap || 330, wand: true, water: c.water !== false })}
  `)}
  ${abs(`left:${P}px;top:${P}px;right:${P}px`, `
    ${eyebrow(c.eyebrow)}
    <div style="height:22px"></div>
    ${headline(c.lines, { size: c.size || 90 })}
    ${c.offer === 'line' ? `<div style="height:22px"></div>${offerLine()}` : ''}
  `)}
  ${abs(`left:${P}px;bottom:${bottom}px`, logo({ color: C.ink, size: 27 }))}
  ${offerFor(c)}`;
}

/* =====================================================================
   2. BEFORE / AFTER — split composition, failed workaround vs Upsy
   ===================================================================== */
export function beforeAfter(c) {
  const splitY = c.splitY || 330;                // headline band height
  const floor  = c.offer === 'bar' ? 830 : 916;
  return `
  ${S.svg(`
    <rect width="1080" height="1080" fill="${C.cream}"/>
    <rect x="0" y="${splitY}" width="540" height="${1080 - splitY}" fill="${C.creamDeep}"/>
    <rect x="540" y="${splitY}" width="540" height="${1080 - splitY}" fill="${C.tealLt}" opacity=".55"/>
    <line x1="540" y1="${splitY}" x2="540" y2="1080" stroke="${C.cream}" stroke-width="8"/>
    ${S.floorLine(floor, 40, 500, C.prodEdge)}
    ${S.floorLine(floor, 580, 1040, C.prodEdge)}
    ${S.shadow(270, floor + 6, 150, 24, .10)}
    ${S.shadow(760, floor + 6, 150, 24, .10)}
    ${c.beforeArt === 'bin'
      ? S.childInBin({ x: 150, floor, k: 0.66, kneel: true })
      : S.childInTub({ x: 96, floor, k: 0.60 })}
    ${S.sceneParentChild({ x: 596, floor, k: 0.56, gap: 268, wand: true })}
  `)}
  ${abs(`left:${P}px;top:${P}px;right:${P}px`, `
    ${eyebrow(c.eyebrow)}
    <div style="height:18px"></div>
    ${headline(c.lines, { size: c.size || 78 })}
  `)}
  ${abs(`left:${P}px;top:${splitY + 24}px;width:400px`, panelLabel(c.labelA || 'Before'))}
  ${abs(`left:616px;top:${splitY + 24}px;width:400px`, panelLabel(c.labelB || 'With Upsy', { color: C.teal }))}
  ${abs(`right:${P}px;bottom:${c.offer === 'bar' ? 128 : P}px`, logo({ color: C.ink, size: 25 }))}
  ${offerFor(c)}`;
}

/* =====================================================================
   3. US vs THEM — Upsy against the generic category norm
   ===================================================================== */
export function usVsThem(c) {
  const floor = c.offer === 'bar' ? 812 : 900;
  return `
  ${S.svg(`
    <rect width="1080" height="1080" fill="${C.cream}"/>
    <circle cx="286" cy="${floor - 150}" r="212" fill="${C.creamDeep}"/>
    <circle cx="778" cy="${floor - 190}" r="236" fill="${C.tealLt}" opacity=".6"/>
    ${S.floorLine(floor, 60, 1020)}
    ${S.shadow(286, floor + 6, 168, 26, .11)}
    ${S.shadow(790, floor + 6, 148, 24, .11)}
    <!-- generic, unbranded infant tub -->
    <g transform="translate(${286 - (420 * 0.62) / 2},${floor - S.ITUB_H * 0.62}) scale(0.62)">
      ${A.infantTub({ fill: C.prodLo })}
    </g>
    <g transform="translate(618,${floor - S.PROD_H * 0.44}) scale(0.44)">${A.upsyWithChild({ wand: true })}</g>
    ${S.shadow(910, floor + 5, 76, 13, .10)}
    <g transform="translate(830,${floor - S.ADULT_H * 0.50}) scale(0.50)">${A.adultUpright()}</g>
    <!-- divider -->
    <line x1="540" y1="${floor - 430}" x2="540" y2="${floor + 30}" stroke="${C.prodEdge}" stroke-width="3" stroke-dasharray="3 12" opacity=".7"/>
  `)}
  ${abs(`left:${P}px;top:${P}px;right:${P}px`, `
    ${eyebrow(c.eyebrow)}
    <div style="height:20px"></div>
    ${headline(c.lines, { size: c.size || 84 })}
  `)}
  ${abs(`left:${P}px;bottom:${c.offer === 'bar' ? 132 : P}px`, panelLabel(c.labelA || 'The tub that expired'))}
  ${abs(`left:620px;bottom:${c.offer === 'bar' ? 132 : P}px`, panelLabel(c.labelB || 'The stage it is for', { color: C.teal }))}
  ${abs(`right:${P}px;top:${P}px`, logo({ color: C.ink, size: 25 }))}
  ${offerFor(c)}`;
}

/* =====================================================================
   4. MECHANISM — numbered callouts on the product
   ===================================================================== */
export function mechanism(c) {
  const floor = 962;
  const k = c.k || 0.70;
  const px = 322, py = floor - S.PROD_H * k;
  const ak = 0.50;                                  // attending parent
  const map = (lx, ly) => [px + lx * k, py + ly * k];
  const cos = c.callouts || [];
  const colX = 742;                                 // single label column, right
  const rowY = c.rows || [392, 606, 820];
  const leaders = cos.map((co, i) => {
    const [x, y] = map(co.at[0], co.at[1]);
    return `
      <line x1="${x}" y1="${y}" x2="${colX - 18}" y2="${rowY[i]}" stroke="${C.terra}"
            stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round" opacity=".8"/>
      <circle cx="${x}" cy="${y}" r="19" fill="${C.terra}"/>
      <text x="${x}" y="${y + 8}" text-anchor="middle" font-size="22" font-weight="900" fill="#FFFFFF">${i + 1}</text>`;
  }).join('');
  const labels = cos.map((co, i) => `
    <div style="position:absolute;left:${colX}px;top:${rowY[i] - 30}px;width:${1080 - P - colX}px;
      font-weight:700;font-size:24px;line-height:1.26;color:${C.ink}">
      <span style="color:${C.terra}">${i + 1}.</span> ${co.label}</div>`).join('');
  return `
  ${S.svg(`
    <rect width="1080" height="1080" fill="${C.cream}"/>
    <circle cx="470" cy="646" r="316" fill="${C.tealLt}" opacity=".36"/>
    ${S.floorLine(floor, 76, 1004)}
    ${S.shadow(470, floor + 5, 172, 26, .10)}
    ${S.shadow(126, floor + 5, 74, 13, .10)}
    <!-- adult present, close and attending (brief §5) -->
    <g transform="translate(30,${floor - S.ADULT_H * ak}) scale(${ak})">${A.adultUpright()}</g>
    <g transform="translate(${px},${py}) scale(${k})">${A.upsyWithChild({ wand: true })}</g>
    ${leaders}
  `)}
  ${abs(`left:${P}px;top:${P}px;width:${1080 - P * 2}px`, `
    ${eyebrow(c.eyebrow)}
    <div style="height:18px"></div>
    ${headline(c.lines, { size: c.size || 68 })}
    ${c.support ? `<div style="height:18px"></div><p style="font-weight:600;font-size:24px;line-height:1.33;color:${C.inkSoft};max-width:620px">${c.support}</p>` : ''}
  `)}
  ${labels}
  ${abs(`right:${P}px;bottom:${P}px`, logo({ color: C.ink, size: 25 }))}
  ${offerFor(c)}`;
}

/* =====================================================================
   5. AVATAR CALL-OUT — name the reader's situation, then the product
   ===================================================================== */
export function avatarCallout(c) {
  const floor = c.offer === 'bar' ? 848 : 930;
  return `
  ${S.svg(`
    <rect width="1080" height="1080" fill="${C.cream}"/>
    <rect x="0" y="0" width="1080" height="336" fill="${C.ink}"/>
    ${c.stall ? `<g transform="translate(0,336)"><svg width="1080" height="${floor + 150 - 336}" viewBox="0 0 1080 ${floor + 150 - 336}">${A.showerStall(1080, floor + 150 - 336)}</svg></g>` : S.floorLine(floor)}
    ${S.shadow(330, floor + 6, 175, 26, .12)}
    ${S.sceneParentChild({ x: 190, floor, k: 0.58, gap: 320, wand: true })}
  `)}
  ${abs(`left:${P}px;top:${P - 12}px;right:${P}px`, `
    ${eyebrow(c.callOut ? 'If this is your bathroom' : c.eyebrow, { color: C.terraLt })}
    <div style="height:20px"></div>
    <p style="font-weight:800;font-size:46px;line-height:1.1;letter-spacing:-.02em;color:${C.cream}">${c.callOut}</p>
  `)}
  ${abs(`left:${P}px;top:${378}px;right:${P}px`, headline(c.lines, { size: c.size || 76 }))}
  ${abs(`right:${P}px;bottom:${c.offer === 'bar' ? 132 : P}px`, logo({ color: C.ink, size: 25 }))}
  ${offerFor(c)}`;
}

/* =====================================================================
   6. TYPOGRAPHIC — the headline is the image
   ===================================================================== */
export function typographic(c) {
  const bg = c.bg || C.ink;
  const fg = c.fg || C.cream;
  const ax = c.artX !== undefined ? c.artX : 660;
  const ak = c.artK || 0.54;
  const art = c.art === 'product'
    ? `<g transform="translate(${ax},${1080 - S.PROD_H * ak - (c.artBottom || 40)}) scale(${ak})">${A.upsyWithChild({ wand: true, ghost: c.ghost })}</g>`
    : c.art === 'frame'
      ? `<g transform="translate(${ax},${1080 - 540 * ak - (c.artBottom || 20)}) scale(${ak})" opacity=".92">${A.upsy({ wand: true, ghost: true })}</g>`
      : '';
  return `
  ${S.svg(`
    <rect width="1080" height="1080" fill="${bg}"/>
    ${c.blob !== false ? `<circle cx="880" cy="200" r="230" fill="${c.blobColor || C.terra}" opacity="${c.blobOpacity || .22}"/>` : ''}
    ${art}
  `)}
  ${abs(`left:${P}px;top:${c.top || P}px;right:${P}px`, `
    ${eyebrow(c.eyebrow, { color: c.eyeColor || C.terraLt })}
    <div style="height:${c.gapTop || 30}px"></div>
    ${headline(c.lines, { size: c.size || 132, color: fg, lh: 0.90 })}
  `)}
  ${abs(`left:${P}px;bottom:${P}px`, logo({ color: fg, size: 27 }))}
  ${c.offer === 'tag' ? offerTag({ bg: C.terra }) : offerFor(c)}`;
}

/* =====================================================================
   7. SPLIT DUO — two outcomes, one product (headline #7)
   ===================================================================== */
export function splitDuo(c) {
  return `
  ${S.svg(`
    <rect x="0" y="0" width="540" height="1080" fill="${C.tealLt}"/>
    <rect x="540" y="0" width="540" height="1080" fill="${C.cream}"/>
    ${A.droplets(540, 1080, 26, C.waterDeep, 12)}
    <!-- left: child + water -->
    ${S.shadow(268, 918, 176, 28, .13)}
    <g transform="translate(24,${912 - S.PROD_H * 0.74}) scale(0.74)">${A.upsyWithChild({ wand: true })}</g>
    ${A.spray(432, 512, 158, 220)}
    <!-- right: dry parent -->
    ${S.shadow(806, 922, 132, 22, .13)}
    <g transform="translate(636,${916 - S.ADULT_H * 0.86}) scale(0.86)">${A.adultUpright()}</g>
    <line x1="540" y1="0" x2="540" y2="1080" stroke="${C.paper}" stroke-width="6"/>
  `)}
  ${abs(`left:${P}px;top:${P}px;width:${540 - P - 30}px`,
    headline([c.lines[0]], { size: c.size || 96, color: C.teal }))}
  ${abs(`left:${540 + 34}px;top:${P}px;width:${540 - P - 34}px`,
    headline([c.lines[1]], { size: c.size || 96, color: C.ink }))}
  ${abs(`left:${P}px;bottom:${P}px`, logo({ color: C.teal, size: 26 }))}
  ${offerFor(c)}`;
}

/* =====================================================================
   8. POSTURE — bent vs upright, the clearest visual in the brief
   ===================================================================== */
export function posture(c) {
  const floor = c.offer === 'bar' ? 836 : 918;
  const k = 0.56;
  return `
  ${S.svg(`
    <rect width="1080" height="1080" fill="${C.cream}"/>
    <rect x="540" y="0" width="540" height="1080" fill="${C.tealLt}" opacity=".45"/>
    ${S.floorLine(floor, 40, 1040)}
    <!-- BEFORE: folded over the tub rim -->
    <g transform="translate(30,${floor - 506 * k}) scale(${k})">${A.adultKneelingSil({ fill: C.inkMute })}</g>
    <g transform="translate(272,${floor - S.TUB_H * 0.42}) scale(0.42)">${A.bathtub({ fill: C.prodMd, water: true })}</g>
    <!-- spine arc, before: traced along the folded torso -->
    <path d="M${30 + 282 * k} ${floor - 506 * k + 372 * k}
             C${30 + 268 * k} ${floor - 506 * k + 296 * k}
              ${30 + 300 * k} ${floor - 506 * k + 236 * k}
              ${30 + 366 * k} ${floor - 506 * k + 198 * k}"
          fill="none" stroke="${C.alert}" stroke-width="8" stroke-linecap="round" stroke-dasharray="1 16"/>
    <!-- AFTER: upright beside the frame -->
    <g transform="translate(600,${floor - S.PROD_H * 0.42}) scale(0.42)">${A.upsyWithChild({ wand: true })}</g>
    <g transform="translate(830,${floor - S.ADULT_H * 0.62}) scale(0.62)">${A.adultUprightSil({ fill: C.teal })}</g>
    <!-- spine line, after: traced along the upright torso -->
    <line x1="${830 + 190 * 0.62}" y1="${floor - 712 * 0.62 + 250 * 0.62}"
          x2="${830 + 190 * 0.62}" y2="${floor - 712 * 0.62 + 448 * 0.62}"
          stroke="${C.terraLt}" stroke-width="8" stroke-linecap="round" stroke-dasharray="1 16"/>
    <line x1="540" y1="330" x2="540" y2="1080" stroke="${C.paper}" stroke-width="6"/>
  `)}
  ${abs(`left:${P}px;top:${P}px;right:${P}px`, `
    ${eyebrow(c.eyebrow)}
    <div style="height:18px"></div>
    ${headline(c.lines, { size: c.size || 82 })}
  `)}
  ${abs(`left:${P}px;top:352px`, panelLabel(c.labelA || 'Folded over the rim'))}
  ${abs(`left:616px;top:352px`, panelLabel(c.labelB || 'Standing up straight', { color: C.teal }))}
  ${abs(`right:${P}px;bottom:${c.offer === 'bar' ? 132 : P}px`, logo({ color: C.ink, size: 25 }))}
  ${offerFor(c)}`;
}

/* =====================================================================
   9. HANDS — tight crop on the grip and the washcloth
   ===================================================================== */
export function hands(c) {
  const mid = 540;
  return `
  ${S.svg(`
    <rect x="0" y="0" width="1080" height="${mid}" fill="${C.tealLt}" opacity=".62"/>
    <rect x="0" y="${mid}" width="1080" height="${1080 - mid}" fill="${C.cream}"/>
    ${A.droplets(1080, mid, 16, C.waterDeep, 12)}
    <!-- top: the child's hands on the rail -->
    <g transform="translate(0,300)">${A.gripBar(1080, { hands: [318, 742] })}</g>
    <!-- bottom: the parent's hands on the washcloth -->
    ${A.suds(176, mid + 214, 1.25)}
    ${A.suds(946, mid + 152, 0.95)}
    <g transform="translate(196,${mid + 158}) scale(1.06)">${A.soapHands()}</g>
    <line x1="0" y1="${mid}" x2="1080" y2="${mid}" stroke="${C.paper}" stroke-width="7"/>
  `)}
  ${abs(`left:${P}px;top:${P}px;width:${1080 - P * 2}px`, `
    ${eyebrow(c.eyebrow, { color: C.teal })}
    <div style="height:16px"></div>
    ${headline([c.lines[0]], { size: c.size || 72, color: C.teal })}
  `)}
  ${abs(`left:${P}px;top:${mid + 34}px;width:${1080 - P * 2}px`,
    headline([c.lines[1]], { size: c.size || 72, color: C.ink }))}
  ${abs(`right:${P}px;bottom:${c.offer === 'bar' ? 132 : P}px`, logo({ color: C.ink, size: 25 }))}
  ${offerFor(c)}`;
}

/* =====================================================================
   10. NUMERIC — counting treatment (headline #10)
   ===================================================================== */
export function numeric(c) {
  const cell = (n, label, x, active) => `
    <div style="position:absolute;left:${x}px;top:660px;width:280px">
      <div style="font-weight:900;font-size:150px;line-height:.86;letter-spacing:-.05em;color:${active ? C.terra : C.prodLo}">${n}</div>
      <div style="margin-top:12px;font-weight:700;font-size:24px;line-height:1.3;color:${active ? C.ink : C.inkMute}">${label}</div>
    </div>`;
  return `
  ${S.svg(`
    <rect width="1080" height="1080" fill="${C.cream}"/>
    <rect x="0" y="596" width="1080" height="6" fill="${C.prodEdge}" opacity=".45"/>
    <g transform="translate(686,74) scale(0.80)">${A.upsy({ wand: true })}</g>
    ${A.suds(880, 470, 1.1)}
  `)}
  ${abs(`left:${P}px;top:${P}px;width:660px`, `
    ${eyebrow(c.eyebrow)}
    <div style="height:22px"></div>
    ${headline(c.lines, { size: c.size || 118 })}
  `)}
  ${cell('2', 'hands you actually have', P, false)}
  ${cell('3', 'jobs at once: hold, rinse, soap', P + 320, false)}
  ${cell('1', 'frame that takes the holding', P + 640, true)}
  ${abs(`right:${P}px;top:${P}px`, logo({ color: C.ink, size: 25 }))}
  ${offerFor(c)}`;
}

/* =====================================================================
   11. NATIVE — in-the-moment framing, reads as a parent's own photo
       (No invented testimonials, names, ratings or star counts.)
   ===================================================================== */
export function nativeCandid(c) {
  const floor = 812;
  return `
  ${S.svg(`
    <rect width="1080" height="1080" fill="${C.ink}"/>
    <g transform="translate(0,0)">
      <svg x="0" y="0" width="1080" height="${floor + 160}" viewBox="0 0 1080 ${floor + 160}">
        ${c.stall ? A.showerStall(1080, floor + 160) : `<rect width="1080" height="${floor + 160}" fill="${C.tile}"/>`}
        ${c.stall ? '' : `<rect y="${floor}" width="1080" height="160" fill="#F2F4F4"/>`}
      </svg>
    </g>
    ${S.shadow(372, floor + 8, 210, 30, .14)}
    <g transform="translate(150,${floor - S.PROD_H * 0.92}) rotate(-1.5 200 300) scale(0.92)">${A.upsyWithChild({ wand: true })}</g>
    ${A.spray(636, 336, 158, 250)}
    <g transform="translate(700,${floor - S.ADULT_H * 0.95}) scale(0.95)">${A.adultUpright()}</g>
    ${A.droplets(1080, 900, 20, C.waterDeep, 33)}
    <!-- soft vignette so the caption band reads -->
    <rect x="0" y="${1080 - 268}" width="1080" height="268" fill="${C.ink}" opacity=".08"/>
  `)}
  ${abs(`left:0;right:0;bottom:0;background:${C.ink};padding:30px ${P}px 32px`, `
    ${headline(c.lines, { size: c.size || 60, color: C.cream, lh: 1.0 })}
    ${c.quote ? quoteBlock(c.quote) : ''}
  `)}
  ${abs(`left:${P}px;top:${P}px`, logo({ color: C.paper, size: 25 }))}
  ${offerFor(c)}`;
}

export const LAYOUTS = {
  hero, beforeAfter, usVsThem, mechanism, avatarCallout,
  typographic, splitDuo, posture, hands, numeric, nativeCandid,
};

/* =====================================================================
   12. STALL DIVIDE — child inside the stall, parent outside and dry.
        The spatial relationship IS the message (headline #6).
   ===================================================================== */
export function stallDivide(c) {
  const gx = 648;                                   // glass line
  const floor = c.native ? 858 : (c.offer === 'bar' ? 856 : 936);
  const capH = c.native ? 258 : 0;
  return `
  ${S.svg(`
    <!-- inside the stall -->
    <svg x="0" y="0" width="${gx}" height="1080" viewBox="0 0 ${gx} 1080">
      ${A.showerStall(gx, 1080, { glass: false, head: true })}
    </svg>
    <!-- outside: dry bathroom floor -->
    <rect x="${gx}" y="0" width="${1080 - gx}" height="1080" fill="${C.cream}"/>
    <rect x="${gx}" y="${floor}" width="${1080 - gx}" height="${1080 - floor}" fill="${C.creamDeep}"/>
    <line x1="${gx}" y1="${floor}" x2="1080" y2="${floor}" stroke="${C.prodEdge}" stroke-width="4" opacity=".5"/>
    <!-- child, inside -->
    ${S.shadow(300, floor + 6, 150, 24, .13)}
    <g transform="translate(122,${floor - S.PROD_H * 0.58}) scale(0.58)">${A.upsyWithChild({ wand: true })}</g>
    ${A.spray(430, floor - 300, 154, 190)}
    <!-- glass panel + frame -->
    <rect x="${gx - 8}" y="0" width="16" height="1080" fill="${C.prodMd}"/>
    <rect x="${gx - 3}" y="440" width="6" height="120" rx="3" fill="${C.prodEdge}"/>
    <!-- parent, outside: dressed, dry, upright, within reach -->
    ${S.shadow(860, floor + 6, 112, 20, .13)}
    <g transform="translate(716,${floor - S.ADULT_H * 0.74}) scale(0.74)">${A.adultUpright()}</g>
  `)}
  ${c.native
    ? `${abs(`left:0;right:0;bottom:0;background:${C.ink};padding:30px ${P}px 32px`, `
        ${headline(c.lines, { size: c.size || 60, color: C.cream, lh: 1.0 })}
        ${c.quote ? quoteBlock(c.quote) : ''}`)}
       ${abs(`left:${P}px;top:${P}px`, logo({ color: C.paper, size: 25 }))}`
    : `${abs(`left:${P}px;top:${P}px;width:${1080 - P * 2}px`, `
        ${eyebrow(c.eyebrow)}
        <div style="height:18px"></div>
        ${headline(c.lines, { size: c.size || 74 })}`)}
       ${abs(`left:${P}px;bottom:${c.offer === 'bar' ? 132 : P}px`, logo({ color: C.ink, size: 26 }))}`}
  ${offerFor(c)}`;
}

LAYOUTS.stallDivide = stallDivide;
