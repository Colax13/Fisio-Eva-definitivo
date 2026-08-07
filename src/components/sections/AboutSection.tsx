import { motion } from 'motion/react';
import { immagini, team } from '../../data/site';
import ArrowButton from '../ui/ArrowButton';
import Eyebrow from '../ui/Eyebrow';

type Props = {
  /** In home la sezione si infila sotto la hero con il bordo arrotondato. */
  overlap?: boolean;
  cta?: { label: string; to: string } | null;
};

export default function AboutSection({ overlap = false, cta = { label: 'Scopri di più', to: '/chi-siamo' } }: Props) {
  return (
    <section
      className={`relative z-20 bg-brand-light px-5 py-16 sm:px-6 md:py-24 lg:py-32 ${
        overlap ? '-mt-8 rounded-t-[2rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:rounded-t-[3rem]' : ''
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            {/* Sul telefono la foto principale prende tutta la riga e le due di
                appoggio stanno sotto: nella griglia a due colonne del desktop
                diventavano tre strisce alte e strettissime. */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <img
                src={immagini.trattamento}
                alt="Benessere e salute"
                className="col-span-2 h-56 w-full rounded-3xl object-cover sm:h-72 lg:col-span-1 lg:h-full lg:min-h-[400px]"
              />
              <img
                src={immagini.manuale}
                alt="Terapia manuale"
                loading="lazy"
                className="h-36 w-full rounded-3xl object-cover sm:h-48 lg:hidden"
              />
              <img
                src={immagini.postura}
                alt="Rieducazione motoria"
                loading="lazy"
                className="h-36 w-full rounded-3xl object-cover sm:h-48 lg:hidden"
              />
              <div className="hidden flex-col gap-4 lg:flex">
                <img
                  src={immagini.manuale}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-48 w-full rounded-3xl object-cover"
                />
                <img
                  src={immagini.postura}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="h-48 w-full rounded-3xl object-cover"
                />
              </div>
            </div>

            {/* Il bollo sul telefono va in un angolo: al centro copriva la foto
                principale proprio dove si vede il trattamento. */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 100 }}
              className="absolute -bottom-4 right-2 flex h-30 w-30 flex-col items-center justify-center rounded-full border-8 border-brand-light bg-brand-dark p-2 text-center text-white sm:right-4 sm:h-32 sm:w-32 lg:top-1/2 lg:bottom-auto lg:left-1/2 lg:right-auto lg:-translate-x-1/2 lg:-translate-y-1/2 lg:p-4"
            >
              <span className="font-sans text-2xl font-bold">10+</span>
              <span className="mt-0.5 text-[11px] text-gray-300 uppercase lg:tracking-wider">
                Anni di
                <br />
                Esperienza
              </span>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="text-center lg:pl-10 lg:text-left"
          >
            <Eyebrow align="left" className="mb-5">
              Chi Siamo
            </Eyebrow>

            <h2 className="text-h2 mb-5 font-sans font-bold text-brand-dark">
              Dedicate ad <span className="text-brand-primary-ink">ascoltare il tuo corpo</span> e
              alla riabilitazione
            </h2>

            <p className="text-lead mb-5 font-light text-brand-dark">
              A FisioEva la fisioterapia lavora insieme all'osteopatia. Vuol dire che la valutazione
              non si ferma al punto in cui senti male: si guarda come si muove tutto il resto, e il
              trattamento si costruisce da lì.
            </p>

            <p className="text-body mb-10 font-light text-gray-600">
              Dopo anni passati all'interno di FisioLab Casalotti, ci siamo spostate nel nostro nuovo
              studio: le stesse mani, la stessa cura di sempre, in uno spazio pensato per voi.
            </p>

            {/* I due dati di credibilità. Solo due: se diventano quattro non li
                legge più nessuno. Il testo lungo resta a sinistra anche sul
                telefono, centrato diventerebbe faticoso da leggere. */}
            <div className="mb-10 grid grid-cols-1 gap-5 text-left sm:grid-cols-2">
              <div className="border-l-2 border-brand-primary/40 pl-5">
                <p className="mb-1.5 font-sans font-medium text-brand-dark">
                  Formazione universitaria e specialistica
                </p>
                <p className="text-sm leading-relaxed font-light text-gray-600">
                  Università Cattolica – Policlinico Gemelli · Master in RPG Souchard · Osteopatia
                  EDUCAM
                </p>
              </div>
              <div className="border-l-2 border-brand-secondary/40 pl-5">
                <p className="mb-1.5 font-sans font-medium text-brand-dark">
                  Oltre 15 anni di pratica clinica
                </p>
                <p className="text-sm leading-relaxed font-light text-gray-600">
                  Nel quartiere, prima di aprire questo studio.
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 border-t border-gray-200 pt-8 sm:flex-row sm:justify-center lg:justify-start">
              <div className="flex -space-x-4">
                {team
                  .filter((m) => m.photo)
                  .map((m) => (
                    <img
                      key={m.slug}
                      src={m.photo}
                      alt={m.name}
                      loading="lazy"
                      className="h-12 w-12 rounded-full border-2 border-brand-light object-cover"
                    />
                  ))}
              </div>
              <div className="text-center sm:text-left">
                <p className="mb-1 text-xs tracking-wider text-gray-600 uppercase">Il Nostro Team</p>
                <p className="font-sans font-bold text-brand-dark">Azzurra, Elisa e Veronica</p>
              </div>
            </div>

            {cta && (
              <div className="mt-10 flex justify-center lg:justify-start">
                <ArrowButton to={cta.to}>{cta.label}</ArrowButton>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
