import { ArrowRight, CalendarCheck, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Bottone from '../components/ui/Bottone';
import Occhiello from '../components/ui/Occhiello';
import Figura from '../components/ui/Figura';
import DatoMancante from '../components/ui/DatoMancante';
import MappaStudio from '../components/ui/MappaStudio';
import ArrowButton from '../components/ui/ArrowButton';
import SectionHeading from '../components/ui/SectionHeading';
import { FiguraLinea, OndeLeggere } from '../components/ui/Motivi';
import {
  PRENOTAZIONE_LABEL,
  PRENOTAZIONE_URL,
  SPAZIO_CORSI_NOME,
  SPAZIO_CORSI_NOME_CONFERMATO,
  immagini,
  studio,
} from '../config/site';
import { percorsoCategoria, percorsoServizio, serviziDiCategoria } from '../content/servizi';
import { titolari } from '../content/team';
import { FRASE_CHI_SIAMO, PAYOFF_HERO, credenze, credibilita } from '../content/testi';
import { schemaStudio, usePageSeo } from '../lib/seo';

/** Ordine obbligatorio: la porta generalista per prima. */
const porte = [
  {
    titolo: 'Per tornare a muoverti',
    testo: 'Mal di schiena, cervicale, infortuni sportivi, recupero dopo un intervento.',
    to: percorsoCategoria('tornare-a-muoverti'),
    tono: 'acqua' as const,
  },
  {
    titolo: 'Per la donna',
    testo: 'Una cura pensata per te, per ciò di cui spesso nessuno parla.',
    to: percorsoCategoria('salute-della-donna'),
    tono: 'lilla' as const,
  },
  {
    titolo: 'Per il tuo bambino',
    testo: 'Il parto è il primo grande sforzo della vita. Anche per lui.',
    extra: 'Coliche, sonno disturbato, difficoltà di suzione, plagiocefalia, torcicollo.',
    to: percorsoCategoria('bambino'),
    tono: 'acqua' as const,
  },
];

const bordoPorta = {
  acqua: 'hover:border-brand-primary',
  lilla: 'hover:border-brand-accent',
};

export default function Home() {
  usePageSeo({
    title: 'FisioEva | Fisioterapia e osteopatia a Casalotti, Roma',
    description:
      'Studio di fisioterapia e osteopatia in Via di Boccea 755, Roma. Riabilitazione, terapia manuale, salute della donna e osteopatia neonatale. Prenota la prima valutazione.',
    path: '/',
    schema: [schemaStudio()],
  });

  const serviziDonna = serviziDiCategoria('salute-della-donna');
  const strumentali = serviziDiCategoria('terapie-strumentali');

  return (
    <>
      {/* 1 · Hero — neutro, universale. Immagine piena, doppio gradiente. */}
      <section className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-32">
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            src={immagini.trattamento}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          {/* Due gradienti sovrapposti: il primo scurisce dall'alto, il secondo
              apre il fianco sinistro dove sta il testo. */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/55 to-brand-primary/25" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/80 via-brand-dark/30 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6 flex items-center gap-4"
            >
              <div className="h-[1px] w-12 bg-brand-primary" />
              <span className="text-xs font-medium uppercase tracking-widest text-brand-primary">
                {studio.claim}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-6 text-5xl font-bold leading-[1.1] text-white md:text-7xl"
            >
              Muoviti meglio. <span className="text-brand-primary">Vivi senza dolore.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-10 max-w-lg text-base font-light leading-relaxed text-gray-200 md:text-lg"
            >
              Fisioterapia, osteopatia e riabilitazione a Casalotti, Roma. Un percorso costruito su
              di te, in ogni fase della vita.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <ArrowButton href={PRENOTAZIONE_URL} icon={CalendarCheck}>
                {PRENOTAZIONE_LABEL}
              </ArrowButton>
              <ArrowButton to="/servizi" variant="ghost">
                Scopri i servizi
              </ArrowButton>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2 · Le tre porte */}
      <section className="bg-brand-light px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <Occhiello allineamento="centro" className="mb-6">
            I nostri servizi
          </Occhiello>
          <h2 className="text-center text-4xl font-semibold text-brand-dark md:text-5xl">
            Da dove vuoi partire?
          </h2>

          <ul className="mt-14 grid gap-6 md:grid-cols-3">
            {porte.map((porta, i) => (
              <motion.li
                key={porta.titolo}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to={porta.to}
                  className={`group flex h-full flex-col rounded-[2.5rem] border border-brand-primary/20 bg-white p-9 transition-all hover:-translate-y-1 hover:shadow-lg ${
                    bordoPorta[porta.tono]
                  }`}
                >
                  <FiguraLinea
                    className={`mb-7 h-16 w-auto ${
                      porta.tono === 'lilla' ? 'text-brand-accent' : 'text-brand-primary'
                    }`}
                  />
                  <h3 className="text-xl font-semibold uppercase tracking-wide text-brand-dark">
                    {porta.titolo}
                  </h3>
                  <p className="mt-4 font-light leading-relaxed text-brand-dark/75">
                    {porta.testo}
                  </p>
                  {porta.extra && (
                    <p className="mt-3 text-sm font-light leading-relaxed text-brand-dark/55">
                      {porta.extra}
                    </p>
                  )}
                  <span className="mt-auto inline-flex items-center gap-2 pt-8 text-sm font-semibold text-brand-ink">
                    Scopri
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>

          {/* Le strumentali stanno su una riga: sono un supporto, non metà offerta. */}
          <div className="mt-8 rounded-[2rem] border border-brand-primary/20 bg-white/70 px-8 py-7">
            <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
              <div className="max-w-3xl">
                <h3 className="font-semibold text-brand-dark">Terapie strumentali</h3>
                <p className="mt-1.5 text-sm font-light leading-relaxed text-brand-dark/70">
                  A supporto del lavoro manuale:{' '}
                  {strumentali.map((s) => s.nome.replace(' (elettroanalgesia)', '')).join(', ')}.
                </p>
              </div>
              <Link
                to={percorsoCategoria('terapie-strumentali')}
                className="group inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-ink"
              >
                Vedi le terapie
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to="/servizi"
              className="group inline-flex items-center gap-2 font-semibold text-brand-ink"
            >
              Vedi tutti i servizi
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3 · Chi siamo */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
          <div className="grid grid-cols-2 gap-5">
            <Figura alt="" ratio="alta" tono="acqua" className="mt-10" />
            <Figura alt="" ratio="alta" tono="lilla" motivo={false} />
          </div>

          <div>
            <Occhiello className="mb-7">Chi siamo</Occhiello>

            <p className="text-3xl font-light leading-[1.25] text-brand-dark md:text-4xl">
              {FRASE_CHI_SIAMO.prima}
              <br />
              <span className="font-semibold">{FRASE_CHI_SIAMO.seconda}</span>
            </p>

            <p className="mt-8 text-lg font-light leading-relaxed text-brand-dark/80">
              A FisioEva la fisioterapia lavora insieme all'osteopatia. Vuol dire che la valutazione
              non si ferma al punto in cui senti male: si guarda come si muove tutto il resto, e il
              trattamento si costruisce da lì.
            </p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-2">
              {credibilita.map((dato) => (
                <div key={dato.titolo} className="border-t border-brand-primary/40 pt-5">
                  <dt className="font-semibold text-brand-dark">{dato.titolo}</dt>
                  <dd className="mt-2 text-sm font-light leading-relaxed text-brand-dark/70">
                    {dato.dettaglio}
                  </dd>
                </div>
              ))}
            </dl>

            <Link
              to="/chi-siamo"
              className="group mt-9 inline-flex items-center gap-2 font-semibold text-brand-ink"
            >
              La nostra storia
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* 4 · Il team */}
      <section className="bg-brand-light px-6 py-20 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Occhiello className="mb-6">Il nostro team</Occhiello>
              <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-brand-dark md:text-4xl">
                Tre professioniste, e le persone che hanno scelto.
              </h2>
            </div>
            <Link
              to="/team"
              className="group inline-flex items-center gap-2 font-semibold text-brand-ink"
            >
              Conosci il team
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {titolari.map((persona, i) => (
              <motion.li
                key={persona.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-[2.5rem] border border-brand-primary/20 bg-white p-8 text-center"
              >
                {persona.foto ? (
                  <img
                    src={persona.foto}
                    alt={`Ritratto di ${persona.nome}`}
                    className={`mx-auto h-36 w-36 rounded-full object-cover ring-4 ring-offset-4 ring-offset-white ${
                      persona.accento === 'lilla' ? 'ring-brand-accent' : 'ring-brand-primary'
                    }`}
                  />
                ) : (
                  <div
                    className={`mx-auto flex h-36 w-36 items-center justify-center rounded-full ring-4 ring-offset-4 ring-offset-white ${
                      persona.accento === 'lilla'
                        ? 'bg-brand-accent/15 text-brand-accent ring-brand-accent'
                        : 'bg-brand-primary/15 text-brand-primary ring-brand-primary'
                    }`}
                  >
                    <FiguraLinea className="h-20 w-auto opacity-70" />
                  </div>
                )}

                <h3 className="mt-6 text-lg font-semibold leading-snug text-brand-dark">
                  {persona.nome}
                </h3>
                <p className="mt-1 text-sm font-light text-brand-dark/70">{persona.ruolo}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5 · Percorso donna */}
      <section className="relative overflow-hidden bg-white px-6 py-20 md:py-28">
        <OndeLeggere className="pointer-events-none absolute -left-40 bottom-0 h-96 w-[60rem] text-brand-accent/35" />

        <div className="relative mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Figura alt="" ratio="orizzontale" tono="lilla" rounded="rounded-[3rem]" />

          <div>
            <Occhiello className="mb-7">Percorso donna</Occhiello>
            <h2 className="text-3xl font-semibold leading-tight text-brand-dark md:text-4xl">
              Una cura pensata per te, per ciò di cui spesso nessuno parla.
            </h2>
            <p className="mt-6 text-lg font-light leading-relaxed text-brand-dark/80">
              Perdite, pesantezza, dolore, una cicatrice che tira, un addome che non si richiude.
              Sono cose comuni, ma non sono normali: si valutano e si lavora su ognuna.
            </p>

            <ul className="mt-9 space-y-2">
              {serviziDonna.map((servizio) => (
                <li key={servizio.slug}>
                  <Link
                    to={percorsoServizio(servizio)}
                    className="group flex items-center justify-between gap-4 border-b border-brand-accent/30 py-3.5 transition-colors hover:border-brand-accent"
                  >
                    <span className="font-semibold text-brand-dark">{servizio.nome}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-brand-accent-ink transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6 · Spazio corsi — blocco visivamente diverso */}
      <section className="bg-brand-accent/15 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-accent-ink">
            Al piano superiore
          </p>
          <h2 className="mt-6 text-3xl font-light leading-tight text-brand-dark md:text-4xl">
            {SPAZIO_CORSI_NOME_CONFERMATO ? (
              <>
                <span className="font-semibold">{SPAZIO_CORSI_NOME}</span>: uno spazio per muoversi,
                non per curarsi.
              </>
            ) : (
              <>Uno spazio per muoversi, non per curarsi.</>
            )}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-light leading-relaxed text-brand-dark/75">
            Posturale di gruppo, yoga e pilates. Un ambiente separato dallo studio, con un ritmo
            diverso: qui non si tratta un sintomo, si continua a stare bene.
          </p>
          {!SPAZIO_CORSI_NOME_CONFERMATO && (
            <div className="mt-6 flex justify-center">
              <DatoMancante id="spazioCorsiNome" />
            </div>
          )}
        </div>
      </section>

      {/* 7 · Perché noi — le credenze spezzate */}
      <section className="bg-brand-dark px-6 py-20 text-white md:py-28">
        <div className="mx-auto max-w-6xl">
          <Occhiello tono="chiaro" className="mb-7">
            Perché noi
          </Occhiello>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight md:text-4xl">
            Quattro cose che sentiamo dire spesso.
          </h2>

          <ul className="mt-14 grid gap-10 md:grid-cols-2">
            {credenze.map((voce, i) => (
              <motion.li
                key={voce.credenza}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="border-t border-white/15 pt-7"
              >
                <p className="text-sm font-light italic leading-relaxed text-white/50">
                  “{voce.credenza}”
                </p>
                <p className="mt-3 text-xl font-semibold leading-snug md:text-2xl">
                  {voce.ribaltamento}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* 8 · Dove siamo + prenota */}
      <section className="bg-white px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <Occhiello className="mb-7">Dove siamo</Occhiello>
            <h2 className="text-3xl font-semibold leading-tight text-brand-dark md:text-4xl">
              A Casalotti, in Via di Boccea 755.
            </h2>

            <dl className="mt-9 space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-brand-ink" />
                <div>
                  <dt className="font-semibold text-brand-dark">Indirizzo</dt>
                  <dd className="mt-1 font-light text-brand-dark/70">
                    {studio.indirizzo}, {studio.cap} {studio.citta} ({studio.zona})
                  </dd>
                </div>
              </div>
              <div className="border-t border-brand-primary/30 pt-5">
                <dt className="font-semibold text-brand-dark">Orari</dt>
                <dd className="mt-1.5">
                  <DatoMancante id="orari" fallback="In definizione" />
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-4">
              <Bottone href={PRENOTAZIONE_URL}>{PRENOTAZIONE_LABEL}</Bottone>
              <Bottone to="/contatti" variante="secondaria" icona={ArrowRight}>
                Come arrivare
              </Bottone>
            </div>
          </div>

          <MappaStudio altezza="h-[380px]" />
        </div>
      </section>
    </>
  );
}
