import { client } from "@/sanity/lib/client";
import { EDUCATION_QUERY } from "@/sanity/lib/queries";
import { type SanityImageSource } from "@/sanity/lib/image";
import { MotionItem } from "@/components/ui/motion-item";
import { EducationGrid } from "@/components/EducationGrid";

export interface TimelineItem {
  badge: string;
  title: string;
  institution: string;
  desc: string;
  year?: number;
  category?: string;
  certificateUrl?: string;
  certificateImage?: SanityImageSource;
}

export interface EducationData {
  tagline: string;
  heading: string;
  description: string;
  timeline: TimelineItem[];
}

/**
 * Akademik geçmiş ve sertifikasyonların ölçeklenebilir kartlarla sergilendiği bölüm.
 */
export async function Education() {
  const education = await client.fetch<EducationData>(
    EDUCATION_QUERY,
    {},
    { next: { revalidate: 300 } }
  );

  return (
    <section id="education" className="relative w-full overflow-hidden bg-brand-bg py-24 sm:py-32">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <svg
          viewBox="0 0 960 540"
          className="h-full w-full object-cover opacity-60"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="fill-brand-primary">
            <circle r="145" cx="792" cy="181" className="opacity-80" />
            <circle r="132" cx="175" cy="151" className="opacity-70" />
            <circle r="165" cx="515" cy="351" className="opacity-70" />
          </g>
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <MotionItem className="max-w-2xl text-center lg:text-left mb-16 sm:mb-20">
          <span className="clinical-tagline">
            {education.tagline}
          </span>
          <h2 className="clinical-heading">
            {education.heading}
          </h2>
          <p className="clinical-body">
            {education.description}
          </p>
          <div className="hidden lg:block w-12 h-1 bg-brand-hover/40 rounded-full mt-6" />
        </MotionItem>

        <EducationGrid items={education.timeline || []} />
      </div>
    </section>
  );
}
