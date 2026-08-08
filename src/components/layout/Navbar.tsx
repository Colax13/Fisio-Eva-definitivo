import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { servizi } from '../../data/site';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Chi Siamo', to: '/chi-siamo' },
  { label: 'Servizi', to: '/servizi', children: servizi.map((s) => ({ label: s.titolo, to: `/servizi#${s.slug}` })) },
  { label: 'Team', to: '/team' },
  { label: 'Gallery', to: '/gallery' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contatti', to: '/contatti' },
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

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors ${
      isActive ? 'text-brand-secondary' : 'text-brand-dark hover:text-brand-secondary'
    }`;

  return (
    /* Attaccata in alto, a filo: niente pillola fluttuante e nessun margine. */
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-primary/10 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center shrink-0">
          <img src="/logo.svg" alt="FisioEVA" className="h-9 md:h-12 w-auto object-contain" />
        </Link>

        <div className="hidden xl:flex items-center gap-7">
          {links.map((link) =>
            link.children ? (
              <div key={link.to} className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 group"
                  aria-expanded={dropdownOpen}
                >
                  <span
                    className={`text-sm font-medium transition-colors ${
                      location.pathname.startsWith(link.to)
                        ? 'text-brand-secondary'
                        : 'text-brand-dark group-hover:text-brand-secondary'
                    }`}
                  >
                    {link.label}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-brand-dark group-hover:text-brand-secondary transition-all ${
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
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-72 bg-white rounded-3xl shadow-xl border border-brand-primary/10 p-3"
                    >
                      <Link
                        to="/servizi"
                        className="block px-4 py-2.5 rounded-2xl text-sm font-medium text-brand-dark hover:bg-brand-primary/10 hover:text-brand-secondary transition-colors"
                      >
                        Tutti i trattamenti
                      </Link>
                      <div className="h-px bg-gray-100 my-2"></div>
                      {link.children.map((child) => (
                        <Link
                          key={child.to}
                          to={child.to}
                          className="block px-4 py-2.5 rounded-2xl text-sm font-light text-gray-600 hover:bg-brand-secondary/10 hover:text-brand-dark transition-colors"
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

        <div className="flex items-center gap-3">
          <Link
            to="/contatti"
            /* Solo quando c'è il menu esteso: su mobile restano logo e hamburger. */
            className="hidden xl:inline-flex items-center border-2 border-brand-primary bg-white text-brand-dark hover:bg-brand-primary hover:text-white rounded-full px-6 lg:px-8 py-2.5 transition-colors duration-300 font-medium text-sm shadow-sm whitespace-nowrap"
          >
            Prenota ora
          </Link>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="xl:hidden w-10 h-10 rounded-full border border-brand-primary/20 flex items-center justify-center text-brand-dark hover:bg-brand-primary/10 transition-colors"
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="xl:hidden bg-white border-t border-brand-primary/10 px-6 py-6 shadow-lg flex flex-col gap-4 max-h-[70vh] overflow-y-auto"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-base font-medium transition-colors ${
                    isActive ? 'text-brand-secondary' : 'text-brand-dark hover:text-brand-secondary'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Link
              to="/contatti"
              className="mt-2 flex items-center justify-center border-2 border-brand-primary bg-white text-brand-dark hover:bg-brand-primary hover:text-white rounded-full px-8 py-3 transition-colors duration-300 font-medium text-sm"
            >
              Prenota ora
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
