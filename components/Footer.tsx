import Link from "next/link";
import {
  MapPin,
  MessageCircle,
  Phone,
  Mail,
  ExternalLink,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { FOOTER_QUERY } from "@/sanity/lib/queries";

export interface CombinedFooterData {
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
    { cache: "no-store" }
  );

  const { navbar, services, contact } = data;

  return (
    <footer className="w-full bg-brand-heading text-stone-300 pt-16 pb-12 border-t border-brand-hover/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Ana Kolonlar */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* Marka & Tanıtım (Navbar tablosundan gelir) */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight block">
              {navbar.title}
            </span>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed max-w-sm">
              {navbar.subtitle} alanında bireysel ve online psikolojik danışmanlık. Yüz yüze Ankara, online Türkiye geneli.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] text-brand-primary">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Danışan Kabulü Aktif
              </span>
            </div>
          </div>

          {/* Hizmetler (Services tablosundan otomatik listelenir) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-brand-primary font-semibold">
              Hizmetler
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              {services.items.map((service, idx) => (
                <li key={idx}>
                  <Link href="#hizmetler" className="hover:text-white transition-colors">
                    {service.title}
                  </Link>
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
              {navbar.navItems.map((item, idx) => (
                <li key={idx}>
                  <Link href={item.href} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
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
                  href={`https://wa.me/${contact.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>{contact.whatsappDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contact.phoneRaw}`}
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>{contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={`https://instagram.com/${contact.instagramHandle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Phone className="w-4 h-4 text-brand-primary shrink-0" />
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
              <li>
                <a
                  href="https://doktortakvimi.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Doktortakvimi.com</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Alt Telif & Yasal Haklar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>© 2026 {navbar.title} · Tüm hakları saklıdır.</p>
          
          <div className="flex items-center gap-4">
            <Link href="#gizlilik" className="hover:text-stone-200 transition-colors">
              Gizlilik Politikası
            </Link>
            <span>·</span>
            <Link href="#kvkk" className="hover:text-stone-200 transition-colors">
              KVKK Aydınlatma Metni
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}