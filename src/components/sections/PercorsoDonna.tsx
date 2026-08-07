import { motion } from 'motion/react';
import { immagini } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';
import Eyebrow from '../ui/Eyebrow';

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
    <section className="relative overflow-hidden bg-brand-light px-5 py-16 sm:px-6 md:py-24 lg:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[15%] -left-[10%] h-[70%] w-[55%] rounded-full bg-brand-primary/15 blur-[120px]"></div>
        <div className="absolute -right-[10%] -bottom-[20%] h-[60%] w-[50%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
        {/* Immagine con la forma morbida usata nel resto del sito */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative order-2 mx-auto aspect-square w-full max-w-[280px] sm:max-w-[380px] lg:order-1 lg:mx-0 lg:aspect-auto lg:h-[460px] lg:max-w-[420px]"
        >
          <div
            className="animate-blob absolute inset-0 z-10 bg-gradient-to-tr from-brand-primary/40 to-brand-secondary/40"
            style={{ borderRadius: '50% 50% 50% 50% / 55% 45% 45% 55%' }}
          ></div>
          <div
            className="absolute inset-[4%] z-20 overflow-hidden border-[4px] border-white bg-white shadow-lg"
            style={{ borderRadius: '55% 45% 45% 55% / 50% 50% 50% 50%' }}
          >
            <img
              src={immagini.donna}
              alt="Percorso dedicato alla salute della donna"
              loading="lazy"
              className="h-full w-full scale-105 object-cover"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="order-1 text-center lg:order-2 lg:text-left"
        >
          <Eyebrow align="left" className="mb-5">
            Percorso donna
          </Eyebrow>

          <h2 className="text-h2 mb-5 font-sans font-light text-brand-dark">
            La cura di cui spesso{' '}
            <span className="font-medium text-brand-primary-ink">nessuno parla</span>
          </h2>

          <p className="text-lead mx-auto mb-8 max-w-xl font-light text-gray-600 lg:mx-0">
            È la parte del lavoro su cui lo studio si è specializzato. Si parte sempre da una
            valutazione, in uno spazio riservato e con i tuoi tempi.
          </p>

          <ul className="mb-8 space-y-4 text-left">
            {voci.map((voce, idx) => (
              <motion.li
                key={voce.titolo}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.2 + idx * 0.1 }}
                className="rounded-3xl border border-white bg-white/70 px-5 py-4 shadow-sm backdrop-blur-md sm:px-6 sm:py-5"
              >
                <h3 className="mb-1 font-sans font-semibold text-brand-dark">{voce.titolo}</h3>
                <p className="text-sm leading-relaxed font-light text-gray-600">{voce.testo}</p>
              </motion.li>
            ))}
          </ul>

          <div className="flex justify-center lg:justify-start">
            <ArrowButton to="/servizi">Scopri il percorso</ArrowButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
