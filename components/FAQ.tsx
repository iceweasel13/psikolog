import { client } from "@/sanity/lib/client";
import { FAQ_QUERY } from "@/sanity/lib/queries";

interface FAQData {
  tagline: string;
  heading: string;
  items: { _key: string; question: string; answer: string }[];
}

export async function FAQ() {
  const faq = await client.fetch<FAQData | null>(FAQ_QUERY, {}, { next: { revalidate: 300 } });

  if (!faq?.items?.length) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section id="sss" aria-labelledby="faq-heading" className="bg-brand-primary py-16 sm:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <div className="section-container">
        <div className="mx-auto max-w-3xl">
          <span className="clinical-tagline">{faq.tagline}</span>
          <h2 id="faq-heading" className="clinical-heading">
            {faq.heading}
          </h2>
          <div className="mt-8 space-y-3">
            {faq.items.map((item) => (
              <details
                key={item._key}
                className="group rounded-2xl border border-brand-border bg-white/75 px-5 py-4 open:bg-white"
              >
                <summary className="cursor-pointer list-none pr-8 font-medium text-brand-heading marker:content-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-hover">
                  {item.question}
                  <span className="float-right text-brand-hover transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-brand-body">{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
