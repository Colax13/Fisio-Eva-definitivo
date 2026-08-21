type Props = {
  children: string;
  /**
   * `center` centra ovunque, `left` centra sul telefono e va a sinistra da
   * desktop. `start` sta a sinistra su tutte le larghezze: serve dentro le
   * card, dove il testo e' una colonna sua e centrarlo lascia bordi frastagliati.
   */
  align?: 'left' | 'center' | 'start';
  tone?: 'dark' | 'light';
  accent?: 'primary' | 'secondary';
  className?: string;
};

/**
 * L'etichetta che apre ogni sezione.
 *
 * Senza le lineette ai lati: erano un ornamento ripetuto una decina di volte
 * per pagina e finivano per pesare più dell'etichetta stessa.
 */
export default function Eyebrow({
  children,
  align = 'center',
  tone = 'dark',
  accent = 'primary',
  className = '',
}: Props) {
  // Su fondo chiaro il lillà e il verde acqua non reggono il contrasto a 12px:
  // per il testo si usa la variante scura.
  const label =
    tone === 'light'
      ? 'text-white'
      : accent === 'primary'
        ? 'text-brand-primary-ink'
        : 'text-brand-secondary-ink';

  const allineamento =
    align === 'center' ? 'text-center' : align === 'start' ? 'text-left' : 'text-center lg:text-left';

  return (
    <p className={`${label} ${allineamento} text-eyebrow font-semibold uppercase ${className}`}>
      {children}
    </p>
  );
}
