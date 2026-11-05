import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/catalog";
import { site } from "@/data/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts();
  return [
    { url: `${site.url}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/products/`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/privacy-policy/`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${site.url}/terms/`, changeFrequency: "yearly", priority: 0.3 },
    ...products.map((p) => ({ url: `${site.url}/products/${p.handle}/`, changeFrequency: "monthly" as const, priority: 0.8 })),
  ];
}
