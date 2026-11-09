#!/usr/bin/env python3
"""
Rapport SEO mensuel — Porokhane Digital Consulting.
Search Console + GA4 via API (compte de service JSON) -> rapport HTML complet
dans rapports/rapport_seo_AAAA-MM.html (comparaison période précédente, graphiques).

Usage : python3 scripts/seo_report.py
Tâche auto : launchd -> 1er de chaque mois (com.porokhane.seo-report).
"""

import base64, json, os, sys, time, urllib.parse, datetime
import requests, rsa
from pyasn1.codec.der import decoder

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
KEY_FILE = os.path.join(ROOT, 'refined-vector-447411-b2-e3165d270c07.json')
GA4_PROPERTY_ID = os.environ.get('GA4_PROPERTY_ID', '559474817')
OUT_DIR = os.path.join(ROOT, 'rapports')
SCOPES = ('https://www.googleapis.com/auth/webmasters.readonly '
          'https://www.googleapis.com/auth/analytics.readonly')
DAYS = 28
CIBLES = ['impression 3d', 'marketing digital dakar', 'agence marketing digital',
          'agence seo', 'création site web dakar', 'formation']

def load_private_key(pem: str) -> rsa.PrivateKey:
    der = base64.b64decode(''.join(l for l in pem.splitlines() if '---' not in l))
    pkcs8, _ = decoder.decode(der)
    pkcs1, _ = decoder.decode(pkcs8[2].asOctets())
    n, e, d, p, q = (int(pkcs1[i]) for i in range(1, 6))
    return rsa.PrivateKey(n, e, d, p, q)

def get_token():
    k = json.load(open(KEY_FILE))
    now = int(time.time())
    b64 = lambda o: base64.urlsafe_b64encode(json.dumps(o).encode()).rstrip(b'=')
    to_sign = (b64({'alg': 'RS256', 'typ': 'JWT'}) + b'.' + b64({
        'iss': k['client_email'], 'scope': SCOPES,
        'aud': 'https://oauth2.googleapis.com/token', 'iat': now, 'exp': now + 3600}))
    sig = base64.urlsafe_b64encode(rsa.sign(to_sign, load_private_key(k['private_key']), 'SHA-256'))
    r = requests.post('https://oauth2.googleapis.com/token', data={
        'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion': (to_sign + b'.' + sig).decode()})
    r.raise_for_status()
    return 'Bearer ' + r.json()['access_token']

MOIS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet',
        'août', 'septembre', 'octobre', 'novembre', 'décembre']

def periods(today=None):
    """28 jours complets vs 28 jours précédents (Search Console a ~2 j de délai)."""
    today = today or datetime.date.today()
    end = today - datetime.timedelta(days=2)
    start = end - datetime.timedelta(days=DAYS - 1)
    prev_end = start - datetime.timedelta(days=1)
    prev_start = prev_end - datetime.timedelta(days=DAYS - 1)
    return start, end, prev_start, prev_end

def report_month(g):
    """Mois couvert par le rapport (milieu de période) -> ('2026-10', 'Octobre 2026')."""
    mid = g['start'] + (g['end'] - g['start']) / 2
    return mid.strftime('%Y-%m'), f"{MOIS[mid.month - 1].capitalize()} {mid.year}"

# ---------- Search Console ----------
def gsc(token):
    auth = {'Authorization': token}
    sites = requests.get('https://www.googleapis.com/webmasters/v3/sites', headers=auth).json()
    site_url = next((s['siteUrl'] for s in sites.get('siteEntry', [])
                     if 'digital-porokhane' in s.get('siteUrl', '')), 'https://digital-porokhane.com/')
    u = urllib.parse.quote(site_url, safe='')
    api = f'https://www.googleapis.com/webmasters/v3/sites/{u}/searchAnalytics/query'
    start, end, prev_start, prev_end = periods()

    def query(dims, s, e, rows=100):
        body = {'startDate': str(s), 'endDate': str(e), 'dimensions': dims, 'rowLimit': rows}
        r = requests.post(api, headers=auth, json=body); r.raise_for_status()
        return r.json().get('rows', [])

    return {
        'site': site_url, 'periode': f'{start} → {end}', 'prev_periode': f'{prev_start} → {prev_end}',
        'start': start, 'end': end, 'prev_start': prev_start, 'prev_end': prev_end,
        'requetes': query(['query'], start, end, 250),
        'requetes_prev': query(['query'], prev_start, prev_end, 250),
        'pages': query(['page'], start, end, 50),
        'pages_prev': query(['page'], prev_start, prev_end, 50),
        'jours': query(['date'], start, end),
        'jours_prev': query(['date'], prev_start, prev_end),
        'devices': query(['device'], start, end),
        'pays': query(['country'], start, end, 15),
        'query_page': query(['query', 'page'], start, end, 1000),
    }

