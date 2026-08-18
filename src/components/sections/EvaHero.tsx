import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from 'motion/react';
import { Link } from 'react-router-dom';
import { immagini } from '../../data/site';

/**
 * Apertura della pagina Chi Siamo.
 *
 * Su una foto di sfondo dello studio compaiono l'occhiello "Chi siamo" e il
 * titolo. Poi, scorrendo, escono a uno a uno i tre nomi delle titolari — le cui
 * iniziali compongono EVA: E → Elisa, V → Veronica, A → Azzurra — seguiti dal
 * sottotitolo. Dopodiché si prosegue nel resto della pagina.
 *
 *  - Desktop: la rivelazione è agganciata allo scroll (sticky). In tre "scatti"
 *    di scroll escono i tre nomi. È qui che l'effetto rende di più.
 *  - Mobile / prefers-reduced-motion: niente pin (lo scroll-scrubbing sul
 *    telefono dà attrito). I nomi entrano da soli, in sequenza, una volta.
 *
 * Il driver dello scroll usa `scrollY` grezzo (monotòno) con soglie calcolate
 * sull'altezza del viewport: robusto, non soffre dei salti di progress che il
 * pin puro dava quando il layout sotto cambiava.
 */

const NOMI = [
  { iniziale: 'E', resto: 'lisa' },
  { iniziale: 'V', resto: 'eronica' },
  { iniziale: 'A', resto: 'zzurra' },
] as const;

const SIZE = 'font-logo leading-none tracking-tight text-[2.75rem] sm:text-6xl md:text-7xl';
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
      <div className="absolute inset-0 bg-brand-dark/85"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-brand-dark/70"></div>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[40%] -right-[5%] h-[140%] w-[50%] rounded-full bg-brand-primary/15 blur-[120px]"></div>
        <div className="absolute -bottom-[60%] -left-[5%] h-[140%] w-[50%] rounded-full bg-brand-secondary/15 blur-[120px]"></div>
      </div>
    </>
  );
}

function Intestazione() {
  return (
    <>
      <p className="text-eyebrow mb-5 text-center font-semibold tracking-wider text-brand-primary uppercase">
        Chi siamo
      </p>
      <h1 className="mb-10 text-center text-2xl font-sans font-bold text-white sm:text-3xl md:mb-14 md:text-4xl">
        Le professioniste al tuo fianco in <span className="text-brand-primary">FisioEVA</span>
      </h1>
    </>
  );
}

function Nome({ iniziale, resto }: { iniziale: string; resto: string }) {
  return (
    <div className="flex items-baseline">
      <span className={INIZIALE}>{iniziale}</span>
      <span className={RESTO}>{resto}</span>
    </div>
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

/** Un blocco che si rivela man mano che `scrollY` attraversa [da, a] (in px). */
function Rivela({
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
  const y = useTransform(scrollY, [da, a], [42, 0]);
  return (
    <motion.div style={{ opacity, y }}>{children}</motion.div>
  );
}

/** Versione desktop: rivelazione agganciata allo scroll, con pin. */
function HeroScroll({ vh }: { vh: number }) {
  const { scrollY } = useScroll();
  return (
    <div className="relative h-[320vh]">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-5 sm:px-6">
        <Sfondo />
        <div className="relative z-10 w-full max-w-4xl pt-16">
          <Intestazione />

          <div className="flex justify-center">
            <div className="inline-flex flex-col items-start gap-1 md:gap-2">
              <Rivela scrollY={scrollY} da={0.15 * vh} a={0.5 * vh}>
                <Nome iniziale="E" resto="lisa" />
              </Rivela>
              <Rivela scrollY={scrollY} da={0.6 * vh} a={0.95 * vh}>
                <Nome iniziale="V" resto="eronica" />
              </Rivela>
              <Rivela scrollY={scrollY} da={1.05 * vh} a={1.4 * vh}>
                <Nome iniziale="A" resto="zzurra" />
              </Rivela>
            </div>
          </div>

          <Rivela scrollY={scrollY} da={1.55 * vh} a={1.9 * vh}>
            <Raccordo />
          </Rivela>
        </div>
      </div>
    </div>
  );
}

/** Versione mobile / reduced-motion: nomi a tempo, senza pin. */
function HeroTimed({ reduce }: { reduce: boolean }) {
  const ritardoRaccordo = reduce ? 0 : NOMI.length * 0.28 + 0.5;
  return (
    <section className="relative flex min-h-[88vh] items-center justify-center overflow-hidden px-5 pt-28 pb-16 sm:px-6">
      <Sfondo />
      <div className="relative z-10 w-full max-w-4xl">
        <Intestazione />

        <div className="flex justify-center" role="img" aria-label="EVA: Elisa, Veronica e Azzurra">
          <div className="inline-flex flex-col items-start gap-1 md:gap-2">
            {NOMI.map((n, i) => (
              <motion.div
                key={n.iniziale}
                initial={reduce ? false : { opacity: 0, y: -42 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: reduce ? 0 : i * 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <Nome iniziale={n.iniziale} resto={n.resto} />
              </motion.div>
            ))}
          </div>
        </div>

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
  return <HeroTimed reduce={!!reduce} />;
}
