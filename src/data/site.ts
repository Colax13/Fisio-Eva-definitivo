const unsplash = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&q=80&w=${w}`;

/**
 * Every photo used across the site, in one place.
 * These are stock placeholders: swap the values for the studio's own shots
 * (drop the files in /public and point the keys at them) without touching
 * any component.
 */
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

export const studio = {
  name: 'FisioEVA',
  claim: 'Studio di Fisioterapia e Osteopatia',
  address: 'Via di Boccea, 755',
  city: '00166 Roma',
  zone: 'Casalotti',
  email: 'fisioeva.boccia@gmail.com',
  instagram: 'fisioeva_boccea',
  instagramUrl: 'https://www.instagram.com/fisioeva_boccea',
  mapsQuery: 'Via+di+Boccea+755,+00166+Roma',
  orari: [
    { giorno: 'Lunedì — Venerdì', ore: '09:00 — 20:00' },
    { giorno: 'Sabato', ore: 'Su appuntamento' },
    { giorno: 'Domenica', ore: 'Chiuso' },
  ],
};

export const team = [
  {
    slug: 'azzurra-de-angelis',
    name: 'Dott.ssa Azzurra De Angelis',
    short: 'Azzurra',
    role: 'Fisioterapista · Osteopata D.O.',
    phone: '+39 380 364 0807',
    phoneHref: 'tel:+393803640807',
    description:
      'Specializzata in valutazione osteopatica, terapia manuale e riabilitazione globale della persona. Accompagna il paziente in un percorso che guarda al corpo nel suo insieme.',
    photo: '/team/azzurra.png',
    accent: 'secondary' as const,
  },
  {
    slug: 'elisa-de-rubeis',
    name: 'Dott.ssa Elisa De Rubeis',
    short: 'Elisa',
    role: 'Fisioterapista',
    phone: '+39 333 874 5324',
    phoneHref: 'tel:+393338745324',
    description:
      'Esperta in riabilitazione funzionale, rieducazione motoria e percorsi terapeutici personalizzati, costruiti sugli obiettivi concreti di ogni paziente.',
    photo: '/team/elisa.png',
    accent: 'primary' as const,
  },
  {
    slug: 'veronica-mirarchi',
    name: 'Dott.ssa Veronica Mirarchi',
    short: 'Veronica',
    role: 'Fisioterapista',
    phone: '',
    phoneHref: '',
    description:
      'Dedicata al benessere muscolo-scheletrico, alla rieducazione posturale e al recupero motorio, con un approccio attento all\'ascolto e alla gradualità.',
    photo: '',
    accent: 'primary' as const,
  },
];

export const trattamentiManuali = [
  'Fisiokinesiterapia',
  'Ginnastica posturale',
  'Osteopatia',
  'Osteopatia neonatale e pediatrica',
  'Linfodrenaggio',
  'Rieducazione motoria e neuromotoria',
  'Rieducazione post-chirurgica',
  'Rieducazione sportiva',
  'Terapia manuale',
  'Taping neuromuscolare',
];

export const trattamentiStrumentali = [
  'Tecarterapia',
  'Laser ad alta potenza',
  'Ultrasuonoterapia',
  'Magnetoterapia',
  'Tens',
  'Ionoforesi',
  'Elettrostimolazione',
];

export type Servizio = {
  slug: string;
  titolo: string;
  sottotitolo: string;
  descrizione: string;
  punti: string[];
  image: string;
  accent: 'primary' | 'secondary';
};

export const servizi: Servizio[] = [
  {
    slug: 'terapia-manuale',
    titolo: 'Terapia manuale e osteopatia',
    sottotitolo: 'Le mani come primo strumento',
    descrizione:
      'Valutazione osteopatica e trattamento manuale per sciogliere le tensioni, ridurre il dolore e restituire mobilità alle articolazioni. Ogni seduta parte da ciò che il tuo corpo racconta.',
    punti: ['Osteopatia', 'Terapia manuale', 'Linfodrenaggio', 'Taping neuromuscolare'],
    image: immagini.manuale,
    accent: 'primary',
  },
  {
    slug: 'riabilitazione',
    titolo: 'Riabilitazione e rieducazione',
    sottotitolo: 'Tornare a muoversi, un passo alla volta',
    descrizione:
      'Percorsi di recupero dopo un intervento, un infortunio sportivo o un periodo di stop. Il programma cresce con te, seduta dopo seduta, fino al ritorno alle tue attività.',
    punti: [
      'Rieducazione post-chirurgica',
      'Rieducazione motoria e neuromotoria',
      'Rieducazione sportiva',
      'Fisiokinesiterapia',
    ],
    image: immagini.riabilitazione,
    accent: 'secondary',
  },
  {
    slug: 'postura',
    titolo: 'Postura e movimento',
    sottotitolo: 'Riallineare le abitudini, non solo la schiena',
    descrizione:
      'Analisi posturale e ginnastica dedicata per correggere gli squilibri che si accumulano ogni giorno, tra scrivania, sport e gesti ripetuti.',
    punti: ['Ginnastica posturale', 'Valutazione posturale', 'Consapevolezza corporea'],
    image: immagini.postura,
    accent: 'primary',
  },
  {
    slug: 'terapie-strumentali',
    titolo: 'Terapie fisiche strumentali',
    sottotitolo: 'La tecnologia a supporto delle mani',
    descrizione:
      'Strumenti che accelerano il recupero e agiscono sull\'infiammazione, sempre integrati in un percorso terapeutico e mai usati come scorciatoia.',
    punti: [
      'Tecarterapia',
      'Laser ad alta potenza',
      'Ultrasuonoterapia',
      'Magnetoterapia',
      'Tens · Ionoforesi',
      'Elettrostimolazione',
    ],
    image: immagini.strumentale,
    accent: 'secondary',
  },
];

export type Progetto = {
  slug: string;
  titolo: string;
  evidenza: string;
  descrizione: string;
  benefici: string[];
  image: string;
  accent: 'primary' | 'secondary';
};

export const progetti: Progetto[] = [
  {
    slug: 'psicomotricita',
    titolo: 'Psicomotricità',
    evidenza: 'Per i più piccoli',
    descrizione:
      'Il corpo è il primo strumento di espressione del bambino. Attraverso il movimento e la relazione, la psicomotricità sostiene lo sviluppo dell\'identità, delle emozioni e delle capacità cognitive in modo armonico e profondo.',
    benefici: [
      'Sviluppo dell\'autonomia',
      'Equilibrio e coordinazione',
      'Gestione delle emozioni',
      'Capacità relazionali',
    ],
    image: immagini.bambini,
    accent: 'secondary',
  },
  {
    slug: 'donna-e-benessere',
    titolo: 'Donna e Benessere',
    evidenza: 'In ogni fase della vita',
    descrizione:
      'Un percorso dedicato alla salute femminile in tutte le fasi della vita. Dalla rieducazione del pavimento pelvico al recupero post-parto, per ritrovare equilibrio e forza.',
    benefici: [
      'Rieducazione post-parto',
      'Pavimento pelvico',
      'Prevenzione disfunzioni',
      'Miglioramento posturale',
    ],
    image: immagini.donna,
    accent: 'primary',
  },
  {
    slug: 'postura-e-movimento',
    titolo: 'Postura e Movimento',
    evidenza: 'Per chi sta troppo fermo',
    descrizione:
      'La postura è l\'espressione di come abitiamo il nostro corpo. Questo progetto mira a correggere squilibri muscolari, alleviare tensioni e restituire libertà di movimento.',
    benefici: [
      'Riallineamento',
      'Riduzione dolori',
      'Aumento flessibilità',
      'Consapevolezza corporea',
    ],
    image: immagini.manuale,
    accent: 'primary',
  },
  {
    slug: 'terza-eta-attiva',
    titolo: 'Terza Età Attiva',
    evidenza: 'Autonomia più a lungo',
    descrizione:
      'L\'invecchiamento non deve significare perdita di autonomia. Un programma specifico per mantenere la forza muscolare e l\'equilibrio, essenziali per una vita indipendente.',
    benefici: ['Prevenzione cadute', 'Mobilità articolare', 'Socializzazione', 'Potenziamento dolce'],
    image: immagini.anziani,
    accent: 'secondary',
  },
];

export const percorso = [
  {
    titolo: 'Prenota una visita',
    desc: 'Scegli il momento più adatto per iniziare il tuo percorso di benessere con noi.',
  },
  {
    titolo: 'Colloquio iniziale',
    desc: 'Un momento dedicato per ascoltare la tua storia clinica e comprendere i tuoi obiettivi.',
  },
  {
    titolo: 'Valutazione posturale',
    desc: 'Analisi dettagliata del tuo corpo per individuare le cause specifiche del problema.',
  },
  {
    titolo: 'Piano terapeutico',
    desc: 'Un programma personalizzato, costruito sul tuo problema e sul tuo stile di vita.',
  },
  {
    titolo: 'Terapia manuale',
    desc: 'Trattamenti mirati per alleviare il dolore, ripristinare la mobilità e la funzione.',
  },
  {
    titolo: 'Mantenimento',
    desc: 'Esercizi e consigli posturali per mantenere i risultati nel tempo e prevenire ricadute.',
  },
];

export type Recensione = {
  testo: string;
  autore: string;
  contesto: string;
  stelle: number;
};

// Recensioni raccolte dai pazienti dello studio.
export const recensioni: Recensione[] = [
  {
    testo:
      'Dopo l\'intervento ero preoccupata di non poter tornare alla mia vita di prima. Il supporto, la costanza e la professionalità che ho trovato qui hanno fatto la differenza: oggi mi sento meglio di prima.',
    autore: 'Laura M.',
    contesto: 'Riabilitazione post-chirurgica',
    stelle: 5,
  },
  {
    testo:
      'Mi sono rivolto allo studio per un mal di schiena che mi portavo dietro da anni. Per la prima volta qualcuno mi ha spiegato da dove veniva, invece di limitarsi a trattarlo.',
    autore: 'Marco T.',
    contesto: 'Terapia manuale e osteopatia',
    stelle: 5,
  },
  {
    testo:
      'Ho seguito il percorso post-parto e mi sono sentita accolta dal primo minuto. Professionali, attente e mai di fretta: una cosa rara.',
    autore: 'Giulia R.',
    contesto: 'Progetto Donna e Benessere',
    stelle: 5,
  },
  {
    testo:
      'Mia madre ha 78 anni e temeva la ginnastica. Qui ha trovato pazienza e gradualità: cammina meglio e soprattutto ha ripreso fiducia.',
    autore: 'Stefano P.',
    contesto: 'Progetto Terza Età Attiva',
    stelle: 5,
  },
];

export const frasi = [
  {
    testo: 'Il tuo corpo non ha smesso di funzionare, ha smesso di essere ascoltato.',
    evidenza: 'essere ascoltato',
  },
  {
    testo: 'Il dolore non è un traguardo da sopportare, è un messaggio da capire.',
    evidenza: 'da capire',
  },
  {
    testo: 'Non curiamo un ginocchio o una schiena. Curiamo la persona che ci cammina dentro.',
    evidenza: 'la persona',
  },
];

export type Faq = {
  categoria: 'Generali' | 'Prima visita' | 'Trattamenti';
  domanda: string;
  risposta: string;
};

export const faq: Faq[] = [
  {
    categoria: 'Generali',
    domanda: 'Serve la prescrizione del medico?',
    risposta:
      'No, non è necessaria per accedere a una valutazione fisioterapica o osteopatica. Se hai una prescrizione, referti o esami recenti, portali con te: ci aiutano a inquadrare meglio la situazione.',
  },
  {
    categoria: 'Generali',
    domanda: 'Dove si trova lo studio?',
    risposta:
      'Siamo in Via di Boccea 755, a Roma, zona Casalotti. A pochi passi dalla sede storica di FisioLab Casalotti, dove abbiamo lavorato per anni.',
  },
  {
    categoria: 'Generali',
    domanda: 'Come prenoto un appuntamento?',
    risposta:
      'Puoi chiamare o scrivere direttamente ad Azzurra o a Elisa ai numeri che trovi nella pagina Contatti, oppure inviarci un messaggio dal modulo del sito. Ti ricontattiamo per fissare insieme il primo appuntamento.',
  },
  {
    categoria: 'Prima visita',
    domanda: 'Cosa succede durante la prima seduta?',
    risposta:
      'La prima seduta è dedicata all\'ascolto e alla valutazione: raccogliamo la tua storia clinica, osserviamo la postura e il movimento e individuiamo le cause del problema. Da lì costruiamo il piano terapeutico.',
  },
  {
    categoria: 'Prima visita',
    domanda: 'Quanto dura una seduta?',
    risposta:
      'In genere tra i 45 e i 60 minuti, a seconda del trattamento. La prima valutazione richiede solitamente un po\' più di tempo.',
  },
  {
    categoria: 'Prima visita',
    domanda: 'Cosa devo portare o indossare?',
    risposta:
      'Un abbigliamento comodo che permetta di muoversi liberamente. Porta con te eventuali referti, radiografie o risonanze: sono utili, ma non indispensabili per iniziare.',
  },
  {
    categoria: 'Trattamenti',
    domanda: 'Quante sedute servono?',
    risposta:
      'Dipende dal problema, da quanto tempo è presente e da come il tuo corpo risponde. Dopo la valutazione ti diamo un\'indicazione realistica, e la aggiorniamo insieme durante il percorso.',
  },
  {
    categoria: 'Trattamenti',
    domanda: 'La terapia è dolorosa?',
    risposta:
      'Alcune tecniche possono dare una sensazione di fastidio momentaneo, ma il trattamento non deve mai essere doloroso. Lavoriamo sempre entro la tua soglia di tolleranza.',
  },
  {
    categoria: 'Trattamenti',
    domanda: 'Trattate anche neonati e bambini?',
    risposta:
      'Sì. Offriamo osteopatia neonatale e pediatrica e percorsi di psicomotricità dedicati ai più piccoli, con tempi e modi pensati per loro.',
  },
  {
    categoria: 'Trattamenti',
    domanda: 'Fate anche trattamenti a domicilio?',
    risposta:
      'Valutiamo le richieste caso per caso, in particolare per pazienti con difficoltà di deambulazione. Contattaci e ne parliamo insieme.',
  },
];

export const gallery = [
  {
    src: immagini.manuale,
    alt: 'Seduta di terapia manuale',
    categoria: 'Trattamenti',
    span: 'tall' as const,
  },
  {
    src: immagini.riabilitazione,
    alt: 'Esercizio di rieducazione motoria',
    categoria: 'Riabilitazione',
    span: 'normal' as const,
  },
  {
    src: immagini.strumentale,
    alt: 'Terapia strumentale in studio',
    categoria: 'Trattamenti',
    span: 'normal' as const,
  },
  {
    src: immagini.trattamento,
    alt: 'Momento di benessere e respirazione',
    categoria: 'Lo studio',
    span: 'wide' as const,
  },
  {
    src: immagini.postura,
    alt: 'Ginnastica posturale',
    categoria: 'Riabilitazione',
    span: 'normal' as const,
  },
  {
    src: immagini.anziani,
    alt: 'Percorso dedicato alla terza età',
    categoria: 'Riabilitazione',
    span: 'normal' as const,
  },
  {
    src: immagini.bambini,
    alt: 'Attività di psicomotricità',
    categoria: 'Progetti',
    span: 'normal' as const,
  },
  {
    src: immagini.sede,
    alt: 'La nuova sede di Via di Boccea 755',
    categoria: 'Lo studio',
    span: 'wide' as const,
  },
  {
    src: immagini.calma,
    alt: 'Spazio dedicato al benessere',
    categoria: 'Lo studio',
    span: 'normal' as const,
  },
];

export const galleryCategorie = ['Tutte', 'Lo studio', 'Trattamenti', 'Riabilitazione', 'Progetti'];
