import { Phone, MessageCircle } from "lucide-react";
import { client } from "@/sanity/lib/client";

interface ContactSnippet {
  phoneRaw: string;
  whatsappNumber: string;
}

const SNIPPET_QUERY = `
  *[_type == "contact"][0] {
    phoneRaw,
    whatsappNumber
  }
`;

/**
 * Sayfa genelinde sabit duran hızlı telefon ve WhatsApp iletişim butonları.
 */
export async function FloatingContact() {
  const data = await client.fetch<ContactSnippet>(
    SNIPPET_QUERY,
    {},
    { cache: "no-store" }
  );

  const phone = data?.phoneRaw;
  const whatsapp = data?.whatsappNumber;

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
          href={`tel:${phone}`}
          aria-label="Telefonla hemen arayın"
          className="floating-action-btn"
        >
          <Phone className="h-5 w-5" strokeWidth={2} />
        </a>
      </div>

      <div className="group relative flex items-center">
        <span role="tooltip" className="floating-tooltip">
          WhatsApp Mesajı
        </span>
        <a
          href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(
            "Merhaba Akın Bey, danışmanlık ve randevu süreci hakkında bilgi almak istiyorum."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp üzerinden mesaj gönderin"
          className="floating-action-btn-whatsapp"
        >
          <MessageCircle className="h-5 w-5" strokeWidth={2} />
        </a>
      </div>
    </aside>
  );
}