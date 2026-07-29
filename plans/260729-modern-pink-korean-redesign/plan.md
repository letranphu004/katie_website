# Modern Pink Korean-Fashion Redesign

Status: done — tested in browser (agent-browser CLI over CDP), all flows verified

Two real bugs found and fixed during testing:
- GSAP `.from()` + `ScrollTrigger` immediateRender gotcha left `.reveal`/`.reveal-stagger`
  elements permanently offset (`transform: translate(0, 36px)`) even after opacity
  reached 1 — fixed by adding `immediateRender: false` to both tweens in `initMotion()`.
- The product detail modal's "Đặt Hàng Ngay" button could fall below the viewport on
  combo products (4 color-pick rows) with no way to reach it — fixed by adding
  `modal-dialog-scrollable` to `#productModal`'s dialog.

## Why

User asked for a full redesign of the single-page site: keep landing-page format and
pink tone, but modernize the style with heavy motion/animation, drop the current
boxy/segmented section structure for a more fluid flow between components, reference
top Korean fashion e-commerce sites (Musinsa, Style Nanda, Zigzag, W Concept, 29CM), and
show products as image-only cards (the source images already bake in name/price/info).

This reverses the prior "Korean Editorial Minimalist" black/white/no-motion direction
recorded in `docs/design-guidelines.md` — that reversal is the explicit new instruction,
not an audit-driven change.

## Decisions

- **Palette**: vivid pink `#FF4FA0` accent, blush `#FFE4EF` / cream `#FFF8FA` surfaces,
  warm near-black `#2A1A22` ink for text contrast. No gold, no muted-rose-only accent.
- **Motion stack**: swap AOS for GSAP + ScrollTrigger (CDN, no build step) — marquee,
  scroll reveals, hover tilt/magnetic buttons, floating hero blobs, animated timeline
  progress line, count-up. All gated behind `prefers-reduced-motion`.
- **Structure**: remove hard-bordered stacked boxes.
  - Hero → looping marquee ribbon (motion transition, not a hard border) → asymmetric
    bento "why choose us" → single chip-filtered product image gallery (replaces 6
    stacked bordered product-group sections) → horizontal scroll-snap "how it works" →
    gallery masonry → FAQ → order → footer.
- **Product display**: cards show image only (no name/material/price text). Product
  detail modal keeps carousel + color swatches + order CTA, drops the redundant
  name/description/price text block (kept as sr-only heading for accessibility).
- Keep Bootstrap (grid/modal/carousel/accordion), GLightbox, and all order-flow JS
  (`submitOrder`, `prefillOrderForm`, validation) unchanged — only presentation/motion
  and product-card rendering change.

## Files

- `assets/css/style.css` — full rewrite of tokens + components
- `index.html` — restructure sections, swap AOS→GSAP CDN tags
- `assets/js/app.js` — swap AOS init for GSAP reveals/marquee/tilt, image-only card
  render, chip filter logic, trim modal population for removed fields
- `components/navbar.html`, `components/footer.html` — sync with index.html
- `docs/design-guidelines.md`, `docs/tech-stack.md` — reflect new palette/motion/structure

## Acceptance

- Site opens via `file://` (no server) same as before.
- Product gallery filters correctly by group; clicking a card still opens modal, color
  pick + order handoff still work end to end.
- Animations respect `prefers-reduced-motion: reduce`.
- Docs match implemented decisions.
