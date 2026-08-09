import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { immagini, studio } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';

/**
 * Dove siamo, in chiusura di home.
 *
 * Un blocco solo: la foto a sinistra, i dati a destra in righe scarne. Prima
 * erano tre card impilate più un riquadro scuro, e sembravano tre cose diverse
 * messe vicine.
 *
 * La mappa non si carica da sola — arriva da Google e imposterebbe cookie: c'è
 * il link per aprirla, che è quello che serve davvero per venire in studio.
 */
const MAPS = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${studio.address}, ${studio.city}`
)}`;

const righe = [
  { voce: 'Indirizzo', valore: `${studio.address}, ${studio.city}` },
  { voce: 'Zona', valore: `${studio.zone} — si arriva dal Raccordo, uscita Boccea` },
  // ⛔ Orari non ancora forniti: niente valori inventati.
  { voce: 'Orari', valore: 'In definizione' },
];

export default function DoveSiamo() {
  return (
    <section className="relative bg-white/70 backdrop-blur-[2px] overflow-hidden py-24 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 rounded-[2.5rem] overflow-hidden border border-brand-primary/15 shadow-xl"
        >
          <a
            href={MAPS}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative min-h-[280px] lg:min-h-[460px]"
          >
            <img
              src={immagini.sede}
              alt={`Lo studio FisioEVA in ${studio.address}`}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/70 via-brand-dark/20 to-transparent"></div>

            <span className="absolute bottom-7 left-7 inline-flex items-center gap-2 text-white text-sm font-medium">
              Apri la mappa
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </a>

          <div className="bg-brand-light p-10 md:p-14 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">
                Dove siamo
              </span>
            </div>

            <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-dark leading-tight mb-10">
              A Casalotti, in <span className="text-brand-primary">Via di Boccea</span>
            </h2>

            <dl className="space-y-5 mb-10">
              {righe.map((riga) => (
                <div key={riga.voce} className="border-b border-brand-dark/10 pb-4">
                  <dt className="text-[11px] text-gray-500 uppercase tracking-wider mb-1">
                    {riga.voce}
                  </dt>
                  <dd className="text-brand-dark font-light">{riga.valore}</dd>
                </div>
              ))}
            </dl>

            <ArrowButton to="/contatti">Prenota la prima valutazione</ArrowButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
