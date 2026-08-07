import { ArrowRight, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { porte } from '../../data/site';
import useAutoplay from '../../hooks/useAutoplay';
import CarouselDots from '../ui/CarouselDots';
import SectionHeading from '../ui/SectionHeading';

export default function ProjectsCarousel() {
  const { indice, vaiA, setInPausa } = useAutoplay(porte.length, 6000);

  const progetto = porte[indice];
  const accentText =
    progetto.accent === 'primary' ? 'text-brand-primary-ink' : 'text-brand-secondary-ink';

  return (
    <section
      className="relative overflow-hidden bg-brand-light px-5 py-16 sm:px-6 md:py-24"
      onMouseEnter={() => setInPausa(true)}
      onMouseLeave={() => setInPausa(false)}
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeading eyebrow="I nostri percorsi" className="mb-10 md:mb-16">
          Da dove <span className="text-brand-primary-ink">vuoi partire?</span>
        </SectionHeading>

        {/* Le diapositive stanno impilate nella stessa cella di griglia invece
            che in `absolute inset-0` su un contenitore di altezza fissa: così
            la sezione prende l'altezza di quella visibile, e sul telefono il
            testo non finisce più sopra ai pallini e alla riga di sotto. */}
        <div className="grid grid-cols-1 grid-rows-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={indice}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="col-start-1 row-start-1 flex flex-col items-center gap-8 md:flex-row md:gap-12"
            >
              <div className="order-2 w-full text-center md:order-1 md:w-[55%] md:text-left">
                <p className={`${accentText} text-eyebrow mb-3 font-semibold uppercase`}>
                  {progetto.evidenza}
                </p>

                <h3 className="text-h2 mb-4 font-sans font-light text-brand-dark">
                  <span className={accentText}>{progetto.titolo}</span>
                </h3>

                <p className="text-body mx-auto mb-6 max-w-lg font-light text-gray-600 md:mx-0">
                  {progetto.descrizione}
                </p>

                <ul className="mx-auto mb-8 grid max-w-md grid-cols-1 gap-2.5 text-left sm:grid-cols-2 md:mx-0 md:max-w-none">
                  {progetto.benefici.map((beneficio) => (
                    <li key={beneficio} className="flex items-center gap-2.5">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-brand-primary">
                        <Check className="h-2.5 w-2.5 text-brand-primary-ink" strokeWidth={2.5} />
                      </span>
                      <span className="text-sm font-light text-brand-dark">{beneficio}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to={progetto.to}
                  className="group inline-flex min-h-12 w-full items-center justify-center rounded-full border border-brand-primary/40 bg-transparent px-6 text-sm font-medium text-brand-dark transition-all duration-300 hover:border-brand-primary/60 hover:bg-white sm:w-max"
                >
                  <span>Scopri i servizi</span>
                  <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="order-1 flex w-full items-center justify-center md:order-2 md:w-[45%]">
                <div className="relative aspect-square w-full max-w-[260px] md:max-w-[380px]">
                  <div
                    className="animate-blob absolute inset-0 z-10 bg-gradient-to-tr from-brand-primary/40 to-brand-secondary/40"
                    style={{ borderRadius: '50% 50% 50% 50% / 55% 45% 45% 55%' }}
                  ></div>
                  <div
                    className="absolute inset-[4%] z-20 overflow-hidden border-[4px] border-white bg-white shadow-lg"
                    style={{ borderRadius: '55% 45% 45% 55% / 50% 50% 50% 50%' }}
                  >
                    <img
                      src={progetto.image}
                      alt={progetto.titolo}
                      loading="lazy"
                      className="h-full w-full scale-105 object-cover"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <CarouselDots
          totale={porte.length}
          attivo={indice}
          onSelect={vaiA}
          etichetta={(i) => `Vai a ${porte[i].titolo}`}
          className="mt-6"
        />

        {/* Le strumentali stanno su una riga sola: dargli lo spazio di una card
            vorrebbe dire dare al macchinario lo stesso peso delle mani. */}
        <div className="relative z-20 mt-10">
          <Link
            to="/servizi"
            className="group flex flex-col gap-2 rounded-3xl border border-brand-secondary/25 bg-white/70 px-6 py-5 text-center backdrop-blur-md transition-colors hover:border-brand-secondary/60 sm:flex-row sm:items-center sm:gap-4 sm:px-7 sm:text-left"
          >
            <span className="text-eyebrow shrink-0 font-semibold text-brand-secondary-ink uppercase">
              Terapie strumentali
            </span>
            <span className="hidden h-4 w-px shrink-0 bg-brand-dark/15 sm:block"></span>
            <span className="flex-1 text-sm font-light text-gray-600">
              A supporto del lavoro manuale: tecarterapia, laser ad alta potenza, ultrasuonoterapia,
              magnetoterapia, TENS, ionoforesi, elettrostimolazione.
            </span>
            <ArrowRight className="mx-auto h-4 w-4 shrink-0 text-brand-secondary-ink transition-transform duration-300 group-hover:translate-x-1 sm:mx-0" />
          </Link>
        </div>
      </div>
    </section>
  );
}
