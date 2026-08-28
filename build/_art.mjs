import { shell } from './shell.js'; import { shoot } from './render.mjs';
import * as A from './art.js'; import { C } from './tokens.js';
const body = `<svg width="1080" height="1080" viewBox="0 0 1080 1080">
<rect width="1080" height="1080" fill="${C.cream}"/>
<g transform="translate(40,120) scale(1.5)">${A.upsy({wand:true})}</g>
<g transform="translate(600,120) scale(1.5)">${A.upsyWithChild({wand:true})}</g>
</svg>`;
await shoot([{file:'prod.png', html: shell(body)}], '/tmp/claude-0/-home-user-DeAndre-Smith/f65e40de-8f9b-59aa-acf7-db300e182a48/scratchpad');
