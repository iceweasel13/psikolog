# Doğrulanması Gereken İçerikler

Bu dosyadaki değerler **örnektir**; üretim verisi olarak kullanılmamalıdır. Projede hâlihazırda doğrulanabilir şekilde bulunan ad, unvan, şehir, telefon, WhatsApp, Instagram, e-posta, çalışma alanları ve seans biçimleri korunmuştur.

## Yerel SEO ve kurum bilgileri

```text
CLINIC_DISTRICT = "[İlçe]"
CLINIC_FULL_ADDRESS = "[Mahalle, cadde/sokak, bina ve ilçe bilgisi]"
GOOGLE_BUSINESS_PROFILE_URL = "https://g.page/r/[profil-kodu]"
BUSINESS_OPENING_HOURS = "[Doğrulanmış gün ve saatler]"
```

Bu bilgiler doğrulanmadan `LocalBusiness`, tam `PostalAddress`, koordinat veya çalışma saatleri structured data alanlarına eklenmemelidir.

## Eğitim ve sertifika kartları

Her mevcut/yeni kayıt için uygun olan alanlar Sanity Studio'da doldurulabilir:

```text
EDUCATION_COMPLETION_YEAR = "[YYYY]"
EDUCATION_CATEGORY = "[Lisans / Yüksek Lisans / Psikoterapi Eğitimi / Sertifika]"
CERTIFICATE_URL = "https://[doğrulanabilir-belge-bağlantısı]"
```

Yıl bilgisi girilen kayıtlar sitede tarihe göre sıralanabilir. Mevcut dört eğitim kaydına doğrulanmamış yıl eklenmemiştir.

## Yayın öncesi teyit

```text
CANONICAL_DOMAIN = "https://akintemiz.com"
GOOGLE_SEARCH_CONSOLE_PROPERTY = "[Doğrulanmış Search Console mülkü]"
GOOGLE_SITE_VERIFICATION = "[Google Search Console HTML etiketi doğrulama kodu]"
```

Canonical domain mevcut proje yapılandırmasından alınmıştır; production alan adı farklıysa `NEXT_PUBLIC_SITE_URL` ile güncellenmelidir.

## Umami Analytics Cloud

Umami scripti bu bilgiler tanımlanana kadar yüklenmez ve analitik onay banner'ı gösterilmez:

```text
NEXT_PUBLIC_UMAMI_WEBSITE_ID = "[Umami Cloud Website ID]"
NEXT_PUBLIC_UMAMI_SCRIPT_URL = "https://cloud.umami.is/script.js"
UMAMI_DATA_REGION = "[EU veya US — hesap ayarından doğrulayın]"
```

Yayın öncesinde ayrıca:

- Umami Cloud hesabında mümkünse `EU` veri bölgesinin seçildiğini doğrulayın.
- Umami Data Processing Agreement ve güncel alt işleyen listesini saklayın.
- KVKK'nın 9. maddesi kapsamında uygulanacak yurt dışı aktarım mekanizmasını hukuk uzmanıyla belirleyin.
- Standart sözleşme kullanılacaksa doğru sözleşme tipi, imza ve Kuruma beş iş günü içinde bildirim gerekliliğini kontrol edin.
- Hobby planının güncel veri saklama süresini ve hesap bölgesini Umami panelinden teyit edin.

## Hukuki ve kurumsal bilgiler

Nihai Gizlilik/KVKK metinleri için aşağıdaki bilgiler hukuk uzmanı tarafından tamamlanmalıdır:

```text
DATA_CONTROLLER_NOTIFICATION_ADDRESS = "[Tebligata elverişli açık adres]"
DATA_RETENTION_PERIODS = "[Her veri kategorisi için doğrulanmış süre]"
DELETION_AND_DESTRUCTION_PROCESS = "[Silme/yok etme yöntemi ve periyodu]"
KVKK_APPLICATION_METHOD = "[Başvuru kanalı ve kimlik doğrulama yöntemi]"
INTERNATIONAL_TRANSFER_SAFEGUARD = "[Yeterlilik kararı / standart sözleşme / diğer uygun güvence]"
RESEND_DATA_REGION_AND_DPA = "[Sözleşme ve aktarım incelemesi sonucu]"
SANITY_DATA_REGION_AND_DPA = "[Sözleşme ve aktarım incelemesi sonucu]"
```

Siteye eklenen metinler teknik işleyişi açıklar; nihai hukuki görüş veya mevzuata uyum garantisi değildir.
