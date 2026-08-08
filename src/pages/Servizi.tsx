import { useMemo, useState } from 'react';
import { Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import CtaBand from '../components/sections/CtaBand';
import ArrowButton from '../components/ui/ArrowButton';
import usePageMeta from '../hooks/usePageMeta';
import { categorie, immagini, trattamenti, trattamentiDi, type Trattamento } from '../data/site';

// Segni diacritici combinanti, da escape ASCII per non dipendere da caratteri
// invisibili nel sorgente.
const DIACRITICI = new RegExp('[\\u0300-\\u036f]', 'g');

const normalizza = (testo: string) =>
  testo.toLowerCase().normalize('NFD').replace(DIACRITICI, '');

/**
 * Parole di servizio: chi cerca "torcicollo del neonato" intende "torcicollo" e
 * "neonato". Pretendere anche "del" farebbe fallire la ricerca su un testo che
 * parla esattamente di quello.
 */
const VUOTE = new Set([
  'a', 'ad', 'al', 'alla', 'alle', 'che', 'con', 'da', 'dal', 'della', 'delle', 'di', 'e', 'ed',
  'gli', 'i', 'il', 'in', 'la', 'le', 'lo', 'nel', 'non', 'o', 'per', 'su', 'un', 'una', 'uno',
]);

function cerca(query: string): Trattamento[] {
  const tutti = normalizza(query).split(/\s+/).filter(Boolean);
  if (!tutti.length) return [];

  const utili = tutti.filter((t) => !VUOTE.has(t));
  const termini = utili.length ? utili : tutti;

  return trattamenti.filter((t) => {
    const testo = normalizza([t.nome, t.sottotitolo, ...t.sintomi].join(' '));
    return termini.every((x) => testo.includes(x));
  });
}

/**
 * Indice dei servizi: quattro aree, quattro card, quattro pagine.
 *
 * Le card sono link veri — prima cliccarle cambiava solo il contenuto più in
 * basso e sembrava che non fosse successo niente.
 */
export default function Servizi() {
  const [query, setQuery] = useState('');

  usePageMeta(
    'Servizi e Trattamenti — FisioEVA | Fisioterapia e Osteopatia a Roma',
    'Terapia manuale, osteopatia, riabilitazione, salute della donna, osteopatia neonatale e terapie strumentali a Roma zona Boccea-Casalotti.'
  );

  const risultati = useMemo(() => cerca(query), [query]);
  const inRicerca = query.trim().length > 0;

  return (
    <>
      <PageHero
        eyebrow="I nostri trattamenti"
        title={
          <>
            Da dove <span className="text-brand-primary">vuoi partire?</span>
          </>
        }
        subtitle="Non serve sapere di cosa hai bisogno. Serve sapere cosa senti. Scegli l'area che ti riguarda: dentro trovi tutti i trattamenti."
        breadcrumb="Servizi"
        image={immagini.manuale}
      />

      <section className="relative bg-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca un sintomo: mal di schiena, coliche, perdite…"
              aria-label="Cerca un sintomo"
              className="w-full rounded-full border-2 border-brand-primary/40 bg-white py-4 pl-14 pr-12 text-brand-dark shadow-sm placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/20"
            />
            {inRicerca && (
              <button
                onClick={() => setQuery('')}
                aria-label="Cancella la ricerca"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-brand-dark transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {inRicerca && (
            <div className="mt-10">
              {risultati.length > 0 ? (
                <>
                  <p className="text-sm text-gray-500 mb-5">
                    {risultati.length}{' '}
                    {risultati.length === 1 ? 'trattamento trovato' : 'trattamenti trovati'}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {risultati.map((t) => {
                      const cat = categorie.find((c) => c.slug === t.categoria)!;

                      return (
                        <li key={t.slug}>
                          <Link
                            to={`/servizi/${cat.slug}`}
                            className="group block h-full bg-white rounded-[1.75rem] p-6 shadow-lg border border-brand-primary/15 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                          >
                            <span className="text-[11px] tracking-widest uppercase text-gray-500">
                              {cat.nome}
                            </span>
                            <h3 className="font-sans font-bold text-brand-dark leading-snug mt-1.5">
                              {t.nome}
                            </h3>
                            <p className="text-gray-600 font-light text-sm leading-relaxed mt-2">
                              {t.sottotitolo}
                            </p>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </>
              ) : (
                <div className="bg-white rounded-[2rem] p-10 text-center shadow-lg border border-brand-primary/15">
                  <p className="text-brand-dark mb-6">
                    Non trovi quello che cerchi? Scrivici, ti diciamo se possiamo aiutarti.
                  </p>
                  <div className="flex justify-center">
                    <ArrowButton to="/contatti" variant="secondary">
                      Vai ai contatti
                    </ArrowButton>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {!inRicerca && (
        <section className="relative bg-brand-light py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
            <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="max-w-xl mb-12">
              <div className="flex items-center gap-4 mb-5">
                <div className="w-12 h-[1px] bg-brand-primary"></div>
                <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">
                  Le aree di lavoro
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-sans font-bold text-brand-dark leading-tight">
                Scegli <span className="text-brand-primary">l'area</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {categorie.map((c, idx) => {
                const quanti = trattamentiDi(c.slug).length;

                return (
                  <motion.div
                    key={c.slug}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                  >
                    <Link
                      to={`/servizi/${c.slug}`}
                      className="group relative block min-h-[19rem] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                    >
                      <img
                        src={c.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Senza gradiente il testo bianco non regge il contrasto
                          su una foto qualsiasi. */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/55 to-brand-dark/20"></div>

                      <div className="relative flex flex-col justify-end h-full min-h-[19rem] p-8">
                        <span className="text-white/80 text-[11px] tracking-widest uppercase font-medium mb-2">
                          {quanti} {quanti === 1 ? 'trattamento' : 'trattamenti'}
                        </span>
                        <span className="text-white font-sans font-bold text-2xl md:text-3xl leading-tight">
                          {c.nome}
                        </span>
                        <span className="text-white/85 font-light text-sm leading-relaxed mt-2 max-w-sm">
                          {c.sottotitolo}
                        </span>
                        <span className="inline-flex items-center gap-2 text-white text-sm font-medium mt-6 border-b border-white/40 pb-1 w-max group-hover:border-white transition-colors">
                          Scopri di più
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CtaBand titolo="Non sai da quale trattamento partire?" />
    </>
  );
}
