import { useState } from 'react';
import { ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { studio } from '../../data/site';

/** Voce di local storage che ricorda la scelta. Citata nella cookie policy. */
export const CHIAVE_CONSENSO_MAPPA = 'fisioeva:mappa';

const EMBED = `https://www.google.com/maps?q=${studio.mapsQuery}&output=embed`;
const APRI = `https://www.google.com/maps/search/?api=1&query=${studio.mapsQuery}`;

/** Il local storage non è disponibile ovunque (Safari in privata, dati bloccati). */
function leggiConsenso() {
  try {
    return localStorage.getItem(CHIAVE_CONSENSO_MAPPA) === 'si';
  } catch {
    return false;
  }
}

function salvaConsenso() {
  try {
    localStorage.setItem(CHIAVE_CONSENSO_MAPPA, 'si');
  } catch {
    /* Se il browser non ce lo lascia fare pazienza: si richiede al prossimo giro. */
  }
}

/**
 * La mappa di Google, caricata solo su richiesta.
 *
 * Un `<iframe>` di Google Maps imposta cookie di terze parti nell'istante in
 * cui la pagina si apre, quindi prima ancora che il visitatore possa dire di
 * sì: è esattamente il caso in cui servirebbe un banner di consenso. Il
 * problema si risolve meglio a monte — la mappa non parte da sola, e chi
 * vuole vederla la chiede. Chi non la vuole ha comunque il link diretto e
 * l'indirizzo scritto in chiaro, che è poi quello che serve per arrivare qui.
 *
 * La scelta viene ricordata nel local storage per non richiederla a ogni
 * visita.
 */
export default function MappaConsenso() {
  const [attiva, setAttiva] = useState(leggiConsenso);

  if (attiva) {
    return (
      <iframe
        title={`Mappa — ${studio.name}, ${studio.address}, ${studio.city}`}
        src={EMBED}
        className="h-[420px] w-full border-0 grayscale-[30%] md:h-[520px]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      ></iframe>
    );
  }

  return (
    <div className="relative flex h-[420px] w-full items-center justify-center overflow-hidden bg-brand-dark px-6 md:h-[520px]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[30%] -left-[10%] h-[120%] w-[60%] rounded-full bg-brand-primary/20 blur-[120px]"></div>
        <div className="absolute -bottom-[40%] -right-[10%] h-[120%] w-[60%] rounded-full bg-brand-secondary/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-md text-center">
        <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-brand-primary">
          <MapPin className="h-7 w-7" />
        </span>

        <p className="mb-2 font-sans text-xl font-medium text-white">
          {studio.address} — {studio.city}
        </p>
        <p className="mb-8 text-sm font-light leading-relaxed text-gray-400">
          La mappa arriva da Google, che imposterebbe cookie sul tuo dispositivo. Non la carichiamo
          senza chiedertelo: se preferisci evitare, apri direttamente Google Maps in una scheda
          nuova. Come funziona è spiegato nella{' '}
          <Link to="/cookie-policy" className="text-brand-primary underline underline-offset-2">
            cookie policy
          </Link>
          .
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              salvaConsenso();
              setAttiva(true);
            }}
            className="rounded-full bg-brand-primary px-7 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-white hover:text-brand-dark"
          >
            Carica la mappa
          </button>

          <a
            href={APRI}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-sm font-light text-white transition-colors duration-300 hover:border-white/60"
          >
            Apri in Google Maps
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
