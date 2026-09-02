import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { legale, studio } from '../../data/site';
import DatoMancante from '../ui/DatoMancante';

/**
 * Footer.
 *
 * Chiaro come tutto il resto del sito: il fondo scuro spezzava la pagina e non
 * apparteneva alla palette. Niente foto, niente colonne di link ripetuti —
 * restano indirizzo, contatti e legale, che è quello che si cerca davvero
 * quando si arriva in fondo.
 *
 * La colonna "Naviga" si vede solo da tablet in su: su mobile ripeterebbe il
 * menu dell'hamburger, che sta a due dita di distanza.
 */
const naviga = [
  { label: 'Servizi', to: '/servizi' },
  { label: 'Team', to: '/team' },
  { label: 'Chi siamo', to: '/chi-siamo' },
  { label: 'Contatti', to: '/contatti' },
  { label: 'FAQ', to: '/faq' },
];

export default function Footer() {
  return (
    <footer className="relative z-10 bg-brand-light/80 backdrop-blur-[2px] border-t border-brand-primary/15">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr] gap-10 md:gap-12">
          <div>
            <img src="/logo.svg" alt="FisioEVA" className="h-10 w-auto object-contain mb-5" />
            <p className="text-gray-600 font-light text-sm leading-relaxed max-w-xs">
              {studio.claim} a {studio.zone}, Roma. Un percorso costruito su di te, in ogni fase
              della vita.
            </p>
          </div>

          {/* Contatti tutti allineati a sinistra, una riga per voce. */}
          <div>
            <h2 className="text-brand-dark font-sans font-bold text-sm mb-5">Contatti</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-gray-600 font-light">
                  {studio.address}
                  <br />
                  {studio.city}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <a
                  href={studio.phoneHref}
                  className="text-gray-600 font-light hover:text-brand-dark transition-colors"
                >
                  {studio.phone}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <a
                  href={`mailto:${studio.email}`}
                  className="text-gray-600 font-light hover:text-brand-dark transition-colors break-all"
                >
                  {studio.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Instagram className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <a
                  href={studio.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 font-light hover:text-brand-dark transition-colors"
                >
                  @{studio.instagram}
                </a>
              </li>
            </ul>
          </div>

          {/* Su mobile l'hamburger fa già questo lavoro. */}
          <div className="hidden md:block">
            <h2 className="text-brand-dark font-sans font-bold text-sm mb-5">Naviga</h2>
            <ul className="space-y-3">
              {naviga.map((voce) => (
                <li key={voce.to}>
                  <Link
                    to={voce.to}
                    className="text-sm text-gray-600 font-light hover:text-brand-dark transition-colors"
                  >
                    {voce.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Riga legale: dati identificativi e i due documenti obbligatori. Su
            un sito che tratta dati sanitari è la parte che non può mancare, e
            va raggiungibile da ogni pagina. */}
        <div className="mt-12 flex flex-col gap-4 border-t border-brand-dark/10 pt-6 text-xs text-gray-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {studio.name} — {studio.claim}.{' '}
            {legale.partitaIva ? (
              <>P.IVA {legale.partitaIva}.</>
            ) : (
              <DatoMancante id="partita IVA" nascondiInProduzione />
            )}
          </p>

          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link to="/privacy" className="transition-colors hover:text-brand-dark">
                Privacy policy
              </Link>
            </li>
            <li>
              <Link to="/cookie-policy" className="transition-colors hover:text-brand-dark">
                Cookie policy
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
