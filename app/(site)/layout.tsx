import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { HOME_URL, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: HOME_URL,
      inLanguage: "tr-TR",
      publisher: { "@id": `${SITE_URL}/#person` }
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: HOME_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      inLanguage: "tr-TR"
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Akın Temiz",
      jobTitle: "Klinik Psikolog",
      telephone: "+905468537469",
      email: "pskakintemiz@gmail.com",
      url: HOME_URL,
      sameAs: ["https://www.instagram.com/psikologakintemiz/"],
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
