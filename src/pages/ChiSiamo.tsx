import { motion } from 'motion/react';
import { MapPin, Sparkles, HeartHandshake } from 'lucide-react';
import PageHero from '../components/layout/PageHero';
import AboutSection from '../components/sections/AboutSection';
import BenefitsSection from '../components/sections/BenefitsSection';
import PercorsoCura from '../components/sections/PercorsoCura';
import CtaBand from '../components/sections/CtaBand';
import SectionHeading from '../components/ui/SectionHeading';
import usePageMeta from '../hooks/usePageMeta';
import { immagini } from '../data/site';

const valori = [
  {
    icona: HeartHandshake,
    titolo: 'Prima ascoltiamo',
    testo:
      'Ogni percorso comincia da una conversazione. Capire come vivi, come ti muovi e cosa ti preoccupa vale quanto la valutazione clinica.',
    bg: 'bg-brand-primary/10',
    text: 'text-brand-primary',
  },
  {
    icona: Sparkles,
    titolo: 'Un piano su misura',
    testo:
      'Niente protocolli fotocopia. Il programma nasce dai tuoi obiettivi e si aggiorna insieme a te, seduta dopo seduta.',
    bg: 'bg-brand-secondary/10',
    text: 'text-brand-secondary',
  },
  {
    icona: MapPin,
    titolo: 'Vicine, davvero',
    testo:
      'Una nuova sede in Via di Boccea 755, a pochi passi da dove ci avete sempre trovate. Le stesse mani, uno spazio pensato per voi.',
    bg: 'bg-brand-primary/10',
    text: 'text-brand-primary',
  },
];

export default function ChiSiamo() {
  usePageMeta(
    'Chi Siamo — FisioEVA | Studio di Fisioterapia e Osteopatia a Roma',
    'Azzurra, Elisa e Veronica: fisioterapiste e osteopata a Roma Casalotti. Il nostro approccio, i nostri valori e il percorso di cura passo dopo passo.'
  );

  return (
    <>
      <PageHero
        eyebrow="La nostra storia"
        title={
          <>
            Le stesse mani, <span className="text-brand-primary">una nuova casa</span>
          </>
        }
        subtitle="Dopo tanti anni all'interno di FisioLab Casalotti abbiamo aperto FisioEVA: uno studio nostro, costruito attorno al modo in cui abbiamo sempre voluto lavorare."
        breadcrumb="Chi Siamo"
        image={immagini.trattamento}
      />

      <AboutSection cta={null} />

      {/* Valori */}
      <section className="relative bg-brand-light py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading eyebrow="Il nostro approccio" className="mb-16">
            Tre cose su cui <span className="text-brand-primary">non transigiamo</span>
          </SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valori.map((valore, idx) => (
              <motion.div
                key={valore.titolo}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="bg-white/80 backdrop-blur-md rounded-[2rem] p-8 shadow-xl border border-white"
              >
                <div
                  className={`w-12 h-12 rounded-2xl ${valore.bg} ${valore.text} flex items-center justify-center mb-6`}
                >
                  <valore.icona className="w-6 h-6" />
                </div>
                <h3 className="font-sans font-bold text-brand-dark text-xl mb-3">{valore.titolo}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{valore.testo}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <BenefitsSection />
      <PercorsoCura />
      <CtaBand />
    </>
  );
}
