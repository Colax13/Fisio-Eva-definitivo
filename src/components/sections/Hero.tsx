import { CalendarCheck, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { immagini, studio, team } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';
import Eyebrow from '../ui/Eyebrow';

export default function Hero() {
  const azzurra = team[0];

  return (
    <section className="relative flex min-h-[88svh] items-center overflow-hidden pt-28 pb-16 md:min-h-screen md:pt-32">
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src={immagini.trattamento}
          alt=""
          aria-hidden="true"
          className="h-full w-full object-cover"
        />
        {/* Sul telefono il testo sta al centro della foto, non di lato: la
            velatura deve essere piena, non sfumare verso destra come su desktop. */}
        <div className="absolute inset-0 bg-brand-dark/75 lg:bg-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/55 to-brand-primary/25"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/30 to-transparent"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6">
        <div className="mx-auto max-w-2xl text-center lg:mx-0 lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Eyebrow align="left" tone="light" className="mb-5">
              {studio.claim}
            </Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-display mb-5 font-sans font-bold text-white"
          >
            Il tuo percorso verso <span className="text-brand-primary">il benessere</span> inizia da
            qui
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lead mx-auto mb-9 max-w-lg font-light text-gray-200 lg:mx-0"
          >
            Fisioterapia, osteopatia e riabilitazione a Casalotti, Roma. Un percorso costruito su
            di te, in ogni fase della vita.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start"
          >
            <ArrowButton to="/contatti" icon={CalendarCheck}>
              Prenota una visita
            </ArrowButton>
            <ArrowButton href={azzurra.phoneHref} variant="secondary" icon={Phone}>
              {azzurra.phone}
            </ArrowButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
