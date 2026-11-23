import HeroSection from '@/components/home/premium/HeroSection';
import ClassesSection from '@/components/home/premium/ClassesSection';
import AboutSection from '@/components/home/premium/AboutSection';
import SubjectsSection from '@/components/home/premium/SubjectsSection';
import MethodSection from '@/components/home/premium/MethodSection';
import ResourcesSection from '@/components/home/premium/ResourcesSection';
import NoticesSection from '@/components/home/premium/NoticesSection';
import VisitSection from '@/components/home/premium/VisitSection';
import TestimonialsSection from '@/components/home/premium/TestimonialsSection';
import LearnSection from '@/components/home/premium/LearnSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ClassesSection />
      <AboutSection />
      <SubjectsSection />
      <MethodSection />
      <TestimonialsSection />
      <ResourcesSection />
      <LearnSection />
      <NoticesSection />
      <VisitSection />
    </>
  );
}
