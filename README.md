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

Per vedere tutti i buchi aperti basta far girare il sito in locale e guardare i badge gialli. Oggi mancano: P.IVA di Veronica, orari, numeri di albo, destinazione della prenotazione, bio di Veronica Mirarchi, titoli esatti dei quattro collaboratori, durata delle sedute, nome del piano superiore, parcheggio.

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

## GDPR e dati legali

Il sito tratta **dati relativi alla salute** (art. 9 GDPR), quindi la parte legale non è un adempimento di facciata.

Cosa c'è già:

- `src/pages/Privacy.tsx` — informativa artt. 13-14, con la base giuridica corretta per le finalità di cura (art. 9.2.h, non il consenso).
- `src/pages/CookiePolicy.tsx` — cookie policy.
- `src/components/ui/MappaConsenso.tsx` — la mappa di Google **non si carica da sola**. È il motivo per cui non serve un banner: senza strumenti di tracciamento attivi non c'è nulla da far consentire.
- Nel modulo contatti, un consenso esplicito e spuntabile a parte, non implicito nel clic su "Invia".

**Tutti i dati legali stanno in un unico posto: l'oggetto `legale` in `src/data/site.ts`.** I campi ancora a `null` sono quelli che lo studio non ha fornito: compilarli lì aggiorna informativa e footer insieme. Non si mettono valori inventati — al loro posto compare `<DatoMancante>`.

### Contitolarità

Le tre professioniste lavorano ciascuna con la propria partita IVA, quindi sono **contitolari** del trattamento ai sensi dell'art. 26, non un titolare unico. Da questo discendono tre obblighi che l'informativa già assolve:

- i dati identificativi di **tutte e tre** vanno indicati;
- serve un **punto di contatto unico** per i pazienti (oggi l'email dello studio);
- il **contenuto essenziale dell'accordo di contitolarità** va messo a disposizione su richiesta — il che presuppone che quell'accordo esista come documento firmato, non solo come intesa verbale. È l'unico adempimento che non si risolve nel codice.

Ancora da avere dallo studio:

1. **Partita IVA di Veronica Mirarchi** e **codice fiscale di tutte e tre** (`legale.contitolari` in `site.ts`). Quelle di Elisa e Azzurra sono inserite e la cifra di controllo torna.
2. **Numero di albo di Veronica** e, per tutte e tre, **l'Ordine TSRM-PSTRP presso cui sono iscritte**: l'albo è provinciale, quindi il solo numero non identifica l'iscrizione (`team[].ordine`).
3. Una **PEC**, se lo studio ne attiva una: senza, la riga semplicemente non compare nell'informativa.
4. Per **FisioDesk**: ragione sociale del fornitore e paese in cui sono conservati i dati, presi dal contratto e non dal sito commerciale (`legale.responsabili`).
5. L'**accordo di contitolarità firmato** e le nomine a responsabile dei fornitori: sono documenti, non codice, ma l'informativa li promette al paziente.

⚠️ Se un domani si aggiungono Google Analytics, un pixel o un widget che parte da solo, la cookie policy da sola non basta più: serve un banner con consenso preventivo e granulare, e il tracciamento va bloccato finché il consenso non arriva.

## Prima del go-live

- Completare l'oggetto `legale` in `src/data/site.ts` (vedi sopra).
- Confermare titoli e numeri di albo di tutti i professionisti: è un obbligo di legge.
- Registrare il dominio `fisioeva.it`, attivare la casella di posta e allineare `sito.dominio`.
- Aprire il sito ai motori (vedi sotto).

## Deploy

`npm run build` produce `dist/`. Il file `vercel.json` contiene il rewrite che fa funzionare gli indirizzi diretti (`/servizi/...`) su un sito a pagina singola: su un host diverso da Vercel va replicata la stessa regola.

### Prima volta

Il modo più comodo è collegare il repository a Vercel dal pannello: **Add New → Project → Import** da GitHub, scegliendo `Colax13/Fisio-Eva-definitivo`. Le impostazioni le legge da `vercel.json`, quindi non c'è nulla da configurare. Da lì in poi ogni push su `main` ridistribuisce da solo.

In alternativa, da terminale:

```bash
npx vercel login
```

```bash
npx vercel
```

Senza `--prod` viene creata un'anteprima; `npx vercel --prod` pubblica sul dominio di produzione.

### ⚠️ Il sito è chiuso ai motori di ricerca

Finché non si apre, il sito **non deve farsi indicizzare**: privacy e cookie policy sono in bozza, mancano i dati legali obbligatori e lo studio apre il 26 settembre 2026.

Il blocco è in tre punti:

1. `PUBBLICO: false` in `sito`, dentro `src/data/site.ts`. Da lì dipendono sia il `robots.txt` con `Disallow: /` (generato a ogni build da `scripts/genera-sitemap.mjs`) sia il meta `robots` applicato a ogni pagina da `usePageMeta`.
2. L'header `X-Robots-Tag: noindex, nofollow` in `vercel.json`.
3. Il `<meta name="robots">` statico in `index.html`, che copre il momento prima che React parta.

**Al go-live vanno tolti tutti e tre**, dopo aver completato i dati legali. Metterne a posto due su tre e credere di aver aperto il sito è l'errore facile: per questo l'interruttore vero è uno solo, il punto 1.

### Cosa c'è già per l'indicizzazione

- `public/sitemap.xml` e `public/robots.txt` sono **generati**, non scritti a mano: `npm run sitemap`, e comunque a ogni `npm run build`. Aggiungendo una rotta va aggiunta anche all'elenco dentro lo script.
- `usePageMeta` mette su ogni pagina titolo, descrizione, URL canonico e tag Open Graph. Su un sito a pagina singola nulla di questo succede da solo.
- `src/components/DatiStrutturati.tsx` pubblica la scheda `MedicalClinic` in JSON-LD (indirizzo, orari, specialità), che è la base per comparire nelle ricerche locali. Telefono e partita IVA entrano nella scheda solo quando saranno quelli veri.
