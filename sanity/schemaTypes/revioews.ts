import { defineField, defineType } from "sanity";

export const reviewsType = defineType({
  name: "reviews",
  title: "Danışan Yorumları",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Üst Başlık (Tagline)",
      type: "string",
      initialValue: "Danışan Görüşleri",
    }),
    defineField({
      name: "heading",
      title: "Bölüm Başlığı",
      type: "string",
      initialValue: "Danışanların Deneyimleri",
    }),
    defineField({
      name: "description",
      title: "Açıklama Metni",
      type: "text",
      rows: 2,
      initialValue:
        "Tüm görüşler gerçek danışanlara aittir. Gizlilik ilkesi gereği isimler paylaşılmamaktadır.",
    }),
    defineField({
      name: "rowOne",
      title: "1. Satır Yorumları (Sola Kayan Bant)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "category",
              title: "Terapi / Hizmet Türü",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "text",
              title: "Yorum Metni",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "rowTwo",
      title: "2. Satır Yorumları (Sağa Kayan Bant)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "category",
              title: "Terapi / Hizmet Türü",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "text",
              title: "Yorum Metni",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
        },
      ],
    }),
  ],
});