# Production Kontrol Listesi

Site içeriği ve teknik yapı 26 Ekim 2026 tarihinde aşağıdaki doğrulanmış bilgilerle güncellenmiştir.

## Tamamlananlar

- [x] Google Search Console'daki `sitemap.xml` sorunu çözüldü. Çalışan sitemap yapılandırması bu güncellemede değiştirilmedi.
- [x] Canonical domain `https://www.akintemiz.com` olarak ayarlandı.
- [x] Google Search Console mülkü kullanıcı tarafından `sc-domain.com` olarak bildirildi. Mevcut doğrulama yöntemine ve çalışan Search Console yapılandırmasına dokunulmadı.
- [x] Hizmet bilgileri “Klinik Psikolog Akın Temiz” ve yalnızca “Online seans” olarak güncellendi. Fiziksel klinik, harita ve Google Business Profile bilgisi kullanılmıyor.
- [x] Pazartesi–Cumartesi `09.00–18.00`, Pazar `Kapalı` çalışma saatleri Sanity Studio üzerinden yönetilecek şekilde iletişim alanına eklendi.
- [x] Sanity Studio'daki mevcut dört eğitim kaydı korundu. Yıl, kategori ve sertifika bağlantısı alanları boşken arayüz çalışır; doğrulanmamış bilgi eklenmedi.
- [x] Randevu formu başarı olayı ile telefon, WhatsApp ve Instagram tıklamaları kişisel veri içermeyen Umami event'leri olarak tanımlandı.
- [x] Umami, analitik tercihi kabul edilmeden yüklenmez. Ret ve tercih değiştirme akışı aktiftir.
- [x] KVKK Aydınlatma Metni, Gizlilik Politikası ve Çerez Politikası gerçek Resend, Sanity ve Umami akışlarına göre taslak olarak güncellendi.

## Eksik environment variable

```text
NEXT_PUBLIC_UMAMI_WEBSITE_ID = "[Umami Cloud hesabındaki gerçek Website ID]"
```

`NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js` hazırdır. Website ID tanımlanana kadar Umami scripti yüklenmez ve gereksiz analitik onay banner'ı gösterilmez.

## Nihai hukuki kontrol listesi

Aşağıdaki bilgiler teknik yayını engellemez; metinlerin nihai hukuk incelemesinde somut hizmet ve sağlayıcı sözleşmelerine göre tamamlanmalıdır:

```text
DATA_CONTROLLER_NOTIFICATION_ADDRESS = "[Tebligata elverişli açık adres]"
DATA_RETENTION_PERIODS = "[Her veri kategorisi için doğrulanmış saklama süresi]"
DELETION_AND_DESTRUCTION_PROCESS = "[Silme, yok etme ve periyodik imha yöntemi]"
KVKK_APPLICATION_METHOD = "[Başvuru kanalı, usulü ve kimlik doğrulama yöntemi]"
FORM_DATA_LEGAL_BASIS = "[Her veri kategorisi için uygulanacak KVKK hukuki sebebi]"
INTERNATIONAL_TRANSFER_SAFEGUARD = "[KVKK m.9 kapsamındaki uygun güvence veya diğer mekanizma]"
RESEND_DPA_AND_SUBPROCESSORS = "[Hesap/sözleşme ve güncel alt işleyen incelemesi]"
SANITY_DPA_AND_SUBPROCESSORS = "[Hesap/sözleşme ve güncel alt işleyen incelemesi]"
UMAMI_ACCOUNT_REGION_AND_DPA = "[Hesap bölgesi, sözleşme ve alt işleyen incelemesi]"
```

Sitedeki metinler teknik veri akışlarını açıklayan taslaklardır; hukuki görüş veya mevzuata uyum garantisi değildir.
