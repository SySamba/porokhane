#!/usr/bin/env python3
"""
Génère le rapport PowerPoint 360° (Search Console + GA4) au design du rapport
de référence : bleu #005AA4, vert #00823A, Calibri, cartes, tableaux alternés,
footer paginé.  Entrée : dict produit par report_analysis.analyse().
"""

import os
from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
from pptx.chart.data import CategoryChartData
from pptx.enum.chart import XL_CHART_TYPE, XL_LEGEND_POSITION, XL_LABEL_POSITION
from pptx.enum.dml import MSO_LINE_DASH_STYLE
from pptx.oxml.ns import qn

from report_analysis import fmt_int, fmt_pct, fmt_pos, fmt_dur, tronq

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LOGO = os.path.join(ROOT, 'images', 'logo.png')

W, H = 13.333, 7.5
ML = 0.55                       # marge latérale
CW = W - 2 * ML                 # largeur de contenu
FONT = 'Calibri'

C = {'blue': '005AA4', 'green': '00823A', 'dgreen': '2E7D32', 'yellow': 'F9A825',
     'red': 'E53935', 'lblue': 'E3F2FD', 'lgreen': 'E8F5E9', 'lyellow': 'FFF8E1',
     'lred': 'FFEBEE', 'lgray': 'F5F5F5', 'mgray': '9E9E9E', 'gray': '333333',
     'sgray': '777777', 'black': '0A0A0A', 'white': 'FFFFFF', 'line': 'D9D9D9'}
CLS_COL = {'good': C['dgreen'], 'warn': C['yellow'], 'bad': C['red'], 'flat': C['sgray']}
CLS_BG = {'good': C['lgreen'], 'warn': C['lyellow'], 'bad': C['lred'], 'flat': C['lgray']}
LVL_COL = {'ÉLEVÉ': C['red'], 'MODÉRÉ': C['yellow'], 'FAIBLE': C['sgray']}

prs = None
_month = ''


def rgb(h):
    return RGBColor.from_string(h)


def rect(s, x, y, w, h, fill=None, line=None, line_w=0.75, round_=False, radius=0.10):
    shp = s.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE if round_ else MSO_SHAPE.RECTANGLE,
                             Inches(x), Inches(y), Inches(w), Inches(h))
    if round_:
        try:
            shp.adjustments[0] = radius
        except Exception:
            pass
    if fill:
        shp.fill.solid(); shp.fill.fore_color.rgb = rgb(fill)
    else:
        shp.fill.background()
    if line:
        shp.line.color.rgb = rgb(line); shp.line.width = Pt(line_w)
    else:
        shp.line.fill.background()
    shp.shadow.inherit = False
    return shp


def txt(s, x, y, w, h, paras, size=12, color=C['gray'], bold=False, align=PP_ALIGN.LEFT,
        anchor=MSO_ANCHOR.TOP, spacing=1.0, space_after=0):
    """paras : str | (str,{size,color,bold,italic}) | [ [ (str,{opts}), ... ], ... ]"""
    tb = s.shapes.add_textbox(Inches(x), Inches(y), Inches(w), Inches(h))
    tf = tb.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = anchor
    tf.margin_left = tf.margin_right = tf.margin_top = tf.margin_bottom = 0
    if isinstance(paras, str):
        paras = [[(paras, {})]]
    for i, para in enumerate(paras):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.alignment = align
        p.line_spacing = spacing
        if space_after:
            p.space_after = Pt(space_after)
        if isinstance(para, str):
            para = [(para, {})]
        elif isinstance(para, tuple):
            para = [para]
        for text, o in para:
            r = p.add_run()
            r.text = text
            f = r.font
            f.name = FONT
            f.size = Pt(o.get('size', size))
            f.bold = o.get('bold', bold)
            f.italic = o.get('italic', False)
            f.color.rgb = rgb(o.get('color', color))
    return tb


def bullets(s, x, y, w, h, items, size=12, color=C['gray'], gap=6, spacing=1.05, bullet='• ', bcolor=None):
    paras = []
    for it in items:
        if isinstance(it, str):
            it = [(it, {})]
        paras.append([(' ' + bullet, {'color': bcolor or C['blue'], 'bold': True})] + it)
    return txt(s, x, y, w, h, paras, size=size, color=color, spacing=spacing, space_after=gap)


def pill(s, x, y, w, h, text, fill, tcolor=C['white'], size=10, bold=True):
    rect(s, x, y, w, h, fill=fill, round_=True, radius=0.5)
    txt(s, x, y - 0.01, w, h, text, size=size, color=tcolor, bold=bold,
        align=PP_ALIGN.CENTER, anchor=MSO_ANCHOR.MIDDLE)


def kpi_card(s, x, y, w, h, title, value, delta_txt='', cls='flat', note='', accent=None, sens='flat'):
    rect(s, x, y, w, h, fill=C['white'], line=C['line'], round_=True, radius=0.08)
    rect(s, x, y, 0.07, h, fill=accent or CLS_COL[cls], round_=False)
    txt(s, x + 0.2, y + 0.14, w - 0.35, 0.3, title.upper(), size=10, color=C['sgray'], bold=True)
    txt(s, x + 0.2, y + 0.42, w - 0.35, 0.55, str(value), size=26, color=C['blue'], bold=True)
    row = []
    if delta_txt:
        arrow = {'up': '▲', 'down': '▼', 'flat': '◆'}[sens]
        col = CLS_COL[cls]
        suffix = '' if delta_txt in ('1ʳᵉ mesure', 'nv.') else ' vs période préc.'
        row.append((f'{arrow} {delta_txt}{suffix}', {'color': col, 'size': 10, 'bold': True}))
    if note:
        if row:
            row.append(('   ·   ', {'size': 10, 'color': C['mgray']}))
        row.append((note, {'size': 10, 'color': C['sgray']}))
    if row:
        txt(s, x + 0.2, y + h - 0.42, w - 0.35, 0.35, [row])


def set_cell(c, text, size=10.5, bold=False, color=C['gray'], fill=None, align=PP_ALIGN.LEFT):
    if fill:
        c.fill.solid(); c.fill.fore_color.rgb = rgb(fill)
    else:
        c.fill.solid(); c.fill.fore_color.rgb = rgb(C['white'])
    c.vertical_anchor = MSO_ANCHOR.MIDDLE
    c.margin_left = c.margin_right = Inches(0.08)
    c.margin_top = c.margin_bottom = Inches(0.02)
    tf = c.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    if isinstance(text, list):
        runs = text
    else:
        runs = [(str(text), {})]
    for t_, o in runs:
        r = p.add_run(); r.text = t_
        f = r.font
        f.name = FONT; f.size = Pt(o.get('size', size))
        f.bold = o.get('bold', bold); f.color.rgb = rgb(o.get('color', color))


