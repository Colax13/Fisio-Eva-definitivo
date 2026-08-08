import { Home, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import ArrowButton from '../components/ui/ArrowButton';
import usePageMeta from '../hooks/usePageMeta';
import { studio } from '../data/site';

export default function NotFound() {
  usePageMeta('Pagina non trovata — FisioEVA');

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-40 overflow-hidden bg-brand-dark">
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
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-[1px] bg-brand-primary"></div>
          <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">
            Errore 404
          </span>
          <div className="w-12 h-[1px] bg-brand-primary"></div>
        </div>

        <p className="text-[7rem] md:text-[11rem] font-sans font-bold text-white leading-none mb-4">
          4<span className="text-brand-primary">0</span>4
        </p>

        <h1 className="text-2xl md:text-3xl font-sans font-light text-white leading-tight mb-5">
          Questa pagina ha <span className="text-brand-secondary">perso l'equilibrio</span>
        </h1>

        <p className="text-gray-400 font-light leading-relaxed mb-10 max-w-md mx-auto">
          L'indirizzo che cercavi non esiste o è stato spostato. Torna alla home, oppure chiamaci
          direttamente: facciamo prima.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <ArrowButton to="/" icon={Home}>
            Torna alla home
          </ArrowButton>
          <ArrowButton href={studio.phoneHref} variant="ghost" icon={Phone}>
            {studio.phone}
          </ArrowButton>
        </div>
      </motion.div>
    </section>
  );
}
