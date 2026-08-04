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
    <section className="bg-brand-dark pt-16 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-[60%] left-1/4 w-[50%] h-[160%] rounded-full bg-brand-secondary/10 blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-4">
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
