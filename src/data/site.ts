/**
 * Ogni foto del sito, in un posto solo.
 *
 * Sono gli scatti dello shooting di settembre 2026, serviti dal nostro
 * dominio: nessuna richiesta a servizi esterni, in linea con la scelta fatta
 * per i font e per la mappa.
 *
 * Cinque scatti mostrano il volto della persona in trattamento: è una modella
 * che ha posato per lo shooting, non una paziente, quindi il sito usa gli
 * originali. Nell'export esistono anche versioni con il viso tagliato
 * (`_CROP`) o sfocato (`_DOF`), in 05_privacy: servirebbero solo se un domani
 * si fotografassero pazienti veri, per cui il consenso scritto è obbligatorio.
 */
export const immagini = {
  // Trattamenti manuali
  trattamento: '/foto/terapia-manuale-momento-di-cura.webp', // Azzurra: il nome è ricamato sul camice
  // Lo sfondo delle hero: le tre titolari insieme.
  hero: '/foto/team-gruppo-hero.webp',
  manuale: '/foto/terapia-manuale-schiena.webp',
  riabilitazione: '/foto/terapia-manuale-ginocchio.webp',
  postura: '/foto/valutazione-posturale-spalle.webp',
  strumentale: '/foto/tecar-in-trattamento.webp',
  calma: '/foto/relazione-sorriso.webp',
  sede: '/foto/sede-reception.webp',
  // L'illustrazione della palazzina di Via di Boccea 755, nel blocco "Dove siamo" con il link alla mappa.
  // Da sostituire con la foto vera degli esterni quando ci sarà.
  sedeIllustrazione: '/foto/sede-illustrazione.webp',

  /*
   * Stock Envato (licenza dello studio), ospitate qui come le altre: il sito
   * non contatta più nessun servizio esterno per le immagini. Non ritraggono
   * lo studio né le professioniste, quindi non si usano mai accanto ai loro nomi.
   */
  donna: '/foto/stock-donna-consulenza.webp', // percorso donna
  bambini: '/foto/stock-neonato.webp', // osteopatia neonatale e pediatrica
  anziani: '/foto/stock-terza-eta.webp', // percorso terza età
};

/** Stock Envato per i trattamenti che lo shooting non poteva mostrare. */
export const stock = {
  pavimentoPelvico: '/foto/stock-pavimento-pelvico.webp',
  postParto: '/foto/stock-post-parto.webp',
  gravidanza: '/foto/stock-gravidanza.webp',
  linfodrenaggio: '/foto/stock-linfodrenaggio.webp',
  taping: '/foto/stock-taping.webp',
  ultrasuoni: '/foto/stock-ultrasuoni.webp',
  magnetoterapia: '/foto/stock-magnetoterapia.webp',
  tens: '/foto/stock-tens.webp',
  // Elettrodi e stimolatore su un arto: non esiste una stock specifica dell'ionoforesi.
  elettrodiGambe: '/foto/stock-elettrodi-gambe.webp',
  elettrostimolazione: '/foto/stock-elettrostimolazione.webp',
  yoga: '/foto/stock-yoga.webp',
  // Gruppo sui tappetini durante un esercizio di allungamento.
  posturaleGruppo: '/foto/stock-posturale-gruppo.webp',
  // Atleta in posizione di partenza sulla pista.
  atleta: '/foto/stock-atleta.webp',
  psicomotricita: '/foto/stock-psicomotricita.webp',
  pilates: '/foto/stock-pilates.webp',
};

