import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { ABOUT_QUERY } from "@/sanity/lib/queries";
import { urlFor, type SanityImageSource } from "@/sanity/lib/image";
import { MotionItem } from "@/components/ui/motion-item";

export interface AboutData {
  tagline: string;
  heading: string;
  aboutImage?: SanityImageSource & { alt?: string };
  quote: string;
  bioParagraph1: string;
  bioParagraph2: string;
  highlightCards: {
    badge: string;
    title: string;
    subtitle: string;
  }[];
}

/**
 * Hekimin biyografisini, klinik felsefesini ve deneyim kartlarını içeren Hakkımda bölümü.
 */
export async function AboutMe() {
  const aboutData = await client.fetch<AboutData>(
    ABOUT_QUERY,
    {},
    { cache: "no-store" }
  );

  return (
    <section id="hakkimda" className="bg-brand-primary py-16 sm:py-24 text-brand-heading">
      <div className="section-container">
        <MotionItem className="max-w-2xl mb-12 sm:mb-16">
          <span className="clinical-tagline">
            {aboutData.tagline}
          </span>
          <h2 className="clinical-heading">
            {aboutData.heading}
          </h2>
        </MotionItem>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <MotionItem delay={0.1} className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-brand-bg shadow-sm border border-brand-hover/30">
              {aboutData.aboutImage ? (
                <Image
                  src={urlFor(aboutData.aboutImage).width(800).height(1066).quality(90).url()}
                  alt={aboutData.aboutImage?.alt || "Psk. Akın Temiz"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 450px"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-brand-heading/40 text-sm font-medium">
                  [Studio&apos;dan Fotoğraf Bekleniyor]
                </div>
              )}
            </div>
          </MotionItem>

          <MotionItem delay={0.2} className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-brand-body leading-relaxed text-base sm:text-lg">
              <p className="text-brand-heading font-serif text-xl sm:text-2xl font-medium leading-snug">
                &quot;{aboutData.quote}&quot;
              </p>
              <p>
                {aboutData.bioParagraph1}
              </p>
              <p>
                {aboutData.bioParagraph2}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {aboutData.highlightCards.map((card, idx) => (
                <div key={idx} className="bg-brand-bg p-6 rounded-2xl border border-brand-border/60">
                  <span className="text-2xl font-serif font-bold text-brand-heading block mb-1">
                    {card.badge}
                  </span>
                  <p className="text-sm font-medium text-brand-heading">{card.title}</p>
                  <p className="text-xs text-brand-muted mt-1">{card.subtitle}</p>
                </div>
              ))}
            </div>
          </MotionItem>
        </div>
      </div>
    </section>
  );
}