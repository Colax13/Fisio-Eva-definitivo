import { useEffect, useLayoutEffect, useRef, useState } from 'react';
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

  /*
   * Blocco dello scorrimento dietro al menu.
   *
   * `overflow: hidden` sul body da solo non regge su iOS: Safari continua a
   * far scorrere la pagina sotto e, quando il dito arriva in fondo al menu, il
   * gesto passa al sito dietro. L'unico modo affidabile e' togliere il body dal
   * flusso (`position: fixed`) tenendo memoria di dove eravamo, e rimetterlo a
   * posto alla chiusura — altrimenti alla chiusura si torna in cima alla
   * pagina, che e' il difetto classico di questa soluzione.
   */
  useEffect(() => {
    if (!menuOpen) return;

    const scorrimento = window.scrollY;
    const stile = document.body.style;
    const precedente = {
      position: stile.position,
      top: stile.top,
      left: stile.left,
      right: stile.right,
      width: stile.width,
      overflow: stile.overflow,
    };

    stile.position = 'fixed';
    stile.top = `-${scorrimento}px`;
    stile.left = '0';
    stile.right = '0';
    stile.width = '100%';
    stile.overflow = 'hidden';

    return () => {
      Object.assign(stile, precedente);
      window.scrollTo({ top: scorrimento, behavior: 'instant' as ScrollBehavior });
    };
  }, [menuOpen]);

  /* Il tasto Esc chiude il menu: e' quello che ci si aspetta da un pannello a
     tutta pagina, e su tablet con tastiera e' l'unica via d'uscita rapida. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menuOpen]);

  /*
   * `--altezza-navbar` era usata dal menu ma non la scriveva nessuno: il menu
   * cadeva sul valore di ripiego (4.25rem) mentre la barra ne misura 4.06, e
   * fra le due restava una fessura da cui si vedeva la pagina sotto. Qui la
   * misura vera finisce nella variabile, e resta aggiornata se la barra cambia
   * altezza (rotazione dello schermo, font piu' grande impostato dall'utente).
   */
  const barra = useRef<HTMLElement>(null);
  useLayoutEffect(() => {
    const el = barra.current;
    if (!el) return;
    const misura = () =>
      document.documentElement.style.setProperty(
        '--altezza-navbar',
        `${Math.round(el.getBoundingClientRect().height)}px`
      );
    misura();
    const ro = new ResizeObserver(misura);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

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
      <nav
        ref={barra}
        className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-sm border-b border-brand-primary/10 shadow-sm"
      >
      {/*
       * I margini laterali passano da `px-4` a `env(safe-area-inset-*)`: sui
       * telefoni con la tacca, in orizzontale, il bordo utile dello schermo non
       * coincide con quello del viewport e il bottone del menu finiva sotto la
       * cornice. Dove l'inset non esiste il `max()` tiene i 16px di prima.
       */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 py-3 ps-[max(1rem,env(safe-area-inset-left))] pe-[max(1rem,env(safe-area-inset-right))] md:ps-[max(1.5rem,env(safe-area-inset-left))] md:pe-[max(1.5rem,env(safe-area-inset-right))]">
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
            aria-controls="menu-mobile"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </nav>

    {/*
     * Menu a tutta pagina.
     *
     * Era troppo alto per lo schermo: su un telefono da 360x640 le voci
     * occupavano 755px contro i 572 disponibili, quindi all'apertura le prime
     * due — Home e Chi Siamo — restavano sopra il bordo e bisognava
     * accorgersi che si poteva scorrere. Ora la lista e' compatta abbastanza
     * da entrare intera anche sui telefoni piccoli:
     *
     *  - il corpo delle voci scende da 30px a 24px (`text-2xl`);
     *  - lo spazio verticale di ogni riga passa da 16px a 10px;
     *  - indirizzo e mail stanno su una riga sola in fondo.
     *
     * Lo scorrimento resta come rete di sicurezza (schermi molto bassi,
     * telefono in orizzontale, corpo di testo ingrandito dal sistema), ma con
     * `justify-start` invece di `justify-center`: la centratura, quando il
     * contenuto e' piu' alto del contenitore, sposta l'inizio sopra il punto
     * zero dello scorrimento e la prima voce diventa irraggiungibile.
     *
     * `top` legge la misura vera della barra, scritta in `--altezza-navbar`:
     * col valore di ripiego restava una fessura di 3px da cui si vedeva la
     * pagina sotto — una riga scura appiccicata al bordo della barra.
     */}
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu di navigazione"
          className="fixed inset-0 top-[var(--altezza-navbar,4rem)] z-40 flex flex-col justify-start overflow-y-auto overscroll-contain bg-brand-light xl:hidden"
        >
          <nav
            aria-label="Navigazione principale"
            className="flex flex-col gap-0 px-6 pt-4 pb-2 ps-[max(1.5rem,env(safe-area-inset-left))] pe-[max(1.5rem,env(safe-area-inset-right))]"
          >
            {links.map((link, i) => (
              <motion.div
                key={link.to}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.28, delay: 0.04 + i * 0.035 }}
              >
                <NavLink
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `flex items-baseline gap-4 border-b border-brand-dark/10 py-2.5 font-sans text-2xl font-bold transition-colors ${
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
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, delay: 0.34 }}
            className="mt-auto px-6 pt-4 ps-[max(1.5rem,env(safe-area-inset-left))] pe-[max(1.5rem,env(safe-area-inset-right))] pb-[max(1.5rem,env(safe-area-inset-bottom))]"
          >
            <ArrowButton to="/contatti" icon={CalendarCheck} verso="inizio">
              Prenota ora
            </ArrowButton>

            {/* Su una riga sola: due righe separate costavano 40px di altezza
                per un'informazione che qui e' di servizio. */}
            <p className="mt-4 text-sm leading-relaxed font-light text-gray-600">
              {studio.address}, {studio.city} ·{' '}
              <a
                href={`mailto:${studio.email}`}
                className="text-brand-primary-ink underline underline-offset-4"
              >
                {studio.email}
              </a>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
