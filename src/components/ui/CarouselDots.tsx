type Props = {
  totale: number;
  attivo: number;
  onSelect: (i: number) => void;
  etichetta: (i: number) => string;
  tone?: 'dark' | 'light';
  className?: string;
};

/**
 * Indicatori del carosello.
 *
 * Il pallino resta piccolo perché è un segno, non un bottone: quello che
 * cambia è l'area toccabile, che con il padding arriva a 44px per lato — la
 * misura sotto la quale su un telefono si sbaglia bersaglio.
 */
export default function CarouselDots({
  totale,
  attivo,
  onSelect,
  etichetta,
  tone = 'dark',
  className = '',
}: Props) {
  const acceso = tone === 'dark' ? 'bg-brand-primary' : 'bg-brand-secondary';
  const spento = tone === 'dark' ? 'bg-brand-dark/25' : 'bg-white/45';

  return (
    <div className={`flex items-center justify-center ${className}`}>
      {Array.from({ length: totale }, (_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onSelect(i)}
          aria-label={etichetta(i)}
          aria-current={i === attivo}
          className="flex h-11 w-11 items-center justify-center"
        >
          <span
            className={`block h-2 rounded-full transition-all duration-300 ${
              i === attivo ? `w-8 ${acceso}` : `w-2 ${spento}`
            }`}
          />
        </button>
      ))}
    </div>
  );
}
