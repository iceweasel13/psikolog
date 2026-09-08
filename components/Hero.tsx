import Link from "next/link";
import Image from "next/image";
import { InteractiveSynapse } from "@/components/InteractiveSynapse";
import { ArrowRight, Sparkles } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { HERO_QUERY } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";

export interface HeroData {
  badgeText: string;
  titleMain: string;
  titleHighlight: string;
  description: string;
  quote: string;
  ctaPrimaryText: string;
  ctaPrimaryLink: string;
  ctaSecondaryText: string;
  ctaSecondaryLink: string;
  stats: { title: string; subtitle: string }[];
  portraitImage?: any;
  trustBadgeTitle: string;
  trustBadgeSubtitle: string;
}

export async function Hero() {
  const heroData = await client.fetch<HeroData>(
    HERO_QUERY,
    {},
    { cache: "no-store" }
  );

  return (
    <section className="relative w-full overflow-hidden bg-brand-bg pt-8 pb-20 lg:py-24">
      {/* 1. Arka Plan Sinaps Ağı */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-75">
        <InteractiveSynapse />
      </div>

      {/* 2. Aurora Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/4 w-[600px] sm:w-[850px] h-[550px] opacity-40 blur-[130px] -z-0">
        <div className="w-full h-full bg-gradient-to-br from-brand-primary via-amber-100/50 to-stone-200 rounded-full" />
      </div>

      {/* 3. İçerik Katmanı */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Sol Kolon */}
          <div className="lg:col-span-7 space-y-7 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-primary/60 border border-brand-border text-brand-heading text-xs font-medium tracking-wide backdrop-blur-xs">
              <Sparkles className="w-3.5 h-3.5 text-brand-hover" />
              <span>{heroData.badgeText}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-brand-heading tracking-tight leading-[1.15]">
              {heroData.titleMain} <br className="hidden sm:inline" />
              <span className="italic font-normal text-brand-hover">{heroData.titleHighlight}</span>
            </h1>

            <p className="text-base sm:text-lg text-brand-body leading-relaxed max-w-xl">
              {heroData.description}
            </p>

            <div className="relative p-6 sm:p-7 rounded-3xl bg-white/80 backdrop-blur-md border-l-4 border-brand-hover border-y border-r border-brand-border shadow-xs">
              <span className="absolute -top-3 left-4 text-3xl font-serif text-brand-hover leading-none select-none">
                “
              </span>
              <p className="font-serif italic text-brand-heading text-sm sm:text-base leading-relaxed">
                {heroData.quote}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href={heroData.ctaPrimaryLink}
                className="inline-flex justify-center items-center gap-2 px-7 py-4 rounded-2xl bg-brand-heading text-brand-bg font-medium text-sm hover:bg-brand-heading/90 transition-all shadow-sm group cursor-pointer"
              >
                <span>{heroData.ctaPrimaryText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href={heroData.ctaSecondaryLink}
                className="inline-flex justify-center items-center px-7 py-4 rounded-2xl border border-brand-border bg-white/90 text-brand-heading font-medium text-sm hover:bg-brand-primary/50 transition-colors"
              >
                {heroData.ctaSecondaryText}
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 border-t border-brand-border/70">
              {heroData.stats.map((stat, idx) => (
                <div key={idx} className="p-3 sm:p-4 rounded-2xl bg-white/75 backdrop-blur-xs border border-brand-border/60">
                  <p className="text-xs sm:text-sm font-bold text-brand-heading">{stat.title}</p>
                  <p className="text-[11px] text-brand-muted mt-0.5">{stat.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sağ Kolon */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full max-w-[420px] aspect-[3/4] rounded-3xl overflow-hidden bg-brand-primary/30 border border-brand-border shadow-xl backdrop-blur-xs">
              
              {heroData.portraitImage ? (
                <Image
                  src={urlFor(heroData.portraitImage).width(800).height(1066).quality(90).url()}
                  alt="Psk. Akın Temiz"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 420px"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-brand-muted text-sm font-medium">
                  <span className="text-3xl mb-2">🌿</span>
                  <span>[Fotoğraf Studio&apos;dan Bekleniyor]</span>
                </div>
              )}


            </div>
          </div>

        </div>
      </div>
    </section>
  );
}