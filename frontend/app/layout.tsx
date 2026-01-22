// app/layout.tsx
import type { Metadata } from "next";
import { Dancing_Script, Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Navbar from "../components/home/Navbar";

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
  title: "CoffeeCafe — Café artesanal e bebidas especiais",
  description:
    "CoffeeCafe — café artesanal com aroma intenso, bebidas especiais e grãos selecionados. Faça seu pedido com rapidez e segurança.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className={`${dancing.variable} ${poppins.variable}`}>
      <body className="min-h-dvh bg-[#efe6dc] text-[#3a271a] antialiased">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
