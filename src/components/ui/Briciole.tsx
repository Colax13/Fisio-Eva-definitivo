import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export type Voce = { nome: string; path: string };

type Props = {
  voci: Voce[];
  tono?: 'chiaro' | 'scuro';
  className?: string;
};

/**
 * Breadcrumb. L'ultima voce è la pagina corrente e non è un link.
 * Obbligatorio su tutte le pagine servizio.
 */
export default function Briciole({ voci, tono = 'scuro', className = '' }: Props) {
  const link = tono === 'scuro' ? 'text-brand-dark/60 hover:text-brand-ink' : 'text-white/60 hover:text-white';
  const corrente = tono === 'scuro' ? 'text-brand-dark' : 'text-white';
  const sep = tono === 'scuro' ? 'text-brand-dark/30' : 'text-white/30';

  return (
    <nav aria-label="Percorso di navigazione" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-xs">
        {voci.map((voce, i) => {
          const ultima = i === voci.length - 1;
          return (
            <li key={voce.path} className="flex items-center gap-1.5">
              {ultima ? (
                <span className={`font-semibold ${corrente}`} aria-current="page">
                  {voce.nome}
                </span>
              ) : (
                <>
                  <Link to={voce.path} className={`transition-colors ${link}`}>
                    {voce.nome}
                  </Link>
                  <ChevronRight className={`h-3 w-3 ${sep}`} aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
