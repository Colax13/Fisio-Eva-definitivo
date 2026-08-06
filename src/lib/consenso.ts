import { useCallback, useEffect, useState } from 'react';

/**
 * Consenso ai contenuti di terze parti (oggi: la mappa di Google).
 *
 * L6 — il banner di consenso è obbligatorio prima del go-live. Finché la scelta
 * non è stata fatta nessun embed esterno viene montato: la mappa parte solo
 * dopo un sì esplicito, così Google non riceve nulla prima del consenso.
 *
 * Il sito non usa cookie di profilazione propri, quindi la scelta si limita
 * agli embed e vive in localStorage, non in un cookie.
 */

const CHIAVE = 'fisioeva:consenso-terze-parti';
const EVENTO = 'fisioeva:consenso';

export type Consenso = 'accettato' | 'rifiutato' | null;

function leggi(): Consenso {
  if (typeof window === 'undefined') return null;
  try {
    const v = window.localStorage.getItem(CHIAVE);
    return v === 'accettato' || v === 'rifiutato' ? v : null;
  } catch {
    // localStorage negato (navigazione privata, blocco di terze parti):
    // si resta senza consenso, che è il default prudente.
    return null;
  }
}

function scrivi(valore: Exclude<Consenso, null>) {
  try {
    window.localStorage.setItem(CHIAVE, valore);
  } catch {
    /* la scelta vale comunque per questa sessione */
  }
  window.dispatchEvent(new CustomEvent(EVENTO));
}

/**
 * Stato del consenso più le azioni per cambiarlo.
 * Tutte le istanze si allineano tramite un evento, così banner e mappa non
 * possono raccontare due cose diverse nella stessa pagina.
 */
export function useConsenso() {
  const [consenso, setConsenso] = useState<Consenso>(leggi);

  useEffect(() => {
    const aggiorna = () => setConsenso(leggi());
    window.addEventListener(EVENTO, aggiorna);
    // Allinea anche le altre schede aperte.
    window.addEventListener('storage', aggiorna);
    return () => {
      window.removeEventListener(EVENTO, aggiorna);
      window.removeEventListener('storage', aggiorna);
    };
  }, []);

  const accetta = useCallback(() => scrivi('accettato'), []);
  const rifiuta = useCallback(() => scrivi('rifiutato'), []);

  return { consenso, accetta, rifiuta, deciso: consenso !== null };
}
