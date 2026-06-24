import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useToast } from "@/hooks/use-toast";
import { Send, MapPin, Mail, Phone } from "lucide-react";
//import FloatingObjects from "./FloatingObjects";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const ContactSection = () => {
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [form, setFormData] = useState({
        company: "",
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const templateParams = {
                from_name: form.name,
                email: form.email,
                company: form.company,
                phone: form.phone,
                address: form.address,
                message: `New enquiry from ${form.name} at ${form.company}. Phone: ${form.phone}. Address: ${form.address}.`
            };

            console.log("Sending with params:", templateParams);

            const response = await emailjs.send(
                "default_service",
                "template_aljwz6b",
                templateParams,
                "x3N-qoH77ZvmAgIx8"
            );

            console.log("Email sent successfully:", response);

            toast({
                title: "Enquiry Sent!",
                description: "Thank you for your enquiry. We'll get back to you soon.",
            });

            setFormData({
                company: "",
                name: "",
                email: "",
                phone: "",
                address: "",
            });
            (e.target as HTMLFormElement).reset();
        } catch (error: any) {
            console.error("Failed to send email:", error);

            toast({
                title: "Error",
                description: "Failed to send enquiry. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <section id="contact" className="py-16 lg:py-24 bg-white relative overflow-hidden font-body">
            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 lg:mb-32">
                    <div className="max-w-3xl">

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-slate-900"
                        >
                            Contact our <br />
                            <span className="text-primary relative inline-block">
                                admissions office
                                <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10" />
                            </span>
                        </motion.h2>
                        <p className="text-lg text-muted-foreground font-bold font-body mt-10 leading-relaxed max-w-2xl border-l-4 border-slate-100 pl-8">
                            Connect with our admissions team for details about enrollment, curriculum, and campus life.
                        </p>
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
                    {/* Contact Info */}
                    <div className="lg:col-span-5 space-y-6">
                        {[
                            {
                                icon: MapPin,
                                label: "School Campus",
                                value: "Kalundu Farm, Chisamba, Zambia",
                                color: "bg-primary"
                            },
                            {
                                icon: Mail,
                                label: "Admissions & Enquiries",
                                value: "info@martinhouseschool.com",
                                color: "bg-secondary"
                            },
                            {
                                icon: Phone,
                                label: "School Reception",
                                value: "+260 962 143 920",
                                color: "bg-slate-900"
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex gap-8 items-center p-8 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-2xl hover:border-primary/10 transition-all duration-500 cursor-default"
                            >
                                <div className={`w-16 h-16 ${item.color} rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform duration-500 shrink-0`}>
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <div>
                                    <p className="text-[11px] font-bold tracking-widest text-muted-foreground mb-2 group-hover:text-primary transition-colors">{item.label}</p>
                                    <p className="text-base font-bold text-foreground tracking-tight leading-tight">{item.value}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-7">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl p-8 lg:p-10 shadow-2xl border border-slate-100 relative overflow-hidden"
                        >
                            <form onSubmit={handleSubmit} className="space-y-5 relative z-10 w-full">
                                <div className="grid md:grid-cols-2 gap-5 w-full">
                                    <div className="space-y-2">
                                        <Label className="text-[11px] font-bold tracking-widest text-primary uppercase ml-1">Full Name</Label>
                                        <Input
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                            className="h-12 bg-slate-50 border border-slate-200 rounded-lg font-bold text-[13px] focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all shadow-sm px-4 text-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[11px] font-bold tracking-widest text-primary uppercase ml-1">Child's Current Grade / Age</Label>
                                        <Input
                                            name="company"
                                            value={form.company}
                                            onChange={handleChange}
                                            className="h-12 bg-slate-50 border border-slate-200 rounded-lg font-bold text-[13px] focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all shadow-sm px-4 text-foreground"
                                        />
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-5 w-full">
                                    <div className="space-y-2">
                                        <Label className="text-[11px] font-bold tracking-widest text-primary uppercase ml-1">Email Address</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            className="h-12 bg-slate-50 border border-slate-200 rounded-lg font-bold text-[13px] focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all shadow-sm px-4 text-foreground"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="text-[11px] font-bold tracking-widest text-primary uppercase ml-1">Phone Line</Label>
                                        <Input
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            required
                                            className="h-12 bg-slate-50 border border-slate-200 rounded-lg font-bold text-[13px] focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all shadow-sm px-4 text-foreground"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[11px] font-bold tracking-widest text-primary uppercase ml-1">Location / Physical Address</Label>
                                    <Input
                                        name="address"
                                        value={form.address}
                                        onChange={handleChange}
                                        className="h-12 bg-slate-50 border border-slate-200 rounded-lg font-bold text-[13px] focus-visible:ring-0 focus-visible:border-primary focus-visible:bg-white transition-all shadow-sm px-4 text-foreground"
                                    />
                                </div>

                                <div className="pt-4">
                                    <Button
                                        type="submit"
                                        className="h-14 px-10 bg-primary hover:bg-secondary text-white rounded-full font-bold text-xs tracking-widest uppercase shadow-xl transition-all w-full"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            "Processing..."
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                Submit inquiry
                                                <Send className="h-4 w-4" />
                                            </span>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;