/**
 * Product shape kept close to Shopify's Storefront API (handle, title, price,
 * images) so the catalog source can be swapped later without touching UI code.
 */
export type Money = { amount: number; currencyCode: "INR" };

export type ProductImage = { url: string; alt: string; width: number; height: number };

export type Product = {
  handle: string; // URL slug — same concept as a Shopify product handle
  title: string;
  tagline: string; // one-liner for cards
  description: string;
  price: Money;
  compareAtPrice?: Money;
  images: ProductImage[]; // empty → styled placeholder pack is shown
  tags: string[];
  // Ready to Feast specific fields (would map to Shopify metafields later)
  color: string; // flavour accent colour
  colorText: string; // readable text colour on top of `color`
  colorName: string;
  profile: string;
  pairings: string[];
  spice: 0 | 1 | 2 | 3;
  pack: { weight: string; pieces: string; protein: string };
  allergens: string;
  available: boolean;
};

export type LineItem = { handle: string; quantity: number };

export type Customer = {
  name: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  pincode: string;
  date?: string;
  notes?: string;
};

export type Order = {
  items: LineItem[];
  boxMode: boolean;
  customer: Customer;
};
