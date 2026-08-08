import { CalendarCheck, MessageSquare, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { immagini, studio } from '../../data/site';

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

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
          <Link
            to="/contatti"
            className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-brand-dark transition-colors duration-300 hover:bg-brand-primary hover:text-white"
          >
            <CalendarCheck className="h-4 w-4" aria-hidden="true" />
            Prenota ora
          </Link>

          <a
            href={`mailto:${studio.email}`}
            className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full border-2 border-white/40 px-8 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-brand-dark"
          >
            <MessageSquare className="h-4 w-4" aria-hidden="true" />
            Scrivi un messaggio
          </a>

          <a
            href={studio.phoneHref}
            className="inline-flex min-h-13 items-center justify-center gap-2.5 rounded-full border-2 border-white/40 px-8 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:border-white hover:bg-white hover:text-brand-dark"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            Chiama
          </a>
        </div>
      </motion.div>
    </section>
  );
}
