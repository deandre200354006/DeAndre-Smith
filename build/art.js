import { C } from './tokens.js';

/* Real-photo override state (see setProductPhoto at the bottom of this file). */
let PHOTO = { product: null, productChild: null };
const PHOTO_DIMS = { product: null, productChild: null };
export function setPhotoDims(d) { Object.assign(PHOTO_DIMS, d); }
/* Draw a photo asset bottom-anchored in the product's 400x540 local box,
   at its true aspect ratio. h = how tall the asset should render locally. */
const photoBox = (href, key, h) => {
  const dim = PHOTO_DIMS[key];
  const w = dim ? h * (dim.w / dim.h) : 400;
  return `<image href="${href}" x="${200 - w / 2}" y="${540 - h}" width="${w}" height="${h}"/>`;
};
export function hasPhoto() { return !!(PHOTO.product || PHOTO.productChild); }

/* ============================================================
   UPSY ART LIBRARY
   Flat editorial illustration system. Every figure is drawn in
   its own local viewBox and placed with <g transform>.
   ============================================================ */

/* ---------- THE PRODUCT ----------------------------------- */
/* Local space 400 x 540. Origin top-left. Floor line y=520.
   Simplified, brand-accurate stand-in for the Upsy frame:
   wide triangular base + telescoping post + three-sided chest rail. */
export function upsy({ wand = false, ghost = false, vector = false } = {}) {
  if (PHOTO.product && !vector) return photoBox(PHOTO.product, 'product', 430);
  return `<g class="upsy">${upsyBase({ ghost })}${upsyRail({ wand, ghost })}</g>`;
}

/* Base + post only (draws BEHIND the child). */
export function upsyBase({ ghost = false } = {}) {
  const hi = ghost ? '#FFFFFF' : C.prodHi;
  const md = ghost ? '#EDEFF1' : C.prodMd;
  const lo = ghost ? '#D5DADE' : C.prodLo;
  return `
  <g class="upsy-base">
    <!-- wide triangular mat: extruded side -->
    <path d="M200 396 C302 396 376 440 388 482 C392 502 374 512 350 512
             L50 512 C26 512 8 502 12 482 C24 440 98 396 200 396 Z"
          transform="translate(0,16)" fill="${lo}"/>
    <!-- mat: top face -->
    <path d="M200 396 C302 396 376 440 388 482 C392 502 374 512 350 512
             L50 512 C26 512 8 502 12 482 C24 440 98 396 200 396 Z" fill="${md}"/>
    <path d="M200 408 C294 408 362 446 373 483 C376 495 364 503 346 503
             L54 503 C36 503 24 495 27 483 C38 446 106 408 200 408 Z"
          fill="${hi}" opacity=".55"/>
    <!-- embossed grip ring + front grooves, as on the mat -->
    <g fill="none" stroke="${C.prodEdge}" stroke-width="2.6" opacity=".45">
      <ellipse cx="200" cy="462" rx="52" ry="17" stroke-dasharray="3 9"/>
      <path d="M96 492 C150 500 250 500 304 492"/>
      <path d="M74 502 C140 511 260 511 326 502"/>
    </g>
    <!-- lower post section -->
    <rect x="170" y="308" width="60" height="126" rx="20" fill="${md}"/>
    <rect x="178" y="314" width="26" height="114" rx="13" fill="${hi}" opacity=".9"/>
    <!-- collar where the post meets the mat -->
    <path d="M158 414 h84 a16 16 0 0 1 16 16 v12 a14 14 0 0 1 -14 14 h-88
             a14 14 0 0 1 -14 -14 v-12 a16 16 0 0 1 16 -16 z" fill="${lo}"/>
    <!-- upper telescoping section with the height scale -->
    <rect x="180" y="262" width="40" height="104" rx="15" fill="${hi}"/>
    <rect x="180" y="262" width="40" height="104" rx="15" fill="none" stroke="${C.prodEdge}" stroke-width="2" opacity=".45"/>
    <g stroke="${C.prodEdge}" stroke-width="2.2" opacity=".65" stroke-linecap="round">
      ${[0,1,2,3,4,5].map(i=>`<line x1="187" y1="${278+i*12}" x2="${i%2?197:205}" y2="${278+i*12}"/>`).join('')}
    </g>
    <!-- height lock lever -->
    <path d="M166 306 h40 a12 12 0 0 1 12 12 v20 a12 12 0 0 1 -12 12 h-40
             a10 10 0 0 1 -10 -10 v-24 a10 10 0 0 1 10 -10 z" fill="${lo}"/>
    <rect x="140" y="314" width="28" height="11" rx="5.5" fill="${C.prodEdge}"/>
    <rect x="176" y="328" width="26" height="7" rx="3.5" fill="${hi}" opacity=".8"/>
  </g>`;
}

