import { client } from "@/sanity/lib/client";
import { SERVICES_QUERY } from "@/sanity/lib/queries";

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

export async function Services() {
  const services = await client.fetch<ServicesData>(
    SERVICES_QUERY,
    {},
    { cache: "no-store" }
  );

  return (
    <section id="hizmetler" className="bg-brand-bg py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Başlık ve Açıklama Alanı */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-heading/70 block mb-2">
            {services.tagline}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-heading tracking-tight mb-4">
            {services.heading}
          </h2>
          <p className="text-brand-body text-base sm:text-lg leading-relaxed">
            {services.description}
          </p>
        </div>

        {/* 6'lı Kart Izgarası: Mobilde 1, Tablette 2, Desktopta 3 Kolon */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.items.map((service, index) => (
            <div
              key={index}
              className="group flex flex-col justify-between p-8 rounded-3xl bg-white border border-brand-border/80 shadow-sm hover:shadow-md hover:border-brand-hover/60 transition-all duration-300"
            >
              <div>
                {/* İkon Rozeti */}
                <div className="w-14 h-14 rounded-2xl bg-brand-bg flex items-center justify-center text-2xl mb-6 group-hover:scale-105 transition-transform duration-300 border border-brand-border/40">
                  {service.icon}
                </div>

                {/* Kart Başlığı */}
                <h3 className="text-xl font-serif font-bold text-brand-heading mb-3 group-hover:text-brand-hover transition-colors">
                  {service.title}
                </h3>

                {/* Açıklama */}
                <p className="text-sm text-brand-body leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Alt Bilgi: Seans Süresi ve Formatı Rozetleri */}
              <div className="pt-4 border-t border-brand-border/50 flex items-center gap-2 text-xs font-medium text-brand-heading">
                <span className="px-2.5 py-1 rounded-lg bg-brand-primary/50 text-brand-heading">
                  {service.duration}
                </span>
                <span className="text-brand-muted">•</span>
                <span className="text-brand-body">{service.frequency}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}