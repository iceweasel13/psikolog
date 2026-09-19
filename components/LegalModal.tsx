"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { X, ShieldCheck, FileText } from "lucide-react";

type LegalTab = "gizlilik" | "kvkk";

const emptySubscribe = () => () => {};

export function LegalLinks() {
  const [activeTab, setActiveTab] = useState<LegalTab | null>(null);

  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  useEffect(() => {
    if (!activeTab) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveTab(null);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeTab]);

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={() => setActiveTab("gizlilik")}
          className="hover:text-stone-200 transition-colors cursor-pointer"
        >
          Gizlilik Politikası
        </button>
        <span>·</span>
        <button
          type="button"
          onClick={() => setActiveTab("kvkk")}
          className="hover:text-stone-200 transition-colors cursor-pointer"
        >
          KVKK Aydınlatma Metni
        </button>
      </div>

      {activeTab && isMounted && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActiveTab(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-brand-heading/60 p-4 backdrop-blur-xs animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[85vh] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-brand-border bg-white shadow-2xl"
          >
            {/* Üst Bar & Sekmeler */}
            <div className="flex items-center justify-between border-b border-brand-border/60 px-6 py-4 bg-brand-bg/40">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab("gizlilik")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    activeTab === "gizlilik"
                      ? "bg-brand-heading text-white shadow-xs"
                      : "text-brand-heading hover:bg-brand-primary/40"
                  }`}
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Gizlilik Politikası</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("kvkk")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    activeTab === "kvkk"
                      ? "bg-brand-heading text-white shadow-xs"
                      : "text-brand-heading hover:bg-brand-primary/40"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>KVKK Aydınlatma Metni</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab(null)}
                className="rounded-full p-1.5 text-brand-muted hover:bg-brand-bg hover:text-brand-heading transition-colors cursor-pointer"
                aria-label="Kapat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Metin İçeriği */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6 text-sm text-brand-body leading-relaxed">
              {activeTab === "gizlilik" ? (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-brand-heading mb-1">
                      Gizlilik Politikası
                    </h3>
                    <p className="text-xs text-brand-muted">
                      Son güncellenme: 2026 · Klinik Psikolog Akın Temiz
                    </p>
                  </div>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-brand-heading text-sm">1. Veri Sorumlusu</h4>
                    <p>
                      Bu web sitesi (<strong>akintemiz.com</strong>) üzerinden paylaşılan kişisel veriler, Klinik Psikolog Akın Temiz tarafından veri sorumlusu sıfatıyla korunmakta ve işlenmektedir.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-brand-heading text-sm">2. Toplanan Kişisel Veriler</h4>
                    <p>
                      Randevu talebi ve iletişim formu üzerinden tarafımıza iletilen; ad, soyad, telefon numarası, e-posta adresi, talep edilen hizmet türü ve isteğe bağlı iletilen ön başvuru notları toplanmaktadır.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-brand-heading text-sm">3. Verilerin Kullanım Amacı</h4>
                    <p>
                      Toplanan veriler yalnızca randevu talebinin değerlendirilmesi, uygun seans takviminin belirlenmesi ve danışan ile doğrudan iletişim kurulması amacıyla sınırlı olarak kullanılır.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-brand-heading text-sm">4. Terapötik Gizlilik ve Meslek Etiği</h4>
                    <p>
                      Psikolojik danışmanlık ve psikoterapi süreçlerinde paylaşılan tüm bilgiler, Türk Psikologlar Derneği Etik Yönetmeliği ve mesleki sır saklama ilkeleri gereğince mutlak bir gizlilik esasıyla muhafaza edilir.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-brand-heading text-sm">5. Üçüncü Taraflarla Paylaşım</h4>
                    <p>
                      Kişisel verileriniz hiçbir koşulda ticari, reklam veya pazarlama amacıyla üçüncü şahıslara satılmaz veya devredilmez. Yasal mevzuat gereği adli veya resmi makamlarca talep edilmesi hali istisnadır.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-brand-heading text-sm">6. İletişim</h4>
                    <p>
                      Gizlilik politikamıza ilişkin tüm soru ve taleplerinizi <strong>info@akintemiz.com</strong> adresi veya <strong>+90 546 853 74 69</strong> numaralı iletişim hattı üzerinden iletebilirsiniz.
                    </p>
                  </section>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-brand-heading mb-1">
                      KVKK Aydınlatma Metni
                    </h3>
                    <p className="text-xs text-brand-muted">
                      6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında
                    </p>
                  </div>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-brand-heading text-sm">1. Veri Sorumlusunun Kimliği</h4>
                    <p>
                      6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;) uyarınca, veri sorumlusu sıfatıyla Klinik Psikolog Akın Temiz (Samsun) olarak kişisel verilerinizi kanuna uygun şekilde işlemekteyiz.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-brand-heading text-sm">2. İşlenen Kişisel Veriler ve Toplama Yöntemi</h4>
                    <p>
                      Web sitemizde yer alan randevu formu vasıtasıyla elektronik ortamda toplanan veriler şunlardır:
                    </p>
                    <ul className="list-disc list-inside space-y-1 pl-2 text-xs sm:text-sm text-brand-heading/90">
                      <li><strong>Kimlik Verisi:</strong> Ad, Soyad</li>
                      <li><strong>İletişim Verisi:</strong> Telefon Numarası, E-posta Adresi</li>
                      <li><strong>Talep Detayı:</strong> Hizmet Alanı Tercihi, Seans Formatı (Yüz yüze / Online) ve Danışan Notu</li>
                    </ul>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-brand-heading text-sm">3. Kişisel Veri İşleme Amaçları ve Hukuki Sebepleri</h4>
                    <p>
                      Kişisel verileriniz, KVKK&apos;nın 5/2-c maddesinde düzenlenen &quot;bir sözleşmenin kurulması veya ifasıyla doğrudan doğruya ilgili olması&quot; ve 5/2-f maddesinde yer alan &quot;meşru menfaat&quot; hukuki gerekçelerine dayanılarak; randevu planlaması, danışan iletişimi ve hizmet kalitesinin temini amacıyla işlenir.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-brand-heading text-sm">4. Verilerin Aktarılması</h4>
                    <p>
                      Kişisel verileriniz üçüncü kişi ya da kuruluşlara ticari amaçla aktarılmaz. Yalnızca yasal zorunluluk doğması durumunda yetkili adli ve idari mercilerle paylaşılabilir.
                    </p>
                  </section>

                  <section className="space-y-2">
                    <h4 className="font-semibold text-brand-heading text-sm">5. İlgili Kişinin Hakları (KVKK Madde 11)</h4>
                    <p>
                      KVKK&apos;nın 11. maddesi uyarınca her danışan; kişisel verilerinin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, eksik ya da yanlış işlenmiş verilerin düzeltilmesini isteme ve verilerin silinmesini talep etme haklarına sahiptir.
                    </p>
                    <p>
                      Bu kapsamdaki başvurularınızı <strong>info@akintemiz.com</strong> adresine yazılı olarak iletebilirsiniz. Başvurularınız en geç 30 gün içinde yanıtlanacaktır.
                    </p>
                  </section>
                </div>
              )}
            </div>

            {/* Alt Kapat Butonu */}
            <div className="flex justify-end border-t border-brand-border/60 px-6 py-4 bg-brand-bg/40">
              <button
                type="button"
                onClick={() => setActiveTab(null)}
                className="px-5 py-2 rounded-xl bg-brand-heading text-white text-xs font-medium hover:bg-brand-heading/90 transition-colors cursor-pointer"
              >
                Kapat
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
