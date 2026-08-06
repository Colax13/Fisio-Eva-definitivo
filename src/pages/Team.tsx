import { motion } from 'motion/react';
import Intestazione from '../components/layout/Intestazione';
import ArrowButton from '../components/ui/ArrowButton';
import SectionHeading from '../components/ui/SectionHeading';
import DatoMancante from '../components/ui/DatoMancante';
import Ritratto, { accentoDi } from '../components/ui/Ritratto';
import { accoglienza, teamClinico, titolari } from '../content/team';
import {
  MOSTRA_SEGRETERIA,
  PRENOTAZIONE_LABEL,
  PRENOTAZIONE_URL,
  immagini,
} from '../config/site';
import { schemaBreadcrumb, schemaStudio, usePageSeo } from '../lib/seo';

/** I due aloni sfocati che stanno dietro ogni sezione del team. */
function Aloni() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute -right-[10%] -top-[20%] h-[60%] w-[60%] rounded-full bg-brand-primary/10 blur-[120px]" />
      <div className="absolute -bottom-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-brand-secondary/10 blur-[120px]" />
    </div>
  );
}

export default function Team() {
  const briciole = [
    { nome: 'Home', path: '/' },
    { nome: 'Team', path: '/team' },
  ];

  usePageSeo({
    title: 'Il team | FisioEva, fisioterapia e osteopatia a Casalotti Roma',
    description:
      'Azzurra De Angelis, Elisa De Rubeis e Veronica Mirarchi con il team di FisioEva. Fisioterapisti e osteopati a Roma zona Boccea-Casalotti.',
    path: '/team',
    schema: [schemaStudio(), schemaBreadcrumb(briciole)],
  });

  return (
    <>
      <Intestazione
        occhiello="Il nostro team"
        titolo="Tre professioniste, e le persone che hanno scelto."
        sottotitolo="Azzurra, Elisa e Veronica hanno lavorato insieme per anni prima di aprire FisioEva. Intorno a loro c'è un gruppo di terapisti scelti uno a uno."
        briciole={briciole}
      />

      {/* La foto delle tre insieme: è l'immagine che dice "studio nostro"
          invece di "poliambulatorio". ⛔ segnaposto fino allo shooting. */}
      <section className="bg-white px-6 pb-16">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-[3rem] shadow-xl">
          <div className="relative aspect-[21/9]">
            <img
              src={immagini.sede}
              alt="Lo studio FisioEva in Via di Boccea 755"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 to-transparent" />
          </div>
        </div>
      </section>

      {/* Livello 1 — le titolari */}
      <section className="relative overflow-hidden bg-brand-light px-6 py-24">
        <Aloni />

        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeading eyebrow="Le titolari" className="mb-16">
            Professioniste al tuo fianco, in{' '}
            <span className="text-brand-primary">ogni fase della vita</span>
          </SectionHeading>

          <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-3">
            {titolari.map((persona, i) => {
              const a = accentoDi(persona);

              return (
                <motion.li
                  key={persona.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  className="group flex flex-col items-center rounded-[2rem] border border-white bg-white/80 p-8 text-center shadow-xl backdrop-blur-md transition-shadow duration-300 hover:shadow-2xl"
                >
                  <div className="mb-6">
                    <Ritratto persona={persona} size="grande" />
                  </div>

                  <h3 className="mb-1 text-xl font-bold leading-snug text-brand-dark">
                    {persona.nome}
                  </h3>
                  <p className={`${a.ink} mb-4 text-xs font-medium uppercase tracking-widest`}>
                    {persona.ruolo}
                  </p>

                  <div
                    className={`mb-5 h-[2px] w-8 ${
                      persona.accento === 'lilla' ? 'bg-brand-primary' : 'bg-brand-secondary'
                    } transition-all duration-500 group-hover:w-14`}
                  />

                  <div className="flex-1 text-sm font-light leading-relaxed text-gray-600">
                    {persona.bio ?? <DatoMancante id="bio" fallback="Bio in arrivo." />}
                  </div>

                  {persona.aree.length > 0 && (
                    <ul className="mt-6 flex flex-wrap justify-center gap-1.5">
                      {persona.aree.map((area) => (
                        <li
                          key={area}
                          className="rounded-full bg-brand-primary/10 px-3 py-1 text-xs font-light text-brand-dark"
                        >
                          {area}
                        </li>
                      ))}
                    </ul>
                  )}

                  <p className="mt-6 flex flex-wrap items-center justify-center gap-2 border-t border-gray-200 pt-5 text-xs text-gray-500">
                    <span className="font-medium">Iscrizione albo:</span>
                    {persona.albo ?? <DatoMancante id="albo" />}
                  </p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Livello 2 — il team clinico */}
      <section className="relative overflow-hidden bg-white px-6 py-24">
        <Aloni />

        <div className="relative z-10 mx-auto max-w-7xl">
          <SectionHeading eyebrow="Il team clinico" className="mb-4">
            I terapisti scelti <span className="text-brand-secondary">uno a uno</span>
          </SectionHeading>
          <p className="mx-auto mb-16 max-w-2xl text-center font-light leading-relaxed text-gray-600">
            Lavorano nello studio accanto alle titolari.
          </p>

          <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {teamClinico.map((persona, i) => {
              const a = accentoDi(persona);

              return (
                <motion.li
                  key={persona.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: Math.min(i, 4) * 0.08 }}
                  className="group flex flex-col items-center rounded-[2rem] border border-white bg-white/80 p-6 text-center shadow-lg backdrop-blur-md transition-shadow duration-300 hover:shadow-xl"
                >
                  <div className="mb-5">
                    <Ritratto persona={persona} size="piccolo" />
                  </div>

                  <h3 className="font-bold leading-snug text-brand-dark">{persona.nome}</h3>
                  <p className={`${a.ink} mt-1 text-xs font-medium uppercase tracking-widest`}>
                    {persona.ruolo}
                  </p>

                  {!persona.ruoloConfermato && (
                    <span className="mt-3">
                      <DatoMancante id="ruolo" />
                    </span>
                  )}

                  {persona.bio && (
                    <p className="mt-3 text-sm font-light leading-relaxed text-gray-600">
                      {persona.bio}
                    </p>
                  )}
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Livello 3 — accoglienza */}
      {MOSTRA_SEGRETERIA && (
        <section className="bg-brand-light px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-brand-primary-ink">
              Accoglienza
            </p>
            <p className="mt-4 font-light text-gray-600">
              {accoglienza.map((p) => p.nome).join(' · ')}
            </p>
          </div>
        </section>
      )}

      <section className="bg-brand-light px-6 pb-24 pt-4">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] bg-brand-dark px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-2xl font-bold leading-tight md:text-3xl">
            Vuoi parlare direttamente con noi?
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-light leading-relaxed text-white/70">
            Raccontaci cosa senti. Da lì capiamo insieme come impostare il percorso.
          </p>
          <div className="mt-8 flex justify-center">
            <ArrowButton href={PRENOTAZIONE_URL} variant="ghost">
              {PRENOTAZIONE_LABEL}
            </ArrowButton>
          </div>
        </div>
      </section>
    </>
  );
}
