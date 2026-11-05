# Ready to Feast

The static marketing and ordering site for Ready to Feast, built with Next.js 16, React 19 and Tailwind CSS 4.
There is no backend: orders go out by email through Web3Forms and by WhatsApp through a link that opens a typed-out message.

## Develop

```bash
npm install
cp .env.example .env.local   # add your Web3Forms key and site URL
npm run dev
```

`npm run build` writes a fully static site to `out/`.

## Deploy

- **Vercel:** import the repo. No settings are needed because Next.js is detected automatically.
- **Netlify:** import the repo. `netlify.toml` already sets the build command and the publish folder (`out`).

Set `NEXT_PUBLIC_WEB3FORMS_KEY` and `NEXT_PUBLIC_SITE_URL` in the host's environment variables.

## Where to edit

| What | File |
|---|---|
| Phone, email, Instagram, FSSAI number, announcement bar | `data/site.ts` |
| Products: prices, copy, photos | `data/products.ts` |
| Home page copy: FAQ, reviews, steps, cooking | `data/content.ts` |
| Colours and fonts | `app/globals.css`, `app/layout.tsx` |

Product photos go in `public/images/products/`. Add them to a product's `images` array, for example `{ url: "/images/products/pesto-1.webp", alt: "Pesto chicken pack", width: 1200, height: 1200 }`.
Until photos are added, each product shows a styled placeholder pack.

Search for `TODO(owner)` to find every placeholder that still needs real business details.

## Moving to Shopify or a backend later

UI components never read data files directly:

- `lib/catalog.ts` holds `getAllProducts()` and `getProductByHandle()`. Re-implement these to fetch products from the Shopify Storefront API.
- `lib/order.ts` holds `submitOrder()`. Replace it with Shopify cart and checkout creation.
- `lib/types.ts` defines the `Product` type, which uses Shopify-style fields (`handle`, `title`, `price`, `images`), so product URLs (`/products/<handle>/`) stay the same.
