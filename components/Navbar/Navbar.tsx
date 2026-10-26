import Link from "next/link";
import Image from "next/image";
import { MobileNav } from "@/components/Navbar/MobileNav";
import { client } from "@/sanity/lib/client";
import { NAVBAR_QUERY } from "@/sanity/lib/queries";

export interface NavbarData {
  title?: string;
  subtitle?: string;
  navItems?: { label: string; href: string }[];
  ctaButtonText?: string;
  ctaButtonLink?: string;
}

function splitBrand(title: string, subtitle?: string) {
  const normalizedTitle = title.trim();
  const role = subtitle?.trim() || "";
  const hasRolePrefix = role && normalizedTitle.toLocaleLowerCase("tr-TR").startsWith(role.toLocaleLowerCase("tr-TR"));
  const name = hasRolePrefix ? normalizedTitle.slice(role.length).trim() : normalizedTitle;

  return {
    role,
    name: name || normalizedTitle,
  };
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
      { next: { revalidate: 300 } }
    );
  } catch {
    navbarData = null;
  }

  const brandTitle = navbarData?.title || "Psk. Akın Temiz";
  const brand = splitBrand(brandTitle, navbarData?.subtitle);
  const navLinks = navbarData?.navItems || [];
  const ctaText = navbarData?.ctaButtonText || "Randevu Al";
  const ctaLink = navbarData?.ctaButtonLink || "#randevu";

  return (
    <header className="sticky top-0 z-40 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border">
      <div className="section-container flex h-20 items-center justify-between gap-3">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 select-none transition-opacity hover:opacity-95 sm:min-w-56 sm:gap-3 xl:min-w-60"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/40 p-2 border border-brand-border/60 group-hover:border-brand-hover/40 transition-colors">
            <Image
              src="/logo.png"
              alt=""
              width={900}
              height={616}
              className="h-auto w-full"
              priority
            />
          </div>

          <span className="hidden sm:inline-block h-5 w-px bg-brand-border/80" aria-hidden="true" />

          <span className="leading-none">
            {brand.role ? (
              <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-body sm:text-[11px]">
                {brand.role}
              </span>
            ) : null}
            <span className="block font-serif text-base font-bold tracking-tight text-brand-heading sm:text-lg lg:text-xl">
              {brand.name}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 text-[13px] font-medium text-brand-heading/90 xl:flex 2xl:gap-7 2xl:text-sm">
          {navLinks?.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3 shrink-0">
          <a
            href={ctaLink.startsWith("#") ? ctaLink : "#randevu"}
            className="hidden items-center justify-center rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-medium text-brand-heading shadow-xs transition-[background-color,color,transform] hover:bg-brand-hover hover:text-brand-bg active:scale-95 lg:inline-flex"
          >
            {ctaText}
          </a>

          <MobileNav links={navLinks} ctaText={ctaText} ctaLink={ctaLink} brandName={brand.name} brandRole={brand.role} />
        </div>
      </div>
    </header>
  );
}
