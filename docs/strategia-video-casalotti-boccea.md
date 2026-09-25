# Strategia video — FisioEVA, Casalotti / Boccea

Documento di lavoro per la produzione video e la strategia di attrazione.
Scritto sui dati reali del sito (`src/data/site.ts`) e sull'analisi del video di
riferimento fornito. Non contiene dati inventati: dove serve una decisione dello
studio c'è un segnaposto esplicito `[DA CONFERMARE: ...]`.

Data: 25 settembre 2026 — **giorno prima dell'apertura** (`sito.apertura`).

---

## 0. Priorità zero: la CTA

Prima di girare qualunque cosa va risolto un problema che rende inutile metà del
lavoro.

Oggi **ogni pulsante "Prenota" del sito è un `mailto:`** (`CtaBand.tsx`,
`Navbar.tsx`, `Footer.tsx`, `Contatti.tsx`). Un video su Instagram o TikTok viene
guardato dal telefono: chi tocca "prenota" si ritrova il client di posta che si
apre su una mail vuota. È il punto in cui si perde la maggior parte dei contatti
generati dai video — non per qualità del contenuto, ma per attrito.

**Serve una destinazione mobile-first prima del primo reel:**

| Opzione | Perché | Costo |
| --- | --- | --- |
| **WhatsApp Business** (consigliata) | È il canale in cui la gente scrive già. Messaggio precompilato, risposta asincrona dalla segreteria, storico conversazioni. | 0 € |
| Calendly / Cal.com | Prenotazione vera senza passaggio umano. Ma toglie il filtro della segreteria, che su un primo colloquio serve. | 0–12 €/mese |
| Chiamata diretta `tel:` | Zero attrito, ma solo negli orari di apertura. | 0 € |

Raccomandazione: **WhatsApp Business come CTA primaria di tutti i video**, numero
dello studio come secondaria. Un link `https://wa.me/393929605972?text=...` con
testo precompilato diverso per ogni pilastro di contenuto (così si capisce da
quale video arriva il contatto — è l'unico tracciamento che si può fare senza
installare pixel, che il sito oggi non ha e che obbligherebbe a un banner cookie:
vedi il README, sezione GDPR).

> ⚠️ Il numero precompilato non va su una chat personale delle titolari: le
> prenotazioni passano dallo studio (è già scritto nelle FAQ del sito).

---

## 1. Cosa fa esattamente il video di riferimento

L'ho ricostruito frame per frame. Vale la pena capirlo bene, perché quasi tutto
il suo risultato sta in cinque scelte tecniche, non nel testo.

**Lo script (trascritto dalle caption):**

> «Anche tu a fine giornata senti il collo rigido? Magari fai fatica a girare il
> capo, o senti una tensione che [sale] lungo la testa. Spesso la cervicale
> [viene sotto]carico molte ore… Le cause possono essere sedentarietà, lavoro, o
> abitudini sbagliate. Quando una zona lavora a lungo senza recuperare, col tempo
> tollera sempre meno il carico e inizia a dare [fastidio]. Prima non è colpa né
> del cambio stagione né del cuscino, ma è un accumulo. Se vuoi risolvere questo
> problema scrivimi in DM.»

Durata 38", verticale 9:16, 30 fps.

**La struttura narrativa, in cinque battute:**

