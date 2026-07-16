---
phase: 3
title: "Products Page"
status: completed
priority: P1
dependencies: [1, 2]
---

# Phase 3: Products Page

## Overview

Build `products.html`: full grid of ≥8 realistic products rendered from the
shared `PRODUCTS` data (defined in Phase 2), each with image/name/description/
price/color options/material/"Order Now" button that deep-links into the
order page with the product preselected.

## Context Links

- `docs/design-guidelines.md` — product card component notes
- Phase 2's `PRODUCTS` data structure (do not redefine, extend if needed)

## Requirements

- Functional: ≥8 distinct products, each fully specified (no placeholder text); "Order Now" navigates to `order.html?product={id}` so Phase 5's form can preselect it.
- Non-functional: responsive grid (1 col mobile, 2 col tablet, 3-4 col desktop); hover-lift + image zoom on card hover; lazy-loaded images.

## Architecture

### Product Data (extend from Phase 2, ≥8 entries)

Realistic Vietnamese product catalog, e.g.:
1. Kẹp Tóc Khắc Tên "Sophia" — Gỗ sồi tự nhiên (natural oak)
2. Kẹp Nơ Ngọc Trai Khắc Tên — Nhựa cao cấp phủ ngọc trai (pearl-coated premium resin)
3. Kẹp Tóc Mini Khắc Tên Bé Gái — Gỗ thông (pine wood, kids)
4. Kẹp Tóc Đính Đá Khắc Tên — Hợp kim mạ vàng (gold-plated alloy + rhinestone)
5. Kẹp Tóc Ruy Băng Lụa Khắc Tên — Lụa + gỗ (silk ribbon + wood)
6. Kẹp Tóc Hoa Cúc Khắc Tên — Nhựa acrylic (acrylic daisy)
7. Bộ Kẹp Tóc Đôi Khắc Tên Cặp Đôi — Gỗ óc chó (walnut, couple/set of 2)
8. Kẹp Tóc Trong Suốt Khắc Tên — Nhựa trong cao cấp (clear acrylic, minimalist)
(Actual final Vietnamese copy written during implementation — these are directional; ensure every product has a genuinely distinct material/description/price, not filler variation.)

Each product object: `{ id, name, description, priceVND, colors: [...], material, image }`.

### Product Card Component

- Large image (4:5 or 1:1, `object-fit:cover`, `loading="lazy"` except above-fold first row), zoom-on-hover via CSS `transform: scale(1.05)` on `.product-img` inside `overflow:hidden` container.
- Name (Playfair), short description (Poppins, 1-2 lines, `-webkit-line-clamp` truncation if needed).
- Price formatted as VND, e.g. `149.000₫`, gold accent color.
- Color swatches: small circular `<button>`s with `background-color` per color hex, `aria-label="Chọn màu {color name}"`, selected state visually distinct (border ring).
- Material pill badge.
- "Đặt Hàng Ngay" (Order Now) button → `order.html?product={id}` (and optionally `&color={selectedColor}` if a swatch was clicked first).

## Related Code Files

- Modify: `products.html` (`<main>` content — grid rendered from `PRODUCTS` via JS, or static HTML per card, pick whichever keeps Phase 2/3 data in sync; JS-rendered from shared array is preferred to avoid divergence)
- Modify: `assets/css/style.css` (product card, swatch, badge styles)
- Modify: `assets/js/app.js` or new `assets/js/products-data.js` (shared `PRODUCTS` array, grid render function)
- Create placeholder image slots: `assets/images/product-0{1-8}.jpg` (reuse Phase 2 teaser images if same products, or add distinct ones for products not featured in the teaser)

## Implementation Steps

1. Finalize the ≥8-product `PRODUCTS` array (real distinct Vietnamese names/descriptions/prices/materials/colors) — shared file/location so `index.html` teaser and `products.html` grid both read from it (avoid duplicating the array; if duplication is unavoidable without a build step, keep it in ONE js file included by both pages).
2. Write a `renderProductCard(product)` function returning card HTML, and `renderProductGrid(products, containerEl)` to populate the grid on page load.
3. Build `products.html` `<main>`: page header ("Sản Phẩm" / Products), grid container (Bootstrap `row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4`), call render function on `DOMContentLoaded`.
4. Wire color swatch click → update selected state + optional `data-selected-color` for the Order Now link.
5. Wire "Order Now" button → `location.href = 'order.html?product=' + product.id`.
6. Add AOS fade-up stagger to cards.
7. Test: verify all 8+ products render with correct data, responsive grid reflows correctly, hover zoom/shadow works, Order Now navigates with correct query param (check via URL bar).

## Success Criteria

- [x] 8 products render, each with distinct realistic name/description/price/material/colors (verified via code read of products-data.js)
- [ ] Grid responsive: 1/2/3-4 columns at mobile/tablet/desktop — NOT verified live (visual); uses standard Bootstrap `row-cols-*` classes
- [ ] Hover-lift + image zoom work — NOT verified live (interactive)
- [x] Order Now correctly passes product id (and color) via query string to `order.html` (verified via code trace of buildOrderUrl)
- [x] No lorem ipsum anywhere on this page (verified via content read)
- [x] All images lazy-loaded with alt text (verified: renderProductCard template includes both)

## Risk Assessment

- **Risk:** product data duplicated between `index.html` teaser and this page drifts out of sync. **Mitigation:** single shared JS data file loaded by both pages (per Phase 2 note).
- **Risk:** query-string preselection breaks if product id format changes later. **Mitigation:** use stable slug-style ids (e.g. `kep-toc-sophia`), documented in the data file.

## Next Steps

Phase 5 reads `?product=` from the URL on `order.html` to preselect the dropdown.
