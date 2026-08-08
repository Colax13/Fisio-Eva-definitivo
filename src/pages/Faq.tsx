import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import PageHero from '../components/layout/PageHero';
import CtaBand from '../components/sections/CtaBand';
import usePageMeta from '../hooks/usePageMeta';
import FilterPills from '../components/ui/FilterPills';
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

      <section className="relative overflow-hidden bg-brand-light px-5 py-16 sm:px-6 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <FilterPills
            voci={categorie}
            attiva={categoria}
            onSelect={(v) => setCategoria(v as (typeof categorie)[number])}
            etichetta="Filtra le domande per argomento"
            className="mb-10 md:mb-14"
          />

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
                    className="flex w-full items-center gap-4 px-5 py-5 text-left sm:gap-5 sm:px-6 md:px-8 md:py-6"
                  >
                    <span className="flex-1">
                      <span
                        className={`text-eyebrow mb-1.5 block font-semibold uppercase ${
                          isOpen ? 'text-brand-primary' : 'text-brand-secondary-ink'
                        }`}
                      >
                        {item.categoria}
                      </span>
                      <span
                        className={`block font-sans text-base leading-snug font-medium sm:text-lg ${
                          isOpen ? 'text-white' : 'text-brand-dark'
                        }`}
                      >
                        {item.domanda}
                      </span>
                    </span>

                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
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
                        <p className="px-5 pb-6 leading-relaxed font-light text-gray-300 sm:px-6 md:px-8 md:pb-7">
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
