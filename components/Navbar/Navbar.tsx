import Link from "next/link";
import { MobileNav } from "@/components/Navbar/MobileNav";
import { client } from "@/sanity/lib/client";
import { NAVBAR_QUERY } from "@/sanity/lib/queries";
import { PsychologyLogo } from "../icons/PsychologyLogo";

export interface NavbarData {
  title?: string;
  navItems?: { label: string; href: string }[];
  ctaButtonText?: string;
  ctaButtonLink?: string;
}

/**
 * Masaüstü ve mobil navigasyon bağlantılarını, logo ve aksiyon butonunu içeren üst menü bileşeni.
 */
export default async function Navbar() {
  let navbarData: NavbarData | null = null;

  try {
    navbarData = await client.fetch<NavbarData>(
      NAVBAR_QUERY,
      {},
      { cache: "no-store" }
    );
  } catch {
    navbarData = null;
  }

  const brandTitle = navbarData?.title || "Psk. Akın Temiz";
  const navLinks = navbarData?.navItems || [];
  const ctaText = navbarData?.ctaButtonText || "Randevu Al";
  const ctaLink = navbarData?.ctaButtonLink || "#randevu";

  return (
    <header className="sticky top-0 z-40 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border">
      <div className="section-container h-20 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="group flex items-center gap-3 shrink-0 select-none hover:opacity-95 transition-opacity"
        >
          <div className="flex items-center justify-center p-1.5 rounded-xl bg-brand-primary/40 border border-brand-border/60 group-hover:border-brand-hover/40 transition-colors">
            <PsychologyLogo className="w-6 h-6 sm:w-7 sm:h-7 text-brand-hover shrink-0" />
          </div>

          <span className="hidden sm:inline-block h-5 w-px bg-brand-border/80" aria-hidden="true" />

          <span className="text-lg sm:text-xl lg:text-2xl font-serif font-bold text-brand-heading tracking-tight">
            {brandTitle}
          </span>
        </Link>

        <nav className="hidden md:flex items-center md:gap-5 lg:gap-8 xl:gap-9 text-sm lg:text-[18px] font-medium text-brand-heading/90">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href={ctaLink}
            className="hidden md:inline-flex items-center justify-center px-5 lg:px-6 py-2.5 lg:py-3 text-sm lg:text-base font-medium rounded-xl bg-brand-primary text-brand-heading hover:bg-brand-hover hover:text-brand-bg transition-all shadow-xs active:scale-95"
          >
            {ctaText}
          </Link>

          <MobileNav links={navLinks} ctaText={ctaText} ctaLink={ctaLink} />
        </div>
      </div>
    </header>
  );
}