# Plan — Single-Page Product Catalog Rebuild

**Status:** Done (2026-07-16) — implemented, code-reviewed, functionally verified via CDP-driven browser tests (desktop + mobile), all reviewer findings resolved.
**Depends on:** Nothing (builds on the CHUU-style CSS system already in place)

## Goal

Collapse the 5-page site (`index/products/gallery/faq/order.html`) into a single `index.html`. Primary content becomes product cards grouped by material family, each opening a Bootstrap modal with a multi-image carousel on click. No tab nav, no hyperlink-based paging — everything reachable by scroll/anchor on one page.

## User Decisions (locked)

- **Grouping:** by material — "Kẹp Gỗ Tự Nhiên" (Sophia, Mini Bé Gái, Cặp Đôi Óc Chó — 3 SP) + "Kẹp Cao Cấp & Đính Đá" (Nơ Ngọc Trai, Đính Đá, Ruy Băng Lụa, Hoa Cúc, Trong Suốt — 5 SP).
- **Carousel images:** each product gets an `images[]` array — main product SVG + 2 existing gallery placeholder SVGs, cycled across products (real photos drop in later, structure already supports N images).
- **Gallery/FAQ/Order:** kept as sections on the single page (`#gallery`, `#faq`, `#order`), not dropped.
- **Old page files:** `products.html`, `gallery.html`, `faq.html`, `order.html` deleted once content is merged.

## Phases

1. [phase-01-single-page-rebuild.md](phase-01-single-page-rebuild.md) — data model, index.html rebuild, app.js rework, CSS additions, cleanup, docs sync.

## Acceptance Criteria

- `index.html` is the only page; header has logo + single "Đặt Hàng" CTA (smooth-scrolls to `#order`), no multi-item nav.
- Two product groups render as titled sections, 3 and 5 cards respectively, using existing `PRODUCTS` data extended with `group`/`images`.
- Clicking any product card opens a Bootstrap modal with a working carousel (multiple slides), product name/description/price/material/color swatches, and an "Đặt Hàng" button that closes the modal, smooth-scrolls to `#order`, and pre-fills product+color in the order form.
- Gallery masonry (GLightbox), FAQ accordion, and the full order form (with live engraving preview) all present as sections on the same page and functionally identical to their current per-page behavior.
- `products.html`, `gallery.html`, `faq.html`, `order.html` removed from disk; no remaining links to them.
- `components/navbar.html`, `components/footer.html`, `docs/design-guidelines.md`, `docs/tech-stack.md` updated to reflect the single-page structure.
- No new lint/console errors; page works when opened directly via `file://` (per existing no-build-tool constraint) and via local HTTP server.
