import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import OfficeFinder from "@/components/OfficeFinder";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Award, Briefcase, ChevronRight, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import heroImage from "@/assets/secondary-school/school/random1.jpg";
import drDivineImage from "@/assets/head.png";
import BettyNhachi from "@/assets/primary-school/random/random1.jpg";
import TapiwaChinhondo from "@/assets/primary-school/random/random2.jpg";
import DanaiSimbi from "@/assets/primary-school/random/random3.jpg";
import Charlene from "@/assets/secondary-school/school/bio1.jpg";
import ErnestMagama from "@/assets/secondary-school/school/random1.jpg";
import MarkKupfuwa from "@/assets/secondary-school/school/bio1.jpg";

interface Leader {
  id: string;
  name: string;
  title: string;
  qualifications?: string;
  image: string;
  shortBio: string;
  fullBio: string;
  achievements?: string[];
  role: "board" | "executive" | "management";
}

const getInitials = (name: string): string => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

const leaders: Leader[] = [
  {
    id: "betty-nhachi",
    name: "Engineer Betty Nhachi",
    title: "Chairman of the Board of Governors",
    image: BettyNhachi,
    shortBio: "Chairman of the School Board and founder of BN Environmental Consultancy. Expert in engineering education and academic governance.",
    fullBio: "Engineer Betty Nhachi is the Chairman of the Board of Governors at Martin House. She holds an MSc in Environmental Management and a BSc (Hons) in Chemical Engineering, advising on campus development and institutional governance.",
    role: "board"
  },
  {
    id: "divine-simbi",
    name: "Dr. Divine Ndhlukula",
    title: "School Principal & Headmistress",
    qualifications: "MEd, PhD in Educational Leadership",
    image: drDivineImage,
    shortBio: "Visionary school principal with a passion for academic transformation, student empowerment, and holistic education.",
    fullBio: "Dr. Divine Ndhlukula is the Principal of Martin House. With over 25 years of experience in leading premier educational institutions, she holds a Master of Education and a PhD in Educational Leadership. She is dedicated to establishing world-class academic standards, fostering character development, and ensuring every student achieves their fullest potential.",
    role: "executive",
    achievements: [
      "National Education Leadership Award 2025",
      "Outstanding Principal of the Year 2023",
      "Cambridge Outstanding Leader Recognition",
      "Africa Award for Educational Innovation",
      "Conferred with the Presidential Commendation for Services to Education"
    ]
  },
  {
    id: "tapiwa-chinhondo",
    name: "Tapiwa Chinhondo",
    title: "Board Treasurer & Financial Governor",
    qualifications: "CA (Chartered Accountant)",
    image: TapiwaChinhondo,
    shortBio: "Chartered Accountant advising the Board of Governors on financial strategy, capital development, and school fees planning.",
    fullBio: "Tapiwa is a qualified Chartered Accountant. He serves on the Board of Governors as Treasurer, guiding the financial sustainability and capital investments of Martin House to provide state-of-the-art facilities.",
    role: "board"
  },
  {
    id: "danai-simbi",
    name: "Danai Simbi",
    title: "Vice Principal - Administration",
    image: DanaiSimbi,
    shortBio: "Co-founder of the school's administrative structure. Responsible for daily school operations, student welfare, and parent relations.",
    fullBio: "Danai Simbi is the Vice Principal of Administration. She oversees school logistics, admissions procedures, and ensure a safe, structured, and nurturing environment for all students and staff.",
    role: "executive"
  },
  {
    id: "charlene-gatsi",
    name: "Charlene Gatsi-Mahovo",
    title: "Director of Finance & Strategy",
    qualifications: "MBA in Finance",
    image: Charlene,
    shortBio: "Director of finance, managing the school's endowment, budgeting, scholarship funds, and academic infrastructure investments.",
    fullBio: "Charlene oversees the finance department at Martin House. She is a qualified finance professional with over 15 years' experience in managing institutional budgets, fees administration, and development funding.",
    role: "executive"
  },
  {
    id: "ernest-magama",
    name: "Ernest Magama",
    title: "Head of Academics & STEM Curriculum",
    image: ErnestMagama,
    shortBio: "Senior educator with 30 years of experience. Oversees the academic syllabus, Cambridge International examination preparation, and teacher performance.",
    fullBio: "Ernest Magama is the Head of Academics. He coordinates curriculum design, schedules international exams, and ensures the highest pedagogy standards across science, technology, engineering, and mathematics.",
    role: "management"
  },
  {
    id: "mark-kupfuwa",
    name: "Mark Kupfuwa",
    title: "Head of Student Welfare & Co-curriculars",
    qualifications: "MBA, Diploma in Education",
    image: MarkKupfuwa,
    shortBio: "Head of Student Welfare and Quality Assurance. Former President of secondary school counseling boards. Oversees athletics, club activities, and student discipline.",
    fullBio: "Mark Kupfuwa is responsible for student affairs and QA. He has over 30 years of experience in educational counseling and sports administration, ensuring a balanced, active, and supportive school environment.",
    role: "management"
  }
];

