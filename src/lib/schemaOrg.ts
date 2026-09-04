import { sito, studio } from '../data/site.ts';

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
    '@type': 'MedicalClinic',
    name: studio.name,
    description: `${studio.claim} a ${studio.zone}, Roma.`,
    url: sito.dominio,
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
  };

  // Solo quando sarà quello vero.
  if (!studio.phoneProvvisorio) scheda.telephone = studio.phone;

  // Niente `vatID`: le professioniste sono contitolari con partite IVA
  // distinte, e schema.org ne prevede una sola per organizzazione. Attribuirne
  // una alle altre due sarebbe sbagliato.

  return scheda;
}