def table(s, x, y, w, col_w, rows, header, row_h=0.34, head_h=0.4, size=10.5, aligns=None):
    """rows: list of list of cell values (str ou [(txt,opts)]). header: list[str]."""
    n_r, n_c = len(rows) + 1, len(header)
    gf = s.shapes.add_table(n_r, n_c, Inches(x), Inches(y), Inches(w), Inches(head_h + row_h * len(rows)))
    t = gf.table
    t.first_row = False; t.horz_banding = False
    for j, cw in enumerate(col_w):
        t.columns[j].width = Inches(cw)
    t.rows[0].height = Inches(head_h)
    for i in range(1, n_r):
        t.rows[i].height = Inches(row_h)
    aligns = aligns or [PP_ALIGN.LEFT] * n_c
    for j, htxt in enumerate(header):
        set_cell(t.cell(0, j), htxt, size=size, bold=True, color=C['white'],
                 fill=C['blue'], align=aligns[j] if j else PP_ALIGN.LEFT)
    for i, row in enumerate(rows):
        fill = C['white'] if i % 2 == 0 else C['lgray']
        for j, val in enumerate(row):
            set_cell(t.cell(i + 1, j), val, size=size, fill=fill, align=aligns[j])
    return gf


def _tick_skip(axis, n):
    """Espace les étiquettes de l'axe catégoriel (lisibilité 28 jours)."""
    el = axis._element
    specs = (('c:tickLblSkip', ('c:tickMarkSkip', 'c:noMultiLvlLbl', 'c:extLst')),
             ('c:tickMarkSkip', ('c:noMultiLvlLbl', 'c:extLst')))
    for tag, successors in specs:
        e = el.find(qn(tag))
        if e is None:
            e = el.makeelement(qn(tag), {})
            el.insert_element_before(e, *successors)
        e.set('val', str(n))


def style_axis(ax, size=9, gridlines=False):
    ax.has_major_gridlines = gridlines
    if gridlines:
        ax.major_gridlines.format.line.color.rgb = rgb('E8E8E8')
        ax.major_gridlines.format.line.width = Pt(0.5)
    ax.tick_labels.font.size = Pt(size)
    ax.tick_labels.font.name = FONT
    ax.tick_labels.font.color.rgb = rgb(C['sgray'])
    ax.format.line.color.rgb = rgb(C['line'])


def style_series(ser, color, width=2.0, dash=None, fill=False):
    if fill:
        ser.format.fill.solid(); ser.format.fill.fore_color.rgb = rgb(color)
    ser.format.line.color.rgb = rgb(color)
    ser.format.line.width = Pt(width)
    if dash:
        ser.format.line.dash_style = dash
    ser.smooth = False


