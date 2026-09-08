import { defineField, defineType } from "sanity";

export const aboutType = defineType({
  name: "about",
  title: "Hakkımda Alanı",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Üst Küçük Başlık",
      type: "string",
      initialValue: "Özgeçmiş & Klinik Yaklaşım",
    }),
    defineField({
      name: "heading",
      title: "Ana Başlık",
      type: "string",
      initialValue: "Hakkımda",
    }),
    defineField({
      name: "aboutImage",
      title: "Hakkımda Fotoğrafı",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Görsel Açıklaması (SEO)",
          initialValue: "Psk. Akın Temiz - Klinik Psikolog",
        }),
      ],
    }),
    defineField({
      name: "quote",
      title: "Vurgu Cümlesi",
      type: "string",
      initialValue: "Her bireyin iyileşme yolculuğu kendine has ve değerlidir.",
    }),
    defineField({
      name: "bioParagraph1",
      title: "Biyografi (1. Paragraf)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "bioParagraph2",
      title: "Biyografi (2. Paragraf - Yaklaşım & Etik)",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "highlightCards",
      title: "Eğitim / Rozet Kartları (2'li Grid)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "badge", title: "Büyük Başlık / Kısaltma", type: "string" }),
            defineField({ name: "title", title: "Başlık", type: "string" }),
            defineField({ name: "subtitle", title: "Alt Açıklama", type: "string" }),
          ],
        },
      ],
    }),
  ],
});