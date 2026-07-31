import { motion } from "framer-motion";

const pathways = [
  {
    title: "Prep School",
    description:
      "Cambridge Curriculum from Early Years through Year 7, with small classes and a strong foundation in literacy, numeracy, and character.",
  },
  {
    title: "Primary School",
    description:
      "Continuous assessment through projects, class activities, tests, and examinations that prepare learners for confident progression.",
  },
  {
    title: "College — Cambridge",
    description:
      "Cambridge Checkpoint, IGCSE, and AS & A Level pathways across sciences, humanities, and commercials.",
  },
  {
    title: "Sports & Athletics",
    description:
      "Coaching for the love of the game — basketball, soccer, cricket, swimming, and more on our beautiful sports grounds.",
  },
  {
    title: "Culture & Creativity",
    description:
      "Music, drama, public speaking, and fine arts that nurture expression, confidence, and creativity.",
  },
  {
    title: "Boarding & Outdoor Education",
    description:
      "A home away from home with supervised prep, balanced meals, adventure programmes, and outdoor learning.",
  },
];

const OurClientsSection = () => (
  <section className="py-24 lg:py-32 bg-[#f3f1eb] relative overflow-hidden font-body">
    <div className="absolute top-0 right-0 w-1/3 h-full bg-white/60 skew-x-12 translate-x-1/4 pointer-events-none" />
    <div className="container mx-auto px-6 relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-20 lg:mb-24">
        <motion.h2
          initial={{ opacity: 1, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
          className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-primary leading-tight tracking-tight mb-8"
        >
          Our Academic & <br />
          <span className="text-secondary italic">Holistic Pathways</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 1, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
          className="text-lg text-muted-foreground font-medium leading-relaxed"
        >
          At Martin House, we believe that to live is to learn. Our programmes integrate rigorous academics with
          sport, culture, boarding, and outdoor education.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pathways.map((pathway, index) => (
          <motion.div
            key={pathway.title}
          initial={{ opacity: 1, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: index * 0.08, duration: 0.45, ease: "easeOut" }}
            className="group bg-white rounded-[30px] p-10 md:p-14 shadow-md hover:shadow-xl transition-all duration-500 relative overflow-hidden flex flex-col items-center text-center justify-center border border-border"
          >
            <h3 className="text-lg md:text-xl font-heading font-black text-primary mb-6 tracking-wide leading-tight relative z-10 transition-colors group-hover:text-secondary uppercase">
              {pathway.title}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-body relative z-10 font-medium">
              {pathway.description}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <p className="text-[11px] font-black tracking-widest uppercase text-muted-foreground">
          Over 35 years of educational legacy and academic brilliance
        </p>
      </div>
    </div>
  </section>
);

export default OurClientsSection;
