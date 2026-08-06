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
    <footer className="bg-brand-dark text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -bottom-[40%] -left-[10%] w-[50%] h-[80%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="bg-white rounded-2xl p-4 w-max mb-6">
              <img src="/logo.svg" alt="FisioEVA" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-gray-400 font-light text-sm leading-relaxed max-w-xs">
              {studio.claim} a Casalotti, Roma. Un percorso costruito su di te, a due
              passi da casa tua.
            </p>
            <a
              href={studio.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-3 text-sm text-gray-300 hover:text-brand-primary transition-colors group"
            >
              <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:border-brand-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </span>
              @{studio.instagram}
            </a>
          </div>

          <div>
            <h3 className="font-sans font-medium text-lg mb-6">Naviga</h3>
            <ul className="space-y-3">
              {naviga.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-gray-400 font-light text-sm hover:text-brand-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-medium text-lg mb-6">Contatti</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-gray-400 font-light">
                  {studio.address}
                  <br />
                  {studio.city} ({studio.zone})
                </span>
              </li>
              {team
                .filter((m) => m.phone)
                .map((m) => (
                  <li key={m.slug} className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                    <a
                      href={m.phoneHref}
                      className="text-gray-400 font-light hover:text-brand-secondary transition-colors"
                    >
                      {m.phone} <span className="text-gray-500">({m.short})</span>
                    </a>
                  </li>
                ))}
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <a
                  href={`mailto:${studio.email}`}
                  className="text-gray-400 font-light hover:text-brand-secondary transition-colors break-all"
                >
                  {studio.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans font-medium text-lg mb-6">Orari</h3>
            <ul className="space-y-4 text-sm">
              {studio.orari.map((o) => (
                <li key={o.giorno} className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-brand-secondary shrink-0 mt-0.5" />
                  <span className="text-gray-400 font-light">
                    {o.giorno}
                    <br />
                    <span className="text-white">{o.ore}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} {studio.name} — {studio.claim}. Tutti i diritti riservati.
          </p>
          <p className="flex items-center gap-2 tracking-[0.2em] uppercase">
            Muoviti <span className="w-1 h-1 rounded-full bg-brand-secondary"></span> Respira{' '}
            <span className="w-1 h-1 rounded-full bg-brand-secondary"></span> Vivi
          </p>
        </div>
      </div>
    </footer>
  );
}
