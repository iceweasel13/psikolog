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
import { MotionItem } from "@/components/ui/motion-item";

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

/**
 * İletişim kanallarının ve randevu başvuru formunun yer aldığı ana bölüm.
 */
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
      <div className="section-container">
        <MotionItem className="section-header mx-auto text-center">
          <span className="clinical-tagline">
            {contact.tagline}
          </span>
          <h2 className="clinical-heading">
            {contact.heading}
          </h2>
          <p className="clinical-body max-w-2xl mx-auto">
            {contact.description}
          </p>
        </MotionItem>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <MotionItem delay={0.1} className="lg:col-span-5 space-y-4">
            <div className="info-tile">
              <MapPin className="w-5 h-5 text-brand-heading shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-brand-heading">{contact.locationTitle}</p>
                <p className="text-brand-body text-xs mt-0.5">{contact.locationDetails}</p>
              </div>
            </div>

            <div className="info-tile">
              <Laptop className="w-5 h-5 text-brand-heading shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-brand-heading">{contact.onlineTitle}</p>
                <p className="text-brand-body text-xs mt-0.5">{contact.onlineDetails}</p>
              </div>
            </div>

            <div className="info-tile">
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

            <div className="info-tile">
              <Phone className="w-5 h-5 text-brand-heading shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-brand-heading">Telefon</p>
                <a href={`tel:${contact.phoneRaw}`} className="text-brand-body text-xs hover:text-brand-heading transition-colors">
                  {contact.phoneDisplay}
                </a>
              </div>
            </div>

            <div className="info-tile">
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

            <div className="info-tile">
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

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-white/50 border border-brand-border text-xs text-brand-body mt-6">
              <Lock className="w-4 h-4 text-brand-heading shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                {contact.kvkkText}
              </p>
            </div>
          </MotionItem>

          <MotionItem delay={0.2} className="lg:col-span-7">
            <ContactForm />
          </MotionItem>
        </div>
      </div>
    </section>
  );
}