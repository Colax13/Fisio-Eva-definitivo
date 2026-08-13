import { motion } from 'motion/react';
import { immagini, trattamentiDi } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';

/**
 * Sezione a schermo pieno dedicata alla donna.
 *
 * Sta subito dopo i percorsi generali e spezza il ritmo delle card bianche con
 * un blocco scuro a tutta altezza. Non toglie nulla al taglio generalista del
 * resto della home: dà alla specializzazione femminile uno spazio suo.
 *
 * Le voci arrivano dalla categoria "salute-della-donna" dei trattamenti, così
 * restano allineate alla pagina Servizi. Il CTA porta proprio a quella sezione.
 */
export default function PercorsoDonna() {
  const voci = trattamentiDi('salute-della-donna').slice(0, 4);

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-brand-dark">
      {/* Immagine di sfondo a tutta sezione con velatura scura per la leggibilità. */}
      <img
        src={immagini.donna}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/75 to-brand-dark/40" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <p className="mb-5 text-eyebrow font-semibold uppercase tracking-wider text-brand-primary">
            Un percorso dedicato
          </p>

          <h2 className="text-h2 font-sans font-bold text-white mb-6">
            La cura della donna, <span className="text-brand-primary">in ogni fase</span>
          </h2>

          <p className="max-w-xl text-lg font-light leading-relaxed text-gray-200 mb-10">
            Dalla gravidanza al post-parto, dal pavimento pelvico alla cicatrice da cesareo:
            un'attenzione specifica per ciò di cui spesso si parla troppo poco, con la stessa cura
            che dedichiamo a ogni persona.
          </p>

          <ul className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {voci.map((v) => (
              <li
                key={v.slug}
                className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm"
              >
                <p className="font-sans font-semibold text-white">{v.nome}</p>
                <p className="mt-1 text-sm font-light leading-relaxed text-gray-300">
                  {v.sottotitolo}
                </p>
              </li>
            ))}
          </ul>

          <ArrowButton to="/servizi#salute-della-donna" variant="ghost">
            Scopri di più
          </ArrowButton>
        </motion.div>
      </div>
    </section>
  );
}
