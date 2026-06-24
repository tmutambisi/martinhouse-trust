import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";

//Lazy load below-the-fold sections for faster initial load
const AboutSection = lazy(() => import("@/components/AboutSection"));
const CompanyOverview = lazy(() => import("@/components/CompanyOverview"));
const OurClientsSection = lazy(() => import("@/components/OurClientsSection"));
const WhyChooseUsSection = lazy(() => import("@/components/WhyChooseUsSection"));
const VisionMissionSection = lazy(() => import("@/components/VisionMissionSection"));
const MDMessageSection = lazy(() => import("@/components/MDMessageSection"));
const WomenEmpowermentSection = lazy(() => import("@/components/WomenEmpowermentSection"));
const BusinessExcellenceSection = lazy(() => import("@/components/BusinessExcellenceSection"));
const Footer = lazy(() => import("@/components/Footer"));

//Simple loading placeholder component
const sectionLoader = () => (
  <div className="min-h-[200px] flex justify-center items-center">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin duration-700"></div>
  </div>
)

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        {/* Single Suspense wrapping all lazy sections to prevent multiple flash spinners */}
        <Suspense fallback={sectionLoader()}>
          <CompanyOverview />
          <OurClientsSection />
          <WhyChooseUsSection />
          <VisionMissionSection />
          <MDMessageSection />
          <WomenEmpowermentSection />
          <BusinessExcellenceSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