/** Gli altri scatti dello shooting, usati nella gallery e nelle schede. */
export const foto = {
  terapiaManualeCaviglia: '/foto/terapia-manuale-caviglia.webp',
  terapiaManualeSostegnoCervicale: '/foto/terapia-manuale-sostegno-cervicale.webp', // volto visibile
  valutazionePosturaleProfilo: '/foto/valutazione-posturale-profilo.webp', // volto visibile
  osteopatiaCranialeDettaglio: '/foto/osteopatia-craniale-dettaglio.webp', // volto visibile
  osteopatiaCranialeManiCapo: '/foto/osteopatia-craniale-mani-capo.webp', // volto visibile
  osteopatiaCervicale: '/foto/osteopatia-cervicale.webp', // volto visibile — ⚠ ancora col colore vecchio: manca nell'export nuovo
  osteopatiaCranialeScena: '/foto/osteopatia-craniale-scena.webp', // volto visibile
  tecarFianco: '/foto/tecar-fianco.webp',
  tecarFisiowarm: '/foto/tecar-fisiowarm.webp',
  laserSpalla: '/foto/laser-spalla.webp',
  laserGomito: '/foto/laser-gomito.webp',
  laserIlux: '/foto/laser-ilux.webp',
  salaLettinoLaser: '/foto/sala-lettino-e-laser.webp',
  teamGruppo: '/foto/team-gruppo.webp',
  teamGruppoRelazionale: '/foto/team-gruppo-relazionale.webp',
  professionalitaOcchialiLaser: '/foto/professionalita-occhiali-laser.webp',
  tecnologiaTouchscreen: '/foto/tecnologia-touchscreen.webp',
  brandLogoCamice: '/foto/brand-logo-camice.webp',

  /*
   * Secondo export (06_trattamenti e 07_esercizi_a_terra). Scelte guardando
   * lo scatto, non il nome del file: per esempio "osteopatia_craniale-supina"
   * mostra in realtà una presa sul braccio, e non è stato usato come craniale.
   * Il volto è quello della modella dello shooting, come per gli altri.
   */
  mobilizzazioneArtoInferiore: '/foto/mobilizzazione-arto-inferiore.webp',
  mobilizzazioneAnca: '/foto/mobilizzazione-anca.webp', // volto visibile
  // ⚠ Il nome del file dice "spalla", ma lo scatto mostra le mani sull'addome:
  // è una manipolazione viscerale, e come tale è usato. Il nome resta quello
  // dell'export dello shooting per non perdere il filo con l'originale.
  manipolazioneViscerale: '/foto/terapia-manuale-spalla.webp',
  terapiaManualeCervicale: '/foto/terapia-manuale-cervicale.webp', // volto visibile
  tecarTrattamentoInCorso: '/foto/tecar-trattamento-in-corso.webp',
  brandCamiceVeronica: '/foto/brand-camice-veronica.webp',
  // Esercizio a terra in postura globale: supina, braccia aperte, mani del terapista sul torace.
  esercizioATerraRiequilibrio: '/foto/esercizio-a-terra-riequilibrio.webp', // volto visibile
  esercizioATerraBracciaAperte: '/foto/esercizio-a-terra-braccia-aperte.webp', // volto visibile
  foamRollerScena: '/foto/foam-roller-scena.webp', // volto visibile
  foamRollerEsercizioGuidato: '/foto/foam-roller-esercizio-guidato.webp', // volto visibile
  // Ritaglio orizzontale di rieducazione_braccia-in-elevazione (DSC9870): in verticale la card tagliava le mani.
  esercizioGuidatoBraccia: '/foto/esercizio-guidato-braccia.webp', // volto visibile
  // Tavoletta propriocettiva: equilibrio e controllo del movimento.
  propriocezioneTavoletta: '/foto/propriocezione-tavoletta.webp',
  propriocezioneMonopodalico: '/foto/propriocezione-monopodalico.webp',
  // Manipolo sul basso addome (tecar_manipolo-addome, DSC9683), ritagliato in orizzontale.
  // Nello scatto non si vede una cicatrice: mostra il lavoro sulla zona, scelto dallo studio per il cesareo.
  addomeTrattamento: '/foto/addome-trattamento.webp',
};

export const studio = {
  name: 'FisioEVA',
  claim: 'Studio di Fisioterapia e Osteopatia',
  address: 'Via di Boccea, 755',
  city: '00166 Roma',
  zone: 'Casalotti',
  // Attenzione: bocc**e**a, non boccia. È un refuso ricorrente nei materiali.
  email: 'fisioeva.boccea@gmail.com',
  instagram: 'fisioeva.boccea',
  instagramUrl: 'https://www.instagram.com/fisioeva.boccea',
  mapsQuery: 'Via+di+Boccea+755,+00166+Roma',

  // Il numero dello studio, fornito dallo studio.
  phone: '+39 392 960 5972',
  phoneHref: 'tel:+393929605972',
  phoneProvvisorio: false,

  /*
   * Lo stesso numero, nel formato che vuole wa.me: prefisso internazionale
   * senza + e senza spazi. È il numero dello studio, non i cellulari delle
   * professioniste — vale qui la stessa regola del telefono.
   *
   * I link si costruiscono solo con gli aiutanti in `src/lib/contatto.ts`,
   * mai a mano: il testo precompilato cambia da un punto all'altro del sito
   * ed è l'unico modo che abbiamo per capire da dove arriva una richiesta
   * senza installare strumenti di tracciamento (che obbligherebbero al
   * banner cookie, oggi non necessario).
   */
  whatsapp: '393929605972',
  orari: [
    { giorno: 'Lunedì — Venerdì', ore: '08:00 — 20:00' },
    { giorno: 'Sabato', ore: '08:00 — 14:00' },
    { giorno: 'Domenica', ore: 'Chiuso' },
  ],
};

/**
 * Identità del sito e stato di pubblicazione.
 *
 * `PUBBLICO` è l'interruttore dell'indicizzazione sui motori di ricerca
 * tradizionali (Google, Bing) — a `true`, per scelta dello studio, dal
 * 13 settembre 2026, insieme ad `APERTO_ALLE_AI` (già aperto in precedenza).
 * Governano insieme `robots.txt`, il meta robots e `llms.txt`, generati a
 * ogni build da `scripts/genera-sitemap.mjs`: se in futuro serve richiudere
 * il sito, si rimette `false` qui, non nei singoli file generati.
 *
 * `dominio` è l'indirizzo pubblico: www.fisioeva.it risponde da questo deploy,
 * e sitemap, canonical e dati strutturati puntano lì.
 */
export const sito = {
  PUBBLICO: true,
  APERTO_ALLE_AI: true,
  dominio: 'https://www.fisioeva.it',
  apertura: '26 settembre 2026',
};

/**
 * Dati legali e privacy: la fonte unica per footer, informativa e cookie policy.
 *
 * ⛔ I campi a `null` non sono ancora stati forniti dallo studio. Non ci si
 * mette un valore verosimile: un numero di partita IVA inventato su un sito
 * sanitario è un dato falso a tutti gli effetti, e potrebbe perfino appartenere
 * a qualcun altro. Restano `null` e il componente <DatoMancante> li segnala.
 */
