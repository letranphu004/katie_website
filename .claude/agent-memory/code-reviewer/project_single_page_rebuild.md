---
name: project-single-page-rebuild
description: KatieWeb (Tiệm Tí Bé) collapsed from a 5-page static site to a single index.html on 2026-07-16
metadata:
  type: project
---

KatieWeb ("Tiệm Tí Bé" — Vietnamese personalized hair-clip e-commerce landing site) was restructured on 2026-07-16 from 5 separate pages (`index/products/gallery/faq/order.html`) into one `index.html` with scroll/anchor sections. The 4 non-index pages were deleted. Plan lives at `plans/260716-1030-single-page-catalog/`.

**Why:** Product catalog became the primary content (grouped by material into `PRODUCT_GROUPS`, opens a shared Bootstrap modal+carousel on card click) instead of a separate page; gallery/FAQ/order became sections on the same page reached by anchor scroll instead of nav links.

**How to apply:** When reviewing future changes to this repo, remember there is no build tool and no server-rendered templating — all HTML is static/hand-authored or built via client-side template-literal `.innerHTML` in `assets/js/app.js`. `PRODUCTS`/`PRODUCT_GROUPS` in `assets/js/products-data.js` are the single source of truth consumed by both the product grid and the order form dropdowns.
