# Design Guidelines — Tiệm Tí Bé

Style: **Modern Pink, Korean-Fashion-Catalog-Inspired** — reference: category-filtered
catalogs and bold, motion-heavy editorial pages from Musinsa, Style Nanda, Zigzag,
W Concept, 29CM. Vivid pink is the brand color (not a muted accent); heavy scroll-driven
motion; soft-rounded "sheet" sections replace hard-bordered boxes.

This supersedes the earlier "Korean Editorial Minimalist" (black/white, no motion)
direction below — reversed 2026-07-29 on explicit user request to modernize with pink
tone and heavy animation.

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#FFF8FA` | Page background (warm cream, not stark white) |
| `--color-surface` | `#FFFFFF` | Cards, form surfaces, modal |
| `--color-surface-muted` | `#FFE9F2` | Alternating section backgrounds (blush) |
| `--color-surface-muted-2` | `#FFD6E8` | Deeper blush accents |
| `--color-ink` | `#2A1420` | Body text, headings — warm near-black, high contrast on white/blush |
| `--color-ink-soft` | `#8A6072` | Secondary/muted text |
| `--color-accent` | `#FF3D96` | Primary brand pink — buttons, gradients, active states, icons |
| `--color-accent-deep` | `#C4166B` | Text-safe accent — links, eyebrow labels, price-adjacent text |
| `--color-accent-soft` | `#FFB8DD` | Decorative-only tint (marquee text, subtle fills) |
| `--color-border` / `--color-border-strong` | `#FFD6E8` / `#FF9BC8` | Hairline dividers, card borders |

`--gradient-accent` (`#FF6FB0 → #FF3D96 → #C4166B`) drives buttons, active chips, badges,
and gradient text — the palette's signature move.

## Typography

- **Single family:** Be Vietnam Pro (400–900) for full Vietnamese diacritic support.
- **Headings:** 800–900 weight, letter-spacing -0.01em to -0.02em, big scale at hero
  (`clamp(2.4rem, 6vw, 4.5rem)`).
- **Eyebrow/labels:** uppercase, +0.14em letter-spacing, deep-pink, prefixed with a short
  accent dash (`.eyebrow::before`).
- **Engraving preview text** (`.preview-engrave-text`, `--font-engrave`): "Cooper Std Black
  Italic" — self-hosted (`assets/fonts/CooperStdBlackItalic.ttf`, user-supplied/licensed —
  do not redistribute without checking the license), matching the bold bubble-serif look
  of the real engraved product photos. Falls back to Fredoka, then Be Vietnam Pro — Cooper
  Std has no Vietnamese diacritics, so accented characters render per-glyph in the fallback
  fonts automatically.

## Shape & Surface

- **Border radius:** `--radius: 22px` on cards/buttons/images — soft, modern, not flat.
  `--radius-pill` for buttons, chips, and badges.
- **Shadows:** soft pink-tinted glow shadows (`--shadow-soft`, `--shadow-pop`) on hover
  and on primary buttons/badges — replaces the old flat hairline-only depth model.
- **Sheet sections:** `.section--sheet` rounds a section's top corners and pulls it up
  over the previous section (`margin-top: -40px`) instead of a hard `border-top` divider
  — used on the product gallery and order sections for a layered, non-boxy transition.

## Motion

- **Stack:** GSAP + ScrollTrigger (CDN), replacing AOS — AOS's fade-up-only was too thin
  for the "heavy animation" brief. Progressive enhancement: elements are fully visible by
  default in CSS; GSAP sets the hidden state itself (`gsap.from(...)`), so a blocked CDN
  or `prefers-reduced-motion: reduce` leaves content static and visible rather than stuck
  hidden.
- `.reveal` — single element fades/slides in on scroll. `.reveal-stagger` — direct
  children stagger in (bento grid, timeline row, product gallery). The photo gallery
  filmstrip (`.gallery-strip`) uses a single `.reveal` on its wrapper instead, since its
  items scroll horizontally out of the initial viewport.
- Hero: floating blurred gradient blobs (`.hero__blob`, pure CSS `@keyframes`), a bouncing
  scroll cue, and a rotated marquee ribbon overlapping the hero's bottom edge.
- Marquee (`.marquee`): pure CSS infinite loop, pauses on hover, disabled under reduced
  motion.
