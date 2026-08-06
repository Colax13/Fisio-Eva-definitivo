import { motion } from 'motion/react';
import { immagini } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';

/**
 * La specializzazione dello studio.
 *
 * Sta a metà pagina, non sopra la piega: la cura per la donna è affiancata al
 * resto, non sostitutiva. Qui il tono può essere esplicito — le cose si
 * chiamano col loro nome, senza eufemismi e senza imbarazzo.
 */
const voci = [
  {
    titolo: 'Pavimento pelvico',
    testo:
      'Perdite, urgenza, pesantezza, dolore. Sono comuni, ma non sono normali: si valuta e si allena, come ogni altro gruppo muscolare.',
  },
  {
    titolo: 'Recupero post-parto',
    testo:
      'Addome, schiena e pavimento pelvico si guardano insieme, perché sono collegati. E non c\'è una scadenza oltre la quale è tardi.',
  },
  {
    titolo: 'Gravidanza',
    testo:
      'Mal di schiena, bacino, gambe gonfie. Tecniche adatte al trimestre, più la preparazione del pavimento pelvico al parto.',
  },
  {
    titolo: 'Cicatrice da cesareo',
    testo:
      'Un lavoro manuale delicato sul tessuto e sulle aderenze, per ridurre le tensioni che si scaricano su schiena e bacino.',
  },
];

export default function PercorsoDonna() {
  return (
    <section className="relative bg-brand-light overflow-hidden py-24 md:py-32 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[15%] -left-[10%] w-[55%] h-[70%] rounded-full bg-brand-primary/15 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Immagine con la forma morbida usata nel resto del sito */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative w-full max-w-[420px] mx-auto lg:mx-0 h-[380px] md:h-[460px] order-2 lg:order-1"
        >
          <div
            className="absolute inset-0 bg-gradient-to-tr from-brand-primary/40 to-brand-secondary/40 z-10 animate-blob"
            style={{ borderRadius: '50% 50% 50% 50% / 55% 45% 45% 55%' }}
          ></div>
          <div
            className="absolute inset-[4%] overflow-hidden z-20 border-[4px] border-white shadow-lg bg-white"
            style={{ borderRadius: '55% 45% 45% 55% / 50% 50% 50% 50%' }}
          >
            <img
              src={immagini.donna}
              alt="Percorso dedicato alla salute della donna"
              loading="lazy"
              className="w-full h-full object-cover scale-105"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="order-1 lg:order-2"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-brand-primary"></div>
            <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">
              Percorso donna
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-sans font-light text-brand-dark leading-tight mb-6">
            La cura di cui spesso{' '}
            <span className="text-brand-primary font-medium">nessuno parla</span>
          </h2>

          <p className="text-gray-600 text-base font-light leading-relaxed mb-10 max-w-xl">
            È la parte del lavoro su cui lo studio si è specializzato. Si parte sempre da una
            valutazione, in uno spazio riservato e con i tuoi tempi.
          </p>

          <ul className="space-y-5 mb-10">
            {voci.map((voce, idx) => (
              <motion.li
                key={voce.titolo}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2 + idx * 0.1 }}
                className="bg-white/70 backdrop-blur-md rounded-3xl border border-white shadow-sm px-6 py-5"
              >
                <h3 className="font-sans font-medium text-brand-dark mb-1">{voce.titolo}</h3>
                <p className="text-sm text-gray-600 font-light leading-relaxed">{voce.testo}</p>
              </motion.li>
            ))}
          </ul>

          <ArrowButton to="/servizi">Scopri il percorso</ArrowButton>
        </motion.div>
      </div>
    </section>
  );
}
