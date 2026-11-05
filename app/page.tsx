import { getAllProducts } from "@/lib/catalog";
import { faqs } from "@/data/content";
import { site } from "@/data/site";
import Hero from "@/components/Hero";
import StatBadges from "@/components/StatBadges";
import Marquee from "@/components/Marquee";
import ProductGrid from "@/components/ProductGrid";
import SectionHeading from "@/components/SectionHeading";
import WhyUs from "@/components/WhyUs";
import HowItWorks from "@/components/HowItWorks";
import CookingStorage from "@/components/CookingStorage";
import Reviews from "@/components/Reviews";
import FAQ from "@/components/FAQ";
import CTABanner from "@/components/CTABanner";
import JsonLd from "@/components/JsonLd";

export default async function HomePage() {
  const products = await getAllProducts();
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              name: site.name,
              url: site.url,
              email: site.email,
              sameAs: [site.instagram],
              areaServed: site.serviceAreas.map((name) => ({ "@type": "City", name })),
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ],
        }}
      />
      <Hero />
      <Marquee />
      <StatBadges />
      <section id="flavours" aria-labelledby="flavours-title" className="section">
        <div className="container-x">
          <SectionHeading
            id="flavours-title"
            eyebrow="Our flavours"
            title={`${products.length} flavours. Pick your feast.`}
            intro="Add any flavours to your cart. Delivered fresh across Mumbai, Navi Mumbai and Thane."
          />
          <ProductGrid products={products} />
        </div>
      </section>
      <WhyUs />
      <HowItWorks />
      <CookingStorage />
      <Reviews />
      <FAQ />
      <CTABanner />
    </>
  );
}
