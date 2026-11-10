import { useState } from 'react';
import { ArrowDown, Clock, MapPin, MessageCircle, Pause, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'motion/react';
import ArrowButton from '../components/ui/ArrowButton';
import DatoMancante from '../components/ui/DatoMancante';
import Eyebrow from '../components/ui/Eyebrow';
import SectionHeading from '../components/ui/SectionHeading';
import VideoLoop from '../components/ui/VideoLoop';
import usePageMeta from '../hooks/usePageMeta';
import { metaPagine } from '../data/seo';
import { docentiDi, orariDi, studio, studioEva, studioEvaMedia, team, trattamentiDi } from '../data/site';
import { NOTA_WHATSAPP, messaggi, whatsappStudioEvaUrl } from '../lib/contatto';

/**
 * Il marchio di StudioEVA.
 *
 * Finché il file del logo non è nel repository (`studioEva.logo`), il marchio
 * si compone in Nunito, lo stesso carattere del logo: "Studio" in verde
 * acqua, "EVA" in lilla. Quando il file arriva, si valorizza `logo` e qui
 * compare l'immagine.
 */
function Marchio({ className = '' }: { className?: string }) {
  if (studioEva.logo) {
    return <img src={studioEva.logo} alt="" aria-hidden="true" className={`h-auto object-contain ${className}`} />;
  }

  return (
    <span className={`font-logo leading-none font-light tracking-tight ${className}`}>
      <span className="text-brand-secondary">Studio</span>
      <span className="font-medium text-brand-primary">EVA</span>
    </span>
  );
}

const corsi = trattamentiDi('terapie-di-gruppo');

/**
 * Che cosa si vede accanto a ogni corso.
 *
 * Posturale e yoga hanno le riprese vere della sala; il Feldenkrais ha Elisa
 * che lo racconta. Il Pilates non è ancora stato ripreso: resta la foto.
 */
const riprese: Record<string, { video: string; poster: string }> = {
  'posturale-di-gruppo': { video: studioEvaMedia.videoPosturale, poster: studioEvaMedia.posterPosturale },
  yoga: { video: studioEvaMedia.videoRespiro, poster: studioEvaMedia.posterRespiro },
};

/** Le tre frasi dei reel, con la parola che nei video è in grassetto. */
const manifesto = [
  { inizio: 'Qui si', forte: 'respira.' },
  { inizio: 'Vertebra', forte: 'per vertebra.' },
  { inizio: 'Poi ci si muove,', forte: 'insieme.' },
];

export default function StudioEva() {
  usePageMeta(metaPagine['/studioeva'].titolo, metaPagine['/studioeva'].descrizione);

  const reduce = useReducedMotion();
  const [inPausa, setInPausa] = useState(false);

  // Le professioniste che tengono almeno un corso, ciascuna una volta sola.
  const docenti = team
    .map((m) => ({
      ...m,
      corsi: corsi.filter((c) => docentiDi(c.slug).some((d) => d.slug === m.slug)).map((c) => c.nome),
    }))
    .filter((m) => m.corsi.length);

  return (
    <>
      {/*
        Apertura: la sala, prima delle parole.
        Tre riprese affiancate da tablet in su; sul telefono una sola, che è
        già verticale e riempie lo schermo senza tagli. Le altre due sul
        telefono non vengono nemmeno scaricate: si ritrovano più sotto, accanto
        ai corsi.
      */}
      <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 grid grid-cols-1 md:grid-cols-3">
          <VideoLoop
            src={studioEvaMedia.videoYoga}
            poster={studioEvaMedia.posterYoga}
            inPausa={inPausa}
            priorita
            className="h-full"
          />
          <VideoLoop
            src={studioEvaMedia.videoPosturale}
            poster={studioEvaMedia.posterPosturale}
            inPausa={inPausa}
            className="hidden h-full md:block"
          />
          <VideoLoop
            src={studioEvaMedia.videoRespiro}
            poster={studioEvaMedia.posterRespiro}
            inPausa={inPausa}
            className="hidden h-full md:block"
          />
        </div>

        {/* Velature: le riprese sono molto luminose, il testo bianco deve reggere. */}
        <div className="absolute inset-0 bg-brand-dark/15"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark from-5% via-brand-dark/55 via-40% to-transparent to-75%"></div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-40 pb-12 sm:px-6 md:pb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-eyebrow mb-4 font-semibold text-white uppercase [text-shadow:0_1px_10px_rgb(0_0_0/0.45)] md:mb-5"
          >
            {studioEva.natura}
            {/* Sul telefono l'apertura resta corta: il video deve vedersi. */}
            <span className="hidden sm:inline"> · Piano superiore di {studio.name}</span>
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-sans font-bold text-white"
          >
            <Marchio className="mb-2 block text-3xl [text-shadow:0_1px_10px_rgb(0_0_0/0.35)] md:mb-3 md:text-4xl" />
            <span className="block text-[clamp(2.75rem,1.2rem+6.6vw,6.5rem)] leading-[1.02] tracking-tight">
              Lascia fuori <span className="text-brand-primary">la giornata.</span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lead mt-5 max-w-xl font-light text-gray-100 md:mt-6"
          >
            Un'ora per te, in una sala piena di luce.
            <span className="hidden sm:inline">
              {' '}
              Ginnastica posturale, Yoga, Pilates e metodo Feldenkrais in piccolo gruppo, in{' '}
              {studio.address.replace(',', '')}, a Casalotti.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 flex flex-col gap-3 sm:flex-row md:mt-9"
          >
            <ArrowButton
              href={whatsappStudioEvaUrl(messaggi.studioEva)}
              icon={MessageCircle}
              verso="inizio"
              esterno
            >
              Prova la prima lezione
            </ArrowButton>
            <ArrowButton href="#corsi" variant="ghost" icon={ArrowDown}>
              Scopri i corsi
            </ArrowButton>
          </motion.div>
        </div>

        {/* Un video che si muove da solo deve potersi fermare. */}
        {!reduce && (
          <button
            type="button"
            onClick={() => setInPausa((p) => !p)}
            aria-pressed={inPausa}
            aria-label={inPausa ? 'Riprendi i video di sfondo' : 'Ferma i video di sfondo'}
            className="absolute top-20 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-brand-dark/40 text-white backdrop-blur-sm transition-colors hover:bg-brand-dark/80 md:top-auto md:right-6 md:bottom-6"
          >
            {inPausa ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
          </button>
        )}
      </section>

      {/* Il manifesto: le tre frasi dei reel, e chi è StudioEVA. */}
      <section className="relative overflow-hidden bg-brand-light px-5 py-20 sm:px-6 md:py-32">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
          <div className="absolute -right-[10%] -bottom-[30%] h-[60%] w-[50%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div className="text-center lg:text-left">
            {manifesto.map((riga, i) => (
              <motion.p
                key={riga.forte}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-10% 0px' }}
                transition={{ duration: 0.7, delay: i * 0.18, ease: 'easeOut' }}
                className="font-logo text-[clamp(2rem,1.2rem+3.6vw,4rem)] leading-[1.15] font-light text-brand-dark"
              >
                {riga.inizio}{' '}
                <span className={`font-bold ${i % 2 ? 'text-brand-secondary-ink' : 'text-brand-primary-ink'}`}>
                  {riga.forte}
                </span>
              </motion.p>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Eyebrow align="left" accent="secondary" className="mb-5">
              {`Chi è ${studioEva.nome}`}
            </Eyebrow>
            <h2 className="text-h3 mb-5 text-center font-sans font-bold text-brand-dark lg:text-left">
              Un luogo per continuare a muoversi bene
            </h2>
            <p className="text-body mb-6 text-center font-light text-gray-600 lg:text-left">
              {studioEva.presentazione}
            </p>
            <p className="flex items-start justify-center gap-3 text-sm font-light text-gray-600 lg:justify-start">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
              <span>{studioEva.dove}</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* I quattro corsi, ciascuno con la sua ripresa. */}
      <section id="corsi" className="relative bg-white px-5 py-20 sm:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <SectionHeading
            eyebrow="I corsi"
            accent="secondary"
            lead="Piccoli gruppi, ritmi diversi, un obiettivo comune: stare meglio nel proprio corpo."
          >
            Quattro modi per <span className="text-brand-primary-ink">trovare il tuo centro</span>
          </SectionHeading>

          {/* Si sceglie da ciò che si cerca, non dal nome della disciplina. */}
          <ul className="mx-auto mt-10 flex max-w-3xl flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center">
            {corsi.map((corso) => (
              <li key={corso.slug}>
                <a
                  href={`#${corso.slug}`}
                  className="flex min-h-11 items-center justify-center rounded-full border border-brand-secondary/50 px-5 py-2.5 text-center text-sm text-brand-dark transition-colors hover:border-brand-secondary hover:bg-brand-secondary/10"
                >
                  {studioEva.perChi[corso.slug]}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-16 space-y-20 md:mt-24 md:space-y-28">
            {corsi.map((corso, idx) => {
              const docentiCorso = docentiDi(corso.slug);
              const orari = orariDi(corso.nome);
              const ripresa = riprese[corso.slug];
              const feldenkrais = corso.slug === 'feldenkrais';

              return (
                <motion.article
                  key={corso.slug}
                  id={corso.slug}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-10% 0px' }}
                  transition={{ duration: 0.7, ease: 'easeOut' }}
                  className="grid scroll-mt-28 grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20"
                >
                  <div className={idx % 2 ? 'lg:order-2' : ''}>
                    {feldenkrais ? (
                      <figure className="mx-auto w-full max-w-[20rem]">
                        {/* L'unico video con la voce: parte solo se lo si avvia. */}
                        <video
                          controls
                          playsInline
                          preload="none"
                          poster={studioEvaMedia.posterFeldenkrais}
                          aria-label="Elisa De Rubeis racconta che cos'è il metodo Feldenkrais"
                          className="aspect-[9/16] w-full rounded-[2rem] bg-brand-dark object-cover shadow-xl"
                        >
                          <source src={studioEvaMedia.videoFeldenkrais} type="video/mp4" />
                        </video>
                        <figcaption className="mt-4 text-center text-xs font-light text-gray-500">
                          Elisa racconta il metodo · 48 secondi, con audio e sottotitoli
                        </figcaption>
                      </figure>
                    ) : ripresa ? (
                      <VideoLoop
                        src={ripresa.video}
                        poster={ripresa.poster}
                        className="mx-auto aspect-[720/932] w-full max-w-md rounded-[2.5rem] shadow-xl"
                      />
                    ) : (
                      <div className="relative mx-auto aspect-[720/932] w-full max-w-md overflow-hidden rounded-[2.5rem] shadow-xl">
                        {corso.image && (
                          <img
                            src={corso.image}
                            alt=""
                            aria-hidden="true"
                            loading="lazy"
                            className="absolute inset-0 h-full w-full object-cover"
                          />
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <Eyebrow align="left" accent={idx % 2 ? 'primary' : 'secondary'} className="mb-4">
                      {studioEva.perChi[corso.slug]}
                    </Eyebrow>
                    <h3 className="text-h2 text-center font-sans font-bold text-brand-dark lg:text-left">
                      {corso.nome}
                    </h3>
                    <p className="mt-4 text-center font-logo text-2xl leading-snug font-light text-brand-primary-ink md:text-3xl lg:text-left">
                      {studioEva.frasi[corso.slug]}
                    </p>
                    {feldenkrais && (
                      <p className="mt-2 text-center text-xs font-light text-gray-500 lg:text-left">
                        Ce lo dicono spesso, a fine lezione.
                      </p>
                    )}
                    <p className="text-body mt-6 text-center font-light text-gray-600 lg:text-left">
                      {studioEva.dettagli[corso.slug]}
                    </p>

                    {orari.length > 0 && (
                      <ul className="mt-7 space-y-2.5 border-t border-gray-100 pt-6">
                        {orari.map((o) => (
                          <li
                            key={`${o.giorno}-${o.ore}`}
                            className="flex items-start justify-center gap-3 text-sm text-brand-dark lg:justify-start"
                          >
                            <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary-ink" />
                            <span>
                              <span className="font-medium">{o.giorno}</span>
                              <span className="font-light text-gray-600"> · {o.ore}</span>
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {corso.slug === 'posturale-di-gruppo' && (
                      <p className="mt-3 text-center text-sm font-light text-gray-500 lg:text-left">
                        L'orario lo scegliamo insieme: scrivici e ti diciamo quello giusto per te.
                      </p>
                    )}

                    {docentiCorso.length > 0 ? (
                      <p className="mt-5 text-center text-sm font-light text-gray-600 lg:text-left">
                        Con {docentiCorso.map((d) => d.name).join(' e ')}
                      </p>
                    ) : (
                      // Finché il docente non è confermato la riga non compare: meglio
                      // una riga in meno che «un professionista» senza nome.
                      <p className="mt-5 text-center lg:text-left">
                        <DatoMancante id={`chi tiene ${corso.nome}`} nascondiInProduzione />
                      </p>
                    )}

                    <div className="mt-8 flex justify-center lg:justify-start">
                      <ArrowButton
                        href={whatsappStudioEvaUrl(messaggi.corso(corso.nome))}
                        variant={idx % 2 ? 'primary' : 'secondary'}
                        icon={MessageCircle}
                        verso="inizio"
                        esterno
                      >
                        Prova una lezione
                      </ArrowButton>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Chi guida i corsi: solo chi è confermato. */}
      {docenti.length > 0 && (
        <section className="relative overflow-hidden bg-brand-light px-5 py-20 sm:px-6 md:py-28">
          <div className="mx-auto max-w-5xl">
            <SectionHeading eyebrow="Chi guida i corsi">
              Mani <span className="text-brand-primary-ink">esperte</span>, anche in gruppo
            </SectionHeading>

            <div className="mt-12 space-y-6 md:mt-16">
              {docenti.map((m) => (
                <motion.article
                  key={m.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 items-center gap-8 rounded-[2rem] border border-white bg-white p-7 shadow-sm md:grid-cols-[200px_1fr] md:p-10"
                >
                  <img
                    src={m.photo}
                    alt={m.name}
                    loading="lazy"
                    className="mx-auto aspect-square w-40 rounded-full object-cover md:w-full"
                  />
                  <div className="text-center md:text-left">
                    <h3 className="font-sans text-xl font-bold text-brand-dark">{m.name}</h3>
                    <p className="mt-1 text-sm text-brand-primary-ink">{m.role}</p>
                    <p className="mt-1 text-xs font-semibold tracking-wide text-brand-secondary-ink uppercase">
                      Tiene: {m.corsi.join(' · ')}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed font-light text-gray-600">
                      {m.descrizioneBreve ?? m.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Iscrizione: la luce sul pavimento della sala, e tre passi. */}
      <section id="iscriversi" className="relative isolate overflow-hidden bg-brand-dark px-5 py-20 sm:px-6 md:py-32">
        <img
          src={studioEvaMedia.luce}
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-brand-dark/45"></div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-dark/90 via-brand-dark/50 to-transparent"></div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Eyebrow align="left" tone="light" className="mb-5">
              Come iscriversi
            </Eyebrow>
            <h2 className="text-h1 text-center font-sans font-bold text-white lg:text-left">
              Prova la <span className="text-brand-primary">prima lezione.</span>
            </h2>
            <p className="text-lead mt-6 text-center font-light text-gray-200 lg:text-left">
              Non serve essere flessibili, né averlo mai fatto: si parte dal respiro e dal proprio corpo.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
              <ArrowButton
                href={whatsappStudioEvaUrl(messaggi.studioEva)}
                variant="ghost"
                icon={MessageCircle}
                verso="inizio"
                esterno
              >
                WhatsApp {studioEva.whatsappLeggibile}
              </ArrowButton>
            </div>
            <p className="mt-5 max-w-md text-center text-xs font-light text-gray-300 lg:text-left">
              {NOTA_WHATSAPP} Come trattiamo i tuoi dati:{' '}
              <Link to="/privacy#studioeva" className="underline underline-offset-2 hover:text-white">
                privacy policy
              </Link>
              .
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="rounded-[2rem] border border-white/15 bg-brand-dark/60 p-8 text-white backdrop-blur-sm md:p-10"
          >
            <h3 className="mb-7 text-center font-sans text-xl font-bold lg:text-left">Tre passi, niente di più</h3>

            <ol className="space-y-6">
              {studioEva.iscrizione.map((passo, i) => (
                <li key={passo.titolo} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-brand-dark">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-medium">{passo.titolo}</span>
                    <span className="block text-sm font-light text-gray-300">{passo.desc}</span>
                  </span>
                </li>
              ))}
            </ol>

            {/* Le modalità di partecipazione (quota, eventuale adesione
                all'associazione) si spiegano al primo contatto: il sito non
                le dettaglia finché non sono confermate. */}
            <p className="mt-7 border-t border-white/15 pt-6 text-sm font-light text-gray-300">
              {studioEva.tessera ?? 'Costi e modalità di partecipazione te li spieghiamo al primo contatto.'}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Il confine con lo studio: chi arriva da qui deve sapere cosa è sanitario e cosa no. */}
      <section className="bg-brand-light px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm leading-relaxed font-light text-gray-600">
            I corsi di {studioEva.nome} sono attività di movimento e benessere, non trattamenti
            sanitari. Se hai un dolore o un problema specifico, il primo passo è una valutazione
            con le fisioterapiste e osteopate di {studio.name}, al piano di sotto.
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <ArrowButton to="/servizi">I trattamenti dello studio</ArrowButton>
            <ArrowButton to="/contatti" variant="secondary">
              Prenota una valutazione
            </ArrowButton>
          </div>
        </div>
      </section>
    </>
  );
}
