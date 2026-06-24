import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Dumbbell, Palette, ArrowRight, ChevronRight, Users } from "lucide-react";

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
    title: "About Primary School",
    subtitle: "Nurturing curious, confident, and compassionate young learners.",
    heroImage: prepIngarden,
    content: (
      <div className="prose-premium max-w-none">
        <h2>Our Primary School</h2>
        <p>
          Martin House Primary School provides a structured, caring environment where
          children in Grades 1 to 7 are given the tools to excel academically and grow
          as individuals. Set on 80 hectares of indigenous vegetation at Kalundu Farm,
          Chisamba, the Primary School campus offers expansive space for learning both
          inside and outside the classroom.
        </p>
        <p>
          Our dedicated teachers follow the Zimbabwean national curriculum while
          enriching every lesson with hands-on activities, project-based learning, and
          real-world application. We believe that when children are engaged and
          challenged, they become lifelong learners.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8 not-prose">
          {[prepSoftskills, prepPastoralCare].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Primary school life ${i + 1}`}
              className="w-full h-64 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300"
            />
          ))}
        </div>
        <h2>Our Ethos</h2>
        <p>
          At the heart of the Martin House Primary School is the conviction that
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
          build close relationships with their pupils, and our counselling team is
          always on hand to offer support. Weekly assemblies and house meetings create
          a strong sense of belonging and community.
        </p>
      </div>
    ),
  },
  academics: {
    title: "Primary Academics",
    subtitle: "A challenging and well-rounded curriculum for every learner.",
    heroImage: prepSoftskills,
    content: (
      <div className="prose-premium max-w-none">
        <h2>Curriculum Overview</h2>
        <p>
          The Primary School follows the Zimbabwe Ministry of Primary and Secondary
          Education curriculum. Core subjects include English, Mathematics, Shona,
          Science and Technology, Social Studies, Heritage Studies, and Visual and
          Performing Arts.
        </p>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
          {[
            { icon: BookOpen, title: "Literacy & Numeracy", desc: "Strong foundations in reading, writing, and mathematics through structured daily practice and enrichment activities." },
            { icon: Palette, title: "Creative Arts", desc: "Drama, music, art, and design are integral parts of our timetable, developing expression and lateral thinking." },
            { icon: Users, title: "Social Learning", desc: "Group projects, debates, and presentations build communication skills and collaborative mindsets from an early age." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">
              <div className="w-10 h-10 bg-[#0c2865] rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-black text-base mb-2">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <h2>Assessment & Progression</h2>
        <p>
          Continuous assessment guides our teaching. End-of-term examinations, class
          tests, and project submissions allow teachers to track progress and tailor
          support. At the end of Grade 7, pupils sit the national Grade 7 examinations
          before progressing to the College.
        </p>
        <div className="not-prose my-8">
          <img src={labImg} alt="Science laboratory" className="w-full h-64 object-cover rounded-2xl shadow-md" />
          <p className="text-center text-slate-500 text-sm mt-3">Primary Science Laboratory</p>
        </div>
        <h2>Extra Academic Support</h2>
        <p>
          Targeted reading and numeracy groups, afternoon homework clubs, and one-on-one
          teacher sessions ensure no learner is left behind. We celebrate academic
          achievement at our termly Prizegiving ceremonies.
        </p>
      </div>
    ),
  },
  culture: {
    title: "Primary Culture",
    subtitle: "Celebrating heritage, creativity, and community.",
    heroImage: prepCulture,
    content: (
      <div className="prose-premium max-w-none">
        <h2>A Rich Cultural Life</h2>
        <p>
          Culture is central to life at Martin House Primary. From our vibrant speech
          and drama festivals to Shona heritage days, we create opportunities for every
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
          Zimbabwe's rich history, languages, and traditions. Visits to historical
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
  sport: {
    title: "Primary Sport",
    subtitle: "Building teamwork, discipline, and a love of healthy living.",
    heroImage: prepRunning,
    content: (
      <div className="prose-premium max-w-none">
        <h2>Sport at Martin House Primary</h2>
        <p>
          Physical education is compulsory for all pupils in Grades 1–7. Beyond
          the curriculum, Martin House offers a comprehensive co-curricular sports
          programme that builds teamwork, resilience, and healthy habits.
        </p>
        <h2>Sports Offered</h2>
        <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
          {["Football", "Netball", "Athletics", "Swimming", "Cricket", "Tennis", "Basketball", "Chess", "Cross Country"].map(sport => (
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
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/70 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-1.5 rounded-full"
          >
            Martin House · Primary School
          </motion.span>
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
