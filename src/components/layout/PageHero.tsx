import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  breadcrumb: string;
  image?: string;
};

/**
 * Dark banner that opens every inner page: title, breadcrumb and an optional
 * background photo dimmed behind the brand gradient.
 */
export default function PageHero({ eyebrow, title, subtitle, breadcrumb, image }: Props) {
  return (
    <section className="relative pt-40 pb-24 md:pt-48 md:pb-32 px-6 overflow-hidden bg-brand-dark">
      {image && (
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            src={image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/85"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/60"></div>
        </div>
      )}

      {/* Brand glow */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-[40%] -right-[5%] w-[50%] h-[140%] rounded-full bg-brand-primary/20 blur-[120px]"></div>
        <div className="absolute -bottom-[60%] -left-[5%] w-[50%] h-[140%] rounded-full bg-brand-secondary/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-brand-primary"></div>
            <span className="text-brand-primary text-xs tracking-widest uppercase font-medium">
              {eyebrow}
            </span>
            <div className="w-12 h-[1px] bg-brand-primary"></div>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-sans font-bold text-white leading-[1.1]"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-300 font-light text-base md:text-lg leading-relaxed mt-6 max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          aria-label="Percorso di navigazione"
          className="flex items-center justify-center gap-2 text-xs tracking-wider uppercase mt-8"
        >
          <Link to="/" className="text-gray-400 hover:text-brand-secondary transition-colors">
            Home
          </Link>
          <span className="w-1 h-1 rounded-full bg-brand-primary"></span>
          <span className="text-brand-primary">{breadcrumb}</span>
        </motion.nav>
      </div>
    </section>
  );
}
