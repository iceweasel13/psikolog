import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "hero",
  title: "Hero Alanı",
  type: "document",
  fields: [
    defineField({
      name: "badgeText",
      title: "Üst Rozet Metni",
      type: "string",
      initialValue: "Psikolog · Samsun & Online",
    }),
    defineField({
      name: "titleMain",
      title: "Ana Başlık (İlk Kısım)",
      type: "string",
      description: "Örn: Psikolojik dayanıklılık ve zihinsel bütünlük için",
      initialValue: "Psikolojik dayanıklılık ve zihinsel bütünlük için",
    }),
    defineField({
      name: "titleHighlight",
      title: "Vurgulanan Başlık (İtalik Kısım)",
      type: "string",
      description: "Örn: profesyonel destek.",
      initialValue: "profesyonel destek.",
    }),
    defineField({
      name: "description",
      title: "Açıklama Metni",
      type: "text",
      rows: 3,
      initialValue:
        "Kaygı, tükenmişlik, ilişki sorunları ve daha fazlası için güvenli ve yargısız bir alanda profesyonel destek sunuyorum.",
    }),
    defineField({
      name: "quote",
      title: "Alıntı (Quote) Metni",
      type: "text",
      rows: 4,
      initialValue:
        "Bilkent Üniversitesi Psikoloji bölümünden Onur Öğrencisi olarak mezun oldum. Bilişsel Davranışçı Terapi temelinde, bilimsel ve kişiye özel bir süreç yürütüyoruz — yüz yüze Samsun'da, online Türkiye'nin her yerinden. İlk adımı atmak çoğu zaman en zor kısımdır; bu yüzden ilk tanışma görüşmemiz ücretsiz.",
    }),
    defineField({
      name: "ctaPrimaryText",
      title: "Birincil Buton Metni",
      type: "string",
      initialValue: "Randevu Talep Et",
    }),
    defineField({
      name: "ctaPrimaryLink",
      title: "Birincil Buton Linki",
      type: "string",
      initialValue: "#randevu",
    }),
    defineField({
      name: "ctaSecondaryText",
      title: "İkincil Buton Metni",
      type: "string",
      initialValue: "Özgeçmiş & Yöntemler",
    }),
    defineField({
      name: "ctaSecondaryLink",
      title: "İkincil Buton Linki",
      type: "string",
      initialValue: "#hakkimda",
    }),
    defineField({
      name: "stats",
      title: "Nitelik / İstatistik Kartları (3'lü)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Başlık", type: "string" }),
            defineField({ name: "subtitle", title: "Alt Açıklama", type: "string" }),
          ],
        },
      ],
      initialValue: [
        { title: "Yüz yüze & Online", subtitle: "Çalışma Biçimi" },
        { title: "BDT Temelli", subtitle: "Klinik Yaklaşım" },
        { title: "Bilkent Psikoloji", subtitle: "Onur Öğrencisi" },
      ],
    }),
    defineField({
      name: "portraitImage",
      title: "Psikolog Fotoğrafı",
      type: "image",
      options: {
        hotspot: true, // Akın yüzünü ortalayabilsin
      },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternatif Metin (SEO)",
          initialValue: "Psk. Akın Temiz",
        }),
      ],
    }),
    defineField({
      name: "trustBadgeTitle",
      title: "Güven Rozeti Başlığı",
      type: "string",
      initialValue: "Türk Psikologlar Derneği",
    }),
    defineField({
      name: "trustBadgeSubtitle",
      title: "Güven Rozeti Alt Başlığı",
      type: "string",
      initialValue: "Akredite Klinik Uygulayıcı",
    }),
  ],
});