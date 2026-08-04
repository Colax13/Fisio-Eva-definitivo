import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import PageHero from '../components/layout/PageHero';
import CtaBand from '../components/sections/CtaBand';
import usePageMeta from '../hooks/usePageMeta';
import { faq } from '../data/site';

const categorie = ['Tutte', 'Generali', 'Prima visita', 'Trattamenti'] as const;

export default function Faq() {
  const [categoria, setCategoria] = useState<(typeof categorie)[number]>('Tutte');
  const [aperta, setAperta] = useState<string | null>(faq[0].domanda);

  usePageMeta(
    'Domande frequenti — FisioEVA | Fisioterapia e Osteopatia a Roma',
    'Serve la prescrizione? Quanto dura una seduta? Quante sedute servono? Le risposte alle domande più comuni sui trattamenti dello studio FisioEVA.'
  );

  const visibili = categoria === 'Tutte' ? faq : faq.filter((f) => f.categoria === categoria);

  return (
    <>
      <PageHero
        eyebrow="Domande frequenti"
        title={
          <>
            Le risposte alle <span className="text-brand-primary">domande più comuni</span>
          </>
        }
        subtitle="Se quello che cerchi non è qui, scrivici: rispondiamo volentieri anche alle domande che non abbiamo previsto."
        breadcrumb="FAQ"
      />

      <section className="relative bg-brand-light py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div className="flex flex-wrap items-center justify-center gap-2 mb-14 bg-white/70 backdrop-blur-md rounded-full p-2 w-max mx-auto border border-white shadow-sm">
            {categorie.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoria(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  categoria === cat
                    ? 'bg-brand-dark text-white'
                    : 'text-brand-dark hover:bg-brand-primary/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {visibili.map((item, idx) => {
              const isOpen = aperta === item.domanda;

              return (
                <motion.div
                  key={item.domanda}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: Math.min(idx, 6) * 0.05 }}
                  className={`rounded-[1.75rem] overflow-hidden border transition-colors duration-300 ${
                    isOpen
                      ? 'bg-brand-dark border-brand-dark'
                      : 'bg-white/80 backdrop-blur-md border-white shadow-sm hover:shadow-md'
                  }`}
                >
                  <button
                    onClick={() => setAperta(isOpen ? null : item.domanda)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center gap-5 px-6 md:px-8 py-6 text-left"
                  >
                    <span className="flex-1">
                      <span
                        className={`block text-[10px] tracking-widest uppercase font-medium mb-1.5 ${
                          isOpen ? 'text-brand-primary' : 'text-brand-secondary'
                        }`}
                      >
                        {item.categoria}
                      </span>
                      <span
                        className={`block font-sans font-medium text-lg leading-snug ${
                          isOpen ? 'text-white' : 'text-brand-dark'
                        }`}
                      >
                        {item.domanda}
                      </span>
                    </span>

                    <span
                      className={`w-10 h-10 rounded-full shrink-0 flex items-center justify-center transition-colors duration-300 ${
                        isOpen
                          ? 'bg-brand-primary text-white'
                          : 'border border-gray-200 text-brand-dark'
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
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 md:px-8 pb-7 text-gray-300 font-light leading-relaxed">
                          {item.risposta}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand titolo="Hai una domanda che non trovi qui?" />
    </>
  );
}
