import { studio } from '../data/site';

/**
 * I link di contatto, tutti costruiti in un posto solo.
 *
 * Il sito non ha un backend: ogni richiesta parte dal telefono o dal computer
 * di chi scrive, e arriva allo studio come messaggio WhatsApp o come email.
 * Perché quel passaggio non si perda per strada, il messaggio deve arrivare
 * **già scritto**: chi tocca un pulsante deve trovare il testo pronto e dover
 * solo premere invia.
 *
 * Il testo precompilato cambia da un punto all'altro del sito. Non è un
 * vezzo: è l'unico modo che abbiamo per capire da dove arriva una richiesta
 * senza installare strumenti di tracciamento, che obbligherebbero al banner
 * cookie di cui oggi il sito non ha bisogno. Se in segreteria arriva
 * «arrivo da Instagram», si sa che ha funzionato un video.
 *
 * ⚠️ Nessun messaggio precompilato contiene dati sulla salute. Il testo che
 * scriviamo noi si ferma all'intenzione («vorrei prenotare», «vorrei
 * informazioni su…»): se poi la persona aggiunge il proprio sintomo è una sua
 * scelta, presa dopo aver visto l'informativa. Vedi anche la nota su WhatsApp
 * fra i responsabili del trattamento, in `src/data/site.ts`.
 */

/** I testi precompilati, uno per ogni punto in cui il sito chiede un contatto. */
export const messaggi = {
  /** Fascia di chiusura delle pagine. */
  prenotazione: 'Ciao FisioEVA, ho visto il sito e vorrei prenotare una prima valutazione.',
  /** Pagina contatti e menu. */
  contatti: 'Ciao FisioEVA, vorrei fissare un appuntamento.',
  /** Footer: chi arriva in fondo di solito sta cercando i recapiti. */
  informazioni: 'Ciao FisioEVA, vorrei qualche informazione.',
  /** Scheda di un trattamento. */
  trattamento: (nome: string) => `Ciao FisioEVA, vorrei informazioni su ${nome}.`,
};

/** L'oggetto delle email, allineato ai messaggi qui sopra. */
export const oggetti = {
  prenotazione: 'Richiesta di prima valutazione',
  contatti: 'Richiesta di appuntamento',
  informazioni: 'Richiesta di informazioni',
};

/**
 * Link a WhatsApp con il messaggio già scritto.
 *
 * `wa.me` è l'indirizzo ufficiale e si comporta da solo nel modo giusto: sul
 * telefono apre l'applicazione, sul computer apre WhatsApp Web. Per questo i
 * pulsanti che lo usano aprono una scheda nuova invece di sostituire il sito.
 */
export const whatsappUrl = (testo: string) =>
  `https://wa.me/${studio.whatsapp}?text=${encodeURIComponent(testo)}`;

/**
 * Link a una email già scritta.
 *
 * Prima tre pulsanti del sito aprivano un `mailto:` nudo, cioè una email
 * vuota: chi ci arrivava doveva inventarsi oggetto e testo da zero, e molti
 * chiudevano lì. Il modulo dei contatti invece l'email la componeva già, ed è
 * il comportamento che ora hanno tutti.
 */
export const emailUrl = (oggetto: string, corpo?: string) => {
  const query = [`subject=${encodeURIComponent(oggetto)}`];
  if (corpo) query.push(`body=${encodeURIComponent(corpo)}`);
  return `mailto:${studio.email}?${query.join('&')}`;
};

/**
 * La frase che accompagna ogni pulsante WhatsApp.
 *
 * Sta qui e non nei singoli componenti perché deve essere identica ovunque:
 * è la stessa cautela che il modulo dei contatti applica già all'email.
 */
export const NOTA_WHATSAPP =
  'Non serve raccontare qui la tua storia clinica: scrivici di cosa hai bisogno e ne parliamo di persona.';
