import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://akintemiz.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: "Klinik Psikolog Akın Temiz",
      url: siteUrl,
      inLanguage: "tr-TR",
      publisher: { "@id": `${siteUrl}/#person` }
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Klinik Psikolog Akın Temiz",
      description: "Akın Temiz'in eğitim geçmişi, çalışma alanları ve psikoterapi süreci hakkında bilgi.",
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#person` },
      inLanguage: "tr-TR"
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Akın Temiz",
      jobTitle: "Klinik Psikolog",
      telephone: "+905468537469",
      email: "pskakintemiz@gmail.com",
      url: siteUrl,
      sameAs: ["https://www.instagram.com/psikologakintemiz/"],
      homeLocation: { "@type": "Place", name: "Samsun, Türkiye" }
    }
  ]
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
      <FloatingContact />
    </div>
  );
}
