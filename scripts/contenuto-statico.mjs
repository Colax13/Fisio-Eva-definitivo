/**
 * Il contenuto di ogni pagina in HTML semplice, per chi non esegue JavaScript.
 *
 * Il sito è un'app a pagina singola: senza JavaScript il corpo di ogni
 * pagina è vuoto, e la maggior parte dei crawler delle AI legge proprio
 * così. Prima di questo file tutte le rotte mostravano lo stesso riepilogo,
 * quello della home, e per un crawler /servizi, /team e /faq erano la stessa
 * pagina con un titolo diverso.
 *
 * Qui ogni rotta ha il suo testo, scritto per esteso a partire dagli stessi
 * dati che usa il sito (`src/data/site.ts`): nessuna seconda copia da tenere
 * allineata a mano. Lo usano due script:
 *   - `genera-sitemap.mjs` scrive la home dentro `index.html`;
 *   - `pagine-statiche.mjs` scrive tutte le altre, dopo il build, nella copia
 *     di `index.html` di ciascuna rotta.
 *
 * Il team clinico e la segreteria restano fuori: per loro titoli e albo non
 * sono ancora confermati, e qui non si scrive nulla che non lo sia.
 */
import {
  categorie,
  faq,
  frasi,
  gallery,
  legale,
  percorso,
  servizi,
  studio,
  studioEva,
  team,
  trattamenti,
  valori,
} from '../src/data/site.ts';
import { metaPagine } from '../src/data/seo.ts';

const esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const orariTesto = (orari) => orari.map((o) => `${o.giorno}: ${o.ore}`).join(' · ');
const ul = (voci) => `<ul>\n${voci.map((v) => `        <li>${v}</li>`).join('\n')}\n      </ul>`;

/** Il menu del sito: senza, un crawler che arriva su una pagina non trova le altre. */
const voci = [
  ['/', 'Home'],
  ['/servizi', 'Servizi e trattamenti'],
  ['/team', 'Team'],
  ['/chi-siamo', 'Chi siamo'],
  ['/faq', 'Domande frequenti'],
  ['/contatti', 'Contatti'],
  ['/studioeva', 'StudioEVA'],
  ['/gallery', 'Gallery'],
];
const menu = `<nav><p>${voci.map(([url, nome]) => `<a href="${url}">${esc(nome)}</a>`).join(' · ')}</p></nav>`;

/** Nome, indirizzo e telefono su ogni pagina, sempre uguali: è il segnale locale più forte che c'è. */
const recapiti = `<p>${esc(studio.name)} — ${esc(studio.claim)}. ${esc(studio.address)}, ${esc(studio.city)} (${esc(studio.zone)}), ${esc(studio.comeArrivare.breve.charAt(0).toLowerCase() + studio.comeArrivare.breve.slice(1))}. Telefono e WhatsApp: ${esc(studio.phone)}. Email: ${esc(studio.email)}. Orari: ${esc(orariTesto(studio.orari))}.</p>`;

const piede = `<p><a href="/privacy">Privacy policy</a> · <a href="/cookie-policy">Cookie policy</a> · <a href="/llms.txt">Riepilogo per le AI</a></p>`;

const zone = `Riceviamo pazienti da ${studio.zoneServite.slice(0, -1).join(', ')} e ${studio.zoneServite.at(-1)}, nel quadrante nord-ovest di Roma.`;

const sezioneTeam = (completa) =>
  team
    .map(
      (m) => `<h3>${esc(m.name)}</h3>
      <p>${esc(m.role)}${m.albo ? ` — Albo dei Fisioterapisti n. ${esc(m.albo)}${m.ordine ? `, ${esc(m.ordine)}` : ''}` : ''}.</p>
      <p>${esc(completa ? m.description : (m.descrizioneBreve ?? m.description))}</p>`
    )
    .join('\n      ');

const sezionePercorso = `<h2>Il percorso di cura, passo dopo passo</h2>
      <ol>
${percorso.map((p) => `        <li><strong>${esc(p.titolo)}</strong> — ${esc(p.desc)}</li>`).join('\n')}
      </ol>`;

/** I trattamenti di un'area, con i sintomi per cui le persone li cercano. */
const trattamentiArea = (slug) =>
  ul(
    trattamenti
      .filter((t) => t.categoria === slug)
      .map((t) => `<strong>${esc(t.nome)}</strong> — ${esc(t.sottotitolo)} Sintomi e situazioni frequenti: ${esc(t.sintomi.join(', '))}.`)
  );

