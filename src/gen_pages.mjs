/*
 * Générateur : transforme chaque page .html existante en module React src/pages/<nom>.tsx
 * Les chaînes HTML sont intégrées en template literals (échappées).
 * Exécuter : node src/gen_pages.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PAGES = path.join(ROOT, 'src', 'pages');

function extractTag(html, startRe, tag) {
  const m = startRe.exec(html);
  if (!m) return [html, ''];
  const start = m.index;
  const re = new RegExp(`<(\\/?)${tag}(\\s|>|/)`, 'gi');
  re.lastIndex = start;
  let depth = 0, end = -1, r;
  while ((r = re.exec(html)) !== null) {
    const closing = r[1] === '/';
    const selfClosing = html.slice(r.index, r.index + 200).match(/<\/?[\s\S]*?\/>/)?.[0].endsWith('/>');
    if (!closing) { if (!selfClosing) depth++; }
    else { depth--; if (depth === 0) { end = r.index + `</${tag}>`.length; break; } }
  }
  if (end < 0) return [html, ''];
  return [html.slice(0, start) + html.slice(end), html.slice(start, end)];
}

function extractAllScripts(html) {
  const re = /<script\b[^>]*>[\s\S]*?<\/script>/gi;
  const scripts = [];
  const rest = html.replace(re, (s) => { scripts.push(s); return ''; });
  return [rest, scripts.join('\n')];
}

function esc(s) {
  return s.replace(/\\/g, '\\\\').replace(/`/g, '\\`').replace(/\$\{/g, '\\${');
}

const names = [];
for (const f of fs.readdirSync(ROOT).filter((x) => x.endsWith('.html')).sort()) {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const headOpen = html.search(/<head[^>]*>/i);
  const headClose = html.search(/<\/head\s*>/i);
  const bodyOpenM = /<body[^>]*>/i.exec(html);
  const bodyClose = html.search(/<\/body\s*>/i);
  const slug = f.replace(/\.html$/, '').replace(/[^A-Za-z0-9]+/g, '_');
  if (headOpen < 0 || headClose < 0 || !bodyOpenM || bodyClose < 0) {
    fs.writeFileSync(path.join(PAGES, `${slug}.tsx`),
      `// Généré depuis ${f} — structure non standard, page servie verbatim.\nexport const fileName = '${f}';\nexport const verbatim = \`${esc(html)}\`;\nexport default function Page() { return null; }\n`);
    names.push(slug);
    continue;
  }
  const preamble = html.slice(0, headOpen);
  const headTag = html.slice(headOpen, html.indexOf('>', headOpen) + 1);
  const head = html.slice(html.indexOf('>', headOpen) + 1, headClose);
  const bodyTag = bodyOpenM[0];
  let bodyInner = html.slice(bodyOpenM.index + bodyTag.length, bodyClose);

  let nav = '';
  [bodyInner, nav] = extractTag(bodyInner, /<nav\b[^>]*class="navbar"[^>]*>/i, 'nav');
  if (!nav) [bodyInner, nav] = extractTag(bodyInner, /<nav\b[^>]*>/i, 'nav');
  let footer = '';
  [bodyInner, footer] = extractTag(bodyInner, /<footer\b[^>]*class="footer"[^>]*>/i, 'footer');
  if (!footer) [bodyInner, footer] = extractTag(bodyInner, /<footer\b[^>]*>/i, 'footer');

  const wres = extractTag(bodyInner, /<div\b[^>]*class="chatbot-window"[^>]*>/i, 'div');
  let chatbot = '';
  if (wres[1]) {
    const winIdx = bodyInner.indexOf(wres[1]);
    const btnIdx = bodyInner.search(/class="chatbot-btn"/i);
    const start = btnIdx >= 0 ? Math.min(winIdx, bodyInner.lastIndexOf('<button', btnIdx)) : winIdx;
    chatbot = bodyInner.slice(start, winIdx + wres[1].length);
    bodyInner = bodyInner.slice(0, start) + bodyInner.slice(winIdx + wres[1].length);
  }
  const [content, scripts] = extractAllScripts(bodyInner);

  fs.writeFileSync(path.join(PAGES, `${slug}.tsx`), `// Généré depuis ${f} — ne plus modifier le .html racine, éditer ce fichier.
import React from 'react';
import { Document } from '../components';

export const fileName = '${f}';
export const preamble = \`${esc(preamble)}\`;
export const headTag = \`${esc(headTag)}\`;
export const head = \`${esc(head)}\`;
export const bodyTag = \`${esc(bodyTag)}\`;
export const nav = \`${esc(nav)}\`;
export const content = \`${esc(content)}\`;
export const footer = \`${esc(footer)}\`;
export const chatbot = \`${esc(chatbot)}\`;
export const scripts = \`${esc(scripts)}\`;

export default function Page() {
  return <Document headTag={headTag} head={head} bodyTag={bodyTag} nav={nav}
    content={content} footer={footer} chatbot={chatbot} scripts={scripts} />;
}
`);
  names.push(slug);
}

fs.writeFileSync(path.join(PAGES, 'registry.ts'),
  names.map((n) => `export { default as ${n}, preamble as ${n}__preamble } from './${n}';`).join('\n') +
  `\n\nexport const files = [${names.map((n) => `'${n}.html'`).join(', ')}];\n`);
console.log(`${names.length} pages générées dans src/pages/`);
