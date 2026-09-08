import { Hero } from "@/components/Hero";
import { SectionDivider } from "@/components/SectionDivider";
import { AboutMe } from "@/components/AboutMe";
import { SectionDividerBottom } from "@/components/SectionDividerBottom";
import { Services } from "@/components/Services";
import { Reviews } from "@/components/Reviews";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";

import { FadeIn } from "@/components/FadeIn";

export default function HomePage() {
  return (
    <main className="w-full overflow-hidden"> 
      {/* 1. Hero: İlk açılışta hemen görünür (gecikmesiz) */}
      <FadeIn direction="none" delay={0.1}>
        <Hero />
      </FadeIn>

      {/* Dalga sabit kalır (renk yırtılmasını önlemek için) */}
      <SectionDivider />

      {/* 2. Hakkımda */}
      <FadeIn direction="up">
        <AboutMe />
      </FadeIn>

      <SectionDividerBottom />

      {/* 3. Hizmetler */}
      <FadeIn direction="up">
        <Services />
      </FadeIn>
  <SectionDivider />
      {/* 4. Danışan Yorumları */}
      <FadeIn direction="up">
        <Reviews />
      </FadeIn>
  <SectionDividerBottom />
      {/* 5. Eğitim & Sertifikalar */}
      <FadeIn direction="up">
        <Education />
      </FadeIn>
 <SectionDivider />
      {/* 6. Randevu & İletişim Formu */}
      <FadeIn direction="up">
        <Contact />
      </FadeIn>

     
    </main>
  );
}