def line_chart(s, x, y, w, h, cats, series, title='', legend=False, colors=None, dashes=None):
    data = CategoryChartData()
    data.categories = cats
    for name, vals in series:
        data.add_series(name, vals)
    gf = s.shapes.add_chart(XL_CHART_TYPE.LINE, Inches(x), Inches(y), Inches(w), Inches(h), data)
    ch = gf.chart
    ch.has_title = bool(title)
    if title:
        ch.chart_title.text_frame.text = title
        r = ch.chart_title.text_frame.paragraphs[0].runs[0]
        r.font.size = Pt(12); r.font.bold = True; r.font.name = FONT; r.font.color.rgb = rgb(C['blue'])
    ch.has_legend = legend
    if legend:
        ch.legend.position = XL_LEGEND_POSITION.BOTTOM
        ch.legend.include_in_layout = False
        ch.legend.font.size = Pt(9); ch.legend.font.name = FONT
    colors = colors or [C['blue'], C['mgray'], C['green']]
    for k, ser in enumerate(ch.plots[0].series):
        style_series(ser, colors[k % len(colors)],
                     dash=dashes[k] if dashes else None)
    style_axis(ch.category_axis)
    _tick_skip(ch.category_axis, max(1, len(cats) // 7))
    style_axis(ch.value_axis, gridlines=True)
    return gf


def bar_chart(s, x, y, w, h, cats, values, title='', color=C['blue'], per_point=None,
              labels=True, horizontal=False):
    data = CategoryChartData()
    data.categories = cats
    data.add_series('v', values)
    typ = XL_CHART_TYPE.BAR_CLUSTERED if horizontal else XL_CHART_TYPE.COLUMN_CLUSTERED
    gf = s.shapes.add_chart(typ, Inches(x), Inches(y), Inches(w), Inches(h), data)
    ch = gf.chart
    ch.has_title = bool(title)
    if title:
        ch.chart_title.text_frame.text = title
        r = ch.chart_title.text_frame.paragraphs[0].runs[0]
        r.font.size = Pt(12); r.font.bold = True; r.font.name = FONT; r.font.color.rgb = rgb(C['blue'])
    ch.has_legend = False
    plot = ch.plots[0]
    plot.gap_width = 60
    ser = plot.series[0]
    if per_point:
        for k, pt in enumerate(ser.points):
            pt.format.fill.solid()
            pt.format.fill.fore_color.rgb = rgb(per_point[k % len(per_point)])
            pt.format.line.fill.background()
    else:
        ser.format.fill.solid(); ser.format.fill.fore_color.rgb = rgb(color)
        ser.format.line.fill.background()
    if labels:
        plot.has_data_labels = True
        dl = plot.data_labels
        dl.font.size = Pt(10); dl.font.bold = True; dl.font.name = FONT
        dl.font.color.rgb = rgb(C['gray'])
        dl.position = XL_LABEL_POSITION.OUTSIDE_END
    cat_ax, val_ax = (ch.value_axis, ch.category_axis) if horizontal else (ch.category_axis, ch.value_axis)
    if horizontal:
        ch.category_axis.tick_labels.font.size = Pt(10)
    style_axis(ch.category_axis, size=10)
    style_axis(ch.value_axis, gridlines=True)
    return gf


def header(s, num, title, sub=''):
    rect(s, ML, 0.42, 0.09, 0.62, fill=C['blue'])
    off = 0.22
    if num:
        txt(s, ML + 0.22, 0.36, 0.7, 0.7, f'{num:02d}', size=30, color=C['lblue'], bold=True)
        off = 0.95
    txt(s, ML + off, 0.36, CW - 1.0, 0.45, title, size=22, color=C['blue'], bold=True)
    if sub:
        txt(s, ML + off, 0.78, CW - 1.0, 0.3, sub, size=11, color=C['sgray'])
    rect(s, ML, 1.18, CW, 0.012, fill=C['line'])
    return 1.42


def footer(s, num, total):
    rect(s, 0, 7.12, W, 0.012, fill=C['line'])
    txt(s, ML, 7.18, 8, 0.28, f'Rapport de performance 360° — Porokhane Digital Consulting · {_month}',
        size=9, color=C['sgray'])
    txt(s, W - ML - 1.5, 7.18, 1.5, 0.28, f'{num} / {total}', size=9, color=C['sgray'],
        align=PP_ALIGN.RIGHT)


def delta_runs(d, sens, kind_good='up'):
    col = C['dgreen'] if (sens == kind_good) else (C['sgray'] if sens == 'flat' else C['red'])
    arrow = '▲' if sens == 'up' else ('▼' if sens == 'down' else '◆')
    return [(f'{arrow} {d}', {'color': col, 'bold': True, 'size': 10})]


def build_pptx(an, path):
    global prs, _month
    _month = an['month_label']
    prs = Presentation()
    prs.slide_width = Inches(W)
    prs.slide_height = Inches(H)
    blank = prs.slide_layouts[6]
    g, g4 = an['gsc'], an.get('ga4')
    slides = []

    # ================= SLIDE 1 — COUVERTURE =================
    s = prs.slides.add_slide(blank)
    rect(s, 0, 0, W, 0.18, fill=C['blue'])
    rect(s, 0, 0.18, W, 0.05, fill=C['green'])
    if os.path.exists(LOGO):
        s.shapes.add_picture(LOGO, Inches(W / 2 - 1.85), Inches(0.85), height=Inches(0.95))
    txt(s, 1, 2.15, W - 2, 0.6, 'Rapport de Performance Mensuel', size=36, color=C['blue'],
        bold=True, align=PP_ALIGN.CENTER)
    txt(s, 1, 2.85, W - 2, 0.4, 'Vision 360° — Référencement Google · Trafic · Conversions',
        size=15, color=C['gray'], align=PP_ALIGN.CENTER)
    txt(s, 1, 3.5, W - 2, 0.55, an['month_label'], size=28, color=C['green'], bold=True,
        align=PP_ALIGN.CENTER)
    txt(s, 1, 4.12, W - 2, 0.3, f"Période : {an['periode']}   ·   Comparée à : {an['prev_periode']}",
        size=12, color=C['sgray'], align=PP_ALIGN.CENTER)
    # 4 badges KPI
    bw, bh, gap = 2.7, 1.05, 0.35
    bx = (W - (4 * bw + 3 * gap)) / 2
    badges = [('CLICS GOOGLE', fmt_int(g['clics']), 'vs ' + fmt_int(g['clics_prev'])),
              ('IMPRESSIONS', fmt_int(g['impr']), 'vs ' + fmt_int(g['impr_prev']))]
    if g4:
        badges += [('SESSIONS', fmt_int(g4['sessions']),
                    'vs ' + fmt_int(g4['sessions_prev']) if g4['sessions_prev'] else '1ʳᵉ mesure'),
                   ('ÉVÉNEMENTS CLÉS', str(int(g4['key_events'])), 'contacts + leads')]
    else:
        badges += [('CTR MOYEN', fmt_pct(g['ctr']), ''), ('POSITION MOY.', fmt_pos(g['pos']), '')]
    for k, (t_, v_, n_) in enumerate(badges):
        x = bx + k * (bw + gap)
        rect(s, x, 4.75, bw, bh, fill=C['lgray'], round_=True, radius=0.1)
        rect(s, x, 4.75, bw, 0.06, fill=C['blue'] if k < 2 else C['green'])
        txt(s, x, 4.92, bw, 0.28, t_, size=10, color=C['sgray'], bold=True, align=PP_ALIGN.CENTER)
        txt(s, x, 5.18, bw, 0.4, v_, size=24, color=C['blue'] if k < 2 else C['green'],
            bold=True, align=PP_ALIGN.CENTER)
        txt(s, x, 5.6, bw, 0.25, n_, size=9, color=C['sgray'], align=PP_ALIGN.CENTER)
    rect(s, 0, 6.6, W, 0.9, fill=C['blue'])
    txt(s, 1, 6.78, W - 2, 0.3, an['site'], size=14, color=C['white'], bold=True, align=PP_ALIGN.CENTER)
    txt(s, 1, 7.08, W - 2, 0.28, f"Rapport généré le {an['gen_date']} — données Search Console & Google Analytics 4",
        size=10, color=C['lblue'], align=PP_ALIGN.CENTER)
    slides.append(s)

    # ================= SLIDE 2 — SOMMAIRE =================
    s = prs.slides.add_slide(blank)
    header(s, None, 'Sommaire', f"{an['site']} — {an['periode']}")
    items = [
        ('01', 'Vue 360° & synthèse exécutive', 'Visibilité · Acquisition · Engagement · Conversion', '3'),
        ('02', 'Référencement naturel (Search Console)', 'Indicateurs, évolution, requêtes, pages, positions', '4 – 8'),
        ('03', 'Trafic & audience (Google Analytics)', 'Sessions, canaux d’acquisition, appareils, zones', '9 – 10, 12'),
        ('04', 'Conversions & prospects', 'Événements clés, canaux qui convertissent, contacts', '11'),
        ('05', 'Opportunités & risques', 'Quick wins, cannibalisation, alertes prioritaires', '13 – 14'),
        ('06', 'Plan d’action & recommandations', 'Priorités 30 jours, objectifs, verdict', '15 – 16')]
    y = 1.6
    for num, t_, sub, pg in items:
        rect(s, ML, y, CW, 0.78, fill=C['lgray'] if int(num) % 2 else C['white'],
             line=C['line'], round_=True, radius=0.08)
        txt(s, ML + 0.25, y + 0.16, 0.75, 0.5, num, size=22, color=C['blue'], bold=True)
        txt(s, ML + 1.1, y + 0.1, 8.6, 0.32, t_, size=14, color=C['gray'], bold=True)
        txt(s, ML + 1.1, y + 0.42, 8.6, 0.28, sub, size=10.5, color=C['sgray'])
        txt(s, ML + CW - 1.4, y + 0.2, 1.15, 0.35, f'p. {pg}', size=11, color=C['blue'],
            bold=True, align=PP_ALIGN.RIGHT)
        y += 0.9
    footer(s, 2, 16)
    slides.append(s)

    # ================= SLIDE 3 — VUE 360 =================
    s = prs.slides.add_slide(blank)
    header(s, 1, 'Vue 360° — les 4 piliers de la performance',
           'De la visibilité Google jusqu’au contact : où en est-on, où sont les risques')
    cw4, gap = 2.92, 0.18
    for k, v in enumerate(an['vision']):
        x = ML + k * (cw4 + gap)
        rect(s, x, 1.5, cw4, 1.9, fill=C['white'], line=C['line'], round_=True, radius=0.08)
        rect(s, x, 1.5, cw4, 0.07, fill=CLS_COL[v['cls']])
        txt(s, x + 0.15, 1.68, cw4 - 0.3, 0.28, v['p'].upper(), size=11, color=C['blue'], bold=True)
        pill(s, x + 0.15, 2.0, 1.35, 0.3, v['status'], CLS_COL[v['cls']], size=9)
        bullets(s, x + 0.15, 2.42, cw4 - 0.25, 0.95, v['lines'], size=9.5, gap=2, spacing=1.0)
    # Entonnoir
    ty = 3.62
    txt(s, ML, ty, 8, 0.32, 'L’entonnoir complet — de l’impression Google au contact',
        size=14, color=C['blue'], bold=True)
    fy = ty + 0.45
    fcolors = [C['lblue'], C['blue'], C['dgreen'], C['green']]
    fw = [11.0, 8.6, 6.6, 4.8]
    for k, step in enumerate(an['funnel'][:4]):
        w_ = fw[k]
        x = ML + (11.0 - w_) / 2
        rect(s, x, fy, w_, 0.62, fill=fcolors[k], round_=True, radius=0.12)
        tcol = C['blue'] if k == 0 else C['white']
        txt(s, x, fy + 0.07, w_, 0.28,
            [[(step['label'] + ' : ', {'size': 12, 'bold': True, 'color': tcol}),
              (fmt_int(step['v']), {'size': 14, 'bold': True, 'color': tcol})]],
            align=PP_ALIGN.CENTER)
        txt(s, x, fy + 0.36, w_, 0.22, step['sub'], size=8.5, color=tcol, align=PP_ALIGN.CENTER)
        if step.get('ratio'):
            txt(s, x + w_ + 0.15, fy + 0.14, 1.6, 0.3, f'→ {fmt_pct(step["ratio"], 1)}',
                size=10, color=C['sgray'], bold=True)
        fy += 0.74
    footer(s, 3, 16)
    slides.append(s)

    # ================= SLIDE 4 — SEO : INDICATEURS =================
    s = prs.slides.add_slide(blank)
    header(s, 2, 'Référencement — indicateurs clés', 'Search Console · ' + an['periode'])
    cards = [('Clics', fmt_int(g['clics']), g['lignes'][0]),
             ('Impressions', fmt_int(g['impr']), g['lignes'][1]),
             ('CTR moyen', fmt_pct(g['ctr']), g['lignes'][2]),
             ('Position moyenne', fmt_pos(g['pos']), g['lignes'][3])]
    cw4 = (CW - 3 * 0.2) / 4
    for k, (t_, v_, ln) in enumerate(cards):
        kpi_card(s, ML + k * (cw4 + 0.2), 1.5, cw4, 1.5, t_, v_,
                 ln['delta'], ln['verdict'], accent=C['blue'], sens=ln['sens'])
    txt(s, ML, 3.25, CW, 0.3, 'Comparaison avec la période précédente', size=13,
        color=C['blue'], bold=True)
    rows = []
    fmt_map = {'Clics': fmt_int, 'Impressions': fmt_int, 'CTR moyen': fmt_pct,
               'Position moyenne': fmt_pos}
    for ln in g['lignes']:
        f = fmt_map[ln['label']]
        verdict = {'good': 'En progrès', 'bad': 'En recul', 'flat': 'Stable'}[ln['verdict']]
        vcol = CLS_COL[ln['verdict']]
        arrow = '▲' if ln['sens'] == 'up' else ('▼' if ln['sens'] == 'down' else '◆')
        d_txt = ln['delta'] + (' places' if ln['label'] == 'Position moyenne' and '%' not in ln['delta'] and ln['delta'] not in ('n/a', 'nv.') else '')
        rows.append([ln['label'], f(ln['val']), f(ln['prev']),
                     [(f'{arrow} {d_txt}', {'color': vcol, 'bold': True})],
                     [(verdict, {'color': vcol, 'bold': True})]])
    table(s, ML, 3.6, CW, [3.6, 2.4, 2.4, 2.0, 1.83], rows,
          ['Indicateur', 'Période actuelle', 'Période précédente', 'Variation', 'Tendance'],
          aligns=[PP_ALIGN.LEFT, PP_ALIGN.CENTER, PP_ALIGN.CENTER, PP_ALIGN.CENTER, PP_ALIGN.CENTER],
          row_h=0.52)
    txt(s, ML, 6.15, CW, 0.5,
        'Lecture : la position moyenne est le nerf de la guerre — chaque point gagné '
        'rapproche le site de la page 1, où se concentrent les clics.',
        size=10, color=C['sgray'])
    footer(s, 4, 16)
    slides.append(s)

    # ================= SLIDE 5 — ÉVOLUTION SEO =================
    s = prs.slides.add_slide(blank)
    header(s, 2, 'Évolution jour par jour', 'Période actuelle vs période précédente — Search Console')
    line_chart(s, ML, 1.5, 6.0, 4.4, an['daily']['labels'],
               [('Clics (actuel)', an['daily']['clics']), ('Clics (précédent)', an['daily']['clics_prev'])],
               title='Clics par jour', legend=True, colors=[C['blue'], C['mgray']],
               dashes=[None, MSO_LINE_DASH_STYLE.DASH])
    line_chart(s, ML + 6.2, 1.5, 6.0, 4.4, an['daily']['labels'],
               [('Impressions (actuel)', an['daily']['impr']), ('Impressions (préc.)', an['daily']['impr_prev'])],
               title='Impressions par jour', legend=True, colors=[C['green'], C['mgray']],
               dashes=[None, MSO_LINE_DASH_STYLE.DASH])
    txt(s, ML, 6.15, CW, 0.5,
        f"Sur {an['days']} jours : {fmt_int(g['clics'])} clics et {fmt_int(g['impr'])} impressions — "
        'la courbe pointillée (période précédente) sert de référence pour mesurer la progression.',
        size=10, color=C['sgray'])
    footer(s, 5, 16)
    slides.append(s)

    # ================= SLIDE 6 — TOP REQUÊTES =================
    s = prs.slides.add_slide(blank)
    header(s, 2, 'Top 10 requêtes', 'Les mots-clés qui apportent le plus de clics — hors requêtes anonymisées par Google')
    rows = []
    for i, q in enumerate(an['top_queries']):
        rows.append([str(i + 1), tronq(q['q'], 45), str(q['clics']), fmt_int(q['impr']),
                     fmt_pct(q['ctr']), fmt_pos(q['pos'])] + [delta_runs(q['d'], q['sens'])])
    table(s, ML, 1.55, CW, [0.55, 5.0, 1.1, 1.4, 1.1, 1.3, 1.78], rows,
          ['#', 'Requête', 'Clics', 'Impr.', 'CTR', 'Position', 'Évol. clics'],
          aligns=[PP_ALIGN.CENTER, PP_ALIGN.LEFT] + [PP_ALIGN.CENTER] * 5,
          row_h=0.42, head_h=0.44)
    if an['top_queries']:
        tq = an['top_queries'][0]
        rect(s, ML, 6.45, CW, 0.5, fill=C['lblue'], round_=True, radius=0.15)
        txt(s, ML + 0.2, 6.55, CW - 0.4, 0.3,
            [[('À retenir : ', {'bold': True, 'color': C['blue']}),
              (f"« {tq['q']} » porte la visibilité ({tq['clics']} clics, pos. {fmt_pos(tq['pos'])}). "
               'Sécuriser ce mot-clé tout en poussant les requêtes de page 2 (slide suivante).',
               {'color': C['gray']})]], size=10.5)
    footer(s, 6, 16)
    slides.append(s)

    # ================= SLIDE 7 — TOP PAGES =================
    s = prs.slides.add_slide(blank)
    header(s, 2, 'Top 10 pages', 'Les pages les plus visibles dans Google')
    rows = []
    for i, p in enumerate(an['top_pages']):
        rows.append([str(i + 1), tronq(p['page'], 52), str(p['clics']), fmt_int(p['impr']),
                     fmt_pct(p['ctr']), fmt_pos(p['pos'])])
    table(s, ML, 1.55, CW, [0.55, 5.6, 1.1, 1.4, 1.1, 1.3], rows,
          ['#', 'Page', 'Clics', 'Impr.', 'CTR', 'Position'],
          aligns=[PP_ALIGN.CENTER, PP_ALIGN.LEFT] + [PP_ALIGN.CENTER] * 4,
          row_h=0.42, head_h=0.44)
    low = [p for p in an['top_pages'] if p['ctr'] < 0.01 and p['impr'] >= 80]
    msg = ('Pages à fort volume mais CTR < 1 % : ' +
           ', '.join(tronq(p['page'], 30) for p in low[:3]) +
           ' — réécrire leurs titles/descriptions peut doubler leurs clics.'
           if low else
           'Les pages les plus vues convertissent correctement en clics — maintenir les titles actuels.')
    rect(s, ML, 6.45, CW, 0.5, fill=C['lblue'], round_=True, radius=0.15)
    txt(s, ML + 0.2, 6.55, CW - 0.4, 0.3,
        [[('Point d’attention : ', {'bold': True, 'color': C['blue']}), (msg, {'color': C['gray']})]],
        size=10.5)
    footer(s, 7, 16)
    slides.append(s)

    # ================= SLIDE 8 — POSITIONS & QUICK WINS =================
    s = prs.slides.add_slide(blank)
    header(s, 2, 'Positions des requêtes', 'Combien de mots-clés en page 1, page 2, au-delà — et lesquels')
    bk = an['buckets']
    cats = ['Top 3', '4–10', '11–20', '> 20']
    vals = [len(bk['top3']), len(bk['p4_10']), len(bk['p11_20']), len(bk['p20'])]
    bar_chart(s, ML, 1.5, 5.6, 4.6, cats, vals, title='Requêtes par zone de classement',
              per_point=[C['dgreen'], C['blue'], C['yellow'], C['red']])
    x = ML + 6.0
    txt(s, x, 1.5, CW - 6.0, 0.3, 'Quelles requêtes, dans quelle zone ?', size=13,
        color=C['blue'], bold=True)
    zones = [('TOP 3 — page 1, premiers résultats', bk['top3'], C['dgreen']),
             ('POSITIONS 4–10 — page 1', bk['p4_10'], C['blue']),
             ('POSITIONS 11–20 — page 2 (quick wins)', bk['p11_20'], C['yellow']),
             ('> 20 — peu visibles', bk['p20'], C['red'])]
    zy = 1.9
    for titre, lst, col in zones:
        rect(s, x, zy, CW - 6.0, 0.94, fill=C['lgray'], round_=True, radius=0.1)
        rect(s, x, zy, 0.07, 0.94, fill=col)
        txt(s, x + 0.18, zy + 0.07, CW - 6.2, 0.26, f'{titre} — {len(lst)} requêtes',
            size=10, color=C['gray'], bold=True)
        names = '  ·  '.join(f'« {tronq(q, 26)} » ({fmt_pos(p)})' for q, p, *_ in lst[:3]) or '—'
        txt(s, x + 0.18, zy + 0.36, CW - 6.2, 0.52, names, size=9.5, color=C['sgray'], spacing=1.0)
        zy += 1.04
    txt(s, ML, 6.3, CW, 0.5,
        f"Objectif : faire basculer les {len(bk['p11_20'])} requêtes de la zone 11–20 en page 1 — "
        "c'est le levier de croissance le plus rapide.",
        size=10.5, color=C['gray'], bold=False)
    footer(s, 8, 16)
    slides.append(s)

    # ================= SLIDE 9 — GA4 AUDIENCE =================
    if g4:
        s = prs.slides.add_slide(blank)
        header(s, 3, 'Trafic & audience', 'Google Analytics 4 · ' + an['periode'])
        cards = [('Sessions', fmt_int(g4['sessions']), g4['lignes'][0]),
                 ('Utilisateurs', fmt_int(g4['users']), g4['lignes'][1]),
                 ("Taux d'engagement", fmt_pct(g4['eng']), g4['lignes'][2]),
                 ('Durée moy. session', fmt_dur(g4['duree']), None),
                 ('Taux de conversion', fmt_pct(g4['conv_rate'], 1), g4['lignes'][3])]
        cw5 = (CW - 4 * 0.18) / 5
        for k, (t_, v_, ln) in enumerate(cards):
            kpi_card(s, ML + k * (cw5 + 0.18), 1.5, cw5, 1.5, t_, v_,
                     ln['delta'] if ln else '', ln['verdict'] if ln else 'flat',
                     accent=C['green'], sens=ln['sens'] if ln else 'flat')
        if 'sessions' in an['daily']:
            line_chart(s, ML, 3.3, 6.6, 3.3, an['daily']['labels'],
                       [('Sessions par jour', an['daily']['sessions'])],
                       title='Sessions par jour (tous canaux)', colors=[C['green']])
        x = ML + 7.1
        rect(s, x, 3.3, CW - 7.1, 3.3, fill=C['lgray'], round_=True, radius=0.06)
        txt(s, x + 0.2, 3.45, CW - 7.4, 0.3, 'Lecture audience', size=12, color=C['blue'], bold=True)
        nts = []
        eng = g4['eng']
        nts.append(f"Engagement {fmt_pct(eng)} — {'au-dessus' if eng >= 0.5 else 'en-dessous'} "
                   'du seuil de confort de 50 % : le contenu retient '
                   + ('bien' if eng >= 0.5 else 'encore mal') + ' les visiteurs.')
        mob = next((d for d in an['devices'] if d['dev'] == 'mobile'), None)
        if mob:
            nts.append(f"Mobile = {fmt_pct(mob['sessions'] / g4['sessions'] if g4['sessions'] else 0, 0)} "
                       'des sessions — la priorité reste l’expérience mobile.')
        nts.append(f"Chaque visiteur consulte en moyenne {g4['pages_sess']:.1f} page(s) "
                   f"et reste {fmt_dur(g4['duree'])}.".replace('.', ','))
        first_zero = next((k for k, v in enumerate(an['daily'].get('sessions', [])) if v > 0), 0)
        if first_zero > 7:
            nts.append(f"La collecte GA4 a démarré vers le {an['daily']['labels'][first_zero]} — "
                       "la comparaison complète sera visible au prochain rapport.")
        bullets(s, x + 0.2, 3.8, CW - 7.5, 2.7, nts, size=10.5, gap=8)
        footer(s, 9, 16)
        slides.append(s)

    # ================= SLIDE 10 — ACQUISITION =================
    if g4:
        s = prs.slides.add_slide(blank)
        header(s, 3, 'D’où vient le trafic', 'Canaux et sources d’acquisition — GA4')
        can = an['canaux'][:7]
        bar_chart(s, ML, 1.5, 5.9, 4.7, [tronq(c['canal'], 26) for c in can],
                  [c['sessions'] for c in can], title='Sessions par canal',
                  per_point=[C['green'], C['blue'], C['dgreen'], C['yellow'], C['mgray'], C['lblue'], C['sgray']],
                  horizontal=True)
        x = ML + 6.3
        rows = [[tronq(sr['src'], 34), str(sr['sessions']), str(sr['conv'])] for sr in an['sources'][:8]]
        table(s, x, 1.55, CW - 6.3, [3.2, 1.15, 1.15], rows,
              ['Source / support', 'Sessions', 'Conv.'], row_h=0.36, head_h=0.4, size=9.5,
              aligns=[PP_ALIGN.LEFT, PP_ALIGN.CENTER, PP_ALIGN.CENTER])
        rect(s, ML, 6.4, CW, 0.55, fill=C['lblue'], round_=True, radius=0.15)
        txt(s, ML + 0.2, 6.5, CW - 0.4, 0.35,
            [[('Répartition : ', {'bold': True, 'color': C['blue']}),
              (f"{fmt_pct(an['paid_share'], 0)} du trafic vient de Google Ads — "
               + ('dépendance marquée au payant : le SEO doit prendre le relais.'
                  if an['paid_share'] > 0.35 else
                  'équilibre sain entre payant et naturel à préserver.'), {'color': C['gray']})]],
            size=10.5)
        footer(s, 10, 16)
        slides.append(s)

    # ================= SLIDE 11 — CONVERSIONS =================
    if g4:
        s = prs.slides.add_slide(blank)
        header(s, 4, 'Conversions & prospects', 'Ce que le site rapporte concrètement — événements clés GA4')
        # Bloc gauche : événements
        rect(s, ML, 1.5, 4.1, 2.5, fill=C['white'], line=C['line'], round_=True)
        txt(s, ML + 0.2, 1.65, 3.7, 0.3, 'ÉVÉNEMENTS CLÉS', size=11, color=C['blue'], bold=True)
        txt(s, ML + 0.2, 1.95, 3.7, 0.6, str(int(g4['key_events'])), size=34, color=C['green'], bold=True)
        ev_lbl = {'contact_click': 'Clics de contact (tél., WhatsApp, e-mail)',
                  'generate_lead': 'Demandes de devis (formulaire)',
                  'newsletter_signup': 'Inscriptions newsletter'}
        ev_lines = [[(f"{ev_lbl.get(e['ev'], e['ev'])} : ", {}), (str(e['n']), {'bold': True, 'color': C['blue']})]
                    for e in an['conv_events']] or [[('Aucun événement clé sur la période', {})]]
        bullets(s, ML + 0.2, 2.65, 3.7, 1.2, ev_lines, size=9.5, gap=4)
        # Bloc milieu : canaux qui convertissent
        rect(s, ML + 4.35, 1.5, 4.1, 2.5, fill=C['white'], line=C['line'], round_=True)
        txt(s, ML + 4.55, 1.65, 3.7, 0.3, 'CANAUX QUI CONVERTISSENT', size=11, color=C['blue'], bold=True)
        cc = [[(f"{c['canal']} : ", {}), (str(c['n']), {'bold': True, 'color': C['green']}),
               (' évén. clé(s)', {'color': C['sgray']})] for c in an['conv_canal']] or \
             [[('Aucune conversion attribuée', {})]]
        bullets(s, ML + 4.55, 2.05, 3.7, 1.6, cc, size=10, gap=6)
        txt(s, ML + 4.55, 3.55, 3.7, 0.4, 'Le SEO apporte des prospects gratuits — '
            'le canal à faire croître.', size=9, color=C['sgray'])
        # Bloc droit : contacts détaillés
        rect(s, ML + 8.7, 1.5, CW - 8.7, 2.5, fill=C['white'], line=C['line'], round_=True)
        txt(s, ML + 8.9, 1.65, CW - 9.1, 0.3, 'CONTACTS PAR CANAL', size=11, color=C['blue'], bold=True)
        ct = g4['contacts']
        icons = {'Bouton WhatsApp': C['green'], 'Appel téléphonique': C['blue'],
                 'E-mail (mailto)': C['dgreen'], 'Autre contact': C['sgray']}
        cy = 2.05
        for k, v_ in sorted(ct.items(), key=lambda x: -x[1]['conv']):
            pill(s, ML + 8.9, cy, 1.1, 0.32, str(v_['conv']), icons.get(k, C['sgray']), size=10)
            txt(s, ML + 10.1, cy + 0.02, 2.1, 0.3,
                [[(k, {'size': 10.5, 'color': C['gray']}),
                  (f" ({v_['clics']} clics)", {'size': 8.5, 'color': C['sgray']})]])
            cy += 0.44
        if not ct:
            txt(s, ML + 8.9, 2.1, CW - 9.1, 0.6, 'Aucun clic de contact mesuré', size=10, color=C['sgray'])
        else:
            n_conv = sum(v['conv'] for v in ct.values())
            n_clics = sum(v['clics'] for v in ct.values())
            txt(s, ML + 8.9, 3.62, CW - 9.1, 0.3,
                f'{n_conv} conversions comptabilisées sur {n_clics} clics de contact.',
                size=8.5, color=C['sgray'])
        # Pages qui convertissent
        txt(s, ML, 4.25, CW, 0.3, 'Pages génératrices de contacts', size=13, color=C['blue'], bold=True)
        rows = [[tronq(p['page'], 55), str(p['n'])] for p in an['conv_pages']] or [['—', '0']]
        table(s, ML, 4.6, 7.3, [6.0, 1.3], rows, ['Page', 'Évén. clés'],
              aligns=[PP_ALIGN.LEFT, PP_ALIGN.CENTER], row_h=0.35, head_h=0.38, size=10)
        rect(s, ML + 7.6, 4.6, CW - 7.6, 1.85, fill=C['lgreen'], round_=True, radius=0.08)
        txt(s, ML + 7.8, 4.75, CW - 8.0, 0.3, 'À retenir', size=11, color=C['dgreen'], bold=True)
        lead0 = not any(e['ev'] == 'generate_lead' for e in an['conv_events'])
        msg = ('Les contacts passent par les liens directs (WhatsApp, téléphone, e-mail), '
               'pas par le formulaire de devis — à vérifier et simplifier.'
               if lead0 else
               'Formulaire et liens directs génèrent tous deux des contacts — bon équilibre.')
        txt(s, ML + 7.8, 5.1, CW - 8.0, 1.2, msg, size=10, color=C['gray'], spacing=1.15)
        footer(s, 11, 16)
        slides.append(s)

    # ================= SLIDE 12 — PROFIL AUDIENCE =================
    if g4:
        s = prs.slides.add_slide(blank)
        header(s, 3, 'Qui sont les visiteurs', 'Appareils, pays, villes et pages d’entrée — GA4')
        # Appareils
        txt(s, ML, 1.5, 3.8, 0.3, 'Appareils', size=13, color=C['blue'], bold=True)
        rows = [[d['dev'], str(d['sessions']), fmt_pct(d['eng']), str(d['conv'])] for d in an['devices']]
        table(s, ML, 1.85, 3.8, [1.5, 0.9, 0.8, 0.6], rows,
              ['Appareil', 'Sess.', 'Eng.', 'Conv.'], row_h=0.34, head_h=0.36, size=9.5,
              aligns=[PP_ALIGN.LEFT, PP_ALIGN.CENTER, PP_ALIGN.CENTER, PP_ALIGN.CENTER])
        # Pays
        txt(s, ML + 4.1, 1.5, 4.0, 0.3, 'Pays', size=13, color=C['blue'], bold=True)
        rows = [[tronq(p['pays'], 18), str(p['sessions']), str(p['conv'])] for p in an['pays_ga'][:6]]
        table(s, ML + 4.1, 1.85, 4.0, [2.2, 1.0, 0.8], rows,
              ['Pays', 'Sess.', 'Conv.'], row_h=0.34, head_h=0.36, size=9.5,
              aligns=[PP_ALIGN.LEFT, PP_ALIGN.CENTER, PP_ALIGN.CENTER])
        # Villes
        txt(s, ML + 8.4, 1.5, CW - 8.4, 0.3, 'Villes', size=13, color=C['blue'], bold=True)
        rows = [[tronq(v_['ville'], 20), str(v_['sessions']), str(v_['conv'])] for v_ in an['villes'][:6]]
        table(s, ML + 8.4, 1.85, CW - 8.4, [2.35, 0.85, 0.75], rows,
              ['Ville', 'Sess.', 'Conv.'], row_h=0.34, head_h=0.36, size=9.5,
              aligns=[PP_ALIGN.LEFT, PP_ALIGN.CENTER, PP_ALIGN.CENTER])
        # Landing pages
        txt(s, ML, 4.35, CW, 0.3, 'Pages d’entrée (1ʳᵉ page vue)', size=13, color=C['blue'], bold=True)
        rows = [[tronq(l['page'], 55), str(l['sessions']), fmt_pct(l['eng']), str(l['conv'])]
                for l in an['landing'][:5]]
        table(s, ML, 4.7, CW, [8.0, 1.5, 1.4, 1.33], rows,
              ['Page', 'Sessions', 'Engagement', 'Conv.'], row_h=0.34, head_h=0.38, size=10,
              aligns=[PP_ALIGN.LEFT, PP_ALIGN.CENTER, PP_ALIGN.CENTER, PP_ALIGN.CENTER])
        txt(s, ML, 6.75, CW, 0.3,
            f"Le Sénégal représente {fmt_pct(an['senegal_share'], 0)} des sessions — "
            + ('cœur de cible bien couvert.' if an['senegal_share'] >= 0.5 else
               'marge de progression sur le ciblage local.'), size=10, color=C['sgray'])
        footer(s, 12, 16)
        slides.append(s)

    # ================= SLIDE 13 — OPPORTUNITÉS =================
    s = prs.slides.add_slide(blank)
    header(s, 5, 'Opportunités détectées', 'Là où la croissance est la plus accessible')
    cw2 = (CW - 0.3) / 2
    icons = [C['dgreen'], C['blue'], C['green'], C['yellow']]
    for k, o in enumerate(an['opps']):
        x = ML + (k % 2) * (cw2 + 0.3)
        y = 1.55 + (k // 2) * 2.45
        rect(s, x, y, cw2, 2.3, fill=C['white'], line=C['line'], round_=True)
        rect(s, x, y, 0.09, 2.3, fill=icons[k])
        txt(s, x + 0.25, y + 0.15, cw2 - 0.45, 0.3, o['titre'], size=12.5, color=C['blue'], bold=True)
        txt(s, x + 0.25, y + 0.5, cw2 - 0.45, 0.95, o['detail'], size=10, color=C['gray'], spacing=1.1)
        txt(s, x + 0.25, y + 1.62, cw2 - 0.45, 0.6,
            [[('→ ', {'color': C['green'], 'bold': True}), (o['act'], {'color': C['dgreen'], 'bold': True})]],
            size=10)
    footer(s, 13, 16)
    slides.append(s)

    # ================= SLIDE 14 — RISQUES =================
    s = prs.slides.add_slide(blank)
    header(s, 5, 'Risques & points de vigilance', 'Ce qui peut freiner ou faire reculer la performance')
    y = 1.5
    for r_ in an['risques']:
        rect(s, ML, y, CW, 0.82, fill=C['lgray'], round_=True, radius=0.08)
        pill(s, ML + 0.18, y + 0.24, 1.05, 0.34, r_['lvl'], LVL_COL[r_['lvl']], size=9)
        txt(s, ML + 1.45, y + 0.06, 3.1, 0.7, r_['titre'], size=11, color=C['gray'], bold=True,
            anchor=MSO_ANCHOR.MIDDLE)
        txt(s, ML + 4.6, y + 0.06, 4.4, 0.7, r_['constat'], size=9, color=C['sgray'],
            spacing=1.0, anchor=MSO_ANCHOR.MIDDLE)
        txt(s, ML + 9.15, y + 0.06, CW - 9.35, 0.7,
            [[('→ ', {'color': C['green'], 'bold': True}), (r_['action'], {'color': C['dgreen']})]],
            size=9, spacing=1.0, anchor=MSO_ANCHOR.MIDDLE)
        y += 0.92
    if not an['risques']:
        txt(s, ML, 2.5, CW, 0.6, 'Aucun risque majeur détecté sur la période.', size=14, color=C['dgreen'])
    txt(s, ML + 1.45, 1.28, 3.1, 0.22, 'RISQUE', size=8.5, color=C['mgray'], bold=True)
    txt(s, ML + 4.6, 1.28, 4.4, 0.22, 'CONSTAT', size=8.5, color=C['mgray'], bold=True)
    txt(s, ML + 9.15, 1.28, 3, 0.22, 'PARADE', size=8.5, color=C['mgray'], bold=True)
    footer(s, 14, 16)
    slides.append(s)

    # ================= SLIDE 15 — PLAN D'ACTION =================
    s = prs.slides.add_slide(blank)
    header(s, 6, 'Plan d’action — 30 jours', 'Priorisé par impact : P1 urgent, P2 ce mois, P3 ce trimestre')
    cols = [('P1 — Cette semaine', C['red'], an['plan']['P1']),
            ('P2 — Ce mois', C['yellow'], an['plan']['P2']),
            ('P3 — Ce trimestre', C['dgreen'], an['plan']['P3'])]
    cw3 = (CW - 0.6) / 3
    for k, (t_, col, items) in enumerate(cols):
        x = ML + k * (cw3 + 0.3)
        rect(s, x, 1.55, cw3, 0.55, fill=col, round_=True, radius=0.15)
        txt(s, x, 1.66, cw3, 0.32, t_, size=13, color=C['white'], bold=True, align=PP_ALIGN.CENTER)
        rect(s, x, 2.25, cw3, 3.3, fill=C['white'], line=C['line'], round_=True)
        bullets(s, x + 0.2, 2.45, cw3 - 0.4, 3.0,
                [[(it, {})] for it in items], size=10.5, gap=10, bullet='■ ',
                bcolor=col, spacing=1.1)
    rect(s, ML, 5.85, CW, 0.85, fill=C['lblue'], round_=True, radius=0.1)
    txt(s, ML + 0.2, 5.98, 3.2, 0.3, 'OBJECTIFS DU MOIS PROCHAIN', size=10, color=C['blue'], bold=True)
    tx = ML + 0.2
    for cib in an['plan']['cibles']:
        w_ = 0.35 + len(cib) * 0.085
        pill(s, tx, 6.28, w_, 0.32, cib, C['blue'], size=9.5)
        tx += w_ + 0.25
    footer(s, 15, 16)
    slides.append(s)

    # ================= SLIDE 16 — CONCLUSION =================
    s = prs.slides.add_slide(blank)
    header(s, 6, 'Conclusion & recommandations', 'Ce qu’il faut retenir — et faire')
    rect(s, ML, 1.5, CW, 0.7, fill=CLS_BG[an['verdict_cls']], round_=True, radius=0.1)
    txt(s, ML + 0.25, 1.68, CW - 0.5, 0.35,
        [[('Verdict : ', {'bold': True, 'color': CLS_COL[an['verdict_cls']]}),
          (an['verdict'], {'bold': True, 'color': C['gray']})]], size=13)
    txt(s, ML, 2.4, 6.6, 0.3, 'Points clés', size=14, color=C['blue'], bold=True)
    bullets(s, ML, 2.75, 6.4, 3.6, [[(p, {})] for p in an['points_cles']], size=10.5, gap=8)
    x = ML + 6.9
    txt(s, x, 2.4, CW - 6.9, 0.3, 'Recommandations prioritaires', size=14, color=C['blue'], bold=True)
    bullets(s, x, 2.75, CW - 7.0, 3.6, [[(r_, {})] for r_ in an['recos']], size=10, gap=8)
    rect(s, 0, 6.6, W, 0.9, fill=C['blue'])
    if os.path.exists(LOGO):
        s.shapes.add_picture(LOGO, Inches(ML), Inches(6.78), height=Inches(0.55))
    txt(s, 3.4, 6.78, W - 4.4, 0.3, 'Porokhane Digital Consulting — Agence de marketing digital à Dakar',
        size=12, color=C['white'], bold=True)
    txt(s, 3.4, 7.1, W - 4.4, 0.28, 'contact1@digital-porokhane.com · Prochain rapport : le 4 du mois prochain',
        size=10, color=C['lblue'])
    slides.append(s)

    prs.save(path)
    return path
