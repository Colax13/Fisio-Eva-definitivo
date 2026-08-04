import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Intestazione from '../components/layout/Intestazione';
import Bottone from '../components/ui/Bottone';
import {
  getCategoria,
  percorsoCategoria,
  percorsoServizio,
  serviziDiCategoria,
  type CategoriaSlug,
} from '../content/servizi';
import { PRENOTAZIONE_LABEL, PRENOTAZIONE_URL } from '../config/site';
import { schemaBreadcrumb, schemaStudio, usePageSeo } from '../lib/seo';

export default function ServiziCategoria() {
  const { categoria: slug } = useParams<{ categoria: string }>();
  const categoria = getCategoria(slug ?? '');

  if (!categoria) return <Navigate to="/servizi" replace />;

  return <Contenuto slug={categoria.slug} />;
}

/** Separato dal wrapper così gli hook girano solo su una categoria valida. */
function Contenuto({ slug }: { slug: CategoriaSlug }) {
  const categoria = getCategoria(slug)!;
  const elenco = serviziDiCategoria(slug);
  const path = percorsoCategoria(slug);

  const briciole = [
    { nome: 'Home', path: '/' },
    { nome: 'Servizi', path: '/servizi' },
    { nome: categoria.nome, path },
  ];

  usePageSeo({
    title: `${categoria.titoloEsteso} a Casalotti, Roma | FisioEva`,
    description: `${categoria.sottotitolo} Trattamenti a Roma zona Boccea-Casalotti presso FisioEva.`,
    path,
    schema: [schemaStudio(), schemaBreadcrumb(briciole)],
  });

  return (
    <>
      <Intestazione
        occhiello="Servizi"
        titolo={categoria.titoloEsteso}
        sottotitolo={categoria.intro ?? categoria.sottotitolo}
        briciole={briciole}
      />

      <section className="bg-brand-light px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <ul className="grid gap-5 sm:grid-cols-2">
            {elenco.map((servizio, i) => (
              <motion.li
                key={servizio.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(i, 5) * 0.05 }}
              >
                <Link
                  to={percorsoServizio(servizio)}
                  className="group flex h-full flex-col rounded-[2rem] border border-brand-primary/20 bg-white p-8 transition-all hover:-translate-y-0.5 hover:border-brand-primary hover:shadow-md"
                >
                  <h2 className="text-xl font-semibold text-brand-dark">{servizio.nome}</h2>
                  <p className="mt-3 flex-1 font-light leading-relaxed text-brand-dark/70">
                    {servizio.sottotitolo}
                  </p>

                  {!categoria.sobria && servizio.sintomi.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-1.5">
                      {servizio.sintomi.slice(0, 4).map((sintomo) => (
                        <li
                          key={sintomo}
                          className="rounded-full bg-brand-primary/15 px-3 py-1 text-xs font-light text-brand-dark"
                        >
                          {sintomo}
                        </li>
                      ))}
                    </ul>
                  )}

                  <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink">
                    Vai al servizio
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.li>
            ))}
          </ul>

          <div className="mt-14 flex flex-wrap items-center justify-center gap-4">
            <Bottone href={PRENOTAZIONE_URL}>{PRENOTAZIONE_LABEL}</Bottone>
            <Bottone to="/servizi" variante="secondaria" icona={null}>
              Vedi tutti i servizi
            </Bottone>
          </div>
        </div>
      </section>
    </>
  );
}
