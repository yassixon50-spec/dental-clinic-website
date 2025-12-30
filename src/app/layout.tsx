import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "DentCare - Zamonaviy Stomatologiya Klinikasi",
  description: "Professional stomatologiya xizmatlari. Og'riqsiz davolash, zamonaviy uskunalar, tajribali shifokorlar. Birinchi ko'rik bepul!",
  keywords: "stomatologiya, tish davolash, implantatsiya, tish oqartirish, ortodontiya, Toshkent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className="scroll-smooth">
      <body className={`${inter.variable} ${poppins.variable} font-body antialiased`}>
        {children}
      </body>
    </html>
  );
}
