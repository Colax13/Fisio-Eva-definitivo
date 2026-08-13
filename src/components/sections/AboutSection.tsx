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
      className={`relative bg-brand-light/75 backdrop-blur-[2px] z-20 px-6 py-24 md:py-32 ${
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
              <span className="text-2xl font-sans font-bold">20+</span>
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
            <p className="text-brand-primary-ink text-eyebrow font-semibold uppercase mb-6">
              Chi siamo
            </p>

            <h2 className="text-h2 font-sans font-bold text-brand-dark mb-6">
              Uno studio costruito <span className="text-brand-primary">su di te</span>
            </h2>

            {/* Un paragrafo solo, stretto. Tutto il resto — formazione, titoli,
                anni di pratica — vive nelle pagine Team e Chi siamo: qui
                allungherebbe e basta. */}
            <p className="text-brand-dark font-light leading-relaxed text-lg max-w-md">
              Tre professioniste che hanno aperto il loro studio nel quartiere in cui lavorano da
              sempre. Ci occupiamo di tutto ciò che riguarda il movimento con un metodo che parte
              sempre dalla persona: ascoltare il problema, capirne le cause e costruire insieme un
              percorso personale e su misura.
            </p>

            {/*
             * Il team in home sta qui: tre ritratti tondi e un link.
             * La sezione completa con tutte le card vive nella pagina Team —
             * ripeterla per intero anche in home la faceva pesare il doppio di
             * quello che serve a questo punto della pagina.
             */}
            <div className="mt-10 flex flex-wrap items-center gap-5 border-t border-brand-dark/10 pt-8">
              <div className="flex -space-x-4">
                {team.map((m) =>
                  m.photo ? (
                    <img
                      key={m.slug}
                      src={m.photo}
                      alt={m.name}
                      className="h-14 w-14 rounded-full border-2 border-brand-light object-cover"
                    />
                  ) : (
                    <span
                      key={m.slug}
                      className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-brand-light bg-brand-primary/15 font-sans text-sm font-bold text-brand-primary-ink"
                      role="img"
                      aria-label={`Ritratto non ancora disponibile di ${m.name}`}
                    >
                      {m.name
                        .replace('Dott.ssa ', '')
                        .split(' ')
                        .map((p) => p[0])
                        .join('')
                        .slice(0, 2)
                        .toUpperCase()}
                    </span>
                  )
                )}
              </div>

              <div>
                <p className="text-xs tracking-wider text-gray-500 uppercase">Il nostro team</p>
                <p className="font-sans font-bold text-brand-dark">Azzurra, Elisa e Veronica</p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <ArrowButton to="/team">Scopri il team</ArrowButton>
              {cta && (
                <ArrowButton to={cta.to} variant="secondary">
                  {cta.label}
                </ArrowButton>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
