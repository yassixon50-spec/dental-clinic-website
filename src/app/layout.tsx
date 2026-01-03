import type { Metadata } from "next";
import "./globals.css";

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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  );
}
