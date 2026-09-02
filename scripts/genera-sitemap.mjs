/**
 * Genera `public/sitemap.xml` e `public/robots.txt` a ogni build.
 *
 * L'interruttore è uno solo — `PUBBLICO` in `src/data/site.ts` — e da lì
 * dipendono tutti i punti in cui il sito si apre o si chiude ai motori di
 * ricerca: robots.txt, sitemap, meta robots delle pagine. Averne uno solo
 * evita il caso peggiore, cioè aprirne metà e credere di averli aperti tutti.
 *
 * Finché è `false` il file robots.txt vieta tutto e la sitemap non viene
 * nemmeno annunciata.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const radice = join(dirname(fileURLToPath(import.meta.url)), '..');
const config = readFileSync(join(radice, 'src/data/site.ts'), 'utf8');

/** Legge un valore dall'oggetto `sito` senza dover importare TypeScript. */
const leggi = (chiave, regex) => {
  const trovato = config.match(regex);
  if (!trovato) throw new Error(`Non trovo "${chiave}" in src/data/site.ts`);
  return trovato[1];
};

const PUBBLICO = leggi('PUBBLICO', /PUBBLICO:\s*(true|false)/) === 'true';
const DOMINIO = leggi('dominio', /dominio:\s*'([^']+)'/).replace(/\/$/, '');

/** Ogni rotta di App.tsx che ha senso far indicizzare, con la sua priorità. */
const pagine = [
  { url: '/', priorita: '1.0', frequenza: 'monthly' },
  { url: '/servizi', priorita: '0.9', frequenza: 'monthly' },
  { url: '/contatti', priorita: '0.9', frequenza: 'monthly' },
  { url: '/team', priorita: '0.8', frequenza: 'monthly' },
  { url: '/chi-siamo', priorita: '0.7', frequenza: 'yearly' },
  { url: '/faq', priorita: '0.7', frequenza: 'monthly' },
  { url: '/gallery', priorita: '0.5', frequenza: 'yearly' },
  { url: '/privacy', priorita: '0.3', frequenza: 'yearly' },
  { url: '/cookie-policy', priorita: '0.3', frequenza: 'yearly' },
];

const oggi = new Date().toISOString().slice(0, 10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pagine
  .map(
    (p) => `  <url>
    <loc>${DOMINIO}${p.url}</loc>
    <lastmod>${oggi}</lastmod>
    <changefreq>${p.frequenza}</changefreq>
    <priority>${p.priorita}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

const robots = PUBBLICO
  ? `User-agent: *
Allow: /

Sitemap: ${DOMINIO}/sitemap.xml
`
  : `# Sito non ancora pubblico: apertura 26 settembre 2026.
# Si apre mettendo PUBBLICO: true in src/data/site.ts e togliendo
# l'header X-Robots-Tag da vercel.json.
User-agent: *
Disallow: /
`;

writeFileSync(join(radice, 'public/sitemap.xml'), sitemap);
writeFileSync(join(radice, 'public/robots.txt'), robots);

console.log(
  `sitemap: ${pagine.length} pagine · robots: ${PUBBLICO ? 'APERTO ai motori' : 'chiuso ai motori'}`
);
