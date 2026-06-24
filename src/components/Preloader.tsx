import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import martinHouseLogo from "@/assets/martin-house-logo.png";

const Preloader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Simulate loading time (at least 1.8s for the bar + some buffer)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: "-100%" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-white"
        >
          {/* Logo Animation */}
          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { scale: 0.5, opacity: 0 }}
            animate={prefersReducedMotion ? {} : { scale: 1, opacity: 1 }}
            transition={prefersReducedMotion ? {} : {
              type: "spring",
              stiffness: 120,
              damping: 14,
            }}
            className="flex flex-col items-center justify-center p-8"
          >
            <div className="flex flex-col items-center mb-8">
              <span className="text-primary font-black text-4xl md:text-5xl tracking-tight leading-none text-center">MARTIN HOUSE</span>
              <span className="text-primary font-black text-[10px] tracking-[0.25em] uppercase leading-none mt-2 text-center">TRUST SCHOOL</span>
            </div>
            
            {/* Loading Bar container */}
            <div className="w-48 md:w-64 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="h-full bg-secondary rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
