import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { categorie, percorsoCategoria } from '../../content/servizi';
import { PRENOTAZIONE_URL, SPAZIO_CORSI_NOME, SPAZIO_CORSI_NOME_CONFERMATO } from '../../config/site';

const categorieInMenu = categorie.filter((c) => c.inMenu);

const voci = [
  { label: 'Servizi', to: '/servizi', conSottomenu: true },
  { label: 'Team', to: '/team' },
  { label: 'Chi siamo', to: '/chi-siamo' },
  // Il piano superiore entra in menu solo quando il nome è confermato.
  ...(SPAZIO_CORSI_NOME_CONFERMATO ? [{ label: SPAZIO_CORSI_NOME, to: '/longeva' }] : []),
  { label: 'Contatti', to: '/contatti' },
];

export default function Navbar() {
  const [menuAperto, setMenuAperto] = useState(false);
  const [sottomenuAperto, setSottomenuAperto] = useState(false);
  const sottomenuRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    setMenuAperto(false);
    setSottomenuAperto(false);
  }, [pathname]);

  useEffect(() => {
    const fuori = (e: MouseEvent) => {
      if (sottomenuRef.current && !sottomenuRef.current.contains(e.target as Node)) {
        setSottomenuAperto(false);
      }
    };
    document.addEventListener('mousedown', fuori);
    return () => document.removeEventListener('mousedown', fuori);
  }, []);

  const classeVoce = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold transition-colors ${
      isActive ? 'text-brand-ink' : 'text-brand-dark hover:text-brand-ink'
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-6">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-full border border-brand-primary/20 bg-white/95 px-5 py-3 shadow-sm backdrop-blur-sm md:px-8">
        <Link to="/" className="shrink-0" aria-label="FisioEva, torna alla home">
          <img src="/logo.svg" alt="FisioEva" className="h-9 w-auto object-contain md:h-11" />
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          {voci.map((voce) =>
            voce.conSottomenu ? (
              <div key={voce.to} className="relative" ref={sottomenuRef}>
                <button
                  onClick={() => setSottomenuAperto(!sottomenuAperto)}
                  aria-expanded={sottomenuAperto}
                  className="group flex items-center gap-1"
                >
                  <span
                    className={`text-sm font-semibold transition-colors ${
                      pathname.startsWith('/servizi')
                        ? 'text-brand-ink'
                        : 'text-brand-dark group-hover:text-brand-ink'
                    }`}
                  >
                    {voce.label}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-brand-dark transition-transform ${
                      sottomenuAperto ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {sottomenuAperto && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-1/2 top-full mt-4 w-80 -translate-x-1/2 rounded-3xl border border-brand-primary/20 bg-white p-3 shadow-xl"
                    >
                      <Link
                        to="/servizi"
                        className="block rounded-2xl px-4 py-2.5 text-sm font-semibold text-brand-dark transition-colors hover:bg-brand-primary/15"
                      >
                        Da dove vuoi partire?
                      </Link>
                      <div className="my-2 h-px bg-brand-light" />
                      {categorieInMenu.map((cat) => (
                        <Link
                          key={cat.slug}
                          to={percorsoCategoria(cat.slug)}
                          className="block rounded-2xl px-4 py-2.5 transition-colors hover:bg-brand-primary/15"
                        >
                          <span className="block text-sm font-semibold text-brand-dark">
                            {cat.nome}
                          </span>
                          <span className="mt-0.5 block text-xs font-light text-brand-dark/60">
                            {cat.sottotitolo}
                          </span>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <NavLink key={voce.to} to={voce.to} className={classeVoce}>
                {voce.label}
              </NavLink>
            )
          )}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={PRENOTAZIONE_URL}
            className="hidden rounded-full bg-brand-dark px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-ink md:inline-flex"
          >
            Prenota
          </a>

          <button
            onClick={() => setMenuAperto(!menuAperto)}
            aria-expanded={menuAperto}
            aria-label={menuAperto ? 'Chiudi il menu' : 'Apri il menu'}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-primary/30 text-brand-dark transition-colors hover:bg-brand-primary/15 lg:hidden"
          >
            {menuAperto ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuAperto && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-3 flex max-h-[70vh] max-w-7xl flex-col gap-1 overflow-y-auto rounded-3xl border border-brand-primary/20 bg-white px-6 py-5 shadow-lg lg:hidden"
          >
            {voci.map((voce) => (
              <NavLink
                key={voce.to}
                to={voce.to}
                className={({ isActive }) =>
                  `rounded-2xl px-3 py-2.5 text-base font-semibold transition-colors ${
                    isActive ? 'bg-brand-primary/15 text-brand-ink' : 'text-brand-dark'
                  }`
                }
              >
                {voce.label}
              </NavLink>
            ))}

            <div className="my-2 h-px bg-brand-light" />
            {categorieInMenu.map((cat) => (
              <Link
                key={cat.slug}
                to={percorsoCategoria(cat.slug)}
                className="rounded-2xl px-3 py-2 text-sm font-light text-brand-dark/70"
              >
                {cat.nome}
              </Link>
            ))}

            <a
              href={PRENOTAZIONE_URL}
              className="mt-3 rounded-full bg-brand-dark px-6 py-3 text-center text-sm font-semibold text-white"
            >
              Prenota
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
