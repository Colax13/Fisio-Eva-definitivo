import { Mail, MapPin, Phone, Instagram, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[40%] -right-[10%] w-[50%] h-[80%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        <div className="absolute -bottom-[40%] -left-[10%] w-[50%] h-[80%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div>
            <div className="bg-white rounded-2xl p-4 w-max mb-6">
              <img src="/logo.svg" alt="FisioEVA" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-gray-400 font-light text-sm leading-relaxed max-w-xs">
              Studio di Fisioterapia e Osteopatia. Cure empatiche e percorsi personalizzati per il tuo benessere, a due passi da casa tua.
            </p>
            <a
              href="https://www.instagram.com/fisioeva_boccea"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-brand-primary transition-colors"
            >
              <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-brand-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </span>
              @fisioeva_boccea
            </a>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-sans font-medium text-lg mb-6">Naviga</h3>
            <ul className="space-y-3">
              {[
                { label: 'Home', href: '#home' },
                { label: 'Chi Siamo', href: '#chi-siamo' },
                { label: 'Servizi', href: '#servizi' },
                { label: 'Il Team', href: '#team' },
                { label: 'Progetti', href: '#progetti' },
                { label: 'Contatti', href: '#contatti' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-gray-400 font-light text-sm hover:text-brand-secondary transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="font-sans font-medium text-lg mb-6">Contatti</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span className="text-gray-400 font-light">Via di Boccea, 755 — 00166 Roma</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <a href="tel:+393803640807" className="text-gray-400 font-light hover:text-brand-secondary transition-colors">
                  +39 380 364 0807 <span className="text-gray-500">(Azzurra)</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <a href="tel:+393338745324" className="text-gray-400 font-light hover:text-brand-secondary transition-colors">
                  +39 333 874 5324 <span className="text-gray-500">(Elisa)</span>
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <a href="mailto:fisioeva.boccia@gmail.com" className="text-gray-400 font-light hover:text-brand-secondary transition-colors break-all">
                  fisioeva.boccia@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} FisioEVA — Studio di Fisioterapia e Osteopatia. Tutti i diritti riservati.</p>
          <p className="flex items-center gap-1.5">
            Muoviti <span className="w-1 h-1 rounded-full bg-brand-secondary"></span> Respira <span className="w-1 h-1 rounded-full bg-brand-secondary"></span> Vivi
            <Heart className="w-3.5 h-3.5 text-brand-primary ml-1" fill="currentColor" />
          </p>
        </div>
      </div>
    </footer>
  );
}
