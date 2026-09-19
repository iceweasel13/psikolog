"use client";

import { useEffect } from "react";

interface TabTitleProps {
  activeTitle?: string;
  awayTitle?: string;
  speed?: number;
}

export function MarqueeTitle({
  activeTitle = "Psk. Akın Temiz | Klinik Psikolog",
  awayTitle = "Buradayız • Randevu ve Bilgi Alın • Psk. Akın Temiz",
  speed = 320,
}: TabTitleProps) {
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    let marqueeText = `${awayTitle}   —   `;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Kullanıcı sekmeden ayrılınca kaydırmayı başlat
        intervalId = setInterval(() => {
          marqueeText = marqueeText.substring(1) + marqueeText.charAt(0);
          document.title = marqueeText;
        }, speed);
      } else {
        // Kullanıcı sekmeye dönünce kaymayı durdur ve net başlığı sabitle
        if (intervalId) clearInterval(intervalId);
        document.title = activeTitle;
      }
    };

    // İlk yüklemede başlığı sabitle
    document.title = activeTitle;

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (intervalId) clearInterval(intervalId);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [activeTitle, awayTitle, speed]);

  return null;
} 