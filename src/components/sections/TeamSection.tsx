import { Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { team } from '../../data/site';
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

                {membro.phone && (
                  <a
                    href={membro.phoneHref}
                    className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-brand-dark hover:text-brand-secondary transition-colors"
                  >
                    <span
                      className={`w-9 h-9 rounded-full ${a.soft} ${a.text} flex items-center justify-center`}
                    >
                      <Phone className="w-4 h-4" />
                    </span>
                    {membro.phone}
                  </a>
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
