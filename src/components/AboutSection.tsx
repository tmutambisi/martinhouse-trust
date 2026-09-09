import { GraduationCap, Trophy, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from "framer-motion";
import prepInGarden from "@/assets/prep-ingarden.jpg";
import highxl from "@/assets/highxl.jpg";

const AboutSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const corePrinciples = [
    "ACADEMIC EXCELLENCE & RIGOUR",
    "HOLISTIC STUDENT DEVELOPMENT",
    "INNOVATION IN TEACHING & LEARNING"
  ];

  return (
    <section id="about" className="py-8 lg:py-12 bg-white relative overflow-hidden font-body">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-24 items-center">

          {/* Left Content */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -60 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-8 relative pl-12 md:pl-24"
          >
            {/* Vertical text */}
            <div className="absolute left-0 top-0 h-full w-12 flex items-start justify-center">
              <h2 className="origin-top-left -rotate-90 text-[clamp(4rem,7vw,6.5rem)] font-heading font-black tracking-widest text-transparent uppercase opacity-20 pointer-events-none whitespace-nowrap translate-y-[220px]" style={{ WebkitTextStroke: '2px #0f172a' }}>
                About Us
              </h2>
            </div>

            <div>
              <h2 className="text-3xl md:text-4xl lg:text-4xl font-heading font-bold text-foreground mb-8">
                Who We Are
              </h2>
            </div>

            <div className="space-y-6">
              <p className="text-[15px] text-foreground font-medium leading-relaxed font-body">
                Martin House Trust School is a day and boarding school on Kalundu Farm, Chisamba, near Lusaka. Surrounded by 80 hectares of indigenous vegetation, we offer Prep and College programmes with a Christian ethos.
              </p>
              <p className="text-[15px] text-foreground leading-relaxed font-body">
                We aim to develop academically and emotionally prepared young people who respect their natural environment, play for the love of the game, and give generously to their community.
              </p>
            </div>

            {/* Core Principles Cards */}
            <div className="grid gap-4">
              {corePrinciples.map((principle, index) => (
                <div key={index} className="flex items-center gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all duration-300 cursor-default">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                    <CheckCircle2 className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <span className="text-[13px] font-bold tracking-normal text-foreground group-hover:text-primary transition-colors uppercase">{principle}</span>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-10 pt-10 border-t border-slate-100">
              <div className="space-y-1 sm:space-y-2">
                <div className="text-[clamp(1.2rem,3vw,2rem)] font-heading font-bold text-foreground tracking-tight">22 years</div>
                <div className="text-xs sm:text-[15px] text-primary font-bold tracking-wider leading-none uppercase">Of Prep Excellence</div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <div className="text-[clamp(1.2rem,3vw,2rem)] font-heading font-bold text-foreground tracking-tight">250+</div>
                <div className="text-xs sm:text-[15px] text-primary font-bold tracking-wider leading-none uppercase">Students enrolled</div>
              </div>
              <div className="space-y-1 sm:space-y-2">
                <div className="text-[clamp(1.2rem,3vw,2rem)] font-heading font-bold text-foreground tracking-tight">7 years</div>
                <div className="text-xs sm:text-[15px] text-primary font-bold tracking-wider leading-none uppercase">Of College Excellence</div>
              </div>
            </div>
          </motion.div>

          {/* Image Gallery - Right Content */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: 60 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="grid grid-cols-2 gap-8 relative"
          >
            <div className="space-y-8">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-[8px] border-white group relative bg-primary/10">
                <img src={prepInGarden} alt="Martin House Primary garden campus" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>

              <div className="aspect-square bg-primary rounded-2xl p-10 flex flex-col justify-between text-white shadow-2xl transition-all duration-300 group hover:bg-secondary">
                <Trophy className="w-8 h-8 text-secondary group-hover:text-white transition-colors" />
                <div>
                  <h3 className="card-heading font-bold tracking-tight leading-none mb-4">Cambridge Curriculum</h3>
                  <p className="text-[11px] font-bold tracking-wider opacity-60 group-hover:opacity-100 uppercase">Prep & College</p>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div className="aspect-square bg-secondary rounded-2xl p-10 flex flex-col justify-between text-white shadow-2xl transition-all duration-300 group hover:bg-primary">
                <GraduationCap className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
                <div>
                  <h3 className="card-heading font-bold tracking-tight leading-none mb-4">Chisamba Campus</h3>
                  <p className="text-[11px] font-bold tracking-wider opacity-60 group-hover:opacity-100 uppercase">Kalundu Farm</p>
                </div>
              </div>

              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-[8px] border-white group relative bg-secondary/10">
                <img src={highxl} alt="Martin House College campus grounds" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
