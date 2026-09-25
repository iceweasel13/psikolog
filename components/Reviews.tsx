import { client } from "@/sanity/lib/client";
import { REVIEWS_QUERY } from "@/sanity/lib/queries";
import { MotionItem } from "@/components/ui/motion-item";

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

/**
 * Tekil danışan görüş kartı bileşeni.
 */
function ReviewCard({ text, category }: { text: string; category: string }) {
  return (
    <div className="review-card">
      <div>
        <div className="flex gap-1 text-amber-600/90 text-sm mb-3">
          {"★★★★★"}
        </div>
        <p className="text-brand-heading text-sm leading-relaxed line-clamp-4 font-normal">
          &quot;{text}&quot;
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-brand-border/40 flex items-center justify-between">
        <span className="badge-primary">
          {category}
        </span>
        <span className="text-[11px] text-brand-muted">Danışan Görüşü</span>
      </div>
    </div>
  );
}

/**
 * Danışan yorumlarının sonsuz döngülü çift yönlü marquee ile aktarıldığı bölüm bileşeni.
 */
export async function Reviews() {
  const reviews = await client.fetch<ReviewsData>(
    REVIEWS_QUERY,
    {},
    { cache: "no-store" }
  );

  return (
    <section
      id="review"
      className="bg-brand-primary py-20 sm:py-28 overflow-hidden relative scroll-mt-24 sm:scroll-mt-28"
    >
      <MotionItem className="section-container mb-12 sm:mb-16 text-center">
        <span className="clinical-tagline">
          {reviews.tagline}
        </span>
        <h2 className="clinical-heading">
          {reviews.heading}
        </h2>
        <p className="text-brand-body text-sm sm:text-base max-w-xl mx-auto">
          {reviews.description}
        </p>
      </MotionItem>

      <MotionItem delay={0.15} className="relative flex flex-col gap-6 w-full">
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-brand-primary to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-brand-primary to-transparent z-10" />

        <div className="flex gap-6 w-max animate-marquee-left hover:[animation-play-state:paused]">
          {[...reviews.rowOne, ...reviews.rowOne]?.map((item, idx) => (
            <ReviewCard key={`row1-${idx}`} text={item.text} category={item.category} />
          ))}
        </div>

        <div className="flex gap-6 w-max animate-marquee-right hover:[animation-play-state:paused]">
          {[...reviews.rowTwo, ...reviews.rowTwo]?.map((item, idx) => (
            <ReviewCard key={`row2-${idx}`} text={item.text} category={item.category} />
          ))}
        </div>
      </MotionItem>
    </section>
  );
}