/* Chest rail + wand dock only (draws IN FRONT of the child). */
export function upsyRail({ wand = false, ghost = false } = {}) {
  const hi = ghost ? '#FFFFFF' : C.prodHi;
  const md = ghost ? '#EDEFF1' : C.prodMd;
  const lo = ghost ? '#D5DADE' : C.prodLo;
  return `
  <g class="upsy-rail">
    <!-- padded adjustable waist bar: near-horizontal, gentle forward bow -->
    <path d="M104 272 C142 254 172 248 200 248 C228 248 258 254 296 272"
          fill="none" stroke="${lo}" stroke-width="42" stroke-linecap="round"/>
    <path d="M104 272 C142 254 172 248 200 248 C228 248 258 254 296 272"
          fill="none" stroke="${hi}" stroke-width="33" stroke-linecap="round"/>
    <path d="M112 266 C146 252 174 248 200 248 C226 248 254 252 288 266"
          fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" opacity=".9"/>
    <!-- adjustment collars either side of the post -->
    <rect x="156" y="248" width="20" height="26" rx="9" fill="${md}"/>
    <rect x="224" y="248" width="20" height="26" rx="9" fill="${md}"/>
    <!-- neck up to the cradle -->
    <rect x="184" y="198" width="32" height="58" rx="12" fill="${md}"/>
    <!-- shower-head cradle on top of the post -->
    <path d="M162 152 h78 a26 26 0 0 1 26 26 v4 a24 24 0 0 1 -24 24 h-84
             a24 24 0 0 1 -24 -24 v-4 a26 26 0 0 1 26 -26 z" fill="${lo}"/>
    <circle cx="160" cy="168" r="23" fill="${md}"/>
    <circle cx="155" cy="163" r="13" fill="${hi}" opacity=".9"/>
    <!-- the two prongs the shower head sits between -->
    <path d="M262 164 L300 154" fill="none" stroke="${md}" stroke-width="26" stroke-linecap="round"/>
    <path d="M264 188 L304 182" fill="none" stroke="${md}" stroke-width="22" stroke-linecap="round"/>
    <circle cx="300" cy="154" r="13" fill="${hi}" opacity=".92"/>
    <circle cx="305" cy="182" r="11" fill="${hi}" opacity=".92"/>
    ${wand ? `
    <!-- handheld shower head seated in the cradle -->
    <g transform="translate(278,158) rotate(12)">
      <rect x="0" y="4" width="54" height="15" rx="7.5" fill="${md}" stroke="${C.prodEdge}" stroke-width="2"/>
      <path d="M50 -6 h30 a13 13 0 0 1 13 13 v9 a13 13 0 0 1 -13 13 h-30 z" fill="${lo}"/>
      <circle cx="86" cy="11" r="9" fill="${C.prodEdge}" opacity=".75"/>
    </g>` : ''}
  </g>`;
}

