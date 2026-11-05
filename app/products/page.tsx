import type { Metadata } from "next";
import { getAllProducts } from "@/lib/catalog";
import ProductGrid from "@/components/ProductGrid";

export const metadata: Metadata = {
  title: "Shop All Flavours",
  description: "Shop marinated, high-protein chicken breasts in eight flavours, delivered across Mumbai, Navi Mumbai and Thane. Ready to cook in 15 minutes.",
  alternates: { canonical: "/products/" },
};

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <>
      <section className="bg-maroon py-12 text-center sm:py-16">
        <div className="container-x">
          <h1 className="animate-fade-up text-5xl text-cream sm:text-7xl">All flavours</h1>
          <p className="mx-auto mt-4 max-w-xl animate-fade-up text-lg text-mustard [animation-delay:150ms]">
            Fresh, lean chicken breasts, marinated for hours in real spices. Delivered fresh across Mumbai, Navi Mumbai and Thane.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container-x">
          <ProductGrid products={products} />
        </div>
      </section>
    </>
  );
}
