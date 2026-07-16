# Phase 01 — Single-Page Rebuild

## Context

- Current: `index.html` (hero/features/teaser/timeline/testimonials/faq-preview/cta), `products.html` (full grid), `gallery.html` (masonry+GLightbox), `faq.html` (accordion), `order.html` (form+live preview). Shared nav/footer copy-pasted per page.
- `assets/js/products-data.js`: 8 products, no `group`/`images[]` field yet, single `image` field only.
- `assets/js/app.js`: per-page `init*` functions gated by `document.getElementById(...)` presence checks — safe to consolidate into one page since every section will now coexist in the same DOM.
- `assets/css/style.css`: CHUU-style tokens already in place (0 radius, no shadow, Be Vietnam Pro, `--color-ink`/`--color-accent`) — reuse, extend only where new components need it (modal, group heading).

## Files to Modify

- `assets/js/products-data.js` — add `group` + `images[]` per product, add `PRODUCT_GROUPS` list.
- `index.html` — full rebuild: minimal header, hero, product-groups section, gallery section, faq section, order section, product-detail modal markup, footer. Remove Swiper CDN tags (teaser slider dropped — full catalog replaces it).
- `assets/js/app.js` — replace `initTeaserSlider`/`initProductGrid` with `initProductGroups()` + `initProductModal()`; adjust order-prefill to work via in-page scroll instead of `order.html?product=&color=` query params; keep `initGallery`, `initOrderPage`, `initTestimonialCarousel`, `initScrollProgress`, `initBackToTop`, `initNavbarShrink`.
- `assets/css/style.css` — add styles for: group section heading, product-card click affordance, modal (flat, 0 radius, matches design system), modal carousel controls (recolor Bootstrap's default dark controls to `--color-ink`).
- `components/navbar.html` — reduce to logo + CTA only (matches new index.html header exactly, still "canonical source, not loaded at runtime").
- `components/footer.html` — no structural change needed (footer content unchanged), verify anchors still make sense without multi-page nav.
- `docs/design-guidelines.md` — update Layout section: single-page IA, modal/carousel component notes.
- `docs/tech-stack.md` — remove Swiper from CDN list (no longer used); note single-page structure; GLightbox/AOS/Bootstrap unchanged.

## Files to Delete

- `products.html`, `gallery.html`, `faq.html`, `order.html`

## Implementation Steps

1. **Data model** — in `products-data.js`, add to each product: `group: "go-tu-nhien" | "cao-cap-dinh-da"`, `images: [product.image, <gallery-svg-1>, <gallery-svg-2>]` (pick contextually — e.g. wood products pair with `gallery-lifestyle-*`/`gallery-engraving-*`, premium products pair with `gallery-engraving-*`/`gallery-packaging-*`, cycle through the 12 existing gallery SVGs so pairings aren't identical across all 8 products). Add `const PRODUCT_GROUPS = [{id, label, eyebrow?}, ...]` for section rendering order/titles.

2. **index.html header** — replace the current `navbar-nav` list (Trang Chủ/Sản Phẩm/Bộ Sưu Tập/Câu Hỏi) with: brand link (`href="#top"` or non-link, since there's nowhere else to go) + single `<a class="btn btn-boutique btn-sm" href="#order">Đặt Hàng</a>`. Remove `navbar-toggler`/`collapse` markup (no longer needed with just 2 items, but keep responsive padding).

3. **index.html body** — keep hero section as-is (already updated to CHUU style). Replace "Product Teaser" Swiper section with new **Product Groups** section: for each `PRODUCT_GROUPS` entry, render an eyebrow+heading, then a responsive card grid (`row-cols-1 row-cols-sm-2 row-cols-lg-3` or `row-cols-lg-4` depending on group size 3 vs 5) of that group's products. Cards are clickable (button/role, not `<a>`, since they open a modal not navigate) and keep existing `.product-card` visual structure (image, name, price) — drop the always-visible color swatches/description/order-button from the card face (those move into the modal) to keep cards clean per "chủ đạo là các thẻ card sản phẩm".

4. **Product detail modal** — one shared `<div class="modal" id="productModal">` in the DOM (Bootstrap 5 modal), containing: Bootstrap Carousel (`#productModalCarousel`) for `images[]`, product name/description/price/material, color swatches (reuse existing swatch interaction), "Đặt Hàng" button. `app.js`: `initProductModal()` delegates a click listener on the groups container; on card click, look up product by `data-product-id`, populate modal fields + rebuild carousel slides + (re)init the Bootstrap Carousel instance, `bootstrap.Modal.getOrCreateInstance(...).show()`.

5. **Order pre-fill without navigation** — replace `buildOrderUrl(productId, colorName)` (which built an `order.html?...` href) with `prefillOrderForm(productId, colorName)` that sets `productSelect.value`/`colorSelect` directly and dispatches `change`, then the modal's "Đặt Hàng" button does: hide modal → `prefillOrderForm(...)` → `document.getElementById('order').scrollIntoView({behavior: prefersReducedMotion ? 'auto' : 'smooth'})`. Also re-wire `#floatingOrderBtn` and hero/footer CTA `<a href="products.html">`/`href="order.html"` links to same-page anchors (`#products`, `#order`).

6. **Gallery/FAQ/Order sections** — copy the existing markup from `gallery.html`/`faq.html`/`order.html` `<main>` content into `index.html` as `<section id="gallery">`, `<section id="faq">`, `<section id="order">`, in that order after the product groups. No behavior change needed in `initGallery`/`initOrderPage` — they already query by ID and will work unchanged once the elements exist in `index.html`'s DOM.

7. **CSS additions** — `.product-card` gets `cursor: pointer` + focus-visible ring (it's now an interactive trigger); modal content flat (0 radius, `--color-border` divider, no backdrop blur — solid `rgba(23,20,18,.5)` scrim per Bootstrap default is fine, just override modal-content radius/shadow); carousel prev/next icons recolored via `filter` to `--color-ink` (matches existing testimonial-carousel icon-invert pattern in `index.html`).

8. **Cleanup** — delete the 4 old HTML files. Update `components/navbar.html`/`footer.html` reference copies. Update `docs/design-guidelines.md` (Layout section: note single-page IA, list new components: product-group heading, product modal/carousel) and `docs/tech-stack.md` (drop Swiper row + CDN snippet, add one-line note site is now single-page).

## Tests / Validation

- Serve via `python3 -m http.server` + headless Chrome screenshots (as done earlier this session): verify header has no tab nav, product groups render with correct counts (3 / 5), clicking a card opens modal with working carousel (multiple distinct slides, prev/next controls visible/legible), modal "Đặt Hàng" scrolls to and pre-fills the order form, gallery/FAQ/order sections present and functional (GLightbox still opens, accordion still toggles, form submit still shows success panel).
- Verify no `href="products.html"`/`gallery.html`/`faq.html`/`order.html"` remain anywhere (nav, footer, hero CTA, floating button, product cards).
- Re-run the mobile CDP viewport check (390px) done earlier — confirm no horizontal overflow introduced by the new sections/modal.

## Risks / Rollback

- Deleting the 4 HTML files is destructive but low-risk (content is being copied, not lost, into `index.html`; nothing else in the repo links to them after this phase). If something is missed, the plan/journal + this phase file document exactly what moved where for reconstruction.
- Modal + carousel reuse Bootstrap components already loaded (`bootstrap.bundle.min.js`) — no new dependency. Dropping Swiper removes a CDN script/stylesheet pair cleanly (only `index.html` loaded it).
