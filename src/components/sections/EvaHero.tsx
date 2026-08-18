import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { immagini } from '../../data/site';

/**
 * Apertura della pagina Chi Siamo: il logo che si apre nei nomi.
 *
 * Ricrea la scritta del marchio nello stile del logo (Nunito) — "Fisio" in
 * teal, "EVA" in lilla — ma disposta in verticale:
 *
 *     Fisio
 *     E
 *     V
 *     A
 *
 * Poi, scorrendo, ogni lettera di EVA "diventa" il nome della titolare:
 * E → Elisa, V → Veronica, A → Azzurra. Sono le iniziali, lette dall'alto
 * dicono ancora EVA, e insieme a "Fisio" ricompongono FisioEVA.
 *
 *  - Desktop: la crescita dei nomi è agganciata allo scroll (sticky). In tre
 *    scatti escono i tre nomi, poi il sottotitolo, poi si prosegue.
 *  - Mobile / reduced-motion: niente pin (lo scroll-scrubbing sul telefono dà
 *    attrito). I nomi si completano da soli, in sequenza.
 *
 * Driver: `scrollY` grezzo con soglie sul viewport — monotòno e stabile.
 */

const NOMI = [
  { iniziale: 'E', resto: 'lisa' },
  { iniziale: 'V', resto: 'eronica' },
  { iniziale: 'A', resto: 'zzurra' },
] as const;

const SIZE = 'font-logo leading-[1.05] tracking-tight text-[3.25rem] sm:text-7xl md:text-8xl';
const FISIO = `${SIZE} font-medium text-brand-secondary`;
const INIZIALE = `${SIZE} font-medium text-brand-primary`;
const RESTO = `${SIZE} font-light text-white`;
const SOTTOTITOLO = 'Tre professioniste, un unico modo di prendersi cura di te.';

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

function useVh() {
  const [vh, setVh] = useState(800);
  useEffect(() => {
    const aggiorna = () => setVh(window.innerHeight);
    aggiorna();
    window.addEventListener('resize', aggiorna);
    return () => window.removeEventListener('resize', aggiorna);
  }, []);
  return vh;
}

function Sfondo() {
  return (
    <>
      <img
        src={immagini.trattamento}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-brand-dark/88"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/55 to-brand-dark/75"></div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[40%] -right-[5%] h-[140%] w-[50%] rounded-full bg-brand-primary/12 blur-[120px]"></div>
        <div className="absolute -bottom-[60%] -left-[5%] h-[140%] w-[50%] rounded-full bg-brand-secondary/12 blur-[120px]"></div>
      </div>
    </>
  );
}

function Raccordo() {
  return (
    <>
      <p className="text-lead mx-auto mt-10 max-w-2xl text-center font-light text-gray-200 md:mt-12">
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
    </>
  );
}

/** Il resto del nome che cresce dall'iniziale man mano che scorri [da, a] (px). */
function RestoScroll({
  scrollY,
  da,
  a,
  children,
}: {
  scrollY: MotionValue<number>;
  da: number;
  a: number;
  children: React.ReactNode;
}) {
  const opacity = useTransform(scrollY, [da, a], [0, 1]);
  const x = useTransform(scrollY, [da, a], [-14, 0]);
  return (
    <motion.span style={{ opacity, x }} className={RESTO}>
      {children}
    </motion.span>
  );
}

/** La scritta "Fisio / EVA", con EVA che diventa i nomi. `progress` opzionale
 *  per la versione desktro agganciata allo scroll. */
function Marchio({
  scrollY,
  vh,
  reduce,
}: {
  scrollY?: MotionValue<number>;
  vh: number;
  reduce: boolean;
}) {
  return (
    <div className="flex justify-center" role="img" aria-label="FisioEVA: Elisa, Veronica e Azzurra">
      <div className="inline-flex flex-col items-start gap-1 md:gap-2">
        <span className={FISIO}>Fisio</span>
        {NOMI.map((n, i) => (
          <div key={n.iniziale} className="flex items-baseline">
            <span className={INIZIALE}>{n.iniziale}</span>
            {scrollY ? (
              <RestoScroll scrollY={scrollY} da={(0.2 + i * 0.45) * vh} a={(0.55 + i * 0.45) * vh}>
                {n.resto}
              </RestoScroll>
            ) : (
              <motion.span
                initial={reduce ? false : { opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: reduce ? 0 : 0.4 + i * 0.3 }}
                className={RESTO}
              >
                {n.resto}
              </motion.span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Versione desktop: EVA cresce nei nomi agganciata allo scroll, con pin. */
function HeroScroll({ vh }: { vh: number }) {
  const { scrollY } = useScroll();
  // Il sottotitolo entra dopo il terzo nome (~1.45vh di scroll).
  const raccordoOpacity = useTransform(scrollY, [1.6 * vh, 1.95 * vh], [0, 1]);
  const raccordoY = useTransform(scrollY, [1.6 * vh, 1.95 * vh], [28, 0]);
  return (
    <div className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-5 sm:px-6">
        <Sfondo />
        <div className="relative z-10 w-full max-w-4xl">
          <p className="text-eyebrow mb-8 text-center font-semibold tracking-wider text-brand-primary uppercase md:mb-10">
            Chi siamo
          </p>
          <Marchio scrollY={scrollY} vh={vh} reduce={false} />
          <motion.div style={{ opacity: raccordoOpacity, y: raccordoY }}>
            <Raccordo />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/** Versione mobile / reduced-motion: nomi a tempo, senza pin. */
function HeroTimed({ reduce, vh }: { reduce: boolean; vh: number }) {
  const ritardoRaccordo = reduce ? 0 : NOMI.length * 0.3 + 0.5;
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-5 pt-28 pb-16 sm:px-6">
      <Sfondo />
      <div className="relative z-10 w-full max-w-4xl">
        <p className="text-eyebrow mb-8 text-center font-semibold tracking-wider text-brand-primary uppercase">
          Chi siamo
        </p>
        <Marchio vh={vh} reduce={reduce} />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: ritardoRaccordo }}
        >
          <Raccordo />
        </motion.div>
      </div>
    </section>
  );
}

export default function EvaHero() {
  const reduce = useReducedMotion();
  const isDesktop = useIsDesktop();
  const vh = useVh();

  if (isDesktop && !reduce) {
    return <HeroScroll vh={vh} />;
  }
  return <HeroTimed reduce={!!reduce} vh={vh} />;
}
