import { Activity, Check, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { trattamentiManuali, trattamentiStrumentali } from '../../data/site';
import { WaveBackground } from '../WaveBackground';
import ArrowButton from '../ui/ArrowButton';
import SectionHeading from '../ui/SectionHeading';

const colonne = [
  {
    titolo: 'Terapia manuale e riabilitazione',
    icona: Activity,
    voci: trattamentiManuali,
    iconBg: 'bg-brand-primary/10',
    iconText: 'text-brand-primary',
    dot: 'bg-brand-primary/20',
    dotHover: 'group-hover:bg-brand-primary',
    tick: 'text-brand-primary',
  },
  {
    titolo: 'Terapie fisiche strumentali',
    icona: Sparkles,
    voci: trattamentiStrumentali,
    iconBg: 'bg-brand-secondary/10',
    iconText: 'text-brand-secondary',
    dot: 'bg-brand-secondary/20',
    dotHover: 'group-hover:bg-brand-secondary',
    tick: 'text-brand-secondary',
  },
];

export default function ServicesPreview() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <WaveBackground />

      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <SectionHeading eyebrow="I Nostri Trattamenti" className="mb-16">
          Le mani, prima di <span className="text-brand-primary">ogni macchinario</span>
        </SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {colonne.map((colonna, idx) => (
            <motion.div
              key={colonna.titolo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white/80 backdrop-blur-md rounded-[2rem] p-8 md:p-10 shadow-xl border border-white"
            >
              <div className="flex items-center gap-4 mb-8">
                <div
                  className={`w-12 h-12 rounded-2xl ${colonna.iconBg} flex items-center justify-center ${colonna.iconText}`}
                >
                  <colonna.icona className="w-6 h-6" />
                </div>
                <h3 className="text-xl md:text-2xl font-sans font-medium text-brand-dark leading-snug">
                  {colonna.titolo}
                </h3>
              </div>

              <ul className="space-y-4">
                {colonna.voci.map((voce) => (
                  <li key={voce} className="flex items-start gap-3 group">
                    <span
                      className={`w-5 h-5 rounded-full ${colonna.dot} flex items-center justify-center shrink-0 mt-0.5 ${colonna.dotHover} transition-colors`}
                    >
                      <Check
                        className={`w-3 h-3 ${colonna.tick} group-hover:text-white transition-colors`}
                        strokeWidth={3}
                      />
                    </span>
                    <span className="text-gray-700 font-light text-lg">{voce}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-14">
          <ArrowButton to="/servizi">Vedi tutti i servizi</ArrowButton>
        </div>
      </div>
    </section>
  );
}
