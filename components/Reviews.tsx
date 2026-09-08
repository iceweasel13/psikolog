import { client } from "@/sanity/lib/client";
import { REVIEWS_QUERY } from "@/sanity/lib/queries";

export interface ReviewItem {
  category: string;
  text: string;
}

export interface ReviewsData {
  tagline: string;
  heading: string;
  description: string;
  rowOne: ReviewItem[];
  rowTwo: ReviewItem[];
}

function ReviewCard({ text, category }: { text: string; category: string }) {
  return (
    <div className="w-[340px] sm:w-[400px] shrink-0 bg-white p-6 rounded-3xl border border-brand-border/80 shadow-sm flex flex-col justify-between hover:border-brand-hover/80 transition-colors">
      <div>
        {/* 5 Yıldız */}
        <div className="flex gap-1 text-amber-600/90 text-sm mb-3">
          {"★★★★★"}
        </div>
        {/* Yorum */}
        <p className="text-brand-heading text-sm leading-relaxed line-clamp-4 font-normal">
          &quot;{text}&quot;
        </p>
      </div>

      {/* Kategori Etiketi */}
      <div className="mt-4 pt-3 border-t border-brand-border/40 flex items-center justify-between">
        <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-brand-primary/40 text-brand-heading">
          {category}
        </span>
        <span className="text-[11px] text-brand-muted">Danışan Görüşü</span>
      </div>
    </div>
  );
}

export async function Reviews() {
  const reviews = await client.fetch<ReviewsData>(
    REVIEWS_QUERY,
    {},
    { cache: "no-store" }
  );

  return (
    <section className="bg-brand-primary py-20 sm:py-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16 text-center">
        <span className="text-xs font-mono uppercase tracking-widest text-brand-heading/70 block mb-2">
          {reviews.tagline}
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-brand-heading tracking-tight mb-4">
          {reviews.heading}
        </h2>
        <p className="text-brand-body text-sm sm:text-base max-w-xl mx-auto">
          {reviews.description}
        </p>
      </div>

      {/* Kayar Bant Alanı */}
      <div className="relative flex flex-col gap-6 w-full">
        {/* Sol ve Sağ Kenar Gradyan Fade */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-brand-bg to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-brand-bg to-transparent z-10" />

        {/* Üst Satır: Sola Kayar */}
        <div className="flex gap-6 w-max animate-marquee-left hover:[animation-play-state:paused]">
          {[...reviews.rowOne, ...reviews.rowOne].map((item, idx) => (
            <ReviewCard key={`row1-${idx}`} text={item.text} category={item.category} />
          ))}
        </div>

        {/* Alt Satır: Sağa Kayar */}
        <div className="flex gap-6 w-max animate-marquee-right hover:[animation-play-state:paused]">
          {[...reviews.rowTwo, ...reviews.rowTwo].map((item, idx) => (
            <ReviewCard key={`row2-${idx}`} text={item.text} category={item.category} />
          ))}
        </div>
      </div>
    </section>
  );
}