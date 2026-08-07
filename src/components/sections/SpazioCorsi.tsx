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
    <section className="relative overflow-hidden bg-[#2c2c2b]">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Immagine a filo, senza cornici morbide: il registro è un altro */}
        <div className="relative h-[220px] sm:h-[300px] lg:h-auto lg:min-h-[520px]">
          <img
            src={immagini.postura}
            alt="Lo spazio corsi al piano superiore"
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-[#2c2c2b]/40"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center px-5 py-14 text-center sm:px-8 md:px-14 md:py-24 lg:text-left"
        >
          <span className="mb-5 text-xs font-semibold tracking-[0.3em] text-white/60 uppercase">
            Il piano superiore
          </span>

          <h2 className="text-h2 mb-5 font-sans font-light text-white">{SPAZIO_CORSI_NOME}</h2>

          <p className="text-lead mx-auto mb-8 max-w-md font-light text-gray-300 lg:mx-0">
            Non è fisioterapia, e non lo diventa. È il posto dove si continua a muoversi bene:
            quando il percorso clinico è finito, o quando non è mai servito.
          </p>

          <ul className="mb-8 flex flex-wrap justify-center gap-2.5 lg:justify-start">
            {attivita.map((voce) => (
              <li
                key={voce}
                className="border border-white/25 px-4 py-2 text-sm font-light text-white/85"
              >
                {voce}
              </li>
            ))}
          </ul>

          <Link
            to="/contatti"
            className="group mx-auto inline-flex min-h-12 w-max items-center gap-3 border-b border-white/40 text-sm font-medium text-white transition-colors hover:border-white lg:mx-0"
          >
            Chiedi informazioni
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
