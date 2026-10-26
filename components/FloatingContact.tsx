import { Phone } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { InstagramIcon, WhatsAppIcon } from "@/components/icons/BrandIcons";

interface ContactSnippet {
  phoneRaw: string;
  whatsappNumber: string;
  instagramHandle: string;
}

const SNIPPET_QUERY = `
  *[_type == "contact"][0] {
    phoneRaw,
    whatsappNumber,
    instagramHandle
  }
`;

/**
 * Sayfa genelinde sabit duran hızlı telefon ve WhatsApp iletişim butonları.
 */
export async function FloatingContact() {
  const data = await client.fetch<ContactSnippet>(
    SNIPPET_QUERY,
    {},
    { next: { revalidate: 300 } }
  );

  const phone = data?.phoneRaw;
  const whatsapp = data?.whatsappNumber;
  const instagram = data?.instagramHandle;

  return (
    <aside
      aria-label="Hızlı iletişim seçenekleri"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5"
    >
      <div className="group relative flex items-center">
        <span role="tooltip" className="floating-tooltip">
          Hemen Arayın
        </span>
        <a
          href={phone ? `tel:${phone.replace(/\s/g, "")}` : "#randevu"}
          aria-label="Telefonla hemen arayın"
          data-umami-event="contact-phone-click"
          className="floating-action-btn"
        >
          <Phone className="h-5 w-5" strokeWidth={2} />
        </a>
      </div>

      {instagram ? (
        <div className="group relative flex items-center">
          <span role="tooltip" className="floating-tooltip">Instagram</span>
          <a
            href={`https://www.instagram.com/${instagram}/`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profilini açın"
            data-umami-event="contact-instagram-click"
            className="floating-action-btn-instagram"
          >
            <InstagramIcon className="h-5 w-5" />
          </a>
        </div>
      ) : null}

      <div className="group relative flex items-center">
        <span role="tooltip" className="floating-tooltip">
          WhatsApp Mesajı
        </span>
        <a
          href={`https://wa.me/${whatsapp?.replace(/\D/g, "")}?text=${encodeURIComponent(
            "Merhaba Akın Bey, danışmanlık ve randevu süreci hakkında bilgi almak istiyorum."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp üzerinden mesaj gönderin"
          data-umami-event="contact-whatsapp-click"
          className="floating-action-btn-whatsapp"
        >
          <WhatsAppIcon className="h-6 w-6" />
        </a>
      </div>
    </aside>
  );
}
