/**
 * Dopo `vite build`, scrive una copia di `dist/index.html` per ogni rotta
 * (`dist/servizi.html`, `dist/faq.html`, …) con titolo, descrizione,
 * canonical, anteprime social e il contenuto della pagina già giusti.
 *
 * Il contenuto è quello di `contenuto-statico.mjs`, dentro il `<noscript>`:
 * chi esegue JavaScript vede l'app come sempre, chi non lo esegue legge la
 * pagina per esteso — i trattamenti, le biografie, le FAQ — e non più lo
 * stesso riepilogo della home su ogni indirizzo.
 *
 * Perché serve: questo è un sito a pagina singola, e senza questo passaggio
 * ogni indirizzo riceve lo stesso HTML, con il titolo della home. Google
 * esegue JavaScript e alla fine vede il titolo corretto, ma Bing, le anteprime
 * di WhatsApp e Facebook e la maggior parte dei crawler delle AI no: per loro
 * /servizi, /team e /contatti erano la stessa pagina.
 *
 * Con `cleanUrls` in vercel.json, `/servizi` riceve `servizi.html`: Vercel
 * serve un file statico prima di applicare il rewrite verso `/index.html`,
 * quindi le rotte con una copia ricevono la loro, e tutte le altre (la 404)
 * continuano a ricevere l'app come prima.
 *
 * I testi vengono da `src/data/seo.ts`, gli stessi che `usePageMeta` scrive
 * nel browser: una sola fonte.
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { metaPagine } from '../src/data/seo.ts';
import { sito, faq } from '../src/data/site.ts';
import { contenutoStatico } from './contenuto-statico.mjs';

const radice = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(radice, 'dist');
const DOMINIO = sito.dominio.replace(/\/$/, '');

const attr = (testo) =>
  String(testo).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const testo = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Sostituisce un tag che deve esistere: se manca, il template è cambiato e va saputo subito. */
function sostituisci(html, regex, nuovo, cosa) {
  if (!regex.test(html)) throw new Error(`pagine-statiche: in dist/index.html manca ${cosa}`);
  return html.replace(regex, () => nuovo);
}

/*
 * Le FAQ come FAQPage schema.org, solo sulla pagina /faq. È anche la pagina
 * a cui le AI attingono più volentieri per rispondere a domande tipo
 * "serve la prescrizione per il fisioterapista?".
 */
const schedaFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faq.map((f) => ({
    '@type': 'Question',
    name: f.domanda,
    acceptedAnswer: { '@type': 'Answer', text: f.risposta },
  })),
};

const base = readFileSync(join(dist, 'index.html'), 'utf8');

for (const [rotta, meta] of Object.entries(metaPagine)) {
  const canonico = `${DOMINIO}${rotta === '/' ? '/' : rotta}`;
  let html = base;

  html = sostituisci(html, /<title>[\s\S]*?<\/title>/, `<title>${testo(meta.titolo)}</title>`, '<title>');
  html = sostituisci(
    html,
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${attr(meta.descrizione)}" />\n    <link rel="canonical" href="${canonico}" />`,
    'il meta description'
  );
  html = sostituisci(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${attr(meta.titolo)}" />\n    <meta property="og:url" content="${canonico}" />`,
    'og:title'
  );
  html = sostituisci(
    html,
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${attr(meta.descrizione)}" />`,
    'og:description'
  );

  html = sostituisci(
    html,
    /(<noscript id="riepilogo">)[\s\S]*?(<\/noscript>)/,
    `<noscript id="riepilogo">${contenutoStatico(rotta)}</noscript>`,
    'il riepilogo <noscript>'
  );

  if (rotta === '/faq') {
    html = html.replace(
      '</head>',
      () => `    <script type="application/ld+json">${JSON.stringify(schedaFaq).replace(/</g, '\\u003c')}</script>\n  </head>`
    );
  }

  const destinazione = join(dist, rotta === '/' ? 'index.html' : `${rotta.slice(1)}.html`);
  mkdirSync(dirname(destinazione), { recursive: true });
  writeFileSync(destinazione, html);
}

console.log(`pagine statiche: ${Object.keys(metaPagine).length} rotte con titolo, descrizione e contenuto propri`);
