import { Check } from 'lucide-react';
import { motion } from 'motion/react';
import PageHero from '../components/layout/PageHero';
import EmotionalSection from '../components/sections/EmotionalSection';
import CtaBand from '../components/sections/CtaBand';
import SectionHeading from '../components/ui/SectionHeading';
import usePageMeta from '../hooks/usePageMeta';
import { immagini, progetti } from '../data/site';

const accenti = {
  primary: {
    text: 'text-brand-primary-ink',
    soft: 'bg-brand-primary/10',
    border: 'border-brand-primary',
    tick: 'text-brand-primary-ink',
  },
  secondary: {
    text: 'text-brand-secondary-ink',
    soft: 'bg-brand-secondary/10',
    border: 'border-brand-secondary',
    tick: 'text-brand-secondary-ink',
  },
};

export default function Progetti() {
  usePageMeta(
    'Progetti — FisioEVA | Percorsi dedicati a Roma',
    'Psicomotricità, Donna e Benessere, Postura e Movimento, Terza Età Attiva: i percorsi dedicati dello studio FisioEVA a Roma Casalotti.'
  );

  return (
    <>
      <PageHero
        eyebrow="Percorsi dedicati"
        title={
          <>
            Progetti per il tuo <span className="text-brand-primary">benessere globale</span>
          </>
        }
        subtitle="Quattro percorsi pensati per fasi e bisogni diversi della vita, dai primi anni alla terza età."
        breadcrumb="Progetti"
        image={immagini.postura}
      />

      <section className="relative overflow-hidden bg-brand-light px-5 py-16 sm:px-6 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading eyebrow="I nostri progetti" className="mb-12 md:mb-20">
            Percorsi mirati, <span className="text-brand-secondary-ink">non pacchetti</span>
          </SectionHeading>

          <div className="space-y-14 md:space-y-28">
            {progetti.map((progetto, idx) => {
              const a = accenti[progetto.accent];
              const reversed = idx % 2 === 1;

              return (
                <motion.article
                  key={progetto.slug}
                  id={progetto.slug}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7 }}
                  className={`grid scroll-mt-32 grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-16 ${
                    reversed ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div className="relative mx-auto flex aspect-square w-full max-w-[280px] items-center justify-center sm:max-w-[420px] lg:aspect-auto lg:h-[420px] lg:max-w-[460px]">
                    <div
                      className="animate-blob absolute inset-0 mx-auto bg-gradient-to-tr from-brand-primary/40 to-brand-secondary/40"
                      style={{ borderRadius: '50% 50% 50% 50% / 55% 45% 45% 55%' }}
                    ></div>
                    <div
                      className="absolute inset-[4%] mx-auto overflow-hidden border-[5px] border-white bg-white shadow-xl"
                      style={{ borderRadius: '55% 45% 45% 55% / 50% 50% 50% 50%' }}
                    >
                      <img
                        src={progetto.image}
                        alt={progetto.titolo}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="text-center lg:text-left">
                    <span
                      className={`inline-block ${a.soft} ${a.text} text-eyebrow mb-4 rounded-full px-4 py-1.5 font-semibold uppercase`}
                    >
                      {progetto.evidenza}
                    </span>

                    <h3 className="text-h2 mb-4 font-sans font-light text-brand-dark">
                      Progetto <span className={`${a.text} font-medium`}>{progetto.titolo}</span>
                    </h3>

                    <p className="text-body mb-7 leading-relaxed font-light text-gray-600">
                      {progetto.descrizione}
                    </p>

                    <ul className="mx-auto grid max-w-md grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:mx-0 lg:max-w-none">
                      {progetto.benefici.map((beneficio) => (
                        <li key={beneficio} className="flex items-center gap-3">
                          <span
                            className={`w-5 h-5 rounded-full border ${a.border} flex items-center justify-center shrink-0`}
                          >
                            <Check className={`w-3 h-3 ${a.tick}`} strokeWidth={2.5} />
                          </span>
                          <span className="text-brand-dark font-light text-sm">{beneficio}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <EmotionalSection />
      <CtaBand titolo="Quale percorso fa per te?" />
    </>
  );
}
