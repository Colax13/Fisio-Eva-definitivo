import { motion } from 'motion/react';
import { immagini } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';

/**
 * Fascia dedicata alla donna: larga per spezzare il ritmo, ma bassa e asciutta.
 * Sta subito dopo i percorsi generali. Poche voci come pillole e un CTA che
 * porta ai trattamenti donna nella pagina Servizi.
 */
const voci = ['Gravidanza', 'Post-parto', 'Pavimento pelvico', 'Cicatrice da cesareo'];

export default function PercorsoDonna() {
  return (
    <section className="relative overflow-hidden bg-brand-dark">
      <img
        src={immagini.donna}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="max-w-xl"
        >
          <p className="mb-4 text-eyebrow font-semibold uppercase tracking-wider text-brand-primary">
            Un percorso dedicato
          </p>

          <h2 className="mb-4 text-h2 font-sans font-bold text-white">
            La cura <span className="text-brand-primary">della donna</span>
          </h2>

          <p className="mb-6 max-w-md text-body font-light leading-relaxed text-gray-200">
            Un'attenzione specifica per ciò di cui spesso si parla troppo poco.
          </p>

          <ul className="mb-8 flex flex-wrap gap-2.5">
            {voci.map((v) => (
              <li
                key={v}
                className="rounded-full border border-white/25 px-4 py-2 text-sm font-light text-white"
              >
                {v}
              </li>
            ))}
          </ul>

          <ArrowButton to="/servizi#salute-della-donna" variant="ghost" block={false}>
            Scopri di più
          </ArrowButton>
        </motion.div>
      </div>
    </section>
  );
}
