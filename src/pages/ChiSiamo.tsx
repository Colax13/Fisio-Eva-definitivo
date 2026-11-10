import { motion } from 'motion/react';
import { Sparkles, HeartHandshake } from 'lucide-react';
import EvaHero from '../components/sections/EvaHero';
import AboutSection from '../components/sections/AboutSection';
import PercorsoCura from '../components/sections/PercorsoCura';
import CtaBand from '../components/sections/CtaBand';
import SectionHeading from '../components/ui/SectionHeading';
import usePageMeta from '../hooks/usePageMeta';
import { metaPagine } from '../data/seo';
import { valori as testiValori } from '../data/site';

// I testi stanno in site.ts, dove li legge anche il riepilogo statico.
const stili = [
  { icona: HeartHandshake, bg: 'bg-brand-primary/10', text: 'text-brand-primary-ink' },
  { icona: Sparkles, bg: 'bg-brand-secondary/10', text: 'text-brand-secondary-ink' },
];
const valori = testiValori.map((v, i) => ({ ...v, ...stili[i % stili.length] }));

export default function ChiSiamo() {
  usePageMeta(metaPagine['/chi-siamo'].titolo, metaPagine['/chi-siamo'].descrizione);

  return (
    <>
      {/* L'apertura è una scritta animata, non un titolo: senza questa riga la
          pagina non aveva un h1, né per i motori né per i lettori di schermo. */}
      <h1 className="sr-only">Chi siamo: FisioEVA è Elisa, Veronica e Azzurra</h1>
      <EvaHero />

      <AboutSection cta={null} />

      {/* Valori */}
      <section className="relative overflow-hidden bg-brand-light px-5 py-16 sm:px-6 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading eyebrow="Il nostro approccio" className="mb-10 md:mb-16">
            I principi che guidano <span className="text-brand-primary-ink">ogni percorso</span>
          </SectionHeading>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {valori.map((valore, idx) => (
              <motion.div
                key={valore.titolo}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="flex flex-col items-center rounded-[2rem] border border-white bg-white/80 p-6 text-center shadow-xl backdrop-blur-md sm:p-8 md:items-start md:text-left"
              >
                <div
                  className={`h-12 w-12 rounded-2xl ${valore.bg} ${valore.text} mb-5 flex items-center justify-center`}
                >
                  <valore.icona className="h-6 w-6" />
                </div>
                <h3 className="text-h3 mb-3 font-sans font-bold text-brand-dark">{valore.titolo}</h3>
                <p className="text-body leading-relaxed font-light text-gray-600">{valore.testo}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PercorsoCura />
      <CtaBand />
    </>
  );
}