def totals(rows):
    c = sum(r['clicks'] for r in rows); i = sum(r['impressions'] for r in rows)
    pos = sum(r['position'] * r['impressions'] for r in rows) / i if i else 0
    return {'clics': c, 'impressions': i, 'ctr': c / i if i else 0, 'position': pos}

# ---------- GA4 ----------
def ga4_run(token, dims, mets, s, e, limit=100, dimfilter=None):
    auth = {'Authorization': token}
    body = {'dateRanges': [{'startDate': s, 'endDate': e}],
            'dimensions': [{'name': d} for d in dims],
            'metrics': [{'name': m} for m in mets], 'limit': limit}
    if dimfilter: body['dimensionFilter'] = dimfilter
    r = requests.post(f'https://analyticsdata.googleapis.com/v1beta/properties/{GA4_PROPERTY_ID}:runReport',
                      headers=auth, json=body)
    r.raise_for_status()
    j = r.json()
    rows = []
    for row in j.get('rows', []):
        rows.append({**{d['name']: v['value'] for d, v in zip(j.get('dimensionHeaders', []), row.get('dimensionValues', []))},
                     **{m['name']: float(v['value']) for m, v in zip(j['metricHeaders'], row['metricValues'])}})
    tot = {m['name']: float(v['value']) for m, v in zip(j['metricHeaders'], j.get('totals', [{}])[0].get('metricValues', []))} if j.get('totals') else {}
    if not tot and rows:
        tot = {k: v for k, v in rows[0].items() if isinstance(v, (int, float))}
    return rows, tot

TOTAL_METRICS = ['sessions', 'totalUsers', 'newUsers', 'screenPageViews', 'averageSessionDuration',
                 'engagementRate', 'bounceRate', 'sessionKeyEventRate', 'keyEvents',
                 'screenPageViewsPerSession']

def contact_method(url):
    u = (url or '').lower()
    if 'wa.me' in u or 'whatsapp' in u: return 'Bouton WhatsApp'
    if u.startswith('tel:'): return 'Appel téléphonique'
    if u.startswith('mailto:'): return 'E-mail (mailto)'
    return 'Autre contact'

def ga4(token, g):
    s, e = str(g['start']), str(g['end'])
    ps, pe = str(g['prev_start']), str(g['prev_end'])
    conv = {'filter': {'fieldName': 'eventName', 'inListFilter': {'values': ['generate_lead', 'contact_click', 'newsletter_signup']}}}
    contact = {'filter': {'fieldName': 'eventName', 'stringFilter': {'value': 'contact_click'}}}
    out = {}
    _, out['total'] = ga4_run(token, [], TOTAL_METRICS, s, e, 1)
    _, out['total_prev'] = ga4_run(token, [], TOTAL_METRICS, ps, pe, 1)
    out['canaux'], _ = ga4_run(token, ['sessionDefaultChannelGroup'],
        ['sessions', 'totalUsers', 'newUsers', 'screenPageViews', 'averageSessionDuration', 'engagementRate', 'keyEvents'], s, e, 15)
    out['canaux_prev'], _ = ga4_run(token, ['sessionDefaultChannelGroup'], ['sessions', 'keyEvents'], ps, pe, 15)
    out['jours'], _ = ga4_run(token, ['date'], ['sessions', 'totalUsers', 'keyEvents'], s, e, 40)
    out['jours_prev'], _ = ga4_run(token, ['date'], ['sessions', 'totalUsers', 'keyEvents'], ps, pe, 40)
    out['pages'], _ = ga4_run(token, ['pagePathPlusQueryString'],
        ['screenPageViews', 'totalUsers', 'averageSessionDuration', 'keyEvents'], s, e, 25)
    out['landing'], _ = ga4_run(token, ['landingPage'], ['sessions', 'engagementRate', 'keyEvents'], s, e, 15)
    out['devices'], _ = ga4_run(token, ['deviceCategory'], ['sessions', 'totalUsers', 'engagementRate', 'keyEvents'], s, e)
    out['pays'], _ = ga4_run(token, ['country'], ['sessions', 'totalUsers', 'keyEvents'], s, e, 10)
    out['villes'], _ = ga4_run(token, ['city'], ['sessions', 'totalUsers', 'keyEvents'], s, e, 10)
    out['conversions'], _ = ga4_run(token, ['eventName'], ['keyEvents'], s, e, 10, conv)
    out['conversions_prev'], _ = ga4_run(token, ['eventName'], ['keyEvents'], ps, pe, 10, conv)
    out['conv_pages'], _ = ga4_run(token, ['pagePath'], ['keyEvents'], s, e, 15, conv)
    out['conv_canal'], _ = ga4_run(token, ['sessionDefaultChannelGroup'], ['keyEvents'], s, e, 15, conv)
    out['sources'], _ = ga4_run(token, ['sessionSource', 'sessionMedium'],
        ['sessions', 'totalUsers', 'keyEvents'], s, e, 15)
    # Détail des clics de contact (WhatsApp / téléphone / e-mail) via l'URL du lien cliqué
    for key, (ds, de) in (('contacts', (s, e)), ('contacts_prev', (ps, pe))):
        rows, _ = ga4_run(token, ['linkUrl'], ['eventCount', 'keyEvents'], ds, de, 50, contact)
        agg = {}
        for r in rows:
            m = contact_method(r.get('linkUrl'))
            d = agg.setdefault(m, {'clics': 0, 'conv': 0})
            d['clics'] += int(r['eventCount'])
            d['conv'] += int(r['keyEvents'])
        out[key] = agg
    return out

