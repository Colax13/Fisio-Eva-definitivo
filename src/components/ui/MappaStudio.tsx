import { MapPin } from 'lucide-react';
import { studio } from '../../config/site';
import { useConsenso } from '../../lib/consenso';

const INDIRIZZO = `${studio.indirizzo}, ${studio.cap} ${studio.citta}`;
const RICERCA = encodeURIComponent(INDIRIZZO);

type Props = {
  /** Altezza del riquadro: la mappa e il segnaposto devono occupare lo stesso spazio. */
  altezza?: string;
  className?: string;
};

/**
 * La mappa dello studio, montata solo dopo il consenso.
 *
 * Senza consenso l'iframe non esiste nel DOM: Google non riceve né IP né
 * cookie. Al suo posto c'è l'indirizzo con un pulsante per accettare e un link
 * per aprire la mappa in una scheda esterna — chi rifiuta trova comunque
 * l'informazione, che è il punto della sezione.
 */
export default function MappaStudio({ altezza = 'h-[380px]', className = '' }: Props) {
  const { consenso, accetta } = useConsenso();

  const cornice = `overflow-hidden rounded-[2.5rem] border border-brand-primary/25 ${className}`;

  if (consenso === 'accettato') {
    return (
      <div className={cornice}>
        <iframe
          title={`Mappa: ${studio.nome}, ${INDIRIZZO}`}
          src={`https://www.google.com/maps?q=${RICERCA}&output=embed`}
          className={`${altezza} w-full border-0`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    );
  }

  return (
    <div className={`${cornice} bg-brand-light`}>
      <div className={`${altezza} flex w-full flex-col items-center justify-center gap-5 px-8 text-center`}>
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-primary/20 text-brand-ink">
          <MapPin className="h-6 w-6" aria-hidden="true" />
        </span>

        <p className="font-light leading-relaxed text-brand-dark/75">
          <span className="font-semibold text-brand-dark">{INDIRIZZO}</span>
          <br />
          Zona {studio.zona}, Roma Ovest.
        </p>

        <p className="max-w-sm text-sm font-light leading-relaxed text-brand-dark/60">
          La mappa è di Google e può impostare cookie: la carichiamo solo se ce lo permetti.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={accetta}
            className="inline-flex items-center justify-center rounded-full bg-brand-dark px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-ink"
          >
            Mostra la mappa
          </button>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${RICERCA}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-brand-ink underline underline-offset-4"
          >
            Aprila in una nuova scheda
          </a>
        </div>
      </div>
    </div>
  );
}
