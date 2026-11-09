/*
 * Build du site Porokhane : rend les pages React (src/pages/*.tsx) en HTML
 * statique identique à l'existant + copie les assets dans dist/.
 *
 * URLs propres : chaque page devient dist/<nom>/index.html (servie sur /nom/)
 * et dist/<nom>.html est un stub qui redirige vers /nom/ (anciens liens Google).
 * Les liens internes .html, les assets relatifs et le sitemap sont réécrits.
 *
 * Commande : npm run build
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'dist');
const PAGES_DIR = path.join(ROOT, 'src', 'pages');
const IGNORE = new Set([
  'node_modules', 'dist', 'src', '.git', 'build-tmp', 'scripts', 'rapports',
  'package.json', 'package-lock.json', 'tsconfig.json', '.DS_Store', 'dist.zip',
]);
// Extensions jamais utiles côté web (docs internes, clés, logs).
const IGNORE_EXT = new Set(['.docx', '.md', '.csv', '.pptx', '.zip', '.log', '.ts', '.tsx']);

function copyAssets(src: string, dst: string) {
  for (const e of fs.readdirSync(src, { withFileTypes: true })) {
    if (IGNORE.has(e.name)) continue;
    // Fichiers cachés exclus (.github, .gitignore…) sauf .htaccess qui est requis.
    if (e.name.startsWith('.') && e.name !== '.htaccess') continue;
    const s = path.join(src, e.name);
    const d = path.join(dst, e.name);
    if (e.isDirectory()) { fs.mkdirSync(d, { recursive: true }); copyAssets(s, d); }
    // Aucun .json à la racine : empêche la fuite de la clé du compte de service.
    else if (src === ROOT && e.name.endsWith('.json')) continue;
    else if (IGNORE_EXT.has(path.extname(e.name).toLowerCase())) continue;
    // Les .html racine sont générés par React ; ceux des sous-dossiers sont copiés.
    else if (!e.name.endsWith('.html') || src !== ROOT) fs.copyFileSync(s, d);
  }
}

// URLs propres : /a-propos/ au lieu de /a-propos.html ; assets en absolu /logo.png
function rewrite(out: string): string {
  // Cas particulier : index.html -> /
  out = out.replace(/(https:\/\/digital-porokhane\.com)\/index\.html/g, '$1/');
  out = out.replace(/(href|action)="(\.\/|\/)?index\.html(#[^"]*)?"/g, '$1="/$3"');
  out = out.replace(/(['"])index\.html(#[^'"]*)?\1/g, '$1/$2$1');
  // URLs absolues du domaine : /x.html -> /x/
  out = out.replace(/(https:\/\/digital-porokhane\.com)\/([\w-]+)\.html/g, '$1/$2/');
  // Liens internes : href/action="x.html" ou "./x.html" ou "/x.html" -> "/x/"
  out = out.replace(/(href|action)="(\.\/|\/)?([\w-]+)\.html(#[^"]*)?"/g, '$1="/$3/$4"');
  // Chaînes JS : 'x.html' "x.html" -> '/x/' "/x/"
  out = out.replace(/(['"])([\w-]+)\.html(#[^'"]*)?\1/g, '$1/$2/$3$1');
  // Assets relatifs (src, href non-page, action, poster) -> chemin absolu /
  // [^"]+ (pas [^"\s]+) : les noms de fichiers avec espaces doivent aussi matcher.
  out = out.replace(
    /(src|href|action|poster)="(?!https?:|\/|#|mailto:|tel:|javascript:|data:)([^"]+\.[A-Za-z0-9]{1,10}[^"\s]*)"/g,
    '$1="/$2"'
  );
  // url(...) dans les CSS inline -> chemin absolu
  out = out.replace(/url\((['"]?)(?!https?:|\/|#|data:)([^)'"\s]+)\1\)/g, 'url($1/$2$1)');
  // srcset : chaque URL de la liste
  out = out.replace(/srcset="([^"]+)"/g, (_m: string, v: string) =>
    'srcset="' + v.split(',').map((p: string) => {
      const [u, w] = p.trim().split(/\s+/);
      return (/^(https?:|\/|data:)/.test(u) ? u : '/' + u) + (w ? ' ' + w : '');
    }).join(', ') + '"');
  return out;
}

function stub(slug: string): string {
  const target = `/${slug}/`;
  return `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Porokhane Digital Consulting</title>
  <link rel="canonical" href="https://digital-porokhane.com${target}">
  <meta http-equiv="refresh" content="0; url=${target}">
  <script>location.replace('${target}');</script>
</head>
<body><p><a href="${target}">Continuer</a></p></body>
</html>
`;
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
copyAssets(ROOT, OUT);

let ok = 0;
for (const f of fs.readdirSync(PAGES_DIR).filter((x: string) => x.endsWith('.tsx')).sort()) {
  const slug = f.replace(/\.tsx$/, '');
  const mod = await import(path.join(PAGES_DIR, f));
  const outName = (mod.fileName as string) || (slug + '.html');
  const base = outName.replace(/\.html$/, '');
  let out: string;
  if (mod.verbatim) {
    out = mod.verbatim;
  } else {
    const Page = mod.default as React.FC;
    out = (mod.preamble ?? '') + renderToStaticMarkup(React.createElement(Page)) + '\n</html>\n';
  }
  out = rewrite(out);

  if (base === 'index') {
    fs.writeFileSync(path.join(OUT, 'index.html'), out);
  } else {
    const dir = path.join(OUT, base);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'index.html'), out);
    // Stub .html -> /slug/ ; si la page est déjà une redirection, on garde son contenu.
    const isRedirect = /http-equiv="refresh"/i.test(out);
    fs.writeFileSync(path.join(OUT, `${base}.html`), isRedirect ? out : stub(base));
  }
  ok++;
}

// Sitemap : URLs propres /x/ au lieu de /x.html
const smPath = path.join(OUT, 'sitemap.xml');
if (fs.existsSync(smPath)) {
  const sm = fs.readFileSync(smPath, 'utf8').replace(/\.html<\/loc>/g, '/</loc>');
  fs.writeFileSync(smPath, sm);
}

console.log(`React → HTML : ${ok} pages générées dans dist/ (URLs propres /nom/)`);
