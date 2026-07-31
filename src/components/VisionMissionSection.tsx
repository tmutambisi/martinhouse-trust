import { Eye, Target, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15 }
    }
};

const cardVariants: Variants = {
    hidden: { opacity: 1, y: 50 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.6, ease: "easeOut" }
    }
};

const VisionMissionSection = () => {
    const prefersReducedMotion = useReducedMotion();

    return (
        <section className="py-8 lg:py-12 bg-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-10 lg:mb-16">
                    <motion.h2
                        initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 10 }}
                        whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: 0.1 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 leading-[1.1] tracking-tight"
                    >
                        Vision, <span className="text-secondary relative inline-block">
                            Mission
                        </span> <br /> & Values
                    </motion.h2>
                </div>

                <motion.div 
                    variants={prefersReducedMotion ? {} : containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="flex flex-col space-y-8 max-w-5xl mx-auto"
                >
                    {[
                        {
                            num: "01",
                            title: "Our Ethos",
                            desc: "At Martin House we aim to develop tomorrow's adults who are academically and emotionally prepared for secondary school, with a love of and respect for their natural environment and the importance of conservation."
                        },
                        {
                            num: "02",
                            title: "Our Vision",
                            desc: "To nurture compassionate human beings who have time for their neighbour — young people of character who learn for life and contribute meaningfully to society."
                        },
                        {
                            num: "03",
                            title: "Our Mission",
                            desc: "To provide a safe, Christian, holistic education through the Cambridge Curriculum and Cambridge pathways, supported by sport, culture, boarding, and community outreach."
                        }
                    ].map((item, index) => (
                        <motion.div
                            key={item.num}
                            variants={prefersReducedMotion ? {} : cardVariants}
                            whileHover={prefersReducedMotion ? {} : { 
                                y: -5, 
                                boxShadow: "0 20px 40px rgba(26, 58, 107, 0.25)" 
                            }}
                            className="bg-primary rounded-[3rem] p-8 md:p-14 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 shadow-2xl relative overflow-hidden group transition-all"
                        >
                            {/* Decorative Wave in Background */}
                            <div className="absolute left-0 bottom-0 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                                <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="20" cy="180" r="40" stroke="white" strokeWidth="1"/>
                                    <circle cx="20" cy="180" r="60" stroke="white" strokeWidth="1"/>
                                    <circle cx="20" cy="180" r="80" stroke="white" strokeWidth="1"/>
                                </svg>
                            </div>

                            <div className="text-6xl md:text-8xl font-heading font-black text-white/20 select-none tracking-tighter">
                                {item.num}
                            </div>
                            
                            <div className="flex flex-col items-center md:items-start text-center md:text-left pt-2 md:pt-6 relative z-10">
                                <h3 className="text-xl md:text-3xl font-heading font-black text-white mb-6 uppercase tracking-wider">
                                    {item.title}
                                </h3>
                                <p className="text-sm md:text-base text-white/80 leading-relaxed font-body">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default VisionMissionSection;
