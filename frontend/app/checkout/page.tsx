
import Footer from "../../components/landing/Footer";
import CheckoutClient from "../../components/checkout/CheckoutClient";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <div className="paper-noise">

      <main className="px-6 pb-12 pt-6">
        <div className="mx-auto w-full max-w-[1280px]">
          <CheckoutClient />
        </div>
      </main>

      <footer className="mt-10">
        <Footer />
      </footer>
    </div>
  );
}
