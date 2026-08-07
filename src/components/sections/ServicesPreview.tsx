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
    iconText: 'text-brand-primary-ink',
    dot: 'bg-brand-primary/20',
    dotHover: 'group-hover:bg-brand-primary',
    tick: 'text-brand-primary-ink',
  },
  {
    titolo: 'Terapie fisiche strumentali',
    icona: Sparkles,
    voci: trattamentiStrumentali,
    iconBg: 'bg-brand-secondary/10',
    iconText: 'text-brand-secondary-ink',
    dot: 'bg-brand-secondary/20',
    dotHover: 'group-hover:bg-brand-secondary',
    tick: 'text-brand-secondary-ink',
  },
];

export default function ServicesPreview() {
  return (
    <section className="relative overflow-hidden px-5 py-16 sm:px-6 md:py-24">
      <WaveBackground />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <SectionHeading eyebrow="I Nostri Trattamenti" className="mb-10 md:mb-16">
          Le mani, prima di <span className="text-brand-primary-ink">ogni macchinario</span>
        </SectionHeading>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-12">
          {colonne.map((colonna, idx) => (
            <motion.div
              key={colonna.titolo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="rounded-[2rem] border border-white bg-white/80 p-6 shadow-xl backdrop-blur-md sm:p-8 md:p-10"
            >
              {/* L'intestazione della card è centrata sul telefono, in riga da
                  tablet in su: con una colonna sola l'icona di lato lasciava un
                  vuoto sulla destra del titolo. */}
              <div className="mb-6 flex flex-col items-center gap-3 text-center sm:flex-row sm:gap-4 sm:text-left md:mb-8">
                <div
                  className={`h-12 w-12 rounded-2xl ${colonna.iconBg} flex shrink-0 items-center justify-center ${colonna.iconText}`}
                >
                  <colonna.icona className="h-6 w-6" />
                </div>
                <h3 className="text-h3 font-sans font-semibold text-brand-dark">{colonna.titolo}</h3>
              </div>

              <ul className="space-y-3.5">
                {colonna.voci.map((voce) => (
                  <li key={voce} className="group flex items-start gap-3">
                    <span
                      className={`h-5 w-5 rounded-full ${colonna.dot} mt-0.5 flex shrink-0 items-center justify-center ${colonna.dotHover} transition-colors`}
                    >
                      <Check
                        className={`h-3 w-3 ${colonna.tick} transition-colors group-hover:text-white`}
                        strokeWidth={3}
                      />
                    </span>
                    <span className="text-body font-light text-gray-700">{voce}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center md:mt-14">
          <ArrowButton to="/servizi">Vedi tutti i servizi</ArrowButton>
        </div>
      </div>
    </section>
  );
}
