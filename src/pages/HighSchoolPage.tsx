import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { BookOpen, Dumbbell, Palette, ArrowRight, ChevronRight, Users, GraduationCap, Star, Heart } from "lucide-react";

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

        <h2>AS &amp; A Level Subjects</h2>
        <div className="not-prose grid grid-cols-2 sm:grid-cols-3 gap-3 my-6">
          {[
            "Art & Design",
            "Biology",
            "Business Studies",
            "Chemistry",
            "Computer Science",
            "Design & Technology",
            "English Language (AS Level)",
            "Environmental Management (AS Level)",
            "English Literature",
            "Geography",
            "Mathematics",
            "Physics",
            "History",
          ].map(subj => (
            <div key={subj} className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-3">
              <ChevronRight className="w-3.5 h-3.5 text-[#0c2865] flex-shrink-0" />
              <span className="text-sm font-medium text-black">{subj}</span>
            </div>
          ))}
        </div>
        <h2>IGCSE Subject Groups</h2>
        <p>
          Students take three compulsory subjects: <strong>Mathematics</strong>, <strong>English Language</strong>, and <strong>English Literature</strong>. In addition, each student selects one subject from each of Groups A–E (five choice subjects), for a total of eight IGCSE subjects. At least one choice must be a science: Biology, Chemistry or Physics.
        </p>
        <div className="not-prose grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6">
          {[
            "Biology",
            "Chemistry",
            "Physics",
            "Additional Mathematics",
            "French",
            "Design & Technology",
            "Physical Education",
            "Business Studies",
            "ICT",
            "Computer Science",
            "Art & Design",
            "History",
            "Geography",
          ].map((subject) => (
            <div key={subject} className="flex items-center gap-2 bg-slate-50 rounded-2xl px-4 py-3 text-sm text-slate-700 border border-slate-100">
              <ChevronRight className="w-3.5 h-3.5 text-[#0c2865] flex-shrink-0" />
              <span>{subject}</span>
            </div>
          ))}
        </div>
        <div className="not-prose my-8">
          <img src={highxlSpeechNPrize} alt="College academics" className="w-full h-64 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300" />
        </div>
        <h2>Learning Support</h2>
        <p>
          At Martin House College, our Learning Support Department ensures that every student can learn with confidence and succeed without barriers. We provide tailored support that recognises individual needs, equipping learners with practical strategies to enhance their understanding and unlock their full potential.
        </p>
        <p>
          Our goal is not only to support learning, but to build independence, resilience and self-belief. Through personalised guidance, students develop essential skills such as organisation, time management, comprehension and effective revision—skills that benefit them far beyond the classroom.
        </p>
        <p>
          We also prepare students to make confident use of approved access arrangements in assessments and examinations. By familiarising them with these provisions, we create a fair and supportive environment in which every student can demonstrate their true ability.
        </p>
      </div>
    ),
  },
  pastoral: {
    title: "Pastoral Care",
    subtitle: "A safe, inclusive and nurturing environment for every student.",
    heroImage: highxlGirls,
    content: (
      <div className="prose-premium max-w-none">
        <h2>Overview</h2>
        <p>
          At Martin House, Pastoral Care is at the heart of student life. Guided by our values of Honour, Respect and Compassion, we create a safe, inclusive and nurturing environment where every learner feels valued, supported and empowered to succeed.
        </p>
        <h2>Purpose</h2>
        <p>
          Our aim is to develop the whole individual—academically, socially, emotionally and spiritually. We believe students flourish when they feel secure, understood and respected. Through strong pastoral support, we foster confidence, resilience, positive behaviour and a strong sense of responsibility, preparing students to make meaningful contributions to society.
        </p>
        <h2>Student Experience</h2>
        <p>
          Pastoral Care is delivered through daily interactions and structured programmes that promote wellbeing and personal growth:
        </p>
        <div className="not-prose my-6 overflow-hidden rounded-2xl shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-3">
            {[
              { title: "Tutor Time", desc: "Personalised guidance, monitoring progress and supporting wellbeing" },
              { title: "Assemblies", desc: "Celebrating achievement and reinforcing values" },
              { title: "Chapel Services", desc: "Encouraging reflection, integrity and spiritual growth" },
            ].map(({ title, desc }, index) => (
              <div key={title} className={`bg-[#0c2865] p-6 ${index > 0 ? "border-t border-white/10 sm:border-t-0 sm:border-l sm:border-white/10" : ""}`}>
                <p className="font-bold text-white text-sm mb-2">{title}</p>
                <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
        <p>
          Through this holistic approach, we nurture confident, respectful and compassionate individuals ready to thrive both within the school and beyond.
        </p>
        <div className="not-prose my-8">
          <img src={highxlArts} alt="Pastoral care at Martin House" className="w-full h-64 object-cover rounded-2xl shadow-md hover:scale-[1.02] transition-transform duration-300" />
        </div>
      </div>
    ),
  },
  clubs: {
    title: "College Clubs",
    subtitle: "Vibrant co-curricular activities that inspire, challenge, and connect.",
    heroImage: highxlArts,
    content: (
      <div className="prose-premium max-w-none">
        <h2>Co-Curricular Life</h2>
        <p>
          At Martin House College, life extends well beyond the classroom. Our clubs offer every student a space to discover passions, build skills, and connect with peers who share their interests.
        </p>
        <div className="not-prose space-y-6 my-8">
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-[#0c2865] text-base mb-3">Afrikaans Club</h3>
            <p className="text-slate-700 text-sm leading-relaxed">The Afrikaans Club at Martin House offers a welcoming and engaging space for students to build confidence in their language skills. Through interactive conversations, games and cultural activities, learners develop their ability to speak and understand Afrikaans in real-life contexts.</p>
            <p className="text-slate-700 text-sm leading-relaxed mt-2">The club also provides valuable academic support, particularly for native speakers preparing for IGCSE Afrikaans. Students strengthen their reading, writing, comprehension and oral communication skills, ensuring they are well-prepared for examination success.</p>
            <p className="text-slate-700 text-sm leading-relaxed mt-2">Above all, the club fosters a genuine appreciation of the language and its culture, creating a relaxed, inclusive environment where students learn from one another and enjoy the journey of language learning.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-[#0c2865] text-base mb-3">Coding Club</h3>
            <p className="text-slate-700 text-sm leading-relaxed">The Coding Club at Martin House introduces students to programming through the Codementum platform. Learners develop skills in Python, JavaScript and HTML/CSS while building creativity, problem-solving and logical thinking at their own pace.</p>
            <p className="text-slate-700 text-sm leading-relaxed mt-2">The club also offers a yearly international tour linked to competitions, giving students global exposure. In 2025, the tour was in Brazil, and in 2026, it took place in Rome.</p>
            <p className="text-slate-700 text-sm leading-relaxed mt-2">A dynamic space where innovation, collaboration and future-ready digital skills thrive.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-[#0c2865] text-base mb-3">Community &amp; Outreach Club</h3>
            <p className="text-slate-700 text-sm leading-relaxed">At Martin House, the Community &amp; Outreach Club brings students, parents and staff together in the spirit of service over self. We make a meaningful impact through fundraising for less privileged communities and by hosting key events such as the Mother's Day Tea and Christmas Fair.</p>
            <p className="text-slate-700 text-sm leading-relaxed mt-2">Students develop leadership, teamwork and character, while contributing to a caring and united school community. A welcoming space where every student can make a difference and see the power of giving back.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-[#0c2865] text-base mb-3">MUN &amp; Debate Club</h3>
            <p className="text-slate-700 text-sm leading-relaxed">The MUN and Debate Club at Martin House empowers students to become confident speakers, critical thinkers and future leaders. Through debates, research and MUN simulations, students learn to analyse global issues, build strong arguments and engage respectfully with diverse perspectives.</p>
            <p className="text-slate-700 text-sm leading-relaxed mt-2">Students take part in leading competitions such as the World Scholar's Cup, National Debate League and international MUN conferences. In 2026, Martin House hosted the NDL Regional Championships and competed in the Pan African Debating Championship in Johannesburg, with regular participation at St John's College MUN.</p>
            <p className="text-slate-700 text-sm leading-relaxed mt-2">We also proudly host our own international MUN conference, including Zambia's first Prep MUN in 2026—encouraging younger students to engage in global dialogue.</p>
            <p className="text-slate-700 text-sm leading-relaxed mt-2">A vibrant platform for developing articulate, informed and compassionate global citizens.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-[#0c2865] text-base mb-3">Art</h3>
            <p className="text-slate-700 text-sm leading-relaxed">Art continues to thrive at Martin House College, forming a vibrant part of the school's cultural life. Our recent exhibition and auction showcased an inspiring collection of work from pupils and local community artists, attracting enthusiastic support and raising valuable funds. The event was a great success, celebrating creativity, talent and collaboration. Across all year groups, students demonstrate remarkable artistic ability, ensuring that art remains a lively and valued thread throughout the school community.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-[#0c2865] text-base mb-3">Chess Club</h3>
            <p className="text-slate-700 text-sm leading-relaxed">The Chess Club at Martin House offers students a stimulating and enjoyable way to develop strategic thinking, concentration and problem-solving skills. In a supportive and inclusive environment, learners of all abilities are encouraged to explore new strategies and engage in friendly competition.</p>
            <p className="text-slate-700 text-sm leading-relaxed mt-2">Through chess, students build patience, creativity, resilience and strong decision-making skills—qualities that support success both in and beyond the classroom. A rewarding space where confidence grows and a lasting appreciation for the game is developed.</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h3 className="font-bold text-[#0c2865] text-base mb-1">JETS Science Club</h3>
            <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-3">Junior Engineers, Technicians and Scientists Club</p>
            <p className="text-slate-700 text-sm leading-relaxed">The JETS Club is a vibrant community of young innovators, problem-solvers, and future scientists. Through exciting experiments, investigations, and hands-on projects, members develop scientific skills, creativity, critical thinking, and a passion for discovery.</p>
            <p className="text-slate-700 text-sm leading-relaxed mt-2">Our members don't just learn science from textbooks—they experience it firsthand. From exciting chemical reactions to engineering challenges and scientific investigations, every meeting is an opportunity to explore, learn, and innovate.</p>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                "Conduct exciting experiments",
                "Develop practical scientific skills",
                "Build creativity and problem-solving abilities",
                "Participate in STEM competitions and projects",
                "Prepare for careers in science, technology, engineering, and medicine",
              ].map(item => (
                <div key={item} className="flex items-start gap-2">
                  <ChevronRight className="w-3.5 h-3.5 text-[#0c2865] flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-sm">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-slate-500 text-xs italic mt-4">Think. Experiment. Discover. Innovate.</p>
          </div>
        </div>
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
          {["Cricket", "Football", "Netball", "Athletics", "Swimming", "Rugby", "Volleyball"].map(sport => (
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
  { key: "pastoral", label: "Pastoral Care", icon: Heart },
  { key: "clubs", label: "Clubs", icon: Star },
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