# ---------- Données dérivées : opportunités, nouvelles requêtes, objectifs ----------
def derived(g, a):
    t = totals(g['jours'])
    cur_q = {r['keys'][0]: r for r in g['requetes']}
    prev_q = {r['keys'][0]: r for r in g['requetes_prev']}
    new_q = [r for k, r in cur_q.items() if k not in prev_q]
    lost_q = [r for k, r in prev_q.items() if k not in cur_q]
    new_q.sort(key=lambda r: -r['impressions'])
    lost_q.sort(key=lambda r: -r['impressions'])
    opps = [r for r in g['requetes'] if 10 < r['position'] <= 20]
    opps.sort(key=lambda r: -r['impressions'])
    objectives = [
        {'label': 'Position moyenne < 18', 'val': f"{t['position']:.1f}",
         'ok': t['position'] < 18, 'proche': t['position'] < 22},
        {'label': 'CTR > 1,5 %', 'val': f"{t['ctr']*100:.1f} %",
         'ok': t['ctr'] > 0.015, 'proche': t['ctr'] > 0.012},
        {'label': 'Clics > 40', 'val': t['clics'],
         'ok': t['clics'] > 40, 'proche': t['clics'] > 32},
    ]
    convs = 0
    if a:
        convs = int(a.get('total', {}).get('keyEvents', 0))
    objectives.append({'label': 'Conversions (leads)', 'val': convs, 'ok': convs > 0, 'proche': convs > 0})
    # recommandations automatiques
    recos = []
    if opps:
        recos.append(f"Optimiser les {min(len(opps), 15)} requêtes en position 11–20 "
                     f"(«{opps[0]['keys'][0]}» : {opps[0]['impressions']} impr.) — liens internes + enrichissement.")
    faibles = [r for r in g['pages'] if r['impressions'] > 100 and r['ctr'] < 0.01]
    faibles.sort(key=lambda r: -r['impressions'])
    if faibles:
        p = faibles[0]['keys'][0].replace('https://digital-porokhane.com', '') or '/'
        recos.append(f"Réécrire title/description de {p} : {faibles[0]['impressions']} impressions mais CTR faible.")
    if convs == 0:
        recos.append('Aucune conversion : renforcer les CTA devis/WhatsApp sur les pages les plus vues.')
    else:
        recos.append(f'{convs} conversions : analyser les pages qui convertissent et reproduire leur structure CTA.')
    if lost_q and lost_q[0]['impressions'] > 50:
        recos.append(f"«{lost_q[0]['keys'][0]}» a disparu de la visibilité ({lost_q[0]['impressions']} impr. avant) — vérifier la page associée.")
    return {'new_q': new_q[:15], 'lost_q': lost_q[:10], 'opps': opps[:15],
            'objectives': objectives, 'recos': recos}

# ---------- Rendu ----------
from report_template import TEMPLATE

