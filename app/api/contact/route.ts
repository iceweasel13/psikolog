import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      phone,
      email,
      service,
      date,
      format,
      notes,
    } = body;

    const toEmail = process.env.CONTACT_RECEIVER_EMAIL;
    const fromEmail = process.env.CONTACT_FROM_EMAIL || "Akın Temiz Web <onboarding@resend.dev>";

    if (!toEmail) {
      console.error("CONTACT_RECEIVER_EMAIL ortam değişkeni tanımlı değil.");
      return NextResponse.json(
        { error: "Sunucu e-posta yapılandırması eksik." },
        { status: 500 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email,
      subject: `Yeni Randevu Talebi: ${firstName} ${lastName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 12px; color: #1f2937;">
          <h2 style="color: #111827; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">Yeni Danışan Randevu Talebi</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; width: 140px;">Danışan:</td>
              <td style="padding: 8px 0;">${firstName} ${lastName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Telefon:</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">E-posta:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Hizmet Türü:</td>
              <td style="padding: 8px 0;">${service}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Tercih Edilen Tarih:</td>
              <td style="padding: 8px 0;">${date}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold;">Seans Formatı:</td>
              <td style="padding: 8px 0;">${format === "yuz-yuze" ? "Yüz yüze (Samsun)" : "Online"}</td>
            </tr>
          </table>

          ${
            notes
              ? `
            <div style="margin-top: 20px; padding: 12px; background-color: #f9fafb; border-radius: 8px;">
              <p style="margin: 0; font-weight: bold; font-size: 13px; color: #4b5563;">Danışan Notu:</p>
              <p style="margin: 5px 0 0 0; font-size: 14px;">${notes}</p>
            </div>
          `
              : ""
          }

          <p style="margin-top: 25px; font-size: 12px; color: #9ca3af; text-align: center;">
            Bu e-posta Akın Temiz web sitesindeki randevu formundan otomatik olarak iletilmiştir.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[Resend Hatası]:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (err) {
    console.error("API Route Hatası:", err);
    return NextResponse.json(
      { error: "Mail iletimi sırasında bir hata oluştu." },
      { status: 500 }
    );
  }
}