# Strategia di comunicazione — FisioEVA

Documento di lavoro per la produzione video e la strategia di attrazione.
Costruito sui dati reali del sito (`src/data/site.ts`) e sull'analisi del video
di riferimento fornito. Dove serve una decisione dello studio c'è un segnaposto
esplicito `[DA CONFERMARE: ...]`.

**Revisione 2** — riscritto dopo il confronto con lo studio. I vincoli reali
hanno cambiato l'impostazione: vedi la sezione 1.

---

## 1. I vincoli reali, e come cambiano il piano

La prima versione di questo documento era un piano di lancio con un pilastro
dedicato al quartiere, girato in esterni. Non regge il contatto con la realtà
dello studio. Ecco cosa è cambiato.

| Vincolo | Conseguenza sul piano |
| --- | --- |
| **Casalotti non è visivamente riconoscibile.** Non è Garbatella, non ha scorci identitari | Il quartiere smette di essere un pilastro con video dedicati. Diventa uno **strato trasversale**: si comunica con le parole, non con le immagini |
| **Girare in esterni è difficile** (tempo, organizzazione) | Tutto si gira **dentro lo studio**. Nessuno script richiede riprese fuori |
| **Niente toni da inaugurazione** | Nessun contenuto "abbiamo aperto", "vi aspettiamo il giorno x". Il tono è quello di uno studio **già avviato che comunica il proprio lavoro** |
| **StudioEVA non è pronto** | Il piano superiore non si riprende. Il pilastro StudioEVA esiste **solo come strategia da preparare**, con gli script pronti per quando lo spazio sarà finito |
| **La scheda Google esiste già**, va solo verificata | Non è un'attività da avviare ma da completare. Resta la priorità operativa più alta fuori dai social |

**Il principio che tiene insieme la revisione:** il contenuto non deve *mostrare*
Casalotti, deve **rivendicarla**. Un video girato in una sala trattamento che
dice «qui a Casalotti la maggior parte delle schiene che vediamo sono schiene di
pendolari» posiziona lo studio nel quartiere molto più di dieci secondi di
riprese di via di Boccea.

---

## 2. Il funnel di contatto sul sito: diagnosi

Prima di portare traffico con i video va capito dove finisce quel traffico.
Questa è la lettura riga per riga del codice.

### Cosa funziona già

| Elemento | File | Cosa fa | Giudizio |
| --- | --- | --- | --- |
| Telefono | `Contatti.tsx:107`, `CtaBand.tsx:59`, `Footer.tsx` | `tel:+393929605972` — apre il dialer del telefono | ✅ Ottimo, zero attrito |
| **Form contatti** | `Contatti.tsx:27-44` | Compone una mail **già precompilata**: oggetto, nome, email, telefono, trattamento scelto e messaggio | ✅ Fa già la cosa giusta |
| Consenso privacy separato | `Contatti.tsx` | Checkbox esplicita e non pre-spuntata, con riferimento ai dati sulla salute | ✅ Corretto ex art. 9 GDPR |

Il form **è già precompilato**. Questa parte non va toccata.

### Cosa non funziona

| # | Problema | Dove | Perché costa contatti |
| --- | --- | --- | --- |
| 1 | **WhatsApp non esiste sul sito** | Nessun `wa.me` in tutto il progetto | Lo studio ha WhatsApp attivo e funzionante, ma chi visita il sito non può usarlo. È il canale che le persone preferiscono, ed è assente |
| 2 | **Tre `mailto:` nudi** | `Navbar.tsx:225`, `Footer.tsx:62`, `CtaBand.tsx:55` | Aprono una mail **vuota**: l'utente deve scrivere da zero, e molti rinunciano. Il form è precompilato, questi tre no |
| 3 | **Doppio invio** | `Contatti.tsx:41` | Compili il form → si apre il client di posta → devi premere invia **una seconda volta**. Chi non lo capisce crede di aver già scritto |
| 4 | **Silenzio su desktop senza client** | `window.location.href = mailto:` | Chi usa Gmail dal browser preme "Invia la richiesta" e **non vede succedere nulla**. Nessun errore, nessuna spiegazione |
| 5 | **Nessuna traccia lato studio** | Non c'è backend — è una scelta dichiarata | Se l'utente non preme invia nel suo client, la richiesta sparisce e **nessuno sa che è esistita**. Non è misurabile il tasso di abbandono |

### Le correzioni, in ordine di impatto

**1. WhatsApp precompilato** — l'intervento con il rapporto valore/sforzo più alto.

```
https://wa.me/393929605972?text=<messaggio precompilato>
```

Con testo diverso a seconda del punto di partenza, così in segreteria si capisce
da dove arriva il contatto senza installare alcun tracciamento (e quindi senza
dover aggiungere il banner cookie che oggi il sito non ha bisogno di avere):

| Punto del sito | Testo precompilato |
| --- | --- |
| Fascia CTA di chiusura | «Ciao FisioEVA, ho visto il sito e vorrei prenotare una prima valutazione.» |
| Scheda di un trattamento | «Ciao FisioEVA, vorrei informazioni su [nome del trattamento].» |
| Pagina contatti | «Ciao FisioEVA, vorrei fissare un appuntamento.» |
| Bio Instagram / link dei video | «Ciao FisioEVA, arrivo da Instagram.» |

**2. Sul form: WhatsApp come alternativa alla mail.** Un secondo bottone accanto
a "Invia la richiesta" — *«Preferisci WhatsApp?»* — che manda **lo stesso
contenuto compilato** su WhatsApp invece che via mail. Risolve in un colpo solo
il doppio invio (3), il silenzio su desktop (4) e il canale mancante (1).

**3. Precompilare i tre `mailto:` nudi** con oggetto e corpo, come fa già il
form. Tre righe di codice.

**4. Messaggio di conferma dopo il submit:** *«Si sta aprendo il tuo programma di
posta. Non si apre? Scrivici su WhatsApp»* + link. Copre il caso in cui non
succede niente e l'utente resta a fissare lo schermo.

> Il numero di WhatsApp è quello **dello studio**, non i cellulari delle
> professioniste: è già la regola scritta nelle FAQ del sito e nei commenti del
> codice.

---

## 3. Casalotti senza riprendere Casalotti

Il posizionamento geografico si può costruire per intero **dall'interno dello
studio**. Tre meccanismi, in ordine di forza.

### Meccanismo 1 — Il quartiere come contesto clinico

È il più potente e nessuno lo usa. Invece di mostrare le strade, si parla **dei
corpi di chi ci abita**. Il riferimento geografico sta nel contenuto, non
nell'immagine.

> «Qui a Casalotti la gente sta in macchina un'ora e mezza al giorno per andare a
> lavorare. Poi si stupisce che la schiena tiri.»

Una frase come questa, detta davanti a un lettino, colloca lo studio nel
quartiere meglio di qualunque ripresa di via di Boccea — **e non è copiabile** da
un account nazionale di fisioterapia, perché richiede di conoscere davvero chi
vive lì.

