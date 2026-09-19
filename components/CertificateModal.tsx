"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { FileText, X } from "lucide-react";
import { urlFor, type SanityImageSource } from "@/sanity/lib/image";

interface CertificateModalProps {
  image: SanityImageSource;
  title: string;
  institution: string;
}

const emptySubscribe = () => () => {};

export function CertificateModal({ image, title, institution }: CertificateModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  if (!image) return null;

  let imageUrl: string | null = null;
  try {
    imageUrl = urlFor(image).width(1400).quality(90).url();
  } catch {
    imageUrl = null;
  }

  if (!imageUrl) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-brand-border/70 bg-brand-bg/70 px-2.5 py-1 text-xs font-medium text-brand-heading/90 transition-all hover:border-brand-hover/60 hover:bg-brand-primary/40 hover:text-brand-heading active:scale-95"
      >
        <FileText className="h-3.5 w-3.5 text-brand-hover shrink-0" />
        <span>Belgeyi Görüntüle</span>
      </button>

      {isOpen && isMounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-modal-title"
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-heading/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-brand-border bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-brand-border/60 px-6 py-4">
              <div>
                <h4 id="certificate-modal-title" className="font-serif text-base font-bold text-brand-heading">
                  {title}
                </h4>
                <p className="text-xs text-brand-muted">{institution}</p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1 text-brand-muted transition-colors hover:bg-brand-bg hover:text-brand-heading"
                aria-label="Kapat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative aspect-[4/3] w-full bg-brand-bg p-4">
              <Image
                src={imageUrl}
                alt={`${title} - ${institution} Sertifikası`}
                fill
                className="object-contain p-2"
                sizes="(max-width: 768px) 100vw, 700px"
              />
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}