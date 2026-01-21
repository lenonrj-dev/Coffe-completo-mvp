"use client";

import { useState } from "react";

import Navbar from "../components/landing/Navbar";
import HeroBanner from "../components/landing/HeroBanner";
import OurStory from "../components/landing/OurStory";
import DelightDrinks from "../components/landing/DelightDrinks";
import SpecialtyGallery from "../components/landing/SpecialtyGallery";
import CoffeeBeansCTA from "../components/landing/CoffeeBeansCTA";
import DelightBlog from "../components/landing/DelightBlog";
import Footer from "../components/landing/Footer";

import MenuOrderSection from "../components/checkout/MenuOrderSection";
import CartSidebar from "../components/checkout/CartSidebar";
import CheckoutModal from "../components/checkout/CheckoutModal";

export default function Page() {
  const [open, setOpen] = useState(false);

  return (
    <div className="paper-noise">
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:rounded-xl focus:bg-[#3a271a] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[#efe6dc]"
      >
        Pular para o conteúdo
      </a>

      <header id="home" className="mx-auto max-w-[1100px] px-6">
        <Navbar />
      </header>

      <main className="mx-auto max-w-[1100px] px-6">
        <HeroBanner />
        <OurStory />
        <DelightDrinks />

        <div className="mt-6 grid grid-cols-1 items-start gap-6 md:grid-cols-[1fr_340px]">
          <div className="min-w-0">
            <MenuOrderSection />
          </div>
          <CartSidebar onContinue={() => setOpen(true)} />
        </div>

        <SpecialtyGallery />
        <CoffeeBeansCTA />
        <DelightBlog />
      </main>

      <footer id="contact" className="mt-10">
        <Footer />
      </footer>

      <CheckoutModal open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
