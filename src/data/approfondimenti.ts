/**
 * Le schede di approfondimento dei trattamenti: una pagina per trattamento,
 * all'indirizzo `/servizi/<slug>`.
 *
 * Servono soprattutto a chi cerca: "osteopata Casalotti", "pavimento pelvico
 * Boccea", "tecarterapia Roma nord-ovest". La pagina servizi elenca tutto in
 * card brevi; queste dicono per esteso cos'è il trattamento, quando ce lo
 * chiedono, come lavoriamo e chi se ne occupa. Dalla pagina servizi ci si
 * arriva con un link discreto sotto ogni card: non sono nel menu.
 *
 * Regole, le stesse del resto del sito:
 *   - mai promesse di guarigione: "può aiutare", "si lavora su";
 *   - le fisioterapiste non sono medici, e non fanno diagnosi mediche;
 *   - "Chi se ne occupa" cita solo ciò che sta scritto nel curriculum di
 *     ciascuna (src/data/site.ts → team): niente competenze attribuite a
 *     occhio. Dove il curriculum non dice nulla, la lista resta vuota e la
 *     pagina nomina le tre titolari in generale.
 *
 * Le terapie di gruppo non hanno una scheda qui: sono i corsi di StudioEVA
 * e stanno su /studioeva.
 */
import { categorie, team, trattamenti, type Trattamento } from './site.ts';

export type Approfondimento = {
  /** <title>: il nome del trattamento e il quartiere vengono per primi. */
  titoloSeo: string;
  /** Meta description, entro 160 caratteri. */
  descrizioneSeo: string;
  /** Cos'è, in due o tre frasi. */
  intro: string;
  /** Le situazioni per cui ce lo chiedono, in lingua del paziente. */
  quando: string[];
  /** Come lavoriamo in studio con questo trattamento. */
  come: string;
  /** Le titolari con una formazione specifica, e la riga del curriculum che lo dice. */
  esperte: { slug: string; perche: string }[];
  faq: { domanda: string; risposta: string }[];
  /** Altre schede vicine (slug di pagina). */
  correlati: string[];
};

const VALUTAZIONE =
  "Il primo incontro è un colloquio di una ventina di minuti: raccogliamo la tua storia, guardiamo come ti muovi e capiamo se questo trattamento è quello giusto per te, o se serve altro. Le sedute durano tra i 45 e i 50 minuti.";

const STRUMENTALE =
  "Le terapie strumentali da noi non sono mai una seduta a sé: entrano nel percorso quando servono, accanto al lavoro manuale e all'esercizio, per il tempo che serve. Prima di usarle verifichiamo che non ci siano controindicazioni, per esempio un pacemaker, una gravidanza o alcune condizioni della pelle o dei tessuti: per questo la valutazione viene sempre prima.";

