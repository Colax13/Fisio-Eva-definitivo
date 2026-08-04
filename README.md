# FisioEVA — sito

Sito vetrina di **FisioEVA**, studio di fisioterapia e osteopatia in Via di Boccea 755, Roma (Casalotti).

## Avvio

```bash
npm install
npm run dev
```

Il sito parte su `http://localhost:3000`.

| Comando | Cosa fa |
| --- | --- |
| `npm run dev` | server di sviluppo |
| `npm run build` | build di produzione in `dist/` |
| `npm run preview` | anteprima della build |
| `npm run lint` | controllo dei tipi TypeScript |

## Stack

React 19 + Vite 6 + TypeScript, Tailwind 4 (tema in `src/index.css`), `react-router-dom` per le pagine, `motion` per le animazioni e `lucide-react` per le icone.

## Pagine

`/` · `/chi-siamo` · `/servizi` · `/progetti` · `/team` · `/gallery` · `/faq` · `/contatti`, più la 404 su qualsiasi altro indirizzo.

Tutte condividono il layout in `src/components/layout/` (navbar, striscia gallery, footer) e aprono con `PageHero`.

## Modificare i contenuti

Quasi tutto il testo del sito sta in **`src/data/site.ts`**: recapiti e orari, trattamenti, progetti, FAQ, recensioni e frasi. Si modifica lì, senza toccare i componenti.

### Sostituire le immagini

Le foto sono raccolte nell'oggetto `immagini` in cima a `src/data/site.ts`. Oggi sono in gran parte segnaposto presi da Unsplash: quando arrivano gli scatti veri dello studio basta metterli in `public/` e cambiare il valore della chiave corrispondente.

```ts
export const immagini = {
  trattamento: '/foto/trattamento.jpg', // al posto dell'URL Unsplash
  ...
};
```

Sono già foto reali dello studio, e non vanno sostituite:

- `public/team/azzurra.png` e `public/team/elisa.png` — ritagli dal flyer del branding
- `public/team/studio.png` — la sede di Via di Boccea

Veronica Mirarchi non ha ancora una foto: al suo posto compare un monogramma con le iniziali. Aggiungendo `photo` alla sua voce in `team` la card si aggiorna da sola.

## Da completare

- **Form contatti**: non c'è un backend, quindi il modulo apre il client di posta del visitatore con il messaggio già pronto. Per ricevere le richieste direttamente serve collegare un servizio (Formspree, Web3Forms o una funzione serverless).
- **Recensioni**: quelle in `recensioni` sono da sostituire con le testimonianze vere dei pazienti.
- **Email**: nel sito è `fisioeva.boccia@gmail.com` — da confermare, visto che la via è Boccea.

## Deploy

Build statica: `npm run build` genera `dist/`. Il file `vercel.json` contiene il rewrite che serve a far funzionare gli indirizzi diretti (`/chi-siamo` e simili) su un sito a pagina singola; su un host diverso da Vercel va replicata la stessa regola.
