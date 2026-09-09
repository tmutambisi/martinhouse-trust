import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SchoolDivisionsBar from "@/components/SchoolDivisionsBar";
import AccreditationBar from "@/components/AccreditationBar";

// Lazy load below-the-fold sections for faster initial load
const CalendarSection = lazy(() => import("@/components/CalendarSection"));
const WhyChooseUsSection = lazy(() => import("@/components/WhyChooseUsSection"));
const NewsSection = lazy(() => import("@/components/NewsSection"));
const ImageSlideshowSection = lazy(() => import("@/components/ImageSlideshowSection"));
const LifeAtMartinHouseSection = lazy(() => import("@/components/LifeAtMartinHouseSection"));
const Footer = lazy(() => import("@/components/Footer"));

// Simple loading placeholder component
const sectionLoader = () => (
  <div className="min-h-[200px] flex justify-center items-center">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin duration-700"></div>
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        {/* Hero Slider */}
        <HeroSection />

        {/* School Divisions Bar (immediately below hero) */}
        <SchoolDivisionsBar />

        {/* Cambridge & Accreditation Bar */}
        <AccreditationBar />

        {/* Single Suspense wrapping all lazy sections */}
        <Suspense fallback={sectionLoader()}>
          {/* Calendars & Term Dates Section */}
          <CalendarSection />
          <WhyChooseUsSection />
          <NewsSection />
          {/* Action Image Slideshow */}
          <ImageSlideshowSection />
          {/* Social Media / Life at Martin House */}
          <LifeAtMartinHouseSection />
        </Suspense>
      </main>

      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
