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
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
};

/**
 * Pill button with the arrow that swaps side on hover — the signature
 * interaction used across the whole site.
 */
export default function ArrowButton({
  children,
  to,
  href,
  variant = 'primary',
  icon: Icon = ArrowUpRight,
  className = '',
  onClick,
  type = 'button',
}: Props) {
  const classes = `group inline-flex w-max items-center rounded-full px-8 py-3.5 transition-colors duration-300 overflow-hidden font-medium text-sm ${variants[variant]} ${className}`;

  const inner = (
    <>
      <span className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-start group-hover:mr-2 -translate-x-full group-hover:translate-x-0">
        <Icon className="w-4 h-4 shrink-0" />
      </span>
      <span className="whitespace-nowrap">{children}</span>
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
