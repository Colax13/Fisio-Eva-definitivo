import { Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { categorie, percorsoCategoria } from '../../content/servizi';
import { studio } from '../../config/site';
import DatoMancante from '../ui/DatoMancante';
import { Onda } from '../ui/Motivi';

const naviga = [
  { label: 'Servizi', to: '/servizi' },
  { label: 'Team', to: '/team' },
  { label: 'Chi siamo', to: '/chi-siamo' },
  { label: 'Contatti', to: '/contatti' },
  { label: 'Domande frequenti', to: '/faq' },
];

const legale = [
  { label: 'Privacy policy', to: '/privacy' },
  { label: 'Cookie policy', to: '/cookie-policy' },
];

export default function Footer() {
  return (
    <footer className="relative bg-brand-dark text-white">
      <Onda className="absolute inset-x-0 -top-px h-12 w-full rotate-180 text-brand-light" />

      <div className="relative mx-auto max-w-7xl px-6 pb-10 pt-24">
        <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-6 w-max rounded-2xl bg-white p-4">
              <img src="/logo.svg" alt="FisioEva" className="h-11 w-auto object-contain" />
            </div>
            <p className="max-w-xs text-sm font-light leading-relaxed text-white/70">
              {studio.claim} a {studio.zona}, {studio.citta}. Un percorso costruito su di te, in
              ogni fase della vita.
            </p>
            <a
              href={studio.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex items-center gap-3 text-sm text-white/70 transition-colors hover:text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors group-hover:border-brand-primary">
                <Instagram className="h-5 w-5" />
              </span>
              @{studio.instagram}
            </a>
          </div>

          <div>
            <h2 className="mb-6 text-base font-semibold">Servizi</h2>
            <ul className="space-y-3">
              {categorie
                .filter((c) => c.inMenu)
                .map((cat) => (
                  <li key={cat.slug}>
                    <Link
                      to={percorsoCategoria(cat.slug)}
                      className="text-sm font-light text-white/70 transition-colors hover:text-brand-primary"
                    >
                      {cat.nome}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-base font-semibold">Naviga</h2>
            <ul className="space-y-3">
              {naviga.map((voce) => (
                <li key={voce.to}>
                  <Link
                    to={voce.to}
                    className="text-sm font-light text-white/70 transition-colors hover:text-brand-primary"
                  >
                    {voce.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-base font-semibold">Dove siamo</h2>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                <span className="font-light text-white/70">
                  {studio.indirizzo}
                  <br />
                  {studio.cap} {studio.citta} ({studio.zona})
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                {studio.telefono ? (
                  <a
                    href={`tel:${studio.telefono.replace(/\s/g, '')}`}
                    className="font-light text-white/70 transition-colors hover:text-brand-primary"
                  >
                    {studio.telefono}
                  </a>
                ) : (
                  <DatoMancante id="telefono" />
                )}
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                <a
                  href={`mailto:${studio.email}`}
                  className="break-all font-light text-white/70 transition-colors hover:text-brand-primary"
                >
                  {studio.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-8 text-xs text-white/50 md:flex-row md:items-center md:justify-between">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span>
              © {new Date().getFullYear()} {studio.nome} — {studio.claim}.
            </span>
            {studio.partitaIva ? (
              <span>P.IVA {studio.partitaIva}</span>
            ) : (
              <DatoMancante id="piva" />
            )}
          </p>

          <ul className="flex flex-wrap items-center gap-4">
            {legale.map((voce) => (
              <li key={voce.to}>
                <Link to={voce.to} className="transition-colors hover:text-white">
                  {voce.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
