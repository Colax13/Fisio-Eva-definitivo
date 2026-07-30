import { useState, useEffect } from 'react';
import { ArrowUpRight, Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function HowItWorks() {
  const [activePhase, setActivePhase] = useState<number>(0); 

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePhase((prev) => (prev === phases.length - 1 ? 0 : prev + 1));
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const phases = [
    {
      title: "Prenota una visita",
      desc: "Scegli il momento più adatto per iniziare il tuo percorso di benessere con noi.",
      position: "top-[5%] right-[10%]",
    },
    {
      title: "Colloquio Iniziale",
      desc: "Un momento dedicato per ascoltare la tua storia clinica e comprendere i tuoi obiettivi.",
      position: "top-[40%] -right-[8%]",
    },
    {
      title: "Valutazione Posturale",
      desc: "Analisi dettagliata del tuo corpo per individuare le cause specifiche del problema.",
      position: "bottom-[20%] right-[5%]",
    },
    {
      title: "Piano Terapeutico",
      desc: "Ricevi un programma personalizzato mirato a risolvere il tuo problema e a migliorare il tuo benessere generale.",
      position: "bottom-[20%] left-[5%]",
    },
    {
      title: "Terapia Manuale",
      desc: "Trattamenti mirati per alleviare il dolore, ripristinare la mobilità e la funzione.",
      position: "top-[40%] -left-[5%]",
    },
    {
      title: "Mantenimento",
      desc: "Esercizi e consigli posturali per mantenere i risultati ottenuti nel tempo e prevenire ricadute.",
      position: "top-[5%] left-[10%]",
    }
  ];

  return (
    <section className="bg-brand-light relative py-32 px-6 overflow-hidden">
      {/* Subtle background gradient from right to left */}
      <div className="absolute inset-0 bg-gradient-to-l from-[#dbe5e1] to-transparent pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-6"
        >
        </motion.div>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-sans font-light text-brand-dark leading-tight mb-28"
        >
          Il tuo <span className="text-brand-primary font-medium">percorso di cura</span><br/>passo dopo passo
        </motion.h2>
        
        <div className="relative max-w-5xl mx-auto md:h-[650px] flex items-center justify-center mt-12 md:mt-24">
          
          {/* Faint outer circles (Hidden on mobile) */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1.25, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-[1px] border-brand-primary/20 hidden md:block"
          ></motion.div>
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1.05, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="absolute inset-10 rounded-full border-[1px] border-brand-secondary/20 hidden md:block"
          ></motion.div>
          
          {/* Central Image */}
          <motion.div 
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
            className="relative z-10 w-64 h-64 md:w-[400px] md:h-[400px] rounded-full border-[14px] border-white/80 flex items-center justify-center shadow-2xl mx-auto"
          >
            <img 
              src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80" 
              alt="Seduta di fisioterapia"
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
          
          {/* Steps Desktop Layout */}
          <div className="hidden md:block">
            {phases.map((phase, idx) => {
              const isActive = activePhase === idx;
              
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  onClick={() => setActivePhase(idx)}
                  className={`absolute ${phase.position} z-20 cursor-pointer`}
                >
                  <div className="relative">
                    <AnimatePresence mode="wait">
                      {isActive ? (
                        <motion.div
                          key="active"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="bg-white border border-brand-primary/20 px-6 py-5 rounded-3xl shadow-[0_10px_40px_rgba(123,198,184,0.15)] w-[280px] text-left"
                        >
                          <div className="bg-brand-primary text-white px-3 py-1 text-xs rounded-full inline-block mb-3 font-bold tracking-wide">
                            Fase {idx + 1}
                          </div>
                          <div className="font-sans text-brand-dark font-medium mb-2 text-[1.1rem] leading-tight">{phase.title}</div>
                          <p className="text-xs text-gray-500 leading-relaxed font-light">{phase.desc}</p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="inactive"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.2 }}
                          className="bg-white text-brand-dark px-5 py-2.5 rounded-full text-sm shadow-lg flex items-center gap-3 border border-gray-100 hover:border-brand-primary/30"
                        >
                          <span className="text-brand-secondary font-bold whitespace-nowrap">Fase {idx + 1}</span>
                          <div className="w-[1px] h-3 bg-brand-dark/20"></div>
                          <span className="font-medium whitespace-nowrap">{phase.title}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
          
          {/* Mobile Steps Layout */}
          <div className="md:hidden flex flex-col gap-4 mt-12 w-full max-w-sm mx-auto text-left">
             {phases.map((phase, idx) => {
               const isActive = activePhase === idx;

               return (
                 <div key={idx} onClick={() => setActivePhase(idx)} className="cursor-pointer">
                   <AnimatePresence mode="wait">
                     {isActive ? (
                       <motion.div
                         key="active"
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: 'auto' }}
                         exit={{ opacity: 0, height: 0 }}
                         className="bg-white border border-brand-primary/20 px-6 py-5 rounded-3xl shadow-sm mb-3 overflow-hidden"
                       >
                         <div className="bg-brand-primary text-white px-3 py-1 text-xs rounded-full inline-block mb-2 font-bold tracking-wide">Fase {idx + 1}</div>
                         <div className="font-sans text-brand-dark font-medium mb-1 text-[1.1rem]">{phase.title}</div>
                         <p className="text-xs text-gray-500 font-light">{phase.desc}</p>
                       </motion.div>
                     ) : (
                       <motion.div
                         key="inactive"
                         initial={{ opacity: 0, height: 0 }}
                         animate={{ opacity: 1, height: 'auto' }}
                         exit={{ opacity: 0, height: 0 }}
                         className="bg-white border border-gray-100 text-brand-dark px-6 py-4 rounded-full text-sm flex items-center justify-between shadow-sm mb-3 overflow-hidden"
                       >
                         <div className="flex items-center gap-3">
                           <span className="text-brand-secondary font-bold">Fase {idx + 1}</span>
                           <div className="w-[1px] h-3 bg-brand-dark/20"></div>
                           <span className="font-medium">{phase.title}</span>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                 </div>
               );
             })}
          </div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-28"
        >
          <button className="group flex w-max mx-auto items-center border-2 border-brand-primary bg-white hover:bg-brand-primary text-brand-dark hover:text-white rounded-full px-8 py-3.5 transition-colors duration-300 overflow-hidden font-medium text-sm">
            <span className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-start group-hover:mr-2 -translate-x-full group-hover:translate-x-0">
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </span>
            <span>Inizia il tuo percorso</span>
            <span className="w-5 opacity-100 group-hover:w-0 group-hover:opacity-0 transition-all duration-300 overflow-hidden flex items-center justify-end ml-2 group-hover:ml-0 translate-x-0 group-hover:translate-x-full">
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
