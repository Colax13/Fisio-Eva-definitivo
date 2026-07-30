import { Mail, Phone } from 'lucide-react';
import { motion } from 'motion/react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-12 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"
          alt="Trattamento Osteopatico" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/50 to-brand-primary/20"></div>
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
            <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">Studio di Fisioterapia e Osteopatia</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-5xl md:text-7xl font-sans font-bold text-white leading-[1.1] mb-6"
          >
            Il tuo percorso verso <span className="text-brand-primary">il benessere</span> inizia da qui
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-gray-300 text-sm md:text-base leading-snug mb-8 max-w-md"
          >
            Sperimenta cure empatiche e soluzioni fisioterapiche avanzate per un corpo più sano e forte.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <a href="mailto:fisioeva.boccia@gmail.com" className="group flex items-center border-2 border-brand-primary bg-white hover:bg-brand-primary text-brand-dark hover:text-white rounded-full px-8 py-3.5 transition-colors duration-300 overflow-hidden font-medium text-sm">
              <span className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-start group-hover:mr-2 -translate-x-full group-hover:translate-x-0">
                <Mail className="w-4 h-4 shrink-0" />
              </span>
              <span>fisioeva.boccia@gmail.com</span>
              <span className="w-5 opacity-100 group-hover:w-0 group-hover:opacity-0 transition-all duration-300 overflow-hidden flex items-center justify-end ml-2 group-hover:ml-0 translate-x-0 group-hover:translate-x-full">
                <Mail className="w-4 h-4 shrink-0" />
              </span>
            </a>
            
            <a href="tel:+39123456789" className="group flex items-center border-2 border-brand-secondary bg-white hover:bg-brand-secondary text-brand-dark hover:text-white rounded-full px-8 py-3.5 transition-colors duration-300 overflow-hidden font-medium text-sm">
              <span className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-start group-hover:mr-2 -translate-x-full group-hover:translate-x-0">
                <Phone className="w-4 h-4 shrink-0" />
              </span>
              <span>+39 123 456 789</span>
              <span className="w-5 opacity-100 group-hover:w-0 group-hover:opacity-0 transition-all duration-300 overflow-hidden flex items-center justify-end ml-2 group-hover:ml-0 translate-x-0 group-hover:translate-x-full">
                <Phone className="w-4 h-4 shrink-0" />
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
