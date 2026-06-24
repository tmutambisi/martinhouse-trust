import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Building2, Mail, MapPin, Navigation, Phone, Search } from "lucide-react";

const offices = [
  {
    city: "Main Campus — Chisamba",
    address: "Kalundu Farm, Chisamba, Zambia",
    phone: "+260 962 143 920",
    email: "info@martinhouseschool.com",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kalundu+Farm+Chisamba+Zambia",
    region: "Central Province",
  },
  {
    city: "Admissions Office",
    address: "Kalundu Farm, Chisamba, near Lusaka",
    phone: "+260 962 143 920",
    email: "info@martinhouseschool.com",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kalundu+Farm+Chisamba+Zambia",
    region: "Admissions",
  },
  {
    city: "Boarding Enquiries",
    address: "Martin House Trust School, Chisamba",
    phone: "+260 962 143 920",
    email: "info@martinhouseschool.com",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Kalundu+Farm+Chisamba+Zambia",
    region: "Boarding",
  },
];

const OfficeFinder = () => {
  const [query, setQuery] = useState("");
  const [filteredOffices, setFilteredOffices] = useState(offices);

  useEffect(() => {
    const normalized = query.toLowerCase();
    setFilteredOffices(
      offices.filter(
        (office) =>
          office.city.toLowerCase().includes(normalized) ||
          office.region.toLowerCase().includes(normalized) ||
          office.address.toLowerCase().includes(normalized)
      )
    );
  }, [query]);

  const displayOffices = query ? filteredOffices : [...filteredOffices, ...filteredOffices];

  return (
    <section className="py-16 bg-[#f8f6f1] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-xl text-left">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 bg-primary text-white rounded-full text-sm font-bold tracking-wider mb-6 shadow-lg shadow-primary/20"
            >
              Visit Our Campus
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground tracking-tight leading-none mb-4"
            >
              Find Us in <span className="text-secondary">Chisamba</span>
            </motion.h2>
            <p className="text-muted-foreground font-medium tracking-normal text-base">
              Our school is tucked safely away on Kalundu Farm, Chisamba, near Lusaka — a unique campus surrounded by nature.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative w-full md:w-80 group"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <Input
              type="text"
              placeholder="Search campus or department..."
              className="h-16 pl-12 pr-6 bg-white border border-border rounded-2xl font-medium text-[15px] focus-visible:ring-primary/20 transition-all shadow-sm"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </motion.div>
        </div>

        <div className="relative group overflow-hidden py-10">
          <motion.div
            className="flex gap-8 whitespace-nowrap"
            animate={{ x: query ? 0 : ["0%", "-50%"] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          >
            {displayOffices.map((office, index) => (
              <div key={`${office.city}-${index}`} className="inline-block min-w-[280px] md:min-w-[340px] whitespace-normal">
                <div className="bg-white rounded-3xl p-6 mr-4 h-full border border-border hover:border-secondary/30 hover:shadow-xl transition-all group/card flex flex-col justify-between shadow-md">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shadow-lg group-hover/card:scale-105 transition-transform shrink-0">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-[10px] font-black tracking-widest text-secondary bg-secondary/10 px-2.5 py-1 rounded-full uppercase ml-2 text-right">
                        {office.region}
                      </span>
                    </div>
                    <h3 className="text-lg font-heading font-bold text-foreground mb-3 tracking-tight group-hover/card:text-secondary transition-colors line-clamp-1">
                      {office.city}
                    </h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                        <p className="text-[11px] font-medium text-muted-foreground leading-tight line-clamp-2" title={office.address}>
                          {office.address}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                        <span className="text-[11px] font-bold tracking-tight text-foreground">{office.phone}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2.5 mt-auto">
                    <a
                      href={office.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-primary text-white rounded-xl font-bold text-[9px] uppercase tracking-widest hover:bg-secondary transition-all shadow-md hover:-translate-y-0.5"
                    >
                      <Navigation className="h-3 w-3" />
                      Directions
                    </a>
                    <a
                      href={`mailto:${office.email}`}
                      className="w-10 h-10 flex items-center justify-center bg-muted text-muted-foreground border border-border rounded-xl hover:text-primary hover:bg-white transition-all shrink-0"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>

          {!query && (
            <>
              <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#f8f6f1] to-transparent pointer-events-none z-10" />
              <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#f8f6f1] to-transparent pointer-events-none z-10" />
            </>
          )}

          {filteredOffices.length === 0 && (
            <div className="w-full py-20 text-center">
              <p className="text-xl font-heading font-bold text-muted-foreground opacity-40">
                No locations found
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OfficeFinder;
