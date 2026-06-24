import { motion } from "framer-motion";
import { Heart, Leaf, School, Users } from "lucide-react";
import socialImage from "@/assets/primary-school/random/random2.jpg";

const initiatives = [
  {
    icon: School,
    title: "Community Literacy Programmes",
    description: "Students volunteer to support literacy and numeracy in local primary schools.",
  },
  {
    icon: Leaf,
    title: "Environmental Stewardship",
    description: "Tree planting, recycling drives, and sustainability projects across our campuses.",
  },
  {
    icon: Heart,
    title: "Charity & Outreach",
    description: "Fundraising and donation drives for hospitals, orphanages, and community partners.",
  },
  {
    icon: Users,
    title: "Youth Leadership",
    description: "Peer mentorship programmes that develop empathy, service, and civic responsibility.",
  },
];

const SocialResponsibilitySection = () => (
  <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
    <div className="container mx-auto px-6 relative z-10">
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-2 bg-primary text-white rounded-full text-[10px] font-bold tracking-wider mb-6">
            Community Service
          </span>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight mb-6">
            Making a difference beyond the classroom
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed font-medium">
            At Martin House, we believe in making a positive impact beyond the classroom. Our social responsibility
            initiatives focus on community development, environmental awareness, and support for local primary schools.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-[3rem] overflow-hidden shadow-2xl bg-primary/5 flex items-center justify-center aspect-[4/3] border border-primary/10"
        >
          <div className="text-center p-8 flex flex-col items-center">
            <Heart className="w-20 h-20 text-primary/40 mb-4 animate-pulse" />
            <p className="text-primary/60 text-sm font-bold uppercase tracking-widest font-heading">Community Outreach</p>
          </div>
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {initiatives.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-slate-50 rounded-[2rem] p-8 border border-slate-100 hover:border-primary/20 hover:shadow-xl transition-all"
          >
            <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg">
              <item.icon className="w-7 h-7" />
            </div>
            <h3 className="text-lg font-heading font-bold text-slate-900 mb-3">{item.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialResponsibilitySection;
