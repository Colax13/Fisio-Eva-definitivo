import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

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
 * Le onde del fondo, descritte come dati invece che come otto blocchi di JSX
 * quasi uguali.
 *
 * Ogni onda va dal tracciato `da` a quello `a` e torna indietro, all'infinito.
 * Prima ciascun tracciato era scritto a mano tre volte — una nell'attributo e
 * due nei fotogrammi chiave — e una modifica andava riportata in tre punti: è
 * il genere di ripetizione in cui un errore si nasconde bene, ed è esattamente
 * quello che è successo (vedi la nota su `initial`, più sotto).
 *
 * I due tracciati di un'onda devono avere gli stessi comandi nello stesso
 * ordine: l'animazione interpola i numeri, non ridisegna la forma. Cambiando
 * `C` in `Q` in uno solo dei due l'onda sparisce.
 */
type Onda = {
  da: string;
  a: string;
  gradiente: string;
  sfocatura: string;
  durata: number;
  ritardo: number;
};

const onde: Onda[] = [
  // Verdi, in alto a sinistra.
  {
    da: 'M0,150 C300,450 500,-100 1000,250 L1000,0 L0,0 Z',
    a: 'M0,250 C400,250 600,0 1000,150 L1000,0 L0,0 Z',
    gradiente: 'grad-teal-light',
    sfocatura: 'blur-heavy',
    durata: 25,
    ritardo: 0,
  },
  {
    da: 'M0,50 C400,350 600,-50 1000,150 L1000,0 L0,0 Z',
    a: 'M0,150 C300,450 500,-100 1000,250 L1000,0 L0,0 Z',
    gradiente: 'grad-teal-light',
    sfocatura: 'blur-medium',
    durata: 30,
    ritardo: 2,
  },
  // Viola, in basso a destra.
  {
    da: 'M0,850 C400,650 600,1100 1000,750 L1000,1000 L0,1000 Z',
    a: 'M0,750 C300,850 500,900 1000,850 L1000,1000 L0,1000 Z',
    gradiente: 'grad-purple-light',
    sfocatura: 'blur-heavy',
    durata: 28,
    ritardo: 0,
  },
  {
    da: 'M0,950 C300,750 500,1050 1000,850 L1000,1000 L0,1000 Z',
    a: 'M0,850 C400,650 600,1100 1000,750 L1000,1000 L0,1000 Z',
    gradiente: 'grad-purple-light',
    sfocatura: 'blur-medium',
    durata: 32,
    ritardo: 1,
  },
];

/** Le linee sottili sopra le onde: stesso movimento, ma disegnate e non riempite. */
type Filo = {
  da: string;
  a: string;
  colore: string;
  spessore: number;
  opacita: number;
  durata: number;
  ritardo: number;
};

const fili: Filo[] = [
  // In alto.
  {
    da: 'M0,200 C300,450 500,0 1000,250',
    a: 'M0,280 C350,300 550,50 1000,180',
    colore: '#76c6b7',
    spessore: 2,
    opacita: 0.2,
    durata: 20,
    ritardo: 0,
  },
  {
    da: 'M0,160 C320,400 480,-50 1000,280',
    a: 'M0,240 C380,250 520,10 1000,210',
    colore: '#76c6b7',
    spessore: 1.5,
    opacita: 0.25,
    durata: 22,
    ritardo: 1,
  },
  // In basso.
  {
    da: 'M0,800 C400,600 600,1000 1000,750',
    a: 'M0,720 C350,750 550,950 1000,820',
    colore: '#c29bc9',
    spessore: 2,
    opacita: 0.2,
    durata: 19,
    ritardo: 2,
  },
  {
    da: 'M0,850 C380,550 620,1050 1000,700',
    a: 'M0,780 C320,700 580,1000 1000,770',
    colore: '#c29bc9',
    spessore: 1.5,
    opacita: 0.25,
    durata: 24,
    ritardo: 0.5,
  },
];

/** Andata e ritorno: il terzo fotogramma richiude il giro sul primo. */
const avanti = (da: string, a: string) => [da, a, da];

export function WaveBackground({ fisso = false }: Props) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  /*
   * Le onde si muovono in continuazione dietro ogni pagina. A chi ha chiesto
   * meno animazioni al sistema operativo restano ferme: la parallasse del
   * mouse lo rispettava già, il fondo no — ed era il movimento più insistente
   * dei due, perché non serve toccare niente perché parta.
   */
  const [ferme, setFerme] = useState(false);

  useEffect(() => {
    const menoAnimazioni = window.matchMedia('(prefers-reduced-motion: reduce)');
    setFerme(menoAnimazioni.matches);

    const aggiorna = (e: MediaQueryListEvent) => setFerme(e.matches);
    menoAnimazioni.addEventListener('change', aggiorna);
    return () => menoAnimazioni.removeEventListener('change', aggiorna);
  }, []);

  useEffect(() => {
    // La parallasse segue il mouse: su un telefono il mouse non c'è, e restare
    // in ascolto costa soltanto batteria.
    const puntatorePreciso = window.matchMedia('(pointer: fine)').matches;
    if (!puntatorePreciso || ferme) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [ferme]);

  return (
    <div
      className={`${
        fisso ? 'fixed' : 'absolute'
      } inset-0 overflow-hidden pointer-events-none bg-[#fbf9f8] z-0`}
    >
      <motion.div
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 30, damping: 20 }}
        className="absolute inset-[-15%] w-[130%] h-[130%]"
      >
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" className="w-full h-full opacity-80">
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

          {/*
            `initial` non è decorativo: senza, la libreria di animazione non
            trova un valore di partenza per `d`, e al primo fotogramma scrive
            la stringa "undefined" dentro l'attributo. Il browser la rifiuta e
            registra un errore per ciascuno degli otto tracciati — otto errori
            in console su ogni pagina del sito. Non si vedeva nulla di rotto,
            perché il fotogramma dopo il valore giusto arrivava comunque.
          */}
          {onde.map((onda) => (
            <motion.path
              key={onda.da}
              d={onda.da}
              initial={{ d: onda.da }}
              fill={`url(#${onda.gradiente})`}
              filter={`url(#${onda.sfocatura})`}
              animate={ferme ? undefined : { d: avanti(onda.da, onda.a) }}
              transition={{
                duration: onda.durata,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: onda.ritardo,
              }}
            />
          ))}

          {fili.map((filo) => (
            <motion.path
              key={filo.da}
              d={filo.da}
              initial={{ d: filo.da }}
              stroke={filo.colore}
              strokeWidth={filo.spessore}
              fill="none"
              opacity={filo.opacita}
              animate={ferme ? undefined : { d: avanti(filo.da, filo.a) }}
              transition={{
                duration: filo.durata,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: filo.ritardo,
              }}
            />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}
