import { motion } from 'motion/react';
import { immagini } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';
import Eyebrow from '../ui/Eyebrow';

/**
 * Il piano superiore.
 *
 * Attività non sanitarie, quindi normativa e promessa diverse: non è "curarti"
 * ma "stare bene, muoverti, continuare". La differenza la porta il contenuto —
 * le forme restano quelle del resto del sito, morbide e arrotondate, perché una
 * sezione squadrata in mezzo a tutto il resto sembra solo un errore.
 *
 * ⛔ Il nome non è confermato: sta in una costante sola, così quando la
 * decisione arriva si cambia in un punto.
 */
const SPAZIO_CORSI_NOME = 'LongEva';

const attivita = ['Posturale di gruppo', 'Metodo Feldenkrais', 'Yoga', 'Pilates'];

export default function SpazioCorsi() {
  return (
    <section className="relative overflow-hidden bg-brand-light/70 px-5 py-20 backdrop-blur-[2px] sm:px-6 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 overflow-hidden rounded-[2.5rem] border border-white bg-white shadow-xl lg:grid-cols-2"
        >
          <div className="relative min-h-[200px] sm:min-h-[280px] lg:min-h-[460px]">
            <img
              src={immagini.postura}
              alt="Lo spazio corsi al piano superiore"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent"></div>
          </div>

          <div className="flex flex-col justify-center p-7 sm:p-9 md:p-14">
            {/* Tutta la colonna e' allineata a sinistra, telefono compreso.
                Centrata, con righe corte, lasciava sette bordi diversi uno
                sotto l'altro: e' il "tutto in fila storto" che si vedeva in
                fondo alla home. Da desktop non cambia niente — era gia' cosi'. */}
            <Eyebrow align="start" accent="secondary" className="mb-5">
              {`In collaborazione con ${SPAZIO_CORSI_NOME}`}
            </Eyebrow>

            {/* Il titolo dice cosa si fa, non come si chiama: "LongEva" da
                solo non spiega niente a chi arriva. Il nome resta sotto. */}
            <h2 className="text-h2 mb-3 text-left font-sans font-bold text-brand-dark">
              Terapie di gruppo
            </h2>

            <p className="mb-5 text-left text-sm font-medium text-brand-secondary-ink">
              Un progetto dell'associazione culturale {SPAZIO_CORSI_NOME}
            </p>

            <p className="text-body mb-8 max-w-md text-left font-light text-gray-600">
              Le terapie di gruppo nascono dalla collaborazione con {SPAZIO_CORSI_NOME}, associazione
              culturale con cui condividiamo lo spazio al piano superiore. È il posto dove si continua
              a muoversi bene, insieme: quando il percorso clinico è finito, o anche a prescindere.
            </p>

            {/*
             * Le attivita' erano quattro pillole a tutta larghezza, una sotto
             * l'altra. Sul telefono diventavano quattro barre identiche
             * impilate: sembravano quattro bottoni — e non lo sono, non si
             * clicca niente — e mettevano in ombra l'unico bottone vero, che
             * sta subito sotto.
             *
             * Qui sono etichette e si comportano come tali: vanno a capo da
             * sole, larghe quanto la parola, con un fondo tenue al posto del
             * bordo marcato. Il peso visivo torna dove serve, sul CTA. Da
             * desktop il risultato e' lo stesso di prima.
             */}
            <ul className="mb-9 flex flex-wrap justify-start gap-2">
              {attivita.map((voce) => (
                <li
                  key={voce}
                  className="rounded-full bg-brand-secondary/10 px-4 py-2 text-sm font-light text-brand-secondary-ink"
                >
                  {voce}
                </li>
              ))}
            </ul>

            <div className="flex justify-start">
              <ArrowButton to="/contatti">Scopri le terapie di gruppo</ArrowButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
