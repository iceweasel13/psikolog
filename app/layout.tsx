import type { Metadata } from "next";
import { Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PrivacyConsent } from "@/components/PrivacyConsent";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://akintemiz.com";
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Klinik Psikolog Akın Temiz",
    template: "%s | Klinik Psikolog Akın Temiz",
  },
  description:
    "Klinik Psikolog Akın Temiz hakkında bilgi edinin. Eğitim geçmişini, çalışma alanlarını ve Samsun'da yüz yüze veya online psikoterapi sürecine ilişkin bilgileri inceleyin.",
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
    title: "Klinik Psikolog Akın Temiz",
    description:
      "Akın Temiz'in eğitim geçmişini, çalışma alanlarını ve Samsun'da yüz yüze veya online psikoterapi sürecine ilişkin bilgileri inceleyin.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Klinik Psikolog Akın Temiz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klinik Psikolog Akın Temiz",
    description:
      "Akın Temiz'in eğitim geçmişini, çalışma alanlarını ve psikoterapi sürecine ilişkin bilgileri inceleyin.",
    images: ["/opengraph-image"],
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "any" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
  verification: googleSiteVerification
    ? { google: googleSiteVerification }
    : undefined,
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
        {children}
        <PrivacyConsent />
      </body>
    </html>
  );
}
