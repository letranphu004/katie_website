# Tiệm Tí Bé — Website

Static single-page site for a Vietnamese personalized engraved hair-clip business. Bootstrap 5.3.8 + vanilla HTML/CSS/JS, no build tools, no framework.

## Preview locally

No build step, no server required — just open the page directly:

```
open index.html
```

(or double-click `index.html` in Finder). It also works fine served over HTTP if you prefer:

```
python3 -m http.server 8000
# then open http://localhost:8000
```

## Folder structure

```
/
├── index.html                — the entire site: hero, product groups, gallery, FAQ, order form
├── assets/
│   ├── css/style.css       — design tokens + all custom styles
│   ├── js/
│   │   ├── products-data.js — PRODUCTS catalog + PRODUCT_GROUPS (used by the product-group grid, modal, order form)
│   │   └── app.js           — API module (submitOrder) + all UI logic
│   └── images/              — placeholder SVGs, see below
├── components/
│   ├── navbar.html          — canonical header snippet (reference only, see below)
│   └── footer.html          — canonical footer snippet (reference only, see below)
└── docs/                    — this file, tech-stack.md, design-guidelines.md
```

## Why the header/footer live in `components/` too

`fetch()` can't load local files under `file://` (browser CORS restriction), and this site
is meant to open by double-clicking `index.html`, not just via a dev server. So even though
there's only one page now, `components/navbar.html` and `components/footer.html` stay as the
canonical reference copies of the header/footer markup — **if you change either, update
`index.html` to match**, using those two files as the source of truth.

## Site structure — one page, anchor sections

There is no multi-page navigation. `index.html` is a single scrollable page; the header has
just the brand and one "Đặt Hàng" CTA that jumps to `#order`. Sections, in order:

`hero` → why-choose-us → `#san-pham` (product groups) → how-it-works → testimonials →
`#gallery` → `#faq` → `#order`

Clicking a product card opens a shared `#productModal` (Bootstrap Modal + Carousel) with
that product's images, description, price, and color swatches. Its "Đặt Hàng Ngay" button
closes the modal, pre-fills the product/color into the order form via `prefillOrderForm()`
in `app.js`, and smooth-scrolls down to `#order` — no page navigation involved.

## Adding a new product

All products live in one place: `assets/js/products-data.js` (the `PRODUCTS` array), grouped
by the `PRODUCT_GROUPS` array (currently 6 groups, in display order: Combo Set, Lược, Gương,
Kẹp Thường, Kẹp Đổi Màu & Form Dài, Charm). The product-group grid, the detail modal, and the
order form's product/color dropdowns all read from this single array automatically — **add an
object to `PRODUCTS` and it appears on the site with no other code changes.**

1. Open `assets/js/products-data.js`.
2. Copy this template and paste it as a new entry inside the `PRODUCTS` array (before the
   closing `];`):

   ```js
   {
     id: "kep-ten-khong-dau-khong-trung",   // unique, no diacritics, used for internal links
     name: "Tên Sản Phẩm Đầy Đủ",
     description: "Mô tả ngắn 1-2 câu — shown in the detail modal.",
     priceVND: 159000,                      // plain integer, no thousands separators
     material: "Chất liệu (vd: Gỗ sồi tự nhiên)", // shown as the small label on the card + modal eyebrow
     group: "go-tu-nhien",                  // MUST match an existing PRODUCT_GROUPS id (see below)
     colors: [
       { name: "Tên màu", hex: "#RRGGBB" },
       { name: "Tên màu 2", hex: "#RRGGBB" }
     ],
     image: "assets/images/product-09.svg",  // card image + first carousel slide
     images: [                               // 2-3 images for the modal carousel
       "assets/images/product-09.svg",
       "assets/images/gallery-lifestyle-02.svg",
       "assets/images/gallery-packaging-01.svg"
     ]
   }
   ```
3. Fill in every field — `id`, `name`, `priceVND`, `material`, `group`, and at least one entry
   in `colors` and `images` are all required for the card/modal/order-form to render correctly.
4. Make sure every path in `image`/`images[]` points at a file that actually exists in
   `assets/images/` (see "Adding a new photo" below if the product needs brand-new images rather
   than reusing an existing placeholder/gallery shot).
5. Save and reload — no build step, the new product shows up in its group's grid immediately.

**Field reference:**

