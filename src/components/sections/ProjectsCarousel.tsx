import { useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { porte } from '../../data/site';

/**
 * I percorsi, in card scorrevoli.
 *
 * Prima era un carosello che girava da solo: per vedere la terza card bisognava
 * aspettare. Qui le card stanno tutte su una riga e si scorre a mano — col
 * dito, con la rotella o con le due frecce.
 *
 * Titolo, testo e card sono tutti allineati a sinistra: mezza sezione centrata
 * e mezza a sinistra è la cosa che si nota per prima, e in male.
 */
export default function ProjectsCarousel() {
  const pista = useRef<HTMLUListElement>(null);

  const scorri = (verso: 1 | -1) => {
    const el = pista.current;
    if (!el) return;
    // Una card più il gap: si scorre di un elemento per volta, non a caso.
    const passo = el.firstElementChild?.clientWidth ?? el.clientWidth * 0.8;
    el.scrollBy({ left: verso * (passo + 24), behavior: 'smooth' });
  };

  return (
    <section className="relative bg-brand-light overflow-hidden py-24 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Sul telefono tutto al centro, come le card; da desktop la colonna
            di testo torna a sinistra e le frecce le stanno di fianco. */}
        <div className="flex flex-col items-center gap-6 text-center mb-12 md:flex-row md:items-end md:justify-between md:text-left">
          <div className="max-w-xl">
            <div className="flex items-center justify-center gap-4 mb-5 md:justify-start">
              <div className="w-12 h-[1px] bg-brand-primary"></div>
              <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">
                I nostri percorsi
              </span>
            </div>

            <h2 className="text-h2 font-sans font-bold text-brand-dark mb-4">
              Da dove <span className="text-brand-primary">vuoi partire?</span>
            </h2>

            <p className="text-gray-600 font-light leading-relaxed">
              Non serve sapere di cosa hai bisogno. Serve sapere cosa senti.
            </p>
          </div>

          {/* Le frecce stanno in alto a destra, fuori dalla pista: dentro
              coprirebbero le foto. */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scorri(-1)}
              aria-label="Percorso precedente"
              className="w-11 h-11 rounded-full border border-brand-primary/30 flex items-center justify-center text-brand-dark hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scorri(1)}
              aria-label="Percorso successivo"
              className="w-11 h-11 rounded-full border border-brand-primary/30 flex items-center justify-center text-brand-dark hover:bg-brand-primary hover:text-white hover:border-brand-primary transition-colors"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/*
         * `snap-center` e non `snap-start`: la card si ferma al centro dello
         * schermo invece di incollarsi al bordo sinistro. Il padding laterale
         * calcolato serve a dare alla prima e all'ultima lo spazio per
         * arrivarci davvero — senza, restano appiccicate ai margini.
         */}
        <ul
          ref={pista}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 pista-card scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {porte.map((porta, idx) => {
            const accento = porta.accent === 'primary' ? 'bg-brand-primary' : 'bg-brand-secondary';

            return (
              <motion.li
                key={porta.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="snap-center shrink-0 w-[300px] sm:w-[380px]"
              >
                <Link
                  to={porta.to}
                  className="group flex flex-col h-full bg-white rounded-[2rem] overflow-hidden shadow-xl border border-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={porta.image}
                      alt={porta.titolo}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent"></div>
                  </div>

                  <div className="flex flex-col flex-1 p-7">
                    <h3 className="text-2xl font-sans font-bold text-brand-dark leading-snug mb-3">
                      {porta.titolo}
                    </h3>

                    <p className="text-gray-600 font-light text-sm leading-relaxed flex-1">
                      {porta.descrizione}
                    </p>

                    <span className={`w-8 h-[2px] ${accento} mt-6 group-hover:w-14 transition-all duration-500`}></span>

                    <span className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-brand-dark">
                      Scopri i servizi
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
