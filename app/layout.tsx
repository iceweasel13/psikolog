import type { Metadata } from "next";
import { Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { MarqueeTitle } from "@/components/MarqueeTitle";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://akintemiz.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Klinik Psikolog Akın Temiz | Samsun & Online Psikoterapi",
    template: "%s | Klinik Psikolog Akın Temiz",
  },
  description:
    "Klinik Psikolog Akın Temiz; Samsun'da yüz yüze ve online olarak Bilişsel Davranışçı Terapi (BDT), Bireysel Terapi, Ergen, Çift ve Cinsel Terapi alanlarında bilimsel temelli danışmanlık sunmaktadır.",
  keywords: [
    "Klinik Psikolog Akın Temiz",
    "Akın Temiz",
    "Samsun Psikolog",
    "Samsun Klinik Psikolog",
    "Online Terapi",
    "Bilişsel Davranışçı Terapi",
    "BDT Samsun",
    "Bireysel Terapi",
    "Ergen Terapisi",
    "Cinsel Terapi",
    "Çift Terapisi",
    "Oyun Terapisi",
    "Samsun Psikolojik Danışmanlık",
  ],
  authors: [{ name: "Klinik Psikolog Akın Temiz", url: siteUrl }],
  creator: "Klinik Psikolog Akın Temiz",
  publisher: "Klinik Psikolog Akın Temiz",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: "Klinik Psikolog Akın Temiz",
    title: "Klinik Psikolog Akın Temiz | Samsun & Online Psikoterapi",
    description:
      "Samsun'da yüz yüze ve online seanslarla BDT, Bireysel Terapi, Ergen Terapisi, Çift ve Cinsel Terapi hizmetleri.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Klinik Psikolog Akın Temiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klinik Psikolog Akın Temiz | Samsun & Online Psikoterapi",
    description:
      "Samsun'da yüz yüze ve online seanslarla BDT, Bireysel Terapi, Ergen Terapisi, Çift ve Cinsel Terapi hizmetleri.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={cn("scroll-smooth", playfair.variable, geist.variable, "font-sans")}>
      <body className="antialiased min-h-screen bg-brand-bg text-brand-body font-sans">
        <MarqueeTitle activeTitle="Klinik Psikolog Akın Temiz | Samsun & Online Terapi" speed={280} />
        {children}
      </body>
    </html>
  );
}