import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Avanzamento automatico dei caroselli.
 *
 * Prima ogni sezione si scriveva il suo `setInterval` e si metteva in pausa solo
 * con `onMouseEnter`: sul telefono il mouse non esiste, quindi la rotazione non
 * si fermava mai e leggere una frase fino in fondo era questione di fortuna.
 *
 * Qui la pausa scatta al primo tocco o clic dell'utente (`pausa()`), quando la
 * scheda finisce in secondo piano, e per chi ha chiesto meno animazioni al
 * sistema operativo la rotazione non parte proprio.
 */
export default function useAutoplay(lunghezza: number, intervallo = 6000) {
  const [indice, setIndice] = useState(0);
  const [inPausa, setInPausa] = useState(false);
  const bloccato = useRef(false);

  /** Da chiamare quando l'utente sceglie a mano: da lì in poi comanda lui. */
  const pausa = useCallback(() => {
    bloccato.current = true;
    setInPausa(true);
  }, []);

  const vaiA = useCallback(
    (i: number) => {
      pausa();
      setIndice(((i % lunghezza) + lunghezza) % lunghezza);
    },
    [lunghezza, pausa]
  );

  const avanti = useCallback(() => vaiA(indice + 1), [indice, vaiA]);
  const indietro = useCallback(() => vaiA(indice - 1), [indice, vaiA]);

  useEffect(() => {
    if (inPausa || bloccato.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timer = setInterval(() => setIndice((i) => (i + 1) % lunghezza), intervallo);
    return () => clearInterval(timer);
  }, [inPausa, intervallo, lunghezza]);

  // Una scheda in secondo piano non deve continuare a scorrere.
  useEffect(() => {
    const onVisibility = () => setInPausa(document.hidden || bloccato.current);
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  return { indice, vaiA, avanti, indietro, pausa, setInPausa };
}
