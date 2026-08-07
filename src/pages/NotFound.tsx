import { Home, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import ArrowButton from '../components/ui/ArrowButton';
import Eyebrow from '../components/ui/Eyebrow';
import usePageMeta from '../hooks/usePageMeta';
import { team } from '../data/site';

export default function NotFound() {
  usePageMeta('Pagina non trovata — FisioEVA');
  const azzurra = team[0];

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-dark px-5 py-32 sm:px-6 md:py-40">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[100%] rounded-full bg-brand-primary/20 blur-[120px]"></div>
        <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[100%] rounded-full bg-brand-secondary/20 blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative z-10 max-w-2xl mx-auto text-center"
      >
        <Eyebrow tone="light" className="mb-7">
          Errore 404
        </Eyebrow>

        <p className="mb-4 font-sans text-[clamp(5rem,26vw,11rem)] leading-none font-bold text-white">
          4<span className="text-brand-primary">0</span>4
        </p>

        <h1 className="text-h3 mb-5 font-sans font-light text-white">
          Questa pagina ha <span className="text-brand-secondary">perso l'equilibrio</span>
        </h1>

        <p className="mx-auto mb-10 max-w-md leading-relaxed font-light text-gray-300">
          L'indirizzo che cercavi non esiste o è stato spostato. Torna alla home, oppure chiamaci
          direttamente: facciamo prima.
        </p>

        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          <ArrowButton to="/" icon={Home}>
            Torna alla home
          </ArrowButton>
          <ArrowButton href={azzurra.phoneHref} variant="ghost" icon={Phone}>
            {azzurra.phone}
          </ArrowButton>
        </div>
      </motion.div>
    </section>
  );
}
