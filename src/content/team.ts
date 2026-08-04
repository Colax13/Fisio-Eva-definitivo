/**
 * Il team, su tre livelli: le tre titolari, il team clinico, l'accoglienza.
 *
 * L4 — per ogni professionista sanitario servono titolo e numero di albo.
 * Dove mancano il campo resta `null` e la UI mostra un <DatoMancante />.
 * Non riempirli a intuito: è un obbligo di legge.
 *
 * L3 — mai "medici", "équipe medica": i fisioterapisti non sono medici.
 */

export type Persona = {
  slug: string;
  nome: string;
  breve: string;
  /** Titolo esatto: obbligo di legge, va confermato prima del go-live. */
  ruolo: string;
  ruoloConfermato: boolean;
  bio: string | null;
  aree: string[];
  albo: string | null;
  foto: string | null;
  accento: 'acqua' | 'lilla';
};

export const titolari: Persona[] = [
  {
    slug: 'azzurra-de-angelis',
    nome: 'Dott.ssa Azzurra De Angelis',
    breve: 'Azzurra',
    ruolo: 'Fisioterapista e Osteopata D.O.',
    ruoloConfermato: true,
    bio: 'Si è laureata in Fisioterapia all\'Università Cattolica – Policlinico Gemelli con 110/110 e lode, poi ha proseguito con il Master in Rieducazione Posturale Globale secondo il metodo Souchard e con la formazione in Osteopatia EDUCAM. Si occupa in modo particolare della salute della donna: gravidanza, recupero post-parto, pavimento pelvico, trattamento della cicatrice da cesareo. È la parte del lavoro di cui, dice, si parla ancora troppo poco.',
    aree: ['Osteopatia', 'Salute della donna', 'Gravidanza e post-parto', 'RPG Souchard'],
    albo: null,
    foto: '/team/azzurra.png',
    accento: 'acqua',
  },
  {
    slug: 'elisa-de-rubeis',
    nome: 'Dott.ssa Elisa De Rubeis',
    breve: 'Elisa',
    ruolo: 'Fisioterapista e Osteopata',
    ruoloConfermato: true,
    bio: 'Oltre quindici anni di pratica clinica, quasi tutti in questo quartiere. Lavora con la terapia manuale e l\'approccio cranio-sacrale, e ha portato il metodo Pilates dentro il percorso riabilitativo — non come attività a sé, ma come strumento per far tornare il controllo del movimento dove si è perso.',
    aree: ['Terapia manuale', 'Osteopatia cranio-sacrale', 'Pilates in riabilitazione'],
    albo: null,
    foto: '/team/elisa.png',
    accento: 'lilla',
  },
  {
    slug: 'veronica-mirarchi',
    nome: 'Dott.ssa Veronica Mirarchi',
    breve: 'Veronica',
    // Attenzione: risulta solo Fisioterapista, NON osteopata. Nessuna formula
    // al plurale del tipo "le titolari sono fisioterapiste e osteopate".
    ruolo: 'Fisioterapista',
    ruoloConfermato: true,
    bio: null, // ⛔ bio da acquisire — non inventare nulla
    aree: [],
    albo: null,
    foto: null,
    accento: 'acqua',
  },
];

export const teamClinico: Persona[] = [
  {
    slug: 'siria-ciccone',
    nome: 'Siria Ciccone',
    breve: 'Siria',
    ruolo: 'Fisioterapista', // ⛔ titolo esatto da confermare
    ruoloConfermato: false,
    bio: null,
    aree: [],
    albo: null,
    foto: null,
    accento: 'acqua',
  },
  {
    slug: 'andrea-del-proposto',
    nome: 'Andrea Del Proposto',
    breve: 'Andrea',
    ruolo: 'Fisioterapista', // ⛔ titolo esatto da confermare
    ruoloConfermato: false,
    bio: null,
    aree: [],
    albo: null,
    foto: null,
    accento: 'lilla',
  },
  {
    slug: 'valentina-macchia',
    nome: 'Valentina Macchia',
    breve: 'Valentina',
    ruolo: 'Fisioterapista', // ⛔ titolo esatto da confermare
    ruoloConfermato: false,
    bio: null,
    aree: [],
    albo: null,
    foto: null,
    accento: 'acqua',
  },
  {
    slug: 'maria-caterina-scrivo',
    nome: 'Maria Caterina Scrivo',
    breve: 'Maria Caterina',
    // ⛔ biologa nutrizionista o dietista? E se sta su FisioEva o sul piano corsi.
    ruolo: 'Nutrizionista',
    ruoloConfermato: false,
    bio: null,
    aree: [],
    albo: null,
    foto: null,
    accento: 'lilla',
  },
];

/** ⛔ Da confermare se vanno nel materiale pubblico: dietro flag MOSTRA_SEGRETERIA. */
export const accoglienza = [
  { nome: 'Francesca De Rubeis', ruolo: 'Segreteria' },
  { nome: 'Laura De Carli', ruolo: 'Segreteria' },
];

/**
 * ⛔ Il team del piano superiore non si pubblica: brand e stato normativo
 * diversi, e resta aperto il nodo di un osteopata su un piano dichiarato non
 * sanitario. Tenuto qui solo per non perdere il dato.
 */
export const teamSpazioCorsi = [
  { nome: 'Daniele Petrucci', ruolo: 'Posturale' },
  { nome: 'Alessio Di Giacomo', ruolo: 'Osteopata' },
];
