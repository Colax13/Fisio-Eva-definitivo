import { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { immagini, recensioni } from '../../data/site';

const iniziali = (nome: string) =>
  nome
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const vai = useCallback(
    (delta: number) => setIndex((i) => (i + delta + recensioni.length) % recensioni.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => vai(1), 7000);
    return () => clearInterval(timer);
  }, [paused, vai]);

  const attuale = recensioni[index];

  return (
    <section
      className="bg-brand-secondary relative flex items-center min-h-[620px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background photo fading into the teal panel */}
      <div className="absolute inset-0 z-0 flex justify-end">
        <motion.img
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src={immagini.trattamento}
          alt=""
          aria-hidden="true"
          className="w-full lg:w-[60%] h-full object-cover object-right"
        />
        <div className="absolute inset-y-0 left-0 w-full lg:w-[50%] bg-brand-secondary"></div>
        <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] bg-gradient-to-r from-brand-secondary via-brand-secondary/70 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 py-24 relative z-10">
        <div className="w-full lg:w-[52%] lg:pr-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-white"></div>
            <span className="text-white text-xs tracking-widest uppercase font-medium">
              Testimonianze
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-sans font-light text-white leading-tight mb-10">
            Le storie di chi ha <br />
            <span className="text-brand-dark font-medium">ritrovato il sorriso</span>
          </h2>

          {/* Fixed height keeps the controls from jumping between quotes */}
          <div className="relative min-h-[290px] sm:min-h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
              >
                <Quote className="w-8 h-8 text-white/40 mb-4" fill="currentColor" />

                <blockquote className="text-white text-lg md:text-xl leading-relaxed font-light mb-6">
                  {attuale.testo}
                </blockquote>

                <div className="flex gap-1 mb-6" aria-label={`${attuale.stelle} stelle su 5`}>
                  {Array.from({ length: attuale.stelle }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-white text-white" />
                  ))}
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-brand-dark text-white flex items-center justify-center font-sans font-bold text-lg shrink-0">
                    {iniziali(attuale.autore)}
                  </div>
                  <div>
                    <p className="text-white font-medium text-lg">{attuale.autore}</p>
                    <p className="text-brand-dark/80 text-sm font-medium mt-0.5">
                      {attuale.contesto}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mt-10">
            <div className="flex items-center gap-2">
              {recensioni.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Vai alla recensione ${i + 1}`}
                  aria-current={i === index}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i === index ? 'w-10 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => vai(-1)}
                aria-label="Recensione precedente"
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-brand-secondary transition-all shadow-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => vai(1)}
                aria-label="Recensione successiva"
                className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white hover:bg-white hover:text-brand-primary transition-all shadow-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
