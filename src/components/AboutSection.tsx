import { ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutSection() {
  return (
    <section id="chi-siamo" className="relative bg-brand-light rounded-t-[3rem] -mt-8 z-20 px-6 py-32 shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Images Grid */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <img 
                  src="https://images.unsplash.com/photo-1519823551278-64ac92734fb4?auto=format&fit=crop&q=80" 
                  alt="Benessere e salute" 
                  className="w-full h-full object-cover rounded-3xl min-h-[400px]"
                />
              </div>
              <div className="col-span-1 flex flex-col gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80" 
                  alt="Terapia" 
                  className="w-full h-48 object-cover rounded-3xl"
                />
                <img 
                  src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80" 
                  alt="Equilibrio" 
                  className="w-full h-48 object-cover rounded-3xl"
                />
              </div>
            </div>
            
            {/* Experience Badge */}
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-dark text-white w-32 h-32 rounded-full flex flex-col items-center justify-center text-center p-4 border-8 border-brand-light"
            >
              <span className="text-2xl font-sans font-bold">10+</span>
              <span className="text-[10px] uppercase tracking-wider text-gray-300 mt-1">Anni di<br/>Esperienza</span>
            </motion.div>
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:pl-10"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
              <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">Chi Siamo</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-sans font-bold text-brand-dark leading-tight mb-6">
              Dedicati a <span className="text-brand-primary">fornirti cure eccellenti</span> e riabilitazione
            </h2>
            
            <p className="text-brand-dark font-medium leading-relaxed mb-12">
              I fisioterapisti sono guaritori silenziosi, che lavorano dietro le quinte per ripristinare la forza, alleviare il dolore e ricostruire il movimento. Non si limitano a curare gli infortuni: trasformano le vite.
            </p>
            
            <div className="flex items-center justify-between border-t border-gray-200 pt-8">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=100&h=100" 
                    alt="Dott. Rossi" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-light relative z-30"
                  />
                  <img 
                    src="https://images.unsplash.com/photo-1594824436998-d8ea3bde1395?auto=format&fit=crop&q=80&w=100&h=100" 
                    alt="Dott.ssa Bianchi" 
                    className="w-12 h-12 rounded-full object-cover border-2 border-brand-light relative z-20"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Il Nostro Team</p>
                  <p className="font-sans font-bold text-brand-dark">Medici Esperti</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <a href="#servizi" className="group flex w-max items-center border-2 border-brand-primary bg-white hover:bg-brand-primary text-brand-dark hover:text-white rounded-full px-8 py-3.5 transition-colors duration-300 overflow-hidden font-medium text-sm">
                <span className="w-0 opacity-0 group-hover:w-5 group-hover:opacity-100 transition-all duration-300 overflow-hidden flex items-center justify-start group-hover:mr-2 -translate-x-full group-hover:translate-x-0">
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </span>
                <span>Scopri di più</span>
                <span className="w-5 opacity-100 group-hover:w-0 group-hover:opacity-0 transition-all duration-300 overflow-hidden flex items-center justify-end ml-2 group-hover:ml-0 translate-x-0 group-hover:translate-x-full">
                  <ArrowUpRight className="w-4 h-4 shrink-0" />
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
