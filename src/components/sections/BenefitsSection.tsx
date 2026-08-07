import { motion } from 'motion/react';
import ArrowButton from '../ui/ArrowButton';
import Eyebrow from '../ui/Eyebrow';
import { immagini } from '../../data/site';

/**
 * Le quattro credenze da spezzare.
 *
 * Sono affermazioni informative, non promesse: nessuna aggiunge "e noi lo
 * risolviamo". La comunicazione sanitaria non ammette promesse di guarigione.
 */
const credenze = [
  {
    credenza: 'La fisioterapia serve solo quando hai già male.',
    ribaltamento: 'La prevenzione costa meno e funziona di più.',
    accento: 'text-brand-primary',
  },
  {
    credenza: 'Dopo il parto i problemi del pavimento pelvico passano da soli.',
    ribaltamento: 'Sono comuni, ma non sono normali. C\'è un percorso.',
    accento: 'text-brand-secondary',
  },
  {
    credenza: 'L\'osteopatia neonatale non serve.',
    ribaltamento: 'Il parto è lo stress meccanico più grande della vita.',
    accento: 'text-brand-primary',
  },
  {
    credenza: 'Tutti i fisioterapisti fanno le stesse cose.',
    ribaltamento: 'La formazione fa la differenza. E si può verificare.',
    accento: 'text-brand-secondary',
  },
];

export default function BenefitsSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#2c2c2b] via-[#1d1d1c] to-[#3d3d3c] px-5 py-16 sm:px-6 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute top-0 right-[20%] h-full w-px bg-white"></div>
        <div className="absolute top-1/2 left-0 h-px w-full bg-white"></div>
      </div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[30%] -left-[10%] h-full w-[50%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative mx-auto w-full max-w-lg lg:mx-0"
          >
            <div className="relative h-[320px] w-full overflow-hidden rounded-[2rem] shadow-2xl sm:h-[420px] lg:h-[500px]">
              <img
                src={immagini.manuale}
                alt="Trattamento osteopatico"
                loading="lazy"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Sul telefono il cartellino sta dentro la foto invece di sporgere
                dal bordo destro, dove restava mezzo tagliato dallo schermo. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute right-4 bottom-4 z-20 max-w-[240px] rounded-2xl border border-gray-100 bg-white p-5 shadow-xl lg:-right-6 lg:-bottom-6 lg:p-6"
            >
              <div className="mb-1 font-sans text-3xl font-bold text-brand-primary-ink lg:text-4xl">
                1 su 1
              </div>
              <p className="text-sm leading-relaxed font-light text-brand-dark">
                Una seduta, una persona. Nessuna sovrapposizione, nessuna fretta.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl text-center lg:pl-10 lg:text-left"
          >
            <Eyebrow align="left" tone="light" className="mb-5">
              Perché noi
            </Eyebrow>

            <h2 className="text-h2 mb-5 font-sans font-light text-white">
              Quattro cose che <span className="font-medium text-brand-primary">vale la pena</span>{' '}
              sapere
            </h2>

            <p className="text-lead mb-10 font-light text-gray-300">
              Sulla fisioterapia circolano convinzioni che fanno rimandare le cose. Queste sono le
              quattro che sentiamo più spesso.
            </p>

            <div className="mb-10 space-y-6 text-left">
              {credenze.map((voce, idx) => (
                <motion.div
                  key={voce.credenza}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.12 }}
                  className="border-l border-white/20 pl-5 sm:pl-6"
                >
                  <p className="mb-1.5 text-sm font-light text-gray-400 line-through decoration-white/30">
                    {voce.credenza}
                  </p>
                  <p className={`${voce.accento} text-lead leading-snug font-light`}>
                    {voce.ribaltamento}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center lg:justify-start">
              <ArrowButton to="/chi-siamo" variant="secondary">
                Scopri chi siamo
              </ArrowButton>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
