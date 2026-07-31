import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronLeft } from "lucide-react";

// Slide background images
import labImg from "@/assets/primary-school/sports/lab.jpg";
import random3Img from "@/assets/primary-school/random/random3.jpg";
import sport1Img from "@/assets/primary-school/sports/sport1.jpg";
import musicImg from "@/assets/secondary-school/sport/music.jpg";
import random1Img from "@/assets/primary-school/random/random1.jpg";

// Secondary school navbar images
import sNav1 from "@/assets/secondary-school/navbar/nav1.jpg";
import sNav2 from "@/assets/secondary-school/navbar/nav2.jpg";
import sNav3 from "@/assets/secondary-school/navbar/nav3.jpg";
import navbarImg from "@/assets/navbar.jpg";

const slides = [
  {
    id: 1,
    title: "Welcome to Martin House",
    category: "Martin House Trust School",
    description: "A day and boarding school tucked safely on Kalundu Farm, Chisamba — surrounded by 80 hectares of indigenous vegetation, sports grounds, and well-equipped classrooms.",
    bgColor: "#0c2865",
    image: navbarImg,
    dark: true,
  },
  {
    id: 2,
    title: "Academics That Last",
    category: "Prep & College",
    description: "Cambridge Curriculum in Prep and Cambridge in College, with continuous assessment, small classes, and a computer centre with internet access.",
    bgColor: "#0c2865",
    image: sNav1,
    dark: true,
  },
  {
    id: 3,
    title: "Boarding & Community",
    category: "A Home Away From Home",
    description: "Weekly and full-time boarding with wholesome meals, supervised prep, and a caring Christian ethos where lifelong friendships are formed.",
    bgColor: "#0c2865",
    image: sNav2,
    dark: true,
  },
  {
    id: 4,
    title: "Sports & Activities",
    category: "Playing for the Love of the Game",
    description: "Afternoon activities, outdoor education, and adventure programmes that encourage balance, teamwork, and physical wellbeing.",
    bgColor: "#0c2865",
    image: sNav3,
    dark: true,
  },
  {
    id: 5,
    title: "Culture & Creativity",
    category: "Arts & Expression",
    description: "Music, drama, public speaking, and fine arts programmes that nurture confidence, creativity, and character beyond the classroom.",
    bgColor: "#0c2865",
    image: musicImg,
    dark: true,
  },
  {
    id: 6,
    title: "Community Outreach",
    category: "Learning for Life",
    description: "We develop compassionate young people who understand that small acts of kindness make a big difference in the lives of others.",
    bgColor: "#0c2865",
    image: random1Img,
    dark: true,
  },
];

// Animation Variants
const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
    }
  },
  exit: {
    opacity: 0,
    x: -60,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } 
  }
};

const subtextVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { delay: 0.4, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } 
  }
};

const ctaVariants: Variants = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    transition: { delay: 0.55, duration: 0.5, ease: "easeOut" } 
  }
};


