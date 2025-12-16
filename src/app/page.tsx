import { getData } from '@/lib/data';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FloatingCTA } from '@/components/layout/FloatingCTA';
import { HeroSection } from '@/components/sections/HeroSection';
import { CredibilityBar } from '@/components/sections/CredibilityBar';
import { ServicesShowcase } from '@/components/sections/ServicesShowcase';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ProcessSection } from '@/components/sections/ProcessSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ServiceAreasMap } from '@/components/sections/ServiceAreasMap';
import { PromotionsSection } from '@/components/sections/PromotionsSection';
import { EmergencyHighlight } from '@/components/sections/EmergencyHighlight';
import { AboutSection } from '@/components/sections/AboutSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { FinalCTA } from '@/components/sections/FinalCTA';
import { ContactSection } from '@/components/sections/ContactSection';

export default async function HomePage() {
  const data = await getData();

  return (
    <>
      {/* Header */}
      <Header
        contact={data.contact}
        services={data.services}
        emergencyBanner={data.emergencyBanner}
        businessInfo={data.businessInfo}
      />

      <main>
        {/* 1. Hero Section */}
        <HeroSection hero={data.hero} contact={data.contact} />

        {/* 2. Credibility Bar */}
        <CredibilityBar businessInfo={data.businessInfo} />

        {/* 3. Services Showcase */}
        <ServicesShowcase services={data.services} />

        {/* 4. Why Choose Us */}
        <WhyChooseUs
          items={data.whyChooseUs}
          businessName={data.businessInfo.name}
          serviceAreas={data.serviceAreas}
        />

        {/* 5. Process Section */}
        <ProcessSection steps={data.process} />

        {/* 6. Testimonials */}
        <TestimonialsSection testimonials={data.testimonials} serviceAreas={data.serviceAreas} />

        {/* 7. Emergency Highlight */}
        <EmergencyHighlight contact={data.contact} />

        {/* 8. About Section */}
        <AboutSection about={data.about} businessInfo={data.businessInfo} serviceAreas={data.serviceAreas} contact={data.contact} />

        {/* 9. Service Areas Map */}
        <ServiceAreasMap
          serviceAreas={data.serviceAreas}
          contact={data.contact}
        />

        {/* 10. Promotions */}
        <PromotionsSection promotions={data.promotions} />

        {/* 11. FAQ Section */}
        <FAQSection faqs={data.faq} />

        {/* 12. Final CTA */}
        <FinalCTA callToActions={data.callToActions} contact={data.contact} serviceAreas={data.serviceAreas} />

        {/* 13. Contact Section */}
        <ContactSection contact={data.contact} services={data.services} />
      </main>

      {/* Footer */}
      <Footer
        businessInfo={data.businessInfo}
        contact={data.contact}
        services={data.services}
        serviceAreas={data.serviceAreas}
      />

      {/* Floating CTA Button */}
      <FloatingCTA contact={data.contact} />
    </>
  );
}
