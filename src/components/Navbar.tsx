import { useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Chi Siamo', href: '#chi-siamo' },
  { label: 'Servizi', href: '#servizi' },
  { label: 'Progetti', href: '#progetti' },
  { label: 'Contatti', href: '#contatti' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-sm rounded-full px-8 py-3 flex items-center justify-between shadow-sm border border-brand-primary/10">
        {/* Logo */}
        <a href="#home" className="flex items-center">
          <img src="/logo.svg" alt="FisioEVA" className="h-10 md:h-12 w-auto object-contain" />
        </a>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-brand-dark hover:text-brand-secondary transition-colors">
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* CTA */}
          <a href="#contatti" className="hidden md:flex group items-center border-2 border-brand-primary bg-white text-brand-dark hover:bg-brand-primary hover:text-white rounded-full px-8 py-2.5 transition-colors duration-300 overflow-hidden font-medium text-sm shadow-sm">
            <span className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-start group-hover:mr-2 -translate-x-full group-hover:translate-x-0">
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </span>
            <span>Prenota ora</span>
            <span className="w-5 opacity-100 group-hover:w-0 group-hover:opacity-0 transition-all duration-300 overflow-hidden flex items-center justify-end ml-2 group-hover:ml-0 translate-x-0 group-hover:translate-x-full">
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 rounded-full border border-brand-primary/20 flex items-center justify-center text-brand-dark hover:bg-brand-primary/10 transition-colors"
            aria-label={menuOpen ? 'Chiudi menu' : 'Apri menu'}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden max-w-7xl mx-auto mt-3 bg-white/95 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-lg border border-brand-primary/10 flex flex-col gap-4"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-medium text-brand-dark hover:text-brand-secondary transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contatti"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 border-2 border-brand-primary bg-white text-brand-dark hover:bg-brand-primary hover:text-white rounded-full px-8 py-3 transition-colors duration-300 font-medium text-sm"
            >
              <span>Prenota ora</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
