import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import PageHero from '../components/layout/PageHero';
import PercorsoCura from '../components/sections/PercorsoCura';
import CtaBand from '../components/sections/CtaBand';
import SectionHeading from '../components/ui/SectionHeading';
import ArrowButton from '../components/ui/ArrowButton';
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
      className="group bg-white/80 backdrop-blur-md rounded-[2rem] p-7 shadow-xl border border-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <h3 className="font-sans font-bold text-brand-dark text-lg leading-snug">{t.nome}</h3>
        <ArrowUpRight className="w-5 h-5 text-brand-primary shrink-0 mt-1 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>

      <p className="text-gray-600 font-light text-sm leading-relaxed flex-1">{t.sottotitolo}</p>

      <div className="w-8 h-[2px] bg-brand-primary mt-5 group-hover:w-14 transition-all duration-500"></div>
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

          {!inRicerca && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {SINTOMI.map((s) => (
                <button
                  key={s}
                  onClick={() => setQuery(s)}
                  className="rounded-full border border-brand-primary/40 px-4 py-1.5 text-sm font-light text-brand-dark hover:bg-brand-primary hover:text-white transition-colors"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {inRicerca ? (
        /* Risultati della ricerca */
        <section className="relative bg-brand-light py-16 px-6 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            {risultati.length > 0 ? (
              <>
                <p className="text-sm text-gray-500 mb-6">
                  {risultati.length}{' '}
                  {risultati.length === 1 ? 'trattamento trovato' : 'trattamenti trovati'}
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {risultati.map((t, i) => (
                    <CardTrattamento key={t.slug} t={t} idx={i} />
                  ))}
                </ul>
              </>
            ) : (
              <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-10 text-center shadow-xl border border-white max-w-2xl mx-auto">
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
        </section>
      ) : (
        <>
          {/* Selettore centrale delle categorie */}
          <section className="relative bg-brand-light py-20 px-6 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
              <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              <SectionHeading eyebrow="Le aree di lavoro" className="mb-14">
                Scegli <span className="text-brand-primary">l'area</span>, poi il trattamento
              </SectionHeading>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {categorie.map((c) => {
                  const isAttiva = c.slug === attiva;
                  const quanti = trattamentiDi(c.slug).length;

                  return (
                    <button
                      key={c.slug}
                      type="button"
                      onClick={() => setAttiva(c.slug)}
                      aria-pressed={isAttiva}
                      className={`group relative min-h-[15rem] rounded-[2rem] overflow-hidden text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/40 ${
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

                      <div className="relative flex flex-col justify-end h-full min-h-[15rem] p-7">
                        <span className="text-white/80 text-[11px] tracking-widest uppercase font-medium mb-2">
                          {quanti} {quanti === 1 ? 'trattamento' : 'trattamenti'}
                        </span>
                        <span className="text-white font-sans font-bold text-2xl leading-tight">
                          {c.nome}
                        </span>
                        <span className="text-white/85 font-light text-sm leading-relaxed mt-2">
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
          <section className="relative bg-white py-20 px-6 overflow-hidden">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`w-12 h-[1px] ${
                    categoria.accent === 'primary' ? 'bg-brand-primary' : 'bg-brand-secondary'
                  }`}
                ></div>
                <span
                  className={`text-xs tracking-widest uppercase font-medium ${
                    categoria.accent === 'primary' ? 'text-brand-primary' : 'text-brand-secondary'
                  }`}
                >
                  {categoria.nome}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-sans font-light text-brand-dark leading-tight mb-3">
                {categoria.sottotitolo}
              </h2>

              <p className="text-gray-500 font-light text-sm mb-12">
                {elenco.length} {elenco.length === 1 ? 'trattamento' : 'trattamenti'} in quest'area.
              </p>

              <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
