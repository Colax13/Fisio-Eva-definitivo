import { immagineCondivisione } from '../data/seo.ts';
import { sito, studio, team, trattamentiManuali, trattamentiStrumentali } from '../data/site.ts';

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

  const dominio = sito.dominio.replace(/\/$/, '');

  const scheda: Record<string, unknown> = {
    '@context': 'https://schema.org',
    // Physiotherapy è il tipo schema.org specifico per uno studio di
    // fisioterapia: dichiararlo accanto a MedicalClinic aiuta Google ad
    // associare lo studio alle ricerche "fisioterapista".
    '@type': ['MedicalClinic', 'Physiotherapy'],
    '@id': `${dominio}/#studio`,
    name: studio.name,
    description: `${studio.claim} a ${studio.zone}, Roma.`,
    url: sito.dominio,
    logo: `${dominio}/icon-512.png`,
    image: [`${dominio}${immagineCondivisione}`, `${dominio}/foto/sede-reception.webp`],
    hasMap: `https://www.google.com/maps/search/?api=1&query=${studio.mapsQuery}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: studio.address,
      postalCode: studio.city.split(' ')[0],
      addressLocality: 'Roma',
      addressRegion: 'RM',
      addressCountry: 'IT',
    },
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
    availableService: [...trattamentiManuali, ...trattamentiStrumentali].map((nome) => ({
      '@type': 'MedicalTherapy',
      name: nome,
    })),
    // Solo le titolari: per il team clinico titoli e albo non sono ancora
    // confermati, e qui non si scrive nulla che non lo sia.
    employee: team.map((m) => ({
      '@type': 'Person',
      name: m.name,
      jobTitle: m.role,
      image: `${dominio}${m.photo}`,
      url: `${dominio}/team`,
    })),
  };

  // Solo quando sarà quello vero.
  if (!studio.phoneProvvisorio) scheda.telephone = studio.phone;

  // Niente `vatID`: le professioniste sono contitolari con partite IVA
  // distinte, e schema.org ne prevede una sola per organizzazione. Attribuirne
  // una alle altre due sarebbe sbagliato.

  return scheda;
}