export const legale = {
  /*
   * Le tre professioniste lavorano ciascuna con la propria partita IVA:
   * sono quindi CONTITOLARI del trattamento ai sensi dell'art. 26 GDPR, non
   * un titolare unico. La differenza non è formale — determina chi risponde
   * verso il paziente e obbliga a mettergli a disposizione il contenuto
   * essenziale dell'accordo di contitolarità.
   *
   * ⛔ Le partite IVA non sono ancora state fornite. Restano `null` e il
   * componente <DatoMancante> le segnala: un numero inventato su un sito
   * sanitario è un dato falso, e potrebbe perfino appartenere a qualcun altro.
   */
  contitolari: [
    {
      nome: 'Dott.ssa Azzurra De Angelis',
      slug: 'azzurra-de-angelis',
      partitaIva: '02739390603',
      codiceFiscale: null as string | null,
    },
    {
      nome: 'Dott.ssa Elisa De Rubeis',
      slug: 'elisa-de-rubeis',
      partitaIva: '08349121007',
      codiceFiscale: null as string | null,
    },
    {
      nome: 'Dott.ssa Veronica Mirarchi',
      slug: 'veronica-mirarchi',
      partitaIva: '18687241002',
      codiceFiscale: null as string | null,
    },
  ],

  /**
   * Punto di contatto unico previsto dall'art. 26.1: il paziente deve poter
   * esercitare i suoi diritti scrivendo a un solo indirizzo, senza dover
   * capire quale delle tre professioniste detiene quale dato.
   */
  emailPrivacy: 'fisioeva.boccea@gmail.com',
  pec: null as string | null,

  // Non nominato: uno studio di fisioterapia che tratta i dati dei propri
  // pazienti non rientra nel "trattamento su larga scala" che lo rende
  // obbligatorio ai sensi dell'art. 37. Se lo si nomina comunque, il nome va qui.
  dpo: null as string | null,

  // Dove finiscono materialmente i dati. Ogni voce è un responsabile del
  // trattamento da nominare ex art. 28 prima del go-live.
  responsabili: [
    {
      // Il gestionale di studio: è il fornitore che tratta i dati più
      // delicati, perché ci passano cartelle cliniche e Sistema Tessera
      // Sanitaria. ⛔ Ragione sociale del fornitore e collocazione dei server
      // vanno prese dal contratto e dall'accordo ex art. 28, non dal sito
      // commerciale.
      nome: 'FisioDesk',
      ruolo: 'Gestionale di studio: agenda, schede paziente e fatturazione',
      paese: null as string | null,
    },
    {
      nome: 'Vercel Inc.',
      ruolo: 'Hosting del sito',
      paese: 'Stati Uniti — EU-U.S. Data Privacy Framework' as string | null,
    },
    {
      nome: 'Google Ireland Ltd.',
      ruolo: 'Casella di posta (Gmail) su cui arrivano le richieste dal sito',
      paese: 'Irlanda, con trasferimenti negli Stati Uniti',
    },
    {
      /*
       * Aggiunto quando WhatsApp è diventato un canale di contatto del sito.
       * Non è un dettaglio: chi ci scrive di là può raccontare un sintomo, e
       * quello è un dato relativo alla salute (art. 9). Il contenuto del
       * messaggio viaggia cifrato da un capo all'altro, ma il numero di
       * telefono e il fatto stesso che ci abbia scritto passano da Meta.
       *
       * Per questo accanto a ogni pulsante WhatsApp il sito ripete che non
       * serve raccontare lì la propria storia clinica, e lascia disponibili
       * telefono ed email per chi preferisce non usarlo.
       */
      nome: 'WhatsApp Ireland Ltd. (gruppo Meta)',
      ruolo: 'Canale di contatto: i messaggi che ci scrivi su WhatsApp',
      paese: 'Irlanda, con trasferimenti negli Stati Uniti',
    },
  ],

  gestionale: 'FisioDesk' as string | null,

  ultimoAggiornamento: '13 settembre 2026',
};

/** Le partite IVA effettivamente disponibili, per footer e dati strutturati. */
export const partiteIva = legale.contitolari
  .map((c) => c.partitaIva)
  .filter((p): p is string => Boolean(p));

/*
 * L'Albo dei Fisioterapisti è tenuto dagli Ordini TSRM-PSTRP su base
 * PROVINCIALE: il solo numero non identifica l'iscrizione, serve anche
 * l'Ordine presso cui è iscritta ciascuna professionista.
 *
 * Lo studio non ha saputo indicare con certezza l'Ordine di ciascuna: su
 * indicazione dello studio, nel dubbio, è impostato "Roma" per tutte e tre
 * (è dove ha sede lo studio, l'ipotesi più probabile). Se una risulta
 * iscritta altrove — capita se ci si è iscritti quando si viveva o
 * lavorava in un'altra provincia — va corretto qui.
 */
