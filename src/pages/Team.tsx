import { motion } from 'motion/react';
import Intestazione from '../components/layout/Intestazione';
import Bottone from '../components/ui/Bottone';
import Occhiello from '../components/ui/Occhiello';
import Figura from '../components/ui/Figura';
import DatoMancante from '../components/ui/DatoMancante';
import { FiguraLinea } from '../components/ui/Motivi';
import { accoglienza, teamClinico, titolari, type Persona } from '../content/team';
import { MOSTRA_SEGRETERIA, PRENOTAZIONE_LABEL, PRENOTAZIONE_URL } from '../config/site';
import { schemaBreadcrumb, schemaStudio, usePageSeo } from '../lib/seo';

const anelli = {
  acqua: 'ring-brand-primary',
  lilla: 'ring-brand-accent',
};

const sfondi = {
  acqua: 'bg-brand-primary/15 text-brand-primary',
  lilla: 'bg-brand-accent/15 text-brand-accent',
};

function Ritratto({ persona, size }: { persona: Persona; size: 'grande' | 'piccolo' }) {
  const dim = size === 'grande' ? 'h-40 w-40' : 'h-24 w-24';
  const motivo = size === 'grande' ? 'h-24' : 'h-14';

  if (persona.foto) {
    return (
      <img
        src={persona.foto}
        alt={`Ritratto di ${persona.nome}`}
        className={`${dim} rounded-full object-cover ring-4 ring-offset-4 ring-offset-white ${
          anelli[persona.accento]
        }`}
      />
    );
  }

  return (
    <div
      className={`${dim} flex items-center justify-center rounded-full ring-4 ring-offset-4 ring-offset-white ${
        anelli[persona.accento]
      } ${sfondi[persona.accento]}`}
      role="img"
      aria-label={`Ritratto non ancora disponibile di ${persona.nome}`}
    >
      <FiguraLinea className={`${motivo} w-auto opacity-70`} />
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

      {/* Slot per la foto delle tre insieme: è l'immagine che dice
          "studio nostro" invece di "poliambulatorio". */}
      <section className="bg-white px-6 pb-16">
        <div className="mx-auto max-w-6xl">
          <Figura alt="" ratio="panoramica" tono="acqua" rounded="rounded-[3rem]" className="w-full" />
        </div>
      </section>

      {/* Livello 1 — le titolari */}
      <section className="bg-brand-light px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Occhiello className="mb-10">Le titolari</Occhiello>

          <ul className="grid gap-7 lg:grid-cols-3">
            {titolari.map((persona, i) => (
              <motion.li
                key={persona.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col rounded-[2.5rem] border border-brand-primary/20 bg-white p-9"
              >
                <div className="flex justify-center">
                  <Ritratto persona={persona} size="grande" />
                </div>

                <h2 className="mt-7 text-center text-xl font-semibold leading-snug text-brand-dark">
                  {persona.nome}
                </h2>
                <p className="mt-1.5 text-center text-sm font-semibold uppercase tracking-wide text-brand-dark/60">
                  {persona.ruolo}
                </p>

                <div className="mx-auto mt-5 h-px w-10 bg-brand-primary" />

                <div className="mt-6 flex-1">
                  {persona.bio ? (
                    <p className="font-light leading-relaxed text-brand-dark/80">{persona.bio}</p>
                  ) : (
                    <DatoMancante id="bio" fallback="Bio in arrivo." />
                  )}
                </div>

                {persona.aree.length > 0 && (
                  <ul className="mt-6 flex flex-wrap gap-1.5">
                    {persona.aree.map((area) => (
                      <li
                        key={area}
                        className="rounded-full bg-brand-primary/15 px-3 py-1 text-xs font-light text-brand-dark"
                      >
                        {area}
                      </li>
                    ))}
                  </ul>
                )}

                <p className="mt-6 flex flex-wrap items-center gap-2 border-t border-brand-light pt-5 text-xs text-brand-dark/60">
                  <span className="font-semibold">Iscrizione albo:</span>
                  {persona.albo ?? <DatoMancante id="albo" />}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Livello 2 — il team clinico */}
      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Occhiello className="mb-4">Il team clinico</Occhiello>
          <p className="mb-10 max-w-2xl font-light leading-relaxed text-brand-dark/70">
            Terapisti scelti uno a uno, che lavorano nello studio accanto alle titolari.
          </p>

          <ul className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {teamClinico.map((persona, i) => (
              <motion.li
                key={persona.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: Math.min(i, 4) * 0.07 }}
                className="flex flex-col items-center rounded-[2rem] border border-brand-primary/20 bg-brand-light p-6 text-center"
              >
                <Ritratto persona={persona} size="piccolo" />

                <h3 className="mt-5 font-semibold leading-snug text-brand-dark">{persona.nome}</h3>
                <p className="mt-1 text-sm font-light text-brand-dark/70">{persona.ruolo}</p>

                {!persona.ruoloConfermato && (
                  <span className="mt-3">
                    <DatoMancante id="ruolo" />
                  </span>
                )}

                {persona.bio && (
                  <p className="mt-3 text-sm font-light leading-relaxed text-brand-dark/70">
                    {persona.bio}
                  </p>
                )}
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* Livello 3 — accoglienza */}
      {MOSTRA_SEGRETERIA && (
        <section className="bg-brand-light px-6 py-16">
          <div className="mx-auto max-w-4xl text-center">
            <Occhiello allineamento="centro" className="mb-6">
              Accoglienza
            </Occhiello>
            <p className="font-light text-brand-dark/75">
              {accoglienza.map((p) => p.nome).join(' · ')}
            </p>
          </div>
        </section>
      )}

      <section className="bg-brand-light px-6 pb-24 pt-4">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] bg-brand-dark px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-2xl font-semibold leading-tight md:text-3xl">
            Vuoi parlare direttamente con noi?
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-light leading-relaxed text-white/70">
            Raccontaci cosa senti. Da lì capiamo insieme come impostare il percorso.
          </p>
          <div className="mt-8 flex justify-center">
            <Bottone href={PRENOTAZIONE_URL} variante="chiara">
              {PRENOTAZIONE_LABEL}
            </Bottone>
          </div>
        </div>
      </section>
    </>
  );
}
