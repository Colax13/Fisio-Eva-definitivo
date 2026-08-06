import { CalendarCheck, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { immagini, studio, team } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';

export default function Hero() {
  const azzurra = team[0];

  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden">
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
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-brand-primary"></div>
            <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">
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
            Fisioterapia e osteopatia a Roma, in zona Casalotti. Cure empatiche e percorsi costruiti
            su di te, per un corpo che torna a muoversi senza dolore.
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
            <ArrowButton href={azzurra.phoneHref} variant="secondary" icon={Phone}>
              {azzurra.phone}
            </ArrowButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
