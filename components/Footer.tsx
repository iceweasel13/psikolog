import {
  MapPin,
  MessageCircle,
  Phone,
  Mail,
} from "lucide-react";
import { InstagramIcon } from "@/components/icons/BrandIcons";
import { client } from "@/sanity/lib/client";
import { FOOTER_QUERY } from "@/sanity/lib/queries";
import { LegalLinks } from "@/components/LegalModal";

export interface CombinedFooterData {
  footer: {
    brandTitle: string;
    brandDescription: string;
    availabilityText: string;
    copyrightText: string;
  };
  navbar: {
    title: string;
    subtitle: string;
    navItems: { label: string; href: string }[];
  };
  services: {
    items: { title: string }[];
  };
  contact: {
    locationDetails: string;
    whatsappNumber: string;
    whatsappDisplay: string;
    phoneRaw: string;
    phoneDisplay: string;
    instagramHandle: string;
    email: string;
  };
}

export async function Footer() {
  const data = await client.fetch<CombinedFooterData>(
    FOOTER_QUERY,
    {},
    { next: { revalidate: 300 } }
  );

  const { footer, navbar, services, contact } = data;
  const whatsappNumber = contact.whatsappNumber.replace(/\D/g, "");
  const phoneNumber = contact.phoneRaw.replace(/\s/g, "");

  return (
    <footer className="w-full bg-brand-heading text-stone-300 pt-16 pb-12 border-t border-brand-hover/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Ana Kolonlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">

          {/* Marka & Tanıtım (Navbar tablosundan gelir) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight block">
              {footer.brandTitle}
            </span>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-sm">
              {footer.brandDescription}
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-brand-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                {footer.availabilityText}
              </span>
            </div>
          </div>

          {/* Hizmetler (Services tablosundan otomatik listelenir) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-primary font-semibold">
              Hizmetler
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {services.items?.map((service, idx) => (
                <li key={idx}>
                  <a href="#hizmetler" className="hover:text-white transition-colors">
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Bilgi & Sayfalar (Navbar menüsündeki linklerden dinamik beslenir) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-primary font-semibold">
              Bilgi
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {navbar.navItems?.map((item, idx) => (
                <li key={idx}>
                  <a href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim Kanalları (Contact tablosundan otomatik gelir) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-primary font-semibold">
              İletişim
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span>{contact.locationDetails}</span>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  data-umami-event="contact-whatsapp-click"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>{contact.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${phoneNumber}`}
                  data-umami-event="contact-phone-click"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>{contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://www.instagram.com/${contact.instagramHandle}/`}
                  target="_blank"
                  rel="noreferrer"
                  data-umami-event="contact-instagram-click"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <InstagramIcon className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Instagram · @{contact.instagramHandle}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>{contact.email}</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Alt Telif & Yasal Haklar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>{footer.copyrightText}</p>
          <LegalLinks />
        </div>

      </div>
    </footer>
  );
}
