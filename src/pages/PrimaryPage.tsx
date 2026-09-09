import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Dumbbell, Palette, ArrowRight, ChevronRight, Users, Star, Heart, Home } from "lucide-react";

import navImg2 from "@/assets/primary-school/navbar/nav2.jpg";
import navImg3 from "@/assets/primary-school/navbar/nav3.jpg";
import navImg4 from "@/assets/primary-school/navbar/nav4.jpg";
import navImg5 from "@/assets/primary-school/navbar/nav5.jpg";
import random1 from "@/assets/primary-school/random/random1.jpg";
import random2 from "@/assets/primary-school/random/random2.jpg";
import random3 from "@/assets/primary-school/random/random3.jpg";
import sport1 from "@/assets/primary-school/sports/sport1.jpg";
import sport2 from "@/assets/primary-school/sports/sport2.jpg";
import sport3 from "@/assets/primary-school/sports/sport3.jpg";
import sports4 from "@/assets/primary-school/sports/sports4.jpg";
import sports5 from "@/assets/primary-school/sports/sports5.jpg";
import labImg from "@/assets/primary-school/sports/lab.jpg";

const primaryLabSlides = [
  {
    src: labImg,
    alt: "Primary school students",
  },
  {
    src: random1,
    alt: "Primary school classroom activity",
  },
  {
    src: random2,
    alt: "Primary pupils working together",
  },
];

const PrimaryLabSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrev = () => setCurrentSlide((prev) => (prev - 1 + primaryLabSlides.length) % primaryLabSlides.length);
  const handleNext = () => setCurrentSlide((prev) => (prev + 1) % primaryLabSlides.length);

  return (
    <div className="not-prose my-8">
      <div className="relative overflow-hidden rounded-2xl shadow-md bg-slate-50">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={primaryLabSlides[currentSlide].src}
            src={primaryLabSlides[currentSlide].src}
            alt={primaryLabSlides[currentSlide].alt}
            className="w-full h-72 sm:h-96 md:h-[440px] object-cover object-top rounded-2xl"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.35 }}
          />
        </AnimatePresence>

        <button
          type="button"
          aria-label="Previous slide"
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 text-slate-900 shadow-lg hover:bg-white transition"
        >
          <ChevronRight className="w-5 h-5 rotate-180" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 text-slate-900 shadow-lg hover:bg-white transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
          {primaryLabSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-200 ${index === currentSlide ? "w-8 bg-primary" : "w-4 bg-white/70 hover:bg-white"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

import prepRunning from "@/assets/prep-running.jpg";
import prepSoftskills from "@/assets/prep-softskills.jpg";
import prepPastoralCare from "@/assets/prep-pastoral care.jpg";
import prepIngarden from "@/assets/prep-ingarden.jpg";
import prepBoarding from "@/assets/prep-boarding.jpg";
import prepCulture from "@/assets/prep-culture.jpg";

const sections: Record<string, {
  title: string;
  subtitle: string;
  heroImage: string;
  content: React.ReactNode;
}> = {
  about: {
    title: "About Prep School",
    subtitle: "Nurturing curious, confident, and compassionate young learners.",
    heroImage: prepIngarden,
    content: (
      <div className="prose-premium max-w-none">
        <h2>Our Prep School</h2>
        <p>
          Martin House Prep School provides a structured, caring environment where
          children in Grades 1 to 7 are given the tools to excel academically and grow
          as individuals. Set on 80 hectares of indigenous vegetation at Kalundu Farm,
          Chisamba, the Prep School campus offers expansive space for learning both
          inside and outside the classroom.
        </p>
        <p>
          Our dedicated teachers follow the Cambridge Primary Curriculum while
          enriching every lesson with hands-on activities, project-based learning, and
          real-world application. We believe that when children are engaged and
          challenged, they become lifelong learners.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
          {[prepSoftskills, prepPastoralCare].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Prep school life ${i + 1}`}
              className="w-full h-64 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300"
            />
          ))}
        </div>
        <h2>Our Ethos</h2>
        <p>
          At the heart of the Martin House Prep School is the conviction that
          character and academics are inseparable. Our learners are taught to value
          integrity, responsibility, respect, and community—qualities that will serve
          them well beyond the classroom.
        </p>
        <blockquote>
          "Every child deserves a great teacher, not by chance, but by design."
        </blockquote>
        <h2>Pastoral Care</h2>
        <p>
          Pastoral care is woven into every aspect of school life. Class teachers
          build close relationships with their pupils, and our safeguarding team is
          always on hand to offer support. Weekly assemblies and house meetings create
          a strong sense of belonging and community.
        </p>
      </div>
    ),
  },
  academics: {
    title: "Prep Academics",
    subtitle: "Inspiring curiosity and a lifelong love of learning through the Cambridge curriculum.",
    heroImage: prepSoftskills,
    content: (
      <div className="prose-premium max-w-none">
        <h2>At Martin House School</h2>
        <p>
          We inspire curiosity, confidence and a lifelong love of learning through the Cambridge Primary Curriculum. From Early Years to Year 7, our learner-centred approach blends academic excellence with creativity, collaboration and strong pastoral care.
        </p>
        <p>
          Children build firm foundations in literacy and numeracy in a nurturing Early Years setting, then grow into independent, critical thinkers across Key Stages 1 and 2. Studies in English, Mathematics, Science and a broad curriculum prepare students for Cambridge Checkpoint and beyond.
        </p>
        <p>
          Beyond the classroom, sport, arts, clubs and educational trips enrich learning—developing confident, well-rounded individuals ready for the future.
        </p>

        <PrimaryLabSlideshow />
      </div>
    ),
  },
  culture: {
    title: "Prep Culture",
    subtitle: "Celebrating heritage, creativity, and community.",
    heroImage: prepCulture,
    content: (
      <div className="prose-premium max-w-none">
        <h2>A Rich Cultural Life</h2>
        <p>
          Culture is central to life at Martin House Prep. From our vibrant speech
          and drama festivals to heritage days, we create opportunities for every
          child to discover and celebrate their identity.
        </p>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {[prepCulture, prepBoarding].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Cultural activities ${i + 1}`}
              className="w-full h-64 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300"
            />
          ))}
        </div>
        <h2>Music & Performing Arts</h2>
        <p>
          Our choir and school band perform at termly concerts, Speech Day, and
          community events. Individual instrument lessons are available for piano,
          guitar, violin, and marimba. Drama workshops run throughout the year
          culminating in an annual school production.
        </p>
        <h2>Heritage Studies</h2>
        <p>
          Heritage Studies lessons and dedicated cultural days help pupils appreciate
          Zambia's rich history, languages, and traditions. Visits to historical
          sites and guest speakers bring these lessons to life.
        </p>
        <blockquote>
          "Culture is the foundation upon which excellence is built."
        </blockquote>
        <h2>Community & Charity</h2>
        <p>
          Our Junior Community Service programme teaches pupils the value of giving
          back. From food drives to visiting local care homes, pupils learn empathy
          and social responsibility from the earliest years.
        </p>
        <div className="not-prose mt-8">
          <img src={random3} alt="Community activities" className="w-full h-56 object-cover rounded-2xl shadow-md" />
        </div>
      </div>
    ),
  },
  pastoral: {
    title: "Pastoral Care",
    subtitle: "Every learner feels safe, supported and valued.",
    heroImage: prepPastoralCare,
    content: (
      <div className="prose-premium max-w-none">
        <h2>Our Approach</h2>
        <p>
          At Martin House, we ensure every learner feels safe, supported and valued. Pastoral care is a shared responsibility, built on strong relationships and clear communication.
        </p>
        <p>
          We follow a simple, effective approach:
        </p>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {[
            { title: "Notice & Support", desc: "Identify concerns early and respond with care" },
            { title: "Communicate", desc: "Involve staff and parents where needed" },
            { title: "Monitor", desc: "Track progress and provide ongoing support" },
            { title: "Escalate", desc: "Act promptly on serious concerns" },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <p className="font-bold text-[#0c2865] text-sm mb-1">{title}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <p>
          We encourage all students to show respect, take responsibility and seek help when needed.
        </p>
        <blockquote>Every learner matters. Every interaction counts.</blockquote>
        <div className="not-prose my-8">
          <img src={prepPastoralCare} alt="Pastoral care at Martin House Prep" className="w-full h-64 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300" />
        </div>
      </div>
    ),
  },
  hostel: {
    title: "Prep Hostel",
    subtitle: "A home away from home — safe, nurturing and full of warmth.",
    heroImage: prepBoarding,
    content: (
      <div className="prose-premium max-w-none">
        <h2>A Home Away From Home</h2>
        <p>
          At Martin House, our Prep Hostel offers a safe, nurturing and welcoming environment for children aged 6–13. More than accommodation, it is a home where students are supported to grow in confidence, independence and character.
        </p>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
          {[
            { title: "Environment", desc: "With dedicated hostel parents available at all times, learners feel secure, cared for and part of a close community. Through daily routines and shared experiences, students develop independence, teamwork, resilience and respect—guided by our values of Honour, Respect and Compassion." },
            { title: "Dining", desc: "Students enjoy nutritious, balanced meals in a warm, social setting that promotes good habits, gratitude and a sense of community." },
            { title: "Services", desc: "Our dedicated team ensures a comfortable living space, providing daily laundry, cleaning and support while encouraging students to take responsibility for their environment." },
            { title: "Health & Wellbeing", desc: "An onsite clinic and responsive care ensure students' health and wellbeing are always prioritised, giving families peace of mind." },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <p className="font-bold text-[#0c2865] text-sm mb-2">{title}</p>
              <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <blockquote>A supportive space where children feel at home, grow with confidence, and thrive.</blockquote>
        <div className="not-prose my-8">
          <img src={prepBoarding} alt="Prep Hostel" className="w-full h-64 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300" />
        </div>
      </div>
    ),
  },
  clubs: {
    title: "Prep Clubs",
    subtitle: "Fun, enriching activities that bring learning to life.",
    heroImage: prepIngarden,
    content: (
      <div className="prose-premium max-w-none">
        <h2>Co-Curricular Activities</h2>
        <p>
          At Martin House Prep, our clubs offer every child a chance to explore their interests, develop new skills, and thrive beyond the classroom.
        </p>
        <div className="not-prose space-y-6 my-8">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-[#0c2865] text-base mb-3">Book Club</h3>
            <p className="text-slate-700 text-sm leading-relaxed">Our Book Club is a welcoming and engaging space for students who enjoy books and storytelling. It brings readers together to share ideas, explore new texts and develop a deeper appreciation for reading.</p>
            <p className="text-slate-700 text-sm leading-relaxed mt-2">The club offers a balanced mix of lively discussions, creative activities and quiet reading time, allowing every student to participate in a way that suits them. From adventure and mystery to fantasy and non-fiction, students are encouraged to explore a wide range of genres and broaden their horizons.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-[#0c2865] text-base mb-3">Cooking Club</h3>
            <p className="text-slate-700 text-sm leading-relaxed">The Prep Cooking Club offers students a fun, hands-on opportunity to explore the world of cooking and baking. Through practical activities, learners develop essential kitchen skills, including food preparation, basic cooking techniques and simple recipes.</p>
            <p className="text-slate-700 text-sm leading-relaxed mt-2">The club encourages confidence, creativity and independence, while also building valuable life skills such as teamwork, organisation, hygiene and time management. Students are inspired to try new foods and explore a variety of cuisines in a safe and supportive environment.</p>
            <p className="text-slate-700 text-sm leading-relaxed mt-2">With activities ranging from baking and simple meal preparation to themed and seasonal treats, the club creates an enjoyable space where students learn through experience—and get to enjoy what they create!</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-[#0c2865] text-base mb-3">Young Farmers</h3>
            <p className="text-slate-700 text-sm leading-relaxed">The Young Farmers Club at Martin House gives students hands-on experience in agriculture, sustainability and rural life. Through activities such as gardening, animal care and visits from local farmers, learners develop practical skills and a deeper understanding of where food comes from.</p>
            <p className="text-slate-700 text-sm leading-relaxed mt-2">The club promotes responsibility, problem-solving and teamwork, while connecting classroom learning in STEM and sustainability to real-world experience. Open to all students—no farming background required—it offers a welcoming space where curiosity leads to meaningful learning and community involvement.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-[#0c2865] text-base mb-3">Music</h3>
            <p className="text-slate-700 text-sm leading-relaxed">The Music Department at Martin House School inspires creativity, confidence and discipline through both classroom learning and co-curricular activities. It provides students with opportunities to develop their musical talents while fostering teamwork, communication and self-expression.</p>
            <p className="text-slate-700 text-sm leading-relaxed mt-2">Through structured lessons, rehearsals and performances, students build skills in vocal and instrumental music, while contributing to concerts, recitals and school events that enrich the wider school community.</p>
            <div className="mt-4 space-y-2">
              {[
                { label: "Dance and Rhythm Club (Junior Primary)", desc: "Develops coordination, rhythm and creativity through movement and music" },
                { label: "Ensemble & Choirs (Senior Primary & College)", desc: "Focuses on vocal training, performance and participation in school events and competitions" },
                { label: "Primary Singing & Djembe Ensemble", desc: "Builds rhythm, aural skills and cultural awareness through music and performance" },
              ].map(({ label, desc }) => (
                <div key={label} className="flex items-start gap-3 bg-white rounded-xl px-4 py-3 border border-slate-100">
                  <ChevronRight className="w-3.5 h-3.5 text-[#0c2865] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-[#0c2865]">{label}</p>
                    <p className="text-slate-600 text-xs mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  },
  sport: {
    title: "Prep Sport",
    subtitle: "Building teamwork, discipline, and a love of healthy living.",
    heroImage: prepRunning,
    content: (
      <div className="prose-premium max-w-none">
        <h2>Sport at Martin House Prep</h2>
        <p>
          Physical education is compulsory for all pupils in Grades 1–7. Beyond
          the curriculum, Martin House offers a comprehensive co-curricular sports
          programme that builds teamwork, resilience, and healthy habits.
        </p>
        <h2>Sports Offered</h2>
        <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
          {["Football", "Netball", "Athletics", "Swimming", "Cricket"].map(sport => (
            <div key={sport} className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3">
              <ChevronRight className="w-4 h-4 text-[#0c2865] flex-shrink-0" />
              <span className="text-sm font-medium text-black">{sport}</span>
            </div>
          ))}
        </div>
        <div className="not-prose grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
          {[prepRunning, sport2, sport3].map((src, i) => (
            <img key={i} src={src} alt={`Sport ${i + 1}`} className="w-full h-44 object-cover rounded-2xl shadow-sm hover:scale-[1.02] transition-transform duration-300" />
          ))}
        </div>
        <h2>Inter-House & Inter-School Competition</h2>
        <p>
          Four houses compete throughout the year in an inter-house sports league.
          Pupils who excel are selected for inter-school fixtures against neighbouring
          independent schools, providing meaningful competitive experience.
        </p>
        <div className="not-prose grid grid-cols-2 gap-4 my-6">
          {[sports4, sports5].map((src, i) => (
            <img key={i} src={src} alt={`Sport event ${i + 1}`} className="w-full h-44 object-cover rounded-2xl shadow-sm" />
          ))}
        </div>
        <h2>Physical Education</h2>
        <p>
          All pupils have dedicated PE lessons every week. Our qualified PE staff
          develop fundamental movement skills, coordination, and fitness throughout
          the primary years, ensuring a solid foundation for lifelong physical activity.
        </p>
      </div>
    ),
  },
};

const tabs = [
  { key: "about", label: "About", icon: Users },
  { key: "academics", label: "Academics", icon: BookOpen },
  { key: "pastoral", label: "Pastoral Care", icon: Heart },
  { key: "hostel", label: "Hostel", icon: Home },
  { key: "clubs", label: "Clubs", icon: Star },
  { key: "culture", label: "Culture", icon: Palette },
  { key: "sport", label: "Sport", icon: Dumbbell },
];

const PrimaryPage = () => {
  const { section = "about" } = useParams<{ section: string }>();
  const navigate = useNavigate();
  const activeSection = sections[section] ?? sections.about;

  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />

      {/* Hero */}
      <div className="relative h-[65vh] min-h-[420px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.img
            key={section}
            src={activeSection.heroImage}
            alt={activeSection.title}
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c2865]/70 via-[#0c2865]/50 to-[#0c2865]/80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-white text-4xl md:text-5xl font-extrabold max-w-3xl leading-tight"
          >
            {activeSection.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 mt-4 text-lg max-w-xl"
          >
            {activeSection.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto no-scrollbar gap-1 py-2">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => navigate(`/primary/${key}`)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                  section === key
                    ? "bg-[#0c2865] text-white shadow"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={section}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {activeSection.content}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA Banner */}
      <div className="bg-[#0c2865] py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-white text-3xl font-bold mb-4">Ready to Join the Martin House Family?</h2>
          <p className="text-white/75 mb-8">Applications for the 2026 academic year are open. Visit our campus and see why families choose Martin House.</p>
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 bg-white text-[#0c2865] px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white/90 transition-colors"
          >
            Get in Touch <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrimaryPage;
