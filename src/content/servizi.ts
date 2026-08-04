/**
 * I 21 servizi, riorganizzati per bisogno del paziente e non per tecnica.
 * Testi presi dalle istruzioni di progetto: non riscriverli "a orecchio".
 *
 * Regole di scrittura rispettate qui:
 * - mai promesse di guarigione (si usa "può aiutare", "si lavora su")
 * - mai "gratis": si dice "prima valutazione"
 * - i fisioterapisti non sono medici
 */

export type CategoriaSlug =
  | 'tornare-a-muoverti'
  | 'salute-della-donna'
  | 'bambino'
  | 'terapie-strumentali'
  | 'nutrizione'
  | 'longeva';

export type Servizio = {
  slug: string;
  nome: string;
  categoria: CategoriaSlug;
  sottotitolo: string;
  /** Alimenta la ricerca per sintomo in /servizi. */
  sintomi: string[];
  quandoServe: string[];
  comeLavoriamo: string;
  comeSiSvolge?: string[];
  prescrizione: string;
  eseguitoDa?: string;
  /** ⛔ da compilare quando il cliente conferma le durate. */
  durata?: string;
  correlati: string[];
  faq?: { q: string; a: string }[];
  metaTitle: string;
  metaDescription: string;
  /** Nota interna, non renderizzata. */
  nota?: string;
};

export type Categoria = {
  slug: CategoriaSlug;
  nome: string;
  titoloEsteso: string;
  sottotitolo: string;
  intro?: string;
  tono: 'acqua' | 'lilla' | 'neutro';
  /** Le strumentali hanno un trattamento visivo deliberatamente più sobrio. */
  sobria?: boolean;
  inMenu: boolean;
};

export const categorie: Categoria[] = [
  {
    slug: 'tornare-a-muoverti',
    nome: 'Per tornare a muoverti',
    titoloEsteso: 'Per tornare a muoverti',
    sottotitolo:
      'Mal di schiena, cervicale, infortuni sportivi, recupero dopo un intervento.',
    tono: 'acqua',
    inMenu: true,
  },
  {
    slug: 'salute-della-donna',
    nome: 'Per la donna',
    titoloEsteso: 'Salute della donna',
    sottotitolo: 'Una cura pensata per te, per ciò di cui spesso nessuno parla.',
    tono: 'lilla',
    inMenu: true,
  },
  {
    slug: 'bambino',
    nome: 'Per il tuo bambino',
    titoloEsteso: 'Per il tuo bambino',
    sottotitolo: 'Il parto è il primo grande sforzo della vita. Anche per lui.',
    tono: 'acqua',
    inMenu: true,
  },
  {
    slug: 'terapie-strumentali',
    nome: 'Terapie fisiche strumentali',
    titoloEsteso: 'Terapie fisiche strumentali',
    sottotitolo: 'A supporto del lavoro manuale, mai al posto suo.',
    intro:
      'Le terapie strumentali accelerano e accompagnano il recupero. Non sostituiscono la valutazione e il lavoro manuale: entrano nel percorso quando servono, per il tempo che serve.',
    tono: 'neutro',
    sobria: true,
    inMenu: true,
  },
  {
    slug: 'nutrizione',
    nome: 'Nutrizione',
    titoloEsteso: 'Nutrizione',
    sottotitolo: 'In definizione.',
    tono: 'neutro',
    inMenu: false, // ⛔ in attesa di conferma: FisioEva o LongEva?
  },
  {
    slug: 'longeva',
    nome: 'Spazio corsi',
    titoloEsteso: 'Spazio corsi',
    sottotitolo: 'Posturale di gruppo, yoga e pilates al piano superiore.',
    tono: 'lilla',
    inMenu: false, // ⛔ nome del brand non ancora confermato
  },
];

