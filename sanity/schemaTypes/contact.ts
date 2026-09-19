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
      name: "locationTitle",
      title: "Yüz yüze Seans Başlığı",
      type: "string",
      initialValue: "Yüz yüze Seanslar",
    }),
    defineField({
      name: "locationDetails",
      title: "Yüz yüze Seans Detayı",
      type: "string",
      initialValue: "Klinik & Danışmanlık Merkezi · Samsun",
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
        "Tüm görüşmeler mesleki etik ilkeleri ve 6698 sayılı KVKK kapsamında gizlilik güvencesi altında yürütülmektedir.",
    }),
  ],
});