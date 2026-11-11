import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { studioEvaMedia, trattamentiDi } from '../../data/site';
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
const SPAZIO_CORSI_NOME = 'StudioEVA';

// I corsi vengono dai dati, così ogni pillola porta al suo punto della pagina di StudioEVA.
const attivita = trattamentiDi('terapie-di-gruppo');

export default function SpazioCorsi() {
  return (
    <section className="relative overflow-hidden bg-brand-light/70 backdrop-blur-[2px] px-6 py-24">
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
          {/* La foto è già un invito: porta alla pagina di StudioEVA. */}
          <Link
            to="/studioeva"
            aria-label={`Scopri ${SPAZIO_CORSI_NOME}`}
            className="group relative block min-h-[280px] overflow-hidden lg:min-h-[460px]"
          >
            <img
              src={studioEvaMedia.gruppo}
              // Un fotogramma vero di una lezione di yoga nella sala di StudioEVA.
              alt="Due partecipanti a braccia alzate durante una lezione di yoga nella sala di StudioEVA"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent"></div>
          </Link>

          <div className="flex flex-col justify-center p-9 md:p-14">
            <Eyebrow align="left" accent="secondary" className="mb-5">
              {`In collaborazione con ${SPAZIO_CORSI_NOME}`}
            </Eyebrow>

            {/* Il titolo dice cosa si fa, non come si chiama: "StudioEVA" da
                solo non spiega niente a chi arriva. Il nome resta sotto. */}
            <h2 className="text-h2 font-sans font-bold text-brand-dark mb-3 text-center lg:text-left">
              Terapie di gruppo
            </h2>

            <p className="mb-5 text-center text-sm font-medium text-brand-secondary-ink lg:text-left">
              Un progetto dell'associazione culturale {SPAZIO_CORSI_NOME}
            </p>

            <p className="text-body mb-8 max-w-md text-center font-light text-gray-600 lg:text-left">
              Le terapie di gruppo nascono dalla collaborazione con {SPAZIO_CORSI_NOME}, associazione
              culturale con cui condividiamo lo spazio al piano superiore. È il posto dove si continua
              a muoversi bene, insieme.
            </p>

            {/* In colonna sul telefono: in fila le tre pillole andavano a capo
                in modo diverso a ogni larghezza e la sezione sembrava storta. */}
            <ul className="mb-9 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start">
              {attivita.map((corso) => (
                <li key={corso.slug}>
                  <Link
                    to={`/studioeva#${corso.slug}`}
                    className="flex min-h-11 items-center justify-center rounded-full border border-brand-secondary/40 px-5 py-2.5 text-center text-sm font-light text-brand-dark transition-colors hover:border-brand-secondary hover:bg-brand-secondary/10"
                  >
                    {corso.nome}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center lg:flex-col lg:items-start xl:flex-row">
              {/* Prima la pagina di StudioEVA, con le riprese e gli orari; l'elenco
                  nella pagina servizi resta come seconda strada. */}
              <ArrowButton to="/studioeva" variant="secondary">
                {`Scopri ${SPAZIO_CORSI_NOME}`}
              </ArrowButton>
              <ArrowButton to="/servizi#terapie-di-gruppo">Tutte le terapie di gruppo</ArrowButton>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
