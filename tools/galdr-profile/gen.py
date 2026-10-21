#!/usr/bin/env python3
"""Galdr profile assets generator. usage: gen.py OUTDIR [--static]"""
import sys, os, io, base64, math
from fontTools import subset
from fontTools.ttLib import TTFont

OUT = sys.argv[1]
STATIC = '--static' in sys.argv
W_DIR = os.path.dirname(os.path.abspath(__file__))
FONTS = os.path.join(W_DIR, '..', '..', 'fonts') + '/'

INK, INK2, INK3 = '#0C0C0B', '#141413', '#1D1D1B'
BONE, ICE, MUTED = '#E9E4D6', '#8FF3FF', '#8F8E88'
SOFT = '#B9B6AB'
HAIR = 'rgba(233,228,214,0.14)'
HAIR_S = 'rgba(233,228,214,0.32)'
FUTHARK = 'ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛇᛈᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟ'

# ---------- fonts (subset, woff, base64) ----------
LATIN = list(range(0x20, 0x7F)) + list(range(0xA0, 0x100)) + [0x2014, 0x2022, 0xB7, 0x2192]
RUNES = list(range(0x16A0, 0x16F9))

def font_b64(path, unicodes):
    opts = subset.Options()
    opts.flavor = 'woff'
    opts.layout_features = ['kern', 'liga']
    opts.notdef_outline = False
    f = TTFont(path)
    if 'fvar' in f:  # variable -> pin default
        from fontTools.varLib import instancer
        f = instancer.instantiateVariableFont(f, {a.axisTag: a.defaultValue for a in f['fvar'].axes})
    s = subset.Subsetter(opts)
    s.populate(unicodes=unicodes)
    s.subset(f)
    f.flavor = 'woff'
    buf = io.BytesIO()
    f.save(buf)
    return base64.b64encode(buf.getvalue()).decode()

_cache = {}
def face(name, path, unicodes, weight=400):
    key = (name, weight)
    if key not in _cache:
        _cache[key] = (f"@font-face{{font-family:'{name}';font-weight:{weight};"
                       f"src:url(data:font/woff;base64,{font_b64(path, unicodes)}) format('woff');}}")
    return _cache[key]

def fonts_css(*which):
    m = {
        'disp8': lambda: face('GDisp', FONTS + 'BigShouldersDisplay-800.ttf', LATIN, 800),
        'disp6': lambda: face('GDisp', FONTS + 'BigShouldersDisplay-600.ttf', LATIN, 600),
        'mono4': lambda: face('GMono', FONTS + 'IBMPlexMono-400.ttf', LATIN, 400),
        'mono5': lambda: face('GMono', FONTS + 'IBMPlexMono-500.ttf', LATIN, 500),
        'inter': lambda: face('GInter', FONTS + 'Inter-400.ttf', LATIN, 400),
        'rune': lambda: face('GRune', '/usr/share/fonts/noto/NotoSansRunic-Regular.ttf', RUNES, 400),
    }
    return ''.join(m[k]() for k in which)

# ---------- helpers ----------
def chamfer(x, y, w, h, c, corners='tr,bl'):
    """polygon points of rect with 45deg chamfers on the chosen corners"""
    cs = corners.split(',')
    pts = []
    pts += [(x + c, y)] if 'tl' in cs else [(x, y)]
    if 'tl' in cs: pts = [(x, y + c), (x + c, y)]
    # rebuild clockwise from top-left
    p = []
    p += [(x, y + c), (x + c, y)] if 'tl' in cs else [(x, y)]
    p += [(x + w - c, y), (x + w, y + c)] if 'tr' in cs else [(x + w, y)]
    p += [(x + w, y + h - c), (x + w - c, y + h)] if 'br' in cs else [(x + w, y + h)]
    p += [(x + c, y + h), (x, y + h - c)] if 'bl' in cs else [(x, y + h)]
    return ' '.join(f'{a:g},{b:g}' for a, b in p)

