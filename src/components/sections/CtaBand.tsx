import { CalendarCheck, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { team } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';

type Props = {
  titolo?: string;
  testo?: string;
};

/** Closing call-to-action band used at the bottom of the inner pages. */
export default function CtaBand({
  titolo = 'Pronto a rimetterti in movimento?',
  testo = 'Raccontaci cosa ti succede: la prima cosa che facciamo è ascoltarti. Da lì costruiamo insieme il percorso più adatto a te.',
}: Props) {
  const azzurra = team[0];

  return (
    <section className="relative bg-brand-light py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[70%] h-[140%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto relative z-10 bg-brand-dark rounded-[2.5rem] px-8 py-14 md:px-16 md:py-20 text-center shadow-2xl overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[50%] -right-[10%] w-[60%] h-[180%] rounded-full bg-brand-primary/20 blur-[100px]"></div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-brand-primary"></div>
            <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">
              Prenota ora
            </span>
            <div className="w-12 h-[1px] bg-brand-primary"></div>
          </div>

          <h2 className="text-3xl md:text-5xl font-sans font-light text-white leading-tight mb-6">
            {titolo}
          </h2>

          <p className="text-gray-400 font-light leading-relaxed max-w-2xl mx-auto mb-10">{testo}</p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <ArrowButton to="/contatti" icon={CalendarCheck}>
              Scrivici un messaggio
            </ArrowButton>
            <ArrowButton href={azzurra.phoneHref} variant="ghost" icon={Phone}>
              {azzurra.phone}
            </ArrowButton>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
