/*
 * Gabarit d'article généré depuis articles/*.md.
 * Réutilise le chrome (nav, footer, chatbot, scripts, styles) de la page
 * impression_3d_dakar pour un rendu 100 % cohérent avec le reste du site.
 */
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { Document } from './components';
import {
  head as refHead, nav, footer, chatbot, scripts, preamble, headTag, bodyTag,
} from './pages/impression_3d_dakar';
import type { Article } from './articles';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

// On garde du head de référence : GTM, fonts, styles. On retire les métas
// propres à l'article d'origine (remplacées par celles du nouvel article).
const CHROME = (refHead as string)
  .replace(/<title>[\s\S]*?<\/title>/g, '')
  .replace(/<meta[^>]*?(charset|viewport|description|keywords|robots|author|geo\.|og:|twitter:|article:)[^>]*>/g, '')
  .replace(/<link[^>]*canonical[^>]*>/g, '')
  .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, '');

export function renderArticle(a: Article): string {
  const url = `https://digital-porokhane.com/${a.slug}/`;
  const img = a.image.startsWith('http') ? a.image : `https://digital-porokhane.com/${a.image.replace(/^\/+/, '')}`;
  const head = `
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(a.titre)} | Porokhane Digital Consulting</title>
  <meta name="description" content="${esc(a.description)}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <meta name="author" content="Porokhane Digital Consulting">
  <meta name="geo.region" content="SN-DK">
  <link rel="canonical" href="${url}">
  <meta property="og:title" content="${esc(a.titre)}">
  <meta property="og:description" content="${esc(a.description)}">
  <meta property="og:image" content="${img}">
  <meta property="og:url" content="${url}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="fr_FR">
  <meta property="og:site_name" content="Porokhane Digital Consulting">
  ${a.date ? `<meta property="article:published_time" content="${a.date}T09:00:00+00:00">` : ''}
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Article",
   "headline":"${esc(a.titre)}","description":"${esc(a.description)}",
   "image":"${img}","datePublished":"${a.date || '2026-11-19'}",
   "author":{"@type":"Organization","name":"Porokhane Digital Consulting"},
   "publisher":{"@type":"Organization","name":"Porokhane Digital Consulting",
     "logo":{"@type":"ImageObject","url":"https://digital-porokhane.com/images/logo.png"}}}
  </script>
` + CHROME;

  const content = `
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KBH8R72G"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
  <nav class="breadcrumb"><div class="container">
    <a href="index.html">Accueil</a> <span class="sep">/</span> <a href="blog.html">Blog</a> <span class="sep">/</span> ${esc(a.titre)}
  </div></nav>
  <section class="article-hero">
    <div class="container">
      <h1>${esc(a.titre)}</h1>
      <div class="article-meta">
        <span><i class="far fa-calendar-alt"></i> ${a.dateFr}</span>
        <span><i class="far fa-folder"></i> ${a.categorie}</span>
        <span><i class="far fa-clock"></i> ${a.minutes} min de lecture</span>
      </div>
    </div>
  </section>
  <section class="article-content">
    <div class="container">
${a.html}
      <div style="text-align:center;margin:3rem 0 1rem;padding:2rem;background:linear-gradient(90deg,var(--vert,#1fa47a),var(--bleu,#2563eb));border-radius:16px;color:#fff">
        <h3 style="color:#fff;margin-bottom:1rem">Un projet digital à lancer ?</h3>
        <a href="devis.html" class="btn" style="background:#fff;color:#2563eb;text-decoration:none;padding:12px 28px;border-radius:30px;font-weight:700;display:inline-block">Demander un devis gratuit</a>
      </div>
    </div>
  </section>
`;

  return (preamble as string) + renderToStaticMarkup(
    <Document headTag={headTag} head={head} bodyTag={bodyTag}
      nav={nav} content={content} footer={footer} chatbot={chatbot} scripts={scripts} />
  ) + '\n</html>\n';
}
