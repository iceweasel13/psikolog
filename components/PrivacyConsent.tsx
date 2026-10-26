"use client";

import Script from "next/script";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Settings2, X } from "lucide-react";

const CONSENT_STORAGE_KEY = "akintemiz-analytics-consent-v1";
const OPEN_PREFERENCES_EVENT = "privacy-consent:open";
const CONSENT_CHANGE_EVENT = "privacy-consent:change";

type ConsentChoice = "accepted" | "rejected";

const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
const scriptUrl =
  process.env.NEXT_PUBLIC_UMAMI_SCRIPT_URL || "https://cloud.umami.is/script.js";

function readStoredChoice(): ConsentChoice | null {
  try {
    const value = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

function subscribeToChoice(onStoreChange: () => void) {
  window.addEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(CONSENT_CHANGE_EVENT, onStoreChange);
}

export function openPrivacyPreferences() {
  window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT));
}

export function PrivacyConsent() {
  const analyticsAvailable = Boolean(websiteId);
  const choice = useSyncExternalStore(
    subscribeToChoice,
    readStoredChoice,
    () => undefined
  );
  const [preferencesOpen, setPreferencesOpen] = useState(false);
  const [analyticsSelected, setAnalyticsSelected] = useState(false);

  useEffect(() => {
    const openPreferences = () => {
      const currentChoice = readStoredChoice();
      setAnalyticsSelected(currentChoice === "accepted");
      setPreferencesOpen(true);
    };

    window.addEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, openPreferences);
  }, []);

  function saveChoice(nextChoice: ConsentChoice) {
    const previouslyAccepted = choice === "accepted";

    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, nextChoice);
    } catch {
      // Depolama engelliyse seçim yalnızca mevcut sayfa için uygulanır.
    }

    setAnalyticsSelected(nextChoice === "accepted");
    setPreferencesOpen(false);
    window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));

    if (previouslyAccepted && nextChoice === "rejected") {
      window.location.reload();
    }
  }

  return (
    <>
      {analyticsAvailable && choice === "accepted" ? (
        <Script
          id="umami-analytics"
          src={scriptUrl}
          strategy="afterInteractive"
          data-website-id={websiteId}
          data-exclude-hash="true"
          data-exclude-search="true"
          data-do-not-track="true"
        />
      ) : null}

      {analyticsAvailable && choice === null ? (
        <aside
          aria-label="Analitik tercihi"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-4xl rounded-2xl border border-brand-border bg-white/98 p-4 shadow-2xl backdrop-blur-md sm:bottom-5 sm:p-5"
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-serif text-lg font-bold text-brand-heading">
                Analitik tercihiniz
              </h2>
              <p className="mt-1 text-xs leading-relaxed text-brand-body sm:text-sm">
                Site kullanımını anlamak için çerez kullanmayan Umami Cloud&apos;u yalnızca izninizle çalıştırıyoruz. Form içeriği, sağlık bilgisi veya kullanıcı kimliği analitiğe gönderilmez. Veriler yurt dışındaki hizmet sağlayıcı altyapısında işlenebilir.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 lg:shrink-0">
              <button type="button" onClick={() => saveChoice("accepted")} className="rounded-xl bg-brand-heading px-4 py-2.5 text-sm font-medium text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover">
                Kabul Et
              </button>
              <button type="button" onClick={() => saveChoice("rejected")} className="rounded-xl border border-brand-border bg-brand-bg px-4 py-2.5 text-sm font-medium text-brand-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover">
                Reddet
              </button>
              <button type="button" onClick={() => setPreferencesOpen(true)} className="rounded-xl border border-brand-border bg-white px-4 py-2.5 text-sm font-medium text-brand-heading focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-hover">
                Tercihleri Yönet
              </button>
            </div>
          </div>
        </aside>
      ) : null}

      {preferencesOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="privacy-preferences-title"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-heading/60 p-4 backdrop-blur-xs"
          onClick={() => setPreferencesOpen(false)}
        >
          <div className="w-full max-w-lg rounded-3xl border border-brand-border bg-white p-6 shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="mb-2 inline-flex rounded-full bg-brand-primary/60 p-2 text-brand-heading">
                  <Settings2 className="h-4 w-4" aria-hidden="true" />
                </span>
                <h2 id="privacy-preferences-title" className="font-serif text-2xl font-bold text-brand-heading">
                  Analitik tercihleri
                </h2>
              </div>
              <button type="button" onClick={() => setPreferencesOpen(false)} aria-label="Tercihleri kapat" className="rounded-full p-2 text-brand-muted hover:bg-brand-bg hover:text-brand-heading">
                <X className="h-5 w-5" />
              </button>
            </div>

            {analyticsAvailable ? (
              <div className="mt-6 rounded-2xl border border-brand-border bg-brand-bg/60 p-4">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={analyticsSelected}
                    onChange={(event) => setAnalyticsSelected(event.target.checked)}
                    className="mt-1 h-4 w-4 accent-brand-heading"
                  />
                  <span>
                    <span className="block text-sm font-semibold text-brand-heading">Anonim kullanım analitiği</span>
                    <span className="mt-1 block text-xs leading-relaxed text-brand-body">
                      Sayfa görüntüleme, yönlendiren kaynak ve anonim etkileşim olaylarını ölçer. Randevu formu alanları gönderilmez.
                    </span>
                  </span>
                </label>
              </div>
            ) : (
              <div className="mt-6 rounded-2xl border border-brand-border bg-brand-bg/60 p-4 text-sm leading-relaxed text-brand-body">
                Analitik sistemi şu anda etkin değil. Bu nedenle tarayıcınızda kaydedilecek bir analitik tercihi bulunmuyor.
              </div>
            )}

            {analyticsAvailable ? (
              <p className="mt-4 text-xs leading-relaxed text-brand-muted">
                Tercihinizi hatırlamak için yalnızca bu tarayıcıda <code>{CONSENT_STORAGE_KEY}</code> adlı localStorage kaydı tutulur.
              </p>
            ) : null}

            <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setPreferencesOpen(false)} className="rounded-xl border border-brand-border px-4 py-2.5 text-sm font-medium text-brand-heading">
                Vazgeç
              </button>
              {analyticsAvailable ? (
                <button type="button" onClick={() => saveChoice(analyticsSelected ? "accepted" : "rejected")} className="rounded-xl bg-brand-heading px-4 py-2.5 text-sm font-medium text-white">
                  Tercihi Kaydet
                </button>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
