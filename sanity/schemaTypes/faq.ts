import { defineArrayMember, defineField, defineType } from "sanity";

export const faqType = defineType({
  name: "faq",
  title: "Sıkça Sorulan Sorular",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Üst Başlık",
      type: "string",
      initialValue: "Merak Edilenler",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "heading",
      title: "Bölüm Başlığı",
      type: "string",
      initialValue: "Sıkça Sorulan Sorular",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Sorular ve Cevaplar",
      type: "array",
      validation: (Rule) => Rule.min(1).required(),
      of: [
        defineArrayMember({
          name: "faqItem",
          title: "Soru",
          type: "object",
          fields: [
            defineField({
              name: "question",
              title: "Soru",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "answer",
              title: "Cevap",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "question", subtitle: "answer" },
          },
        }),
      ],
    }),
  ],
});