/* Side / profile view of the product, local space 300 x 540 */
export function upsySide({ ghost = false } = {}) {
  const hi = ghost ? '#FFFFFF' : C.prodHi;
  const md = ghost ? '#EDEFF1' : C.prodMd;
  const lo = ghost ? '#D5DADE' : C.prodLo;
  return `
  <g class="upsy-side">
    <path d="M30 486 C30 466 90 440 150 440 C214 440 274 466 274 486 C274 502 258 510 240 510 L64 510 C44 510 30 502 30 486 Z" fill="${lo}" transform="translate(0,12)"/>
    <path d="M30 486 C30 466 90 440 150 440 C214 440 274 466 274 486 C274 502 258 510 240 510 L64 510 C44 510 30 502 30 486 Z" fill="${md}"/>
    <rect x="126" y="250" width="48" height="200" rx="16" fill="${md}"/>
    <rect x="135" y="114" width="30" height="150" rx="12" fill="${hi}" stroke="${C.prodEdge}" stroke-width="2"/>
    <path d="M120 246 h34 a10 10 0 0 1 10 10 v16 a10 10 0 0 1 -10 10 h-34 a8 8 0 0 1 -8-8 v-20 a8 8 0 0 1 8-8 z" fill="${lo}"/>
    <path d="M60 200 L60 150 C60 108 104 86 150 86 C186 86 214 100 226 122"
          fill="none" stroke="${lo}" stroke-width="40" stroke-linecap="round"/>
    <path d="M60 200 L60 150 C60 108 104 86 150 86 C186 86 214 100 226 122"
          fill="none" stroke="${md}" stroke-width="30" stroke-linecap="round"/>
  </g>`;
}

/* ---------- TODDLER ---------------------------------------- */
/* Standing, back-3/4 to viewer, both hands up on the rail.
   Local space 260 x 400, feet at y=400. */
export function toddler({ tone = C.skin, hair = C.hair, dark = false, onBar = false } = {}) {
  const body = dark ? C.ink : tone;
  const hr   = dark ? C.ink : hair;
  const nappy= dark ? C.inkSoft : '#FFFFFF';
  return `
  <g class="toddler" stroke-linecap="round">
    <!-- legs -->
    <path d="M108 268 L102 372" fill="none" stroke="${body}" stroke-width="42"/>
    <path d="M144 268 L152 372" fill="none" stroke="${body}" stroke-width="42"/>
    <ellipse cx="98"  cy="386" rx="22" ry="13" fill="${body}"/>
    <ellipse cx="156" cy="388" rx="22" ry="13" fill="${body}"/>
    <!-- nappy -->
    <path d="M84 210 h84 c6 36 -8 66 -42 66 c-34 0 -48 -30 -42 -66 z" fill="${nappy}"/>
    <!-- torso -->
    <path d="M90 118 h72 c9 42 11 74 7 104 h-86 c-4 -30 -2 -62 7 -104 z" fill="${body}"/>
    <!-- arms: out to the sides (loose) or down onto the waist bar -->
    ${onBar ? `
    <path d="M94 140 C74 162 62 188 56 210" fill="none" stroke="${body}" stroke-width="31"/>
    <path d="M158 140 C178 162 190 188 196 210" fill="none" stroke="${body}" stroke-width="31"/>
    <circle cx="52"  cy="216" r="18" fill="${body}"/>
    <circle cx="200" cy="216" r="18" fill="${body}"/>` : `
    <path d="M96 142 C64 152 42 162 28 172" fill="none" stroke="${body}" stroke-width="31"/>
    <path d="M156 142 C188 152 210 162 224 172" fill="none" stroke="${body}" stroke-width="31"/>
    <circle cx="24"  cy="174" r="18" fill="${body}"/>
    <circle cx="228" cy="174" r="18" fill="${body}"/>`}
    <!-- head -->
    <circle cx="126" cy="70" r="52" fill="${body}"/>
    <path d="M74 66 c0 -36 24 -54 52 -54 c28 0 52 18 52 54 c-13 -15 -28 -21 -52 -21 c-24 0 -39 6 -52 21 z" fill="${hr}"/>
  </g>`;
}

/* Product with a child standing in it, correctly sandwiched:
   base + post BEHIND the child, chest rail IN FRONT.
   Shares the product's 400x540 local space; the child's head
   rises above y=0, which is intentional. */
