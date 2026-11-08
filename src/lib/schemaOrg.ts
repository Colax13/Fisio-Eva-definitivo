import { immagineCondivisione } from '../data/seo.ts';
import { categorie, sito, studio, studioEva, team, trattamenti } from '../data/site.ts';

const dominio = sito.dominio.replace(/\/$/, '');
const ID_STUDIO = `${dominio}/#studio`;
const ID_STUDIOEVA = `${dominio}/studioeva#associazione`;
const idPersona = (slug: string) => `${dominio}/team#${slug}`;

/** L'indirizzo, uguale per lo studio e per StudioEVA: stanno nello stesso edificio. */
const indirizzo = {
  '@type': 'PostalAddress',
  streetAddress: studio.address,
  postalCode: studio.city.split(' ')[0],
  addressLocality: 'Roma',
  addressRegion: 'RM',
  addressCountry: 'IT',
};

/**
 * I trattamenti sanitari dello studio, una voce per nome: il linfodrenaggio
 * compare in due aree ma è un trattamento solo. Le terapie di gruppo restano
 * fuori: sono i corsi di StudioEVA e stanno nella sua scheda.
 */
function trattamentiSanitari() {
  const visti = new Set<string>();
  return trattamenti.filter((t) => {
    if (t.categoria === 'terapie-di-gruppo' || visti.has(t.nome)) return false;
    visti.add(t.nome);
    return true;
  });
}

/**
 * Costruisce la scheda MedicalClinic in formato schema.org.
 *
 * Vive qui, separata sia dal componente React sia dallo script di build,
 * perché entrambi la usano: `DatiStrutturati.tsx` la scrive nel browser
 * quando gira JavaScript, `scripts/genera-sitemap.mjs` la scrive
 * staticamente in `index.html` per chi legge la pagina senza eseguire
 * JavaScript — molti crawler delle AI funzionano così. Un'unica fonte,
 * due momenti in cui viene resa: se cambia un dato, non c'è una seconda
 * copia da tenere allineata a mano.
 */
export function creaSchedaClinica(): Record<string, unknown> {
  const giorni: Record<string, string[]> = {
    'Lunedì — Venerdì': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    Sabato: ['Saturday'],
  };

  const orari = studio.orari
    .filter((o) => o.ore !== 'Chiuso' && giorni[o.giorno])
    .map((o) => {
      const [apre, chiude] = o.ore.split('—').map((x) => x.trim());
      return {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: giorni[o.giorno],
        opens: apre,
        closes: chiude,
      };
    });

  const scheda: Record<string, unknown> = {
    '@context': 'https://schema.org',
    // Physiotherapy è il tipo schema.org specifico per uno studio di
    // fisioterapia: dichiararlo accanto a MedicalClinic aiuta Google ad
    // associare lo studio alle ricerche "fisioterapista".
    '@type': ['MedicalClinic', 'Physiotherapy'],
    '@id': ID_STUDIO,
    name: studio.name,
    description: `${studio.claim} a ${studio.zone}, Roma: ${studio.address}, ${studio.comeArrivare.breve.charAt(0).toLowerCase()}${studio.comeArrivare.breve.slice(1)}.`,
    url: sito.dominio,
    logo: `${dominio}/icon-512.png`,
    image: [`${dominio}${immagineCondivisione}`, `${dominio}/foto/sede-reception.webp`],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${studio.coordinate.lat},${studio.coordinate.lng}`,
    geo: {
      '@type': 'GeoCoordinates',
      latitude: studio.coordinate.lat,
      longitude: studio.coordinate.lng,
    },
    address: indirizzo,
    email: studio.email,
    sameAs: [studio.instagramUrl],
    medicalSpecialty: ['Physiotherapy', 'PhysicalTherapy'],
    openingHoursSpecification: orari,
    isAcceptingNewPatients: true,
    areaServed: [
      ...studio.zoneServite.map((zona) => ({
        '@type': 'Place',
        name: `${zona}, Roma`,
      })),
      { '@type': 'City', name: 'Roma' },
    ],
    availableService: trattamentiSanitari().map((t) => ({
      '@type': 'MedicalTherapy',
      name: t.nome,
      description: t.sottotitolo,
      url: `${dominio}/servizi#${t.categoria}`,
    })),
    // Le stesse voci raggruppate per area, come le trova il paziente sul sito.
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Trattamenti',
      itemListElement: categorie
        .filter((c) => c.slug !== 'terapie-di-gruppo')
        .map((c) => ({
          '@type': 'OfferCatalog',
          name: c.nome,
          description: c.sottotitolo,
          itemListElement: trattamenti
            .filter((t) => t.categoria === c.slug)
            .map((t) => ({ '@type': 'Offer', itemOffered: { '@type': 'MedicalTherapy', name: t.nome } })),
        })),
    },
    // Le tre titolari: la scheda completa di ciascuna è un nodo a parte nel grafo.
    founder: team.map((m) => ({ '@id': idPersona(m.slug) })),
    employee: team.map((m) => ({ '@id': idPersona(m.slug) })),
  };

  // Solo quando sarà quello vero.
  if (!studio.phoneProvvisorio) scheda.telephone = studio.phone;

  // Niente `vatID`: le professioniste sono contitolari con partite IVA
  // distinte, e schema.org ne prevede una sola per organizzazione. Attribuirne
  // una alle altre due sarebbe sbagliato.

  return scheda;
}

