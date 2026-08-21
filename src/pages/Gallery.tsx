import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import PageHero from '../components/layout/PageHero';
import CtaBand from '../components/sections/CtaBand';
import usePageMeta from '../hooks/usePageMeta';
import FilterPills from '../components/ui/FilterPills';
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

      <section className="relative overflow-hidden bg-brand-light px-5 py-16 sm:px-6 md:py-24">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl">
          <FilterPills
            voci={galleryCategorie}
            attiva={categoria}
            onSelect={setCategoria}
            etichetta="Filtra le foto per argomento"
            className="mb-10 md:mb-14"
          />

          <motion.div
            layout
            className="grid auto-rows-[200px] grid-cols-1 gap-4 sm:auto-rows-[240px] sm:grid-cols-2 md:gap-6 lg:grid-cols-3"
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
                    <span className="text-eyebrow font-semibold text-brand-primary-chiaro uppercase">
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
