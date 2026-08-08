import { CalendarCheck, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { studio } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';
import Eyebrow from '../ui/Eyebrow';

type Props = {
  titolo?: string;
  testo?: string;
};

/** Fascia di chiamata all'azione in chiusura delle pagine interne. */
export default function CtaBand({
  titolo = 'Pronto a rimetterti in movimento?',
  testo = 'Raccontaci cosa ti succede: la prima cosa che facciamo è ascoltarti. Da lì costruiamo insieme il percorso più adatto a te.',
}: Props) {

  return (
    <section className="relative overflow-hidden bg-brand-light px-5 py-16 sm:px-6 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[30%] left-1/2 h-[140%] w-[70%] -translate-x-1/2 rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative z-10 mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-brand-dark px-6 py-12 text-center shadow-2xl sm:px-8 md:rounded-[2.5rem] md:px-16 md:py-20"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-[50%] -right-[10%] h-[180%] w-[60%] rounded-full bg-brand-primary/20 blur-[100px]"></div>
        </div>

        <div className="relative z-10">
          <Eyebrow tone="light" className="mb-5">
            Prenota ora
          </Eyebrow>

          <h2 className="text-h2 mb-5 font-sans font-light text-white">{titolo}</h2>

          <p className="text-lead mx-auto mb-9 max-w-2xl font-light text-gray-300">{testo}</p>

          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
            <ArrowButton to="/contatti" icon={CalendarCheck}>
              Scrivici un messaggio
            </ArrowButton>
            <ArrowButton href={studio.phoneHref} variant="ghost" icon={Phone}>
              {studio.phone}
            </ArrowButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