/**
 * Le tre titolari come persone, con curriculum e iscrizione all'albo.
 * Solo loro: per il team clinico titoli e albo non sono ancora confermati, e
 * qui non si scrive nulla che non lo sia.
 */
export function creaSchedePersone(): Record<string, unknown>[] {
  return team.map((m) => {
    const nome = m.name.replace(/^Dott\.ssa\s+/, '');
    const scheda: Record<string, unknown> = {
      '@type': 'Person',
      '@id': idPersona(m.slug),
      name: nome,
      honorificPrefix: 'Dott.ssa',
      jobTitle: m.role,
      description: m.description,
      image: `${dominio}${m.photo}`,
      url: `${dominio}/team`,
      worksFor: { '@id': ID_STUDIO },
      workLocation: { '@id': ID_STUDIO },
    };
    if (m.albo) {
      scheda.hasCredential = {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Iscrizione all\'albo professionale',
        name: `Albo dei Fisioterapisti n. ${m.albo}`,
        ...(m.ordine ? { recognizedBy: { '@type': 'Organization', name: m.ordine } } : {}),
      };
    }
    return scheda;
  });
}

/**
 * StudioEVA, l'associazione culturale del piano superiore: una scheda sua,
 * perché non è lo studio e i suoi corsi non sono trattamenti sanitari.
 */
export function creaSchedaStudioEva(): Record<string, unknown> {
  const corsi = trattamenti.filter((t) => t.categoria === 'terapie-di-gruppo');
  const scheda: Record<string, unknown> = {
    '@type': 'Organization',
    '@id': ID_STUDIOEVA,
    name: studioEva.nome,
    slogan: studioEva.claim,
    description: `${studioEva.natura}. ${studioEva.presentazione}`,
    url: `${dominio}/studioeva`,
    address: indirizzo,
    location: {
      '@type': 'Place',
      name: `Piano superiore dello studio ${studio.name}`,
      address: indirizzo,
      geo: { '@type': 'GeoCoordinates', latitude: studio.coordinate.lat, longitude: studio.coordinate.lng },
    },
    telephone: studio.phone,
    knowsAbout: corsi.map((c) => c.nome),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `I corsi di ${studioEva.nome}`,
      itemListElement: corsi.map((c) => {
        const docente = studioEva.docenti[c.slug];
        return {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: c.nome,
            description: c.sottotitolo,
            url: `${dominio}/studioeva#${c.slug}`,
            ...(docente ? { provider: { '@id': idPersona(docente) } } : {}),
          },
        };
      }),
    },
  };
  if (studioEva.logo) scheda.logo = `${dominio}${studioEva.logo}`;
  return scheda;
}

/**
 * Tutto il grafo in un blocco solo: la clinica, le tre titolari e StudioEVA,
 * collegati fra loro con gli `@id`. È ciò che finisce nel tag
 * `#scheda-clinica`, sia nell'HTML statico sia nel browser.
 */
export function creaDatiStrutturati(): Record<string, unknown> {
  const { ['@context']: _contesto, ...clinica } = creaSchedaClinica();
  return {
    '@context': 'https://schema.org',
    '@graph': [clinica, ...creaSchedePersone(), creaSchedaStudioEva()],
  };
}
