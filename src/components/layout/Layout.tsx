import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import GalleryStrip from './GalleryStrip';

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
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <GalleryStrip />
      <Footer />
    </div>
  );
}
