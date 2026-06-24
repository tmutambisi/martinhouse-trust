import React, { useState, useEffect } from "react";
import { Menu, ChevronDown, X, Phone, Mail, Facebook, Linkedin, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

// Navbar dropdown preview images
import pNav2 from "@/assets/primary-school/navbar/nav2.jpg";
import pNav3 from "@/assets/primary-school/navbar/nav3.jpg";
import pNav4 from "@/assets/primary-school/navbar/nav4.jpg";
import pNav5 from "@/assets/primary-school/navbar/nav5.jpg";
import sNav1 from "@/assets/secondary-school/navbar/nav1.jpg";
import sNav2 from "@/assets/secondary-school/navbar/nav2.jpg";
import sNav3 from "@/assets/secondary-school/navbar/nav3.jpg";
import schoolLogo from "@/assets/martin-house-logo.png";

const DROPDOWN_IMAGES: Record<string, string[]> = {
  Primary: [pNav2, pNav3, pNav4, pNav5],
  "High School": [sNav1, sNav2, sNav3],
};

interface NavChild {
  href: string;
  label: string;
}

interface NavCategory {
  label: string;
  children: NavChild[];
}

interface NavItem {
  href: string;
  label: string;
  children?: NavChild[];
  categories?: NavCategory[];
}

// Split navigation items
const leftNavItems: NavItem[] = [
  { href: "/", label: "Home" },
  // Primary school section
  {
    label: "Primary",
    href: "/primary",
    children: [
      { href: "/primary/about", label: "About Primary" },
      { href: "/primary/academics", label: "Academics" },
      { href: "/primary/culture", label: "Culture" },
      { href: "/primary/sport", label: "Sport" },
    ],
  },
  // High School section
  {
    label: "High School",
    href: "/highschool",
    children: [
      { href: "/highschool/about", label: "About High School" },
      { href: "/highschool/academics", label: "Academics" },
      { href: "/highschool/culture", label: "Culture" },
      { href: "/highschool/sport", label: "Sport" },
    ],
  },
  { href: "/services", label: "Academics" },
];

const rightNavItems: NavItem[] = [
  {
    label: "Parents",
    href: "/parents",
    children: [
      { href: "/parents/the-board", label: "The Board" },
      { href: "/parents/uniform-requirements", label: "Uniform Requirements" },
      { href: "/parents/boarding-requirements", label: "Boarding Requirements" },
      { href: "/parents/calendars", label: "Calendars" },
      { href: "/parents/newsletters-and-publications", label: "Newsletters & Publications" },
    ],
  },
  { href: "/contact", label: "Contact Us" },
  { href: "/payments", label: "School Fees" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const { scrollY } = useScroll();
  const scaleX = useSpring(useScroll().scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Smooth transitions on scroll using useTransform
  const headerY = useTransform(scrollY, [0, 50], [0, -56]); // hides top bar
  const navPadding = useTransform(scrollY, [0, 100], ["0.4rem", "0.2rem"]);
  const navBg = useTransform(
    scrollY, 
    [0, 100], 
    ["rgba(255, 255, 255, 0.7)", "rgba(255, 255, 255, 0.95)"]
  );
  const navShadow = useTransform(
    scrollY, 
    [0, 100], 
    ["0 4px 6px rgba(0,0,0,0)", "0 20px 40px rgba(0,0,0,0.08)"]
  );

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    const images = DROPDOWN_IMAGES[item.label];
    const hasImages = !!images;

    return (
      <div
        className="relative h-full flex items-center group px-3 cursor-pointer"
        onMouseEnter={() => (item.children || item.categories) && handleMouseEnter(item.label)}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to={item.href}
          onClick={item.label === "Home" ? handleHomeClick : () => setIsOpen(false)}
          className={`text-[12px] font-extrabold uppercase tracking-wider whitespace-nowrap transition-all duration-300 relative py-2.5 px-5 rounded-full ${item.label === "Home" ? "bg-primary text-white" : "text-slate-700 hover:text-primary hover:bg-slate-50"}`}
        >
          {item.label}
          {item.label !== "Home" && (
            <motion.span
              className="absolute bottom-0 left-0 w-full h-0.5 bg-primary origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            />
          )}
        </Link>

        {(item.children || item.categories) && (
          <ChevronDown className="h-4 w-4 ml-1 transition-colors text-slate-400" />
        )}

        <AnimatePresence>
          {activeDropdown === item.label && (
            <motion.div
              initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
              animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.97 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className={`absolute top-full left-1/2 -translate-x-1/2 z-50 pointer-events-auto ${hasImages ? "w-[480px]" : ""}`}
            >
              <div className="pt-3 pb-2">
                {hasImages ? (
                  /* ── Mega-menu with image grid ── */
                  <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden">
                    {/* Image strip */}
                    <div className="grid grid-cols-4 gap-0 h-28">
                      {images.map((src, i) => (
                        <img
                          key={i}
                          src={src}
                          alt=""
                          className="w-full h-full object-cover"
                          style={{ filter: "brightness(0.88)" }}
                        />
                      ))}
                    </div>
                    {/* Links grid */}
                    <div className="grid grid-cols-2 gap-0 p-2">
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setActiveDropdown(null)}
                          className="px-5 py-3 text-[11px] font-bold text-slate-600 hover:bg-[#0c2865]/5 hover:text-[#0c2865] transition-all uppercase tracking-wider rounded-xl flex items-center gap-2 group/link"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0c2865]/30 group-hover/link:bg-[#0c2865] transition-colors flex-shrink-0" />
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* ── Simple list dropdown ── */
                  <div className="bg-white rounded-xl shadow-2xl border border-slate-100 p-2 min-w-[260px] overflow-hidden">
                    <div className="flex flex-col">
                      {item.children?.map((child) => (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setActiveDropdown(null)}
                          className="px-6 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-primary transition-all uppercase tracking-wider first:rounded-t-lg last:rounded-b-lg flex items-center gap-2 group/link"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Animation variants
  const navContainerVariants = {
    hidden: { y: -80, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.5, 
        delay: 0.2, 
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-secondary z-[10000] origin-left"
        style={{ scaleX }}
      />
      <motion.header 
        variants={prefersReducedMotion ? {} : navContainerVariants}
        initial={prefersReducedMotion ? false : "hidden"}
        animate="visible"
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      >
        <motion.div style={{ y: headerY }} className="hidden lg:block bg-primary h-14">
          <div className="container mx-auto px-12 h-full relative flex items-center justify-between">
            {/* Left: Contact Info */}
            <div className="flex items-center gap-10 text-white/90 font-medium text-[10px] tracking-widest uppercase">
              <a href="tel:+260962143920" className="flex items-center gap-2.5 group hover:text-white transition-all">
                <Phone className="h-3.5 w-3.5 text-white/60 group-hover:text-white group-hover:scale-110 transition-all" />
                <span>+260 962 143 920</span>
              </a>
              <a href="mailto:info@martinhouseschool.com" className="flex items-center gap-2.5 group hover:text-white transition-all">
                <Mail className="h-3.5 w-3.5 text-white/60 group-hover:text-white group-hover:scale-110 transition-all" />
                <span>info@martinhouseschool.com</span>
              </a>
            </div>

            {/* Center: School Motto */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white tracking-[0.3em] font-black whitespace-nowrap hidden xl:flex items-center gap-4 text-[10px]">
              <div className="h-px w-8 bg-white/20" />
              NURTURING EXCELLENCE · LEARNING FOR LIFE
              <div className="h-px w-8 bg-white/20" />
            </div>

            {/* Right: Socials */}
            <div className="flex items-center gap-5">
              {[
                { icon: Facebook, href: "https://www.facebook.com/" },
                { icon: Linkedin, href: "https://www.linkedin.com/" },
                { icon: Instagram, href: "https://www.instagram.com/" },
              ].map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white transition-all hover:-translate-y-0.5"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-50 overflow-visible">
          <motion.nav 
            style={{ 
              paddingTop: navPadding, 
              paddingBottom: navPadding,
              backgroundColor: navBg,
              boxShadow: navShadow,
              marginTop: "0.5rem"
            }}
            className="rounded-full px-3 lg:px-6 flex items-center justify-between h-auto min-h-[52px] backdrop-blur-md border border-white/20 overflow-visible"
          >
            {/* Mobile Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-full transition-colors text-slate-800 hover:bg-slate-100 relative z-50"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Mobile Logo */}
            <Link to="/" className="lg:hidden absolute left-1/2 -translate-x-1/2" onClick={handleHomeClick}>
              <img src={schoolLogo} alt="Martin House Logo" className="h-10 w-auto object-contain" />
            </Link>

            {/* Nav Container - Split into Left / Logo / Right */}
            <div className="hidden lg:flex items-center justify-center flex-1 h-full">
              {/* Left Menu */}
              <div className="flex items-center space-x-1 pr-4">
                {leftNavItems.map((item) => (
                  <motion.div key={item.label} variants={prefersReducedMotion ? {} : navItemVariants}>
                    <NavLink item={item} />
                  </motion.div>
                ))}
              </div>

              {/* Centered Logo */}
              <motion.div
                className="shrink-0 overflow-visible"
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, x: -20 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Link
                  to="/"
                  className="flex items-center justify-center px-6 group shrink-0"
                  onClick={handleHomeClick}
                >
                  <img src={schoolLogo} alt="Martin House Logo" className="h-20 md:h-22 lg:h-24 w-auto object-contain transition-transform duration-300 hover:scale-105 drop-shadow-xl" style={{ marginTop: '-0.75rem', marginBottom: '-0.75rem' }} />
                </Link>
              </motion.div>

              {/* Right Menu */}
              <div className="flex items-center space-x-1 pl-4">
                {rightNavItems.map((item) => (
                  <motion.div key={item.label} variants={prefersReducedMotion ? {} : navItemVariants}>
                    <NavLink item={item} />
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Removed Apply Now button to balance layout */}

            {/* Mobile Spacer */}
            <div className="lg:hidden w-8" />
          </motion.nav>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998] lg:hidden"
              />

              {/* Drawer */}
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 w-[300px] max-w-[85vw] bg-white h-screen shadow-2xl z-[9999] flex flex-col p-6 pt-20 lg:hidden"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-6 right-6 p-2 text-slate-800 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="flex flex-col gap-5 overflow-y-auto h-full pb-10 no-scrollbar">
                  {[...leftNavItems, ...rightNavItems, { href: "/faq", label: "FAQ" }, { href: "/feedback", label: "Feedback" }].map((item, idx) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 + 0.1 }}
                    >
                      <Link
                        to={item.href}
                        onClick={(e) => {
                          if (item.label === "Home") handleHomeClick(e);
                          else setIsOpen(false);
                        }}
                        className="text-lg font-heading font-bold text-foreground uppercase tracking-tight hover:text-primary transition-colors inline-block"
                      >
                        {item.label}
                      </Link>
                      {item.children && (
                        <div className="mt-2 flex flex-col gap-2 pl-4 border-l-2 border-slate-100 ml-1">
                          {item.children.map(child => (
                            <Link
                              key={child.href}
                              to={child.href}
                              onClick={() => setIsOpen(false)}
                              className="text-muted-foreground font-bold uppercase text-[11px] tracking-widest hover:text-primary transition-colors py-1"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Mobile menu bottom spacer */}
                <div className="mt-auto h-4" />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};

export default Navbar;