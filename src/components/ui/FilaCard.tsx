import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Props = {
  /** Una card per elemento: l'ordine è quello in cui vengono passate. */
  children: ReactNode[];
  /** Nome dell'insieme, per le etichette dei comandi. */
  etichetta: string;
};

/**
 * Fila di card che scorre di lato.
 *
 * Le frecce stanno sotto la fila e ci sono su tutte le larghezze: sul telefono
 * il dito basta, ma vederle dice che c'è dell'altro di fianco.
 *
 * Quando le card entrano tutte nello spazio disponibile la fila si centra e i
 * comandi spariscono — una card sola buttata a sinistra sembrava dimenticata lì.
 */
export default function FilaCard({ children, etichetta }: Props) {
  const pista = useRef<HTMLUListElement>(null);
  const [attiva, setAttiva] = useState(0);
  const [scorribile, setScorribile] = useState(false);

  const totale = children.length;

  /*
   * Se serve scorrere non si decide dal numero di card ma dallo spazio reale:
   * tre card ci stanno su un desktop grande e non su un portatile stretto.
   */
  useEffect(() => {
    const el = pista.current;
    if (!el) return;

    const misura = () => {
      setScorribile(el.scrollWidth > el.clientWidth + 4);

      const centro = el.scrollLeft + el.clientWidth / 2;
      let vicina = 0;
      let minimo = Infinity;

      [...el.children].forEach((card, i) => {
        const c = card as HTMLElement;
        const distanza = Math.abs(c.offsetLeft + c.offsetWidth / 2 - centro);
        if (distanza < minimo) {
          minimo = distanza;
          vicina = i;
        }
      });

      setAttiva(vicina);
    };

    misura();
    el.addEventListener('scroll', misura, { passive: true });

    // Sia l'observer sia l'evento di finestra: il primo coglie i cambi di
    // layout interni, il secondo è la rete di sicurezza sui ridimensionamenti.
    const ro = new ResizeObserver(misura);
    ro.observe(el);
    window.addEventListener('resize', misura);

    return () => {
      el.removeEventListener('scroll', misura);
      window.removeEventListener('resize', misura);
      ro.disconnect();
    };
  }, [totale]);

  const vaiA = (i: number) => {
    const el = pista.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2,
      behavior: 'smooth',
    });
  };

  const scorri = (verso: 1 | -1) => vaiA(Math.min(Math.max(attiva + verso, 0), totale - 1));

  return (
    <div>
      {/* La centratura la fa `.pista-card` con `justify-content: safe center`. */}
      <ul ref={pista} className="pista-card -mx-6 flex snap-x gap-6 sm:mx-0">
        {children}
      </ul>

      {scorribile && (
        <div className="mt-8 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => scorri(-1)}
            disabled={attiva === 0}
            aria-label={`${etichetta}: card precedente`}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-primary/30 text-brand-dark transition-colors hover:border-brand-primary hover:bg-brand-primary hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => scorri(1)}
            disabled={attiva === totale - 1}
            aria-label={`${etichetta}: card successiva`}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-brand-primary/30 text-brand-dark transition-colors hover:border-brand-primary hover:bg-brand-primary hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
