import { Mail, MapPin, Phone, Instagram, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { studio, team } from '../../data/site';

const naviga = [
  { label: 'Home', to: '/' },
  { label: 'Chi Siamo', to: '/chi-siamo' },
  { label: 'Servizi', to: '/servizi' },
  { label: 'Progetti', to: '/progetti' },
  { label: 'Team', to: '/team' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contatti', to: '/contatti' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-dark text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -bottom-[40%] -left-[10%] h-[80%] w-[50%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 pt-14 pb-8 sm:px-6 md:pt-20 md:pb-10">
        {/* Sul telefono le quattro colonne diventano una: tutto centrato, così
            il piede della pagina non si legge a zig-zag. */}
        <div className="mb-12 grid grid-cols-1 gap-10 text-center sm:grid-cols-2 sm:text-left md:mb-16 lg:grid-cols-4 lg:gap-12">
          <div className="flex flex-col items-center sm:items-start">
            <div className="mb-5 w-max rounded-2xl bg-white p-4">
              <img src="/logo.svg" alt="FisioEVA" className="h-12 w-auto object-contain" />
            </div>
            <p className="max-w-xs text-sm leading-relaxed font-light text-gray-300">
              {studio.claim} a Casalotti, Roma. Un percorso costruito su di te, a due passi da casa
              tua.
            </p>
            <a
              href={studio.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-5 inline-flex min-h-11 items-center gap-3 text-sm text-gray-300 transition-colors hover:text-brand-primary"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition-colors group-hover:border-brand-primary">
                <Instagram className="h-5 w-5" />
              </span>
              @{studio.instagram}
            </a>
          </div>

          <div>
            <h3 className="mb-4 font-sans text-lg font-semibold md:mb-6">Naviga</h3>
            <ul className="flex flex-wrap justify-center gap-x-5 gap-y-1 sm:flex-col sm:gap-y-1">
              {naviga.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-flex min-h-11 items-center text-sm font-light text-gray-300 transition-colors hover:text-brand-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-sans text-lg font-semibold md:mb-6">Contatti</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start justify-center gap-3 sm:justify-start">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                <span className="font-light text-gray-300">
                  {studio.address}
                  <br />
                  {studio.city} ({studio.zone})
                </span>
              </li>
              {team
                .filter((m) => m.phone)
                .map((m) => (
                  <li key={m.slug} className="flex items-start justify-center gap-3 sm:justify-start">
                    <Phone className="mt-3 h-4 w-4 shrink-0 text-brand-primary" />
                    <a
                      href={m.phoneHref}
                      className="inline-flex min-h-11 items-center font-light text-gray-300 transition-colors hover:text-brand-secondary"
                    >
                      {m.phone} <span className="ml-1 text-gray-400">({m.short})</span>
                    </a>
                  </li>
                ))}
              <li className="flex items-start justify-center gap-3 sm:justify-start">
                <Mail className="mt-3 h-4 w-4 shrink-0 text-brand-primary" />
                <a
                  href={`mailto:${studio.email}`}
                  className="inline-flex min-h-11 items-center font-light break-all text-gray-300 transition-colors hover:text-brand-secondary"
                >
                  {studio.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-sans text-lg font-semibold md:mb-6">Orari</h3>
            <ul className="space-y-3 text-sm">
              {studio.orari.map((o) => (
                <li key={o.giorno} className="flex items-start justify-center gap-3 sm:justify-start">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                  <span className="font-light text-gray-300">
                    {o.giorno}
                    <br />
                    <span className="text-white">{o.ore}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-gray-400 md:flex-row">
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} {studio.name} — {studio.claim}. Tutti i diritti riservati.
          </p>
          <p className="flex items-center gap-2 tracking-[0.2em] uppercase">
            Muoviti <span className="h-1 w-1 rounded-full bg-brand-secondary"></span> Respira{' '}
            <span className="h-1 w-1 rounded-full bg-brand-secondary"></span> Vivi
          </p>
        </div>
      </div>
    </footer>
  );
}
