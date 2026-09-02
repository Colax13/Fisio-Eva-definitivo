/**
 * Segnaposto per un dato che lo studio non ha ancora fornito.
 *
 * In sviluppo si vede un badge giallo, così i buchi aperti si contano a
 * colpo d'occhio girando il sito in locale. In produzione il badge sparisce e
 * resta un testo neutro (o nulla, se `nascondiInProduzione`): meglio una riga
 * in meno che un dato inventato, soprattutto su un sito sanitario.
 */
type Props = {
  /** Che cosa manca, es. "partita IVA". Finisce nel badge di sviluppo. */
  id: string;
  /** Testo mostrato in produzione al posto del dato. */
  fallback?: string;
  /** Se vero, in produzione non viene reso nulla. */
  nascondiInProduzione?: boolean;
};

export default function DatoMancante({ id, fallback, nascondiInProduzione }: Props) {
  if (!import.meta.env.DEV) {
    if (nascondiInProduzione) return null;
    return <span className="text-gray-400">{fallback ?? 'in aggiornamento'}</span>;
  }

  return (
    <span
      title={`Dato mancante: ${id}`}
      className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-1.5 py-0.5 align-middle text-[11px] font-medium text-amber-900 ring-1 ring-amber-300"
    >
      ⛔ {id}
    </span>
  );
}