Da riempire con l'osservazione reale dello studio nei primi mesi: chi sono i
pazienti di Casalotti, che lavori fanno, che corpi portano dentro.

### Meccanismo 2 — La formula di chiusura ricorrente

Una frase fissa, ripetuta in coda a ogni video. La ripetizione è il punto:
dopo venti video quella frase è diventata la definizione dello studio.

**La formula proposta:**

> «A Casalotti, fisioterapia, osteopatia e terapie strumentali **nello stesso
> studio**. Senza attraversare Roma, senza cambiare posto a metà percorso.»

**Perché non «l'unico centro a Casalotti che…»** — ed è una questione seria, non
di stile. Un'affermazione di primato («l'unico», «il migliore», «il più
completo») su un professionista sanitario è considerata elemento promozionale
dalla L. 145/2018, va dimostrata ed è contestabile da chiunque, incluso un
collega del quartiere.

La forza di posizionamento si conserva interamente riformulandola come
**descrizione di fatto**: il confronto lo fa chi ascolta, e non è attaccabile.

| ❌ Rischioso | ✅ Equivalente e sicuro |
| --- | --- |
| «L'unico centro a Casalotti con un servizio completo» | «A Casalotti, dalla valutazione al mantenimento, in un posto solo» |
| «Il miglior studio della zona» | «Tre professioniste, quattro percorsi, un unico indirizzo» |
| «Risolviamo il tuo mal di schiena» | «Il primo passo è capire da dove arriva» |
| «Siamo i più attrezzati» | «Tecar, laser ad alta potenza, ultrasuoni, magnetoterapia: dentro il percorso, mai al posto delle mani» |

### Meccanismo 3 — Il quartiere nei metadati

Qui Casalotti lavora gratis, senza costare un secondo di girato:

- **"Casalotti" pronunciata a voce** almeno una volta per video: le piattaforme
  trascrivono l'audio, e quella parola detta è un segnale geografico che il testo
  sovraimpresso non dà;
- nome del profilo Instagram: `FisioEVA · Fisioterapia e Osteopatia — Casalotti, Roma`;
- geotag su ogni post;
- prima riga della descrizione, non l'ultima;
- scheda Google Business Profile (vedi sezione 7).

### `[DA CONFERMARE]` — i differenziatori concreti

Il posizionamento regge se dietro la formula ci sono fatti verificabili. Vanno
confermati, e poi detti in ogni occasione:

- **Stanze private?** Molti studi lavorano in box separati da tende. Se FisioEVA
  ha stanze vere e chiuse, è un differenziatore forte, concreto e dicibile senza
  alcun rischio normativo. Non è ancora scritto da nessuna parte sul sito.
- **Quante sale, quanti lettini.**
- **Orario continuato 8–20 e sabato mattina** — è già sul sito ed è un vantaggio
  reale per chi lavora. Va detto molto più spesso.
- **Parcheggio** — resta `<DatoMancante>` nel sito. In una zona dove si arriva in
  auto è una delle prime tre domande reali.

---

## 4. Il video di riferimento, decodificato

### Lo script originale (trascritto dalle caption)

> «Anche tu a fine giornata senti il collo rigido? Magari fai fatica a girare il
> capo, o senti una tensione che [sale] lungo la testa. Spesso la cervicale
> [viene sotto]carico molte ore… Le cause possono essere sedentarietà, lavoro, o
> abitudini sbagliate. Quando una zona lavora a lungo senza recuperare, col tempo
> tollera sempre meno il carico e inizia a dare [fastidio]. Prima non è colpa né
> del cambio stagione né del cuscino, ma è un accumulo. Se vuoi risolvere questo
> problema scrivimi in DM.»

38", verticale 9:16, 30 fps.

### La struttura narrativa, in cinque battute

