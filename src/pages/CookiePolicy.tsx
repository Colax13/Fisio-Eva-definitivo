import { Link } from 'react-router-dom';
import DocLegale, { type SezioneLegale } from '../components/layout/DocLegale';
import usePageMeta from '../hooks/usePageMeta';
import { legale } from '../data/site';
import { CHIAVE_CONSENSO_MAPPA } from '../components/ui/MappaConsenso';

/**
 * Cookie policy.
 *
 * Il punto di partenza è una scelta tecnica, non un testo: **il sito non
 * installa cookie di profilazione**. Le uniche risorse di terze parti che ne
 * imposterebbero — la mappa di Google — non vengono caricate finché non sei tu
 * a chiederlo con un clic. Per questo non c'è un banner: secondo le linee guida
 * del Garante di giugno 2021 il banner serve quando ci sono strumenti di
 * tracciamento da autorizzare, e qui non ce ne sono.
 *
 * ⚠️ Se un domani si aggiunge Google Analytics, un pixel o un widget che si
 * carica da solo, questa pagina non basta più: serve un banner con consenso
 * preventivo e granulare, e il tracciamento va bloccato finché non arriva.
 */
export default function CookiePolicy() {
  usePageMeta(
    'Cookie policy — FisioEVA',
    'Quali cookie e strumenti di tracciamento usa il sito di FisioEVA: nessuna profilazione, nessuna pubblicità, mappe di terze parti caricate solo su richiesta.'
  );

  const sezioni: SezioneLegale[] = [
    {
      id: 'sintesi',
      titolo: 'In breve',
      corpo: (
        <>
          <p>
            <strong>Questo sito non usa cookie di profilazione, non ti traccia e non fa
            pubblicità.</strong> Non ci sono statistiche di navigazione, non ci sono pixel dei
            social, non vendiamo dati a nessuno.
          </p>
          <p>
            È anche il motivo per cui non trovi un banner all'ingresso: il consenso serve a
            installare strumenti di tracciamento, e qui non ce ne sono da autorizzare.
          </p>
        </>
      ),
    },
    {
      id: 'cosa-sono',
      titolo: 'Che cosa sono i cookie',
      corpo: (
        <p>
          Sono piccoli file che un sito salva sul tuo dispositivo per ricordarsi qualcosa tra una
          pagina e l'altra. Diventano un problema di privacy quando servono a seguirti da un sito
          all'altro per costruire un profilo dei tuoi interessi: quelli sono i cookie di
          profilazione, e richiedono il tuo consenso preventivo. Accanto ai cookie esistono altri
          modi di memorizzare informazioni sul dispositivo, come il <em>local storage</em> del
          browser, ai quali si applicano le stesse regole.
        </p>
      ),
    },
    {
      id: 'cosa-usa',
      titolo: 'Che cosa usa questo sito',
      corpo: (
        <>
          <p>Una sola cosa, e solo se sei tu a deciderlo:</p>
          <ul>
            <li>
              <strong>
                <code>{CHIAVE_CONSENSO_MAPPA}</code>
              </strong>{' '}
              — non è un cookie ma una voce nel local storage del tuo browser. Viene scritta solo se
              scegli di caricare la mappa di Google nella pagina Contatti, e serve a non doverti
              richiedere il permesso a ogni visita. Contiene la parola «si» e nient'altro. È un
              elemento tecnico legato a una tua scelta esplicita, quindi non richiede un consenso
              ulteriore. Puoi cancellarla svuotando i dati del sito dal browser.
            </li>
          </ul>
          <p>
            Il sito non imposta nessun cookie proprio: non c'è un'area riservata, non c'è un
            carrello, non c'è niente da ricordare tra una visita e l'altra.
          </p>
        </>
      ),
    },
    {
      id: 'terze-parti',
      titolo: 'Le terze parti',
      corpo: (
        <>
          <p>
            Alcuni contenuti arrivano da fornitori esterni, che vedono il tuo indirizzo IP nel
            momento in cui li richiedi. Ecco quali sono e come li abbiamo trattati.
          </p>
          <ul>
            <li>
              <strong>Google Maps</strong> — imposterebbe cookie propri, anche di profilazione, già
              al caricamento della pagina. Per questo <strong>non si carica da sola</strong>: al suo
              posto trovi un'anteprima statica con un pulsante, e la mappa arriva solo se lo chiedi
              tu. Se preferisci non caricarla affatto, il link «Apri in Google Maps» ti porta al
              servizio in una scheda nuova senza coinvolgere questo sito.{' '}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy policy di Google
              </a>
              .
            </li>
            <li>
              <strong>Unsplash</strong> — alcune fotografie sono servite dalla sua rete di
              distribuzione. Sono immagini statiche: nessun cookie, ma la richiesta espone il tuo
              indirizzo IP al fornitore.{' '}
              <a
                href="https://unsplash.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy policy di Unsplash
              </a>
              .
            </li>
            <li>
              <strong>Instagram</strong> — nel sito c'è solo un collegamento al nostro profilo.
              Finché non lo clicchi, Instagram non sa che sei qui.
            </li>
            <li>
              <strong>Vercel</strong> — ospita il sito e registra nei log tecnici le richieste al
              server (indirizzo IP, data e ora, pagina richiesta, browser), per sicurezza e
              diagnostica. Non sono usati per identificarti né per profilarti.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'gestione',
      titolo: 'Come controllare cookie e memorizzazioni',
      corpo: (
        <>
          <p>
            Ogni browser permette di vedere, bloccare e cancellare i cookie e i dati salvati dai
            siti. Le istruzioni ufficiali:
          </p>
          <ul>
            <li>
              <a
                href="https://support.google.com/chrome/answer/95647"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Chrome
              </a>
            </li>
            <li>
              <a
                href="https://support.mozilla.org/it/kb/protezione-antitracciamento-avanzata-firefox-desktop"
                target="_blank"
                rel="noopener noreferrer"
              >
                Mozilla Firefox
              </a>
            </li>
            <li>
              <a
                href="https://support.apple.com/it-it/guide/safari/sfri11471/mac"
                target="_blank"
                rel="noopener noreferrer"
              >
                Safari
              </a>
            </li>
            <li>
              <a
                href="https://support.microsoft.com/it-it/microsoft-edge"
                target="_blank"
                rel="noopener noreferrer"
              >
                Microsoft Edge
              </a>
            </li>
          </ul>
          <p>
            Bloccare tutto non ti impedirà di usare questo sito: l'unica cosa che smetterà di
            funzionare è il ricordo della tua scelta sulla mappa.
          </p>
        </>
      ),
    },
    {
      id: 'altro',
      titolo: 'E per il resto dei dati?',
      corpo: (
        <p>
          Come trattiamo i dati che ci lasci — quando ci scrivi, quando prenoti, quando diventi
          paziente — è spiegato nella <Link to="/privacy">privacy policy</Link>, insieme ai tuoi
          diritti e a chi contattare per esercitarli.
        </p>
      ),
    },
  ];

  return (
    <DocLegale
      eyebrow="Cookie"
      titolo={
        <>
          Cookie e <span className="text-brand-primary">tracciamento</span>
        </>
      }
      sottotitolo="La versione corta: questo sito non ti traccia. Qui sotto c'è quella lunga, con tutto quello che viene caricato e da dove arriva."
      breadcrumb="Cookie policy"
      aggiornamento={legale.ultimoAggiornamento}
      sezioni={sezioni}
    />
  );
}
