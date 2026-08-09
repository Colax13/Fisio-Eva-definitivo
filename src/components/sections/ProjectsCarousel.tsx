import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { porte } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';
import Eyebrow from '../ui/Eyebrow';

/**
 * I percorsi, in card scorrevoli.
 *
 * Le card stanno su una riga che si scorre a mano, col dito o con la rotella.
 * Le frecce non ci sono: su una fila che si trascina erano un doppione, e su
 * mobile occupavano spazio senza aggiungere niente.
 */
export default function ProjectsCarousel() {
  return (
    /*
     * Fondo bianco e non off-white: Chi siamo sopra usa lo stesso off-white,
     * e senza il cambio le due sezioni si leggevano come un unico blocco lungo.
     */
    <section className="relative bg-white overflow-hidden py-28 md:py-32 px-6 border-t border-brand-primary/10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* Sul telefono tutto al centro, come le card; da desktop la colonna
            di testo torna a sinistra. */}
        <div className="flex flex-col items-center gap-6 text-center mb-12 md:flex-row md:items-end md:justify-between md:text-left">
          <div className="max-w-xl">
            <Eyebrow align="left" className="mb-5">I nostri percorsi</Eyebrow>

            <h2 className="text-h2 font-sans font-bold text-brand-dark mb-4">
              Da dove <span className="text-brand-primary">vuoi partire?</span>
            </h2>

            <p className="text-gray-600 font-light leading-relaxed">
              Non serve sapere di cosa hai bisogno. Serve sapere cosa senti.
            </p>
          </div>
        </div>

        {/*
         * Da desktop è una griglia: le quattro card ci stanno tutte e non c'è
         * niente da scorrere. In fila orizzontale l'ultima restava fuori
         * schermo e — senza frecce, con la barra di scorrimento nascosta e la
         * rotella che va in verticale — non c'era modo di raggiungerla.
         *
         * Sul telefono resta la fila che si trascina col dito, dove il gesto
         * esiste ed è naturale. `snap-center` ferma la card al centro invece
         * che incollata al bordo; il padding di `pista-card` dà alla prima e
         * all'ultima lo spazio per arrivarci.
         */}
        <ul className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 -mx-6 pista-card scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {porte.map((porta, idx) => {
            const accento = porta.accent === 'primary' ? 'bg-brand-primary' : 'bg-brand-secondary';

            return (
              <motion.li
                key={porta.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="snap-center shrink-0 w-[300px] sm:w-[380px] lg:w-auto lg:shrink"
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
                    <h3 className="text-h3 font-sans font-bold text-brand-dark mb-3">
                      {porta.titolo}
                    </h3>

                    <p className="text-gray-600 font-light text-sm leading-relaxed flex-1">
                      {porta.descrizione}
                    </p>

                    <span className={`w-8 h-[2px] ${accento} mt-6 group-hover:w-14 transition-all duration-500`}></span>
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>

        {/* Una sola chiamata per tutta la sezione: ripeterla su ogni card
            faceva tre inviti identici uno accanto all'altro. */}
        <div className="mt-12 flex justify-center">
          <ArrowButton to="/servizi">Scopri tutti i servizi</ArrowButton>
        </div>
      </div>
    </section>
  );
}
