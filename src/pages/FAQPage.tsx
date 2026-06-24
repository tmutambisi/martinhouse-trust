import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import FAQSection from "@/components/FAQSection";
import OfficeFinder from "@/components/OfficeFinder";
import heroImage from "@/assets/prep-ingarden.jpg";

const FAQPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <PageHero
        title="Frequently asked questions"
        subtitle="Find answers to common questions about admissions, academics, and campus life"
        backgroundImage={heroImage}
      />

      <FAQSection />
      <OfficeFinder />

      <Footer />
    </div>
  );
};

export default FAQPage;