export const team = [
  {
    slug: 'azzurra-de-angelis',
    name: 'Dott.ssa Azzurra De Angelis',
    short: 'Azzurra',
    albo: '6174',
    ordine: 'Ordine TSRM-PSTRP di Roma' as string | null,
    role: 'Fisioterapista · Osteopata D.O.',
    /*
     * Curriculum fornito dallo studio, testo integrale. Come per Elisa, nella
     * card si vede la versione breve e il percorso completo si apre a un clic:
     * tre schede affiancate devono restare leggibili insieme.
     */
    descrizioneBreve:
      'Si è laureata in Fisioterapia nel 2011 all\'Università Cattolica del Sacro Cuore con 110/110 e lode, con una tesi in riabilitazione neurologica. Ha proseguito con il Master in Rieducazione Posturale Globale di P. Souchard, si è specializzata in linfodrenaggio manuale e ha completato gli studi in Osteopatia alla scuola EDUCAM, di nuovo con 110/110 e lode. Dalla tesi sulla cicatrice da taglio cesareo nasce il suo lavoro con le donne in gravidanza e nel post-parto.',
    description:
      'La Dott.ssa Azzurra De Angelis consegue la laurea in Fisioterapia nel 2011 con voto 110/110 con Lode presso l’Università Cattolica del Sacro Cuore, con una tesi in Riabilitazione Neurologica. Nello stesso anno frequenta il Corso Taping Neuromuscolare e Human Tecar Certified Operator. Prosegue il percorso di studi frequentando il Master di I livello in Rieducazione Posturale Globale di P. Souchard e la formazione superiore in RPG adatta alle Patologie Cranio Cervicali. Approfondisce le competenze relative alla rieducazione posturale frequentando vari corsi di formazione come: «Piede Postura ed Equilibrio», «Articolazione Temporo-Mandibolare: Valutazione e Trattamento», «Corso di Perfezionamento Pilates Reformer 1». Nel 2015 si specializza in Linfodrenaggio Manuale avvicinandosi quindi alla riabilitazione di patologie o disturbi linfatici e vascolari. Completa il percorso di studi in Osteopatia presso la scuola EDUCAM - Complementary and Alternative Medicine Education, con votazione finale di 110/110 con lode. Grazie agli studi effettuati per la sua tesi conclusiva «Approccio osteopatico al dolore lombosacrale mediante il trattamento della cicatrice da taglio cesareo» si specializza nel trattamento delle donne in gravidanza e post-parto.',
    photo: '/team/azzurra.webp',
    accent: 'secondary' as const,
  },
  {
    slug: 'elisa-de-rubeis',
    name: 'Dott.ssa Elisa De Rubeis',
    short: 'Elisa',
    albo: '4948',
    ordine: 'Ordine TSRM-PSTRP di Roma' as string | null,
    // Solo fisioterapista: lo studio ha precisato che Elisa non è osteopata.
    role: 'Fisioterapista',
    /*
     * Elisa ha mandato il curriculum per esteso e non si taglia: il percorso
     * è il punto. Ma tre schede affiancate devono potersi leggere insieme, e
     * la sua era tre volte le altre. Quindi `descrizioneBreve` è quella che
     * si vede, e `description` si apre su richiesta: nessuna riga persa,
     * griglia leggibile.
     */
    descrizioneBreve:
      'Si è laureata in Fisioterapia nel 2004 con 110/110 e lode, con una tesi sul legame tra emozione, postura e respiro — il filo che ha poi seguito in tutta la sua formazione. Ha proseguito con il master in Rieducazione Posturale Globale secondo il metodo Souchard, il corso annuale di terapia manuale secondo il concetto Maitland e i livelli di cranio-sacrale e di manipolazione fasciale viscerale del metodo Upledger. Lavora con il Pilates applicato alla colonna e con la ginnastica ipopressiva post-partum. Oggi è al terzo anno della formazione quadriennale in metodo Feldenkrais.',
    description:
      'Si è laureata in Fisioterapia nel 2004 con 110/110 e lode, con una tesi sul legame tra emozione, postura e respiro — il filo che ha poi seguito in tutta la sua formazione. Ha proseguito con il master in Rieducazione Posturale Globale (metodo Souchard), con il corso annuale in terapia manuale secondo il concetto Maitland, con un primo livello di cranio-sacrale e con due livelli di manipolazione fasciale viscerale secondo il metodo Upledger. Ha seguito il corso di «Corpo e Coscienza» di G. Courchinoux, ginnastica posturale di gruppo che integra sistemi occidentali con tecniche ed esercizi orientali. Lavora con il Pilates applicato alla colonna e ha seguito corsi post-graduate formativi di ginnastica ipopressiva post-partum (tecnica Caufriez e metodo De Gasquet). Attualmente è in formazione quadriennale (al terzo anno) del metodo Feldenkrais. È abilitata all’insegnamento delle C.A.M. (Conoscersi Attraverso il Movimento), metodo volto alla scoperta del movimento fisiologico attraverso esplorazioni del sistema nervoso che organizza in maniera naturale il movimento rendendolo efficiente e piacevole.',
    photo: '/team/elisa.webp',
    accent: 'primary' as const,
  },
  {
    slug: 'veronica-mirarchi',
    name: 'Dott.ssa Veronica Mirarchi',
    short: 'Veronica',
    albo: '11463',
    ordine: 'Ordine TSRM-PSTRP di Roma' as string | null,
    role: 'Fisioterapista · Osteopata D.O.',
    // Bio fornita dallo studio (osteopata dal 2020, fisioterapista dal 2025):
    // quindi è sia osteopata sia fisioterapista, e il ruolo lo riflette.
    description:
      'Si è diplomata in Osteopatia presso il CERDO nel 2020, con una tesi dedicata al trattamento osteopatico delle disfunzioni gastrointestinali. Nel 2025 si è laureata in Fisioterapia presso l’Università UniCamillus con 110/110 e lode, discutendo una tesi sulla riabilitazione del pavimento pelvico nelle donne con endometriosi. Durante il percorso universitario ha svolto un importante periodo di formazione presso il CONI, lavorando a contatto con atleti di livello internazionale. Il suo passato da sportiva e l’interesse per la salute femminile orientano oggi il suo lavoro, nel quale integra fisioterapia e osteopatia attraverso un approccio globale e attento alle esigenze della persona.',
    photo: '/team/veronica.webp',
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
  // Nei file originali i nomi erano scambiati (frnacesca.jpeg è Laura, Laura.jpeg è Francesca):
  // qui sono già abbinati alla persona giusta, su indicazione dello studio.
  { slug: 'francesca-de-rubeis', name: 'Francesca De Rubeis', role: 'Segreteria', photo: '/team/francesca.webp' },
  { slug: 'laura-de-carli', name: 'Laura De Carli', role: 'Segreteria', photo: '/team/laura.webp' },
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
    sottotitolo: 'Mal di schiena, dolore cervicale, infortuni sportivi, recupero dopo un intervento.',
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
    image: foto.tecarFisiowarm,
    accent: 'primary',
  },
  {
    // Il piano superiore: attività di gruppo in collaborazione con StudioEVA,
    // associazione culturale distinta dallo studio. Sta in fondo, dopo il clinico.
    slug: 'terapie-di-gruppo',
    nome: 'Terapie di gruppo',
    sottotitolo: 'Al piano superiore: muoversi bene, insieme. In collaborazione con StudioEVA.',
    image: stock.posturaleGruppo,
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
   * Lo scatto dello shooting che ritrae DAVVERO questo trattamento.
   *
   * Si assegna solo quando la foto mostra quella cosa lì: su un sito sanitario
   * una foto del laser accanto a "Magnetoterapia" non è un'approssimazione, è
   * un'informazione falsa. Dove la foto non esiste il campo resta vuoto e la
   * card mostra un riquadro neutro — mai una foto a caso.
   */
  image?: string;
};

export const trattamenti: Trattamento[] = [
  // — Per tornare a muoverti
  {
    slug: 'osteopatia',
    nome: 'Osteopatia',
    sottotitolo: 'Un approccio che guarda tutto il corpo, non solo il punto in cui senti dolore.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['mal di schiena', 'lombalgia', 'cervicale', 'cefalea', 'sciatica', 'vertigini'],
    image: immagini.trattamento,
  },
  {
    slug: 'terapia-manuale',
    nome: 'Terapia manuale',
    sottotitolo: 'Le mani come strumento: contratture, tensioni e blocchi articolari.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['contrattura', 'collo rigido', 'spalla bloccata', 'dolore muscolare', 'tensione'],
    // Elisa che tratta la schiena.
    image: immagini.manuale,
  },
  {
    slug: 'terapia-cranio-sacrale',
    nome: 'Terapia cranio-sacrale',
    sottotitolo: 'Un contatto leggero su cranio, colonna e sacro, per sciogliere le tensioni più profonde.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['cranio sacrale', 'craniosacrale', 'cefalea', 'mal di testa', 'tensione', 'stress', 'bruxismo'],
    image: foto.osteopatiaCranialeScena,
  },
  {
    slug: 'ginnastica-posturale',
    nome: 'Ginnastica Posturale Individuale',
    sottotitolo:
      'Metodo Mézières-Souchard: un metodo di rieducazione globale mirato al ripristino delle curve fisiologiche della tua colonna.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['postura', 'scoliosi', 'schiena curva', 'iperlordosi', 'dolore cervicale da ufficio', 'rigidità', 'mal di schiena cronico'],
    // Una postura globale a terra, con le mani del terapista: è la seduta, non la valutazione.
    image: foto.esercizioATerraRiequilibrio,
  },
  {
    // Fa parte dell'osteopatia, ma esistono corsi dedicati solo a questa ed è
    // una cosa che lo studio fa: ha una scheda sua, non una riga dentro un'altra.
    slug: 'manipolazione-viscerale',
    nome: 'Manipolazione viscerale',
    sottotitolo:
      'Un lavoro manuale profondo sugli organi e sui tessuti che li sostengono, dove tirano e limitano il movimento.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['viscerale', 'pancia che tira', 'digestione', 'aderenze', 'mal di schiena', 'cicatrice'],
    image: foto.manipolazioneViscerale,
  },
  {
    slug: 'fisiokinesiterapia',
    nome: 'Fisiokinesiterapia',
    sottotitolo: 'Il lavoro sul movimento: recuperare forza, mobilità e controllo.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['perdita di forza', 'articolazione rigida', 'dopo il gesso', 'mobilità ridotta'],
    // Uno scatto che mostra il movimento, non le mani ferme su un lettino.
    image: foto.esercizioGuidatoBraccia,
  },
  {
    slug: 'rieducazione-motoria',
    nome: 'Rieducazione motoria e neuromotoria',
    sottotitolo: 'Quando il movimento va reimparato, non solo recuperato.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['equilibrio', 'coordinazione', 'camminata', 'neurologico', 'cadute'],
    image: foto.propriocezioneTavoletta,
  },
  {
    slug: 'rieducazione-post-chirurgica',
    nome: 'Riabilitazione post-chirurgica',
    sottotitolo: 'Il recupero dopo un intervento, guidato passo dopo passo.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['dopo operazione', 'protesi anca', 'protesi ginocchio', 'crociato', 'frattura'],
    image: foto.terapiaManualeCaviglia,
  },
  {
    slug: 'rieducazione-sportiva',
    nome: 'Rieducazione sportiva',
    sottotitolo: 'Tornare a praticare il tuo sport, non solo a camminare senza dolore.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['infortunio sportivo', 'distorsione', 'stiramento', 'tendinite', 'sovraccarico'],
    image: stock.atleta,
  },
  {
    slug: 'taping-neuromuscolare',
    nome: 'Taping neuromuscolare',
    sottotitolo: 'Il supporto elastico che accompagna il movimento senza limitarlo.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['taping', 'kinesio', 'gonfiore', 'supporto articolare', 'contrattura'],
    image: stock.taping,
  },
  {
    // Lo stesso trattamento compare anche in "Per la donna", con un'altra foto:
    // slug diverso perché le card hanno bisogno di una chiave unica.
    slug: 'linfodrenaggio-riabilitativo',
    nome: 'Linfodrenaggio',
    sottotitolo: 'Manovre lente e leggere per ridurre gonfiori e ristagni.',
    categoria: 'tornare-a-muoverti',
    sintomi: ['gonfiore dopo un intervento', 'edema', 'linfedema', 'ristagno'],
    image: immagini.riabilitazione,
  },

  // — Per la donna
  {
    slug: 'pavimento-pelvico',
    nome: 'Riabilitazione del pavimento pelvico',
    sottotitolo: 'Perdite, pesantezza, dolore: sono sintomi comuni, ma possiamo ridurli lavorando insieme.',
    categoria: 'salute-della-donna',
    sintomi: ['perdite urinarie', 'incontinenza', 'pesantezza', 'prolasso', 'dopo il parto'],
    image: stock.pavimentoPelvico,
  },
  {
    slug: 'post-parto',
    nome: 'Recupero post-parto',
    sottotitolo: 'Rimettere insieme addome, schiena e pavimento pelvico, dopo.',
    categoria: 'salute-della-donna',
    sintomi: ['dopo il parto', 'diastasi', 'mal di schiena post-parto', 'allattamento', 'cesareo'],
    image: stock.postParto,
  },
  {
    slug: 'gravidanza',
    nome: 'Fisioterapia in gravidanza',
    sottotitolo: 'Attraversare i nove mesi senza subirli.',
    categoria: 'salute-della-donna',
    sintomi: ['mal di schiena in gravidanza', 'sciatica', 'gambe gonfie', 'bacino', 'pubalgia'],
    image: stock.gravidanza,
  },
  {
    slug: 'cicatrice-cesareo',
    nome: 'Trattamento della cicatrice da cesareo',
    sottotitolo: 'Una cicatrice non è solo un segno: è un tessuto che tira.',
    categoria: 'salute-della-donna',
    sintomi: ['cicatrice cesareo', 'aderenze', 'pancia che tira', 'cicatrice dura'],
    image: foto.addomeTrattamento,
  },
  {
    slug: 'linfodrenaggio',
    nome: 'Linfodrenaggio',
    sottotitolo: 'Manovre lente e leggere per ridurre gonfiori e ristagni.',
    categoria: 'salute-della-donna',
    sintomi: ['gambe gonfie', 'linfedema', 'ritenzione', 'pesantezza alle gambe'],
    image: stock.linfodrenaggio,
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
    image: immagini.bambini,
  },

  // — Terapie strumentali
  {
    slug: 'tecarterapia',
    nome: 'Tecarterapia',
    sottotitolo: 'Calore profondo per accelerare il recupero dei tessuti.',
    categoria: 'terapie-strumentali',
    sintomi: ['tecar', 'contrattura profonda', 'tendinite', 'distorsione', 'edema'],
    image: foto.tecarFianco,
  },
  {
    slug: 'laser-alta-potenza',
    nome: 'Laser ad alta potenza',
    sottotitolo: 'Energia luminosa concentrata su infiammazione e dolore.',
    categoria: 'terapie-strumentali',
    sintomi: ['laser', 'tendinite', 'infiammazione', 'borsite', 'epicondilite'],
    image: foto.laserSpalla,
  },
  {
    slug: 'ultrasuonoterapia',
    nome: 'Ultrasuonoterapia',
    sottotitolo: 'Onde sonore che lavorano in profondità sui tessuti molli.',
    categoria: 'terapie-strumentali',
    sintomi: ['ultrasuoni', 'tendine', 'calcificazione', 'aderenze', 'infiammazione'],
    image: stock.ultrasuoni,
  },
  {
    slug: 'magnetoterapia',
    nome: 'Magnetoterapia',
    sottotitolo: 'Campi magnetici a supporto dei processi di riparazione ossea.',
    categoria: 'terapie-strumentali',
    sintomi: ['magnetoterapia', 'frattura', 'consolidamento', 'osteoporosi', 'dolore osseo'],
    image: stock.magnetoterapia,
  },
  {
    slug: 'tens',
    nome: 'TENS (elettroanalgesia)',
    sottotitolo: 'Stimolazione elettrica a bassa intensità per il controllo del dolore.',
    categoria: 'terapie-strumentali',
    sintomi: ['tens', 'dolore cronico', 'nevralgia'],
    image: stock.tens,
  },
  {
    slug: 'ionoforesi',
    nome: 'Ionoforesi',
    sottotitolo: 'Il farmaco portato attraverso la pelle, dove serve.',
    categoria: 'terapie-strumentali',
    sintomi: ['ionoforesi', 'infiammazione localizzata', 'tendinite', 'artrosi'],
    image: stock.elettrodiGambe,
  },
  {
    slug: 'elettrostimolazione',
    nome: 'Elettrostimolazione',
    sottotitolo: 'Riattivare un muscolo che ha smesso di rispondere.',
    categoria: 'terapie-strumentali',
    sintomi: ['elettrostimolazione', 'ipotrofia', 'dopo il gesso', 'atrofia'],
    image: stock.elettrostimolazione,
  },
  // — Terapie di gruppo (piano superiore, attività non sanitarie)
  {
    slug: 'posturale-di-gruppo',
    nome: 'Posturale di gruppo',
    sottotitolo: 'Il lavoro sulla postura in piccolo gruppo, con la guida di un professionista specializzato.',
    categoria: 'terapie-di-gruppo',
    sintomi: ['postura', 'gruppo', 'mantenimento', 'schiena'],
    image: stock.posturaleGruppo,
  },
  {
    slug: 'yoga',
    nome: 'Yoga',
    sottotitolo: 'Respiro, mobilità e forza, al proprio ritmo.',
    categoria: 'terapie-di-gruppo',
    sintomi: ['yoga', 'respirazione', 'flessibilità', 'rilassamento'],
    image: stock.yoga,
  },
  {
    slug: 'pilates',
    nome: 'Pilates',
    sottotitolo: 'Controllo del centro e del movimento, esercizio dopo esercizio.',
    categoria: 'terapie-di-gruppo',
    sintomi: ['pilates', 'core', 'controllo', 'tonificazione'],
    image: stock.pilates,
  },
  {
    slug: 'feldenkrais',
    nome: 'Metodo Feldenkrais',
    sottotitolo: 'Imparare a muoversi con meno sforzo, attraverso la consapevolezza del movimento.',
    categoria: 'terapie-di-gruppo',
    sintomi: ['feldenkrais', 'consapevolezza', 'movimento', 'postura', 'rilassamento'],
    // Elisa, che insegna il metodo, a terra mentre guida la paziente.
    image: foto.esercizioATerraBracciaAperte,
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
      'Mal di schiena, dolore cervicale, infortuni sportivi, recupero dopo un intervento. Terapia manuale, osteopatia e riabilitazione: la valutazione viene prima, il percorso si costruisce su quello che troviamo.',
    benefici: [
      'Mal di schiena e dolore cervicale',
      'Infortuni sportivi',
      'Recupero dopo un intervento',
      'Postura e rieducazione',
    ],
    // Una foto diversa per ogni porta: prima erano tre card di fila con lo stesso ginocchio.
    image: immagini.manuale,
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
    image: foto.propriocezioneTavoletta,
    accent: 'secondary',
    to: '/servizi',
  },
  {
    slug: 'rieducazione-post-chirurgica',
    titolo: 'Rieducazione post-chirurgica',
    evidenza: 'Il recupero dopo un intervento',
    descrizione:
      'Il ritorno alla piena funzione dopo un\'operazione, guidato passo dopo passo. Un percorso costruito sui tempi del tuo recupero, dal primo movimento fino alle attività quotidiane.',
    benefici: [
      'Dopo protesi di anca o ginocchio',
      'Ricostruzione del crociato',
      'Recupero dopo una frattura',
      'Ritorno alla piena mobilità',
    ],
    image: immagini.riabilitazione,
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
    image: foto.tecarFisiowarm,
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
    image: stock.psicomotricita,
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
    image: foto.esercizioATerraRiequilibrio,
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
    desc: 'Esercizi e attività di gruppo con l\'associazione culturale StudioEVA per mantenere i risultati nel tempo e prevenire ricadute.',
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
      'Siamo in Via di Boccea 755, a Roma, zona Casalotti, all\'angolo con Via della Cellulosa. Nel quartiere in cui lavoriamo da sempre.',
  },
  {
    categoria: 'Generali',
    domanda: 'Come prenoto un appuntamento?',
    // Le prenotazioni passano dallo studio, non dai cellulari delle titolari.
    risposta:
      'Dalla pagina Contatti: trovi il numero dello studio, l\'email e un modulo da compilare. Scrivici o chiamaci e fissiamo insieme il primo appuntamento.',
  },
  {
    categoria: 'Prima visita',
    // Colloquio iniziale e prima seduta sono due cose diverse, e vanno
    // distinte: il colloquio è gratuito e il piano terapeutico comincia dopo.
    domanda: 'Cosa succede durante il colloquio iniziale?',
    risposta:
      'Il colloquio iniziale dura una ventina di minuti, è gratuito ed è dedicato all\'ascolto e alla valutazione: raccogliamo la tua storia clinica, osserviamo la postura e il movimento e individuiamo le cause del problema. Da lì costruiamo insieme il piano terapeutico, e le sedute cominciano da lì.',
  },
  {
    categoria: 'Prima visita',
    domanda: 'Quanto dura una seduta?',
    risposta:
      'Tra i 45 e i 50 minuti, a seconda del trattamento.',
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
    alt: 'Trattamento manuale della schiena',
    categoria: 'Trattamenti',
    span: 'tall' as const,
  },
  {
    src: foto.osteopatiaCranialeManiCapo,
    alt: 'Trattamento di osteopatia craniale',
    categoria: 'Trattamenti',
    span: 'normal' as const,
  },
  {
    src: immagini.strumentale,
    alt: 'Tecarterapia durante una seduta',
    categoria: 'Trattamenti',
    span: 'normal' as const,
  },
  {
    src: foto.teamGruppo,
    alt: 'Le professioniste dello studio FisioEVA',
    categoria: 'Lo studio',
    span: 'wide' as const,
  },
  {
    src: immagini.postura,
    alt: 'Valutazione posturale delle spalle',
    categoria: 'Riabilitazione',
    span: 'normal' as const,
  },
  {
    src: foto.laserSpalla,
    alt: 'Laser ad alta potenza sulla spalla',
    categoria: 'Trattamenti',
    span: 'normal' as const,
  },
  {
    src: foto.salaLettinoLaser,
    alt: 'La sala trattamenti con lettino e laser',
    categoria: 'Lo studio',
    span: 'normal' as const,
  },
  {
    src: immagini.sede,
    alt: 'La reception dello studio in Via di Boccea 755',
    categoria: 'Lo studio',
    span: 'wide' as const,
  },
  {
    src: foto.terapiaManualeCaviglia,
    alt: 'Terapia manuale della caviglia',
    categoria: 'Riabilitazione',
    span: 'normal' as const,
  },
  {
    src: foto.tecarFisiowarm,
    alt: 'La tecar Fisiowarm accanto al lettino',
    categoria: 'Lo studio',
    span: 'normal' as const,
  },
  {
    src: immagini.calma,
    alt: 'Un sorriso durante il lavoro in studio',
    categoria: 'Lo studio',
    span: 'normal' as const,
  },
  {
    src: foto.laserIlux,
    alt: 'Il laser iLux accanto al lettino',
    categoria: 'Trattamenti',
    span: 'normal' as const,
  },
  {
    src: foto.manipolazioneViscerale,
    alt: 'Manipolazione viscerale, con le mani sull\'addome',
    categoria: 'Trattamenti',
    span: 'tall' as const,
  },
  {
    src: foto.esercizioATerraRiequilibrio,
    alt: 'Ginnastica posturale a terra, con le mani della terapista sul torace',
    categoria: 'Esercizio',
    span: 'wide' as const,
  },
  {
    src: foto.propriocezioneMonopodalico,
    alt: 'Esercizio di equilibrio su una gamba sulla tavoletta propriocettiva',
    categoria: 'Esercizio',
    span: 'tall' as const,
  },
  {
    src: foto.mobilizzazioneArtoInferiore,
    alt: "Mobilizzazione dell'anca e del ginocchio sul lettino",
    categoria: 'Riabilitazione',
    span: 'normal' as const,
  },
  {
    src: foto.foamRollerEsercizioGuidato,
    alt: 'Esercizio guidato di stabilizzazione con il foam roller',
    categoria: 'Esercizio',
    span: 'normal' as const,
  },
  {
    src: foto.tecarTrattamentoInCorso,
    alt: 'Tecarterapia durante il trattamento',
    categoria: 'Trattamenti',
    span: 'normal' as const,
  },
  {
    src: foto.terapiaManualeCervicale,
    alt: 'Manovra HVLA sul tratto dorsale',
    categoria: 'Trattamenti',
    span: 'normal' as const,
  },
  {
    src: foto.mobilizzazioneAnca,
    alt: "Mobilizzazione dell'anca in posizione supina",
    categoria: 'Riabilitazione',
    span: 'normal' as const,
  },
  {
    src: foto.propriocezioneTavoletta,
    alt: 'Il piede sulla tavoletta propriocettiva',
    categoria: 'Esercizio',
    span: 'wide' as const,
  },
  {
    src: foto.esercizioGuidatoBraccia,
    alt: 'Esercizio guidato di stabilizzazione con il foam roller, dettaglio',
    categoria: 'Esercizio',
    span: 'wide' as const,
  },
  {
    src: foto.brandCamiceVeronica,
    alt: 'Il logo FisioEVA sul camice della Dott.ssa Veronica Mirarchi',
    categoria: 'Lo studio',
    span: 'normal' as const,
  },
];

/*
 * Solo le categorie che hanno davvero degli scatti: "Percorsi" è uscita con
 * lo shooting di settembre, perché le foto dei percorsi donna, pediatrico e
 * terza età non esistono ancora. Va rimessa insieme alle foto, non prima —
 * un filtro che apre su una griglia vuota sembra un sito rotto.
 */
export const galleryCategorie = ['Tutte', 'Lo studio', 'Trattamenti', 'Riabilitazione', 'Esercizio'];
