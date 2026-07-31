import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  name: string;
  relationship: string;
  overall: string;
  rating: number;
  growth: string;
  appreciate: string;
  consent: "named" | "anonymous";
}

const testimonials: Testimonial[] = [
  {
    name: "Noeline Hall",
    relationship: "Parent",
    overall: "So good!",
    rating: 5,
    growth: "For sure!",
    appreciate:
      "The ability to have our Children learn away from home but in a location that logistically allows us to be present and to witness their activities and milestones. The School community interactions and bonds that Students develop amongst Peer Groups, Staff and Stakeholders.",
    consent: "named",
  },
  {
    name: "Anonymous",
    relationship: "Parent",
    overall:
      "As a very new High School it is getting better every day",
    rating: 5,
    growth:
      "Education and Sport are getting better every day. The Children are developing a good sense of Community while still getting a grounded Balanced Education from a diverse teacher Pool.",
    appreciate:
      "The student interaction and diversity within the classroom.",
    consent: "anonymous",
  },
  {
    name: "Anonymous",
    relationship: "Parent",
    overall:
      "Martin House Prep is a true community school that genuinely embodies the belief that children should be allowed to be children. There is no pressure for pupils to fit into a rigid mould; instead, they are encouraged to explore, be curious, and grow in a nurturing environment. At Martin House, learning extends beyond the classroom, with children spending time outdoors, discovering the world around them, while still receiving a high-quality education. It is a school that values individuality, imagination, and childhood in the best possible way.",
    rating: 4,
    growth:
      "As a parent, all you want to hear is that your child is excited to come to school. My child is thriving and genuinely loves being at school. Her teacher is warm and caring, creating a safe and nurturing environment where she can learn and grow with confidence. She is valued as an individual, not just a number, and we especially appreciate that her love for nature is recognised, embraced, and nurtured.",
    appreciate:
      "We were seriously considering withdrawing our child from the prep school last year, as we had significant concerns about the school's management at the time. What ultimately changed our decision was the appointment of Mrs Cardoso as Head of Schools. Her vision, leadership, and genuine care reflect exactly what Martin House needs, and I am full of hope that the school will revive and thrive under her guidance.",
    consent: "anonymous",
  },
  {
    name: "Cassandra Green",
    relationship: "Parent",
    overall:
      "My daughter is only in her second week of high school at Martin House, but she is absolutely loving it — and as parents, that brings us so much peace of mind. We've been genuinely impressed with everything so far… from the professional yet warm and accommodating staff we've met, to the friendly, welcoming prefects who have helped her settle in so quickly. We've also really appreciated the clear and consistent communication on the admin group, and the ladies in the office have been wonderful — patient, helpful, and always willing to answer the many questions we've thrown their way. Well done, Martin House. You've made a truly strong first impression on us as new parents, and we're grateful for the support you've shown our daughter already.",
    rating: 5,
    growth:
      "Time will tell as she continues her MH journey, but I already know that high school is going to grow her personally — giving her the space to make her own decisions without us looking over her shoulder, and encouraging her to choose what's right even when it's not the easiest path.",
    appreciate:
      "What we appreciate most is that the school's location allows our children to be home on weekends. That proximity means we can be present — cheering them on at their sporting, cultural, and other school events, and supporting them as often as we can. We also value the strong leadership we've seen so far and the positive direction the college appears to be moving in.",
    consent: "named",
  },
  {
    name: "Tiya Johnson",
    relationship: "Parent",
    overall: "Pretty amazing. My children are thriving!",
    rating: 5,
    growth:
      "I've absolutely loved the extra lessons offered. My kids have gained a lot. The activity evenings that bring the kids closer together. Team building.",
    appreciate:
      "I've appreciated that the school encourages the kids to get out of their comfort zone. Engage with their peers more and enjoy being at school as well as keeping them in check.",
    consent: "named",
  },
  {
    name: "Anonymous",
    relationship: "Parent",
    overall: "Great",
    rating: 4,
    growth: "My kids' English and public speaking greatly improved.",
    appreciate: "Efforts put in to each kid.",
    consent: "anonymous",
  },
  {
    name: "Juanti Bornman",
    relationship: "Parent",
    overall:
      "We were fortunate to join Martin House College in January 2025, and our overall experience has been extremely positive. From the very beginning, we felt truly at home. The school is exceptionally well organised, with punctual and constructive feedback. Discipline is excellent, and most importantly, our children are happy and thriving academically, in sports, and socially. Based on our experience, Martin House College is by far the best school in Zambia.",
    rating: 5,
    growth:
      "Over the past year, my children have grown tremendously in all areas. Their marks have improved, they are enjoying school again, and they are developing new skills both on the sports field and socially.",
    appreciate:
      "I appreciate how organised the school is — everything runs on time, communication is clear, and there is a genuine commitment to the well-being of the children.",
    consent: "named",
  },
  {
    name: "Anonymous",
    relationship: "Parent",
    overall:
      "I don't have the words for how positive my experience has been with MH, encompassing the education, the discipline, sports, development of the student in all aspects.",
    rating: 5,
    growth:
      "The school identified that there was a learning disability which led me to taking steps needed to support my child — this has had an incredible positive impact on academics.",
    appreciate:
      "The staff, the relationship that the staff develop with the parents. I feel there is an 'open door' policy which allows me to discuss all and any issues with staff openly, be it in person, telephone, email or WhatsApp.",
    consent: "anonymous",
  },
  {
    name: "Anonymous",
    relationship: "Parent",
    overall:
      "We have had a very positive experience. The staff have been enthusiastic, friendly and helpful.",
    rating: 5,
    growth: "The high standard of teaching has helped our child grow academically.",
    appreciate:
      "We appreciate the head teacher who is approachable and who genuinely cares about the students.",
    consent: "anonymous",
  },
  {
    name: "Cheyne Mignot",
    relationship: "Parent",
    overall: "Amazing",
    rating: 5,
    growth: "By being supportive and giving academic support when needed.",
    appreciate:
      "That I can speak to the teacher about my kids and actually get interest back.",
    consent: "named",
  },
];

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`w-4 h-4 ${star <= rating ? "text-[#0c2865] fill-[#0c2865]" : "text-slate-200 fill-slate-200"
          }`}
      />
    ))}
  </div>
);

