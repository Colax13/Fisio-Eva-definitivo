import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Eyebrow from '../ui/Eyebrow';

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  breadcrumb: string;
  image?: string;
};

/**
 * Fascia scura che apre ogni pagina interna: titolo, briciole di navigazione e
 * una foto opzionale sotto la velatura del marchio.
 */
export default function PageHero({ eyebrow, title, subtitle, breadcrumb, image }: Props) {
  return (
    <section className="relative overflow-hidden bg-brand-dark px-5 pt-28 pb-16 sm:px-6 md:pt-44 md:pb-28">
      {image && (
        <div className="absolute inset-0 z-0">
          <motion.img
            initial={{ scale: 1.08 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            src={image}
            alt=""
            aria-hidden="true"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-brand-dark/85"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/60"></div>
        </div>
      )}

      {/* Alone del marchio */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-[40%] -right-[5%] h-[140%] w-[50%] rounded-full bg-brand-primary/20 blur-[120px]"></div>
        <div className="absolute -bottom-[60%] -left-[5%] h-[140%] w-[50%] rounded-full bg-brand-secondary/20 blur-[120px]"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        {eyebrow && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Eyebrow tone="light" className="mb-5">
              {eyebrow}
            </Eyebrow>
          </motion.div>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-h1 font-sans font-bold text-white"
        >
          {title}
        </motion.h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lead mx-auto mt-5 max-w-2xl font-light text-gray-300"
          >
            {subtitle}
          </motion.p>
        )}

        <motion.nav
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          aria-label="Percorso di navigazione"
          className="mt-7 flex items-center justify-center gap-2 text-xs tracking-wider uppercase"
        >
          <Link
            to="/"
            className="flex min-h-11 items-center px-1 text-gray-300 transition-colors hover:text-brand-secondary"
          >
            Home
          </Link>
          <span className="h-1 w-1 rounded-full bg-brand-primary" aria-hidden="true"></span>
          <span className="text-brand-primary">{breadcrumb}</span>
        </motion.nav>
      </div>
    </section>
  );
}
