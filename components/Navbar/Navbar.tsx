import Link from "next/link";
import { MobileNav } from "@/components/Navbar/MobileNav";
import { client } from "@/sanity/lib/client";
import { NAVBAR_QUERY } from "@/sanity/lib/queries";

export interface NavbarData {
  title?: string;
  navItems?: { label: string; href: string }[];
  ctaButtonText?: string;
  ctaButtonLink?: string;
}

export default async function Navbar() {
  let navbarData: NavbarData | null = null;

  try {
    // client.fetch ile doğrudan sorguluyoruz
    navbarData = await client.fetch<NavbarData>(
      NAVBAR_QUERY,
      {},
      { cache: "no-store" } // Test aşamasında cache'i kapatıp canlı veriyi zorlar
    );
    console.log("SANITY GELEN VERİ:", navbarData);
  } catch (error) {
    console.error("Navbar Sanity fetch error:", error);
  }

  const brandTitle = navbarData?.title || "Psk. Akın Temiz";
  const navLinks = navbarData?.navItems || [];
  const ctaText = navbarData?.ctaButtonText || "Randevu Al";
  const ctaLink = navbarData?.ctaButtonLink || "#randevu";

  return (
    <header className="sticky top-0 z-40 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Marka / Logo */}
        <Link
          href="/"
          className="text-xl sm:text-2xl font-serif font-bold text-brand-heading tracking-tight hover:opacity-90 transition-opacity"
        >
          {brandTitle}
        </Link>

        {/* Desktop Navigasyon */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-brand-heading">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-brand-hover transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA & Mobil Menü */}
        <div className="flex items-center gap-3">
          <Link
            href={ctaLink}
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-xl bg-brand-primary text-brand-heading hover:bg-brand-hover transition-colors shadow-sm"
          >
            {ctaText}
          </Link>

          <MobileNav links={navLinks} ctaText={ctaText} ctaLink={ctaLink} />
        </div>
      </div>
    </header>
  );
}