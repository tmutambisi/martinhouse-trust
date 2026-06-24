import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import OfficeFinder from "@/components/OfficeFinder";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { newsService, alertsService, incidentsService, offersService } from "@/lib/data-service";
import { Calendar, ArrowRight, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

import heroImage from "@/assets/primary-school/random/random1.jpg";
import heroImage2 from "@/assets/primary-school/random/random2.jpg";
import heroImage3 from "@/assets/primary-school/random/random3.jpg";
import heroImage4 from "@/assets/secondary-school/school/random1.jpg";

interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  category: string;
  content: string;
  images: string[];
}

interface AlertItem {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  priority: string;
  content: string;
  images: string[];
}

interface IncidentReport {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  content: string;
  location?: string;
  status: string;
  images: string[];
}

interface Offer {
  id: number;
  title: string;
  date: string;
  excerpt: string;
  discount: string;
  content: string;
  images: string[];
}

type AnyArticle = NewsArticle | AlertItem | IncidentReport | Offer;

const NewsPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [selectedArticle, setSelectedArticle] = useState<AnyArticle | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [apiNewsItems, setApiNewsItems] = useState<NewsArticle[]>([]);
  const [apiAlertItems, setApiAlertItems] = useState<AlertItem[]>([]);
  const [apiIncidentReports, setApiIncidentReports] = useState<IncidentReport[]>([]);
  const [apiOffers, setApiOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [newsRes, alertsRes, incidentsRes, offersRes] = await Promise.all([
          newsService.getPublished(), alertsService.getAll(), incidentsService.getPublished(), offersService.getActive()
        ]);

        if (newsRes.success) setApiNewsItems(newsRes.data.map(item => ({
          id: item.id, title: item.title, slug: item.slug, content: item.content, excerpt: item.meta_description || item.title, category: item.category, images: item.cover_image ? [item.cover_image] : [],
          date: new Date(item.published_at || item.scheduled_at || item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        })));

        if (alertsRes.success) setApiAlertItems(alertsRes.data.map(item => ({
          id: item.id, title: item.title, content: item.description, excerpt: item.description?.substring(0, 150), priority: item.severity === 'critical' ? 'Critical' : 'Important', images: item.cover_image ? [item.cover_image] : [],
          date: new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        })));

        if (incidentsRes.success) setApiIncidentReports(incidentsRes.data.map(item => ({
          id: item.id, title: item.title, content: item.description, excerpt: item.description?.substring(0, 150), category: item.category, status: item.status, images: [],
          date: new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        })));

        if (offersRes.success) setApiOffers(offersRes.data.map(item => ({
          id: item.id, title: item.title, content: item.description, excerpt: item.description?.substring(0, 150), discount: `${parseFloat(item.percentage_off).toFixed(0)}% off`, images: item.cover_image ? [item.cover_image] : [],
          date: new Date(item.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
        })));
      } catch (err) { console.error(err); } finally { setIsLoading(false); }
    };
    fetchData();
  }, []);

  const getPageInfo = () => {
    switch (category) {
      case "alerts": return { title: "Announcements", sub: "Important notices and updates from the school", img: heroImage2, color: "bg-primary" };
      case "incidents": return { title: "School Events", sub: "Upcoming and recent events at Martin House", img: heroImage3, color: "bg-secondary" };
      case "offers": return { title: "Special Programmes", sub: "Enrichment opportunities and featured initiatives", img: heroImage4, color: "bg-accent" };
      default: return { title: "News", sub: "Stay updated with the latest from Martin House", img: heroImage, color: "bg-primary" };
    }
  };

  const info = getPageInfo();

  if (isLoading) return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-[160px] pb-16">
        <div className="container mx-auto px-4">
          {/* Skeleton header */}
          <div className="h-8 w-48 bg-slate-200 rounded-full animate-pulse mx-auto mb-4" />
          <div className="h-5 w-72 bg-slate-100 rounded-full animate-pulse mx-auto mb-16" />
          {/* Skeleton grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-slate-50 rounded-[3rem] overflow-hidden border-2 border-transparent flex flex-col animate-pulse">
                <div className="aspect-video bg-slate-200" />
                <div className="p-10 flex flex-col gap-4">
                  <div className="h-3 w-24 bg-slate-200 rounded-full" />
                  <div className="h-6 w-full bg-slate-200 rounded-lg" />
                  <div className="h-4 w-full bg-slate-100 rounded" />
                  <div className="h-4 w-3/4 bg-slate-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <PageHero title={info.title} subtitle={info.sub} backgroundImage={info.img} />

      <section className="py-24 lg:py-36">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
            {(category === "alerts" ? apiAlertItems : category === "incidents" ? apiIncidentReports : category === "offers" ? apiOffers : apiNewsItems).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => {
                  // If it's a news item with a slug, navigate to the dedicated page
                  if ('slug' in item && item.slug) {
                    navigate(`/news/post/${item.slug}`);
                  } else {
                    // For alerts, incidents, offers, keep using the dialog
                    setSelectedArticle(item);
                  }
                }}
                className="group bg-slate-50 rounded-[3rem] overflow-hidden border-2 border-transparent hover:border-primary/20 hover:bg-white hover:shadow-2xl transition-all cursor-pointer flex flex-col"
              >
                <div className="bg-primary/5 flex items-center justify-center p-8 border-b border-slate-100 relative min-h-[120px]">
                  <GraduationCap className="w-12 h-12 text-primary/30" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-primary text-white text-[9px] font-bold px-3 py-1 rounded-full shadow-md">
                      {'category' in item ? item.category : 'priority' in item ? item.priority : 'discount' in item ? item.discount : 'Incident'}
                    </span>
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <div className="flex items-center gap-2 text-[9px] font-bold tracking-wider text-slate-600 mb-4">
                    <Calendar className="w-4 h-4" /> {item.date}
                  </div>
                  <h3 className="text-xl font-heading font-bold text-foreground tracking-tight mb-4 group-hover:text-black transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground font-medium line-clamp-3 mb-8 flex-grow">{item.excerpt}</p>
                  <div className="flex items-center gap-2 text-[9px] font-bold tracking-wider text-foreground group-hover:text-black pt-6 border-t border-slate-100">
                    Explore full article <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
        <DialogContent className="max-w-4xl rounded-[3rem] border-none p-0 overflow-hidden bg-white max-h-[90vh] flex flex-col">
          {selectedArticle && (
            <>
              <div className="h-96 relative shrink-0">
                <img src={selectedArticle.images[0] || info.img} alt={selectedArticle.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                <div className="absolute top-10 right-10">
                  <span className={`${info.color} text-white text-[10px] font-bold px-4 py-2 rounded-full shadow-2xl`}>
                    {selectedArticle.date}
                  </span>
                </div>
              </div>
              <div className="p-12 overflow-y-auto custom-scrollbar">
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground tracking-tight leading-none mb-10 text-pretty">
                    {selectedArticle.title}
                  </h2>
                  <div className="prose-premium">
                    <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedArticle.content) }} />
                  </div>
                </div>
              </div>
              <div className="p-8 shrink-0 bg-slate-50 border-t flex justify-center items-center gap-6">
                <Button
                  onClick={() => setSelectedArticle(null)}
                  className="rounded-full px-12 py-7 font-bold text-[11px] tracking-normal shadow-xl hover:scale-105 transition-transform bg-primary"
                >
                  Return to news hub
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <OfficeFinder />
      <Footer />
    </div>
  );
};

export default NewsPage;
