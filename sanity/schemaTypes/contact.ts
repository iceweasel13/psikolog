import { defineField, defineType } from "sanity";

export const contactType = defineType({
  name: "contact",
  title: "Randevu & İletişim Alanı",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Üst Başlık (Tagline)",
      type: "string",
      initialValue: "Randevu & İletişim",
    }),
    defineField({
      name: "heading",
      title: "Ana Başlık",
      type: "string",
      initialValue: "Görüşme Talep Edin",
    }),
    defineField({
      name: "description",
      title: "Açıklama Metni",
      type: "text",
      rows: 2,
      initialValue:
        "İlk tanışma görüşmesi ücretsizdir (20 dk). Size en uygun gün ve seans formatını birlikte belirleyelim.",
    }),
    defineField({
      name: "onlineTitle",
      title: "Online Seans Başlığı",
      type: "string",
      initialValue: "Online Danışmanlık",
    }),
    defineField({
      name: "onlineDetails",
      title: "Online Seans Detayı",
      type: "string",
      initialValue: "Doktortakvimi.com · Google Meet · Zoom",
    }),
    defineField({
      name: "workingHoursTitle",
      title: "Çalışma Saatleri Başlığı",
      type: "string",
      initialValue: "Çalışma Saatleri",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "workingHours",
      title: "Çalışma Saatleri",
      type: "array",
      validation: (rule) => rule.required().min(1),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "day", title: "Gün", type: "string", validation: (rule) => rule.required() }),
            defineField({ name: "hours", title: "Saat", type: "string", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "day", subtitle: "hours" } },
        },
      ],
      initialValue: [
        { _key: "monday", day: "Pazartesi", hours: "09.00–18.00" },
        { _key: "tuesday", day: "Salı", hours: "09.00–18.00" },
        { _key: "wednesday", day: "Çarşamba", hours: "09.00–18.00" },
        { _key: "thursday", day: "Perşembe", hours: "09.00–18.00" },
        { _key: "friday", day: "Cuma", hours: "09.00–18.00" },
        { _key: "saturday", day: "Cumartesi", hours: "09.00–18.00" },
        { _key: "sunday", day: "Pazar", hours: "Kapalı" },
      ],
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Numarası (wa.me için)",
      type: "string",
      description: "Başında + olmadan, örn: 905316534561",
      initialValue: "905316534561",
    }),
    defineField({
      name: "whatsappDisplay",
      title: "WhatsApp Görünen Metin",
      type: "string",
      initialValue: "+90 546 853 74 69 · Hızlı mesaj gönderin",
    }),
    defineField({
      name: "phoneRaw",
      title: "Telefon Arama Numarası (tel: için)",
      type: "string",
      initialValue: "+90 546 853 74 69",
    }),
    defineField({
      name: "phoneDisplay",
      title: "Telefon Görünen Metin",
      type: "string",
      initialValue: "+90 546 853 74 69 · Randevu ve danışma",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram Kullanıcı Adı",
      type: "string",
      initialValue: "psk.akintemiz",
    }),
    defineField({
      name: "email",
      title: "E-posta Adresi",
      type: "string",
      initialValue: "psk.akintemiz@gmail.com",
    }),
    defineField({
      name: "kvkkText",
      title: "KVKK & Etik Bilgilendirme Metni",
      type: "text",
      rows: 2,
      initialValue:
        "Randevu formunda yalnızca geri dönüş için gerekli bilgileri paylaşın; ayrıntılı sağlık bilgisi yazmayın. Veri işleme ayrıntıları KVKK Aydınlatma Metni'nde açıklanır.",
    }),
  ],
});
