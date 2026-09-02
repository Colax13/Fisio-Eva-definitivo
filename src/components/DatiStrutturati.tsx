import { useEffect } from 'react';
import { sito, studio } from '../data/site';

/**
 * Scheda dell'attività in formato schema.org (JSON-LD).
 *
 * È quello che permette a Google di capire che FisioEVA è uno studio sanitario
 * con un indirizzo, degli orari e un telefono, invece di un sito qualsiasi che
 * parla di fisioterapia: è la base della scheda locale e delle ricerche
 * "fisioterapista vicino a me".
 *
 * I dati arrivano da `site.ts`, quindi non c'è una seconda copia da tenere
 * allineata a mano. I campi ancora provvisori — oggi il telefono — restano
 * fuori: dichiarare a un motore di ricerca un recapito sbagliato è peggio che
 * non dichiararne nessuno, perché poi resta nella scheda per mesi.
 */
export default function DatiStrutturati() {
  useEffect(() => {
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

    const tag = document.createElement('script');
    tag.type = 'application/ld+json';
    tag.textContent = JSON.stringify(scheda);
    document.head.appendChild(tag);

    return () => {
      tag.remove();
    };
  }, []);

  return null;
}
