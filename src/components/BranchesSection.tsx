import { useState, useRef } from "react";
import { MapPin, Phone, Mail, Clock, Building2, Navigation, ChevronRight, MousePointer2, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export interface BranchLocation {
  id: string;
  name: string;
  address: string;
  region: string;
  coordinates: [number, number];
  phone: string;
  email: string;
  hours: string;
  isHeadOffice?: boolean;
  description: string;
}

export const branchLocations: Record<string, BranchLocation> = {
  "Harare": {
    id: "harare",
    name: "Head Office",
    address: "Ebenezer House, No. 5 Milwood Road, Harare",
    region: "Harare",
    coordinates: [-17.8292, 31.0522],
    phone: "+263 242 621 956",
    email: "info@martinhouseschool.com",
    hours: "Mon - Fri: 7:30 AM - 4:30 PM",
    isHeadOffice: true,
    description: "Our main campus, serving as the central hub for all Martin House activities and administration.",
  },
  "Bulawayo": {
    id: "bulawayo",
    name: "Bulawayo Office",
    address: "No. 129 Herbert Chitepo St, Bulawayo",
    region: "Matabeleland",
    coordinates: [-20.1325, 28.6265],
    phone: "+263 292 230 803",
    email: "bulawayo@martinhouseschool.com",
    hours: "Mon - Fri: 8:00 AM - 5:00 PM",
    isHeadOffice: false,
    description: "Our Bulawayo campus, extending the Martin House experience to families in Matabeleland.",
  },
  "Mutare": {
    id: "mutare",
    name: "Mutare Office",
    address: "No. 40 First Street, Mutare",
    region: "Manicaland",
    coordinates: [-18.9707, 32.6709],
    phone: "+263 242 621 956",
    email: "mutare@martinhouseschool.com",
    hours: "Mon - Fri: 8:00 AM - 5:00 PM",
    isHeadOffice: false,
    description: "Serving the Eastern Highlands with quality education and a caring school community.",
  },
  "Gweru": {
    id: "gweru",
    name: "Gweru Office",
    address: "No. 78 Sixth Street, Gweru",
    region: "Midlands",
    coordinates: [-19.4500, 29.8167],
    phone: "+263 54 222 7791",
    email: "gweru@martinhouseschool.com",
    hours: "Mon - Fri: 8:00 AM - 5:00 PM",
    isHeadOffice: false,
    description: "Bringing the Martin House standard of education to the Midlands Province.",
  },
  "Chinhoyi": {
    id: "chinhoyi",
    name: "Chinhoyi Office",
    address: "No. 12 Magamba Way, Chinhoyi",
    region: "Mashonaland West",
    coordinates: [-17.3598, 30.1983],
    phone: "+263 67 212 3456",
    email: "chinhoyi@martinhouseschool.com",
    hours: "Mon - Fri: 8:00 AM - 5:00 PM",
    isHeadOffice: false,
    description: "Supporting learners and families in Zvimba and the surrounding Mashonaland West regions.",
  },
  "Kwekwe": {
    id: "kwekwe",
    name: "Kwekwe Office",
    address: "No. 5 Cobar St, Kwekwe",
    region: "Midlands",
    coordinates: [-18.9221, 29.8131],
    phone: "+263 55 251 2345",
    email: "kwekwe@martinhouseschool.com",
    hours: "Mon - Fri: 8:00 AM - 5:00 PM",
    isHeadOffice: false,
    description: "Extending the Martin House commitment to education in the heart of the Midlands.",
  }
};

const branches = Object.keys(branchLocations).map(key => ({
  name: key,
  region: branchLocations[key].region
}));

const BranchesSection = () => {
  const [selectedBranch, setSelectedBranch] = useState<BranchLocation | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBranchDetails = (e: React.MouseEvent | React.TouchEvent, branchName: string) => {
    // Prevent default context menu on right click
    if ('button' in e && e.button === 2) {
      e.preventDefault();
    }

    const location = branchLocations[branchName];
    if (location) {
      setSelectedBranch(location);
      setIsDialogOpen(true);
    }
  };

  return (
    <section id="branches" className="py-24 lg:py-44 bg-white relative overflow-hidden">
      {/* Decorative skewed panel */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20 lg:mb-32">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-6 py-2 bg-primary text-white rounded-full text-[9px] font-bold tracking-wider mb-8 shadow-xl shadow-primary/20"
            >
              Nationwide campus network
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-slate-900 leading-[1.1] tracking-tight"
            >
              Strategic <br />
              <span className="text-primary relative inline-block">
                campus
                <span className="absolute bottom-1 left-0 w-full h-3 bg-primary/10 -z-10" />
              </span> locations
            </motion.h2>
            <p className="text-xl text-slate-500 font-bold font-body mt-8 leading-relaxed max-w-2xl border-l-4 border-primary/20 pl-6">
              Our campuses and admissions offices are strategically located across Zimbabwe, making quality education accessible to families nationwide.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-8 py-8 px-12 bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200 hover:shadow-primary/10 transition-shadow duration-500"
          >
            <div className="text-5xl lg:text-6xl font-heading font-bold text-primary tracking-tight leading-none">14+</div>
            <div className="text-[10px] text-slate-400 font-bold tracking-wider leading-tight">Elite <br /> operations</div>
          </motion.div>
        </div>

        {/* Sliding Branches Marquee Area */}
        <div className="relative group overflow-hidden py-10 -mx-6 px-6">
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="flex gap-12 whitespace-nowrap"
          >
            {[...branches, ...branches].map((branch, index) => {
              const location = branchLocations[branch.name];
              if (!location) return null;
              return (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -10 }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleBranchDetails(e, branch.name);
                  }}
                  onClick={(e) => handleBranchDetails(e, branch.name)}
                  className="min-w-[360px] bg-white rounded-[4rem] p-16 border border-slate-100 hover:border-primary/20 shadow-xl shadow-slate-100/50 hover:shadow-2xl transition-all cursor-pointer group/card flex flex-col items-center text-center relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
                  <div className="w-20 h-20 bg-primary rounded-[2rem] flex items-center justify-center text-white mb-10 shadow-2xl shadow-primary/20 group-hover/card:rotate-6 transition-transform duration-500">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold text-slate-900 tracking-tight mb-4 group-hover/card:text-primary transition-colors duration-500">
                    {branch.name}
                  </h3>
                  <p className="text-[10px] font-bold tracking-wider text-slate-400 mb-10">
                    {branch.region} division
                  </p>

                  <div className="flex items-center gap-4 text-[9px] font-bold tracking-wider text-primary pt-8 border-t border-slate-50 w-full justify-center group-hover/card:border-primary/10 transition-colors">
                    <MousePointer2 className="w-4 h-4 animate-bounce" /> View details
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Subtle Side Fades */}
          <div className="absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
          <div className="absolute inset-y-0 right-0 w-44 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />
        </div>

        <div className="mt-20 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-bold tracking-[0.2em] text-slate-300 flex items-center justify-center gap-6"
          >
            <span className="h-px w-12 bg-slate-200" />
            Interactive regional deployment network
            <span className="h-px w-12 bg-slate-200" />
          </motion.p>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-4xl rounded-[4rem] border-none p-0 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.4)] bg-white max-h-[90vh] flex flex-col">
          {selectedBranch && (
            <div className="flex flex-col md:flex-row h-full">
              <div className="md:w-[45%] bg-primary p-12 lg:p-16 text-white flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

                <div className="relative z-10">
                  <div className="w-24 h-24 bg-white/10 rounded-[2rem] flex items-center justify-center mb-12 backdrop-blur-2xl border border-white/20 shadow-2xl">
                    <Building2 className="w-12 h-12" />
                  </div>
                  <h2 className="text-4xl lg:text-4xl font-heading font-bold tracking-tight leading-[1] mb-8">
                    {selectedBranch.name}
                  </h2>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-1 bg-accent rounded-full" />
                    <p className="text-[10px] font-bold tracking-widest text-white/50">{selectedBranch.region} sector</p>
                  </div>
                </div>

                <div className="relative z-10">
                  <p className="text-[9px] font-bold tracking-widest text-white/30 leading-relaxed italic mt-12">
                    Martin High School <br />
                    Deployment asset #{selectedBranch.id}
                  </p>
                </div>
              </div>

              <div className="md:w-[55%] bg-white p-12 lg:p-16 overflow-y-auto">
                <div className="relative mb-12">
                  <Quote className="absolute -top-6 -left-6 h-16 w-16 text-slate-100 -z-10" />
                  <p className="text-2xl lg:text-2xl text-slate-900 font-bold tracking-tight leading-tight">
                    "{selectedBranch.description}"
                  </p>
                </div>

                <div className="space-y-10">
                  <div className="flex gap-8 group/item">
                    <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center shrink-0 border border-slate-100 group-hover/item:bg-primary group-hover/item:text-white transition-all duration-500 shadow-xl shadow-slate-200/50">
                      <MapPin className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold tracking-widest text-slate-400 mb-2">Campus location</p>
                      <p className="text-base font-bold text-slate-900 leading-snug">{selectedBranch.address}</p>
                    </div>
                  </div>

                  <div className="flex gap-8 group/item">
                    <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center shrink-0 border border-slate-100 group-hover/item:bg-secondary group-hover/item:text-white transition-all duration-500 shadow-xl shadow-slate-200/50">
                      <Phone className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold tracking-widest text-slate-400 mb-2">Direct contact line</p>
                      <p className="text-xl font-bold text-slate-900 tracking-tight">{selectedBranch.phone}</p>
                    </div>
                  </div>

                  <div className="flex gap-8 group/item">
                    <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center shrink-0 border border-slate-100 group-hover/item:bg-slate-900 group-hover/item:text-white transition-all duration-500 shadow-xl shadow-slate-200/50">
                      <Mail className="w-7 h-7" />
                    </div>
                    <div>
                      <p className="text-[9px] font-bold tracking-widest text-slate-400 mb-2">Email admissions</p>
                      <p className="text-base font-bold text-slate-900 tracking-normal">{selectedBranch.email}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-16">
                  <Button
                    variant="default"
                    className="w-full h-24 rounded-[3rem] bg-slate-900 text-white font-bold text-sm tracking-widest shadow-2xl shadow-slate-300 hover:bg-primary hover:-translate-y-1 transition-all duration-500 group"
                    asChild
                  >
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(selectedBranch.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Navigation className="w-6 h-6 mr-4 group-hover:rotate-12 transition-transform" />
                      Initiate strategic navigation
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default BranchesSection;
