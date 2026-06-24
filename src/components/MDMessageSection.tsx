import { motion, useReducedMotion } from "framer-motion";
import headImg from "@/assets/head.png";
import { User } from "lucide-react";

const MDMessageSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-8 lg:py-12 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden flex flex-col lg:flex-row">
             <div className="lg:w-2/5 bg-gradient-to-br from-primary to-[#0d1f3c] p-12 lg:p-20 flex flex-col justify-center text-white relative overflow-hidden">
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 0.9 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 text-center"
              >
                <div className="w-56 h-56 lg:w-72 lg:h-72 rounded-full mx-auto mb-10 shadow-2xl overflow-hidden border-4 border-white/20">
                  <img
                    src={headImg}
                    alt="The Principal – Martin House"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="space-y-4">
                  <h3 className="text-white text-2xl font-heading font-bold">
                    The Principal <br /> Martin House
                  </h3>
                  <div className="h-1.5 w-16 bg-secondary/50 mx-auto rounded-full" />
                  <p className="text-primary font-bold tracking-wider text-[12px] bg-white px-6 py-2 rounded-full inline-block shadow-lg uppercase">
                    School Principal
                  </p>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-3/5 p-12 lg:p-16 flex flex-col justify-center relative bg-white">
              <motion.div
                initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 40 }}
                whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
                className="relative z-10 space-y-10"
              >
                <blockquote className="space-y-8">
                  <p className="border-l-4 border-secondary pl-10 italic text-slate-900 font-heading font-bold text-xl">
                    "At Martin House, we believe every child has the potential to achieve greatness. Our role is to
                    provide the environment, the guidance, and the inspiration to help them discover it."
                  </p>
                  <p className="text-base md:text-lg text-slate-500 leading-relaxed font-medium">
                    We are dedicated to nurturing not just academic achievement, but the whole person — developing
                    young men and women of character, resilience, and purpose who are ready to make a difference in
                    their world.
                  </p>
                </blockquote>

                <div className="pt-10 border-t border-slate-100">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
                    <div className="flex -space-x-3 pl-2">
                      {[...Array(4)].map((_, index) => (
                        <div
                          key={index}
                          className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-lg bg-primary/10 relative flex items-center justify-center"
                        >
                          <User className="w-6 h-6 text-primary/40" />
                        </div>
                      ))}
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-secondary text-white flex items-center justify-center text-[10px] font-black shadow-lg relative z-10">
                        +50
                      </div>
                    </div>
                    <div className="text-center sm:text-right">
                      <p className="text-[9px] text-slate-400 font-bold tracking-widest uppercase">Our Team</p>
                      <p className="text-[11px] font-bold text-slate-900 tracking-tight mt-1">
                        50+ Dedicated educators & staff
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MDMessageSection;
