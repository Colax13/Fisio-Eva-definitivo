import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

/**
 * Apertura scenografica della pagina Chi Siamo.
 *
 * EVA è la sintesi delle tre titolari: le sue lettere sono le iniziali dei loro
 * nomi. La parola appare al centro — nello stesso font del logo (Nunito) e nello
 * stesso teal — poi si "apre": le tre lettere si impilano una sotto l'altra e da
 * ognuna cresce il nome intero.
 *
 *   E → Elisa
 *   V → Veronica
 *   A → Azzurra
 *
 * Lette dall'alto, le iniziali continuano a dire EVA.
 *
 * L'effetto è a tempo, non legato allo scroll: parte da solo al caricamento,
 * dura poco più di un secondo e poi resta fermo. La morfologia parola → colonna
 * usa le animazioni di layout di motion (`layoutId`), così la stessa lettera
 * scivola dalla riga orizzontale alla sua posizione in colonna.
 *
 * Con `prefers-reduced-motion` la colonna è già aperta e ferma dall'inizio.
 */

const NOMI = [
  { iniziale: 'E', resto: 'lisa' },
  { iniziale: 'V', resto: 'eronica' },
  { iniziale: 'A', resto: 'zzurra' },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function EvaHero() {
  const reduce = useReducedMotion();
  const [aperto, setAperto] = useState(false);

  useEffect(() => {
    if (reduce) {
      setAperto(true);
      return;
    }
    const t = setTimeout(() => setAperto(true), 1100);
    return () => clearTimeout(t);
  }, [reduce]);

  const dimensioneLettera =
    'font-logo font-light leading-none tracking-tight text-[3.5rem] sm:text-7xl md:text-8xl';

  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-brand-dark px-5 pt-28 pb-16 sm:px-6 md:min-h-[88vh] md:pt-40 md:pb-24">
      {/* Alone del marchio, come negli altri hero */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-[40%] -right-[5%] h-[140%] w-[50%] rounded-full bg-brand-primary/20 blur-[120px]"></div>
        <div className="absolute -bottom-[60%] -left-[5%] h-[140%] w-[50%] rounded-full bg-brand-secondary/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-eyebrow mb-10 text-center font-semibold tracking-wider text-brand-primary uppercase md:mb-14"
        >
          Chi siamo
        </motion.p>

        {/* Blocco EVA: centrato come blocco, nomi allineati a sinistra */}
        <div
          className="flex justify-center"
          role="img"
          aria-label="EVA: Elisa, Veronica e Azzurra"
        >
          {!aperto ? (
            // Fase parola: le tre iniziali in fila, come nel logo.
            <div className="flex items-baseline">
              {NOMI.map((n) => (
                <motion.span
                  key={n.iniziale}
                  layoutId={`eva-${n.iniziale}`}
                  layout
                  transition={{ duration: 0.85, ease: EASE }}
                  className={`${dimensioneLettera} text-brand-secondary`}
                >
                  {n.iniziale}
                </motion.span>
              ))}
            </div>
          ) : (
            // Fase aperta: colonna di nomi, l'iniziale è la lettera di EVA.
            <div className="inline-flex flex-col items-start gap-1 md:gap-2">
              {NOMI.map((n, idx) => (
                <div key={n.iniziale} className="flex items-baseline">
                  <motion.span
                    layoutId={`eva-${n.iniziale}`}
                    layout
                    transition={{ duration: 0.85, ease: EASE }}
                    className={`${dimensioneLettera} text-brand-secondary`}
                  >
                    {n.iniziale}
                  </motion.span>
                  <motion.span
                    initial={reduce ? false : { opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: reduce ? 0 : 0.55 + idx * 0.12 }}
                    className={`${dimensioneLettera} text-white`}
                  >
                    {n.resto}
                  </motion.span>
                </div>
              ))}
            </div>
          )}
        </div>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 1.9 }}
          className="text-lead mx-auto mt-12 max-w-2xl text-center font-light text-gray-300 md:mt-16"
        >
          Tre professioniste, un unico modo di prendersi cura di te: ascoltare
          prima, trattare poi, e non lasciarti mai da solo nel mezzo.
        </motion.p>

        <motion.nav
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 2.1 }}
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
