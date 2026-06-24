import { Facebook, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer className="bg-primary text-white pt-24 border-t border-white/5 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
      
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

      <div className="container mx-auto px-6 pb-20 relative z-10 flex flex-col items-center">
        {/* Centered School Name / Logo */}
        <motion.div 
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
          whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-20 flex flex-col items-center text-center"
        >
          <Link to="/" className="inline-block transition-transform hover:scale-105 mb-4">
            <div className="flex flex-col items-center">
              <span className="text-white font-black text-5xl md:text-6xl tracking-tight leading-none">MARTIN</span>
              <span className="text-accent font-black text-lg tracking-[0.3em] uppercase leading-none mt-1">HOUSE TRUST SCHOOL</span>
            </div>
          </Link>
          <p className="text-white/50 text-xs tracking-widest uppercase mt-6 mb-10">Learning for life</p>
          <div className="flex gap-8">
            {[
              { icon: Facebook, url: "https://www.facebook.com/" },
              { icon: Linkedin, url: "https://www.linkedin.com/" },
              { icon: Instagram, url: "https://www.instagram.com/" },
            ].map((social) => (
              <a
                key={social.url}
                href={social.url}
                className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300 text-white"
                target="_blank"
                rel="noopener noreferrer"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div 
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 w-full"
        >
          {/* Column 1: About */}
          <motion.div variants={prefersReducedMotion ? {} : columnVariants} className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-heading font-black tracking-widest uppercase text-white pb-2 border-b-2 border-secondary/40 w-fit">
                About Our School
              </h3>
              <p className="text-white/70 text-sm leading-relaxed max-w-sm font-normal">
                Our day and boarding school on Kalundu Farm, Chisamba, offers Prep, Primary, and College programmes with a Christian ethos and a love for the natural world.
              </p>
            </div>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div variants={prefersReducedMotion ? {} : columnVariants}>
            <h3 className="text-xl font-heading font-black tracking-widest uppercase text-white mb-10 pb-2 border-b-2 border-secondary/40 w-fit">
              Quick Links
            </h3>
            <ul className="grid grid-cols-1 gap-4">
              {[
                "Academics",
                "Admissions",
                "Sports & Athletics",
                "Arts & Culture",
                "News & Events"
              ].map((link, i) => (
                <li key={i}>
                  <Link to="/services" className="text-white/60 hover:text-white flex items-center gap-3 group transition-colors text-sm font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-white opacity-60 group-hover:opacity-100 transition-opacity" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Contact Details */}
          <motion.div variants={prefersReducedMotion ? {} : columnVariants}>
            <h3 className="text-xl font-heading font-black tracking-widest uppercase text-white mb-10 pb-2 border-b-2 border-secondary/40 w-fit">
              Contact Details
            </h3>
            <div className="space-y-6">
              <div className="group cursor-default">
                  <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40 mb-2">
                    Address
                  </h4>
                  <p className="text-white text-sm font-medium leading-relaxed">
                    Kalundu Farm, Chisamba, Zambia
                  </p>
              </div>
              
              <div className="group cursor-default">
                  <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40 mb-2">
                    Phone
                  </h4>
                  <a href="tel:+260962143920" className="text-white text-sm font-medium hover:text-accent transition-colors">
                    +260 962 143 920
                  </a>
              </div>

              <div className="group cursor-default">
                  <h4 className="text-[10px] font-black tracking-[0.2em] uppercase text-white/40 mb-2">
                    Email
                  </h4>
                  <a href="mailto:info@martinhouseschool.com" className="text-white text-sm font-medium hover:text-secondary transition-colors">
                    info@martinhouseschool.com
                  </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Legal Bar */}
      <div className="border-t border-white/5 py-8 pb-12 md:pb-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-center text-sm">
            <p className="text-white font-normal text-xs tracking-widest">
              © {currentYear} Martin House Trust School. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-white font-normal text-xs tracking-wider">
              <span>Developed & maintained by</span>
              <a href="https://tungasonic.co.zw/" target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors underline underline-offset-4">TUNGASONIC</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
