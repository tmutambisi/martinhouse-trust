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
import { Mail, Phone, MapPin, Send } from "lucide-react";
import heroImage from "@/assets/secondary-school/school/bio1.jpg";
import { motion } from "framer-motion";

const EMAILJS_PUBLIC_KEY = "x3N-qoH77ZvmAgIx8";
const EMAILJS_SERVICE_ID = "default_service";
const EMAILJS_TEMPLATE_ID = "template_aljwz6b";

const ContactPage = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />

      <PageHero
        title="Contact us"
        subtitle="Get in touch with Martin House for admissions, school tours, and academic enquiries"
        backgroundImage={heroImage}
      />

      {/* Main Content */}
      <section className="py-24 lg:py-44 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-start">

            {/* Left: Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-12"
            >
              <div>

                <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 leading-[1.1] tracking-tight mb-6">
                  Invest in <br />
                  <span className="text-primary">their future</span>
                </h2>
                <p className="text-xl text-slate-500 font-bold border-l-4 border-slate-100 pl-8 mt-10 leading-relaxed italic">
                  Connect with our administration team for enquiries regarding admissions, curriculum, sports, and school activities.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: MapPin, label: "Visit Our Campus", value: "Kalundu Farm, Chisamba, Zambia", color: "bg-primary" },
                  { icon: Phone, label: "Call Administration", value: "+260 962 143 920", color: "bg-secondary" },
                  { icon: Mail, label: "Email Admissions", value: "info@martinhouseschool.com", color: "bg-slate-900" }
                ].map((item, i) => (
                  <div key={i} className="flex gap-8 p-10 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-2xl transition-all duration-500">
                    <div className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center text-white shadow-xl shrink-0 group-hover:scale-105 transition-transform duration-500`}>
                      <item.icon className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold tracking-wider text-slate-400 mb-2">{item.label}</p>
                      <p className="text-lg font-bold text-slate-900 tracking-tight">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>

            {/* Right: Modern Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 sm:p-6 md:p-12 lg:p-16 relative"
            >
              <form ref={formRef} onSubmit={async (e) => {
                e.preventDefault();
                if (!formRef.current) return;
                setIsSubmitting(true);
                try {
                  const formData = new FormData(formRef.current);
                  const templateParams = {
                    from_name: formData.get('from_name'),
                    company: formData.get('from_company'),
                    email: formData.get('email'),
                    phone: formData.get('phone'),
                    subject: formData.get('subject'),
                    message: formData.get('message')
                  };
                  
                  console.log("Sending with params:", templateParams);
                  
                  await emailjs.send(
                    EMAILJS_SERVICE_ID,
                    EMAILJS_TEMPLATE_ID,
                    templateParams,
                    EMAILJS_PUBLIC_KEY
                  );
                  
                  toast({ title: "Message Sent!", description: "We'll be in touch shortly." });
                  formRef.current.reset();
                } catch (error) {
                  console.error("Failed to send email:", error);
                  toast({ title: "Submission Failed", description: "Failed to send message. Please try again.", variant: "destructive" });
                } finally {
                  setIsSubmitting(false);
                }
              }} className="space-y-5">

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-primary uppercase ml-1">Full name</Label>
                    <Input name="from_name" required className="h-12 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all shadow-sm px-4 text-slate-900" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-primary uppercase ml-1">Current Grade / Class</Label>
                    <Input name="from_company" className="h-12 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all shadow-sm px-4 text-slate-900" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-primary uppercase ml-1">Email address</Label>
                    <Input name="email" type="email" required className="h-12 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all shadow-sm px-4 text-slate-900" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-[10px] font-bold tracking-widest text-primary uppercase ml-1">Phone number</Label>
                    <Input name="phone" type="tel" required className="h-12 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all shadow-sm px-4 text-slate-900" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest text-primary uppercase ml-1">Subject</Label>
                  <Input name="subject" required className="h-12 bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all shadow-sm px-4 text-slate-900" />
                </div>

                <div className="space-y-2">
                  <Label className="text-[10px] font-bold tracking-widest text-primary uppercase ml-1">Message</Label>
                  <Textarea name="message" required rows={4} className="bg-slate-50 border border-slate-200 rounded-lg font-bold text-sm focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all resize-none shadow-sm p-4 text-slate-900 min-h-[100px]" />
                </div>

                <div className="pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-14 px-10 bg-primary hover:bg-secondary text-white rounded-full font-bold text-xs tracking-widest uppercase shadow-xl transition-all w-full"
                  >
                    {isSubmitting ? "Processing..." : "Send School Enquiry"}
                    <Send className="w-4 h-4 ml-2" />
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

export default ContactPage;
