# 07. Prompts for image generators

Prefix `/imagine prompt:` (Midjourney). In Flux, DALL-E or Gemini, remove the prefix and the `--ar` parameters, and ask for the format in the sentence.

## Variables

1. Subject in `[BRACKETS]`.
2. Main color: swap `#980281` for another hex (`#F59E0B` amber, `#D4FF00` acid) if you want a variation. The original concept asks for magenta.

## Base (paste at the end of any prompt)

`oriental brutalist minimalist aesthetic, deep matte obsidian (#090a0f), dark graphite panels (#14171f), stark off-white (#dedfd7), single magenta accent (#980281), 1px hairlines, dot matrix, '+' registration marks, vertical Japanese tategaki, Hanko seal, vast negative space ('Ma'), matte concrete and smoked glass, directional studio light, no plastic reflections, no neon`

## 01. System UI

`/imagine prompt: High-end modern UI design concept for [DESCRIBE THE APP], oriental brutalist minimalist aesthetic. Clean modular Bento Grid with translucent dark panels (#14171f), ultrafine 1px hairline borders, generous negative space ('Ma'). Deep obsidian background (#090a0f), crisp text (#dedfd7), muted technical grays, precise accents in magenta (#980281). Bold grotesque headers with dry terminal periods, vertical Japanese tategaki columns, monospace data tags, '+' registration marks, dot matrix grid, rectangular Hanko seal badges. Figma UI showcase --ar 16:9`

## 02. Background

`/imagine prompt: Minimalist abstract backdrop, oriental brutalist editorial style. Deep obsidian canvas (#090a0f), subtle tonal panels (#14171f), thin 1px wireframe planes, dot matrix patterns, faint '+ + + +' sequences, levitating matte slate Bento blocks, vertical Japanese typography columns, a magenta Hanko seal (#980281). Vast negative space, ultra clean --ar 16:9`

## 03. Icon / badge

`/imagine prompt: Graphic design icon badge featuring [OBJECT], isolated on deep matte black (#090a0f). Oriental brutalist minimalist identity. Bento frame, bold geometric silhouette, 1px wireframe rings, dot matrix, integrated Hanko seal in magenta (#980281). Dark graphite (#14171f), stark white (#dedfd7). Sharp edges, high contrast vector asset --ar 1:1`

## 04. Editorial portrait

`/imagine prompt: Metaphysical surreal portrait of [PERSON/ACTION], contemporary editorial collage. The portrait is deconstructed into floating architectural slices and Bento modules (#14171f) on deep matte black (#090a0f). Stark white line elements, raw stone texture, vertical kanji tategaki, dot matrix overlays, '+' crosshairs, magenta Hanko accent (#980281). Dramatic tactile lighting --ar 4:5`

## 05. Layout frame

`/imagine prompt: Minimalist editorial layout frame, oriental brutalist. Center is open dark negative space (#090a0f). Peripheral dark graphite panels, 1px hairlines, floating wireframe circles, '+' sequences, dot matrix, vertical tategaki along borders, a small Hanko seal (#980281). Template for overlaying content --ar 16:9`

## 06. Banner with title

`/imagine prompt: Bold editorial banner with title "[TITLE].". Oriental brutalist composition. Monolithic grotesque lettering with a prominent dry terminal period, fine vertical Japanese columns, Bento paneling (#14171f), dot matrix, '+' marks, magenta Hanko badge (#980281) --ar 16:9`

## 07. Banner without text

`/imagine prompt: Abstract hero banner, oriental brutalist, free of readable text. Floating monoliths, levitating spheres, razor-sharp planes in anti-gravity. Obsidian (#090a0f), graphite modules (#14171f), matte white accents (#dedfd7), hairlines, dot matrix, a single magenta Hanko slice (#980281). Vast negative space --ar 16:9`

## 08. Software architecture

`/imagine prompt: Abstract technical architecture of [CONCEPT], oriental brutalist. Bento floating cubes (#14171f) connected by 1px circuits and data nodes. Obsidian background (#090a0f), white text with dry periods, vertical Japanese metadata tags, active pulses in magenta (#980281), HUD '+' marks --ar 16:9`

## 09. Terminal / code

`/imagine prompt: Floating terminal window, oriental brutalist editorial. Dark glass Bento panel (#14171f), crisp 1px borders over an obsidian void (#090a0f). Code in magenta (#980281) and white (#dedfd7), vertical Japanese metadata columns, dot matrix, '+' marks, magenta Hanko badges --ar 16:9`

## Useful negatives

`no neon, no cyberpunk glow, no gradients, no plastic gloss, no rainbow, no cartoon, no 3D bevel, no stock-photo faces, no gibberish text`

## Text in AI images

Models get letters wrong. Make the art without text (PROMPT 07) and compose the text with the script (`tools/make-asset.mjs`) or Remotion.
