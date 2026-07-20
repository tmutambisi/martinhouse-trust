import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const accreditations = [
  {
    name: "Cambridge International",
    detail: "Checkpoint · IGCSE · AS & A Level",
    badge: "CI",
    color: "bg-[#0c2865]",
  },
  {
    name: "IBSC Member",
    detail: "International Boys' Schools Coalition",
    badge: "IB",
    color: "bg-slate-700",
  },
  {
    name: "ISAZ Member",
    detail: "Independent Schools Association of Zambia",
    badge: "IS",
    color: "bg-slate-600",
  },
  {
    name: "Cambridge Primary",
    detail: "British National Curriculum Standards",
    badge: "CP",
    color: "bg-[#0c2865]",
  },
];

const AccreditationBar = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5 }}
      className="bg-slate-50 border-y border-slate-100 py-8 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Label */}
          <div className="flex items-center gap-3 shrink-0">
            <Award className="w-5 h-5 text-[#0c2865]" />
            <span className="text-[11px] font-black tracking-[0.25em] uppercase text-slate-500">
              Accreditations & Memberships
            </span>
          </div>

          {/* Divider */}
          <div className="hidden md:block h-8 w-px bg-slate-200" />

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-4 md:gap-8">
            {accreditations.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-center gap-3 group"
              >
                <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center shrink-0 shadow-sm`}>
                  <span className="text-white font-black text-[10px] tracking-wide">{item.badge}</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-[11px] font-black text-slate-700 tracking-tight leading-none">{item.name}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{item.detail}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="md:ml-auto shrink-0">
            <a
              href="https://www.cambridgeinternational.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] font-black tracking-widest uppercase text-[#0c2865] hover:text-slate-600 transition-colors"
            >
              Verify Accreditation
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default AccreditationBar;
