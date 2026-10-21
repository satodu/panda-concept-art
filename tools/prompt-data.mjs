// Style data for each concept. Feeds tools/build-prompts.mjs.
import {readFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tok = (slug) => JSON.parse(readFileSync(join(root, slug, 'tokens', 'tokens.json'), 'utf8')).color;

const O = tok('oriental-brutalismo');
const K = tok('galdr');
const Z = tok('shizuka');

export const styles = {
  'oriental-brutalismo': {
    title: 'ORIENTAL BRUTALISMO',
    master: 'ORIENTAL BRUTALISMO.md',
    primary: {name: 'vermilion red', hex: O.primary, alt: ['amber #F59E0B', 'acid lime-yellow #D4FF00']},
    black: `deep matte obsidian (${O.black})`,
    white: `stark off-white (${O.white})`,
    palette: `deep matte obsidian canvas (${O.black}), dark graphite panels (${O.surface1}), stark off-white (${O.white}), muted technical grays, a single vermilion red accent (${O.primary})`,
    base: `oriental brutalist minimalist aesthetic, Bento grid modules, 1px hairline borders, dot matrix texture, rhythmic '+' registration marks, vertical Japanese tategaki columns, a square Hanko seal with glyphs 間 and 禅, bold monolithic grotesque lettering with a dry terminal period, vast negative space ('Ma'), matte raw concrete and smoked glass, directional studio light`,
    materials: 'matte raw concrete, smoked glass, brushed dark graphite, no plastic, no gloss',
    light: 'single hard directional studio light, soft ambient occlusion, no reflections, no glow',
    ornaments: `dot matrix grid, '+ + + +' sequences, thin wireframe rings, floating hairline planes, one Hanko seal`,
    typo: 'heavy black grotesque (Archivo Black style) uppercase with a trailing period in the accent color, monospace micro tags (JetBrains Mono style), vertical Japanese columns',
    hero: ['a monolithic concrete block', 'a levitating sphere', 'a razor-thin plane', 'a stack of Bento slabs'],
    scene: ['an empty brutalist concrete gallery with one slab of light', 'a dark concrete stairwell with a single beam', 'a monolith in a void'],
    people: {
      portrait: `monochrome duotone portrait (obsidian to off-white), hard directional studio light, neutral focused expression, raw stone texture behind, one small vermilion Hanko accent`,
      character: `a stoic character with sharp geometric styling, dark tailored clothing, graphite and off-white palette, a single vermilion detail, hard side light`,
      small: 'a tiny figure standing in a vast empty concrete space, long hard shadow, monochrome',
      group: 'a group portrait arranged like Bento modules, each person in a rectangular panel, duotone, hard light',
    },
    motion: {camera: 'locked-off static camera, no handheld, occasional hard push-in of 4%', cuts: 'hard cuts and mask wipes from the left, no dissolves, no fades', easing: 'fast out-expo, then stillness', pace: 'staccato, one event per shot', fps: '24 fps', signature: 'a Hanko seal slams onto the frame with a 9-frame camera shake and a 2-frame flash in the accent color'},
    audio: {mood: 'dry, percussive, tense, minimal', instruments: 'wood block, low taiko hit, mechanical clicks, sub bass pulse, no melody', bpm: '90 BPM', avoid: 'melody, strings, reverb tails, risers, cinematic whooshes'},
    grade: {blacks: `crush blacks to blue-black ${O.black}`, whites: `pull whites to warm off-white ${O.white}`, contrast: 'high contrast, hard S-curve', saturation: 'desaturate everything except the single accent', grain: 'no grain', note: 'duotone obsidian-to-off-white, accent only on the Hanko'},
    voice: {tone: 'dry, short, imperative, ends with a period, uppercase titles, no exclamation or emoji', samples: ['SAVE.', 'ERROR. Token expired.', 'NOTHING HERE.', 'Publish.', '404. Page not found.']},
    ui: {layout: 'Bento grid of 12 columns with 24px gap and rounded-2xl cards (20px) on graphite', components: 'pill tags, 12px-radius controls, a single filled accent button, monospace card headers with index numbers (STATUS 01)'},
    icon: {style: '1.5px square-cap stroke, 24px grid, off-white on graphite, one tiny accent square', mark: 'a Japanese glyph (間, 禅, 道, 鉄) in heavy weight inside a rounded plate with a thin ring and a small accent square', shape: 'rounded square plate (10% radius) or circle'},
    negatives: 'neon, cyberpunk glow, gradients, plastic gloss, rainbow colors, cartoon, 3D bevel, drop shadows, warm brown tint, serif fonts, gold, gibberish text',
    ratios: '16:9 for UI/banners, 4:5 for posts and portraits, 1:1 for icons, 9:16 for stories',
    sound: 'tick',
  },

  galdr: {
    title: 'GALDR',
    master: 'GALDR.md',
    primary: {name: 'ice cyan', hex: K.primary, alt: ['jade #7DF9B4', 'amber #FFB86B']},
    black: `near-black (${K.black})`,
    white: `warm paper-white (${K.white})`,
    palette: `near-black canvas (${K.black}), bone-paper editorial panels (${K.bone}) with dark warm text (${K.boneInk}), a single ice-cyan accent (${K.primary}), spectral violet-to-cyan only inside a crystal, when one is present`,
    base: `minimalist primitive Nordic cyberpunk, carved Elder Futhark runes, standing-stone gravity meets cold circuitry, chamfered 45-degree cut corners on panels, targeting-bracket corners with tick rulers, thin circuit traces with square nodes and huge faded runes at 4% opacity in the background of the dark surfaces, warm near-black canvas with no blue, a slowly turning ring of runes around the hero object, frosted translucent layers with inner glow, tall condensed grotesk uppercase display with a trailing period, serif body text, monospace catalog data, faceted, crystalline geometry as a visual LANGUAGE (chamfers, facets, refraction in the light), objects on dark plinths with rim light, a literal crystal appears ONLY when the prompt asks for one, no hard shadows`,
    materials: 'carved bone and weathered basalt, dark matte plinth, frosted glass, polished black lacquer, thin etched silver lines, ice-colored light coming from inside the carvings (faceted crystal with true refraction only if requested)',
    light: 'cold ice-colored rim light, raking light on carved stone, soft inner glow, refraction caustics, no hard drop shadows',
    ornaments: 'thin facet-line polygons, corner brackets with tick rulers, huge faded background runes, a ring of Elder Futhark runes, circuit traces ending in square nodes, leader lines with letters A to F, scale bar, rhombus catalog stamp, a vertical column of real runes',
    typo: 'tall condensed grotesk uppercase (Big Shoulders style) with trailing period, serif body, real Elder Futhark runes as a vertical ruler, monospace catalog data with figure captions like FIG. 01',
    hero: ['a carved basalt standing stone with thin ice-colored circuit lines etched into it', 'a rune-carved bone tablet resting on dark stone', 'a ring of Elder Futhark runes floating above a dark plinth', 'a single small faceted ice-colored shard set into a standing stone'],
    scene: ['a cold stone hall with carved rune pillars and raking light', 'a dark basalt chamber with ice-colored light inside carved runes and thin circuit lines in the walls', 'a fjord-side data shrine at night, ice-colored light'],
    people: {
      portrait: `painterly semi-realistic portrait of a Nordic seer, dark hooded coat with a thin silver rune clasp, calm serious expression, ice-cyan rim light, near-black background, small chamfered frame`,
      character: `a sober seer character, anime-inspired but painterly and restrained, dark hooded coat, holding a small rune tablet that glows faintly ice-colored, carved runes glowing on the stone wall behind`,
      small: 'a seer seen small beside a huge standing stone with glowing carved runes, near-black ambience',
      group: 'a small circle of seers around a plinth with a glowing rune ring, stone hall with runes, painterly',
    },
    motion: {camera: 'slow orbit around the carved stone on its plinth, macro slider moves, a light sweep crossing the carvings, a rune ring turning slowly', cuts: 'diagonal chamfer wipes, thin lines drawing themselves, no jump cuts', easing: 'smooth precise ease (0.3, 0, 0, 1)', pace: 'measured, precise, one reveal at a time', fps: '24 fps', signature: 'a thin bar of primary-colored light scans across the hero object once, then callout lines A to E draw themselves while the ring of runes turns slowly behind it'},
    audio: {mood: 'cold, ritual, precise, luminous', instruments: 'low throat drone, glass harmonics, soft sub, crystal chimes, subtle wind, sparse bowed lyre notes', bpm: '56 BPM', avoid: 'drums, big risers, distortion, upbeat synths'},
    grade: {blacks: `near-black shadows ${K.black}`, whites: `bone highlights ${K.bone}`, contrast: 'medium-high contrast with clean highlights', saturation: 'cool and restrained, color only inside the gems and the ice accent', grain: 'no grain', note: 'cool cyan rim light, spectral violet only inside a crystal if one is present'},
    voice: {tone: 'terse, ritual-technical, factual, short sentences, numbers always with units', samples: ['AMETHYST CLUSTER.', 'FIG. 01 — AMETHYST, FRONT VIEW', 'OK — Shard added to the collection.', 'ERROR — Shard GD-9999 not found.', 'Cluster of prismatic purple quartz crystals.']},
    ui: {layout: '12-column editorial grid with uneven columns (data 3, object 6, article 3), chamfered near-black panels with small corner brackets and a tick ruler on the top edge (no double outline) and bone-paper panels alternating', components: 'rhombus stamps, chamfered buttons, filet-marked active panels, rune ring, Mohs gauge, provenance timeline'},
    icon: {style: '1.5px mitered stroke, 24px grid, bone on ink, faceted geometry and rune strokes', mark: 'a thin ring of runes around one carved rune (isa) with an ice-colored glow, inside a chamfered plate; a small faceted accent may appear, never a full crystal', shape: 'plate with 14% chamfer cut on top-right and bottom-left'},
    negatives: 'a crystal in every image (use one only when asked), red, gold, hard shadows, neon overload, rainbow gradients, glassmorphism blobs, rounded cards, cartoon crystals, flat single-color crystals, Viking cliches (horned helmets, axes, beards), fake runes, gibberish text, prompt words printed on screen',
    ratios: '16:9 for UI/banners, 4:5 for posts and shards, 1:1 for icons, 9:16 for mobile',
    sound: 'glass',
    note: 'The crystal is the CONCEPT (faceted geometry, chamfers, ice light, refraction in the lighting), not a literal object to put in every image. Only include a literal crystal when the prompt itself asks for one. Everywhere else use carved stone, runes, bone tablets, circuit lines and the faceted visual language.',
  },

  shizuka: {
    title: 'SHIZUKA',
    master: 'SHIZUKA.md',
    primary: {name: 'faded red (shu)', hex: Z.primary, alt: ['indigo #2F3F6B', 'moss #6B7A3A']},
    black: `warm sumi black (${Z.black})`,
    white: `aged off-white paper (${Z.white})`,
    palette: `aged washi paper (${Z.canvas}) with fibre grain and darker burnt edges, lighter paper cards (${Z.card}), sumi ink black (${Z.ink}), faded greys, and ONE small faded red kanji (${Z.primary}) printed plainly`,
    base: `wabi-sabi suminagashi interface, aged off-white washi paper with visible fibre and soft stains, a real black sumi ink bloom with wisps and tendrils spreading on wet paper, organic and uneven, never concentric rings, numbers and lines partly rubbed away, slightly crooked hand-drawn lines, a faded red kanji, cards with 40px rounded corners and a 1px hairline, only a tiny contact shadow, NO large blurry shadows, thin light-weight typography, huge empty space, peaceful and quietly uncomfortable, the feeling of time passing`,
    materials: 'aged washi paper, sumi ink on water, faded red ink, rubbed graphite, pale unglazed ceramic',
    light: 'soft flat overcast light on old paper, no hard shadows, slight vignette of age',
    ornaments: 'one real ink bloom with wisps, faint dot grid at 8% opacity, partly erased numerals, one faded red kanji',
    typo: 'ultra-light Inter Tight 200 uppercase with trailing period and wide tracking, lowercase gentle body copy, tiny monospace caps labels, real kanji set in Shippori Mincho',
    hero: ['a black sumi ink bloom with wisps spreading on still water', 'a single sheet of aged washi with a faded red kanji', 'a pale ceramic bowl with a drop of black ink', 'a worn paper ledger with half-erased numbers'],
    scene: ['an empty tatami room at dawn, old paper screens', 'a quiet desk with a single sheet of aged paper and an ink stone', 'a pale plaster wall with water stains and a single scroll'],
    people: {
      portrait: 'a calm person photographed from the side or back, soft overcast light, desaturated neutral clothing, large empty pale room with aged paper walls, very quiet mood',
      character: 'a serene character in simple off-white clothing seated in an empty paper-screen room, anime-inspired but gentle and desaturated, ink wash shading, one faded red kanji mark in the corner',
      small: 'a tiny person in a vast aged-paper space, a single black ink bloom nearby, ultra minimal',
      group: 'two or three people sitting far apart in a pale room, each small, quiet, soft light, an ink bloom on the floor',
    },
    motion: {camera: 'very slow push-in or static, soft focus pulls, ink drifting across the frame', cuts: 'long dissolves and blur-to-sharp reveals, no hard cuts', easing: 'slow ease-in-out', pace: 'breathing rhythm of 6.4 seconds, one tiny event at a time', fps: '24 fps with generous motion blur', signature: 'sumi ink spreads slowly in concentric bands while numerals fade out digit by digit and a faded kanji appears once'},
    audio: {mood: 'calm, spacious, a little lonely, almost silent', instruments: 'soft ambient pad, room tone, distant rain, a single soft chime, felt piano, brush on paper', bpm: '48 BPM', avoid: 'drums, bass drops, sharp transients, bright synths'},
    grade: {blacks: `lift blacks to warm sumi ${Z.black}`, whites: `whites at aged paper ${Z.white}`, contrast: 'low contrast, gentle roll-off', saturation: 'desaturated, only the faded red kanji stays tinted', grain: 'visible paper fibre grain at 5%', note: 'warm yellowed paper cast, vignette like an old document'},
    voice: {tone: 'lowercase, gentle, short, never urgent, no exclamation or emoji, accepts imperfection', samples: ['nothing is perfect. rest anyway.', 'done. rest a little.', 'nothing here. and that is fine.', 'saving slowly…', 'lost, and that is fine.']},
    ui: {layout: 'centered or asymmetric composition with huge empty space, soft paper cards of 340 to 440 px, one ink bloom as anchor', components: 'ink pill buttons, 24px-radius fields, toggles with a faded red knob, thin sliders, half-erased numerals, one faded kanji stamp'},
    icon: {style: '1.25px round-cap stroke, slightly uneven, graphite on aged paper', mark: 'a small black ink bloom with a plain faded red kanji on a very rounded paper square', shape: 'super-rounded square (26% radius)'},
    negatives: 'concentric rings, target-like circles, hanko seals, stamp boxes, large drop shadows, neumorphism, saturated or neon colors, chrome, glossy 3D, emoji, clutter, heavy fonts, perfectly clean flat paper, Y2K distortion, gibberish text, fake kanji, prompt words printed on screen',
    ratios: '16:9 for UI/banners, 4:5 for posts, 1:1 for icons, 9:16 for stories',
    sound: 'chime',
  },
};
