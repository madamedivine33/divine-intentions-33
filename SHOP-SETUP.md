# Shop setup — Divine Intentions 33

The shop page (`index.html#shop`) is drawn from **`shop-catalog.js`**. Shopify stays the source of truth: every Shopify item there uses the product's real Shopify handle, and every button goes to the real Shopify product page, so checkout and Hoppy booking are unchanged.

## Addresses
- `#shop` — Explore the Sacred Collections (landing)
- `#shop/all` — Shop All
- `#shop/baths` · `#shop/oils` · `#shop/prosperity` · `#shop/candles` · `#shop/adornments` · `#shop/books` · `#shop/services`
- Divination & Sacred Tools opens `crystals.html#pendulum` (bracelets: `crystals.html#bracelet`)

## Adding or moving a product
Open `shop-catalog.js` on GitHub, click the pencil, copy one product entry, then change `handle` (the end of its Shopify link), `title`, `price`, `img` and `desc`. The `in: [...]` list decides which collection(s) it appears in. Commit.

A collection card only appears when it has at least one product.

## Optional: live prices and sold-out status
1. Shopify admin → Settings → Apps and sales channels → Develop apps (or install the free **Headless** channel).
2. Create a Storefront API token with *read products* access.
3. Paste the **public** Storefront token into `storefrontToken: ''` in `shop-catalog.js`.
Prices and sold-out status then refresh from Shopify each time the page loads. (Never paste an Admin API token here — only the public Storefront one.)
