const team = [
  {
    name: "Dott.ssa Azzurra De Angelis",
    role: "Fisioterapista e Osteopata",
    description: "Specializzata in valutazione osteopatica, terapia manuale e riabilitazione globale della persona.",
    image: "https://images.unsplash.com/photo-1594824436951-7f12bc3ac92e?auto=format&fit=crop&q=80",
    color: "bg-brand-primary"
  },
  {
    name: "Dott.ssa Elisa De Rubeis",
    role: "Fisioterapista",
    description: "Esperta in riabilitazione funzionale, rieducazione motoria e percorsi terapeutici personalizzati.",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80",
    color: "bg-brand-secondary"
  },
  {
    name: "Dott.ssa Veronica Mirarchi",
    role: "Fisioterapista",
    description: "Dedicata al benessere muscolo-scheletrico, alla rieducazione posturale e al recupero motorio.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80",
    color: "bg-brand-primary"
  }
];

export default function TeamSection() {
  return (
    <section className="relative bg-brand-light flex items-center justify-center overflow-hidden py-24">
      {/* Decorative Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-6 relative z-10 flex flex-col justify-center">
        
        {/* Intro Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-12 h-[1px] bg-brand-primary"></div>
            <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">Il Nostro Team</span>
            <div className="w-12 h-[1px] bg-brand-primary"></div>
          </div>
          <h2 className="text-4xl md:text-5xl font-sans font-bold text-brand-dark leading-tight">
            Professionisti al tuo fianco per il <span className="text-brand-primary">benessere globale</span>
          </h2>
        </div>

        {/* Team Grid (3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((member, idx) => (
            <div key={idx} className="relative group rounded-[2rem] overflow-hidden h-[460px] cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300">
              <img 
                src={member.image} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Bottom text & details */}
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end z-20 h-full">
                <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-4">
                  <h3 className="text-white font-sans font-medium text-2xl mb-1 leading-snug">{member.name}</h3>
                  <p className="text-brand-primary font-medium text-sm mb-3 tracking-wide uppercase">{member.role}</p>
                  <div className="w-8 h-[2px] bg-brand-primary/80 group-hover:w-12 transition-all duration-500 mb-6 group-hover:bg-brand-primary"></div>
                  
                  {/* Hidden description that appears on hover */}
                  <div className="h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 transition-all duration-500 overflow-hidden">
                    <p className="text-white/90 font-light text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
