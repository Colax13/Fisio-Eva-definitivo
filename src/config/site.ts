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
 * Tutte le foto del sito, in un punto solo.
 *
 * ⛔ Sono segnaposto stock: lo shooting è previsto dopo l'apertura. Quando
 * arrivano gli scatti dello studio si sostituiscono i valori qui — i file
 * vanno in /public e le chiavi puntano lì — senza toccare un componente.
 *
 * Nota: oggi sono ospitate da Unsplash, quindi il browser contatta un dominio
 * esterno. Con le foto vere diventano file locali in WebP e il problema si
 * chiude da sé.
 */
const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`;

export const immagini = {
  trattamento: unsplash('photo-1519824145371-296894a0daa9'), // mani sulla schiena
  manuale: unsplash('photo-1584515933487-779824d29309'), // terapia manuale, dettaglio
  riabilitazione: unsplash('photo-1571019614242-c5c5dee9f50b'), // esercizio guidato
  postura: unsplash('photo-1571019613454-1cb2f99b2d8b'), // esercizio a terra
  strumentale: unsplash('photo-1581056771107-24ca5f033842'), // professionista con paziente
  donna: unsplash('photo-1518611012118-696072aa579a'), // ginnastica dolce
  bambini: unsplash('photo-1555252333-9f8e92e65df9'), // neonato
  anziani: unsplash('photo-1622253692010-333f2da6031d'), // paziente anziana seguita
  calma: unsplash('photo-1600334089648-b0d9d3028eb2'), // relax e benessere
  sede: '/team/studio.png', // la sede di Via di Boccea 755
};

/** La foto di sfondo di ogni categoria di servizi. */
export const immagineCategoria: Record<string, string> = {
  'tornare-a-muoverti': immagini.riabilitazione,
  'salute-della-donna': immagini.donna,
  bambino: immagini.bambini,
  'terapie-strumentali': immagini.strumentale,
  nutrizione: immagini.calma,
  longeva: immagini.postura,
};

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