| Field | Required | Notes |
|---|---|---|
| `id` | Yes | Unique across all products; used to link the modal's "Đặt Hàng Ngay" button to the order form |
| `name` | Yes | Full product name, shown on the card, modal title, and order-form dropdown |
| `description` | Yes | 1-2 sentences, modal only |
| `priceVND` | Yes | Integer (e.g. `149000`), formatted as `149.000₫` automatically by `formatVND()` |
| `material` | Yes | Short label — card eyebrow + modal eyebrow |
| `group` | Yes | Must equal one `PRODUCT_GROUPS[].id` — see "Adding a new product group" below |
| `colors` | Yes, 1+ | Each needs `name` (shown in the order form's color dropdown) and `hex` (swatch color) |
| `image` | Yes | Primary photo — card thumbnail + carousel slide 1 |
| `images` | Yes, 1+ | Carousel slides, in order; can repeat `image` as the first entry |

### Combo products — multiple parts, each with its own color

A combo (e.g. "Combo Set 1 — Gương, Lược & 2 Kẹp") bundles several items — gương, lược, kẹp —
where the shopper picks a color for *each* item, not one color for the whole product. These
use `parts` instead of `colors`:

```js
{
  id: "combo-4",
  name: "Combo Set 4 — Tên Combo",
  description: "Mô tả ngắn.",
  priceVND: 179000,
  material: "Bộ 3 món",
  group: "combo",
  parts: [
    { label: "Gương", qty: 1, colors: [{ name: "Hồng phấn", hex: "#F3A6C9" }, { name: "Trắng ngà", hex: "#FAF6F0" }] },
    { label: "Lược", qty: 1, colors: [{ name: "Hồng phấn", hex: "#F3A6C9" }, { name: "Trắng ngà", hex: "#FAF6F0" }] },
    { label: "Kẹp", qty: 2, colors: [{ name: "Hồng phấn", hex: "#F3A6C9" }, { name: "Trắng ngà", hex: "#FAF6F0" }] }
  ],
  image: "assets/images/product-01.svg",
  images: ["assets/images/product-01.svg", "assets/images/product-02.svg"]
}
```

A product has either `colors` (single color pick) or `parts` (one color pick per part) — never
both. `qty` is optional and only affects the label shown (e.g. "Kẹp (x2)"); it does not create
separate color pickers per unit. The product-detail modal renders one swatch group per part;
picking a color in each and clicking "Đặt Hàng Ngay" prefills the order form, which swaps its
single "Chọn Màu" dropdown for one dropdown per part (`app.js`'s `populateColors()` and
`prefillOrderForm()`). The submitted order's `color` field becomes a joined string, e.g.
`"Gương: Hồng phấn, Lược: Trắng ngà, Kẹp: Vàng"`.

### Adding a new product group

Groups are what render as the titled sections ("Kẹp Gỗ Tự Nhiên", etc.) above each grid. To
add a third group, add an entry to `PRODUCT_GROUPS` at the top of `products-data.js`:

```js
{ id: "kep-mua-le", label: "Kẹp Mùa Lễ Hội", eyebrow: "Giới Hạn" }
```

Then set `group: "kep-mua-le"` on any product that belongs to it. A new section (eyebrow +
heading + card grid) appears automatically — no `index.html`/`app.js` changes needed.

## Adding photos

There are two situations: **replacing** a placeholder that already exists, or **adding** a
brand-new photo (for a new product, or extra gallery shots) that has no placeholder yet.

### Replacing an existing placeholder

All images currently on the site are placeholder SVGs (soft gradient + label) at
`assets/images/`, since no real product photography exists yet. Drop in real photos using the
**same filenames** and they'll appear automatically — no code changes needed:

| Purpose | Filenames | Used by |
|---|---|---|
| Product photos (8) | `product-01.svg` … `product-08.svg` | `assets/js/products-data.js` — each product's card image and first carousel slide |
| Testimonial avatars (3) | `testimonial-avatar-01.svg` … `-03.svg` | `index.html` testimonials section (currently commented out) |
| Gallery — lifestyle (3) | `gallery-lifestyle-01.svg` … `-03.svg` | `index.html` gallery section + reused as supplementary product-modal carousel slides |
| Gallery — packaging (3) | `gallery-packaging-01.svg` … `-03.svg` | `index.html` gallery section + reused as supplementary product-modal carousel slides |
| Gallery — customer photos (3) | `gallery-customer-01.svg` … `-03.svg` | `index.html` gallery section + reused as supplementary product-modal carousel slides |
| Gallery — engraving close-ups (3) | `gallery-engraving-01.svg` … `-03.svg` | `index.html` gallery section + reused as supplementary product-modal carousel slides |
| Social share preview | `og-cover.svg` | `index.html` `<meta property="og:image">` |

Each product's `images[]` array in `products-data.js` currently pairs its main photo with two
gallery placeholders (see that file's comments) to give the product-detail carousel more than
one slide until real per-product photography exists — swap those array entries once you have
real shots specific to each product.

If you replace an SVG with a `.jpg`/`.png`, update the file extension in the referencing
HTML/JS file too (browsers pick the image format from the file's actual content, but the
`src`/`image` path must point at the real filename). `og-cover.svg`: some social platforms
(Facebook/Twitter/Zalo) render OG preview images inconsistently for SVG — replace with a
real 1200×630 JPG/PNG before relying on link-preview cards.

### Adding a brand-new photo (new product, or extra gallery shots)

For a photo that has no existing placeholder to swap — a new product's photo, or an extra
gallery image beyond the current 12 — there's no filename to reuse, so wire it in manually:

1. **Save the file** into `assets/images/`, named after what it is (e.g. `product-09.jpg`,
   `gallery-lifestyle-04.jpg`) — match the existing naming pattern so the folder stays readable.
2. **Point something at it:**
   - New product photo → its `image`/`images[]` fields in `products-data.js` (see "Adding a
     new product" above).
   - New gallery photo → add a new `<a class="gallery-item glightbox" ...>` block in
     `index.html`'s `#gallery` section, copying the markup of an existing one and updating the
     `href`, `<img src>`, `alt`, `data-gallery` (grouping tag for the lightbox — reuse
     `lifestyle`/`packaging`/`customer`/`engraving` or invent a new tag), and `data-title`.
3. Recommended aspect ratio for **product photos**: **1080×1920** (portrait 9:16, matches
   real photography exported from a phone). `.product-card__media` and the modal carousel
   render images at their natural width/height (no crop, no fixed frame), so any ratio
   displays in full — 1080×1920 is just the size product photos are expected to arrive in.
   `.gallery-item` (lifestyle/packaging/customer/engraving shots in `#gallery`) is a separate,
   fixed 4:5 cropped frame (`object-fit: cover`) — pre-crop those close to 4:5 so nothing
   important sits near the edges.
4. No build step — save and reload.

## Deploying

No build command needed. Push the whole folder to any static host:

- **Netlify / Vercel**: connect the repo, leave build command empty, publish directory = `/`.
- **GitHub Pages**: enable Pages on the repo, serve from the root of the default branch.
- Or just upload the folder to any static file host / CDN bucket.

## Order flow — orders arrive by email via Web3Forms

`assets/js/app.js`'s `submitOrder(payload)` POSTs the order to
[Web3Forms](https://web3forms.com) (free, 250 submissions/month), which emails it straight to
whatever address you signed up with. If that request fails for any reason (bad/missing access
key, network error, rate limit), it falls back to storing the order in `localStorage` under the
key `tiemtibe_orders` and still shows the "Đặt Hàng Thành Công" success state — the customer
never sees a failure either way, but **you should set up the access key** or you'll only ever
get orders via the localStorage fallback (i.e., never, unless you manually inspect a customer's
browser).

**One-time setup (~1 minute, free, no card):**

1. Go to [web3forms.com](https://web3forms.com) and sign up with the email you want orders
   delivered to.
2. Copy the access key it gives you.
3. Open `assets/js/app.js`, find this line near the top:
   ```js
   const WEB3FORMS_ACCESS_KEY = "YOUR_WEB3FORMS_ACCESS_KEY";
   ```
   and replace `"YOUR_WEB3FORMS_ACCESS_KEY"` with your real key.
4. Save, reload, submit a test order — it should land in your inbox within seconds.

`submitOrder` is intentionally isolated from all other DOM code — it just takes a payload
object and returns `{ ok, source }` (`source` is `"web3forms"` or `"localStorage"` depending on
which path succeeded). To switch to a different service or your own backend later, this is the
only function that needs to change. Payload shape (also what ends up as the email's field
labels, via Web3Forms):

```json
{
  "customerName": "",
  "phone": "",
  "contact": "",
  "address": "",
  "productId": "",
  "productLabel": "",
  "color": "",
  "engraving": "",
  "quantity": 1,
  "note": ""
}
```

To inspect orders captured via the localStorage fallback (e.g. while `WEB3FORMS_ACCESS_KEY` is
still the placeholder, or if a submission failed), open the browser console on `index.html` and
run:

```js
JSON.parse(localStorage.getItem("tiemtibe_orders"))
```

## Docs

- `docs/tech-stack.md` — locked CDN versions, localization, branding placeholders
- `docs/design-guidelines.md` — color tokens, typography, motion, component rules