export const servizi: Servizio[] = [
  // ─────────────────────────── A · Per tornare a muoverti
  {
    slug: 'osteopatia',
    nome: 'Osteopatia',
    categoria: 'tornare-a-muoverti',
    sottotitolo: 'Un approccio che guarda tutto il corpo, non solo il punto in cui senti male.',
    sintomi: [
      'mal di schiena',
      'lombalgia',
      'cervicale',
      'cefalea',
      'sciatica',
      'dolore che torna',
      'mandibola',
      'disturbi digestivi',
      'vertigini',
    ],
    quandoServe: [
      'Un dolore che torna sempre nello stesso punto, anche dopo averlo trattato',
      'Mal di schiena o cervicalgia che non hanno una causa evidente',
      'Rigidità che limita i movimenti quotidiani',
      'Cefalea tensiva, dolore alla mandibola',
      'Dopo un trauma, anche vecchio (una caduta, un colpo di frusta)',
      'Quando la fisioterapia da sola non è bastata',
    ],
    comeLavoriamo:
      'L\'osteopatia lavora su articolazioni, muscoli, tessuti e sistema cranio-sacrale con tecniche manuali. La valutazione parte dal punto in cui senti male ma non si ferma lì: si guarda come si muove il resto del corpo, perché spesso il punto dolente è la conseguenza di qualcos\'altro. Il trattamento si costruisce su quello che troviamo.',
    comeSiSvolge: [
      'Colloquio: la tua storia, non solo il tuo sintomo',
      'Valutazione posturale e dei movimenti',
      'Test manuali sulle zone coinvolte',
      'Trattamento manuale',
      'Indicazioni su cosa fare (e non fare) tra una seduta e l\'altra',
    ],
    prescrizione: 'Non necessaria.',
    eseguitoDa:
      'Dott.ssa Azzurra De Angelis (Osteopata D.O.), Dott.ssa Elisa De Rubeis (Osteopata).',
    correlati: ['terapia-manuale', 'rieducazione-posturale-rpg', 'osteopatia-neonatale'],
    faq: [
      {
        q: 'Osteopatia e fisioterapia sono la stessa cosa?',
        a: 'No, sono due discipline distinte con approcci diversi. A FisioEva lavorano insieme: la valutazione tiene conto di entrambe.',
      },
      {
        q: 'Quante sedute servono?',
        a: 'Dipende da cosa troviamo alla prima valutazione. Te lo diciamo dopo averti visto, non prima.',
      },
    ],
    metaTitle: 'Osteopatia a Casalotti, Roma | FisioEva',
    metaDescription:
      'Osteopatia a Roma zona Boccea-Casalotti. Valutazione completa e trattamento manuale per dolori ricorrenti, mal di schiena, cervicale. Prenota la prima valutazione.',
  },
  {
    slug: 'terapia-manuale',
    nome: 'Terapia manuale',
    categoria: 'tornare-a-muoverti',
    sottotitolo: 'Le mani come strumento: contratture, tensioni e blocchi articolari.',
    sintomi: [
      'contrattura',
      'muscolo bloccato',
      'collo rigido',
      'spalla bloccata',
      'dolore muscolare',
      'tensione',
    ],
    quandoServe: [
      'Contratture muscolari che non si sciolgono',
      'Rigidità articolare (spalla, anca, collo)',
      'Dolore muscolare da sovraccarico o postura',
      'Recupero della mobilità dopo un\'immobilizzazione',
      'A supporto di un percorso riabilitativo più ampio',
    ],
    comeLavoriamo:
      'Tecniche manuali mirate su muscoli, fasce e articolazioni per ridurre il dolore e restituire movimento. È il lavoro di base di quasi ogni percorso: raramente è l\'unica cosa che facciamo, quasi sempre è una delle cose che facciamo.',
    comeSiSvolge: [
      'Valutazione del movimento e palpazione',
      'Trattamento manuale della zona e delle strutture collegate',
      'Verifica del guadagno di mobilità a fine seduta',
      'Esercizi da fare a casa per mantenere il risultato',
    ],
    prescrizione: 'Non necessaria.',
    correlati: ['osteopatia', 'fisiokinesiterapia', 'taping-neuromuscolare'],
    metaTitle: 'Terapia manuale a Casalotti, Roma | FisioEva',
    metaDescription:
      'Terapia manuale a Roma zona Boccea. Contratture, rigidità articolare, recupero della mobilità. Valutazione e trattamento su misura. Prenota la prima valutazione.',
  },
  {
    slug: 'rieducazione-posturale-rpg',
    nome: 'Rieducazione posturale (metodo RPG Souchard)',
    categoria: 'tornare-a-muoverti',
    sottotitolo: 'Un metodo specialistico per rimettere in asse la colonna.',
    sintomi: [
      'postura',
      'scoliosi',
      'spalle curve',
      'iperlordosi',
      'cifosi',
      'mal di schiena cronico',
      'dolore da scrivania',
    ],
    quandoServe: [
      'Mal di schiena cronico che ritorna nonostante i trattamenti',
      'Atteggiamenti scoliotici e scoliosi',
      'Ipercifosi, iperlordosi, spalle chiuse',
      'Dolore legato a molte ore alla scrivania o in piedi',
      'Sportivi con squilibri posturali ricorrenti',
      'Bambini e adolescenti in crescita',
    ],
    comeLavoriamo:
      'La Rééducation Posturale Globale di Philippe Souchard è un metodo che lavora sulle catene muscolari: invece di trattare il singolo muscolo dolente, si lavora su tutta la catena a cui appartiene, attraverso posture mantenute e attive. Richiede la tua partecipazione: non è un trattamento passivo. Serve costanza, e i risultati si vedono nel medio periodo.',
    comeSiSvolge: [
      'Valutazione posturale completa (in piedi, seduto, in movimento)',
      'Individuazione delle catene muscolari coinvolte',
      'Posture attive mantenute, guidate dal terapista',
      'Lavoro sulla respirazione, che è parte del metodo',
      'Programma di mantenimento a casa',
    ],
    prescrizione: 'Non necessaria.',
    eseguitoDa: 'Professionista con Master in RPG Souchard.',
    correlati: ['ginnastica-posturale', 'terapia-manuale', 'osteopatia'],
    faq: [
      {
        q: 'In cosa è diverso dalla ginnastica posturale?',
        a: 'La ginnastica posturale è un lavoro di gruppo o individuale su esercizi generali. L\'RPG è un metodo specifico, individuale, costruito sulla tua valutazione.',
      },
      {
        q: 'Quanto dura un percorso?',
        a: 'È un lavoro di medio periodo. La durata si definisce dopo la valutazione.',
      },
    ],
    metaTitle: 'Rieducazione posturale RPG Souchard a Roma, Casalotti | FisioEva',
    metaDescription:
      'Rieducazione posturale globale metodo Souchard a Roma zona Boccea. Scoliosi, mal di schiena cronico, squilibri posturali. Prenota la prima valutazione.',
  },
  {
    slug: 'ginnastica-posturale',
    nome: 'Ginnastica posturale',
    categoria: 'tornare-a-muoverti',
    sottotitolo: 'Esercizi mirati per riprendere il controllo della postura.',
    sintomi: [
      'postura',
      'schiena curva',
      'dolore cervicale da ufficio',
      'rigidità',
      'prevenzione',
    ],
    quandoServe: [
      'Dolori ricorrenti legati alla posizione di lavoro',
      'Rigidità generale e perdita di mobilità',
      'Dopo un percorso riabilitativo, per mantenere il risultato',
      'Prevenzione, prima che il problema diventi dolore',
    ],
    comeLavoriamo:
      'Un programma di esercizi costruito sulla tua valutazione: mobilità, allungamento, respirazione, rinforzo delle zone che ne hanno bisogno. Al piano terra il lavoro è individuale.',
    prescrizione: 'Non necessaria.',
    correlati: ['rieducazione-posturale-rpg', 'fisiokinesiterapia'],
    nota: '⛔ Da confermare se esiste anche in versione di gruppo al piano superiore.',
    metaTitle: 'Ginnastica posturale a Casalotti, Roma | FisioEva',
    metaDescription:
      'Ginnastica posturale a Roma zona Boccea. Esercizi mirati per postura, rigidità e dolori da posizione di lavoro. Prenota la prima valutazione.',
  },
  {
    slug: 'fisiokinesiterapia',
    nome: 'Fisiokinesiterapia',
    categoria: 'tornare-a-muoverti',
    sottotitolo: 'Il lavoro sul movimento: recuperare forza, mobilità e controllo.',
    sintomi: [
      'perdita di forza',
      'articolazione rigida',
      'riabilitazione',
      'dopo il gesso',
      'mobilità ridotta',
    ],
    quandoServe: [
      'Recupero della mobilità dopo un\'immobilizzazione (gesso, tutore)',
      'Perdita di forza muscolare dopo un periodo di inattività',
      'Riabilitazione di un\'articolazione dopo trauma o intervento',
      'Patologie articolari croniche in cui il movimento va mantenuto',
    ],
    comeLavoriamo:
      'È il nucleo della fisioterapia: esercizio terapeutico costruito e progressivo, passivo all\'inizio se serve, poi attivo e contro resistenza. Il carico si aumenta secondo quello che il tessuto può sopportare, non secondo il calendario.',
    comeSiSvolge: [
      'Valutazione di articolarità, forza e dolore',
      'Definizione degli obiettivi e delle tappe',
      'Esercizio guidato in studio',
      'Programma domiciliare, aggiornato a ogni controllo',
    ],
    prescrizione:
      'Spesso presente se arrivi da un percorso ospedaliero, ma non è obbligatoria per la prima valutazione.',
    correlati: ['rieducazione-post-chirurgica', 'rieducazione-motoria', 'terapia-manuale'],
    metaTitle: 'Fisiokinesiterapia a Casalotti, Roma | FisioEva',
    metaDescription:
      'Fisiokinesiterapia a Roma zona Boccea. Recupero di forza, mobilità e controllo del movimento dopo traumi, interventi e immobilizzazioni. Prenota.',
  },
  {
    slug: 'rieducazione-motoria',
    nome: 'Rieducazione motoria e neuromotoria',
    categoria: 'tornare-a-muoverti',
    sottotitolo: 'Quando il movimento va reimparato, non solo recuperato.',
    sintomi: [
      'equilibrio',
      'coordinazione',
      'camminata',
      'esiti ictus',
      'parkinson',
      'neurologico',
      'cadute',
    ],
    quandoServe: [
      'Difficoltà di equilibrio e coordinazione',
      'Alterazioni del cammino',
      'Esiti di eventi neurologici',
      'Recupero del controllo motorio dopo un trauma importante',
      'Persone anziane a rischio di caduta',
    ],
    comeLavoriamo:
      'Il sistema nervoso e il movimento lavorano insieme. Quando il problema non è solo muscolare ma di controllo, l\'esercizio si costruisce sul recupero degli schemi motori: equilibrio, propriocezione, coordinazione, cammino. Si procede per obiettivi funzionali concreti — alzarsi da una sedia, salire uno scalino, camminare senza appoggio.',
    prescrizione: 'Consigliata la relazione dello specialista, se disponibile.',
    correlati: ['fisiokinesiterapia', 'ginnastica-posturale'],
    metaTitle: 'Rieducazione motoria e neuromotoria a Roma, Casalotti | FisioEva',
    metaDescription:
      'Rieducazione motoria e neuromotoria a Roma zona Boccea. Equilibrio, coordinazione, cammino, esiti neurologici, prevenzione delle cadute. Prenota.',
  },
  {
    slug: 'rieducazione-post-chirurgica',
    nome: 'Riabilitazione post-chirurgica',
    categoria: 'tornare-a-muoverti',
    sottotitolo: 'Il recupero dopo un intervento, guidato passo dopo passo.',
    sintomi: [
      'dopo operazione',
      'protesi anca',
      'protesi ginocchio',
      'crociato',
      'menisco',
      'cuffia dei rotatori',
      'frattura',
    ],
    quandoServe: [
      'Dopo protesi di anca o ginocchio',
      'Dopo ricostruzione del legamento crociato o intervento al menisco',
      'Dopo intervento alla spalla (cuffia dei rotatori, lussazione)',
      'Dopo riduzione di una frattura',
      'Dopo chirurgia della colonna',
    ],
    comeLavoriamo:
      'Il percorso segue i tempi biologici del tessuto e il protocollo del chirurgo. Si parte dal controllo del dolore e del gonfiore, si recupera l\'articolarità, poi la forza, infine il gesto quotidiano o sportivo. Ogni fase ha criteri di passaggio: si avanza quando il corpo è pronto, non quando è passata una settimana.',
    comeSiSvolge: [
      'Lettura della relazione operatoria e del protocollo',
      'Valutazione iniziale (dolore, gonfiore, articolarità, carico concesso)',
      'Fase 1 — protezione e recupero dell\'articolarità',
      'Fase 2 — recupero della forza',
      'Fase 3 — ritorno al gesto quotidiano o sportivo',
      'Terapie strumentali a supporto, dove indicate',
    ],
    prescrizione: 'Porta con te la relazione dell\'intervento e le indicazioni del chirurgo.',
    correlati: ['fisiokinesiterapia', 'tecarterapia', 'rieducazione-sportiva'],
    metaTitle: 'Riabilitazione post-chirurgica a Roma, Casalotti | FisioEva',
    metaDescription:
      'Riabilitazione post-operatoria a Roma zona Boccea. Protesi anca e ginocchio, crociato, spalla, fratture. Percorso per fasi secondo il protocollo. Prenota.',
  },
  {
    slug: 'rieducazione-sportiva',
    nome: 'Rieducazione sportiva',
    categoria: 'tornare-a-muoverti',
    sottotitolo: 'Tornare a giocare, non solo a camminare senza dolore.',
    sintomi: [
      'infortunio sportivo',
      'distorsione',
      'stiramento',
      'tendinite',
      'ritorno allo sport',
      'sovraccarico',
    ],
    quandoServe: [
      'Distorsioni, stiramenti, lesioni muscolari',
      'Tendinopatie da sovraccarico (achilleo, rotuleo, spalla, gomito)',
      'Ritorno all\'attività dopo un infortunio',
      'Infortuni che si ripetono sempre allo stesso modo',
    ],
    comeLavoriamo:
      'Il criterio non è "non fa più male": è che il gesto sportivo regga il carico. Il percorso arriva fino alla riproduzione del gesto specifico e alla gestione del carico settimanale, perché è lì che gli infortuni si ripresentano.',
    prescrizione: 'Non necessaria.',
    correlati: ['rieducazione-post-chirurgica', 'taping-neuromuscolare', 'tecarterapia'],
    metaTitle: 'Rieducazione sportiva a Casalotti, Roma | FisioEva',
    metaDescription:
      'Riabilitazione sportiva a Roma zona Boccea. Distorsioni, lesioni muscolari, tendinopatie e ritorno al gesto sportivo. Prenota la prima valutazione.',
  },
  {
    slug: 'taping-neuromuscolare',
    nome: 'Taping neuromuscolare',
    categoria: 'tornare-a-muoverti',
    sottotitolo: 'Il supporto elastico che accompagna il movimento senza limitarlo.',
    sintomi: ['taping', 'kinesio', 'gonfiore', 'supporto articolare', 'contrattura'],
    quandoServe: [
      'A supporto di un muscolo o di un\'articolazione durante il recupero',
      'Per gestire gonfiore ed ematomi',
      'Durante la ripresa dell\'attività sportiva',
      'In gravidanza, come sostegno lombare e addominale',
    ],
    comeLavoriamo:
      'Il cerotto elastico si applica seguendo la direzione delle fibre, con tensioni diverse a seconda dell\'effetto desiderato. Non immobilizza: accompagna. È sempre un complemento, mai il trattamento principale.',
    prescrizione: 'Non necessaria.',
    correlati: ['terapia-manuale', 'rieducazione-sportiva'],
    metaTitle: 'Taping neuromuscolare a Casalotti, Roma | FisioEva',
    metaDescription:
      'Taping neuromuscolare a Roma zona Boccea. Supporto elastico per muscoli e articolazioni, gonfiore, ripresa sportiva e gravidanza. Prenota.',
  },

  // ─────────────────────────── B · Salute della donna
  {
    slug: 'pavimento-pelvico',
    nome: 'Riabilitazione del pavimento pelvico',
    categoria: 'salute-della-donna',
    sottotitolo: 'Perdite, pesantezza, dolore: sono comuni, ma non sono normali.',
    sintomi: [
      'perdite urinarie',
      'incontinenza',
      'pesantezza',
      'prolasso',
      'dolore ai rapporti',
      'dopo il parto',
      'urgenza',
      'stitichezza',
    ],
    quandoServe: [
      'Perdite di urina sotto sforzo (tosse, starnuto, corsa, risata)',
      'Urgenza di andare in bagno o necessità di andarci molto spesso',
      'Senso di pesantezza o di "qualcosa che scende"',
      'Dolore durante i rapporti',
      'Dopo un parto, spontaneo o cesareo',
      'In menopausa, quando i tessuti cambiano',
      'Prima e dopo un intervento in area pelvica',
      'In preparazione al parto',
    ],
    comeLavoriamo:
      'Il pavimento pelvico è un gruppo muscolare come gli altri: si valuta e si allena. La prima seduta è dedicata alla valutazione — capire se il problema è di forza, di coordinazione o di eccesso di tensione, perché il lavoro cambia completamente. Poi si costruisce un percorso di esercizi mirati, con l\'aiuto del biofeedback dove serve. Tutto avviene in uno spazio riservato, con tempi tuoi.',
    comeSiSvolge: [
      'Colloquio riservato: sintomi, storia ostetrica, abitudini',
      'Valutazione della muscolatura e della sua coordinazione',
      'Definizione dell\'obiettivo insieme',
      'Percorso di esercizi guidati, eventualmente con biofeedback',
      'Programma a casa e controlli di verifica',
    ],
    prescrizione:
      'Non necessaria. Se hai già una visita uroginecologica o ginecologica, portala.',
    eseguitoDa: 'Professionista formata sulla riabilitazione pelvi-perineale.',
    correlati: ['post-parto', 'cicatrice-cesareo', 'linfodrenaggio'],
    faq: [
      {
        q: 'È imbarazzante?',
        a: 'È una valutazione sanitaria come le altre, fatta con rispetto e in uno spazio riservato. Ti viene spiegato ogni passaggio prima di farlo, e decidi tu i tempi.',
      },
      {
        q: 'Gli esercizi di Kegel non bastano?',
        a: 'A volte sì, spesso no: se il problema è un eccesso di tensione, contrarre ancora peggiora la situazione. Serve prima capire di cosa si tratta.',
      },
    ],
    metaTitle: 'Riabilitazione pavimento pelvico a Roma, Casalotti | FisioEva',
    metaDescription:
      'Riabilitazione del pavimento pelvico a Roma zona Boccea. Perdite, pesantezza, post-parto, menopausa. Valutazione e percorso personalizzato. Prenota.',
  },
  {
    slug: 'post-parto',
    nome: 'Recupero post-parto',
    categoria: 'salute-della-donna',
    sottotitolo: 'Rimettere insieme addome, schiena e pavimento pelvico, dopo.',
    sintomi: [
      'dopo il parto',
      'diastasi',
      'pancia che non torna',
      'mal di schiena post-parto',
      'allattamento',
      'cesareo',
      'perdite',
    ],
    quandoServe: [
      'Dopo il parto, spontaneo o cesareo, anche a distanza di anni',
      'Diastasi dei retti addominali (l\'addome che non si richiude)',
      'Mal di schiena o dolore al bacino comparso dopo la nascita',
      'Dolore cervicale e alle spalle da allattamento e da portare in braccio',
      'Perdite urinarie comparse dopo il parto',
      'Prima di riprendere l\'attività fisica',
    ],
    comeLavoriamo:
      'Il corpo dopo una gravidanza non torna com\'era da solo, e non c\'è una scadenza oltre la quale è tardi. Si valuta l\'insieme — addome, pavimento pelvico, respiro, postura — perché sono collegati e trattarne uno solo di solito non basta. Il percorso si costruisce sui tuoi tempi reali, quelli di una persona che ha un neonato.',
    comeSiSvolge: [
      'Valutazione di addome, diastasi, pavimento pelvico e postura',
      'Lavoro sul respiro e sul controllo profondo',
      'Recupero progressivo della forza addominale',
      'Trattamento manuale dove serve (schiena, cervicale, cicatrice)',
      'Ritorno graduale all\'attività fisica',
    ],
    prescrizione: 'Non necessaria.',
    correlati: ['pavimento-pelvico', 'cicatrice-cesareo', 'gravidanza', 'linfodrenaggio'],
    faq: [
      {
        q: 'Quanto devo aspettare dopo il parto?',
        a: 'Per la valutazione, di norma dopo il controllo post-partum. Ma non c\'è un limite oltre il quale è troppo tardi: si lavora bene anche a distanza di anni.',
      },
    ],
    metaTitle: 'Recupero post-parto a Roma, Casalotti | FisioEva',
    metaDescription:
      'Fisioterapia post-parto a Roma zona Boccea. Diastasi addominale, pavimento pelvico, mal di schiena dopo la nascita, ritorno all\'attività fisica. Prenota.',
    nota: '⛔ FAQ "Posso portare il bambino?" — da confermare con lo studio.',
  },
  {
    slug: 'gravidanza',
    nome: 'Fisioterapia in gravidanza',
    categoria: 'salute-della-donna',
    sottotitolo: 'Attraversare i nove mesi senza subirli.',
    sintomi: [
      'mal di schiena in gravidanza',
      'sciatica gravidanza',
      'gambe gonfie',
      'bacino',
      'pubalgia',
      'preparazione al parto',
    ],
    quandoServe: [
      'Mal di schiena e dolore lombare durante la gravidanza',
      'Dolore al bacino, pubalgia, sciatalgia',
      'Gambe gonfie e pesanti',
      'Cervicalgia e tensioni',
      'Preparazione del pavimento pelvico al parto',
    ],
    comeLavoriamo:
      'Il corpo cambia velocemente e i carichi si spostano. Si lavora con tecniche manuali adatte alla gravidanza, esercizi di mobilità e respirazione, e con la preparazione del pavimento pelvico. Ogni trattamento è calibrato sul trimestre.',
    prescrizione:
      'Non necessaria. Segnalaci sempre eventuali indicazioni del tuo ginecologo.',
    correlati: ['pavimento-pelvico', 'linfodrenaggio', 'post-parto'],
    metaTitle: 'Fisioterapia in gravidanza a Roma, Casalotti | FisioEva',
    metaDescription:
      'Fisioterapia in gravidanza a Roma zona Boccea. Mal di schiena, pubalgia, gambe gonfie, preparazione del pavimento pelvico al parto. Prenota.',
  },
  {
    slug: 'cicatrice-cesareo',
    nome: 'Trattamento della cicatrice da taglio cesareo',
    categoria: 'salute-della-donna',
    sottotitolo: 'Una cicatrice non è solo un segno: è un tessuto che tira.',
    sintomi: [
      'cicatrice cesareo',
      'aderenze',
      'pancia che tira',
      'insensibilità',
      'dolore cicatrice',
      'cicatrice dura',
    ],
    quandoServe: [
      'Cicatrice dura, aderente, che "tira" quando ti muovi',
      'Zona insensibile o al contrario ipersensibile',
      'Sensazione di gonfiore o pesantezza sopra la cicatrice',
      'Mal di schiena comparso dopo il cesareo',
      'Anche a distanza di anni: non c\'è una scadenza',
    ],
    comeLavoriamo:
      'Un lavoro manuale delicato sul tessuto cicatriziale e sulle aderenze sottostanti, per restituire scorrimento tra i piani e ridurre le tensioni che si scaricano su schiena e bacino. Si comincia sempre con delicatezza, e si va avanti solo quando il tessuto lo permette.',
    prescrizione: 'Non necessaria. Si interviene a cicatrice completamente chiusa e guarita.',
    correlati: ['post-parto', 'pavimento-pelvico', 'terapia-manuale'],
    metaTitle: 'Trattamento cicatrice da cesareo a Roma, Casalotti | FisioEva',
    metaDescription:
      'Trattamento della cicatrice da taglio cesareo a Roma zona Boccea. Aderenze, tessuto che tira, alterazioni della sensibilità. Anche a distanza di anni.',
  },
  {
    slug: 'linfodrenaggio',
    nome: 'Linfodrenaggio',
    categoria: 'salute-della-donna',
    sottotitolo: 'Manovre lente e leggere per ridurre gonfiori e ristagni.',
    sintomi: [
      'gambe gonfie',
      'linfedema',
      'ritenzione',
      'gonfiore dopo intervento',
      'gravidanza',
      'pesantezza alle gambe',
    ],
    quandoServe: [
      'Gambe pesanti e gonfie, anche in gravidanza',
      'Gonfiore dopo un intervento chirurgico o un trauma',
      'Linfedema',
      'Ristagni e senso di pesantezza agli arti',
    ],
    comeLavoriamo:
      'Manovre manuali molto lente e a bassa pressione che seguono le vie del sistema linfatico. Non è un massaggio: la pressione è leggera per definizione, e la lentezza è parte della tecnica.',
    prescrizione: 'In caso di linfedema conclamato porta la documentazione medica.',
    correlati: ['gravidanza', 'post-parto', 'rieducazione-post-chirurgica'],
    metaTitle: 'Linfodrenaggio a Casalotti, Roma | FisioEva',
    metaDescription:
      'Linfodrenaggio manuale a Roma zona Boccea. Gambe gonfie, linfedema, ristagni e gonfiore post-operatorio. Prenota la prima valutazione.',
  },

  // ─────────────────────────── C · Per il tuo bambino
  {
    slug: 'osteopatia-neonatale',
    nome: 'Osteopatia neonatale e pediatrica',
    categoria: 'bambino',
    sottotitolo: 'Un inizio più sereno, con mani che sanno essere leggere.',
    sintomi: [
      'coliche',
      'neonato non dorme',
      'difficoltà di suzione',
      'plagiocefalia',
      'testa piatta',
      'torcicollo',
      'rigurgito',
      'pianto inconsolabile',
      'reflusso',
    ],
    quandoServe: [
      'Coliche e pianto inconsolabile',
      'Sonno molto disturbato',
      'Difficoltà nell\'attaccarsi al seno o nel succhiare',
      'Preferenza a girare la testa sempre dallo stesso lato (torcicollo miogeno)',
      'Plagiocefalia — testa appiattita da un lato',
      'Rigurgiti frequenti',
      'Dopo un parto lungo, un parto con ventosa, un cesareo, un podalico',
      'Nei bambini più grandi: postura, esiti di traumi, disturbi ricorrenti',
    ],
    comeLavoriamo:
      'Il passaggio attraverso il canale del parto è il primo grande stress meccanico della vita. Il trattamento osteopatico neonatale usa tecniche molto dolci, a pressione minima, spesso mentre il bambino dorme o è in braccio a te. La valutazione parte dalla storia della gravidanza e del parto, perché lì c\'è quasi sempre l\'informazione che serve.',
    comeSiSvolge: [
      'Colloquio con i genitori: gravidanza, parto, primi giorni, ritmo sonno-poppate',
      'Osservazione del bambino: postura spontanea, movimenti, simmetrie',
      'Valutazione manuale delicatissima',
      'Trattamento — spesso il bambino dorme',
      'Consigli pratici su posizioni, allattamento e cambio',
    ],
    prescrizione:
      'Non necessaria. Il trattamento osteopatico non sostituisce il pediatra: se ci sono segnali che richiedono una valutazione medica, te lo diciamo.',
    eseguitoDa: 'Osteopata con formazione in ambito neonatale e pediatrico.',
    correlati: ['post-parto', 'osteopatia'],
    faq: [
      {
        q: 'Non è troppo piccolo?',
        a: 'Si può trattare fin dai primi giorni di vita. Le tecniche usate sui neonati sono a pressione minima.',
      },
      { q: 'Il bambino piange?', a: 'Spesso dorme per buona parte della seduta. Se piange, ci si ferma.' },
      {
        q: 'Quante sedute?',
        a: 'Nei neonati i cicli sono in genere brevi. Dopo la prima valutazione sai cosa aspettarti.',
      },
    ],
    metaTitle: 'Osteopatia neonatale e pediatrica a Roma, Casalotti | FisioEva',
    metaDescription:
      'Osteopatia neonatale a Roma zona Boccea. Coliche, sonno, suzione, plagiocefalia, torcicollo. Tecniche dolci, valutazione su gravidanza e parto. Prenota.',
  },

  // ─────────────────────────── D · Terapie fisiche strumentali
  {
    slug: 'tecarterapia',
    nome: 'Tecarterapia',
    categoria: 'terapie-strumentali',
    sottotitolo: 'Calore profondo per accelerare il recupero dei tessuti.',
    sintomi: [
      'tecar',
      'dolore muscolare',
      'contrattura profonda',
      'tendinite',
      'distorsione',
      'edema',
      'recupero rapido',
    ],
    quandoServe: [
      'Contratture e lesioni muscolari',
      'Tendinopatie',
      'Esiti di distorsioni e traumi',
      'Gonfiore e rigidità dopo un intervento',
      'Dolore articolare cronico',
    ],
    comeLavoriamo:
      'Genera calore all\'interno del tessuto stimolandone l\'attività. Si usa quasi sempre prima o durante il lavoro manuale, per rendere il tessuto più trattabile.',
    prescrizione: 'Non necessaria.',
    correlati: ['terapia-manuale', 'rieducazione-sportiva'],
    metaTitle: 'Tecarterapia a Casalotti, Roma | FisioEva',
    metaDescription:
      'Tecarterapia a Roma zona Boccea. Contratture, tendinopatie, esiti di distorsioni e traumi, a supporto del lavoro manuale. Prenota.',
  },
  {
    slug: 'laser-alta-potenza',
    nome: 'Laser ad alta potenza',
    categoria: 'terapie-strumentali',
    sottotitolo: 'Energia luminosa concentrata su infiammazione e dolore.',
    sintomi: [
      'laser',
      'tendinite',
      'infiammazione',
      'dolore localizzato',
      'borsite',
      'epicondilite',
    ],
    quandoServe: [
      'Tendinopatie e borsiti',
      'Infiammazioni localizzate',
      'Dolore articolare',
      'Edemi post-traumatici',
    ],
    comeLavoriamo:
      'La seduta è breve e mirata sulla zona interessata. Numero e frequenza si definiscono dopo la valutazione.',
    prescrizione: 'Non necessaria.',
    correlati: ['tecarterapia', 'ultrasuonoterapia'],
    metaTitle: 'Laser ad alta potenza a Casalotti, Roma | FisioEva',
    metaDescription:
      'Laserterapia ad alta potenza a Roma zona Boccea. Tendinopatie, borsiti, infiammazioni localizzate ed edemi post-traumatici. Prenota.',
  },
  {
    slug: 'ultrasuonoterapia',
    nome: 'Ultrasuonoterapia',
    categoria: 'terapie-strumentali',
    sottotitolo: 'Onde sonore che lavorano in profondità sui tessuti molli.',
    sintomi: ['ultrasuoni', 'tendine', 'calcificazione', 'cicatrice', 'aderenze', 'infiammazione'],
    quandoServe: [
      'Tendinopatie',
      'Esiti cicatriziali e aderenze',
      'Infiammazioni dei tessuti molli',
      'Contratture profonde',
    ],
    comeLavoriamo:
      'Le onde sonore agiscono in profondità sui tessuti molli. Entra nel percorso a supporto del lavoro manuale, dove la valutazione lo indica.',
    prescrizione: 'Non necessaria.',
    correlati: ['ionoforesi', 'terapia-manuale'],
    metaTitle: 'Ultrasuonoterapia a Casalotti, Roma | FisioEva',
    metaDescription:
      'Ultrasuonoterapia a Roma zona Boccea. Tendinopatie, aderenze cicatriziali, infiammazioni dei tessuti molli e contratture profonde. Prenota.',
  },
  {
    slug: 'magnetoterapia',
    nome: 'Magnetoterapia',
    categoria: 'terapie-strumentali',
    sottotitolo: 'Campi magnetici a supporto dei processi di riparazione ossea.',
    sintomi: ['magnetoterapia', 'frattura', 'consolidamento', 'osteoporosi', 'dolore osseo'],
    quandoServe: [
      'Esiti di fratture',
      'Ritardi di consolidamento',
      'Patologie osteoarticolari croniche',
    ],
    comeLavoriamo:
      'I cicli sono in genere lunghi e a sedute ravvicinate. Il piano si definisce dopo la valutazione.',
    prescrizione: 'Non necessaria.',
    correlati: ['rieducazione-post-chirurgica'],
    nota: '⛔ Da confermare se è previsto il noleggio domiciliare.',
    metaTitle: 'Magnetoterapia a Casalotti, Roma | FisioEva',
    metaDescription:
      'Magnetoterapia a Roma zona Boccea. Esiti di fratture, ritardi di consolidamento e patologie osteoarticolari croniche. Prenota.',
  },
  {
    slug: 'tens',
    nome: 'TENS (elettroanalgesia)',
    categoria: 'terapie-strumentali',
    sottotitolo: 'Stimolazione elettrica a bassa intensità per il controllo del dolore.',
    sintomi: ['tens', 'dolore cronico', 'nevralgia', 'elettrostimolazione antidolorifica'],
    quandoServe: [
      'Dolore cronico localizzato',
      'Nevralgie',
      'Quando il dolore impedisce di iniziare il lavoro attivo',
    ],
    comeLavoriamo:
      'Non tratta la causa: abbassa la percezione del dolore quanto basta per poter lavorare. Serve a questo.',
    prescrizione: 'Non necessaria.',
    correlati: ['ionoforesi', 'fisiokinesiterapia'],
    metaTitle: 'TENS ed elettroanalgesia a Casalotti, Roma | FisioEva',
    metaDescription:
      'TENS a Roma zona Boccea. Controllo del dolore cronico localizzato e delle nevralgie, per poter iniziare il lavoro attivo. Prenota.',
  },
  {
    slug: 'ionoforesi',
    nome: 'Ionoforesi',
    categoria: 'terapie-strumentali',
    sottotitolo: 'Il farmaco portato attraverso la pelle, dove serve.',
    sintomi: ['ionoforesi', 'infiammazione localizzata', 'tendinite', 'artrosi'],
    quandoServe: ['Infiammazioni localizzate', 'Tendinopatie', 'Dolori articolari'],
    comeLavoriamo:
      'Una corrente continua veicola il farmaco attraverso la pelle sulla zona da trattare.',
    prescrizione: 'Necessaria: il trattamento richiede il farmaco.',
    correlati: ['ultrasuonoterapia', 'tens'],
    metaTitle: 'Ionoforesi a Casalotti, Roma | FisioEva',
    metaDescription:
      'Ionoforesi a Roma zona Boccea. Infiammazioni localizzate, tendinopatie e dolori articolari. Richiede prescrizione medica. Prenota.',
  },
  {
    slug: 'elettrostimolazione',
    nome: 'Elettrostimolazione',
    categoria: 'terapie-strumentali',
    sottotitolo: 'Riattivare un muscolo che ha smesso di rispondere.',
    sintomi: [
      'elettrostimolazione',
      'ipotrofia',
      'muscolo che non risponde',
      'dopo il gesso',
      'atrofia',
    ],
    quandoServe: [
      'Ipotrofia dopo immobilizzazione o intervento',
      'Deficit di attivazione muscolare',
      'A supporto del rinforzo nelle prime fasi',
    ],
    comeLavoriamo:
      'È un ponte verso l\'esercizio attivo, non un sostituto. Appena il muscolo risponde, si passa al lavoro volontario.',
    prescrizione: 'Non necessaria.',
    correlati: ['fisiokinesiterapia', 'rieducazione-post-chirurgica'],
    metaTitle: 'Elettrostimolazione a Casalotti, Roma | FisioEva',
    metaDescription:
      'Elettrostimolazione a Roma zona Boccea. Ipotrofia dopo immobilizzazione o intervento e deficit di attivazione muscolare. Prenota.',
  },
];

