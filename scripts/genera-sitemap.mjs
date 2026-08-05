/**
 * Genera public/sitemap.xml e public/robots.txt dalle rotte reali.
 * Gira prima della build, così la sitemap non va mai aggiornata a mano.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITO = 'https://www.fisioeva.it';

/**
 * Finché il sito non è pubblico, i motori di ricerca restano fuori.
 * Il sito ha ancora privacy e cookie policy in bozza, dati legali mancanti e
 * lo studio apre il 26 settembre 2026: farsi indicizzare adesso vorrebbe dire
 * mandare in giro una versione che non regge.
 *
 * Al go-live: metti true qui e togli l'header X-Robots-Tag da vercel.json.
 */
const PUBBLICO = false;

const sorgente = readFileSync(join(root, 'src/content/servizi.ts'), 'utf8');

// Estrae slug e categoria dai literal del file contenuti: nessun bundler,
// nessuna dipendenza, e resta allineato perché legge la stessa fonte.
const categorie = [...sorgente.matchAll(/slug:\s*'([a-z-]+)',\s*\n\s*nome:/g)].map((m) => m[1]);
const servizi = [...sorgente.matchAll(/slug:\s*'([a-z-]+)',\s*\n\s*nome:\s*'[^']*',\s*\n\s*categoria:\s*'([a-z-]+)'/g)].map(
  (m) => ({ slug: m[1], categoria: m[2] })
);
const categorieValide = categorie.filter((c) => servizi.some((s) => s.categoria === c));

const statiche = ['/', '/servizi', '/team', '/chi-siamo', '/contatti', '/faq', '/privacy', '/cookie-policy'];

const rotte = [
  ...statiche,
  ...categorieValide.map((c) => `/servizi/${c}`),
  ...servizi.map((s) => `/servizi/${s.categoria}/${s.slug}`),
];

const oggi = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${rotte
  .map(
    (r) => `  <url>
    <loc>${SITO}${r}</loc>
    <lastmod>${oggi}</lastmod>
    <priority>${r === '/' ? '1.0' : r.split('/').length > 3 ? '0.7' : '0.8'}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robots = PUBBLICO
  ? `User-agent: *
Allow: /

Sitemap: ${SITO}/sitemap.xml
`
  : `# Sito non ancora pubblico: apertura 26 settembre 2026.
User-agent: *
Disallow: /
`;

writeFileSync(join(root, 'public/sitemap.xml'), sitemap);
writeFileSync(join(root, 'public/robots.txt'), robots);

console.log(`sitemap.xml: ${rotte.length} rotte (${servizi.length} servizi, ${categorieValide.length} categorie)`);
