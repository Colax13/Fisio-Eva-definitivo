
import { motion } from 'motion/react';
import { accoglienza, team, teamClinico } from '../../data/site';
import SectionHeading from '../ui/SectionHeading';

const accenti = {
  primary: {
    ring: 'ring-brand-primary',
    text: 'text-brand-primary',
    bg: 'bg-brand-primary',
    soft: 'bg-brand-primary/10',
  },
  secondary: {
    ring: 'ring-brand-secondary',
    text: 'text-brand-secondary',
    bg: 'bg-brand-secondary',
    soft: 'bg-brand-secondary/10',
  },
};

const iniziali = (nome: string) =>
  nome
    .replace('Dott.ssa ', '')
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

type Props = {
  showHeading?: boolean;
};

export default function TeamSection({ showHeading = true }: Props) {
  return (
    <section className="relative bg-brand-light overflow-hidden py-24 px-6">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {showHeading && (
          <SectionHeading eyebrow="Il Nostro Team" className="mb-16">
            Professioniste al tuo fianco per il{' '}
            <span className="text-brand-primary">benessere globale</span>
          </SectionHeading>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {team.map((membro, idx) => {
            const a = accenti[membro.accent];

            return (
              <motion.article
                key={membro.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="bg-white/80 backdrop-blur-md rounded-[2rem] p-8 shadow-xl border border-white text-center flex flex-col items-center hover:shadow-2xl transition-shadow duration-300 group"
              >
                {membro.photo ? (
                  <img
                    src={membro.photo}
                    alt={membro.name}
                    className={`w-40 h-40 rounded-full object-cover ring-4 ${a.ring} ring-offset-4 ring-offset-white mb-6 transition-transform duration-500 group-hover:scale-105`}
                  />
                ) : (
                  <div
                    className={`w-40 h-40 rounded-full ${a.soft} ${a.text} ring-4 ${a.ring} ring-offset-4 ring-offset-white mb-6 flex items-center justify-center font-sans font-bold text-4xl transition-transform duration-500 group-hover:scale-105`}
                  >
                    {iniziali(membro.name)}
                  </div>
                )}

                <h3 className="font-sans font-bold text-brand-dark text-xl leading-snug mb-1">
                  {membro.name}
                </h3>
                <p className={`${a.text} font-medium text-xs tracking-widest uppercase mb-4`}>
                  {membro.role}
                </p>
                <div className={`w-8 h-[2px] ${a.bg} mb-5 group-hover:w-14 transition-all duration-500`}></div>

                <p className="text-gray-600 font-light text-sm leading-relaxed flex-1">
                  {membro.description}
                </p>

              </motion.article>
            );
          })}
        </div>

        {/* Il team clinico e l'accoglienza: card più piccole, perché il
            racconto resta "tre titolari e le persone che hanno scelto". */}
        <div className="mt-20">
          <p className="text-brand-primary text-xs tracking-widest uppercase font-medium mb-8 text-center">
            Il team clinico
          </p>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {teamClinico.map((membro, idx) => {
              const a = accenti[membro.accent];

              return (
                <motion.article
                  key={membro.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: Math.min(idx, 4) * 0.08 }}
                  className="group bg-white/80 backdrop-blur-md rounded-[1.75rem] p-6 shadow-lg border border-white text-center flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
                >
                  <div
                    className={`w-20 h-20 rounded-full ${a.soft} ${a.text} ring-4 ${a.ring} ring-offset-4 ring-offset-white mb-4 flex items-center justify-center font-sans font-bold text-xl transition-transform duration-500 group-hover:scale-105`}
                    role="img"
                    aria-label={`Ritratto non ancora disponibile di ${membro.name}`}
                  >
                    {iniziali(membro.name)}
                  </div>

                  <h3 className="font-sans font-bold text-brand-dark leading-snug">
                    {membro.name}
                  </h3>
                  <p className={`${a.text} font-medium text-[11px] tracking-widest uppercase mt-1`}>
                    {membro.role}
                  </p>
                </motion.article>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <p className="text-gray-500 text-xs tracking-widest uppercase mb-3">Accoglienza</p>
            <p className="text-gray-600 font-light">
              {accoglienza.map((p) => p.name).join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
