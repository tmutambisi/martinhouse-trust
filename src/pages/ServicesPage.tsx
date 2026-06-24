import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Heart, 
  Users, 
  Sparkles, 
  GraduationCap, 
  CheckCircle2, 
  ShieldCheck, 
  Home, 
  Award, 
  Activity, 
  Utensils, 
  Clock, 
  ArrowRight,
  Terminal,
  Globe,
  Palette,
  Trophy,
  Flame,
  Music,
  Sprout,
  Compass,
  ArrowUpRight
} from "lucide-react";

// Assets
import servicesHeroImg from "@/assets/secondary-school/school/random1.jpg";
import art1Img from "@/assets/art1.jpg";
import pastoralCareImg from "@/assets/pastoral-care.jpg";
import prepBoardingImg from "@/assets/prep-boarding.jpg";
import prepCultureImg from "@/assets/prep-culture.jpg";
import highxlScience from "@/assets/highxl-science.jpg";

export const ServicesPage = () => {
    const [activeTab, setActiveTab] = useState<"college" | "prep">("college");

    return (
        <div className="min-h-screen bg-white font-body">
            <Navbar />

            <main className="pt-16">
                {/* Banner Hero */}
                <PageHero
                    title="Academics & Pathways"
                    subtitle="Explore our vibrant, holistic curriculum and co-curricular programs across Martin House Prep and College."
                    backgroundImage={servicesHeroImg}
                />

                {/* Tab Switcher Section */}
                <section className="py-8 bg-slate-50 border-b border-slate-100 sticky top-20 z-40 backdrop-blur-md bg-slate-50/85">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                            <div>
                                <h2 className="text-xl md:text-2xl font-heading font-black text-primary uppercase tracking-tight">
                                    Educational Departments
                                </h2>
                                <p className="text-xs text-slate-500 font-medium">Select a department to view curriculum, support, and co-curricular programs.</p>
                            </div>
                            
                            {/* Premium Tab Buttons */}
                            <div className="flex bg-slate-200/60 p-1.5 rounded-full border border-slate-200/80 w-full sm:w-auto">
                                <button
                                    onClick={() => setActiveTab("college")}
                                    className={`flex-1 sm:flex-none px-8 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                                        activeTab === "college"
                                            ? "bg-primary text-white shadow-lg"
                                            : "text-slate-600 hover:text-primary hover:bg-slate-100/50"
                                    }`}
                                >
                                    Martin House College
                                </button>
                                <button
                                    onClick={() => setActiveTab("prep")}
                                    className={`flex-1 sm:flex-none px-8 py-3 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 ${
                                        activeTab === "prep"
                                            ? "bg-primary text-white shadow-lg"
                                            : "text-slate-600 hover:text-primary hover:bg-slate-100/50"
                                    }`}
                                >
                                    Martin House Prep
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Active Department Content */}
                <AnimatePresence mode="wait">
                    {activeTab === "college" ? (
                        <motion.div
                            key="college"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* COLLEGE ACADEMICS OVERVIEW */}
                            <section className="py-20 lg:py-28 bg-white">
                                <div className="container mx-auto px-6 max-w-7xl">
                                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                                        
                                        {/* Left Side: Overview & Purpose */}
                                        <div className="lg:col-span-7 space-y-10">
                                            <div className="space-y-4">
                                                <span className="inline-block px-4 py-1.5 bg-secondary/15 text-primary rounded-full text-[10px] font-black tracking-widest uppercase border border-secondary/30">
                                                    Secondary Education
                                                </span>
                                                <h3 className="text-3xl md:text-5xl font-heading font-black text-primary leading-tight uppercase">
                                                    College Academics
                                                </h3>
                                            </div>
                                            
                                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                                At Martin House, our Academic section lies at the core of everything we do. We deliver a dynamic, inclusive curriculum that challenges, inspires, and develops every learner. From early years through to senior secondary, we blend strong academic foundations with vital 21st-century skills—critical thinking, digital literacy, and collaboration—preparing students to thrive in a rapidly changing world.
                                            </p>

                                            <div className="space-y-6 pt-6 border-t border-slate-100">
                                                <h4 className="text-lg font-heading font-black text-primary uppercase tracking-tight">Our Purpose</h4>
                                                <p className="text-slate-600">
                                                    We do more than teach—we ignite a lifelong love of learning. We believe true success goes beyond grades, shaping confident, resilient and curious individuals. Our approach:
                                                </p>
                                                <div className="grid gap-4">
                                                    {[
                                                        "Equips students for internationally recognised qualifications and higher education",
                                                        "Encourages independence and ownership of learning",
                                                        "Ensures every student is supported to achieve their very best"
                                                    ].map((item, idx) => (
                                                        <div key={idx} className="flex items-start gap-4">
                                                            <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-1">
                                                                <CheckCircle2 className="w-4 h-4 text-primary" />
                                                            </div>
                                                            <span className="text-slate-700 font-bold text-sm">{item}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right Side: Key Info & Learning Support */}
                                        <div className="lg:col-span-5 space-y-8">
                                            {/* Key Info Card */}
                                            <div className="bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
                                                <h4 className="text-lg font-heading font-black text-primary uppercase tracking-wider mb-8 flex items-center gap-3">
                                                    <Award className="w-5 h-5 text-secondary" />
                                                    Key Information
                                                </h4>
                                                <div className="space-y-6">
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Curriculum</span>
                                                        <p className="text-sm font-bold text-primary">Cambridge (Checkpoint, IGCSE, AS & A Level)</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Faculty</span>
                                                        <p className="text-sm font-bold text-primary">Expert, passionate subject specialists committed to excellence</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Support</span>
                                                        <p className="text-sm font-bold text-primary">Personalised learning through close collaboration with the Learning Support department</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Admissions CTA */}
                                            <div className="bg-primary text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#080838] to-[#00001a] -z-10" />
                                                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-500" />
                                                <h4 className="text-2xl font-heading font-black mb-4 uppercase tracking-tight">Begin the Journey</h4>
                                                <p className="text-white/85 text-xs leading-relaxed mb-8 font-medium">
                                                    Enroll your child at Martin House College and secure a pathway to global academic opportunities and character development.
                                                </p>
                                                <Button asChild className="rounded-full h-12 px-8 bg-secondary text-primary font-black text-xs tracking-widest uppercase hover:bg-white hover:scale-105 transition-all shadow-lg w-full sm:w-auto">
                                                    <Link to="/quote">
                                                        Apply Now
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* LEARNING SUPPORT */}
                            <section className="py-20 lg:py-28 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
                                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
                                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                                    <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl border border-slate-100">
                                        <div className="flex flex-col md:flex-row gap-8 md:items-center border-b border-slate-100 pb-8 mb-8">
                                            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center shrink-0">
                                                <ShieldCheck className="w-8 h-8 text-primary" />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Support Services</span>
                                                <h3 className="text-2xl md:text-4xl font-heading font-black text-primary uppercase mt-1">
                                                    Learning Support
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="space-y-6 text-slate-600 leading-relaxed font-medium">
                                            <p className="text-base md:text-lg">
                                                At Martin House College, our Learning Support Department ensures that every student can learn with confidence and succeed without barriers. We provide tailored support that recognises individual needs, equipping learners with practical strategies to enhance their understanding and unlock their full potential.
                                            </p>
                                            <p className="text-base md:text-lg">
                                                Our goal is not only to support learning, but to build independence, resilience and self-belief. Through personalised guidance, students develop essential skills such as organisation, time management, comprehension and effective revision—skills that benefit them far beyond the classroom.
                                            </p>
                                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 mt-6 font-bold text-sm text-primary flex gap-4 items-start">
                                                <Sparkles className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                                                <p>
                                                    We also prepare students to make confident use of approved access arrangements in assessments and examinations. By familiarising them with these provisions, we create a fair and supportive environment in which every student can demonstrate their true ability.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* PASTORAL CARE */}
                            <section className="py-20 lg:py-28 bg-white">
                                <div className="container mx-auto px-6 max-w-7xl">
                                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                                        
                                        {/* Left Side: Photo/Illustration */}
                                        <div className="lg:col-span-5 relative">
                                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-slate-100 bg-slate-100">
                                                <img src={pastoralCareImg} alt="Pastoral Care - Martin House" className="w-full h-full object-cover" />
                                            </div>
                                        </div>

                                        {/* Right Side: Pastoral Care Copy */}
                                        <div className="lg:col-span-7 space-y-10">
                                            <div className="space-y-4">
                                                <span className="inline-block px-4 py-1.5 bg-secondary/15 text-primary rounded-full text-[10px] font-black tracking-widest uppercase border border-secondary/30">
                                                    Wellbeing & Character
                                                </span>
                                                <h3 className="text-3xl md:text-5xl font-heading font-black text-primary leading-tight uppercase">
                                                    Pastoral Care
                                                </h3>
                                            </div>

                                            <p className="text-lg text-slate-600 leading-relaxed font-medium italic border-l-4 border-secondary pl-6">
                                                "At Martin House, Pastoral Care is at the heart of student life. Guided by our values of Honour, Respect and Compassion, we create a safe, inclusive and nurturing environment where every learner feels valued, supported and empowered to succeed."
                                            </p>

                                            <div className="space-y-4">
                                                <h4 className="text-lg font-heading font-black text-primary uppercase tracking-tight">Our Purpose</h4>
                                                <p className="text-slate-600 leading-relaxed text-sm">
                                                    Our aim is to develop the whole individual—academically, socially, emotionally and spiritually. We believe students flourish when they feel secure, understood and respected. Through strong pastoral support, we foster confidence, resilience, positive behaviour and a strong sense of responsibility, preparing students to make meaningful contributions to society.
                                                </p>
                                            </div>

                                            <div className="pt-6 border-t border-slate-100 space-y-6">
                                                <h4 className="text-sm font-black tracking-widest text-primary uppercase">Student Experience</h4>
                                                <div className="grid md:grid-cols-3 gap-6">
                                                    {[
                                                        { title: "Tutor Time", desc: "Personalised guidance, monitoring progress and supporting wellbeing" },
                                                        { title: "Assemblies", desc: "Celebrating achievement and reinforcing school values" },
                                                        { title: "Chapel Services", desc: "Encouraging reflection, integrity and spiritual growth" }
                                                    ].map((item, idx) => (
                                                        <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
                                                            <h5 className="font-heading font-black text-sm text-primary uppercase tracking-wide mb-2">{item.title}</h5>
                                                            <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* CLUBS & CO-CURRICULAR */}
                            <section className="py-20 lg:py-32 bg-slate-50 border-t border-slate-100">
                                <div className="container mx-auto px-6 max-w-7xl">
                                    
                                    {/* Section Heading */}
                                    <div className="mb-20 text-center flex flex-col items-center">
                                        <span className="inline-block px-4 py-1.5 bg-secondary/15 text-primary rounded-full text-[10px] font-black tracking-widest uppercase border border-secondary/30 mb-4">
                                            Holistic Growth
                                        </span>
                                        <h2 className="text-3xl md:text-5xl font-heading font-black text-primary uppercase tracking-tight">
                                            Clubs & Cultural Life
                                        </h2>
                                        <p className="text-slate-500 text-sm max-w-xl mt-4">Discover the creative, scientific, and global leadership pathways available to College students.</p>
                                    </div>

                                    {/* Featured Art Showcase */}
                                    <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 md:p-14 shadow-xl mb-16 relative overflow-hidden grid lg:grid-cols-12 gap-12 items-center">
                                        <div className="absolute top-0 left-0 w-4 h-full bg-secondary" />
                                        
                                        <div className="lg:col-span-8 space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-primary">
                                                    <Palette className="w-6 h-6" />
                                                </div>
                                                <h3 className="text-xl md:text-3xl font-heading font-black text-primary uppercase tracking-tight">
                                                    Featured Pathway: Fine Arts
                                                </h3>
                                            </div>
                                            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                                                Art continues to thrive at Martin House College, forming a vibrant part of the school's cultural life. Our recent exhibition and auction showcased an inspiring collection of work from pupils and local community artists, attracting enthusiastic support and raising valuable funds. The event was a great success, celebrating creativity, talent and collaboration. Across all year groups, students demonstrate remarkable artistic ability, ensuring that art remains a lively and valued thread throughout the school community.
                                            </p>
                                        </div>

                                        <div className="lg:col-span-4 aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 shadow-lg relative bg-slate-50">
                                            <img src={art1Img} alt="Fine Arts - Martin House Showcase" className="w-full h-full object-cover" />
                                        </div>
                                    </div>

                                    {/* Featured JETS Science Club */}
                                    <div className="bg-white text-slate-800 rounded-[3rem] p-8 md:p-16 shadow-xl border border-slate-200/60 mb-16 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
                                        <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-center">
                                            <div className="lg:col-span-7 space-y-8">
                                                <div className="space-y-2">
                                                    <span className="text-secondary text-[10px] font-black tracking-widest uppercase">Junior Engineers, Technicians and Scientists</span>
                                                    <h3 className="text-3xl md:text-5xl font-heading font-black tracking-tight uppercase text-primary">
                                                        JETS Science Club
                                                    </h3>
                                                </div>
                                                <blockquote className="border-l-4 border-secondary pl-6 italic text-lg text-slate-700">
                                                    "What happens when curiosity meets experimentation? Amazing discoveries! Our members don't just learn science from textbooks—they experience it firsthand."
                                                </blockquote>
                                                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                                                    From exciting chemical reactions to engineering challenges and scientific investigations, every meeting is an opportunity to explore, learn, and innovate. Today's experiment inspires tomorrow's scientist.
                                                </p>
                                                <div className="pt-2">
                                                    <h4 className="font-heading font-black uppercase tracking-tight text-primary mb-4 flex items-center gap-3">
                                                        <Flame className="w-5 h-5 text-secondary" />
                                                        Why Join JETS?
                                                    </h4>
                                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-bold text-slate-600">
                                                        {[
                                                            "Conduct exciting hands-on laboratory experiments",
                                                            "Develop practical scientific and inquiry skills",
                                                            "Build creativity and problem-solving abilities",
                                                            "Participate in STEM competitions and school projects",
                                                            "Prepare for careers in science, technology, engineering, and medicine"
                                                        ].map((point, idx) => (
                                                            <li key={idx} className="flex items-start gap-3">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                                                                <span>{point}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                                <div className="text-primary text-sm font-black uppercase tracking-widest pt-2">
                                                    Think. Experiment. Discover. Innovate.
                                                </div>
                                            </div>

                                            <div className="lg:col-span-5 relative">
                                                <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-slate-100 shadow-2xl relative group bg-slate-50">
                                                    <img src={highxlScience} alt="JETS Science Lab at Martin House" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                                        <p className="text-white text-xs font-bold uppercase tracking-widest">Active Science & Discovery Lab</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* General Clubs Grid */}
                                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            {
                                                title: "Afrikaans Club",
                                                desc: "A welcoming space for building conversational confidence. Provides high-level academic support, reading, and exam preparation for native speakers taking IGCSE Afrikaans.",
                                                icon: Compass,
                                                color: "bg-secondary/15 text-primary"
                                            },
                                            {
                                                title: "Coding Club",
                                                desc: "Develop skills in Python, JavaScript, and HTML/CSS using Codementum. Includes a yearly international tour for competitions, visiting Brazil in 2025 and Rome in 2026.",
                                                icon: Terminal,
                                                color: "bg-primary text-white"
                                            },
                                            {
                                                title: "Community & Outreach",
                                                desc: "Fosters service over self. Actively supports less privileged communities through fundraising, and hosts the school's Mother's Day Tea and annual Christmas Fair.",
                                                icon: Heart,
                                                color: "bg-secondary/15 text-primary"
                                            },
                                            {
                                                title: "MUN & Debate Club",
                                                desc: "Empowers articulate, informed global citizens. Competes in World Scholar's Cup and Pan African Championships, hosting Zambia's first Prep MUN in 2026.",
                                                icon: Globe,
                                                color: "bg-primary text-white"
                                            },
                                            {
                                                title: "Chess Club",
                                                desc: "A stimulating space to explore strategic thinking, problem-solving, and patience in a supportive environment, developing strategic qualities that apply to life.",
                                                icon: Trophy,
                                                color: "bg-secondary/15 text-primary"
                                            }
                                        ].map((club, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                                            >
                                                <div>
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform ${club.color}`}>
                                                        <club.icon className="w-6 h-6" />
                                                    </div>
                                                    <h4 className="text-lg font-heading font-black text-primary uppercase tracking-tight mb-3">
                                                        {club.title}
                                                    </h4>
                                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                                        {club.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </section>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="prep"
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* PREP ACADEMICS OVERVIEW */}
                            <section className="py-20 lg:py-28 bg-white">
                                <div className="container mx-auto px-6 max-w-7xl">
                                    <div className="grid lg:grid-cols-12 gap-16 items-start">
                                        
                                        {/* Left Side: Overview */}
                                        <div className="lg:col-span-7 space-y-10">
                                            <div className="space-y-4">
                                                <span className="inline-block px-4 py-1.5 bg-secondary/15 text-primary rounded-full text-[10px] font-black tracking-widest uppercase border border-secondary/30">
                                                    Primary Education
                                                </span>
                                                <h3 className="text-3xl md:text-5xl font-heading font-black text-primary leading-tight uppercase">
                                                    Prep Academics
                                                </h3>
                                            </div>
                                            
                                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                                At Martin House School, we inspire curiosity, confidence and a lifelong love of learning through the Cambridge Primary Curriculum. From Early Years to Year 7, our learner-centred approach blends academic excellence with creativity, collaboration and strong pastoral care.
                                            </p>
                                            
                                            <p className="text-slate-600 leading-relaxed">
                                                Children build firm foundations in literacy and numeracy in a nurturing Early Years setting, then grow into independent, critical thinkers across Key Stages 1 and 2. Studies in English, Mathematics, Science and a broad curriculum prepare students for Cambridge Checkpoint and beyond.
                                            </p>

                                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-sm text-primary flex gap-4 items-center">
                                                <Sparkles className="w-5 h-5 text-secondary shrink-0" />
                                                <span>Beyond the classroom, sport, arts, clubs and educational trips enrich learning—developing confident, well-rounded individuals ready for the future.</span>
                                            </div>
                                        </div>

                                        {/* Right Side: Curriculum Highlights & Admissions */}
                                        <div className="lg:col-span-5 space-y-8">
                                            <div className="bg-slate-50 p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl relative overflow-hidden">
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-2xl pointer-events-none" />
                                                <h4 className="text-lg font-heading font-black text-primary uppercase tracking-wider mb-8 flex items-center gap-3">
                                                    <BookOpen className="w-5 h-5 text-secondary" />
                                                    Prep Pathways
                                                </h4>
                                                <div className="space-y-6">
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Ages</span>
                                                        <p className="text-sm font-bold text-primary">Early Years to Year 7 (Ages 6–13)</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Framework</span>
                                                        <p className="text-sm font-bold text-primary">Cambridge Primary Curriculum & Checkpoint Assessments</p>
                                                    </div>
                                                    <div className="space-y-1">
                                                        <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Methodology</span>
                                                        <p className="text-sm font-bold text-primary">Learner-centred, creative, collaborative learning combined with pastoral care</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-primary text-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                                                <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#080838] to-[#00001a] -z-10" />
                                                <h4 className="text-2xl font-heading font-black mb-4 uppercase tracking-tight">Apply for Prep</h4>
                                                <p className="text-white/85 text-xs leading-relaxed mb-8 font-medium">
                                                    Give your child a nurturing, world-class foundation under the guidance of our expert primary educators.
                                                </p>
                                                <Button asChild className="rounded-full h-12 px-8 bg-secondary text-primary font-black text-xs tracking-widest uppercase hover:bg-white hover:scale-105 transition-all shadow-lg w-full sm:w-auto">
                                                    <Link to="/quote">
                                                        Apply Now
                                                    </Link>
                                                </Button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>

                            {/* PREP PASTORAL CARE */}
                            <section className="py-20 lg:py-28 bg-slate-50 border-y border-slate-100 relative overflow-hidden">
                                <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
                                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                                    <div className="max-w-4xl mx-auto bg-white p-8 md:p-16 rounded-[3rem] shadow-2xl border border-slate-100">
                                        
                                        <div className="flex flex-col md:flex-row gap-8 md:items-center border-b border-slate-100 pb-8 mb-8">
                                            <div className="w-16 h-16 rounded-2xl bg-secondary/20 flex items-center justify-center shrink-0">
                                                <Heart className="w-8 h-8 text-primary" />
                                            </div>
                                            <div>
                                                <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Prep Wellbeing</span>
                                                <h3 className="text-2xl md:text-4xl font-heading font-black text-primary uppercase mt-1">
                                                    Prep Pastoral Care
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="space-y-8">
                                            <p className="text-base md:text-lg text-slate-600 leading-relaxed font-medium">
                                                At Martin House, we ensure every learner feels safe, supported and valued. Pastoral care is a shared responsibility, built on strong relationships and clear communication. Every learner matters. Every interaction counts.
                                            </p>
                                            
                                            <div className="space-y-4">
                                                <h4 className="text-sm font-black tracking-widest text-primary uppercase">Our Simple & Effective Approach:</h4>
                                                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
                                                    {[
                                                        { step: "1", title: "Notice & Support", desc: "Identify concerns early and respond with care" },
                                                        { step: "2", title: "Communicate", desc: "Involve staff and parents where needed" },
                                                        { step: "3", title: "Monitor", desc: "Track progress and provide ongoing support" },
                                                        { step: "4", title: "Escalate", desc: "Act promptly on serious concerns" }
                                                    ].map((item, idx) => (
                                                        <div key={idx} className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex flex-col justify-between">
                                                            <span className="text-2xl font-heading font-black text-secondary">{item.step}</span>
                                                            <h5 className="font-heading font-black text-xs text-primary uppercase tracking-wide mt-2 mb-1">{item.title}</h5>
                                                            <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-center font-bold text-sm text-primary">
                                                We encourage all students to show respect, take responsibility and seek help when needed.
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </section>

                            {/* PREP HOSTEL */}
                            <section className="py-20 lg:py-28 bg-white">
                                <div className="container mx-auto px-6 max-w-7xl">
                                    <div className="grid lg:grid-cols-12 gap-16 items-center">
                                        
                                        {/* Left Side: Photo/Illustration */}
                                        <div className="lg:col-span-5 relative">
                                            <div className="aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-slate-100 bg-slate-100">
                                                <img src={prepBoardingImg} alt="Prep Boarding Hostel - Martin House" className="w-full h-full object-cover" />
                                            </div>
                                        </div>

                                        {/* Right Side: Hostel Copy */}
                                        <div className="lg:col-span-7 space-y-10">
                                            <div className="space-y-4">
                                                <span className="inline-block px-4 py-1.5 bg-secondary/15 text-primary rounded-full text-[10px] font-black tracking-widest uppercase border border-secondary/30">
                                                    A Home Away From Home
                                                </span>
                                                <h3 className="text-3xl md:text-5xl font-heading font-black text-primary leading-tight uppercase">
                                                    Prep Hostel (Boarding)
                                                </h3>
                                            </div>

                                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                                At Martin House, our Prep Hostel offers a safe, nurturing and welcoming environment for children aged 6–13. More than accommodation, it is a home where students are supported to grow in confidence, independence and character.
                                            </p>

                                            {/* 2x2 Services Grid */}
                                            <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
                                                {[
                                                    { 
                                                        title: "Environment", 
                                                        desc: "Dedicated hostel parents available 24/7. Students develop independence, teamwork, and respect guided by school values.",
                                                        icon: Users 
                                                    },
                                                    { 
                                                        title: "Dining", 
                                                        desc: "Nutritious, balanced meals enjoyed in a warm, social setting that promotes gratitude and positive habits.",
                                                        icon: Utensils 
                                                    },
                                                    { 
                                                        title: "Services", 
                                                        desc: "Daily cleaning and laundry services provided by a dedicated team, encouraging students to respect their environment.",
                                                        icon: Clock 
                                                    },
                                                    { 
                                                        title: "Health & Wellbeing", 
                                                        desc: "Onsite medical clinic and highly responsive care prioritize students' health, offering families complete peace of mind.",
                                                        icon: Activity 
                                                    }
                                                ].map((service, idx) => (
                                                    <div key={idx} className="flex gap-4">
                                                        <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center shrink-0 mt-1 text-primary">
                                                            <service.icon className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <h5 className="font-heading font-black text-xs text-primary uppercase tracking-wide mb-1">{service.title}</h5>
                                                            <p className="text-[11px] text-slate-500 leading-relaxed">{service.desc}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* PREP CLUBS */}
                            <section className="py-20 lg:py-32 bg-slate-50 border-t border-slate-100">
                                <div className="container mx-auto px-6 max-w-7xl">
                                    
                                    {/* Section Heading */}
                                    <div className="mb-20 text-center flex flex-col items-center">
                                        <span className="inline-block px-4 py-1.5 bg-secondary/15 text-primary rounded-full text-[10px] font-black tracking-widest uppercase border border-secondary/30 mb-4">
                                            Creative & Co-Curricular
                                        </span>
                                        <h2 className="text-3xl md:text-5xl font-heading font-black text-primary uppercase tracking-tight">
                                            Prep Clubs & Music
                                        </h2>
                                        <p className="text-slate-500 text-sm max-w-xl mt-4">Nurturing creative expression, rhythmic skills, and life skills for young primary learners.</p>
                                    </div>

                                    {/* Featured Music Showcase */}
                                    <div className="bg-white rounded-[2.5rem] border border-slate-200/80 p-8 md:p-14 shadow-xl mb-16 relative overflow-hidden grid lg:grid-cols-12 gap-12 items-center">
                                        <div className="absolute top-0 left-0 w-4 h-full bg-secondary" />
                                        
                                        <div className="lg:col-span-8 space-y-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center text-primary">
                                                    <Music className="w-6 h-6" />
                                                </div>
                                                <h3 className="text-xl md:text-3xl font-heading font-black text-primary uppercase tracking-tight">
                                                    Music Department Pathways
                                                </h3>
                                            </div>
                                            <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                                                The Music Department at Martin House School inspires creativity, confidence and discipline through both classroom learning and co-curricular activities. It provides students with opportunities to develop their musical talents while fostering teamwork, communication and self-expression. Through structured lessons, rehearsals and performances, students build skills in vocal and instrumental music, while contributing to concerts, recitals and school events that enrich the wider school community.
                                            </p>
                                            
                                            {/* Music Opportunities List */}
                                            <div className="grid sm:grid-cols-3 gap-6 pt-4 border-t border-slate-100">
                                                {[
                                                    { title: "Dance & Rhythm Club", sub: "Junior Primary", desc: "Coordination, rhythm and creativity through movement." },
                                                    { title: "Ensemble & Choirs", sub: "Senior Primary & College", desc: "Vocal training and regional event competitions." },
                                                    { title: "Singing & Djembe", sub: "Primary Ensemble", desc: "Rhythm, aural skills and deep cultural awareness." }
                                                ].map((opp, idx) => (
                                                    <div key={idx} className="space-y-1">
                                                        <h5 className="font-heading font-black text-xs text-primary uppercase tracking-wide">{opp.title}</h5>
                                                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{opp.sub}</span>
                                                        <p className="text-[10px] text-slate-500 leading-relaxed mt-1">{opp.desc}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="lg:col-span-4 aspect-[4/3] rounded-2xl overflow-hidden border border-slate-100 shadow-lg relative bg-slate-50">
                                            <img src={prepCultureImg} alt="Prep Music & Culture - Martin House" className="w-full h-full object-cover" />
                                        </div>
                                    </div>

                                    {/* Prep Clubs Grid */}
                                    <div className="grid md:grid-cols-3 gap-6">
                                        {[
                                            {
                                                title: "Book Club",
                                                desc: "A welcoming and engaging space for readers. Involves discussions, creative activities, and quiet reading time, exploring adventure, mystery, fantasy, and non-fiction.",
                                                icon: BookOpen,
                                                color: "bg-secondary/15 text-primary"
                                            },
                                            {
                                                title: "Cooking Club",
                                                desc: "A fun, hands-on opportunity to explore cooking and baking. Students build kitchen safety, hygiene, teamwork, organization, and independent life skills.",
                                                icon: Clock,
                                                color: "bg-primary text-white"
                                            },
                                            {
                                                title: "Young Farmers",
                                                desc: "Hands-on agricultural and sustainability experience. Includes gardening, animal care, and local farmer visits, connecting classroom learning in STEM directly to nature.",
                                                icon: Sprout,
                                                color: "bg-secondary/15 text-primary"
                                            }
                                        ].map((club, idx) => (
                                            <div
                                                key={idx}
                                                className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                                            >
                                                <div>
                                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-105 transition-transform ${club.color}`}>
                                                        <club.icon className="w-6 h-6" />
                                                    </div>
                                                    <h4 className="text-lg font-heading font-black text-primary uppercase tracking-tight mb-3">
                                                        {club.title}
                                                    </h4>
                                                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                                        {club.desc}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                </div>
                            </section>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Closing CTA */}
                <section className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
                    <div className="container mx-auto px-6 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="max-w-5xl mx-auto bg-primary text-white rounded-3xl p-12 lg:p-20 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-primary via-[#080838] to-[#00001a] -z-10" />
                            {/* Patterns */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1.5px 1.5px, white 1.5px, transparent 0)', backgroundSize: '60px 60px' }} />

                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight mb-8 relative z-10 uppercase leading-none">
                                Join the Martin House Family
                            </h2>
                            <p className="text-white/80 max-w-xl mx-auto text-sm leading-relaxed mb-12 relative z-10 font-medium">
                                Schedule a physical campus tour or submit an admissions enquiry directly to our registrar's office.
                            </p>
                            <Button asChild size="lg" className="h-16 px-12 rounded-full bg-secondary text-primary font-black tracking-wider shadow-2xl hover:scale-105 hover:bg-white transition-all duration-300 relative z-10 text-xs uppercase">
                                <Link to="/quote">
                                    Admissions & Enquiries
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
};

export default ServicesPage;
