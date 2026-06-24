import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import { Link } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { newsService } from "@/lib/data-service";
import { Calendar, Clock, FileText, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 }
  }
};

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const NewsSection = () => {
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);
  const [dynamicArticles, setDynamicArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await newsService.getPublished();
        if (response.success && response.data && response.data.length > 0) {
          setDynamicArticles(response.data.slice(0, 3));
        }
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, []);

  const displayArticles = [
    ...dynamicArticles.map(item => ({
      title: item.title,
      excerpt: item.meta_description || item.title,
      date: new Date(item.published_at || item.scheduled_at || item.created_at).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      }),
      category: item.category,
      readTime: "3 min read",
      content: item.content,
      image_url: item.cover_image,
      slug: item.slug
    }))
  ].slice(0, 3);

  return (
    <section id="news" className="py-24 lg:py-36 bg-slate-50/30 relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-1/4 left-1/10 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">

        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 mb-6 tracking-tight"
          >
            Latest <span className="text-slate-900 relative">News & Insights<span className="absolute bottom-1 left-0 w-full h-2 bg-primary/10 -z-10"></span></span>
          </motion.h2>
          <motion.p 
            initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 20 }}
            whileInView={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            className="text-base md:text-lg text-slate-500 font-medium max-w-2xl mx-auto"
          >
            Stay up to date with school announcements, events, achievements,
            and stories from across the Martin House community.
          </motion.p>
        </div>

        {/* Articles Grid */}
        <motion.div 
          variants={prefersReducedMotion ? {} : containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {loading ? (
            // Skeleton placeholder
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden flex flex-col animate-pulse border border-slate-100 p-6">
                <div className="h-6 w-full bg-slate-100 rounded-lg mb-4" />
                <div className="flex flex-col gap-4">
                  <div className="h-3 w-24 bg-slate-100 rounded-full" />
                  <div className="h-4 w-full bg-slate-50 rounded" />
                  <div className="h-4 w-3/4 bg-slate-50 rounded" />
                </div>
              </div>
            ))
          ) : displayArticles.length === 0 ? (
            // Empty / error state
            <div className="col-span-full text-center py-20 bg-white rounded-2xl border border-slate-100 p-12">
              <FileText className="w-16 h-16 text-slate-200 mx-auto mb-6" />
              <p className="text-slate-400 font-bold tracking-wider text-[11px] uppercase">No published articles yet</p>
              <p className="text-slate-300 text-xs mt-2">Check back soon for updates</p>
            </div>
          ) : displayArticles.map((article) => (
            <motion.article
              key={article.title}
              variants={prefersReducedMotion ? {} : cardVariants}
              whileHover={prefersReducedMotion ? {} : { y: -6, boxShadow: "0 20px 40px rgba(12,40,101,0.04)" }}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100/80 hover:border-primary/10 transition-all duration-500 cursor-pointer flex flex-col"
              onClick={() => setSelectedArticle(article)}
            >
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-heading font-bold text-slate-800 tracking-tight mb-3 group-hover:text-slate-900 transition-colors line-clamp-2 leading-snug">
                  {article.title}
                </h3>

                <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6 line-clamp-3">
                  {article.excerpt}
                </p>

                <Link
                  to={`/news/post/${article.slug}`}
                  className="mt-auto pt-5 border-t border-slate-100/80 flex items-center text-xs font-bold tracking-wider text-slate-800 hover:text-black transition-colors uppercase gap-1 group/btn"
                  onClick={(e) => e.stopPropagation()}
                >
                  Read news
                  <ArrowUpRight className="w-4 h-4 transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Article Modal */}
      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-4xl rounded-2xl border-none p-0 overflow-hidden bg-white max-h-[90vh] flex flex-col shadow-2xl">
          {selectedArticle && (
            <>
              <div className="h-80 relative shrink-0">
                <img src={selectedArticle.image_url || "/placeholder.jpg"} alt={selectedArticle.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>
              <div className="p-10 overflow-y-auto">
                <h2 className="text-3xl font-heading font-bold text-slate-900 tracking-tight leading-tight mb-4">
                  {selectedArticle.title}
                </h2>
                <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold mb-6">{selectedArticle.category}</span>
                <div className="prose prose-slate max-w-none text-slate-600 font-medium leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedArticle.content) }} />
                </div>
              </div>
              <div className="p-8 pt-0 flex justify-end gap-3 border-t border-slate-50 mt-auto bg-slate-50/50">
                <Button asChild variant="outline" className="h-12 px-6 rounded-xl font-bold text-xs border-slate-200">
                  <Link to={`/news/post/${selectedArticle.slug}`}>Read full post</Link>
                </Button>
                <button onClick={() => setSelectedArticle(null)} className="h-12 px-6 bg-slate-900 text-white hover:bg-emerald-800 rounded-xl font-bold text-xs shadow-md transition-colors">
                  Close
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default NewsSection;