1. **Riconoscimento** (0–5") — una domanda su un sintomo che chi guarda ha
   *adesso*. Non "sapevi che", non "oggi parliamo di": una domanda diretta.
2. **Specificazione** (5–12") — due o tre varianti del sintomo. Serve a far dire
   «questo sono io» anche a chi al primo gancio non si è riconosciuto.
3. **Causa** (12–18") — un elenco breve e banale: sedentarietà, lavoro, abitudini.
   Non tecnicismi.
4. **Meccanismo** (18–28") — la frase che fa il lavoro vero: *una zona che lavora
   a lungo senza recuperare col tempo tollera sempre meno il carico*. È qui che
   chi guarda impara qualcosa e decide che chi parla sa quello che dice.
5. **Reframe + CTA** (28–38") — smonta la spiegazione sbagliata che la persona si
   era data ("il cambio stagione", "il cuscino") e la sostituisce con la tua
   ("un accumulo"). Poi chiede il contatto.

Il punto 5 è il più sottovalutato e il più potente: **non stai informando, stai
sostituendo una spiegazione**. Chi accetta la tua spiegazione ha già accettato
che la soluzione passi da te.

**Le cinque scelte tecniche che lo fanno funzionare:**

| Scelta | Dettaglio osservato | Perché conta |
| --- | --- | --- |
| **Jump cut continui** | Stacco ogni 2–4 secondi, stesso soggetto, stessa divisa, sfondo che cambia | Azzera i tempi morti. Il cervello non ha il tempo di annoiarsi e scrollare |
| **Quattro set nello stesso studio** | (a) scheletro anatomico e finestra, (b) muro degli attestati incorniciati + colonna vertebrale, (c) scrivania col portatile, (d) sala luminosa con lettino | Sembrano quattro video montati insieme. Girati in mezz'ora nella stessa stanza |
| **Caption karaoke** | Maiuscolo, sans bold, 2–4 parole per schermata, **una parola chiave in azzurro** per ogni schermata | L'80% guarda senza audio. La parola colorata è quella che deve restare |
| **Microfono lavalier a vista** | Clip nero sulla casacca, visibile in ogni inquadratura | Non è un errore: è un segnale di "questo è un professionista che comunica", e soprattutto è la ragione per cui l'audio è pulito |
| **Divisa con logo e nome ricamato** | Casacca navy, logo tondo sul petto, nome ricamato in corsivo | Costruisce riconoscibilità e autorevolezza in un fotogramma, senza dire una parola |

**Quello che il riferimento NON fa** (e che va copiato per sottrazione):
niente musica sotto la voce, niente sigla, niente logo in apertura, niente "ciao
ragazzi", niente testo che copre il viso, niente transizioni animate, nessuna
promessa di risultato.

---

## 2. Specifica fotografica per replicarlo

Da stampare e tenere in studio.

### Camera
- Telefono recente, **obiettivo principale** (mai il grandangolo: deforma il viso
  e fa sembrare la stanza vuota). 4K 30 fps se c'è spazio, altrimenti 1080p 30.
- **Blocca esposizione e messa a fuoco** (tocca e tieni premuto sul viso) prima di
  registrare: senza blocco l'immagine "pompa" a ogni movimento delle mani.
- Treppiede a mezz'altezza, **lente all'altezza degli occhi**. Mai dal basso.
- Inquadratura a mezzo busto, occhi sulla linea del terzo superiore, poco spazio
  sopra la testa. Le mani devono entrare nell'inquadratura: nel riferimento
  gesticola in continuazione ed è metà della sua presenza.

### Luce
- **Luce naturale, sempre.** Il riferimento non usa nemmeno un ring light.
- Finestra **davanti al soggetto a 45°**, mai alle spalle. Se la finestra è alle
  spalle si ottiene una sagoma nera.
- Finestra di ripresa consigliata: **9:00–12:00**, quando la luce è morbida.
- Se una stanza è troppo buia non si accende una lampada: si cambia stanza.

### Audio
- **Microfono lavalier a clip.** È l'unica spesa obbligatoria (40–80 €). Conta più
  della camera: si perdona un video sgranato, non un audio con l'eco della stanza.
- Se non c'è: registrare a meno di un metro dal telefono, con la porta chiusa.

### I quattro set di FisioEVA
Lo studio ha già tutto quello che serve. Dalle foto dello shooting in
`public/foto/`, i quattro set fissi sono:

1. **Sala trattamento con lettino e laser** (`sala-lettino-e-laser.webp`) — luce di
   finestra, profondità.
2. **La tecar Fisiowarm / il touchscreen** (`tecar-fisiowarm.webp`,
   `tecnologia-touchscreen.webp`) — il set "strumentale", dà il segnale tecnologia.
3. **La reception** (`sede-reception.webp`) — il set "accoglienza", per i video di
   struttura e di quartiere.
4. **Il piano superiore, StudioEVA** — tappetini, spazio aperto. È il set per i
   contenuti di gruppo e movimento.

> **Manca l'equivalente del "muro degli attestati" del riferimento.** Nel video
> originale gli attestati incorniciati alle spalle fanno un lavoro enorme: dicono
> "questo posto è serio" senza che nessuno lo affermi. FisioEVA ha tre
> professioniste con tre 110 e lode, EDUCAM, CERDO, UniCamillus, un periodo al
> CONI e un master Souchard. **Quella parete va costruita fisicamente e usata come
> sfondo ricorrente.** È il vantaggio competitivo più difficile da imitare per
> qualunque altro studio del quartiere, ed è invisibile finché sta in un cassetto.

### Montaggio
- Stacco ogni **2,5–4 secondi**. Cambio di set ogni **8–12 secondi**.
- Tagliare ogni respiro, ogni "ehm", ogni pausa. Il riferimento non ha un
  millisecondo di aria.
- Caption: maiuscolo, sans bold, **2–4 parole per schermata**, una parola chiave
  nel colore primario del brand. Posizione: **al 70–75% dell'altezza**, sopra la
  zona dove Instagram mette la descrizione e i pulsanti.
- Colore: caldo, incarnato naturale, ombre leggermente alzate, saturazione −5.
  Nessuna LUT cinematografica fredda: il riferimento ha una palette beige/navy che
  si legge come "ambiente sanitario pulito ma caldo". La palette del brand FisioEVA
  ci va già d'accordo.
- **Primo fotogramma: il viso che parla.** Mai il logo, mai una schermata di
  titolo. Il logo, se serve, nell'ultimo secondo.

### Chi sta davanti alla camera
Il riferimento ha **un volto solo**, ed è una scelta forte: la riconoscibilità si
costruisce sulla ripetizione della stessa faccia. FisioEVA ne ha tre, più un team.

Raccomandazione: **un volto per pilastro**, coerente con le competenze reali.

| Volto | Pilastro | Perché (dalle bio reali) |
| --- | --- | --- |
| **Azzurra De Angelis** | Donna, gravidanza, post-parto, cicatrice da cesareo, linfodrenaggio | Tesi di osteopatia sul trattamento della cicatrice da taglio cesareo, specializzazione in linfodrenaggio |
| **Elisa De Rubeis** | Postura, movimento, StudioEVA, Feldenkrais | RPG Souchard, Maitland, Feldenkrais (terzo anno), C.A.M., Pilates sulla colonna |
| **Veronica Mirarchi** | Sport, infortuni, pavimento pelvico | Formazione al CONI con atleti internazionali, tesi su pavimento pelvico ed endometriosi, passato da sportiva |

I video di struttura e di quartiere si girano **tutte e tre insieme**: lì il
messaggio è "siamo un gruppo", non "sono un'esperta".

---

## 3. Gli script

Convenzioni: `[…]` = indicazione di regia; **grassetto** = parola chiave da
colorare nella caption; ogni script è taggato con la posizione nel funnel.

### ⚠️ Vincoli di scrittura — non negoziabili

Valgono per ogni parola detta in video, esattamente come per il sito
(vedi README, "Regole di scrittura"):

- **Mai promesse di guarigione** (L. 145/2018). Si dice *può aiutare*, *si lavora
  su*, *l'obiettivo del percorso è*. Mai *risolviamo*, *guarisci*, *ti tolgo il
  dolore*. ⚠️ Nota che **il video di riferimento sfora**: «se vuoi risolvere
  questo problema» è una formula che su un professionista sanitario italiano è a
  rischio. La versione FisioEVA della stessa CTA è: *«se ti ci sei riconosciuto,
  scrivici: il primo passo è capire da dove arriva»*.
- **Mai "gratis"**: si dice *primo colloquio*, *prima valutazione*.
- **Mai "medici", "équipe medica", "dottore" riferito al ruolo**: sono
  fisioterapiste e osteopate. "Dott.ssa" come titolo accademico va bene.
- **Nessun paziente ripreso senza consenso scritto specifico.** Un video che
  mostra una persona in trattamento rivela che quella persona sta ricevendo cure:
  è un dato sanitario ex art. 9 GDPR. Per lo shooting è stata usata una modella —
  per i video serve la stessa cautela, o una liberatoria firmata.

---

### PILASTRO A — Sintomo
*Funnel: attrazione pura. Replica esatta del format di riferimento. È il pilastro
che porta portata nuova: parla a chi non ti conosce e non ti sta cercando.*

---

#### A1 — «Il mal di schiena che torna sempre nello stesso punto»
**Volto:** Veronica · **Durata:** 40" · **Set:** lettino → attestati → reception

| Tempo | Inquadratura | Testo | Caption chiave |
| --- | --- | --- | --- |
| 0–4" | Lettino, mezzo busto | «Ti fa male la schiena sempre **nello stesso punto**, e ogni volta pensi che sia passata?» | STESSO **PUNTO** |
| 4–10" | *stacco*, si tocca la zona lombare | «Magari sparisce per due settimane. Poi ti chini a prendere una cosa da terra e **torna**.» | E POI **TORNA** |
| 10–17" | *stacco*, set attestati | «Quando un dolore va e viene **nello stesso identico posto**, quasi mai il problema è lì.» | QUASI MAI **È LÌ** |
| 17–28" | *stacco*, gesticola | «Quel punto è dove il corpo **scarica**. La causa di solito è più in basso o più in alto: un'anca che non ruota, un piede che appoggia male, un addome che non tiene.» | DOVE IL CORPO **SCARICA** |
| 28–34" | *stacco*, reception | «Ecco perché l'antinfiammatorio funziona per tre giorni: spegne il sintomo, **non sposta il carico**.» | NON SPOSTA IL **CARICO** |
| 34–40" | Primo piano | «Se ti ci sei riconosciuto, scrivici. Siamo a **Casalotti**, in via di Boccea: il primo passo è **capire da dove arriva**.» | DA DOVE **ARRIVA** |

**Descrizione post:** «Il dolore che torna sempre nello stesso punto non è
sfortuna: è un carico che nessuno ha ancora spostato. 📍 FisioEVA — Via di Boccea
755, Casalotti (Roma).»

---

#### A2 — «La spalla che fa male di notte»
**Volto:** Veronica · **Durata:** 35" · **Set:** finestra → laser → scrivania

| Tempo | Inquadratura | Testo | Caption chiave |
| --- | --- | --- | --- |
| 0–5" | Finestra, mezzo busto | «Ti sei mai svegliato perché non riuscivi a stare **sul fianco**?» | SUL **FIANCO** |
| 5–11" | *stacco*, mima il gesto | «Di giorno quasi niente. Alzi il braccio, prendi una cosa dall'alto, **una fitta**. E poi la notte.» | E POI LA **NOTTE** |
| 11–20" | *stacco*, set laser | «La spalla è l'articolazione **più mobile** del corpo, e per esserlo rinuncia a stabilità. Chi la tiene ferma sono i muscoli, non le ossa.» | PIÙ **MOBILE** |
| 20–29" | *stacco*, gesticola | «Quando quei muscoli si affaticano, lo spazio dove scorre il tendine **si riduce**. Da sdraiato quello spazio si chiude ancora di più: per questo fa male di notte e non di giorno.» | LO SPAZIO **SI RIDUCE** |
| 29–35" | Primo piano | «Non è una cosa che passa aspettando. Scrivici e la **guardiamo insieme**.» | GUARDIAMO **INSIEME** |

---

#### A3 — «"È cervicale"»  *(il reframe più forte del pilastro)*
**Volto:** Elisa · **Durata:** 42" · **Set:** attestati → lettino → reception

| Tempo | Inquadratura | Testo | Caption chiave |
| --- | --- | --- | --- |
| 0–5" | Attestati | «"Ho la **cervicale**." Te lo sei detto anche tu, vero?» | HO LA **CERVICALE** |
| 5–12" | *stacco* | «Il problema è che *cervicale* **non è una diagnosi**. È un pezzo del corpo. È come dire "ho il ginocchio".» | NON È UNA **DIAGNOSI** |
| 12–22" | *stacco*, lettino | «Sotto quella parola ci stanno cose diverse: una tensione muscolare da postura, un'articolazione che ha perso movimento, un nervo irritato, **una mandibola che stringe di notte**.» | UNA MANDIBOLA CHE **STRINGE** |
| 22–32" | *stacco*, gesticola | «Si trattano in modi diversi. Ed è il motivo per cui magari hai già fatto dieci sedute di massaggi **senza cambiare niente**: si stava lavorando sul posto giusto per il problema sbagliato.» | POSTO GIUSTO, PROBLEMA **SBAGLIATO** |
| 32–42" | Reception | «Da noi il primo passo è **capire quale delle quattro è la tua**. Venti minuti di colloquio e valutazione, poi si decide insieme. Via di Boccea 755, **Casalotti**.» | QUALE DELLE **QUATTRO** |

**Nota strategica:** questo è il video con il potenziale di salvataggio più alto
del pilastro. "Cervicale" è la parola con cui metà del quartiere descrive il
proprio dolore; smontarla posiziona lo studio come quello che *sa distinguere*.

---

#### A4 — «La caviglia che hai storto sei mesi fa»
**Volto:** Veronica · **Durata:** 35" · **Set:** tavoletta propriocettiva → lettino

| Tempo | Inquadratura | Testo | Caption chiave |
| --- | --- | --- | --- |
| 0–5" | In piedi, tavoletta propriocettiva in mano | «Hai storto la caviglia mesi fa, non fa più male, ma **non è tornata come prima**?» | NON COME **PRIMA** |
| 5–12" | *stacco* | «Corri e senti che "non è sicura". Sul terreno irregolare **stai attento**. Magari l'hai già storta una seconda volta.» | STAI **ATTENTO** |
| 12–24" | *stacco*, appoggia il piede sulla tavoletta | «Quando ti distorci non si rompe solo il legamento: si perdono i **recettori** che dicono al cervello dov'è il piede nello spazio. Il gonfiore passa da solo. Quelli **no**.» | I RECETTORI **NO** |
| 24–31" | *stacco*, mostra l'esercizio | «Vanno riallenati. È un lavoro di equilibrio, noioso, e dura poche settimane — ma è la differenza tra una distorsione e **tre**.» | TRA UNA E **TRE** |
| 31–35" | Primo piano | «Se te la porti dietro da mesi, scrivici.» | SCRIVICI |

---

#### A5 — «Perché il dolore peggiora la sera» *(format corto, 20")*
**Volto:** Elisa · **Durata:** 20" · **Set:** finestra, inquadratura unica con 3 jump cut

> «Il dolore ti sembra peggiore la sera? Non è un'impressione. Durante il giorno
> accumuli **carico**, e più vai avanti più i tessuti tollerano meno. È lo stesso
> motivo per cui a fine settimana stai peggio che il lunedì. Se succede tutti i
> giorni, non è **stanchezza**: è un carico che non stai smaltendo.»

---

### PILASTRO B — Quartiere
*Funnel: attrazione + conversione locale. Questo pilastro non porta milioni di
visualizzazioni: porta le visualizzazioni giuste, entro tre chilometri.*

**Regola non negoziabile per tutto il pilastro:** la parola **"Casalotti"** o
**"Boccea"** va pronunciata **nei primi cinque secondi**, non solo scritta.
Instagram, TikTok e i crawler AI trascrivono l'audio: quella parola detta è un
segnale geografico che il testo sovraimpresso da solo non dà.

---

#### B1 — «Se abiti a Casalotti» *(geo-hook puro)*
**Volto:** tutte e tre · **Durata:** 18" · **Set:** esterno, davanti all'ingresso

| Tempo | Inquadratura | Testo | Caption chiave |
| --- | --- | --- | --- |
| 0–4" | Esterno, le tre davanti alla porta | «Se abiti a **Casalotti** e stai cercando un fisioterapista, guarda qui.» | **CASALOTTI** |
| 4–9" | *stacco*, insegna a fuoco | «Via di Boccea 755, all'angolo con **via della Cellulosa**.» | VIA DELLA **CELLULOSA** |
| 9–14" | *stacco*, interno reception | «Fisioterapia, osteopatia, riabilitazione. E al piano di sopra, i corsi.» | E AL PIANO **DI SOPRA** |
| 14–18" | Le tre, primo piano | «Siamo aperti dal lunedì al venerdì 8–20 e il sabato mattina. **Vi aspettiamo**.» | VI **ASPETTIAMO** |

**Nota:** è il video da fissare in alto sul profilo e da caricare anche come post
video sulla scheda Google Business Profile.

---

#### B2 — «Come arrivare» *(utilità pura)*
**Volto:** Francesca o Laura, segreteria · **Durata:** 25" · **Set:** esterni

Sequenza girata camminando, in soggettiva alternata a inquadrature frontali.

| Tempo | Inquadratura | Testo | Caption chiave |
| --- | --- | --- | --- |
| 0–4" | Frontale, marciapiede | «Come si arriva a FisioEVA, in trenta secondi.» | COME SI **ARRIVA** |
| 4–10" | Soggettiva, l'incrocio | «Siamo su **via di Boccea al 755**, all'angolo con via della Cellulosa.» | AL **755** |
| 10–16" | Soggettiva, dove si parcheggia | «In auto: `[DA CONFERMARE: parcheggio — il dato è segnato come mancante in site.ts]`» | IN **AUTO** |
| 16–21" | Fermata del bus | «Con i mezzi: fermata `[DA CONFERMARE: nome fermata e linee]`, poi `[N]` metri a piedi.» | CON I **MEZZI** |
| 21–25" | Ingresso, porta che si apre | «Citofono FisioEVA. **Ci vediamo di sopra.**» | CI VEDIAMO **SOPRA** |

> **Da chiudere prima di girarlo:** il parcheggio è uno dei dati ancora marcati
> `<DatoMancante>` nel sito. Su un quartiere come Casalotti, dove si arriva quasi
> sempre in auto, *"dove parcheggio"* è una delle prime tre domande reali. Vale la
> pena rispondere con precisione: «c'è posto in strada davanti», «c'è il
> parcheggio del [x] a 50 metri», qualunque sia la verità.

---

#### B3 — «Perché abbiamo aperto proprio qui» *(il video identitario)*
**Volto:** tutte e tre, alternate · **Durata:** 50" · **Set:** reception + esterni

Questo è l'unico video del piano che può permettersi un ritmo più lento e un
sottofondo musicale basso. È il video da mettere in evidenza nel profilo.

| Tempo | Chi | Testo |
| --- | --- | --- |
| 0–6" | Azzurra | «Ci hanno chiesto perché abbiamo aperto uno studio **qui**, e non in centro.» |
| 6–14" | Elisa | «Perché è il quartiere in cui **lavoriamo da sempre**. Le persone che trattiamo abitano a duecento metri.» |
| 14–24" | Veronica | «E perché a Casalotti, se ti serve un percorso serio, di solito ti dicono di **prendere la macchina** e attraversare Roma.» |
| 24–34" | Azzurra | «Abbiamo voluto mettere qui le cose che di solito trovi altrove: la tecar, il laser ad alta potenza, l'osteopatia, il percorso donna, quello per i bambini.» |
| 34–44" | Elisa | «E al piano di sopra uno spazio dove **continuare a muoversi** quando il percorso è finito.» |
| 44–50" | Le tre insieme | «Via di Boccea 755. **Siamo qui.**» |

**Nota di verità:** la frase "è il quartiere in cui lavoriamo da sempre" è già nel
sito (FAQ "Dove si trova lo studio"). È l'asset di posizionamento più forte che ha
lo studio e va ripetuto ovunque: non siete arrivati a Casalotti, **venite** da
Casalotti. Nessuna catena può dirlo.

---

#### B4 — «Le cose che vediamo di più a Casalotti» *(geo + clinico, il più originale)*
**Volto:** Veronica · **Durata:** 40" · **Set:** scrivania + lettino

Un video che esiste solo perché lo studio è **in quel** quartiere. È il contenuto
che nessun account nazionale di fisioterapia può copiare.

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–5" | «Dopo il primo mese qui a Casalotti, vi dico le tre cose che vediamo **più spesso**.» | PIÙ **SPESSO** |
| 5–15" | «Uno: **schiene da pendolari**. Qui la gente sta in macchina un'ora e mezza al giorno per andare a lavorare, e poi si stupisce che la schiena tiri.» | SCHIENE DA **PENDOLARI** |
| 15–26" | «Due: **spalle e gomiti da palestra**. Ci sono un sacco di persone che si allenano, e quasi nessuno che si scalda. Le tendiniti arrivano da lì, non dal peso.» | NON DAL **PESO** |
| 26–35" | «Tre: **mamme con la schiena distrutta**. Bambini in braccio, passeggino, scale. È un carico vero e nessuno lo chiama così.» | UN CARICO **VERO** |
| 35–40" | «Se sei in una di queste tre, sai già dove siamo.» | SAI DOVE **SIAMO** |

> Dopo il primo mese reale di attività, questo script va **riscritto sui dati
> veri** dello studio. Funziona perché è vero, non perché è furbo.

---

### PILASTRO C — Struttura e servizi
*Funnel: considerazione. Parla a chi ti ha già visto una volta e sta valutando se
entrare. Converte poco da solo, ma senza questo pilastro il pilastro A non
converte affatto.*

---

#### C1 — «Cosa succede nei primi venti minuti» *(il video anti-attrito)*
**Volto:** Azzurra · **Durata:** 45" · **Set:** reception → sala valutazione → lettino

La ragione numero uno per cui una persona con dolore non prenota non è il prezzo:
è **non sapere cosa succede quando entra**. Questo video toglie quella barriera.

| Tempo | Inquadratura | Testo | Caption chiave |
| --- | --- | --- | --- |
| 0–5" | Reception | «Non sai cosa succede quando entri in uno studio di fisioterapia? Te lo faccio vedere.» | TE LO FACCIO **VEDERE** |
| 5–12" | *stacco*, si siedono | «Il primo appuntamento **non è un trattamento**. È un colloquio, dura una ventina di minuti, e serve a capire.» | NON È UN **TRATTAMENTO** |
| 12–21" | *stacco*, ascolta | «Prima ti ascoltiamo: da quanto ce l'hai, quando peggiora, cosa hai già provato, che lavoro fai. Le informazioni utili stanno quasi sempre **in quello che racconti**.» | IN QUELLO CHE **RACCONTI** |
| 21–31" | *stacco*, valutazione posturale in piedi | «Poi guardiamo come stai in piedi e come ti muovi. Non serve la **prescrizione del medico**, e non serve portare per forza risonanze: se ce l'hai, portale.» | NON SERVE LA **PRESCRIZIONE** |
| 31–40" | *stacco*, seduti a parlare | «Alla fine ti diciamo cosa abbiamo trovato e **quante sedute pensiamo servano**. Realisticamente. Poi decidi tu.» | POI **DECIDI TU** |
| 40–45" | Primo piano | «Zero sorprese. Scrivici quando vuoi.» | ZERO **SORPRESE** |

---

#### C2 — «Tour dello studio in trenta secondi»
**Volto:** voce fuori campo (Elisa) · **Durata:** 30" · **Set:** tutti, in movimento

Girato tutto camminando, telefono stabilizzato, un'unica camminata montata a
stacchi.

| Tempo | Cosa si vede | Voce | Caption chiave |
| --- | --- | --- | --- |
| 0–4" | La porta che si apre, reception | «Questo è FisioEVA, a Casalotti.» | FISIO**EVA** |
| 4–10" | Sale trattamento, lettini | «Le sale per i trattamenti manuali e l'osteopatia.» | TERAPIA **MANUALE** |
| 10–17" | Tecar Fisiowarm, laser | «La tecar e il laser ad alta potenza, che usiamo **dentro un percorso**, mai al posto delle mani.» | MAI AL **POSTO** |
| 17–23" | Tavolette, foam roller, spazio esercizio | «Lo spazio per la rieducazione e il lavoro sul movimento.» | SUL **MOVIMENTO** |
| 23–30" | Le scale, poi il piano superiore coi tappetini | «E di sopra, lo spazio dei corsi. **Ve lo faccio vedere domani.**» | **DOMANI** |

**Nota:** il finale aperto è intenzionale — è un gancio verso il pilastro D e
costruisce l'abitudine a tornare.

---

#### C3 — «Non serve la prescrizione del medico» *(format corto, 22")*
**Volto:** Elisa · **Durata:** 22" · **Set:** attestati, inquadratura unica

> «"Devo prima passare dal medico?" È la domanda che ci fanno di più. **No.** Per
> una valutazione fisioterapica o osteopatica non serve una prescrizione: puoi
> prenotare direttamente. Se poi durante la valutazione emerge qualcosa che **non
> è di nostra competenza**, te lo diciamo e ti indirizziamo. Ma per iniziare a
> capire cos'hai, basta prendere un appuntamento.»

**Perché conta:** è una delle FAQ del sito, ed è una barriera d'ingresso pura.
Ogni FAQ del sito è un potenziale reel: sono già scritte, già approvate, già
nel tono giusto.

---

#### C4 — «Siamo in tre» *(presentazione del team)*
**Volto:** tutte e tre · **Durata:** 40" · **Set:** attestati + sale

Ogni professionista si presenta **con una cosa sola**, quella che sa fare meglio.
Non il curriculum: il curriculum sta sul sito.

| Tempo | Chi | Testo |
| --- | --- | --- |
| 0–4" | Insieme | «Siamo in tre, e facciamo cose diverse.» |
| 4–14" | Azzurra | «Io sono Azzurra, fisioterapista e osteopata. La mia tesi è nata dal trattamento della **cicatrice da cesareo**: da lì lavoro soprattutto con le donne, in gravidanza e dopo il parto.» |
| 14–25" | Elisa | «Io sono Elisa. Vent'anni fa ho scritto una tesi sul legame tra **emozione, postura e respiro**, e sto ancora lavorando su quello: postura, terapia manuale, metodo Feldenkrais.» |
| 25–35" | Veronica | «Io sono Veronica, osteopata prima e fisioterapista poi. Mi sono formata al **CONI** con atleti internazionali e lavoro su sport e salute femminile.» |
| 35–40" | Insieme | «E con noi c'è un team. Passate a conoscerci: via di Boccea 755.» |

> `[DA CONFERMARE]` — il team clinico (Siria, Andrea, Valentina) e la nutrizionista
> non compaiono finché titoli e numeri di albo non sono confermati: per un
> professionista sanitario il titolo è un obbligo di legge, non un dettaglio
> (è segnalato anche nel codice del sito).

---

#### C5 — «La tecar non è una bacchetta magica» *(anti-hype, alta credibilità)*
**Volto:** Veronica · **Durata:** 35" · **Set:** tecar Fisiowarm

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–5" | «Se qualcuno ti promette che risolvi con **dieci sedute di tecar**, cambia studio.» | CAMBIA **STUDIO** |
| 5–15" | «La tecar porta calore in profondità nel tessuto. Aiuta il **ricambio**, riduce la sensazione di dolore, rende il tessuto più lavorabile. Ma non insegna a un'anca a ruotare, e non rinforza niente.» | NON **RINFORZA** |
| 15–25" | «Serve a **preparare il terreno** per il lavoro vero, che è manuale e di movimento. Da sola, quando smetti, torni al punto di partenza.» | PREPARARE IL **TERRENO** |
| 25–35" | «Da noi le terapie strumentali entrano nel percorso quando servono, per il tempo che serve. **Mai al posto delle mani.** Via di Boccea 755, Casalotti.» | MAI AL **POSTO** |

**Nota strategica:** dire cosa *non* fa uno strumento che avete comprato è il
contenuto più controintuitivo e più efficace del piano. Costruisce la fiducia che
poi fa prenotare i percorsi lunghi, che sono quelli che tengono in piedi lo studio.

---

#### C6 — «Il neonato che non dorme» *(il contenuto più condiviso)*
**Volto:** Azzurra · **Durata:** 40" · **Set:** sala luminosa

⚠️ **Nessun neonato vero in video senza consenso scritto dei genitori.** Girare in
talking-head puro, oppure con le mani su un manichino/modello didattico.

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–6" | «Il tuo bambino non dorme, si inarca, piange sempre alla stessa ora, e ti hanno detto che sono **le coliche**?» | LE **COLICHE** |
| 6–16" | «"Coliche" è la parola che si usa quando non si sa. A volte dietro c'è qualcos'altro: il parto è **il primo grande sforzo della vita**, anche per lui.» | IL PRIMO GRANDE **SFORZO** |
| 16–28" | «Una testa che resta girata sempre dallo stesso lato, una suzione che funziona da un seno solo, un punto che si appiattisce: sono cose su cui **si può lavorare**, con un tocco leggerissimo.» | SI PUÒ **LAVORARE** |
| 28–36" | «Non è magia e non sostituisce il pediatra. È un altro paio di mani che guarda **come si muove**.» | COME SI **MUOVE** |
| 36–40" | «Osteopatia neonatale e pediatrica, a Casalotti. Scrivici.» | A **CASALOTTI** |

---

#### C7 — «La cosa di cui non parla nessuno» *(percorso donna — alto salvataggio)*
**Volto:** Veronica · **Durata:** 40" · **Set:** finestra, tono calmo

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–6" | «Ti scappa la pipì quando starnutisci, ridi o salti, e hai deciso che **è normale** dopo un figlio?» | È **NORMALE**? |
| 6–14" | «È **comune**. Non è la stessa cosa di normale. Comune vuol dire che capita a tante. Normale vuol dire che deve andare così — e non deve.» | COMUNE ≠ **NORMALE** |
| 14–26" | «Il pavimento pelvico è un muscolo. Come tutti i muscoli si affatica, si allunga, perde coordinazione. E come tutti i muscoli **si riallena**.» | SI **RIALLENA** |
| 26–34" | «Non servono i Kegel fatti a caso guardando un video. Serve prima capire se quel muscolo è **debole o troppo contratto**, perché il lavoro è opposto.» | DEBOLE O **CONTRATTO** |
| 34–40" | «È una valutazione, non un giudizio. Scrivici quando te la senti.» | QUANDO TE LA **SENTI** |

**Nota:** è il contenuto con il rapporto salvataggi/visualizzazioni più alto
prevedibile di tutto il piano. Le persone non commentano questi video — li
salvano e li mandano in privato a un'amica. Non va giudicato sulle metriche
pubbliche.

---

### PILASTRO D — StudioEVA (il piano di sopra)
*Funnel: retention e riattivazione. È il pilastro che nessuno fa e che vale più
di tutti gli altri messi insieme sul lungo periodo.*

**Perché StudioEVA è la vera arma strategica.**

Uno studio di fisioterapia ha un problema strutturale: **il successo del percorso
coincide con la fine della relazione**. Il paziente sta bene e sparisce, finché
non si fa male di nuovo — magari da qualcun altro.

StudioEVA è la risposta a questo, e non è un'idea di marketing: è già nel percorso
di cura descritto sul sito, come sesto e ultimo passo («Mantenimento»).

Ha inoltre un vantaggio che vale la pena capire bene: **è un'associazione
culturale, non un'attività sanitaria**. Il che significa che il pilastro D **non è
soggetto ai vincoli della L. 145/2018**. Su StudioEVA si può fare quello che sullo
studio clinico sarebbe vietato o rischioso: lezioni di prova, pacchetti, "porta
un'amica", sfide di trenta giorni, promozioni stagionali, contenuti leggeri.

Questo crea un **funnel a due direzioni**:

```
   PUBBLICO FREDDO DEL QUARTIERE
              │
      ┌───────┴────────┐
      ▼                ▼
  STUDIOEVA        FISIOEVA
  (non sanitario)  (clinico)
  ingresso a       ingresso ad
  basso attrito    alta intenzione
      │                │
      │  in un corso   │  a fine percorso
      │  emerge un     │  serve il
      │  dolore  ─────►│  mantenimento
      │◄───────────────┘
      ▼
  RELAZIONE CONTINUA
  (e passaparola nel quartiere)
```

Chi entra da StudioEVA per lo yoga e scopre di avere la schiena bloccata ha già lo
studio clinico al piano di sotto. Chi finisce il percorso clinico non sparisce:
sale le scale. **Lo stesso indirizzo serve due bisogni diversi della stessa
persona in due momenti diversi della sua vita.** È una cosa che quasi nessuno
struttura, ed è già costruita fisicamente in quell'edificio.

---

#### D1 — «Cosa succede dopo l'ultima seduta» *(il ponte — video chiave del pilastro)*
**Volto:** Elisa · **Durata:** 45" · **Set:** sala trattamento → le scale → piano superiore

| Tempo | Inquadratura | Testo | Caption chiave |
| --- | --- | --- | --- |
| 0–6" | Sala trattamento, lettino vuoto | «Finisci il percorso, stai bene, ci saluti. E poi, **dopo tre mesi**?» | DOPO **TRE MESI** |
| 6–16" | *stacco* | «È la parte che nessuno racconta: il dolore va via, ma **le abitudini che l'hanno creato restano**. Stessa scrivania, stessa macchina, stesse ore.» | LE ABITUDINI **RESTANO** |
| 16–26" | Sale le scale, camera che la segue | «Per questo il percorso da noi non finisce sul lettino. **Finisce di sopra.**» | FINISCE **DI SOPRA** |
| 26–38" | Piano superiore, tappetini, luce | «Qui c'è StudioEVA: posturale di gruppo, Feldenkrais, yoga, pilates. Piccoli gruppi, gente che ha fatto il tuo stesso percorso, **una volta a settimana**.» | UNA VOLTA A **SETTIMANA** |
| 38–45" | Primo piano | «Non è la palestra. È il posto dove **non torni indietro**.» | NON TORNI **INDIETRO** |

---

#### D2 — «Il piano di sopra» *(tour StudioEVA)*
**Volto:** Elisa · **Durata:** 30" · **Set:** piano superiore

Stessa grammatica di C2, ma con un'energia diversa: qui si può usare musica,
luce alta, ritmo più veloce. È lo spazio non clinico, e deve sembrarlo.

| Tempo | Cosa si vede | Voce |
| --- | --- | --- |
| 0–5" | Le scale, poi lo spazio aperto | «Sopra FisioEVA c'è un altro posto, e si chiama StudioEVA.» |
| 5–12" | Tappetini, gruppo che lavora | «Posturale di gruppo: quello che fai in seduta, mantenuto nel tempo.» |
| 12–19" | Esercizio a terra lento | «Feldenkrais: imparare a muoversi con **meno sforzo**, non con più forza.» |
| 19–25" | Yoga / pilates | «Yoga e pilates, in gruppi piccoli.» |
| 25–30" | Spazio vuoto, luce | «Non serve essere pazienti dello studio. Serve solo **volersi muovere bene**.» |

---

#### D3 — «Feldenkrais spiegato a chi non sa cos'è»
**Volto:** Elisa · **Durata:** 40" · **Set:** piano superiore, a terra

Il metodo più difficile da spiegare e quindi il più prezioso da spiegare bene:
chi lo capisce da voi lo associa a voi.

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–6" | «Feldenkrais. Nome impronunciabile, e nessuno sa cosa sia. Ci provo in **quaranta secondi**.» | IN **40 SECONDI** |
| 6–16" | «Non è ginnastica, non è yoga, non si suda. Si fa quasi tutto **a terra**, con movimenti piccolissimi, lenti, ripetuti.» | MOVIMENTI **PICCOLISSIMI** |
| 16–28" | «L'idea è questa: la maggior parte di noi si muove con **molta più fatica del necessario**, perché ha imparato così da bambino e non l'ha più rivisto. Feldenkrais riapre quel file.» | PIÙ FATICA DEL **NECESSARIO** |
| 28–36" | «Non impari un esercizio. Impari **come ti muovi** — e da lì cambia tutto il resto.» | COME TI **MUOVI** |
| 36–40" | «Al piano di sopra, a Casalotti. Le lezioni sono `[DA CONFERMARE: giorni e orari]`.» | A **CASALOTTI** |

---

#### D4 — «Porte aperte» *(il lead magnet non sanitario)*
**Volto:** Elisa + una persona del gruppo · **Durata:** 25"

Questo è l'unico video del piano che può usare una leva promozionale esplicita,
proprio perché StudioEVA non è attività sanitaria.

> «Sabato `[DATA]` apriamo il piano di sopra a chi vuole provare. Una lezione di
> posturale di gruppo, una di Feldenkrais, una di pilates. Vieni, provi, e decidi
> dopo. Non devi essere paziente dello studio, non devi essere allenato, non devi
> saper fare niente. Posti limitati perché i gruppi sono piccoli: scrivici per
> prenotare il tuo. Via di Boccea 755, Casalotti.»

**Perché è la migliore idea di acquisizione del piano:** porta nel palazzo persone
che non hanno un dolore *adesso* — cioè persone che lo studio clinico non potrebbe
mai raggiungere. Una parte di loro diventerà paziente nei dodici mesi successivi.
E l'open day genera in una mattina il materiale video per un mese.

---

## 4. La strategia di attrazione, in chiaro

### Il funnel

| Fase | Obiettivo | Pilastri | Che metriche guardare | Che CTA |
| --- | --- | --- | --- | --- |
| **Attrazione** | Farsi trovare da chi non cerca | A (sintomo), B4 | Visualizzazioni da non-follower, ritenzione a 3" | Nessuna CTA forte: solo "salva" |
| **Riconoscimento locale** | Farsi collegare al quartiere | B (quartiere) | Copertura locale, indicazioni stradali su Google | "Siamo qui" |
| **Considerazione** | Togliere le barriere | C (struttura) | Salvataggi, visite al profilo, clic sul link | "Scrivici" |
| **Conversione** | Far prenotare | C1, C3, recensioni | DM, chiamate, primi colloqui | WhatsApp |
| **Retention** | Non perdere chi è guarito | D (StudioEVA) | Iscritti ai corsi provenienti dal clinico | "Sali di sopra" |

**La regola di proporzione:** su dieci contenuti, **6 di attrazione (A+B4), 3 di
considerazione (C), 1 di conversione o StudioEVA (D)**. L'errore classico degli
studi che aprono è invertire questa proporzione: parlano di sé a chi non li
conosce ancora.

### Il piano editoriale delle prime otto settimane

Ritmo sostenibile: **3 contenuti a settimana** (2 reel + 1 carosello o post).
Meglio tre per otto settimane che sette per due settimane e poi silenzio.

| Settimana | Reel 1 | Reel 2 | Terzo contenuto |
| --- | --- | --- | --- |
| **1** — apertura | **B1** «Se abiti a Casalotti» | **C2** Tour dello studio | Carosello: le tre professioniste + orari |
| **2** | **A3** «"È cervicale"» | **C1** «Cosa succede nei primi venti minuti» | Post: Google Business Profile completo, foto interni |
| **3** | **A1** Mal di schiena stesso punto | **B3** «Perché abbiamo aperto qui» | Storie: una giornata in studio |
| **4** | **C3** «Non serve la prescrizione» | **A2** Spalla di notte | Carosello: FAQ (dalle FAQ del sito) |
| **5** | **C6** «Il neonato che non dorme» | **B2** «Come arrivare» | Post: prima recensione ricevuta |
| **6** | **A5** «Perché peggiora la sera» | **C5** «La tecar non è magia» | Carosello: le terapie strumentali |
| **7** | **C7** «La cosa di cui non parla nessuno» | **A4** Caviglia | Storie: dietro le quinte del piano di sopra |
| **8** — lancio StudioEVA | **D1** «Dopo l'ultima seduta» | **D2** Il piano di sopra | **D4** Porte aperte + D3 Feldenkrais |

Giorni consigliati: **martedì e giovedì** (reel), **sabato mattina** (terzo
contenuto). Orario di pubblicazione: **18:00–20:00**, quando la gente del
quartiere torna a casa e ha male alla schiena.

### La giornata di ripresa

Non si gira un video alla volta. **Si gira un mese alla volta.**

Un blocco di riprese ben organizzato = **mezza giornata, 8–10 script, un mese di
contenuti**. Ricetta:

1. La sera prima: stampare gli script, rileggerli ad alta voce due volte.
   Non si impara a memoria, si impara **la sequenza dei concetti** — il
   riferimento parla in modo naturale, non recitato.
2. Mattina, 9:00–13:00, luce di finestra.
3. Un set alla volta, tutti gli script che lo usano di fila.
4. Per ogni frase: **due riprese**, poi si passa avanti. La terza è sempre peggio
   della seconda.
5. Girare **sempre 5 secondi in più** all'inizio e alla fine di ogni clip: servono
   in montaggio.
6. Cambiare inquadratura (più stretta / più larga / da lato) ogni due o tre frasi:
   è così che nascono i jump cut del riferimento.

---

## 5. Oltre i video: sette idee che moltiplicano il lavoro

### 1. Google Business Profile è più importante di Instagram
Per uno studio di quartiere, **la scheda Google vale più di qualunque profilo
social**. Chi ha mal di schiena a Casalotti non apre Instagram: cerca
"fisioterapista Casalotti" su Google Maps.

Cosa fare, nell'ordine:
- Aprire e verificare la scheda **oggi** (la verifica per posta richiede giorni).
- Categoria primaria: *Fisioterapista*. Secondarie: *Osteopata*, *Centro di
  riabilitazione*.
- Caricare le foto dello shooting che sono già in `public/foto/` — quelle vere
  degli interni, non le stock.
- **Caricare i reel anche lì** come post video: lo stesso file fa due lavori.
- Chiedere le prime recensioni ai pazienti storici che vi seguono dal vecchio
  studio, nella prima settimana. Le prime dieci recensioni contano più delle
  successive cento.
- Rispondere a ogni recensione (⚠️ senza mai confermare pubblicamente che quella
  persona è stata in cura da voi: è un dato sanitario. Formula sicura:
  *«Grazie per le parole, siamo felici di esservi stati utili»*, mai
  *«siamo contenti che la sua lombalgia sia migliorata»*).

### 2. Ogni video diventa cinque contenuti
Il sito è **aperto ai crawler delle AI** (`APERTO_ALLE_AI: true`), e ha già un
`llms.txt` generato. Ma il contenuto delle pagine è renderizzato da JavaScript e i
crawler AI non lo vedono (è scritto nel README).

Questo significa che **il testo degli script video, pubblicato come testo sul
sito**, è uno degli asset più sottovalutati che avete:

```
1 script video
   ├─► Reel Instagram / TikTok
   ├─► Post video su Google Business Profile
   ├─► Storia con sondaggio ("ti ci riconosci?")
   ├─► Carosello (5 slide dallo stesso testo)
   └─► Voce nella pagina FAQ del sito → letta da Google e dalle AI
```

Il quinto è quello che nessuno fa e che porta risultati per anni. Gli script A1,
A3, C3, C5, C7 sono già scritti in forma di domanda e risposta: sono FAQ mascherate
da video.

### 3. Il muro degli attestati
Ripreso dalla sezione 2, perché è una decisione operativa e non un dettaglio
scenografico. Tre lauree con lode, EDUCAM, CERDO, UniCamillus, master Souchard,
Maitland, Upledger, CONI. **Va incorniciato e appeso in una parete che diventa uno
dei quattro set fissi.** Nel video di riferimento quella parete lavora in ogni
inquadratura in cui compare, senza che nessuno la nomini.

### 4. Alleanze di quartiere
Il modo più veloce per esistere in un quartiere è farsi presentare da chi ci è già
dentro. Quattro tavoli da aprire nei primi due mesi:

- **Società sportive giovanili della zona** — calcio, pallavolo, basket. Offrire
  una serata gratuita ai genitori su "come si gestisce un infortunio del ragazzo".
  Veronica ha la formazione CONI: è esattamente il suo terreno.
- **Palestre e box di crossfit** — sono la fonte numero uno di tendiniti di spalla
  e gomito. Non sono concorrenti, sono **canali**.
- **Farmacie di via di Boccea** — chi ha mal di schiena entra in farmacia prima di
  cercare un fisioterapista. Un accordo di segnalazione vale più di un mese di
  pubblicità.
- **Consultori, ostetriche, asili nido e corsi preparto** — per i pilastri C6
  (neonatale) e C7 (donna). È il canale con il tasso di conversione più alto in
  assoluto perché arriva con la fiducia già costruita.

### 5. La serie «Risposte» per le storie
Una domanda al giorno nella casella domande delle storie, una risposta in video di
15 secondi. Costa cinque minuti, tiene il profilo vivo nei giorni senza reel, e
**genera il piano editoriale del mese successivo**: le domande che la gente fa
davvero sono i prossimi script del pilastro A.

### 6. Il video-testimonianza, fatto in modo legale
Le testimonianze convertono più di qualunque altro contenuto. Ma un paziente che
dice in video di essere stato in cura da voi sta rivelando **un dato relativo alla
salute** (art. 9 GDPR).

Si può fare, ma solo così:
- **consenso scritto e specifico** per la pubblicazione video, separato dal
  consenso al trattamento sanitario, revocabile;
- la persona parla del **percorso e dell'esperienza**, non della diagnosi;
- nessuna promessa di risultato nel montaggio ("in tre sedute sono guarita" non va
  pubblicato nemmeno se l'ha detto il paziente spontaneamente — è pubblicità
  sanitaria ingannevole anche se è vera).

Alternativa a rischio zero, già disponibile: **le quattro recensioni scritte già
presenti in `site.ts`**, trasformate in caroselli o in testo a schermo letto da una
voce fuori campo.

### 7. Trattare StudioEVA come un brand suo
Questa è l'idea più a lungo termine. **StudioEVA merita un profilo Instagram
separato**, non una sezione dentro quello di FisioEVA. Motivi:

- Parla a un pubblico diverso (gente che sta bene e vuole muoversi) con un tono
  diverso (leggero, sociale, non clinico).
- Non è soggetto ai vincoli della pubblicità sanitaria: può fare promozioni,
  sfide, contenuti divertenti che su FisioEVA sarebbero fuori luogo o vietati.
- I due profili si rilanciano a vicenda: ogni reel di StudioEVA porta pubblico
  freddo nel palazzo, ogni percorso clinico concluso porta un iscritto a
  StudioEVA.
- Se un domani i corsi crescono, hanno già un'identità propria su cui poggiare.

---

## 6. Come si capisce se sta funzionando

Niente pixel, niente Analytics: il sito oggi non ha strumenti di tracciamento
attivi ed è **la ragione per cui non serve il banner cookie** (è scritto nel
README). Aggiungerli non è vietato, ma costa un banner con consenso preventivo e
granulare. Per ora si misura senza.

**La metrica che conta più di tutte, e costa zero:** in segreteria, a ogni
primo colloquio, una domanda sola —

> «Posso chiederle come ci ha conosciuti?»

Segnata su un foglio, per otto settimane. Vale più di qualunque dashboard.

Le altre, per ordine di importanza reale:

| Metrica | Dove | Perché conta |
| --- | --- | --- |
| Primi colloqui prenotati / settimana | Agenda | È l'unico numero che paga l'affitto |
| Richieste di indicazioni stradali | Google Business Profile | Intenzione altissima: sta venendo |
| DM ricevuti dopo un reel | Instagram | Il vero risultato del pilastro A |
| Salvataggi | Instagram | Segnale di "mi serve, ci torno". Sui pilastri C e D è più importante dei like |
| Ritenzione a 3 secondi | Instagram/TikTok | Sotto il 60%: il gancio non funziona, riscrivere i primi 5 secondi |
| Visualizzazioni da non-follower | Instagram | Sotto il 50%: stai parlando a chi ti conosce già, cioè non stai attraendo |

**Come si legge un reel andato male:** non si guardano i like. Si guarda dove
scende la ritenzione. Se scende nei primi 3 secondi il problema è il gancio; se
scende a metà il problema è che la parte del "meccanismo" è troppo lunga o troppo
tecnica; se arriva in fondo ma non genera DM il problema è la CTA.

---

## 7. Cosa serve decidere prima di girare

| # | Decisione | Perché blocca | Chi decide |
| --- | --- | --- | --- |
| 1 | **Destinazione della CTA** (WhatsApp Business) | Senza questa, ogni video perde i contatti che genera | Studio |
| 2 | **Parcheggio**: c'è, dove, quanto | Serve per B2 ed è una delle prime domande reali di chi arriva in auto | Studio |
| 3 | **Linee e fermata dei mezzi** davanti allo studio | Serve per B2 | Studio |
| 4 | **Giorni e orari dei corsi StudioEVA** | Serve per D3 e D4 | StudioEVA |
| 5 | **Data dell'open day** (pilastro D4) | È il lead magnet della settimana 8 | Studio + StudioEVA |
| 6 | **Microfono lavalier** | È l'unico acquisto obbligatorio | Studio |
| 7 | **Parete degli attestati** allestita | È il set che costruisce autorevolezza in ogni inquadratura | Studio |
| 8 | **Scheda Google Business Profile** aperta e verificata | La verifica richiede giorni: va avviata subito | Studio |

---

## 8. Riepilogo degli script

| ID | Titolo | Pilastro | Durata | Volto | Funnel |
| --- | --- | --- | --- | --- | --- |
| A1 | Il mal di schiena che torna sempre nello stesso punto | Sintomo | 40" | Veronica | Attrazione |
| A2 | La spalla che fa male di notte | Sintomo | 35" | Veronica | Attrazione |
| A3 | «È cervicale» | Sintomo | 42" | Elisa | Attrazione |
| A4 | La caviglia storta sei mesi fa | Sintomo | 35" | Veronica | Attrazione |
| A5 | Perché il dolore peggiora la sera | Sintomo | 20" | Elisa | Attrazione |
| B1 | Se abiti a Casalotti | Quartiere | 18" | Tutte | Locale |
| B2 | Come arrivare | Quartiere | 25" | Segreteria | Locale |
| B3 | Perché abbiamo aperto proprio qui | Quartiere | 50" | Tutte | Identità |
| B4 | Le cose che vediamo di più a Casalotti | Quartiere | 40" | Veronica | Attrazione + locale |
| C1 | Cosa succede nei primi venti minuti | Struttura | 45" | Azzurra | Conversione |
| C2 | Tour dello studio in trenta secondi | Struttura | 30" | Elisa (v.f.c.) | Considerazione |
| C3 | Non serve la prescrizione del medico | Struttura | 22" | Elisa | Conversione |
| C4 | Siamo in tre | Struttura | 40" | Tutte | Considerazione |
| C5 | La tecar non è una bacchetta magica | Struttura | 35" | Veronica | Autorevolezza |
| C6 | Il neonato che non dorme | Servizi | 40" | Azzurra | Attrazione (mamme) |
| C7 | La cosa di cui non parla nessuno | Servizi | 40" | Veronica | Attrazione (donne) |
| D1 | Cosa succede dopo l'ultima seduta | StudioEVA | 45" | Elisa | Retention |
| D2 | Il piano di sopra | StudioEVA | 30" | Elisa | Retention |
| D3 | Feldenkrais spiegato a chi non sa cos'è | StudioEVA | 40" | Elisa | Considerazione |
| D4 | Porte aperte | StudioEVA | 25" | Elisa + gruppo | Acquisizione |

**Totale: 20 script, circa 12 minuti di girato finale, producibili in due mezze
giornate di riprese.**
