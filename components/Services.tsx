import { client } from "@/sanity/lib/client";
import { SERVICES_QUERY } from "@/sanity/lib/queries";
import { MotionItem } from "@/components/ui/motion-item";

export interface ServiceItem {
  icon: string;
  title: string;
  description: string;
  duration: string;
  frequency: string;
}

export interface ServicesData {
  tagline: string;
  heading: string;
  description: string;
  items: ServiceItem[];
}

/**
 * Klinik hizmetlerin ve terapi alanlarının sergilendiği ana bölüm bileşeni.
 * Sanity CMS üzerinden dinamik veri çeker ve kartları kademeli animasyonla sunar.
 */
export async function Services() {
  const services = await client.fetch<ServicesData>(
    SERVICES_QUERY,
    {},
    { cache: "no-store" }
  );

  return (
    <section id="hizmetler" className="bg-brand-bg py-16 sm:py-24">
      <div className="section-container">
        <MotionItem className="section-header">
          <span className="clinical-tagline">
            {services.tagline}
          </span>
          <h2 className="clinical-heading">
            {services.heading}
          </h2>
          <p className="clinical-body">
            {services.description}
          </p>
        </MotionItem>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.items.map((service, index) => (
            <MotionItem
              key={index}
              delay={index * 0.08}
              className="group clinical-card-interactive"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-bg flex items-center justify-center text-2xl mb-6 group-hover:scale-105 transition-transform duration-300 border border-brand-border/40">
                  {service.icon}
                </div>

                <h3 className="text-xl font-serif font-bold text-brand-heading mb-3 group-hover:text-brand-hover transition-colors">
                  {service.title}
                </h3>

                <p className="text-sm text-brand-body leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-brand-border/50 flex items-center gap-2 text-xs font-medium text-brand-heading">
                <span className="badge-primary">
                  {service.duration}
                </span>
                <span className="text-brand-muted">•</span>
                <span className="text-brand-body">{service.frequency}</span>
              </div>
            </MotionItem>
          ))}
        </div>
      </div>
    </section>
  );
}