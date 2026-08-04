import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Bottone from '../components/ui/Bottone';
import { OndeLeggere } from '../components/ui/Motivi';
import { categorie, percorsoCategoria } from '../content/servizi';
import { usePageSeo } from '../lib/seo';

export default function NonTrovata() {
  usePageSeo({
    title: 'Pagina non trovata | FisioEva',
    description: 'La pagina che cercavi non esiste o è stata spostata.',
    path: '/404',
  });

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden bg-white px-6 py-32">
      <OndeLeggere className="pointer-events-none absolute -right-32 top-1/4 h-96 w-[60rem] text-brand-primary/35" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-2xl text-center"
      >
        <p className="text-[6rem] font-semibold leading-none text-brand-primary md:text-[9rem]">
          404
        </p>

        <h1 className="mt-4 text-3xl font-semibold leading-tight text-brand-dark md:text-4xl">
          Questa pagina non c'è.
        </h1>

        <p className="mx-auto mt-5 max-w-md font-light leading-relaxed text-brand-dark/75">
          L'indirizzo che cercavi non esiste o è stato spostato. Da qui puoi tornare alla home,
          oppure andare direttamente a quello che ti serve.
        </p>

        <ul className="mt-10 flex flex-wrap justify-center gap-2">
          {categorie
            .filter((c) => c.inMenu)
            .map((cat) => (
              <li key={cat.slug}>
                <Link
                  to={percorsoCategoria(cat.slug)}
                  className="inline-block rounded-full border border-brand-primary/40 px-4 py-1.5 text-sm font-light text-brand-dark transition-colors hover:bg-brand-primary/15"
                >
                  {cat.nome}
                </Link>
              </li>
            ))}
        </ul>

        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Bottone to="/" icona={null}>
            Torna alla home
          </Bottone>
          <Bottone to="/contatti" variante="secondaria" icona={null}>
            Contatti
          </Bottone>
        </div>
      </motion.div>
    </section>
  );
}
