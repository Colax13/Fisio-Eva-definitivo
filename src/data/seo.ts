/**
 * Titolo e descrizione di ogni pagina, in un posto solo.
 *
 * Li leggono due momenti diversi: `usePageMeta` li scrive nel browser, e
 * `scripts/pagine-statiche.mjs` li scrive già nell'HTML di ciascuna rotta al
 * build, così chi legge la pagina senza eseguire JavaScript (Bing, le
 * anteprime di WhatsApp, molti crawler delle AI) vede il titolo giusto e non
 * quello della home.
 *
 * Il quartiere va nominato: chi cerca uno studio vicino a casa scrive
 * "fisioterapista Casalotti" o "osteopata Boccea", e il titolo è il segnale
 * più forte che una pagina ha per rispondere a quella ricerca.
 */
export type MetaPagina = { titolo: string; descrizione: string };

export const metaPagine = {
  '/': {
    titolo: 'FisioEVA — Fisioterapia e Osteopatia a Casalotti, Roma (Via di Boccea 755)',
    descrizione:
      'Studio di fisioterapia e osteopatia a Casalotti, in Via di Boccea 755, Roma. Terapia manuale, osteopatia, riabilitazione, salute della donna e osteopatia neonatale.',
  },
  '/servizi': {
    titolo: 'Servizi e Trattamenti — FisioEVA | Fisioterapia e Osteopatia a Casalotti, Roma',
    descrizione:
      'Terapia manuale, osteopatia, riabilitazione, pavimento pelvico, osteopatia neonatale, tecarterapia e laser a Roma, zona Boccea-Casalotti.',
  },
  '/team': {
    titolo: 'Il Team — FisioEVA | Fisioterapiste e Osteopate a Casalotti, Roma',
    descrizione:
      'Azzurra De Angelis, Elisa De Rubeis e Veronica Mirarchi: le fisioterapiste e osteopate dello studio FisioEVA in Via di Boccea 755, Roma Casalotti.',
  },
  '/chi-siamo': {
    titolo: 'Chi Siamo — FisioEVA | Studio di Fisioterapia e Osteopatia a Casalotti',
    descrizione:
      'Azzurra, Elisa e Veronica: fisioterapiste e osteopate a Roma Casalotti. Il nostro approccio, i nostri valori e il percorso di cura passo dopo passo.',
  },
  '/contatti': {
    titolo: 'Contatti — FisioEVA | Via di Boccea 755, Roma Casalotti',
    descrizione:
      'Prenota allo studio FisioEVA in Via di Boccea 755, Roma Casalotti. Telefono, WhatsApp, email, orari e mappa per raggiungerci.',
  },
  '/faq': {
    titolo: 'Domande frequenti — FisioEVA | Fisioterapia e Osteopatia a Casalotti',
    descrizione:
      'Serve la prescrizione? Quanto dura una seduta? Quante sedute servono? Le risposte alle domande più comuni sui trattamenti dello studio FisioEVA a Casalotti.',
  },
  '/gallery': {
    titolo: 'Gallery — FisioEVA | Lo studio a Roma Casalotti',
    descrizione:
      'Uno sguardo dentro lo studio FisioEVA: gli spazi, i trattamenti e i percorsi di riabilitazione in Via di Boccea 755, Roma.',
  },
  '/privacy': {
    titolo: 'Privacy policy — FisioEVA',
    descrizione:
      'Come lo studio FisioEVA tratta i dati personali e i dati relativi alla salute dei propri pazienti, ai sensi degli artt. 13-14 del Regolamento UE 2016/679.',
  },
  '/cookie-policy': {
    titolo: 'Cookie policy — FisioEVA',
    descrizione:
      'Quali cookie e strumenti di tracciamento usa il sito di FisioEVA: nessuna profilazione, nessuna pubblicità, mappe di terze parti caricate solo su richiesta.',
  },
} satisfies Record<string, MetaPagina>;

/** L'immagine che accompagna il link quando viene condiviso (WhatsApp, Facebook). */
export const immagineCondivisione = '/foto/team-gruppo-hero.webp';
