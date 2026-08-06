import { Car, Clock, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import Intestazione from '../components/layout/Intestazione';
import Bottone from '../components/ui/Bottone';
import Occhiello from '../components/ui/Occhiello';
import DatoMancante from '../components/ui/DatoMancante';
import MappaStudio from '../components/ui/MappaStudio';
import { PRENOTAZIONE_LABEL, PRENOTAZIONE_URL, RECENSIONI_ENABLED, studio } from '../config/site';
import { schemaBreadcrumb, schemaStudio, usePageSeo } from '../lib/seo';

export default function Contatti() {
  const briciole = [
    { nome: 'Home', path: '/' },
    { nome: 'Contatti', path: '/contatti' },
  ];

  usePageSeo({
    title: 'Contatti | FisioEva, Via di Boccea 755, Roma',
    description:
      'FisioEva è in Via di Boccea 755, Roma, zona Casalotti. Come arrivare, parcheggio, contatti e prenotazione della prima valutazione.',
    path: '/contatti',
    schema: [schemaStudio(), schemaBreadcrumb(briciole)],
  });

  const indirizzoCompleto = `${studio.indirizzo}, ${studio.cap} ${studio.citta}`;

  return (
    <>
      <Intestazione
        occhiello="Contatti"
        titolo="Dove siamo e come raggiungerci"
        sottotitolo={`Lo studio è in ${studio.indirizzo}, a ${studio.zona}, Roma ovest. Apriamo il ${studio.apertura}.`}
        briciole={briciole}
      />

      <section className="bg-brand-light px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div className="space-y-4">
            <div className="rounded-[2rem] border border-brand-primary/25 bg-white p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/15 text-brand-ink">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-dark/60">
                    Indirizzo
                  </h2>
                  <p className="mt-1.5 text-lg font-semibold text-brand-dark">
                    {studio.indirizzo}
                  </p>
                  <p className="font-light text-brand-dark/70">
                    {studio.cap} {studio.citta} — {studio.zonaEstesa}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-brand-primary/25 bg-white p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/15 text-brand-ink">
                  <Phone className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-dark/60">
                    Telefono
                  </h2>
                  <p className="mt-1.5">
                    {studio.telefono ? (
                      <a
                        href={`tel:${studio.telefono.replace(/\s/g, '')}`}
                        className="text-lg font-semibold text-brand-dark transition-colors hover:text-brand-ink"
                      >
                        {studio.telefono}
                      </a>
                    ) : (
                      <DatoMancante id="telefono" fallback="Scrivici via email o su Instagram." />
                    )}
                  </p>
                </div>
              </div>
            </div>

            <a
              href={`mailto:${studio.email}`}
              className="group block rounded-[2rem] border border-brand-primary/25 bg-white p-7 transition-colors hover:border-brand-primary"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/15 text-brand-ink">
                  <Mail className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-dark/60">
                    Email
                  </h2>
                  <p className="mt-1.5 break-all font-semibold text-brand-dark transition-colors group-hover:text-brand-ink">
                    {studio.email}
                  </p>
                </div>
              </div>
            </a>

            <a
              href={studio.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-[2rem] border border-brand-primary/25 bg-white p-7 transition-colors hover:border-brand-primary"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-accent/20 text-brand-accent-ink">
                  <Instagram className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-dark/60">
                    Instagram
                  </h2>
                  <p className="mt-1.5 font-semibold text-brand-dark transition-colors group-hover:text-brand-ink">
                    @{studio.instagram}
                  </p>
                </div>
              </div>
            </a>

            <div className="rounded-[2rem] border border-brand-primary/25 bg-white p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/15 text-brand-ink">
                  <Clock className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-dark/60">
                    Orari
                  </h2>
                  <div className="mt-2">
                    {studio.orari ? (
                      <dl className="space-y-2 text-sm">
                        {studio.orari.map((o) => (
                          <div key={o.giorno} className="flex justify-between gap-4">
                            <dt className="font-light text-brand-dark/70">{o.giorno}</dt>
                            <dd className="font-semibold text-brand-dark">{o.ore}</dd>
                          </div>
                        ))}
                      </dl>
                    ) : (
                      <DatoMancante id="orari" fallback="In definizione, ti rispondiamo via email." />
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-brand-primary/25 bg-white p-7">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/15 text-brand-ink">
                  <Car className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-brand-dark/60">
                    Come arrivare
                  </h2>
                  <p className="mt-1.5 font-light leading-relaxed text-brand-dark/75">
                    Siamo su Via di Boccea, servita dalle linee di superficie che collegano
                    Cornelia. In auto si arriva dal Grande Raccordo Anulare, uscita Boccea.
                  </p>
                  <p className="mt-3 text-sm">
                    <span className="font-semibold text-brand-dark">Parcheggio: </span>
                    <DatoMancante id="convenzioni" fallback="Informazioni in arrivo." />
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:sticky lg:top-28">
            <MappaStudio altezza="h-[420px]" />

            <div className="rounded-[2.5rem] bg-brand-dark px-8 py-12 text-center text-white">
              <Occhiello allineamento="centro" tono="chiaro" className="mb-6">
                Prenota
              </Occhiello>
              <h2 className="text-2xl font-semibold leading-tight md:text-3xl">
                Raccontaci cosa senti.
              </h2>
              <p className="mx-auto mt-4 max-w-md font-light leading-relaxed text-white/70">
                Scrivici indicando il tuo problema e da quanto tempo lo hai: ti rispondiamo per
                fissare la prima valutazione.
              </p>
              <div className="mt-8 flex justify-center">
                <Bottone href={PRENOTAZIONE_URL} variante="chiara">
                  {PRENOTAZIONE_LABEL}
                </Bottone>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lo spazio recensioni esiste ma resta spento: lo studio parte da zero
          e le testimonianze non si inventano. */}
      {RECENSIONI_ENABLED && (
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-5xl">
            <Occhiello allineamento="centro" className="mb-8">
              Dicono di noi
            </Occhiello>
          </div>
        </section>
      )}
    </>
  );
}
