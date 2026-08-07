import { useEffect, useRef, useState } from 'react';
import { CalendarCheck, ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { servizi } from '../../data/site';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Chi Siamo', to: '/chi-siamo' },
  { label: 'Servizi', to: '/servizi', children: servizi.map((s) => ({ label: s.titolo, to: `/servizi#${s.slug}` })) },
  { label: 'Progetti', to: '/progetti' },
  { label: 'Team', to: '/team' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'FAQ', to: '/faq' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  /* Con il menu aperto la pagina dietro non deve scorrere, e Esc deve chiuderlo:
     su un telefono restare intrappolati in un menu che non si chiude è la cosa
     più fastidiosa che possa capitare. */
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-brand-secondary-ink' : 'text-brand-dark hover:text-brand-secondary-ink'
    }`;

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 px-3 py-3 sm:px-4 md:px-6 md:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 rounded-full border border-brand-primary/10 bg-white/95 px-4 py-2.5 shadow-sm backdrop-blur-sm md:px-8 md:py-3">
        <Link
          to="/"
          className="flex min-h-11 shrink-0 items-center"
          aria-label="FisioEVA, torna alla home"
        >
          <img src="/logo.svg" alt="FisioEVA" className="h-9 w-auto object-contain md:h-12" />
        </Link>

        <div className="hidden items-center gap-7 xl:flex">
          {links.map((link) =>
            link.children ? (
              <div key={link.to} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="group flex items-center gap-1"
                  aria-expanded={dropdownOpen}
                >
                  <span
                    className={`text-sm font-medium transition-colors ${
                      location.pathname.startsWith(link.to)
                        ? 'text-brand-secondary-ink'
                        : 'text-brand-dark group-hover:text-brand-secondary-ink'
                    }`}
                  >
                    {link.label}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-brand-dark transition-all group-hover:text-brand-secondary-ink ${
                      dropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full left-1/2 mt-4 w-72 -translate-x-1/2 rounded-3xl border border-brand-primary/10 bg-white p-3 shadow-xl"
                    >
                      <Link
                        to="/servizi"
                        className="block rounded-2xl px-4 py-2.5 text-sm font-medium text-brand-dark transition-colors hover:bg-brand-primary/10 hover:text-brand-secondary-ink"
                      >
                        Tutti i trattamenti
                      </Link>
                      <div className="my-2 h-px bg-gray-100"></div>
                      {link.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block rounded-2xl px-4 py-2.5 text-sm font-light text-gray-600 transition-colors hover:bg-brand-secondary/10 hover:text-brand-dark"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
                {link.label}
              </NavLink>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Sul telefono la prenotazione resta raggiungibile senza aprire il
              menu: si riduce alla sola icona, ma non sparisce. */}
          <Link
            to="/contatti"
            aria-label="Prenota ora"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border-2 border-brand-primary bg-white px-3 text-sm font-medium whitespace-nowrap text-brand-dark shadow-sm transition-colors duration-300 hover:bg-brand-primary hover:text-white sm:px-6 lg:px-8"
          >
            <CalendarCheck className="h-4 w-4 sm:hidden" aria-hidden="true" />
            <span className="hidden sm:inline">Prenota ora</span>
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-primary/20 text-brand-dark transition-colors hover:bg-brand-primary/10 xl:hidden"
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 flex max-h-[70svh] max-w-7xl flex-col overflow-y-auto rounded-3xl border border-brand-primary/10 bg-white/98 px-4 py-3 shadow-lg backdrop-blur-sm xl:hidden"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `flex min-h-12 items-center rounded-2xl px-4 text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-brand-primary/10 text-brand-secondary-ink'
                      : 'text-brand-dark hover:bg-brand-primary/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contatti"
              className="mt-3 flex min-h-12 items-center justify-center rounded-full border-2 border-brand-primary bg-white px-8 text-sm font-medium text-brand-dark transition-colors duration-300 hover:bg-brand-primary hover:text-white"
            >
              Prenota ora
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
