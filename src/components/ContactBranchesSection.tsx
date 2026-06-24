import { MapPin, Phone, Mail } from "lucide-react";
import { branchLocations } from "./BranchesSection";







const ContactBranchesSection = () => {
  const locations = Object.values(branchLocations);

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-heading font-bold text-center text-foreground mb-10">
          Our Branches
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {locations.map((branch) => (
            <div
              key={branch.id}
              className="border border-border rounded-2xl p-6 flex flex-col gap-4 shadow-sm bg-card"
            >
              <h3 className="text-xl font-heading font-semibold text-primary mb-2">
                {branch.name}
              </h3>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">
                {branch.region}
              </p>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                  <p>{branch.address}</p>
                </div>

                <div className="flex items-start gap-2">
                  <Mail className="h-4 w-4 mt-0.5 text-primary" />
                  <a
                    href={`mailto:${branch.email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {branch.email}
                  </a>
                </div>

                <div className="flex items-start gap-2">
                  <Phone className="h-4 w-4 mt-0.5 text-primary" />
                  <div className="space-y-1">
                    {branch.phone.split(",").map((phone) => (
                      <a
                        key={phone}
                        href={`tel:${phone.replace(/\s+/g, "")}`}
                        className="block hover:text-primary transition-colors"
                      >
                        {phone}
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2 mt-auto">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    `${branch.address}, ${branch.region}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full rounded-full bg-primary text-primary-foreground font-semibold py-3 text-sm hover:bg-primary/90 transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactBranchesSection;

