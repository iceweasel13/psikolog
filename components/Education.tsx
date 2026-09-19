import { client } from "@/sanity/lib/client";
import { EDUCATION_QUERY } from "@/sanity/lib/queries";
import { type SanityImageSource } from "@/sanity/lib/image";
import { CertificateModal } from "./CertificateModal";
import { MotionItem } from "@/components/ui/motion-item";

export interface TimelineItem {
  badge: string;
  title: string;
  institution: string;
  desc: string;
  side: "left" | "right";
  certificateImage?: SanityImageSource;
}

export interface EducationData {
  tagline: string;
  heading: string;
  description: string;
  timeline: TimelineItem[];
  skillsTagline: string;
  skillsHeading: string;
  skillsDescription: string;
  technicalSkills: string[];
}

/**
 * Akademik geçmiş, sertifikasyonlar ve klinik yeterliliklerin zaman çizelgesi olarak sergilendiği bölüm.
 */
export async function Education() {
  const education = await client.fetch<EducationData>(
    EDUCATION_QUERY,
    {},
    { cache: "no-store" }
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

        <div className="relative">
          <div className="absolute top-4 bottom-4 left-4 lg:left-1/2 w-px -translate-x-1/2 bg-brand-border lg:border-l lg:border-dashed lg:border-brand-hover/70" />

          <div className="space-y-8 sm:space-y-12">
            {education.timeline.map((item, index) => {
              const isLeft = item.side === "left";

              return (
                <MotionItem
                  key={index}
                  delay={index * 0.1}
                  className={`relative flex items-center pl-10 lg:pl-0 ${
                    isLeft ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  <div className="absolute left-4 lg:left-1/2 -translate-x-1/2 flex items-center justify-center w-6 h-6 rounded-full bg-white border-2 border-brand-heading shadow-xs z-20">
                    <div className="w-2 h-2 rounded-full bg-brand-hover" />
                  </div>

                  <div
                    className={`w-full lg:w-1/2 ${
                      isLeft ? "lg:pr-12 lg:text-right" : "lg:pl-12 lg:text-left"
                    }`}
                  >
                    <div className="rounded-2xl bg-white/95 backdrop-blur-sm p-6 sm:p-7 border border-brand-border shadow-xs hover:border-brand-hover hover:shadow-md transition-all">
                      <div
                        className={`flex flex-wrap items-center gap-2 mb-2 ${
                          isLeft ? "lg:justify-end" : "justify-start"
                        }`}
                      >
                        <span className="badge-timeline">
                          {item.badge}
                        </span>
                        <span className="text-xs text-brand-muted">
                          {item.institution}
                        </span>
                      </div>
                      <h3 className="text-lg font-serif font-bold text-brand-heading mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-brand-body leading-relaxed">
                        {item.desc}
                      </p>

                      {item.certificateImage && (
                        <div className={`mt-2 ${isLeft ? "lg:flex lg:justify-end" : ""}`}>
                          <CertificateModal
                            image={item.certificateImage}
                            title={item.title}
                            institution={item.institution}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="hidden lg:block lg:w-1/2" />
                </MotionItem>
              );
            })}
          </div>
        </div>

        <MotionItem
          delay={0.2}
          className="mt-16 sm:mt-24 rounded-3xl bg-white/95 backdrop-blur-sm p-6 sm:p-8 border border-brand-border shadow-xs flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-widest text-brand-muted block mb-1">
              {education.skillsTagline}
            </span>
            <h4 className="text-lg font-serif font-bold text-brand-heading">
              {education.skillsHeading}
            </h4>
            <p className="text-xs sm:text-sm text-brand-body mt-1">
              {education.skillsDescription}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 justify-center md:justify-end shrink-0">
            {education.technicalSkills.map((tool) => (
              <span
                key={tool}
                className="rounded-xl border border-brand-border bg-brand-bg px-3.5 py-1.5 text-xs font-semibold text-brand-heading"
              >
                {tool}
              </span>
            ))}
          </div>
        </MotionItem>
      </div>
    </section>
  );
}