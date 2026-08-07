import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { gallery } from '../../data/site';

/**
 * Six-image strip that sits between the page content and the footer,
 * echoing the studio's day-to-day.
 */
export default function GalleryStrip() {
  const shots = gallery.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-brand-dark px-5 pt-12 sm:px-6 md:pt-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-[60%] left-1/4 h-[160%] w-[50%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Su 390px sei miniature in fila diventavano francobolli da 55px:
            due file da tre si guardano ancora. */}
        <div className="grid grid-cols-3 gap-2.5 sm:gap-3 md:grid-cols-6 md:gap-4">
          {shots.map((shot, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
            >
              <Link
                to="/gallery"
                className="block relative aspect-square rounded-2xl overflow-hidden group"
              >
                <img
                  src={shot.src}
                  alt={shot.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-brand-dark/30 group-hover:bg-brand-primary/30 transition-colors duration-300"></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
