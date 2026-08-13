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
  sede: '/team/studio.png', // la sede di Via della Cellulosa 1
};

export const studio = {
  name: 'FisioEVA',
  claim: 'Studio di Fisioterapia e Osteopatia',
  address: 'Via della Cellulosa, 1',
  city: '00166 Roma',
  zone: 'Casalotti · Uscita 2 Boccea',
  // Attenzione: bocc**e**a, non boccia. È un refuso ricorrente nei materiali.
  email: 'fisioeva.boccea@gmail.com',
  instagram: 'fisioeva_boccea',
  instagramUrl: 'https://www.instagram.com/fisioeva_boccea',
  mapsQuery: 'Via+della+Cellulosa+1,+00166+Roma',

  /*
   * ⛔ NUMERO PROVVISORIO — da sostituire prima del go-live.
   * Lo studio non ha ancora una linea propria. I cellulari personali delle
   * professioniste stanno sui biglietti da visita, non sul sito: qui serve il
   * numero dello studio.
   */
  phone: '+39 06 6155 0000',
  phoneHref: 'tel:+390661550000',
  phoneProvvisorio: true,
  orari: [
    { giorno: 'Lunedì — Venerdì', ore: '08:00 — 20:00' },
    { giorno: 'Sabato', ore: '08:00 — 14:00' },
    { giorno: 'Domenica', ore: 'Chiuso' },
  ],
};

export const team = [
  {
    slug: 'azzurra-de-angelis',
    name: 'Dott.ssa Azzurra De Angelis',
    short: 'Azzurra',
    role: 'Fisioterapista · Osteopata D.O.',
    // Sintesi del curriculum fornito dallo studio. La specializzazione sulla
    // donna non è una scelta commerciale: nasce dalla tesi di osteopatia, e
    // dirlo vale più di qualsiasi elenco di corsi.
    description:
      'Si è laureata in Fisioterapia nel 2011 all\'Università Cattolica del Sacro Cuore con 110/110 e lode, con una tesi in riabilitazione neurologica. Ha proseguito con il Master in Rieducazione Posturale Globale secondo il metodo Souchard e la formazione superiore per le patologie cranio-cervicali, poi con la specializzazione in linfodrenaggio manuale. Ha completato gli studi in Osteopatia alla scuola EDUCAM, di nuovo con 110/110 e lode: la tesi, sul trattamento osteopatico della cicatrice da taglio cesareo, è il punto da cui è partito il suo lavoro con le donne in gravidanza e nel post-parto.',
    photo: '/team/azzurra.png',
    accent: 'secondary' as const,
  },
  {
    slug: 'elisa-de-rubeis',
    name: 'Dott.ssa Elisa De Rubeis',
    short: 'Elisa',
    role: 'Fisioterapista · Osteopata',
    // Sintesi del curriculum fornito dallo studio: stessa lunghezza e stesso
    // registro della bio di Azzurra. L'elenco completo dei corsi resta nel
    // materiale interno — qui conta cosa sa fare, non quante attestazioni ha.
    description:
      'Si è laureata in Fisioterapia nel 2004 con 110/110 e lode, con una tesi sul legame tra emozione, postura e respiro — il filo che ha poi seguito in tutta la sua formazione. Ha completato il triennio di Rieducazione Posturale Globale con il metodo Souchard, il biennio di Terapia Manuale secondo Maitland e i livelli di approccio cranio-sacrale Upledger e di manipolazione fasciale. Lavora con il Pilates applicato alla riabilitazione della colonna e con la ginnastica ipopressiva.',
    photo: '/team/elisa.png',
    accent: 'primary' as const,
  },
  {
    slug: 'veronica-mirarchi',
    name: 'Dott.ssa Veronica Mirarchi',
    short: 'Veronica',
    role: 'Fisioterapista',
    // ⛔ BIO DA ACQUISIRE. Quella che stava qui era inventata dal template:
    // su un professionista sanitario reale non si scrive niente a intuito.
    // Attenzione: risulta solo Fisioterapista, non osteopata — nessuna formula
    // al plurale del tipo "le titolari sono fisioterapiste e osteopate".
    description: 'Bio in arrivo.',
    photo: '',
    accent: 'primary' as const,
  },
];

