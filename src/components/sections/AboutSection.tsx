import { motion } from 'motion/react';
import { immagini, team } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';

type Props = {
  /** The home page tucks this section under the hero with a rounded lip. */
  overlap?: boolean;
  cta?: { label: string; to: string } | null;
};

export default function AboutSection({ overlap = false, cta = { label: 'Scopri di più', to: '/chi-siamo' } }: Props) {
  return (
    <section
      className={`relative bg-brand-light z-20 px-6 py-24 md:py-32 ${
        overlap ? 'rounded-t-[3rem] -mt-8 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <img
                src={immagini.trattamento}
                alt="Benessere e salute"
                className="w-full h-full object-cover rounded-3xl min-h-[400px]"
              />
              <div className="flex flex-col gap-4">
                <img
                  src={immagini.manuale}
                  alt="Terapia manuale"
                  className="w-full h-48 object-cover rounded-3xl"
                />
                <img
                  src={immagini.postura}
                  alt="Rieducazione motoria"
                  className="w-full h-48 object-cover rounded-3xl"
                />
              </div>
            </div>

            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-dark text-white w-32 h-32 rounded-full flex flex-col items-center justify-center text-center p-4 border-8 border-brand-light"
            >
              <span className="text-2xl font-sans font-bold">10+</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-300 mt-1">
                Anni di
                <br />
                Esperienza
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="lg:pl-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
              <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">
                Chi Siamo
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-sans font-bold text-brand-dark leading-tight mb-6">
              Dedicate a <span className="text-brand-primary">fornirti cure eccellenti</span> e
              riabilitazione
            </h2>

            <p className="text-brand-dark font-light leading-relaxed mb-6">
              I fisioterapisti sono guaritori silenziosi, che lavorano dietro le quinte per
              ripristinare la forza, alleviare il dolore e ricostruire il movimento. Non si limitano
              a curare gli infortuni: trasformano le vite.
            </p>

            <p className="text-gray-600 font-light leading-relaxed mb-12">
              Dopo anni passati all'interno di FisioLab Casalotti, ci siamo spostate nel nostro nuovo
              studio: le stesse mani, la stessa cura di sempre, in uno spazio pensato per voi.
            </p>

            <div className="flex items-center justify-between border-t border-gray-200 pt-8">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  {team
                    .filter((m) => m.photo)
                    .map((m) => (
                      <img
                        key={m.slug}
                        src={m.photo}
                        alt={m.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-brand-light"
                      />
                    ))}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                    Il Nostro Team
                  </p>
                  <p className="font-sans font-bold text-brand-dark">Azzurra, Elisa e Veronica</p>
                </div>
              </div>
            </div>

            {cta && (
              <div className="mt-12">
                <ArrowButton to={cta.to}>{cta.label}</ArrowButton>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
