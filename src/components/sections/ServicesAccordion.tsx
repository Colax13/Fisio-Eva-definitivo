import { useState } from 'react';
import { Check, Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { servizi } from '../../data/site';

// Full class strings — Tailwind only emits classes it can see literally in the source.
const accenti = {
  primary: {
    solid: 'bg-brand-primary text-white',
    text: 'text-brand-primary',
    dot: 'bg-brand-primary/20',
    tick: 'text-brand-primary',
  },
  secondary: {
    solid: 'bg-brand-secondary text-white',
    text: 'text-brand-secondary',
    dot: 'bg-brand-secondary/20',
    tick: 'text-brand-secondary',
  },
};

export default function ServicesAccordion() {
  const [aperto, setAperto] = useState<string | null>(servizi[0].slug);

  return (
    <div className="max-w-5xl mx-auto">
      {servizi.map((servizio, idx) => {
        const isOpen = aperto === servizio.slug;
        const a = accenti[servizio.accent];

        return (
          <motion.div
            key={servizio.slug}
            id={servizio.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            className="scroll-mt-32 border-b border-gray-200 last:border-b-0"
          >
            <button
              onClick={() => setAperto(isOpen ? null : servizio.slug)}
              aria-expanded={isOpen}
              className="w-full flex items-center gap-5 md:gap-8 py-7 text-left group"
            >
              <span
                className={`w-11 h-11 rounded-full shrink-0 flex items-center justify-center font-sans font-bold text-sm transition-colors duration-300 ${
                  isOpen
                    ? a.solid
                    : 'bg-white text-brand-dark border border-gray-200 group-hover:border-brand-primary'
                }`}
              >
                {String(idx + 1).padStart(2, '0')}
              </span>

              <span className="flex-1 min-w-0">
                <span
                  className={`block font-sans text-xl md:text-2xl font-medium leading-snug transition-colors duration-300 ${
                    isOpen ? a.text : 'text-brand-dark group-hover:text-brand-secondary'
                  }`}
                >
                  {servizio.titolo}
                </span>
                <span className="block text-gray-500 font-light text-sm mt-1">
                  {servizio.sottotitolo}
                </span>
              </span>

              <span
                className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center transition-colors duration-300 ${
                  isOpen
                    ? a.solid
                    : 'border border-gray-200 text-brand-dark group-hover:border-brand-primary'
                }`}
              >
                {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-10 md:pl-16">
                    <div>
                      <p className="text-gray-600 font-light leading-relaxed mb-6">
                        {servizio.descrizione}
                      </p>
                      <ul className="space-y-3">
                        {servizio.punti.map((punto) => (
                          <li key={punto} className="flex items-start gap-3">
                            <span
                              className={`w-5 h-5 rounded-full ${a.dot} flex items-center justify-center shrink-0 mt-0.5`}
                            >
                              <Check className={`w-3 h-3 ${a.tick}`} strokeWidth={3} />
                            </span>
                            <span className="text-brand-dark font-light">{punto}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rounded-[2rem] overflow-hidden h-64 md:h-full min-h-[240px] shadow-lg">
                      <img
                        src={servizio.image}
                        alt={servizio.titolo}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}
