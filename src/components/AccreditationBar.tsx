import { motion } from "framer-motion";
import cambridgeLogo from "@/assets/logos/cambridge.png";
import isazLogo from "@/assets/logos/isaz.jpeg";
import codementumLogo from "@/assets/logos/codementume.png";
import igeoLogo from "@/assets/logos/igeo.png";

interface AccreditationItem {
  name: string;
  logo?: string;
  badge?: string;
  color?: string;
  url?: string;
}

const accreditations: AccreditationItem[] = [
  {
    name: "Cambridge International",
    logo: cambridgeLogo,
    url: "https://www.cambridgeinternational.org/",
  },
  {
    name: "ISAZ Member",
    logo: isazLogo,
    // ISAZ has no link
  },
  {
    name: "Cambridge Primary",
    logo: cambridgeLogo,
    url: "https://www.cambridgeinternational.org/",
  },
  {
    name: "Codementum",
    logo: codementumLogo,
    url: "https://codementum.com/",
  },
  {
    name: "iGeo Geography",
    logo: igeoLogo,
    url: "https://geoolympiad.org/",
  },
  {
    name: "IBSC Member",
    badge: "IBSC Member",
    color: "bg-slate-700",
  },
];

const AccreditationBar = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5 }}
      className="bg-slate-50 border-y border-slate-100 py-10 px-6"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {accreditations.map((item, i) => {
            const logoContent = (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center justify-center"
              >
                {item.logo ? (
                  <div className="h-20 md:h-24 px-6 py-3 bg-white rounded-2xl flex items-center justify-center shadow-md border border-slate-200/80 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group">
                    <img
                      src={item.logo}
                      alt={item.name}
                      className="h-12 md:h-16 w-auto object-contain max-w-[140px] md:max-w-[180px] group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className={`h-20 md:h-24 px-8 ${item.color} rounded-2xl flex items-center justify-center shadow-md font-extrabold text-white text-base md:text-lg tracking-wider`}>
                    {item.badge}
                  </div>
                )}
              </motion.div>
            );

            return item.url ? (
              <a
                key={item.name + i}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`Visit ${item.name} website`}
                className="inline-block transition-transform hover:-translate-y-1"
              >
                {logoContent}
              </a>
            ) : (
              <div key={item.name + i}>
                {logoContent}
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default AccreditationBar;
