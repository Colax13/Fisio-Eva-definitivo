import { Check, Sparkles, Activity } from 'lucide-react';
import { WaveBackground } from './WaveBackground';

export default function ServicesSlider() {
  const manualTreatments = [
    "Fisiokinesiterapia",
    "Ginnastica posturale",
    "Osteopatia",
    "Osteopatia neonatale e pediatrica",
    "Linfodrenaggio",
    "Rieducazione motoria e neuromotoria",
    "Rieducazione post-chirurgica",
    "Rieducazione sportiva",
    "Terapia manuale",
    "Taping neuromuscolare",
  ];

  const instrumentalTreatments = [
    "Tecarterapia",
    "Laser ad alta potenza",
    "Ultrasuonoterapia",
    "Magnetoterapia",
    "Tens",
    "Ionoforesi",
    "Elettrostimolazione",
  ];

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <WaveBackground />
      
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-brand-primary"></div>
            <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">I Nostri Trattamenti</span>
            <div className="w-12 h-[1px] bg-brand-primary"></div>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-brand-dark leading-tight">
            Eccellenza e cura per la tua <span className="text-brand-primary">salute</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Manual & Rehab */}
          <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-8 md:p-10 shadow-xl border border-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-sans font-medium text-brand-dark">Terapia Manuale e Riabilitazione</h3>
            </div>
            
            <ul className="space-y-4">
              {manualTreatments.map((treatment, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-primary transition-colors">
                    <Check className="w-3 h-3 text-brand-primary group-hover:text-white transition-colors" strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 font-light text-lg">{treatment}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instrumental */}
          <div className="bg-white/80 backdrop-blur-md rounded-[2rem] p-8 md:p-10 shadow-xl border border-white">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-brand-secondary/10 flex items-center justify-center text-brand-secondary">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-sans font-medium text-brand-dark">Terapie Fisiche Strumentali</h3>
            </div>
            
            <ul className="space-y-4">
              {instrumentalTreatments.map((treatment, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <div className="w-5 h-5 rounded-full bg-brand-secondary/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-brand-secondary transition-colors">
                    <Check className="w-3 h-3 text-brand-secondary group-hover:text-white transition-colors" strokeWidth={3} />
                  </div>
                  <span className="text-gray-700 font-light text-lg">{treatment}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
