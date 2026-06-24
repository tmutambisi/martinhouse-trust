import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion } from "framer-motion";
import { BookOpen, Users, ClipboardList, Calendar, ShieldCheck, Download, CheckCircle2 } from "lucide-react";
import heroImg from "@/assets/secondary-school/navbar/nav1.jpg";

interface SectionConfig {
  title: string;
  subtitle: string;
  icon: any;
  content: React.ReactNode;
}

export const ParentsPage = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const activeSection = section || "the-board";

  const sections: Record<string, SectionConfig> = {
    "the-board": {
      title: "The Board of Governors",
      subtitle: "Strategic leadership and governance ensuring educational excellence.",
      icon: Users,
      content: (
        <div className="space-y-8">
          <div className="prose max-w-none text-slate-600">
            <p className="text-lg leading-relaxed font-medium text-slate-800">
              The Martin House Board of Governors is responsible for the overall governance, financial stewardship, and strategic direction of the school.
            </p>
            <p className="text-base leading-relaxed mt-4">
              Comprising dedicated professionals from diverse backgrounds—including education, law, finance, agriculture, and business—the Board works in close partnership with the School Principal and executive management to ensure that Martin House Trust School maintains its high standards of academic rigour, Christian character, and holistic development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 pt-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-4">
              <h3 className="text-xl font-heading font-bold text-primary flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-secondary" />
                Key Responsibilities
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-secondary font-bold mt-0.5">•</span>
                  <span>Formulating and monitoring long-term strategic plans and school development policies.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-secondary font-bold mt-0.5">•</span>
                  <span>Ensuring financial solvency, approving budgets, and overseeing major capital investments.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-secondary font-bold mt-0.5">•</span>
                  <span>Upholding the Christian ethos, founding values, and mission of the school.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-secondary font-bold mt-0.5">•</span>
                  <span>Appointing and supporting the School Principal and senior administration.</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-4">
              <h3 className="text-xl font-heading font-bold text-primary flex items-center gap-3">
                <BookOpen className="h-6 w-6 text-secondary" />
                Standing Committees
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-secondary font-bold mt-0.5">•</span>
                  <div>
                    <strong className="text-slate-800">Finance & General Purpose:</strong> Oversees budgeting, fees, and resource allocation.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-secondary font-bold mt-0.5">•</span>
                  <div>
                    <strong className="text-slate-800">Education & Policy:</strong> Ensures curriculum excellence and alignment with international educational standards.
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-secondary font-bold mt-0.5">•</span>
                  <div>
                    <strong className="text-slate-800">Infrastructure & Maintenance:</strong> Monitors campus expansion, estate maintenance, and agricultural projects.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    "uniform-requirements": {
      title: "School Uniform Guidelines",
      subtitle: "Detailing the daily, seasonal, and activity wear required for all students.",
      icon: ClipboardList,
      content: (
        <div className="space-y-12">
          {/* Main Table Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Girls' Uniform */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
              <div className="bg-primary text-white px-8 py-5">
                <h3 className="text-lg font-heading font-bold uppercase tracking-wider">Girls' Uniform Requirements</h3>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="p-6 md:p-8 space-y-4">
                  <h4 className="font-heading font-bold text-secondary uppercase text-sm tracking-widest">Girls' Summer Uniform</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Navy skort</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Light blue shirt with school badge</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Short white socks (if black school shoes are worn)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Black school shoes (compulsory for chapel & assemblies) or navy rafters</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Navy blue school hat with school badge. Cap may only be worn for sport</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Navy jersey / Fleece / Anorak on rainy days</span></li>
                  </ul>
                </div>
                <div className="p-6 md:p-8 space-y-4">
                  <h4 className="font-heading font-bold text-secondary uppercase text-sm tracking-widest">Girls' Winter Uniform</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Navy skort</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Light blue shirt with school badge</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Short white socks (if black school shoes are worn)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Black school shoes (compulsory for chapel & assemblies) or navy rafters</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Navy blue school hat with school badge</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Navy jersey / Fleece</span></li>
                  </ul>
                </div>
                <div className="p-6 md:p-8 bg-slate-50/50 space-y-3">
                  <h4 className="font-heading font-bold text-slate-800 uppercase text-xs tracking-wider">Hair & Grooming (Girls)</h4>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-500">
                    <li>Hair must always be clean and neat.</li>
                    <li>Long hair must be tied back using navy, black or white hair bands.</li>
                    <li>Accessories may only be functional, not decorative.</li>
                    <li>No hair colour or streaks.</li>
                    <li>No faddish or eccentric hairstyles or nail polish.</li>
                    <li>Long fringes must be pinned back using navy, black or white hair clips.</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Boys' Uniform */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden">
              <div className="bg-primary text-white px-8 py-5">
                <h3 className="text-lg font-heading font-bold uppercase tracking-wider">Boys' Uniform Requirements</h3>
              </div>
              <div className="divide-y divide-slate-100">
                <div className="p-6 md:p-8 space-y-4">
                  <h4 className="font-heading font-bold text-secondary uppercase text-sm tracking-widest">Boys' Summer Uniform</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Navy shorts with a zip (no PE shorts)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Light blue shirt with school badge</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Long navy socks with light blue line</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Navy blue school hat with school badge. Cap may only be worn for sport</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Black school shoes (compulsory for chapel & assemblies) or navy rafters</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Navy jersey / Fleece. Anorak on rainy days only</span></li>
                  </ul>
                </div>
                <div className="p-6 md:p-8 space-y-4">
                  <h4 className="font-heading font-bold text-secondary uppercase text-sm tracking-widest">Boys' Winter Uniform</h4>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Navy shorts with a zip (no PE shorts)</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Light blue shirt with school badge</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Long navy socks with light blue line</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Navy blue school hat with school badge. Cap may only be worn for sport</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Black school shoes (compulsory for chapel & assemblies) or navy rafters</span></li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> <span>Navy jersey / Fleece</span></li>
                  </ul>
                </div>
                <div className="p-6 md:p-8 bg-slate-50/50 space-y-3">
                  <h4 className="font-heading font-bold text-slate-800 uppercase text-xs tracking-wider">Hair & Grooming (Boys)</h4>
                  <ol className="list-decimal pl-5 space-y-1.5 text-xs text-slate-500">
                    <li>Hair must always be clean and neat.</li>
                    <li>Hair colour and/or streaks are not allowed.</li>
                    <li>Hair must be short and neatly cut. Hair may not touch the collar, fall over the ears or hang over the eye brows.</li>
                    <li>No patterns may be cut into the hair.</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* Tracksuit and Sports Guidelines */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-center">
              <h4 className="font-heading font-bold text-slate-800 uppercase text-sm tracking-wider mb-4">School Tracksuit Policy</h4>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-secondary font-bold">•</span>
                  <span>Tracksuit pants may not be worn without the tracksuit jacket.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-secondary font-bold">•</span>
                  <span>School shoes must be worn with the formal tracksuit (running shoes are not permitted).</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl space-y-4">
              <h4 className="font-heading font-bold text-primary uppercase text-sm tracking-wider">P.E. & Activity Uniform</h4>
              <div className="space-y-4 text-slate-600 text-sm">
                <div>
                  <strong className="text-slate-800">Swimming:</strong> Navy costume or jammer, MH swimming cap, towel.
                </div>
                <div>
                  <strong className="text-slate-800">PE & Afternoon Sport:</strong> Navy boxer shorts, House t-shirt (red or green). Running shoes & gum guard are compulsory for hockey.
                </div>
                <div>
                  <strong className="text-slate-800">Summer Match Kit:</strong> Navy boxer shorts/skorts, navy blue sports shirts, running shoes.
                </div>
                <div>
                  <strong className="text-slate-800">Winter Match Kit:</strong> Navy boxer shorts/skorts, navy blue sports shirts, running shoes, and formal tracksuit.
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    "boarding-requirements": {
      title: "Boarding Requirements",
      subtitle: "Checklist and information pack for weekly and full-time boarders.",
      icon: ClipboardList,
      content: (
        <div className="space-y-8">
          <div className="prose max-w-none text-slate-600">
            <p className="text-lg leading-relaxed font-medium text-slate-800">
              Our boarding facilities provide a secure, structured, and caring Christian environment where students build lifelong friendships and independent life skills.
            </p>
            <p className="text-base mt-2">
              To ensure boarders settle in comfortably, please verify that all personal belongings, clothing, and beddings are clearly labeled with the student's name. Below is our recommended clothing and supplies list:
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-4">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg space-y-3">
              <h4 className="font-heading font-bold text-primary uppercase text-xs tracking-wider border-b pb-2">Linens & Bedding</h4>
              <ul className="text-slate-600 text-sm space-y-2">
                <li>• 1x Duvet and 2x covers</li>
                <li>• 2x Pillows and pillowcases</li>
                <li>• 2x Single fitted bedsheets</li>
                <li>• 2x Bath towels</li>
                <li>• 1x Mesh laundry bag</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg space-y-3">
              <h4 className="font-heading font-bold text-primary uppercase text-xs tracking-wider border-b pb-2">Personal Items</h4>
              <ul className="text-slate-600 text-sm space-y-2">
                <li>• Toothbrush, toothpaste, holder</li>
                <li>• Soap & lockable soapbox</li>
                <li>• Shampoo and hair comb/brush</li>
                <li>• Roll-on deodorant</li>
                <li>• Personal water flask</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg space-y-3">
              <h4 className="font-heading font-bold text-primary uppercase text-xs tracking-wider border-b pb-2">Casual Wear</h4>
              <ul className="text-slate-600 text-sm space-y-2">
                <li>• 3x Set of casual weekend wear</li>
                <li>• 2x Sets of comfortable pajamas</li>
                <li>• Slippers and house socks</li>
                <li>• Lightweight windbreaker jacket</li>
                <li>• 1x Pair of casual trainers</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    "calendars": {
      title: "Term Dates & Calendars",
      subtitle: "Keep up-to-date with current term schedules and key academic dates.",
      icon: Calendar,
      content: (
        <div className="space-y-8">
          <div className="prose max-w-none text-slate-600">
            <p className="text-lg leading-relaxed font-medium text-slate-800">
              Martin House operations follow a standard three-term calendar. Term dates are planned in advance to facilitate family arrangements.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-100 shadow-xl overflow-hidden max-w-2xl">
            <div className="bg-primary text-white px-8 py-5">
              <h3 className="text-lg font-heading font-bold uppercase tracking-wider">Academic Year Term Dates</h3>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h4 className="font-bold text-slate-800">Term 1</h4>
                  <p className="text-xs text-slate-400">Late Summer / Autumn</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1.5 bg-[#0c2865]/5 text-primary text-xs font-bold uppercase tracking-wider rounded-lg">Jan 13 - Apr 09</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <h4 className="font-bold text-slate-800">Term 2</h4>
                  <p className="text-xs text-slate-400">Winter Term</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1.5 bg-[#0c2865]/5 text-primary text-xs font-bold uppercase tracking-wider rounded-lg">May 05 - Aug 06</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-800">Term 3</h4>
                  <p className="text-xs text-slate-400">Spring / Early Summer</p>
                </div>
                <div className="text-right">
                  <span className="px-3 py-1.5 bg-[#0c2865]/5 text-primary text-xs font-bold uppercase tracking-wider rounded-lg">Sep 08 - Dec 03</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    "newsletters-and-publications": {
      title: "Newsletters & Publications",
      subtitle: "Latest announcements, terms circulars, and publications from Martin House.",
      icon: BookOpen,
      content: (
        <div className="space-y-8">
          <div className="prose max-w-none text-slate-600">
            <p className="text-lg leading-relaxed font-medium text-slate-800">
              Welcome to the Circulars & Publications section. We regularly publish updates to keep our parents and guardians informed of all school events, achievements, and notices.
            </p>
            <p className="text-base mt-2">
              Our development team is currently building the school administration portal. Once live, newsletters and term circulars will be instantly updated here. In the meantime, you can explore the temporary publications and guidelines archive below:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
            {[
              { title: "Weekly Circular - Week 8", desc: "Key highlights of the past week, details of upcoming sports fixtures against neighbouring schools, and weekend boarding schedule.", date: "June 2026" },
              { title: "Term 2 Academic Guide", desc: "Curriculum expectations, mid-term test schedule for prep and college students, and assessment criteria.", date: "May 2026" },
              { title: "Martin House Chronicle", desc: "Our annual publications compilation detailing creative writing awards, campus projects, and conservation highlights.", date: "December 2025" }
            ].map((pub, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg flex flex-col justify-between group hover:shadow-xl hover:border-secondary/20 transition-all duration-300">
                <div className="space-y-3">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">{pub.date}</span>
                  <h4 className="font-bold text-slate-800 group-hover:text-primary transition-colors">{pub.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">{pub.desc}</p>
                </div>
                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Format: PDF</span>
                  <button className="flex items-center gap-1.5 text-xs font-bold text-primary group-hover:text-secondary transition-colors uppercase">
                    <Download className="h-4 w-4" /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ),
    },
  };

  const currentSection = sections[activeSection] || sections["the-board"];
  const SectionIcon = currentSection.icon;

  return (
    <div className="min-h-screen bg-slate-50 font-body">
      <Navbar />

      <PageHero
        title="Parents Association"
        subtitle="All parent-focused guides, resources, and policy documents in one convenient portal."
        backgroundImage={heroImg}
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left Sidebar Menu */}
          <aside className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xl space-y-1 sticky top-32">
              <h3 className="px-4 text-[10px] font-black tracking-widest text-slate-400 uppercase mb-4">
                Parent Resources
              </h3>
              {Object.entries(sections).map(([key, config]) => {
                const Icon = config.icon;
                const isActive = activeSection === key;
                return (
                  <button
                    key={key}
                    onClick={() => navigate(`/parents/${key}`)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-[11px] font-bold uppercase tracking-wider rounded-xl transition-all duration-300 cursor-pointer ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-slate-600 hover:bg-slate-50 hover:text-primary"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="truncate text-left">{key.replace(/-/g, " ")}</span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Right Main Content */}
          <main className="lg:col-span-9 space-y-10">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-8"
            >
              <div className="border-b pb-6">
                <div className="flex items-center gap-3 mb-2 text-secondary">
                  <SectionIcon className="h-6 w-6" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Resources / {activeSection.replace(/-/g, " ")}</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-none mb-4">
                  {currentSection.title}
                </h1>
                <p className="text-base text-slate-500 font-medium">{currentSection.subtitle}</p>
              </div>

              {currentSection.content}
            </motion.div>
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ParentsPage;
