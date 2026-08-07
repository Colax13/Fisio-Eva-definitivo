import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import PageHero from '../components/layout/PageHero';
import PercorsoCura from '../components/sections/PercorsoCura';
import CtaBand from '../components/sections/CtaBand';
import SectionHeading from '../components/ui/SectionHeading';
import ArrowButton from '../components/ui/ArrowButton';
import Eyebrow from '../components/ui/Eyebrow';
import usePageMeta from '../hooks/usePageMeta';
import {
  categorie,
  immagini,
  trattamenti,
  trattamentiDi,
  type CategoriaSlug,
  type Trattamento,
} from '../data/site';

// Segni diacritici combinanti, costruito da escape ASCII per non dipendere da
// caratteri invisibili nel sorgente.
const DIACRITICI = new RegExp('[\\u0300-\\u036f]', 'g');

const normalizza = (testo: string) =>
  testo.toLowerCase().normalize('NFD').replace(DIACRITICI, '');

/**
 * Parole di servizio: chi cerca "torcicollo del neonato" intende "torcicollo"
 * e "neonato". Pretendere anche "del" farebbe fallire la ricerca su un testo
 * che parla esattamente di quello.
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

const SINTOMI = [
  'Mal di schiena', 'Cervicale', 'Sciatica', 'Ginocchio', 'Dopo un intervento',
  'Infortunio sportivo', 'Postura', 'Gambe gonfie', 'Dopo il parto', 'Perdite urinarie',
  'Cicatrice cesareo', 'Gravidanza', 'Coliche', 'Torcicollo del neonato',
];

/** Card di un trattamento. Non una voce di elenco: una card. */
function CardTrattamento({ t, idx }: { t: Trattamento; idx: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(idx, 8) * 0.05 }}
      className="group flex flex-col rounded-[2rem] border border-white bg-white/80 p-6 shadow-xl backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl sm:p-7"
    >
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="font-sans text-lg leading-snug font-bold text-brand-dark">{t.nome}</h3>
        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-brand-primary-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <p className="flex-1 text-sm leading-relaxed font-light text-gray-600">{t.sottotitolo}</p>

      <div className="mt-5 h-[2px] w-8 bg-brand-primary transition-all duration-500 group-hover:w-14"></div>
    </motion.li>
  );
}