export function upsyWithChild({ wand = false, tone = C.skin, hair = C.hair, dark = false, ghost = false, vector = false } = {}) {
  if (PHOTO.productChild && !vector) return photoBox(PHOTO.productChild, 'productChild', 566);
  return `
  <g class="upsy-child">
    ${upsyBase({ ghost })}
    <g transform="translate(44,-28) scale(1.235)">${toddler({ tone, hair, dark, onBar: true })}</g>
    ${upsyRail({ wand, ghost })}
    ${`
    <!-- the child's hands resting over the front of the bar -->
    <circle cx="132" cy="262" r="21" fill="${dark ? C.ink : tone}"/>
    <circle cx="268" cy="262" r="21" fill="${dark ? C.ink : tone}"/>`}
  </g>`;
}

/* ---------- ADULT ------------------------------------------
   Stroke-built figures: thick round-capped limbs keep the
   silhouette readable at feed thumbnail size.               */

/* Upright, standing, near arm reaching down/forward to wash.
   Local space 340 x 720, feet at y=712. Faces LEFT.          */
export function adultUpright({ skin = C.skin, shirt = C.terra, pants = C.teal, hair = C.hair, flat = false } = {}) {
  const o = flat ? '1' : '.82';
  return `
  <g class="adult-up" stroke-linecap="round" fill="none">
    <!-- far leg -->
    <path d="M176 448 L168 686" stroke="${pants}" stroke-width="50" opacity="${o}"/>
    <!-- near leg -->
    <path d="M200 448 L216 686" stroke="${pants}" stroke-width="52"/>
    <ellipse cx="158" cy="698" rx="33" ry="15" fill="${C.ink}" stroke="none"/>
    <ellipse cx="224" cy="700" rx="33" ry="15" fill="${C.ink}" stroke="none"/>
    <!-- torso -->
    <path d="M190 254 L190 444" stroke="${shirt}" stroke-width="88"/>
    <!-- far arm, relaxed at the side -->
    <path d="M228 268 C250 322 254 376 246 420" stroke="${shirt}" stroke-width="34" opacity="${o}"/>
    <circle cx="244" cy="434" r="18" fill="${skin}" stroke="none" opacity="${o}"/>
    <!-- near arm reaching down-left toward the child -->
    <path d="M152 266 C130 300 116 332 112 362" stroke="${shirt}" stroke-width="38"/>
    <path d="M112 362 C108 396 102 424 100 444" stroke="${skin}" stroke-width="34"/>
    <circle cx="98" cy="458" r="21" fill="${skin}" stroke="none"/>
    <!-- neck + head -->
    <path d="M186 204 L186 240" stroke="${skin}" stroke-width="38"/>
    <circle cx="182" cy="152" r="52" fill="${skin}" stroke="none"/>
    <path d="M130 148 C130 108 152 86 184 86 C216 86 238 110 236 148 C224 128 206 120 182 120 C156 120 142 130 130 148 Z" fill="${hair}" stroke="none"/>
  </g>`;
}

/* Same figure as a flat single-colour silhouette (for posture ads). */
export function adultUprightSil({ fill = C.ink } = {}) {
  return adultUpright({ skin: fill, shirt: fill, pants: fill, hair: fill, flat: true });
}

/* Kneeling / folded forward over a tub rim.
   Local space 480 x 520, floor at y=506. Faces RIGHT.        */
