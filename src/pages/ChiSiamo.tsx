import Intestazione from '../components/layout/Intestazione';
import Bottone from '../components/ui/Bottone';
import Occhiello from '../components/ui/Occhiello';
import Figura from '../components/ui/Figura';
import { PRENOTAZIONE_LABEL, PRENOTAZIONE_URL } from '../config/site';
import { credibilita, ribaltamenti } from '../content/testi';
import { schemaBreadcrumb, schemaStudio, usePageSeo } from '../lib/seo';

export default function ChiSiamo() {
  const briciole = [
    { nome: 'Home', path: '/' },
    { nome: 'Chi siamo', path: '/chi-siamo' },
  ];

  usePageSeo({
    title: 'Chi siamo | FisioEva, fisioterapia e osteopatia a Casalotti Roma',
    description:
      'La storia di FisioEva: tre professioniste che aprono il loro studio a Casalotti, Roma. Come lavoriamo e perché la salute della donna.',
    path: '/chi-siamo',
    schema: [schemaStudio(), schemaBreadcrumb(briciole)],
  });

  // La frase di apertura di Chi siamo è già usata in home: qui si usa il
  // ribaltamento previsto in alternativa.
  const apertura = ribaltamenti[2];

  return (
    <>
      <Intestazione occhiello="Chi siamo" titolo="La nostra storia" briciole={briciole} />

      {/* Apertura */}
      <section className="bg-white px-6 pb-20">
        <div className="mx-auto max-w-4xl text-center">
          <p className="text-3xl font-light leading-[1.25] text-brand-dark md:text-5xl">
            {apertura.prima}
            <br />
            <span className="font-semibold">{apertura.seconda}</span>
          </p>
        </div>
      </section>

      {/* Da FisioLab a FisioEva */}
      <section className="bg-brand-light px-6 py-20 md:py-24">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
          <Figura alt="" ratio="orizzontale" tono="acqua" rounded="rounded-[3rem]" />

          <div>
            <Occhiello className="mb-7">Da FisioLab a FisioEva</Occhiello>
            <h2 className="text-3xl font-semibold leading-tight text-brand-dark md:text-4xl">
              Uno studio nostro, nello stesso quartiere.
            </h2>

            <div className="mt-7 space-y-5 text-lg font-light leading-relaxed text-brand-dark/80">
              <p>
                Per anni abbiamo lavorato insieme all'interno di FisioLab Casalotti. Da lì è nata
                l'idea di aprire uno studio nostro, a pochi passi: stesse mani, stesso quartiere,
                stesse persone che ci hanno seguite.
              </p>
              <p>
                Quello che cambia è come si lavora. Lo studio è nostro, quindi il metodo lo
                decidiamo noi, e i tempi delle sedute anche: quanto serve a una persona, non quanto
                sta in un'agenda.
              </p>
              <p>Apriamo il 26 settembre 2026, in Via di Boccea 755.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Come lavoriamo */}
      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <Occhiello className="mb-7">Come lavoriamo</Occhiello>
          <h2 className="text-3xl font-semibold leading-tight text-brand-dark md:text-4xl">
            Prima la valutazione. Poi il percorso.
          </h2>

          <div className="mt-8 space-y-5 text-lg font-light leading-relaxed text-brand-dark/80">
            <p>
              A FisioEva la fisioterapia lavora insieme all'osteopatia. Vuol dire che la valutazione
              non si ferma al punto in cui senti male: si guarda come si muove tutto il resto, e il
              trattamento si costruisce da lì.
            </p>
            <p>
              È il motivo per cui alla prima seduta parliamo molto e trattiamo poco. Serve capire da
              dove arriva il problema, altrimenti si lavora sul sintomo e si torna al punto di
              partenza dopo qualche settimana.
            </p>
            <p>
              Quando servono, le terapie strumentali entrano nel percorso: accelerano il recupero,
              ma non sostituiscono né la valutazione né il lavoro manuale.
            </p>
          </div>

          <dl className="mt-12 grid gap-6 sm:grid-cols-2">
            {credibilita.map((dato) => (
              <div key={dato.titolo} className="border-t border-brand-primary/40 pt-5">
                <dt className="font-semibold text-brand-dark">{dato.titolo}</dt>
                <dd className="mt-2 text-sm font-light leading-relaxed text-brand-dark/70">
                  {dato.dettaglio}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Perché la salute della donna — qui si può dichiarare apertamente */}
      <section className="bg-brand-accent/15 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl">
          <Occhiello className="mb-7">Perché la salute della donna</Occhiello>
          <h2 className="text-3xl font-semibold leading-tight text-brand-dark md:text-4xl">
            Perché è la parte di cui si parla ancora troppo poco.
          </h2>

          <div className="mt-8 space-y-5 text-lg font-light leading-relaxed text-brand-dark/80">
            <p>
              Perdite dopo il parto, un addome che non si richiude, una cicatrice che tira, dolore
              durante i rapporti: sono situazioni comuni, e proprio per questo vengono spesso
              considerate normali. Non lo sono, e quasi sempre c'è un percorso.
            </p>
            <p>
              Il pavimento pelvico è un gruppo muscolare come gli altri: si valuta e si allena. Lo
              trattiamo con la stessa serietà con cui trattiamo una spalla o un ginocchio, in uno
              spazio riservato e con i tempi di chi ci sta davanti.
            </p>
          </div>

          <Bottone to="/servizi/salute-della-donna" variante="accento" className="mt-9">
            Vedi il percorso donna
          </Bottone>
        </div>
      </section>

      {/* Lo studio */}
      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-7xl">
          <Occhiello className="mb-7">Lo studio</Occhiello>
          <h2 className="max-w-2xl text-3xl font-semibold leading-tight text-brand-dark md:text-4xl">
            Uno spazio pensato per stare, non solo per passare.
          </h2>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Figura alt="" ratio="orizzontale" tono="acqua" />
            <Figura alt="" ratio="orizzontale" tono="lilla" motivo={false} />
            <Figura alt="" ratio="orizzontale" tono="neutro" />
          </div>
        </div>
      </section>

      <section className="bg-brand-light px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-[2.5rem] bg-brand-dark px-8 py-14 text-center text-white md:px-14">
          <h2 className="text-2xl font-semibold leading-tight md:text-3xl">
            Vieni a conoscerci.
          </h2>
          <p className="mx-auto mt-4 max-w-lg font-light leading-relaxed text-white/70">
            Siamo in Via di Boccea 755, a Casalotti. Scrivici e fissiamo insieme la prima
            valutazione.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Bottone href={PRENOTAZIONE_URL} variante="chiara">
              {PRENOTAZIONE_LABEL}
            </Bottone>
          </div>
        </div>
      </section>
    </>
  );
}
