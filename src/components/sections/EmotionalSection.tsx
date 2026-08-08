import { AnimatePresence, motion } from 'motion/react';
import { frasi, immagini } from '../../data/site';
import useAutoplay from '../../hooks/useAutoplay';
import CarouselDots from '../ui/CarouselDots';

/** Divide la frase perché le parole in evidenza portino il colore d'accento. */
function Frase({ testo, evidenza }: { testo: string; evidenza: string }) {
  const i = testo.indexOf(evidenza);
  if (i === -1) return <>{testo}</>;

  return (
    <>
      {testo.slice(0, i)}
      <span className="text-brand-secondary">{evidenza}</span>
      {testo.slice(i + evidenza.length)}
    </>
  );
}

export default function EmotionalSection() {
  const { indice, vaiA } = useAutoplay(frasi.length, 6500);

  return (
    <section className="relative flex min-h-[60svh] items-center justify-center overflow-hidden px-5 py-20 sm:px-6 md:min-h-[70vh] md:py-32">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${immagini.calma})` }}
      ></div>
      <div className="absolute inset-0 bg-brand-dark/75"></div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mb-8 h-px w-16 bg-brand-secondary"
        ></motion.div>

        {/* Altezza minima fissa perché il cambio di frase non faccia saltare
            la pagina. Sul telefono è più bassa: le frasi ci stanno comunque. */}
        <div className="flex min-h-[180px] w-full items-center justify-center md:min-h-[260px]">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={indice}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-h1 max-w-4xl font-sans font-light text-white"
            >
              <Frase {...frasi[indice]} />
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <CarouselDots
          totale={frasi.length}
          attivo={indice}
          onSelect={vaiA}
          etichetta={(i) => `Mostra la frase ${i + 1}`}
          tone="light"
          className="mt-2 mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 text-xs font-semibold tracking-[0.3em] text-brand-secondary uppercase md:gap-4 md:text-sm"
        >
          <span>Muoviti</span>
          <span className="h-1 w-1 rounded-full bg-brand-secondary" aria-hidden="true"></span>
          <span>Respira</span>
          <span className="h-1 w-1 rounded-full bg-brand-secondary" aria-hidden="true"></span>
          <span>Vivi</span>
        </motion.div>
      </div>
    </section>
  );
}
