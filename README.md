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
| `npm run sitemap` | rigenera `sitemap.xml`, `robots.txt`, `llms.txt` e i tag generati in `index.html`, senza compilare |
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

Per vedere tutti i buchi aperti basta far girare il sito in locale e guardare i badge gialli. Oggi mancano: destinazione della prenotazione, titoli esatti dei quattro collaboratori del team clinico (nascosti su richiesta dello studio), durata delle sedute, nome del piano superiore, parcheggio.

## Immagini

Le foto dello shooting di settembre 2026 stanno in `public/foto/` (scatti dello studio) e `public/team/` (i tre ritratti), servite dal nostro dominio come i font: nessuna richiesta a servizi esterni.

Per copiarle dall'export dentro il sito con i nomi giusti c'è **`scripts/copia-foto.ps1`** (Windows):

```
powershell -ExecutionPolicy Bypass -File scripts\copia-foto.ps1
```

Sceglie da solo le 27 foto usate dal sito, fra le 54 dell'export, e le rinomina. Aggiungerne una significa aggiungere una riga alla mappa nello script e una voce a `immagini` o `foto` in `site.ts`.

**Il build di produzione fallisce se manca una foto** referenziata dal codice (controllo in `scripts/genera-sitemap.mjs`): il sito è pubblico e indicizzato, e pubblicarlo con le immagini rotte è peggio che non aggiornarlo — a occhio non te ne accorgi finché non apri ogni pagina.

Sulle anteprime di Vercel (`VERCEL_ENV=preview`) è invece solo un avviso e il build prosegue: lì le immagini rotte si vedono a schermo, ed è a questo che serve un'anteprima. Bloccarle lascerebbe una X rossa fissa nella dashboard, che col tempo finisce per nascondere un guasto vero.

### Le foto in cui si vede il volto

Cinque degli scatti usati dal sito mostrano il volto della persona in trattamento: è **una modella che ha posato per lo shooting**, non una paziente, quindi si usano gli originali senza bisogno di altro.

Nell'export esistono anche versioni con il viso tagliato (`_CROP`) o sfocato (`_DOF`), nella cartella `05_privacy`. Non servono oggi, ma vanno tenute presenti il giorno in cui si fotografassero pazienti veri: lì il consenso scritto della persona ripresa è obbligatorio, e su un sito sanitario quell'immagine rivela anche che sta ricevendo cure.

### Foto che ancora mancano

Tre sezioni del sito non hanno uno scatto proprio e restano su Unsplash — sono l'unico motivo per cui il sito contatta ancora un dominio esterno. Servono foto vere o stock scaricate e ospitate in `public/foto/` come le altre:

- **percorso donna** — gravidanza e post-parto, che è poi la specializzazione dello studio
- **osteopatia neonatale e pediatrica**
- **percorso terza età**

Manca anche uno scatto di riabilitazione attiva (esercizio guidato): oggi al suo posto c'è una terapia manuale al ginocchio, che è la cosa più vicina fra quelle disponibili.

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

Ancora aperto:

1. L'**accordo di contitolarità firmato** e le nomine a responsabile dei fornitori: sono documenti, non codice, ma l'informativa li promette al paziente. È l'unica voce con un peso legale reale fra quelle rimaste.
2. **L'Ordine TSRM-PSTRP di ciascuna** è impostato su Roma per tutte e tre, ma è un'ipotesi: lo studio non lo sapeva con certezza e ha chiesto di mettere Roma nel dubbio. Se una risulta iscritta altrove va corretta (`team[].ordine`).
3. Per **FisioDesk**: ragione sociale del fornitore e paese in cui sono conservati i dati, dal contratto e non dal sito commerciale (`legale.responsabili`).

Chiusi per scelta dello studio, non da rincorrere:

- **Codice fiscale** delle contitolari — l'art. 13 chiede identità e contatti, non il codice fiscale, e le tre partite IVA identificano già ciascuna. Se un giorno arriva, basta valorizzare `codiceFiscale` e la riga ricompare da sola.
- **PEC** — lo studio non ne ha una. La riga non compare nell'informativa finché `legale.pec` resta `null`.

⚠️ Se un domani si aggiungono Google Analytics, un pixel o un widget che parte da solo, la cookie policy da sola non basta più: serve un banner con consenso preventivo e granulare, e il tracciamento va bloccato finché il consenso non arriva.

## Prima del go-live

- Completare l'oggetto `legale` in `src/data/site.ts` (vedi sopra).
- Confermare titoli e numeri di albo di tutti i professionisti: è un obbligo di legge.
- Registrare il dominio `fisioeva.it`, attivare la casella di posta e allineare `sito.dominio`.
- Aprire il sito ai motori di ricerca (vedi sotto).

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