/**
 * Il team clinico che lavora accanto alle titolari.
 *
 * ⛔ Titolo esatto, specializzazione e numero di albo vanno confermati prima
 * del go-live: per un professionista sanitario il titolo è un obbligo di legge,
 * non un dettaglio. Il ruolo qui sotto è provvisorio e nessuna bio è inventata.
 */
export const teamClinico = [
  { slug: 'siria-ciccone', name: 'Siria Ciccone', short: 'Siria', role: 'Fisioterapista', accent: 'secondary' as const },
  { slug: 'andrea-del-proposto', name: 'Andrea Del Proposto', short: 'Andrea', role: 'Fisioterapista', accent: 'primary' as const },
  { slug: 'valentina-macchia', name: 'Valentina Macchia', short: 'Valentina', role: 'Fisioterapista', accent: 'secondary' as const },
  { slug: 'maria-caterina-scrivo', name: 'Maria Caterina Scrivo', short: 'Maria Caterina', role: 'Nutrizionista', accent: 'primary' as const },
];

/** Accoglienza e segreteria. */
export const accoglienza = [
  { slug: 'francesca-de-rubeis', name: 'Francesca De Rubeis', role: 'Segreteria' },
  { slug: 'laura-de-carli', name: 'Laura De Carli', role: 'Segreteria' },
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

/**
 * I trattamenti, organizzati per come arriva la gente in studio e non per
 * tecnica: chi entra non sa se gli serve la ionoforesi, sa che ha male alla
 * schiena da tre mesi.
 *
 * I sottotitoli sono in lingua del paziente. Nessuna promessa di guarigione:
 * si usa "può aiutare", "si lavora su", mai "risolviamo".
 */
export type CategoriaSlug =
  | 'tornare-a-muoverti'
  | 'salute-della-donna'
  | 'bambino'
  | 'terapie-strumentali'
  | 'terapie-di-gruppo';

export type Categoria = {
  slug: CategoriaSlug;
  nome: string;
  sottotitolo: string;
  image: string;
  accent: 'primary' | 'secondary';
};

/** L'ordine non si tocca: la generalista per prima. */
export const categorie: Categoria[] = [
  {
    slug: 'tornare-a-muoverti',
    nome: 'Per tornare a muoverti',
    sottotitolo: 'Mal di schiena, cervicale, infortuni sportivi, recupero dopo un intervento.',
    image: immagini.riabilitazione,
    accent: 'secondary',
  },
  {
    slug: 'salute-della-donna',
    nome: 'Per la donna',
    sottotitolo: 'Una cura pensata per te, per ciò di cui spesso nessuno parla.',
    image: immagini.donna,
    accent: 'primary',
  },
  {
    slug: 'bambino',
    nome: 'Per il tuo bambino',
    sottotitolo: 'Il parto è il primo grande sforzo della vita. Anche per lui.',
    image: immagini.bambini,
    accent: 'secondary',
  },
  {
    slug: 'terapie-strumentali',
    nome: 'Terapie strumentali',
    sottotitolo: 'A supporto del lavoro manuale, mai al posto suo.',
    image: immagini.manuale,
    accent: 'primary',
  },
  {
    // Il piano superiore: attività di gruppo in collaborazione con LongEva,
    // associazione culturale distinta dallo studio. Sta in fondo, dopo il clinico.
    slug: 'terapie-di-gruppo',
    nome: 'Terapie di gruppo',
    sottotitolo: 'Al piano superiore: muoversi bene, insieme. In collaborazione con LongEva.',
    image: immagini.postura,
    accent: 'secondary',
  },
];

export type Trattamento = {
  slug: string;
  nome: string;
  sottotitolo: string;
  categoria: CategoriaSlug;
  /** Sintomi in lingua del paziente: alimentano la ricerca. */
  sintomi: string[];
  /**
   * ⛔ Segnaposto stock, come tutte le foto del sito: qui servono solo a dare
   * alle card lo stesso peso visivo di quelle in home. Con lo shooting si
   * sostituiscono i valori in `immagini` e queste seguono da sole.
   */
  image?: string;
};

export const trattamenti: Trattamento[] = [
  // — Per tornare a muoverti
  {
    slug: 'osteopatia',
    nome: 'Osteopatia',
    sottotitolo: 'Un approccio che guarda tutto il corpo, non solo il punto in cui senti male.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['mal di schiena', 'lombalgia', 'cervicale', 'cefalea', 'sciatica', 'vertigini'],
  },
  {
    slug: 'terapia-manuale',
    nome: 'Terapia manuale',
    sottotitolo: 'Le mani come strumento: contratture, tensioni e blocchi articolari.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['contrattura', 'collo rigido', 'spalla bloccata', 'dolore muscolare', 'tensione'],
  },
  {
    slug: 'ginnastica-posturale',
    nome: 'Ginnastica Posturale Individuale',
    sottotitolo:
      'Metodo Mézières-Souchard: un metodo di rieducazione globale mirato al ripristino delle curve fisiologiche della tua colonna.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['postura', 'scoliosi', 'schiena curva', 'iperlordosi', 'dolore cervicale da ufficio', 'rigidità', 'mal di schiena cronico'],
  },
  {
    slug: 'fisiokinesiterapia',
    nome: 'Fisiokinesiterapia',
    sottotitolo: 'Il lavoro sul movimento: recuperare forza, mobilità e controllo.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['perdita di forza', 'articolazione rigida', 'dopo il gesso', 'mobilità ridotta'],
  },
  {
    slug: 'rieducazione-motoria',
    nome: 'Rieducazione motoria e neuromotoria',
    sottotitolo: 'Quando il movimento va reimparato, non solo recuperato.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['equilibrio', 'coordinazione', 'camminata', 'neurologico', 'cadute'],
  },
  {
    slug: 'rieducazione-post-chirurgica',
    nome: 'Riabilitazione post-chirurgica',
    sottotitolo: 'Il recupero dopo un intervento, guidato passo dopo passo.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['dopo operazione', 'protesi anca', 'protesi ginocchio', 'crociato', 'frattura'],
  },
  {
    slug: 'rieducazione-sportiva',
    nome: 'Rieducazione sportiva',
    sottotitolo: 'Tornare a giocare, non solo a camminare senza dolore.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['infortunio sportivo', 'distorsione', 'stiramento', 'tendinite', 'sovraccarico'],
  },
  {
    slug: 'taping-neuromuscolare',
    nome: 'Taping neuromuscolare',
    sottotitolo: 'Il supporto elastico che accompagna il movimento senza limitarlo.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['taping', 'kinesio', 'gonfiore', 'supporto articolare', 'contrattura'],
  },

  // — Per la donna
  {
    slug: 'pavimento-pelvico',
    nome: 'Riabilitazione del pavimento pelvico',
    sottotitolo: 'Perdite, pesantezza, dolore: sono comuni, ma non sono normali.',
    categoria: 'salute-della-donna',
    sintomi: ['perdite urinarie', 'incontinenza', 'pesantezza', 'prolasso', 'dopo il parto'],
  },
  {
    slug: 'post-parto',
    nome: 'Recupero post-parto',
    sottotitolo: 'Rimettere insieme addome, schiena e pavimento pelvico, dopo.',
    categoria: 'salute-della-donna',
    sintomi: ['dopo il parto', 'diastasi', 'mal di schiena post-parto', 'allattamento', 'cesareo'],
  },
  {
    slug: 'gravidanza',
    nome: 'Fisioterapia in gravidanza',
    sottotitolo: 'Attraversare i nove mesi senza subirli.',
    categoria: 'salute-della-donna',
    sintomi: ['mal di schiena in gravidanza', 'sciatica', 'gambe gonfie', 'bacino', 'pubalgia'],
  },
  {
    slug: 'cicatrice-cesareo',
    nome: 'Trattamento della cicatrice da cesareo',
    sottotitolo: 'Una cicatrice non è solo un segno: è un tessuto che tira.',
    categoria: 'salute-della-donna',
    sintomi: ['cicatrice cesareo', 'aderenze', 'pancia che tira', 'cicatrice dura'],
  },
  {
    slug: 'linfodrenaggio',
    nome: 'Linfodrenaggio',
    sottotitolo: 'Manovre lente e leggere per ridurre gonfiori e ristagni.',
    categoria: 'salute-della-donna',
    sintomi: ['gambe gonfie', 'linfedema', 'ritenzione', 'pesantezza alle gambe'],
  },

  // — Per il tuo bambino
  {
    slug: 'osteopatia-neonatale',
    nome: 'Osteopatia neonatale e pediatrica',
    sottotitolo: 'Un inizio più sereno, con mani che sanno essere leggere.',
    categoria: 'bambino',
    sintomi: [
      'coliche',
      'neonato che non dorme',
      'difficoltà di suzione',
      'plagiocefalia',
      'testa piatta',
      'torcicollo del neonato',
      'rigurgito',
    ],
  },

  // — Terapie strumentali
  {
    slug: 'tecarterapia',
    nome: 'Tecarterapia',
    sottotitolo: 'Calore profondo per accelerare il recupero dei tessuti.',
    categoria: 'terapie-strumentali',
    sintomi: ['tecar', 'contrattura profonda', 'tendinite', 'distorsione', 'edema'],
  },
  {
    slug: 'laser-alta-potenza',
    nome: 'Laser ad alta potenza',
    sottotitolo: 'Energia luminosa concentrata su infiammazione e dolore.',
    categoria: 'terapie-strumentali',
    sintomi: ['laser', 'tendinite', 'infiammazione', 'borsite', 'epicondilite'],
  },
  {
    slug: 'ultrasuonoterapia',
    nome: 'Ultrasuonoterapia',
    sottotitolo: 'Onde sonore che lavorano in profondità sui tessuti molli.',
    categoria: 'terapie-strumentali',
    sintomi: ['ultrasuoni', 'tendine', 'calcificazione', 'aderenze', 'infiammazione'],
  },
  {
    slug: 'magnetoterapia',
    nome: 'Magnetoterapia',
    sottotitolo: 'Campi magnetici a supporto dei processi di riparazione ossea.',
    categoria: 'terapie-strumentali',
    sintomi: ['magnetoterapia', 'frattura', 'consolidamento', 'osteoporosi', 'dolore osseo'],
  },
  {
    slug: 'tens',
    nome: 'TENS (elettroanalgesia)',
    sottotitolo: 'Stimolazione elettrica a bassa intensità per il controllo del dolore.',
    categoria: 'terapie-strumentali',
    sintomi: ['tens', 'dolore cronico', 'nevralgia'],
  },
  {
    slug: 'ionoforesi',
    nome: 'Ionoforesi',
    sottotitolo: 'Il farmaco portato attraverso la pelle, dove serve.',
    categoria: 'terapie-strumentali',
    sintomi: ['ionoforesi', 'infiammazione localizzata', 'tendinite', 'artrosi'],
  },
  {
    slug: 'elettrostimolazione',
    nome: 'Elettrostimolazione',
    sottotitolo: 'Riattivare un muscolo che ha smesso di rispondere.',
    categoria: 'terapie-strumentali',
    sintomi: ['elettrostimolazione', 'ipotrofia', 'dopo il gesso', 'atrofia'],
  },
  // — Terapie di gruppo (piano superiore, attività non sanitarie)
  {
    slug: 'posturale-di-gruppo',
    nome: 'Posturale di gruppo',
    sottotitolo: 'Il lavoro sulla postura in piccolo gruppo, con la guida di un istruttore.',
    categoria: 'terapie-di-gruppo',
    sintomi: ['postura', 'gruppo', 'mantenimento', 'schiena'],
  },
  {
    slug: 'yoga',
    nome: 'Yoga',
    sottotitolo: 'Respiro, mobilità e forza, al proprio ritmo.',
    categoria: 'terapie-di-gruppo',
    sintomi: ['yoga', 'respirazione', 'flessibilità', 'rilassamento'],
  },
  {
    slug: 'pilates',
    nome: 'Pilates',
    sottotitolo: 'Controllo del centro e del movimento, esercizio dopo esercizio.',
    categoria: 'terapie-di-gruppo',
    sintomi: ['pilates', 'core', 'controllo', 'tonificazione'],
  },
  {
    slug: 'feldenkrais',
    nome: 'Metodo Feldenkrais',
    sottotitolo: 'Imparare a muoversi con meno sforzo, attraverso la consapevolezza del movimento.',
    categoria: 'terapie-di-gruppo',
    sintomi: ['feldenkrais', 'consapevolezza', 'movimento', 'postura', 'rilassamento'],
  },
];

export const trattamentiDi = (categoria: CategoriaSlug) =>
  trattamenti.filter((t) => t.categoria === categoria);

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
    punti: ['Ginnastica Posturale Individuale', 'Valutazione posturale', 'Consapevolezza corporea'],
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

/**
 * Le tre porte d'ingresso ai servizi.
 *
 * L'ordine non si tocca: la generalista per prima. Sopra la piega il messaggio
 * resta neutro — la specializzazione femminile è affiancata, non sostitutiva.
 * Le card 2 e 3 hanno poche voci di proposito: il vuoto è il messaggio.
 */
export type Porta = {
  slug: string;
  titolo: string;
  evidenza: string;
  descrizione: string;
  benefici: string[];
  image: string;
  accent: 'primary' | 'secondary';
  to: string;
};

export const porte: Porta[] = [
  {
    slug: 'tornare-a-muoverti',
    titolo: 'Tornare a muoverti',
    evidenza: 'Per chiunque abbia un corpo che non va',
    descrizione:
      'Mal di schiena, cervicale, infortuni sportivi, recupero dopo un intervento. Terapia manuale, osteopatia e riabilitazione: la valutazione viene prima, il percorso si costruisce su quello che troviamo.',
    benefici: [
      'Mal di schiena e cervicale',
      'Infortuni sportivi',
      'Recupero dopo un intervento',
      'Postura e rieducazione',
    ],
    image: immagini.riabilitazione,
    accent: 'secondary',
    to: '/servizi',
  },
  {
    slug: 'rieducazione-motoria',
    titolo: 'Rieducazione motoria',
    evidenza: 'Reimparare il movimento',
    descrizione:
      'Quando un gesto va reimparato e non solo recuperato: equilibrio, coordinazione, controllo del movimento. Il lavoro parte da come ti muovi oggi e si costruisce passo dopo passo.',
    benefici: [
      'Equilibrio e coordinazione',
      'Controllo del movimento',
      'Recupero neuromotorio',
      'Prevenzione delle cadute',
    ],
    image: immagini.riabilitazione,
    accent: 'secondary',
    to: '/servizi',
  },
  {
    slug: 'rieducazione-post-chirurgica',
    titolo: 'Rieducazione post-chirurgica',
    evidenza: 'Il recupero dopo un intervento',
    descrizione:
      'Il ritorno alla piena funzione dopo un\'operazione, guidato passo dopo passo. Un percorso costruito sui tempi del tuo recupero, dal primo movimento fino alle tue attività.',
    benefici: [
      'Dopo protesi di anca o ginocchio',
      'Ricostruzione del crociato',
      'Recupero dopo una frattura',
      'Ritorno alla piena mobilità',
    ],
    image: immagini.postura,
    accent: 'secondary',
    to: '/servizi',
  },
  {
    slug: 'terapie-strumentali',
    titolo: 'Terapie strumentali',
    evidenza: 'A supporto',
    descrizione:
      'Tecarterapia, laser ad alta potenza, ultrasuoni, magnetoterapia, TENS, ionoforesi ed elettrostimolazione. Entrano nel percorso quando servono, per il tempo che serve — mai al posto del lavoro manuale.',
    benefici: [
      'Contratture e tendinopatie',
      'Infiammazioni localizzate',
      'Gonfiore dopo un intervento',
      'Recupero della forza',
    ],
    image: immagini.manuale,
    accent: 'primary',
    to: '/servizi',
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
    titolo: 'Valutazione clinica',
    desc: 'Analisi clinica e posturale del tuo corpo per individuare le cause specifiche del problema, non solo i sintomi.',
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
    desc: 'Esercizi e attività di gruppo con l\'associazione culturale LongEva per mantenere i risultati nel tempo e prevenire ricadute.',
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
      'Siamo in Via della Cellulosa 1, a Roma, zona Casalotti (uscita 2 Boccea). Nel quartiere in cui lavoriamo da sempre.',
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
    categoria: 'Percorsi',
    span: 'normal' as const,
  },
  {
    src: immagini.sede,
    alt: 'La nuova sede di Via della Cellulosa 1',
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

export const galleryCategorie = ['Tutte', 'Lo studio', 'Trattamenti', 'Riabilitazione', 'Percorsi'];
