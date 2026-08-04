import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { immagini, percorso } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';

// Where each card sits around the central photo on desktop.
const posizioni = [
  'top-[5%] right-[10%]',
  'top-[40%] -right-[8%]',
  'bottom-[20%] right-[5%]',
  'bottom-[20%] left-[5%]',
  'top-[40%] -left-[5%]',
  'top-[5%] left-[10%]',
];

export default function PercorsoCura() {
  const [attiva, setAttiva] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setAttiva((i) => (i + 1) % percorso.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-brand-light relative py-24 md:py-32 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-l from-[#dbe5e1] to-transparent pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="w-12 h-[1px] bg-brand-primary"></div>
          <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">
            Come lavoriamo
          </span>
          <div className="w-12 h-[1px] bg-brand-primary"></div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-sans font-light text-brand-dark leading-tight mb-20 md:mb-28"
        >
          Il tuo <span className="text-brand-primary font-medium">percorso di cura</span>
          <br />
          passo dopo passo
        </motion.h2>

        <div className="relative max-w-5xl mx-auto md:h-[650px] flex items-center justify-center mt-12 md:mt-24">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1.25, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border-[1px] border-brand-primary/20 hidden md:block"
          ></motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1.05, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="absolute inset-10 rounded-full border-[1px] border-brand-secondary/20 hidden md:block"
          ></motion.div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="relative z-10 w-64 h-64 md:w-[400px] md:h-[400px] rounded-full border-[14px] border-white/80 shadow-2xl mx-auto overflow-hidden"
          >
            <img
              src={immagini.manuale}
              alt="Seduta di fisioterapia"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Desktop: cards orbiting the photo */}
          <div className="hidden md:block">
            {percorso.map((fase, idx) => {
              const isActive = attiva === idx;

              return (
                <motion.div
                  key={fase.titolo}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  onClick={() => setAttiva(idx)}
                  className={`absolute ${posizioni[idx]} z-20 cursor-pointer`}
                >
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
                        <div className="font-sans text-brand-dark font-medium mb-2 text-[1.1rem] leading-tight">
                          {fase.titolo}
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed font-light">
                          {fase.desc}
                        </p>
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
                        <span className="text-brand-secondary font-bold whitespace-nowrap">
                          Fase {idx + 1}
                        </span>
                        <div className="w-[1px] h-3 bg-brand-dark/20"></div>
                        <span className="font-medium whitespace-nowrap">{fase.titolo}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Mobile: plain stacked list */}
          <div className="md:hidden flex flex-col gap-3 mt-12 w-full max-w-sm mx-auto text-left">
            {percorso.map((fase, idx) => {
              const isActive = attiva === idx;

              return (
                <div key={fase.titolo} onClick={() => setAttiva(idx)} className="cursor-pointer">
                  {isActive ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-white border border-brand-primary/20 px-6 py-5 rounded-3xl shadow-sm"
                    >
                      <div className="bg-brand-primary text-white px-3 py-1 text-xs rounded-full inline-block mb-2 font-bold tracking-wide">
                        Fase {idx + 1}
                      </div>
                      <div className="font-sans text-brand-dark font-medium mb-1 text-[1.1rem]">
                        {fase.titolo}
                      </div>
                      <p className="text-xs text-gray-500 font-light leading-relaxed">{fase.desc}</p>
                    </motion.div>
                  ) : (
                    <div className="bg-white border border-gray-100 text-brand-dark px-6 py-4 rounded-full text-sm flex items-center gap-3 shadow-sm">
                      <span className="text-brand-secondary font-bold">Fase {idx + 1}</span>
                      <div className="w-[1px] h-3 bg-brand-dark/20"></div>
                      <span className="font-medium">{fase.titolo}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 md:mt-28 flex justify-center"
        >
          <ArrowButton to="/contatti">Inizia il tuo percorso</ArrowButton>
        </motion.div>
      </div>
    </section>
  );
}
