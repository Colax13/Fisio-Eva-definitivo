import { Activity, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import PageHero from '../components/layout/PageHero';
import ServicesAccordion from '../components/sections/ServicesAccordion';
import PercorsoCura from '../components/sections/PercorsoCura';
import CtaBand from '../components/sections/CtaBand';
import SectionHeading from '../components/ui/SectionHeading';
import usePageMeta from '../hooks/usePageMeta';
import { immagini, trattamentiManuali, trattamentiStrumentali } from '../data/site';

const elenchi = [
  {
    titolo: 'Terapia manuale e riabilitazione',
    icona: Activity,
    voci: trattamentiManuali,
    iconBg: 'bg-brand-primary/10',
    iconText: 'text-brand-primary',
    bullet: 'bg-brand-primary',
  },
  {
    titolo: 'Terapie fisiche strumentali',
    icona: Sparkles,
    voci: trattamentiStrumentali,
    iconBg: 'bg-brand-secondary/10',
    iconText: 'text-brand-secondary',
    bullet: 'bg-brand-secondary',
  },
];

export default function Servizi() {
  usePageMeta(
    'Servizi e Trattamenti — FisioEVA | Fisioterapia e Osteopatia a Roma',
    'Terapia manuale, osteopatia, riabilitazione post-chirurgica e sportiva, ginnastica posturale, tecarterapia, laser ad alta potenza e altre terapie strumentali.'
  );

  return (
    <>
      <PageHero
        eyebrow="I nostri trattamenti"
        title={
          <>
            Eccellenza e cura per la tua <span className="text-brand-primary">salute</span>
          </>
        }
        subtitle="Dalla valutazione osteopatica alle terapie strumentali: ogni trattamento entra in un percorso costruito su di te, mai al contrario."
        breadcrumb="Servizi"
        image={immagini.manuale}
      />

      <section className="relative bg-brand-light py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[70%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading eyebrow="Aree di intervento" className="mb-16">
            Il tuo percorso verso <span className="text-brand-primary">il recupero</span> parte da
            qui
          </SectionHeading>

          <ServicesAccordion />
        </div>
      </section>

      {/* Elenco completo */}
      <section className="relative bg-white py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <SectionHeading eyebrow="Elenco completo" className="mb-16">
            Tutto quello che <span className="text-brand-secondary">trovi in studio</span>
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {elenchi.map((elenco, idx) => (
              <motion.div
                key={elenco.titolo}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-brand-light rounded-[2rem] p-8 md:p-10 border border-gray-100"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className={`w-12 h-12 rounded-2xl ${elenco.iconBg} ${elenco.iconText} flex items-center justify-center`}
                  >
                    <elenco.icona className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-sans font-medium text-brand-dark leading-snug">
                    {elenco.titolo}
                  </h3>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
                  {elenco.voci.map((voce) => (
                    <li key={voce} className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 rounded-full ${elenco.bullet} shrink-0`}></span>
                      <span className="text-gray-700 font-light">{voce}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PercorsoCura />
      <CtaBand titolo="Non sai da quale trattamento partire?" />
    </>
  );
}