export const approfondimenti: Record<string, Approfondimento> = {
  // — Per tornare a muoverti
  osteopatia: {
    titoloSeo: 'Osteopata a Casalotti e Boccea, Roma — Osteopatia | FisioEVA',
    descrizioneSeo:
      "Osteopatia a Roma Casalotti, in Via di Boccea 755: mal di schiena, cervicale, cefalea, sciatica. Osteopate D.O. e fisioterapiste iscritte all'albo.",
    intro:
      "L'osteopatia è un approccio manuale che guarda il corpo nel suo insieme: il punto in cui senti dolore non è sempre il punto da cui il problema parte. Con le mani l'osteopata valuta la mobilità di articolazioni, muscoli, fasce e visceri, e lavora dove trova una restrizione.",
    quando: [
      'Mal di schiena e lombalgia, anche ricorrenti',
      'Dolore cervicale e collo rigido',
      'Cefalea di origine muscolo-tensiva',
      'Sciatica e dolore che scende lungo la gamba',
      'Tensioni dopo un periodo di stress o di postura scorretta',
    ],
    come:
      "Nel nostro studio l'osteopatia si affianca alla fisioterapia: le osteopate sono anche fisioterapiste, e se il problema chiede esercizio o rieducazione il percorso lo comprende. Lavoriamo con tecniche dolci e strutturali, scelte in base a quello che troviamo e a quello che tolleri.",
    esperte: [
      {
        slug: 'azzurra-de-angelis',
        perche: "Osteopata D.O., diplomata alla scuola EDUCAM con 110/110 e lode.",
      },
      {
        slug: 'veronica-mirarchi',
        perche: 'Osteopata D.O., diplomata al CERDO nel 2020.',
      },
    ],
    faq: [
      {
        domanda: "Che differenza c'è tra osteopata e fisioterapista?",
        risposta:
          "Il fisioterapista è un professionista sanitario iscritto all'albo, che lavora su movimento, recupero e riabilitazione. L'osteopata lavora con un approccio manuale globale. Nel nostro studio le osteopate sono anche fisioterapiste, quindi possono integrare le due cose nello stesso percorso.",
      },
      {
        domanda: "Quante sedute di osteopatia servono?",
        risposta:
          "Dipende dal problema e da come risponde il tuo corpo. Dopo la prima valutazione ti diamo un'indicazione realistica e la rivediamo insieme strada facendo.",
      },
    ],
    correlati: ['terapia-manuale', 'manipolazione-viscerale', 'terapia-cranio-sacrale'],
  },

  'terapia-manuale': {
    titoloSeo: 'Terapia manuale a Casalotti, Roma — contratture e blocchi | FisioEVA',
    descrizioneSeo:
      'Terapia manuale a Roma Casalotti, Via di Boccea 755: contratture, collo rigido, spalla bloccata, dolore muscolare. Fisioterapiste iscritte all\'albo.',
    intro:
      "La terapia manuale usa le mani come strumento principale: mobilizzazioni delle articolazioni, lavoro sui muscoli e sui tessuti molli, tecniche per ridurre il dolore e restituire movimento dove si è perso.",
    quando: [
      'Contratture e tensioni muscolari',
      'Collo rigido o spalla che non si alza',
      'Articolazioni bloccate dopo un periodo di immobilità',
      'Dolore muscolare che torna sempre nello stesso punto',
    ],
    come:
      "Ogni seduta parte da cosa troviamo quel giorno: il trattamento manuale è quasi sempre accompagnato da qualche esercizio da fare a casa, perché il risultato regga anche tra una seduta e l'altra.",
    esperte: [
      {
        slug: 'elisa-de-rubeis',
        perche: 'Ha seguito il corso annuale in terapia manuale secondo il concetto Maitland.',
      },
    ],
    faq: [
      {
        domanda: 'La terapia manuale fa male?',
        risposta:
          "Alcune manovre possono dare un fastidio momentaneo, ma il trattamento non deve mai essere doloroso: lavoriamo sempre entro la tua soglia di tolleranza.",
      },
    ],
    correlati: ['osteopatia', 'fisiokinesiterapia', 'taping-neuromuscolare'],
  },

  'terapia-cranio-sacrale': {
    titoloSeo: 'Terapia cranio-sacrale a Casalotti, Roma | FisioEVA',
    descrizioneSeo:
      'Terapia cranio-sacrale a Roma Casalotti, Via di Boccea 755: un contatto leggero su cranio, colonna e sacro per tensioni, cefalea e bruxismo.',
    intro:
      "La terapia cranio-sacrale è un trattamento manuale molto leggero: le mani appoggiano su cranio, colonna e sacro e lavorano sulle tensioni dei tessuti e delle membrane che li collegano. È una delle tecniche più delicate che usiamo.",
    quando: [
      'Mal di testa e cefalea tensiva',
      'Bruxismo e tensione alla mandibola',
      'Tensione diffusa nei periodi di stress',
      "Rigidità del collo che parte dalla base del cranio",
    ],
    come:
      "Si lavora sdraiati sul lettino, in un ambiente tranquillo. Spesso la terapia cranio-sacrale si inserisce in un percorso più ampio di terapia manuale o osteopatia, non come seduta isolata.",
    esperte: [
      {
        slug: 'elisa-de-rubeis',
        perche: 'Ha seguito il primo livello di cranio-sacrale secondo il metodo Upledger.',
      },
    ],
    faq: [
      {
        domanda: 'Cosa si sente durante il trattamento?',
        risposta:
          "La pressione è leggerissima. Molte persone descrivono una sensazione di calore o di rilassamento profondo; non è un trattamento doloroso.",
      },
    ],
    correlati: ['osteopatia', 'terapia-manuale', 'manipolazione-viscerale'],
  },

  'ginnastica-posturale': {
    titoloSeo: 'Ginnastica posturale individuale a Casalotti, Roma — Mézières-Souchard | FisioEVA',
    descrizioneSeo:
      'Ginnastica posturale individuale metodo Mézières-Souchard a Roma Casalotti, Via di Boccea 755: scoliosi, iperlordosi, mal di schiena cronico.',
    intro:
      "La ginnastica posturale individuale secondo il metodo Mézières-Souchard è una rieducazione globale: invece di lavorare su un muscolo alla volta, si lavora sulle catene muscolari che tengono insieme la postura, con l'obiettivo di riportare la colonna verso le sue curve fisiologiche.",
    quando: [
      'Scoliosi e atteggiamenti scoliotici',
      'Schiena curva, iperlordosi, spalle chiuse',
      'Mal di schiena cronico che torna nonostante le terapie',
      "Dolore cervicale da ufficio e da postura prolungata",
    ],
    come:
      "È una seduta uno a uno, non un corso: la terapista ti guida in posture mantenute a terra o in piedi, lavorando sul respiro e sull'allungamento delle catene muscolari. Per chi preferisce il gruppo esiste la posturale di gruppo di StudioEVA, al piano superiore.",
    esperte: [
      {
        slug: 'azzurra-de-angelis',
        perche:
          'Master di I livello in Rieducazione Posturale Globale di P. Souchard e formazione superiore in RPG per le patologie cranio-cervicali.',
      },
      {
        slug: 'elisa-de-rubeis',
        perche: 'Master in Rieducazione Posturale Globale secondo il metodo Souchard.',
      },
    ],
    faq: [
      {
        domanda: 'Che differenza c\'è con la posturale di gruppo?',
        risposta:
          "La ginnastica posturale individuale è un trattamento: si parte da una valutazione e il lavoro è costruito su di te. La posturale di gruppo di StudioEVA è un'attività di movimento in piccolo gruppo, utile per mantenere i risultati nel tempo.",
      },
    ],
    correlati: ['fisiokinesiterapia', 'osteopatia', 'terapia-manuale'],
  },

  'manipolazione-viscerale': {
    titoloSeo: 'Manipolazione viscerale a Casalotti, Roma | FisioEVA',
    descrizioneSeo:
      'Manipolazione viscerale a Roma Casalotti, Via di Boccea 755: lavoro manuale su organi e tessuti di sostegno, aderenze, cicatrici, mal di schiena.',
    intro:
      "La manipolazione viscerale è un lavoro manuale sugli organi dell'addome e sui tessuti che li sostengono. Quando questi tessuti perdono mobilità, per esempio dopo un intervento o un'infiammazione, possono tirare e limitare il movimento anche lontano dal punto di partenza.",
    quando: [
      'Pancia che tira, sensazione di tensione addominale',
      'Aderenze e cicatrici addominali',
      "Mal di schiena che non risponde al solo lavoro sulla colonna",
      'Disturbi digestivi funzionali, accanto al percorso con il medico',
    ],
    come:
      "Il trattamento si fa sdraiati, con un contatto progressivo sull'addome. Non sostituisce le indagini del medico: se un disturbo digestivo non è mai stato valutato, prima ti chiediamo di parlarne con lui.",
    esperte: [
      {
        slug: 'elisa-de-rubeis',
        perche: 'Ha seguito due livelli di manipolazione fasciale viscerale secondo il metodo Upledger.',
      },
      {
        slug: 'veronica-mirarchi',
        perche:
          'Osteopata D.O., con una tesi sul trattamento osteopatico delle disfunzioni gastrointestinali.',
      },
    ],
    faq: [
      {
        domanda: 'La manipolazione viscerale è dolorosa?',
        risposta:
          "No. Il contatto è progressivo e si adatta a quanto la zona è sensibile; se qualcosa dà fastidio, lo dici e ci fermiamo.",
      },
    ],
    correlati: ['osteopatia', 'cicatrice-cesareo', 'terapia-cranio-sacrale'],
  },

  fisiokinesiterapia: {
    titoloSeo: 'Fisiokinesiterapia a Casalotti e Boccea, Roma | FisioEVA',
    descrizioneSeo:
      'Fisiokinesiterapia a Roma Casalotti, Via di Boccea 755: esercizio terapeutico per recuperare forza, mobilità e controllo dopo un infortunio o un periodo di stop.',
    intro:
      "La fisiokinesiterapia è il lavoro sul movimento: esercizi terapeutici scelti e dosati dalla fisioterapista per recuperare forza, mobilità articolare e controllo. È il cuore di quasi ogni percorso di riabilitazione.",
    quando: [
      'Perdita di forza dopo un infortunio o un periodo di immobilità',
      'Articolazione rigida dopo il gesso o un tutore',
      'Mobilità ridotta di spalla, anca o ginocchio',
      "Ritorno graduale all'attività dopo un periodo di stop",
    ],
    come:
      "Gli esercizi si fanno in studio, guidati, e cambiano man mano che migliori. Ti lasciamo sempre un programma semplice da fare a casa: il recupero si costruisce anche lì.",
    esperte: [],
    faq: [
      {
        domanda: 'Devo portare qualcosa?',
        risposta:
          "Un abbigliamento comodo che ti permetta di muoverti liberamente, ed eventuali referti o esami recenti.",
      },
    ],
    correlati: ['rieducazione-post-chirurgica', 'rieducazione-sportiva', 'rieducazione-motoria'],
  },

  'rieducazione-motoria': {
    titoloSeo: 'Rieducazione motoria e neuromotoria a Casalotti, Roma | FisioEVA',
    descrizioneSeo:
      'Rieducazione motoria e neuromotoria a Roma Casalotti, Via di Boccea 755: equilibrio, coordinazione, camminata, prevenzione delle cadute.',
    intro:
      "La rieducazione motoria e neuromotoria serve quando un movimento va reimparato, non solo recuperato: dopo un problema neurologico, un lungo periodo di immobilità o quando equilibrio e coordinazione non sono più quelli di prima.",
    quando: [
      'Equilibrio instabile e paura di cadere',
      'Difficoltà nella camminata',
      'Coordinazione ridotta dopo un evento neurologico',
      'Recupero dell\'autonomia nei gesti quotidiani',
    ],
    come:
      "Si lavora con esercizi di equilibrio, propriocezione e controllo del movimento, per esempio su tavolette e superfici instabili, partendo da come ti muovi oggi e aumentando la difficoltà passo dopo passo.",
    esperte: [
      {
        slug: 'azzurra-de-angelis',
        perche: 'Si è laureata in Fisioterapia con una tesi in riabilitazione neurologica.',
      },
    ],
    faq: [
      {
        domanda: 'Seguite anche persone anziane?',
        risposta:
          "Sì. Mantenere forza ed equilibrio è una delle cose più utili per restare autonomi a lungo, e i ritmi del lavoro si adattano alla persona.",
      },
    ],
    correlati: ['fisiokinesiterapia', 'rieducazione-post-chirurgica', 'ginnastica-posturale'],
  },

  'rieducazione-post-chirurgica': {
    titoloSeo: 'Riabilitazione post-chirurgica a Casalotti, Roma — protesi, crociato | FisioEVA',
    descrizioneSeo:
      'Riabilitazione dopo un intervento a Roma Casalotti, Via di Boccea 755: protesi di anca e ginocchio, crociato, fratture. Un percorso guidato passo dopo passo.',
    intro:
      "Dopo un intervento il recupero ha i suoi tempi, e conviene rispettarli: né troppo presto né troppo tardi. La riabilitazione post-chirurgica accompagna questo passaggio, dal primo movimento fino al ritorno alle attività di tutti i giorni.",
    quando: [
      'Dopo una protesi d\'anca o di ginocchio',
      'Dopo la ricostruzione del legamento crociato',
      'Dopo una frattura, alla rimozione del gesso',
      'Dopo un intervento alla spalla',
    ],
    come:
      "Partiamo dalle indicazioni del chirurgo e dal tuo referto. Il programma combina terapia manuale, esercizio e, quando servono, terapie strumentali per il gonfiore e il dolore; cresce seduta dopo seduta.",
    esperte: [],
    faq: [
      {
        domanda: 'Quando posso iniziare la riabilitazione dopo l\'intervento?',
        risposta:
          "Dipende dal tipo di intervento e dalle indicazioni del chirurgo. Portaci la lettera di dimissione: partiamo da lì.",
      },
    ],
    correlati: ['fisiokinesiterapia', 'linfodrenaggio', 'tecarterapia'],
  },

  'rieducazione-sportiva': {
    titoloSeo: 'Fisioterapia sportiva a Casalotti, Roma — infortuni e ritorno allo sport | FisioEVA',
    descrizioneSeo:
      'Rieducazione sportiva a Roma Casalotti, Via di Boccea 755: distorsioni, stiramenti, tendiniti, sovraccarico. Per tornare al tuo sport, non solo a camminare.',
    intro:
      "La rieducazione sportiva ha un obiettivo preciso: tornare a praticare il tuo sport, con un gesto efficiente e il minor rischio possibile di ricadute. Non basta che il dolore sia passato.",
    quando: [
      'Distorsione di caviglia o ginocchio',
      'Stiramenti e lesioni muscolari',
      'Tendiniti e dolore da sovraccarico',
      'Ritorno allo sport dopo un intervento',
    ],
    come:
      "Il percorso va dal recupero del movimento al rinforzo, fino agli esercizi specifici del tuo sport. Usiamo terapia manuale, esercizio e, quando servono, terapie strumentali come tecar e laser.",
    esperte: [
      {
        slug: 'veronica-mirarchi',
        perche:
          'Durante la formazione universitaria ha lavorato al CONI con atleti di livello internazionale, e ha un passato da sportiva.',
      },
    ],
    faq: [
      {
        domanda: 'Seguite anche sportivi amatoriali?',
        risposta: "Sì: il percorso si adatta al livello e agli obiettivi di chi abbiamo davanti.",
      },
    ],
    correlati: ['fisiokinesiterapia', 'tecarterapia', 'laser-alta-potenza'],
  },

  'taping-neuromuscolare': {
    titoloSeo: 'Taping neuromuscolare (kinesio) a Casalotti, Roma | FisioEVA',
    descrizioneSeo:
      'Taping neuromuscolare a Roma Casalotti, Via di Boccea 755: il nastro elastico che accompagna il movimento, per supporto articolare e gonfiore.',
    intro:
      "Il taping neuromuscolare usa un nastro elastico applicato sulla pelle con tensioni e direzioni precise. Accompagna il movimento senza bloccarlo, e si usa come supporto tra una seduta e l'altra.",
    quando: [
      'Supporto a un\'articolazione dopo una distorsione',
      'Contratture e tensioni muscolari',
      'Gonfiore dopo un trauma o un intervento',
      'Sostegno durante il ritorno all\'attività sportiva',
    ],
    come:
      "Il taping non è quasi mai un trattamento a sé: lo applichiamo alla fine della seduta, quando serve a prolungarne l'effetto. Ti spieghiamo quanto tenerlo e come toglierlo.",
    esperte: [
      {
        slug: 'azzurra-de-angelis',
        perche: 'Ha frequentato il corso di Taping Neuromuscolare.',
      },
    ],
    faq: [
      {
        domanda: 'Posso fare la doccia con il taping?',
        risposta:
          "Sì, il nastro resiste all'acqua. Basta asciugarlo tamponando, senza strofinare.",
      },
    ],
    correlati: ['terapia-manuale', 'rieducazione-sportiva', 'linfodrenaggio'],
  },

  linfodrenaggio: {
    titoloSeo: 'Linfodrenaggio manuale a Casalotti, Roma — gambe gonfie, edema | FisioEVA',
    descrizioneSeo:
      'Linfodrenaggio manuale a Roma Casalotti, Via di Boccea 755: gonfiore dopo un intervento, linfedema, gambe gonfie e pesanti, ritenzione.',
    intro:
      "Il linfodrenaggio manuale è una tecnica fatta di manovre lente, leggere e ritmiche, che seguono il percorso della linfa per favorire il riassorbimento dei liquidi in eccesso.",
    quando: [
      'Gonfiore dopo un intervento chirurgico',
      'Edema e linfedema',
      'Gambe gonfie e pesanti, anche in gravidanza',
      'Ristagno di liquidi e ritenzione',
    ],
    come:
      "La seduta si fa sdraiati, in un ambiente tranquillo. In caso di linfedema il linfodrenaggio si inserisce in un percorso più ampio, che può comprendere bendaggio ed esercizio, sempre in accordo con il medico che ti segue.",
    esperte: [
      {
        slug: 'azzurra-de-angelis',
        perche:
          'Nel 2015 si è specializzata in Linfodrenaggio Manuale, avvicinandosi alla riabilitazione dei disturbi linfatici e vascolari.',
      },
    ],
    faq: [
      {
        domanda: 'Il linfodrenaggio serve per dimagrire?',
        risposta:
          "No. Il linfodrenaggio è una tecnica riabilitativa per gonfiori e ristagni di liquidi, non un trattamento estetico per perdere peso.",
      },
    ],
    correlati: ['rieducazione-post-chirurgica', 'gravidanza', 'post-parto'],
  },

  // — Per la donna
  'pavimento-pelvico': {
    titoloSeo: 'Riabilitazione del pavimento pelvico a Casalotti e Boccea, Roma | FisioEVA',
    descrizioneSeo:
      'Riabilitazione del pavimento pelvico a Roma Casalotti, Via di Boccea 755: perdite urinarie, pesantezza, prolasso, dolore, dopo il parto. Fisioterapiste donne.',
    intro:
      "Il pavimento pelvico è l'insieme di muscoli che chiude il bacino in basso e sostiene vescica, utero e intestino. Quando perde forza o, al contrario, è troppo teso, possono comparire perdite, pesantezza o dolore: sintomi comuni, di cui però si parla poco.",
    quando: [
      'Perdite urinarie quando tossisci, ridi o corri',
      'Senso di pesantezza o di prolasso',
      'Dolore pelvico o durante i rapporti',
      'Dopo il parto, anche a distanza di anni',
      'In menopausa',
    ],
    come:
      "Prima ascoltiamo la tua storia; solo dopo, se sei d'accordo, si passa alla valutazione del pavimento pelvico. Il percorso combina esercizi, consapevolezza del respiro e della postura e, quando serve, terapia manuale.",
    esperte: [
      {
        slug: 'veronica-mirarchi',
        perche:
          'Si è laureata in Fisioterapia con una tesi sulla riabilitazione del pavimento pelvico nelle donne con endometriosi.',
      },
    ],
    faq: [
      {
        domanda: 'Serve la prescrizione del ginecologo?',
        risposta:
          "No, per la valutazione fisioterapica non serve. Se hai referti o una visita recente, portali: ci aiutano a inquadrare la situazione.",
      },
      {
        domanda: 'Le perdite dopo il parto sono normali?',
        risposta:
          "Sono frequenti, ma non sono qualcosa che si deve sopportare. Lavorando sul pavimento pelvico si possono spesso ridurre: vale la pena parlarne.",
      },
    ],
    correlati: ['post-parto', 'gravidanza', 'cicatrice-cesareo'],
  },

  'post-parto': {
    titoloSeo: 'Recupero post-parto a Casalotti, Roma — diastasi, pavimento pelvico | FisioEVA',
    descrizioneSeo:
      'Recupero post-parto a Roma Casalotti, Via di Boccea 755: diastasi addominale, pavimento pelvico, mal di schiena, cicatrice da cesareo.',
    intro:
      "Dopo il parto addome, schiena e pavimento pelvico hanno bisogno di tempo e di un lavoro mirato per ritrovare forza ed equilibrio. Il recupero post-parto mette insieme queste tre cose, con i tempi del tuo corpo e della tua nuova vita.",
    quando: [
      'Diastasi dei retti addominali',
      'Mal di schiena dopo il parto o durante l\'allattamento',
      'Perdite urinarie o senso di pesantezza',
      'Cicatrice da cesareo che tira',
      "Voglia di tornare a fare attività fisica in sicurezza",
    ],
    come:
      "Si parte da una valutazione di addome, pavimento pelvico e postura. Il percorso combina esercizi specifici, ginnastica ipopressiva e, quando serve, terapia manuale.",
    esperte: [
      {
        slug: 'azzurra-de-angelis',
        perche:
          'Si è specializzata nel trattamento delle donne in gravidanza e nel post-parto, a partire dalla tesi in osteopatia sulla cicatrice da cesareo.',
      },
      {
        slug: 'elisa-de-rubeis',
        perche:
          'Ha seguito corsi post-graduate di ginnastica ipopressiva post-partum (tecnica Caufriez e metodo De Gasquet).',
      },
    ],
    faq: [
      {
        domanda: 'Quando posso iniziare dopo il parto?',
        risposta:
          "In genere dopo il controllo post-parto con il ginecologo o l'ostetrica. Non c'è un tempo massimo: si può iniziare anche mesi o anni dopo.",
      },
    ],
    correlati: ['pavimento-pelvico', 'cicatrice-cesareo', 'gravidanza'],
  },

  gravidanza: {
    titoloSeo: 'Fisioterapia in gravidanza a Casalotti, Roma — mal di schiena, sciatica | FisioEVA',
    descrizioneSeo:
      'Fisioterapia e osteopatia in gravidanza a Roma Casalotti, Via di Boccea 755: mal di schiena, sciatica, dolore al bacino e al pube, gambe gonfie.',
    intro:
      "In gravidanza il corpo cambia in fretta: il baricentro si sposta, i legamenti si fanno più elastici, la schiena e il bacino lavorano di più. La fisioterapia in gravidanza aiuta ad attraversare questi mesi con meno dolore e più consapevolezza.",
    quando: [
      'Mal di schiena e dolore lombare',
      'Sciatica',
      'Dolore al bacino o al pube (pubalgia)',
      'Gambe gonfie e pesanti',
      'Preparazione del pavimento pelvico al parto',
    ],
    come:
      "Usiamo tecniche manuali dolci, posizioni comode adatte a ogni trimestre ed esercizi semplici da ripetere a casa. Lavoriamo sempre in accordo con il ginecologo o l'ostetrica che ti seguono.",
    esperte: [
      {
        slug: 'azzurra-de-angelis',
        perche: 'Si è specializzata nel trattamento delle donne in gravidanza e nel post-parto.',
      },
    ],
    faq: [
      {
        domanda: 'In quale mese della gravidanza si può fare fisioterapia?',
        risposta:
          "In ogni trimestre, adattando posizioni e tecniche. Se la gravidanza ha indicazioni particolari, ne parliamo prima con chi ti segue.",
      },
    ],
    correlati: ['post-parto', 'pavimento-pelvico', 'linfodrenaggio'],
  },

  'cicatrice-cesareo': {
    titoloSeo: 'Trattamento della cicatrice da cesareo a Casalotti, Roma | FisioEVA',
    descrizioneSeo:
      'Trattamento manuale della cicatrice da taglio cesareo a Roma Casalotti, Via di Boccea 755: aderenze, pancia che tira, mal di schiena dopo il cesareo.',
    intro:
      "Una cicatrice non è solo un segno sulla pelle: sotto ci sono strati di tessuto che possono aderire tra loro e perdere elasticità. Una cicatrice da cesareo rigida può tirare, dare fastidio e, a volte, contribuire al mal di schiena.",
    quando: [
      'Cicatrice dura, insensibile o che tira',
      'Sensazione di pancia che tira',
      'Mal di schiena comparso dopo il cesareo',
      'Fastidio nei movimenti o con alcuni vestiti',
    ],
    come:
      "Il trattamento è manuale, delicato e progressivo, e si inizia quando la cicatrice è ben chiusa. Ti insegniamo anche come lavorarla da sola a casa, tra una seduta e l'altra.",
    esperte: [
      {
        slug: 'azzurra-de-angelis',
        perche:
          "La sua tesi in osteopatia è dedicata all'approccio osteopatico al dolore lombosacrale mediante il trattamento della cicatrice da taglio cesareo.",
      },
    ],
    faq: [
      {
        domanda: 'Dopo quanto tempo dal cesareo si può trattare la cicatrice?',
        risposta:
          "Quando la ferita è completamente chiusa e guarita, in genere qualche settimana dopo il parto. Ma si può lavorare con beneficio anche su cicatrici di molti anni.",
      },
    ],
    correlati: ['post-parto', 'manipolazione-viscerale', 'pavimento-pelvico'],
  },

  // — Per il tuo bambino
  'osteopatia-neonatale': {
    titoloSeo: 'Osteopatia neonatale e pediatrica a Casalotti, Roma | FisioEVA',
    descrizioneSeo:
      'Osteopatia per neonati e bambini a Roma Casalotti, Via di Boccea 755: coliche, difficoltà di suzione, plagiocefalia, torcicollo del neonato.',
    intro:
      "Il parto è il primo grande sforzo della vita, anche per il bambino. L'osteopatia neonatale e pediatrica usa un tocco molto leggero per lavorare sulle tensioni che possono restare dopo la nascita, con tempi e modi pensati per i più piccoli.",
    quando: [
      'Coliche e pianto inconsolabile',
      'Difficoltà di suzione o ad attaccarsi al seno',
      'Testa piatta (plagiocefalia)',
      'Torcicollo del neonato, testa sempre girata da un lato',
      'Rigurgito frequente e sonno agitato',
    ],
    come:
      "Mamma o papà restano sempre accanto al bambino. Il trattamento non sostituisce il pediatra: lavoriamo accanto a lui, e se notiamo qualcosa che va approfondito te lo diciamo.",
    esperte: [],
    faq: [
      {
        domanda: 'Da che età si può portare un neonato?',
        risposta:
          "Già dalle prime settimane di vita. Il tocco è leggerissimo e il trattamento si adatta ai ritmi del bambino: se ha fame o sonno, ci fermiamo.",
      },
    ],
    correlati: ['osteopatia', 'post-parto', 'terapia-cranio-sacrale'],
  },

  // — Terapie strumentali
  tecarterapia: {
    titoloSeo: 'Tecarterapia a Casalotti e Boccea, Roma | FisioEVA',
    descrizioneSeo:
      'Tecarterapia a Roma Casalotti, Via di Boccea 755: calore profondo per contratture, tendiniti, distorsioni ed edema, sempre dentro un percorso.',
    intro:
      "La tecarterapia produce calore all'interno dei tessuti, in profondità, attraverso un manipolo appoggiato sulla pelle. Il calore stimola la circolazione e i processi di riparazione, e prepara i tessuti al lavoro manuale e all'esercizio.",
    quando: [
      'Contratture profonde',
      'Tendiniti e dolore da sovraccarico',
      'Distorsioni e traumi recenti',
      'Edema dopo un trauma o un intervento',
    ],
    come: STRUMENTALE,
    esperte: [
      {
        slug: 'azzurra-de-angelis',
        perche: 'Human Tecar Certified Operator.',
      },
    ],
    faq: [
      {
        domanda: 'La tecar scotta?',
        risposta:
          "Si sente un calore che si regola durante la seduta: deve essere piacevole, mai fastidioso.",
      },
    ],
    correlati: ['laser-alta-potenza', 'rieducazione-sportiva', 'terapia-manuale'],
  },

  'laser-alta-potenza': {
    titoloSeo: 'Laserterapia ad alta potenza a Casalotti, Roma | FisioEVA',
    descrizioneSeo:
      'Laser ad alta potenza a Roma Casalotti, Via di Boccea 755: tendiniti, borsite, epicondilite, infiammazione e dolore, a supporto della fisioterapia.',
    intro:
      "Il laser ad alta potenza concentra energia luminosa su un'area precisa. Si usa su infiammazione e dolore localizzati, per esempio nelle tendiniti, sempre come supporto al lavoro manuale e all'esercizio.",
    quando: [
      'Tendinite di spalla, gomito, ginocchio o tallone',
      'Epicondilite (gomito del tennista)',
      'Borsite',
      'Dolore infiammatorio localizzato',
    ],
    come: `${STRUMENTALE} Durante la seduta paziente e terapista indossano occhiali protettivi.`,
    esperte: [],
    faq: [
      {
        domanda: 'Il laser fa male?',
        risposta: "No: si sente al massimo un leggero calore sulla zona trattata.",
      },
    ],
    correlati: ['tecarterapia', 'ultrasuonoterapia', 'rieducazione-sportiva'],
  },

  ultrasuonoterapia: {
    titoloSeo: 'Ultrasuonoterapia a Casalotti, Roma | FisioEVA',
    descrizioneSeo:
      'Ultrasuonoterapia a Roma Casalotti, Via di Boccea 755: onde sonore sui tessuti molli per tendini, calcificazioni, aderenze e infiammazione.',
    intro:
      "L'ultrasuonoterapia usa onde sonore ad alta frequenza, che il corpo non sente, per agire in profondità sui tessuti molli: tendini, legamenti, muscoli.",
    quando: [
      'Tendinopatie',
      'Calcificazioni tendinee',
      'Aderenze dei tessuti molli',
      'Infiammazione localizzata',
    ],
    come: STRUMENTALE,
    esperte: [],
    faq: [
      {
        domanda: 'Cosa si sente durante la seduta?',
        risposta:
          "Quasi nulla: la testina scorre sulla pelle con un gel, al massimo si avverte un lieve tepore.",
      },
    ],
    correlati: ['laser-alta-potenza', 'tecarterapia', 'ionoforesi'],
  },

  magnetoterapia: {
    titoloSeo: 'Magnetoterapia a Casalotti, Roma | FisioEVA',
    descrizioneSeo:
      'Magnetoterapia a Roma Casalotti, Via di Boccea 755: campi magnetici a supporto della riparazione ossea dopo una frattura e nel dolore osseo.',
    intro:
      "La magnetoterapia usa campi magnetici a bassa frequenza a supporto dei processi di riparazione, soprattutto dell'osso: si usa per esempio dopo una frattura, nella fase di consolidamento.",
    quando: [
      'Fratture in fase di consolidamento',
      'Dolore osseo',
      'Osteoporosi, accanto alle cure indicate dal medico',
    ],
    come: STRUMENTALE,
    esperte: [],
    faq: [
      {
        domanda: 'La magnetoterapia si sente?',
        risposta: "No, è del tutto indolore: non si avverte nessuna sensazione durante la seduta.",
      },
    ],
    correlati: ['rieducazione-post-chirurgica', 'fisiokinesiterapia', 'elettrostimolazione'],
  },

  tens: {
    titoloSeo: 'TENS (elettroanalgesia) a Casalotti, Roma | FisioEVA',
    descrizioneSeo:
      'TENS a Roma Casalotti, Via di Boccea 755: stimolazione elettrica a bassa intensità per il controllo del dolore, cronico o nevralgico.',
    intro:
      "La TENS è una stimolazione elettrica a bassa intensità, applicata con elettrodi sulla pelle, che agisce sulla percezione del dolore. È uno strumento per gestire il dolore mentre si lavora sulle sue cause.",
    quando: ['Dolore cronico', 'Nevralgie', 'Dolore acuto che limita il lavoro di riabilitazione'],
    come: STRUMENTALE,
    esperte: [],
    faq: [
      {
        domanda: 'La TENS è dolorosa?',
        risposta:
          "No: si sente un formicolio leggero, e l'intensità si regola insieme fino a trovare quella confortevole.",
      },
    ],
    correlati: ['elettrostimolazione', 'ionoforesi', 'terapia-manuale'],
  },

  ionoforesi: {
    titoloSeo: 'Ionoforesi a Casalotti, Roma | FisioEVA',
    descrizioneSeo:
      "Ionoforesi a Roma Casalotti, Via di Boccea 755: il farmaco portato attraverso la pelle con una corrente leggera, su infiammazioni localizzate.",
    intro:
      "L'ionoforesi usa una corrente elettrica leggera per far passare un farmaco attraverso la pelle, direttamente nella zona da trattare. Il farmaco è quello indicato dal medico.",
    quando: [
      'Infiammazione localizzata',
      'Tendiniti',
      'Dolore articolare da artrosi',
    ],
    come: `${STRUMENTALE} Per l'ionoforesi serve l'indicazione del medico sul farmaco da usare.`,
    esperte: [],
    faq: [
      {
        domanda: 'Serve una prescrizione?',
        risposta:
          "Serve l'indicazione del medico sul farmaco da usare. Se non ce l'hai ancora, ne parliamo al primo incontro.",
      },
    ],
    correlati: ['tens', 'ultrasuonoterapia', 'laser-alta-potenza'],
  },

  elettrostimolazione: {
    titoloSeo: 'Elettrostimolazione muscolare a Casalotti, Roma | FisioEVA',
    descrizioneSeo:
      'Elettrostimolazione a Roma Casalotti, Via di Boccea 755: riattivare un muscolo indebolito dopo il gesso, un intervento o un lungo periodo di immobilità.',
    intro:
      "L'elettrostimolazione fa contrarre un muscolo con impulsi elettrici controllati. Serve quando un muscolo si è indebolito e fatica a rispondere da solo, per esempio dopo il gesso o un intervento.",
    quando: [
      'Ipotrofia muscolare dopo il gesso o un tutore',
      'Debolezza dopo un intervento',
      'Muscolo che fatica ad attivarsi',
    ],
    come: `${STRUMENTALE} L'elettrostimolazione prepara il muscolo all'esercizio attivo, che resta la parte principale del recupero.`,
    esperte: [],
    faq: [
      {
        domanda: 'Cosa si sente?',
        risposta:
          "Il muscolo si contrae da solo, a ritmo; l'intensità si regola insieme e non deve mai essere dolorosa.",
      },
    ],
    correlati: ['fisiokinesiterapia', 'rieducazione-post-chirurgica', 'tens'],
  },
};

