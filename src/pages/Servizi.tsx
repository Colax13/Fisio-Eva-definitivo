import { useMemo, useState } from 'react';
import { ArrowUpRight, Search, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Intestazione from '../components/layout/Intestazione';
import ArrowButton from '../components/ui/ArrowButton';
import SectionHeading from '../components/ui/SectionHeading';
import {
  categorie,
  percorsoCategoria,
  percorsoServizio,
  servizi,
  serviziDiCategoria,
  sintomiInEvidenza,
  type Categoria,
  type CategoriaSlug,
  type Servizio,
} from '../content/servizi';
import { PRENOTAZIONE_LABEL, PRENOTAZIONE_URL, immagineCategoria } from '../config/site';
import { schemaBreadcrumb, schemaStudio, usePageSeo } from '../lib/seo';

// Segni diacritici combinanti: costruito da escape ASCII per non dipendere
// da caratteri invisibili nel sorgente.
const DIACRITICI = new RegExp('[\\u0300-\\u036f]', 'g');

/** Minuscolo, senza accenti: cosi "cervicale" trova anche "Cervicalgia". */
const normalizza = (testo: string) =>
  testo
    .toLowerCase()
    .normalize('NFD')
    .replace(DIACRITICI, '');

/**
 * Parole di servizio: chi cerca "torcicollo del neonato" intende "torcicollo"
 * e "neonato". Pretendere anche "del" farebbe fallire la ricerca su un testo
 * che parla esattamente di quello.
 */
const VUOTE = new Set([
  'a', 'ad', 'agli', 'ai', 'al', 'alla', 'alle', 'allo', 'che', 'chi', 'con', 'da', 'dal', 'dalla',
  'degli', 'dei', 'del', 'della', 'delle', 'dello', 'di', 'e', 'ed', 'gli', 'i', 'il', 'in', 'la',
  'le', 'lo', 'me', 'mi', 'ne', 'nel', 'nella', 'non', 'o', 'per', 'piu', 'si', 'su', 'sul', 'sulla',
  'un', 'una', 'uno',
]);

/**
 * Ogni parola cercata deve comparire da qualche parte nel servizio.
 * Le parole di servizio si scartano, ma se la query ne è fatta solo (uno "che"
 * battuto per sbaglio) si cerca comunque su quelle.
 */
function cerca(query: string): Servizio[] {
  const tutti = normalizza(query).split(/\s+/).filter(Boolean);
  if (!tutti.length) return [];

  const utili = tutti.filter((t) => !VUOTE.has(t));
  const termini = utili.length ? utili : tutti;

  return servizi.filter((servizio) => {
    const testo = normalizza(
      [servizio.nome, servizio.sottotitolo, ...servizio.sintomi, ...servizio.quandoServe].join(' ')
    );
    return termini.every((t) => testo.includes(t));
  });
}

/** Solo le categorie che hanno davvero dei servizi da mostrare. */
const categorieVisibili = categorie.filter(
  (c) => c.inMenu && serviziDiCategoria(c.slug).length > 0
);

type Filtro = CategoriaSlug | 'tutti';

/** La card di una categoria: foto di sfondo, gradiente, conteggio. */
function CardCategoria({
  categoria,
  attiva,
  onSelect,
}: {
  categoria: Categoria;
  attiva: boolean;
  onSelect: () => void;
}) {
  const quanti = serviziDiCategoria(categoria.slug).length;
  const foto = immagineCategoria[categoria.slug];

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={attiva}
      className={`group relative min-h-[15rem] overflow-hidden rounded-[2rem] text-left shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-primary/40 ${
        attiva ? 'ring-4 ring-brand-primary' : ''
      }`}
    >
      <img
        src={foto}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* Il gradiente non è decorativo: senza, il testo bianco non regge il
          contrasto su una foto qualsiasi. */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/55 to-brand-dark/20" />
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          categoria.tono === 'lilla' ? 'bg-brand-primary/25' : 'bg-brand-secondary/25'
        } ${attiva ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`}
      />

      <div className="relative flex h-full min-h-[15rem] flex-col justify-end p-7">
        <span className="mb-2 text-[11px] font-medium uppercase tracking-widest text-white/80">
          {quanti} {quanti === 1 ? 'servizio' : 'servizi'}
        </span>
        <span className="text-2xl font-bold leading-tight text-white">{categoria.nome}</span>
        <span className="mt-2 text-sm font-light leading-relaxed text-white/85">
          {categoria.sottotitolo}
        </span>
      </div>
    </button>
  );
}

/** Card di un singolo servizio. */
function CardServizio({ servizio, indice }: { servizio: Servizio; indice: number }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(indice, 8) * 0.04 }}
    >
      <Link
        to={percorsoServizio(servizio)}
        className="group flex h-full flex-col rounded-[1.75rem] border border-white bg-white/80 p-7 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
      >
        <span className="flex items-start justify-between gap-4">
          <span className="text-lg font-bold leading-snug text-brand-dark">{servizio.nome}</span>
          <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-brand-primary-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>

        <span className="mt-2 flex-1 text-sm font-light leading-relaxed text-gray-600">
          {servizio.sottotitolo}
        </span>

        <span className="mt-5 h-[2px] w-8 bg-brand-primary transition-all duration-500 group-hover:w-14" />
      </Link>
    </motion.li>
  );
}

export default function Servizi() {
  const [query, setQuery] = useState('');
  const [filtro, setFiltro] = useState<Filtro>('tutti');

  usePageSeo({
    title: 'Servizi e trattamenti | FisioEva, Casalotti Roma',
    description:
      'Fisioterapia, osteopatia, salute della donna, osteopatia neonatale e terapie strumentali a Roma zona Boccea-Casalotti. Cerca per sintomo e trova il percorso adatto.',
    path: '/servizi',
    schema: [
      schemaStudio(),
      schemaBreadcrumb([
        { nome: 'Home', path: '/' },
        { nome: 'Servizi', path: '/servizi' },
      ]),
    ],
  });

  const risultati = useMemo(() => cerca(query), [query]);
  const inRicerca = query.trim().length > 0;

  /** Le categorie da stampare sotto: tutte, o solo quella scelta. */
  const daMostrare = useMemo(
    () => (filtro === 'tutti' ? categorieVisibili : categorieVisibili.filter((c) => c.slug === filtro)),
    [filtro]
  );

  return (
    <>
      <Intestazione
        occhiello="Servizi"
        titolo="Da dove vuoi partire?"
        sottotitolo="Non serve sapere di cosa hai bisogno. Serve sapere cosa senti. Qui trovi tutto quello che facciamo, diviso per come arriva la gente da noi: un dolore che non passa, un intervento da recuperare, una gravidanza, un bambino che non dorme."
        briciole={[
          { nome: 'Home', path: '/' },
          { nome: 'Servizi', path: '/servizi' },
        ]}
      />

      {/* 1 · Cerca un sintomo */}
      <section className="relative overflow-hidden bg-white px-6 pb-16">
        <div className="mx-auto max-w-4xl">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-6 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Cerca un sintomo: mal di schiena, coliche, perdite…"
              aria-label="Cerca un sintomo"
              className="w-full rounded-full border-2 border-brand-primary/40 bg-white py-4 pl-14 pr-12 text-brand-dark shadow-sm placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-4 focus:ring-brand-primary/20"
            />
            {inRicerca && (
              <button
                onClick={() => setQuery('')}
                aria-label="Cancella la ricerca"
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-brand-dark"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {!inRicerca && (
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              {sintomiInEvidenza.map((sintomo) => (
                <button
                  key={sintomo}
                  onClick={() => setQuery(sintomo)}
                  className="rounded-full border border-brand-primary/40 px-4 py-1.5 text-sm font-light text-brand-dark transition-colors hover:bg-brand-primary hover:text-white"
                >
                  {sintomo}
                </button>
              ))}
            </div>
          )}

          {inRicerca && (
            <div className="mt-8">
              {risultati.length > 0 ? (
                <>
                  <p className="mb-5 text-sm text-gray-500">
                    {risultati.length}{' '}
                    {risultati.length === 1 ? 'servizio trovato' : 'servizi trovati'}
                  </p>
                  <ul className="grid gap-5 sm:grid-cols-2">
                    {risultati.map((servizio, i) => (
                      <CardServizio key={servizio.slug} servizio={servizio} indice={i} />
                    ))}
                  </ul>
                </>
              ) : (
                <div className="rounded-[2rem] border border-white bg-white/80 p-10 text-center shadow-lg backdrop-blur-md">
                  <p className="text-brand-dark">
                    Non trovi quello che cerchi? Scrivici, ti diciamo se possiamo aiutarti.
                  </p>
                  <div className="mt-6 flex justify-center">
                    <ArrowButton to="/contatti" variant="secondary">
                      Vai ai contatti
                    </ArrowButton>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* 2 · Scegli la categoria — card con sfondo fotografico */}
      {!inRicerca && (
        <section className="relative overflow-hidden bg-brand-light px-6 py-20">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -right-[10%] -top-[20%] h-[60%] w-[60%] rounded-full bg-brand-primary/10 blur-[120px]" />
            <div className="absolute -bottom-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-brand-secondary/10 blur-[120px]" />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl">
            <SectionHeading eyebrow="Le aree di lavoro" className="mb-14">
              Scegli <span className="text-brand-primary">da dove partire</span>
            </SectionHeading>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {categorieVisibili.map((categoria) => (
                <CardCategoria
                  key={categoria.slug}
                  categoria={categoria}
                  attiva={filtro === categoria.slug}
                  onSelect={() =>
                    setFiltro((f) => (f === categoria.slug ? 'tutti' : categoria.slug))
                  }
                />
              ))}
            </div>

            {filtro !== 'tutti' && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => setFiltro('tutti')}
                  className="rounded-full border-2 border-brand-dark/20 px-6 py-2.5 text-sm font-medium text-brand-dark transition-colors hover:border-brand-dark"
                >
                  Mostra tutte le categorie
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 3 · Tutti i servizi, visibili, raggruppati per categoria */}
      {!inRicerca && (
        <section className="relative overflow-hidden bg-white px-6 py-20">
          <div className="mx-auto max-w-7xl">
            {/* Niente AnimatePresence con key sul blocco intero: bloccherebbe
                il cambio di categoria dietro un'animazione di uscita. Si anima
                ogni gruppo per conto suo, e il filtro è immediato. */}
            <div className="space-y-20">
                {daMostrare.map((categoria) => {
                  const elenco = serviziDiCategoria(categoria.slug);

                  return (
                    <motion.div
                      key={categoria.slug}
                      layout
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      id={categoria.slug}
                      className="scroll-mt-28"
                    >
                      <div className="mb-10 flex flex-wrap items-end justify-between gap-4 border-b border-gray-200 pb-6">
                        <div>
                          <div className="mb-3 flex items-center gap-4">
                            <div
                              className={`h-[1px] w-12 ${
                                categoria.tono === 'lilla'
                                  ? 'bg-brand-primary'
                                  : 'bg-brand-secondary'
                              }`}
                            />
                            <span
                              className={`text-xs font-medium uppercase tracking-widest ${
                                categoria.tono === 'lilla'
                                  ? 'text-brand-primary-ink'
                                  : 'text-brand-secondary-ink'
                              }`}
                            >
                              {categoria.nome}
                            </span>
                          </div>
                          <h2 className="text-3xl font-bold leading-tight text-brand-dark md:text-4xl">
                            {categoria.titoloEsteso}
                          </h2>
                          <p className="mt-3 max-w-2xl font-light leading-relaxed text-gray-600">
                            {categoria.sottotitolo}
                          </p>
                        </div>

                        <Link
                          to={percorsoCategoria(categoria.slug)}
                          className="group inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-brand-dark transition-colors hover:text-brand-primary-ink"
                        >
                          Vai alla categoria
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        </Link>
                      </div>

                      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {elenco.map((servizio, i) => (
                          <CardServizio key={servizio.slug} servizio={servizio} indice={i} />
                        ))}
                      </ul>
                    </motion.div>
                  );
                })}
            </div>
          </div>
        </section>
      )}

      {/* 4 · Chiusura */}
      <section className="bg-brand-light px-6 pb-24 pt-8">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] bg-brand-dark px-8 py-14 text-center text-white md:px-14">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-primary">
            Prima valutazione
          </p>
          <h2 className="mt-5 text-2xl font-bold leading-tight md:text-3xl">
            Non sai da dove iniziare? La prima valutazione serve a questo.
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-light leading-relaxed text-white/70">
            Si parte dall'ascolto e dalla valutazione. Alla fine sai cosa abbiamo trovato e come si
            imposta il percorso.
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