const TestimonialsPage = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white font-body">
      <Navbar />

      {/* Hero */}
      <div className="relative bg-[#0c2865] py-28 px-6 overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="tgrid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#tgrid)" />
          </svg>
        </div>
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block mb-4 text-xs font-bold uppercase tracking-[0.2em] text-white/60 bg-white/10 border border-white/20 px-4 py-1.5 rounded-full"
          >
            Martin House · Testimonials
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4"
          >
            What Our Families Say
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg"
          >
            Real stories from parents and families who chose Martin House Trust School.
          </motion.p>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-[#0c2865]/5 border-y border-[#0c2865]/10 py-8">
        <div className="max-w-4xl mx-auto px-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-bold text-[#0c2865]">{testimonials.length}</div>
            <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">Testimonials</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#0c2865]">
              {(testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length).toFixed(1)}
            </div>
            <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">Avg. Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-[#0c2865]">
              {testimonials.filter((t) => t.rating === 5).length}
            </div>
            <div className="text-xs font-bold tracking-widest text-slate-500 uppercase">5-Star Reviews</div>
          </div>
        </div>
      </div>

      {/* Testimonials Grid */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => {
            const isExpanded = expanded === i;
            const truncated = t.overall.length > 200;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 p-7 flex flex-col gap-4"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-[#0c2865] text-sm">{t.name}</p>
                    <p className="text-slate-400 text-xs">{t.relationship}</p>
                  </div>
                  <StarRating rating={t.rating} />
                </div>

                {/* Quote icon */}
                <Quote className="w-6 h-6 text-[#0c2865]/20 flex-shrink-0" />

                {/* Overall experience */}
                <div>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {isExpanded || !truncated
                      ? t.overall
                      : t.overall.slice(0, 200) + "…"}
                  </p>
                  {truncated && (
                    <button
                      onClick={() => setExpanded(isExpanded ? null : i)}
                      className="mt-2 text-[#0c2865] text-xs font-bold hover:underline"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>

                {/* What they appreciate */}
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="border-t border-slate-100 pt-4 space-y-3"
                  >
                    {t.growth && (
                      <div>
                        <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">Growth & Development</p>
                        <p className="text-slate-600 text-sm leading-relaxed">{t.growth}</p>
                      </div>
                    )}
                    {t.appreciate && (
                      <div>
                        <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase mb-1">What They Appreciate Most</p>
                        <p className="text-slate-600 text-sm leading-relaxed">{t.appreciate}</p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Footer */}
                <div className="mt-auto pt-2 border-t border-slate-50">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-slate-300">
                    {t.consent === "named" ? "Published with permission" : "Published anonymously"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>



      <Footer />
    </div>
  );
};

export default TestimonialsPage;
