import type { ElementType, ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

type Variant = 'primary' | 'secondary' | 'ghost';

const variants: Record<Variant, string> = {
  primary:
    'border-2 border-brand-primary bg-white text-brand-dark hover:bg-brand-primary hover:text-white',
  secondary:
    'border-2 border-brand-secondary bg-white text-brand-dark hover:bg-brand-secondary hover:text-white',
  ghost:
    'border-2 border-white/40 bg-transparent text-white hover:bg-white hover:text-brand-dark',
};

type Props = {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: Variant;
  icon?: ElementType;
  /** A tutta larghezza sul telefono. Da disattivare solo nelle file di pillole. */
  block?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

/**
 * Pillola con la freccia che cambia lato al passaggio del mouse.
 *
 * Sul telefono il bottone occupa tutta la riga: prima era largo quanto il suo
 * testo, così due bottoni uno sotto l'altro venivano di due misure diverse e il
 * bordo destro della pagina non tornava mai. L'altezza minima di 48px è la
 * soglia sotto la quale un bersaglio si sbaglia con il pollice.
 */
export default function ArrowButton({
  children,
  to,
  href,
  variant = 'primary',
  icon: Icon = ArrowUpRight,
  block = true,
  className = '',
  onClick,
  type = 'button',
}: Props) {
  const larghezza = block ? 'w-full sm:w-max' : 'w-max';
  const classes = `group inline-flex ${larghezza} min-h-12 items-center justify-center rounded-full px-7 py-3.5 transition-colors duration-300 overflow-hidden font-medium text-sm ${variants[variant]} ${className}`;

  const inner = (
    <>
      <span className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-start group-hover:mr-2 -translate-x-full group-hover:translate-x-0">
        <Icon className="w-4 h-4 shrink-0" />
      </span>
      <span className="text-center">{children}</span>
      <span className="w-5 opacity-100 group-hover:w-0 group-hover:opacity-0 transition-all duration-300 overflow-hidden flex items-center justify-end ml-2 group-hover:ml-0 translate-x-0 group-hover:translate-x-full">
        <Icon className="w-4 h-4 shrink-0" />
      </span>
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {inner}
      </a>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {inner}
    </button>
  );
}
