const DATI = {
  telefono: 'Telefono',
  orari: 'Orari di apertura',
  piva: 'P.IVA e forma societaria',
  albo: 'Numero di iscrizione albo',
  prenotazione: 'Destinazione "Prenota"',
  bio: 'Biografia',
  ruolo: 'Titolo esatto e specializzazione',
  durata: 'Durata seduta',
  spazioCorsiNome: 'Nome definitivo del piano superiore',
  nutrizione: 'Nutrizione: FisioEva o LongEva?',
  convenzioni: 'Convenzioni e assicurazioni',
  anniStudio: '"Oltre 15 anni": studio o singola professionista?',
  foto: 'Foto (shooting dopo l\'apertura)',
  ginnasticaGruppo: 'Ginnastica posturale: individuale, di gruppo o entrambe?',
  bambinoInSeduta: 'Si può portare il bambino in seduta?',
  noleggioMagneto: 'Noleggio domiciliare magnetoterapia',
} as const;

export type DatoMancanteId = keyof typeof DATI;

type Props = {
  id: DatoMancanteId;
  /** Testo neutro mostrato in produzione al posto del dato. Se assente, non renderizza nulla. */
  fallback?: string;
  className?: string;
};

/**
 * Segnaposto per un dato che il cliente non ha ancora fornito.
 * In sviluppo è un badge giallo impossibile da ignorare; in produzione
 * scompare, o mostra un testo neutro se ne è stato passato uno.
 * Serve a non lasciare mai che un buco diventi un valore inventato.
 */
export default function DatoMancante({ id, fallback, className = '' }: Props) {
  if (import.meta.env.PROD) {
    if (!fallback) return null;
    return <span className={`text-gray-500 font-light ${className}`}>{fallback}</span>;
  }

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md bg-yellow-200 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-yellow-900 ${className}`}
      title={`Dato mancante: ${DATI[id]}`}
    >
      <span aria-hidden="true">⛔</span>
      {DATI[id]}
    </span>
  );
}
