import { CalendarCheck, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { immagini, studio } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';

export default function Hero() {

  return (
    /*
     * `dvh` e non `vh`: su mobile la barra degli indirizzi entra e esce, e con
     * `vh` la hero non combacia mai con lo schermo — o avanza, o lascia
     * intravedere la sezione sotto. `dvh` segue il viewport reale.
     */
    <section className="relative min-h-[100dvh] flex items-center pt-24 md:pt-28 pb-16 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          src={immagini.trattamento}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/55 to-brand-primary/25"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/30 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <span className="text-brand-primary text-eyebrow font-semibold uppercase">
              {studio.claim}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-sans font-bold text-white leading-[1.1] mb-6"
          >
            Il tuo percorso verso <span className="text-brand-primary">il benessere</span> inizia da
            qui
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-300 text-base md:text-lg font-light leading-relaxed mb-10 max-w-lg"
          >
            Fisioterapia, osteopatia e riabilitazione a Casalotti, Roma. Un percorso costruito su
            di te, in ogni fase della vita.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <ArrowButton to="/contatti" icon={CalendarCheck}>
              Prenota una visita
            </ArrowButton>
            <ArrowButton href={studio.phoneHref} variant="secondary" icon={Phone}>
              {studio.phone}
            </ArrowButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
