import type { Metadata } from "next";
import Footer from "../../components/landing/Footer";
import JsonLd from "../../components/seo/JsonLd";

import CareersHero from "../../components/careers/CareersHero";
import CareersOpenings from "../../components/careers/CareersOpenings";
import CareersApplicationForm from "../../components/careers/CareersApplicationForm";
import { careersData } from "../../components/careers/careers-data";

export const metadata: Metadata = {
  title: "Trabalhe Conosco | CoffeeCafe",
  description:
    "Portal de vagas CoffeeCafe: envie sua candidatura, anexe currículo e faça parte do nosso time.",
  alternates: { canonical: "/trabalhe-conosco" },
};

export default function TrabalheConoscoPage() {
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
          "@type": "ItemList",
          name: "Vagas CoffeeCafe",
          itemListElement: careersData.openings.map((o, idx) => ({
            "@type": "ListItem",
            position: idx + 1,
            item: {
              "@type": "JobPosting",
              title: o.role,
              employmentType: o.type,
              jobLocationType: o.remote ? "TELECOMMUTE" : "ONSITE",
              jobLocation: {
                "@type": "Place",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: o.city,
                  addressRegion: o.state,
                  addressCountry: "BR",
                },
              },
              hiringOrganization: {
                "@type": "Organization",
                name: "CoffeeCafe",
              },
            },
          })),
        }}
      />

      <main
        id="conteudo"
        className="mx-auto w-full max-w-[1200px] px-6 pb-14 pt-8"
      >
        <CareersHero />
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <CareersOpenings />
          <CareersApplicationForm />
        </div>

        <div className="mt-10 rounded-[26px] border border-[#3a271a]/10 bg-white/35 p-6 shadow-sm backdrop-blur-sm md:p-7">
          <h2 className="font-script text-4xl leading-[1.05]">
            Dica pra acelerar sua aprovação
          </h2>
          <p className="mt-2 text-sm leading-7 text-[#3a271a]/75">
            Envie um currículo objetivo + um texto curto explicando por que você
            combina com a CoffeeCafe. A gente valoriza clareza, atenção e
            postura.
          </p>
        </div>
      </main>

      <footer className="mt-10">
        <Footer />
      </footer>
    </div>
  );
}
