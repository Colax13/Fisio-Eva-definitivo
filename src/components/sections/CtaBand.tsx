import { CalendarCheck, MessageSquare, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { immagini, studio } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';

type Props = {
  titolo?: string;
};

/**
 * La fascia di chiusura del sito.
 *
 * Foto a tutta larghezza con la velatura scura sopra, una domanda e tre modi
 * per rispondere. Le tre azioni sono affiancate su desktop e impilate a piena
 * larghezza sul telefono, dove un pulsante stretto è solo più difficile da
 * centrare col pollice.
 */
export default function CtaBand({ titolo = 'Pronto a rimetterti in movimento?' }: Props) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src={immagini.riabilitazione}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-dark/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/70 via-brand-dark/40 to-brand-primary/20"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 mx-auto max-w-4xl px-6 py-24 text-center md:py-32"
      >
        <h2 className="text-h2 font-sans font-bold text-white">{titolo}</h2>

        <p className="text-lead mx-auto mt-5 max-w-xl font-light text-gray-200">
          Raccontaci cosa senti e da quanto tempo. Dalla prima valutazione capiamo insieme come
          impostare il percorso.
        </p>

        {/* Gli stessi bottoni del resto del sito, con la freccia che cambia
            lato: erano tre link scritti a mano e si muovevano in modo diverso
            da tutti gli altri. */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <ArrowButton to="/contatti" icon={CalendarCheck} verso="inizio">
            Prenota ora
          </ArrowButton>

          <ArrowButton href={`mailto:${studio.email}`} variant="ghost" icon={MessageSquare} verso="inizio">
            Scrivi un messaggio
          </ArrowButton>

          <ArrowButton href={studio.phoneHref} variant="ghostSecondary" icon={Phone} verso="inizio">
            Chiama
          </ArrowButton>
        </div>
      </motion.div>
    </section>
  );
}
