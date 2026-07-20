import { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import OfficeFinder from "@/components/OfficeFinder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Building, Users, GraduationCap, Send } from "lucide-react";
import heroImage from "@/assets/secondary-school/school/bio1.jpg";
import { motion } from "framer-motion";

const EMAILJS_PUBLIC_KEY = "x3N-qoH77ZvmAgIx8";
const EMAILJS_SERVICE_ID = "default_service";
const EMAILJS_TEMPLATE_ID = "template_aljwz6b";

const QuotePage = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />

      <PageHero
        title="Admissions & Enquiries"
        subtitle="Request admissions guidance or submit an enrollment inquiry to our registrar's office"
        backgroundImage={heroImage}
      />

      <section className="py-16 lg:py-24 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left Column: Benefits & Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10"
            >
              <div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 leading-[1.1] sm:leading-[1.1] tracking-tight mb-4 sm:mb-6 break-words">
                  Admissions <br />
                  <span className="text-primary">enquiries</span>
                </h2>
                <p className="text-base sm:text-lg text-slate-500 font-bold border-l-4 border-slate-100 pl-4 sm:pl-6 mt-6 sm:mt-8 leading-relaxed italic">
                  Obtain guidance, ask about school fees, and schedule a physical campus tour.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: GraduationCap, title: "Admissions Guidance", desc: "Get detailed support through our simple, structured registration and enrollment procedure.", color: "bg-primary" },
                  { icon: Building, title: "Campus Tours", desc: "Schedule a guided tour of our modern laboratories, sports facilities, and boarding houses.", color: "bg-secondary" },
                  { icon: Users, title: "Academic consultation", desc: "Discuss Cambridge International pathways and subject selections directly with our academic deans.", color: "bg-slate-900" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 p-6 bg-slate-50 rounded-xl border border-slate-100 group hover:bg-white hover:shadow-xl transition-all duration-500">
                    <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-105 transition-transform duration-500`}>
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-heading font-bold text-slate-900 tracking-tight mb-1">{item.title}</h4>
                      <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Quote Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4 sm:p-5 md:p-6 lg:p-8 relative"
            >
              <form ref={formRef} onSubmit={async (e) => {
                e.preventDefault();
                if (!formRef.current) return;
                setIsSubmitting(true);
                try {
                  await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formRef.current, EMAILJS_PUBLIC_KEY);
                  toast({ title: "Enquiry Request Sent!", description: "We'll send you admissions details shortly." });
                  formRef.current.reset();
                } catch (error) {
                  toast({ title: "Submission Failed", variant: "destructive" });
                } finally {
                  setIsSubmitting(false);
                }
              }} className="space-y-4">

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold tracking-widest text-primary uppercase ml-1">Parent/Guardian Name</Label>
                    <Input name="from_name" required className="h-10 bg-slate-50 border border-slate-200 rounded-lg font-bold text-xs focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all shadow-sm px-3 text-slate-900" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold tracking-widest text-primary uppercase ml-1">Child's Current Grade / Age</Label>
                    <Input name="from_company" required className="h-10 bg-slate-50 border border-slate-200 rounded-lg font-bold text-xs focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all shadow-sm px-3 text-slate-900" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold tracking-widest text-primary uppercase ml-1">Email address</Label>
                    <Input name="email" type="email" required className="h-10 bg-slate-50 border border-slate-200 rounded-lg font-bold text-xs focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all shadow-sm px-3 text-slate-900" />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-[10px] font-bold tracking-widest text-primary uppercase ml-1">Phone number</Label>
                    <Input name="phone" type="tel" required className="h-10 bg-slate-50 border border-slate-200 rounded-lg font-bold text-xs focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all shadow-sm px-3 text-slate-900" />
                  </div>
                </div>

                <div className="space-y-1">
                  <Label className="text-[10px] font-bold tracking-widest text-primary uppercase ml-1">Subject</Label>
                  <Input name="subject" required className="h-10 bg-slate-50 border border-slate-200 rounded-lg font-bold text-xs focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all shadow-sm px-3 text-slate-900" />
                </div>

                <div className="space-y-1">
                  <Label className="text-[10px] font-bold tracking-widest text-primary uppercase ml-1">Message</Label>
                  <Textarea name="message" required rows={3} className="bg-slate-50 border border-slate-200 rounded-lg font-bold text-xs focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all resize-none shadow-sm p-3 text-slate-900 min-h-[80px]" />
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 px-8 bg-primary hover:bg-secondary text-white rounded-full font-bold text-[10px] tracking-widest uppercase shadow-xl transition-all w-full"
                  >
                    {isSubmitting ? "Processing..." : "Submit Enquiry"}
                    <Send className="w-3 h-3 ml-2" />
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <OfficeFinder />
      <Footer />
    </div>
  );
};

export default QuotePage;
