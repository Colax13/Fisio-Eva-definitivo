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
 * quello che scriviamo staticamente: qui (llms.txt, il riepilogo della home)
 * e, per le altre rotte, `pagine-statiche.mjs`. Il testo di ogni pagina sta
 * in `contenuto-statico.mjs`. Per questo il riepilogo e llms.txt contengono
 * i fatti per esteso, invece di limitarsi a un link.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { CRAWLER_AI } from './crawler-ai.mjs';
import {
  sito,
  studio,
  servizi,
  team,
  immagini,
  foto,
  stock,
  studioEvaMedia,
  accoglienza,
  gallery,
  categorie,
  trattamenti,
  percorso,
  faq,
  studioEva,
  docentiDi,
} from '../src/data/site.ts';
import { creaDatiStrutturati } from '../src/lib/schemaOrg.ts';
import { contenutoStatico } from './contenuto-statico.mjs';
import { schede, controllaSchede, schedaDi } from '../src/data/approfondimenti.ts';

const radice = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBBLICO = sito.PUBBLICO;
const APERTO_ALLE_AI = sito.APERTO_ALLE_AI;
const APERTO = PUBBLICO || APERTO_ALLE_AI;
const DOMINIO = sito.dominio.replace(/\/$/, '');

/*
 * Le foto referenziate dal codice devono esistere davvero in `public/`.
 *
 * Il sito è pubblico e indicizzato: pubblicare una versione con le immagini
 * rotte è peggio che non pubblicare affatto, e a occhio non te ne accorgi
 * finché non apri ogni pagina. Meglio far fallire il build.
 */
const percorsiFoto = [
  ...Object.values(immagini),
  ...Object.values(foto),
  ...Object.values(stock),
  // Foto e video di StudioEVA: un video mancante lascia un riquadro nero.
  ...Object.values(studioEvaMedia),
  ...accoglienza.map((p) => p.photo),
  ...team.map((m) => m.photo),
].filter((v) => typeof v === 'string' && v.startsWith('/'));

const mancanti = percorsiFoto.filter((v) => !existsSync(join(radice, 'public', v)));
if (mancanti.length) {
  /*
   * Ferma anche le anteprime, non solo la produzione.
   *
   * Per un giorno il controllo lasciava passare le anteprime, per non tenere
   * una X rossa fissa nella dashboard. Errore: Vercel pubblicava un'anteprima
   * verde in cui mancavano tutte le immagini, e a chi la apriva sembrava che
   * il sito fosse rotto. Un deploy che non parte si capisce; uno che parte e
   * si vede a metà no.
   */
  throw new Error(
    `Mancano ${mancanti.length} foto in public/:\n  ` +
      mancanti.join('\n  ') +
      '\n\nCopiale prima di pubblicare (vedi la sezione Immagini del README).'
  );
}

// Le schede dei trattamenti: un link rotto o un nome sbagliato ferma il build.
const erroriSchede = controllaSchede();
if (erroriSchede.length) throw new Error(`Schede trattamento:\n  ${erroriSchede.join('\n  ')}`);

const orariTesto = (orari) => orari.map((o) => `${o.giorno}: ${o.ore}`).join(' · ');

/** Ogni rotta di App.tsx che ha senso far leggere, con una riga di descrizione. */
const pagine = [
  { url: '/', priorita: '1.0', frequenza: 'monthly', titolo: 'Home', descrizione: 'Presentazione dello studio' },
  { url: '/servizi', priorita: '0.9', frequenza: 'monthly', titolo: 'Servizi', descrizione: 'I trattamenti offerti' },
  { url: '/contatti', priorita: '0.9', frequenza: 'monthly', titolo: 'Contatti', descrizione: 'Indirizzo, telefono, orari e modulo di richiesta' },
  { url: '/team', priorita: '0.8', frequenza: 'monthly', titolo: 'Team', descrizione: 'Le professioniste dello studio' },
  { url: '/chi-siamo', priorita: '0.7', frequenza: 'yearly', titolo: 'Chi siamo', descrizione: 'La storia dello studio' },
  { url: '/faq', priorita: '0.7', frequenza: 'monthly', titolo: 'FAQ', descrizione: 'Domande frequenti sui trattamenti' },
  { url: '/studioeva', priorita: '0.7', frequenza: 'monthly', titolo: 'StudioEVA', descrizione: "Corsi di gruppo dell'associazione culturale StudioEVA: posturale, Feldenkrais, yoga, pilates" },
  { url: '/gallery', priorita: '0.5', frequenza: 'yearly', titolo: 'Gallery', descrizione: 'Foto dello studio' },
  { url: '/privacy', priorita: '0.3', frequenza: 'yearly', titolo: 'Privacy policy', descrizione: 'Trattamento dei dati personali' },
  { url: '/cookie-policy', priorita: '0.3', frequenza: 'yearly', titolo: 'Cookie policy', descrizione: 'Cookie e tracciamento' },
  // Le schede dei trattamenti, fuori dal menu ma nella sitemap.
  ...schede.map((s) => ({
    url: s.url,
    priorita: '0.6',
    frequenza: 'yearly',
    titolo: s.trattamento.nome,
    descrizione: s.descrizioneSeo,
    immagine: s.trattamento.image,
  })),
];