- Timeline: a connecting track (`.timeline-track__fill`) scrubs its width from the
  section's scroll position via ScrollTrigger.
- Stat counters (`.counter[data-target]`): count up once when scrolled into view.
- `.magnetic` buttons (hero CTA, submit, floating order button) subtly follow the cursor
  on pointer-fine devices; skipped on touch and under reduced motion.
- `prefers-reduced-motion: reduce` disables all of the above (blobs, marquee, magnetic,
  ScrollTrigger reveals, hover transforms) — see the media query at the end of
  `style.css`.

## Layout

- **Single page**, same anchor sections as before (`#san-pham`, `#gallery`, `#faq`,
  `#order`), but no longer stacked as uniform bordered boxes:
  hero → marquee → engraving-preview showcase (video + interactive tile) →
  chip-filtered product gallery → horizontal timeline → photo filmstrip → FAQ → order →
  footer.
- Mobile-first Bootstrap grid; bento collapses to 2 columns (`md`) then 1 (`sm`).
- Sticky navbar: translucent blush blur, pink-gradient wordmark, gradient-pill CTA.

## Accessibility

- Body text on `--color-bg`/`--color-surface-muted` uses `--color-ink` (verified 4.5:1+).
- All interactive elements keyboard-reachable; focus-visible outline in
  `--color-accent-deep`.
- `prefers-reduced-motion: reduce` disables decorative animation and hover transforms.
- Alt text on every image; form fields have associated `<label>`s.
- The product-detail modal's `<h2 id="productModalLabel">` is visually hidden but still
  set to the product name via JS, so screen-reader users still get an accessible name
  even though the visible modal has no text title.
- Product card `alt` text and the modal's `#productModalDesc` (visually hidden) repeat
  name/material/price/description as real text — the source images bake that info in
  visually, but a screen reader can't read pixels, so it has to exist as text somewhere.

## Component Notes

- **Product gallery:** all products render as a single chip-filtered image grid
  (`#filterChips` + `#productGroups`), not stacked per-group boxed sections. Cards show
  **only the product image** — no name/material/price text — because the source images
  already bake in that information (see `docs/tech-stack.md`). Clicking a chip filters
  the grid with a GSAP fade transition; clicking a card still opens the detail modal.
- **Product card:** whole card is the click/tap target (`role="button" tabindex="0"`).
  Hover: image scales + tilts slightly, card lifts with a soft shadow. Combo-group cards
  get a pulsing "Best Seller" pill badge (decorative, not baked into the image).
- **Product detail modal:** carousel (full `images[]`) + color swatches + "Đặt Hàng Ngay"
  button only — no redundant name/description/price text block. `<h2>` title kept for
  accessibility only (visually hidden).
- **Engraving-preview showcase** (replaces the old "why choose us" bento): two matched
  tiles side by side — a looping video tile (`.bento__item--video`) and an interactive
  live-preview tile (`.bento__item--preview`) where typing a name updates
  `#heroPreviewText` and, on CTA click, appends "Tên muốn khắc: &lt;name&gt;" into the
  contact form's message field (`appendToContactNote()`) — there's no engraving field on
  `#order` to prefill directly anymore. Stat counters live inline inside the preview tile,
  not as separate cards.
- **Photo gallery** (`#gallery`): a horizontal, edge-to-edge filmstrip (`.gallery-strip`),
  not a grid — smaller (168–200px) staggered cards (alternating `--offset-y` per
  `nth-child`), scroll-snap, side arrow buttons, and click-and-drag scrolling for mouse
  users (`initGalleryStrip()` in `app.js`). GLightbox still opens on click; a drag is
  distinguished from a click so dragging doesn't also pop the lightbox.
- **Timeline (How It Works):** 4 cards in a row (desktop) with a shared gradient progress
  line that fills as the section scrolls into view, instead of per-step circle-and-dashed
  connectors.
- **FAQ:** Bootstrap Accordion, rounded items, open state gets the gradient-pink fill.
- **Contact form** (`#order`): name, phone, Facebook/Zalo, and a required free-text message
  only — no address/product/color/engraving/quantity fields. Product interest and
  engraving ideas from elsewhere on the page arrive here as text in the message field via
  `appendToContactNote()`, not as structured form fields.
