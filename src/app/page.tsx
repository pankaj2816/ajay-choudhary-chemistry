import Hero from '@/components/home/Hero';
import QuickIntro from '@/components/home/QuickIntro';
import StatsSection from '@/components/home/StatsSection';
import SubjectsHighlight from '@/components/home/SubjectsHighlight';
import NoticeBoardWidget from '@/components/home/NoticeBoardWidget';
import FeaturedResources from '@/components/home/FeaturedResources';
import LatestPapersSolutions from '@/components/home/LatestPapersSolutions';
import WhyLearnSection from '@/components/home/WhyLearnSection';
import TeamPortfolioSection from '@/components/home/TeamPortfolioSection';
import InteractiveChemistryTool from '@/components/home/InteractiveChemistryTool';
import CTASection from '@/components/home/CTASection';
import ContactPreview from '@/components/home/ContactPreview';

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Quick Introduction */}
      <QuickIntro />

      {/* 3. Experience Statistics */}
      <StatsSection />

      {/* 4. Subjects / Expertise */}
      <SubjectsHighlight />

      {/* 5. Latest Updates / Notice Board */}
      <NoticeBoardWidget />

      {/* 6. Featured Study Materials */}
      <FeaturedResources />

      {/* 7. Latest Question Papers & Solutions */}
      <LatestPapersSolutions />

      {/* 8. Why Learn with Ajay Sir */}
      <WhyLearnSection />

      {/* 9. Teaching Team & Academic Mentors Portfolio */}
      <TeamPortfolioSection />

      {/* 10. Interactive Concept Explorer */}
      <InteractiveChemistryTool />

      {/* 11. Call to Action */}
      <CTASection />

      {/* 12. Contact Preview */}
      <ContactPreview />
    </div>
  );
}
