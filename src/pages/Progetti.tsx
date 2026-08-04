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
    text: 'text-brand-primary',
    soft: 'bg-brand-primary/10',
    border: 'border-brand-primary',
    tick: 'text-brand-primary',
  },
  secondary: {
    text: 'text-brand-secondary',
    soft: 'bg-brand-secondary/10',
    border: 'border-brand-secondary',
    tick: 'text-brand-secondary',
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

      <section className="relative bg-brand-light py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading eyebrow="I nostri progetti" className="mb-20">
            Percorsi mirati, <span className="text-brand-secondary">non pacchetti</span>
          </SectionHeading>

          <div className="space-y-20 md:space-y-28">
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
                  className={`scroll-mt-32 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                    reversed ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <div className="relative h-[320px] md:h-[420px] flex items-center justify-center">
                    <div
                      className="absolute inset-0 max-w-[460px] mx-auto bg-gradient-to-tr from-brand-primary/40 to-brand-secondary/40 animate-blob"
                      style={{ borderRadius: '50% 50% 50% 50% / 55% 45% 45% 55%' }}
                    ></div>
                    <div
                      className="absolute inset-[4%] max-w-[430px] mx-auto overflow-hidden border-[5px] border-white shadow-xl bg-white"
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

                  <div>
                    <span
                      className={`inline-block ${a.soft} ${a.text} text-xs tracking-widest uppercase font-medium px-4 py-1.5 rounded-full mb-5`}
                    >
                      {progetto.evidenza}
                    </span>

                    <h3 className="text-3xl md:text-4xl font-sans font-light text-brand-dark leading-tight mb-5">
                      Progetto <span className={`${a.text} font-medium`}>{progetto.titolo}</span>
                    </h3>

                    <p className="text-gray-600 font-light leading-relaxed mb-8">
                      {progetto.descrizione}
                    </p>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
