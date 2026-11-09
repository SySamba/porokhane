#!/usr/bin/env python3
"""
Analyse des données Search Console + GA4 -> contenu structuré du rapport 360°.
Produit tous les chiffres, variations, textes automatiques, risques,
opportunités et plan d'action utilisés par report_pptx.py.
"""

import datetime

CIBLES = ['impression 3d', 'marketing digital dakar', 'agence marketing digital',
          'agence seo', 'création site web dakar', 'formation']

PAYS_FR = {'sen': 'Sénégal', 'fra': 'France', 'usa': 'États-Unis', 'che': 'Suisse',
           'deu': 'Allemagne', 'chn': 'Chine', 'irl': 'Irlande', 'pol': 'Pologne',
           'civ': "Côte d'Ivoire", 'mli': 'Mali', 'gin': 'Guinée', 'mar': 'Maroc',
           'can': 'Canada', 'bel': 'Belgique', 'gbr': 'Royaume-Uni', 'esp': 'Espagne',
           'ita': 'Italie', 'tur': 'Turquie', 'ind': 'Inde', 'nga': 'Nigeria',
           'cmr': 'Cameroun', 'gmb': 'Gambie', 'mrt': 'Mauritanie', 'bfa': 'Burkina Faso'}

CANAL_FR = {'Organic Search': 'Recherche naturelle (SEO)', 'Paid Search': 'Google Ads (payant)',
            'Direct': 'Accès direct', 'Referral': 'Sites référents', 'Organic Social': 'Réseaux sociaux',
            'Paid Social': 'Social payant', 'Email': 'E-mail', 'Display': 'Display',
            'AI Chatbots': 'IA (ChatGPT…)', 'Unassigned': 'Non attribué',
            '(Other)': 'Autres', 'Cross-network': 'Multi-réseaux'}

NOISE_SOURCES = ('localhost', 'tagassistant', 'gtm_debug', 'data not available', '127.0.0.1')


def fmt_int(n):
    return f'{int(round(n)):,}'.replace(',', ' ').replace(' ', ' ')


def fmt_pct(x, digits=1):
    return f'{x * 100:.{digits}f} %'.replace('.', ',')


def fmt_pos(x):
    return f'{x:.1f}'.replace('.', ',')


def fmt_dur(s):
    s = int(round(s))
    return f'{s // 60}:{s % 60:02d}'


def fmt_date(d):
    return d.strftime('%d/%m/%Y') if isinstance(d, datetime.date) else str(d)


def short_date(iso):
    return f'{iso[8:10]}/{iso[5:7]}'


def delta(cur, prev, kind='pct', na_txt='n/a'):
    """Retourne (texte, sens) : sens in 'up','down','flat'. kind='pos' -> écart en points."""
    if not prev:
        return (na_txt, 'flat')
    if kind == 'pos':
        d = cur - prev
        txt = ('+' if d >= 0 else '') + fmt_pos(d)
        sens = 'up' if d > 0.2 else ('down' if d < -0.2 else 'flat')
        return txt, sens
    d = (cur - prev) / prev * 100
    txt = ('+' if d >= 0 else '') + f'{d:.0f} %'
    sens = 'up' if d > 2 else ('down' if d < -2 else 'flat')
    return txt, sens


def kpi_line(label, val, prev_val, kind='pct', good='up', na_txt='n/a', invert=False):
    t, sens = delta(val, prev_val, kind, na_txt)
    good_dir = 'up' if good == 'up' else 'down'
    verdict = 'good' if sens == good_dir else ('bad' if sens != 'flat' else 'flat')
    if invert and prev_val:
        # Métrique inversée (position) : une baisse de valeur = amélioration.
        # On affiche le GAIN en positif : -4,7 de position -> "+4,7" (places gagnées).
        t = ('+' if prev_val - val >= 0 else '') + fmt_pos(prev_val - val)
        sens = 'up' if sens == 'down' else ('down' if sens == 'up' else 'flat')
    return {'label': label, 'val': val, 'prev': prev_val, 'delta': t, 'sens': sens, 'verdict': verdict}


