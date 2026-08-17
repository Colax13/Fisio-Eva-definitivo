import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

/**
 * Apertura scenografica della pagina Chi Siamo.
 *
 * EVA non è un nome inventato: è la sintesi delle tre titolari. Le tre lettere
 * entrano sovrapposte al centro come un unico marchio e si aprono in tre
 * colonne, ognuna con il proprio nome.
 *
 * L'effetto è "a tempo", non legato allo scroll: parte da solo al caricamento,
 * dura un paio di secondi e poi resta fermo. Lo scroll serve solo a scendere
 * nel resto della pagina, senza attriti.
 *
 *  - Desktop: dopo l'apertura le lettere restano interattive. Passando il mouse
 *    su una lettera si illumina il nome corrispondente.
 *  - Mobile: il tap per rivelare i nomi sarebbe un attrito, quindi i tre nomi
 *    compaiono da soli in sequenza (autoplay), una volta sola.
 *
 * Chi ha chiesto meno animazioni al sistema operativo vede subito lo stato
 * finale, con tutti i nomi già leggibili.
 */

type Lettera = {
  lettera: string;
  nome: string;
  /** Spostamento orizzontale iniziale: porta le lettere verso il centro. */
  da: number;
};

const LETTERE: Lettera[] = [
  { lettera: 'E', nome: 'Elisa', da: 150 },
  { lettera: 'V', nome: 'Veronica', da: 0 },
  { lettera: 'A', nome: 'Azzurra', da: -150 },
];

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (hover: hover)');
    const aggiorna = () => setIsDesktop(mq.matches);
    aggiorna();
    mq.addEventListener('change', aggiorna);
    return () => mq.removeEventListener('change', aggiorna);
  }, []);

  return isDesktop;
}

export default function EvaHero() {
  const isDesktop = useIsDesktop();
  const reduce = useReducedMotion();
  const [attiva, setAttiva] = useState<number | null>(null);

  // Con animazioni ridotte mostriamo tutto subito e fermo.
  const statico = !!reduce;

  return (
    <section className="relative flex min-h-[85vh] items-center overflow-hidden bg-brand-dark px-5 pt-28 pb-16 sm:px-6 md:min-h-[90vh] md:pt-40 md:pb-24">
      {/* Alone del marchio, come negli altri hero */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-[40%] -right-[5%] h-[140%] w-[50%] rounded-full bg-brand-primary/20 blur-[120px]"></div>
        <div className="absolute -bottom-[60%] -left-[5%] h-[140%] w-[50%] rounded-full bg-brand-secondary/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-5xl text-center">
        <motion.p
          initial={statico ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-eyebrow mb-8 font-semibold tracking-wider text-brand-primary uppercase md:mb-12"
        >
          Chi siamo
        </motion.p>

        {/* Le tre lettere / colonne */}
        <div
          className="flex items-start justify-center gap-6 sm:gap-10 md:gap-16"
          role="img"
          aria-label="EVA: Elisa, Veronica e Azzurra"
        >
          {LETTERE.map((l, idx) => {
            const evidenziata = isDesktop ? attiva === idx : true;

            return (
              <motion.div
                key={l.lettera}
                initial={statico ? false : { x: l.da, opacity: 0, scale: 0.8 }}
                animate={{ x: 0, opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.3 + idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col items-center"
                onMouseEnter={isDesktop ? () => setAttiva(idx) : undefined}
                onMouseLeave={isDesktop ? () => setAttiva(null) : undefined}
              >
                <span
                  aria-hidden="true"
                  className={`font-sans text-[5rem] leading-none font-bold tracking-tight transition-colors duration-500 select-none sm:text-[7rem] md:text-[10rem] ${
                    evidenziata ? 'text-brand-primary' : 'text-white'
                  }`}
                >
                  {l.lettera}
                </span>

                {/* Il nome: su desktop dim finché non passi sopra, su mobile
                    compare da solo in sequenza. */}
                {isDesktop && !statico ? (
                  <span
                    className={`mt-2 font-sans text-base font-medium tracking-widest uppercase transition-all duration-500 sm:text-lg ${
                      evidenziata
                        ? 'translate-y-0 text-white opacity-100'
                        : 'translate-y-1 text-white/30 opacity-60'
                    }`}
                  >
                    {l.nome}
                  </span>
                ) : (
                  <motion.span
                    initial={statico ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 + idx * 0.35 }}
                    className="mt-2 font-sans text-base font-medium tracking-widest text-white uppercase sm:text-lg"
                  >
                    {l.nome}
                  </motion.span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Suggerimento discreto solo su desktop, dove l'interazione è a hover. */}
        {isDesktop && !statico && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: attiva === null ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 2 }}
            className="mt-10 text-sm font-light text-gray-400"
          >
            Passa sopra le lettere
          </motion.p>
        )}

        <motion.p
          initial={statico ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: statico ? 0 : 2.4 }}
          className="text-lead mx-auto mt-8 max-w-2xl font-light text-gray-300 md:mt-12"
        >
          Tre professioniste, un unico modo di prendersi cura di te: ascoltare
          prima, trattare poi, e non lasciarti mai da solo nel mezzo.
        </motion.p>

        <motion.nav
          initial={statico ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: statico ? 0 : 2.6 }}
          aria-label="Percorso di navigazione"
          className="mt-8 flex items-center justify-center gap-2 text-xs tracking-wider uppercase"
        >
          <Link
            to="/"
            className="flex min-h-11 items-center px-1 text-gray-300 transition-colors hover:text-brand-secondary"
          >
            Home
          </Link>
          <span className="h-1 w-1 rounded-full bg-brand-primary" aria-hidden="true"></span>
          <span className="text-brand-primary">Chi Siamo</span>
        </motion.nav>
      </div>
    </section>
  );
}
