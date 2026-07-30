import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { motion } from 'motion/react';

export default function Testimonials() {
  return (
    <section className="bg-brand-secondary relative flex items-center min-h-[600px] overflow-hidden">
      {/* Background Image with Gradient Fade */}
      <div className="absolute inset-0 z-0 flex justify-end">
         <motion.img 
          initial={{ scale: 1.05 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          src="https://images.unsplash.com/photo-1519823551278-64ac92734fb4?auto=format&fit=crop&q=80" 
          alt="Benessere e rilassamento"
          className="w-full lg:w-[60%] h-full object-cover object-right"
         />
         <div className="absolute inset-y-0 left-0 w-full lg:w-[50%] bg-brand-secondary"></div>
         <div className="absolute inset-y-0 right-0 w-full lg:w-[60%] bg-gradient-to-r from-brand-secondary via-brand-secondary/60 to-transparent"></div>
      </div>
      
      <div className="max-w-7xl mx-auto w-full px-6 py-24 flex justify-start relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full lg:w-[50%] lg:pr-10"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-white"></div>
            <span className="text-white text-xs tracking-widest uppercase font-medium">Testimonianze</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-sans font-light text-white leading-tight mb-8">
            Le storie di chi ha <br/>
            <span className="text-brand-dark font-medium">ritrovato il sorriso</span>
          </h2>
          
          <p className="text-white text-lg leading-relaxed mb-6 font-light">
            "Dopo l'intervento, ero preoccupata di non poter tornare alla mia vita di prima. Il supporto, la costanza e la professionalità che ho trovato qui hanno fatto la differenza. Oggi mi sento meglio di prima."
          </p>
          
          <div className="flex gap-1 mb-10">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-white text-white" />
            ))}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img 
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100&h=100" 
                alt="Laura M." 
                className="w-14 h-14 rounded-full object-cover border-2 border-white/20"
              />
              <div>
                <p className="text-white font-medium text-lg">Laura M.</p>
                <p className="text-brand-dark/80 text-sm font-medium mt-0.5">Paziente</p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-brand-secondary transition-all shadow-sm">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white hover:bg-white hover:text-brand-primary transition-all shadow-sm">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
