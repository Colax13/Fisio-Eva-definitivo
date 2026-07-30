import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

export default function EmotionalSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center py-32 px-6 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1600334129128-685e5582f43d?auto=format&fit=crop&q=80)' }}
      ></div>
      
      {/* Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/50"></div>
      
      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 text-brand-secondary"
        >
          <Quote className="w-12 h-12 md:w-16 md:h-16 opacity-80" fill="currentColor" />
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-sans italic text-white leading-[1.2] mb-16 max-w-4xl"
        >
          "Il tuo corpo non ha smesso di funzionare, ha smesso di <span className="text-brand-secondary">essere ascoltato</span>."
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="flex items-center justify-center gap-4 text-sm md:text-base tracking-[0.3em] uppercase text-brand-secondary font-medium"
        >
          <span>Muoviti</span>
          <span className="w-1 h-1 rounded-full bg-brand-secondary"></span>
          <span>Respira</span>
          <span className="w-1 h-1 rounded-full bg-brand-secondary"></span>
          <span>Vivi</span>
        </motion.div>
      </div>
    </section>
  );
}
