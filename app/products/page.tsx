import type { Metadata } from "next";
import { getAllProducts } from "@/lib/catalog";
import ProductGrid from "@/components/ProductGrid";
import OrderButton from "@/components/OrderButton";

export const metadata: Metadata = {
  title: "Shop All Flavours",
  description: "Shop marinated, high-protein chicken breasts in eight flavours — from Classic Smoke Tandoori to Pesto. Ready to cook in 15 minutes.",
  alternates: { canonical: "/products/" },
};

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <>
      <section className="bg-maroon py-12 text-center sm:py-16">
        <div className="container-x">
          <h1 className="text-5xl text-cream sm:text-7xl">All flavours</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-mustard">
            Fresh, lean chicken breasts, marinated for hours in real spices. Pick a favourite or mix six into a box.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <ProductGrid products={products} />
        </div>
      </section>
      <section className="pb-16">
        <div className="container-x">
          <div className="flex flex-col items-center justify-between gap-6 rounded-3xl bg-cream p-8 text-center sm:flex-row sm:p-10 sm:text-left">
            <div>
              <h2 className="text-4xl">Build your 6-pack box</h2>
              <p className="mt-2 text-muted">Mix any flavours. Fill six slots and we&rsquo;ll deliver it fresh.</p>
            </div>
            <OrderButton box className="btn-primary shrink-0">Build my box</OrderButton>
          </div>
        </div>
      </section>
    </>
  );
}
