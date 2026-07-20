import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Trophy, Award, Star } from "lucide-react";
import { motion } from "framer-motion";

const achievements = [
  {
    title: "Academic Excellence Award",
    subtitle: "National Top Performer",
    footnote: "Consistently high pass rates",
    icon: Trophy,
    color: "bg-primary",
  },
  {
    title: "Cambridge International",
    subtitle: "Accredited School",
    footnote: "IGCSE, AS & A Level",
    icon: Award,
    color: "bg-secondary",
  },
  {
    title: "Sports Champions",
    subtitle: "National Competition",
    footnote: "Multi-sport excellence",
    icon: Star,
    color: "bg-primary",
  },
  {
    title: "Cambridge Distinction",
    subtitle: "International Examinations",
    footnote: "World-class results",
    icon: Award,
    color: "bg-secondary",
  },
  {
    title: "Community Service",
    subtitle: "Outstanding Contribution",
    footnote: "Social responsibility",
    icon: Star,
    color: "bg-primary",
  },
  {
    title: "Best School Award",
    subtitle: "Regional Recognition",
    footnote: "Educational excellence",
    icon: Trophy,
    color: "bg-secondary",
  },
];

const BusinessExcellenceSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = achievements.length - visibleCards;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };

  return (
    <section className="py-16 lg:py-24 bg-slate-50/50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 1, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 leading-tight tracking-tight mb-6">
              Awards & Achievements
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
              Decades of dedication to educational excellence have earned us recognition at national and international levels.
            </p>
          </motion.div>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto px-12 md:px-16">
          
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg border border-slate-100/80 flex items-center justify-center text-slate-600 hover:text-primary hover:border-primary/20 transition-all duration-300 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg border border-slate-100/80 flex items-center justify-center text-slate-600 hover:text-primary hover:border-primary/20 transition-all duration-300 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Cards Viewport */}
          <div className="overflow-hidden py-4 -my-4 px-2 -mx-2">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
              }}
            >
              {achievements.map((achievement, i) => {
                const Icon = achievement.icon;
                return (
                  <div
                    key={i}
                    className="shrink-0 px-4 flex justify-center"
                    style={{ width: `${100 / visibleCards}%` }}
                  >
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="w-full max-w-[340px] aspect-[4/5] bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgb(26,58,107,0.08)] p-8 flex flex-col items-center justify-between text-center transition-all duration-300 group/card"
                    >
                      {/* Icon Container */}
                      <div className="flex-1 flex items-center justify-center w-full min-h-[140px] mb-6">
                        <div className={`w-24 h-24 ${achievement.color} rounded-3xl flex items-center justify-center shadow-lg group-hover/card:scale-110 transition-transform duration-500`}>
                          <Icon className="w-12 h-12 text-white" />
                        </div>
                      </div>

                      {/* Achievement Info */}
                      <div className="w-full mt-auto">
                        <h3 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight mb-2 font-heading leading-tight">
                          {achievement.title}
                        </h3>
                        <p className="text-slate-500 text-sm font-medium leading-relaxed">
                          {achievement.subtitle}
                        </p>
                        {achievement.footnote && (
                          <p className="text-slate-400 text-xs font-semibold mt-1 uppercase tracking-wider">
                            {achievement.footnote}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dots Pagination */}
          <div className="flex items-center justify-center gap-2 mt-12">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 ${
                  currentIndex === index
                    ? "w-8 h-2 bg-primary rounded-full"
                    : "w-2 h-2 bg-slate-200 hover:bg-slate-300 rounded-full"
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

export default BusinessExcellenceSection;