def rhombus(cx, cy, r, fill=ICE, extra=''):
    return f'<polygon points="{cx},{cy-r} {cx+r},{cy} {cx},{cy+r} {cx-r},{cy}" fill="{fill}" {extra}/>'

def fade_in(delay, dur=0.6):
    if STATIC:
        return ''
    return (f'<animate attributeName="opacity" from="0" to="1" begin="{delay}s" dur="{dur}s" fill="freeze"/>')

def op0():
    return '' if STATIC else ' opacity="0"'

def esc(s):
    return s.replace('&', '&amp;').replace('<', '&lt;')

def facets(x0, y0, w, h):
    """sparse facet lines behind the hero object"""
    segs = [(0.0, 0.2, 0.45, 0.0), (0.45, 0.0, 1.0, 0.3), (0.0, 0.2, 0.3, 0.75), (0.3, 0.75, 1.0, 0.3),
            (0.3, 0.75, 0.62, 1.0), (0.62, 1.0, 1.0, 0.3), (0.45, 0.0, 0.3, 0.75), (0.0, 0.2, 1.0, 0.3)]
    return ''.join(
        f'<line x1="{x0+a*w:.1f}" y1="{y0+b*h:.1f}" x2="{x0+c*w:.1f}" y2="{y0+d*h:.1f}" '
        f'stroke="{BONE}" stroke-opacity="0.07" stroke-width="1"/>' for a, b, c, d in segs)

def head(w, h, fonts, uid, title, desc):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img" aria-labelledby="t-{uid}">
<title id="t-{uid}">{esc(title)}</title><desc>{esc(desc)}</desc>
<style>{fonts}
.disp{{font-family:'GDisp','Big Shoulders Display','Oswald','Impact',sans-serif;font-weight:800}}
.disp6{{font-family:'GDisp','Big Shoulders Display','Oswald','Impact',sans-serif;font-weight:600}}
.mono{{font-family:'GMono','IBM Plex Mono','JetBrains Mono',ui-monospace,Consolas,monospace}}
.body{{font-family:'GInter','Inter',-apple-system,'Segoe UI',Roboto,sans-serif}}
.rune{{font-family:'GRune','Noto Sans Runic','Segoe UI Historic',sans-serif}}
</style>'''

def frame_defs(uid, w, h, c=20):
    return f'''<defs>
<clipPath id="card-{uid}"><polygon points="{chamfer(0.5,0.5,w-1,h-1,c)}"/></clipPath>
<linearGradient id="fade-{uid}" x1="0" x2="1"><stop offset="0" stop-color="{ICE}" stop-opacity="0"/><stop offset=".5" stop-color="{ICE}" stop-opacity=".9"/><stop offset="1" stop-color="{ICE}" stop-opacity="0"/></linearGradient>
</defs>
<polygon points="{chamfer(0.5,0.5,w-1,h-1,c)}" fill="{INK}" stroke="{HAIR_S}" stroke-width="1"/>
<g clip-path="url(#card-{uid})">'''

def scan_line(uid, x0, x1, y, dur=6):
    if STATIC:
        return ''
    return (f'<rect x="{x0}" y="{y}" width="120" height="1.5" fill="url(#fade-{uid})">'
            f'<animate attributeName="x" from="{x0-120}" to="{x1}" dur="{dur}s" repeatCount="indefinite"/></rect>')

def rune_ring(cx, cy, r, uid, dur=120, size=13, reverse_dash=True):
    ring_id = f'rp-{uid}'
    path = f'M {cx-r},{cy} a {r},{r} 0 1,1 {2*r},0 a {r},{r} 0 1,1 {-2*r},0'
    circ = 2 * math.pi * r
    spin = '' if STATIC else (f'<animateTransform attributeName="transform" type="rotate" from="0 {cx} {cy}" '
                              f'to="360 {cx} {cy}" dur="{dur}s" repeatCount="indefinite"/>')
    spin_r = '' if STATIC else (f'<animateTransform attributeName="transform" type="rotate" from="360 {cx} {cy}" '
                                f'to="0 {cx} {cy}" dur="{dur*0.6:g}s" repeatCount="indefinite"/>')
    r2 = r + 14
    return f'''<g>
