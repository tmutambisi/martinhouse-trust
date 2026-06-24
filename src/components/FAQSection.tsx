import { useState, useMemo } from "react";
import { Search, ChevronDown, MessageSquare, GraduationCap, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface QAItem {
  question: string;
  answer: string;
  category: string;
}

const allFaqs: QAItem[] = [
  {
    category: "admissions",
    question: "What is the admissions process?",
    answer: "Applications open annually. Parents submit a completed application form along with the learner's latest school report, birth certificate, and passport photos. Shortlisted candidates are invited for an assessment and interview."
  },
  {
    category: "admissions",
    question: "What age groups do you cater for?",
    answer: "Martin House Prep (Primary) accepts learners from Early Years through to Year 7. Martin House College (Secondary) offers Cambridge Checkpoint, IGCSE, and AS & A Level programmes for students from Form 1 through Upper 6."
  },
  {
    category: "admissions",
    question: "What curriculum does Martin House follow?",
    answer: "We follow the Cambridge International curriculum across both our Prep and College divisions, complemented by a rich co-curricular programme in sports, arts, and community service."
  },
  {
    category: "admissions",
    question: "What are the school fees and payment options?",
    answer: "Fee schedules are available from the admissions office and vary by grade level. We accept bank transfers, card payments, and cash. Payment plans can be arranged through the bursar's office."
  },
  {
    category: "admissions",
    question: "Is there a waiting list?",
    answer: "Due to high demand, some year groups may have a waiting list. We recommend applying early. The admissions team will keep you informed of your child's place and any available openings."
  },
  {
    category: "campus-life",
    question: "Does Martin House offer boarding facilities?",
    answer: "Yes, Martin House Prep offers a full boarding programme with dedicated hostel parents, nutritious meals, laundry services, and an onsite clinic to ensure a safe and supportive home-away-from-home experience."
  },
  {
    category: "campus-life",
    question: "What extracurricular activities are available?",
    answer: "We offer a wide range of clubs and activities including JETS Science Club, Coding Club, Art & Exhibition, MUN & Debate, Chess, Music & Rhythm, Young Farmers, Book Club, Cooking Club, and Community Outreach — among many others."
  },
  {
    category: "campus-life",
    question: "What pastoral care does the school provide?",
    answer: "Every learner is supported through our structured pastoral framework of tutor time, assemblies, chapel services, and a 'Notice, Communicate, Monitor, and Escalate' approach. Our staff are trained to nurture wellbeing and character development."
  },
  {
    category: "campus-life",
    question: "What are the school hours?",
    answer: "School hours run from 7:30 AM to 3:00 PM on weekdays. After-school clubs and activities typically run until 4:30 PM. Boarders follow a structured evening programme including supervised study and recreation."
  },
  {
    category: "campus-life",
    question: "Does Martin House provide learning support?",
    answer: "Yes. Our Learning Support programme offers tailored assistance including practical strategies for independent learning, access arrangements in assessments, and close collaboration with teachers and parents to meet each learner's needs."
  },
  {
    category: "campus-life",
    question: "What is the school's uniform policy?",
    answer: "All learners are required to wear the official Martin House uniform. A full uniform list is provided upon enrolment, and items can be purchased through the school's uniform shop."
  }
];

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeTab, setActiveTab] = useState<"all" | "admissions" | "campus-life">("all");

  const filteredFaqs = useMemo(() => {
    return allFaqs.filter(faq => {
      const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "all" || faq.category === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">

        {/* Modern Header with Search */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-8 tracking-tight"
          >
            How can we <span className="text-primary">help you?</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative lg:max-w-2xl mx-auto"
          >
            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-primary" />
            </div>
            <input
              type="text"
              placeholder="Search for questions (e.g., 'fees', 'admissions', 'boarding')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-8 py-6 bg-slate-50 border-2 border-slate-100 rounded-3xl text-lg font-medium focus:outline-none focus:border-primary/30 focus:bg-white transition-all shadow-xl shadow-primary/5"
            />
          </motion.div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: "all", label: "All questions", icon: MessageSquare },
            { id: "admissions", label: "Admissions", icon: GraduationCap },
            { id: "campus-life", label: "Campus Life", icon: BookOpen }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-[11px] tracking-normal transition-all ${activeTab === tab.id
                ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105"
                : "bg-slate-50 text-muted-foreground hover:bg-slate-100"
                }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className={`border-2 rounded-[2rem] overflow-hidden transition-all duration-300 ${openIndex === index
                    ? "border-primary/20 bg-primary/[0.02] shadow-xl shadow-primary/5"
                    : "border-slate-100 bg-white hover:border-slate-200"
                    }`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full flex items-center justify-between p-8 text-left group"
                  >
                    <span className={`text-lg md:text-xl font-bold transition-colors ${openIndex === index ? "text-primary" : "text-foreground"}`}>
                      {faq.question}
                    </span>
                    <div className={`p-2 rounded-xl transition-all ${openIndex === index ? "bg-primary text-white rotate-180" : "bg-slate-100 text-slate-400 group-hover:bg-slate-200"}`}>
                      <ChevronDown className="w-5 h-5" />
                    </div>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{ height: openIndex === index ? "auto" : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pt-0">
                      <div className="h-0.5 w-12 bg-accent/20 mb-6" />
                      <p className="text-lg text-muted-foreground leading-relaxed font-medium">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-[3rem]">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-slate-400 mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your search or switching categories.</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Direct Contact CTA */}
        <div className="mt-20 p-12 bg-primary rounded-[3rem] text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 relative z-10">Still have questions?</h3>
          <p className="text-white/70 mb-8 relative z-10 max-w-xl mx-auto font-medium">
            Our admissions team is here to help with any questions about enrolment,
            curriculum, or campus life at Martin House.
          </p>
          <a href="/contact" className="inline-block px-12 py-5 bg-white text-primary rounded-2xl font-bold text-sm tracking-normal hover:bg-accent hover:text-white transition-all shadow-2xl relative z-10">
            Contact admissions
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;