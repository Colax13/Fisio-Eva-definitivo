# FisioEva — sito

Sito di **FisioEva**, studio di fisioterapia e osteopatia in Via di Boccea 755, Roma (Casalotti). Apertura 26 settembre 2026.

> La fonte unica di verità per contenuti, struttura e regole è il documento di progetto `ISTRUZIONI_CLAUDE_CODE_SITO.md`. Se il codice e quel documento non concordano, vince il documento.

## Avvio

```bash
npm install
npm run dev
```

| Comando | Cosa fa |
| --- | --- |
| `npm run dev` | server di sviluppo su `localhost:3000` |
| `npm run build` | rigenera la sitemap e compila in `dist/` |
| `npm run sitemap` | rigenera solo `public/sitemap.xml` e `robots.txt` |
| `npm run lint` | controllo dei tipi TypeScript |

## Struttura

```
src/
  config/site.ts        recapiti, flag e costante di prenotazione
  content/              testi: servizi, team, frasi e FAQ
  lib/seo.ts            meta, canonical e schema JSON-LD
  components/ui/        bottoni, occhielli, briciole, figure, DatoMancante
  components/layout/    navbar, footer, intestazione, layout
  pages/                una per rotta
```

Rotte: `/` · `/servizi` · `/servizi/[categoria]` · `/servizi/[categoria]/[slug]` · `/team` · `/chi-siamo` · `/contatti` · `/faq` · `/privacy` · `/cookie-policy` · 404.

## Dove si mettono le mani

**I testi** stanno in `src/content/`. I 22 servizi sono in `servizi.ts`: aggiungerne uno significa aggiungere un oggetto all'array, e la pagina, la voce di categoria, la ricerca per sintomo e la sitemap si aggiornano da sole.

**I recapiti e i flag** stanno in `src/config/site.ts`. In particolare:

- `PRENOTAZIONE_URL` — destinazione di ogni CTA "Prenota". Oggi è un `mailto:`, perché non è ancora deciso se sarà form, WhatsApp o Calendly. Si cambia solo lì.
- `NUTRIZIONE_ENABLED`, `MOSTRA_SEGRETERIA`, `RECENSIONI_ENABLED`, `SPAZIO_CORSI_NOME_CONFERMATO` — sezioni pronte ma spente, in attesa di conferme.

## Dati mancanti

Dove il cliente non ha ancora fornito un dato **non c'è un valore inventato**: c'è `<DatoMancante id="..." />`, che in sviluppo mostra un badge giallo e in produzione sparisce (o mostra un testo neutro).

Per vedere tutti i buchi aperti basta far girare il sito in locale e guardare i badge gialli. Oggi mancano: telefono, orari, P.IVA, numeri di albo, destinazione della prenotazione, bio di Veronica Mirarchi, titoli esatti dei quattro collaboratori, durata delle sedute, nome del piano superiore, parcheggio.

## Immagini

Lo shooting è previsto dopo l'apertura, quindi **non ci sono foto stock**: al loro posto il componente `<Figura>` disegna un blocco colore con il motivo a linea, allo stesso rapporto d'aspetto della foto definitiva. Quando le foto arrivano si passa `src` e il layout non cambia di un pixel.

Le uniche immagini reali già presenti sono i ritratti di Azzurra ed Elisa in `public/team/`, ritagliati dal flyer del branding.

## Regole di scrittura

Prima di toccare un testo, tre cose da sapere:

- **Mai promesse di guarigione** (L. 145/2018). Si usa "può aiutare", "si lavora su", "l'obiettivo del percorso è".
- **Mai "gratis"**: si dice sempre "prima valutazione".
- **I fisioterapisti non sono medici.** Mai "medici", "équipe medica".
- L'email è `fisioeva.boccea@gmail.com` — **boccea**, non "boccia". È un refuso ricorrente nei materiali.

Esiste inoltre una lista di frasi già scartate che non vanno reintrodotte: la trovi commentata in `src/content/testi.ts`.

## Prima del go-live

- Completare privacy e cookie policy: quelle in `src/pages/Legale.tsx` sono uno scheletro, non un testo legale validato. Il sito tratta dati sanitari.
- Attivare il banner di consenso ai cookie.
- Confermare titoli e numeri di albo di tutti i professionisti: è un obbligo di legge.
- Registrare il dominio `fisioeva.it` e attivare la casella di posta.

## Deploy

`npm run build` produce `dist/`. Il file `vercel.json` contiene il rewrite che fa funzionare gli indirizzi diretti (`/servizi/...`) su un sito a pagina singola: su un host diverso da Vercel va replicata la stessa regola.
