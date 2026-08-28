import * as A from './art.js';
import { C } from './tokens.js';

export const svg = (inner, extra = '') =>
  `<svg class="art" width="1080" height="1080" viewBox="0 0 1080 1080" ${extra}>${inner}</svg>`;

/* Adult-relative placement. k = adult scale. */
export const ADULT_H = 712, PROD_H = 514, TUB_H = 300, BIN_H = 260, ITUB_H = 234;

/* Parent standing upright + child in the frame, sharing a floor line. */
export function sceneParentChild({ x = 0, floor = 900, k = 0.7, wand = true, water = true, gap = 300, dark = false, vector = false } = {}) {
  const photo = A.hasPhoto() && !vector;
  // The supplied photo already contains a real child AND an adult's hands on
  // the shower head, so no illustrated parent is drawn beside it.
  const pk = photo ? k * A.REL.productToAdult * 1.62 : k * A.REL.productToAdult;
  const px = photo ? x + gap * 0.34 : x, py = floor - PROD_H * pk;
  const ax = x + gap, ay = floor - ADULT_H * k;
  return `
    <g transform="translate(${px},${py}) scale(${pk})">${A.upsyWithChild({ wand, dark, vector })}</g>
    ${!photo && water ? A.spray(px + 340 * pk, py + 150 * pk, 156, 210 * pk) : ''}
    ${photo ? '' : `<g transform="translate(${ax},${ay}) scale(${k})">${A.adultUpright()}</g>`}`;
}

/* Child standing unsupported in a tub, parent's hand steadying: the "before". */
export function childInTub({ x = 0, floor = 900, k = 0.5, tone = C.inkMute, flat = false } = {}) {
  const tubK = k, tubH = TUB_H * tubK;
  const childK = tubK * 1.28;
  const childY = floor - tubH + 285 * tubK - 400 * childK;
  const opts = flat ? { dark: true } : {};
  const ak = k * 0.86;
  return `
    <g transform="translate(${x + 70},${childY}) rotate(-5 130 200) scale(${childK})">${A.toddler(opts)}</g>
    <g transform="translate(${x},${floor - tubH}) scale(${tubK})">${A.bathtub({ water: true })}</g>
    <g transform="translate(${x - 232 * ak},${floor - 506 * ak}) scale(${ak})">${A.adultKneeling()}</g>`;
}

/* Child + generic bin. */
export function childInBin({ x = 0, floor = 900, k = 0.62, kneel = false } = {}) {
  const binH = BIN_H * k;
  const childK = k * 1.05;
  const childY = floor - binH + 200 * k - 400 * childK;
  const ak = k * 0.72;
  return `
    <g transform="translate(${x + 46},${childY}) scale(${childK})">${A.toddler()}</g>
    <g transform="translate(${x},${floor - binH}) scale(${k})">${A.storageBin()}</g>
    ${kneel ? `<g transform="translate(${x - 268 * ak},${floor - 506 * ak}) scale(${ak})">${A.adultKneeling()}</g>` : ''}`;
}

/* Floor / baseline rule. */
export const floorLine = (y, x1 = 0, x2 = 1080, color = C.prodEdge, w = 4) =>
  `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y}" stroke="${color}" stroke-width="${w}" opacity=".55"/>`;

/* Soft elliptical contact shadow. */
export const shadow = (cx, cy, rx, ry = rx * 0.16, o = 0.13) =>
  `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${C.ink}" opacity="${o}"/>`;

/* Callout dot + leader line + label, for mechanism diagrams. */
export function callout(n, x, y, tx, ty, label, { color = C.terra, anchor = 'start', size = 24 } = {}) {
  return `
    <g class="callout">
      <line x1="${x}" y1="${y}" x2="${tx}" y2="${ty}" stroke="${color}" stroke-width="3" stroke-dasharray="2 8" stroke-linecap="round" opacity=".85"/>
      <circle cx="${x}" cy="${y}" r="19" fill="${color}"/>
      <text x="${x}" y="${y + 8}" text-anchor="middle" font-size="22" font-weight="900" fill="#FFFFFF">${n}</text>
      <text x="${tx + (anchor === 'end' ? -14 : 14)}" y="${ty + 8}" text-anchor="${anchor}"
            font-size="${size}" font-weight="700" fill="${C.ink}" letter-spacing=".01em">${label}</text>
    </g>`;
}