export default function Servizi() {
  const [attiva, setAttiva] = useState<CategoriaSlug>('tornare-a-muoverti');
  const [query, setQuery] = useState('');

  usePageMeta(
    'Servizi e Trattamenti — FisioEVA | Fisioterapia e Osteopatia a Roma',
    'Terapia manuale, osteopatia, riabilitazione, salute della donna, osteopatia neonatale e terapie strumentali a Roma zona Boccea-Casalotti.'
  );

  const risultati = useMemo(() => cerca(query), [query]);
  const inRicerca = query.trim().length > 0;
  const categoria = categorie.find((c) => c.slug === attiva)!;
  const elenco = trattamentiDi(attiva);

  return (
    <>
      <PageHero
        eyebrow="I nostri trattamenti"
        title={
          <>
            Da dove <span className="text-brand-primary">vuoi partire?</span>
          </>
        }
        subtitle="Non serve sapere di cosa hai bisogno. Serve sapere cosa senti. Qui trovi tutto quello che facciamo, diviso per come arriva la gente da noi."
        breadcrumb="Servizi"
        image={immagini.manuale}
      />

      {/* Ricerca per sintomo */}
      <section className="relative bg-white px-5 py-12 sm:px-6 md:py-16">
        <div className="mx-auto max-w-3xl">
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
              className="min-h-14 w-full rounded-full border-2 border-brand-primary/40 bg-white py-4 pr-12 pl-14 text-base text-brand-dark shadow-sm placeholder:text-gray-500 focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/20 focus:outline-none"
            />
            {inRicerca && (
              <button
                onClick={() => setQuery('')}
                aria-label="Cancella la ricerca"
                className="absolute top-1/2 right-2 flex h-11 w-11 -translate-y-1/2 items-center justify-center text-gray-500 transition-colors hover:text-brand-dark"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {!inRicerca && (
            <>
              <p className="mt-6 mb-3 text-center text-sm font-light text-gray-600">
                Oppure parti da uno di questi:
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {SINTOMI.map((s) => (
                  <button
                    key={s}
                    onClick={() => setQuery(s)}
                    className="min-h-10 rounded-full border border-brand-primary/40 px-4 text-sm font-light text-brand-dark transition-colors hover:bg-brand-primary hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {inRicerca ? (
        /* Risultati della ricerca */
        <section className="relative overflow-hidden bg-brand-light px-5 py-12 sm:px-6 md:py-16">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {risultati.length > 0 ? (
              <>
                <p className="mb-6 text-center text-sm text-gray-600 sm:text-left">
                  {risultati.length}{' '}
                  {risultati.length === 1 ? 'trattamento trovato' : 'trattamenti trovati'}
                </p>
                <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {risultati.map((t, i) => (
                    <CardTrattamento key={t.slug} t={t} idx={i} />
                  ))}
                </ul>
              </>
            ) : (
              <div className="mx-auto max-w-2xl rounded-[2rem] border border-white bg-white/80 p-8 text-center shadow-xl backdrop-blur-md md:p-10">
                <p className="mb-6 text-brand-dark">
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
        </section>
      ) : (
        <>
          {/* Selettore centrale delle categorie */}
          <section className="relative overflow-hidden bg-brand-light px-5 py-16 sm:px-6 md:py-20">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
              <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <SectionHeading eyebrow="Le aree di lavoro" className="mb-10 md:mb-14">
                Scegli <span className="text-brand-primary-ink">l'area</span>, poi il trattamento
              </SectionHeading>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {categorie.map((c) => {
                  const isAttiva = c.slug === attiva;
                  const quanti = trattamentiDi(c.slug).length;

                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setAttiva(c.slug)}
                      aria-pressed={isAttiva}
                      className={`group relative min-h-[13rem] overflow-hidden rounded-[2rem] text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/40 sm:min-h-[15rem] ${
                        isAttiva ? 'ring-4 ring-brand-primary' : ''
                      }`}
                    >
                      <img
                        src={c.image}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Senza il gradiente il testo bianco non regge il
                          contrasto su una foto qualsiasi. */}
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/55 to-brand-dark/20"></div>
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          c.accent === 'primary' ? 'bg-brand-primary/25' : 'bg-brand-secondary/25'
                        } ${isAttiva ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}
                      ></div>

                      <div className="relative flex h-full min-h-[13rem] flex-col justify-end p-6 sm:min-h-[15rem] sm:p-7">
                        <span className="text-eyebrow mb-2 font-semibold text-white/90 uppercase">
                          {quanti} {quanti === 1 ? 'trattamento' : 'trattamenti'}
                        </span>
                        <span className="font-sans text-2xl leading-tight font-bold text-white">
                          {c.nome}
                        </span>
                        <span className="mt-2 text-sm leading-relaxed font-light text-white/90">
                          {c.sottotitolo}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* I trattamenti dell'area scelta, in card */}
          <section className="relative overflow-hidden bg-white px-5 py-16 sm:px-6 md:py-20">
            <div className="mx-auto max-w-7xl">
              <div className="text-center lg:text-left">
                <Eyebrow align="left" accent={categoria.accent} className="mb-4">
                  {categoria.nome}
                </Eyebrow>

                <h2 className="text-h2 mb-3 font-sans font-light text-brand-dark">
                  {categoria.sottotitolo}
                </h2>

                <p className="mb-10 text-sm font-light text-gray-600 md:mb-12">
                  {elenco.length} {elenco.length === 1 ? 'trattamento' : 'trattamenti'} in
                  quest'area.
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {elenco.map((t, i) => (
                  <CardTrattamento key={t.slug} t={t} idx={i} />
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

      <PercorsoCura />
      <CtaBand titolo="Non sai da quale trattamento partire?" />
    </>
  );
}
