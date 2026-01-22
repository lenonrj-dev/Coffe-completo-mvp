
import HeroBanner from "../components/landing/HeroBanner";
import OurStory from "../components/landing/OurStory";
import DelightDrinks from "../components/landing/DelightDrinks";
import SpecialtyGallery from "../components/landing/SpecialtyGallery";
import CoffeeBeansCTA from "../components/landing/CoffeeBeansCTA";
import DelightBlog from "../components/landing/DelightBlog";
import Footer from "../components/landing/Footer";

import MenuOrderSection from "../components/menu/MenuOrderSection";
import { CartProvider } from "../components/checkout/cart-store";

export default function Page() {
  return (
    <div className="paper-noise">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-xl focus:bg-[#3a271a] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#efe6dc]"
      >
        Pular para o conteúdo
      </a>

      <main className="mx-auto max-w-[1100px] px-6">
        <HeroBanner />
        <OurStory />
        <DelightDrinks />

        {/* ✅ MENU + SACOLA (CartProvider envolve toda a área que usa useCart) */}
        <CartProvider>
          <MenuOrderSection />
        </CartProvider>

        <SpecialtyGallery />
        <CoffeeBeansCTA />
        <DelightBlog />
      </main>

      <footer id="contact" className="mt-10">
        <Footer />
      </footer>
    </div>
  );
}
