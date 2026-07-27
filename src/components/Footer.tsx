import { Facebook, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";
import schoolLogo from "@/assets/martin-house-logo.png";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer className="bg-primary text-white pt-10 pb-6 border-t border-white/10 relative overflow-hidden font-body">
      {/* Decorative patterns */}
      <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-secondary/10 rounded-full blur-[90px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[350px] h-[350px] bg-secondary/10 rounded-full blur-[90px] pointer-events-none" />
      
      {/* Abstract Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <pattern id="footerGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footerGrid)"/>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
        {/* Centered School Logo & Name */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-8 flex flex-col items-center text-center"
        >
          <Link to="/" className="inline-flex flex-col sm:flex-row items-center gap-3.5 group transition-transform hover:scale-105 mb-2">
            <div className="w-14 h-14 p-1 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-secondary/30 shrink-0">
              <img src={schoolLogo} alt="Martin House Trust School Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col items-center sm:items-start">
              <span className="text-white font-black text-xl md:text-2xl tracking-tight leading-none">
                Martin House Trust School
              </span>
              <span className="text-accent font-bold text-[11px] tracking-[0.25em] uppercase leading-none mt-1">
                Learning for life
              </span>
            </div>
          </Link>

          <div className="flex gap-4 mt-4">
            {[
              { icon: Facebook, url: "https://www.facebook.com/" },
              { icon: Linkedin, url: "https://www.linkedin.com/" },
              { icon: Instagram, url: "https://www.instagram.com/" },
            ].map((social) => (
              <a
                key={social.url}
                href={social.url}
                className="w-9 h-9 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300 text-white shadow-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 w-full mb-8"
        >
          {/* Column 1: About */}
          <motion.div variants={prefersReducedMotion ? {} : columnVariants} className="space-y-3">
            <h3 className="text-sm font-heading font-black tracking-widest uppercase text-white pb-1.5 border-b-2 border-secondary/50 w-fit">
              About Our School
            </h3>
            <p className="text-white/80 text-xs md:text-sm leading-relaxed max-w-sm font-medium">
              Our day and boarding school on Kalundu Farm, Chisamba, offers Prep, Primary, and College programmes with a Christian ethos and a love for the natural world.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={prefersReducedMotion ? {} : columnVariants} className="space-y-3">
            <h3 className="text-sm font-heading font-black tracking-widest uppercase text-white pb-1.5 border-b-2 border-secondary/50 w-fit">
              Quick Links
            </h3>
            <ul className="grid grid-cols-1 gap-2">
              {[
                "Academics",
                "Admissions",
                "Sports & Athletics",
                "Arts & Culture",
                "News & Events"
              ].map((link, i) => (
                <li key={i}>
                  <Link to="/services" className="text-white/75 hover:text-secondary flex items-center gap-2.5 group transition-colors text-xs md:text-sm font-semibold">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary opacity-75 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Details */}
          <motion.div variants={prefersReducedMotion ? {} : columnVariants} className="space-y-3">
            <h3 className="text-sm font-heading font-black tracking-widest uppercase text-white pb-1.5 border-b-2 border-secondary/50 w-fit">
              Contact Details
            </h3>
            <div className="space-y-3">
              <div className="group cursor-default">
                  <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-secondary mb-0.5">
                    Address
                  </h4>
                  <p className="text-white text-xs md:text-sm font-semibold leading-relaxed">
                    Kalundu Farm, Chisamba, Zambia
                  </p>
              </div>
              
              <div className="group cursor-default">
                  <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-secondary mb-0.5">
                    Phone
                  </h4>
                  <a href="tel:+260962143920" className="text-white text-xs md:text-sm font-semibold hover:text-secondary transition-colors">
                    +260 962 143 920
                  </a>
              </div>

              <div className="group cursor-default">
                  <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-secondary mb-0.5">
                    Email
                  </h4>
                  <a href="mailto:info@martinhouseschool.com" className="text-white text-xs md:text-sm font-semibold hover:text-secondary transition-colors">
                    info@martinhouseschool.com
                  </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Legal Bar */}
      <div className="border-t border-white/10 pt-5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-center">
            <p className="text-white/80 font-medium text-xs tracking-wide">
              © {currentYear} Martin House Trust School. All rights reserved.
            </p>
            <div className="flex items-center gap-1.5 text-white/80 font-medium text-xs tracking-wide">
              <span>Developed & maintained by</span>
              <a href="https://tungasonic.co.zw/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors underline underline-offset-4 font-bold">TUNGASONIC</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
