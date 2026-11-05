import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProducts, getProductByHandle, getRelatedProducts } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { whatsappLink } from "@/lib/order";
import { site } from "@/data/site";
import ProductGallery from "@/components/ProductGallery";
import ProductGrid from "@/components/ProductGrid";
import AddToCart from "@/components/AddToCart";
import SpiceLevel from "@/components/SpiceLevel";
import CookingStorage from "@/components/CookingStorage";
import JsonLd from "@/components/JsonLd";
import { WhatsAppIcon } from "@/components/Icons";

type Props = { params: Promise<{ handle: string }> };

export const dynamicParams = false;

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const p = await getProductByHandle(handle);
  if (!p) return {};
  const description = `${p.title} marinated chicken breast — ${p.profile} ${p.pack.protein} protein, ready in 15 minutes.`;
  return {
    title: `${p.title} Marinated Chicken Breast`,
    description,
    alternates: { canonical: `/products/${p.handle}/` },
    openGraph: {
      type: "website",
      title: `${p.title} | Ready to Feast`,
      description,
      url: `/products/${p.handle}/`,
      images: p.images[0] ? [{ url: p.images[0].url, alt: p.images[0].alt }] : undefined,
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) notFound();
  const related = await getRelatedProducts(handle);
  const waText = `Hi! I'd like to order ${product.title} (${formatPrice(product.price)}).`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.title,
          description: product.description,
          sku: product.handle,
          brand: { "@type": "Brand", name: site.name },
          image: product.images.map((i) => new URL(i.url, site.url).toString()),
          offers: {
            "@type": "Offer",
            url: `${site.url}/products/${product.handle}/`,
            priceCurrency: product.price.currencyCode,
            price: product.price.amount,
            availability: product.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
          },
        }}
      />

      <nav aria-label="Breadcrumb" className="container-x py-3 text-sm text-muted">
        <ol className="flex gap-2">
          <li><Link href="/" className="hover:text-ink">Home</Link> /</li>
          <li><Link href="/products/" className="hover:text-ink">Shop</Link> /</li>
          <li aria-current="page" className="text-ink">{product.title}</li>
        </ol>
      </nav>

      <section className="lg:container-x lg:grid lg:grid-cols-2 lg:gap-0 lg:pb-16">
        <ProductGallery product={product} />

        <div className="bg-cream px-4 py-8 sm:px-8 lg:rounded-r-3xl lg:px-12 lg:py-12">
          <p className="mb-2 inline-flex items-center gap-2 text-sm font-medium text-muted">
            <span className="size-3 rounded-full ring-1 ring-ink/20" style={{ background: product.color }} aria-hidden />
            {product.colorName}
          </p>
          <h1 className="text-5xl sm:text-6xl">{product.title}</h1>
          <p className="mt-3 font-display text-3xl font-bold">{formatPrice(product.price)}</p>
          <p className="text-sm uppercase tracking-wide text-muted">Taxes included · Delivery in Mumbai, Navi Mumbai &amp; Thane</p>

          <p className="mt-6 text-lg">{product.description}</p>

          <dl className="mt-6 space-y-2">
            <div><dt className="inline font-semibold">In every pack: </dt><dd className="inline">{product.pack.pieces}, {product.pack.weight}, {product.pack.protein} protein</dd></div>
            <div><dt className="inline font-semibold">Flavour profile: </dt><dd className="inline">{product.profile}</dd></div>
            <div><dt className="inline font-semibold">Allergens: </dt><dd className="inline">{product.allergens}</dd></div>
            <div><dt className="inline font-semibold">Storage: </dt><dd className="inline">Keep at -2 to 4°C. Use within 2 days of opening.</dd></div>
          </dl>

          <div className="mt-6">
            <SpiceLevel level={product.spice} />
          </div>

          <div className="mt-6">
            <p className="font-semibold">Best paired with</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {product.pairings.map((x) => (
                <li key={x} className="rounded-full bg-white px-3 py-1 text-sm">{x}</li>
              ))}
            </ul>
          </div>

          <ul className="mt-6 flex flex-wrap gap-2 text-sm font-semibold uppercase">
            {["Halal", "No added preservatives", "Oil free", "Ready in 15 min"].map((b) => (
              <li key={b} className="rounded-md border border-maroon/30 px-2 py-1 text-maroon">{b}</li>
            ))}
          </ul>

          <div className="mt-8 grid gap-3">
            <AddToCart handle={product.handle} title={product.title} />
            <a href={whatsappLink(waText)} target="_blank" rel="noopener noreferrer" className="btn-whatsapp w-full">
              <WhatsAppIcon className="size-5" /> Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="container-x section">
        <CookingStorage compact />
      </div>

      <section aria-labelledby="related-title" className="section bg-cream-light">
        <div className="container-x">
          <h2 id="related-title" className="mb-10 text-center text-4xl sm:text-5xl">You may also like</h2>
          <ProductGrid products={related} />
        </div>
      </section>

    </>
  );
}
