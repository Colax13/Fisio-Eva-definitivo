import { motion } from 'motion/react';
import ArrowButton from '../ui/ArrowButton';
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
    <section className="bg-gradient-to-br from-[#2c2c2b] via-[#1d1d1c] to-[#3d3d3c] py-24 md:py-32 px-6 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-0 right-[20%] w-[1px] h-full bg-white"></div>
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-white"></div>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[30%] -left-[10%] w-[50%] h-[100%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-lg mx-auto lg:mx-0"
          >
            <div className="relative h-[500px] w-full rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src={immagini.manuale}
                alt="Trattamento osteopatico"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -bottom-6 -right-2 md:-right-6 bg-white p-6 rounded-2xl shadow-xl max-w-[240px] z-20 border border-gray-100"
            >
              <div className="text-brand-primary font-sans font-bold text-4xl mb-1">1 su 1</div>
              <p className="text-sm font-light text-brand-dark leading-relaxed">
                Una seduta, una persona. Nessuna sovrapposizione, nessuna fretta.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl lg:pl-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[1px] bg-brand-primary"></div>
              <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">
                Perché noi
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-sans font-light text-white leading-tight mb-6">
              Quattro cose che <span className="text-brand-primary font-medium">vale la pena</span>{' '}
              sapere
            </h2>

            <p className="text-gray-400 text-base font-light leading-relaxed mb-12">
              Sulla fisioterapia circolano convinzioni che fanno rimandare le cose. Queste sono le
              quattro che sentiamo più spesso.
            </p>

            <div className="space-y-7 mb-12">
              {credenze.map((voce, idx) => (
                <motion.div
                  key={voce.credenza}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + idx * 0.12 }}
                  className="border-l border-white/15 pl-6"
                >
                  <p className="text-gray-500 text-sm font-light line-through decoration-white/25 mb-1.5">
                    {voce.credenza}
                  </p>
                  <p className={`${voce.accento} text-lg font-light leading-snug`}>
                    {voce.ribaltamento}
                  </p>
                </motion.div>
              ))}
            </div>

            <ArrowButton to="/chi-siamo" variant="secondary">
              Scopri chi siamo
            </ArrowButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
