"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, CheckCircle2 } from "lucide-react";

import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const contactFormSchema = z.object({
  firstName: z.string().min(2, "Ad en az 2 karakter olmalıdır."),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalıdır."),
  phone: z
    .string()
    .min(10, "Geçerli bir telefon numarası giriniz.")
    .max(15, "Telefon numarası çok uzun."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
  service: z.string().min(1, "Lütfen bir hizmet türü seçiniz."),
  date: z.string().min(1, "Lütfen tercih ettiğiniz tarihi seçiniz."),
  format: z.string().min(1, "Lütfen seans formatını seçiniz."),
  notes: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      service: "",
      date: "",
      format: "",
      notes: "",
    },
    mode: "onTouched",
  });

 const onSubmit = async (values: ContactFormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error("Gönderim başarısız");
      }

      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Form iletim hatası:", error);
      alert("Mesaj iletilirken bir sorun oluştu. Lütfen doğrudan telefon veya WhatsApp ile iletişime geçin.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="lg:col-span-7 bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-brand-border shadow-sm">
      <h3 className="text-2xl font-serif font-bold text-brand-heading mb-6">
        Randevu Formu
      </h3>

      {isSubmitted ? (
        <div className="py-12 text-center space-y-4">
          <CheckCircle2 className="w-12 h-12 text-emerald-700 mx-auto" />
          <h4 className="text-xl font-serif font-bold text-brand-heading">
            Talebiniz Alındı
          </h4>
          <p className="text-sm text-brand-body max-w-md mx-auto">
            En kısa sürede tercih ettiğiniz iletişim kanalı üzerinden uygun seans aralıkları için sizinle iletişime geçilecektir.
          </p>
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsSubmitted(false)}
            className="mt-4 border-brand-border text-brand-heading bg-brand-bg hover:bg-brand-primary"
          >
            Yeni Form Doldur
          </Button>
        </div>
      ) : (
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Ad & Soyad */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="firstName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-xs font-medium text-brand-heading">
                    Ad
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Adınız"
                    aria-invalid={fieldState.invalid}
                    className="bg-white border-brand-border text-brand-heading placeholder:text-brand-muted focus-visible:border-brand-hover focus-visible:ring-brand-hover/20"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-red-600 text-xs" />
                  )}
                </Field>
              )}
            />

            <Controller
              name="lastName"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-xs font-medium text-brand-heading">
                    Soyad
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Soyadınız"
                    aria-invalid={fieldState.invalid}
                    className="bg-white border-brand-border text-brand-heading placeholder:text-brand-muted focus-visible:border-brand-hover focus-visible:ring-brand-hover/20"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-red-600 text-xs" />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Telefon & E-posta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="phone"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-xs font-medium text-brand-heading">
                    Telefon
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="tel"
                    placeholder="05xx xxx xx xx"
                    aria-invalid={fieldState.invalid}
                    className="bg-white border-brand-border text-brand-heading placeholder:text-brand-muted focus-visible:border-brand-hover focus-visible:ring-brand-hover/20"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-red-600 text-xs" />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-xs font-medium text-brand-heading">
                    E-posta
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="ornek@mail.com"
                    aria-invalid={fieldState.invalid}
                    className="bg-white border-brand-border text-brand-heading placeholder:text-brand-muted focus-visible:border-brand-hover focus-visible:ring-brand-hover/20"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-red-600 text-xs" />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Hizmet Türü */}
          <Controller
            name="service"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="service-select" className="text-xs font-medium text-brand-heading">
                  Hizmet Türü
                </FieldLabel>
                <Select
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger
                    id="service-select"
                    aria-invalid={fieldState.invalid}
                    className="bg-white border-brand-border text-brand-heading focus:border-brand-hover focus:ring-brand-hover/20"
                  >
                    <SelectValue placeholder="Seçiniz..." />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-brand-border text-brand-heading">
                    <SelectItem value="tanisma">İlk Tanışma Görüşmesi (Ücretsiz)</SelectItem>
                    <SelectItem value="bireysel">Bireysel Terapi</SelectItem>
                    <SelectItem value="ergen">Ergen Terapisi</SelectItem>
                    <SelectItem value="online">Online Terapi</SelectItem>
                    <SelectItem value="cinsel">Cinsel Terapi</SelectItem>
                    <SelectItem value="mindfulness">Mindfulness Uygulamaları</SelectItem>
                    <SelectItem value="cift">Çift Terapisi</SelectItem>
                    <SelectItem value="oyun">Oyun Terapisi</SelectItem>
                  </SelectContent>
                </Select>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-red-600 text-xs" />
                )}
              </Field>
            )}
          />

          {/* Tarih & Seans Formatı */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Controller
              name="date"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name} className="text-xs font-medium text-brand-heading">
                    Tercih Edilen Tarih
                  </FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    type="date"
                    aria-invalid={fieldState.invalid}
                    className="bg-white border-brand-border text-brand-heading focus-visible:border-brand-hover focus-visible:ring-brand-hover/20"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-red-600 text-xs" />
                  )}
                </Field>
              )}
            />

            <Controller
              name="format"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="format-select" className="text-xs font-medium text-brand-heading">
                    Seans Formatı
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="format-select"
                      aria-invalid={fieldState.invalid}
                      className="bg-white border-brand-border text-brand-heading focus:border-brand-hover focus:ring-brand-hover/20"
                    >
                      <SelectValue placeholder="Seçiniz..." />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-brand-border text-brand-heading">
                      <SelectItem value="yuz-yuze">Yüz yüze (Samsun)</SelectItem>
                      <SelectItem value="online">Online (Doktortakvimi.com / Meet)</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} className="text-red-600 text-xs" />
                  )}
                </Field>
              )}
            />
          </div>

          {/* Başvuru Notu */}
          <Controller
            name="notes"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name} className="text-xs font-medium text-brand-heading">
                  Başvuru Notunuz (İsteğe Bağlı)
                </FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  rows={3}
                  aria-invalid={fieldState.invalid}
                  placeholder="Görüşmek istediğiniz konu veya sormak istediğiniz sorular..."
                  className="bg-white border-brand-border text-brand-heading placeholder:text-brand-muted focus-visible:border-brand-hover focus-visible:ring-brand-hover/20 resize-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-red-600 text-xs" />
                )}
              </Field>
            )}
          />

          {/* Gönder Butonu */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-6 mt-4 bg-brand-heading hover:bg-brand-heading/90 text-brand-bg font-semibold text-base rounded-2xl shadow-sm transition-all cursor-pointer"
          >
            {loading ? (
              "Gönderiliyor..."
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Randevu Talebini Gönder
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}