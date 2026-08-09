import { useEffect, useRef, useState } from 'react';
import { CalendarCheck, ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { categorie, studio } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Chi Siamo', to: '/chi-siamo' },
  // Le voci del menu puntano alle aree reali della pagina servizi — prima
  // erano ancore a sezioni che non esistevano più, quindi non portavano da
  // nessuna parte. Le terapie di gruppo sono fra queste.
  {
    label: 'Servizi',
    to: '/servizi',
    children: categorie.map((c) => ({ label: c.nome, to: `/servizi#${c.slug}` })),
  },
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

  /* Con il menu a tutta pagina aperto, il sito dietro non deve scorrere. */
  useEffect(() => {
    if (!menuOpen) return;
    const precedente = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = precedente;
    };
  }, [menuOpen]);

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
    <>
      {/*
       * Attaccata in alto, a filo: niente pillola fluttuante e nessun margine.
       * Il menu a tutta pagina sta FUORI da questo elemento: il backdrop-blur
       * crea un blocco contenitore, e un figlio `fixed` ci resterebbe dentro —
       * l'overlay veniva alto zero.
       */}
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
          {/* Lo stesso bottone della chiusura di pagina: prima era una pillola a sé,
              con un'animazione diversa da tutte le altre del sito. */}
          <span className="hidden xl:block">
            <ArrowButton to="/contatti" icon={CalendarCheck} verso="inizio" block={false}>
              Prenota ora
            </ArrowButton>
          </span>

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
    </nav>

    {/*
     * Menu a tutta pagina. Il pannello a fisarmonica sotto la barra lasciava
     * intravedere il sito dietro e obbligava a scorrere dentro un riquadro
     * alto 70vh. A schermo pieno le voci sono grandi, stanno tutte, e il
     * pollice le prende senza mirare.
     */}
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 top-[var(--altezza-navbar,4.25rem)] z-40 flex flex-col overflow-y-auto bg-brand-light xl:hidden"
        >
          <nav className="flex flex-1 flex-col justify-center gap-1 px-8 py-10">
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 + i * 0.045 }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `flex items-baseline gap-4 border-b border-brand-dark/10 py-4 font-sans text-3xl font-bold transition-colors ${
                      isActive ? 'text-brand-primary' : 'text-brand-dark'
                    }`
                  }
                >
                  <span className="text-eyebrow font-semibold text-brand-primary-ink">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {link.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="px-8 pb-12"
          >
            <ArrowButton to="/contatti" icon={CalendarCheck} verso="inizio">
              Prenota ora
            </ArrowButton>

            <p className="mt-6 text-sm font-light text-gray-600">
              {studio.address}, {studio.city}
            </p>
            <a
              href={`mailto:${studio.email}`}
              className="text-sm font-light text-brand-primary-ink underline underline-offset-4"
            >
              {studio.email}
            </a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