export function adultKneeling({ skin = C.skin, shirt = C.terra, pants = C.teal, hair = C.hair, flat = false } = {}) {
  const o = flat ? '1' : '.8';
  return `
  <g class="adult-kneel" stroke-linecap="round" fill="none">
    <!-- shin flat on the floor -->
    <path d="M96 478 L262 478" stroke="${pants}" stroke-width="52"/>
    <ellipse cx="86" cy="486" rx="26" ry="14" fill="${C.ink}" stroke="none"/>
    <!-- thigh rising forward -->
    <path d="M262 478 L286 372" stroke="${pants}" stroke-width="56"/>
    <!-- spine, folded forward over the rim -->
    <path d="M282 372 C270 296 292 240 350 208" stroke="${shirt}" stroke-width="104"/>
    <!-- neck + head, low and forward -->
    <path d="M366 198 L400 182" stroke="${skin}" stroke-width="40"/>
    <circle cx="424" cy="170" r="50" fill="${skin}" stroke="none"/>
    <path d="M382 148 C374 108 400 84 432 86 C464 88 482 112 476 148 C458 130 440 124 416 128 C398 131 388 138 382 148 Z" fill="${hair}" stroke="none"/>
    <!-- arm hanging down into the tub -->
    <path d="M356 258 C368 310 372 356 366 396" stroke="${shirt}" stroke-width="40"/>
    <path d="M366 396 L360 434" stroke="${skin}" stroke-width="36"/>
    <circle cx="358" cy="446" r="20" fill="${skin}" stroke="none"/>
    <!-- second arm bracing the child -->
    <path d="M318 268 C300 318 296 360 302 396" stroke="${shirt}" stroke-width="34" opacity="${o}"/>
    <circle cx="304" cy="410" r="18" fill="${skin}" stroke="none" opacity="${o}"/>
  </g>`;
}

export function adultKneelingSil({ fill = C.ink } = {}) {
  return adultKneeling({ skin: fill, shirt: fill, pants: fill, hair: fill, flat: true });
}

/* A parent's forearm + hand reaching in from an edge.
   Local 320 x 160, wrist at left. */
export function reachingHand({ skin = C.skin, sleeve = C.terra } = {}) {
  return `
  <g class="hand" stroke-linecap="round" fill="none">
    <path d="M4 80 L150 80" stroke="${sleeve}" stroke-width="62"/>
    <path d="M150 80 L226 80" stroke="${skin}" stroke-width="54"/>
    <circle cx="248" cy="80" r="34" fill="${skin}" stroke="none"/>
    <path d="M266 58 L296 46" stroke="${skin}" stroke-width="20"/>
    <path d="M272 82 L306 82" stroke="${skin}" stroke-width="20"/>
    <path d="M266 104 L296 116" stroke="${skin}" stroke-width="20"/>
  </g>`;
}

/* ---------- BEFORE-STATE PROPS ----------------------------- */
/* Generic unbranded reclined infant tub. Local 420 x 200 */
export function infantTub({ fill = C.prodLo } = {}) {
  return `
  <g class="infant-tub">
    <!-- outer shell: high head end (left), low foot end (right) -->
    <path d="M22 92 C22 58 52 34 96 30 L360 30 C400 30 420 52 414 86 L396 176
             C390 204 362 220 320 220 L112 220 C62 220 28 194 24 152 Z"
          fill="${fill}" stroke="${C.prodEdge}" stroke-width="3.5"/>
    <!-- reclined interior seat -->
    <path d="M62 96 C62 74 84 60 116 58 L352 58 C372 58 380 68 377 84 L364 132
             C300 152 216 158 150 146 C104 138 74 122 62 96 Z"
          fill="#FFFFFF" opacity=".72"/>
    <!-- recline ramp line -->
    <path d="M78 138 C126 108 176 92 244 88" fill="none" stroke="${C.prodEdge}" stroke-width="4" opacity=".55" stroke-linecap="round"/>
    <!-- drain plug + foot -->
    <circle cx="352" cy="196" r="9" fill="${C.prodEdge}" opacity=".55"/>
    <rect x="90" y="218" width="70" height="16" rx="8" fill="${C.prodEdge}" opacity=".7"/>
    <rect x="292" y="218" width="70" height="16" rx="8" fill="${C.prodEdge}" opacity=".7"/>
  </g>`;
}

/* Generic storage bin / plastic tote. Local 400 x 260 */
export function storageBin({ fill = C.prodLo } = {}) {
  return `
  <g class="bin">
    <path d="M42 40 L358 40 L326 236 C324 250 312 256 292 256 L108 256 C88 256 76 250 74 236 Z"
          fill="${fill}" stroke="${C.prodEdge}" stroke-width="3"/>
    <rect x="26" y="20" width="348" height="30" rx="12" fill="${C.prodMd}" stroke="${C.prodEdge}" stroke-width="3"/>
    <g stroke="#FFFFFF" opacity=".4" stroke-width="8" stroke-linecap="round">
      <line x1="112" y1="74" x2="102" y2="230"/>
      <line x1="200" y1="74" x2="200" y2="230"/>
      <line x1="288" y1="74" x2="298" y2="230"/>
    </g>
    <path d="M62 150 L338 150 L326 236 C324 250 312 256 292 256 L108 256 C88 256 76 250 74 236 Z" fill="${C.water}" opacity=".55"/>
  </g>`;
}

