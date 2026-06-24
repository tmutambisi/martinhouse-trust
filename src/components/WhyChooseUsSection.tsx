import {
  BadgeCheck,
  Users,
  BookOpen,
  GraduationCap,
  Building,
  Heart
} from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";

const reasons = [
  {
    icon: BadgeCheck,
    title: "Prep, Primary & College",
    description: "A complete pathway from early years through Cambridge A Levels on one beautiful campus."
  },
  {
    icon: BookOpen,
    title: "British & Cambridge Curriculum",
    description: "National Curriculum for England in Prep and Cambridge qualifications in College."
  },
  {
    icon: Heart,
    title: "Christian Ethos",
    description: "A caring community rooted in faith, compassion, and service to others."
  },
  {
    icon: Building,
    title: "Safe & Secure Boarding",
    description: "Weekly and full-time boarding with supervised prep, balanced meals, and a home-away-from-home feel."
  },
  {
    icon: Users,
    title: "Small Class Sizes",
    description: "Personal attention that helps every learner grow academically and emotionally."
  },
  {
    icon: GraduationCap,
    title: "Outdoor Education",
    description: "Adventure programmes and afternoon activities on 80 hectares of natural surroundings."
  }
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 1, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const iconVariants: Variants = {
  hidden: { scale: 0 },
  visible: { 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 }
  }
};


const WhyChooseUsSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-24 lg:py-36 bg-primary overflow-hidden text-white font-body">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/20 rounded-full animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/40 rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">

          {/* Left: Strategic Content */}
          <div className="lg:col-span-5">
            <motion.div
              initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: -30 }}
              whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-10"
            >
              <div>
                <motion.span
                  initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 10 }}
                  whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-block px-5 py-2 bg-secondary/20 backdrop-blur-md text-secondary rounded-full text-[10px] font-bold tracking-widest uppercase mb-8 border border-secondary/30"
                >
                  The Martin House Advantage
                </motion.span>
                <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading font-extrabold text-white leading-[1.05] tracking-tight">
                  Why families <br />
                  <span className="text-secondary italic">choose us</span>
                </h2>
              </div>

              <p className="text-lg md:text-xl text-white/70 leading-relaxed font-medium">
                Our unique day and boarding school offers British and Cambridge pathways, a Christian ethos, small classes, and a campus where children can learn, play, and grow surrounded by nature.
              </p>

              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <div className="text-3xl font-heading font-black text-accent mb-2">80</div>
                  <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Hectares</div>
                </div>
                <div>
                  <div className="text-3xl font-heading font-black text-accent mb-2">35+ yrs</div>
                  <div className="text-[10px] font-bold tracking-widest text-white/40 uppercase">Legacy</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Reasons Grid */}
          <div className="lg:col-span-7">
            <motion.div 
              variants={prefersReducedMotion ? {} : containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-2 gap-4 lg:gap-6"
            >
              {reasons.map((reason, index) => (
                <motion.div
                  key={index}
                  variants={prefersReducedMotion ? {} : itemVariants}
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  className="group p-8 rounded-[2rem] bg-white/5 border border-white/5 backdrop-blur-xl hover:bg-white/10 hover:border-secondary/30 transition-all duration-500 shadow-2xl"
                >
                  <motion.div 
                    variants={prefersReducedMotion ? {} : iconVariants}
                    className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8 border border-white/10 group-hover:bg-secondary transition-all duration-500"
                  >
                    <reason.icon className="h-6 w-6 text-white" />
                  </motion.div>
                  <h3 className="text-lg font-heading font-bold text-white mb-3 tracking-tight group-hover:text-secondary transition-colors uppercase">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-white/60 leading-relaxed font-normal p-0 group-hover:text-white transition-colors">
                    {reason.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
