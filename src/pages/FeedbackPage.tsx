import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import OfficeFinder from "@/components/OfficeFinder";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Send, Sparkles, Star } from "lucide-react";
import heroImage from "@/assets/primary-school/random/random3.jpg";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const FeedbackPage = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    comments: "",
    recommendations: "",
  });

  useEffect(() => {
    emailjs.init("x3N-qoH77ZvmAgIx8");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceID = 'service_78vfs4g';
      const templateID = 'template_9wn3mqg';
      await emailjs.send(serviceID, templateID, form);
      toast({ title: "Feedback Submitted!", description: "Thank you for your valuable feedback." });
      setForm({ name: '', company: '', email: '', phone: '', comments: '', recommendations: '' });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast({ title: 'Error', description: 'Failed to send feedback.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <PageHero
        title="Customer Feedback"
        subtitle="We value your feedback and recommendations"
        backgroundImage={heroImage}
      />

      <section className="py-24 lg:py-36 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">

            <div className="text-center mb-16">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-xs font-black uppercase tracking-[0.2em] mb-6 shadow-lg shadow-primary/20"
              >
                <MessageSquare className="h-4 w-4" />
                Continuous Improvement
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-7xl font-heading font-black text-foreground leading-tight tracking-tighter uppercase mb-8"
              >
                Share Your <span className="text-primary">Experience</span>
              </motion.h2>
              <p className="text-xl text-muted-foreground font-medium max-w-2xl mx-auto">
                Your partnership matters. Tell us how we're doing and how we can elevate
                our protection standards for you.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-white rounded-[4rem] shadow-2xl shadow-primary/5 p-12 lg:p-16 border border-slate-100 relative"
            >
              <div className="absolute top-0 right-10 -translate-y-1/2 w-20 h-20 bg-secondary rounded-2xl flex items-center justify-center text-white shadow-xl rotate-6">
                <Star className="w-10 h-10 fill-white" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Full Name</Label>
                    <Input name="name" value={form.name} onChange={handleChange} required placeholder="Tendai Moyo" className="h-14 bg-slate-50 border-none rounded-2xl font-bold focus-visible:ring-primary/20" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Organization</Label>
                    <Input name="company" value={form.company} onChange={handleChange} placeholder="Company Name" className="h-14 bg-slate-50 border-none rounded-2xl font-bold focus-visible:ring-primary/20" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Email Address</Label>
                    <Input name="email" type="email" value={form.email} onChange={handleChange} required placeholder="name@company.co.zw" className="h-14 bg-slate-50 border-none rounded-2xl font-bold focus-visible:ring-primary/20" />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Phone Number</Label>
                    <Input name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+263..." className="h-14 bg-slate-50 border-none rounded-2xl font-bold focus-visible:ring-primary/20" />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Your Feedback</Label>
                  <Textarea name="comments" value={form.comments} onChange={handleChange} required placeholder="Please share your comments or concerns..." rows={5} className="bg-slate-50 border-none rounded-[2rem] font-bold focus-visible:ring-primary/20 resize-none p-6" />
                </div>

                <div className="space-y-3">
                  <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground ml-2">Recommendations</Label>
                  <Textarea name="recommendations" value={form.recommendations} onChange={handleChange} placeholder="How can we improve our services?" rows={3} className="bg-slate-50 border-none rounded-[2rem] font-bold focus-visible:ring-primary/20 resize-none p-6" />
                </div>

                <div className="pt-6">
                  <Button type="submit" disabled={isSubmitting} size="lg" className="h-16 px-12 bg-primary hover:bg-accent text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-primary/20 gap-3 hover:scale-105 transition-all w-full">
                    {isSubmitting ? "Submitting..." : "Submit Experience"}
                    <Send className="h-4 w-4" />
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

export default FeedbackPage;
