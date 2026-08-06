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
    <section className="relative bg-white overflow-hidden py-24 md:py-32 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-[25%] -right-[10%] w-[55%] h-[70%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading eyebrow="Dove siamo" className="mb-16">
          A Casalotti, in <span className="text-brand-secondary">Via di Boccea 755</span>
        </SectionHeading>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-7 shadow-xl border border-white flex items-start gap-5">
              <span className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </span>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Indirizzo</p>
                <p className="font-sans font-bold text-brand-dark text-lg">{studio.address}</p>
                <p className="text-gray-600 font-light">
                  {studio.city} ({studio.zone})
                </p>
                <p className="text-gray-500 font-light text-sm mt-2">
                  Si arriva dal Raccordo, uscita Boccea. Servita dalle linee di superficie che
                  collegano Cornelia.
                </p>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-7 shadow-xl border border-white flex items-start gap-5">
              <span className="w-12 h-12 rounded-2xl bg-brand-secondary/10 text-brand-secondary flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </span>
              <div className="flex-1">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Orari</p>
                {/* ⛔ Gli orari non sono ancora stati forniti: nessun valore inventato. */}
                <p className="text-gray-600 font-light">In definizione.</p>
                <p className="text-gray-500 font-light text-sm mt-1">
                  Lo studio apre il 26 settembre 2026.
                </p>
              </div>
            </div>

            <a
              href={`mailto:${studio.email}`}
              className="group bg-white/80 backdrop-blur-md rounded-[2rem] p-7 shadow-xl border border-white flex items-start gap-5 hover:shadow-2xl transition-shadow duration-300"
            >
              <span className="w-12 h-12 rounded-2xl bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300">
                <Mail className="w-6 h-6" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Scrivici</p>
                <p className="font-sans font-medium text-brand-dark break-all group-hover:text-brand-secondary transition-colors">
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
            className="rounded-[2rem] bg-gradient-to-br from-[#2c2c2b] to-[#3d3d3c] p-10 md:p-14 flex flex-col justify-center text-center"
          >
            <span className="text-brand-primary text-xs tracking-widest uppercase font-medium mb-6">
              Prima valutazione
            </span>

            <h3 className="text-2xl md:text-3xl font-sans font-light text-white leading-snug mb-5">
              Non chiederti se è il momento di curarti.
              <br />
              <span className="text-brand-primary">
                Chiediti da quanto lo stai rimandando.
              </span>
            </h3>

            <p className="text-gray-400 font-light leading-relaxed mb-10 max-w-sm mx-auto">
              Raccontaci cosa senti e da quanto tempo. Da lì capiamo insieme come impostare il
              percorso.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <ArrowButton to="/contatti">Prenota la prima valutazione</ArrowButton>
              <a
                href={MAPS}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-max items-center rounded-full border-2 border-white/30 px-8 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-white hover:text-brand-dark"
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