/* ---------- ENVIRONMENT ------------------------------------ */
/* Walk-in shower stall backdrop. Fills a w x h box. */
export function showerStall(w, h, { glass = true, head = true } = {}) {
  const t = 120;
  const cols = Math.ceil(w / t), rows = Math.ceil(h / t);
  let grout = '';
  for (let i = 1; i < cols; i++) grout += `<line x1="${i*t}" y1="0" x2="${i*t}" y2="${h}"/>`;
  for (let j = 1; j < rows; j++) grout += `<line x1="0" y1="${j*t}" x2="${w}" y2="${j*t}"/>`;
  const panY = h - 168;
  return `
  <g class="stall">
    <rect x="0" y="0" width="${w}" height="${h}" fill="${C.tile}"/>
    <g stroke="${C.tileLine}" stroke-width="5" opacity=".95">${grout}</g>
    <!-- subtle tile sheen -->
    <rect x="0" y="0" width="${w}" height="${h}" fill="url(#sheen)" opacity=".5"/>
    <defs><linearGradient id="sheen" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#FFFFFF" stop-opacity=".55"/>
      <stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/>
    </linearGradient></defs>
    ${head ? `
    <!-- wall-mounted rail + wand cradle: makes the room unmistakable -->
    <g>
      <rect x="${w*0.10}" y="${h*0.10}" width="16" height="${h*0.34}" rx="8" fill="${C.prodLo}"/>
      <rect x="${w*0.085}" y="${h*0.085}" width="46" height="22" rx="11" fill="${C.prodEdge}"/>
      <rect x="${w*0.085}" y="${h*0.40}" width="46" height="22" rx="11" fill="${C.prodEdge}"/>
    </g>` : ''}
    <!-- shower pan -->
    <rect x="0" y="${panY}" width="${w}" height="${h - panY}" fill="#EDEFEF"/>
    <line x1="0" y1="${panY}" x2="${w}" y2="${panY}" stroke="${C.tileLine}" stroke-width="6"/>
    <ellipse cx="${w*0.52}" cy="${panY + 84}" rx="40" ry="14" fill="${C.tileLine}" opacity=".9"/>
    <circle cx="${w*0.52}" cy="${panY + 84}" r="9" fill="${C.prodEdge}" opacity=".8"/>
    ${glass ? `
    <rect x="${w*0.775}" y="0" width="${w*0.225}" height="${panY}" fill="${C.tealLt}" opacity=".42"/>
    <rect x="${w*0.775}" y="0" width="12" height="${panY}" fill="${C.prodMd}"/>
    <rect x="${w*0.775 + 4}" y="${panY*0.42}" width="4" height="90" rx="2" fill="${C.prodEdge}"/>` : ''}
  </g>`;
}

/* Bathtub, side view. Local 620 x 300 */
export function bathtub({ fill = '#FFFFFF', water = true } = {}) {
  return `
  <g class="tub">
    <path d="M20 40 L600 40 L572 262 C568 284 548 296 516 296 L104 296 C72 296 52 284 48 262 Z"
          fill="${fill}" stroke="${C.prodEdge}" stroke-width="4"/>
    ${water ? `<path d="M46 180 L574 180 L572 262 C568 284 548 296 516 296 L104 296 C72 296 52 284 48 262 Z" fill="${C.water}" opacity=".75"/>
    <path d="M46 180 L574 180 l-3 22 L49 202 Z" fill="${C.waterDeep}" opacity=".55"/>` : ''}
  </g>`;
}

