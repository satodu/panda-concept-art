# 07. Prompts for image generators

Base colors: ink `#0C0C0B`, bone `#E9E4D6`, ice `#8FF3FF`, violet `#8B5CF6` only inside the crystal.

> The crystal is the concept, not a literal object: add one only when the image needs it (prompts 01–05 style hero shots). Everything else uses carved stone, runes, bone tablets and circuit lines in the faceted visual language.

## Base (paste at the end of any prompt)

`primitive Nordic cyberpunk, minimal, serious editorial rune-archive UI, near-black canvas (#0C0C0B), bone-paper editorial panels (#E9E4D6), single ice-cyan accent (#8FF3FF), spectral violet only inside gems, chamfered 45-degree cut corners, hairline rules, frosted translucent layers with inner glow, no hard shadows, no red, tall condensed grotesk display with trailing period, serif body, carved Elder Futhark runes, thin circuit lines and rune rings, monospace catalog data, realistic physical crystals with rim light`

## Rule against text leaking

Write in the prompt: `every visible word must be real content; never show design-system labels, hex codes, or words like 'chamfered' or 'bone-paper' on screen`. Without it the model prints the prompt on the interface.

## 01. Full UI (desktop)

`Complete desktop app UI named GALDR. Left rail nav; big hero shard (realistic faceted crystal) on a dark plinth with rim lighting; editorial column in bone paper with headline, two-paragraph article, caption, figure number, scale bar and Mohs hardness gauge; collection grid of 6 shards with catalog numbers; spectral analysis line chart; small seer portrait card. Magazine grid, crisp readable text. [BASE] --ar 16:9`

## 02. Shard page

`Shard detail page designed like a carved runestone plate. Huge realistic faceted crystal with refraction and rim light on a dark plinth, thin leader lines labeling facets A to F, scale bar, dimension callouts. Left monospace data table (catalog GD-0417, locality, hardness, refractive index, density). Right editorial serif article with a pull quote and a vertical rune column and vertical rune column. Bottom provenance timeline. [BASE] --ar 16:9`

## 03. Key art / event (serious waifu)

`Premium event key art, restrained and serious. A seer woman in a dark hooded coat with a thin silver rune clasp holds a heavy faceted crystal, physically lit with rim light and refraction, standing in a stone hall with carved runes. Chamfered bone-paper caption panels, catalog number, vertical Elder Futhark rune column, ice-cyan facet stamp, tier rows as shard cards. No neon overload, editorial composition. [BASE] --ar 16:9`

Result reference: `reference/crystal-waifu-v2-valorant.png` (version with an event-pass UI, more "game"; the prompt above is the more serious version).

## 04. Mobile

`Three phone mockups side by side: home with hero crystal; shard detail with leader lines and Mohs gauge, a bone-paper chamfered sheet overlapping the dark hero; seer profile with timeline. Real content only. [BASE] --ar 16:9`

Approved result: `reference/galdr-mobile-shard-b.png`.

## 05. Isolated crystal (photorealistic)

`Studio photograph of a [AMETHYST CLUSTER / CLEAR QUARTZ / FLUORITE] shard on a dark matte plinth, directional rim light, hard specular highlights, refraction caustics, cold stone hall, shallow depth of field, near-black background (#0C0C0B) --ar 4:5`

## 06. App icon

`App icon: a faceted double-terminated crystal with ice-cyan halo on a chamfered near-black plate, hairline inner border, no text --ar 1:1`

## 07. Background

`Abstract backdrop: faint wireframe facet polygons, soft ice-cyan halo, dark plinth, huge negative space, near-black gradient, no text --ar 16:9`

## 08. Banner with title

`Editorial banner with title "[TITLE].". Crystal right, condensed uppercase title left, mono caption line, ice rhombus stamp, hairline footer. [BASE] --ar 3:1`

## Negatives

`no neon overload, no rainbow gradients, no red, no gold, no glassmorphism blobs, no rounded cards, no cartoon, no gibberish text`
