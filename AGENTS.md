# Porokhane Digital — site en React (rendu statique)

Le site a migré de HTML statique vers un générateur React (SSR avec `react-dom/server`).
La sortie est **identique** : mêmes fichiers `.html`, mêmes URLs, même design, même SEO.

## Structure

- `src/components.tsx` — composants React : `Document`, `Navbar`, `Footer`, `Chatbot`, `Block`, `parseAttrs`
- `src/pages/<slug>.tsx` — un module React par page (générés depuis les `.html` racine)
- `src/gen_pages.mjs` — régénère `src/pages/` depuis les `.html` racine si besoin
- `src/build.tsx` — build : rend chaque page en `.html` + copie les assets dans `dist/`
- `dist/` — sortie à déployer (HTML statique + assets + `.htaccess` + redirections `ia/`, `emplois/`)

## Commandes

```bash
npm run build   # rend les pages React -> dist/ (HTML + assets)
npm run gen     # régénère src/pages/ depuis les .html racine (à faire UNE fois si source externe)
npm run dev     # gen + build
```

## Pour modifier une page

Éditer `src/pages/<nom>.tsx` — chaque page exporte ses parties :
`head` (meta, title, JSON-LD), `content` (corps), `nav`, `footer`, `chatbot`, `scripts`, `preamble`.
Puis :

```bash
npm run dev     # = npm run build : rend les .tsx -> dist/
npm run serve   # test local sur localhost:8911
```

Les `.html` racine ont été supprimés (migration terminée) : `src/pages/` est la seule source.
`npm run gen` (gen_pages.mjs) était l'outil de migration HTML→React, gardé pour référence.

## Déploiement

Envoyer **le contenu de `dist/`** (pas `src/`, pas `node_modules/`) sur l'hébergeur,
en incluant le fichier caché `.htaccess`. Vider ensuite le cache CDN.

## Rapport mensuel automatisé

- `scripts/seo_report.py` — collecte Search Console + GA4 (compte de service), génère le rapport et l'envoie par email. `--no-email` pour tester sans envoyer.
- `scripts/report_analysis.py` — transforme les données en contenu (KPI, variations, risques, opportunités, plan d'action, vision 360°).
- `scripts/report_pptx.py` — PPTX 16 slides au design de référence (bleu #005AA4, vert #00823A, Calibri).
- `scripts/report_template.py` — tableau de bord HTML détaillé (mêmes données).
- Planification : launchd `com.porokhane.seo-report`, le **4 de chaque mois à 9h**, log dans `rapports/seo_report.log`.
- Sorties : `rapports/Rapport_Porokhane_Digital_<Mois>_<Année>.pptx` + `rapport_seo_AAAA-MM.html`, envoyés à sambasy837@gmail.com.
- Clé compte de service `refined-vector-*.json` et `scripts/email_config.json` : sensibles, ignorés par git, ne jamais committer ni afficher.

## Points d'attention

- Le contenu hérité est injecté via `dangerouslySetInnerHTML` : balisage identique, pas d'échappement.
- Les scripts inline sont extraits et replacés en fin de `<body>` lors du rendu.
- `test.html` et la redirection `impression_3D.html` restent des pages générées/verbatims.
- GTM `GTM-KBH8R72G` et `tracking.js` sont présents dans toutes les pages générées.