/* Handheld shower wand, local 220 x 120 */
export function showerWand({ fill = C.prodMd } = {}) {
  return `
  <g class="wand">
    <rect x="10" y="46" width="112" height="26" rx="13" fill="${fill}" stroke="${C.prodEdge}" stroke-width="2.5"/>
    <path d="M118 32 h48 a16 16 0 0 1 16 16 v22 a16 16 0 0 1 -16 16 h-48 z" fill="${C.prodLo}"/>
    <circle cx="176" cy="59" r="13" fill="${C.prodEdge}"/>
  </g>`;
}

/* Spray: cone of dots from (x,y) toward angle deg, length L */
export function spray(x, y, angle = 40, len = 300, spreadDeg = 26, color = C.waterDeep) {
  const rad = a => a * Math.PI / 180;
  let d = '';
  for (let r = 0; r < 5; r++) {
    const a = angle - spreadDeg / 2 + (spreadDeg / 4) * r;
    for (let i = 1; i <= 7; i++) {
      const t = (i / 7) * len;
      const px = x + Math.cos(rad(a)) * t;
      const py = y + Math.sin(rad(a)) * t;
      const rr = 3 + i * 0.7;
      d += `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${rr.toFixed(1)}" fill="${color}" opacity="${(0.5 - i * 0.045).toFixed(2)}"/>`;
    }
  }
  return `<g class="spray">${d}</g>`;
}

/* Water droplets scattered in a box */
export function droplets(w, h, n = 14, color = C.waterDeep, seed = 7) {
  let s = seed, rnd = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  let out = '';
  for (let i = 0; i < n; i++) {
    const x = rnd() * w, y = rnd() * h, r = 4 + rnd() * 9;
    out += `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="${color}" opacity="${(0.14 + rnd() * 0.2).toFixed(2)}"/>`;
  }
  return out;
}

/* Suds / soap bubbles cluster */
export function suds(x, y, scale = 1, color = '#FFFFFF') {
  const pts = [[0,0,26],[30,-14,18],[-28,-10,20],[14,18,16],[-18,16,14],[46,6,12]];
  return `<g transform="translate(${x},${y}) scale(${scale})" fill="${color}" opacity=".92">` +
    pts.map(([a,b,r]) => `<circle cx="${a}" cy="${b}" r="${r}"/>`).join('') + `</g>`;
}


/* ---------- SCALE ------------------------------------------
   Adult local height ~700u = ~66in. Child ~30in. Product frame
   ~24in. Multiply the ADULT's scale by these to place others.  */
export const REL = {
  productToAdult: 0.62,   // upsy()/upsyWithChild() scale, relative to adult scale
  tubToAdult:     0.58,
  binToAdult:     0.52,
  infantTubToAdult: 0.55,
};

/* ---------- REAL-PHOTO OVERRIDE ----------------------------
   Drop a transparent-background cutout at build/assets/product.png
   (frame alone) and/or product-child.png (frame with a child in it)
   and the renderer swaps the vector stand-in for the real photo,
   scaled into the same 400x540 local box. Nothing else changes. */
export function setProductPhoto(p) { PHOTO = { ...PHOTO, ...p }; }

/* ---------- TIGHT CROPS ------------------------------------ */

/* A length of chest rail crossing the frame, with a child's hands
   curled over it. Local space: w x 300, bar centred at y=150.     */
