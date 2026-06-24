import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from "framer-motion";
import { BookOpen, Heart, Shield, Users } from "lucide-react";

// Image assets to populate placeholders
import girlsImg from "@/assets/secondary-school/sport/girls.jpg";
import sportsImg from "@/assets/primary-school/sports/sports4.jpg";

const CountUp = ({ endValue, inView, duration = 2 }: { endValue: number; inView: boolean; duration?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (value) => Math.round(value).toLocaleString());

  useEffect(() => {
    if (inView) {
      animate(count, endValue, { duration, ease: "easeOut" });
    }
  }, [inView, endValue, duration, count]);

  return <motion.span>{rounded}</motion.span>;
};

const highlights = [
  { icon: BookOpen, label: "Student Well-being", color: "bg-secondary" },
  { icon: Heart, label: "Academic Support", color: "bg-primary" },
  { icon: Shield, label: "Equal Opportunity", color: "bg-primary" },
  { icon: Users, label: "Inclusive Culture", color: "bg-secondary" },
];

const WomenEmpowermentSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <section className="py-8 lg:py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: -50 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-12"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 leading-[1.1] tracking-tight">
              Empowering <br />
              <span className="text-secondary relative inline-block">every learner</span>
            </h2>

            <p className="text-lg md:text-xl text-slate-500 leading-relaxed font-bold border-l-4 border-secondary/20 pl-8">
              We are committed to inclusive education that empowers{" "}
              <span className="text-secondary font-bold">every student</span> — regardless of background — to reach
              their full potential and contribute meaningfully to society.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {highlights.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 10 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-5 bg-white p-5 rounded-[2rem] border border-slate-100 shadow-lg hover:shadow-xl hover:border-secondary/20 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className={`w-12 h-12 ${item.color} rounded-2xl flex items-center justify-center text-white shadow-lg`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="text-[14px] font-bold tracking-normal text-slate-700 uppercase">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="pt-12 border-t border-slate-100" ref={statsRef}>
              <div className="flex flex-col sm:flex-row gap-8 sm:gap-16">
                <div>
                  <div className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-secondary tracking-tight mb-2">
                    {prefersReducedMotion ? "600" : <CountUp endValue={600} inView={statsInView} />}+
                  </div>
                  <div className="text-xs sm:text-base text-slate-400 font-bold tracking-wider uppercase">Girl students</div>
                </div>
                <div>
                  <div className="text-4xl md:text-5xl lg:text-7xl font-heading font-bold text-primary tracking-tight mb-2">
                    {prefersReducedMotion ? "100" : <CountUp endValue={100} inView={statsInView} />}%
                  </div>
                  <div className="text-xs sm:text-base text-slate-400 font-bold tracking-wider uppercase">Commitment</div>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-6 relative z-10 w-full mb-12">
            <div className="aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white relative bg-primary/10">
              <img
                src={girlsImg}
                alt="Empowering girls at Martin House"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white mt-20 relative bg-secondary/10">
              <img
                src={sportsImg}
                alt="Student sports and campus life"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WomenEmpowermentSection;
