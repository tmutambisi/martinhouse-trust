import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { newsService } from "@/lib/data-service";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Calendar, Clock, Share2, Tag, User } from "lucide-react";
import DOMPurify from "dompurify";
import { Button } from "@/components/ui/button";

interface Article {
    title: string;
    content: string;
    cover_image: string | null;
    created_at: string;
    published_at: string | null;
    scheduled_at: string | null;
    author: string;
    category: string;
    meta_description: string;
}

const NewsArticlePage = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchArticle = async () => {
            if (!slug) return;
            try {
                const result = await newsService.getBySlug(slug);
                if (result.success && result.data) {
                    setArticle(result.data as Article);
                } else {
                    setError(true);
                }
            } catch (e) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchArticle();
    }, [slug]);

    const calculateReadTime = (text: string) => {
        const wordsPerMinute = 200;
        const words = text.trim().split(/\s+/).length;
        return Math.ceil(words / wordsPerMinute);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="flex flex-col items-center gap-4 animate-pulse">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-slate-400 font-mono text-sm tracking-wider">Loading article...</p>
                </div>
            </div>
        );
    }

    if (error || !article) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <Navbar />
                <div className="flex-1 flex items-center justify-center p-4">
                    <div className="text-center max-w-md">
                        <h1 className="text-4xl font-heading font-black text-slate-900 mb-4">Article Not Found</h1>
                        <p className="text-slate-600 mb-8">The article you are looking for has been moved or does not exist.</p>
                        <Link to="/news">
                            <Button>Return to News</Button>
                        </Link>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white font-sans selection:bg-primary/20 selection:text-primary">
            <Navbar />

            {/* Magazine Hero Section */}
            <div className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 overflow-hidden bg-slate-900">
                {/* Background Gradient instead of Image */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0c2865] via-[#103078] to-[#081e4b]">
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent opacity-80" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary-foreground text-[9px] font-bold tracking-wider mb-6 backdrop-blur-sm border border-primary/20">
                        <Tag className="w-3 h-3" />
                        {article.category || "News"}
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white leading-[1.05] mb-8 tracking-tight">
                        {article.title}
                    </h1>

                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-y-4 gap-x-8 text-slate-300 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                                {article.author?.[0]?.toUpperCase() || "A"}
                            </div>
                            <span>{article.author || "Martin House Editor"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            {new Date(article.published_at || article.scheduled_at || article.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </div>

                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-primary" />
                            {calculateReadTime(article.content)} min read
                        </div>
                    </div>
                </div>
            </div>

            <main className="relative z-20 -mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* Sidebar / Socials - Sticky on Desktop */}
                    <div className="hidden lg:block lg:col-span-2">
                        <div className="sticky top-32 flex flex-col gap-4 items-center">
                            <p className="text-[9px] font-bold tracking-widest text-slate-400 transform -rotate-90 origin-center translate-y-8 w-24 text-center">
                                Share story
                            </p>
                            <div className="mt-12 flex flex-col gap-2">
                                <Button variant="outline" size="icon" className="rounded-full w-10 h-10 border-slate-200 text-slate-500 hover:text-primary hover:border-primary">
                                    <Share2 className="w-4 h-4" />
                                </Button>
                                {/* Add more social icons here later */}
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-8 bg-white rounded-t-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/50 min-h-[60vh]">

                        {/* Lead Paragraph / Excerpt */}
                        {article.meta_description && (
                            <p className="text-xl md:text-2xl text-slate-600 font-serif leading-relaxed mb-10 border-l-4 border-primary pl-6 italic">
                                {article.meta_description}
                            </p>
                        )}

                        {/* Article Body */}
                        <div className="prose prose-lg md:prose-xl prose-slate max-w-none 
                prose-headings:font-heading prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900
                prose-p:text-slate-600 prose-p:leading-8 prose-p:mb-6
                prose-strong:text-primary prose-strong:font-black
                prose-a:text-primary prose-a:no-underline prose-a:font-bold hover:prose-a:underline
                prose-img:rounded-3xl prose-img:shadow-xl prose-img:my-10
                prose-blockquote:border-l-primary prose-blockquote:bg-slate-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg prose-blockquote:not-italic
                first-letter:text-5xl first-letter:font-black first-letter:text-primary first-letter:float-left first-letter:mr-3 first-letter:mt-[-10px]
              ">
                            <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(article.content) }} />
                        </div>

                        {/* Footer of Article */}
                        <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div>
                                <h3 className="text-[10px] font-bold tracking-widest text-slate-400 mb-2">Category</h3>
                                <span className="inline-block bg-slate-100 px-4 py-2 rounded-lg text-sm font-bold text-slate-700">
                                    {article.category}
                                </span>
                            </div>
                            <Link to="/news">
                                <Button variant="ghost" className="group text-slate-500 hover:text-primary font-bold text-[11px] tracking-normal">
                                    <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                                    Back to news
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Sidebar (Optional for now, placeholder) */}
                    <div className="hidden lg:block lg:col-span-2">
                        {/* Can add 'Related Articles' here later */}
                    </div>
                </div>
            </main>

            {/* Next Article Teaser or Bottom Navigation could go here */}
            <div className="h-24"></div>

            <Footer />
        </div>
    );
};

export default NewsArticlePage;