### Il sito è pubblico

Dal 13 settembre 2026 il sito è **aperto a tutti**: motori di ricerca e crawler delle AI. Prima era chiuso, e la struttura per richiuderlo è rimasta intatta.

Due interruttori indipendenti in `sito`, dentro `src/data/site.ts`, decidono chi può leggerlo:

- **`PUBBLICO`** — apre a Google, Bing e ai motori tradizionali. Oggi `true`.
- **`APERTO_ALLE_AI`** — apre ai crawler delle AI (elenco in `scripts/crawler-ai.mjs`). Oggi `true`. Era stato acceso da solo, prima dell'apertura ai motori, quando lo studio voleva farsi leggere dalle AI ma non ancora comparire su Google: è la ragione per cui sono due flag e non uno.

Da entrambi dipendono, generati insieme a ogni build da `scripts/genera-sitemap.mjs`:

1. `public/robots.txt` — `Disallow: /` per tutti se sono entrambi `false`; se solo `APERTO_ALLE_AI` è `true`, resta `Disallow: /` per `*` ma con un `Allow: /` esplicito per ciascun crawler in `crawler-ai.mjs`; se `PUBBLICO` è `true`, aperto a tutti.
2. Il `<meta name="robots">` in `index.html` — segue `PUBBLICO || APERTO_ALLE_AI`.
3. `public/llms.txt` (vedi sotto).

L'header `X-Robots-Tag: noindex, nofollow` che stava in `vercel.json` **è stato tolto** all'apertura: era applicato a ogni risposta senza distinguere per user-agent (Vercel non lo permette nel formato base di `headers`), quindi avrebbe tenuto il sito fuori da Google anche con `PUBBLICO: true`. Se un giorno serve richiudere il sito, va rimesso insieme ai due flag — non basta spegnere i flag.

⚠️ **Il dominio `fisioeva.it` è dello studio ma il collegamento DNS verso questo deploy è ancora da fare.** Sitemap, canonical e scheda schema.org puntano tutti lì: finché il DNS non è collegato, i motori trovano indirizzi che non risolvono. È una configurazione da fare nella dashboard del registrar e di Vercel, non in questo codice.

### Leggibilità per le AI

Aprire ai crawler delle AI non basta da solo, per un motivo tecnico specifico di questo sito: è un'app a pagina singola (React), e il contenuto di ogni pagina viene scritto nel DOM da JavaScript **dopo** che la pagina è arrivata al browser. La maggior parte dei crawler delle AI documentati oggi non esegue JavaScript — vede solo l'HTML grezzo, che per una SPA senza accorgimenti è quasi vuoto (`<div id="root"></div>`).

`scripts/genera-sitemap.mjs` risolve il problema scrivendo il contenuto **staticamente**, non lasciandolo solo a React:

- **`public/llms.txt`** — un riepilogo in Markdown pensato apposta per le AI (convenzione informale, non uno standard universale, ma sempre più adottata): contatti, elenco delle pagine, servizi, team. Generato dagli stessi dati del sito (`studio`, `servizi`, `team` in `site.ts`), non va scritto a mano.
- **Il blocco `<noscript>` in `index.html`** — lo stesso riepilogo in HTML, dentro la pagina stessa: chi la legge senza eseguire JavaScript lo vede sempre, qualunque rotta richieda (la SPA su Vercel serve `index.html` per ogni indirizzo).
- **La scheda `MedicalClinic` in JSON-LD**, `<script id="scheda-clinica">` — scritta staticamente in `index.html` da `creaSchedaClinica()` (`src/lib/schemaOrg.ts`) e poi tenuta aggiornata lato client da `src/components/DatiStrutturati.tsx`, che aggiorna lo stesso tag invece di aggiungerne uno nuovo. Una sola fonte, due momenti in cui viene resa.

Quello che questi tre meccanismi **non** risolvono: il contenuto specifico di ogni pagina (i testi di `/servizi`, `/faq`, le bio del team) resta visibile solo a chi esegue JavaScript. La soluzione vera sarebbe il pre-rendering o il server-side rendering di ogni rotta — non l'ho aggiunto perché richiederebbe un browser headless nella build di Vercel (Playwright/Chromium), un cambiamento alla pipeline di deploy rischioso da introdurre senza poterlo verificare direttamente su Vercel. Se in futuro serve davvero, è il prossimo passo naturale.

`scripts/crawler-ai.mjs` elenca i crawler aperti (GPTBot, ClaudeBot, PerplexityBot e altri), ciascuno con una riga su chi lo pubblica e a cosa serve. Ogni azienda aggiorna la propria lista nel tempo: va ricontrollata di tanto in tanto sulle pagine ufficiali, non è definitiva.
