import { Star } from 'lucide-react';
import clientImg from '@/assets/secondary-school/school/bio1.jpg';
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Tungamirai Mutambisi",
    role: "Parent of Alumni",
    company: "Class of 2022",
    content: "Martin House has been an incredible environment for our children. The academic focus combined with the school's strong moral values prepared my son perfectly for his university studies abroad.",
    rating: 5,
  },
  {
    name: "Michael Chaminuka",
    role: "Parent of Grade 11 Student",
    company: "Harare",
    content: "The dedication of the teachers and the state-of-the-art facilities, especially the science laboratories, have inspired a real love for learning in my daughter. I highly recommend Martin House.",
    rating: 5,
  },
  {
    name: "Tayambira Chibwe",
    role: "Alumni",
    company: "Software Engineer",
    content: "My time at Martin House was transformative. The leadership opportunities, debate club, and computer science labs gave me the confidence and foundational skills to excel in my career today.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-8 lg:py-12 bg-white relative overflow-hidden font-body">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center mb-12 lg:mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >


            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl border-[12px] border-white group bg-slate-100">
              <img
                src={clientImg}
                alt="Parent Representative"
                className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform transition-duration-[1s]"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 leading-[1.1] tracking-tight">
                Loved by <br />
                <span className="text-primary relative inline-block">
                  our community
                </span>
              </h2>
            </div>

            <p className="text-xl text-slate-500 leading-relaxed font-bold font-body italic max-w-xl border-l-4 border-slate-200 pl-8">
              "For over 35 years, we've nurtured academic excellence and character development, preparing students to lead with integrity and purpose."
            </p>

            <div className="flex flex-col sm:flex-row gap-8 sm:items-center">
              <div className="flex text-[#0c2865]">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-[#0c2865] text-[#0c2865]" />)}
              </div>
              <div className="flex items-center gap-4">
                <div className="h-4 w-px bg-slate-300 hidden sm:block" />
                <span className="text-[10px] font-bold tracking-tight text-slate-900">98% University Admission Rate</span>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white p-10 rounded-2xl border border-slate-100 shadow-xl hover:shadow-2xl transition-all duration-300 group relative flex flex-col"
            >



              <p className="text-lg text-slate-600 mb-12 leading-relaxed font-medium font-body italic relative z-10 flex-grow">
                "{testimonial.content}"
              </p>

              <div className="flex items-center gap-6 pt-10 border-t border-slate-100">
                <div className="w-14 h-14 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-xl shadow-lg group-hover:bg-primary transition-colors">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <p className="font-heading font-bold text-slate-900 tracking-tight text-base leading-none mb-2">
                    {testimonial.name}
                  </p>
                  <p className="text-[9px] text-primary font-bold tracking-wider leading-tight">
                    {testimonial.role}, <br /> {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
