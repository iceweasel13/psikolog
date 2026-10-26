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
import { openLegalDialog } from "@/components/LegalModal";
import { ANALYTICS_EVENTS, trackAnalyticsEvent } from "@/lib/analytics";

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
  privacyNoticeAccepted: z.boolean().refine((value) => value, {
    message: "KVKK Aydınlatma Metni'ni okuduğunuzu onaylayınız.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  services: { _key: string; title: string }[];
}

export function ContactForm({ services }: ContactFormProps) {
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
      format: "Online",
      notes: "",
      privacyNoticeAccepted: false,
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
      trackAnalyticsEvent(ANALYTICS_EVENTS.appointmentSuccess);
      form.reset();
    } catch {
      alert("Mesaj iletilirken bir sorun oluştu. Lütfen doğrudan telefon veya WhatsApp ile iletişime geçin.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full bg-white/95 backdrop-blur-md p-6 sm:p-10 rounded-3xl border border-brand-border shadow-sm">
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
                    autoComplete="given-name"
                    placeholder="Adınız…"
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
                    autoComplete="family-name"
                    placeholder="Soyadınız…"
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
                    autoComplete="tel"
                    placeholder="05xx xxx xx xx…"
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
                    autoComplete="email"
                    spellCheck={false}
                    placeholder="ornek@mail.com…"
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
                    <SelectValue placeholder="Seçiniz…" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-brand-border text-brand-heading">
                    {services.map((service) => (
                      <SelectItem key={service._key} value={service.title}>
                        {service.title}
                      </SelectItem>
                    ))}
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
                      <SelectValue placeholder="Seçiniz…" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-brand-border text-brand-heading">
                      <SelectItem value="Online">Online</SelectItem>
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
                  placeholder="Yalnızca iletişim veya randevu tercihinizi yazın; ayrıntılı sağlık bilgisi paylaşmayın…"
                  className="bg-white border-brand-border text-brand-heading placeholder:text-brand-muted focus-visible:border-brand-hover focus-visible:ring-brand-hover/20 resize-none"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} className="text-red-600 text-xs" />
                )}
              </Field>
            )}
          />

          <Controller
            name="privacyNoticeAccepted"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <label htmlFor="privacyNoticeAccepted" className="flex cursor-pointer items-start gap-3 rounded-2xl border border-brand-border bg-brand-bg/50 p-4 text-xs leading-relaxed text-brand-body">
                  <input
                    id="privacyNoticeAccepted"
                    name={field.name}
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    aria-invalid={fieldState.invalid}
                    aria-describedby={fieldState.invalid ? "privacyNoticeAccepted-error" : undefined}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-brand-heading"
                  />
                  <span>
                    <button
                      type="button"
                      onClick={(event) => {
                        event.preventDefault();
                        openLegalDialog("kvkk");
                      }}
                      className="font-semibold text-brand-heading underline underline-offset-2 hover:text-brand-hover"
                    >
                      KVKK Aydınlatma Metni&apos;ni
                    </button>{" "}
                    okudum. Bu onay yalnızca aydınlatma metninin okunduğunu belirtir; pazarlama izni değildir.
                  </span>
                </label>
                {fieldState.invalid ? (
                  <FieldError id="privacyNoticeAccepted-error" errors={[fieldState.error]} className="text-xs text-red-600" />
                ) : null}
              </Field>
            )}
          />

          {/* Gönder Butonu */}
          <Button
            type="submit"
            disabled={loading}
            className="mt-4 w-full cursor-pointer rounded-2xl bg-brand-heading py-6 text-base font-semibold text-brand-bg shadow-sm transition-[background-color,box-shadow,transform] hover:bg-brand-heading/90"
          >
            {loading ? (
              "Gönderiliyor…"
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