const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const resetAutoPlay = useCallback((fn: () => void) => {
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    autoPlayRef.current = setInterval(fn, 7000);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const handleNext = useCallback(() => {
    nextSlide();
    resetAutoPlay(nextSlide);
  }, [nextSlide, resetAutoPlay]);

  const handlePrev = useCallback(() => {
    prevSlide();
    resetAutoPlay(nextSlide);
  }, [prevSlide, nextSlide, resetAutoPlay]);

  useEffect(() => {
    autoPlayRef.current = setInterval(nextSlide, 7000);
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [nextSlide]);

  const activeSlide = slides[currentIndex];

  return (
    <section
      id="home"
      className="relative w-full bg-slate-50 pt-[100px] md:pt-[140px] pb-12 px-4 md:px-8 lg:px-12 font-body overflow-x-hidden"
    >
      <div className="relative w-full max-w-[1700px] mx-auto group">

        {/* ── LEFT ARROW ── */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center z-40 group/btn">
          <motion.button
            onClick={handlePrev}
            whileHover={prefersReducedMotion ? {} : { scale: 1 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.9, rotate: -5 }}
            initial={{ scale: 0.9 }}
            aria-label="Previous slide"
            className="w-12 md:w-16 h-24 md:h-32 bg-primary rounded-r-[24px] md:rounded-r-[32px] flex items-center justify-center cursor-pointer transition-colors hover:bg-primary/90 shadow-sm"
          >
            <ChevronLeft className="text-white w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
          <div className="absolute bottom-full left-0 w-6 h-6 md:w-[32px] md:h-[32px] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 24H24C10.745 24 0 13.255 0 0V24Z" fill="#0c2865" />
            </svg>
          </div>
          <div className="absolute top-full left-0 w-6 h-6 md:w-[32px] md:h-[32px] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0 0H24C10.745 0 0 10.745 0 24V0Z" fill="#0c2865" />
            </svg>
          </div>
        </div>

        {/* ── CAROUSEL CONTAINER ── */}
        <div className="relative w-full h-[65vh] md:h-[75vh] min-h-[450px] md:min-h-[550px] rounded-3xl md:rounded-[48px] overflow-hidden shadow-xl mx-auto">

          {/* Background colour/image — crossfade between slides, no flash */}
          <motion.div
            key={`bg-${currentIndex}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 z-0 bg-cover bg-center"
            style={{ 
              backgroundColor: activeSlide.bgColor,
              backgroundImage: activeSlide.image ? `url(${activeSlide.image})` : "none"
            }}
          >
            {/* Dark overlay for images to keep text readable */}
            {activeSlide.image && (
              <div className="absolute inset-0 bg-black/45 z-0" />
            )}
            {/* Subtle geometric pattern — only on dark slides, no image */}
            {activeSlide.dark && !activeSlide.image && (
              <div className="absolute inset-0 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
                  <defs>
                    <pattern id={`grid-${currentIndex}`} width="60" height="60" patternUnits="userSpaceOnUse">
                      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#grid-${currentIndex})`}/>
                  <circle cx="650" cy="100" r="200" fill="none" stroke="white" strokeWidth="1" opacity="0.5"/>
                  <circle cx="150" cy="500" r="150" fill="none" stroke="white" strokeWidth="1" opacity="0.4"/>
                </svg>
              </div>
            )}
            {/* Accent line at top — only on dark slides */}
            {activeSlide.dark && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-secondary opacity-80" />
            )}
          </motion.div>

          {/* ── CENTRALIZED TEXT CONTENT ── */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center px-14 sm:px-20 md:px-28 lg:px-[10%]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`content-${currentIndex}`}
                variants={prefersReducedMotion ? {} : containerVariants}
                initial={prefersReducedMotion ? { opacity: 0 } : "hidden"}
                animate={prefersReducedMotion ? { opacity: 1 } : "visible"}
                exit={prefersReducedMotion ? { opacity: 0 } : "exit"}
                className="max-w-4xl mx-auto w-full flex flex-col items-center text-center md:items-start md:text-left"
              >
                {/* Category Badge */}
                <motion.span
                  variants={prefersReducedMotion ? {} : subtextVariants}
                  className={`inline-block px-4 py-1.5 text-[10px] font-bold tracking-widest uppercase rounded-full mb-4 backdrop-blur-sm ${activeSlide.dark ? "bg-secondary/80 text-white" : "bg-[#0c2865] text-white"}`}
                >
                  {activeSlide.category}
                </motion.span>

                {/* Heading */}
                <h1 className={`text-[32px] leading-[1.1] sm:text-[36px] md:text-[54px] lg:text-[64px] font-bold mb-4 font-heading tracking-tight overflow-hidden flex flex-wrap justify-center md:justify-start ${activeSlide.dark ? "text-white drop-shadow-lg md:drop-shadow-xl" : "text-[#0c2865]"}`}>
                  {activeSlide.title.split(' ').map((word, i) => (
                    <motion.span
                      key={i}
                      variants={prefersReducedMotion ? {} : wordVariants}
                      className="inline-block mr-3"
                    >
                      {word}
                    </motion.span>
                  ))}
                </h1>

                {/* Description */}
                <motion.p
                  variants={prefersReducedMotion ? {} : subtextVariants}
                  className={`text-[13px] sm:text-sm md:text-base mb-8 md:mb-10 leading-relaxed font-body font-medium max-w-[600px] px-2 md:px-0 ${activeSlide.dark ? "text-white/95 drop-shadow-md" : "text-slate-700"}`}
                >
                  {activeSlide.description}
                </motion.p>


                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <motion.div variants={prefersReducedMotion ? {} : ctaVariants}>
                    <motion.div
                      whileHover={prefersReducedMotion ? {} : { y: -2, boxShadow: "0 6px 20px rgba(0,0,0,0.15)" }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button 
                        asChild
                        className={`text-base md:text-lg h-12 md:h-14 px-8 md:px-10 rounded-xl cursor-pointer transition-colors duration-300 ${
                          activeSlide.dark 
                            ? "bg-secondary text-white hover:bg-secondary/90 border-none" 
                            : "bg-primary text-white hover:bg-primary/90"
                        }`}
                      >
                        <a href="#contact">Apply Now</a>
                      </Button>
                    </motion.div>
                  </motion.div>
                  <motion.div variants={prefersReducedMotion ? {} : ctaVariants}>
                    <motion.div
                      whileHover={prefersReducedMotion ? {} : { y: -2 }}
                      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button 
                        asChild
                        variant="outline"
                        className={`text-base md:text-lg h-12 md:h-14 px-8 md:px-10 rounded-xl cursor-pointer backdrop-blur-sm transition-all duration-300 ${
                          activeSlide.dark
                            ? "bg-white/10 text-white border-white/30 hover:bg-white/20"
                            : "bg-slate-100 text-slate-800 border-slate-200 hover:bg-slate-200"
                        }`}
                      >
                        <a href="#about">Learn More</a>
                      </Button>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Subtle Slide Indicators at the bottom */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 transition-all duration-500 rounded-full ${i === currentIndex ? 'w-8 bg-secondary' : 'w-4 bg-white/30 hover:bg-white/50'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* ── RIGHT ARROW ── */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center z-40 group/btn">
          <div className="absolute bottom-full right-0 w-6 h-6 md:w-[32px] md:h-[32px] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 24H0C13.255 24 24 13.255 24 0V24Z" fill="#0c2865" />
            </svg>
          </div>
          <motion.button
            onClick={handleNext}
            whileHover={prefersReducedMotion ? {} : { scale: 1 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.9, rotate: 5 }}
            initial={{ scale: 0.9 }}
            aria-label="Next slide"
            className="w-12 md:w-16 h-24 md:h-32 bg-primary rounded-l-[24px] md:rounded-l-[32px] flex items-center justify-center cursor-pointer transition-colors hover:bg-primary/90 shadow-sm"
          >
            <ChevronRight className="text-white w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
          <div className="absolute top-full right-0 w-6 h-6 md:w-[32px] md:h-[32px] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24 0H0C13.255 0 24 10.745 24 24V0Z" fill="#0c2865" />
            </svg>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;