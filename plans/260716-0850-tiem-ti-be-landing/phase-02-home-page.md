---
phase: 2
title: "Home Page"
status: completed
priority: P1
dependencies: [1]
---

# Phase 2: Home Page

## Overview

Build `index.html`'s `<main>`: parallax hero, Why Choose Us, product teaser
slider (Swiper), How It Works timeline, testimonials carousel, FAQ preview,
final CTA. Depends on Phase 1's CSS tokens/JS chrome.

## Context Links

- `docs/design-guidelines.md` — motion rules, component notes
- `research/researcher-02-accessible-animation.md` — parallax + Swiper patterns

## Requirements

- Functional: all Home sections per brief, in order: hero → why-choose-us → product teaser → how-it-works → testimonials → FAQ preview → footer.
- Non-functional: hero readable/legible over background at all viewport sizes; parallax + sparkle decorations respect reduced-motion; images lazy-loaded except the hero (above-the-fold, load eagerly).

## Architecture

### Hero
- Full-viewport-height section, soft pink gradient background (`linear-gradient` using `--color-blush-bg` → `--color-pink-soft`).
- Floating ribbon/sparkle decorative elements: absolutely positioned SVG/CSS shapes, `aria-hidden="true"`, low opacity, CSS keyframe drift/rotate.
- Parallax: JS scroll listener applies `translateY(scrollY * 0.3)` to a background decoration layer (not the text content — keep headline/CTA static/readable). Gate behind reduced-motion check from Phase 1.
- Headline (Playfair, large): "Personalized Hair Clips Made Just For You"
- Sub text (Poppins): "Khắc tên của bạn. Độc bản. Đáng yêu. Món quà hoàn hảo." (Vietnamese: "Engrave your name. Unique. Cute. Perfect gift.")
- CTA button "Mua Ngay" (Shop Now) → `products.html`, gold-accent pill button, hover-lift.

### Why Choose Us
- 3 glass cards, Bootstrap grid, Bootstrap Icons: `bi-gem` (Khắc tên cá nhân hóa / Personalized engraving), `bi-gift` (Món quà hoàn hảo / Perfect gift), `bi-truck` (Giao hàng toàn quốc / Nationwide delivery). AOS `fade-up` staggered.

### Product Teaser (Swiper)
- Swiper slider showing 4-6 featured products (subset of Phase 3's full catalog — define product data once, reuse). Each slide = mini product card (image, name, price) linking to `products.html#product-{id}`.
- Swiper config: `loop:true`, `pagination`, `autoplay: {delay:5000}`, `breakpoints` for 1/2/3 slides per view by viewport.

### How It Works
- 4-step timeline: Chọn Mẫu (Choose Design) → Nhập Tên (Enter Name) → Xác Nhận Đơn (Confirm Order) → Nhận Sản Phẩm Handmade (Receive Handmade Product). Vertical connector on mobile, horizontal on desktop, gold dotted line + arrow, numbered glass cards, AOS fade-up per step with incrementing `data-aos-delay`.

### Testimonials
- Carousel (Bootstrap Carousel or simple custom JS) — 4-5 Vietnamese customer testimonials, avatar circle (placeholder image), 5 gold `bi-star-fill` icons, short quote, customer first name.

### FAQ Preview
- 2-3 of the 4 FAQ questions (teaser), "Xem tất cả câu hỏi" (See all FAQs) link → `faq.html`.

### Final CTA
- Simple banner section before footer reinforcing Shop Now CTA.

## Related Code Files

- Modify: `index.html` (`<main>` content)
- Modify: `assets/css/style.css` (hero gradient/sparkle/ribbon keyframes, timeline connector, testimonial card styles)
- Modify: `assets/js/app.js` (parallax scroll handler, Swiper init for teaser, testimonial carousel init if custom)
- Create placeholder image slots under `assets/images/`: `hero-bg.jpg`, `product-teaser-0{1-6}.jpg`, `testimonial-avatar-0{1-5}.jpg`

## Implementation Steps

1. Define a single shared JS product data array/object (e.g. `const PRODUCTS = [...]` in `app.js` or a separate `assets/js/products-data.js` loaded before `app.js`) with ≥8 realistic Vietnamese products (id, name, description, price in VND, colors[], material, image). Phase 3 consumes the same data for the full grid — define it now so both pages stay consistent.
2. Build hero markup + parallax decoration layer + sparkle/ribbon CSS shapes.
3. Wire parallax JS (scroll listener, reduced-motion gated) in `app.js`.
4. Build Why Choose Us 3-card grid with AOS.
5. Build product teaser Swiper section, rendering slides from `PRODUCTS` (first 6) via JS templating (`innerHTML`/`createElement`), init Swiper after render.
6. Build How It Works timeline (static HTML, Bootstrap grid + custom connector CSS).
7. Build testimonials carousel with realistic Vietnamese quotes (no lorem ipsum).
8. Build FAQ preview teaser section (static HTML, first 2-3 Q&A, matches Phase 4's FAQ page content so no contradiction).
9. Test in browser: hero legible, parallax smooth, Swiper swipes on mobile viewport (DevTools device toolbar), AOS animations fire once on scroll, reduced-motion disables parallax + AOS (verify via DevTools emulation).

## Success Criteria

- [ ] Hero renders with legible text over gradient+decorations at 375px, 768px, 1440px widths — NOT verified live; hero-subtitle color darkened during review to guarantee contrast across the full gradient
- [x] Parallax visible on scroll, disabled under reduced-motion (code verified; Swiper autoplay also gated during review)
- [ ] Swiper teaser swipes/paginates correctly — NOT verified live (interactive); slide data-render from PRODUCTS confirmed via code
- [ ] Timeline readable on mobile (stacked) and desktop (horizontal) — NOT verified live (visual)
- [ ] Testimonials carousel cycles — NOT verified live (interactive); no lorem ipsum confirmed via content read
- [x] All images have alt text; teaser images lazy-loaded (hero has no `<img>`, CSS gradient only) — verified via grep

## Risk Assessment

- **Risk:** parallax transform applied to text causes readability/jank. **Mitigation:** parallax only on background decoration layer, never on headline/CTA text.
- **Risk:** product data duplicated/diverges between home teaser and Phase 3 products page. **Mitigation:** single shared `PRODUCTS` array consumed by both pages.

## Next Steps

Phase 3 builds the full products grid from the same `PRODUCTS` data.
