import type { ElementType, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

/*
 * Verde acqua e lillà non reggono il testo bianco sopra (contrasto < 2:1).
 * Il pieno forte lo fa il carbone; i due colori del brand restano su bordi,
 * superfici e stati hover.
 */
const varianti = {
  primaria: 'bg-brand-dark text-white border-2 border-brand-dark hover:bg-brand-ink hover:border-brand-ink',
  secondaria:
    'bg-white text-brand-dark border-2 border-brand-primary hover:bg-brand-primary/15',
  accento: 'bg-white text-brand-dark border-2 border-brand-accent hover:bg-brand-accent/15',
  chiara: 'bg-white/10 text-white border-2 border-white/40 hover:bg-white hover:text-brand-dark',
} as const;

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  variante?: keyof typeof varianti;
  icona?: ElementType | null;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

export default function Bottone({
  children,
  to,
  href,
  variante = 'primaria',
  icona: Icona = ArrowUpRight,
  className = '',
  onClick,
  type = 'button',
}: Props) {
  const classi = `group inline-flex w-max items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors duration-300 ${varianti[variante]} ${className}`;

  const contenuto = (
    <>
      <span>{children}</span>
      {Icona && (
        <Icona className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classi} onClick={onClick}>
        {contenuto}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classi} onClick={onClick}>
        {contenuto}
      </a>
    );
  }

  return (
    <button type={type} className={classi} onClick={onClick}>
      {contenuto}
    </button>
  );
}
