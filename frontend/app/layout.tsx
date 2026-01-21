import type { Metadata } from "next";
import { Dancing_Script, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-script",
  weight: ["400", "500", "600", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "CoffeeCafe — Coffee Caffeine",
  description:
    "CoffeeCafe — café artesanal com aroma intenso, bebidas especiais e grãos selecionados.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-br" className={`${dancing.variable} ${poppins.variable}`}>
      <body className="min-h-dvh bg-[#efe6dc] text-[#3a271a] antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
