import type { ReactNode } from 'react';
import { motion } from 'motion/react';

type Props = {
  eyebrow: string;
  children: ReactNode;
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  className?: string;
};

/**
 * Eyebrow rule + heading pair used at the top of every section.
 * `tone` switches the palette for sections sitting on a dark background.
 */
export default function SectionHeading({
  eyebrow,
  children,
  align = 'center',
  tone = 'dark',
  className = '',
}: Props) {
  const centered = align === 'center';
  const rule = tone === 'dark' ? 'bg-brand-primary' : 'bg-white';
  const label = tone === 'dark' ? 'text-brand-primary' : 'text-white';
  const heading = tone === 'dark' ? 'text-brand-dark' : 'text-white';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${centered ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}
    >
      <div className={`flex items-center gap-4 mb-6 ${centered ? 'justify-center' : ''}`}>
        <div className={`w-12 h-[1px] ${rule}`}></div>
        <span className={`${label} text-xs tracking-widest uppercase font-medium`}>{eyebrow}</span>
        {centered && <div className={`w-12 h-[1px] ${rule}`}></div>}
      </div>
      <h2 className={`text-4xl md:text-5xl font-sans font-bold ${heading} leading-tight`}>
        {children}
      </h2>
    </motion.div>
  );
}
