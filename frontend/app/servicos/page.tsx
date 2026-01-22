import type { Metadata } from "next";
import Footer from "../../components/landing/Footer";

import JsonLd from "../../components/seo/JsonLd";
import ServicesHero from "../../components/services/ServicesHero";
import ServicesGrid from "../../components/services/ServicesGrid";
import ServicesStory from "../../components/services/ServicesStory";
import ServicesMosaic from "../../components/services/ServicesMosaic";
import ServicesTemplates from "../../components/services/ServicesTemplates";
import ServicesCTA from "../../components/services/ServicesCTA";

export const metadata: Metadata = {
  title: "Serviços | CoffeeCafe",
  description:
    "Conheça os serviços do CoffeeCafe: cafés artesanais, bebidas especiais, receitas autorais e experiências para quem ama café.",
  alternates: { canonical: "/servicos" },
};

export default function ServicosPage() {
  return (
    <div className="paper-noise">
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-xl focus:bg-[#3a271a] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#efe6dc]"
      >
        Pular para o conteúdo
      </a>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "CoffeeCafe",
          url: "https://example.com/servicos",
          description:
            "Café artesanal com bebidas especiais, grãos selecionados e receitas autorais.",
          servesCuisine: "Coffee",
        }}
      />

      <main
        id="conteudo"
        className="mx-auto w-full max-w-[1200px] px-6 pb-14 pt-8"
      >
        <ServicesHero />
        <ServicesGrid />
        <ServicesStory />
        <ServicesMosaic />
        <ServicesTemplates />
        <ServicesCTA />
      </main>

      <footer className="mt-10">
        <Footer />
      </footer>
    </div>
  );
}
