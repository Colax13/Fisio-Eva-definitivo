import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import Eyebrow from './Eyebrow';

type Props = {
  eyebrow: string;
  children: ReactNode;
  /** Allineamento da desktop in su. Sul telefono è sempre centrato. */
  align?: 'left' | 'center';
  tone?: 'dark' | 'light';
  accent?: 'primary' | 'secondary';
  /** Riga di accompagnamento sotto al titolo. */
  lead?: string;
  className?: string;
};

/**
 * Occhiello + titolo in apertura di sezione.
 *
 * `align="left"` vale solo da desktop: sul telefono resta centrato, perché con
 * una colonna sola l'alternanza destra/sinistra faceva sembrare la pagina
 * montata a pezzi.
 */
export default function SectionHeading({
  eyebrow,
  children,
  align = 'center',
  tone = 'dark',
  accent = 'primary',
  lead,
  className = '',
}: Props) {
  const centrato = align === 'center';
  const testo = centrato ? 'text-center' : 'text-center lg:text-left';
  const larghezza = centrato ? 'max-w-3xl mx-auto' : 'max-w-2xl mx-auto lg:mx-0';
  const heading = tone === 'dark' ? 'text-brand-dark' : 'text-white';
  const corpo = tone === 'dark' ? 'text-gray-600' : 'text-gray-300';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${testo} ${larghezza} ${className}`}
    >
      <Eyebrow align={align} tone={tone} accent={accent} className="mb-5">
        {eyebrow}
      </Eyebrow>

      <h2 className={`text-h2 font-sans font-bold ${heading}`}>{children}</h2>

      {lead && (
        <p className={`text-lead font-light ${corpo} mt-5 ${centrato ? 'mx-auto max-w-xl' : ''}`}>
          {lead}
        </p>
      )}
    </motion.div>
  );
}
