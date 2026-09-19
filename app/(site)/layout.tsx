import Navbar from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://akintemiz.com";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["MedicalBusiness", "Psychologist", "LocalBusiness"],
      "@id": `${siteUrl}/#medical-business`,
      name: "Klinik Psikolog Akın Temiz",
      legalName: "Akın Temiz",
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      image: `${siteUrl}/og-image.jpg`,
      description:
        "Klinik Psikolog Akın Temiz; Samsun'da yüz yüze ve tüm Türkiye ile yurtdışına online olarak Bilişsel Davranışçı Terapi (BDT), Bireysel Terapi, Ergen, Cinsel, Çift ve Oyun Terapisi hizmetleri sunmaktadır.",
      telephone: "+905468537469",
      email: "info@akintemiz.com",
      priceRange: "$$",
      currenciesAccepted: "TRY",
      paymentAccepted: "Nakit, Kredi Kartı, Havale/EFT",
      medicalSpecialty: [
        "https://schema.org/Psychiatric",
        "https://schema.org/CommunityHealth"
      ],
      knowsAbout: [
        "Bilişsel Davranışçı Terapi (BDT)",
        "Bireysel Terapi",
        "Ergen Terapisi",
        "Cinsel Terapi",
        "Çift Terapisi",
        "Oyun Terapisi",
        "Online Terapi",
        "Klinik Psikoloji"
      ],
      availableService: [
        {
          "@type": "MedicalTherapy",
          name: "Bireysel Terapi",
          description: "Depresyon, kaygı, panik atak ve duygu durum süreçlerine yönelik bireysel psikoterapi."
        },
        {
          "@type": "MedicalTherapy",
          name: "Bilişsel Davranışçı Terapi (BDT)",
          description: "Düşünce, duygu ve davranış döngüsünü hedefleyen kanıta dayalı yapılandırılmış terapi ekolü."
        },
        {
          "@type": "MedicalTherapy",
          name: "Ergen Terapisi",
          description: "Ergenlik dönemi gelişimsel süreçler, sınav kaygısı ve duygusal düzenleme desteği."
        },
        {
          "@type": "MedicalTherapy",
          name: "Cinsel Terapi",
          description: "Bireysel ve çift düzeyinde cinsel işlev bozuklukları ve danışmanlık süreci."
        },
        {
          "@type": "MedicalTherapy",
          name: "Çift Terapisi",
          description: "İlişki içi iletişim problemleri, çatışma çözümü ve uyum süreçleri."
        },
        {
          "@type": "MedicalTherapy",
          name: "Oyun Terapisi",
          description: "Çocukların duygusal ve davranışsal ihtiyaçlarına yönelik yapılandırılmış oyun terapisi."
        },
        {
          "@type": "MedicalTherapy",
          name: "Online Terapi",
          description: "Türkiye geneli ve yurtdışındaki danışanlar için güvenli görüntülü seanslar."
        }
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Samsun",
        addressCountry: "TR"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: "41.2867",
        longitude: "36.3300"
      },
      openingHoursSpecification: [
        {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"
          ],
          opens: "09:00",
          closes: "19:00"
        }
      ]
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#practitioner`,
      name: "Akın Temiz",
      jobTitle: "Klinik Psikolog",
      honorificPrefix: "Psk.",
      telephone: "+905468537469",
      email: "info@akintemiz.com",
      url: siteUrl,
      worksFor: {
        "@id": `${siteUrl}/#medical-business`
      }
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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