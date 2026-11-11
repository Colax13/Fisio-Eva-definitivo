import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import PageHero from '../components/layout/PageHero';
import CtaBand from '../components/sections/CtaBand';
import Eyebrow from '../components/ui/Eyebrow';
import usePageMeta from '../hooks/usePageMeta';
import { metaScheda } from '../data/seo';
import { comeSiInizia, trovaScheda } from '../data/approfondimenti';
import { immagini, studio, team } from '../data/site';
import { creaSchedaPagina } from '../lib/schemaOrg';
import NotFound from './NotFound';

/**
 * La scheda di un trattamento, su `/servizi/<slug>`.
 *
 * Esiste soprattutto per chi cerca: dice per esteso quello che la card della
 * pagina servizi riassume in una riga. Le forme sono quelle del resto del
 * sito — card bianche arrotondate, fascia scura in apertura e in chiusura.
 */
export default function Trattamento() {
  const { slug = '' } = useParams();
  const s = trovaScheda(slug);
  const meta = metaScheda(slug);

  usePageMeta(meta?.titolo ?? 'Pagina non trovata — FisioEVA', meta?.descrizione, Boolean(s));

  // I dati strutturati della pagina, accanto a quelli dello studio.
  useEffect(() => {
    const dati = creaSchedaPagina(slug);
    let tag = document.getElementById('scheda-pagina') as HTMLScriptElement | null;
    if (!dati) {
      tag?.remove();
      return;
    }
    if (!tag) {
      tag = document.createElement('script');
      tag.type = 'application/ld+json';
      tag.id = 'scheda-pagina';
      document.head.appendChild(tag);
    }
    tag.textContent = JSON.stringify(dati);
    return () => tag?.remove();
  }, [slug]);

  if (!s) return <NotFound />;

  const esperte = s.esperte
    .map((e) => ({ ...e, persona: team.find((m) => m.slug === e.slug)! }))
    .filter((e) => e.persona);

  return (
    <>
      <PageHero
        eyebrow={`${s.categoria.nome} · ${studio.zone}, Roma`}
        title={
          <>
            {s.trattamento.nome} a <span className="text-brand-primary">{studio.zone}</span>
          </>
        }
        subtitle={s.trattamento.sottotitolo}
        breadcrumb={s.trattamento.nome}
        image={s.trattamento.image ?? immagini.manuale}
      />

      {/* Cos'è, con la foto del trattamento quando c'è. */}
      <section className="relative overflow-hidden bg-brand-light/70 px-5 py-16 backdrop-blur-[2px] sm:px-6 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`mx-auto grid max-w-6xl grid-cols-1 overflow-hidden rounded-[2.5rem] border border-white bg-white shadow-xl ${
            s.trattamento.image ? 'lg:grid-cols-2' : ''
          }`}
        >
          {s.trattamento.image && (
            <div className="relative min-h-[260px] lg:min-h-[420px]">
              <img
                src={s.trattamento.image}
                alt={s.trattamento.nome}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-col justify-center p-9 md:p-14">
            <Eyebrow align="left" accent={s.categoria.accent} className="mb-5">
              Di cosa si tratta
            </Eyebrow>
            <h2 className="text-h2 mb-6 text-center font-sans font-bold text-brand-dark lg:text-left">
              {s.trattamento.nome}
            </h2>
            <p className="text-body text-center font-light text-gray-600 lg:text-left">{s.intro}</p>
          </div>
        </motion.div>
      </section>

      {/* Quando ce lo chiedono e come lavoriamo. */}
      <section className="relative bg-brand-light px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white bg-white p-8 shadow-sm md:p-10">
            <Eyebrow align="left" accent="secondary" className="mb-4">
              Quando ce lo chiedono
            </Eyebrow>
            <ul className="mt-6 space-y-3">
              {s.quando.map((q) => (
                <li key={q} className="flex items-start gap-3 text-sm font-light text-gray-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-secondary" />
                  <span>{q}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs font-light text-gray-500">
              Le descrizioni sono informative: non sono una diagnosi né una promessa di risultato.
            </p>
          </div>

          <div className="rounded-[2rem] bg-brand-dark p-8 text-white shadow-xl md:p-10">
            <Eyebrow align="left" tone="light" className="mb-4">
              Come lavoriamo
            </Eyebrow>
            <p className="mt-6 text-sm leading-relaxed font-light text-gray-300">{s.come}</p>
            <p className="mt-4 text-sm leading-relaxed font-light text-gray-300">{comeSiInizia}</p>
            <p className="mt-6 flex items-start gap-3 text-sm font-light text-gray-300">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" />
              <span>
                {studio.address}, {studio.city} — {studio.comeArrivare.breve.charAt(0).toLowerCase()}
                {studio.comeArrivare.breve.slice(1)}.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* Chi se ne occupa: solo ciò che dice il curriculum. */}
      <section className="relative bg-brand-light/70 px-5 py-16 backdrop-blur-[2px] sm:px-6 md:py-20">
        <div className="mx-auto max-w-5xl">
          <Eyebrow className="mb-4">Chi se ne occupa</Eyebrow>
          {esperte.length ? (
            <div className="mt-8 space-y-5">
              {esperte.map(({ persona, perche }) => (
                <div
                  key={persona.slug}
                  className="flex flex-col items-center gap-5 rounded-[2rem] border border-white bg-white p-6 text-center shadow-sm sm:flex-row sm:text-left"
                >
                  <img
                    src={persona.photo}
                    alt={persona.name}
                    loading="lazy"
                    className="h-20 w-20 shrink-0 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-sans font-bold text-brand-dark">{persona.name}</p>
                    <p className="text-xs text-brand-primary-ink">{persona.role}</p>
                    <p className="mt-2 text-sm font-light text-gray-600">{perche}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm font-light text-gray-600">
              Lo studio è guidato da tre fisioterapiste iscritte all'albo,{' '}
              {team.map((m) => m.name).join(', ')}: chi ti segue lo decidiamo insieme dopo il primo
              incontro.
            </p>
          )}
          <p className="mt-6 text-center">
            <Link to="/team" className="text-sm font-medium text-brand-secondary-ink underline-offset-4 hover:underline">
              Conosci il team
            </Link>
          </p>
        </div>
      </section>

      {/* Domande e schede vicine. */}
      <section className="relative bg-brand-light px-5 py-16 sm:px-6 md:py-20">
        <div className="mx-auto max-w-4xl">
          <Eyebrow className="mb-8">Domande frequenti</Eyebrow>
          <dl className="space-y-4">
            {s.faq.map((f) => (
              <div key={f.domanda} className="rounded-[1.75rem] border border-white bg-white/80 p-6 shadow-sm md:p-8">
                <dt className="font-sans text-base font-medium text-brand-dark sm:text-lg">{f.domanda}</dt>
                <dd className="mt-2 text-sm leading-relaxed font-light text-gray-600">{f.risposta}</dd>
              </div>
            ))}
          </dl>

          <nav aria-label="Trattamenti correlati" className="mt-14 text-center">
            <p className="text-eyebrow mb-4 font-semibold text-brand-secondary-ink uppercase">Potrebbe interessarti</p>
            <ul className="flex flex-wrap justify-center gap-2.5">
              {s.correlati.map((c) => {
                const altra = trovaScheda(c);
                return altra ? (
                  <li key={c}>
                    <Link
                      to={altra.url}
                      className="inline-flex min-h-11 items-center rounded-full border border-brand-secondary/40 bg-white px-5 text-sm font-light text-brand-dark transition-colors hover:bg-brand-secondary/10"
                    >
                      {altra.trattamento.nome}
                    </Link>
                  </li>
                ) : null;
              })}
              {/* La scheda parla della posturale di gruppo di StudioEVA: qui la si raggiunge. */}
              {s.trattamento.slug === 'ginnastica-posturale' && (
                <li>
                  <Link
                    to="/studioeva#posturale-di-gruppo"
                    className="inline-flex min-h-11 items-center rounded-full border border-brand-secondary/40 bg-white px-5 text-sm font-light text-brand-dark transition-colors hover:bg-brand-secondary/10"
                  >
                    Posturale di gruppo · StudioEVA
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to={`/servizi#${s.categoria.slug}`}
                  className="inline-flex min-h-11 items-center rounded-full border border-brand-primary/40 bg-white px-5 text-sm font-light text-brand-dark transition-colors hover:bg-brand-primary/10"
                >
                  Tutti i trattamenti
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      <CtaBand titolo="Vuoi capire se è il percorso giusto per te?" />
    </>
  );
}
