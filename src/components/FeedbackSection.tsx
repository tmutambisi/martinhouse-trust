import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, Upload, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

const FeedbackSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileName, setFileName] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast({
      title: "Feedback Submitted",
      description: "Thank you for your feedback! We appreciate your input.",
    });
    setIsSubmitting(false);
    setFileName("");
    (e.target as HTMLFormElement).reset();
  };

  return (
    <section id="feedback" className="py-24 lg:py-36 bg-white relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full bg-slate-50 opacity-50" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-[9px] font-bold tracking-wider mb-6 shadow-lg shadow-primary/20"
            >
              <MessageSquare className="h-4 w-4" />
              Community feedback
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground leading-[1.1] tracking-tight mb-8"
            >
              We value your <span className="text-primary">voice</span>
            </motion.h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Your insights drive our growth. Help us shape the future of
              education at Martin House.
            </p>
          </div>

          {/* Feedback Form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-[3rem] shadow-2xl shadow-primary/5 p-10 md:p-16 border border-slate-100 relative"
          >


            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="feedback-name" className="text-[9px] font-bold tracking-wider text-muted-foreground ml-2">
                    Full name
                  </Label>
                  <Input
                    id="feedback-name"
                    name="name"
                    placeholder="e.g. Tendai Moyo"
                    required
                    className="h-14 bg-slate-50 border-none rounded-2xl text-foreground font-bold focus-visible:ring-primary/20"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="feedback-company" className="text-[9px] font-bold tracking-wider text-muted-foreground ml-2">
                    Role / Relationship
                  </Label>
                  <Input
                    id="feedback-company"
                    name="company"
                    placeholder="e.g. Parent, Student, Alumnus"
                    className="h-14 bg-slate-50 border-none rounded-2xl text-foreground font-bold focus-visible:ring-primary/20"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <Label htmlFor="feedback-email" className="text-[9px] font-bold tracking-wider text-muted-foreground ml-2">
                    Email address
                  </Label>
                  <Input
                    id="feedback-email"
                    name="email"
                    type="email"
                    placeholder="tendai.moyo@example.com"
                    required
                    className="h-14 bg-slate-50 border-none rounded-2xl text-foreground font-bold focus-visible:ring-primary/20"
                  />
                </div>

                <div className="space-y-3">
                  <Label htmlFor="feedback-phone" className="text-[9px] font-bold tracking-wider text-muted-foreground ml-2">
                    Direct line
                  </Label>
                  <Input
                    id="feedback-phone"
                    name="phone"
                    type="tel"
                    placeholder="+263..."
                    className="h-14 bg-slate-50 border-none rounded-2xl text-foreground font-bold focus-visible:ring-primary/20"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label htmlFor="feedback-comments" className="text-[9px] font-bold tracking-wider text-muted-foreground ml-2">
                  Feedback details
                </Label>
                <Textarea
                  id="feedback-comments"
                  name="comments"
                  placeholder="Share your feedback, ideas, or experiences at Martin House..."
                  required
                  rows={5}
                  className="bg-slate-50 border-none rounded-[2rem] text-foreground font-bold focus-visible:ring-primary/20 resize-none p-6"
                />
              </div>

              <div className="space-y-3">
                <Label className="text-[9px] font-bold tracking-wider text-muted-foreground ml-2">
                  Attachments (optional)
                </Label>
                <div className="relative group">
                  <input
                    type="file"
                    id="feedback-file"
                    name="file"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="flex items-center gap-4 p-6 border-2 border-dashed border-slate-200 rounded-[2rem] group-hover:bg-slate-50 group-hover:border-primary/30 transition-all">
                    <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all">
                      <Upload className="h-6 w-6" />
                    </div>
                    <span className="text-[10px] font-bold tracking-wider text-muted-foreground">
                      {fileName || "Drop files, photos, or documents here"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <Button
                  type="submit"
                  size="lg"
                  className="h-16 px-12 bg-primary hover:bg-accent text-white rounded-2xl font-bold text-sm tracking-normal shadow-2xl shadow-primary/20 gap-3 hover:scale-105 transition-all"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Submit feedback"}
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
