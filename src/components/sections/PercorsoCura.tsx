import { AnimatePresence, motion } from 'motion/react';
import { immagini, percorso } from '../../data/site';
import useAutoplay from '../../hooks/useAutoplay';
import ArrowButton from '../ui/ArrowButton';
import SectionHeading from '../ui/SectionHeading';

// Dove si posiziona ogni card attorno alla foto centrale, da desktop in su.
const posizioni = [
  'top-[5%] right-[10%]',
  'top-[40%] -right-[8%]',
  'bottom-[20%] right-[5%]',
  'bottom-[20%] left-[5%]',
  'top-[40%] -left-[5%]',
  'top-[5%] left-[10%]',
];

export default function PercorsoCura() {
  const { indice, vaiA } = useAutoplay(percorso.length, 4500);

  return (
    <section className="relative overflow-hidden bg-brand-light px-5 py-16 sm:px-6 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-l from-[#dbe5e1] to-transparent"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading eyebrow="Come lavoriamo" className="mb-12 md:mb-20">
          Il tuo <span className="font-medium text-brand-primary-ink">percorso di cura</span> passo
          dopo passo
        </SectionHeading>

        {/* Telefono: la foto sopra, le fasi in colonna sotto.
            Prima foto e fasi stavano nello stesso `flex` in riga anche su
            mobile, dove il cerchio si schiacciava a ovale e le fasi finivano in
            una colonna di 180px. Le due disposizioni ora sono separate. */}
        <div className="md:hidden">
          <div className="mx-auto mb-8 h-52 w-52 overflow-hidden rounded-full border-[10px] border-white/80 shadow-xl">
            <img
              src={immagini.manuale}
              alt="Seduta di fisioterapia"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>

          <ol className="mx-auto flex w-full max-w-md flex-col gap-2.5 text-left">
            {percorso.map((fase, idx) => {
              const isActive = indice === idx;

              return (
                <li key={fase.titolo}>
                  <button
                    type="button"
                    onClick={() => vaiA(idx)}
                    aria-expanded={isActive}
                    className={`w-full rounded-3xl border px-5 py-4 text-left transition-colors duration-300 ${
                      isActive
                        ? 'border-brand-primary/30 bg-white shadow-md'
                        : 'border-gray-100 bg-white/80 shadow-sm'
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold tracking-wide ${
                          isActive
                            ? 'bg-brand-primary text-white'
                            : 'bg-brand-secondary/15 text-brand-secondary-ink'
                        }`}
                      >
                        Fase {idx + 1}
                      </span>
                      <span className="font-sans font-medium text-brand-dark">{fase.titolo}</span>
                    </span>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.span
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="block overflow-hidden"
                        >
                          <span className="mt-2 block text-sm leading-relaxed font-light text-gray-600">
                            {fase.desc}
                          </span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Desktop: le card in orbita attorno alla foto */}
        <div className="relative mx-auto hidden h-[650px] max-w-5xl items-center justify-center md:mt-24 md:flex">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1.25, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full border-[1px] border-brand-primary/20"
          ></motion.div>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1.05, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
            className="absolute inset-10 rounded-full border-[1px] border-brand-secondary/20"
          ></motion.div>

          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
            className="relative z-10 mx-auto h-[400px] w-[400px] overflow-hidden rounded-full border-[14px] border-white/80 shadow-2xl"
          >
            <img
              src={immagini.manuale}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.div>

          {percorso.map((fase, idx) => {
            const isActive = indice === idx;

            return (
              <motion.div
                key={fase.titolo}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                className={`absolute ${posizioni[idx]} z-20`}
              >
                <button type="button" onClick={() => vaiA(idx)} className="cursor-pointer text-left">
                  <AnimatePresence mode="wait">
                    {isActive ? (
                      <motion.span
                        key="active"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="block w-[280px] rounded-3xl border border-brand-primary/20 bg-white px-6 py-5 shadow-[0_10px_40px_rgba(123,198,184,0.15)]"
                      >
                        <span className="mb-3 inline-block rounded-full bg-brand-primary px-3 py-1 text-xs font-bold tracking-wide text-white">
                          Fase {idx + 1}
                        </span>
                        <span className="mb-2 block font-sans text-[1.1rem] leading-tight font-medium text-brand-dark">
                          {fase.titolo}
                        </span>
                        <span className="block text-xs leading-relaxed font-light text-gray-600">
                          {fase.desc}
                        </span>
                      </motion.span>
                    ) : (
                      <motion.span
                        key="inactive"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-3 rounded-full border border-gray-100 bg-white px-5 py-2.5 text-sm text-brand-dark shadow-lg hover:border-brand-primary/30"
                      >
                        <span className="font-bold whitespace-nowrap text-brand-secondary-ink">
                          Fase {idx + 1}
                        </span>
                        <span className="h-3 w-px bg-brand-dark/20"></span>
                        <span className="font-medium whitespace-nowrap">{fase.titolo}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 flex justify-center md:mt-24"
        >
          <ArrowButton to="/contatti">Inizia il tuo percorso</ArrowButton>
        </motion.div>
      </div>
    </section>
  );
}
