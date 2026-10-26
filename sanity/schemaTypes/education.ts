import { defineField, defineType } from "sanity";

export const educationType = defineType({
  name: "education",
  title: "Eğitim & Sertifikalar",
  type: "document",
  fields: [
    defineField({
      name: "tagline",
      title: "Üst Başlık (Tagline)",
      type: "string",
      initialValue: "Eğitim & Sertifikalar",
    }),
    defineField({
      name: "heading",
      title: "Bölüm Başlığı",
      type: "string",
      initialValue: "Akademik ve Mesleki Yeterlilik",
    }),
    defineField({
      name: "description",
      title: "Bölüm Açıklaması",
      type: "text",
      rows: 3,
      initialValue:
        "Mesleki gelişimi sürekli eğitim, sertifika programları ve klinik deneyimle sürdürmekteyim. Her düğüm, bu yolculuğun bir sinapsı.",
    }),
    defineField({
      name: "skillsTagline",
      title: "Yetkinlikler Üst Başlığı",
      type: "string",
    }),
    defineField({
      name: "skillsHeading",
      title: "Yetkinlikler Başlığı",
      type: "string",
    }),
    defineField({
      name: "skillsDescription",
      title: "Yetkinlikler Açıklaması",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "timeline",
      title: "Eğitim ve Sertifika Kartları",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "badge",
              title: "Etiket / Tür",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "title",
              title: "Eğitim / Sertifika Adı",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "institution",
              title: "Kurum / Organizasyon",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "desc",
              title: "Açıklama",
              type: "text",
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "year",
              title: "Tamamlanma Yılı (İsteğe Bağlı)",
              type: "number",
              validation: (Rule) => Rule.integer().min(1900).max(2100),
            }),
            defineField({
              name: "category",
              title: "Kategori (İsteğe Bağlı)",
              type: "string",
            }),
            defineField({
              name: "side",
              title: "Kart Yerleşimi (Eski Tasarım)",
              type: "string",
              options: {
                list: [
                  { title: "Sol", value: "left" },
                  { title: "Sağ", value: "right" },
                ],
              },
              description: "Mevcut grid tasarımında kullanılmaz; eski içeriğin korunması için tutulur.",
            }),
            defineField({
              name: "certificateUrl",
              title: "Sertifika Bağlantısı (İsteğe Bağlı)",
              type: "url",
            }),
            defineField({
              name: "certificateImage",
              title: "Sertifika / Belge Görseli (İsteğe Bağlı)",
              type: "image",
              description: "Yüklendiğinde kartta 'Belgeyi Görüntüle' butonu açılır.",
              options: {
                hotspot: true,
              },
            }),
          ],
        },
      ],
    }),
  ],
});
