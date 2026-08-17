import PageHero from '../components/layout/PageHero';
import TeamSection from '../components/sections/TeamSection';
import CtaBand from '../components/sections/CtaBand';
import usePageMeta from '../hooks/usePageMeta';
import { immagini } from '../data/site';

export default function Team() {
  usePageMeta(
    'Il Team — FisioEVA | Fisioterapiste e Osteopata a Roma',
    'Azzurra De Angelis, Elisa De Rubeis e Veronica Mirarchi: le professioniste dello studio FisioEVA in Via di Boccea 755, Roma.'
  );

  return (
    <>
      <PageHero
        eyebrow="Il nostro team"
        title={
          <>
            Le professioniste al tuo <span className="text-brand-primary">fianco</span>
          </>
        }
        subtitle="Tre percorsi diversi, un modo comune di lavorare: ascoltare prima, trattare poi, e non lasciare mai il paziente da solo nel mezzo."
        breadcrumb="Team"
        image={immagini.riabilitazione}
      />

      <TeamSection showHeading={false} />
      <CtaBand titolo="Vuoi parlare direttamente con noi?" />
    </>
  );
}
