import { Activity, ChevronDown, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto bg-white/95 backdrop-blur-sm rounded-full px-8 py-3 flex items-center justify-between shadow-sm border border-brand-primary/10">
        {/* Logo */}
        <div className="flex items-center">
          <img src="/logo.svg" alt="FisioEVA" className="h-10 md:h-12 w-auto object-contain" />
        </div>

        {/* Links */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="#" className="text-sm font-medium text-brand-dark hover:text-brand-secondary transition-colors">Home</a>
          <a href="#" className="text-sm font-medium text-brand-dark hover:text-brand-secondary transition-colors">Chi Siamo</a>
          <div className="flex items-center gap-1 cursor-pointer group">
            <span className="text-sm font-medium text-brand-dark group-hover:text-brand-secondary transition-colors">Servizi</span>
            <ChevronDown className="w-4 h-4 text-brand-dark group-hover:text-brand-secondary transition-colors" />
          </div>
          <a href="#" className="text-sm font-medium text-brand-dark hover:text-brand-secondary transition-colors">Progetti</a>
          <a href="#" className="text-sm font-medium text-brand-dark hover:text-brand-secondary transition-colors">Contatti</a>
        </div>

        {/* CTA */}
        <button className="hidden md:flex group items-center border-2 border-brand-primary bg-white text-brand-dark hover:bg-brand-primary hover:text-white rounded-full px-8 py-2.5 transition-colors duration-300 overflow-hidden font-medium text-sm shadow-sm">
          <span className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-start group-hover:mr-2 -translate-x-full group-hover:translate-x-0">
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </span>
          <span>Prenota ora</span>
          <span className="w-5 opacity-100 group-hover:w-0 group-hover:opacity-0 transition-all duration-300 overflow-hidden flex items-center justify-end ml-2 group-hover:ml-0 translate-x-0 group-hover:translate-x-full">
            <ArrowUpRight className="w-4 h-4 shrink-0" />
          </span>
        </button>
      </div>
    </nav>
  );
}
