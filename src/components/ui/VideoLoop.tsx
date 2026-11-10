import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

type Props = {
  src: string;
  /** Il primo fotogramma: si vede subito, mentre il video arriva. */
  poster: string;
  /** Fermato da chi guarda (il pulsante di pausa dell'apertura). */
  inPausa?: boolean;
  /** Vero solo per l'immagine di apertura della pagina: parte subito e con priorità. */
  priorita?: boolean;
  className?: string;
};

/**
 * Un video d'atmosfera: muto, in ciclo, senza comandi.
 *
 * È decorativo, quindi tre cautele:
 * - il file si scarica solo quando il riquadro sta per entrare in vista, e si
 *   ferma quando ne esce: tre video in pagina non devono pesare su chi non
 *   scorre fin lì (né sul telefono, dove due dei tre non compaiono affatto);
 * - sotto c'è sempre il primo fotogramma come immagine, così non resta mai un
 *   riquadro nero in attesa;
 * - chi ha chiesto al sistema meno animazioni vede solo l'immagine.
 */
export default function VideoLoop({ src, poster, inPausa = false, priorita = false, className = '' }: Props) {
  const contenitore = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [inVista, setInVista] = useState(false);
  const [montato, setMontato] = useState(false);

  useEffect(() => {
    const el = contenitore.current;
    if (!el) return;
    const osservatore = new IntersectionObserver(([voce]) => setInVista(voce.isIntersecting), {
      rootMargin: '200px',
    });
    osservatore.observe(el);
    return () => osservatore.disconnect();
  }, []);

  useEffect(() => {
    if (inVista) setMontato(true);
  }, [inVista]);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (inVista && !inPausa) {
      // Il browser può rifiutare l'avvio (risparmio energetico): resta l'immagine.
      v.play().catch(() => {});
    } else {
      v.pause();
    }
  }, [inVista, inPausa, montato]);

  return (
    <div ref={contenitore} className={`relative overflow-hidden bg-brand-dark ${className}`}>
      <img
        src={poster}
        alt=""
        aria-hidden="true"
        loading={priorita ? 'eager' : 'lazy'}
        fetchPriority={priorita ? 'high' : undefined}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {montato && !reduce && (
        <video
          ref={video}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          disablePictureInPicture
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
