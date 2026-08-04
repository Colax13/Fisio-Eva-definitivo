import Hero from '../components/sections/Hero';
import AboutSection from '../components/sections/AboutSection';
import ServicesPreview from '../components/sections/ServicesPreview';
import ProjectsCarousel from '../components/sections/ProjectsCarousel';
import EmotionalSection from '../components/sections/EmotionalSection';
import BenefitsSection from '../components/sections/BenefitsSection';
import Testimonials from '../components/sections/Testimonials';
import CtaBand from '../components/sections/CtaBand';
import usePageMeta from '../hooks/usePageMeta';

export default function Home() {
  usePageMeta(
    'FisioEVA — Studio di Fisioterapia e Osteopatia | Roma',
    'Studio di fisioterapia e osteopatia in Via di Boccea 755, Roma. Terapia manuale, osteopatia, riabilitazione e terapie strumentali con Azzurra, Elisa e Veronica.'
  );

  return (
    <>
      <Hero />
      <AboutSection overlap />
      <ServicesPreview />
      <ProjectsCarousel />
      <EmotionalSection />
      <BenefitsSection />
      <Testimonials />
      <CtaBand />
    </>
  );
}
