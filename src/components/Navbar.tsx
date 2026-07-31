import React, { useState, useEffect } from "react";
import { Menu, ChevronDown, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import schoolLogo from "@/assets/martin-house-logo.png";

interface NavChild {
  href: string;
  label: string;
}

interface NavItem {
  href: string;
  label: string;
  children?: NavChild[];
}

// Flat navigation items matching user's specific request:
// Links: Home | About Us | Admissions | Prep | College | Parents | Contact Us
const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  {
    href: "/about",
    label: "About Us",
    children: [
      { href: "/about", label: "Overview" },
      { href: "/about/testimonials", label: "Testimonials" },
      { href: "/faq", label: "FAQ" },
      { href: "/feedback", label: "Feedback" },
    ],
  },
  {
    href: "/quote",
    label: "Admissions",
    children: [
      { href: "/quote", label: "Admissions & Entry" },
      { href: "/parents/boarding-requirements", label: "Boarding Info" },
      { href: "/parents/uniform-requirements", label: "Uniform Info" },
    ],
  },
  {
    href: "/primary",
    label: "Prep",
    children: [
      { href: "/primary/about", label: "About Prep" },
      { href: "/primary/academics", label: "Academics" },
      { href: "/primary/culture", label: "Culture" },
      { href: "/primary/sport", label: "Sport" },
    ],
  },
  {
    href: "/highschool",
    label: "College",
    children: [
      { href: "/highschool/about", label: "About College" },
      { href: "/highschool/academics", label: "Academics" },
      { href: "/highschool/culture", label: "Culture" },
      { href: "/highschool/sport", label: "Sport" },
    ],
  },
  {
    href: "/parents",
    label: "Parents",
    children: [
      { href: "/parents/the-board", label: "The Board" },
      { href: "/parents/uniform-requirements", label: "Uniform Requirements" },
      { href: "/parents/boarding-requirements", label: "Boarding Requirements" },
      { href: "/parents/calendars", label: "Calendars" },
      { href: "/parents/newsletters-and-publications", label: "Newsletters & Publications" },
    ],
  },
  { href: "/contact", label: "Contact Us" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleMouseEnter = (label: string) => {
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
    setIsOpen(false);
  };

  const NavLink = ({ item }: { item: NavItem }) => {
    // Determine active state: exact match or starts with parent path
    const isActive =
      location.pathname === item.href ||
      (item.href !== "/" && location.pathname.startsWith(item.href)) ||
      (item.label === "About Us" && location.pathname.startsWith("/about")) ||
      (item.label === "Prep" && location.pathname.startsWith("/primary")) ||
      (item.label === "College" && location.pathname.startsWith("/highschool"));

    return (
      <div
        className="relative h-full flex items-center cursor-pointer"
        onMouseEnter={() => item.children && handleMouseEnter(item.label)}
        onMouseLeave={handleMouseLeave}
      >
        <Link
          to={item.href}
          onClick={item.label === "Home" ? handleHomeClick : () => setIsOpen(false)}
          className={`h-full flex items-center px-6 transition-all duration-200 font-heading text-[12px] uppercase tracking-wider font-extrabold relative z-10 ${
            isActive
              ? "bg-[#0c2865] text-white"
              : "text-slate-700 bg-white hover:bg-[#0c2865] hover:text-white"
          }`}
        >
          <span>{item.label}</span>
          {item.children && (
            <ChevronDown className="h-3.5 w-3.5 ml-1.5 shrink-0" />
          )}
        </Link>

        {item.children && (
          <AnimatePresence>
            {activeDropdown === item.label && (
              <motion.div
                initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
                animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="absolute top-full left-0 z-50 pt-0 pointer-events-auto min-w-[240px] drop-shadow-xl"
              >
                <div className="bg-white border-x border-b border-slate-200/80 py-1">
                  <div className="flex flex-col">
                    {item.children.map((child) => {
                      const isChildActive = location.pathname === child.href;
                      return (
                        <Link
                          key={child.href}
                          to={child.href}
                          onClick={() => setActiveDropdown(null)}
                          className={`px-6 py-3 text-[11px] font-extrabold uppercase tracking-wider transition-colors duration-150 flex items-center gap-2 ${
                            isChildActive
                              ? "bg-[#0c2865] text-white"
                              : "text-slate-600 bg-white hover:bg-[#0c2865] hover:text-white"
                          }`}
                        >
                          {child.label}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    );
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#0c2865] z-[10000] origin-left"
        style={{ scaleX }}
      />
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-t-4 border-[#0c2865] border-b border-slate-200/80 shadow-md h-20">
        <div className="w-full h-full px-6 md:px-12 flex items-center justify-between">
          
          {/* Left: Crest Logo + School Title */}
          <Link to="/" className="flex items-center gap-3 shrink-0 h-full py-3" onClick={handleHomeClick}>
            <img src={schoolLogo} alt="Martin House Logo" className="h-12 w-auto object-contain" />
            <div className="flex flex-col">
              <span className="text-[#0c2865] font-heading font-black text-sm md:text-base leading-tight tracking-[0.05em]">
                MARTIN HOUSE
              </span>
              <span className="text-slate-500 font-sans font-bold text-[8px] md:text-[9px] tracking-[0.25em] uppercase leading-none mt-0.5">
                TRUST SCHOOL
              </span>
            </div>
          </Link>

          {/* Right: Full-width Links */}
          <div className="hidden lg:flex items-center h-full">
            {navItems.map((item) => (
              <NavLink key={item.label} item={item} />
            ))}
          </div>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu overlay */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[9998] lg:hidden"
              />

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

                <div className="flex flex-col gap-4 overflow-y-auto h-full pb-10 no-scrollbar">
                  {navItems.map((item, idx) => {
                    const isItemActive =
                      location.pathname === item.href ||
                      (item.href !== "/" && location.pathname.startsWith(item.href));

                    return (
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
                          className={`text-base font-heading font-black uppercase tracking-tight py-1 transition-colors block ${
                            isItemActive ? "text-[#0c2865]" : "text-slate-800 hover:text-[#0c2865]"
                          }`}
                        >
                          {item.label}
                        </Link>
                        {item.children && (
                          <div className="mt-1 flex flex-col gap-1.5 pl-4 border-l-2 border-slate-100 ml-1">
                            {item.children.map((child) => {
                              const isChildActive = location.pathname === child.href;
                              return (
                                <Link
                                  key={child.href}
                                  to={child.href}
                                  onClick={() => setIsOpen(false)}
                                  className={`font-bold uppercase text-[10px] tracking-wider transition-colors py-1 block ${
                                    isChildActive ? "text-[#0c2865]" : "text-slate-400 hover:text-[#0c2865]"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              );
                            })}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;