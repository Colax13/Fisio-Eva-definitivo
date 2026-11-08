import { useEffect } from 'react';
import { creaDatiStrutturati } from '../lib/schemaOrg';

/**
 * Tiene aggiornato, lato client, il grafo schema.org (JSON-LD) — la
 * clinica, le tre titolari e StudioEVA — che identifica lo studio per i motori di ricerca e
 * per le AI che leggono la pagina eseguendo JavaScript.
 *
 * Una copia statica della stessa scheda è già scritta in `index.html` da
 * `scripts/genera-sitemap.mjs`, per chi la legge senza eseguire JavaScript —
 * molti crawler delle AI funzionano così. Questo componente aggiorna quel
 * tag invece di aggiungerne uno nuovo, così ne resta sempre uno solo.
 */
export default function DatiStrutturati() {
  useEffect(() => {
    let tag = document.getElementById('scheda-clinica') as HTMLScriptElement | null;
    if (!tag) {
      tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.id = 'scheda-clinica';
      document.head.appendChild(tag);
    }
    tag.textContent = JSON.stringify(creaDatiStrutturati());
  }, []);

  return null;
}
