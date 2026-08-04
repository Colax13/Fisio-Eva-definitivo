import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import Intestazione from '../components/layout/Intestazione';
import Bottone from '../components/ui/Bottone';
import { faqGenerali } from '../content/testi';
import { PRENOTAZIONE_LABEL, PRENOTAZIONE_URL } from '../config/site';
import { schemaBreadcrumb, schemaFaq, schemaStudio, usePageSeo } from '../lib/seo';

const categorie = ['Tutte', 'Prima visita', 'Come lavoriamo', 'Pratiche'] as const;

export default function Faq() {
  const [categoria, setCategoria] = useState<(typeof categorie)[number]>('Tutte');
  const [aperta, setAperta] = useState<string | null>(faqGenerali[0].domanda);

  const briciole = [
    { nome: 'Home', path: '/' },
    { nome: 'Domande frequenti', path: '/faq' },
  ];

  usePageSeo({
    title: 'Domande frequenti | FisioEva, Casalotti Roma',
    description:
      'Serve la prescrizione? Quante sedute servono? Cosa succede alla prima valutazione? Le risposte alle domande più comuni su fisioterapia e osteopatia.',
    path: '/faq',
    schema: [
      schemaStudio(),
      schemaBreadcrumb(briciole),
      schemaFaq(faqGenerali.map((f) => ({ q: f.domanda, a: f.risposta }))),
    ],
  });

  const visibili =
    categoria === 'Tutte' ? faqGenerali : faqGenerali.filter((f) => f.categoria === categoria);

  return (
    <>
      <Intestazione
        occhiello="Domande frequenti"
        titolo="Le risposte alle domande che ci fanno più spesso"
        sottotitolo="Se quello che cerchi non è qui, scrivici: rispondiamo volentieri anche alle domande che non abbiamo previsto."
        briciole={briciole}
      />

      <section className="bg-brand-light px-6 py-16 md:py-20">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto mb-12 flex w-max max-w-full flex-wrap justify-center gap-1.5 rounded-full border border-brand-primary/25 bg-white p-1.5">
            {categorie.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoria(cat)}
                aria-pressed={categoria === cat}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  categoria === cat
                    ? 'bg-brand-dark text-white'
                    : 'text-brand-dark hover:bg-brand-primary/15'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <dl className="space-y-3">
            {visibili.map((item) => {
              const aperto = aperta === item.domanda;

              return (
                <div
                  key={item.domanda}
                  className={`overflow-hidden rounded-[1.75rem] border transition-colors ${
                    aperto
                      ? 'border-brand-dark bg-brand-dark'
                      : 'border-brand-primary/25 bg-white hover:border-brand-primary'
                  }`}
                >
                  <dt>
                    <button
                      onClick={() => setAperta(aperto ? null : item.domanda)}
                      aria-expanded={aperto}
                      className="flex w-full items-center gap-5 px-6 py-5 text-left md:px-8"
                    >
                      <span className="flex-1">
                        <span
                          className={`mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] ${
                            aperto ? 'text-brand-primary' : 'text-brand-dark/50'
                          }`}
                        >
                          {item.categoria}
                        </span>
                        <span
                          className={`block text-lg font-semibold leading-snug ${
                            aperto ? 'text-white' : 'text-brand-dark'
                          }`}
                        >
                          {item.domanda}
                        </span>
                      </span>

                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors ${
                          aperto
                            ? 'bg-brand-primary text-brand-dark'
                            : 'border border-brand-primary/40 text-brand-dark'
                        }`}
                      >
                        {aperto ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                      </span>
                    </button>
                  </dt>

                  <AnimatePresence initial={false}>
                    {aperto && (
                      <motion.dd
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-7 font-light leading-relaxed text-white/75 md:px-8">
                          {item.risposta}
                        </p>
                      </motion.dd>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </dl>

          <div className="mt-14 flex flex-wrap justify-center gap-4">
            <Bottone href={PRENOTAZIONE_URL}>{PRENOTAZIONE_LABEL}</Bottone>
            <Bottone to="/contatti" variante="secondaria" icona={null}>
              Vai ai contatti
            </Bottone>
          </div>
        </div>
      </section>
    </>
  );
}
