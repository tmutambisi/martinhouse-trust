import { motion } from "framer-motion";
import { Award, CheckCircle2 } from "lucide-react";

const CompanyOverview = () => {
    const principles = [
        {
            title: "Academic Excellence",
            description: "Unwavering commitment to delivering a world-class curriculum that challenges students to achieve their highest potential in every subject."
        },
        {
            title: "Holistic Development",
            description: "A well-rounded education that nurtures the mind, body, and character of every student through sports, arts, leadership, and community service."
        },
        {
            title: "Innovative Learning",
            description: "Embracing modern teaching methodologies and technology to prepare students for the demands of a rapidly changing global environment."
        }
    ];

    const accreditations = [
        "Cambridge Curriculum (Prep School)",
        "Cambridge International Examinations (College)",
        "Christian Ethos & Character Education"
    ];

    return (
        <section className="py-24 lg:py-32 bg-white relative overflow-hidden font-body">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col gap-16 lg:gap-24">

                    {/* Top Section: School Narrative */}
                    <motion.div
                        initial={{ opacity: 1, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.1 }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        className="grid lg:grid-cols-2 gap-16"
                    >
                        <div>
                            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-primary leading-[1.1] mb-8">
                                Martin House <br />
                                <span className="text-muted-foreground font-normal italic">Trust School</span>
                            </h2>
                            <div className="space-y-6">
                                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                    <strong className="text-primary">Martin House Trust School</strong> is tucked safely away on Kalundu Farm, Chisamba, near Lusaka. Our day and boarding school is surrounded by 80 hectares of lush indigenous vegetation, bird life, and farm life.
                                </p>
                                <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                                    We aim to develop tomorrow&apos;s adults who are academically and emotionally prepared for the challenges ahead — inspiring a love of and respect for their natural environment and the importance of conservation for future generations.
                                </p>
                            </div>
                        </div>

                        {/* Accreditations Card */}
                        <div className="relative rounded-[3rem] p-10 md:p-14 overflow-hidden shadow-2xl flex flex-col justify-center border border-primary/20 group transition-shadow duration-500">
                            {/* Premium Background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#142d56] to-[#0d1f3c]"></div>
                            
                            {/* Abstract Geometric Overlay */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none">
                                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white rounded-full mix-blend-overlay blur-[120px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
                                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                    <defs>
                                        <pattern id="schoolGrid" width="30" height="30" patternUnits="userSpaceOnUse">
                                            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#schoolGrid)"/>
                                </svg>
                            </div>

                            <div className="relative z-10 flex border-b border-white/10 pb-6 mb-8 items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/30 flex items-center justify-center shadow-inner">
                                    <Award className="h-6 w-6 text-secondary" />
                                </div>
                                <h4 className="text-sm md:text-base font-black tracking-[0.2em] text-white uppercase drop-shadow-md">
                                    Affiliations & Accreditations
                                </h4>
                            </div>

                            <div className="relative z-10 grid grid-cols-1 gap-6">
                                {accreditations.map((acc, i) => (
                                    <div key={i} className="flex items-center gap-5 text-sm md:text-base font-medium text-white/90 group/item hover:text-white transition-colors duration-300">
                                        <div className="relative w-12 h-12 rounded-full bg-white/5 border border-white/20 backdrop-blur-md flex items-center justify-center shrink-0 shadow-lg group-hover/item:bg-secondary group-hover/item:border-secondary group-hover/item:shadow-[0_0_20px_rgba(201,162,39,0.4)] transition-all duration-300 group-hover/item:scale-110">
                                            <CheckCircle2 className="h-6 w-6 text-white group-hover/item:text-white relative z-10 transition-colors duration-300" />
                                        </div>
                                        <span className="font-bold tracking-wide drop-shadow-sm">{acc}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Bottom Section: Three Core Principles */}
                    <div className="space-y-12">
                        <div className="text-center md:text-left">
                            <h3 className="text-2xl md:text-3xl font-heading font-black text-primary mb-3 uppercase tracking-tight">Our Three Core Pillars</h3>
                            <p className="text-slate-500 text-sm md:text-base font-medium">The foundation of our educational philosophy.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {principles.map((p, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 1, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.1 }}
                                    transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" }}
                                    className="group bg-primary rounded-[40px] p-10 md:p-14 shadow-2xl transition-all duration-500 relative overflow-hidden flex flex-col items-center text-center justify-center border border-white/10"
                                >
                                    {/* Subtle Decorative Pattern */}
                                    <div className="absolute inset-0 opacity-10 pointer-events-none group-hover:scale-125 transition-transform duration-700">
                                        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full stroke-white">
                                            <circle cx="100" cy="100" r="40" strokeWidth="0.5"/>
                                            <circle cx="100" cy="100" r="60" strokeWidth="0.5"/>
                                            <circle cx="100" cy="100" r="80" strokeWidth="0.5"/>
                                        </svg>
                                    </div>
                                    {/* Gold top accent */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-secondary rounded-b-full" />

                                    <h4 className="text-lg md:text-xl font-heading font-black text-white mb-6 tracking-wide leading-tight relative z-10 uppercase">
                                        {p.title}
                                    </h4>
                                    
                                    <p className="text-sm md:text-base text-white/80 leading-relaxed font-body relative z-10">
                                        {p.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default CompanyOverview;