def clean_path(url, site):
    p = url.replace(site.rstrip('/'), '').replace('https://digital-porokhane.com', '')
    return p if p.startswith('/') else '/' + p


def tronq(s, n=60):
    return s if len(s) <= n else s[:n - 1] + '…'


def analyse(g, a, month_label):
    site = g['site']
    an = {'month_label': month_label, 'site': site.replace('https://', '').rstrip('/'),
          'periode': f"{fmt_date(g['start'])} → {fmt_date(g['end'])}",
          'prev_periode': f"{fmt_date(g['prev_start'])} → {fmt_date(g['prev_end'])}",
          'gen_date': datetime.date.today().strftime('%d/%m/%Y'),
          'days': (g['end'] - g['start']).days + 1}

    # ---------- Search Console ----------
    # Totaux calculés par JOUR : la dimension 'query' exclut les requêtes anonymisées
    # par Google (sous-estime fortement clics/impressions sur un petit site).
    def tot(rows):
        c = sum(r['clicks'] for r in rows)
        i = sum(r['impressions'] for r in rows)
        return c, i, (c / i if i else 0), (sum(r['position'] * r['impressions'] for r in rows) / i if i else 0)

    c, i, ctr, pos = tot(g['jours'])
    pc, pi, pctr, ppos = tot(g['jours_prev'])
    an['gsc'] = {'clics': c, 'impr': i, 'ctr': ctr, 'pos': pos,
                 'clics_prev': pc, 'impr_prev': pi, 'ctr_prev': pctr, 'pos_prev': ppos}
    an['gsc']['lignes'] = [
        kpi_line('Clics', c, pc, good='up'),
        kpi_line('Impressions', i, pi, good='up'),
        kpi_line('CTR moyen', ctr, pctr, kind='pos', good='up'),
        kpi_line('Position moyenne', pos, ppos, kind='pos', good='down', invert=True)]

    prev_q = {r['keys'][0]: r for r in g['requetes_prev']}
    prev_p = {r['keys'][0]: r for r in g['pages_prev']}

    def qrow(r):
        q = r['keys'][0]
        d, s = delta(r['clicks'], prev_q.get(q, {}).get('clicks', 0), na_txt='nv.')
        return {'q': q, 'clics': r['clicks'], 'impr': r['impressions'],
                'ctr': r['ctr'], 'pos': r['position'], 'd': d, 'sens': s}

    an['top_queries'] = [qrow(r) for r in sorted(g['requetes'], key=lambda r: r['clicks'], reverse=True)[:10]]
    an['top_pages'] = [{'page': clean_path(r['keys'][0], site), 'clics': r['clicks'], 'impr': r['impressions'],
                        'ctr': r['ctr'], 'pos': r['position'],
                        'd': delta(r['clicks'], prev_p.get(r['keys'][0], {}).get('clicks', 0))[0]}
                       for r in sorted(g['pages'], key=lambda r: r['clicks'], reverse=True)[:10]]

    # Tranches de position avec les vraies requêtes
    bk = {'top3': [], 'p4_10': [], 'p11_20': [], 'p20': []}
    for r in g['requetes']:
        if r['impressions'] < 3:
            continue
        e = (r['keys'][0], r['position'], r['clicks'], r['impressions'])
        p = r['position']
        bk['top3' if p <= 3 else 'p4_10' if p <= 10 else 'p11_20' if p <= 20 else 'p20'].append(e)
    for v in bk.values():
        v.sort(key=lambda e: e[3], reverse=True)
    an['buckets'] = bk

    an['quick_wins'] = bk['p11_20'][:8]
    cur_qs = {r['keys'][0] for r in g['requetes']}
    an['new_queries'] = sorted([r for r in g['requetes'] if r['keys'][0] not in prev_q],
                               key=lambda r: r['impressions'], reverse=True)[:8]
    an['lost_queries'] = sorted([r for r in g['requetes_prev']
                                 if r['keys'][0] not in cur_qs and r['impressions'] >= 15],
                                key=lambda r: r['impressions'], reverse=True)[:8]
    an['zero_click'] = sorted([r for r in g['requetes'] if r['clicks'] == 0 and r['impressions'] >= 40],
                              key=lambda r: r['impressions'], reverse=True)[:6]

    # Cannibalisation : une même requête servie par 2 pages avec des impressions notables
    qp = {}
    for r in g.get('query_page', []):
        q, p = r['keys']
        qp.setdefault(q, []).append((clean_path(p, site), r['impressions']))
    an['cannibal'] = sorted(
        [{'q': q, 'pages': [f'{p} ({im} impr.)' for p, im in v]}
         for q, v in qp.items() if len(v) >= 2 and sum(x[1] for x in v) >= 30 and v[1][1] >= 15],
        key=lambda e: -len(e['pages']))[:4]

    # Suivi des mots-clés stratégiques
    an['cibles'] = []
    for cible in CIBLES:
        rows = [r for r in g['requetes'] if cible.split()[0] in r['keys'][0].lower()
                and all(w in r['keys'][0].lower() for w in cible.split()[:2])]
        if not rows:
            rows = [r for r in g['requetes'] if cible.split()[0] in r['keys'][0].lower()]
        if rows:
            best = max(rows, key=lambda r: r['impressions'])
            pv = prev_q.get(best['keys'][0], {})
            an['cibles'].append({'cible': cible, 'q': best['keys'][0], 'pos': best['position'],
                                 'impr': best['impressions'], 'clics': best['clicks'],
                                 'pos_prev': pv.get('position')})

    # Séries quotidiennes GSC (complétées à 0)
    def series(rows, key, val):
        return {r['keys'][0]: r[key] for r in rows}
    jd, jc, ji = {}, series(g['jours'], 'clicks', None), series(g['jours'], 'impressions', None)
    days = [(g['start'] + datetime.timedelta(days=x)).isoformat() for x in range(an['days'])]
    an['daily'] = {'labels': [short_date(d) for d in days],
                   'clics': [jc.get(d, 0) for d in days], 'impr': [ji.get(d, 0) for d in days]}
    pdays = [(g['prev_start'] + datetime.timedelta(days=x)).isoformat() for x in range(an['days'])]
    pjc, pji = series(g['jours_prev'], 'clicks', None), series(g['jours_prev'], 'impressions', None)
    an['daily']['clics_prev'] = [pjc.get(d, 0) for d in pdays]
    an['daily']['impr_prev'] = [pji.get(d, 0) for d in pdays]

    # ---------- GA4 ----------
    if a:
        t, tp = a.get('total', {}), a.get('total_prev', {})

        def mv(d, name, default=0):
            v = d.get(name, default)
            return float(v) if isinstance(v, str) else v
        an['ga4'] = {
            'sessions': mv(t, 'sessions'), 'users': mv(t, 'totalUsers'), 'new': mv(t, 'newUsers'),
            'eng': mv(t, 'engagementRate'), 'bounce': mv(t, 'bounceRate'),
            'duree': mv(t, 'averageSessionDuration'), 'pages_sess': mv(t, 'screenPageViewsPerSession'),
            'conv_rate': mv(t, 'sessionKeyEventRate'), 'key_events': mv(t, 'keyEvents'),
            'sessions_prev': mv(tp, 'sessions'), 'users_prev': mv(tp, 'totalUsers'),
            'eng_prev': mv(tp, 'engagementRate'), 'conv_rate_prev': mv(tp, 'sessionKeyEventRate'),
            'key_events_prev': mv(tp, 'keyEvents'),
            'contacts': a.get('contacts', {}), 'contacts_prev': a.get('contacts_prev', {})}
        g4 = an['ga4']
        NA = '1ʳᵉ mesure'
        an['ga4']['lignes'] = [
            kpi_line('Sessions', g4['sessions'], g4['sessions_prev'], good='up', na_txt=NA),
            kpi_line('Utilisateurs', g4['users'], g4['users_prev'], good='up', na_txt=NA),
            kpi_line("Taux d'engagement", g4['eng'], g4['eng_prev'], kind='pos', good='up', na_txt=NA),
            kpi_line('Taux de conversion', g4['conv_rate'], g4['conv_rate_prev'], kind='pos', good='up', na_txt=NA),
            kpi_line('Événements clés', g4['key_events'], g4['key_events_prev'], good='up', na_txt=NA)]

        an['canaux'] = [{'canal': CANAL_FR.get(r.get('sessionDefaultChannelGroup'), r.get('sessionDefaultChannelGroup')),
                         'sessions': int(r.get('sessions', 0)), 'users': int(r.get('totalUsers', 0)),
                         'eng': float(r.get('engagementRate', 0)), 'conv': int(r.get('keyEvents', 0))}
                        for r in a.get('canaux', [])][:8]
        ch_prev = {r.get('sessionDefaultChannelGroup'): int(r.get('sessions', 0)) for r in a.get('canaux_prev', [])}
        for ch, raw in zip(an['canaux'], a.get('canaux', [])):
            ch['d'], ch['sens'] = delta(ch['sessions'], ch_prev.get(raw.get('sessionDefaultChannelGroup'), 0))

        an['sources'] = [{'src': f"{r.get('sessionSource')} / {r.get('sessionMedium')}",
                          'sessions': int(r.get('sessions', 0)), 'conv': int(r.get('keyEvents', 0))}
                         for r in a.get('sources', [])][:10]
        an['devices'] = [{'dev': r.get('deviceCategory'), 'sessions': int(r.get('sessions', 0)),
                          'eng': float(r.get('engagementRate', 0)), 'conv': int(r.get('keyEvents', 0))}
                         for r in a.get('devices', [])]
        an['pays_ga'] = [{'pays': r.get('country'), 'sessions': int(r.get('sessions', 0)),
                          'users': int(r.get('totalUsers', 0)), 'conv': int(r.get('keyEvents', 0))}
                         for r in a.get('pays', [])][:8]
        an['villes'] = [{'ville': r.get('city'), 'sessions': int(r.get('sessions', 0)),
                         'conv': int(r.get('keyEvents', 0))} for r in a.get('villes', [])][:8]
        an['landing'] = [{'page': r.get('landingPage'), 'sessions': int(r.get('sessions', 0)),
                          'eng': float(r.get('engagementRate', 0)), 'conv': int(r.get('keyEvents', 0))}
                         for r in a.get('landing', [])][:8]
        an['conv_events'] = [{'ev': r.get('eventName'), 'n': int(r.get('keyEvents', 0))}
                             for r in a.get('conversions', [])]
        an['conv_pages'] = [{'page': r.get('pagePath'), 'n': int(r.get('keyEvents', 0))}
                            for r in a.get('conv_pages', [])][:6]
        an['conv_canal'] = [{'canal': CANAL_FR.get(r.get('sessionDefaultChannelGroup'), r.get('sessionDefaultChannelGroup')),
                             'n': int(r.get('keyEvents', 0))} for r in a.get('conv_canal', [])][:6]

        # Bruit interne / test dans les sources
        noise = sum(s['sessions'] for s in an['sources']
                    if any(n in s['src'].lower() for n in NOISE_SOURCES))
        an['noise_sessions'] = noise
        tot_s = g4['sessions'] or 1
        an['paid_share'] = sum(ch['sessions'] for ch in an['canaux']
                               if 'payant' in ch['canal'].lower() or 'ads' in ch['canal'].lower()) / tot_s
        sen = sum(p['sessions'] for p in an['pays_ga'] if p['pays'] in ('Senegal', 'Sénégal')) / tot_s
        an['senegal_share'] = sen
        home = next((l for l in an['landing'] if l['page'] == '/'), None)
        an['home_share'] = (home['sessions'] / tot_s) if home else 0

        # Série quotidienne GA4
        gdays = {datetime.date(int(r['date'][:4]), int(r['date'][4:6]), int(r['date'][6:8])).isoformat(): r
                 for r in a.get('jours', [])}
        an['daily']['sessions'] = [int(gdays.get(d, {}).get('sessions', 0)) for d in days]
    else:
        an['ga4'] = None
        an['devices'] = an['pays_ga'] = an['villes'] = an['landing'] = []
        an['conv_events'] = an['conv_pages'] = an['conv_canal'] = an['sources'] = []
        an['noise_sessions'] = 0
        an['paid_share'] = an['senegal_share'] = an['home_share'] = 0

    # ---------- Entonnoir 360 ----------
    if an['ga4']:
        an['funnel'] = [
            {'label': 'Impressions Google', 'v': i, 'sub': 'personnes qui voient le site'},
            {'label': 'Clics Google', 'v': c, 'sub': f"CTR {fmt_pct(ctr)}", 'ratio': i and c / i},
            {'label': 'Sessions (tous canaux)', 'v': an['ga4']['sessions'], 'sub': 'dont SEO + Ads + direct'},
            {'label': 'Événements clés', 'v': an['ga4']['key_events'],
             'sub': 'contacts, devis, newsletter', 'ratio': an['ga4']['sessions'] and an['ga4']['key_events'] / an['ga4']['sessions']}]
    else:
        an['funnel'] = [
            {'label': 'Impressions Google', 'v': i, 'sub': 'personnes qui voient le site'},
            {'label': 'Clics Google', 'v': c, 'sub': f"CTR {fmt_pct(ctr)}", 'ratio': i and c / i}]

    # ---------- Vision 360 ----------
    def stat(ok, mid):
        return ('good', 'Solide') if ok else (('warn', 'À surveiller') if mid else ('bad', 'Critique'))
    v = []
    if an['ga4']:
        s, t_ = stat(pos <= 12 and i >= pi, pos <= 20 or i >= pi)
        v.append({'p': 'Visibilité SEO', 'status': t_, 'cls': s,
                  'lines': [f"Position moy. : {fmt_pos(pos)}", f"Impressions : {fmt_int(i)} ({delta(i, pi)[0]})",
                            f"Clics Google : {fmt_int(c)} ({delta(c, pc)[0]})"]})
        paid_dep = an['paid_share'] > 0.45
        s, t_ = stat(an['ga4']['sessions'] >= an['ga4']['sessions_prev'] and not paid_dep,
                     an['ga4']['sessions'] >= an['ga4']['sessions_prev'] * 0.9)
        v.append({'p': 'Acquisition', 'status': t_, 'cls': s,
                  'lines': [f"Sessions : {fmt_int(an['ga4']['sessions'])} ({delta(an['ga4']['sessions'], an['ga4']['sessions_prev'], na_txt='1ʳᵉ mesure')[0]})",
                            f"Part payante : {fmt_pct(an['paid_share'], 0)}",
                            f"Top canal : {an['canaux'][0]['canal'] if an['canaux'] else '—'}"]})
        eng = an['ga4']['eng']
        s, t_ = stat(eng >= 0.5, eng >= 0.3)
        v.append({'p': 'Engagement', 'status': t_, 'cls': s,
                  'lines': [f"Taux d'engagement : {fmt_pct(eng)}",
                            f"Durée moy. : {fmt_dur(an['ga4']['duree'])}",
                            f"Pages/session : {an['ga4']['pages_sess']:.1f}".replace('.', ',')]})
        ke = an['ga4']['key_events']
        s, t_ = stat(ke >= 5, ke >= 1)
        v.append({'p': 'Conversion', 'status': t_, 'cls': s,
                  'lines': [f"Événements clés : {int(ke)}",
                            f"Taux de conv. : {fmt_pct(an['ga4']['conv_rate'], 1)}",
                            f"Leads SEO : {an['conv_canal'][0]['n'] if an['conv_canal'] else 0}"]})
    else:
        s, t_ = stat(pos <= 12, pos <= 20)
        v.append({'p': 'Visibilité SEO', 'status': t_, 'cls': s,
                  'lines': [f"Position moy. : {fmt_pos(pos)}", f"Impressions : {fmt_int(i)}",
                            f"Clics : {fmt_int(c)}"]})
    an['vision'] = v

    # ---------- Points clés ----------
    pk = []
    d_c, d_i = delta(c, pc)[0], delta(i, pi)[0]
    pk.append(f"Visibilité : {fmt_int(i)} impressions ({d_i}), {fmt_int(c)} clics ({d_c}), "
              f"position moyenne {fmt_pos(pos)} — {'en progression' if i >= pi else 'en recul'}.")
    if an['top_queries']:
        tq = an['top_queries'][0]
        pk.append(f"Requête n°1 : « {tq['q']} » — {tq['clics']} clics, position {fmt_pos(tq['pos'])}.")
    if an['ga4']:
        g4 = an['ga4']
        pk.append(f"Trafic : {fmt_int(g4['sessions'])} sessions ({delta(g4['sessions'], g4['sessions_prev'], na_txt='1ʳᵉ mesure')[0]}), "
                  f"dont {fmt_pct(an['paid_share'], 0)} via Google Ads.")
        n_ct = sum(v['conv'] for v in g4['contacts'].values())
        conv_src = ', '.join(f"{k} ×{v['conv']}" for k, v in
                             sorted(g4['contacts'].items(), key=lambda x: -x[1]['conv'])) or '—'
        pk.append(f"Conversions : {int(g4['key_events'])} événements clés "
                  f"({', '.join(e['ev'] + ' ×' + str(e['n']) for e in an['conv_events']) or 'aucun'}) — "
                  f"détail : {conv_src}.")
        pk.append(f"Engagement : {fmt_pct(g4['eng'])} des sessions engagées, "
                  f"{fmt_dur(g4['duree'])} de durée moyenne.")
    if bk['p11_20']:
        pk.append(f"Potentiel immédiat : {len(bk['p11_20'])} requêtes en positions 11–20 "
                  f"(page 2) — une optimisation peut les faire basculer en page 1.")
    an['points_cles'] = pk[:6]

    # ---------- Risques ----------
    risks = []
    if an['ga4']:
        if an['paid_share'] >= 0.30:
            lvl = 'ÉLEVÉ' if an['paid_share'] >= 0.45 else 'MODÉRÉ'
            risks.append((lvl, 'Dépendance au trafic payant',
                          f"{fmt_pct(an['paid_share'], 0)} des sessions viennent de Google Ads — "
                          "le trafic s'arrête si le budget s'arrête.",
                          'Croître le SEO pour ramener le payant sous 30 % du trafic.'))
        eng = an['ga4']['eng']
        if eng < 0.4:
            risks.append(('ÉLEVÉ' if eng < 0.25 else 'MODÉRÉ', 'Engagement faible',
                          f"Seulement {fmt_pct(eng)} de sessions engagées "
                          f"(rebond {fmt_pct(an['ga4']['bounce'])}).",
                          'Vitesse mobile, contenu au-dessus de la ligne de flottaison, CTA visibles.'))
        lead0 = not any(e['ev'] == 'generate_lead' for e in an['conv_events'])
        if lead0:
            risks.append(('ÉLEVÉ', 'Aucune demande de devis',
                          "L'événement « generate_lead » (formulaire) n'a pas été déclenché — "
                          'les seuls contacts viennent des liens directs.',
                          'Vérifier/tester le formulaire devis, le raccourcir, ajouter un CTA devis sur les pages fortes.'))
        if an['senegal_share'] < 0.5:
            risks.append(('MODÉRÉ', 'Ciblage géographique',
                          f"Le Sénégal ne représente que {fmt_pct(an['senegal_share'], 0)} des sessions — "
                          'une part du trafic vient hors zone cible.',
                          'Contenus « Dakar / Sénégal », Google Business Profile, mots-clés localisés.'))
        if an['noise_sessions'] / (an['ga4']['sessions'] or 1) > 0.02:
            risks.append(('FAIBLE', 'Données polluées par le trafic interne/test',
                          f"{an['noise_sessions']} sessions repérées (localhost, Tag Assistant…) "
                          'diluent légèrement les indicateurs.',
                          'Exclure le trafic interne dans GA4 (filtre « trafic de développement »).'))
        if an['home_share'] > 0.6:
            risks.append(('FAIBLE', 'Concentration sur l’accueil',
                          f"{fmt_pct(an['home_share'], 0)} des visites arrivent par la page d'accueil — "
                          'les pages services attirent peu en direct.',
                          'Renforcer les pages services (SEO + maillage interne) comme portes d’entrée.'))
    if pos > 15:
        risks.append(('MODÉRÉ', 'Visibilité plafonnée en page 2',
                      f"Position moyenne {fmt_pos(pos)} : la majorité des requêtes est en page 2 — "
                      'visible mais peu cliqué.',
                      'Prioriser les quick wins (positions 11–20) : titres, contenu, maillage interne.'))
    if an['zero_click']:
        z = an['zero_click'][0]
        risks.append(('MODÉRÉ', 'Impressions sans clics',
                      f"{len(an['zero_click'])} requêtes à fort volume (ex. « {tronq(z['keys'][0], 35)} », "
                      f"{fmt_int(z['impressions'])} impr.) n’amènent aucun clic.",
                      'Réécrire les titles/descriptions des pages concernées pour améliorer le CTR.'))
    if an['cannibal']:
        cb = an['cannibal'][0]
        risks.append(('MODÉRÉ', 'Cannibalisation SEO',
                      f"La requête « {tronq(cb['q'], 35)} » est servie par {len(cb['pages'])} pages différentes "
                      f"({', '.join(cb['pages'][:2])}…) — Google hésite sur laquelle positionner.",
                      'Désigner une page principale par requête et rediriger/fusionner les autres.'))
    if an['lost_queries']:
        risks.append(('FAIBLE', 'Requêtes en déclin',
                      f"{len(an['lost_queries'])} requêtes visibles le mois dernier ont disparu "
                      f"(ex. « {tronq(an['lost_queries'][0]['keys'][0], 30)} »).",
                      'Surveiller ; rafraîchir les contenus concernés.'))
    if c < pc * 0.9:
        risks.append(('ÉLEVÉ', 'Clics en baisse',
                      f"Les clics reculent ({d_c}) malgré {fmt_int(i)} impressions.",
                      'Revoir les pages qui perdent des clics : intention, concurrence, saisonnalité.'))
    order = {'ÉLEVÉ': 0, 'MODÉRÉ': 1, 'FAIBLE': 2}
    an['risques'] = [{'lvl': l, 'titre': t2, 'constat': co, 'action': ac}
                     for l, t2, co, ac in sorted(risks, key=lambda r: order[r[0]])][:6]

    # ---------- Opportunités ----------
    opp = []
    if bk['p11_20']:
        names = ' · '.join(f"« {tronq(q, 26)} »" for q, *_ in bk['p11_20'][:3])
        opp.append({'titre': f"Quick wins SEO — {len(bk['p11_20'])} requêtes en page 2",
                    'detail': f"{names} : positions 11–20, déjà visibles. Optimisation ciblée = passage en page 1.",
                    'act': 'Titres + contenu enrichi + maillage interne sur les pages concernées.'})
    if an['zero_click']:
        z = an['zero_click']
        opp.append({'titre': f"{len(z)} requêtes vues mais jamais cliquées",
                    'detail': f"Ex. « {tronq(z[0]['keys'][0], 30)} » ({fmt_int(z[0]['impressions'])} impr., 0 clic) — "
                              'le site apparaît mais n’attire pas le clic.',
                    'act': 'Réécrire titles + meta descriptions, ajouter FAQ/données structurées.'})
    if an['new_queries']:
        nq = an['new_queries']
        opp.append({'titre': f"{len(nq)} nouvelles requêtes détectées",
                    'detail': f"Ex. « {tronq(nq[0]['keys'][0], 30)} » — Google teste le site sur de nouveaux sujets.",
                    'act': 'Créer/renforcer les contenus sur ces intentions avant les concurrents.'})
    if an['ga4'] and an['conv_pages']:
        bp = an['conv_pages'][0]
        opp.append({'titre': 'Modèle de conversion à répliquer',
                    'detail': f"« {bp['page']} » génère {bp['n']} événement(s) clé(s) — "
                              'c’est la page qui transforme le mieux.',
                    'act': 'Reproduire sa structure (CTA, preuve, formulaire) sur les autres pages services.'})
    an['opps'] = opp[:4]

    # ---------- Plan d'action ----------
    p1, p2, p3 = [], [], []
    if an['zero_click']:
        p1.append(f"Réécrire titles/metas des {len(an['zero_click'])} pages « vues sans clics »")
    if bk['p11_20']:
        p1.append(f"Optimiser les {min(5, len(bk['p11_20']))} quick wins (pos. 11–20) : title, H1, contenu")
    if an['ga4']:
        if not any(e['ev'] == 'generate_lead' for e in an['conv_events']):
            p1.append('Tester le formulaire devis (envoi réel) + raccourcir à 3 champs')
        if an['noise_sessions'] / (an['ga4']['sessions'] or 1) > 0.02:
            p1.append('Exclure le trafic interne/test dans GA4')
        if an['ga4']['eng'] < 0.4:
            p2.append('Améliorer l’engagement : vitesse mobile, CTA visible dès l’ouverture')
        if an['senegal_share'] < 0.5:
            p2.append('Renforcer le ciblage local : contenus « Dakar », Google Business Profile')
    if an['cannibal']:
        p2.append(f"Traiter la cannibalisation sur « {tronq(an['cannibal'][0]['q'], 30)} »")
    p2.append('Maillage interne accueil → pages services prioritaires')
    p2.append('Publier 1 article/mois sur les nouvelles requêtes détectées')
    p3.append('Netlinking local : annuaires + partenaires sénégalais')
    p3.append('Google Business Profile : fiche complète + avis clients')
    if an['ga4'] and an['paid_share'] >= 0.3:
        p3.append('Rééquilibrer SEO/Ads : objectif payant < 30 % du trafic')
    p3.append('Contenus longue traîne : formations, impression 3D, tarifs')
    if not p1:
        p1.append('Maintenir la dynamique : suivi hebdo des positions')
    an['plan'] = {'P1': p1[:4], 'P2': p2[:4], 'P3': p3[:4],
                  'cibles': [f"Clics ≥ {int(max(50, c * 1.3))}", f"Position ≤ {min(15, max(8, int(pos - 2)))}",
                             'CTR ≥ 1,5 %', 'Leads ≥ 5 / mois']}

    # ---------- Recommandations ----------
    rec = []
    for r_ in an['risques'][:3]:
        rec.append(f"[{r_['lvl']}] {r_['titre']} — {r_['action']}")
    if bk['p11_20']:
        rec.append(f"Exploiter les {len(bk['p11_20'])} requêtes en page 2 : c'est le gisement de croissance le plus rapide.")
    if an['ga4']:
        rec.append('Activer la dimension « contact_method » dans GA4 pour suivre WhatsApp/téléphone/e-mail séparément.')
        rec.append('Objectif 90 jours : doubler les leads SEO en répliquant le modèle de la page qui convertit le mieux.')
    an['recos'] = rec[:6]

    # ---------- Verdict / synthèse ----------
    up = c >= pc and i >= pi
    if an['ga4'] and an['ga4']['key_events'] >= 1 and up:
        verdict, vcls = 'Tendance positive — le site progresse sur toute la chaîne', 'good'
    elif up:
        verdict, vcls = 'Visibilité en hausse — reste à transformer en contacts', 'warn'
    else:
        verdict, vcls = 'Attention — recul de visibilité à corriger', 'bad'
    an['verdict'] = verdict
    an['verdict_cls'] = vcls

    an['email_summary'] = (
        f"En résumé : {fmt_int(i)} impressions ({d_i}), {fmt_int(c)} clics ({d_c}), "
        f"position moyenne {fmt_pos(pos)}"
        + (f", {fmt_int(an['ga4']['sessions'])} sessions et {int(an['ga4']['key_events'])} événements clés."
           if an['ga4'] else '.')
        + (f" Risque principal : {an['risques'][0]['titre']}." if an['risques'] else ''))

    return an
