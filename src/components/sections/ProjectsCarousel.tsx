import { useEffect, useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { progetti } from '../../data/site';

export default function ProjectsCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % progetti.length), 6000);
    return () => clearInterval(timer);
  }, [paused]);

  const progetto = progetti[index];
  const accentText = progetto.accent === 'primary' ? 'text-brand-primary' : 'text-brand-secondary';

  return (
    <section
      className="relative bg-brand-light overflow-hidden py-24 px-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="mb-10">
          <p className="text-gray-700 tracking-[0.2em] text-xs font-semibold mb-2 uppercase">
            Percorsi mirati per il tuo
          </p>
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-brand-dark">
            Benessere <span className="text-brand-secondary">globale</span>
          </h2>
          <div className="w-12 h-px bg-brand-primary/50 mt-4"></div>
        </div>

        <div className="relative w-full min-h-[600px] md:min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 flex flex-col md:flex-row items-center gap-8 md:gap-12"
            >
              <div className="w-full md:w-[55%] order-2 md:order-1 relative z-20">
                <p className={`${accentText} text-xs tracking-widest uppercase font-medium mb-3`}>
                  {progetto.evidenza}
                </p>

                <h3 className="text-3xl md:text-4xl lg:text-5xl font-sans font-light text-brand-dark leading-[1.2] mb-4">
                  Progetto <span className={accentText}>{progetto.titolo}</span>
                </h3>

                <p className="text-gray-600 mb-6 font-light text-sm md:text-base leading-relaxed max-w-lg">
                  {progetto.descrizione}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {progetto.benefici.map((beneficio) => (
                    <div key={beneficio} className="flex items-center gap-2">
                      <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 border border-brand-primary">
                        <Check className="w-2.5 h-2.5 text-brand-primary" strokeWidth={2.5} />
                      </span>
                      <span className="text-brand-dark font-light text-xs md:text-sm">
                        {beneficio}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to="/progetti"
                  className="group inline-flex items-center border border-brand-primary/30 bg-transparent text-brand-dark rounded-full px-6 py-2.5 transition-all duration-300 hover:bg-white hover:border-brand-primary/60 font-medium text-sm"
                >
                  <span>Scopri i progetti</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="w-full md:w-[45%] h-[260px] md:h-[400px] order-1 md:order-2 flex items-center justify-center">
                <div className="relative w-full h-full max-w-[380px]">
                  <div
                    className="absolute inset-0 bg-gradient-to-tr from-brand-primary/40 to-brand-secondary/40 z-10 animate-blob"
                    style={{ borderRadius: '50% 50% 50% 50% / 55% 45% 45% 55%' }}
                  ></div>
                  <div
                    className="absolute inset-[4%] overflow-hidden z-20 border-[4px] border-white shadow-lg bg-white"
                    style={{ borderRadius: '55% 45% 45% 55% / 50% 50% 50% 50%' }}
                  >
                    <img
                      src={progetto.image}
                      alt={progetto.titolo}
                      loading="lazy"
                      className="w-full h-full object-cover scale-105"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-3 mt-8 relative z-20">
          {progetti.map((p, idx) => (
            <button
              key={p.slug}
              onClick={() => setIndex(idx)}
              aria-label={`Vai al progetto ${p.titolo}`}
              aria-current={idx === index}
              className={`transition-all duration-300 rounded-full h-2 ${
                idx === index ? 'w-10 bg-brand-primary' : 'w-2 bg-brand-primary/30 hover:bg-brand-primary/60'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
