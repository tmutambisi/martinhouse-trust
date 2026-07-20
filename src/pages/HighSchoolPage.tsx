import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Dumbbell, Palette, ArrowRight, ChevronRight, Users, GraduationCap } from "lucide-react";

import nav1 from "@/assets/secondary-school/navbar/nav1.jpg";
import nav2 from "@/assets/secondary-school/navbar/nav2.jpg";
import nav3 from "@/assets/secondary-school/navbar/nav3.jpg";
import school1 from "@/assets/secondary-school/school/random1.jpg";
import school2 from "@/assets/secondary-school/school/bio1.jpg";
import cricket1 from "@/assets/secondary-school/sport/cricket1.jpg";
import cricket2 from "@/assets/secondary-school/sport/cricket2.jpg";
import music from "@/assets/secondary-school/sport/music.jpg";
import speechda1 from "@/assets/secondary-school/sport/speechda1.jpg";

import highxl from "@/assets/highxl.jpg";
import highSports from "@/assets/high-sports.jpg";
import highxlArts from "@/assets/highxl-arts.jpg";
import highxlGirls from "@/assets/highxl-girls.jpg";
import highxlScience from "@/assets/highxl-science.jpg";
import highxlSpeechNPrize from "@/assets/highxl-speechnprize.jpg";

