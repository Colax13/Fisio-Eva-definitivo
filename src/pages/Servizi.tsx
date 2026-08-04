import { useMemo, useState } from 'react';
import { ArrowRight, Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Intestazione from '../components/layout/Intestazione';
import Bottone from '../components/ui/Bottone';
import Occhiello from '../components/ui/Occhiello';
import {
  categorie,
  percorsoCategoria,
  percorsoServizio,
  servizi,
  serviziDiCategoria,
  sintomiInEvidenza,
  type Servizio,
} from '../content/servizi';
import { PRENOTAZIONE_LABEL, PRENOTAZIONE_URL } from '../config/site';
import { schemaBreadcrumb, schemaStudio, usePageSeo } from '../lib/seo';

// Segni diacritici combinanti: costruito da escape ASCII per non dipendere
// da caratteri invisibili nel sorgente.
const DIACRITICI = new RegExp('[\\u0300-\\u036f]', 'g');

/** Minuscolo, senza accenti: cosi "cervicale" trova anche "Cervicalgia". */
const normalizza = (testo: string) =>
  testo
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITICI, '');

/** Ogni parola cercata deve comparire da qualche parte nel servizio. */
function cerca(query: string): Servizio[] {
  const termini = normalizza(query).split(/\s+/).filter(Boolean);
  if (!termini.length) return [];

  return servizi.filter((servizio) => {
    const testo = normalizza(
      [servizio.nome, servizio.sottotitolo, ...servizio.sintomi, ...servizio.quandoServe].join(' ')
    );
    return termini.every((t) => testo.includes(t));
  });
}

export default function Servizi() {
  const [query, setQuery] = useState('');

  usePageSeo({
    title: 'Servizi e trattamenti | FisioEva, Casalotti Roma',
    description:
      'Fisioterapia, osteopatia, salute della donna, osteopatia neonatale e terapie strumentali a Roma zona Boccea-Casalotti. Cerca per sintomo e trova il percorso adatto.',
    path: '/servizi',
    schema: [
      schemaStudio(),
      schemaBreadcrumb([
        { nome: 'Home', path: '/' },
        { nome: 'Servizi', path: '/servizi' },
      ]),
    ],
  });

  const risultati = useMemo(() => cerca(query), [query]);
  const inRicerca = query.trim().length > 0;

  return (
    <>
      <Intestazione
        occhiello="Servizi"
        titolo="Da dove vuoi partire?"
        sottotitolo="Non serve sapere di cosa hai bisogno. Serve sapere cosa senti. Qui trovi tutto quello che facciamo, diviso per come arriva la gente da noi: un dolore che non passa, un intervento da recuperare, una gravidanza, un bambino che non dorme."
        briciole={[
          { nome: 'Home', path: '/' },
          { nome: 'Servizi', path: '/servizi' },
        ]}
      />

      {/* Ricerca per sintomo */}
      <section className="bg-white px-6 pb-20">
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-dark/40"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca un sintomo: mal di schiena, coliche, perdite…"
              aria-label="Cerca per sintomo"
              className="w-full rounded-full border-2 border-brand-primary/40 bg-white py-4 pl-14 pr-12 text-brand-dark placeholder:text-brand-dark/40 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/20"
            />
            {inRicerca && (
              <button
                onClick={() => setQuery('')}
                aria-label="Cancella la ricerca"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-brand-dark/40 transition-colors hover:text-brand-dark"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {!inRicerca && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {sintomiInEvidenza.map((sintomo) => (
                <button
                  key={sintomo}
                  onClick={() => setQuery(sintomo)}
                  className="rounded-full border border-brand-primary/40 px-4 py-1.5 text-sm font-light text-brand-dark transition-colors hover:bg-brand-primary/15"
                >
                  {sintomo}
                </button>
              ))}
            </div>
          )}

          {inRicerca && (
            <div className="mt-8">
              {risultati.length > 0 ? (
                <>
                  <p className="mb-4 text-sm text-brand-dark/60">
                    {risultati.length}{' '}
                    {risultati.length === 1 ? 'servizio trovato' : 'servizi trovati'}
                  </p>
                  <ul className="space-y-3">
                    {risultati.map((servizio) => (
                      <li key={servizio.slug}>
                        <Link
                          to={percorsoServizio(servizio)}
                          className="group flex items-start justify-between gap-4 rounded-3xl border border-brand-primary/20 bg-brand-light p-6 transition-colors hover:border-brand-primary hover:bg-brand-primary/10"
                        >
                          <span>
                            <span className="block font-semibold text-brand-dark">
                              {servizio.nome}
                            </span>
                            <span className="mt-1 block text-sm font-light text-brand-dark/70">
                              {servizio.sottotitolo}
                            </span>
                          </span>
                          <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-brand-ink transition-transform group-hover:translate-x-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="rounded-3xl border border-brand-primary/20 bg-brand-light p-8 text-center">
                  <p className="text-brand-dark">
                    Non trovi quello che cerchi? Scrivici, ti diciamo se possiamo aiutarti.
                  </p>
                  <Bottone to="/contatti" variante="secondaria" className="mt-5">
                    Vai ai contatti
                  </Bottone>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Le categorie */}
      {!inRicerca && (
        <section className="bg-brand-light px-6 py-20">
          <div className="mx-auto max-w-7xl space-y-16">
            {categorie
              .filter((c) => c.inMenu)
              .map((categoria, i) => {
                const elenco = serviziDiCategoria(categoria.slug);

                return (
                  <motion.div
                    key={categoria.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5, delay: Math.min(i, 3) * 0.05 }}
                  >
                    <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                      <div>
                        <h2 className="text-2xl font-semibold text-brand-dark md:text-3xl">
                          {categoria.titoloEsteso}
                        </h2>
                        <p className="mt-2 max-w-2xl font-light text-brand-dark/70">
                          {categoria.sottotitolo}
                        </p>
                      </div>
                      <Link
                        to={percorsoCategoria(categoria.slug)}
                        className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-ink"
                      >
                        Vedi la categoria
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>

                    <ul
                      className={`grid gap-3 ${
                        categoria.sobria
                          ? 'sm:grid-cols-2 lg:grid-cols-4'
                          : 'sm:grid-cols-2 lg:grid-cols-3'
                      }`}
                    >
                      {elenco.map((servizio) => (
                        <li key={servizio.slug}>
                          <Link
                            to={percorsoServizio(servizio)}
                            className="group flex h-full flex-col rounded-3xl border border-brand-primary/20 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-brand-primary hover:shadow-md"
                          >
                            <span className="font-semibold text-brand-dark">{servizio.nome}</span>
                            {!categoria.sobria && (
                              <span className="mt-2 text-sm font-light leading-relaxed text-brand-dark/70">
                                {servizio.sottotitolo}
                              </span>
                            )}
                            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink">
                              Scopri
                              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
          </div>
        </section>
      )}

      {/* Chiusura */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] bg-brand-dark px-8 py-14 text-center text-white md:px-14">
          <Occhiello allineamento="centro" tono="chiaro" className="mb-6">
            Prima valutazione
          </Occhiello>
          <h2 className="text-3xl font-semibold leading-tight md:text-4xl">
            Non sai da dove iniziare?
            <br />
            La prima valutazione serve a questo.
          </h2>
          <p className="mx-auto mt-5 max-w-xl font-light leading-relaxed text-white/70">
            Si parte dall'ascolto e dalla valutazione. Alla fine sai cosa abbiamo trovato e come si
            imposta il percorso.
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
