import { useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import PageHero from '../components/layout/PageHero';
import CtaBand from '../components/sections/CtaBand';
import { WaveBackground } from '../components/WaveBackground';
import ArrowButton from '../components/ui/ArrowButton';
import SectionHeading from '../components/ui/SectionHeading';
import usePageMeta from '../hooks/usePageMeta';
import {
  categorie,
  immagini,
  trattamenti,
  trattamentiDi,
  type Categoria,
  type Trattamento,
} from '../data/site';

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

/** La card di un trattamento. */
function CardTrattamento({ t, accento, idx }: { t: Trattamento; accento: string; idx: number }) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(idx, 6) * 0.06 }}
      className="snap-center shrink-0 w-[300px] sm:w-[340px]"
    >
      <div className="flex h-full flex-col rounded-[2rem] border border-white bg-white p-7 shadow-xl">
        <h3 className="text-h3 font-sans font-bold text-brand-dark mb-3">{t.nome}</h3>
        <p className="flex-1 text-sm leading-relaxed font-light text-gray-600">{t.sottotitolo}</p>
        <span className={`mt-6 h-[2px] w-8 rounded-full ${accento}`}></span>
      </div>
    </motion.li>
  );
}

/**
 * Un'area con la sua fila di card.
 *
 * Le aree stanno tutte su questa pagina, una sotto l'altra: aprire una pagina
 * per categoria costringeva a tornare indietro per guardarne un'altra.
 */
function Area({ categoria }: { categoria: Categoria }) {
  const pista = useRef<HTMLUListElement>(null);
  const elenco = trattamentiDi(categoria.slug);
  const accento = categoria.accent === 'primary' ? 'bg-brand-primary' : 'bg-brand-secondary';

  const scorri = (verso: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const passo = el.firstElementChild?.clientWidth ?? el.clientWidth * 0.8;
    el.scrollBy({ left: verso * (passo + 24), behavior: 'smooth' });
  };

  return (
    <div className="scroll-mt-28" id={categoria.slug}>
      <SectionHeading
        eyebrow={`${elenco.length} ${elenco.length === 1 ? 'trattamento' : 'trattamenti'}`}
        accent={categoria.accent}
        lead={categoria.sottotitolo}
        className="mb-10"
      >
        {categoria.nome}
      </SectionHeading>

      {elenco.length > 2 && (
        <div className="mb-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scorri(-1)}
            aria-label={`${categoria.nome}: trattamento precedente`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-primary/30 text-brand-dark transition-colors hover:border-brand-primary hover:bg-brand-primary hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scorri(1)}
            aria-label={`${categoria.nome}: trattamento successivo`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-primary/30 text-brand-dark transition-colors hover:border-brand-primary hover:bg-brand-primary hover:text-white"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}

      <ul
        ref={pista}
        className="pista-card -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {elenco.map((t, i) => (
          <CardTrattamento key={t.slug} t={t} accento={accento} idx={i} />
        ))}
      </ul>
    </div>
  );
}

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
        subtitle="Non serve sapere di cosa hai bisogno. Serve sapere cosa senti."
        breadcrumb="Servizi"
        image={immagini.manuale}
      />

      <section className="relative bg-white px-6 py-14">
        <div className="mx-auto max-w-3xl">
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-6 h-5 w-5 -translate-y-1/2 text-gray-400"
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

          {inRicerca && (
            <div className="mt-10">
              {risultati.length > 0 ? (
                <>
                  <p className="mb-5 text-center text-sm text-gray-500">
                    {risultati.length}{' '}
                    {risultati.length === 1 ? 'trattamento trovato' : 'trattamenti trovati'}
                  </p>
                  <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    {risultati.map((t) => (
                      <li key={t.slug}>
                        <div className="h-full rounded-[2rem] border border-brand-primary/15 bg-white p-6 shadow-lg">
                          <h3 className="text-h3 font-sans font-bold text-brand-dark">{t.nome}</h3>
                          <p className="mt-2 text-sm leading-relaxed font-light text-gray-600">
                            {t.sottotitolo}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <div className="rounded-[2rem] border border-brand-primary/15 bg-white p-10 text-center shadow-lg">
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
          )}
        </div>
      </section>

      {/* Tutte le aree, una sotto l'altra, sulla stessa pagina. */}
      {!inRicerca && (
        <section className="relative overflow-hidden px-6 py-20">
          <WaveBackground />

          <div className="relative z-10 mx-auto max-w-7xl space-y-24">
            {categorie.map((c) => (
              <Area key={c.slug} categoria={c} />
            ))}
          </div>
        </section>
      )}

      <CtaBand titolo="Non sai da quale trattamento partire?" />
    </>
  );
}
