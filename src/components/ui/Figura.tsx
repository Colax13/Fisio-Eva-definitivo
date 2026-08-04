import { FiguraLinea, OndeLeggere } from './Motivi';

const RATIO = {
  verticale: 'aspect-[3/4]',
  quadrata: 'aspect-square',
  orizzontale: 'aspect-[4/3]',
  panoramica: 'aspect-[16/9]',
  alta: 'aspect-[2/3]',
} as const;

const TONO = {
  acqua: 'bg-brand-primary/15 text-brand-primary',
  lilla: 'bg-brand-accent/15 text-brand-accent',
  neutro: 'bg-brand-light text-brand-primary',
  carbone: 'bg-brand-dark/90 text-brand-primary/60',
} as const;

type Props = {
  /**
   * Percorso della foto. Finché lo shooting non è stato fatto va lasciato
   * vuoto: il componente disegna un blocco colore con il motivo a linea,
   * mantenendo lo stesso ingombro della foto definitiva.
   */
  src?: string;
  /** Obbligatorio. Stringa vuota solo se la figura è puramente decorativa. */
  alt: string;
  ratio?: keyof typeof RATIO;
  tono?: keyof typeof TONO;
  /** Mostra il motivo a figura. Spegnilo dove servono più blocchi vicini. */
  motivo?: boolean;
  className?: string;
  rounded?: string;
};

/**
 * Contenitore immagine a rapporto fisso.
 * Quando arriveranno le foto basta passare `src`: il layout non cambia di un
 * pixel, perché lo spazio è già riservato.
 */
export default function Figura({
  src,
  alt,
  ratio = 'verticale',
  tono = 'acqua',
  motivo = true,
  className = '',
  rounded = 'rounded-[2rem]',
}: Props) {
  return (
    <figure className={`relative overflow-hidden ${rounded} ${RATIO[ratio]} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div
          className={`absolute inset-0 flex items-center justify-center ${TONO[tono]}`}
          role={alt ? 'img' : undefined}
          aria-label={alt || undefined}
        >
          <OndeLeggere className="absolute inset-x-0 bottom-0 h-1/2 w-full opacity-40" />
          {motivo && <FiguraLinea className="relative h-[62%] w-auto opacity-45" />}
        </div>
      )}
    </figure>
  );
}
