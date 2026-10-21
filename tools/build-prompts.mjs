#!/usr/bin/env node
// Generates <concept>/PROMPTS.md: the full prompt library (image, icon, banner, people,
// image editing, video, video editing, audio, text and code) from tools/prompt-data.mjs.
//   node tools/build-prompts.mjs
import {writeFileSync} from 'node:fs';
import {join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {styles} from './prompt-data.mjs';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

const build = (slug, s) => {
  const P = `${s.primary.name} (${s.primary.hex})`;
  const BASE = `${s.palette}. ${s.base}.`;
  const NEG = s.negatives;
  const px = s.people;
  const noText = 'no readable text, no letters, no logos';
  const real = `Every visible word must be real content. Never print design-system labels, hex codes or style words on screen.`;

  /** @type {{id:string,title:string,intro:string,items:{t:string,u:string,p:string,n?:string}[]}[]} */
  const sections = [
    {
      id: 'A', title: 'IMAGES WITHOUT PEOPLE', intro: 'Interfaces, backgrounds, objects, environments and graphic pieces.',
      items: [
        {t: 'Desktop UI (dashboard/app)', u: 'full system screen', p: `High-end desktop app UI design for [DESCRIBE THE APP]. ${BASE} ${s.ui.layout}. ${s.ui.components}. Crisp readable text, Figma showcase. ${real} --ar 16:9`},
        {t: 'Mobile UI (3 screens)', u: 'three phones side by side', p: `Three phone mockups side by side showing [HOME, DETAIL, PROFILE] for [APP]. ${BASE} ${s.ui.components}. Real content only. ${real} --ar 16:9`},
        {t: 'Landing page hero', u: 'top of a website', p: `Landing page hero section for [PRODUCT]: huge headline "[TITLE]." with a trailing period, one subline, one primary button, one hero visual (${s.hero[0]}). ${BASE} Browser frame not shown. ${real} --ar 16:9`},
        {t: 'Component sheet', u: 'buttons, fields, tags, toggles, toasts', p: `UI component sheet on one canvas: buttons (default, hover, disabled, primary), text fields (default, focus, error), tags, toggle, slider, tabs, table rows, toast, modal. ${BASE} Organized in a clean grid with small mono captions. ${real} --ar 16:9`},
        {t: 'Design system poster (tokens board)', u: 'board with colors, typography and components', p: `Design system poster: color swatches with hex values, typography shard, spacing scale, radius samples, iconography row, and 6 components. ${BASE} Editorial layout, accent ${P} used once. --ar 4:5`},
        {t: 'Desktop wallpaper', u: '4K wallpaper', p: `Minimal desktop wallpaper. ${BASE} Hero element: ${s.hero[1]}. At least 55% empty space. ${noText}. --ar 16:9`},
        {t: 'Mobile wallpaper', u: 'phone wallpaper', p: `Minimal phone wallpaper with safe space for clock and icons. ${BASE} Hero element placed at 38% height: ${s.hero[0]}. ${noText}. --ar 9:19`},
        {t: 'Section background', u: 'site/slide background', p: `Abstract section background. ${BASE} ${s.ornaments}. Very low contrast so text stays readable on top. ${noText}. --ar 16:9`},
        {t: 'Seamless pattern / texture', u: 'seamless pattern', p: `Seamless tileable pattern. ${s.palette}. Elements: ${s.ornaments}. Flat vector, regular rhythm, low contrast, ${noText}. --tile`},
        {t: 'Hero object (render)', u: 'central object for a hero', p: `Studio render of ${s.hero[0]} as the single hero object. Materials: ${s.materials}. Lighting: ${s.light}. ${s.palette}. Centered with huge negative space. ${noText}. --ar 4:5`},
        {t: 'Object variations', u: 'explore the hero object', p: `Four variations of the hero object in a 2x2 grid: ${s.hero.join('; ')}. Same lighting and background, ${s.materials}. ${s.palette}. ${noText}. --ar 1:1`},
        {t: 'Product/device mockup', u: 'app inside a device', p: `A laptop and a phone on a minimal surface displaying [APP UI]. ${BASE} Soft realistic placement, ${s.light}. ${real} --ar 16:9`},
        {t: 'Terminal / code', u: 'floating terminal window', p: `Floating terminal window with syntax-highlighted code. ${BASE} Accent ${P} for keywords only. Real code lines, no gibberish. --ar 16:9`},
        {t: 'Architecture diagram', u: 'microservices, cloud, data', p: `Abstract technical architecture of [CONCEPT] as modular nodes connected by thin lines, active path highlighted in ${P}. ${BASE} Labels short and real. --ar 16:9`},
        {t: 'Infographic / data visualization', u: 'editorial chart', p: `Editorial data visualization about [TOPIC] with one highlighted series in ${P}, thin axes, mono captions, one large number. ${BASE} ${real} --ar 4:5`},
        {t: 'Abstract 3D scene', u: 'abstract hero', p: `Abstract 3D scene: ${s.hero.slice(0, 3).join(', ')} arranged in anti-gravity balance. ${s.materials}. ${s.light}. ${s.palette}. ${noText}. --ar 16:9`},
        {t: 'Environment / architecture', u: 'atmospheric empty space', p: `${s.scene[0]}. ${s.light}. ${s.palette}. Photorealistic, wide, symmetrical, ${noText}. --ar 16:9`},
        {t: 'Still-life photograph', u: 'object photo', p: `Still-life photograph of ${s.hero[2]} on a plain surface. ${s.light}. ${s.palette}. Shallow depth of field, ${noText}. --ar 4:5`},
        {t: 'Poster', u: 'A3 poster', p: `Poster for [EVENT/PRODUCT] with title "[TITLE]." in huge display type, one hero visual (${s.hero[3]}), small caption lines. ${BASE} --ar 2:3`},
        {t: 'Book/report cover', u: 'editorial cover', p: `Book or report cover titled "[TITLE]." with subtitle "[SUBTITLE]". ${BASE} Strong typographic hierarchy, one image area. --ar 2:3`},
        {t: 'Packaging / label', u: 'product label', p: `Packaging label design for [PRODUCT]: wordmark, small data block, one icon. ${BASE} Flat print-ready look. --ar 1:1`},
        {t: 'Title slide', u: 'presentation opener', p: `Presentation title slide: "[TITLE]." large, one line subtitle, small footer with date. ${BASE} --ar 16:9`},
        {t: 'Content slide', u: 'slide with data', p: `Presentation content slide with one headline, three short bullets, and one chart. ${BASE} ${real} --ar 16:9`},
      ],
    },
    {
      id: 'B', title: 'ICONS, BADGES AND BRAND', intro: 'App icons, sets, badges, logos and stickers.',
      items: [
        {t: 'App icon', u: '1024 icon', p: `App icon: ${s.icon.mark}. Shape: ${s.icon.shape}. ${s.palette}. Centered, flat vector clarity, subtle depth only if the style allows, ${noText}. --ar 1:1`},
        {t: '4x4 icon set', u: '16 coherent UI icons', p: `A 4x4 grid of 16 UI icons (home, search, settings, user, chart, file, folder, bell, lock, calendar, mail, download, upload, trash, edit, star). Style: ${s.icon.style}. ${s.palette}. Uniform stroke, same optical size, generous padding, ${noText}. --ar 1:1`},
        {t: 'Project badge', u: 'badge for README/site', p: `Circular or rectangular project badge with the word "[WORD]." and a small emblem. ${s.base}. ${s.palette}. Flat vector, high contrast. --ar 1:1`},
        {t: 'Sticker pack', u: '6 stickers', p: `Sticker sheet with 6 stickers: a seal, a tag, an arrow, a dot, a small crest, a caption bubble. ${s.base}. ${s.palette}. White-less die-cut look on the concept canvas, ${noText}. --ar 1:1`},
        {t: 'Logo mark exploration', u: '9 brand variations', p: `A 3x3 grid exploring logo marks for "[NAME]". Concept: ${s.icon.mark}. ${s.palette}. Flat vector, monochrome with one accent, ${noText}. --ar 1:1`},
        {t: 'Wordmark', u: 'typographic logotype', p: `Wordmark "[NAME]." set in ${s.typo}. Accent ${P} only on the period. Clean spacing, on the concept canvas. --ar 3:1`},
        {t: 'Favicon / micro icon', u: 'readable at 16px', p: `Favicon concept readable at 16 pixels: ${s.icon.mark}, simplified to two shapes. ${s.palette}. --ar 1:1`},
        {t: 'Brand avatar', u: 'company profile picture', p: `Circular brand avatar: ${s.icon.mark}. ${s.palette}. Strong silhouette at small size. --ar 1:1`},
        {t: 'Medal / achievement', u: 'achievement', p: `Achievement medal "[ACHIEVEMENT NAME]" with five tiers shown in a row, tiers differ by shape complexity, not by color. ${s.base}. ${s.palette}. --ar 3:1`},
        {t: 'Category pictograms', u: 'category icons', p: `Set of 8 category pictograms for [CATEGORIES]. Style: ${s.icon.style}. ${s.palette}. ${noText}. --ar 2:1`},
        {t: 'Reactions / concept emojis', u: 'chat reactions', p: `Set of 8 reaction icons (ok, wow, think, heart, laugh, sad, fire, quiet) in the concept style: ${s.icon.style}. No faces with color, ${s.palette}. --ar 2:1`},
        {t: '3D/hero icon for landing', u: 'large illustrative icon', p: `Large hero icon for [FEATURE]: ${s.hero[0]} rendered with ${s.materials}. ${s.light}. ${s.palette}. ${noText}. --ar 1:1`},
      ],
    },
    {
      id: 'C', title: 'BANNERS AND GRAPHIC PIECES', intro: 'Covers and headers per platform. For exact text, generate without text and compose with the script (`tools/make-asset.mjs`).',
      items: [
        {t: 'Banner with title', u: 'cover with text', p: `Wide banner with the title "[TITLE]." in ${s.typo}. ${BASE} One hero element, one caption line. The title must read exactly as written. --ar 3:1`},
        {t: 'Banner without text', u: 'pure art that receives text from code', p: `Abstract hero banner with ${s.hero[0]} on the right third, left two thirds empty for text. ${BASE} ${noText}. --ar 3:1`},
        {t: 'X/Twitter header', u: '1500×500', p: `Social header 3:1. Title area on the left, hero on the right, avatar safe zone bottom-left empty. ${BASE} --ar 3:1`},
        {t: 'LinkedIn cover', u: '1584×396', p: `LinkedIn cover, very wide 4:1. Text area on the right of the avatar zone, one subtle hero element. ${BASE} --ar 4:1`},
        {t: 'YouTube thumbnail', u: '1280×720', p: `YouTube thumbnail: huge title "[SHORT TITLE]" (max 3 words), one hero visual, strong contrast, ${P} used on one word only. ${BASE} --ar 16:9`},
        {t: 'YouTube channel banner', u: '2560×1440 with safe area', p: `YouTube channel banner with a central safe area 1546x423: logo and tagline inside, ornaments only outside. ${BASE} --ar 16:9`},
        {t: 'README / GitHub header', u: '1280×640', p: `GitHub repository social preview: project name "[NAME]." large, one-line description, stack tags. ${BASE} --ar 2:1`},
        {t: 'Open Graph / link preview', u: '1200×630', p: `Open Graph image for an article titled "[TITLE]." with the site wordmark small in a corner. ${BASE} --ar 1.91:1`},
        {t: 'Newsletter header', u: 'email top', p: `Newsletter header 600x200: issue number [#07], title "[NEWSLETTER NAME].", small tagline. ${BASE} --ar 3:1`},
        {t: 'Carousel: cover', u: 'carousel slide 1', p: `Carousel cover 4:5: huge hook "[HOOK]." and a "swipe" hint as a small mono caption. ${BASE}`},
        {t: 'Carousel: inner slide', u: 'slides 2 to N', p: `Carousel inner slide 4:5: one number, one sentence, one small icon. Consistent margins. ${BASE}`},
        {t: 'Story / reels cover', u: '1080×1920', p: `Vertical story cover: title "[TITLE]." in the middle safe zone, top and bottom 250px empty. ${BASE} --ar 9:16`},
        {t: 'Podcast cover', u: '3000×3000', p: `Podcast cover: show name "[NAME]." large, episode tag small, one iconic hero element. ${BASE} Readable at 100px. --ar 1:1`},
        {t: 'Album / playlist cover', u: 'music art', p: `Album art for "[TITLE]": ${s.hero[1]} as the only subject, tiny typographic credit line. ${BASE} --ar 1:1`},
        {t: 'Event poster / ticket', u: 'event', p: `Event poster and matching ticket for "[EVENT]" on [DATE]. Big title with period, hero visual, data block in mono. ${BASE} --ar 2:3`},
        {t: 'Email signature', u: 'small banner', p: `Email signature banner 600x120: wordmark, one line contact, thin hairline, tiny icon. ${BASE} --ar 5:1`},
        {t: 'Stream overlay', u: 'Twitch/YouTube live', p: `Streaming overlay set: webcam frame, alert box, lower third, "starting soon" screen. ${BASE} Transparent-friendly layout, real labels. --ar 16:9`},
      ],
    },
    {
      id: 'D', title: 'IMAGES WITH PEOPLE', intro: 'Always use fictional people. Never ask for the likeness of a real person or a celebrity.',
      items: [
        {t: 'Professional portrait', u: 'profile / team photo', p: `Professional headshot of [FICTIONAL PERSON DESCRIPTION]. ${px.portrait}. ${s.palette}. Sharp eyes, natural skin texture, ${noText}. --ar 4:5`},
        {t: 'Editorial portrait / collage', u: 'conceptual cover', p: `Editorial surreal portrait of [PERSON/ACTION]. ${px.portrait}. Deconstructed into floating modules with ${s.ornaments}. ${BASE} --ar 4:5`},
        {t: '"About me" header', u: 'personal banner', p: `Wide "about me" header: a person on the right third, left two thirds empty for text. ${px.portrait}. ${BASE} ${noText}. --ar 3:1`},
        {t: 'Character (key art)', u: 'character illustration', p: `Key art of ${px.character}. ${BASE} Cinematic but restrained composition, full figure, ${noText}. --ar 16:9`},
        {t: 'Character sheet', u: 'turnaround + expressions', p: `Character sheet for ${px.character}: front, side and back views plus six expressions, consistent proportions, neutral background, small mono labels with real words. --ar 16:9`},
        {t: 'Team / group', u: 'team photo', p: `${px.group}. ${s.light}. ${s.palette}. Natural poses, distinct faces, ${noText}. --ar 16:9`},
        {t: 'Person using the product', u: 'lifestyle', p: `A person using [PRODUCT/APP] on a laptop, shown from behind or at a three-quarter angle. ${px.small}. ${s.light}. ${s.palette}. --ar 3:2`},
        {t: 'Hand + object (detail)', u: 'hand close-up', p: `Close-up of a hand holding ${s.hero[0]}. Natural hand anatomy with five fingers, ${s.materials}, ${s.light}. ${s.palette}. ${noText}. --ar 4:5`},
        {t: 'Small figure in the scene', u: 'scale and silence', p: `${px.small}. ${s.scene[1]}. ${s.palette}. Wide frame, ${noText}. --ar 16:9`},
        {t: 'Illustrated profile avatar', u: 'user avatar', p: `Illustrated profile avatar bust of a fictional [CHARACTER]. ${px.character}. Centered, plain concept background, ${noText}. --ar 1:1`},
        {t: 'Event cover with character', u: 'event key art', p: `Event key art with ${px.character}, a hero object (${s.hero[0]}) and a title area. ${BASE} Premium, serious, ${noText}. --ar 16:9`},
        {t: 'Fashion editorial / lookbook', u: 'wardrobe', p: `Lookbook photograph of a fictional model in [WARDROBE]. ${s.light}. ${s.palette}. Minimal set, strong silhouette, ${noText}. --ar 4:5`},
        {t: 'Testimonial (customer)', u: 'testimonial card', p: `Testimonial card: portrait of a fictional customer, a short quote in real words, name and role in mono. ${BASE} --ar 4:5`},
      ],
    },
    {
      id: 'E', title: 'IMAGE EDITING (WITH AN INPUT IMAGE)', intro: 'Attach the image and paste the prompt. Works in Gemini, ChatGPT (image), Flux Kontext, Photoshop Generative Fill and similar. In PhotoCraft use the equivalent commands (`command_list`).',
      items: [
        {t: 'Full restyle', u: 'bring a photo/art into the concept', p: `Edit this image: restyle it fully into the concept while keeping the composition and subject. Apply ${s.palette}. Materials: ${s.materials}. Lighting: ${s.light}. Add ${s.ornaments} sparingly. Do not change faces or proportions.`},
        {t: 'Palette color grade', u: 'color only', p: `Edit this image: color grade only. ${s.grade.blacks}; ${s.grade.whites}; ${s.grade.contrast}; ${s.grade.saturation}; ${s.grade.grain}. Keep content unchanged.`},
        {t: 'Concept duotone', u: 'duotone', p: `Convert this image to a duotone from ${s.black} to ${s.white}, keeping detail. Keep ${P} only on one small element if one exists.`},
        {t: 'Remove and replace background', u: 'cutout', p: `Edit this image: remove the background cleanly and place the subject on a plain concept background (${s.black}) with ${s.light}. Match edge lighting to the new background. Keep hair and edges natural.`},
        {t: 'Add ornaments', u: 'brand overlays', p: `Edit this image: add ${s.ornaments} as subtle overlays, aligned to the grid, at low opacity, without covering the subject.`},
        {t: 'Extend (outpaint) to banner', u: 'turn it into 3:1', p: `Extend this image to a 3:1 banner by outpainting to the left, keeping the subject on the right third and filling the left with clean negative space in the concept style (${s.palette}).`},
        {t: 'Upscale and cleanup', u: 'improve quality', p: `Upscale this image 2x, remove compression artifacts and noise, preserve texture and sharpness, do not invent new details or alter faces.`},
        {t: 'Subtle retouch', u: 'skin/objects', p: `Edit this image: subtle retouch. Remove temporary blemishes and dust, keep natural skin texture, do not smooth pores, do not change shapes.`},
        {t: 'Remove object', u: 'clean the scene', p: `Edit this image: remove [OBJECT] and fill the area consistently with the surrounding material and lighting.`},
        {t: 'Change wardrobe', u: 'clothing', p: `Edit this image: change the clothing to [NEW WARDROBE] in concept colors (${s.palette}). Keep face, pose and lighting identical.`},
        {t: 'Relight (concept lighting)', u: 'relight', p: `Edit this image: relight the scene with ${s.light}. Keep geometry and colors of the subject consistent, adjust shadows and highlights only.`},
        {t: 'Screenshot → UI in the style', u: 'screen redesign', p: `Redesign this screenshot in the concept. Keep the same information architecture and real text, but apply ${s.palette}; ${s.ui.layout}; ${s.ui.components}. ${real}`},
        {t: 'Wireframe/sketch → UI', u: 'sketch to screen', p: `Turn this sketch into a polished UI screen. Follow the layout exactly. Style: ${BASE} Replace placeholders with real content. ${real}`},
        {t: 'Product photo → hero', u: 'clean object', p: `Edit this product photo: isolate the product, place it on a dark plinth with ${s.light}, background in ${s.black}, add negative space on the left for text. Keep the product shape and logo untouched.`},
        {t: 'Replace the text in the image', u: 'fix/update text', p: `Edit this image: replace the text "[OLD TEXT]" with exactly "[NEW TEXT]" in the same font, size, color and position. Do not alter anything else.`},
        {t: 'Fix unreadable/leaking text', u: 'clean up gibberish', p: `Edit this image: remove all gibberish or misspelled text and replace it with these exact words: [LIST]. Where no text is needed, leave clean space. Do not change other elements.`},
        {t: 'Swap the primary color', u: 'recolor the accent', p: `Edit this image: change only the accent color from ${P} to [NOVA COR #hex] everywhere it appears (dots, strokes, seals, highlights). Keep neutrals and everything else unchanged.`},
        {t: 'Blend two images', u: 'composition', p: `Combine these two images: use image 1 as the main subject and image 2 as the environment. Match lighting, perspective and scale. Apply the concept grade (${s.grade.contrast}; ${s.grade.saturation}).`},
        {t: 'UI inside a device (mockup swap)', u: 'swap the mockup screen', p: `Edit this mockup: replace the screen content with the provided UI image, matching perspective, glare off, brightness realistic. Keep the device and background untouched.`},
        {t: 'Region inpaint', u: 'mask', p: `Using the mask, replace only the masked area with [DESCRIPTION]. Match grain, lighting and color of the surroundings. Everything outside the mask stays identical.`},
        {t: 'Variations of the same layout', u: 'explore', p: `Create 4 variations of this image keeping the layout and subject, varying only: ${s.ornaments.split(',')[0]}, accent placement, and background tone within the palette.`},
        {t: 'Turn into an illustration', u: 'photo → art', p: `Convert this photograph into a painterly illustration in the concept style, preserving pose and likeness of a fictional subject, ${s.palette}, ${s.light}.`},
      ],
    },
    {
      id: 'F', title: 'VIDEO GENERATION', intro: 'Veo, Sora, Runway, Kling, Luma, Pika and similar. Ask for short scenes (3–8 s). For exact text use Remotion (section G).',
      items: [
        {t: 'Logo sting (3–5 s)', u: 'brand opener', p: `A 4-second logo sting. ${s.icon.mark} appears on ${s.black}. Motion: ${s.motion.signature}. Camera: ${s.motion.camera}. Transitions: ${s.motion.cuts}. ${s.palette}. ${noText}. ${s.motion.fps}.`, n: 'Then overlay the real wordmark in the editor/Remotion.'},
        {t: 'Background loop (8 s)', u: 'animated background', p: `Seamless 8-second looping background. ${BASE} Slow ambient motion only: ${s.motion.pace}. Camera: ${s.motion.camera}. ${noText}. Last frame equals first frame. ${s.motion.fps}.`},
        {t: 'Object orbit', u: '360 hero', p: `A slow 360-degree orbit around ${s.hero[0]} on a plinth. Materials: ${s.materials}. ${s.light}. ${s.palette}. Smooth constant speed, ${noText}, ${s.motion.fps}.`},
        {t: 'Animated UI screen', u: 'stylized screen recording', p: `A designed UI screen for [APP] coming to life: cards enter in sequence, numbers count up, one state change at the end. ${BASE} Motion style: ${s.motion.cuts}; ${s.motion.easing}. ${real} ${s.motion.fps}.`},
        {t: 'Transition (1–2 s)', u: 'wipe between scenes', p: `A 1.5-second transition on ${s.black}: ${s.motion.cuts}. Uses ${s.ornaments}. Ends on a clean frame. ${noText}.`},
        {t: 'Title card', u: 'title card', p: `A 5-second title card: the text "[TITLE]." appears exactly as written in ${s.typo}. ${s.motion.signature}. ${s.palette}.`},
        {t: 'Channel intro (5–7 s)', u: 'vignette bumper', p: `A 6-second channel intro: ${s.hero[0]} reveals, then the wordmark "[NAME]." settles. Camera: ${s.motion.camera}. ${s.motion.pace}. ${s.palette}. ${s.motion.fps}.`},
        {t: 'Abstract B-roll', u: 'supporting footage', p: `Abstract b-roll, 6 seconds: ${s.hero.slice(0, 2).join(' and ')} moving slowly in a void. Materials: ${s.materials}. ${s.light}. ${s.palette}. ${noText}.`},
        {t: 'Image → video (subtle)', u: 'animate a finished artwork', p: `Animate the provided image with very subtle motion only: ${s.motion.pace}; light shifts slightly; the accent ${P} breathes once. Do not change composition or add new elements. Camera: ${s.motion.camera}. 5 seconds.`},
        {t: 'Character (breathing and gaze)', u: 'animate a portrait', p: `Animate the provided character portrait: gentle breathing, slow blink, a slight turn of the head toward the camera, hair moving minimally. Keep identity, outfit and lighting identical. 4 seconds, ${s.motion.fps}.`},
        {t: 'Animated lower third', u: 'name on screen', p: `A lower-third graphic for "[NAME]" and "[ROLE]" on a transparent-looking dark band. Style: ${s.base}. Animation: ${s.motion.cuts}. 4 seconds, readable text exactly as written.`},
        {t: 'Cinemagraph', u: 'photo with one movement', p: `Cinemagraph from the provided image: everything frozen except ${s.ornaments.split(',')[0]} and the accent ${P}, looping seamlessly in 3 seconds.`},
        {t: 'Environment / timelapse', u: 'atmospheric scene', p: `${s.scene[2]}. A slow 10-second ambient shot. ${s.motion.camera}. ${s.light}. ${s.palette}. ${noText}.`},
        {t: 'Trailer storyboard (15 s)', u: 'shot list to generate in parts', p: `Write a 5-shot storyboard for a 15-second trailer of [PRODUCT]. For each shot: duration, camera, subject, motion, transition, on-screen text. Style rules: ${s.motion.cuts}; ${s.motion.pace}; palette ${s.palette}. End with the logo sting.`, n: 'Generate each shot separately and join them in the editor.'},
      ],
    },
    {
      id: 'G', title: 'VIDEO EDITING', intro: 'Prompts for AI editors, parameters for Premiere/DaVinci/CapCut, ffmpeg commands and Remotion requests.',
      items: [
        {t: 'Color grade (parameters)', u: 'Premiere/DaVinci/CapCut', p: `Apply this grade: ${s.grade.blacks}; ${s.grade.whites}; ${s.grade.contrast}; ${s.grade.saturation}; ${s.grade.grain}. Note: ${s.grade.note}. Keep skin tones natural. Export 2 versions: neutral and graded.`},
        {t: 'Pacing and cuts', u: 'brief for an editor/AI', p: `Edit the footage with this rhythm: ${s.motion.pace}. Transitions: ${s.motion.cuts}. Easing: ${s.motion.easing}. Cut on action, no more than one event per shot, hold the final frame for 1 second. Target length [N] seconds.`},
        {t: 'Captions (style)', u: 'captions', p: `Subtitle style: ${s.typo} (use the closest available font), white ${s.white}, no outline, no shadow, bottom third, max 2 lines of 32 characters, accent ${P} on emphasized words only. Word-level timing, no emojis.`},
        {t: 'Lower thirds and titles', u: 'graphics on the timeline', p: `Create titles and lower thirds using ${s.typo}. Enter animation: ${s.motion.cuts}. Duration 4 s. Safe margins 5%. Colors: ${s.palette}.`},
        {t: 'Transitions', u: 'transition rules', p: `Use only these transitions: ${s.motion.cuts}. Forbidden: cross zoom, glitch, spin, flash unless it is the signature (${s.motion.signature}).`},
        {t: 'Audio mix', u: 'loudness and hierarchy', p: `Mix: dialogue/narration first, music at -18 dB under voice, UI/sfx accents at -12 dB. Master to -14 LUFS, true peak -1 dB. Music mood: ${s.audio.mood}.`},
        {t: 'Reformat 16:9 → 9:16 / 1:1', u: 'adapt', p: `Reframe the 16:9 edit to 9:16 and 1:1. Keep the subject and text in the safe zone, re-layout titles instead of cropping them, keep the same pacing.`},
        {t: 'Perfect loop', u: 'seamless loop', p: `Make a seamless loop of the clip: crossfade of 12 frames at the join, match motion direction and light, ensure the first and last frames are identical.`},
        {t: 'ffmpeg: crop/reformat', u: 'command', p: `ffmpeg -i in.mp4 -vf "scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920" -c:v libx264 -crf 18 -preset slow -c:a aac out-9x16.mp4`},
        {t: 'ffmpeg: simple grade (blacks/whites)', u: 'command', p: `ffmpeg -i in.mp4 -vf "eq=contrast=1.12:saturation=0.8:brightness=-0.02,curves=all='0/0.03 0.5/0.5 1/0.96'" -c:v libx264 -crf 18 graded.mp4`, n: "Adjust the curve points to the concept's black/white (the curve lifts/lowers black and white)."},
        {t: 'ffmpeg: fade in/out', u: 'command', p: `ffmpeg -i in.mp4 -vf "fade=t=in:st=0:d=0.5,fade=t=out:st=[DURATION-0.5]:d=0.5" -af "afade=t=in:d=0.5,afade=t=out:st=[DURATION-0.5]:d=0.5" out.mp4`},
        {t: 'ffmpeg: burn in subtitles (.srt)', u: 'command', p: `ffmpeg -i in.mp4 -vf "subtitles=subs.srt:force_style='FontName=Inter,FontSize=22,PrimaryColour=&H00F3F0E6,Outline=0,Shadow=0,Alignment=2'" out.mp4`, n: "Replace FontName with the concept's font and the (BGR) color with the concept's white."},
        {t: 'ffmpeg: light GIF', u: 'command', p: `ffmpeg -i in.mp4 -vf "fps=15,scale=720:-1:flags=lanczos,split[a][b];[a]palettegen[p];[b][p]paletteuse" out.gif`},
        {t: 'ffmpeg: extract frame/thumbnail', u: 'command', p: `ffmpeg -ss 00:00:03 -i in.mp4 -frames:v 1 -q:v 2 thumb.jpg`},
        {t: 'ffmpeg: normalize audio', u: 'command', p: `ffmpeg -i in.mp4 -af loudnorm=I=-14:TP=-1:LRA=11 -c:v copy out-norm.mp4`},
        {t: 'Request a Remotion composition', u: 'coding AI', p: `Create a Remotion composition "[NAME]" (1920x1080, 30fps, [N] frames) in this repository. Read ${s.master} section 13 (movement) and use theme tokens from the concept tokens.json. Motion signature: ${s.motion.signature}. Accept a "primary" prop. Use helpers from src/shared/motion.ts and src/shared/reveal.ts. Render still frames to verify.`},
        {t: 'Export presets', u: 'social media', p: `Export presets: YouTube 1080p H.264 CRF 18 AAC 320k; Reels/TikTok 1080x1920 H.264 8–12 Mbps; X 1280x720 or 1080x1080 under 512 MB; archive ProRes 422 HQ.`},
      ],
    },
    {
      id: 'H', title: 'AUDIO AND MUSIC', intro: 'Suno, Udio, ElevenLabs (SFX/voice) and similar.',
      items: [
        {t: 'Instrumental track', u: 'background music', p: `Instrumental background music, ${s.audio.mood}. Instruments: ${s.audio.instruments}. Tempo ${s.audio.bpm}. Seamless loop of 60 seconds. Avoid: ${s.audio.avoid}. No vocals.`},
        {t: 'Interface sounds (UI sfx)', u: 'clicks, toggles, toasts', p: `UI sound effects pack in the style of the concept: ${s.audio.mood}. Click, hover, toggle on/off, success, error, notification, modal open/close. Short (60–300 ms), dry, no reverb tail. Instruments/sources: ${s.audio.instruments}.`},
        {t: 'Logo sound (jingle)', u: 'sonic signature', p: `A 3-second audio logo. ${s.audio.mood}. Sound sources: ${s.audio.instruments}. Resolves on a single clear note, no melody beyond 3 notes.`},
        {t: 'Scene sound design', u: 'impacts and ambiences', p: `Sound design for a 15-second motion piece: hits aligned to the motion signature (${s.motion.signature}), ambient bed ${s.audio.mood}, no risers. Avoid: ${s.audio.avoid}.`},
        {t: 'Narration (tone of voice)', u: 'TTS / voiceover', p: `Voiceover direction: calm, ${s.voice.tone.split(',')[0]}, medium-low pitch, slow pace, short sentences, no hype. Script in English. Pronounce "Galdr/Shizuka/Oriental" naturally.`},
      ],
    },
    {
      id: 'I', title: 'TEXT AND COPY (LLM)', intro: "For ChatGPT, Claude, Gemini. All keep the concept's voice.",
      items: [
        {t: 'Interface microcopy', u: 'buttons, errors, empty states', p: `Write microcopy in English for [SCREEN/FLOW] in this voice: ${s.voice.tone}. Provide: page title, primary button, secondary button, success, error (what happened + what to do), empty state, loading. Examples of the voice: ${s.voice.samples.join(' | ')}.`},
        {t: 'Social media captions', u: 'posts', p: `Write 5 captions for [TOPIC] in this voice: ${s.voice.tone}. Max 220 characters, no hashtags spam (max 3), no emojis.`},
        {t: 'Product description', u: 'e-commerce/landing', p: `Write a product description for [PRODUCT] in this voice: ${s.voice.tone}. 3 short paragraphs and 4 bullet points. No superlatives.`},
        {t: 'Image alt text', u: 'accessibility', p: `Write concise alt text (max 125 characters) for each image in the list [IMAGES], describing content and purpose, not decoration. English.`},
        {t: 'README (introduction)', u: 'repository', p: `Write the top of a README for [PROJECT]: title with a trailing period, a one-line description, a 3-item feature list, install and usage code blocks. Voice: ${s.voice.tone}.`},
        {t: 'Release notes', u: 'changelog', p: `Write release notes for [VERSION] from this list of changes: [LIST]. Group by Added, Changed, Fixed. Voice: ${s.voice.tone}. Under 150 words.`},
        {t: 'Announcement email', u: 'newsletter', p: `Write a launch email for [PRODUCT]: subject (under 45 chars), preview text, body of 120 words, one call to action. Voice: ${s.voice.tone}.`},
        {t: 'Bio / about', u: 'profile', p: `Write 3 bios (short 140 chars, medium 300, long 600) for [PERSON/COMPANY], voice: ${s.voice.tone}. Third person, concrete facts only.`},
        {t: 'Video script', u: 'script', p: `Write a 45-second video script about [TOPIC] in 6 beats with on-screen text per beat (max 6 words) and narration. Voice: ${s.voice.tone}. Match the motion pacing: ${s.motion.pace}.`},
        {t: 'Names and naming', u: 'projects/features', p: `Suggest 15 names for [THING]. Style: short, one or two syllables or ${slug === 'galdr' ? 'an Old Norse word' : 'a Japanese loanword'} with real meaning, easy in English. For each: meaning and domain-friendliness note.`},
      ],
    },
    {
      id: 'J', title: 'CODE AND DESIGN (CODING AI)', intro: `Before any request, paste the MASTER PROMPT (section 19 of \`${s.master}\`). These requests assume it is already in context.`,
      items: [
        {t: 'React/Tailwind component', u: 'one component', p: `Using the ${s.title} system, build the React + Tailwind component [NAME]. Include all states (default, hover, focus-visible, active, disabled, error, loading), accessible markup, and a Storybook-style demo. Use CSS variables from tokens.css; the primary color must come only from --color-primary.`},
        {t: 'Full screen in HTML/CSS', u: 'one page', p: `Build a complete responsive page for [SCREEN] in HTML + CSS (no framework) using tokens.css and components.css. Follow the screen pattern for it in the master file section 9. Include all states and real English microcopy. Verify contrast.`},
        {t: 'Design audit', u: 'review a screen against the system', p: `Audit this screen against ${s.master}. List violations by section number with severity (blocker, major, minor) and the exact fix with values. Check: colors vs tokens, primary usage count, radius, shadows, typography, states, copy voice, accessibility contrast. Do not praise.`},
        {t: 'Migrate CSS to tokens', u: 'refactor', p: `Refactor this CSS to use tokens.css variables. Replace every hard-coded color, radius and spacing with the nearest token, replace #000/#fff with the concept black/white, list any value without a token. Do not change behavior.`},
        {t: 'Primary color variations', u: 'theme', p: `Produce 3 variants of this UI by changing only --color-primary (${s.primary.alt.join(', ')}). For each, compute WCAG contrast of the primary against the backgrounds and pick the correct on-primary text color. Report any failing pair.`},
        {t: 'Figma → code', u: 'handoff', p: `Convert this Figma frame to code following ${s.title}. Map Figma variables to tokens.css names, auto-layout to flex/grid, keep spacing on the 4px scale. Output semantic HTML and CSS only.`},
        {t: 'Chart / dataviz', u: 'chart', p: `Create a [TYPE] chart for [DATE] following the dataviz rules of ${s.master} section 10: one highlighted series in the primary, thin axes, no gradients, mono labels. Use [LIBRARY].`},
        {t: 'HTML email', u: 'email template', p: `Build a 600px table-based HTML email with inline styles using the concept palette (${s.palette}), web-safe fallbacks for fonts, a header banner slot, one CTA button and a footer.`},
        {t: 'Accessibility', u: 'check', p: `Review this component for accessibility: keyboard, focus order, roles/ARIA, contrast against the tokens, target size (44px), reduced motion. Output a checklist with fixes.`},
        {t: 'Component Storybook', u: 'living documentation', p: `Write Storybook stories for the component set in components.css: one story per component and per state, with the primary color as a control.`},
        {t: 'Remotion composition', u: 'video in code', p: `Create the Remotion composition [NAME] following ${s.master} section 13. Props: primary (string). Use the concept theme, helpers in src/shared, signature: ${s.motion.signature}. Add it to Root.tsx and render a still to check.`},
      ],
    },
  ];

  const params = `## K. TOOL PARAMETERS

| Tool | How to ask for ratio/style | Notes |
|---|---|---|
| Midjourney | \`--ar 16:9\`, \`--stylize 150–300\`, \`--style raw\`, \`--no <termos>\`, \`--sref <img>\` (style reference), \`--seed N\` | Use the images in \`reference/\` as \`--sref\` to keep the concept |
| Gemini / GPT (imagem) | write the ratio in the sentence ("wide 16:9") and list the hex values | For exact text, use quotes and say "must read exactly" |
| Flux / Flux Kontext | prompt in sentences; editing by instruction | Kontext edits well with "keep X unchanged" |
| Stable Diffusion | prompt + separate **negative prompt** | Paste the negatives list below |
| Photoshop Generative Fill | select the region + short prompt | Combine with section E |
| Veo / Sora / Runway / Kling / Luma | duration, camera, movement, fps | Prefer 3–8 s and join in the editor |
| Suno / Udio / ElevenLabs | style, instruments, BPM, "avoid" | Generate 60 s loops and trim |

### Ratios
${s.ratios}.

| Piece | Ratio |
|---|---|
| Desktop UI, banner, slide | 16:9 |
| X/LinkedIn header | 3:1 / 4:1 |
| Post, portrait | 4:5 |
| Icon, avatar, album | 1:1 |
| Story, mobile, reels | 9:16 |
| Poster, cover | 2:3 |

### Negatives (always paste)
\`${NEG}\`

### Rules for every prompt
1. **Always hex.** Repeat the same hex values in every prompt of the concept.
2. **One live color.** Only the primary ${P}; to vary use ${s.primary.alt.join(' or ')}.
3. **Text in quotes and "must read exactly".** If it still fails, generate without text and compose later.
4. **No leaking.** End with: "${real}".
5. **Fictional people.** Never ask for the likeness of a real person.
6. **Iterate one variable.** Change one thing per round (light, ornament, ratio).
7. **Save approved ones** in \`reference/\` and use them as \`--sref\`/input image.
`;

  let out = `# ${s.title}. PROMPT LIBRARY

[ SYSTEM.DOC // PROMPTS // REV.02 ] | Generated by \`tools/build-prompts.mjs\` from \`tools/prompt-data.mjs\`. Do not edit by hand: edit the data and run \`node tools/build-prompts.mjs\`.

Every prompt in this file already carries the concept identity. Replace whatever is in **[BRACKETS]**. Prompts are in English (best results in generators).

**Identity in one line:** ${P}, ${s.black}, ${s.white}.${s.note ? `\n\n> **Read this first:** ${s.note}` : ''}

## HOW TO CHOOSE

| I want… | Section |
|---|---|
| screen, background, object, environment, poster (no people) | A |
| icon, badge, logo, sticker | B |
| banner, cover, thumbnail, header | C |
| person, character, portrait, team | D |
| edit an image I already have | E |
| generate video | F |
| edit/finish video (grade, cuts, ffmpeg, Remotion) | G |
| music, UI sounds, narration | H |
| text, captions, microcopy | I |
| code, audit, Remotion | J |
| parameters, ratios, negatives | K |

## BASE BLOCK (paste at the end of any image prompt)

\`\`\`
${BASE}
\`\`\`

Pick **one** ending depending on the piece:

- **No text** (art that receives text later): \`${noText}.\`
- **With text** (UI, poster): \`${real}\`

`;
  for (const sec of sections) {
    out += `---\n\n## ${sec.id}. ${sec.title}\n\n${sec.intro}\n\n`;
    sec.items.forEach((it, i) => {
      out += `### ${sec.id}${String(i + 1).padStart(2, '0')}. ${it.t}\n*${it.u}*\n\n\`\`\`\n${it.p}\n\`\`\`\n${it.n ? `\n> ${it.n}\n` : ''}\n`;
    });
  }
  out += `---\n\n${params}\n`;
  const total = sections.reduce((n, sec) => n + sec.items.length, 0);
  return {out, total};
};

for (const [slug, s] of Object.entries(styles)) {
  const {out, total} = build(slug, s);
  writeFileSync(join(root, slug, 'PROMPTS.md'), out);
  console.log(`+ ${slug}/PROMPTS.md (${total} prompts)`);
}
