"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import { type SanityImageSource } from "@/sanity/lib/image";
import { CertificateModal } from "@/components/CertificateModal";

export interface EducationItem {
  badge: string;
  title: string;
  institution: string;
  desc: string;
  year?: number;
  category?: string;
  certificateUrl?: string;
  certificateImage?: SanityImageSource;
}

const INITIAL_ITEM_COUNT = 6;

export function EducationGrid({ items }: { items: EducationItem[] }) {
  const hasYears = items.some((item) => item.year);
  const [showAll, setShowAll] = useState(false);
  const [newestFirst, setNewestFirst] = useState(true);

  const sortedItems = useMemo(() => {
    if (!hasYears) return items;

    return [...items].sort((a, b) => {
      const difference = (b.year ?? 0) - (a.year ?? 0);
      return newestFirst ? difference : -difference;
    });
  }, [hasYears, items, newestFirst]);

  const visibleItems = showAll
    ? sortedItems
    : sortedItems.slice(0, INITIAL_ITEM_COUNT);

  return (
    <div>
      {hasYears ? (
        <div className="mb-6 flex justify-end">
          <button
            type="button"
            onClick={() => setNewestFirst((current) => !current)}
            className="rounded-xl border border-brand-border bg-white/90 px-4 py-2 text-xs font-medium text-brand-heading transition-colors hover:border-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover"
          >
            Tarih: {newestFirst ? "Yeni → Eski" : "Eski → Yeni"}
          </button>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 md:auto-rows-fr md:grid-cols-2 lg:grid-cols-3">
        {visibleItems.map((item, index) => (
          <article
            key={`${item.title}-${item.institution}-${index}`}
            className="flex h-full min-w-0 flex-col rounded-2xl border border-brand-border bg-white/95 p-6 shadow-xs transition-[border-color,box-shadow] hover:border-brand-hover hover:shadow-md"
          >
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="badge-timeline">{item.category || item.badge}</span>
              {item.year ? (
                <time className="text-xs font-medium text-brand-muted" dateTime={String(item.year)}>
                  {item.year}
                </time>
              ) : null}
            </div>
            <h3 className="text-lg font-serif font-bold leading-snug text-brand-heading break-words">
              {item.title}
            </h3>
            <p className="mt-1 text-xs font-medium text-brand-muted">
              {item.institution}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-brand-body">
              {item.desc}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-3 pt-4">
              {item.certificateImage ? (
                <CertificateModal
                  image={item.certificateImage}
                  title={item.title}
                  institution={item.institution}
                />
              ) : null}
              {item.certificateUrl ? (
                <a
                  href={item.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-brand-border/70 bg-brand-bg/70 px-2.5 py-1 text-xs font-medium text-brand-heading/90 transition-colors hover:border-brand-hover/60 hover:bg-brand-primary/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover"
                >
                  Sertifika bağlantısı
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>

      {items.length > INITIAL_ITEM_COUNT ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setShowAll((current) => !current)}
            aria-expanded={showAll}
            className="btn-secondary gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover"
          >
            {showAll ? "Daha Az Göster" : "Tüm Eğitimleri Gör"}
            {showAll ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        </div>
      ) : null}
    </div>
  );
}
