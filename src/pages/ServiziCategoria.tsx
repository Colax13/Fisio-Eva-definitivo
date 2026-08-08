import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, Navigate, useParams } from 'react-router-dom';
import PageHero from '../components/layout/PageHero';
import CtaBand from '../components/sections/CtaBand';
import ArrowButton from '../components/ui/ArrowButton';
import usePageMeta from '../hooks/usePageMeta';
import { categorie, trattamentiDi, type CategoriaSlug } from '../data/site';

/**
 * La pagina di una categoria di servizi.
 *
 * Ogni card della pagina servizi porta qui: prima cambiava solo il contenuto
 * più in basso, e non si capiva che fosse successo qualcosa.
 *
 * I trattamenti stanno in una fila che scorre di lato, non in un elenco
 * puntato: sono tra i sette e i nove per categoria, e in colonna diventano un
 * muro di testo.
 */
export default function ServiziCategoria() {
  const { categoria: slug } = useParams<{ categoria: string }>();
  const pista = useRef<HTMLUListElement>(null);

  const categoria = categorie.find((c) => c.slug === slug);

  usePageMeta(
    categoria
      ? `${categoria.nome} — FisioEVA | Casalotti, Roma`
      : 'Servizi — FisioEVA',
    categoria?.sottotitolo ?? ''
  );

  if (!categoria) return <Navigate to="/servizi" replace />;

  const elenco = trattamentiDi(categoria.slug as CategoriaSlug);
  const accento = categoria.accent === 'primary' ? 'bg-brand-primary' : 'bg-brand-secondary';
  const accentoTesto =
    categoria.accent === 'primary' ? 'text-brand-primary' : 'text-brand-secondary';

  const scorri = (verso: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    const passo = el.firstElementChild?.clientWidth ?? el.clientWidth * 0.8;
    el.scrollBy({ left: verso * (passo + 24), behavior: 'smooth' });
  };

  return (
    <>
      <PageHero
        eyebrow="Servizi"
        title={<>{categoria.nome}</>}
        subtitle={categoria.sottotitolo}
        breadcrumb={categoria.nome}
        image={categoria.image}
      />

      <section className="relative bg-brand-light py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div className="max-w-xl">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-[1px] ${accento}`}></div>
                <span className={`${accentoTesto} text-xs tracking-widest uppercase font-medium`}>
                  {elenco.length} {elenco.length === 1 ? 'trattamento' : 'trattamenti'}
                </span>
              </div>

              <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-dark leading-tight">
                Cosa trovi in quest'area
              </h2>
            </div>

            {elenco.length > 2 && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => scorri(-1)}
                  aria-label="Trattamento precedente"
                  className="w-11 h-11 rounded-full border border-brand-primary/30 flex items-center justify-center text-brand-dark hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => scorri(1)}
                  aria-label="Trattamento successivo"
                  className="w-11 h-11 rounded-full border border-brand-primary/30 flex items-center justify-center text-brand-dark hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <ul
            ref={pista}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 px-6 scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {elenco.map((t, idx) => (
              <motion.li
                key={t.slug}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(idx, 6) * 0.06 }}
                className="snap-start shrink-0 w-[80%] sm:w-[330px]"
              >
                <div className="h-full bg-white rounded-[2rem] p-7 shadow-xl border border-white flex flex-col">
                  <h3 className="font-sans font-bold text-brand-dark text-lg leading-snug mb-3">
                    {t.nome}
                  </h3>
                  <p className="text-gray-600 font-light text-sm leading-relaxed flex-1">
                    {t.sottotitolo}
                  </p>
                  <span className={`w-8 h-[2px] ${accento} mt-6`}></span>
                </div>
              </motion.li>
            ))}
          </ul>

          <div className="mt-12 flex flex-wrap gap-4">
            <ArrowButton to="/contatti">Prenota la prima valutazione</ArrowButton>
            <Link
              to="/servizi"
              className="inline-flex w-max items-center rounded-full border-2 border-brand-dark/20 px-8 py-3.5 text-sm font-medium text-brand-dark transition-colors duration-300 hover:border-brand-dark"
            >
              Tutte le aree
            </Link>
          </div>
        </div>
      </section>

      <CtaBand titolo="Non sai da quale trattamento partire?" />
    </>
  );
}
