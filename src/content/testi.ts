/**
 * Frasi, credenze e FAQ generali.
 *
 * ⚠️ Le frasi qui sotto sono quelle APPROVATE. Non aggiungerne di nuove senza
 * passare dalla cernita: esiste una lista di frasi esplicitamente scartate
 * ("guaritori silenziosi", "trasformano le vite", "non trattiamo il sintomo:
 * cerchiamo la causa", "il tuo dolore ha una spiegazione", …) che non vanno
 * reintrodotte nemmeno se ricompaiono in vecchi documenti.
 */

/** Collocazione fissa: hero della homepage. */
export const PAYOFF_HERO = 'Muoviti meglio. Vivi senza dolore.';

/** Collocazione fissa: apertura della sezione Chi siamo. */
export const FRASE_CHI_SIAMO = {
  prima: 'Il tuo corpo non ha smesso di funzionare.',
  seconda: 'Ha smesso di essere ascoltato.',
};

/**
 * Ribaltamenti a due parti: forti ma lunghi.
 * Vanno dove c'è tempo di lettura — mai in hero, mai su un bottone.
 */
export const ribaltamenti = [
  {
    prima: 'Non chiederti se è il momento di curarti.',
    seconda: 'Chiediti da quanto lo stai rimandando.',
  },
  {
    prima: 'Non si tratta di quante sedute fai.',
    seconda: 'Si tratta di quanti passi torni a fare.',
  },
  {
    prima: 'Non rimettiamo a posto un\'articolazione.',
    seconda: 'Rimettiamo in moto una vita.',
  },
];

/** Le quattro credenze da spezzare — sezione "Perché noi". */
export const credenze = [
  {
    credenza: 'La fisioterapia serve solo quando hai già male.',
    ribaltamento: 'La prevenzione costa meno e funziona di più.',
  },
  {
    credenza: 'Dopo il parto i problemi del pavimento pelvico passano da soli.',
    ribaltamento: 'Sono comuni, ma non sono normali. C\'è un percorso.',
  },
  {
    credenza: 'L\'osteopatia neonatale non serve.',
    ribaltamento: 'Il parto è lo stress meccanico più grande della vita.',
  },
  {
    credenza: 'Tutti i fisioterapisti fanno le stesse cose.',
    ribaltamento: 'La formazione fa la differenza. E si può verificare.',
  },
];

/** I due dati di credibilità della sezione Chi siamo. Solo due, non quattro. */
export const credibilita = [
  {
    titolo: 'Formazione universitaria e specialistica',
    dettaglio: 'Università Cattolica – Policlinico Gemelli · Master in RPG Souchard · Osteopatia EDUCAM',
  },
  {
    titolo: 'Oltre 15 anni di pratica clinica',
    dettaglio: 'Nel quartiere, prima di aprire questo studio.',
  },
];

export type Faq = {
  categoria: 'Prima visita' | 'Come lavoriamo' | 'Pratiche';
  domanda: string;
  risposta: string;
};

export const faqGenerali: Faq[] = [
  {
    categoria: 'Prima visita',
    domanda: 'Serve la prescrizione del medico?',
    risposta:
      'Per la maggior parte dei trattamenti non è necessaria. Fa eccezione la ionoforesi, che richiede il farmaco e quindi la prescrizione. Se hai referti, radiografie o risonanze recenti, portali: aiutano a inquadrare la situazione.',
  },
  {
    categoria: 'Prima visita',
    domanda: 'Cosa succede alla prima valutazione?',
    risposta:
      'Si parte dal colloquio: la tua storia, non solo il punto in cui senti male. Poi la valutazione del movimento e i test manuali. Alla fine sai cosa abbiamo trovato e come si imposta il percorso.',
  },
  {
    categoria: 'Prima visita',
    domanda: 'Cosa devo portare o indossare?',
    risposta:
      'Abbigliamento comodo, che permetta di muoversi. Porta con te eventuali referti e, se arrivi da un intervento, la relazione operatoria con le indicazioni del chirurgo.',
  },
  {
    categoria: 'Come lavoriamo',
    domanda: 'Quante sedute servono?',
    risposta:
      'Dipende da cosa emerge alla valutazione e da come il tuo corpo risponde. Te lo diciamo dopo averti visto, non prima, e lo aggiorniamo insieme lungo il percorso.',
  },
  {
    categoria: 'Come lavoriamo',
    domanda: 'Che differenza c\'è tra fisioterapia e osteopatia?',
    risposta:
      'Sono due discipline distinte, con approcci diversi. Qui lavorano insieme: la valutazione tiene conto di entrambe, e il trattamento si costruisce su quello che emerge.',
  },
  {
    categoria: 'Come lavoriamo',
    domanda: 'La terapia è dolorosa?',
    risposta:
      'Alcune tecniche possono dare un fastidio momentaneo, ma il trattamento non deve mai essere doloroso. Si lavora sempre entro la tua soglia, e i tempi li decidi tu.',
  },
  {
    categoria: 'Come lavoriamo',
    domanda: 'Trattate anche neonati e bambini?',
    risposta:
      'Sì. L\'osteopatia neonatale e pediatrica usa tecniche a pressione minima e si può fare fin dai primi giorni di vita. Il trattamento non sostituisce il pediatra.',
  },
  {
    categoria: 'Pratiche',
    domanda: 'Dove si trova lo studio?',
    risposta:
      'In Via di Boccea 755, a Roma, zona Casalotti. Nella pagina Contatti trovi la mappa e le indicazioni per arrivare.',
  },
];
