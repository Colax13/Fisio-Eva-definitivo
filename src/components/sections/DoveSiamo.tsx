import { motion } from 'motion/react';
import { Clock, MapPin, Mail } from 'lucide-react';
import { studio } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';
import SectionHeading from '../ui/SectionHeading';

/**
 * Dove siamo + prenota, in chiusura di home.
 *
 * La mappa arriva da Google e può impostare cookie: non si carica da sola.
 * Al suo posto ci sono indirizzo e un link per aprirla altrove — l'informazione
 * la trovi comunque, che è il punto della sezione.
 */
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${studio.address}, ${studio.city}`
)}`;

export default function DoveSiamo() {
  return (
    <section className="relative overflow-hidden bg-white px-5 py-16 sm:px-6 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-[10%] -bottom-[25%] h-[70%] w-[55%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading eyebrow="Dove siamo" accent="secondary" className="mb-10 md:mb-16">
          A Casalotti, in <span className="text-brand-secondary-ink">Via di Boccea 755</span>
        </SectionHeading>

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Le schede informative restano allineate a sinistra: sono
                indirizzi e orari, non messaggi — si leggono, non si declamano. */}
            <div className="flex items-start gap-4 rounded-[2rem] border border-white bg-white/80 p-6 shadow-xl backdrop-blur-md sm:gap-5 sm:p-7">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary-ink">
                <MapPin className="h-6 w-6" />
              </span>
              <div>
                <p className="mb-1 text-xs tracking-wider text-gray-600 uppercase">Indirizzo</p>
                <p className="text-lead font-sans font-bold text-brand-dark">{studio.address}</p>
                <p className="font-light text-gray-600">
                  {studio.city} ({studio.zone})
                </p>
                <p className="mt-2 text-sm font-light text-gray-600">
                  Si arriva dal Raccordo, uscita Boccea. Servita dalle linee di superficie che
                  collegano Cornelia.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 rounded-[2rem] border border-white bg-white/80 p-6 shadow-xl backdrop-blur-md sm:gap-5 sm:p-7">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-secondary/10 text-brand-secondary-ink">
                <Clock className="h-6 w-6" />
              </span>
              <div className="flex-1">
                <p className="mb-2 text-xs tracking-wider text-gray-600 uppercase">Orari</p>
                {/* ⛔ Gli orari non sono ancora stati forniti: nessun valore inventato. */}
                <p className="font-light text-gray-600">In definizione.</p>
                <p className="mt-1 text-sm font-light text-gray-600">
                  Lo studio apre il 26 settembre 2026.
                </p>
              </div>
            </div>

            <a
              href={`mailto:${studio.email}`}
              className="group flex items-start gap-4 rounded-[2rem] border border-white bg-white/80 p-6 shadow-xl backdrop-blur-md transition-shadow duration-300 hover:shadow-2xl sm:gap-5 sm:p-7"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary-ink transition-transform duration-300 group-hover:scale-110">
                <Mail className="h-6 w-6" />
              </span>
              <div className="min-w-0">
                <p className="mb-1 text-xs tracking-wider text-gray-600 uppercase">Scrivici</p>
                <p className="font-sans font-medium break-all text-brand-dark transition-colors group-hover:text-brand-secondary-ink">
                  {studio.email}
                </p>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-center rounded-[2rem] bg-gradient-to-br from-[#2c2c2b] to-[#3d3d3c] px-6 py-10 text-center sm:px-10 md:px-14 md:py-14"
          >
            <span className="text-eyebrow mb-5 font-semibold text-brand-primary uppercase">
              Prima valutazione
            </span>

            <h3 className="text-h3 mb-4 font-sans font-light text-white">
              Non chiederti se è il momento di curarti.{' '}
              <span className="text-brand-primary">Chiediti da quanto lo stai rimandando.</span>
            </h3>

            <p className="mx-auto mb-8 max-w-sm leading-relaxed font-light text-gray-300">
              Raccontaci cosa senti e da quanto tempo. Da lì capiamo insieme come impostare il
              percorso.
            </p>

            <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
              <ArrowButton to="/contatti">Prenota la prima valutazione</ArrowButton>
              <a
                href={MAPS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-full border-2 border-white/40 px-8 text-sm font-medium text-white transition-colors duration-300 hover:bg-white hover:text-brand-dark sm:w-max"
              >
                Apri la mappa
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
