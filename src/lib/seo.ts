import { useEffect } from 'react';
import { studio } from '../config/site';

export const SITO_URL = 'https://www.fisioeva.it';

function setMeta(attr: 'name' | 'property', key: string, value: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.content = value;
}

function setLink(rel: string, href: string) {
  let tag = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!tag) {
    tag = document.createElement('link');
    tag.rel = rel;
    document.head.appendChild(tag);
  }
  tag.href = href;
}

type MetaOptions = {
  title: string;
  description: string;
  /** Percorso della pagina, es. "/servizi/bambino/osteopatia-neonatale". */
  path: string;
  /** Blocchi JSON-LD da montare per questa pagina. */
  schema?: object[];
};

/**
 * Title, description, canonical, Open Graph e JSON-LD per la pagina corrente.
 * Gli script di schema vengono rimossi al cambio rotta, così non si accumulano.
 */
export function usePageSeo({ title, description, path, schema = [] }: MetaOptions) {
  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:locale', 'it_IT');
    setMeta('property', 'og:url', `${SITO_URL}${path}`);
    setLink('canonical', `${SITO_URL}${path}`);

    const nodi = schema.map((blocco) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seo = 'page';
      script.textContent = JSON.stringify(blocco);
      document.head.appendChild(script);
      return script;
    });

    return () => nodi.forEach((n) => n.remove());
    // Lo schema è ricostruito a ogni render: si confronta la forma serializzata.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, JSON.stringify(schema)]);
}

/**
 * Scheda dello studio. `MedicalBusiness` eredita da `LocalBusiness`, quindi
 * un solo blocco copre entrambi i requisiti.
 * Telefono e orari entrano solo quando il cliente li fornisce: meglio un campo
 * assente che un dato inventato.
 */
export function schemaStudio() {
  const dati: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    '@id': `${SITO_URL}/#studio`,
    name: studio.nome,
    description: `${studio.claim} in ${studio.indirizzo}, ${studio.citta}. Fisioterapia, osteopatia e riabilitazione.`,
    url: SITO_URL,
    email: studio.email,
    medicalSpecialty: 'PhysicalTherapy',
    areaServed: { '@type': 'Place', name: `${studio.zona}, ${studio.citta}` },
    address: {
      '@type': 'PostalAddress',
      streetAddress: studio.indirizzo,
      postalCode: studio.cap,
      addressLocality: studio.citta,
      addressCountry: 'IT',
    },
    sameAs: [studio.instagramUrl],
  };

  if (studio.telefono) dati.telephone = studio.telefono;
  if (studio.orari) {
    dati.openingHours = studio.orari.map((o) => `${o.giorno} ${o.ore}`);
  }

  return dati;
}

export function schemaBreadcrumb(voci: { nome: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: voci.map((voce, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: voce.nome,
      item: `${SITO_URL}${voce.path}`,
    })),
  };
}

export function schemaFaq(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function schemaProcedura(nome: string, descrizione: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    name: nome,
    description: descrizione,
    procedureType: 'https://schema.org/TherapeuticProcedure',
    provider: { '@id': `${SITO_URL}/#studio` },
  };
}