const oggi = new Date().toISOString().slice(0, 10);

/*
 * Le foto di ogni pagina, dichiarate nella sitemap: le immagini le inserisce
 * JavaScript, e senza questo elenco Google Immagini le scoprirebbe tardi o
 * mai. Solo scatti dello studio e ritratti, non le stock: non sono nostre e
 * non raccontano lo studio.
 */
const soloNostre = (src) => typeof src === 'string' && src.startsWith('/') && !src.includes('/stock-');
const immaginiPagina = {
  '/': [immagini.hero, immagini.sede, immagini.trattamento, immagini.sedeIllustrazione],
  '/servizi': servizi.map((s) => s.image),
  '/team': [...team.map((m) => m.photo), ...accoglienza.map((p) => p.photo), foto.teamGruppo],
  '/chi-siamo': [immagini.calma, foto.teamGruppoRelazionale],
  '/gallery': gallery.map((g) => g.src),
  '/studioeva': [studioEvaMedia.gruppo, studioEvaMedia.yoga, studioEvaMedia.posturale, studioEvaMedia.luce],
};
const escapeXml = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const immaginiDi = (url) => immaginiPagina[url] ?? [pagine.find((p) => p.url === url)?.immagine];
const tagImmagini = (url) =>
  [...new Set(immaginiDi(url).filter(soloNostre))]
    .map((src) => `\n    <image:image>\n      <image:loc>${escapeXml(DOMINIO + src)}</image:loc>\n    </image:image>`)
    .join('');

// ---------------------------------------------------------------------------
// sitemap.xml
// ---------------------------------------------------------------------------

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${pagine
  .map(
    (p) => `  <url>
    <loc>${DOMINIO}${p.url}</loc>
    <lastmod>${oggi}</lastmod>
    <changefreq>${p.frequenza}</changefreq>
    <priority>${p.priorita}</priority>${tagImmagini(p.url)}
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
- Indirizzo: ${studio.address}, ${studio.city} (${studio.zone}) — ${studio.comeArrivare.breve}
- Telefono e WhatsApp: ${studio.phone} (le prenotazioni passano dalla segreteria dello studio)
- Email: ${studio.email}
- Instagram: ${studio.instagramUrl}
- Orari: ${orariRiga}
- Come arrivare: ${studio.comeArrivare.auto} ${studio.comeArrivare.parcheggio}
- Coordinate: ${studio.coordinate.lat}, ${studio.coordinate.lng} (Plus Code ${studio.plusCode})
- Zone servite: ${studio.zoneServite.join(', ')} (Roma nord-ovest)

## Pagine
${pagine
  .filter((p) => !p.url.startsWith('/servizi/'))
  .map((p) => `- [${p.titolo}](${DOMINIO}${p.url}): ${p.descrizione}`)
  .join('\n')}

## Servizi
${servizi.map((s) => `- **${s.titolo}** — ${s.descrizione}`).join('\n')}

## Trattamenti per area
${categorie
  .map(
    (c) => `### ${c.nome}
${c.sottotitolo}

${trattamenti
  .filter((t) => t.categoria === c.slug)
  .map((t) => {
    const url = schedaDi(t);
    return `- **${url ? `[${t.nome}](${DOMINIO}${url})` : t.nome}** — ${t.sottotitolo} Sintomi e situazioni frequenti: ${t.sintomi.join(', ')}.`;
  })
  .join('\n')}`
  )
  .join('\n\n')}

## Le titolari
${team
  .map(
    (m) => `### ${m.name}
${m.role}${m.albo ? ` — Albo dei Fisioterapisti n. ${m.albo}${m.ordine ? `, ${m.ordine}` : ''}` : ''}

${m.description}`
  )
  .join('\n\n')}

## Il percorso di cura
${percorso.map((p, i) => `${i + 1}. **${p.titolo}** — ${p.desc}`).join('\n')}

## ${studioEva.nome} — ${studioEva.claim}
${studioEva.natura}, al piano superiore dello studio: ${DOMINIO}/studioeva

${studioEva.presentazione}

${trattamenti
  .filter((t) => t.categoria === 'terapie-di-gruppo')
  .map((t) => {
    const d = docentiDi(t.slug);
    return `- **${t.nome}** — ${t.sottotitolo} ${studioEva.dettagli[t.slug] ?? ''}${d.length ? ` Con ${d.map((m) => m.name).join(' e ')}.` : ''}`;
  })
  .join('\n')}

Orari:
${(studioEva.orari ?? []).map((o) => `- ${o.corso}: ${o.giorno.toLowerCase()}, ${o.ore}`).join('\n')}

Informazioni e iscrizioni: WhatsApp di ${studioEva.nome}, ${studioEva.whatsappLeggibile}. I corsi sono attività di movimento e benessere, non trattamenti sanitari.

## Domande frequenti
${faq.map((f) => `**${f.domanda}**\n${f.risposta}`).join('\n\n')}

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
  (_, apre, chiude) => `${apre}${JSON.stringify(creaDatiStrutturati()).replace(/</g, '\\u003c')}${chiude}`
);

const riepilogo = contenutoStatico('/');

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
