import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

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
    <div className="font-sans bg-brand-light min-h-screen flex flex-col">
      <ScrollManager />
      {/* Chi naviga da tastiera o con uno screen reader non deve rileggersi la
          navbar a ogni cambio pagina. */}
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-brand-dark focus:px-6 focus:py-3 focus:text-sm focus:font-medium focus:text-white"
      >
        Vai al contenuto
      </a>
      <Navbar />
      <main id="contenuto" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
