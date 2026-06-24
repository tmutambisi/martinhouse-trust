import { Users, Shield, Handshake, Clock, Eye, Equal, Award, Heart } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";

const coreValues = [
  {
    icon: Users,
    title: "Student Centricity",
    description: "We put our students at the center of our educational mission, tailoring our academic and pastoral support to help each child thrive."
  },
  {
    icon: Shield,
    title: "Academic Integrity",
    description: "We uphold the highest moral standards, promoting honesty, respect, and responsibility in studies and daily conduct."
  },
  {
    icon: Handshake,
    title: "Collaboration",
    description: "We believe in the power of teamwork, encouraging positive cooperative learning between students, parents, and teachers."
  },
  {
    icon: Clock,
    title: "Reliability",
    description: "We are consistent and committed to educational excellence, ensuring a secure and supportive learning ecosystem."
  },
  {
    icon: Eye,
    title: "Openness",
    description: "We maintain transparent, open dialogue with parents and students, embracing feedback and innovative teaching methodologies."
  },
  {
    icon: Equal,
    title: "Inclusivity",
    description: "We provide fair and equal opportunities for all learners, celebrating diverse backgrounds and unique personal talents."
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We recognize and reward achievement across academics, sports, and arts, celebrating every student's personal milestones."
  },
  {
    icon: Heart,
    title: "Social Duty",
    description: "We instill a sense of community responsibility and active citizenship, encouraging students to give back to society."
  }
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.2 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const iconVariants: Variants = {
  hover: {
    rotate: 360,
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

const CoreValuesSection = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="py-16 lg:py-24 bg-slate-50 relative overflow-hidden font-body">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 mb-8 tracking-tight leading-[1.1]"
          >
            School <br /> <span className="text-primary">Core Values</span>
          </motion.h2>
          <motion.p 
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            className="text-xl text-slate-500 font-bold border-t border-slate-200 pt-8 mt-8 italic"
          >
            Nurturing character, academic excellence, and civic responsibility through our foundational values.
          </motion.p>
        </div>

        <motion.div 
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              variants={prefersReducedMotion ? {} : cardVariants}
              whileHover={prefersReducedMotion ? {} : "hover"}
              className="p-10 bg-white rounded-2xl border border-slate-100 flex flex-col items-start transition-colors"
            >
              <motion.div 
                variants={prefersReducedMotion ? {} : {
                  hover: { scale: 1.04, boxShadow: "0 10px 30px rgba(0,0,0,0.1)", transition: { type: "spring", stiffness: 300, damping: 20 } }
                }}
                className="w-full h-full absolute inset-0 rounded-2xl shadow-xl pointer-events-none z-[-1]"
                initial={{ boxShadow: "0 4px 6px rgba(0,0,0,0.05)" }}
              />
              
              <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-secondary/20 relative overflow-hidden">
                <motion.div variants={prefersReducedMotion ? {} : iconVariants}>
                  <value.icon className="h-7 w-7 text-white relative z-10" />
                </motion.div>
              </div>
              <h3 className="text-xl lg:text-xl font-heading font-bold text-slate-900 mb-4 tracking-tight">
                {value.title}
              </h3>
              <p className="text-sm font-medium text-slate-400 tracking-normal leading-relaxed">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
