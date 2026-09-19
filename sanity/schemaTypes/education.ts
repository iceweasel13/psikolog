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
      name: "timeline",
      title: "Zaman Çizelgesi Öğeleri",
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
              name: "certificateImage",
              title: "Sertifika / Belge Görseli (İsteğe Bağlı)",
              type: "image",
              description: "Yüklendiğinde kartta 'Belgeyi Görüntüle' butonu açılır.",
              options: {
                hotspot: true,
              },
            }),
            defineField({
              name: "side",
              title: "Masaüstü Konumu",
              type: "string",
              options: {
                list: [
                  { title: "Sol", value: "left" },
                  { title: "Sağ", value: "right" },
                ],
                layout: "radio",
              },
              initialValue: "left",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "skillsTagline",
      title: "Teknik Bölüm Üst Başlığı",
      type: "string",
      initialValue: "Teknik Yeterlilikler",
    }),
    defineField({
      name: "skillsHeading",
      title: "Teknik Bölüm Başlığı",
      type: "string",
      initialValue: "Araştırma & Analiz Araçları",
    }),
    defineField({
      name: "skillsDescription",
      title: "Teknik Bölüm Açıklaması",
      type: "text",
      rows: 2,
      initialValue:
        "Nicel araştırma, veri analizi ve psikolojik ölçüm süreçlerinde kullanılan araçlarda uygulama yetkinliği.",
    }),
    defineField({
      name: "technicalSkills",
      title: "Kullanılan Araçlar",
      type: "array",
      of: [{ type: "string" }],
    }),
  ],
});