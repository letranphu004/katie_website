# Tech Stack — Tiệm Tí Bé

Static, no-build-tool **single-page** site (`index.html` only). All libraries loaded via CDN `<script>`/`<link>` tags.

## Locked Decisions (user-specified)

| Concern | Choice | Why |
|---|---|---|
| Layout/UI | Bootstrap 5.3.8 | Grid, utilities, components; latest 5.3 patch |
| Icons | Bootstrap Icons 1.11.x | Matches Bootstrap, tree of common glyphs |
| Fonts | Google Fonts: Be Vietnam Pro (single family, 400–800) | Editorial minimalist pairing per CHUU (en.chuu.co.kr) reference; full Vietnamese diacritic support |
| Scroll animation | AOS 2.3.4 | Standard fade-in-on-scroll, no build step |
| Product detail | Bootstrap Modal + Bootstrap Carousel | Reuses the Bootstrap bundle already loaded (no extra dependency); opens on product-card click, shows `images[]` per product |
| Gallery lightbox | GLightbox (latest) | Pure JS, no jQuery, supports masonry-style image galleries |
| No React/Vue/Tailwind/build tools | Confirmed | Brief explicitly excludes these |

Swiper was dropped (2026-07-16): the small "featured products" teaser it powered was replaced by the full grouped product catalog as the page's primary content, so a second carousel library was redundant — the product-detail carousel reuses Bootstrap's own Carousel component instead.

## CDN Links

```html
<!-- Bootstrap 5.3.8 -->
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>

<!-- Bootstrap Icons -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

<!-- Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet">

<!-- AOS (scroll animations) -->
<link href="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/aos@2.3.4/dist/aos.js"></script>

<!-- GLightbox (gallery section) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
<script src="https://cdn.jsdelivr.net/npm/glightbox/dist/js/glightbox.min.js"></script>
```

## Page Structure

One page, sections reached by scroll/anchor: hero → why-choose-us → `#san-pham` (product groups) → how-it-works → testimonials → `#gallery` → `#faq` → `#order`. Header is just brand + a single "Đặt Hàng" CTA (`href="#order"`) — no tab menu. Product cards open a shared `#productModal` (Bootstrap Modal + Carousel) on click; its "Đặt Hàng Ngay" button pre-fills `#order`'s form (`prefillOrderForm()` in `app.js`) and smooth-scrolls down, replacing the old `order.html?product=&color=` query-param handoff.

## Market / Localization

- Vietnamese-market site: Vietnamese copy throughout, prices in VND (e.g. `149.000₫`), Zalo as primary contact/order channel alongside phone.
- Delivery: nationwide Vietnam ("Giao hàng toàn quốc").

## Branding (placeholder — user to confirm/replace)

- Business name: **Tiệm Tí Bé**
- Phone: `090 123 4567` (placeholder)
- Email: `hello@tiemtibe.vn` (placeholder)
- Instagram: `@tiemtibe`
- Facebook: `facebook.com/tiemtibe`
- TikTok: `@tiemtibe`

## Images

User will supply real photography later. Build uses correctly-sized, clearly-named placeholder image slots under `/assets/images/` (e.g. `product-01.jpg`, `gallery-lifestyle-01.jpg`) so real photos can be dropped in without code changes.

## Backend

No backend in this phase. `app.js` posts to `/api/order`; on network/fetch failure, falls back to `localStorage` (key: `tiemtibe_orders`) and still shows "Đặt hàng thành công" (Order Successful). API functions isolated in `app.js` so a future Strapi/Laravel backend is a drop-in swap.
