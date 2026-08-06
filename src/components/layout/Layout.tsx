import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import BannerCookie from '../ui/BannerCookie';

/** Riporta in cima al cambio pagina, o all'ancora se l'URL ne ha una. */
function GestoreScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);

  return null;
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-brand-light font-sans">
      <GestoreScroll />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BannerCookie />
    </div>
  );
}