1. **Riconoscimento** (0–5") — una domanda su un sintomo che chi guarda ha
   *adesso*. Mai "sapevi che", mai "oggi parliamo di".
2. **Specificazione** (5–12") — due o tre varianti del sintomo, per catturare
   anche chi al primo gancio non si è riconosciuto.
3. **Causa** (12–18") — un elenco breve e banale. Niente tecnicismi.
4. **Meccanismo** (18–28") — la frase che fa il lavoro vero: *una zona che lavora
   a lungo senza recuperare col tempo tollera sempre meno il carico*. È qui che
   chi guarda impara qualcosa e decide che chi parla sa quello che dice.
5. **Reframe + CTA** (28–38") — smonta la spiegazione sbagliata che la persona si
   era data («il cambio stagione», «il cuscino») e la sostituisce con la tua
   («un accumulo»).

**La battuta 5 è il motore di tutto.** Non stai informando: stai **sostituendo
una spiegazione**. Chi accetta la tua spiegazione ha già accettato che la
soluzione passi da te. Ogni script di questo documento ha una battuta 5.

### Le cinque scelte tecniche

| Scelta | Dettaglio osservato | Perché conta |
| --- | --- | --- |
| **Jump cut continui** | Stacco ogni 2–4 secondi, stesso soggetto, stessa divisa | Azzera i tempi morti. Il cervello non ha tempo di annoiarsi |
| **Quattro set nella stessa stanza** | scheletro e finestra / muro degli attestati / scrivania col portatile / sala col lettino | Sembrano quattro video montati insieme. Girati in mezz'ora |
| **Caption karaoke** | Maiuscolo, sans bold, 2–4 parole per schermata, **una parola chiave colorata** | L'80% guarda senza audio. La parola colorata è quella che deve restare |
| **Lavalier a vista** | Clip nero sulla casacca, visibile in ogni inquadratura | Non è un errore: è un segnale di professionalità, e soprattutto è la ragione per cui l'audio è pulito |
| **Divisa con logo e nome ricamato** | Casacca navy, logo tondo, nome in corsivo | Riconoscibilità e autorevolezza in un fotogramma, senza dire una parola |

**Quello che NON fa**, e che va copiato per sottrazione: niente musica sotto la
voce, niente sigla, niente logo in apertura, niente "ciao ragazzi", niente testo
sul viso, niente transizioni animate.

---

## 5. Specifica fotografica

### Camera
- Telefono recente, **obiettivo principale** (mai il grandangolo: deforma il viso
  e svuota la stanza). 4K 30 fps, o 1080p 30.
- **Blocca esposizione e messa a fuoco** prima di registrare (tocca e tieni
  premuto sul viso): senza blocco l'immagine "pompa" a ogni gesto.
- Treppiede, **lente all'altezza degli occhi**. Mai dal basso.
- Mezzo busto, occhi sul terzo superiore, poco spazio sopra la testa. **Le mani
  devono entrare in inquadratura**: nel riferimento gesticola in continuazione ed
  è metà della sua presenza.

### Luce
- **Luce naturale, sempre.** Il riferimento non usa nemmeno un ring light.
- Finestra **davanti al soggetto a 45°**, mai alle spalle.
- Finestra di ripresa: **9:00–12:00**.
- Stanza troppo buia → si cambia stanza, non si accende una lampada.

### Audio
- **Microfono lavalier a clip.** Unica spesa obbligatoria (40–80 €). Conta più
  della camera: si perdona un video sgranato, non un audio con l'eco.

### I quattro set, tutti già dentro lo studio
Dalle foto dello shooting in `public/foto/`:

1. **Sala trattamento con lettino e laser** — luce di finestra, profondità.
2. **Tecar Fisiowarm / touchscreen** — il set "tecnologia".
3. **Reception** — il set "accoglienza", per i video di struttura e di identità.
4. **Parete degli attestati** — ⚠️ **da allestire**, vedi sotto.

### La parete degli attestati
Nel video di riferimento gli attestati incorniciati alle spalle fanno un lavoro
enorme: dicono «questo posto è serio» senza che nessuno lo affermi. Non vengono
mai nominati né inquadrati apposta — stanno lì, sfocati.

FisioEVA ha tre lauree (due con lode), EDUCAM, CERDO, UniCamillus, master
Souchard, Maitland, Upledger, un periodo di formazione al CONI. **È materiale che
oggi sta in un cassetto.**

Azione: stampare, incorniciare, appendere su una parete che diventi uno dei
quattro set fissi. È arredamento al servizio della comunicazione — non c'entra
col sito, dove quei titoli sono già scritti nelle bio del team. È anche il
vantaggio competitivo più difficile da imitare per chiunque altro nella zona.

### Montaggio
- Stacco ogni **2,5–4 secondi**. Cambio di set ogni **8–12 secondi**.
- Tagliare ogni respiro, ogni "ehm", ogni pausa.
- Caption maiuscole, sans bold, **2–4 parole per schermata**, una parola chiave
  nel colore del brand, posizionate al **70–75% dell'altezza** (sopra la UI di
  Instagram).
- Colore caldo, incarnato naturale, ombre leggermente alzate, saturazione −5.
  Nessuna LUT fredda.
- **Primo fotogramma: il viso che parla.** Mai il logo.

### Chi sta davanti alla camera
Il riferimento ha **un volto solo**: la riconoscibilità si costruisce sulla
ripetizione della stessa faccia. FisioEVA ne ha tre. Soluzione: **un volto per
area**, coerente con le competenze reali.

| Volto | Area | Perché (dalle bio reali) |
| --- | --- | --- |
| **Azzurra De Angelis** | Donna, gravidanza, post-parto, cicatrice da cesareo, linfodrenaggio | Tesi di osteopatia sul trattamento della cicatrice da taglio cesareo; specializzazione in linfodrenaggio |
| **Elisa De Rubeis** | Postura, movimento, consapevolezza corporea | RPG Souchard, Maitland, Feldenkrais (terzo anno), C.A.M., Pilates sulla colonna |
| **Veronica Mirarchi** | Sport, infortuni, pavimento pelvico | Formazione al CONI con atleti internazionali; tesi su pavimento pelvico ed endometriosi |

I video di identità si girano **tutte e tre insieme**.

---

## 6. Gli script

Convenzioni: `[…]` = regia; **grassetto** = parola chiave da colorare nella
caption. **Tutti girabili all'interno dello studio.**

### ⚠️ Vincoli di scrittura — non negoziabili

- **Mai promesse di guarigione** (L. 145/2018): *può aiutare*, *si lavora su*,
  *l'obiettivo del percorso è*. Mai *risolviamo*, *guarisci*, *ti tolgo il
  dolore*. ⚠️ **Il video di riferimento sfora**: «se vuoi risolvere questo
  problema» è a rischio per un sanitario italiano. La versione FisioEVA della
  stessa CTA: *«se ti ci sei riconosciuto, scrivici: il primo passo è capire da
  dove arriva»*.
- **Mai affermazioni di primato**: niente *unico*, *migliore*, *più completo*.
  Vedi la tabella nella sezione 3.
- **Mai "gratis"**: si dice *primo colloquio*, *prima valutazione*.
- **Mai "medici" o "équipe medica"**: sono fisioterapiste e osteopate.
- **Nessun paziente ripreso senza consenso scritto specifico**: un video che
  mostra una persona in trattamento rivela che sta ricevendo cure — dato
  sanitario ex art. 9 GDPR.

---

### PILASTRO A — Sintomo
*Il motore dell'attrazione. Parla a chi non ti conosce e non ti sta cercando.
Replica esatta del format di riferimento.*

---

#### A1 — «Il mal di schiena che torna sempre nello stesso punto»
**Volto:** Veronica · **40"** · **Set:** lettino → attestati → reception

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–4" | «Ti fa male la schiena sempre **nello stesso punto**, e ogni volta pensi che sia passata?» | STESSO **PUNTO** |
| 4–10" | «Magari sparisce per due settimane. Poi ti chini a prendere una cosa da terra e **torna**.» | E POI **TORNA** |
| 10–17" | «Quando un dolore va e viene nello stesso identico posto, quasi mai il problema **è lì**.» | QUASI MAI **È LÌ** |
| 17–28" | «Quel punto è dove il corpo **scarica**. La causa di solito è più in basso o più in alto: un'anca che non ruota, un piede che appoggia male, un addome che non tiene.» | DOVE IL CORPO **SCARICA** |
| 28–34" | «Ecco perché l'antinfiammatorio funziona per tre giorni: spegne il sintomo, **non sposta il carico**.» | NON SPOSTA IL **CARICO** |
| 34–40" | «Se ti ci sei riconosciuto, scrivici. Siamo a **Casalotti**: il primo passo è capire da dove arriva.» | DA DOVE **ARRIVA** |

---

#### A2 — «La spalla che fa male di notte»
**Volto:** Veronica · **35"** · **Set:** finestra → laser → scrivania

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–5" | «Ti sei mai svegliato perché non riuscivi a stare **sul fianco**?» | SUL **FIANCO** |
| 5–11" | «Di giorno quasi niente. Alzi il braccio, prendi una cosa dall'alto, una fitta. E poi **la notte**.» | E POI LA **NOTTE** |
| 11–20" | «La spalla è l'articolazione **più mobile** del corpo, e per esserlo rinuncia a stabilità. Chi la tiene ferma sono i muscoli, non le ossa.» | PIÙ **MOBILE** |
| 20–29" | «Quando quei muscoli si affaticano, lo spazio dove scorre il tendine **si riduce**. Da sdraiato si chiude ancora di più: per questo fa male di notte e non di giorno.» | LO SPAZIO **SI RIDUCE** |
| 29–35" | «Non è una cosa che passa aspettando. Scrivici e la **guardiamo insieme**.» | GUARDIAMO **INSIEME** |

---

#### A3 — «"È cervicale"» *(il reframe più forte del pilastro)*
**Volto:** Elisa · **42"** · **Set:** attestati → lettino → reception

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–5" | «"Ho la **cervicale**." Te lo sei detto anche tu, vero?» | HO LA **CERVICALE** |
| 5–12" | «Il problema è che *cervicale* **non è una diagnosi**. È un pezzo del corpo. È come dire "ho il ginocchio".» | NON È UNA **DIAGNOSI** |
| 12–22" | «Sotto quella parola ci stanno cose diverse: una tensione da postura, un'articolazione che ha perso movimento, un nervo irritato, **una mandibola che stringe di notte**.» | UNA MANDIBOLA CHE **STRINGE** |
| 22–32" | «Si trattano in modi diversi. Ed è il motivo per cui magari hai già fatto dieci sedute di massaggi **senza cambiare niente**: si stava lavorando sul posto giusto per il problema sbagliato.» | POSTO GIUSTO, PROBLEMA **SBAGLIATO** |
| 32–42" | «Il primo passo è **capire quale delle quattro è la tua**. Una ventina di minuti di colloquio e valutazione, poi si decide insieme. A Casalotti, via di Boccea 755.» | QUALE DELLE **QUATTRO** |

**Nota:** potenziale di salvataggio più alto del pilastro. "Cervicale" è la parola
con cui metà del quartiere descrive il proprio dolore; smontarla posiziona lo
studio come quello *che sa distinguere*.

---

#### A4 — «La caviglia che hai storto sei mesi fa»
**Volto:** Veronica · **35"** · **Set:** tavoletta propriocettiva → lettino

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–5" | «Hai storto la caviglia mesi fa, non fa più male, ma **non è tornata come prima**?» | NON COME **PRIMA** |
| 5–12" | «Corri e senti che "non è sicura". Sul terreno irregolare **stai attento**. Magari l'hai già storta una seconda volta.» | STAI **ATTENTO** |
| 12–24" | «Quando ti distorci non si rompe solo il legamento: si perdono i **recettori** che dicono al cervello dov'è il piede nello spazio. Il gonfiore passa da solo. Quelli **no**.» | I RECETTORI **NO** |
| 24–31" | «Vanno riallenati. È un lavoro di equilibrio, noioso, e dura poche settimane — ma è la differenza tra una distorsione e **tre**.» | TRA UNA E **TRE** |
| 31–35" | «Se te la porti dietro da mesi, scrivici.» | SCRIVICI |

---

#### A5 — «Perché il dolore peggiora la sera» *(corto, 20")*
**Volto:** Elisa · **Set:** finestra, inquadratura unica con 3 jump cut

> «Il dolore ti sembra peggiore la sera? Non è un'impressione. Durante il giorno
> accumuli **carico**, e più vai avanti più i tessuti tollerano meno. È lo stesso
> motivo per cui a fine settimana stai peggio che il lunedì. Se succede tutti i
> giorni non è **stanchezza**: è un carico che non stai smaltendo.»

---

#### A6 — «Le tre cose che vediamo di più qui» *(il modello del nuovo approccio)*
**Volto:** Veronica · **40"** · **Set:** scrivania + lettino

Il video che esiste solo perché lo studio è **in quel** quartiere: nessun account
nazionale può copiarlo. Da riscrivere sui dati veri dopo i primi mesi.

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–5" | «Vi dico le tre cose che vediamo **più spesso** qui a Casalotti.» | PIÙ **SPESSO** |
| 5–15" | «Uno: **schiene da pendolari**. Qui la gente sta in macchina un'ora e mezza al giorno per andare a lavorare, e poi si stupisce che la schiena tiri.» | SCHIENE DA **PENDOLARI** |
| 15–26" | «Due: **spalle e gomiti da palestra**. Ci sono un sacco di persone che si allenano, e quasi nessuno che si scalda. Le tendiniti arrivano da lì, non dal peso.» | NON DAL **PESO** |
| 26–35" | «Tre: **mamme con la schiena distrutta**. Bambini in braccio, passeggino, scale. È un carico vero e nessuno lo chiama così.» | UN CARICO **VERO** |
| 35–40" | «Se sei in una di queste tre, sai già dove siamo.» | SAI DOVE **SIAMO** |

---

### PILASTRO B — Metodo e struttura
*Considerazione. Parla a chi ti ha già visto e sta valutando se entrare. Converte
poco da solo, ma senza questo pilastro il pilastro A non converte affatto.*

---

#### B1 — «Cosa succede nei primi venti minuti» *(il video anti-attrito)*
**Volto:** Azzurra · **45"** · **Set:** reception → sala valutazione → lettino

La ragione numero uno per cui una persona con dolore non prenota non è il prezzo:
è **non sapere cosa succede quando entra**.

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–5" | «Non sai cosa succede quando entri in uno studio di fisioterapia? Te lo faccio vedere.» | TE LO FACCIO **VEDERE** |
| 5–12" | «Il primo appuntamento **non è un trattamento**. È un colloquio, dura una ventina di minuti, e serve a capire.» | NON È UN **TRATTAMENTO** |
| 12–21" | «Prima ti ascoltiamo: da quanto ce l'hai, quando peggiora, cosa hai già provato, che lavoro fai. Le informazioni utili stanno quasi sempre **in quello che racconti**.» | IN QUELLO CHE **RACCONTI** |
| 21–31" | «Poi guardiamo come stai in piedi e come ti muovi. Non serve la **prescrizione del medico**, e non serve portare per forza risonanze: se ce l'hai, portale.» | NON SERVE LA **PRESCRIZIONE** |
| 31–40" | «Alla fine ti diciamo cosa abbiamo trovato e **quante sedute pensiamo servano**. Realisticamente. Poi decidi tu.» | POI **DECIDI TU** |
| 40–45" | «Zero sorprese. Scrivici quando vuoi.» | ZERO **SORPRESE** |

---

#### B2 — «Tour dello studio in trenta secondi»
**Volto:** voce fuori campo (Elisa) · **30"** · Un'unica camminata montata a stacchi

| Tempo | Cosa si vede | Voce | Caption chiave |
| --- | --- | --- | --- |
| 0–4" | La porta che si apre, reception | «Questo è FisioEVA, a Casalotti.» | FISIO**EVA** |
| 4–10" | Sale trattamento, lettini | «Le sale per i trattamenti manuali e l'osteopatia. `[DA CONFERMARE: se sono stanze private e chiuse, dirlo qui — è un differenziatore vero]`» | |
| 10–17" | Tecar Fisiowarm, laser | «La tecar e il laser ad alta potenza, che usiamo **dentro un percorso**, mai al posto delle mani.» | MAI AL **POSTO** |
| 17–24" | Tavolette, foam roller, spazio esercizio | «Lo spazio per la rieducazione e il lavoro sul movimento.» | SUL **MOVIMENTO** |
| 24–30" | Reception, luce | «Dalla valutazione al percorso completo, **in un posto solo**. A Casalotti.» | IN UN POSTO **SOLO** |

---

#### B3 — «Non serve la prescrizione del medico» *(corto, 22")*
**Volto:** Elisa · **Set:** attestati, inquadratura unica

> «"Devo prima passare dal medico?" È la domanda che ci fanno di più. **No.** Per
> una valutazione fisioterapica o osteopatica non serve una prescrizione: puoi
> prenotare direttamente. Se durante la valutazione emerge qualcosa che **non è
> di nostra competenza**, te lo diciamo e ti indirizziamo. Ma per iniziare a
> capire cos'hai, basta prendere un appuntamento.»

**Perché conta:** è una barriera d'ingresso pura. **Ogni FAQ del sito è un
potenziale reel**: sono già scritte, già approvate, già nel tono giusto.

---

#### B4 — «La tecar non è una bacchetta magica» *(anti-hype, alta credibilità)*
**Volto:** Veronica · **35"** · **Set:** tecar Fisiowarm

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–5" | «Se qualcuno ti promette che risolvi con **dieci sedute di tecar**, fatti qualche domanda.» | QUALCHE **DOMANDA** |
| 5–15" | «La tecar porta calore in profondità nel tessuto. Aiuta il **ricambio**, riduce la sensazione di dolore, rende il tessuto più lavorabile. Ma non insegna a un'anca a ruotare, e non rinforza niente.» | NON **RINFORZA** |
| 15–25" | «Serve a **preparare il terreno** per il lavoro vero, che è manuale e di movimento. Da sola, quando smetti, torni al punto di partenza.» | PREPARARE IL **TERRENO** |
| 25–35" | «Da noi le terapie strumentali entrano nel percorso quando servono, per il tempo che serve. **Mai al posto delle mani.**» | MAI AL **POSTO** |

**Nota strategica:** dire cosa *non* fa uno strumento che avete comprato è il
contenuto più controintuitivo e più efficace del piano. Costruisce la fiducia che
fa prenotare i percorsi lunghi — quelli che tengono in piedi lo studio.

---

#### B5 — «Perché non ti diciamo quante sedute servono al telefono»
**Volto:** Azzurra · **30"** · **Set:** reception

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–5" | «"Quante sedute mi servono?" Al telefono non te lo diciamo, e ti spiego perché.» | AL **TELEFONO NO** |
| 5–16" | «Due persone con lo stesso identico mal di schiena possono avere due cause diverse e due percorsi diversi. Chi ti dà un numero **prima di averti visto** sta tirando a indovinare.» | PRIMA DI **AVERTI VISTO** |
| 16–26" | «Dopo la valutazione te lo diciamo, realisticamente, e lo **aggiorniamo strada facendo** in base a come rispondi.» | STRADA **FACENDO** |
| 26–30" | «È meno comodo da sentire, ma è l'unica risposta onesta.» | L'UNICA RISPOSTA **ONESTA** |

---

### PILASTRO C — Aree specialistiche
*Attrazione mirata. Ogni video parla a un pubblico preciso e converte molto più
del pilastro A, su volumi più piccoli.*

---

#### C1 — «Il neonato che non dorme»
**Volto:** Azzurra · **40"** · **Set:** sala luminosa

⚠️ **Nessun neonato vero in video senza consenso scritto dei genitori.**
Girare in talking-head puro, o con le mani su un modello didattico.

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–6" | «Il tuo bambino non dorme, si inarca, piange sempre alla stessa ora, e ti hanno detto che sono **le coliche**?» | LE **COLICHE** |
| 6–16" | «"Coliche" è la parola che si usa quando non si sa. A volte dietro c'è altro: il parto è **il primo grande sforzo della vita**, anche per lui.» | IL PRIMO GRANDE **SFORZO** |
| 16–28" | «Una testa che resta girata sempre dallo stesso lato, una suzione che funziona da un seno solo, un punto che si appiattisce: sono cose su cui **si può lavorare**, con un tocco leggerissimo.» | SI PUÒ **LAVORARE** |
| 28–36" | «Non è magia e non sostituisce il pediatra. È un altro paio di mani che guarda **come si muove**.» | COME SI **MUOVE** |
| 36–40" | «Osteopatia neonatale e pediatrica, a Casalotti.» | A **CASALOTTI** |

---

#### C2 — «La cosa di cui non parla nessuno» *(percorso donna)*
**Volto:** Veronica · **40"** · **Set:** finestra, tono calmo

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–6" | «Ti scappa la pipì quando starnutisci, ridi o salti, e hai deciso che **è normale** dopo un figlio?» | È **NORMALE**? |
| 6–14" | «È **comune**. Non è la stessa cosa di normale. Comune vuol dire che capita a tante. Normale vuol dire che deve andare così — e non deve.» | COMUNE ≠ **NORMALE** |
| 14–26" | «Il pavimento pelvico è un muscolo. Come tutti i muscoli si affatica, si allunga, perde coordinazione. E come tutti i muscoli **si riallena**.» | SI **RIALLENA** |
| 26–34" | «Non servono i Kegel fatti a caso guardando un video. Serve prima capire se quel muscolo è **debole o troppo contratto**, perché il lavoro è opposto.» | DEBOLE O **CONTRATTO** |
| 34–40" | «È una valutazione, non un giudizio. Scrivici quando te la senti.» | QUANDO TE LA **SENTI** |

**Nota:** rapporto salvataggi/visualizzazioni più alto del piano. Le persone non
commentano questi video — li salvano e li mandano in privato a un'amica. **Non va
giudicato sulle metriche pubbliche.**

---

#### C3 — «La cicatrice che nessuno ti ha detto di trattare»
**Volto:** Azzurra · **40"** · **Set:** sala trattamento

Il contenuto più direttamente collegato alla competenza distintiva di Azzurra
(la sua tesi di osteopatia).

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–6" | «Hai fatto un cesareo e nessuno ti ha mai parlato della **cicatrice**, se non per dirti di metterci la crema?» | LA **CICATRICE** |
| 6–16" | «Una cicatrice non è solo un segno sulla pelle. Sotto, i tessuti si sono riorganizzati, e a volte **tirano** — su piani che arrivano lontano.» | A VOLTE **TIRANO** |
| 16–28" | «È uno dei motivi per cui certe donne, anche due o tre anni dopo, hanno mal di schiena basso, la pancia che tira, la sensazione che qualcosa **non torni**.» | CHE NON **TORNI** |
| 28–36" | «Si può lavorare sul tessuto, manualmente, anche a distanza di anni. Non è mai troppo tardi.» | MAI TROPPO **TARDI** |
| 36–40" | «Se ti ci sei riconosciuta, scrivici.» | SCRIVICI |

---

#### C4 — «Torni a correre o torni a camminare?» *(sport)*
**Volto:** Veronica · **35"** · **Set:** tavoletta / spazio esercizio

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–5" | «Ti sei fatto male, hai fatto la fisioterapia, non hai più dolore. Ma sei tornato **a giocare**?» | A **GIOCARE** |
| 5–15" | «C'è una differenza enorme tra "non fa più male" e "regge il gesto". Il dolore se ne va molto prima che il tessuto sia pronto **a ripartire in accelerazione**.» | REGGE IL **GESTO** |
| 15–27" | «È il motivo numero uno per cui la gente si rifà male allo stesso punto: rientra quando sta bene, non quando è **pronta**.» | NON QUANDO È **PRONTA** |
| 27–35" | «Un percorso serio non finisce quando smetti di sentire dolore. Finisce quando torni a fare quello che facevi prima.» | QUELLO CHE FACEVI **PRIMA** |

---

### PILASTRO D — Le persone
*Considerazione e fiducia. È il pilastro che fa scegliere voi invece di un altro
studio a parità di servizio.*

---

#### D1 — «Siamo in tre»
**Volto:** tutte e tre · **40"** · **Set:** attestati + sale

Ognuna si presenta **con una cosa sola**, quella che sa fare meglio. Non il
curriculum: quello sta sul sito.

| Tempo | Chi | Testo |
| --- | --- | --- |
| 0–4" | Insieme | «Siamo in tre, e facciamo cose diverse.» |
| 4–14" | Azzurra | «Io sono Azzurra, fisioterapista e osteopata. La mia tesi è nata dal trattamento della **cicatrice da cesareo**: da lì lavoro soprattutto con le donne, in gravidanza e dopo il parto.» |
| 14–25" | Elisa | «Io sono Elisa. Vent'anni fa ho scritto una tesi sul legame tra **emozione, postura e respiro**, e sto ancora lavorando su quello: postura, terapia manuale, metodo Feldenkrais.» |
| 25–35" | Veronica | «Io sono Veronica, osteopata prima e fisioterapista poi. Mi sono formata al **CONI** con atleti internazionali e lavoro su sport e salute femminile.» |
| 35–40" | Insieme | «E con noi c'è un team. Siamo a Casalotti, in via di Boccea.» |

> `[DA CONFERMARE]` — il team clinico (Siria, Andrea, Valentina) e la
> nutrizionista non compaiono finché titoli e numeri di albo non sono confermati:
> per un professionista sanitario il titolo è un obbligo di legge.

---

#### D2 — «Perché uno studio di sole donne»
**Volto:** tutte e tre · **40"** · **Set:** reception

Il video identitario, senza toni da inaugurazione. Unico del piano che può
permettersi ritmo più lento e musica bassa.

| Tempo | Chi | Testo |
| --- | --- | --- |
| 0–6" | Azzurra | «Ci chiedono spesso se è stata una scelta, che a dirigere lo studio siamo tre donne.» |
| 6–16" | Elisa | «Non è nato come un programma. È nato dal fatto che ci conosciamo da anni e **lavoriamo nello stesso modo**: prima si ascolta, poi si tocca.» |
| 16–28" | Veronica | «Però una conseguenza c'è. Ci sono cose che le pazienti ci dicono alla seconda seduta e che non avevano mai detto a nessuno. Il pavimento pelvico, il post-parto, la cicatrice. Cose di cui **non si parla**.» |
| 28–36" | Azzurra | «E allora abbiamo costruito un percorso apposta, invece di trattarle come un'eccezione.» |
| 36–40" | Insieme | «Siamo in via di Boccea 755, a Casalotti.» |

---

#### D3 — «Cosa vuol dire "valutazione"» *(il metodo)*
**Volto:** Elisa · **35"** · **Set:** sala valutazione

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–5" | «Quando diciamo "valutazione" non intendiamo **guardarti la schiena**.» | NON SOLO LA **SCHIENA** |
| 5–16" | «Intendiamo guardare come stai in piedi, come cammini, come respiri, come ti giri, cosa fa il piede quando appoggi. Il dolore è **l'ultimo capitolo**, non il primo.» | L'ULTIMO **CAPITOLO** |
| 16–28" | «Perché il posto dove senti male è quasi sempre quello che **ha ceduto per ultimo**. Se tratti solo quello, torna.» | CEDUTO PER **ULTIMO** |
| 28–35" | «Per questo il primo appuntamento è lungo e non è un trattamento. È quello che decide tutto il resto.» | DECIDE TUTTO IL **RESTO** |

---

### PILASTRO E — StudioEVA *(strategia, non ancora produzione)*

**Lo spazio non è pronto e non si riprende.** Questa sezione serve a preparare il
terreno, perché quando lo spazio sarà finito la strategia debba solo partire.

#### Perché StudioEVA vale più di quanto sembri

Uno studio di fisioterapia ha un problema strutturale: **il successo del percorso
coincide con la fine della relazione.** Il paziente sta bene e sparisce, finché
non si fa male di nuovo — magari da qualcun altro.

StudioEVA è la risposta, e non è un'idea di marketing: è già il sesto e ultimo
passo del percorso di cura descritto sul sito («Mantenimento»).

Ha inoltre un vantaggio che vale la pena capire bene: **è un'associazione
culturale, non un'attività sanitaria.** Il pilastro E **non è soggetto ai vincoli
della L. 145/2018**. Su StudioEVA si può fare ciò che sullo studio clinico
sarebbe vietato o rischioso: lezioni di prova, pacchetti, "porta un'amica",
percorsi a tempo, promozioni stagionali, contenuti leggeri.

Ne esce un **funnel a due direzioni**:

```
        PUBBLICO DEL QUARTIERE
                 │
        ┌────────┴────────┐
        ▼                 ▼
    STUDIOEVA          FISIOEVA
   (non sanitario)     (clinico)
   ingresso a          ingresso ad
   basso attrito       alta intenzione
        │                 │
        │  in un corso    │  a fine percorso
        │  emerge un      │  serve il
        │  dolore ───────►│  mantenimento
        │◄────────────────┘
        ▼
   RELAZIONE CONTINUA
   (e passaparola nel quartiere)
```

Chi entra da StudioEVA per lo yoga e scopre di avere la schiena bloccata ha già
lo studio al piano di sotto. Chi finisce il percorso clinico non sparisce: sale
le scale. **Lo stesso indirizzo serve due bisogni diversi della stessa persona in
due momenti diversi della sua vita.**

#### Cosa fare adesso, mentre lo spazio non è pronto

| Quando | Azione |
| --- | --- |
| **Subito** | Decidere se StudioEVA avrà un **profilo Instagram separato** (raccomandato: pubblico diverso, tono diverso, e nessun vincolo di pubblicità sanitaria). Prenotare il nome utente prima che lo faccia qualcun altro |
| **Subito** | Definire `[DA CONFERMARE]`: quali corsi partono per primi, giorni, orari, dimensione dei gruppi, prezzi |
| **Durante i lavori** | **Fotografare e filmare i lavori.** Il cantiere è contenuto: è l'unico momento in cui esiste e non tornerà. Bastano 10 secondi al giorno dal telefono |
| **A 3 settimane dall'apertura** | Iniziare a nominarlo nei video clinici, senza mostrarlo: la battuta finale di E1 |
| **All'apertura** | Girare E2, E3 e organizzare la giornata di porte aperte (E4) |

#### E1 — «Cosa succede dopo l'ultima seduta» *(girabile subito, senza mostrare il piano di sopra)*
**Volto:** Elisa · **40"** · **Set:** sala trattamento

| Tempo | Testo | Caption chiave |
| --- | --- | --- |
| 0–6" | «Finisci il percorso, stai bene, ci saluti. E poi, **dopo tre mesi**?» | DOPO **TRE MESI** |
| 6–16" | «È la parte che nessuno racconta: il dolore va via, ma **le abitudini che l'hanno creato restano**. Stessa scrivania, stessa macchina, stesse ore.» | LE ABITUDINI **RESTANO** |
| 16–28" | «Per questo l'ultima seduta da noi non è un saluto: è il momento in cui decidiamo **come mantieni** quello che hai ottenuto. Esercizi, controlli a distanza, e presto un posto dove continuare a muoversi in gruppo.» | COME **MANTIENI** |
| 28–36" | «Perché la parte difficile non è stare meglio. È **non tornare indietro**.» | NON TORNARE **INDIETRO** |
| 36–40" | «Ne parliamo quando vieni.» | |

#### E2, E3, E4 — *da girare quando lo spazio è pronto*
- **E2** Tour del piano superiore (30")
- **E3** «Feldenkrais spiegato a chi non sa cos'è» (40", Elisa — il metodo più
  difficile da spiegare e quindi il più prezioso da spiegare bene: chi lo capisce
  da voi lo associa a voi)
- **E4** Giornata di porte aperte — il lead magnet non sanitario: porta nel
  palazzo persone che **non hanno un dolore adesso**, cioè persone che lo studio
  clinico non potrebbe mai raggiungere

---

## 7. Il sistema, non il calendario

Niente piano editoriale a data fissa: lo studio è avviato e il piano deve
funzionare all'infinito, non per otto settimane.

### La proporzione

Su dieci contenuti: **5 di sintomo (A), 3 di metodo e struttura (B), 2 di aree
specialistiche (C)**, con un contenuto di persone (D) ogni due settimane.

L'errore classico è invertirla: parlare di sé a chi non ti conosce ancora.

### Il ciclo mensile ripetibile

| Settimana | Reel 1 | Reel 2 | Terzo contenuto |
| --- | --- | --- | --- |
| 1 | Pilastro **A** (sintomo) | Pilastro **B** (metodo) | Carosello da una FAQ del sito |
| 2 | Pilastro **A** (sintomo) | Pilastro **C** (specialistico) | Storie: risposte alle domande ricevute |
| 3 | Pilastro **A** (sintomo) | Pilastro **B** (metodo) | Post su Google Business Profile |
| 4 | Pilastro **C** (specialistico) | Pilastro **D** (persone) | Carosello: una recensione |

Pubblicazione: **martedì e giovedì** per i reel, **sabato mattina** per il terzo
contenuto. Orario **18:00–20:00**, quando la gente del quartiere torna a casa.

### La giornata di ripresa

Non si gira un video alla volta: **si gira un mese alla volta.** Mezza giornata
ben organizzata = 8–10 script = un mese di contenuti.

1. La sera prima: stampare gli script, rileggerli ad alta voce due volte. Non si
   impara a memoria, si impara **la sequenza dei concetti** — il riferimento
   parla in modo naturale, non recitato.
2. Mattina 9:00–13:00, luce di finestra.
3. Un set alla volta, tutti gli script che lo usano di fila.
4. Per ogni frase: **due riprese**, poi avanti. La terza è sempre peggio della
   seconda.
5. Girare **5 secondi in più** all'inizio e alla fine di ogni clip.
6. Cambiare inquadratura (più stretta / più larga / di lato) ogni due o tre
   frasi: è così che nascono i jump cut del riferimento.

---

## 8. Oltre i video

### 8.1 Google Business Profile — la priorità più alta fuori dai social
Per uno studio di quartiere **la scheda Google vale più del profilo Instagram**.
Chi ha mal di schiena a Casalotti non apre Instagram: cerca "fisioterapista
Casalotti" su Google Maps.

La scheda esiste già e va **verificata**. Una volta verificata, nell'ordine:

- Categoria primaria: *Fisioterapista*. Secondarie: *Osteopata*, *Centro di
  riabilitazione*.
- Caricare le foto vere dello shooting, già in `public/foto/` — non stock.
- **Caricare i reel anche lì** come post video: lo stesso file fa due lavori.
- Compilare servizi, orari, descrizione (con "Casalotti" nella prima riga).
- Chiedere le prime recensioni ai pazienti storici che vi seguono dal lavoro
  precedente. **Le prime dieci contano più delle successive cento.**
- Rispondere a ogni recensione — ⚠️ **senza mai confermare pubblicamente che
  quella persona è stata in cura da voi**: è un dato sanitario. Formula sicura:
  *«Grazie per le parole, siamo felici di esservi stati utili»*. Mai *«siamo
  contenti che la sua lombalgia sia migliorata»*.

### 8.2 Ogni video diventa cinque contenuti
Il sito è aperto ai crawler delle AI (`APERTO_ALLE_AI: true`) e ha già un
`llms.txt`. Ma il contenuto delle pagine è renderizzato da JavaScript, e i
crawler AI non lo vedono (è spiegato nel README).

Questo rende **il testo degli script, pubblicato come testo sul sito**, uno degli
asset più sottovalutati che avete:

```
1 script video
   ├─► Reel Instagram / TikTok
   ├─► Post video su Google Business Profile
   ├─► Storia con sondaggio ("ti ci riconosci?")
   ├─► Carosello (5 slide dallo stesso testo)
   └─► Voce nella pagina FAQ del sito → letta da Google e dalle AI
```

Il quinto è quello che nessuno fa e che porta risultati per anni. A3, B3, B4, B5,
C2 sono già scritti in forma di domanda e risposta: **sono FAQ mascherate da
video**.

### 8.3 Alleanze di quartiere — il vero sostituto delle riprese in esterni
Se non si può *mostrare* il quartiere, lo si può **abitare**. Quattro tavoli:

- **Società sportive giovanili della zona** — una serata per i genitori su "come
  si gestisce l'infortunio di un ragazzo". Veronica ha la formazione CONI: è
  esattamente il suo terreno.
- **Palestre e box di crossfit** — sono la fonte numero uno di tendiniti di
  spalla e gomito. Non sono concorrenti, sono **canali**.
- **Farmacie di via di Boccea** — chi ha mal di schiena entra in farmacia prima
  di cercare un fisioterapista.
- **Consultori, ostetriche, corsi preparto, asili nido** — per i pilastri C1
  (neonatale), C2 e C3 (donna). Tasso di conversione più alto in assoluto, perché
  la fiducia arriva già costruita.

Ognuno di questi produce anche contenuto, **girato dentro lo studio**: «ieri
abbiamo parlato con i genitori della [società sportiva]…».

### 8.4 La serie «Risposte»
Una domanda al giorno nella casella domande delle storie, una risposta video di
15 secondi. Costa cinque minuti, tiene il profilo vivo nei giorni senza reel, e
**genera il piano editoriale del mese successivo**: le domande che la gente fa
davvero sono i prossimi script del pilastro A.

### 8.5 Testimonianze, fatte in modo legale
Convertono più di qualunque altro contenuto. Ma un paziente che dice in video di
essere stato in cura da voi rivela **un dato relativo alla salute** (art. 9
GDPR). Si può fare, solo così:

- **consenso scritto e specifico** per la pubblicazione video, separato dal
  consenso al trattamento sanitario, revocabile;
- la persona parla del **percorso e dell'esperienza**, non della diagnosi;
- nessuna promessa di risultato nel montaggio — *«in tre sedute sono guarita»*
  non si pubblica **nemmeno se l'ha detto spontaneamente**: è pubblicità
  sanitaria ingannevole anche quando è vera.

Alternativa a rischio zero, già disponibile: **le quattro recensioni scritte già
presenti in `site.ts`**, trasformate in caroselli o in testo a schermo.

---

## 9. Come si capisce se sta funzionando

Niente pixel, niente Analytics: il sito non ha strumenti di tracciamento attivi
ed è **la ragione per cui non serve il banner cookie**. Aggiungerli costerebbe un
banner con consenso preventivo e granulare. Per ora si misura senza.

**La metrica che conta più di tutte, e costa zero:** in segreteria, a ogni primo
colloquio, una domanda sola —

> «Posso chiederle come ci ha conosciuti?»

Segnata su un foglio. Vale più di qualunque dashboard.

| Metrica | Dove | Perché conta |
| --- | --- | --- |
| Primi colloqui prenotati / settimana | Agenda | L'unico numero che paga l'affitto |
| Richieste di indicazioni stradali | Google Business Profile | Intenzione altissima: sta venendo |
| Messaggi WhatsApp dopo un reel | WhatsApp Business | Il vero risultato del pilastro A |
| Salvataggi | Instagram | "Mi serve, ci torno". Sui pilastri B e C vale più dei like |
| Ritenzione a 3 secondi | Instagram / TikTok | Sotto il 60%: il gancio non funziona, riscrivere i primi 5 secondi |
| Visualizzazioni da non-follower | Instagram | Sotto il 50%: stai parlando a chi ti conosce già, cioè non stai attraendo |

**Come si legge un reel andato male:** non si guardano i like, si guarda **dove
scende la ritenzione**. Nei primi 3 secondi → problema di gancio. A metà → la
parte del meccanismo è troppo lunga o troppo tecnica. Arriva in fondo ma non
genera messaggi → problema di CTA.

---

## 10. Cosa serve decidere

| # | Decisione | Perché blocca | Chi |
| --- | --- | --- | --- |
| 1 | **Verificare la scheda Google Business Profile** | È il canale a più alta intenzione per uno studio di quartiere | Studio |
| 2 | **WhatsApp sul sito** (sezione 2) | Oggi il canale preferito dalle persone non esiste sul sito | Studio + sviluppo |
| 3 | **Microfono lavalier** | Unico acquisto obbligatorio | Studio |
| 4 | **Parete degli attestati** allestita | È il set che costruisce autorevolezza in ogni inquadratura | Studio |
| 5 | **Stanze private: sì o no** | Se sì è un differenziatore concreto e dicibile, oggi assente dal sito | Studio |
| 6 | **Parcheggio** | Resta `<DatoMancante>`; in zona ci si arriva in auto | Studio |
| 7 | **Nome utente Instagram di StudioEVA** | Da prenotare prima che lo prenda qualcun altro | StudioEVA |
| 8 | **Corsi, orari e gruppi di StudioEVA** | Sbloccano E2, E3, E4 | StudioEVA |

---

## 11. Riepilogo degli script

| ID | Titolo | Pilastro | Durata | Volto | Stato |
| --- | --- | --- | --- | --- | --- |
| A1 | Il mal di schiena che torna sempre nello stesso punto | Sintomo | 40" | Veronica | ✅ Girabile |
| A2 | La spalla che fa male di notte | Sintomo | 35" | Veronica | ✅ Girabile |
| A3 | «È cervicale» | Sintomo | 42" | Elisa | ✅ Girabile |
| A4 | La caviglia storta sei mesi fa | Sintomo | 35" | Veronica | ✅ Girabile |
| A5 | Perché il dolore peggiora la sera | Sintomo | 20" | Elisa | ✅ Girabile |
| A6 | Le tre cose che vediamo di più qui | Sintomo + quartiere | 40" | Veronica | ✅ Girabile |
| B1 | Cosa succede nei primi venti minuti | Metodo | 45" | Azzurra | ✅ Girabile |
| B2 | Tour dello studio in trenta secondi | Struttura | 30" | Elisa (v.f.c.) | ✅ Girabile |
| B3 | Non serve la prescrizione del medico | Metodo | 22" | Elisa | ✅ Girabile |
| B4 | La tecar non è una bacchetta magica | Metodo | 35" | Veronica | ✅ Girabile |
| B5 | Perché non ti diciamo quante sedute al telefono | Metodo | 30" | Azzurra | ✅ Girabile |
| C1 | Il neonato che non dorme | Specialistico | 40" | Azzurra | ✅ Girabile |
| C2 | La cosa di cui non parla nessuno | Specialistico | 40" | Veronica | ✅ Girabile |
| C3 | La cicatrice che nessuno ti ha detto di trattare | Specialistico | 40" | Azzurra | ✅ Girabile |
| C4 | Torni a correre o torni a camminare? | Specialistico | 35" | Veronica | ✅ Girabile |
| D1 | Siamo in tre | Persone | 40" | Tutte | ✅ Girabile |
| D2 | Perché uno studio di sole donne | Persone | 40" | Tutte | ✅ Girabile |
| D3 | Cosa vuol dire «valutazione» | Persone | 35" | Elisa | ✅ Girabile |
| E1 | Cosa succede dopo l'ultima seduta | StudioEVA | 40" | Elisa | ✅ Girabile (non mostra il piano) |
| E2 | Il piano di sopra | StudioEVA | 30" | Elisa | ⏸ Spazio non pronto |
| E3 | Feldenkrais spiegato a chi non sa cos'è | StudioEVA | 40" | Elisa | ⏸ Spazio non pronto |
| E4 | Porte aperte | StudioEVA | 25" | Elisa | ⏸ Spazio non pronto |

**19 script girabili subito, tutti dentro lo studio. Circa 11 minuti di girato
finale, producibili in due mezze giornate.**
