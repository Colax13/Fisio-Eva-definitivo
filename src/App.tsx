import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutSection from './components/AboutSection';
import ServicesSlider from './components/ServicesSlider';
import TeamSection from './components/TeamSection';
import ProjectSection from './components/ProjectSection';
import HowItWorks from './components/HowItWorks';
import BenefitsSection from './components/BenefitsSection';
import EmotionalSection from './components/EmotionalSection';
import Testimonials from './components/Testimonials';

function App() {
  return (
    <div className="font-sans bg-brand-light min-h-screen">
      <Navbar />
      <Hero />
      <AboutSection />
      <ServicesSlider />
      <TeamSection />
      <ProjectSection />
      <HowItWorks />
      <EmotionalSection />
      <BenefitsSection />
      <Testimonials />
    </div>
  );
}

export default App;
