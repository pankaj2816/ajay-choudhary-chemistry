import HeroSection from '@/components/home/premium/HeroSection';
import AboutSection from '@/components/home/premium/AboutSection';
import SubjectsSection from '@/components/home/premium/SubjectsSection';
import MethodSection from '@/components/home/premium/MethodSection';
import ResourcesSection from '@/components/home/premium/ResourcesSection';
import NoticesSection from '@/components/home/premium/NoticesSection';
import VisitSection from '@/components/home/premium/VisitSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <SubjectsSection />
      <MethodSection />
      <ResourcesSection />
      <NoticesSection />
      <VisitSection />
    </>
  );
}