const docenteDi = (slug) => team.find((m) => m.slug === studioEva.docenti[slug]);
const corsiStudioEva = trattamenti.filter((t) => t.categoria === 'terapie-di-gruppo');

// ---------------------------------------------------------------------------

const corpi = {
  '/': `<h1>${esc(studio.name)} — ${esc(studio.claim)} a ${esc(studio.zone)}, Roma</h1>
      ${recapiti}
      <p>Fisioterapia, osteopatia e riabilitazione in Via di Boccea 755, tra Casalotti e Boccea. Tre titolari, fisioterapiste e osteopate, e un percorso costruito sulla persona: prima si ascolta e si valuta, poi si tratta. ${esc(zone)}</p>
      <h2>Servizi</h2>
      ${ul(servizi.map((s) => `<strong>${esc(s.titolo)}</strong> — ${esc(s.descrizione)} (${esc(s.punti.join(', '))})`))}
      <p>Ci occupiamo anche di salute della donna (pavimento pelvico, gravidanza, post-parto, cicatrice da cesareo) e di osteopatia neonatale e pediatrica. Elenco completo: <a href="/servizi">servizi e trattamenti</a>.</p>
      <h2>Le titolari</h2>
      ${sezioneTeam(false)}
      ${sezionePercorso}
      <h2>${esc(studioEva.nome)} — ${esc(studioEva.claim)}</h2>
      <p>Al piano superiore, l'associazione culturale ${esc(studioEva.nome)} organizza corsi di gruppo: ${esc(corsiStudioEva.map((c) => c.nome).join(', '))}. <a href="/studioeva">Scopri ${esc(studioEva.nome)}</a>.</p>`,

  '/servizi': `<h1>Servizi e trattamenti — ${esc(studio.name)}, ${esc(studio.zone)} (Roma)</h1>
      ${recapiti}
      <p>I trattamenti sono organizzati per come arrivano le persone in studio: per il problema che hanno, non per la tecnica. Ogni percorso comincia da un colloquio iniziale e da una valutazione. Le descrizioni sono informative: non sono una diagnosi né una promessa di risultato.</p>
      ${categorie
        .map(
          (c) => `<h2 id="${c.slug}">${esc(c.nome)}</h2>
      <p>${esc(c.sottotitolo)}</p>
      ${trattamentiArea(c.slug)}${
        c.slug === 'terapie-di-gruppo'
          ? `\n      <p>Le terapie di gruppo sono attività non sanitarie, organizzate con l'associazione culturale ${esc(studioEva.nome)} al piano superiore: <a href="/studioeva">orari, corsi e iscrizioni</a>.</p>`
          : ''
      }`
        )
        .join('\n      ')}`,

  '/team': `<h1>Il team di ${esc(studio.name)} — fisioterapiste e osteopate a ${esc(studio.zone)}, Roma</h1>
      ${recapiti}
      <p>Lo studio è guidato da tre titolari, fisioterapiste iscritte all'albo, due delle quali anche osteopate D.O. Ciascuna lavora con la propria partita IVA.</p>
      ${sezioneTeam(true)}`,

  '/chi-siamo': `<h1>Chi siamo — ${esc(studio.name)}, ${esc(studio.claim.toLowerCase())} a ${esc(studio.zone)}</h1>
      ${recapiti}
      <p>${esc(studio.name)} è guidato da tre titolari, fisioterapiste e osteopate: ${esc(team.map((m) => m.name).join(', '))}. Il modo di lavorare è uno: ascoltare prima, trattare poi, e costruire un percorso sulla persona, non sul protocollo.</p>
      <h2>I principi</h2>
      ${ul(valori.map((v) => `<strong>${esc(v.titolo)}</strong> — ${esc(v.testo)}`))}
      ${ul(frasi.map((f) => esc(f.testo)))}
      ${sezionePercorso}
      <h2>Le titolari</h2>
      ${sezioneTeam(false)}`,

  '/faq': `<h1>Domande frequenti — ${esc(studio.name)}</h1>
      ${recapiti}
      ${['Generali', 'Prima visita', 'Trattamenti']
        .map(
          (cat) => `<h2>${esc(cat)}</h2>
      <dl>
${faq
  .filter((f) => f.categoria === cat)
  .map((f) => `        <dt>${esc(f.domanda)}</dt>\n        <dd>${esc(f.risposta)}</dd>`)
  .join('\n')}
      </dl>`
        )
        .join('\n      ')}`,

  '/contatti': `<h1>Contatti — ${esc(studio.name)}, ${esc(studio.address)}, Roma ${esc(studio.zone)}</h1>
      <h2>Recapiti</h2>
      ${ul([
        `Indirizzo: ${esc(studio.address)}, ${esc(studio.city)} (${esc(studio.zone)})`,
        `Telefono e WhatsApp: ${esc(studio.phone)} — le prenotazioni passano dalla segreteria dello studio`,
        `Email: ${esc(studio.email)}`,
        `Instagram: <a href="${esc(studio.instagramUrl)}">@${esc(studio.instagram)}</a>`,
      ])}
      <h2>Orari</h2>
      ${ul(studio.orari.map((o) => `${esc(o.giorno)}: ${esc(o.ore)}`))}
      <h2>Come arrivare</h2>
      <p>${esc(studio.comeArrivare.breve)}. ${esc(studio.comeArrivare.auto)}</p>
      <p>Parcheggio: ${esc(studio.comeArrivare.parcheggio)}</p>
      <p>Coordinate: ${studio.coordinate.lat}, ${studio.coordinate.lng} (Plus Code ${esc(studio.plusCode)}).</p>
      <h2>Zone servite</h2>
      <p>${esc(zone)}</p>`,

  '/studioeva': `<h1>${esc(studioEva.nome)} — ${esc(studioEva.claim)}</h1>
      <p>${esc(studioEva.natura)}. ${esc(studioEva.presentazione)}</p>
      <p>Dove: ${esc(studioEva.dove)} ${esc(studio.comeArrivare.breve)}.</p>
      <h2>I corsi</h2>
      ${ul(
        corsiStudioEva.map((c) => {
          const d = docenteDi(c.slug);
          return `<strong>${esc(c.nome)}</strong> — ${esc(c.sottotitolo)}${d ? ` Con ${esc(d.name)}, ${esc(d.role.toLowerCase())}.` : ''}`;
        })
      )}
      ${team
        .filter((m) => corsiStudioEva.some((c) => studioEva.docenti[c.slug] === m.slug))
        .map((m) => `<h2>Chi guida i corsi: ${esc(m.name)}</h2>\n      <p>${esc(m.description)}</p>`)
        .join('\n      ')}
      <h2>Orari</h2>
      ${
        studioEva.orari
          ? ul(studioEva.orari.map((o) => `${esc(o.corso)}: ${esc(o.giorno)}, ${esc(o.ore)}`))
          : `<p>Il calendario dei corsi cambia con le stagioni: giorni e orari aggiornati si chiedono alla segreteria (${esc(orariTesto(studio.orari))}).</p>`
      }
      <h2>Come iscriversi</h2>
      <ol>
${studioEva.iscrizione.map((p) => `        <li><strong>${esc(p.titolo)}</strong> — ${esc(p.desc)}</li>`).join('\n')}
      </ol>${studioEva.tessera ? `\n      <p>${esc(studioEva.tessera)}</p>` : ''}
      <p>I corsi di ${esc(studioEva.nome)} sono attività di movimento e benessere, non trattamenti sanitari. Per un dolore o un problema specifico il primo passo è una valutazione in studio: <a href="/servizi">i trattamenti di ${esc(studio.name)}</a>.</p>`,

  '/gallery': `<h1>Gallery — lo studio ${esc(studio.name)} a ${esc(studio.zone)}, Roma</h1>
      ${recapiti}
      ${ul(gallery.map((g) => `<a href="${esc(g.src)}">${esc(g.alt)}</a> (${esc(g.categoria)})`))}`,

  '/privacy': `<h1>Privacy policy — ${esc(studio.name)}</h1>
      <p>${esc(metaPagine['/privacy'].descrizione)}</p>
      <p>Contitolari del trattamento: ${esc(legale.contitolari.map((c) => `${c.nome}${c.partitaIva ? ` (P.IVA ${c.partitaIva})` : ''}`).join('; '))}. Punto di contatto unico per l'esercizio dei diritti: ${esc(legale.emailPrivacy)}.</p>`,

  '/cookie-policy': `<h1>Cookie policy — ${esc(studio.name)}</h1>
      <p>${esc(metaPagine['/cookie-policy'].descrizione)}</p>`,
};

/** Il contenuto `<noscript>` di una rotta. Le rotte senza testo dedicato ricevono quello della home. */
export function contenutoStatico(rotta) {
  const corpo = corpi[rotta] ?? corpi['/'];
  return `\n      ${menu}\n      ${corpo}\n      ${piede}\n    `;
}

export const rotteConContenuto = Object.keys(corpi);
