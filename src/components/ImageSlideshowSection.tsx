import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Import sports and campus images
//import rugbyPink from "@/assets/rugby-pink.png";
import sport1 from "@/assets/primary-school/sports/sport1.jpg";
import girlsFootball from "@/assets/secondary-school/sport/girls.jpg";
import sports5 from "@/assets/primary-school/sports/sports5.jpg";
import cricket from "@/assets/high-sports.jpg";
import running from "@/assets/prep-running.jpg";
import speechDay from "@/assets/secondary-school/sport/speechda1.jpg";
import netball from "@/assets/primary-school/sports/sport3.jpg";

interface SlideItem {
  src: string;
  alt: string;
  title: string;
  tag: string;
}

const slides: SlideItem[] = [

  {
    src: sport1,
    alt: "Martin House Primary Rugby Team",
    title: "Nurturing Sportsmanship & Team Spirit",
    tag: "Primary Rugby Team",
  },
  {
    src: girlsFootball,
    alt: "U19 Girls Football Team",
    title: "Passion and Excellence on the Pitch",
    tag: "U19 Girls Football",
  },
  {
    src: sports5,
    alt: "College Rugby Match Action",
    title: "Competitive Drive, Team Spirit",
    tag: "College Rugby",
  },
  {
    src: cricket,
    alt: "High School Cricket Match",
    title: "Precision, Discipline, and Teamwork",
    tag: "High School Cricket",
  },
  {
    src: running,
    alt: "Prep Athletics and Running",
    title: "Striving for Personal Best",
    tag: "Prep Athletics",
  },
  {
    src: speechDay,
    alt: "Speech Day & Prize Giving",
    title: "Celebrating Academic and Leadership Achievements",
    tag: "Academic Excellence",
  },
  {
    src: netball,
    alt: "Girls Netball Programme",
    title: "Cooperative Play, Focused Skill",
    tag: "Girls Netball",
  },
];

export const ImageSlideshowSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  // Slide transition animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <section className="py-12 bg-slate-50 border-t border-b border-slate-100 overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Section Title */}
        <div className="mb-10 text-center lg:text-left">
          <span className="inline-block px-4 py-1.5 bg-secondary/15 text-primary rounded-full text-[10px] font-black tracking-widest uppercase border border-secondary/30 mb-3">
            Campus Highlights
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-black text-primary uppercase tracking-tight">
            Life at Martin House in Action
          </h2>
          <p className="text-slate-500 text-sm max-w-2xl mt-2 leading-relaxed">
            Take a look at our students thriving across academics, sport, and cultural activities.
          </p>
        </div>

        {/* Slideshow Container matching user layout */}
        <div className="relative aspect-[21/9] w-full bg-slate-950 rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl group border border-slate-200">

          {/* Slides */}
          <div className="absolute inset-0 w-full h-full">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Image */}
                <img
                  src={slides[currentIndex].src}
                  alt={slides[currentIndex].alt}
                  className="w-full h-full object-cover select-none"
                />

                {/* Dark Overlay for Text Visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/25" />

                {/* Content Overlay */}
                <div className="absolute bottom-16 left-8 right-8 md:bottom-20 md:left-14 md:right-14 text-white z-10">
                  <span className="inline-block px-3 py-1 bg-[#e8b84b] text-primary rounded-full text-[9px] font-black tracking-widest uppercase mb-2">
                    {slides[currentIndex].tag}
                  </span>
                  <h3 className="text-xl md:text-3xl lg:text-4xl font-heading font-black uppercase tracking-tight max-w-2xl leading-none">
                    {slides[currentIndex].title}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-[#0c2865] border border-white/25 hover:border-transparent rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm group-hover:scale-105 active:scale-95"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 bg-white/20 hover:bg-[#0c2865] border border-white/25 hover:border-transparent rounded-full flex items-center justify-center text-white transition-all duration-200 backdrop-blur-sm group-hover:scale-105 active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Segmented indicators at the bottom - matches the screenshot design (green active segment) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 md:gap-2.5 px-4 py-2 bg-black/35 backdrop-blur-md rounded-full">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${index === currentIndex
                    ? "w-8 md:w-10 bg-[#22c55e]" // bright green active indicator matching the screenshot
                    : "w-4 md:w-6 bg-white/55 hover:bg-white/80" // white inactive indicators
                  }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ImageSlideshowSection;