/** Il testo comune su come si comincia, uguale per tutte le schede. */
export const comeSiInizia = VALUTAZIONE;

/**
 * La scheda di un trattamento. Il linfodrenaggio compare in due aree con due
 * slug diversi (le card vogliono una chiave unica), ma la pagina è una.
 */
export const slugScheda = (t: Trattamento) =>
  t.slug === 'linfodrenaggio-riabilitativo' ? 'linfodrenaggio' : t.slug;

export const urlScheda = (slug: string) => `/servizi/${slug}`;

/** L'indirizzo della scheda di un trattamento, se ne ha una. */
export const schedaDi = (t: Trattamento) =>
  approfondimenti[slugScheda(t)] ? urlScheda(slugScheda(t)) : null;

/** Tutte le schede, con il trattamento e l'area a cui appartengono. */
export const schede = Object.entries(approfondimenti).map(([slug, a]) => {
  const trattamento = trattamenti.find((t) => t.slug === slug);
  if (!trattamento) throw new Error(`approfondimenti: nessun trattamento con slug "${slug}"`);
  const categoria = categorie.find((c) => c.slug === trattamento.categoria)!;
  return { slug, url: urlScheda(slug), trattamento, categoria, ...a };
});

export type Scheda = (typeof schede)[number];

export const trovaScheda = (slug: string) => schede.find((s) => s.slug === slug);

/**
 * Controlli che fanno fallire il build invece di pubblicare un link rotto o
 * un nome sbagliato: li chiama scripts/genera-sitemap.mjs.
 */
export function controllaSchede(): string[] {
  const errori: string[] = [];
  for (const s of schede) {
    for (const c of s.correlati) if (!approfondimenti[c]) errori.push(`${s.slug}: correlato "${c}" senza scheda`);
    for (const e of s.esperte) if (!team.some((m) => m.slug === e.slug)) errori.push(`${s.slug}: "${e.slug}" non è nel team`);
    if (s.descrizioneSeo.length > 165) errori.push(`${s.slug}: descrizione di ${s.descrizioneSeo.length} caratteri`);
  }
  for (const t of trattamenti) {
    if (t.categoria !== 'terapie-di-gruppo' && !schedaDi(t)) errori.push(`${t.slug}: trattamento senza scheda`);
  }
  return errori;
}
