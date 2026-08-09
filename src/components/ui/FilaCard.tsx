import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

type Props = {
  /** Una card per elemento: l'ordine è quello in cui vengono passate. */
  children: ReactNode[];
  /** Nome dell'insieme, per le etichette dei comandi. */
  etichetta: string;
  /**
   * Sotto questa soglia le card entrano tutte nello schermo grande e la fila
   * diventa una griglia centrata: niente da scorrere, niente comandi.
   */
  sogliaGriglia?: number;
};

/**
 * Fila di card che scorre di lato.
 *
 * Sul telefono sotto le card ci sono dei pallini, uno per card: dicono quante
 * sono e che ci si sposta di fianco, cosa che una fila tagliata dal bordo non
 * comunica da sola. Le frecce lì non servono — il dito fa già tutto.
 *
 * Su desktop i comandi stanno **sotto** la fila: sopra il titolo si prendevano
 * l'attenzione prima del contenuto. E quando le card sono poche non compaiono
 * affatto, perché non c'è niente da scorrere.
 */
export default function FilaCard({ children, etichetta, sogliaGriglia = 3 }: Props) {
  const pista = useRef<HTMLUListElement>(null);
  const [attiva, setAttiva] = useState(0);

  const totale = children.length;
  const griglia = totale <= sogliaGriglia;

  // Il pallino pieno segue la card più vicina al centro della pista.
  useEffect(() => {
    const el = pista.current;
    if (!el || griglia) return;

    const aggiorna = () => {
      const centro = el.scrollLeft + el.clientWidth / 2;
      let vicina = 0;
      let minimo = Infinity;

      [...el.children].forEach((card, i) => {
        const c = card as HTMLElement;
        const centroCard = c.offsetLeft + c.offsetWidth / 2;
        const distanza = Math.abs(centroCard - centro);
        if (distanza < minimo) {
          minimo = distanza;
          vicina = i;
        }
      });

      setAttiva(vicina);
    };

    aggiorna();
    el.addEventListener('scroll', aggiorna, { passive: true });
    return () => el.removeEventListener('scroll', aggiorna);
  }, [griglia, totale]);

  const vaiA = (i: number) => {
    const el = pista.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({ left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2, behavior: 'smooth' });
  };

  const scorri = (verso: 1 | -1) => vaiA(Math.min(Math.max(attiva + verso, 0), totale - 1));

  /*
   * Con poche card la fila diventa una griglia centrata. Una card sola in una
   * pista che scorre restava buttata a sinistra, come dimenticata lì.
   */
  const classiPista = griglia
    ? 'pista-card -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:flex lg:justify-center lg:overflow-visible lg:px-0 lg:pb-0'
    : 'pista-card -mx-6 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden';

  return (
    <div>
      <ul ref={pista} className={classiPista}>
        {children}
      </ul>

      {!griglia && (
        <>
          {/* Pallini: solo telefono e tablet. Uno per card, senza numeri. */}
          <div className="mt-6 flex items-center justify-center gap-2 lg:hidden">
            {children.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => vaiA(i)}
                aria-label={`${etichetta}: vai alla card ${i + 1} di ${totale}`}
                aria-current={i === attiva}
                className="flex h-6 w-6 items-center justify-center"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    i === attiva ? 'h-2 w-6 bg-brand-primary' : 'h-2 w-2 bg-brand-primary/30'
                  }`}
                ></span>
              </button>
            ))}
          </div>

          {/* Frecce: solo desktop, e sotto la fila. */}
          <div className="mt-8 hidden items-center justify-center gap-3 lg:flex">
            <button
              type="button"
              onClick={() => scorri(-1)}
              disabled={attiva === 0}
              aria-label={`${etichetta}: card precedente`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-primary/30 text-brand-dark transition-colors hover:border-brand-primary hover:bg-brand-primary hover:text-white disabled:pointer-events-none disabled:opacity-35"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scorri(1)}
              disabled={attiva === totale - 1}
              aria-label={`${etichetta}: card successiva`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-primary/30 text-brand-dark transition-colors hover:border-brand-primary hover:bg-brand-primary hover:text-white disabled:pointer-events-none disabled:opacity-35"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
