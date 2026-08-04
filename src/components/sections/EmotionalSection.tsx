import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { frasi, immagini } from '../../data/site';

/** Splits the phrase so the highlighted words can carry the accent colour. */
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
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % frasi.length), 6500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center py-32 px-6 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${immagini.calma})` }}
      ></div>
      <div className="absolute inset-0 bg-brand-dark/70"></div>

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="w-16 h-[1px] bg-brand-secondary mb-10"
        ></motion.div>

        {/* Fixed height so the rotating phrases don't shift the layout */}
        <div className="min-h-[220px] md:min-h-[260px] flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={index}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="text-3xl md:text-5xl lg:text-6xl font-sans font-light text-white leading-[1.25] max-w-4xl"
            >
              <Frase {...frasi[index]} />
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-2 mt-4 mb-12">
          {frasi.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Mostra la frase ${i + 1}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? 'w-8 bg-brand-secondary' : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-4 text-xs md:text-sm tracking-[0.3em] uppercase text-brand-secondary font-medium"
        >
          <span>Muoviti</span>
          <span className="w-1 h-1 rounded-full bg-brand-secondary"></span>
          <span>Respira</span>
          <span className="w-1 h-1 rounded-full bg-brand-secondary"></span>
          <span>Vivi</span>
        </motion.div>
      </div>
    </section>
  );
}
