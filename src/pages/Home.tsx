import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import ProjectsCarousel from '../components/sections/ProjectsCarousel';
import ServicesPreview from '../components/sections/ServicesPreview';
import EmotionalSection from '../components/sections/EmotionalSection';
import SpazioCorsi from '../components/sections/SpazioCorsi';
import DoveSiamo from '../components/sections/DoveSiamo';
import CtaBand from '../components/sections/CtaBand';
import usePageMeta from '../hooks/usePageMeta';

/**
 * Ordine delle sezioni.
 *
 * Chi siamo resta attaccato alla hero — la sovrapposizione è costruita su quel
 * punto — e porta con sé i tre ritratti del team con il link alla pagina
 * dedicata. Subito dopo arrivano i percorsi e i trattamenti: chi scorre la home
 * cerca quelli, non una seconda biografia.
 */
export default function Home() {
  usePageMeta(
    'FisioEVA — Studio di Fisioterapia e Osteopatia | Casalotti, Roma',
    'Studio di fisioterapia e osteopatia in Via della Cellulosa 1, Roma. Terapia manuale, osteopatia, riabilitazione, salute della donna e osteopatia neonatale.'
  );

  return (
    <>
      <Hero />
      <AboutSection overlap />
      <ProjectsCarousel />
      <ServicesPreview />
      <EmotionalSection />
      <SpazioCorsi />
      <DoveSiamo />
      <CtaBand />
    </>
  );
}
