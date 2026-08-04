import type { ReactNode } from 'react';
import Intestazione from '../components/layout/Intestazione';
import DatoMancante from '../components/ui/DatoMancante';
import { studio } from '../config/site';
import { schemaBreadcrumb, usePageSeo } from '../lib/seo';

/**
 * Privacy e cookie policy.
 *
 * ⚠️ Queste pagine sono uno SCHELETRO, non un testo legale definitivo.
 * Contengono solo i dati verificati (titolare, sede, contatto) e la struttura
 * richiesta. Finalità, basi giuridiche, tempi di conservazione e responsabili
 * vanno redatti e validati prima del go-live: il sito tratta dati sanitari,
 * che sono categorie particolari ai sensi dell'art. 9 GDPR.
 */

const AvvisoBozza = () => (
  <p className="rounded-2xl border border-yellow-300 bg-yellow-50 px-5 py-4 text-sm text-yellow-900">
    <strong className="font-semibold">Documento in preparazione.</strong> Il testo va completato e
    validato prima della pubblicazione del sito.
  </p>
);

const Titolare = () => (
  <div className="space-y-1.5 font-light text-brand-dark/80">
    <p>
      <span className="font-semibold text-brand-dark">{studio.nome}</span> — {studio.claim}
    </p>
    <p>
      {studio.indirizzo}, {studio.cap} {studio.citta} ({studio.zona})
    </p>
    <p>
      <a href={`mailto:${studio.email}`} className="underline underline-offset-2">
        {studio.email}
      </a>
    </p>
    <p className="flex flex-wrap items-center gap-2">
      <span>P.IVA:</span>
      {studio.partitaIva ?? <DatoMancante id="piva" />}
    </p>
  </div>
);

function Sezione({ titolo, children }: { titolo: string; children: ReactNode }) {
  return (
    <section className="border-t border-brand-primary/25 pt-8">
      <h2 className="text-xl font-semibold text-brand-dark">{titolo}</h2>
      <div className="mt-4 space-y-4 font-light leading-relaxed text-brand-dark/80">{children}</div>
    </section>
  );
}

export function Privacy() {
  const briciole = [
    { nome: 'Home', path: '/' },
    { nome: 'Privacy policy', path: '/privacy' },
  ];

  usePageSeo({
    title: 'Privacy policy | FisioEva',
    description: 'Informativa sul trattamento dei dati personali di FisioEva, Via di Boccea 755, Roma.',
    path: '/privacy',
    schema: [schemaBreadcrumb(briciole)],
  });

  return (
    <>
      <Intestazione
        titolo="Privacy policy"
        sottotitolo="Informativa sul trattamento dei dati personali."
        briciole={briciole}
        allineamento="sinistra"
      />

      <section className="bg-brand-light px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <AvvisoBozza />

          <Sezione titolo="Titolare del trattamento">
            <Titolare />
          </Sezione>

          <Sezione titolo="Quali dati trattiamo">
            <p>
              I dati che ci invii spontaneamente scrivendoci via email o contattandoci per fissare
              un appuntamento: nome, recapiti e le informazioni che scegli di comunicarci sul motivo
              della richiesta.
            </p>
            <p>
              Il sito non usa moduli di contatto che salvano dati su un server: le richieste
              arrivano direttamente alla casella di posta dello studio.
            </p>
          </Sezione>

          <Sezione titolo="Dati relativi alla salute">
            <p>
              Le informazioni sul tuo stato di salute sono categorie particolari di dati personali.
              Vengono trattate solo per finalità di cura, da professionisti sanitari tenuti al
              segreto professionale.
            </p>
            <p className="text-sm">
              <DatoMancante
                id="piva"
                fallback="Basi giuridiche e tempi di conservazione in fase di definizione."
              />
            </p>
          </Sezione>

          <Sezione titolo="I tuoi diritti">
            <p>
              Puoi chiedere in qualsiasi momento di accedere ai tuoi dati, correggerli, cancellarli,
              limitarne il trattamento od opporti allo stesso, scrivendo a{' '}
              <a href={`mailto:${studio.email}`} className="underline underline-offset-2">
                {studio.email}
              </a>
              . Puoi inoltre presentare reclamo al Garante per la protezione dei dati personali.
            </p>
          </Sezione>
        </div>
      </section>
    </>
  );
}

export function CookiePolicy() {
  const briciole = [
    { nome: 'Home', path: '/' },
    { nome: 'Cookie policy', path: '/cookie-policy' },
  ];

  usePageSeo({
    title: 'Cookie policy | FisioEva',
    description: 'Informativa sui cookie e sugli strumenti di terze parti usati dal sito FisioEva.',
    path: '/cookie-policy',
    schema: [schemaBreadcrumb(briciole)],
  });

  return (
    <>
      <Intestazione
        titolo="Cookie policy"
        sottotitolo="Quali cookie usa questo sito e come gestirli."
        briciole={briciole}
        allineamento="sinistra"
      />

      <section className="bg-brand-light px-6 py-16">
        <div className="mx-auto max-w-3xl space-y-8">
          <AvvisoBozza />

          <Sezione titolo="Cookie tecnici">
            <p>
              Il sito non usa cookie di profilazione propri e non raccoglie statistiche di
              navigazione.
            </p>
          </Sezione>

          <Sezione titolo="Servizi di terze parti">
            <p>
              Le pagine Home e Contatti incorporano una mappa di Google Maps per mostrare dove si
              trova lo studio. Caricando la mappa, Google può impostare cookie e raccogliere dati di
              navigazione secondo la propria informativa.
            </p>
            <p>
              I collegamenti al profilo Instagram dello studio portano su un sito esterno, che
              applica le proprie regole.
            </p>
          </Sezione>

          <Sezione titolo="Come gestire i cookie">
            <p>
              Puoi bloccare o cancellare i cookie dalle impostazioni del tuo browser. Il blocco dei
              cookie di terze parti può impedire alla mappa di caricarsi correttamente.
            </p>
          </Sezione>

          <Sezione titolo="Banner di consenso">
            <p className="text-sm">
              <DatoMancante
                id="piva"
                fallback="Il banner per la raccolta del consenso va attivato prima della pubblicazione."
              />
            </p>
          </Sezione>
        </div>
      </section>
    </>
  );
}
