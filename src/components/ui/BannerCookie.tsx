import { Link } from 'react-router-dom';
import { useConsenso } from '../../lib/consenso';

/**
 * Banner di consenso (L6).
 *
 * Il sito non profila e non misura: l'unica cosa da chiedere è il permesso di
 * caricare la mappa di Google. Il testo lo dice in chiaro, senza il gergo dei
 * banner generici, e le due scelte hanno lo stesso peso visivo — rifiutare non
 * deve costare più fatica che accettare.
 */
export default function BannerCookie() {
  const { deciso, accetta, rifiuta } = useConsenso();

  if (deciso) return null;

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="titolo-consenso"
      className="fixed inset-x-0 bottom-0 z-50 px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-brand-primary/30 bg-white p-6 shadow-xl sm:p-8">
        <h2 id="titolo-consenso" className="text-base font-semibold text-brand-dark">
          Un permesso soltanto
        </h2>
        <p className="mt-2.5 text-sm font-light leading-relaxed text-brand-dark/75">
          Questo sito non usa cookie di profilazione e non raccoglie statistiche di navigazione.
          Per mostrarti dove siamo carichiamo una mappa di Google, che può impostare cookie propri:
          la carichiamo solo se ce lo permetti. Se preferisci di no, al posto della mappa trovi
          l'indirizzo e un link per aprirla altrove.{' '}
          <Link to="/cookie-policy" className="font-semibold text-brand-ink underline underline-offset-2">
            Cookie policy
          </Link>
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={accetta}
            className="inline-flex w-full items-center justify-center rounded-full bg-brand-dark px-7 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-brand-ink sm:w-auto"
          >
            Accetto la mappa
          </button>
          <button
            type="button"
            onClick={rifiuta}
            className="inline-flex w-full items-center justify-center rounded-full border-2 border-brand-dark/25 px-7 py-3 text-sm font-semibold text-brand-dark transition-colors duration-300 hover:border-brand-dark sm:w-auto"
          >
            Continua senza
          </button>
        </div>
      </div>
    </div>
  );
}
