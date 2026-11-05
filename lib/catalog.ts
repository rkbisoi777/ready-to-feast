import { products } from "@/data/products";
import type { Product } from "./types";

/**
 * Single entry point for product data. Today it reads the local data file;
 * to move to Shopify (or any backend) re-implement these functions only.
 */
export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getProductByHandle(handle: string): Promise<Product | undefined> {
  return products.find((p) => p.handle === handle);
}

export async function getRelatedProducts(handle: string, limit = 4): Promise<Product[]> {
  return products.filter((p) => p.handle !== handle).slice(0, limit);
}

/** Synchronous lookup for client components (order form). */
export function getProductSync(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}
