import { motion } from "framer-motion";
import { Link } from "react-router-dom";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage: string;
}

const PageHero = ({ title, subtitle, backgroundImage }: PageHeroProps) => {
  return (
    <section className="relative w-full bg-slate-50 pt-[140px] pb-8 px-4 md:px-8 font-body">
      <div className="relative w-full h-[55vh] min-h-[400px] max-w-[1600px] mx-auto rounded-[60px] overflow-hidden bg-slate-200 flex items-center shadow-2xl">
        {/* Background Gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-[#0c2865] via-[#103078] to-[#081e4b] transition-transform duration-1000 transform"
        >
          {/* Professional Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>

        {/* Content Container */}
        <div className="container mx-auto px-12 md:px-24 xl:px-36 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start w-full"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-white leading-tight tracking-tight">
              {title}
            </h1>

            {subtitle && (
              <p className="mt-6 text-sm md:text-base text-white/90 font-medium max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            )}
          </motion.div>
        </div>

        {/* Breadcrumb Pill */}
        <div className="absolute bottom-0 right-12 md:right-32 bg-slate-50 rounded-t-[30px] px-8 md:px-12 py-4 z-20 flex items-center font-bold text-[10px] md:text-[11px] tracking-wider text-slate-800 uppercase shadow-[-5px_-5px_15px_rgba(0,0,0,0.1)]">
           <Link to="/" className="text-slate-400 mr-2 hover:text-primary transition-colors">Home /</Link> <span className="ml-1">{title}</span>
           
           {/* Inverted Corners */}
           <div className="absolute bottom-0 -left-6 w-6 h-6 bg-transparent rounded-br-3xl shadow-[5px_5px_0_5px_#f8fafc] pointer-events-none" />
           <div className="absolute bottom-0 -right-6 w-6 h-6 bg-transparent rounded-bl-3xl shadow-[-5px_5px_0_5px_#f8fafc] pointer-events-none" />
        </div>
      </div>
    </section>
  );
};

export default PageHero;
