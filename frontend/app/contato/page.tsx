import type { Metadata } from "next";
import Footer from "../../components/landing/Footer";

import JsonLd from "../../components/seo/JsonLd";
import ContactHero from "../../components/contact/ContactHero";
import ContactChannels from "../../components/contact/ContactChannels";
import ContactForm from "../../components/contact/ContactForm";
import CareersSection from "../../components/contact/CareersSection";
import MapSection from "../../components/contact/MapSection";

export const metadata: Metadata = {
  title: "Contato | CoffeeCafe",
  description:
    "Fale com o CoffeeCafe: dúvidas, feedbacks, parcerias e vagas. Atendimento profissional e canal direto com a equipe.",
  alternates: { canonical: "/contato" },
};

export default function ContatoPage() {
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
          "@type": "Organization",
          name: "CoffeeCafe",
          url: "https://example.com/contato",
          contactPoint: [
            {
              "@type": "ContactPoint",
              contactType: "customer support",
              areaServed: "BR",
              availableLanguage: ["Portuguese"],
            },
          ],
        }}
      />

      <main
        id="conteudo"
        className="mx-auto w-full max-w-[1200px] px-6 pb-14 pt-8"
      >
        <ContactHero />

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <ContactChannels />
            <CareersSection />
          </div>

          <ContactForm />
        </div>

        <MapSection />
      </main>

      <footer className="mt-10">
        <Footer />
      </footer>
    </div>
  );
}
