import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Instagram, Youtube, Facebook, Heart, MessageCircle, ExternalLink, ChevronLeft, ChevronRight, Play } from "lucide-react";

// Use available school images for the Instagram grid mock
import img1 from "@/assets/navbar.jpg";
import img2 from "@/assets/highxl-arts.jpg";
import img3 from "@/assets/secondary-school/sport/cricket1.jpg";
import img4 from "@/assets/prep-culture.jpg";
import img5 from "@/assets/secondary-school/sport/music.jpg";
import img6 from "@/assets/highxl-girls.jpg";
import img7 from "@/assets/prep-boarding.jpg";
import img8 from "@/assets/secondary-school/sport/cricket2.jpg";
import img9 from "@/assets/highxl.jpg";
import img10 from "@/assets/primary-school/random/random1.jpg";
import img11 from "@/assets/art1.jpg";
import img12 from "@/assets/pastoral-care.jpg";

const instagramPosts = [
  { img: img1, likes: 148, comments: 12, caption: "A beautiful day on campus 🌿 #MartinHouse #Zambia" },
  { img: img2, likes: 203, comments: 18, caption: "Arts showcase — talent on display! 🎨 #MartinHouseArts" },
  { img: img3, likes: 312, comments: 24, caption: "Cricket season in full swing! 🏏 #ISAZ #SchoolSport" },
  { img: img4, likes: 189, comments: 9, caption: "Prep school culture day 🌍 #MartinHousePrep" },
  { img: img5, likes: 267, comments: 31, caption: "The choir rehearsing for our end-of-term concert 🎶" },
  { img: img6, likes: 421, comments: 47, caption: "Our girls making us proud on the field! 🏑 #HockeyChampions" },
  { img: img7, likes: 156, comments: 14, caption: "Home away from home — prep hostel ❤️ #BoardingLife" },
  { img: img8, likes: 289, comments: 22, caption: "Inter-school cricket — great sportsmanship 🤝" },
  { img: img9, likes: 198, comments: 17, caption: "Kalundu Farm — our beautiful 80-hectare campus 🌳" },
];

const youtubeVideos = [
  {
    title: "Cecilia Krige Festival 2026 Highlights",
    thumb: img10,
    duration: "5:42",
    views: "2.4K views",
    videoId: "dQw4w9WgXcQ",
  },
  {
    title: "Martin House Hockey — Cape Town Tour",
    thumb: img11,
    duration: "4:18",
    views: "1.8K views",
    videoId: "dQw4w9WgXcQ",
  },
  {
    title: "Speech Day & Prize Giving Ceremony",
    thumb: img12,
    duration: "12:05",
    views: "3.1K views",
    videoId: "dQw4w9WgXcQ",
  },
];

const facebookPosts = [
  {
    date: "July 18, 2026",
    text: "🏆 Congratulations to our College girls' hockey team on winning the ISAZ Hockey Championship for the third consecutive year! We are incredibly proud of your dedication and teamwork. #ISAZChampions #MartinHouseHockey",
    likes: 341,
    shares: 89,
    img: img6,
  },
  {
    date: "July 12, 2026",
    text: "📚 Cambridge examination results are in — and Martin House College students have excelled once again! We celebrate the achievement of every student who worked so hard this term. Well done to all! #CambridgeIGCSE #ALevel",
    likes: 512,
    shares: 134,
    img: null,
  },
  {
    date: "June 28, 2026",
    text: "⚽ Our MUN & Debate Club just returned from the Pan African Debating Championship in Johannesburg! What an incredible experience representing Zambia on the continental stage. 🇿🇲 #MartinHouseMUN #DebateClub",
    likes: 287,
    shares: 63,
    img: null,
  },
];

