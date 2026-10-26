import type { Metadata } from "next";
import { Playfair_Display, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { PrivacyConsent } from "@/components/PrivacyConsent";
import {
  HOME_URL,
  OG_IMAGE_URL,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});

const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    SITE_NAME,
    "Akın Temiz",
    "Online Terapi",
    "Bilişsel Davranışçı Terapi",
    "Bireysel Terapi",
    "Ergen Terapisi",
    "EMDR Terapisi",
  ],
  authors: [{ name: SITE_NAME, url: HOME_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: HOME_URL,
  },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: HOME_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: `${SITE_NAME} sosyal paylaşım görseli`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_URL,
        alt: `${SITE_NAME} sosyal paylaşım görseli`,
      },
    ],
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
