/*
 * Composants React du site Porokhane.
 * Le site est rendu statiquement (react-dom/server) pour produire les .html
 * à l'identique de l'existant : URLs, balisage et comportement inchangés.
 * Le contenu hérité passe par dangerouslySetInnerHTML, technique standard
 * pour migrer du HTML vers React sans réécrire le balisage.
 */
import React, { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// --- Conversion d'attributs HTML -> props React --------------------------------
const PROP_MAP: Record<string, string> = {
  class: 'className',
  for: 'htmlFor',
  tabindex: 'tabIndex',
  colspan: 'colSpan',
  rowspan: 'rowSpan',
  maxlength: 'maxLength',
  autocomplete: 'autoComplete',
  readonly: 'readOnly',
  enctype: 'encType',
};

function styleToObj(style: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const decl of style.split(';')) {
    const i = decl.indexOf(':');
    if (i < 0) continue;
    const key = decl.slice(0, i).trim().replace(/-([a-z])/g, (_m, c: string) => c.toUpperCase());
    if (key) out[key] = decl.slice(i + 1).trim();
  }
  return out;
}

export function parseAttrs(openTag: string): Record<string, unknown> {
  const inner = openTag.replace(/^<\s*\w+/, '').replace(/\s*\/?>$/, '');
  const attrs: Record<string, unknown> = {};
  const re = /([\w:@-]+)(?:\s*=\s*("([^"]*)"|'([^']*)'|[^\s>]+))?/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(inner)) !== null) {
    const name = m[1].toLowerCase();
    const raw = m[3] ?? m[4] ?? m[2]?.replace(/^["']|["']$/g, '');
    if (name === 'style') attrs.style = styleToObj(raw ?? '');
    else attrs[PROP_MAP[name] ?? name] = raw === undefined ? true : raw;
  }
  return attrs;
}

// --- Bloc générique : élément racine rendu par React, enfants verbatim ---------
export function Block({ tag, html }: { tag: string; html: string }) {
  const openEnd = html.indexOf('>') + 1;
  const openTag = html.slice(0, openEnd);
  const inner = html.slice(openEnd, html.lastIndexOf(`</${tag}>`));
  return createElement(tag, { ...parseAttrs(openTag), dangerouslySetInnerHTML: { __html: inner } });
}

// Barre de navigation du site.
export function Navbar({ html }: { html: string }) {
  return <Block tag="nav" html={html} />;
}

// Pied de page du site.
export function Footer({ html }: { html: string }) {
  return <Block tag="footer" html={html} />;
}

// Chatbot Porokhane : bouton flottant + fenêtre de chat.
export function Chatbot({ html }: { html: string }) {
  const winStart = html.search(/<div\b[^>]*class="chatbot-window"/i);
  const btnMatch = html.match(/<button\b[\s\S]*?<\/button>/i);
  const winHtml = winStart >= 0 ? html.slice(winStart) : '';
  const btnHtml = btnMatch ? btnMatch[0] : '';
  return (
    <>
      {btnHtml ? <Block tag="button" html={btnHtml} /> : null}
      {winHtml ? <Block tag="div" html={winHtml} /> : null}
    </>
  );
}

// --- Document complet ----------------------------------------------------------
export interface PageParts {
  headTag: string;
  head: string;
  bodyTag: string;
  nav: string;
  content: string;
  footer: string;
  chatbot: string;
  scripts: string;
}

// Assemble <head> et <body> : le shell passe par les composants React,
// le contenu spécifique de la page reste verbatim.
export function Document(p: PageParts) {
  const bodyHtml =
    (p.nav ? renderToStaticMarkup(<Navbar html={p.nav} />) : '') +
    p.content +
    (p.footer ? renderToStaticMarkup(<Footer html={p.footer} />) : '') +
    (p.chatbot ? renderToStaticMarkup(<Chatbot html={p.chatbot} />) : '') +
    '\n' + p.scripts;
  return (
    <>
      {createElement('head', { ...parseAttrs(p.headTag), dangerouslySetInnerHTML: { __html: p.head } })}
      {createElement('body', { ...parseAttrs(p.bodyTag), dangerouslySetInnerHTML: { __html: bodyHtml } })}
    </>
  );
}