const LifeAtMartinHouseSection = () => {
  const [activeGrid, setActiveGrid] = useState<number | null>(null);
  const youtubeRef = useRef<HTMLDivElement>(null);

  const scrollYoutube = (dir: "left" | "right") => {
    if (!youtubeRef.current) return;
    const el = youtubeRef.current;
    el.scrollBy({ left: dir === "left" ? -340 : 340, behavior: "smooth" });
  };

  return (
    <section className="py-20 lg:py-28 bg-white">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
        >
          <div>
            <span className="inline-block px-4 py-1.5 bg-[#0c2865]/10 text-[#0c2865] rounded-full text-[10px] font-black tracking-widest uppercase border border-[#0c2865]/20 mb-4">
              Our Community
            </span>
            <h2 className="text-4xl md:text-5xl font-heading font-black text-[#0c2865] uppercase tracking-tight leading-tight">
              Life at<br />Martin House
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-sm leading-relaxed">
            From the rugby pitch to the science lab, from the stage to the hostel — experience the vibrant community that makes Martin House home.
          </p>
        </motion.div>
      </div>

      {/* ── INSTAGRAM GRID ── */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center">
              <Instagram className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-sm text-slate-800">@martinhouseschool</p>
              <p className="text-[10px] text-slate-400 font-medium">Follow us on Instagram</p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#0c2865] hover:text-pink-500 transition-colors"
          >
            Follow <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* 3×3 Grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-2">
          {instagramPosts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="relative aspect-square overflow-hidden cursor-pointer group rounded-sm md:rounded-lg"
              onMouseEnter={() => setActiveGrid(i)}
              onMouseLeave={() => setActiveGrid(null)}
            >
              <img
                src={post.img}
                alt={post.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              {/* Hover Overlay */}
              <div
                className={`absolute inset-0 bg-[#0c2865]/80 flex flex-col items-center justify-center transition-opacity duration-300 ${
                  activeGrid === i ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex items-center gap-6 text-white mb-3">
                  <span className="flex items-center gap-1.5 font-bold text-sm">
                    <Heart className="w-4 h-4" fill="white" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5 font-bold text-sm">
                    <MessageCircle className="w-4 h-4" fill="white" /> {post.comments}
                  </span>
                </div>
                <p className="text-white/80 text-[10px] text-center px-4 leading-relaxed hidden md:block">
                  {post.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 text-center">
          <a
            href="https://www.instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:opacity-90 transition-opacity shadow-lg"
          >
            <Instagram className="w-4 h-4" /> View All on Instagram
          </a>
        </div>
      </div>

      {/* ── YOUTUBE CAROUSEL ── */}
      <div className="max-w-7xl mx-auto px-6 mb-20">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center">
              <Youtube className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-sm text-slate-800">Martin House Trust School</p>
              <p className="text-[10px] text-slate-400 font-medium">Subscribe on YouTube</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scrollYoutube("left")}
              className="w-9 h-9 bg-slate-100 hover:bg-[#0c2865] hover:text-white text-slate-600 rounded-full flex items-center justify-center transition-all"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scrollYoutube("right")}
              className="w-9 h-9 bg-slate-100 hover:bg-[#0c2865] hover:text-white text-slate-600 rounded-full flex items-center justify-center transition-all"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={youtubeRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-2"
        >
          {youtubeVideos.map((video, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="shrink-0 w-[300px] md:w-[340px] group cursor-pointer"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-100">
                <img
                  src={video.thumb}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 bg-red-600 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-300">
                    <Play className="w-6 h-6 text-white ml-1" fill="white" />
                  </div>
                </div>
                {/* Duration */}
                <div className="absolute bottom-3 right-3 bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                  {video.duration}
                </div>
              </div>
              {/* Info */}
              <div className="mt-3 px-1">
                <h4 className="text-sm font-black text-slate-800 leading-tight line-clamp-2 group-hover:text-[#0c2865] transition-colors">
                  {video.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1">{video.views}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── FACEBOOK UPDATES ── */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1877f2] rounded-xl flex items-center justify-center">
              <Facebook className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-black text-sm text-slate-800">Martin House Trust School</p>
              <p className="text-[10px] text-slate-400 font-medium">Recent Facebook Updates</p>
            </div>
          </div>
          <a
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#0c2865] hover:text-[#1877f2] transition-colors"
          >
            Like Our Page <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facebookPosts.map((post, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {post.img && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.img}
                    alt="Facebook post"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#0c2865] rounded-full flex items-center justify-center text-white font-black text-xs">
                    MH
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-800">Martin House Trust School</p>
                    <p className="text-[10px] text-slate-400">{post.date}</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{post.text}</p>
                <div className="flex items-center gap-6 mt-5 pt-4 border-t border-slate-100">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                    <Heart className="w-3.5 h-3.5" /> {post.likes}
                  </span>
                  <span className="flex items-center gap-1.5 text-[11px] font-bold text-slate-400">
                    <ExternalLink className="w-3.5 h-3.5" /> {post.shares} shares
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeAtMartinHouseSection;
