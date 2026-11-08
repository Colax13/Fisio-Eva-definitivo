import { Clock, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import PageHero from '../components/layout/PageHero';
import ArrowButton from '../components/ui/ArrowButton';
import DatoMancante from '../components/ui/DatoMancante';
import Eyebrow from '../components/ui/Eyebrow';
import SectionHeading from '../components/ui/SectionHeading';
import usePageMeta from '../hooks/usePageMeta';
import { metaPagine } from '../data/seo';
import { docentiDi, stock, studio, studioEva, team, trattamentiDi } from '../data/site';
import { NOTA_WHATSAPP, messaggi, whatsappStudioEvaUrl } from '../lib/contatto';

/**
 * Il marchio di StudioEVA.
 *
 * Finché il file del logo non è nel repository (`studioEva.logo`), il marchio
 * si compone in Nunito, lo stesso carattere del logo: "Studio" in verde
 * acqua, "EVA" in lilla, il claim spaziato sotto. Quando il file arriva, si
 * valorizza `logo` e qui compare l'immagine.
 */
function Marchio({ className = '' }: { className?: string }) {
  if (studioEva.logo) {
    return (
      <img
        src={studioEva.logo}
        alt={`${studioEva.nome} — ${studioEva.claim}`}
        className={`h-auto w-full max-w-xs object-contain ${className}`}
      />
    );
  }

  return (
    <div className={`text-center font-logo ${className}`}>
      <p className="text-6xl leading-none font-light tracking-tight md:text-7xl" aria-label={studioEva.nome}>
        <span className="text-brand-secondary">Studio</span>
        <span className="font-medium text-brand-primary">EVA</span>
      </p>
      <p className="mt-4 text-sm font-light tracking-[0.45em] text-brand-secondary-ink uppercase">
        {studioEva.claim}
      </p>
    </div>
  );
}

const corsi = trattamentiDi('terapie-di-gruppo');

export default function StudioEva() {
  usePageMeta(metaPagine['/studioeva'].titolo, metaPagine['/studioeva'].descrizione);

  // Le professioniste che tengono almeno un corso, ciascuna una volta sola.
  const docenti = team
    .map((m) => ({
      ...m,
      corsi: corsi.filter((c) => docentiDi(c.slug).some((d) => d.slug === m.slug)).map((c) => c.nome),
    }))
    .filter((m) => m.corsi.length);

  return (
    <>
      <PageHero
        eyebrow={`${studioEva.natura} · Piano superiore`}
        title={
          <>
            {studioEva.nome}: <span className="text-brand-primary">{studioEva.claim.toLowerCase()}</span>
          </>
        }
        subtitle="Posturale di gruppo, metodo Feldenkrais, Yoga e Pilates in Via di Boccea 755, a Casalotti. Per muoversi bene, insieme."
        breadcrumb={studioEva.nome}
        image={stock.posturaleGruppo}
      />

      {/* Chi siamo: il marchio accanto alla presentazione. */}
      <section className="relative overflow-hidden bg-brand-light/70 px-5 py-16 backdrop-blur-[2px] sm:px-6 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 overflow-hidden rounded-[2.5rem] border border-white bg-white p-9 shadow-xl md:p-14 lg:grid-cols-[1fr_1.2fr] lg:gap-16"
        >
          <div className="flex justify-center">
            <Marchio />
          </div>

          <div>
            <Eyebrow align="left" accent="secondary" className="mb-5">
              {`Chi è ${studioEva.nome}`}
            </Eyebrow>
            <h2 className="text-h2 mb-6 text-center font-sans font-bold text-brand-dark lg:text-left">
              Un luogo per continuare a muoversi bene
            </h2>
            <p className="text-body mb-5 text-center font-light text-gray-600 lg:text-left">
              {studioEva.presentazione}
            </p>
            <p className="flex items-start justify-center gap-3 text-sm font-light text-gray-600 lg:justify-start">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
              <span>{studioEva.dove}</span>
            </p>
          </div>
        </motion.div>
      </section>

      {/* I quattro corsi. */}
      <section id="corsi" className="relative bg-brand-light px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="I corsi"
            accent="secondary"
            lead="Piccoli gruppi, ritmi diversi, un obiettivo comune: stare meglio nel proprio corpo."
          >
            Quattro modi per <span className="text-brand-primary">trovare il tuo centro</span>
          </SectionHeading>

          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 md:mt-16">
            {corsi.map((corso, idx) => {
              const docenti = docentiDi(corso.slug);

              return (
                <motion.li
                  key={corso.slug}
                  id={corso.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className="flex flex-col overflow-hidden rounded-[2rem] border border-white bg-white shadow-sm"
                >
                  <div className="relative aspect-[4/3]">
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
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-2 font-sans text-lg font-bold text-brand-dark">{corso.nome}</h3>
                    <p className="mb-2 text-sm leading-relaxed font-light text-gray-600">{corso.sottotitolo}</p>
                    <p className="mb-5 flex-1 text-sm leading-relaxed font-light text-gray-500">
                      {studioEva.dettagli[corso.slug]}
                    </p>
                    <p className="text-xs text-gray-500">
                      <span className="font-semibold tracking-wide text-brand-secondary-ink uppercase">
                        Con{' '}
                      </span>
                      {docenti.length ? (
                        docenti.map((d) => d.name).join(' e ')
                      ) : (
                        <DatoMancante id={`chi tiene ${corso.nome}`} fallback="un professionista specializzato" />
                      )}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Chi guida i corsi: solo chi è confermato. */}
      {docenti.length > 0 && (
        <section className="relative overflow-hidden bg-brand-light/70 px-5 py-16 backdrop-blur-[2px] sm:px-6 md:py-24">
          <div className="mx-auto max-w-5xl">
            <SectionHeading eyebrow="Chi guida i corsi">
              Mani <span className="text-brand-primary">esperte</span>, anche in gruppo
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

      {/* Orari e iscrizione. */}
      <section id="iscriversi" className="relative bg-brand-light px-5 py-16 sm:px-6 md:py-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-[2rem] border border-white bg-white p-8 shadow-sm md:p-10"
          >
            <Eyebrow align="left" accent="secondary" className="mb-4">
              Orari
            </Eyebrow>
            <h2 className="mb-6 text-center font-sans text-2xl font-bold text-brand-dark lg:text-left">
              Quando si fa lezione
            </h2>

            {studioEva.orari ? (
              <ul className="divide-y divide-gray-100">
                {studioEva.orari.map((o) => (
                  <li
                    key={`${o.corso}-${o.giorno}-${o.ore}`}
                    className="flex flex-col gap-0.5 py-3 text-sm sm:flex-row sm:items-center sm:justify-between sm:gap-4"
                  >
                    <span className="font-medium text-brand-dark">{o.corso}</span>
                    <span className="font-light text-gray-600">
                      {o.giorno} · {o.ore}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="flex items-start gap-3 text-sm font-light text-gray-600">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
                <span>
                  <DatoMancante
                    id="calendario dei corsi StudioEVA"
                    fallback="Il calendario dei corsi cambia con le stagioni: chiedi alla segreteria giorni e orari aggiornati."
                  />
                </span>
              </p>
            )}

            <p className="mt-6 text-xs font-light text-gray-500">
              Per la posturale l'orario lo scegliamo insieme: scrivici e ti diciamo quello giusto per te.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="rounded-[2rem] bg-brand-dark p-8 text-white shadow-xl md:p-10"
          >
            <Eyebrow align="left" tone="light" className="mb-4">
              Come iscriversi
            </Eyebrow>
            <h2 className="mb-6 text-center font-sans text-2xl font-bold lg:text-left">Tre passi, niente di più</h2>

            <ol className="space-y-5">
              {studioEva.iscrizione.map((passo, i) => (
                <li key={passo.titolo} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-primary text-sm font-bold">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-medium">{passo.titolo}</span>
                    <span className="block text-sm font-light text-gray-300">{passo.desc}</span>
                  </span>
                </li>
              ))}
            </ol>

            {studioEva.tessera ? (
              <p className="mt-6 text-sm font-light text-gray-300">{studioEva.tessera}</p>
            ) : (
              <p className="mt-6 text-sm">
                <DatoMancante id="tessera/quota associativa StudioEVA" nascondiInProduzione />
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
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
            <p className="mt-4 text-xs font-light text-gray-400">{NOTA_WHATSAPP}</p>
          </motion.div>
        </div>
      </section>

      {/* Il confine con lo studio: chi arriva da qui deve sapere cosa è sanitario e cosa no. */}
      <section className="bg-brand-light/70 px-5 pb-20 backdrop-blur-[2px] sm:px-6">
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
