import { Link } from 'react-router-dom';
import DocLegale, { type SezioneLegale } from '../components/layout/DocLegale';
import DatoMancante from '../components/ui/DatoMancante';
import usePageMeta from '../hooks/usePageMeta';
import { legale, studio } from '../data/site';

/**
 * Informativa sul trattamento dei dati personali (artt. 13-14 GDPR).
 *
 * Due avvertenze per chi mette mano qui.
 *
 * 1. Lo studio tratta dati relativi alla salute, che sono categorie
 *    particolari ai sensi dell'art. 9: l'informativa deve dire con quale base
 *    giuridica, e non è il consenso — è l'art. 9.2.h (finalità di cura svolte
 *    da professionisti tenuti al segreto professionale). Chiedere il consenso
 *    dove non serve è un errore che il Garante ha contestato più volte.
 * 2. Le tre professioniste lavorano con partite IVA distinte, quindi sono
 *    contitolari ai sensi dell'art. 26 e non un titolare unico: l'informativa
 *    deve dirlo, indicare un punto di contatto unico e mettere a disposizione
 *    il contenuto essenziale dell'accordo fra loro.
 * 3. Le partite IVA non sono ancora state fornite. Finché restano `null` in
 *    `legale` questa pagina è completa nella struttura ma non pubblicabile:
 *    un'informativa senza i dati identificativi non assolve l'art. 13.
 */

