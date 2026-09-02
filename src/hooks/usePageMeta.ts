import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sito } from '../data/site';

/** Crea il tag se non c'è ancora, poi ne aggiorna il contenuto. */
function meta(selettore: string, crea: () => HTMLElement, applica: (el: HTMLElement) => void) {
  let el = document.head.querySelector<HTMLElement>(selettore);
  if (!el) {
    el = crea();
    document.head.appendChild(el);
  }
  applica(el);
}

/**
 * Tiene allineati ai contenuti della rotta attiva il titolo, la descrizione,
 * l'URL canonico e le anteprime social.
 *
 * Su un sito a pagina singola nulla di tutto questo succede da solo: senza
 * canonical ogni indirizzo con parametri diventa un doppione agli occhi di
 * Google, e senza Open Graph un link condiviso su WhatsApp arriva nudo.
 *
 * Il meta `robots` segue `sito.PUBBLICO`: finché è `false` ogni pagina dichiara
 * `noindex, nofollow`, come il robots.txt e l'header di Vercel.
 */
export default function usePageMeta(title: string, description?: string) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    const canonico = `${sito.dominio.replace(/\/$/, '')}${pathname === '/' ? '' : pathname}`;

    if (description) {
      meta(
        'meta[name="description"]',
        () => Object.assign(document.createElement('meta'), { name: 'description' }),
        (el) => el.setAttribute('content', description)
      );
      meta(
        'meta[property="og:description"]',
        () => {
          const el = document.createElement('meta');
          el.setAttribute('property', 'og:description');
          return el;
        },
        (el) => el.setAttribute('content', description)
      );
    }

    meta(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
      (el) => el.setAttribute('href', canonico)
    );

    meta(
      'meta[property="og:title"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:title');
        return el;
      },
      (el) => el.setAttribute('content', title)
    );

    meta(
      'meta[property="og:url"]',
      () => {
        const el = document.createElement('meta');
        el.setAttribute('property', 'og:url');
        return el;
      },
      (el) => el.setAttribute('content', canonico)
    );

    // Il sito è chiuso ai motori finché non apre lo studio: qui è il terzo
    // presidio, dopo robots.txt e l'header di Vercel.
    meta(
      'meta[name="robots"]',
      () => Object.assign(document.createElement('meta'), { name: 'robots' }),
      (el) =>
        el.setAttribute(
          'content',
          sito.PUBBLICO ? 'index, follow, max-image-preview:large' : 'noindex, nofollow'
        )
    );
  }, [title, description, pathname]);
}
