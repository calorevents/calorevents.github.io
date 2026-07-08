# Webshop Update & Main-Page Connection — Design

**Date:** 2026-07-08
**Status:** Approved (pending written-spec review)

## Goal

Update the CALOR webshop to sell all four products, and make the shop
reachable from the main page in two ways: a prominent promo box above the
poster, and by weaving the shop into the site's page-cycle as the second
page (right after the main page, before `about`).

## Current State

- `shop/shoppa.html` — live shop page. WinXP-styled (`shop-container`,
  blue-gradient `shop-header`, `.products` flex row). Uses the Shopify Buy
  Button SDK. Currently shows the **SJALOR collection** (`708461592906`) and
  **one SHIRT product** (`15578424213834`). Header is a one-off "‹‹‹ BACK"
  link, not the standard nav ring.
- `shop/instricutions.txt` — untracked scratch file containing Shopify embed
  code for **four individual products** (see IDs below). Each product is its
  own `<script>` block that reloads the SDK.
- `index.html` — main page. Has **no link to the shop**. Nav ring arrows:
  `‹‹‹` → `snake.html`, `›››` → `about.html`.
- No file anywhere references `shoppa.html` / the shop, so the shop's
  filename and URL can change freely.

### Existing page-cycle ring (forward `›››`)

```
index → about → archive → snake → index
```

Each page's `‹‹‹` is the reverse of its `›››`.

## Target Design

### Page-cycle ring (new forward `›››`)

```
index → shop → about → archive → snake → index
```

The shop is inserted between `index` and `about`. Backward `‹‹‹` from `index`
still goes to `snake`.

### 1. Shop page — rename `shop/shoppa.html` → `shop/index.html`

Clean URL: `calorevents.github.io/shop/`. No references to update.

- **Keep** the WinXP presentation: `shop-container` window, `shop-header`
  title bar, `.products` flex layout, and the `../styles.css` +
  `../header.css` stylesheet links.
- **Header** becomes the standard nav ring (replacing the "‹‹‹ BACK" link):
  - `‹‹‹` → `../index.html`
  - `<h1>CALOR SHOP</h1>`
  - `›››` → `../about.html`
- **Four products in ONE consolidated Shopify script.** Build the client
  once, then call `ui.createComponent('product', …)` four times inside a
  single `ShopifyBuy.UI.onReady(...)`. This replaces both the old two-embed
  script and the four redundant SDK-loading blocks in `instricutions.txt`.

  | Product | Shopify ID |
  |---|---|
  | Sjaal | `15578418741578` |
  | Shirts | `15578424213834` |
  | 3rd product | `15878657671498` |
  | 4th product ("sricirahhalor") | `15878651543882` |

  Domain `bd79px-pr.myshopify.com`, storefront token
  `2294c18d75b2a6d5aa5d0884eee70d3c`, `moneyFormat` euro — all as in the
  existing page / file.
- **Cart copy:** keep the playful Dutch text from `instricutions.txt`
  verbatim ("Mand!", "Dit kost vermoedelijk:", "Check it hier out", the
  `noteDescription` about "Tot zondag 19 juli!", etc.). Spelling is the
  owner's to adjust later — do not "correct" it.
- **Layout:** Sjaal + Shirts render full-width horizontal (they carry
  descriptions + carousel, per the file's config for products 1–2). The two
  newer products (3rd, 4th) sit as a tidy 2-up row beneath, coherent inside
  the ~800px window.

### 2. Main-page connection

**`index.html`:**
- **Promo box above the poster.** A WinXP window matching the existing
  `countdown-box` style (silver `#c0c0c0` fill, beveled border,
  blue-gradient title bar), inserted immediately before
  `<section class="poster">`. Structure:
  - Title bar: `CALOR SHOP`
  - Body: `Sjalor, shirts & meer` + a large **NAAR DE SHOP ›** button
  - The whole box is a link to `shop/index.html`
- **Nav wiring:** change `index.html`'s `›››` arrow from `about.html` to
  `shop/index.html`. (`‹‹‹` → `snake.html` unchanged.)

**`about.html`:**
- Change `‹‹‹` arrow from `index.html` to `shop/index.html` so the ring stays
  symmetric.

**`index.css`:**
- Add `.shop-promo` (+ button) rules, reusing the WinXP box pattern from
  `.countdown-box` / `.countdown-box h3`.

### 3. Cleanup

- Delete `shop/instricutions.txt` after its IDs/config are folded into
  `shop/index.html`.

## Components & Data Flow

- **Static site**, no build step. Plain HTML/CSS + the third-party Shopify
  Buy Button SDK loaded from `sdks.shopifycdn.com`.
- Shop rendering depends on the network (SDK + Shopify storefront API). The
  page shell (WinXP window, nav) renders without it; product components hydrate
  when the SDK resolves.

## Error Handling / Edge Cases

- If the Shopify SDK fails to load, product `<div>`s stay empty — the page
  shell and nav still work. (No change from current behavior.)
- Relative links: the shop lives in `shop/`, so its arrows use `../` and the
  main/about pages link with the `shop/` prefix.

## Verification

Open both pages in a browser and confirm:
1. `index.html` — promo box appears **above** the poster and links to
   `/shop/`; `›››` now navigates to the shop.
2. `shop/index.html` — all **four** products render (SDK loads); the cart
   ("Mand!") opens; nav ring cycles correctly:
   `index ›› shop ›› about` and back `about ‹‹ shop ‹‹ index`.
3. Layout holds on mobile width (products stack, promo box responsive).

## Out of Scope

- No changes to Shopify product data, pricing, or the checkout flow.
- No redesign of the WinXP theme or other pages beyond the two nav-arrow edits.
- No spelling corrections to cart copy (owner's call).
