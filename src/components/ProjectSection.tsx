import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: (
      <>
        Progetto "<span className="text-brand-secondary">Psicomotricità</span>"
      </>
    ),
    description: "Il corpo è il primo strumento di espressione del bambino. Attraverso il movimento e la relazione, la psicomotricità sostiene lo sviluppo dell'identità, delle emozioni e delle capacità cognitive in modo armonico e profondo.",
    benefits: [
      "Sviluppo dell'autonomia",
      "Equilibrio e coordinazione",
      "Gestione delle emozioni",
      "Capacità relazionali"
    ],
    image: "https://images.unsplash.com/photo-1587691592099-24045742c181?auto=format&fit=crop&q=80"
  },
  {
    id: 2,
    title: (
      <>
        Progetto "<span className="text-brand-secondary">Donna</span> e <span className="text-brand-primary">Benessere</span>"
      </>
    ),
    description: "Un percorso dedicato alla salute femminile in tutte le fasi della vita. Dalla rieducazione del pavimento pelvico al recupero post-parto, per ritrovare equilibrio e forza.",
    benefits: [
      "Rieducazione post-parto",
      "Pavimento pelvico",
      "Prevenzione disfunzioni",
      "Miglioramento posturale"
    ],
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&q=80"
  },
  {
    id: 3,
    title: (
      <>
        Progetto "<span className="text-brand-primary">Postura</span> e Movimento"
      </>
    ),
    description: "La postura è l'espressione di come abitiamo il nostro corpo. Questo progetto mira a correggere squilibri muscolari, alleviare tensioni e restituire libertà di movimento.",
    benefits: [
      "Riallineamento",
      "Riduzione dolori",
      "Aumento flessibilità",
      "Consapevolezza corporea"
    ],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80"
  },
  {
    id: 4,
    title: (
      <>
        Progetto "<span className="text-brand-secondary">Terza Età</span> Attiva"
      </>
    ),
    description: "L'invecchiamento non deve significare perdita di autonomia. Un programma specifico per mantenere la forza muscolare e l'equilibrio, essenziali per una vita indipendente.",
    benefits: [
      "Prevenzione cadute",
      "Mobilità articolare",
      "Socializzazione",
      "Potenziamento dolce"
    ],
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80"
  }
];

export default function ProjectSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-brand-light flex items-center justify-center overflow-hidden py-12 md:py-16">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col justify-center">
        
        {/* Intro Header */}
        <div className="mb-6 md:mb-8">
          <p className="text-gray-700 tracking-[0.2em] text-xs font-semibold mb-2 uppercase">
            Percorsi mirati per il tuo
          </p>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-dark">
            Benessere <span className="text-brand-secondary">globale</span>
          </h2>
          <div className="w-12 h-px bg-brand-primary/50 mt-4"></div>
        </div>

        <div className="relative w-full h-[550px] md:h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="absolute inset-0 flex flex-col md:flex-row items-center gap-6 md:gap-12"
            >
              {/* Text Content */}
              <div className="w-full md:w-[55%] flex flex-col justify-center order-2 md:order-1 relative z-20">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light text-brand-dark leading-[1.2] mb-4 whitespace-nowrap overflow-visible">
                  {projects[currentIndex].title}
                </h3>
                
                <p className="text-gray-600 mb-6 font-light text-sm md:text-base leading-relaxed max-w-lg">
                  {projects[currentIndex].description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {projects[currentIndex].benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border border-brand-primary bg-transparent`}>
                        <Check className={`w-2.5 h-2.5 text-brand-primary`} strokeWidth={2} />
                      </div>
                      <span className="text-brand-dark font-light text-xs md:text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div>
                  <button className="group flex w-max items-center border border-brand-primary/30 bg-transparent text-brand-dark rounded-full px-5 py-2 transition-all duration-300 hover:bg-white hover:border-brand-primary/50 font-medium text-sm">
                    <span>Scopri il progetto</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-2 text-brand-dark transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>
              </div>

              {/* Image */}
              <div className="w-full md:w-[45%] h-[250px] md:h-[400px] order-1 md:order-2 flex flex-col justify-center items-end relative md:pr-4">
                 <div className="relative w-full h-full max-w-[380px] flex items-center justify-center ml-auto">
                  
                  {/* Outer Blob Gradient Border */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-tr from-brand-primary/40 to-brand-secondary/40 z-10 animate-blob"
                    style={{ borderRadius: '50% 50% 50% 50% / 55% 45% 45% 55%' }}
                  ></div>

                  {/* Inner Blob Image Container */}
                  <div 
                    className="absolute inset-[3%] md:inset-[5%] overflow-hidden z-20 border-[4px] border-white shadow-lg bg-white"
                    style={{ borderRadius: '55% 45% 45% 55% / 50% 50% 50% 50%' }}
                  >
                    <img 
                      src={projects[currentIndex].image} 
                      alt="Project visualization" 
                      className="w-full h-full object-cover transition-transform duration-1000 scale-105 hover:scale-110"
                    />
                  </div>
                 </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-center w-full mt-8 relative z-20">
          <div className="flex items-center justify-center gap-3">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full h-2 ${
                  idx === currentIndex 
                    ? 'w-10 bg-brand-primary' 
                    : 'w-2 bg-brand-primary/30 hover:bg-brand-primary/60'
                }`}
                aria-label={`Vai al progetto ${idx + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
