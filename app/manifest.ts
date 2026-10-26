import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Klinik Psikolog Akın Temiz",
    short_name: "Akın Temiz",
    description: "Klinik Psikolog Akın Temiz'in resmî web sitesi.",
    start_url: "/",
    display: "standalone",
    background_color: "#FBF9F6",
    theme_color: "#4A423B",
    lang: "tr",
    icons: [
      { src: "/favicon/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/favicon/android-chrome-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
