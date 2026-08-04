/**
 * Motivi grafici del brand: figura femminile stilizzata a linea e onda morbida.
 * Sono accenti leggeri — non devono mai diventare l'illustrazione dominante.
 */

type MotivoProps = {
  className?: string;
};

/** Figura femminile astratta, un solo tratto continuo. */
export function FiguraLinea({ className = '' }: MotivoProps) {
  return (
    <svg
      viewBox="0 0 120 260"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* testa */}
      <circle cx="62" cy="26" r="13" />
      {/* collo e colonna, con la curva morbida della schiena */}
      <path d="M62 39c0 10-4 14-6 22-3 12-2 24 1 36 4 15 6 30 4 45-2 16-6 30-5 46 1 13 4 25 3 38" />
      {/* spalle e braccio che accompagna il movimento */}
      <path d="M40 72c8-6 15-9 22-9s15 3 23 9" />
      <path d="M40 72c-6 12-9 25-8 39 1 10 5 18 11 25" />
      <path d="M85 72c6 12 9 25 8 39-1 10-5 18-11 25" />
      {/* bacino */}
      <path d="M45 148c10 4 21 4 32 0" />
      {/* gambe */}
      <path d="M52 152c-2 18-4 36-3 54 1 14 4 27 3 41" />
      <path d="M74 152c2 18 4 36 3 54-1 14-4 27-3 41" />
      {/* punti della colonna, richiamo del logo */}
      <circle cx="61" cy="88" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="62" cy="104" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="63" cy="120" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Onda morbida, usata come chiusura o separatore di sezione. */
export function Onda({ className = '' }: MotivoProps) {
  return (
    <svg
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M0 64c120-32 240-48 360-32s240 64 360 64 240-48 360-64 240-16 360 0v88H0z"
        fill="currentColor"
      />
    </svg>
  );
}

/** Linee d'onda sottili, per gli sfondi. */
export function OndeLeggere({ className = '' }: MotivoProps) {
  return (
    <svg
      viewBox="0 0 800 400"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
      className={className}
    >
      <path d="M-20 120c120-40 240-40 360 0s240 40 360 0 240-40 360 0" opacity="0.5" />
      <path d="M-20 170c120-40 240-40 360 0s240 40 360 0 240-40 360 0" opacity="0.35" />
      <path d="M-20 220c120-40 240-40 360 0s240 40 360 0 240-40 360 0" opacity="0.2" />
    </svg>
  );
}
