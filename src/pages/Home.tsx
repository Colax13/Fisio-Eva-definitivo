import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import TeamSection from '../components/sections/TeamSection';
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
 * Chi siamo resta attaccato alla hero perché la sovrapposizione è costruita su
 * quel punto. Il team viene subito dopo, una volta sola: ripeterlo più in basso
 * non aggiungeva niente.
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
      <TeamSection />
      <ProjectsCarousel />
      <ServicesPreview />
      <EmotionalSection />
      <SpazioCorsi />
      <DoveSiamo />
      <CtaBand />
    </>
  );
}
