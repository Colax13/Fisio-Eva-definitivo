import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function BenefitsSection() {
  return (
    <section className="bg-gradient-to-br from-[#1F2937] via-[#111827] to-[#374151] py-32 px-6 overflow-hidden relative">
      {/* Sleek architectural accent lines */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 right-[20%] w-[1px] h-full bg-white"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Main Image Area */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-lg mx-auto lg:mx-0"
          >
            <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80" 
                alt="Trattamento Osteopatico" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>
            
            {/* Overlay badge/card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -right-2 md:-right-6 bg-white p-6 rounded-2xl shadow-xl max-w-[240px] z-20 border border-gray-100"
            >
               <div className="text-brand-primary font-sans font-bold text-4xl mb-1">100%</div>
               <p className="text-sm font-medium text-brand-dark">Pazienti soddisfatti dei risultati ottenuti nel nostro studio.</p>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl lg:pl-10"
          >
            <h2 className="text-4xl md:text-5xl font-sans font-light text-white leading-tight mb-6">
              I benefici di <span className="text-brand-primary font-medium">affidarti al nostro</span> Studio
            </h2>
            
            <p className="text-gray-400 text-base font-light leading-relaxed mb-12">
              Siamo dedicati a fornire molto più di un semplice trattamento. Siamo qui per offrire cure personalizzate, attenzione ai dettagli e un ambiente sereno.
            </p>
            
            {/* Progress Bars */}
            <div className="space-y-8 mb-12">
              <div>
                <div className="flex justify-between text-white text-sm mb-3">
                  <span className="font-medium">Empatia & Ascolto</span>
                  <span className="text-brand-primary">100%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-brand-primary relative"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-white text-sm mb-3">
                  <span className="font-medium">Piani Personalizzati</span>
                  <span className="text-brand-secondary">100%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                    className="h-full bg-brand-secondary relative"
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-white text-sm mb-3">
                  <span className="font-medium">Esperienza Professionale</span>
                  <span className="text-brand-primary">100%</span>
                </div>
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.9, ease: "easeOut" }}
                    className="h-full bg-brand-primary relative"
                  />
                </div>
              </div>
            </div>
            
            <button className="group flex w-max items-center border-2 border-brand-secondary bg-white hover:bg-brand-secondary text-brand-dark hover:text-white rounded-full px-8 py-3.5 transition-colors duration-300 overflow-hidden font-medium text-sm">
              <span className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-start group-hover:mr-2 -translate-x-full group-hover:translate-x-0">
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </span>
              <span>Scopri di più</span>
              <span className="w-5 opacity-100 group-hover:w-0 group-hover:opacity-0 transition-all duration-300 overflow-hidden flex items-center justify-end ml-2 group-hover:ml-0 translate-x-0 group-hover:translate-x-full">
                <ArrowUpRight className="w-4 h-4 shrink-0" />
              </span>
            </button>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
