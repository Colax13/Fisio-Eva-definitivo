import { ArrowRight, Check, FileText, UserRound, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Intestazione from '../components/layout/Intestazione';
import Bottone from '../components/ui/Bottone';
import Occhiello from '../components/ui/Occhiello';
import DatoMancante from '../components/ui/DatoMancante';
import {
  correlatiDi,
  getCategoria,
  getServizio,
  percorsoCategoria,
  percorsoServizio,
  type Servizio,
} from '../content/servizi';
import { PRENOTAZIONE_LABEL, PRENOTAZIONE_URL } from '../config/site';
import {
  schemaBreadcrumb,
  schemaFaq,
  schemaProcedura,
  schemaStudio,
  usePageSeo,
} from '../lib/seo';

export default function ServizioDettaglio() {
  const { categoria, slug } = useParams<{ categoria: string; slug: string }>();
  const servizio = getServizio(slug ?? '');

  // Slug inesistente, o categoria che non combacia con quella del servizio:
  // in entrambi i casi si torna all'indice invece di mostrare una pagina rotta.
  if (!servizio || servizio.categoria !== categoria) {
    return <Navigate to="/servizi" replace />;
  }

  return <Contenuto servizio={servizio} />;
}

function Contenuto({ servizio }: { servizio: Servizio }) {
  const categoria = getCategoria(servizio.categoria)!;
  const path = percorsoServizio(servizio);
  const correlati = correlatiDi(servizio);

  const briciole = [
    { nome: 'Home', path: '/' },
    { nome: 'Servizi', path: '/servizi' },
    { nome: categoria.nome, path: percorsoCategoria(categoria.slug) },
    { nome: servizio.nome, path },
  ];

  usePageSeo({
    title: servizio.metaTitle,
    description: servizio.metaDescription,
    path,
    schema: [
      schemaStudio(),
      schemaBreadcrumb(briciole),
      schemaProcedura(servizio.nome, servizio.sottotitolo),
      ...(servizio.faq?.length ? [schemaFaq(servizio.faq)] : []),
    ],
  });

  return (
    <>
      <Intestazione
        occhiello={categoria.nome}
        titolo={servizio.nome}
        sottotitolo={servizio.sottotitolo}
        briciole={briciole}
        allineamento="sinistra"
      />

      <section className="bg-brand-light px-6 py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_20rem] lg:items-start">
          {/* Corpo */}
          <div className="space-y-14">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-brand-dark md:text-3xl">
                Quando può servirti
              </h2>
              <ul className="mt-6 space-y-3">
                {servizio.quandoServe.map((voce) => (
                  <li key={voce} className="flex items-start gap-3">
                    <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-primary/25">
                      <Check className="h-3 w-3 text-brand-ink" strokeWidth={3} />
                    </span>
                    <span className="font-light leading-relaxed text-brand-dark">{voce}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-semibold text-brand-dark md:text-3xl">Come lavoriamo</h2>
              <p className="mt-5 text-lg font-light leading-relaxed text-brand-dark/80">
                {servizio.comeLavoriamo}
              </p>
            </motion.div>

            {servizio.comeSiSvolge && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold text-brand-dark md:text-3xl">
                  Come si svolge
                </h2>
                <ol className="mt-6 space-y-4">
                  {servizio.comeSiSvolge.map((passo, i) => (
                    <li key={passo} className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-primary/50 text-sm font-semibold text-brand-ink">
                        {i + 1}
                      </span>
                      <span className="pt-1 font-light leading-relaxed text-brand-dark">
                        {passo}
                      </span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            )}

            {servizio.faq && servizio.faq.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-semibold text-brand-dark md:text-3xl">
                  Domande frequenti
                </h2>
                <dl className="mt-6 space-y-5">
                  {servizio.faq.map((f) => (
                    <div key={f.q} className="rounded-3xl border border-brand-primary/20 bg-white p-6">
                      <dt className="font-semibold text-brand-dark">{f.q}</dt>
                      <dd className="mt-2 font-light leading-relaxed text-brand-dark/75">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            )}
          </div>

          {/* Box laterale */}
          <aside className="lg:sticky lg:top-28">
            <div className="rounded-[2rem] border border-brand-primary/25 bg-white p-7">
              <Occhiello className="mb-6">In breve</Occhiello>

              <dl className="space-y-5 text-sm">
                <div className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" />
                  <div>
                    <dt className="font-semibold text-brand-dark">Durata seduta</dt>
                    <dd className="mt-1 text-brand-dark/70">
                      {servizio.durata ?? <DatoMancante id="durata" fallback="Da definire" />}
                    </dd>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FileText className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" />
                  <div>
                    <dt className="font-semibold text-brand-dark">Prescrizione medica</dt>
                    <dd className="mt-1 font-light leading-relaxed text-brand-dark/70">
                      {servizio.prescrizione}
                    </dd>
                  </div>
                </div>

                {servizio.eseguitoDa && (
                  <div className="flex items-start gap-3">
                    <UserRound className="mt-0.5 h-4 w-4 shrink-0 text-brand-ink" />
                    <div>
                      <dt className="font-semibold text-brand-dark">Chi lo esegue</dt>
                      <dd className="mt-1 font-light leading-relaxed text-brand-dark/70">
                        {servizio.eseguitoDa}
                      </dd>
                    </div>
                  </div>
                )}
              </dl>

              <Bottone href={PRENOTAZIONE_URL} className="mt-7 w-full">
                {PRENOTAZIONE_LABEL}
              </Bottone>
            </div>
          </aside>
        </div>
      </section>

      {/* Correlati — motore dell'internal linking */}
      {correlati.length > 0 && (
        <section className="bg-white px-6 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-2xl font-semibold text-brand-dark md:text-3xl">
              Spesso si abbina a
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {correlati.map((altro) => (
                <li key={altro.slug}>
                  <Link
                    to={percorsoServizio(altro)}
                    className="group flex h-full flex-col rounded-3xl border border-brand-primary/20 bg-brand-light p-6 transition-colors hover:border-brand-primary hover:bg-brand-primary/10"
                  >
                    <span className="font-semibold text-brand-dark">{altro.nome}</span>
                    <span className="mt-2 flex-1 text-sm font-light leading-relaxed text-brand-dark/70">
                      {altro.sottotitolo}
                    </span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink">
                      Scopri
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-brand-light px-6 pb-24">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] bg-brand-dark px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-2xl font-semibold leading-tight md:text-3xl">
            Vuoi capire se è il percorso adatto a te?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-light leading-relaxed text-white/70">
            La prima valutazione serve a questo: guardare, capire, e dirti come si imposta il
            lavoro.
          </p>
          <div className="mt-8 flex justify-center">
            <Bottone href={PRENOTAZIONE_URL} variante="chiara">
              {PRENOTAZIONE_LABEL}
            </Bottone>
          </div>
        </div>
      </section>
    </>
  );
}