<path id="{ring_id}" d="{path}" fill="none"/>
<g>{spin}<text class="rune" font-size="{size}" fill="{ICE}" fill-opacity=".75"><textPath href="#{ring_id}" textLength="{circ-6:.0f}" lengthAdjust="spacing">{FUTHARK}</textPath></text></g>
<circle cx="{cx}" cy="{cy}" r="{r2}" fill="none" stroke="{BONE}" stroke-opacity=".22" stroke-dasharray="2 6"><animateTransform attributeName="transform" type="rotate" from="0 {cx} {cy}" to="-360 {cx} {cy}" dur="{dur*0.8:g}s" repeatCount="indefinite"/></circle>
<circle cx="{cx}" cy="{cy}" r="{r-14}" fill="none" stroke="{BONE}" stroke-opacity=".14"/>
</g>''' if not STATIC else f'''<g>
<path id="{ring_id}" d="{path}" fill="none"/>
<text class="rune" font-size="{size}" fill="{ICE}" fill-opacity=".75"><textPath href="#{ring_id}" textLength="{circ-6:.0f}" lengthAdjust="spacing">{FUTHARK}</textPath></text>
<circle cx="{cx}" cy="{cy}" r="{r2}" fill="none" stroke="{BONE}" stroke-opacity=".22" stroke-dasharray="2 6"/>
<circle cx="{cx}" cy="{cy}" r="{r-14}" fill="none" stroke="{BONE}" stroke-opacity=".14"/>
</g>'''

PANDA = base64.b64encode(open(os.path.join(W_DIR, 'panda_ice.jpg'), 'rb').read()).decode()

def panda_frame(cx, cy, s, uid, c=18, sweep=True):
    x, y = cx - s / 2, cy - s / 2
    sweep_g = ''
    if sweep and not STATIC:
        sweep_g = f'''<g clip-path="url(#pf-{uid})"><g>
<animateTransform attributeName="transform" type="translate" values="-{s*1.4:g} 0;{s*1.4:g} 0;{s*1.4:g} 0" keyTimes="0;0.3;1" dur="7s" repeatCount="indefinite"/>
<polygon points="{x+s*0.25:g},{y} {x+s*0.5:g},{y} {x+s*0.25:g},{y+s} {x:g},{y+s}" fill="url(#sw-{uid})"/></g></g>'''
    return f'''<defs>
<clipPath id="pf-{uid}"><polygon points="{chamfer(x,y,s,s,c)}"/></clipPath>
<radialGradient id="halo-{uid}"><stop offset="0" stop-color="{ICE}" stop-opacity=".22"/><stop offset="1" stop-color="{ICE}" stop-opacity="0"/></radialGradient>
<linearGradient id="sw-{uid}" x1="0" x2="1"><stop offset="0" stop-color="{ICE}" stop-opacity="0"/><stop offset=".5" stop-color="{ICE}" stop-opacity=".28"/><stop offset="1" stop-color="{ICE}" stop-opacity="0"/></linearGradient>
</defs>
<circle cx="{cx}" cy="{cy}" r="{s*0.95:g}" fill="url(#halo-{uid})"/>
<image href="data:image/jpeg;base64,{PANDA}" x="{x:g}" y="{y:g}" width="{s}" height="{s}" clip-path="url(#pf-{uid})" preserveAspectRatio="xMidYMid slice"/>
{sweep_g}
<polygon points="{chamfer(x,y,s,s,c)}" fill="none" stroke="{ICE}" stroke-opacity=".7" stroke-width="1.2"/>
<polygon points="{x+s-c:g},{y+s} {x+s:g},{y+s} {x+s:g},{y+s-c:g}" fill="none"/>
<polygon points="{x:g},{y+s-c:g} {x+c:g},{y+s:g} {x:g},{y+s:g}" fill="{ICE}"/>
<polygon points="{x+s-c:g},{y:g} {x+s:g},{y+c:g} {x+s:g},{y:g}" fill="{ICE}"/>'''

def chip(x, y, w, h, label, idx, delay, c=8):
    return f'''<g{op0()}>{fade_in(delay)}
