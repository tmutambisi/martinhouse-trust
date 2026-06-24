import { motion } from "framer-motion";
import { Award, Star, Trophy, ShieldCheck } from "lucide-react";

const awards = [
    { name: "Cambridge Excellence", title: "Cambridge Assessment International Education Center", icon: Award },
    { name: "Academic Merit", title: "Top 10 National Academic Ranking (ZIMSEC)", icon: Trophy },
    { name: "Sports Champion", title: "National Secondary Schools Sports Championship Winner", icon: Star },
    { name: "Eco Campus Award", title: "Harare Council Environmental Care Recognition", icon: ShieldCheck },
    { name: "Innovation in Ed", title: "Ministry of Education STEM Innovation Award", icon: Award },
];

const AchievementsSection = () => {
    return (
        <section className="py-20 bg-slate-50 overflow-hidden border-y border-slate-100 font-body">
            <div className="container mx-auto px-4 mb-16 text-center">
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight">
                    Our <span className="text-primary">Accolades & Recognition</span>
                </h2>
                <p className="text-muted-foreground mt-4 text-sm font-semibold uppercase tracking-wider">Honoring excellence in academics, sports, and community outreach</p>
            </div>

            <div className="relative">
                {/* Infinite Scrolling Marquee */}
                <div className="flex overflow-hidden select-none">
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="flex gap-8 shrink-0 items-center py-6 px-4"
                    >
                        {awards.map((award, i) => {
                            const Icon = award.icon;
                            return (
                                <div key={i} className="shrink-0 group/card hover:-translate-y-2 transition-transform duration-500">
                                    <div className="w-[300px] h-[240px] bg-white rounded-3xl p-8 border border-slate-100 shadow-lg flex flex-col justify-between items-center text-center hover:border-primary/20 transition-all duration-300">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover/card:bg-primary group-hover/card:text-white transition-colors duration-300">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-bold text-slate-900 text-lg mb-2">{award.name}</h3>
                                            <p className="text-slate-500 text-xs font-semibold leading-relaxed leading-snug">{award.title}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>

                    {/* Duplicate for seamless loop */}
                    <motion.div
                        initial={{ x: 0 }}
                        animate={{ x: "-100%" }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="flex gap-8 shrink-0 items-center py-6 px-4"
                    >
                        {awards.map((award, i) => {
                            const Icon = award.icon;
                            return (
                                <div key={`dup-${i}`} className="shrink-0 group/card hover:-translate-y-2 transition-transform duration-500">
                                    <div className="w-[300px] h-[240px] bg-white rounded-3xl p-8 border border-slate-100 shadow-lg flex flex-col justify-between items-center text-center hover:border-primary/20 transition-all duration-300">
                                        <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover/card:bg-primary group-hover/card:text-white transition-colors duration-300">
                                            <Icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-bold text-slate-900 text-lg mb-2">{award.name}</h3>
                                            <p className="text-slate-500 text-xs font-semibold leading-relaxed leading-snug">{award.title}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AchievementsSection;