def build_html(g, a):
    t, tp = totals(g['jours']), totals(g['jours_prev'])
    prev_map = {r['keys'][0]: r for r in g['requetes_prev']}
    jours = sorted(g['jours'], key=lambda x: x['keys'][0])
    ga4_data = None
    if a:
        ga4_data = {
            'total': a.get('total', {}), 'total_prev': a.get('total_prev', {}),
            'canaux': a.get('canaux', []), 'sources': a.get('sources', []),
            'devices': a.get('devices', []), 'pays': a.get('pays', []),
            'landing': a.get('landing', []), 'pages': a.get('pages', []),
            'conversions': a.get('conversions', []), 'conv_pages': a.get('conv_pages', []),
        }
    data = {
        'periode': g['periode'], 'prev': g['prev_periode'], 'site': g['site'],
        'genere': str(datetime.date.today()), 'total': t, 'total_prev': tp,
        'jours': [[r['keys'][0], r['clicks'], r['impressions']] for r in jours],
        'requetes': [[r['keys'][0], r['clicks'], r['impressions'], r['ctr'], r['position'],
                      prev_map.get(r['keys'][0], {}).get('position')] for r in g['requetes']],
        'pages': [[r['keys'][0].replace('https://digital-porokhane.com', '') or '/', r['clicks'],
                   r['impressions'], r['ctr'], r['position']] for r in g['pages']],
        'devices': [[r['keys'][0], r['clicks'], r['impressions'], r['ctr'], r['position']] for r in g['devices']],
        'pays': [[r['keys'][0], r['clicks'], r['impressions'], r['ctr'], r['position']] for r in g['pays']],
        'ga4': ga4_data, 'derived': derived(g, a),
    }
    return TEMPLATE.replace('%%DATA%%', json.dumps(data, ensure_ascii=False))

def send_email(html_path, pptx_path, month_label='', summary=''):
    """Envoie le rapport par email via SMTP Gmail.
    Identifiants dans scripts/email_config.json (gitignored) :
    {"smtp_user": "...", "smtp_pass": "...", "to": "sambasy837@gmail.com"}
    """
    import smtplib
    from email.mime.multipart import MIMEMultipart
    from email.mime.text import MIMEText
    from email.mime.base import MIMEBase
    from email import encoders
    cfg_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'email_config.json')
    if not os.path.exists(cfg_path):
        print('Email : pas de email_config.json — envoi ignoré')
        return
    cfg = json.load(open(cfg_path))
    msg = MIMEMultipart()
    month = month_label or os.path.basename(pptx_path).replace('rapport_seo_', '').replace('.pptx', '')
    msg['Subject'] = f'Rapport de performance 360° Porokhane — {month}'
    msg['From'] = cfg['smtp_user']; msg['To'] = cfg['to']
    msg.attach(MIMEText(
        f"Bonjour,\n\nVoici le rapport de performance mensuel 360° de digital-porokhane.com ({month}) : "
        "référencement Google, trafic et conversions, risques et plan d'action.\n\n"
        f"{summary}\n\n"
        "Pièces jointes :\n"
        "• le PowerPoint, pour la présentation ;\n"
        "• le tableau de bord HTML détaillé, à ouvrir dans le navigateur.\n\n"
        "— Généré automatiquement", 'plain', 'utf-8'))
    for path in (html_path, pptx_path):
        if not os.path.exists(path): continue
        with open(path, 'rb') as f:
            part = MIMEBase('application', 'octet-stream'); part.set_payload(f.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', 'attachment', filename=os.path.basename(path))
        msg.attach(part)
    s = smtplib.SMTP_SSL('smtp.gmail.com', 465); s.login(cfg['smtp_user'], cfg['smtp_pass'])
    s.sendmail(cfg['smtp_user'], cfg['to'], msg.as_string()); s.quit()
    print('Email envoyé à', cfg['to'])

def main():
    token = get_token()
    print('Token OK')
    g = gsc(token)
    print(f"GSC: {len(g['requetes'])} requêtes, {len(g['pages'])} pages, {len(g['jours'])} jours")
    try:
        a = ga4(token, g); print('GA4 OK')
    except Exception as e:
        a = None; print('GA4 erreur:', str(e)[:120])
    os.makedirs(OUT_DIR, exist_ok=True)
    month, month_label = report_month(g)
    out = os.path.join(OUT_DIR, f'rapport_seo_{month}.html')
    open(out, 'w', encoding='utf-8').write(build_html(g, a))
    print('Rapport HTML :', out)
    # PowerPoint
    from report_pptx import build_pptx
    from report_analysis import analyse
    an = analyse(g, a, month_label)
    pptx_path = os.path.join(OUT_DIR, f'Rapport_Porokhane_Digital_{month_label.replace(" ", "_")}.pptx')
    build_pptx(an, pptx_path)
    print('Rapport PPTX :', pptx_path)
    if '--no-email' not in sys.argv:
        send_email(out, pptx_path, month_label, an['email_summary'])

if __name__ == '__main__':
    main()
