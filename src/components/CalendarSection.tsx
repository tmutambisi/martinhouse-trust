import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Download,
  Trophy,
  BookOpen,
  Clock,
  MapPin,
  CheckCircle,
  ChevronRight,
  Sparkles,
  ArrowDownToLine,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TermDate {
  term: string;
  name: string;
  season: string;
  duration: string;
  halfTerm: string;
  status: "current" | "upcoming" | "planning";
  highlights: string[];
}

interface FixtureItem {
  id: string;
  date: string;
  time: string;
  event: string;
  category: "Prep" | "College" | "All School";
  location: string;
  sportOrType: string;
  opponent?: string;
}

const termDates: TermDate[] = [
  {
    term: "Term 1",
    name: "Easter Term 2026",
    season: "Late Summer / Autumn",
    duration: "13 Jan 2026 – 09 Apr 2026",
    halfTerm: "20 Feb – 23 Feb 2026",
    status: "current",
    highlights: [
      "New Scholar Induction & Boarder Move-in",
      "Inter-House Athletics Championship",
      "Cambridge Checkpoint Prep Seminars",
      "Speech & Drama Showcase",
    ],
  },
  {
    term: "Term 2",
    name: "Trinity Term 2026",
    season: "Winter Term",
    duration: "05 May 2026 – 06 Aug 2026",
    halfTerm: "19 Jun – 22 Jun 2026",
    status: "upcoming",
    highlights: [
      "Rugby & Girls' Netball Invitational Tournaments",
      "Mid-Year Formative Assessments",
      "Kalundu Farm Conservation Field Trips",
      "Annual Inter-School Debating Gala",
    ],
  },
  {
    term: "Term 3",
    name: "Michaelmas Term 2026",
    season: "Spring / Early Summer",
    duration: "08 Sep 2026 – 03 Dec 2026",
    halfTerm: "16 Oct – 19 Oct 2026",
    status: "planning",
    highlights: [
      "Cambridge IGCSE & A-Level Final Examinations",
      "Prep School Musical Production",
      "Annual Speech Day & Prize Giving Ceremony",
      "Carol Service & Leavers' Dinner",
    ],
  },
];

const fixtureList: FixtureItem[] = [
  {
    id: "fix-1",
    date: "Sat, 21 Mar 2026",
    time: "08:30 AM",
    event: "ISAZ U13 Rugby & Girls' Netball Tournament",
    category: "Prep",
    location: "Martin House Main Oval",
    sportOrType: "Rugby & Netball",
    opponent: "Invitational ISAZ Schools",
  },
  {
    id: "fix-2",
    date: "Wed, 25 Mar 2026",
    time: "02:00 PM",
    event: "College 1st XI Cricket vs Baobab College",
    category: "College",
    location: "Baobab Sports Complex",
    sportOrType: "Cricket",
    opponent: "Baobab College",
  },
  {
    id: "fix-3",
    date: "Fri, 03 Apr 2026",
    time: "09:00 AM",
    event: "Inter-House Cross Country & Farm Run",
    category: "All School",
    location: "Kalundu Farm Trails",
    sportOrType: "Athletics",
  },
  {
    id: "fix-4",
    date: "Thu, 09 Apr 2026",
    time: "10:30 AM",
    event: "Term 1 Final Assembly & Academic Honors",
    category: "All School",
    location: "School Hall & Quad",
    sportOrType: "Academic",
  },
  {
    id: "fix-5",
    date: "Sat, 16 May 2026",
    time: "09:00 AM",
    event: "College Football Derby vs Chengelo",
    category: "College",
    location: "Martin House Sports Pitch 1",
    sportOrType: "Football",
    opponent: "Chengelo School",
  },
  {
    id: "fix-6",
    date: "Fri, 29 May 2026",
    time: "01:30 PM",
    event: "Prep Swimming Gala & Water Polo",
    category: "Prep",
    location: "Aquatic Centre",
    sportOrType: "Swimming",
  },
];

