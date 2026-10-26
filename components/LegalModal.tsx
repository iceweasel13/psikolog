"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { Cookie, FileText, Settings2, ShieldCheck, X } from "lucide-react";
import { openPrivacyPreferences } from "@/components/PrivacyConsent";

type LegalTab = "gizlilik" | "kvkk" | "cerez";

const OPEN_LEGAL_EVENT = "legal-dialog:open";
const emptySubscribe = () => () => {};

export function openLegalDialog(tab: LegalTab) {
  window.dispatchEvent(new CustomEvent<LegalTab>(OPEN_LEGAL_EVENT, { detail: tab }));
}

export function LegalLinks() {
  const [activeTab, setActiveTab] = useState<LegalTab | null>(null);
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  useEffect(() => {
    const handleOpen = (event: Event) => {
      setActiveTab((event as CustomEvent<LegalTab>).detail);
    };
    window.addEventListener(OPEN_LEGAL_EVENT, handleOpen);
    return () => window.removeEventListener(OPEN_LEGAL_EVENT, handleOpen);
  }, []);

  useEffect(() => {
    if (!activeTab) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveTab(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeTab]);

  const tabs: { id: LegalTab; label: string; icon: typeof ShieldCheck }[] = [
    { id: "gizlilik", label: "Gizlilik", icon: ShieldCheck },
    { id: "kvkk", label: "KVKK", icon: FileText },
    { id: "cerez", label: "Çerez ve Analitik", icon: Cookie },
  ];

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 sm:justify-end">
        <button type="button" onClick={() => setActiveTab("gizlilik")} className="hover:text-stone-200 transition-colors">
          Gizlilik Politikası
        </button>
        <span aria-hidden="true">·</span>
        <button type="button" onClick={() => setActiveTab("kvkk")} className="hover:text-stone-200 transition-colors">
          KVKK Aydınlatma Metni
        </button>
        <span aria-hidden="true">·</span>
        <button type="button" onClick={() => setActiveTab("cerez")} className="hover:text-stone-200 transition-colors">
          Çerez Politikası
        </button>
        <span aria-hidden="true">·</span>
        <button type="button" onClick={openPrivacyPreferences} className="inline-flex items-center gap-1 hover:text-stone-200 transition-colors">
          <Settings2 className="h-3.5 w-3.5" aria-hidden="true" />
          Çerez Tercihleri
        </button>
      </div>

      {activeTab && isMounted
        ? createPortal(
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="legal-dialog-title"
              onClick={() => setActiveTab(null)}
              className="fixed inset-0 z-50 flex items-center justify-center bg-brand-heading/60 p-4 backdrop-blur-xs"
            >
              <div onClick={(event) => event.stopPropagation()} className="relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-brand-border bg-white shadow-2xl">
                <div className="flex items-start justify-between gap-4 border-b border-brand-border/60 bg-brand-bg/40 px-5 py-4 sm:items-center sm:px-6">
                  <div className="flex flex-wrap gap-2" role="tablist" aria-label="Yasal metinler">
                    {tabs.map((tab) => {
                      const Icon = tab.icon;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          role="tab"
                          aria-selected={activeTab === tab.id}
                          onClick={() => setActiveTab(tab.id)}
                          className={`inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium transition-colors ${activeTab === tab.id ? "bg-brand-heading text-white" : "text-brand-heading hover:bg-brand-primary/40"}`}
                        >
                          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                  <button type="button" onClick={() => setActiveTab(null)} aria-label="Yasal metni kapat" className="shrink-0 rounded-full p-2 text-brand-muted hover:bg-brand-bg hover:text-brand-heading">
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="overflow-y-auto p-6 text-sm leading-relaxed text-brand-body sm:p-8">
                  {activeTab === "gizlilik" ? <PrivacyPolicy /> : null}
                  {activeTab === "kvkk" ? <KvkkNotice /> : null}
                  {activeTab === "cerez" ? <CookiePolicy /> : null}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}

function PolicyTitle({ children }: { children: string }) {
  return (
    <div className="mb-6">
      <h2 id="legal-dialog-title" className="font-serif text-2xl font-bold text-brand-heading">{children}</h2>
      <p className="mt-1 text-xs text-brand-muted">Son güncelleme: 26 Ekim 2026</p>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-2">
      <h3 className="font-semibold text-brand-heading">{title}</h3>
      <div className="space-y-2">{children}</div>
    </section>
  );
}

function PrivacyPolicy() {
  return (
    <div className="space-y-6">
      <PolicyTitle>Gizlilik Politikası</PolicyTitle>
      <Section title="Toplanan bilgiler">
        <p>Randevu formunda ad, soyad, telefon, e-posta, hizmet tercihi, tarih, görüşme biçimi ve isteğe bağlı not işlenir. Form alanları analitik sistemine gönderilmez.</p>
      </Section>
      <Section title="Kullanım amaçları">
        <p>Form verileri yalnızca randevu talebinin değerlendirilmesi, iletişim kurulması ve görüşme planlaması amaçlarıyla kullanılır. Ayrıntılı sağlık bilgisinin serbest metin alanına yazılmaması önerilir.</p>
      </Section>
      <Section title="Hizmet sağlayıcılar">
        <p>Form iletimi sunucu tarafında e-posta hizmeti Resend üzerinden gerçekleştirilir. Sanity yalnızca sitede yayımlanan editoryal içerik ve görseller için kullanılır; randevu formu Sanity&apos;ye kaydedilmez. Umami Cloud analitiği yalnızca analitik tercihi kabul edildiğinde çalışır ve form alanlarına erişmez.</p>
      </Section>
      <Section title="İletişim">
        <p>Gizlilik talepleri <strong>pskakintemiz@gmail.com</strong> veya <strong>+90 546 853 74 69</strong> üzerinden iletilebilir.</p>
      </Section>
      <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-950">Bu metin teknik işleyişi açıklar. Veri sorumlusunun tam tebligat adresi, saklama-imha süreleri ve aktarım hukuki sebebi yayın öncesinde hukuk uzmanı tarafından tamamlanmalıdır.</p>
    </div>
  );
}

function KvkkNotice() {
  return (
    <div className="space-y-6">
      <PolicyTitle>KVKK Aydınlatma Metni</PolicyTitle>
      <Section title="Veri sorumlusu ve kapsam">
        <p>6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu Klinik Psikolog Akın Temiz&apos;dir. Randevu formundaki bilgiler elektronik ortamda, doğrudan ilgili kişiden elde edilir.</p>
      </Section>
      <Section title="İşleme amaçları ve aktarım">
        <p>Kimlik ve iletişim verileri ile randevu tercihleri; talebin değerlendirilmesi, geri dönüş yapılması ve online görüşmenin planlanması amacıyla işlenir. Form iletimi Resend üzerinden gerçekleştirilir. Sanity randevu verisi almaz. Umami Cloud etkinleştirilirse yalnızca ayrı analitik tercihi sonrasında kişisel veya sağlık verisi içermeyen kullanım olayları sağlayıcıya gönderilir.</p>
      </Section>
      <Section title="Toplama yöntemi ve hukuki sebep">
        <p>Veriler elektronik randevu formu üzerinden doğrudan ilgili kişiden elde edilir. Somut veri kategorilerine uygulanacak KVKK hukuki sebepleri ve özellikle olası özel nitelikli veri işleme şartları, hizmetin gerçek işleyişi ve sözleşmeleriyle birlikte hukuk uzmanı tarafından kesinleştirilmelidir.</p>
      </Section>
      <Section title="İlgili kişi hakları">
        <p>KVKK&apos;nın 11. maddesi kapsamındaki bilgi alma, düzeltme, silme veya yok etme, yapılan işlemlerin aktarılan üçüncü kişilere bildirilmesini isteme ve kanundaki şartlarla itiraz ya da zarar giderimi talep etme hakları bulunur. Başvurular için kullanılan kanal <strong>pskakintemiz@gmail.com</strong> adresidir; resmî başvuru ve kimlik doğrulama usulü hukuk incelemesiyle tamamlanmalıdır.</p>
      </Section>
      <Section title="Hukuki inceleme gerektiren hususlar">
        <p>Sağlık verilerinin işlenme şartı, yurt dışı aktarım mekanizması, saklama ve imha süreleri, tebligat adresi ve başvuru usulü somut hizmet sözleşmeleriyle birlikte hukuk uzmanı tarafından doğrulanmalıdır. Bu taslak açık rıza yerine geçmez ve formun kullanılması metne onay verildiği anlamına gelmez.</p>
      </Section>
    </div>
  );
}

function CookiePolicy() {
  return (
    <div className="space-y-6">
      <PolicyTitle>Çerez ve Analitik Politikası</PolicyTitle>
      <Section title="Mevcut teknolojiler">
        <p>Site reklam çerezi kullanmaz. Analitik tercihini hatırlamak için tarayıcınızda <code>akintemiz-analytics-consent-v1</code> adlı localStorage kaydı tutulur. Bu kayıt yalnızca kabul veya ret tercihinizi içerir.</p>
      </Section>
      <Section title="Umami Cloud analitiği">
        <p>Onay verilirse Umami; sayfa görüntüleme, yönlendiren site, tarayıcı ve cihaz bilgileri, yaklaşık konum ve anonim etkileşim olaylarını ölçebilir. IP adresi standart analitik kaydında saklanmasa da konum üretimi, güvenlik ve operasyonel loglar için geçici olarak işlenebilir. URL sorguları ve hash değerleri gönderilmez; sayfa içindeki hash değişiklikleri yeni ziyaret sayılmaz.</p>
        <p>Ölçülen özel olaylar yalnızca randevu formu başarı durumu ile telefon, WhatsApp ve Instagram tıklamalarıdır. Form değerleri, sağlık bilgisi, e-posta, telefon veya kullanıcı kimliği event verisi yapılmaz.</p>
      </Section>
      <Section title="Yurt dışı aktarım ve saklama">
        <p>Umami Cloud ABD veya AB veri bölgesi sunar; CDN, güvenlik, destek ve operasyonel log süreçleri seçilen bölgenin dışında da gerçekleşebilir. Hobby planının güncel analitik saklama süresi Umami tarafından altı ay olarak açıklanmaktadır. Hesap bölgesi, sözleşme ve KVKK&apos;nın 9. maddesindeki aktarım mekanizması yayına almadan önce doğrulanmalıdır.</p>
      </Section>
      <Section title="Tercihinizi değiştirme">
        <button type="button" onClick={openPrivacyPreferences} className="rounded-xl border border-brand-border bg-brand-bg px-4 py-2.5 text-sm font-medium text-brand-heading hover:border-brand-hover">
          Analitik Tercihlerini Aç
        </button>
      </Section>
    </div>
  );
}
