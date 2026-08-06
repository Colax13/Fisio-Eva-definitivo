import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import ServicesPreview from '../components/sections/ServicesPreview';
import ProjectsCarousel from '../components/sections/ProjectsCarousel';
import EmotionalSection from '../components/sections/EmotionalSection';
import TeamSection from '../components/sections/TeamSection';
import PercorsoDonna from '../components/sections/PercorsoDonna';
import SpazioCorsi from '../components/sections/SpazioCorsi';
import BenefitsSection from '../components/sections/BenefitsSection';
import DoveSiamo from '../components/sections/DoveSiamo';
import CtaBand from '../components/sections/CtaBand';
import usePageMeta from '../hooks/usePageMeta';

/**
 * Ordine delle sezioni.
 *
 * Segue quello delle istruzioni con una sola deroga: Chi siamo resta attaccato
 * alla hero perché la sovrapposizione è costruita su quel punto e spostarla la
 * romperebbe. Le tre porte arrivano subito dopo.
 *
 * La specializzazione femminile sta a metà pagina: sopra la piega il messaggio
 * resta neutro, altrimenti si perde il pubblico che porta il volume.
 */
export default function Home() {
  usePageMeta(
    'FisioEVA — Studio di Fisioterapia e Osteopatia | Casalotti, Roma',
    'Studio di fisioterapia e osteopatia in Via di Boccea 755, Roma. Terapia manuale, osteopatia, riabilitazione, salute della donna e osteopatia neonatale.'
  );

  return (
    <>
      <Hero />
      <AboutSection overlap />
      <ProjectsCarousel />
      <ServicesPreview />
      <EmotionalSection />
      <TeamSection />
      <PercorsoDonna />
      <SpazioCorsi />
      <BenefitsSection />
      <DoveSiamo />
      <CtaBand />
    </>
  );
}
