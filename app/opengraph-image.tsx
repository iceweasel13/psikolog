import { ImageResponse } from "next/og";

export const alt = "Klinik Psikolog Akın Temiz sosyal paylaşım görseli";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#FBF9F6",
          color: "#4A423B",
          display: "flex",
          height: "100%",
          justifyContent: "space-between",
          padding: "80px 96px",
          width: "100%",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 820 }}>
          <div style={{ color: "#8C7E70", fontSize: 28, letterSpacing: 4, textTransform: "uppercase" }}>
            Online Psikoterapi
          </div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.08, marginTop: 28 }}>
            Klinik Psikolog Akın Temiz
          </div>
          <div style={{ color: "#6F665E", fontSize: 30, marginTop: 30 }}>
            Çalışma alanları, online seans süreci ve iletişim bilgileri
          </div>
          <div style={{ color: "#8C7E70", fontSize: 22, marginTop: 42 }}>
            akintemiz.com
          </div>
        </div>
        <div style={{ alignItems: "center", background: "#E4DAD2", borderRadius: 56, display: "flex", fontSize: 180, height: 280, justifyContent: "center", width: 280 }}>
          Ψ
        </div>
      </div>
    ),
    size
  );
}
