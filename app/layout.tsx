import type { Metadata } from 'next';
import { Inter, Playfair_Display, Geist } from 'next/font/google';
import Navbar from '@/components/Navbar/Navbar';
import './globals.css';
import { cn } from "@/lib/utils";
import { Footer } from '@/components/Footer';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

export const metadata: Metadata = {
  title: 'Klinik Psikolog Ad Soyad | Bireysel & Çift Terapisi',
  description: 'Bilimsel temelli klinik psikoloji ve psikoterapi hizmetleri.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={cn("scroll-smooth", playfair.variable, "font-sans", geist.variable)}>
      <body className="min-h-screen flex flex-col bg-stone-50 text-stone-800 font-sans antialiased">
        <Navbar />

        {/* Ana İçerik */}
        <main className="flex-1">
          {children}
        </main>

        {/* Minimal Footer */}
     <Footer/>
      </body>
    </html>
  );
}