const sections: Record<string, {
  title: string;
  subtitle: string;
  heroImage: string;
  content: React.ReactNode;
}> = {
  about: {
    title: "About High School",
    subtitle: "Shaping scholars, leaders, and responsible citizens for tomorrow.",
    heroImage: highxl,
    content: (
      <div className="prose-premium max-w-none">
        <h2>Our High School</h2>
        <p>
          Martin House College caters for Forms 1 to 6, offering the Cambridge International
          programmes — Cambridge Checkpoint, IGCSE, and AS &amp; A Level. Students benefit from
          small class sizes, expert subject specialists, and a community-focused boarding environment.
        </p>
        <p>
          The College campus shares the tranquil 80-hectare Kalundu Farm setting with
          the Prep School, giving High School students access to outstanding facilities
          including science laboratories, a library resource centre, computer labs,
          sports fields, and boarding houses.
        </p>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {[highxlArts, highxlSpeechNPrize].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`High school life ${i + 1}`}
              className="w-full h-64 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300"
            />
          ))}
        </div>
        <h2>Our College Head's Message</h2>
        <p>
          At Martin House College, we challenge every student to be their very best.
          Academic rigour, co-curricular involvement, and moral grounding are the
          three pillars that define our graduates. We are proud of our record of
          producing students who succeed at university and make a meaningful
          contribution to society.
        </p>
        <blockquote>
          "We do not simply prepare students for examinations; we prepare them for life."
        </blockquote>
        <h2>Boarding & Day School</h2>
        <p>
          Martin House College is both a day and boarding school. Our boarding houses
          provide a safe, supervised home away from home where students develop
          independence, form lasting friendships, and have dedicated study time in the
          evenings under the guidance of house parents and prefects.
        </p>
      </div>
    ),
  },
  academics: {
    title: "College Academics",
    subtitle: "Cambridge International qualifications for university-bound scholars.",
    heroImage: highxlScience,
    content: (
      <div className="prose-premium max-w-none">
        <h2>Overview</h2>
        <p>
          At Martin House, our Academic section lies at the core of everything we do. We deliver a dynamic, inclusive curriculum that challenges, inspires, and develops every learner. From early years through to senior secondary, we blend strong academic foundations with vital 21st-century skills—critical thinking, digital literacy, and collaboration—preparing students to thrive in a rapidly changing world.
        </p>
        <h2>Purpose</h2>
        <p>
          We do more than teach—we ignite a lifelong love of learning. We believe true success goes beyond grades, shaping confident, resilient and curious individuals. Our approach:
        </p>
        <div className="not-prose grid grid-cols-1 gap-4 my-6">
          {[
            "Equips students for internationally recognised qualifications and higher education",
            "Encourages independence and ownership of learning",
            "Ensures every student is supported to achieve their very best",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3 bg-slate-50 rounded-xl px-5 py-4 border border-slate-100">
              <ChevronRight className="w-4 h-4 text-[#0c2865] flex-shrink-0 mt-0.5" />
              <span className="text-sm font-medium text-slate-700">{item}</span>
            </div>
          ))}
        </div>
        <h2>Cambridge Curriculum</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
          {[
            { title: "Cambridge Checkpoint", items: ["English Language", "Mathematics", "Science", "Global Perspectives"] },
            { title: "Cambridge IGCSE", items: ["English as a First Language", "Extended Mathematics", "Triple / Co-ordinated Sciences", "Business Studies & Economics", "History & Geography", "French & Afrikaans"] },
            { title: "Cambridge AS & A Level", items: ["Mathematics & Further Maths", "Physics, Chemistry, Biology", "Business & Economics", "History & English Literature", "Art & Design"] },
          ].map(({ title, items }) => (
            <div key={title} className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <h3 className="font-bold text-[#0c2865] text-sm mb-4 pb-2 border-b border-slate-200 uppercase tracking-wide">{title}</h3>
              <ul className="space-y-2">
                {items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-700">
                    <ChevronRight className="w-3.5 h-3.5 text-[#0c2865] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <h2>Key Information</h2>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-3 gap-4 my-6">
          {[
            { label: "Curriculum", value: "Cambridge (Checkpoint, IGCSE, AS & A Level)" },
            { label: "Faculty", value: "Expert, passionate subject specialists committed to excellence" },
            { label: "Support", value: "Personalised learning through close collaboration with the Learning Support department" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
              <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">{label}</p>
              <p className="text-sm font-bold text-[#0c2865]">{value}</p>
            </div>
          ))}
        </div>
        <div className="not-prose my-8">
          <img src={highxlSpeechNPrize} alt="College academics" className="w-full h-64 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300" />
        </div>
        <h2>Academic Excellence</h2>
        <p>
          Martin House College consistently achieves outstanding Cambridge examination
          results. Top performers are recognised at our annual Prize Day, and academic
          scholarships are available for high-achieving pupils entering Form 1 and Form 4.
        </p>
      </div>
    ),
  },
  culture: {
    title: "High School Culture",
    subtitle: "Excellence in arts, music, drama, and community engagement.",
    heroImage: highxlArts,
    content: (
      <div className="prose-premium max-w-none">
        <h2>A Vibrant School Culture</h2>
        <p>
          Life at Martin House College extends well beyond the classroom. A thriving
          cultural programme ensures that every student finds their place to shine —
          whether through music, drama, public speaking, or visual arts.
        </p>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {[highxlArts, highxlSpeechNPrize].map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Cultural activity ${i + 1}`}
              className="w-full h-64 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300"
            />
          ))}
        </div>
        <h2>Music</h2>
        <p>
          The College choir, orchestra, and marimba band are central to our cultural
          identity. Students perform at Speech Day, Carol Services, cultural festivals,
          and inter-school music competitions. Individual music tuition is available in
          piano, guitar, violin, flute, and voice.
        </p>
        <h2>Drama & Speech</h2>
        <p>
          Our annual school play and one-act festival are highlights of the school
          calendar. Public speaking competitions, debates, and Model United Nations
          sharpen students' ability to communicate confidently and persuasively.
        </p>
        <blockquote>
          "The arts are not a luxury — they are the language of the human spirit."
        </blockquote>
        <h2>Community Service</h2>
        <p>
          The Community Service programme is a graduation requirement for all sixth
          formers. Students engage with local schools, hospitals, and conservation
          projects, developing genuine empathy and a strong sense of civic duty.
        </p>
      </div>
    ),
  },
  sport: {
    title: "High School Sport",
    subtitle: "Competitive sport that builds character, teamwork, and discipline.",
    heroImage: highSports,
    content: (
      <div className="prose-premium max-w-none">
        <h2>Sport at Martin House College</h2>
        <p>
          Sport is compulsory for all College students and is taken seriously as a
          vehicle for character development. Our teams compete at district, provincial,
          and national level in a range of disciplines.
        </p>
        <h2>Sports Offered</h2>
        <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
          {["Cricket", "Football", "Netball", "Basketball", "Athletics", "Swimming", "Tennis", "Chess", "Rugby", "Volleyball", "Cross Country", "Badminton"].map(sport => (
            <div key={sport} className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3">
              <ChevronRight className="w-4 h-4 text-[#0c2865] flex-shrink-0" />
              <span className="text-sm font-medium text-black">{sport}</span>
            </div>
          ))}
        </div>
        <div className="not-prose grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
          {[highSports, cricket2].map((src, i) => (
            <img key={i} src={src} alt={`Cricket ${i + 1}`} className="w-full h-48 object-cover rounded-2xl shadow-sm hover:scale-[1.02] transition-transform duration-300" />
          ))}
        </div>
        <h2>Girls' Sport</h2>
        <p>
          We are committed to equal opportunity in sport for all students. Our girls'
          netball, basketball, and athletics teams have won multiple provincial
          championships. We provide the same quality of coaching, facilities, and
          competitive exposure for all.
        </p>
        <div className="not-prose my-6">
          <img src={highxlGirls} alt="Girls sport" className="w-full h-56 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300" />
        </div>
        <h2>Facilities</h2>
        <p>
          The College sports facilities include two football pitches, a netball court,
          cricket nets, a swimming pool, a multi-purpose court, and a running track.
          All facilities are maintained to a high standard and are available for use
          during evenings and weekends for boarders.
        </p>
        <div className="not-prose mt-6">
          <img src={highxl} alt="Campus facilities" className="w-full h-56 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300" />
        </div>
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

const HighSchoolPage = () => {
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
            Martin House · High School
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
                onClick={() => navigate(`/highschool/${key}`)}
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
          <h2 className="text-white text-3xl font-bold mb-4">Begin Your College Journey at Martin House</h2>
          <p className="text-white/75 mb-8">Enrolment for Form 1 and Form 4 entry is now open. Apply today and discover the Martin House difference.</p>
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 bg-white text-[#0c2865] px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white/90 transition-colors"
          >
            Apply Now <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default HighSchoolPage;
