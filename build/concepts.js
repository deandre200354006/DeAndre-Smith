import { C } from './tokens.js';

/* =====================================================================
   THE TEN LOCKED HEADLINES  (Section 3 of the brief — do not edit)
   ===================================================================== */
export const HEADLINES = {
  1:  'Stop making them sit. Let them stand.',
  2:  'Stop correcting the standing. Start supporting it.',
  3:  'You didn’t outgrow bath time. Your tub did.',
  4:  'This turns your shower into a baby bath.',
  5:  'Stop bathing your kid in a bin.',
  6:  'Bathe your baby without getting in the shower.',
  7:  'They get clean. You stay dry.',
  8:  'Baby comes up. Your back stays straight.',
  9:  'Your baby holds the bar. You hold the soap.',
  10: 'Get both hands back.',
};

export const AVATARS = {
  1: 'Sub-Avatar 1 · Shower only',
  2: 'Sub-Avatar 2 · Won’t sit down',
  3: 'Sub-Avatar 3 · Back pain',
};

const EY = {
  2: 'The nightly standing fight',
  1: 'No tub. Just a shower.',
  3: 'Bath night, upright',
};

/* Each concept: headline number, three different CONSTRUCTIONS per headline. */
export const CONCEPTS = [

  /* ---------- #1 · SA2 · Stop making them sit. Let them stand. ------- */
  { h: 1, c: 1, construction: 'beforeafter', layout: 'beforeAfter', avatar: 2,
    lines: ['Stop making them sit.', 'Let them stand.'], size: 76,
    eyebrow: 'Every night, the same argument',
    labelA: 'The nightly fight', labelB: 'Nothing left to argue about',
    beforeArt: 'tub', offer: false,
    note: 'Contrast construction. Parent is present and steadying on the left — never correcting or pushing the child down.' },

  { h: 1, c: 2, construction: 'producthero', layout: 'hero', avatar: 2,
    lines: ['Stop making them sit.', 'Let them stand.'], size: 88,
    eyebrow: EY[2], k: 0.80, gap: 400, offer: 'bar',
    note: 'The permission. Toddler upright and content, parent relaxed and washing — relief, not safety compliance.' },

  { h: 1, c: 3, construction: 'native', layout: 'nativeCandid', avatar: 2,
    lines: ['Stop making them sit.', 'Let them stand.'], size: 60,
    eyebrow: 'Bath night, as it actually goes', offer: false,
    note: 'In-the-moment framing. No invented review, name or rating.' },

  /* ---------- #2 · SA2 · Stop correcting / start supporting ---------- */
  { h: 2, c: 1, construction: 'mechanism', layout: 'mechanism', avatar: 2,
    lines: ['Stop correcting the standing.', 'Start supporting it.'], size: 62,
    eyebrow: 'The hero mechanism', offer: false,
    callouts: [
      { at: [64, 168],  to: [742, 0], label: 'Three-sided chest rail' },
      { at: [336, 168], to: [742, 0], label: 'Textured, anti-pinch grip' },
      { at: [200, 470], to: [742, 0], label: 'Wide triangular base' },
    ],
    note: 'Mechanism diagram. Labels name parts of the object only — no specs, no claims.' },

  { h: 2, c: 2, construction: 'reframe', layout: 'hero', avatar: 2,
    lines: ['Stop correcting the standing.', 'Start supporting it.'], size: 66,
    eyebrow: 'Pulling up is not defiance', k: 0.76, gap: 390, offer: 'line',
    note: 'The most explanatory of the ten. Plain language only — no clinical styling, no age or weight range printed.' },

  { h: 2, c: 3, construction: 'native', layout: 'nativeCandid', avatar: 2,
    lines: ['Stop correcting the standing.', 'Start supporting it.'], size: 54,
    eyebrow: 'They were doing what they are built to do', offer: false,
    note: 'Native framing of the reframe.' },

  /* ---------- #3 · SA2 · You didn’t outgrow bath time ------------ */
  { h: 3, c: 1, construction: 'usvsthem', layout: 'usVsThem', avatar: 2,
    lines: ['You didn’t outgrow bath time.', 'Your tub did.'], size: 72,
    eyebrow: 'The gear expired, not your kid',
    labelA: 'Built for a baby who lies still', labelB: 'Built for one who stands',
    offer: 'bar',
    note: 'Generic unbranded infant-tub silhouette. No competitor logos or packaging.' },

  { h: 3, c: 2, construction: 'beforeafter', layout: 'beforeAfter', avatar: 2,
    lines: ['You didn’t outgrow bath time.', 'Your tub did.'], size: 74,
    eyebrow: 'The second they pulled up, it broke',
    labelA: 'The tub that expired', labelB: 'The stage they are in',
    beforeArt: 'tub', offer: false,
    note: 'Old versus new, plainly.' },

  { h: 3, c: 3, construction: 'typographic', layout: 'typographic', avatar: 2,
    lines: ['You didn’t', 'outgrow bath time.', 'Your tub did.'], size: 110,
    eyebrow: 'Reassign the blame', bg: C.ink, fg: C.cream, art: 'frame',
    artX: 620, artK: 0.52, artBottom: 132,
    blobColor: C.terra, blobOpacity: 0.2, offer: 'bar',
    note: 'Type-led reading of the same two-clause contrast.' },

  /* ---------- #4 · SA1 · This turns your shower into a baby bath ----- */
  { h: 4, c: 1, construction: 'producthero', layout: 'hero', avatar: 1,
    lines: ['This turns your shower', 'into a baby bath.'], size: 84,
    eyebrow: EY[1], stall: true, k: 0.78, gap: 400, offer: 'bar',
    note: 'Environment first. Unmistakable walk-in shower. NO bathtub anywhere in frame.' },

  { h: 4, c: 2, construction: 'avatarcallout', layout: 'avatarCallout', avatar: 1,
    lines: ['This turns your shower', 'into a baby bath.'], size: 72,
    callOut: 'There is no tub in the whole apartment — just a shower stall and a mobile baby.',
    stall: true, offer: 'bar',
    note: 'Names the situation before naming the product. No bathtub in frame.' },

  { h: 4, c: 3, construction: 'native', layout: 'nativeCandid', avatar: 1,
    lines: ['This turns your shower', 'into a baby bath.'], size: 58,
    eyebrow: 'Shower-only bathroom', stall: true, offer: false,
    note: 'Candid in-the-stall framing. No bathtub anywhere.' },

  /* ---------- #5 · SA1 · Stop bathing your kid in a bin -------------- */
  { h: 5, c: 1, construction: 'beforeafter', layout: 'beforeAfter', avatar: 1,
    lines: ['Stop bathing', 'your kid in a bin.'], size: 84,
    eyebrow: 'The plastic container era ends here',
    labelA: 'The improvisation', labelB: 'The actual product',
    beforeArt: 'bin', offer: 'bar',
    note: 'The bin is the hero of the before. Punches at the situation, never at the parent.' },

  { h: 5, c: 2, construction: 'avatarcallout', layout: 'avatarCallout', avatar: 1,
    lines: ['Stop bathing your kid in a bin.'], size: 68,
    callOut: 'The storage tote. The inflatable pool. The kitchen sink you have seriously considered.',
    stall: false, offer: 'bar',
    note: 'Recognition, not shame. Nothing that reads as judging a family for improvising.' },

  { h: 5, c: 3, construction: 'typographic', layout: 'typographic', avatar: 1,
    lines: ['Stop bathing', 'your kid', 'in a bin.'], size: 150,
    eyebrow: 'Sharpest headline in the set', bg: C.terra, fg: '#FFFFFF',
    blob: false, art: 'frame', ghost: true, artX: 640, artK: 0.62, eyeColor: '#FFE2CD', offer: false,
    note: 'High contrast, minimal, confident — art direction matched to the tone of the line.' },

  /* ---------- #6 · SA1 · Bathe your baby without getting in ---------- */
  { h: 6, c: 1, construction: 'producthero', layout: 'stallDivide', avatar: 1,
    lines: ['Bathe your baby without', 'getting in the shower.'], size: 74,
    eyebrow: 'Off the wet tile', offer: 'bar',
    note: 'Spatial relationship is the message: child inside, parent outside — dressed, dry, upright, within arm’s reach.' },

  { h: 6, c: 2, construction: 'mechanism', layout: 'mechanism', avatar: 1,
    lines: ['Bathe your baby without', 'getting in the shower.'], size: 58,
    eyebrow: 'What the frame is holding', offer: false,
    callouts: [
      { at: [352, 128], to: [742, 0], label: 'Shower wand dock' },
      { at: [64, 168],  to: [742, 0], label: 'Child holds the rail' },
      { at: [200, 470], to: [742, 0], label: 'Stands in the shower pan' },
    ],
    note: 'The docked wand is the supporting proof for the dry-parent promise.' },

  { h: 6, c: 3, construction: 'native', layout: 'stallDivide', avatar: 1,
    lines: ['Bathe your baby without', 'getting in the shower.'], size: 54,
    eyebrow: 'Fully dressed, still dry', native: true, offer: false,
    note: 'Parent stays visibly present and within reach — never framed as leaving the room.' },

  /* ---------- #7 · SA1 · They get clean. You stay dry. --------------- */
  /* Brief: brevity is the asset. No sub-headline, no feature list, no offer. */
  { h: 7, c: 1, construction: 'typographic', layout: 'splitDuo', avatar: 1,
    lines: ['They get clean.', 'You stay dry.'], size: 92,
    offer: false,
    note: 'Clean two-panel split: child and water on one side, dry parent on the other.' },

  { h: 7, c: 2, construction: 'typographic', layout: 'typographic', avatar: 1,
    lines: ['They get clean.', 'You stay dry.'], size: 168,
    eyebrow: '', bg: C.teal, fg: '#FFFFFF', art: 'frame', ghost: true,
    artX: 620, artK: 0.66, blob: false, gapTop: 8, top: 96, offer: false,
    note: 'Shortest headline in the set carrying the boldest type. Deliberately uncluttered.' },

  { h: 7, c: 3, construction: 'producthero', layout: 'hero', avatar: 1,
    lines: ['They get clean.', 'You stay dry.'], size: 104,
    eyebrow: '', stall: true, k: 0.78, gap: 430, offer: false,
    note: 'Simplest photographic-style read of the split. No feature list.' },

  /* ---------- #8 · SA3 · Baby comes up. Your back stays straight. ---- */
  { h: 8, c: 1, construction: 'beforeafter', layout: 'posture', avatar: 3,
    lines: ['Baby comes up.', 'Your back stays straight.'], size: 78,
    eyebrow: 'It is the angle, not the weight',
    labelA: 'Folded over the rim', labelB: 'Standing up straight',
    offer: false,
    note: 'Posture in silhouette. No anatomical labels, no clinical chart, no medical claim.' },

  { h: 8, c: 2, construction: 'mechanism', layout: 'mechanism', avatar: 3,
    lines: ['Baby comes up.', 'Your back stays straight.'], size: 64,
    eyebrow: 'Height is the variable', offer: false,
    callouts: [
      { at: [200, 250], to: [742, 0], label: 'Post raises the child' },
      { at: [64, 168],  to: [742, 0], label: 'Rail meets them at chest height' },
      { at: [200, 470], to: [742, 0], label: 'Base sits in the tub or pan' },
    ],
    note: 'Shows the change in level. Describes the object; diagnoses nothing.' },

  { h: 8, c: 3, construction: 'producthero', layout: 'hero', avatar: 3,
    lines: ['Baby comes up.', 'Your back stays straight.'], size: 80,
    eyebrow: EY[3], k: 0.80, gap: 400, offer: 'bar',
    note: 'Upright parent, raised child, one clean read.' },

  /* ---------- #9 · SA3 · Your baby holds the bar. You hold the soap. - */
  { h: 9, c: 1, construction: 'mechanism', layout: 'mechanism', avatar: 3,
    lines: ['Your baby holds the bar.', 'You hold the soap.'], size: 62,
    eyebrow: 'The hero mechanism',
    support: 'The frame encloses the child on three sides at chest height. They steady themselves by holding on — the same way you would on a rail.',
    offer: false,
    callouts: [
      { at: [64, 168],  to: [742, 0], label: 'Palm grip, three sides' },
      { at: [336, 168], to: [742, 0], label: 'Textured handrail' },
      { at: [200, 470], to: [742, 0], label: 'Multi-point friction pads' },
    ],
    note: 'Best candidate in the set for a mechanism-diagram treatment.' },

  { h: 9, c: 2, construction: 'hands', layout: 'hands', avatar: 3,
    lines: ['Your baby holds the bar.', 'You hold the soap.'], size: 70,
    eyebrow: 'Two subjects, two jobs', offer: false,
    note: 'Hands-led composition. Parent’s hands stay in frame and busy washing — never off the child and out of frame.' },

  { h: 9, c: 3, construction: 'native', layout: 'nativeCandid', avatar: 3,
    lines: ['Your baby holds the bar.', 'You hold the soap.'], size: 56,
    eyebrow: 'Both arms, back where they belong', offer: false,
    note: 'Candid framing of the role split.' },

  /* ---------- #10 · SA3 · Get both hands back. ---------------------- */
  { h: 10, c: 1, construction: 'typographic', layout: 'typographic', avatar: 3,
    lines: ['Get both', 'hands back.'], size: 186,
    eyebrow: 'The three-hand problem', bg: C.ink, fg: C.cream, art: 'frame',
    artX: 610, artK: 0.58, artBottom: 30, blobColor: C.terra, blobOpacity: 0.18, top: 90, offer: false,
    note: 'Four words, enormous type, extremely simple image.' },

  { h: 10, c: 2, construction: 'numeric', layout: 'numeric', avatar: 3,
    lines: ['Get both', 'hands back.'], size: 116,
    eyebrow: 'Two hands. Three jobs.', offer: false,
    note: 'Counting treatment — two hands, three jobs, the missing hand.' },

  { h: 10, c: 3, construction: 'producthero', layout: 'hero', avatar: 3,
    lines: ['Get both hands back.'], size: 100,
    eyebrow: 'Both hands free to wash', k: 0.80, gap: 400, offer: 'bar',
    note: 'Hands free TO WASH — the adult is present, close and attending in every frame.' },
];

/* File naming per the brief: upsy_h[01-10]_c[1-3]_[construction].png */
export const fileFor = (c) =>
  `upsy_h${String(c.h).padStart(2, '0')}_c${c.c}_${c.construction}.png`;
