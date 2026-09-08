// sanity/schemaTypes/navbar.ts
import { defineField, defineType } from "sanity";

export const navbarType = defineType({
  name: "navbar",
  title: "Navigasyon (Menü)",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Psikolog / Klinik Adı",
      type: "string",
      description: "Sol üstteki ana başlık",
      initialValue: "Psk. Akin Temiz",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Alt Unvan",
      type: "string",
      description: "Başlığın altındaki küçük açıklama",
      initialValue: "Klinik Psikolog",
    }),
    defineField({
      name: "navItems",
      title: "Menü Linkleri",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Link Başlığı",
              type: "string",
              description: "Örn: Hakkımda, Hizmetler",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Hedef Link",
              type: "string",
              description: "Örn: #hakkimda veya /blog",
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "ctaButtonText",
      title: "Randevu Butonu Metni",
      type: "string",
      initialValue: "Randevu Al",
    }),
    defineField({
      name: "ctaButtonLink",
      title: "Randevu Butonu Linki",
      type: "string",
      initialValue: "#randevu",
    }),
  ],
});