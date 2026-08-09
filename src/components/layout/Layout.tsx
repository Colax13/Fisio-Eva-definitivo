import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { WaveBackground } from '../WaveBackground';

/** Scrolls to the top on navigation, or to the anchor when the URL carries a hash. */
function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname, hash]);

  return null;
}

export default function Layout() {
  return (
    <div className="font-sans min-h-screen flex flex-col">
      <ScrollManager />

      {/*
       * Lo sfondo a onde sta qui, una volta sola e ancorato al viewport: prima
       * viveva dentro due sezioni e compariva a tratti. Le sezioni chiare sopra
       * sono traslucide, così le onde continuano a leggersi per tutta la
       * pagina invece di accendersi e spegnersi mentre si scorre.
       */}
      <WaveBackground fisso />
      {/* Chi naviga da tastiera o con uno screen reader non deve rileggersi la
          navbar a ogni cambio pagina. */}
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-brand-dark focus:px-6 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
      >
        Vai al contenuto
      </a>
      <Navbar />
      <main id="contenuto" className="relative z-10 flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
