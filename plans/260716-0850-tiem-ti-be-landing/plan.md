---
title: "Tiệm Tí Bé — Engraved Hair Clip Landing Site"
description: "Static Bootstrap 5.3 + vanilla JS landing site for a Vietnamese personalized engraved hair-clip business: browse products, view gallery, submit order form."
status: completed
priority: P2
tags: [frontend, static-site, no-build]
blockedBy: []
blocks: []
created: 2026-07-16
---

# Tiệm Tí Bé — Engraved Hair Clip Landing Site

## Overview

5-page static site (Home, Products, Gallery, FAQ, Order) for an engraved hair-clip
handmade boutique. Bootstrap 5.3.8 + vanilla HTML/CSS/JS only, no build tools.
Luxury+cute+Korean-handmade design (blush/pink/gold palette, 24px radius,
glassmorphism, AOS scroll animations). Order form POSTs to `/api/order` with
localStorage fallback — no payment, no backend in this phase. Vietnamese
copy/VND pricing. Image files supplied later by the business owner; site ships
with correctly-sized placeholder image slots.

Full context: `docs/tech-stack.md`, `docs/design-guidelines.md`,
`plans/260716-0850-tiem-ti-be-landing/research/`.

## Key Decisions From Research

- **Navbar/footer sharing:** duplicate markup across all 5 pages (not fetch+innerHTML)
  — `fetch()` fails under `file://` (CORS), and this site must be openable by
  double-clicking `index.html`, not just via a dev server. See
  `research/researcher-01-component-includes.md`. `/components/navbar.html` and
  `/components/footer.html` are kept as the canonical source snippets a human
  copies from — not loaded at runtime.
- **Parallax hero:** JS scroll-linked `transform: translateY()`, not
  `background-attachment: fixed` (broken on iOS Safari). See
  `research/researcher-02-accessible-animation.md`.
- **prefers-reduced-motion:** disables AOS (`AOS.init({disable: matchMedia(...).matches})`)
  and the parallax transform together.
- **GLightbox:** group via `data-gallery="category"`; manually restore focus to
  trigger element on close (known focus-return bug).

## Phases

| Phase | Name | Status |
|-------|------|--------|
| 1 | [Foundation & Shared Shell](./phase-01-foundation-shell.md) | Completed |
| 2 | [Home Page](./phase-02-home-page.md) | Completed |
| 3 | [Products Page](./phase-03-products-page.md) | Completed |
| 4 | [Gallery & FAQ Pages](./phase-04-gallery-faq.md) | Completed |
| 5 | [Order Page & JS Logic](./phase-05-order-page-logic.md) | Completed |
| 6 | [Polish: A11y, SEO, Cross-Page QA](./phase-06-polish-a11y-seo.md) | Completed |

## Post-Implementation Notes

One code-review cycle ran and found/fixed: brand-name typo (index.html navbar), gold-on-white
WCAG contrast failures (floating order CTA, outline-button hover/focus, hero subtitle),
`prefers-reduced-motion` not covering Swiper/Bootstrap carousel autoplay, an unhandled
localStorage-failure exception path in the order submit flow, missing `docs/README.md`,
missing `og:image`. All fixed and re-verified via static analysis (HTML tag-balance check,
JS syntax check, DOM id/class cross-reference, `curl` confirmation of the localStorage
fallback trigger path).

**Not verified:** live browser rendering/interaction — this sandbox has no display server
(no `chromium-cli`/Playwright install possible on the outdated Node runtime, Chrome
extension declined, headless Safari has no GUI session). User to spot-check manually
(see `docs/README.md` "Preview locally").

Phases 2-4 depend on Phase 1 (shared CSS tokens, navbar/footer snippet, base JS).
Phase 5 depends on Phase 3 (needs product IDs/data for the order-select dropdown).
Phase 6 depends on all prior phases.

## Dependencies

- No existing codebase (greenfield). No cross-plan dependencies (no other
  unfinished plans in `plans/`).
- External: CDN availability for Bootstrap/AOS/Swiper/GLightbox/Google Fonts
  (see `docs/tech-stack.md` for pinned versions/links).

## Acceptance Criteria

- All 5 pages open correctly via `file://` (double-click) with no console errors.
- Every animation/effect works and respects `prefers-reduced-motion`.
- Order form validates required fields, live-previews the engraved name, and on
  submit either POSTs to `/api/order` or falls back to `localStorage` with a
  visible "Đặt hàng thành công" success state — verified by testing with no
  backend present (expected path for this phase).
- Lighthouse (or manual check) accessibility: labelled form fields, alt text on
  all images, sufficient text contrast, keyboard-reachable interactive elements.
- No lorem ipsum; ≥8 realistic Vietnamese products with distinct names/descriptions/prices.
