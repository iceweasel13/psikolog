import {
  MapPin,
  Laptop,
  MessageCircle,
  Phone,
  Mail,
  Lock,
} from "lucide-react";
import { client } from "@/sanity/lib/client";
import { CONTACT_QUERY } from "@/sanity/lib/queries";
import { ContactForm } from "@/components/ContactForm";

export interface ContactData {
  tagline: string;
  heading: string;
  description: string;
  locationTitle: string;
  locationDetails: string;
  onlineTitle: string;
  onlineDetails: string;
  whatsappNumber: string;
  whatsappDisplay: string;
  phoneRaw: string;
  phoneDisplay: string;
  instagramHandle: string;
  email: string;
  kvkkText: string;
}

export async function Contact() {
  const contact = await client.fetch<ContactData>(
    CONTACT_QUERY,
    {},
    { cache: "no-store" }
  );

  return (
    <section
      id="randevu"
      className="relative bg-brand-primary text-brand-heading py-20 sm:py-28 overflow-hidden border-t border-brand-border/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. ÜST KISIM: ORTALANMIŞ BAŞLIK VE AÇIKLAMA */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20">
          <span className="text-xs font-mono uppercase tracking-widest text-brand-heading/70 block mb-2">
            {contact.tagline}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-heading tracking-tight mb-4">
            {contact.heading}
          </h2>
          <p className="text-brand-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            {contact.description}
          </p>
        </div>

        {/* 2. ALT KISIM: SOLDA BİLGİLER, SAĞDA FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Sol Kolon: İletişim Kanalları ve KVKK */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/70 border border-brand-border/70 backdrop-blur-xs hover:bg-white transition-colors">
              <MapPin className="w-5 h-5 text-brand-heading shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-brand-heading">{contact.locationTitle}</p>
                <p className="text-brand-body text-xs mt-0.5">{contact.locationDetails}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/70 border border-brand-border/70 backdrop-blur-xs hover:bg-white transition-colors">
              <Laptop className="w-5 h-5 text-brand-heading shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-brand-heading">{contact.onlineTitle}</p>
                <p className="text-brand-body text-xs mt-0.5">{contact.onlineDetails}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/70 border border-brand-border/70 backdrop-blur-xs hover:bg-white transition-colors">
              <MessageCircle className="w-5 h-5 text-brand-heading shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-brand-heading">WhatsApp Hattı</p>
                <a
                  href={`https://wa.me/${contact.whatsappNumber}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-body text-xs hover:text-brand-heading transition-colors"
                >
                  {contact.whatsappDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/70 border border-brand-border/70 backdrop-blur-xs hover:bg-white transition-colors">
              <Phone className="w-5 h-5 text-brand-heading shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-brand-heading">Telefon</p>
                <a href={`tel:${contact.phoneRaw}`} className="text-brand-body text-xs hover:text-brand-heading transition-colors">
                  {contact.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/70 border border-brand-border/70 backdrop-blur-xs hover:bg-white transition-colors">
              <Phone className="w-5 h-5 text-brand-heading shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-brand-heading">Instagram</p>
                <a
                  href={`https://instagram.com/${contact.instagramHandle}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-body text-xs hover:text-brand-heading transition-colors"
                >
                  @{contact.instagramHandle}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/70 border border-brand-border/70 backdrop-blur-xs hover:bg-white transition-colors">
              <Mail className="w-5 h-5 text-brand-heading shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-brand-heading">E-posta</p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-brand-body text-xs hover:text-brand-heading transition-colors"
                >
                  {contact.email}
                </a>
              </div>
            </div>

            {/* KVKK Bilgilendirme */}
            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/50 border border-brand-border text-xs text-brand-body mt-6">
              <Lock className="w-4 h-4 text-brand-heading shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {contact.kvkkText}
              </p>
            </div>
          </div>

          {/* Sağ Kolon: Form */}
          <ContactForm />

        </div>
      </div>
    </section>
  );
}