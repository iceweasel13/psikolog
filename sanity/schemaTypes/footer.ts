import { defineField, defineType } from "sanity";

export const footerType = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({ name: "brandTitle", title: "Marka Başlığı", type: "string" }),
    defineField({ name: "brandDescription", title: "Marka Açıklaması", type: "text", rows: 3 }),
    defineField({ name: "availabilityText", title: "Durum Metni", type: "string" }),
    defineField({ name: "copyrightText", title: "Telif Metni", type: "string" }),
    defineField({ name: "services", title: "Eski Hizmet Bağlantıları", type: "array", hidden: true, of: [{ type: "object", fields: [defineField({ name: "label", title: "Başlık", type: "string" }), defineField({ name: "href", title: "Hedef", type: "string" })] }] }),
    defineField({ name: "infoLinks", title: "Eski Bilgi Bağlantıları", type: "array", hidden: true, of: [{ type: "object", fields: [defineField({ name: "label", title: "Başlık", type: "string" }), defineField({ name: "href", title: "Hedef", type: "string" })] }] }),
    defineField({ name: "locationText", title: "Eski Konum Metni", type: "string", hidden: true }),
    defineField({ name: "whatsappNumber", title: "Eski WhatsApp Numarası", type: "string", hidden: true }),
    defineField({ name: "whatsappDisplay", title: "Eski WhatsApp Metni", type: "string", hidden: true }),
    defineField({ name: "phoneRaw", title: "Eski Telefon Numarası", type: "string", hidden: true }),
    defineField({ name: "phoneDisplay", title: "Eski Telefon Metni", type: "string", hidden: true }),
    defineField({ name: "instagramHandle", title: "Eski Instagram Adı", type: "string", hidden: true }),
    defineField({ name: "email", title: "Eski E-posta", type: "string", hidden: true }),
    defineField({ name: "doktorTakvimiUrl", title: "Eski DoktorTakvimi Adresi", type: "url", hidden: true }),
  ],
});