<polygon points="{chamfer(x,y,w,h,c)}" fill="{INK2}" stroke="{HAIR_S}"/>
{rhombus(x+16, y+h/2, 3.5)}
<text x="{x+28}" y="{y+h/2+4}" class="mono" font-size="10" fill="{BONE}" letter-spacing=".5">{esc(label)}</text>
</g>'''

def seal(x, y, label):
    return (f'<polygon points="{x},{y-7} {x+7},{y} {x},{y+7} {x-7},{y}" fill="none" stroke="{ICE}" stroke-width="1.2"/>'
            f'{rhombus(x, y, 2.5)}'
            f'<text x="{x+14}" y="{y+4}" class="mono" font-size="11" fill="{SOFT}" letter-spacing="1.5">{esc(label)}</text>')

# ================= HERO =================
def hero():
    w, h = 900, 340
    s = head(w, h, fonts_css('disp8', 'disp6', 'mono4', 'inter', 'rune'), 'hero',
             'Eduardo Sato — Tech Leader & System Architect',
             'Galdr-styled profile banner with a stippled panda inside a rotating rune ring.')
    s += frame_defs('hero', w, h, 22)
    s += facets(560, 56, 340, 270)
    # rune ruler (left column)
    for i, r in enumerate('ᚠᚢᚦᚨᚱᚲᚷᚹ'):
        s += (f'<text x="29" y="{104+i*19}" class="rune" font-size="12" fill="{ICE if i in (3,4) else BONE}" '
              f'fill-opacity="{.8 if i in (3,4) else .28}" text-anchor="middle">{r}</text>')
    s += f'<line x1="44" y1="92" x2="44" y2="248" stroke="{HAIR}"/>'
    # top bar
    s += seal(48, 36, 'SATO.ARCHIVE · REV.01')
    s += f'<text x="318" y="40" class="mono" font-size="10.5" fill="{MUTED}" letter-spacing="1.5">ARCHITECT &amp; TECH LEAD</text>'
    s += f'<text x="852" y="40" class="mono" font-size="10.5" fill="{MUTED}" text-anchor="end" letter-spacing="1.5">SÃO PAULO · 23.55°S 46.63°W</text>'
    s += f'<line x1="48" y1="52" x2="852" y2="52" stroke="{HAIR}"/>'
    s += scan_line('hero', 48, 852, 51.25, 6)
    # title
    s += (f'<text x="62" y="150" class="disp" font-size="92" fill="{BONE}" letter-spacing="1">EDUARDO SATO<tspan fill="{ICE}">.</tspan></text>')
    s += (f'<text x="64" y="188" class="disp6" font-size="27" fill="{SOFT}" letter-spacing="2.4">'
          f'TECH LEADER &amp; SYSTEM ARCHITECT<tspan fill="{ICE}">.</tspan> CTO<tspan fill="{ICE}">.</tspan></text>')
    s += (f'<text x="64" y="220" class="body" font-size="12.5" fill="{MUTED}">Business-oriented engineering of high-availability distributed systems,</text>'
          f'<text x="64" y="239" class="body" font-size="12.5" fill="{MUTED}">resilient multi-cloud topologies, and production-ready GenAI pipelines.</text>')
    # chips
    labels = ['15+ YRS EXPERIENCE', 'DISTRIBUTED CORE', 'GENAI RUNTIMES', 'HIGH AVAILABILITY']
    cw, gap, x0 = 148, 10, 48
    for i, l in enumerate(labels):
        s += chip(x0 + i * (cw + gap), 272, cw, 36, l, f'0{i+1}', 0.3 + i * 0.25)
    # hero object
    cx, cy = 752, 180
    s += rune_ring(cx, cy, 104, 'hero', 120, 13)
    s += panda_frame(cx, cy, 160, 'hero')
    s += f'<text x="{cx}" y="318" class="mono" font-size="8.5" fill="{MUTED}" text-anchor="middle" letter-spacing="1.4">FIG. 01 — PANDA, FRONT VIEW</text>'
    s += '</g></svg>'
    return s

# ================= FASTFETCH =================
def fastfetch():
    w, h = 900, 446
    s = head(w, h, fonts_css('disp8', 'mono4', 'mono5', 'rune'), 'ff',
             'Eduardo Sato — fastfetch', 'Terminal-style profile card in the Galdr visual language.')
    s += frame_defs('ff', w, h, 22)
    s += f'<rect x="0" y="0" width="{w}" height="44" fill="{INK2}"/><line x1="0" y1="44" x2="{w}" y2="44" stroke="{HAIR}"/>'
    s += seal(48, 22, 'GALDR/TERM — satodu@archive:~')
    s += f'<text x="852" y="26" class="mono" font-size="10.5" fill="{MUTED}" text-anchor="end" letter-spacing="1.5">[ ARCH_X86_64 · UTF-8 ]</text>'
    s += scan_line('ff', 0, w, 43.25, 7)
    # prompt
    s += (f'<text x="48" y="80" class="mono" font-size="13" fill="{ICE}">satodu@archive</text>'
          f'<text x="164" y="80" class="mono" font-size="13" fill="{MUTED}">~</text>'
          f'<text x="180" y="80" class="mono" font-size="13" fill="{BONE}">$ fastfetch</text>')
    # object
    cx, cy = 150, 205
    s += rune_ring(cx, cy, 88, 'ff', 140, 11)
    s += panda_frame(cx, cy, 124, 'ff', 14)
    s += f'<text x="{cx}" y="330" class="mono" font-size="8.5" fill="{MUTED}" text-anchor="middle" letter-spacing="1.4">FIG. 02 — SATO, E.</text>'
    # rows
    rows = [('IDENTITY', 'Eduardo Neres Goulart Sato'), ('LOCALE', 'São Paulo, Brazil'),
            ('CONTACT', 'sato.du@gmail.com'), ('WEB', 'https://me.pandaflow.com.br'),
            ('NETWORK', 'in/eduardo-sato-panda'), ('PLATFORM', 'Linux 6.x'),
            ('SHELL', 'zsh 5.9 / bash 5.2'), ('TOOLING', 'Neovim / Docker / Git')]
    y0, step, xl, xv = 128, 27, 300, 410
    for i, (k, v) in enumerate(rows):
        y = y0 + i * step
        d = 0.4 + i * 0.3
        s += (f'<g{op0()}>{fade_in(d, .5)}'
              f'{rhombus(xl-14, y-4, 3, ICE)}'
              f'<text x="{xl}" y="{y}" class="mono" font-size="11.5" fill="{ICE}" letter-spacing="1.6">{k}</text>'
              f'<text x="{xv+30}" y="{y}" class="mono" font-size="13" fill="{BONE}">{esc(v)}</text></g>')
    # palette strip + cursor
    py = y0 + len(rows) * step + 4
    for i, c in enumerate([INK3, '#2A2A27', MUTED, BONE, ICE]):
        s += f'<rect x="{xl+i*26}" y="{py}" width="22" height="12" fill="{c}" stroke="{HAIR}"/>'
    cur_y = py + 40
    s += f'<text x="{xl}" y="{cur_y}" class="mono" font-size="13" fill="{ICE}">satodu@archive</text>'
    s += f'<text x="{xl+116}" y="{cur_y}" class="mono" font-size="13" fill="{BONE}">~ $</text>'
    blink = '' if STATIC else f'<animate attributeName="opacity" values="1;1;0;0" keyTimes="0;.5;.5;1" dur="1.1s" repeatCount="indefinite"/>'
    s += f'<rect x="{xl+152}" y="{cur_y-11}" width="8" height="15" fill="{ICE}">{blink}</rect>'
    # footer
    s += f'<line x1="48" y1="{h-34}" x2="852" y2="{h-34}" stroke="{HAIR}"/>'
    s += f'<text x="48" y="{h-14}" class="mono" font-size="9.5" fill="{MUTED}" letter-spacing="1.2">// ART.SPEC: GALDR. PRIMITIVE NORDIC CYBERPUNK.</text>'
    s += f'<text x="852" y="{h-14}" class="mono" font-size="9.5" fill="{MUTED}" text-anchor="end" letter-spacing="1.2">ᚠ ᚢ ᚦ · GD-0417</text>'
    s += '</g></svg>'
    return s

# ================= TECH STACK =================
SECTIONS = [
    ('GD-01', 'BACKEND & DISTRIBUTED SYSTEMS', 'Microservices · High Availability · Queues',
     ['Node.js (NestJS)', 'Python (FastAPI, Django)', 'PHP (Laravel)', 'Rust', 'C', 'Distributed Queues']),
    ('GD-02', 'GENERATIVE AI & MACHINE INTELLIGENCE', 'RAG · Model Orchestration · Stable Diffusion',
     ['PyTorch', 'TensorFlow', 'LangChain', 'Ollama', 'Hugging Face', 'Stable Diffusion (Custom Training)']),
    ('GD-03', 'CLOUD INFRASTRUCTURE & DEVSECOPS', 'Kubernetes · CI/CD · Linux Kernel Tuning',
     ['Linux (Core/Kernel)', 'Kubernetes', 'Docker', 'AWS (Redshift, Glue, EC2)', 'GCP / Azure', 'Kafka',
      'RabbitMQ', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'GitLab CI / Jenkins']),
    ('GD-04', 'FRONTEND ARCHITECTURE & INTERFACES', 'Reactive State · Cross-Platform · Desktop GUI',
     ['React', 'Next.js', 'Vue.js', 'Nuxt.js', 'TypeScript', 'Electron', 'Cordova', 'Qt6 / PyQt6']),
    ('GD-05', 'OBSERVABILITY & TOOLING', 'Metrics · Telemetry · Design Systems',
     ['Grafana', 'Git', 'Webpack', 'Gulp / Babel', 'Figma', 'Photoshop', 'Unity']),
]

def techstack():
    w = 900
    cw_char, ch_h = 6.6, 24
    # layout pass
    y = 74
    blocks = []
    for sec in SECTIONS:
        by = y
        y += 54  # header area
        rows, cx, cyy = [], 48, y
        row = []
        for t in sec[3]:
            tw = len(t) * cw_char + 28
            if cx + tw > 852:
                rows.append(row); row = []; cx = 48
            row.append((cx, t, tw)); cx += tw + 8
        rows.append(row)
        y += len(rows) * (ch_h + 8) + 14
        blocks.append((by, sec, rows))
    h = y + 40
    s = head(w, h, fonts_css('disp8', 'mono4', 'mono5', 'rune'), 'ts',
             'Eduardo Sato — tech stack', 'Five capability domains catalogued in the Galdr visual language.')
    s += frame_defs('ts', w, h, 22)
    s += f'<rect x="0" y="0" width="{w}" height="44" fill="{INK2}"/><line x1="0" y1="44" x2="{w}" y2="44" stroke="{HAIR}"/>'
    s += seal(48, 22, 'SATO.MATRIX — CORE CAPABILITIES')
    s += f'<text x="852" y="26" class="mono" font-size="10.5" fill="{MUTED}" text-anchor="end" letter-spacing="1.5">[ 5 DOMAINS · PROD READY ]</text>'
    s += scan_line('ts', 0, w, 43.25, 8)
    for bi, (by, sec, rows) in enumerate(blocks):
        code, title, sub, tags = sec
        d = 0.3 + bi * 0.35
        s += f'<g{op0()}>{fade_in(d)}'
        s += (f'<polygon points="{chamfer(48,by,58,20,6)}" fill="{ICE}"/>'
              f'<text x="77" y="{by+14}" class="mono" font-size="10.5" font-weight="500" fill="{INK}" text-anchor="middle" letter-spacing="1">{code}</text>')
        s += f'<text x="120" y="{by+20}" class="disp" font-size="24" fill="{BONE}" letter-spacing="1.2">{esc(title)}<tspan fill="{ICE}">.</tspan></text>'
        s += f'<text x="852" y="{by+15}" class="mono" font-size="10" fill="{MUTED}" text-anchor="end">[ {esc(sub)} ]</text>'
        line_y = by + 34
        s += f'<line x1="48" y1="{line_y}" x2="852" y2="{line_y}" stroke="{HAIR}"/>'
        dash = '' if STATIC else (f'<animate attributeName="stroke-dashoffset" from="804" to="0" begin="{d}s" dur="1s" fill="freeze"/>')
        s += f'<line x1="48" y1="{line_y}" x2="852" y2="{line_y}" stroke="{ICE}" stroke-opacity=".85" stroke-width="1.2" stroke-dasharray="804" stroke-dashoffset="{0 if STATIC else 804}">{dash}</line>'
        ry = by + 54
        for r in rows:
            for (cx, t, tw) in r:
                s += (f'<polygon points="{chamfer(cx,ry,tw,ch_h,6)}" fill="{INK2}" stroke="{HAIR_S}"/>'
                      f'<text x="{cx+14}" y="{ry+16}" class="mono" font-size="11" fill="{BONE}">{esc(t)}</text>')
            ry += ch_h + 8
        s += '</g>'
    s += f'<line x1="48" y1="{h-34}" x2="852" y2="{h-34}" stroke="{HAIR}"/>'
    s += f'<text x="48" y="{h-14}" class="mono" font-size="9.5" fill="{ICE}" letter-spacing="1.2">[ STATUS: ALL SYSTEMS OPERATIONAL. ]</text>'
    s += f'<text x="852" y="{h-14}" class="mono" font-size="9.5" fill="{MUTED}" text-anchor="end" letter-spacing="1.2">// 15+ YEARS CONTINUOUS ARCHITECTURE.</text>'
    s += '</g></svg>'
    return s

# ================= QUOTE =================
def quote():
    w, h = 900, 84
    s = head(w, h, fonts_css('mono4', 'inter', 'rune'), 'q', 'Core philosophy',
             'Seamlessly transitioning between high-level technical strategy and precise, low-level codebase execution.')
    s += frame_defs('q', w, h, 14)
    s += f'<rect x="0" y="18" width="3" height="48" fill="{ICE}"/>'
    s += f'<text x="40" y="31" class="mono" font-size="10" fill="{ICE}" letter-spacing="1.6">// CORE PHILOSOPHY</text>'
    s += (f'<text x="40" y="55" class="body" font-size="14" fill="{BONE}">'
          f'"Seamlessly transitioning between high-level technical strategy and precise, low-level codebase execution."</text>')
    s += f'<text x="860" y="31" class="rune" font-size="12" fill="{ICE}" fill-opacity=".6" text-anchor="end">ᚦᚨᚱᛟ</text>'
    s += scan_line('q', 0, w, h - 1.5, 9)
    s += '</g></svg>'
    return s

if __name__ == '__main__':
    os.makedirs(OUT, exist_ok=True)
    for name, fn in [('hero', hero), ('fastfetch', fastfetch), ('techstack', techstack), ('quote', quote)]:
        data = fn()
        open(os.path.join(OUT, name + '.svg'), 'w').write(data)
        print(name, len(data) // 1024, 'KB')
