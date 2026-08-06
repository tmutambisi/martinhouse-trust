import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import AboutSection from "@/components/AboutSection";
import CoreValuesSection from "@/components/CoreValuesSection";
import BusinessExcellenceSection from "@/components/BusinessExcellenceSection";
import SocialResponsibilitySection from "@/components/SocialResponsibilitySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AchievementsSection from "@/components/AchievementsSection";
import OfficeFinder from "@/components/OfficeFinder";
import heroImage from "@/assets/primary-school/random/random1.jpg";
import heroImage2 from "@/assets/primary-school/random/random2.jpg";
import heroImage3 from "@/assets/primary-school/random/random3.jpg";
import heroImage4 from "@/assets/secondary-school/school/random1.jpg";
import heroAbout from "@/assets/primary-school/navbar/nav5.jpg"; // Default hero for generic about

const aboutPagesData: Record<string, {
  title: string;
  subtitle: string;
  content: string;
  image: string;
}> = {
  "awards": {
    title: "Awards and Achievements",
    subtitle: "Recognised excellence in education and development",
    content: "Martin House has been honored with numerous awards and certifications that recognize our commitment to excellence in education. Our academic accolades, sporting achievements, and community recognitions reflect our dedication to maintaining the highest standards of student development.",
    image: heroImage,
  },
  "testimonials": {
    title: "Testimonials",
    subtitle: "What our parents and students say",
    content: "Our parents' and students' success and satisfaction is our greatest achievement. Read what members of the community across Zambia have to say about their experience with Martin House.",
    image: heroImage2,
  },
  "social-responsibility": {
    title: "Community Service & Outreach",
    subtitle: "Giving back to our community",
    content: "At Martin House, we believe in making a positive impact beyond the classroom. Our social responsibility initiatives focus on community development, environmental awareness, and support for local primary schools.",
    image: heroImage3,
  },
  "core-values": {
    title: "Core Values",
    subtitle: "The principles that guide us",
    content: "Our core values define who we are and how we operate as an academic community. These principles are the foundation of our school culture and guide every interaction between students, faculty, and parents.",
    image: heroImage4,
  },
};

const AboutPage = () => {
  const { section } = useParams();
  const pageData = aboutPagesData[section || ""] || aboutPagesData["awards"];
  const isCorePage = section === "core-values";
  const isAwardsPage = section === "awards";
  const isSocialPage = section === "social-responsibility";
  const isTestimonialsPage = section === "testimonials";
  const isMainAbout = !section || (!isCorePage && !isAwardsPage && !isSocialPage && !isTestimonialsPage);

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      <Navbar />

      <PageHero
        title={isMainAbout ? "About" : pageData.title}
        subtitle=""
        backgroundImage={isMainAbout ? heroAbout : pageData.image}
      />

      {!isMainAbout && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <p className="text-xl text-muted-foreground leading-relaxed text-center">
                {pageData.content}
              </p>
            </div>
          </div>
        </section>
      )}

      {isMainAbout && <div className="mt-8"><AboutSection /></div>}
      
      {isCorePage && <CoreValuesSection />}
      {isAwardsPage && (
        <>
          <BusinessExcellenceSection />
          <AchievementsSection />
        </>
      )}
      {isSocialPage && <SocialResponsibilitySection />}
      {isTestimonialsPage && <TestimonialsSection />}

      <OfficeFinder />
      <Footer />
    </div>
  );
};

export default AboutPage;
