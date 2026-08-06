import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import heroImage from "@/assets/secondary-school/school/bio1.jpg";
import { motion } from "framer-motion";

const contacts = [
  {
    icon: MapPin,
    label: "Visit Our Campus",
    value: "Kalundu Farm, Chisamba, Zambia",
    sub: "Open Monday – Friday, 7:00 am – 5:00 pm",
  },
  {
    icon: Phone,
    label: "Call Administration",
    value: "+260 962 143 920",
    sub: "Available during school hours",
  },
  {
    icon: Mail,
    label: "Email Admissions",
    value: "info@martinhouseschool.com",
    sub: "We reply within one business day",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Fri · 7:00 am – 5:00 pm",
    sub: "Closed on public holidays",
  },
];

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />

      <PageHero
        title="Contact us"
        subtitle="Get in touch with Martin House for admissions, school tours, and academic enquiries"
        backgroundImage={heroImage}
      />

      {/* Main Content */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-5xl">

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 leading-tight tracking-tight mb-4">
              Invest in <span className="text-[#0c2865]">their future</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Connect with our administration team for enquiries regarding admissions, curriculum, sports, and school activities.
            </p>
          </motion.div>

          {/* Blue Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="bg-[#0c2865] rounded-[2rem] overflow-hidden shadow-2xl"
          >
            {/* Card header strip */}
            <div className="px-8 pt-10 pb-8 border-b border-white/10">
              <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-white/50 mb-1">Martin House Trust School</p>
              <h3 className="text-2xl font-bold text-white">We'd love to hear from you</h3>
            </div>

            {/* Contact rows */}
            <div className="divide-y divide-white/10">
              {contacts.map(({ icon: Icon, label, value, sub }, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-6 px-8 py-7 hover:bg-white/5 transition-colors duration-200"
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-white" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-white/50 mb-0.5">{label}</p>
                    <p className="text-white font-bold text-lg leading-snug">{value}</p>
                    <p className="text-white/50 text-xs mt-0.5">{sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Card footer */}
            <div className="px-8 py-6 bg-white/5 flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <p className="text-white/60 text-xs font-medium">Our administration team is available during school hours</p>
            </div>
          </motion.div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContactPage;
