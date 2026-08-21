import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { useEffect } from 'react';

type Props = {
  /**
   * Ancorato al viewport invece che alla sezione.
   *
   * Serve per montarlo una volta sola dietro tutta la pagina: le onde non
   * ripartono da capo a ogni blocco e il fondo resta continuo mentre si scorre,
   * invece di comparire solo in una sezione e sparire in quella dopo.
   */
  fisso?: boolean;
};

/*
 * Le onde, ferme.
 *
 * Prima ognuno degli otto tracciati riscriveva il proprio attributo `d` a ogni
 * fotogramma, per sempre. Due problemi, uno visibile e uno no:
 *
 *  1. In console, su ogni pagina: `<path> attribute d: Expected moveto path
 *     command ('M' or 'm'), "undefined"`. Al primo fotogramma il valore
 *     interpolato non c'era ancora e finiva nell'attributo la stringa
 *     "undefined", che il browser rifiuta.
 *
 *  2. Il costo. Ogni tracciato passa dentro una sfocatura gaussiana con
 *     `stdDeviation` 50 o 30, su una superficie grande quanto lo schermo.
 *     Cambiare `d` obbliga il browser a ricalcolare quella sfocatura da capo,
 *     sessanta volte al secondo, senza mai fermarsi: sul telefono e' il tipo di
 *     lavoro che si sente come scorrimento a scatti e batteria che cala.
 *
 * I tracciati ora sono statici — sono i primi fotogrammi di prima, quindi il
 * disegno di partenza e' identico — e il movimento lo fanno due gruppi che
 * scivolano e respirano con una `transform`. La differenza e' che una
 * trasformazione la gestisce il compositore: la sfocatura viene calcolata una
 * volta e poi solo spostata.
 */

const ONDE_VERDI = [
  { d: 'M0,150 C300,450 500,-100 1000,250 L1000,0 L0,0 Z', filtro: 'url(#blur-heavy)' },
  { d: 'M0,50 C400,350 600,-50 1000,150 L1000,0 L0,0 Z', filtro: 'url(#blur-medium)' },
];

const ONDE_LILLA = [
  { d: 'M0,850 C400,650 600,1100 1000,750 L1000,1000 L0,1000 Z', filtro: 'url(#blur-heavy)' },
  { d: 'M0,950 C300,750 500,1050 1000,850 L1000,1000 L0,1000 Z', filtro: 'url(#blur-medium)' },
];

const FILI_VERDI = [
  { d: 'M0,200 C300,450 500,0 1000,250', larghezza: 2, opacita: 0.2 },
  { d: 'M0,160 C320,400 480,-50 1000,280', larghezza: 1.5, opacita: 0.25 },
];

const FILI_LILLA = [
  { d: 'M0,800 C400,600 600,1000 1000,750', larghezza: 2, opacita: 0.2 },
  { d: 'M0,850 C380,550 620,1050 1000,700', larghezza: 1.5, opacita: 0.25 },
];

export function WaveBackground({ fisso = false }: Props) {
  const menoAnimazioni = useReducedMotion();

  /*
   * La parallasse del mouse su valori di movimento e non su `useState`.
   *
   * Con lo stato, ogni singolo evento `mousemove` faceva rieseguire il
   * componente: decine di render al secondo per spostare un fondo decorativo.
   * Cosi' il valore cambia fuori da React e tocca solo la `transform`.
   */
  const puntatoreX = useMotionValue(0);
  const puntatoreY = useMotionValue(0);
  const x = useSpring(puntatoreX, { stiffness: 30, damping: 20 });
  const y = useSpring(puntatoreY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    // Su un telefono il mouse non c'e', e restare in ascolto costa soltanto
    // batteria. Stesso discorso per chi ha chiesto meno animazioni al sistema.
    const puntatorePreciso = window.matchMedia('(pointer: fine)').matches;
    if (!puntatorePreciso || menoAnimazioni) return;

    const onMove = (e: MouseEvent) => {
      puntatoreX.set((e.clientX / window.innerWidth - 0.5) * 40);
      puntatoreY.set((e.clientY / window.innerHeight - 0.5) * 40);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [menoAnimazioni, puntatoreX, puntatoreY]);

  /* Il respiro lento dei due gruppi. A `prefers-reduced-motion` resta fermo. */
  const derivaVerde = menoAnimazioni
    ? undefined
    : { x: [0, 24, 0], y: [0, -14, 0], scale: [1, 1.04, 1] };
  const derivaLilla = menoAnimazioni
    ? undefined
    : { x: [0, -20, 0], y: [0, 12, 0], scale: [1, 1.05, 1] };

  return (
    <div
      className={`${
        fisso ? 'fixed' : 'absolute'
      } inset-0 overflow-hidden pointer-events-none bg-[#fbf9f8] z-0`}
      aria-hidden="true"
    >
      <motion.div style={{ x, y }} className="absolute inset-[-15%] h-[130%] w-[130%]">
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="h-full w-full opacity-80">
          <defs>
            <linearGradient id="grad-teal-light" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#76c6b7" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#76c6b7" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="grad-purple-light" x1="100%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#c29bc9" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#c29bc9" stopOpacity="0" />
            </linearGradient>
            <filter id="blur-heavy" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="50" />
            </filter>
            <filter id="blur-medium" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="30" />
            </filter>
          </defs>

          {/* Verde acqua, in alto a sinistra */}
          <motion.g
            animate={derivaVerde}
            transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
            style={{ originX: '0px', originY: '0px' }}
          >
            {ONDE_VERDI.map((onda) => (
              <path key={onda.d} d={onda.d} fill="url(#grad-teal-light)" filter={onda.filtro} />
            ))}
            {FILI_VERDI.map((filo) => (
              <path
                key={filo.d}
                d={filo.d}
                stroke="#76c6b7"
                strokeWidth={filo.larghezza}
                fill="none"
                opacity={filo.opacita}
              />
            ))}
          </motion.g>

          {/* Lilla, in basso a destra */}
          <motion.g
            animate={derivaLilla}
            transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            style={{ originX: '1000px', originY: '1000px' }}
          >
            {ONDE_LILLA.map((onda) => (
              <path key={onda.d} d={onda.d} fill="url(#grad-purple-light)" filter={onda.filtro} />
            ))}
            {FILI_LILLA.map((filo) => (
              <path
                key={filo.d}
                d={filo.d}
                stroke="#c29bc9"
                strokeWidth={filo.larghezza}
                fill="none"
                opacity={filo.opacita}
              />
            ))}
          </motion.g>
        </svg>
      </motion.div>
    </div>
  );
}
