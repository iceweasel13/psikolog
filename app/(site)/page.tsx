import { Hero } from "@/components/Hero";
import { SectionDivider } from "@/components/SectionDivider";
import { AboutMe } from "@/components/AboutMe";
import { SectionDividerBottom } from "@/components/SectionDividerBottom";
import { Services } from "@/components/Services";
import { Reviews } from "@/components/Reviews";
import { Education } from "@/components/Education";
import { Contact } from "@/components/Contact";

export default function HomePage() {
  return (
    <main className="w-full overflow-hidden"> 
      {/* 1. Hero: İlk açılışta hemen görünür (gecikmesiz) */}
    
        <Hero />
      

      {/* Dalga sabit kalır (renk yırtılmasını önlemek için) */}
      <SectionDivider />

      {/* 2. Hakkımda */}
  
        <AboutMe />
    

      <SectionDividerBottom />

      {/* 3. Hizmetler */}
     
        <Services />
     
  <SectionDivider />
      {/* 4. Danışan Yorumları */}
   
        <Reviews />
    
  <SectionDividerBottom />
      {/* 5. Eğitim & Sertifikalar */}
      
        <Education />
    
 <SectionDivider />
      {/* 6. Randevu & İletişim Formu */}
     
        <Contact />
     

     
    </main>
  );
}