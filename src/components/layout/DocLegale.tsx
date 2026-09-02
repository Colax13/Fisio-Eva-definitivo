import type { ReactNode } from 'react';
import PageHero from './PageHero';

export type SezioneLegale = {
  id: string;
  titolo: string;
  corpo: ReactNode;
};

type Props = {
  eyebrow: string;
  titolo: ReactNode;
  sottotitolo: string;
  breadcrumb: string;
  aggiornamento: string;
  sezioni: SezioneLegale[];
};

/**
 * Impaginazione condivisa dei documenti legali (informativa e cookie policy).
 *
 * Un testo legale si legge per cercare una cosa sola: da qui l'indice laterale
 * ancorato, che su desktop resta fermo mentre si scorre. Le due pagine hanno la
 * stessa struttura perché sono lo stesso tipo di documento — cambiano i
 * contenuti, non il modo di leggerli.
 */
export default function DocLegale({
  eyebrow,
  titolo,
  sottotitolo,
  breadcrumb,
  aggiornamento,
  sezioni,
}: Props) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={titolo} subtitle={sottotitolo} breadcrumb={breadcrumb} />

      <section className="relative overflow-hidden bg-brand-light px-5 py-16 sm:px-6 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-brand-primary/10 blur-[120px]"></div>
        </div>

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
          {/* Indice: da tablet in su resta agganciato allo scroll. */}
          <nav aria-label="Indice del documento" className="lg:sticky lg:top-28 lg:self-start">
            <p className="mb-4 text-[11px] uppercase tracking-wider text-gray-500">In questa pagina</p>
            <ol className="space-y-2.5 border-l border-brand-primary/20 pl-4">
              {sezioni.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="text-sm font-light text-gray-600 transition-colors hover:text-brand-primary-ink"
                  >
                    <span className="text-gray-400">{i + 1}.</span> {s.titolo}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div>
            <p className="mb-10 text-sm font-light text-gray-500">
              Ultimo aggiornamento: {aggiornamento}
            </p>

            <div className="space-y-12">
              {sezioni.map((s, i) => (
                <article key={s.id} id={s.id} className="scroll-mt-28">
                  <h2 className="mb-4 font-sans text-xl font-bold leading-snug text-brand-dark md:text-2xl">
                    <span className="text-brand-primary">{i + 1}.</span> {s.titolo}
                  </h2>
                  <div className="space-y-4 text-[15px] font-light leading-relaxed text-gray-600 [&_a]:text-brand-primary-ink [&_a]:underline [&_a]:underline-offset-2 [&_li]:pl-1 [&_strong]:font-medium [&_strong]:text-brand-dark [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
                    {s.corpo}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
