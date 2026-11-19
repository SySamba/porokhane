/*
 * Chargeur d'articles markdown (dossier articles/ à la racine).
 * Un fichier <slug>.md = un article publié sur /<slug>/.
 * Les fichiers commençant par _ (brouillons, _MODELE.md) sont ignorés.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export interface Article {
  slug: string; titre: string; description: string; date: string;
  dateFr: string; image: string; categorie: string; html: string;
  excerpt: string; minutes: number;
}

const ARTICLES_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', 'articles');

const MOIS = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre'];

function dateFr(iso: string): string {
  const m = iso.match(/^(\d{4})-(\d{2})-(\d{2})/);
  return m ? `${+m[3]} ${MOIS[+m[2] - 1]} ${m[1]}` : iso;
}

function parseFront(src: string): { meta: Record<string, string>; body: string } {
  const meta: Record<string, string> = {};
  const parse = (block: string) => {
    for (const line of block.split(/\r?\n/)) {
      const i = line.indexOf(':');
      if (i > 0) meta[line.slice(0, i).trim().toLowerCase()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
    }
  };
  const m = src.match(/^\s*---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (m) { parse(m[1]); return { meta, body: m[2] }; }
  // Tolérance : lignes "cle: valeur" en tête de fichier SANS délimiteurs ---
  const head = src.split(/\r?\n\r?\n/, 1)[0];
  const loose: string[] = [];
  for (const line of head.split(/\r?\n/)) {
    if (/^(titre|title|description|date|image|categorie|slug)\s*:/i.test(line)) loose.push(line);
  }
  if (loose.length) {
    parse(loose.join('\n'));
    const rest = src.slice(head.length).replace(/^\r?\n/, '');
    return { meta, body: rest };
  }
  return { meta, body: src };
}

export function slugify(s: string): string {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80) || 'article';
}

const firstLine = (body: string): string =>
  body.split(/\r?\n/).map(l => l.trim()).find(l => l.length > 3)?.replace(/^#+\s*/, '') || '';

// Markdown minimal -> HTML (titres, paragraphes, listes, liens, images, gras).
function inline(t: string): string {
  return t
    .replace(/!\[([^\]]*)\]\(([^)\s]+)\)/g, '<img src="$2" alt="$1" loading="lazy">')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');
}

export function mdToHtml(md: string): string {
  const out: string[] = [];
  let list: string[] | null = null;
  const close = () => {
    if (list) { out.push('<ul>' + list.map(li => `<li>${li}</li>`).join('') + '</ul>'); list = null; }
  };
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.trim();
    if (!line) { close(); continue; }
    if (line.startsWith('#### ')) { close(); out.push('<h4>' + inline(line.slice(5)) + '</h4>'); }
    else if (line.startsWith('### ')) { close(); out.push('<h3>' + inline(line.slice(4)) + '</h3>'); }
    else if (line.startsWith('## ')) { close(); out.push('<h2>' + inline(line.slice(3)) + '</h2>'); }
    else if (line.startsWith('# ')) { close(); out.push('<h2>' + inline(line.slice(2)) + '</h2>'); }
    else if (line === '---') { close(); out.push('<hr>'); }
    else if (line.startsWith('> ')) { close(); out.push('<blockquote>' + inline(line.slice(2)) + '</blockquote>'); }
    else if (/^[-*] /.test(line)) { (list ??= []).push(inline(line.slice(2))); }
    // Ligne courte sans ponctuation finale -> titre de section (texte brut collé)
    else if (line.length < 70 && !line.match(/[.!?,;:'’«»…]$/)) { close(); out.push('<h2>' + inline(line) + '</h2>'); }
    else { close(); out.push('<p>' + inline(line) + '</p>'); }
  }
  close();
  return out.join('\n');
}

export function loadArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const arts: Article[] = [];
  // .md, .txt ou fichier sans extension -> accepté (sauf _brouillons)
  for (const f of fs.readdirSync(ARTICLES_DIR).filter(x =>
    !x.startsWith('_') && (x.endsWith('.md') || x.endsWith('.txt') || !x.includes('.'))).sort()) {
    const { meta, body } = parseFront(fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf8'));
    const base = f.replace(/\.\w+$/, '');
    const titre = meta.titre || firstLine(body) || base;
    // Le nom de fichier fait l'URL ; s'il est générique (test, article…),
    // on dérive l'URL du titre automatiquement.
    const GENERIC = /^(test|article|nouveau|untitled|sans[-_]?titre|\d+)$/i;
    const slug = GENERIC.test(base) ? slugify(titre) : slugify(base);
    const html = mdToHtml(body.replace(firstLine(body), ''));
    const words = body.split(/\s+/).length;
    const excerpt = meta.description ||
      body.replace(/[#*>`-]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 155) + '…';
    const imgMatch = body.match(/!\[[^\]]*\]\(([^)\s]+)\)/);
    arts.push({
      slug,
      titre,
      description: meta.description || excerpt,
      date: meta.date || new Date().toISOString().slice(0, 10),
      dateFr: dateFr(meta.date || new Date().toISOString().slice(0, 10)),
      image: meta.image || (imgMatch ? imgMatch[1] : 'images/logo_porokhane_digital.jpg'),
      categorie: meta.categorie || 'Blog',
      html, excerpt,
      minutes: Math.max(1, Math.round(words / 200)),
    });
  }
  arts.sort((a, b) => (b.date || '').localeCompare(a.date || ''));
  return arts;
}

// Carte aperçu (même markup que blog.tsx / index.tsx — classes partagées).
export function cardHtml(a: Article): string {
  const img = a.image.startsWith('/') || a.image.startsWith('http') ? a.image : `/${a.image}`;
  return `        <div class="blog-card">
          <div class="blog-card-img">
            <img src="${img}" alt="${a.titre.replace(/"/g, '&quot;')}" loading="lazy">
          </div>
          <div class="blog-card-content">
            <div class="blog-meta"><i class="far fa-calendar-alt"></i> ${a.dateFr} • <i class="far fa-folder"></i> ${a.categorie}</div>
            <h3>${a.titre}</h3>
            <p>${a.excerpt}</p>
            <a href="/${a.slug}/" class="btn btn-secondary"><i class="fas fa-book-open"></i> Lire l'article</a>
          </div>
        </div>\n`;
}
