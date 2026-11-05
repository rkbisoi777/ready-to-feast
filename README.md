# Ready to Feast

The static marketing and ordering site for Ready to Feast, built with Next.js 16, React 19 and Tailwind CSS 4.
There is no backend and no login. Customers add flavours to a cart (the bag icon at the top right), check out with their name, number and address, and the order goes to you by email (Web3Forms) and on WhatsApp (a link that opens a typed-out message).
Delivery is limited to Mumbai, Navi Mumbai and Thane (`serviceAreas` in `data/site.ts`).

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
| Phone, email, Instagram, FSSAI number, announcement bar, delivery areas | `data/site.ts` |
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
- `components/CartProvider.tsx` keeps the cart as `{ handle, quantity }` items, the same shape as a Shopify cart line.
- `lib/types.ts` defines the `Product` type, which uses Shopify-style fields (`handle`, `title`, `price`, `images`), so product URLs (`/products/<handle>/`) stay the same.

## Security

- Static site: no server, database, login or payment handling on the site.
- Security headers (Content-Security-Policy, HSTS, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy) are set in `netlify.toml`, and the same headers in `vercel.json`. Keep the two files in sync.
- Checkout has a hidden honeypot field against spam bots, length limits on every field, and input cleaning before the order email and WhatsApp message are built.
- The saved cart in the browser is checked on load: unknown products are dropped and quantities are capped at 1–20.
- The Web3Forms access key is public by design. It can only send emails to your inbox.
- Run `npm audit` after updating dependencies.
