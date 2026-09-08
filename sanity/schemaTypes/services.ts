import { defineField, defineType } from "sanity";

export const servicesType = defineType({
  name: "services",
  title: "Hizmetler & Uzmanlık Alanları",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Üst Başlık (Tagline)",
      type: "string",
      initialValue: "Hizmetler",
    }),
    defineField({
      name: "heading",
      title: "Bölüm Başlığı",
      type: "string",
      initialValue: "Uzmanlık Alanları",
    }),
    defineField({
      name: "description",
      title: "Bölüm Açıklaması",
      type: "text",
      rows: 2,
      initialValue:
        "Her süreç, başlangıç değerlendirmesiyle bireyselleştirilmiş bir danışmanlık planına dayanır.",
    }),
    defineField({
      name: "items",
      title: "Hizmet Kartları",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "icon",
              title: "İkon / Emoji",
              type: "string",
              description: "Örn: 🌿, 🌱, 💻, 🤝",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Hizmet Başlığı",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Hizmet Açıklaması",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "duration",
              title: "Seans Süresi",
              type: "string",
              description: "Örn: 50 dk, 90 dk",
            }),
            defineField({
              name: "frequency",
              title: "Görüşme Sıklığı / Türü",
              type: "string",
              description: "Örn: Haftalık seans, Esnek program, Çocuk",
            }),
          ],
        },
      ],
    }),
  ],
});