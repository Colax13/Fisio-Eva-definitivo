import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import Briciole, { type Voce } from '../ui/Briciole';
import Occhiello from '../ui/Occhiello';
import { OndeLeggere } from '../ui/Motivi';

type Props = {
  occhiello?: string;
  titolo: ReactNode;
  sottotitolo?: string;
  briciole: Voce[];
  /** Le pagine servizio allineano a sinistra, le altre al centro. */
  allineamento?: 'centro' | 'sinistra';
  children?: ReactNode;
};

/**
 * Testata delle pagine interne. Fondo chiaro e testo carbone: nessuna foto,
 * finché non ci sarà lo shooting, e nessun contrasto da forzare.
 */
export default function Intestazione({
  occhiello,
  titolo,
  sottotitolo,
  briciole,
  allineamento = 'centro',
  children,
}: Props) {
  const centrato = allineamento === 'centro';

  return (
    <section className="relative overflow-hidden bg-white px-6 pb-16 pt-32 md:pb-20 md:pt-40">
      <OndeLeggere className="pointer-events-none absolute -right-20 top-10 h-72 w-[46rem] text-brand-primary/40" />

      <div className={`relative mx-auto max-w-7xl ${centrato ? 'text-center' : ''}`}>
        <Briciole
          voci={briciole}
          className={`mb-8 ${centrato ? 'flex justify-center' : ''}`}
        />

        {occhiello && (
          <Occhiello allineamento={centrato ? 'centro' : 'sinistra'} className="mb-6">
            {occhiello}
          </Occhiello>
        )}

        <motion.h1
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`text-4xl font-semibold leading-[1.15] text-brand-dark md:text-5xl ${
            centrato ? 'mx-auto max-w-3xl' : 'max-w-3xl'
          }`}
        >
          {titolo}
        </motion.h1>

        {sottotitolo && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`mt-6 text-lg font-light leading-relaxed text-brand-dark/70 ${
              centrato ? 'mx-auto max-w-2xl' : 'max-w-2xl'
            }`}
          >
            {sottotitolo}
          </motion.p>
        )}

        {children}
      </div>
    </section>
  );
}
