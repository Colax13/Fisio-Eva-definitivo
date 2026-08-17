import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

/**
 * Apertura scenografica della pagina Chi Siamo.
 *
 * Racconta il significato del marchio: EVA sono le iniziali delle tre titolari.
 *
 *   1. All'apertura appare il logo FisioEVA.
 *   2. Il logo si ritira e le lettere di EVA "si abbassano" una alla volta,
 *      aprendo i nomi: E → Elisa, V → Veronica, A → Azzurra.
 *   3. Sotto, un sottotitolo fa da raccordo verso il resto della pagina.
 *
 * È un'animazione a tempo (parte da sola, una volta), non agganciata alla
 * rotella dello scroll: lo scroll-scrubbing con il pin dava scatti e attrito, e
 * qui serve solo scorrere con naturalezza verso il Chi Siamo. Con
 * `prefers-reduced-motion` si vede subito lo stato finale, fermo.
 */

const NOMI = [
  { iniziale: 'E', resto: 'lisa' },
  { iniziale: 'V', resto: 'eronica' },
  { iniziale: 'A', resto: 'zzurra' },
] as const;

// Dimensione condivisa. Colore e peso li mette ogni pezzo: l'iniziale in lilla e
// peso medium come la "EVA" del logo, il resto del nome in bianco più sottile.
const SIZE = 'font-logo leading-none tracking-tight text-[3.25rem] sm:text-7xl md:text-8xl';
const INIZIALE = `${SIZE} font-medium text-brand-primary`;
const RESTO = `${SIZE} font-light text-white`;

const SOTTOTITOLO =
  'Tre professioniste, un unico modo di prendersi cura di te: ascoltare prima, trattare poi, e non lasciarti mai da solo nel mezzo.';

function ColonnaNomi({ reduce }: { reduce: boolean }) {
  return (
    <div className="flex justify-center" role="img" aria-label="EVA: Elisa, Veronica e Azzurra">
      <div className="inline-flex flex-col items-start gap-1 md:gap-2">
        {NOMI.map((n, i) => (
          <div key={n.iniziale} className="flex items-baseline">
            <motion.span
              // La lettera "si abbassa": entra dall'alto e si posa.
              initial={reduce ? false : { opacity: 0, y: -55 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={INIZIALE}
            >
              {n.iniziale}
            </motion.span>
            <motion.span
              initial={reduce ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : i * 0.22 + 0.32 }}
              className={RESTO}
            >
              {n.resto}
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function EvaHero() {
  const reduce = useReducedMotion();
  const [fase, setFase] = useState<'logo' | 'nomi'>(reduce ? 'nomi' : 'logo');

  useEffect(() => {
    if (reduce) {
      setFase('nomi');
      return;
    }
    const t = setTimeout(() => setFase('nomi'), 1200);
    return () => clearTimeout(t);
  }, [reduce]);

  // Il sottotitolo/briciole entrano dopo che i tre nomi si sono posati.
  const ritardoRaccordo = reduce ? 0 : NOMI.length * 0.22 + 0.55;

  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-brand-dark px-5 pt-28 pb-16 sm:px-6 md:min-h-[88vh] md:pt-40 md:pb-24">
      {/* Alone del marchio, come negli altri hero */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-[40%] -right-[5%] h-[140%] w-[50%] rounded-full bg-brand-primary/20 blur-[120px]"></div>
        <div className="absolute -bottom-[60%] -left-[5%] h-[140%] w-[50%] rounded-full bg-brand-secondary/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {fase === 'logo' ? (
            <motion.img
              key="logo"
              src="/logo.svg"
              alt="FisioEVA"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.06, y: -34 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="mx-auto w-[250px] sm:w-[330px] md:w-[430px]"
            />
          ) : (
            <motion.div key="nomi" initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
              <motion.p
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-eyebrow mb-10 text-center font-semibold tracking-wider text-brand-primary uppercase md:mb-14"
              >
                Chi siamo
              </motion.p>

              <ColonnaNomi reduce={!!reduce} />

              <motion.div
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: ritardoRaccordo }}
              >
                <p className="text-lead mx-auto mt-12 max-w-2xl text-center font-light text-gray-300 md:mt-16">
                  {SOTTOTITOLO}
                </p>

                <nav
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
                </nav>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