export const CalendarSection = () => {
  const [activeTab, setActiveTab] = useState<"terms" | "fixtures">("terms");
  const [filterDivision, setFilterDivision] = useState<"All" | "Prep" | "College">("All");

  const filteredFixtures = fixtureList.filter((item) => {
    if (filterDivision === "All") return true;
    return item.category === filterDivision || item.category === "All School";
  });

  const handleDownloadCalendar = (docName: string) => {
    // Generate a structured readable printable summary for families
    const content = `MARTIN HOUSE TRUST SCHOOL - 2026 CALENDAR & TERM DATES
Kalundu Farm, Chisamba, Zambia
---------------------------------------------------------
DOCUMENT: ${docName}
ACADEMIC YEAR: 2026
ETHOS: Prep and College Programmes

TERM 1 (Easter Term 2026):
Dates: 13 January 2026 - 09 April 2026
Half-Term Break: 20 February - 23 February 2026

TERM 2 (Trinity Term 2026):
Dates: 05 May 2026 - 06 August 2026
Half-Term Break: 19 June - 22 June 2026

TERM 3 (Michaelmas Term 2026):
Dates: 08 September 2026 - 03 December 2026
Half-Term Break: 16 October - 19 October 2026

KEY FIXTURES & CONTACT:
Prep & College Administration: info@martinhouseschool.com
Phone: +260 962 143 920
Parent Portal: https://martinhouse-trust.vercel.app/parents/calendars
---------------------------------------------------------
Official Martin House Publication`;

    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${docName.toLowerCase().replace(/\s+/g, "-")}-2026.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="calendars-section" className="py-20 lg:py-28 bg-[#f8f9fc] relative overflow-hidden font-body">
      {/* Decorative background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0c2865]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#e8b84b]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 lg:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-3 max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0c2865]/10 border border-[#0c2865]/15 text-[#0c2865] text-xs font-bold uppercase tracking-widest">
              <CalendarIcon className="w-3.5 h-3.5 text-[#0c2865]" />
              Academic Schedules & Fixtures
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-black text-slate-900 tracking-tight leading-[1.1]">
              Calendars & <span className="text-[#0c2865]">Term Dates</span>
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              Stay synchronized with Martin House term schedules, mid-term breaks, Cambridge assessment milestones, and Prep & College sports fixtures.
            </p>
          </motion.div>

          {/* Quick PDF Downloads & Tab Switcher */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex p-1 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <button
                onClick={() => setActiveTab("terms")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === "terms"
                    ? "bg-[#0c2865] text-white shadow-md"
                    : "text-slate-600 hover:text-[#0c2865]"
                }`}
              >
                Term Schedules
              </button>
              <button
                onClick={() => setActiveTab("fixtures")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                  activeTab === "fixtures"
                    ? "bg-[#0c2865] text-white shadow-md"
                    : "text-slate-600 hover:text-[#0c2865]"
                }`}
              >
                Sports & Events
              </button>
            </div>

            <Button
              onClick={() => handleDownloadCalendar("Martin-House-Term-Dates-Schedule")}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-xs uppercase tracking-wider h-10 px-4 rounded-xl shadow-sm flex items-center gap-2"
            >
              <ArrowDownToLine className="w-4 h-4" />
              Download Schedule
            </Button>
          </div>
        </div>

        {/* Tab 1: Term Schedules */}
        {activeTab === "terms" && (
          <motion.div
            key="terms-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {termDates.map((item, idx) => (
              <div
                key={item.term}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 md:p-8 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
              >
                {/* Top Accent Stripe */}
                <div
                  className={`absolute top-0 left-0 right-0 h-1.5 ${
                    item.status === "current"
                      ? "bg-[#0c2865]"
                      : item.status === "upcoming"
                      ? "bg-[#e8b84b]"
                      : "bg-slate-300"
                  }`}
                />

                <div className="space-y-5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400">
                      {item.term}
                    </span>
                    {item.status === "current" && (
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full uppercase tracking-wider flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        In Session
                      </span>
                    )}
                    {item.status === "upcoming" && (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        Next Term
                      </span>
                    )}
                    {item.status === "planning" && (
                      <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full uppercase tracking-wider">
                        Scheduled
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="text-xl font-heading font-black text-slate-900 group-hover:text-[#0c2865] transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold mt-0.5">{item.season}</p>
                  </div>

                  {/* Dates Box */}
                  <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500 font-medium">Session:</span>
                      <strong className="text-slate-900 font-bold">{item.duration}</strong>
                    </div>
                    <div className="flex items-center justify-between text-xs border-t border-slate-200/60 pt-2">
                      <span className="text-slate-500 font-medium">Half-Term:</span>
                      <span className="text-[#0c2865] font-bold">{item.halfTerm}</span>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="space-y-2 pt-2">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                      Key Highlights:
                    </p>
                    <ul className="space-y-2">
                      {item.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                          <CheckCircle className="w-3.5 h-3.5 text-[#0c2865] shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => handleDownloadCalendar(`${item.term}-${item.name}`)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-[#0c2865] hover:text-white text-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200"
                  >
                    <Download className="w-3.5 h-3.5" /> Download Term Summary
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Tab 2: Sports & Events Fixtures */}
        {activeTab === "fixtures" && (
          <motion.div
            key="fixtures-tab"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="space-y-6"
          >
            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mr-2">
                <Filter className="w-3.5 h-3.5" /> Filter Division:
              </span>
              {(["All", "Prep", "College"] as const).map((division) => (
                <button
                  key={division}
                  onClick={() => setFilterDivision(division)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors ${
                    filterDivision === division
                      ? "bg-[#0c2865] text-white"
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {division === "All" ? "All Fixtures" : `${division} Only`}
                </button>
              ))}
            </div>

            {/* Fixture cards grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredFixtures.map((fix) => (
                <div
                  key={fix.id}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-[#0c2865]/10 text-[#0c2865]">
                        {fix.category}
                      </span>
                      <span className="text-xs font-bold text-slate-400">{fix.sportOrType}</span>
                    </div>

                    <h4 className="text-base font-heading font-black text-slate-900 group-hover:text-[#0c2865] transition-colors leading-snug">
                      {fix.event}
                    </h4>

                    {fix.opponent && (
                      <p className="text-xs font-medium text-slate-500">
                        Vs: <span className="font-bold text-slate-700">{fix.opponent}</span>
                      </p>
                    )}

                    <div className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-secondary shrink-0" />
                        <span>{fix.date} · {fix.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-secondary shrink-0" />
                        <span>{fix.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      ISAZ Registered
                    </span>
                    <button
                      onClick={() => handleDownloadCalendar(`Fixture-${fix.event}`)}
                      className="text-[#0c2865] hover:text-secondary font-bold flex items-center gap-1 transition-colors uppercase tracking-wider"
                    >
                      Export <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Parent Portal Footnote banner */}
        <div className="mt-12 p-6 md:p-8 rounded-3xl bg-gradient-to-r from-[#0c2865] to-[#081a40] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-lg md:text-xl font-heading font-black flex items-center justify-center md:justify-start gap-2">
              <Sparkles className="w-5 h-5 text-secondary" />
              Need live fixture reminders & Cambridge assessment updates?
            </h4>
            <p className="text-white/75 text-xs md:text-sm">
              Parents can access real-time circulars, sports schedules, and academic reports via the Parent Portal.
            </p>
          </div>
          <a
            href="/parents/calendars"
            className="px-6 py-3 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-transform hover:scale-105 shadow-md shrink-0"
          >
            Go to Parents Hub
          </a>
        </div>

      </div>
    </section>
  );
};

export default CalendarSection;
