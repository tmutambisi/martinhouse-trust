import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const divisions = [
  {
    label: "Prep School",
    sub: "Early Years – Year 7",
    description: "Nurturing curiosity, confidence and a lifelong love of learning through the Cambridge Primary Curriculum.",
    href: "/prep",
    color: "from-[#0c2865] to-[#0a1f4e]",
    accentColor: "bg-[#e8b84b]",
  },
  {
    label: "College",
    sub: "Forms 1 – 6 (Secondary)",
    description: "Cambridge Checkpoint, IGCSE, AS & A Level — academic excellence delivered by expert subject specialists.",
    href: "/college",
    color: "from-[#0c2865] to-[#081a40]",
    accentColor: "bg-[#e8b84b]",
  },
  {
    label: "Boarding",
    sub: "A Home Away from Home",
    description: "Safe, nurturing full-time and weekly boarding for Prep and College students, guided by our values of Honour, Respect and Compassion.",
    href: "/services",
    color: "from-[#0c2865] to-[#050f26]",
    accentColor: "bg-[#e8b84b]",
  },
];

const SchoolDivisionsBar = () => {
  return (
    <section className="py-0 bg-white relative z-10 -mt-1">
      {/* Section Label */}
      <div className="bg-[#0c2865] py-4 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h2 className="text-white font-heading font-black text-[11px] tracking-[0.3em] uppercase">
            School Divisions
          </h2>
          <div className="h-px flex-1 bg-white/10 mx-6" />
          <Link
            to="/services"
            className="text-white/70 hover:text-white text-[10px] font-bold tracking-widest uppercase flex items-center gap-1.5 transition-colors"
          >
            Explore All <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Division Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 border-t border-slate-100">
        {divisions.map((division, i) => (
          <motion.div
            key={division.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`relative overflow-hidden group border-r border-slate-100 last:border-r-0`}
          >
            <Link
              to={division.href}
              className="block h-full"
            >
              {/* Background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${division.color} opacity-0 group-hover:opacity-100 transition-all duration-500`} />
              
              {/* Content */}
              <div className="relative z-10 p-8 md:p-10 flex flex-col gap-3 min-h-[200px] justify-between group-hover:text-white transition-colors duration-500">
                <div>
                  {/* Accent bar */}
                  <div className={`w-8 h-1 ${division.accentColor} rounded-full mb-5 transition-all duration-300 group-hover:w-12`} />
                  
                  <p className="text-[10px] font-black tracking-[0.25em] uppercase text-slate-400 group-hover:text-white/60 transition-colors duration-300 mb-1">
                    {division.sub}
                  </p>
                  <h3 className="text-2xl md:text-3xl font-heading font-black text-[#0c2865] group-hover:text-white transition-colors duration-500 leading-tight">
                    {division.label}
                  </h3>
                  <p className="text-sm text-slate-500 group-hover:text-white/80 mt-3 leading-relaxed transition-colors duration-500 max-w-xs">
                    {division.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-[#0c2865] group-hover:text-[#e8b84b] transition-colors duration-500 mt-4">
                  <span className="text-[11px] font-black uppercase tracking-widest">Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SchoolDivisionsBar;