const LeadershipPage = () => {
  const [selectedLeader, setSelectedLeader] = useState<Leader | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title="Our Leadership & Faculty"
        subtitle="The dedicated educators and governors guiding our academic community"
        backgroundImage={heroImage}
      />

      {/* Intro Section */}
      <section className="py-16 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight mb-8">
            A culture of <br />
            <span className="text-primary">excellence</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
            Martin House is led by a dedicated team of educators and administrators who combine academic vision with deep pastoral care.
            Since our inception, our leadership has focused on innovation, character development, and the relentless pursuit of educational quality.
          </p>
        </div>
      </section>

      {/* Leadership Sections */}
      {[
        { title: "Board of Directors", members: leaders.filter(l => l.role === "board"), color: "bg-primary" },
        { title: "Executive Leadership", members: leaders.filter(l => l.role === "executive"), color: "bg-secondary" },
        { title: "Management Team", members: leaders.filter(l => l.role === "management"), color: "bg-accent" }
      ].map((section, idx) => (
        <section key={idx} className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-left mb-16 max-w-2xl">

              <h3 className="text-3xl font-heading font-bold text-foreground tracking-tight">
                {section.title}
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
              {section.members.map((leader, i) => (
                <motion.div
                  key={leader.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group bg-slate-50 rounded-[3rem] p-10 border-2 border-transparent hover:border-primary/20 hover:bg-white hover:shadow-2xl transition-all cursor-pointer"
                  onClick={() => setSelectedLeader(leader)}
                >
                  <div className="relative mb-8 aspect-square rounded-[2.5rem] overflow-hidden shadow-xl border-8 border-white group-hover:scale-105 transition-transform duration-700">
                    {leader.image ? (
                      <img src={leader.image} alt={leader.name} className="w-full h-full object-cover transition-all duration-700" />
                    ) : (
                      <div className={`w-full h-full ${section.color} flex items-center justify-center text-white text-5xl font-black`}>
                        {getInitials(leader.name)}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h4 className="text-xl font-heading font-bold text-foreground tracking-tight mb-2 group-hover:text-primary transition-colors">
                    {leader.name}
                  </h4>
                  <p className={`text-[10px] font-bold tracking-wider ${section.title.includes('Board') ? 'text-primary' : 'text-secondary'} mb-6`}>
                    {leader.title}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium line-clamp-3 mb-8">
                    {leader.shortBio}
                  </p>
                  <div className="flex items-center gap-2 text-[9px] font-bold tracking-wider text-foreground group-hover:text-primary">
                    View profile <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Leader Detail Dialog */}
      <Dialog open={!!selectedLeader} onOpenChange={() => setSelectedLeader(null)}>
        <DialogContent className="max-w-4xl rounded-[3rem] border-none p-0 overflow-hidden bg-white">
          {selectedLeader && (
            <div className="flex flex-col md:flex-row min-h-[500px]">
              <div className="md:w-5/12 bg-primary p-12 text-white relative overflow-hidden flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.2),transparent)]" />
                <div className="relative z-10">
                  <div className="aspect-square rounded-[2.5rem] overflow-hidden border-8 border-white/20 mb-8 shadow-2xl">
                    <img src={selectedLeader.image} alt={selectedLeader.name} className="w-full h-full object-cover" />
                  </div>
                  <h2 className="text-3xl font-heading font-bold tracking-tight leading-none mb-4">{selectedLeader.name}</h2>
                  <p className="text-[11px] font-bold tracking-wider text-white/60 mb-8">{selectedLeader.title}</p>
                  <div className="h-1 w-12 bg-accent rounded-full" />
                </div>
                <div className="relative z-10 text-[9px] font-bold tracking-widest opacity-40">Leadership excellence</div>
              </div>

              <div className="md:w-7/12 p-12 space-y-8 max-h-[90vh] overflow-y-auto">
                <div>
                  <h3 className="text-[10px] font-bold tracking-widest text-primary mb-4 flex items-center gap-2">
                    <Briefcase className="w-4 h-4" /> Professional background
                  </h3>
                  <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                    "{selectedLeader.fullBio}"
                  </p>
                </div>

                {selectedLeader.achievements && selectedLeader.achievements.length > 0 && (
                  <div>
                    <h3 className="text-[10px] font-bold tracking-widest text-secondary mb-6 flex items-center gap-2">
                      <Award className="w-4 h-4" /> Key achievements
                    </h3>
                    <div className="grid gap-3">
                      {selectedLeader.achievements.map((ach, i) => (
                        <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="w-6 h-6 bg-secondary text-white rounded-lg flex items-center justify-center shrink-0 shadow-lg">
                            <Star className="w-3 h-3" />
                          </div>
                          <span className="text-xs font-bold text-foreground">{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-8 border-t border-slate-100">
                  <Button onClick={() => setSelectedLeader(null)} className="rounded-2xl px-8 py-6 font-bold text-[11px] tracking-normal shadow-xl">Close profile</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <OfficeFinder />
      <Footer />
    </div>
  );
};

export default LeadershipPage;
