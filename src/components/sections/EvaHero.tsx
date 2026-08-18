import { useEffect, useState } from 'react';
import { motion, useScroll, useMotionValueEvent, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';
import { immagini } from '../../data/site';

/**
 * Apertura della pagina Chi Siamo: il logo che si apre nei nomi.
 *
 * All'apertura si vede "FisioEVA" grosso, tutto su una riga, nello stile e nei
 * colori del logo (Fisio teal, EVA lilla). Appena si scorre un po', le tre
 * lettere di EVA si spostano e vanno a comporre i nomi delle titolari —
 * E → Elisa, V → Veronica, A → Azzurra — con "Fisio" che sale in cima. Sotto
 * compare il sottotitolo. Scorrendo ancora si prosegue nella pagina.
 *
 * Il movimento delle lettere è reale: gli stessi elementi passano dalla riga
 * orizzontale alla colonna grazie al `layout` di motion (FLIP). Non è agganciato
 * pixel-per-pixel allo scroll (che dava attrito): una piccola soglia di scroll
 * fa scattare la transizione, che poi si gioca liscia. È reversibile: tornando
 * su, i nomi si richiudono in FisioEVA.
 *
 *  - Desktop: pin corto, la soglia di scroll apre/chiude.
 *  - Mobile / reduced-motion: nessun pin, i nomi si compongono da soli.
 */

const NOMI = [
  { iniziale: 'E', resto: 'lisa' },
  { iniziale: 'V', resto: 'eronica' },
  { iniziale: 'A', resto: 'zzurra' },
] as const;

const SIZE = 'font-logo leading-[1.02] tracking-tight text-[3rem] sm:text-7xl md:text-8xl';
const FISIO = `${SIZE} font-medium text-brand-secondary`;
const INIZIALE = `${SIZE} font-medium text-brand-primary`;
const RESTO = `${SIZE} font-light text-white`;
const SOTTOTITOLO = 'Tre professioniste, un unico modo di prendersi cura di te.';
const LAYOUT_T = { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

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

/**
 * La scritta che si apre. `aperto` decide se è "FisioEVA" (riga) o i nomi
 * (colonna). Gli stessi elementi si spostano con `layout`.
 */
function Marchio({ aperto }: { aperto: boolean }) {
  return (
    <div className="flex justify-center" role="img" aria-label="FisioEVA: Elisa, Veronica e Azzurra">
      <motion.div
        layout
        transition={LAYOUT_T}
        className={`flex ${aperto ? 'flex-col items-start gap-1 md:gap-2' : 'items-baseline'}`}
      >
        <motion.span layout transition={LAYOUT_T} className={FISIO}>
          Fisio
        </motion.span>
        {NOMI.map((n) => (
          <motion.div layout transition={LAYOUT_T} key={n.iniziale} className="flex items-baseline">
            <span className={INIZIALE}>{n.iniziale}</span>
            {aperto && (
              <motion.span
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.28 }}
                className={RESTO}
              >
                {n.resto}
              </motion.span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function Raccordo({ visibile, reduce }: { visibile: boolean; reduce: boolean }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: visibile ? 1 : 0, y: visibile ? 0 : 20 }}
      transition={{ duration: 0.5, delay: visibile && !reduce ? 0.35 : 0 }}
      aria-hidden={!visibile}
    >
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
    </motion.div>
  );
}

/** Desktop: pin corto, una soglia di scroll apre/chiude la scritta. */
function HeroScroll({ vh }: { vh: number }) {
  const { scrollY } = useScroll();
  const [aperto, setAperto] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => {
    const deveAprirsi = v > 0.16 * vh;
    setAperto((prev) => (prev === deveAprirsi ? prev : deveAprirsi));
  });

  return (
    <div className="relative h-[180vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-5 sm:px-6">
        <Sfondo />
        <div className="relative z-10 w-full max-w-5xl">
          <p className="text-eyebrow mb-8 text-center font-semibold tracking-wider text-brand-primary uppercase md:mb-10">
            Chi siamo
          </p>
          <Marchio aperto={aperto} />
          <Raccordo visibile={aperto} reduce={false} />
        </div>
      </div>
    </div>
  );
}

/** Mobile / reduced-motion: nessun pin, i nomi si compongono da soli. */
function HeroTimed({ reduce }: { reduce: boolean }) {
  const [aperto, setAperto] = useState(reduce);
  useEffect(() => {
    if (reduce) return;
    const t = setTimeout(() => setAperto(true), 1100);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-5 pt-28 pb-16 sm:px-6">
      <Sfondo />
      <div className="relative z-10 w-full max-w-5xl">
        <p className="text-eyebrow mb-8 text-center font-semibold tracking-wider text-brand-primary uppercase">
          Chi siamo
        </p>
        <Marchio aperto={aperto} />
        <Raccordo visibile={aperto} reduce={reduce} />
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
  return <HeroTimed reduce={!!reduce} />;
}