/** Chip della ricerca per sintomo in /servizi, nell'ordine in cui vanno mostrati. */
export const sintomiInEvidenza = [
  'Mal di schiena',
  'Cervicale',
  'Sciatica',
  'Dolore alla spalla',
  'Ginocchio',
  'Dopo un intervento',
  'Infortunio sportivo',
  'Postura',
  'Scoliosi',
  'Gambe gonfie',
  'Dopo il parto',
  'Perdite urinarie',
  'Cicatrice cesareo',
  'Gravidanza',
  'Neonato che non dorme',
  'Coliche',
  'Testa piatta',
  'Torcicollo del neonato',
];

export const getServizio = (slug: string) => servizi.find((s) => s.slug === slug);

export const getCategoria = (slug: string) => categorie.find((c) => c.slug === slug);

export const serviziDiCategoria = (slug: CategoriaSlug) =>
  servizi.filter((s) => s.categoria === slug);

export const percorsoServizio = (servizio: Servizio) =>
  `/servizi/${servizio.categoria}/${servizio.slug}`;

export const percorsoCategoria = (slug: CategoriaSlug) => `/servizi/${slug}`;

/** Risolve gli slug dei correlati, scartando quelli che non esistono più. */
export const correlatiDi = (servizio: Servizio) =>
  servizio.correlati.map(getServizio).filter((s): s is Servizio => Boolean(s));
