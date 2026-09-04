/**
 * Genera, a ogni build, tutto ciò che decide chi può leggere il sito e cosa
 * ci trova: `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`, e
 * dentro `index.html` il meta robots, la scheda schema.org statica e il
 * riepilogo per chi non esegue JavaScript.
 *
 * Due interruttori indipendenti in `src/data/site.ts` governano tutto:
 *   - `PUBBLICO`        apre il sito a Google, Bing e ai motori tradizionali
 *   - `APERTO_ALLE_AI`  apre ai crawler delle AI elencati in crawler-ai.mjs,
 *                       lasciando chiusi i motori di ricerca
 * Generare tutto da qui, in un solo posto, evita il caso peggiore: aprirne
 * uno e dimenticare gli altri, così metà del sito dice una cosa e metà
 * un'altra.
 *
 * ⚠️ Limite da conoscere: questo è un sito a pagina singola (React), e il
 * contenuto di ogni pagina viene scritto nel DOM da JavaScript. Un crawler
 * che non esegue JavaScript — ed è il caso della maggior parte dei crawler
 * delle AI documentati oggi — non vede le pagine renderizzate: vede solo
 * quello che questo script scrive staticamente (qui, in robots.txt e in
 * llms.txt). Per questo il riepilogo e llms.txt contengono i fatti principali
 * per esteso, invece di limitarsi a un link.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { CRAWLER_AI } from './crawler-ai.mjs';
import { sito, studio, servizi, team } from '../src/data/site.ts';
import { creaSchedaClinica } from '../src/lib/schemaOrg.ts';

const radice = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBBLICO = sito.PUBBLICO;
const APERTO_ALLE_AI = sito.APERTO_ALLE_AI;
const APERTO = PUBBLICO || APERTO_ALLE_AI;
const DOMINIO = sito.dominio.replace(/\/$/, '');

const escapeHtml = (testo) =>
  String(testo).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const orariTesto = (orari) => orari.map((o) => `${o.giorno}: ${o.ore}`).join(' · ');

/** Ogni rotta di App.tsx che ha senso far leggere, con una riga di descrizione. */
const pagine = [
  { url: '/', priorita: '1.0', frequenza: 'monthly', titolo: 'Home', descrizione: 'Presentazione dello studio' },
  { url: '/servizi', priorita: '0.9', frequenza: 'monthly', titolo: 'Servizi', descrizione: 'I trattamenti offerti' },
  { url: '/contatti', priorita: '0.9', frequenza: 'monthly', titolo: 'Contatti', descrizione: 'Indirizzo, telefono, orari e modulo di richiesta' },
  { url: '/team', priorita: '0.8', frequenza: 'monthly', titolo: 'Team', descrizione: 'Le professioniste dello studio' },
  { url: '/chi-siamo', priorita: '0.7', frequenza: 'yearly', titolo: 'Chi siamo', descrizione: 'La storia dello studio' },
  { url: '/faq', priorita: '0.7', frequenza: 'monthly', titolo: 'FAQ', descrizione: 'Domande frequenti sui trattamenti' },
  { url: '/gallery', priorita: '0.5', frequenza: 'yearly', titolo: 'Gallery', descrizione: 'Foto dello studio' },
  { url: '/privacy', priorita: '0.3', frequenza: 'yearly', titolo: 'Privacy policy', descrizione: 'Trattamento dei dati personali' },
  { url: '/cookie-policy', priorita: '0.3', frequenza: 'yearly', titolo: 'Cookie policy', descrizione: 'Cookie e tracciamento' },
];

const oggi = new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------------------
// sitemap.xml
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// robots.txt
// ---------------------------------------------------------------------------

let robots;
if (PUBBLICO) {
  robots = `User-agent: *
Allow: /

Sitemap: ${DOMINIO}/sitemap.xml
`;
} else if (APERTO_ALLE_AI) {
  robots = `# Sito non ancora aperto ai motori di ricerca tradizionali: apertura
# dello studio il ${sito.apertura}. È invece leggibile dalle AI elencate qui
# sotto — la lista, con una riga di spiegazione per ciascuna, sta in
# scripts/crawler-ai.mjs. Un riepilogo pensato per loro è su /llms.txt.
User-agent: *
Disallow: /

${CRAWLER_AI.map((c) => `User-agent: ${c.agente}\nAllow: /`).join('\n\n')}

Sitemap: ${DOMINIO}/sitemap.xml
`;
} else {
  robots = `# Sito non ancora pubblico: apertura ${sito.apertura}.
# Si apre mettendo PUBBLICO o APERTO_ALLE_AI a true in src/data/site.ts.
User-agent: *
Disallow: /
`;
}

