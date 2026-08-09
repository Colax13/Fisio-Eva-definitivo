import { motion } from 'motion/react';
import { MapPin, Sparkles, HeartHandshake } from 'lucide-react';
import PageHero from '../components/layout/PageHero';
import AboutSection from '../components/sections/AboutSection';
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
    text: 'text-brand-primary-ink',
  },
  {
    icona: Sparkles,
    titolo: 'Un piano su misura',
    testo:
      'Niente protocolli fotocopia. Il programma nasce dai tuoi obiettivi e si aggiorna insieme a te, seduta dopo seduta.',
    bg: 'bg-brand-secondary/10',
    text: 'text-brand-secondary-ink',
  },
  {
    // "Vicine, davvero" parlava della sede e guardava indietro al vecchio
    // studio. Le altre due card raccontano come si lavora: questa ora fa lo
    // stesso, e dice la cosa su cui lo studio si è specializzato.
    icona: Sparkles,
    titolo: 'Anche di quello di cui non si parla',
    testo:
      'Pavimento pelvico, post-parto, cicatrice da cesareo. Sono cose comuni, non normali, e meritano lo stesso spazio di un mal di schiena.',
    bg: 'bg-brand-primary/10',
    text: 'text-brand-primary-ink',
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
        /*
         * "Le stesse mani, una nuova casa" guardava indietro, al vecchio
         * studio, e chiedeva al paziente di sapere cosa c'era prima. Questo
         * guarda avanti e dice la cosa che distingue davvero: uno studio di
         * donne, con una specializzazione precisa.
         */
        title={
          <>
            Uno studio di donne, <span className="text-brand-primary">per ogni donna</span>
          </>
        }
        subtitle="Tre professioniste che hanno aperto il loro studio nel quartiere in cui lavorano da sempre. Ci occupiamo di tutto quello che riguarda il movimento, con una cura particolare per ciò di cui si parla ancora troppo poco."
        breadcrumb="Chi Siamo"
        image={immagini.trattamento}
      />

      <AboutSection cta={null} />

      {/* Valori */}
      <section className="relative overflow-hidden bg-brand-light px-5 py-16 sm:px-6 md:py-24">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <SectionHeading eyebrow="Il nostro approccio" className="mb-10 md:mb-16">
            Tre cose su cui <span className="text-brand-primary-ink">non transigiamo</span>
          </SectionHeading>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
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
