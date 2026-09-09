import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Lock,
  Calendar,
  Trophy,
  BookOpen,
  FileText,
  Bell,
  ArrowRight,
  ShieldCheck,
  Download,
  ExternalLink,
  GraduationCap
} from "lucide-react";
import { Link } from "react-router-dom";

interface ParentPortalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ParentPortalModal: React.FC<ParentPortalModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"quick-links" | "login">("quick-links");
  const [parentEmail, setParentEmail] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loginFeedback, setLoginFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulatedLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentEmail || !studentId) {
      setLoginFeedback("Please provide your registered parent email and learner admission ID.");
      return;
    }
    setLoginFeedback("Authentication verified. Redirecting you to the secure portal dashboard...");
    setTimeout(() => {
      onClose();
      window.location.href = "/parents/calendars";
    }, 1200);
  };

  const portalQuickLinks = [
    {
      title: "Term Dates & Schedules",
      desc: "Full 2026 academic calendar with half-term dates and session openings.",
      icon: Calendar,
      href: "/parents/calendars",
      tag: "Updated",
    },
    {
      title: "Prep & College Sports Fixtures",
      desc: "ISAZ matches, athletics galas, rugby tournaments, and weekend fixtures.",
      icon: Trophy,
      href: "/parents/calendars",
      tag: "Live",
    },
    {
      title: "Weekly Newsletters & Circulars",
      desc: "Latest communications from the Principal, Head of Prep, and Head of College.",
      icon: FileText,
      href: "/parents/newsletters-and-publications",
      tag: "Weekly",
    },
    {
      title: "Uniform & Boarding Guidelines",
      desc: "Official equipment checklists, casual wear regulations, and dormitory items.",
      icon: BookOpen,
      href: "/parents/uniform-requirements",
      tag: "Guides",
    },
    {
      title: "Cambridge Assessment Portal",
      desc: "Checkpoint, IGCSE, AS/A-Level exam statements and academic performance records.",
      icon: GraduationCap,
      href: "/highschool/academics",
      tag: "Exams",
    },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100000] flex items-center justify-center p-4 sm:p-6 font-body">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 260 }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-100 flex flex-col max-h-[90vh]"
        >
          {/* Header Banner */}
          <div className="bg-gradient-to-r from-[#0c2865] via-[#0e317d] to-[#0c2865] p-6 md:p-8 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close portal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-white/90 text-xs font-black uppercase tracking-widest mb-2">
              <ShieldCheck className="w-4 h-4 text-white" />
              <span>Official Parent Gateway</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-heading font-black tracking-tight leading-tight">
              Martin House Parent Portal
            </h3>
            <p className="text-white/80 text-xs md:text-sm mt-1.5 max-w-md">
              Secure family access to term schedules, sports fixtures, newsletters, and academic updates.
            </p>

            {/* Sub Tabs */}
            <div className="flex items-center gap-2 mt-6 pt-4 border-t border-white/15">
              <button
                onClick={() => setActiveTab("quick-links")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "quick-links"
                    ? "bg-white text-[#0c2865] shadow-md"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                Direct Access Hub
              </button>
              <button
                onClick={() => setActiveTab("login")}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                  activeTab === "login"
                    ? "bg-white text-[#0c2865] shadow-md"
                    : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                Parent Sign In
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 md:p-8 overflow-y-auto flex-1 space-y-6">
            {activeTab === "quick-links" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Frequently Accessed by Parents:
                  </span>
                  <span className="text-[11px] font-bold text-[#0c2865] bg-[#0c2865]/10 px-2.5 py-0.5 rounded-full border border-[#0c2865]/20">
                    ● Term 1 Active
                  </span>
                </div>

                <div className="grid gap-3">
                  {portalQuickLinks.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={i}
                        to={item.href}
                        onClick={onClose}
                        className="p-4 rounded-2xl border border-slate-200/90 hover:border-[#0c2865] bg-white hover:bg-slate-50/80 transition-all flex items-center justify-between group shadow-sm"
                      >
                        <div className="flex items-start gap-3.5">
                          <div className="p-2.5 rounded-xl bg-[#0c2865]/10 text-[#0c2865] group-hover:bg-[#0c2865] group-hover:text-white transition-colors shrink-0 mt-0.5">
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-heading font-bold text-slate-900 group-hover:text-[#0c2865] transition-colors">
                                {item.title}
                              </h4>
                              <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                                {item.tag}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 leading-normal">
                              {item.desc}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#0c2865] group-hover:translate-x-1 transition-all shrink-0 ml-3" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {activeTab === "login" && (
              <form onSubmit={handleSimulatedLogin} className="space-y-4">
                <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 text-xs text-amber-900 leading-relaxed">
                  <strong className="block font-bold mb-0.5">School Management System Notice:</strong>
                  Enter your registered parent email address and your child's student admission number to view confidential academic reports.
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Parent / Guardian Email
                  </label>
                  <input
                    type="email"
                    value={parentEmail}
                    onChange={(e) => setParentEmail(e.target.value)}
                    placeholder="parent@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0c2865] focus:ring-2 focus:ring-[#0c2865]/10"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Student ID or Admission Number
                  </label>
                  <input
                    type="text"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    placeholder="e.g. MH-2026-084"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#0c2865] focus:ring-2 focus:ring-[#0c2865]/10"
                  />
                </div>

                {loginFeedback && (
                  <div className="p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-medium">
                    {loginFeedback}
                  </div>
                )}

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => {
                      setParentEmail("parent@martinhouse.ac.zm");
                      setStudentId("MH-2026-DEMO");
                    }}
                    className="text-xs text-[#0c2865] hover:underline font-semibold"
                  >
                    Use Demo Credentials
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#0c2865] hover:bg-[#0a2153] text-white font-heading font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 shadow-md"
                  >
                    <Lock className="w-4 h-4" /> Verify & Enter Portal
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Footer Bar */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <span>Kalundu Farm, Chisamba · Need help?</span>
            <a
              href="mailto:info@martinhouseschool.com"
              className="font-bold text-[#0c2865] hover:underline flex items-center gap-1"
            >
              Contact School Administration <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ParentPortalModal;
