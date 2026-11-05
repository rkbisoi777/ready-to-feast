# Ready to Feast

Landing page for Ready to Feast: marinated chicken breasts, ready in 15 minutes.

A static site: plain HTML, CSS and JavaScript, with no build step.

```
index.html            page content (hero, why us, flavours, cooking and storage, how it works, reviews, FAQ)
assets/css/styles.css styles and flavour colour tokens
assets/js/main.js     flavour cards and the custom 6-pack box builder
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## The 6-pack box builder

- Shoppers add any of the seven flavours to fill six slots. The box is saved in the browser (`localStorage`).
- Flavour copy lives in the `FLAVOURS` array in `assets/js/main.js`.
- **Checkout:** set `ORDER_URL` at the top of `assets/js/main.js` to your checkout, form or WhatsApp link. The box is sent as `?box=tandoori,pesto,...`. While `ORDER_URL` is empty, "Order your feast" shows an on-page order summary.

## Deploy

Any static host works (GitHub Pages, Netlify, Vercel, Cloudflare Pages). Publish the repository root.
