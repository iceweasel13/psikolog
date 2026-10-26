const configuredSiteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.akintemiz.com";

export const SITE_URL = configuredSiteUrl.replace(/\/+$/, "");
export const HOME_URL = new URL("/", SITE_URL).toString();
export const OG_IMAGE_URL = new URL("/opengraph-image", SITE_URL).toString();

export const SITE_NAME = "Klinik Psikolog Akın Temiz";
export const SITE_DESCRIPTION =
  "Klinik Psikolog Akın Temiz hakkında bilgi edinin. Çalışma alanlarını, online seans sürecini ve iletişim bilgilerini inceleyin.";
