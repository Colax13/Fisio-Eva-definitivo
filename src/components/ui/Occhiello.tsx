type Props = {
  children: string;
  allineamento?: 'sinistra' | 'centro';
  tono?: 'chiaro' | 'scuro';
  className?: string;
};

/**
 * Etichetta di sezione con il filetto colorato.
 * Il testo resta carbone (o bianco sui fondi scuri): il colore lo porta la
 * linea, che non deve reggere nessun contrasto di lettura.
 */
export default function Occhiello({
  children,
  allineamento = 'sinistra',
  tono = 'scuro',
  className = '',
}: Props) {
  const centrato = allineamento === 'centro';
  const filetto = tono === 'scuro' ? 'bg-brand-primary' : 'bg-brand-primary';
  const testo = tono === 'scuro' ? 'text-brand-dark/70' : 'text-white/80';

  return (
    <div className={`flex items-center gap-4 ${centrato ? 'justify-center' : ''} ${className}`}>
      <span className={`h-px w-10 ${filetto}`} aria-hidden="true" />
      <span className={`text-xs font-semibold uppercase tracking-[0.2em] ${testo}`}>
        {children}
      </span>
      {centrato && <span className={`h-px w-10 ${filetto}`} aria-hidden="true" />}
    </div>
  );
}
