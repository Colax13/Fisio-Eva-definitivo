import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import PageHero from '../components/layout/PageHero';
import CtaBand from '../components/sections/CtaBand';
import usePageMeta from '../hooks/usePageMeta';
import { gallery, galleryCategorie, immagini } from '../data/site';

const spanClass = {
  normal: '',
  wide: 'sm:col-span-2',
  tall: 'row-span-2',
};

export default function Gallery() {
  const [categoria, setCategoria] = useState('Tutte');
  usePageMeta(
    'Gallery — FisioEVA | Lo studio a Roma Casalotti',
    'Uno sguardo dentro lo studio FisioEVA: gli spazi, i trattamenti e i percorsi di riabilitazione in Via di Boccea 755, Roma.'
  );

  const visibili =
    categoria === 'Tutte' ? gallery : gallery.filter((g) => g.categoria === categoria);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Uno sguardo <span className="text-brand-primary">dentro lo studio</span>
          </>
        }
        subtitle="Gli spazi, i trattamenti e i momenti che raccontano come lavoriamo ogni giorno."
        breadcrumb="Gallery"
        image={immagini.calma}
      />

      <section className="relative bg-brand-light py-24 px-6 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-14 bg-white/70 backdrop-blur-md rounded-full p-2 w-max mx-auto border border-white shadow-sm">
            {galleryCategorie.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoria(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ${
                  categoria === cat
                    ? 'bg-brand-dark text-white'
                    : 'text-brand-dark hover:bg-brand-primary/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[240px]"
          >
            <AnimatePresence mode="popLayout">
              {visibili.map((shot) => (
                <motion.figure
                  layout
                  key={shot.src + shot.alt}
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className={`relative rounded-[2rem] overflow-hidden group shadow-lg ${
                    spanClass[shot.span]
                  }`}
                >
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/10 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300"></div>
                  <figcaption className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-brand-primary text-[10px] tracking-widest uppercase font-medium">
                      {shot.categoria}
                    </span>
                    <p className="text-white font-light text-sm mt-1 leading-snug">{shot.alt}</p>
                  </figcaption>
                </motion.figure>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <CtaBand titolo="Ti aspettiamo in Via di Boccea 755" />
    </>
  );
}
