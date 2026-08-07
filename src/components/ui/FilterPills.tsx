type Props = {
  voci: readonly string[];
  attiva: string;
  onSelect: (voce: string) => void;
  etichetta: string;
  className?: string;
};

/**
 * Barra dei filtri di FAQ e Gallery.
 *
 * Prima era un contenitore `w-max`: la larghezza si adattava al contenuto e su
 * un telefono l'ultima voce finiva fuori dallo schermo, irraggiungibile. Ora la
 * barra sta dentro la pagina e le pillole vanno a capo.
 */
export default function FilterPills({ voci, attiva, onSelect, etichetta, className = '' }: Props) {
  return (
    <div
      role="group"
      aria-label={etichetta}
      className={`mx-auto flex w-full max-w-max flex-wrap items-center justify-center gap-1.5 rounded-3xl border border-white bg-white/70 p-2 shadow-sm backdrop-blur-md sm:rounded-full ${className}`}
    >
      {voci.map((voce) => (
        <button
          key={voce}
          type="button"
          onClick={() => onSelect(voce)}
          aria-pressed={attiva === voce}
          className={`min-h-11 rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 sm:px-5 ${
            attiva === voce
              ? 'bg-brand-dark text-white'
              : 'text-brand-dark hover:bg-brand-primary/15'
          }`}
        >
          {voce}
        </button>
      ))}
    </div>
  );
}
