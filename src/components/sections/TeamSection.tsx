import { Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { team } from '../../data/site';
import SectionHeading from '../ui/SectionHeading';

const accenti = {
  primary: {
    ring: 'ring-brand-primary',
    text: 'text-brand-primary-ink',
    bg: 'bg-brand-primary',
    soft: 'bg-brand-primary/10',
  },
  secondary: {
    ring: 'ring-brand-secondary',
    text: 'text-brand-secondary-ink',
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
    <section className="relative overflow-hidden bg-brand-light px-5 py-16 sm:px-6 md:py-24">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        <div className="absolute -bottom-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {showHeading && (
          <SectionHeading eyebrow="Il Nostro Team" className="mb-10 md:mb-16">
            Professioniste al tuo fianco per il{' '}
            <span className="text-brand-primary-ink">benessere globale</span>
          </SectionHeading>
        )}

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {team.map((membro, idx) => {
            const a = accenti[membro.accent];

            return (
              <motion.article
                key={membro.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="group flex flex-col items-center rounded-[2rem] border border-white bg-white/80 p-6 text-center shadow-xl backdrop-blur-md transition-shadow duration-300 hover:shadow-2xl sm:p-8"
              >
                {membro.photo ? (
                  <img
                    src={membro.photo}
                    alt={membro.name}
                    loading="lazy"
                    className={`h-32 w-32 rounded-full object-cover ring-4 sm:h-40 sm:w-40 ${a.ring} mb-5 ring-offset-4 ring-offset-white transition-transform duration-500 group-hover:scale-105`}
                  />
                ) : (
                  <div
                    className={`h-32 w-32 rounded-full sm:h-40 sm:w-40 ${a.soft} ${a.text} ring-4 ${a.ring} mb-5 flex items-center justify-center font-sans text-4xl font-bold ring-offset-4 ring-offset-white transition-transform duration-500 group-hover:scale-105`}
                  >
                    {iniziali(membro.name)}
                  </div>
                )}

                <h3 className="text-h3 mb-1 font-sans font-bold text-brand-dark">{membro.name}</h3>
                <p className={`${a.text} text-eyebrow mb-4 font-semibold uppercase`}>
                  {membro.role}
                </p>
                <div
                  className={`h-[2px] w-8 ${a.bg} mb-5 transition-all duration-500 group-hover:w-14`}
                ></div>

                {/* La biografia torna allineata a sinistra: sono otto righe, e
                    centrate obbligano l'occhio a ricercare l'inizio di ognuna. */}
                <p className="flex-1 text-left text-sm leading-relaxed font-light text-gray-600">
                  {membro.description}
                </p>

                {membro.phone && (
                  <a
                    href={membro.phoneHref}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-brand-dark transition-colors hover:text-brand-secondary-ink"
                  >
                    <span
                      className={`h-9 w-9 rounded-full ${a.soft} ${a.text} flex items-center justify-center`}
                    >
                      <Phone className="h-4 w-4" />
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
