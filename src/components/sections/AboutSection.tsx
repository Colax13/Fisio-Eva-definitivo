import { motion } from 'motion/react';
import { immagini } from '../../data/site';
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
              Uno studio di donne, <span className="text-brand-primary">nato per le donne</span>
            </h2>

            {/* Un paragrafo solo, stretto. Tutto il resto — formazione, titoli,
                anni di pratica — vive nelle pagine Team e Chi siamo: qui
                allungherebbe e basta. */}
            <p className="text-brand-dark font-light leading-relaxed text-lg max-w-md">
              Tre professioniste che hanno aperto il loro studio nel quartiere in cui lavorano da
              sempre. Ci occupiamo di tutto quello che riguarda il movimento, ma con una
              specializzazione precisa: la salute della donna, in ogni fase della vita.
            </p>

            {cta && (
              <div className="mt-10">
                <ArrowButton to={cta.to}>{cta.label}</ArrowButton>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