// ---------------------------------------------------------------------------
// llms.txt — riepilogo pensato per le AI, che spesso non eseguono JavaScript
// e quindi non vedono le pagine renderizzate del sito.
// ---------------------------------------------------------------------------

let llms;
if (!APERTO) {
  llms = `# ${studio.name}

Il sito non è ancora aperto alla lettura da parte di sistemi automatici.
Per informazioni: ${studio.email}
`;
} else {
  const orariRiga = orariTesto(studio.orari);
  llms = `# ${studio.name}

> ${studio.claim} a ${studio.zone}, Roma.

${PUBBLICO ? '' : `Lo studio apre il ${sito.apertura}. `}Le descrizioni dei trattamenti sono informative: non sono una diagnosi né una promessa di risultato clinico.

## Contatti
- Indirizzo: ${studio.address}, ${studio.city} (${studio.zone})
- Telefono: ${studio.phone}
- Email: ${studio.email}
- Orari: ${orariRiga}

## Pagine
${pagine.map((p) => `- [${p.titolo}](${DOMINIO}${p.url}): ${p.descrizione}`).join('\n')}

## Servizi
${servizi.map((s) => `- **${s.titolo}** — ${s.descrizione}`).join('\n')}

## Team
${team.map((m) => `- ${m.name} — ${m.role}${m.albo ? ` — Albo dei Fisioterapisti n. ${m.albo}` : ''}`).join('\n')}

## Dati legali
Titolarità del trattamento, contatti e diritti sui dati personali: ${DOMINIO}/privacy
`;
}

// ---------------------------------------------------------------------------
// index.html — meta robots, scheda schema.org statica, riepilogo <noscript>
// ---------------------------------------------------------------------------

let html = readFileSync(join(radice, 'index.html'), 'utf8');

html = html.replace(
  /<meta name="robots" content="[^"]*" \/>/,
  `<meta name="robots" content="${APERTO ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'}" />`
);

html = html.replace(
  /(<script type="application\/ld\+json" id="scheda-clinica">)[\s\S]*?(<\/script>)/,
  (_, apre, chiude) => `${apre}${JSON.stringify(creaSchedaClinica())}${chiude}`
);

const riepilogo = `
      <h1>${escapeHtml(studio.name)} — ${escapeHtml(studio.claim)}</h1>
      <p>${escapeHtml(studio.address)}, ${escapeHtml(studio.city)} (${escapeHtml(studio.zone)}). Telefono: ${escapeHtml(studio.phone)}. Email: ${escapeHtml(studio.email)}.</p>
      <p>Orari: ${escapeHtml(orariTesto(studio.orari))}.</p>
      <h2>Servizi</h2>
      <ul>
${servizi.map((s) => `        <li><strong>${escapeHtml(s.titolo)}</strong> — ${escapeHtml(s.descrizione)}</li>`).join('\n')}
      </ul>
      <h2>Team</h2>
      <ul>
${team.map((m) => `        <li>${escapeHtml(m.name)} — ${escapeHtml(m.role)}${m.albo ? ` — Albo dei Fisioterapisti n. ${escapeHtml(m.albo)}` : ''}</li>`).join('\n')}
      </ul>
      <p><a href="/privacy">Privacy policy</a> · <a href="/cookie-policy">Cookie policy</a> · <a href="/llms.txt">Riepilogo per le AI</a></p>
    `;

html = html.replace(
  /(<noscript id="riepilogo">)[\s\S]*?(<\/noscript>)/,
  (_, apre, chiude) => `${apre}${riepilogo}${chiude}`
);

// ---------------------------------------------------------------------------

writeFileSync(join(radice, 'public/sitemap.xml'), sitemap);
writeFileSync(join(radice, 'public/robots.txt'), robots);
writeFileSync(join(radice, 'public/llms.txt'), llms);
writeFileSync(join(radice, 'index.html'), html);

const stato = PUBBLICO ? 'APERTO ai motori' : APERTO_ALLE_AI ? 'aperto solo alle AI' : 'chiuso a tutti';
console.log(`sitemap: ${pagine.length} pagine · robots/llms.txt/index.html: ${stato}`);