export function gripBar(w = 1080, { hands = [330, 720], skin = C.skin, edge = C.skinDeep } = {}) {
  const barY = 150, barH = 96;
  const hand = (cx) => `
    <g class="grip">
      <!-- palm, behind the bar -->
      <ellipse cx="${cx + 4}" cy="${barY - 14}" rx="70" ry="56" fill="${skin}"/>
      <ellipse cx="${cx + 4}" cy="${barY - 14}" rx="70" ry="56" fill="none" stroke="${edge}" stroke-width="2.5" opacity=".5"/>
      <!-- fingers, curling over the front of the bar -->
      ${[-45, -16, 13, 42].map((dx, i) => {
        const h = 104 - Math.abs(dx) * 0.26;
        return `<rect x="${cx + dx - 13}" y="${barY - 34}" width="26" height="${h}" rx="13"
                      fill="${skin}" stroke="${edge}" stroke-width="2.5" stroke-opacity=".45"/>`;
      }).join('')}
      <!-- thumb, tucked under -->
      <rect x="${cx + 60}" y="${barY - 40}" width="24" height="58" rx="12"
            fill="${skin}" stroke="${edge}" stroke-width="2.5" stroke-opacity=".45"/>
    </g>`;
  return `
  <g class="gripbar">
    <rect x="-20" y="${barY - barH / 2}" width="${w + 40}" height="${barH}" rx="${barH / 2}" fill="${C.prodLo}"/>
    <rect x="-20" y="${barY - barH / 2 + 8}" width="${w + 40}" height="${barH - 22}" rx="${(barH - 22) / 2}" fill="${C.prodMd}"/>
    <rect x="-20" y="${barY - barH / 2 + 14}" width="${w + 40}" height="18" rx="9" fill="${C.prodHi}" opacity=".8"/>
    <g stroke="${C.prodEdge}" stroke-width="3.5" opacity=".4" stroke-linecap="round">
      ${Array.from({ length: Math.floor(w / 36) }, (_, i) =>
        `<line x1="${18 + i * 36}" y1="${barY - 24}" x2="${18 + i * 36}" y2="${barY + 24}"/>`).join('')}
    </g>
    ${hands.map(hand).join('')}
  </g>`;
}

/* Two adult hands holding a washcloth, suds around them.
   Local space 640 x 300. */
export function soapHands({ skin = C.skin, sleeve = C.terra, cloth = C.tealLt, edge = C.skinDeep } = {}) {
  return `
  <g class="soaphands" stroke-linecap="round">
    <!-- washcloth: soft, folded, held between both hands -->
    <path d="M206 118 C258 78 352 62 438 74 C486 80 512 112 502 152 L486 216
             C476 254 436 272 380 268 L246 258 C198 254 176 226 184 190 Z"
          fill="${cloth}" stroke="${C.waterDeep}" stroke-width="3.5" stroke-opacity=".7"/>
    <path d="M226 150 C290 122 372 116 452 130" fill="none" stroke="${C.waterDeep}"
          stroke-width="4" opacity=".45" stroke-linecap="round"/>
    <path d="M232 198 C296 176 374 172 456 186" fill="none" stroke="${C.waterDeep}"
          stroke-width="4" opacity=".32" stroke-linecap="round"/>
    <!-- left forearm + hand, angled in -->
    <path d="M0 210 L128 178" fill="none" stroke="${sleeve}" stroke-width="62"/>
    <path d="M126 178 L200 160" fill="none" stroke="${skin}" stroke-width="54"/>
    <g stroke="${edge}" stroke-width="2.5" stroke-opacity=".4" fill="${skin}">
      <circle cx="230" cy="154" r="36"/>
      <rect x="246" y="112" width="52" height="21" rx="10.5" transform="rotate(-14 272 122)"/>
      <rect x="250" y="142" width="56" height="21" rx="10.5" transform="rotate(-4 278 152)"/>
      <rect x="246" y="172" width="50" height="21" rx="10.5" transform="rotate(7 271 182)"/>
    </g>
    <!-- right forearm + hand, angled in -->
    <path d="M640 236 L512 206" fill="none" stroke="${sleeve}" stroke-width="62"/>
    <path d="M514 206 L440 188" fill="none" stroke="${skin}" stroke-width="54"/>
    <g stroke="${edge}" stroke-width="2.5" stroke-opacity=".4" fill="${skin}">
      <circle cx="410" cy="182" r="36"/>
      <rect x="342" y="140" width="52" height="21" rx="10.5" transform="rotate(14 368 150)"/>
      <rect x="334" y="170" width="56" height="21" rx="10.5" transform="rotate(4 362 180)"/>
      <rect x="344" y="200" width="50" height="21" rx="10.5" transform="rotate(-7 369 210)"/>
    </g>
  </g>`;
}
