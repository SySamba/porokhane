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
  const m = src.match(/^\s*---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!m) return { meta: {}, body: src };
  const meta: Record<string, string> = {};
  for (const line of m[1].split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i > 0) meta[line.slice(0, i).trim().toLowerCase()] = line.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return { meta, body: m[2] };
}

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
    else { close(); out.push('<p>' + inline(line) + '</p>'); }
  }
  close();
  return out.join('\n');
}

export function loadArticles(): Article[] {
  if (!fs.existsSync(ARTICLES_DIR)) return [];
  const arts: Article[] = [];
  for (const f of fs.readdirSync(ARTICLES_DIR).filter(x => x.endsWith('.md') && !x.startsWith('_')).sort()) {
    const { meta, body } = parseFront(fs.readFileSync(path.join(ARTICLES_DIR, f), 'utf8'));
    const slug = f.replace(/\.md$/, '').replace(/[^a-z0-9-]/gi, '-').toLowerCase();
    const html = mdToHtml(body);
    const words = body.split(/\s+/).length;
    const excerpt = meta.description ||
      body.replace(/[#*>`-]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 155) + '…';
    arts.push({
      slug,
      titre: meta.titre || slug,
      description: meta.description || excerpt,
      date: meta.date || '',
      dateFr: dateFr(meta.date || ''),
      image: meta.image || 'images/logo_porokhane_digital.jpg',
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
  return `        <div class="blog-card">
          <div class="blog-card-img">
            <img src="${a.image}" alt="${a.titre.replace(/"/g, '&quot;')}">
          </div>
          <div class="blog-card-content">
            <div class="blog-meta"><i class="far fa-calendar-alt"></i> ${a.dateFr} • <i class="far fa-folder"></i> ${a.categorie}</div>
            <h3>${a.titre}</h3>
            <p>${a.excerpt}</p>
            <a href="${a.slug}.html" class="btn btn-secondary"><i class="fas fa-book-open"></i> Lire l'article</a>
          </div>
        </div>\n`;
}
