type Props = {
  children: string;
  /** Allineamento da tablet in su. Sul telefono è sempre centrato. */
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  accent?: 'primary' | 'secondary';
  className?: string;
};

/**
 * Occhiello con la lineetta: l'etichetta che apre ogni sezione.
 *
 * Era ricopiato a mano in una decina di file, ogni volta con un allineamento
 * diverso. Da qui in poi sul telefono è sempre centrato — è la regola che tiene
 * insieme la pagina quando le due colonne del desktop diventano una sola.
 */
export default function Eyebrow({
  children,
  align = 'center',
  tone = 'dark',
  accent = 'primary',
  className = '',
}: Props) {
  // Su fondo chiaro il lilla e il verde del marchio non reggono il contrasto a
  // 12px: per il testo si usa la variante scura, la lineetta resta del marchio.
  const rule =
    tone === 'light' ? 'bg-white/70' : accent === 'primary' ? 'bg-brand-primary' : 'bg-brand-secondary';
  const label =
    tone === 'light'
      ? 'text-white'
      : accent === 'primary'
        ? 'text-brand-primary-ink'
        : 'text-brand-secondary-ink';

  const allineamento = align === 'center' ? 'justify-center' : 'justify-center lg:justify-start';

  return (
    <div className={`flex items-center gap-3 sm:gap-4 ${allineamento} ${className}`}>
      <span className={`h-px w-8 shrink-0 sm:w-12 ${rule}`} aria-hidden="true"></span>
      <span className={`${label} text-eyebrow font-semibold uppercase`}>{children}</span>
      <span
        className={`h-px w-8 shrink-0 sm:w-12 ${rule} ${align === 'center' ? '' : 'lg:hidden'}`}
        aria-hidden="true"
      ></span>
    </div>
  );
}