export default function Privacy() {
  usePageMeta(
    'Privacy policy — FisioEVA',
    'Come lo studio FisioEVA tratta i dati personali e i dati relativi alla salute dei propri pazienti, ai sensi degli artt. 13-14 del Regolamento UE 2016/679.'
  );

  const sezioni: SezioneLegale[] = [
    {
      id: 'titolare',
      titolo: 'Chi tratta i tuoi dati',
      corpo: (
        <>
          <p>
            Lo studio FisioEVA di {studio.address}, {studio.city}, è il luogo in cui lavorano tre
            professioniste che esercitano ciascuna in proprio. Per la legge sulla protezione dei
            dati questo significa che non c'è un titolare unico: sono{' '}
            <strong>contitolari del trattamento</strong> ai sensi dell'art. 26 del Regolamento.
          </p>
          <ul>
            {legale.contitolari.map((c) => (
              <li key={c.slug}>
                <strong>{c.nome}</strong> — P.IVA{' '}
                {c.partitaIva ?? <DatoMancante id={`P.IVA ${c.nome}`} />}, C.F.{' '}
                {c.codiceFiscale ?? <DatoMancante id={`C.F. ${c.nome}`} />}
              </li>
            ))}
          </ul>
          <p>
            Hanno definito fra loro, con un accordo di contitolarità, chi fa che cosa rispetto ai
            tuoi dati e chi risponde di ciascun adempimento.{' '}
            <strong>Il contenuto essenziale di quell'accordo ti viene messo a disposizione su
            richiesta</strong>, come prevede l'art. 26.2: basta chiederlo ai recapiti qui sotto.
          </p>
          <p>
            Quello che conta per te è più semplice: <strong>puoi rivolgerti a una qualsiasi delle
            tre</strong>, o al punto di contatto unico, e ti risponde chi di dovere senza che tu
            debba capire chi custodisce quale dato. I tuoi diritti li puoi far valere nei confronti
            di ciascuna di loro (art. 26.3).
          </p>
          <ul>
            <li>
              Punto di contatto: <a href={`mailto:${legale.emailPrivacy}`}>{legale.emailPrivacy}</a>
            </li>
            {/* La PEC compare solo se esiste: una riga "in aggiornamento" a
                tempo indeterminato su un documento legale è peggio che non
                averla. */}
            {legale.pec ? <li>PEC: {legale.pec}</li> : null}
            <li>
              Telefono: <a href={studio.phoneHref}>{studio.phone}</a>
            </li>
            <li>
              Sede: {studio.address}, {studio.city}
            </li>
          </ul>
          <p>
            {legale.dpo ? (
              <>Il Responsabile della protezione dei dati (DPO) è {legale.dpo}.</>
            ) : (
              <>
                Non è stato nominato un Responsabile della protezione dei dati: lo studio non
                effettua i trattamenti su larga scala che lo rendono obbligatorio ai sensi
                dell'art. 37 del Regolamento. Per ogni questione sui tuoi dati puoi scrivere
                direttamente ai recapiti qui sopra.
              </>
            )}
          </p>
        </>
      ),
    },
    {
      id: 'dati',
      titolo: 'Quali dati trattiamo',
      corpo: (
        <>
          <p>A seconda di come entri in contatto con noi, trattiamo categorie di dati diverse.</p>
          <ul>
            <li>
              <strong>Dati di contatto</strong> — nome, cognome, email, numero di telefono e quanto
              scrivi nel messaggio quando ci contatti dal sito, per email o per telefono.
            </li>
            <li>
              <strong>Dati relativi alla salute</strong> — anamnesi, diagnosi e prescrizioni del tuo
              medico, valutazioni funzionali, trattamenti eseguiti e loro esito. Sono
              <strong> categorie particolari di dati</strong> ai sensi dell'art. 9 del Regolamento e
              li trattiamo solo se diventi paziente dello studio, con le cautele descritte più
              avanti.
            </li>
            <li>
              <strong>Dati amministrativi e fiscali</strong> — quelli necessari a emettere le
              ricevute e ad assolvere gli obblighi di legge.
            </li>
            <li>
              <strong>Dati di navigazione</strong> — quelli che il server registra quando visiti il
              sito. Sono descritti nella <Link to="/cookie-policy">cookie policy</Link>.
            </li>
          </ul>
        </>
      ),
    },
    {
      id: 'finalita',
      titolo: 'Perché li trattiamo',
      corpo: (
        <>
          <p>Ogni trattamento ha una finalità precisa e una base giuridica che lo legittima.</p>
          <ul>
            <li>
              <strong>Rispondere alla tua richiesta</strong> e fissare un primo appuntamento. Base
              giuridica: l'esecuzione di misure precontrattuali prese su tua richiesta (art. 6.1.b).
            </li>
            <li>
              <strong>Erogare le prestazioni fisioterapiche e osteopatiche</strong>, tenere la
              documentazione del percorso e gestire gli appuntamenti, i richiami e i promemoria.
              Base giuridica: il contratto che ci lega (art. 6.1.b) e, per i dati sulla salute, le
              finalità di medicina preventiva, diagnosi e terapia dell'art. 9.2.h, trattati da
              professionisti sanitari tenuti al segreto professionale (art. 9.3).
            </li>
            <li>
              <strong>Adempiere agli obblighi fiscali, contabili e di legge</strong>. Base
              giuridica: un obbligo legale al quale siamo soggetti (art. 6.1.c).
            </li>
            <li>
              <strong>Difendere un nostro diritto</strong> in sede giudiziaria, se mai fosse
              necessario. Base giuridica: il nostro legittimo interesse (art. 6.1.f) e l'art. 9.2.f
              per i dati sulla salute.
            </li>
          </ul>
          <p>
            <strong>Non facciamo marketing e non inviamo newsletter.</strong> Se un giorno lo
            faremo, te lo chiederemo con un consenso separato, libero e revocabile in qualsiasi
            momento: non ricevere pubblicità non ti farà mai perdere l'accesso alle cure.
          </p>
        </>
      ),
    },
    {
      id: 'salute',
      titolo: 'I dati sulla tua salute',
      corpo: (
        <>
          <p>
            Sono i dati più delicati che trattiamo e li trattiamo con il criterio più stretto: li
            raccogliamo solo se servono a curarti, li conoscono solo le professioniste che ti
            seguono e chi lavora in segreteria per la parte strettamente organizzativa.
          </p>
          <p>
            Le fisioterapiste e le osteopate dello studio sono <strong>tenute al segreto
            professionale</strong>. Per questa ragione, per le finalità di cura, la legge non ci
            chiede il tuo consenso: la base giuridica è l'art. 9.2.h del Regolamento. Il consenso
            resta necessario per tutto ciò che va oltre la cura — ad esempio comunicare il tuo stato
            di salute a un familiare, o usare immagini del tuo percorso a fini divulgativi.
          </p>
          <p>
            Quando ci scrivi dal sito, <strong>non sei obbligato a raccontarci il tuo problema di
            salute</strong>: basta dirci che cosa ti serve e ne parliamo in studio o al telefono. Se
            scegli di scriverne, trattiamo quell'informazione sulla base del consenso che presti
            inviando il messaggio, e solo per ricontattarti.
          </p>
        </>
      ),
    },
    {
      id: 'modulo',
      titolo: 'Il modulo di contatto del sito',
      corpo: (
        <>
          <p>
            Il modulo della pagina <Link to="/contatti">Contatti</Link> funziona in modo particolare
            e vale la pena spiegarlo: <strong>non invia nulla a un nostro server</strong>. Quando
            premi «Invia la richiesta», il sito prepara un'email già compilata e la apre nel
            programma di posta del tuo dispositivo. Sei tu a inviarla, dal tuo indirizzo.
          </p>
          <p>
            Significa che quello che scrivi nei campi non viene registrato dal sito né da chi lo
            ospita: arriva alla casella dello studio ({studio.email}) come una normale email, e da
            quel momento lo trattiamo secondo questa informativa.
          </p>
          <p>
            {legale.gestionale ? (
              <>
                I contatti e le schede dei pazienti sono poi archiviati su {legale.gestionale},
                nominato responsabile del trattamento ai sensi dell'art. 28.
              </>
            ) : (
              <>
                La piattaforma su cui lo studio archivierà contatti e schede paziente{' '}
                <DatoMancante id="gestionale / piattaforma contatti" fallback="è in corso di adozione" />
                : appena sarà operativa comparirà qui e tra i responsabili del trattamento.
              </>
            )}
          </p>
        </>
      ),
    },
    {
      id: 'destinatari',
      titolo: 'A chi comunichiamo i dati',
      corpo: (
        <>
          <p>
            Non vendiamo e non cediamo i tuoi dati a nessuno. Li conoscono solo i soggetti che ci
            servono per lavorare, ciascuno nominato responsabile del trattamento ai sensi
            dell'art. 28 e vincolato a usarli solo per le nostre istruzioni:
          </p>
          <ul>
            {legale.responsabili.map((r) => (
              <li key={r.nome}>
                <strong>{r.nome}</strong> — {r.ruolo}
                {r.paese ? (
                  <> ({r.paese}).</>
                ) : (
                  <>
                    {' '}
                    (<DatoMancante id={`sede e server di ${r.nome}`} fallback="sede del fornitore" />
                    ).
                  </>
                )}
              </li>
            ))}
            <li>
              <strong>Il nostro consulente fiscale</strong>, per le ricevute e la contabilità.
            </li>
            <li>
              <strong>Medici e altri professionisti sanitari</strong> che ti seguono, ma solo se ce
              lo chiedi tu o se ci autorizzi.
            </li>
          </ul>
          <p>
            I dati possono infine essere comunicati alle autorità quando la legge lo impone. Il
            caso più frequente è l'invio delle spese sanitarie al{' '}
            <strong>Sistema Tessera Sanitaria</strong> per la dichiarazione dei redditi
            precompilata: <strong>a questo invio puoi opporti</strong>, dicendocelo al momento del
            pagamento o direttamente sul sito del Sistema Tessera Sanitaria.
          </p>
        </>
      ),
    },
    {
      id: 'estero',
      titolo: 'Trasferimenti fuori dall’Unione Europea',
      corpo: (
        <>
          <p>
            Il sito è ospitato da Vercel Inc. e la posta dello studio è su Gmail: entrambi i
            fornitori sono statunitensi e possono trattare dati fuori dall'Unione Europea. Il
            trasferimento avviene sulla base della decisione di adeguatezza dell'
            <strong>EU-U.S. Data Privacy Framework</strong> e, in via ulteriore, delle clausole
            contrattuali tipo approvate dalla Commissione Europea.
          </p>
          <p>
            <strong>Le schede cliniche non passano né dal sito né dalla posta</strong>: sono tenute
            nel gestionale di studio{legale.gestionale ? ` ${legale.gestionale}` : ''}, un servizio
            distinto e ad accesso riservato alle professioniste.{' '}
            {!legale.responsabili.find((r) => r.nome === legale.gestionale)?.paese && (
              <DatoMancante
                id="paese di conservazione dei dati del gestionale"
                fallback="Il paese in cui sono conservati è indicato nel contratto con il fornitore."
              />
            )}
          </p>
        </>
      ),
    },
    {
      id: 'conservazione',
      titolo: 'Per quanto tempo li conserviamo',
      corpo: (
        <ul>
          <li>
            <strong>Documentazione sanitaria</strong> — dieci anni dall'ultima prestazione, il
            termine entro il quale potrebbe esserci chiesto conto del nostro operato.
          </li>
          <li>
            <strong>Documenti fiscali</strong> — dieci anni, come impone l'art. 2220 del codice
            civile.
          </li>
          <li>
            <strong>Richieste di contatto senza seguito</strong> — dodici mesi, poi vengono
            cancellate.
          </li>
        </ul>
      ),
    },
    {
      id: 'diritti',
      titolo: 'I tuoi diritti',
      corpo: (
        <>
          <p>
            In qualsiasi momento puoi chiederci di <strong>accedere</strong> ai tuoi dati, di{' '}
            <strong>correggerli</strong> se sono sbagliati, di <strong>cancellarli</strong>, di{' '}
            <strong>limitarne</strong> il trattamento, di <strong>riceverli</strong> in un formato
            leggibile per portarli altrove, e di <strong>opporti</strong> a un trattamento fondato
            sul nostro legittimo interesse (artt. 15-22 del Regolamento). Dove ci hai dato un
            consenso, puoi <strong>revocarlo</strong> quando vuoi, senza che questo tolga validità a
            quanto fatto prima.
          </p>
          <p>
            Scrivi a <a href={`mailto:${legale.emailPrivacy}`}>{legale.emailPrivacy}</a>: ti
            rispondiamo entro un mese. Alcune richieste possono trovare un limite negli obblighi di
            conservazione della documentazione sanitaria, e in quel caso te lo spieghiamo.
          </p>
          <p>
            Se ritieni che i tuoi dati siano trattati male hai diritto di proporre reclamo al{' '}
            <strong>Garante per la protezione dei dati personali</strong>, Piazza Venezia 11, 00187
            Roma —{' '}
            <a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer">
              garanteprivacy.it
            </a>
            .
          </p>
        </>
      ),
    },
    {
      id: 'minori',
      titolo: 'I dati dei minori',
      corpo: (
        <p>
          Lo studio tratta anche bambini e neonati. In quel caso i dati del minore sono conferiti da
          chi esercita la responsabilità genitoriale, che presta gli eventuali consensi e a cui
          spetta l'esercizio dei diritti descritti sopra. Il modulo del sito non è destinato a essere
          compilato da minori di quattordici anni.
        </p>
      ),
    },
    {
      id: 'automatismi',
      titolo: 'Nessuna decisione automatizzata',
      corpo: (
        <p>
          Non usiamo algoritmi che decidano qualcosa su di te né facciamo profilazione: ogni
          valutazione sul tuo percorso è presa da una professionista, guardandoti.
        </p>
      ),
    },
    {
      id: 'modifiche',
      titolo: 'Modifiche a questa informativa',
      corpo: (
        <p>
          Se cambieremo strumenti o modo di lavorare, aggiorneremo questa pagina e ne cambieremo la
          data in alto. Le modifiche che incidono sui trattamenti già in corso ti verranno segnalate
          direttamente.
        </p>
      ),
    },
  ];

  return (
    <DocLegale
      eyebrow="Privacy"
      titolo={
        <>
          Come trattiamo i <span className="text-brand-primary">tuoi dati</span>
        </>
      }
      sottotitolo="Informativa ai sensi degli artt. 13 e 14 del Regolamento UE 2016/679. È scritta per essere letta davvero: se qualcosa non ti è chiaro, chiedicelo."
      breadcrumb="Privacy"
      aggiornamento={legale.ultimoAggiornamento}
      sezioni={sezioni}
    />
  );
}
