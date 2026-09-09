import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useReducedMotion, useInView, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { useRef } from 'react';

const stats = [
  {
    id: 1,
    number: 80,
    suffix: "",
    title: "Hectares of Campus",
    bgColor: "bg-primary",
    textColor: "text-primary-foreground",
    pattern: "pattern-1", 
  },
  {
    id: 2,
    number: 2,
    suffix: "",
    title: "Prep & College",
    bgColor: "bg-secondary",
    textColor: "text-secondary-foreground",
    pattern: "pattern-2",
  },
  {
    id: 3,
    number: 35,
    suffix: "+",
    title: "Years of Educational Legacy",
    bgColor: "bg-white",
    textColor: "text-secondary",
    pattern: "pattern-3",
  }
];

// Helper component for animating numbers with framer-motion
const AnimatedCounter = ({ endValue, inView, duration = 2 }: { endValue: number, inView: boolean, duration?: number }) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest).toLocaleString());

  useEffect(() => {
    if (inView) {
      animate(count, endValue, {
        duration: duration,
        ease: "easeOut"
      });
    }
  }, [inView, endValue, duration, count]);

  return <motion.span>{rounded}</motion.span>;
};

const StatsSection = () => {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px", amount: 0.3 });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 20 
      }
    }
  };

  return (
    <section className="py-12 md:py-20 bg-slate-50 relative mt-2 md:mt-8 z-20 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div 
          ref={ref} 
          variants={prefersReducedMotion ? {} : containerVariants}
          initial={prefersReducedMotion ? false : "hidden"}
          animate={prefersReducedMotion || isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.id}
              variants={prefersReducedMotion ? {} : cardVariants}
              className={`relative overflow-hidden rounded-[40px] ${stat.bgColor} h-[380px] md:h-[400px] flex flex-col justify-end p-10 lg:p-12 shadow-2xl group transition-transform duration-500 hover:-translate-y-2`}
            >
              {/* Abstract Wave Patterns */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                {stat.pattern === 'pattern-1' && (
                  <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,80 Q25,90 50,70 T100,60 L100,100 L0,100 Z" fill="currentColor" />
                    <path d="M0,90 Q40,100 70,80 T100,70 L100,100 L0,100 Z" fill="transparent" stroke="currentColor" strokeWidth="1" />
                  </svg>
                )}
                {stat.pattern === 'pattern-2' && (
                  <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0,60 C30,90 70,30 100,70 L100,100 L0,100 Z" fill="transparent" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M-10,70 C20,100 60,40 110,80 L110,110 L-10,110 Z" fill="transparent" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                )}
                {stat.pattern === 'pattern-3' && (
                  <svg className="w-full h-full text-secondary" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <circle cx="90" cy="10" r="30" fill="transparent" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="90" cy="10" r="40" fill="transparent" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="90" cy="10" r="50" fill="transparent" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="90" cy="10" r="60" fill="transparent" stroke="currentColor" strokeWidth="0.5" />
                  </svg>
                )}
              </div>

              {/* Content */}
              <div className="relative z-10 flex flex-col justify-end h-full pt-10">
                <div className={`text-6xl lg:text-7xl font-heading mb-2 font-black tracking-tighter ${stat.textColor}`}>
                  {prefersReducedMotion ? (
                    stat.number
                  ) : (
                    <AnimatedCounter endValue={stat.number} inView={isInView} />
                  )}
                  <span className="text-4xl lg:text-5xl ml-1 font-semibold" style={{ WebkitTextStroke: '0' }}>{stat.suffix}</span>
                </div>
                <h3 className={`text-2xl lg:text-[28px] font-heading font-medium leading-tight pr-12 ${stat.textColor}`}>
                  {stat.title}
                </h3>
              </div>

              <div className="absolute bottom-0 right-0 w-[72px] h-[72px] bg-slate-50 rounded-tl-[32px] z-20 flex items-end justify-end p-2 transition-all">
                <div className="absolute top-0 -left-6 w-6 h-6 bg-transparent rounded-tr-3xl shadow-[5px_-5px_0_5px_#f8fafc] pointer-events-none" />
                <div className="absolute -top-6 right-0 w-6 h-6 bg-transparent rounded-br-3xl shadow-[5px_5px_0_5px_#f8fafc] pointer-events-none" />
                
                <Link to="/about" className="w-[48px] h-[48px] rounded-full bg-slate-800 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-lg group-hover:bg-primary z-30 relative">
                 <ArrowUpRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
