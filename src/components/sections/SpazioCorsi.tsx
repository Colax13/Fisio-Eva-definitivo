import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { immagini } from '../../data/site';

/**
 * Il piano superiore.
 *
 * È un brand a sé: attività non sanitarie, normativa diversa, pubblico
 * diverso. Per questo il blocco ha un trattamento visivo distinto dal resto —
 * niente card in vetro, niente aloni: fondo pieno e forme squadrate. La
 * promessa non è "curarti" ma "stare bene, muoverti, continuare".
 *
 * ⛔ Il nome non è ancora confermato: sta in una costante sola, così quando la
 * decisione arriva si cambia in un punto.
 */
const SPAZIO_CORSI_NOME = 'LongEva';

const attivita = ['Posturale di gruppo', 'Yoga', 'Pilates'];

export default function SpazioCorsi() {
  return (
    <section className="relative bg-[#2c2c2b] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Immagine a filo, senza cornici morbide: il registro è un altro */}
        <div className="relative h-[300px] lg:h-auto lg:min-h-[520px]">
          <img
            src={immagini.postura}
            alt="Lo spazio corsi al piano superiore"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#2c2c2b]/40"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-8 py-16 md:px-14 md:py-24 flex flex-col justify-center"
        >
          <span className="text-white/50 text-xs tracking-[0.3em] uppercase mb-6">
            Il piano superiore
          </span>

          <h2 className="text-4xl md:text-5xl font-sans font-light text-white leading-tight mb-6">
            {SPAZIO_CORSI_NOME}
          </h2>

          <p className="text-gray-400 text-base font-light leading-relaxed mb-10 max-w-md">
            Non è fisioterapia, e non lo diventa. È il posto dove si continua a muoversi bene:
            quando il percorso clinico è finito, o quando non è mai servito.
          </p>

          <ul className="flex flex-wrap gap-3 mb-10">
            {attivita.map((voce) => (
              <li
                key={voce}
                className="border border-white/20 text-white/80 text-sm font-light px-5 py-2"
              >
                {voce}
              </li>
            ))}
          </ul>

          <Link
            to="/contatti"
            className="group inline-flex w-max items-center gap-3 text-white text-sm font-medium border-b border-white/30 pb-2 transition-colors hover:border-white"
          >
            Chiedi informazioni
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
