/**
 * Configurazione unica dello studio.
 * Le istruzioni di progetto sono la fonte di verità: qui non va mai un dato
 * inventato. Dove il dato non c'è, il valore è `null` e la UI mostra un
 * <DatoMancante id="..." />.
 */

export const studio = {
  nome: 'FisioEva',
  claim: 'Studio di Fisioterapia e Osteopatia',
  indirizzo: 'Via di Boccea 755',
  cap: '00166',
  citta: 'Roma',
  zona: 'Casalotti',
  zonaEstesa: 'Casalotti / Boccea, Roma Ovest',

  // Attenzione: bocc**e**a, non boccia. Refuso ricorrente nei materiali.
  email: 'fisioeva.boccea@gmail.com',
  instagram: 'fisioeva_boccea',
  instagramUrl: 'https://www.instagram.com/fisioeva_boccea',

  aperturaISO: '2026-09-26',
  apertura: '26 settembre 2026',

  // ⛔ Dati non ancora forniti dal cliente.
  telefono: null as string | null,
  orari: null as { giorno: string; ore: string }[] | null,
  partitaIva: null as string | null,
} as const;

/**
 * Destinazione di ogni CTA "Prenota".
 * Non è ancora deciso se sarà form, WhatsApp Business o Calendly: finché non
 * arriva la decisione si usa la mail. Si cambia solo qui.
 */
export const PRENOTAZIONE_TIPO: 'mailto' | 'form' | 'whatsapp' | 'calendly' = 'mailto';
export const PRENOTAZIONE_URL = `mailto:${studio.email}?subject=${encodeURIComponent(
  'Richiesta prima valutazione'
)}`;
export const PRENOTAZIONE_LABEL = 'Prenota la tua prima valutazione';

/** Il piano superiore ha un brand a sé e il nome non è ancora chiuso. */
export const SPAZIO_CORSI_NOME = 'LongEva';
export const SPAZIO_CORSI_NOME_CONFERMATO = false;

/** La nutrizione esiste come rotta ma non va in menu finché non è confermata. */
export const NUTRIZIONE_ENABLED = false;

/** Non è deciso se la segreteria compare nei materiali pubblici. */
export const MOSTRA_SEGRETERIA = false;

/** Lo studio parte da zero recensioni: lo spazio è pronto, ma resta spento. */
export const RECENSIONI_ENABLED = false;
