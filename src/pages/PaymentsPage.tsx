import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import OfficeFinder from "@/components/OfficeFinder";
import { HelpCircle, Phone, Mail } from "lucide-react";
import heroImage from "@/assets/primary-school/random/random1.jpg";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const PaymentsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title="School Fees & Payments"
        subtitle="Transparent and Secure Financial Administration"
        backgroundImage={heroImage}
      />

      <section className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">

          <div className="text-center mb-20">

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-[1.1] tracking-tight mb-8"
            >
              School Fees <span className="text-primary">Administration</span>
            </motion.h2>
            <p className="text-base md:text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
              We offer structured, secure, and convenient payment channels for tuition, boarding,
              and extracurricular activities.
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-12 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-slate-50 border-2 border-slate-100 rounded-[4rem] p-12 lg:p-20 text-center relative"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center text-white shadow-xl">
                <HelpCircle className="w-10 h-10" />
              </div>

              <h3 className="text-2xl font-heading font-bold text-foreground tracking-tight mb-6">
                Need payment assistance?
              </h3>
              <p className="text-base text-muted-foreground font-medium mb-12 max-w-xl mx-auto">
                Our finance and accounts department is available for direct consultation regarding fee structures,
                flexible payment plans, and billing queries.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="tel:+263242123456"
                  className="group flex items-center justify-center gap-4 bg-primary text-white px-10 py-6 rounded-2xl font-bold text-[11px] tracking-normal shadow-xl shadow-primary/20 hover:scale-105 transition-all"
                >
                  <Phone className="w-4 h-4" />
                  Contact Finance Office
                </a>
                <a
                  href="mailto:accounts@martinhouseschool.com"
                  className="group flex items-center justify-center gap-4 bg-white text-foreground border-2 border-slate-200 px-10 py-6 rounded-2xl font-bold text-[11px] tracking-normal shadow-xl hover:border-primary transition-all"
                >
                  <Mail className="w-4 h-4" />
                  Email Accounts
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <OfficeFinder />
      <Footer />
    </div>
  );
};

export default PaymentsPage;
