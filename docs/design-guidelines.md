# Design Guidelines — Tiệm Tí Bé

Style: **Korean Fashion Editorial Minimalist** — reference: CHUU (en.chuu.co.kr). Neutral black/white/ivory UI chrome; color and warmth come from product photography, not from page backgrounds. No glassmorphism, no gold, no pill buttons, no decorative motion.

## Color Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#FFFFFF` | Page background |
| `--color-surface-muted` | `#F6F3F0` | Alternating section backgrounds, muted surfaces (subtle warm off-white, not colored) |
| `--color-white` | `#FFFFFF` | Cards, form surfaces |
| `--color-ink` | `#171412` | Body text, headings, buttons, structural borders — near-black, 15:1+ contrast on white |
| `--color-ink-soft` | `#6B6660` | Secondary/muted text — 5.6:1 contrast on white |
| `--color-accent` | `#8F4A5D` | Text-safe accent (6.3:1 on white) — price, active nav link, links. Sparing use only |
| `--color-accent-bright` | `#B4677A` | Decorative-only accent (borders, swatch selection ring) — do not use for body text (fails 4.5:1) |
| `--color-border` | `#E4E0DA` | Hairline dividers, card borders, input borders |
| `--color-border-strong` | `#171412` | Structural black dividers (nav bottom border on scroll, timeline connector) |

No gold. The old pink-primary/gold palette is retired — `--color-accent` carries the brand's rose DNA at a muted, text-safe level, used only where it needs to draw the eye (price, active state), never as a fill or background.

## Typography

- **Single family:** Be Vietnam Pro (400–800) for both headings and body — no serif pairing. Chosen for full Vietnamese diacritic support and a clean geometric-humanist character close to CHUU's wordmark/UI type.
- **Headings:** 700–800 weight, letter-spacing -0.01em to -0.02em at large sizes (hero).
- **Body:** 400 weight, line-height 1.6+.
- **Eyebrow/labels/captions:** uppercase, letter-spacing +0.06em to +0.14em, 600–700 weight, small size (0.7–0.8rem) — mirrors CHUU's "New In" / "LOOK 01" micro-labels.

## Shape & Surface

- **Border radius:** `--radius: 0px` on cards, buttons, product/gallery images, form inputs. `--radius-sm: 2px` reserved for small elements (badges, accordion). `--radius-pill` only for genuinely circular elements (avatars, color swatches, icon rings) — never for buttons.
- **Shadows:** none, anywhere. Depth and separation come from 1px hairline borders (`--color-border`) and, on hover/scroll, from a strengthened black border (`--color-border-strong`).
- **No glassmorphism, no blur.** Nav is flat white with a 1px bottom border that darkens on scroll.

## Motion

- AOS: `fade-up` for section content, kept subtle (this is a UX carry-over, not part of CHUU's static aesthetic — acceptable since it's a functional reveal, not decoration).
- No floating/decorative animation (no ribbons, sparkles, parallax hero) — removed as inconsistent with a static, photography-led editorial look.
- Hover: product/gallery images zoom subtly (`scale(1.04)`); cards do not lift or gain shadow. Buttons invert fill/text color over 200ms `cubic-bezier(0.4,0,0.2,1)` (no bounce/overshoot easing).

## Layout

- **Single page.** All content (hero, product groups, gallery, FAQ, order form) lives in `index.html` as stacked `<section>`s reached by scroll or same-page anchor (`#san-pham`, `#gallery`, `#faq`, `#order`) — no separate HTML files, no tab nav.
- Mobile-first Bootstrap grid (`container`, `row`, `col-*`), breakpoints: stack to 1 column <576px, 2 columns products on `sm`/`md`, 3 on `lg+`.
- Generous whitespace: section vertical padding min `5rem` desktop / `3rem` mobile.
- Sticky navbar: flat white, thin bottom border, border darkens + padding tightens on scroll (no shadow, no shrink-blur). Just brand + a single "Đặt Hàng" CTA — no menu items to manage.
- Product/gallery images: `object-fit: cover`, lazy-loaded (`loading="lazy"`), zero border-radius, edge-to-edge or thin-gap grid.

## Accessibility

- Body text min 4.5:1 contrast against `#FFFFFF`/`#F6F3F0` (use `--color-ink`, not `--color-accent-bright`, for paragraph text).
- `--color-accent` (`#8F4A5D`) is verified 4.5:1+ AA for normal text on white; `--color-accent-bright` is decorative-only (borders/rings), not for text.
- All interactive elements keyboard-reachable; focus-visible outline in `--color-ink`.
- `prefers-reduced-motion: reduce` disables transitions on buttons/cards/images.
- Alt text on every image; form fields have associated `<label>`s.

## Component Notes

- **Product groups:** products grouped by material family (`PRODUCT_GROUPS` in `products-data.js`) into titled sections, each a 3-column card grid (3–5 cards/group). Card face is minimal — image (4:5) → name → price only, no description/swatches/button on the card itself.
- **Product card:** the whole card is the click/tap target (`role="button" tabindex="0"`, not an `<a>` — it opens a modal, it doesn't navigate). Hover/focus: image zooms subtly, border strengthens.
- **Product detail modal:** Bootstrap modal + Bootstrap Carousel (`images[]` per product — main shot + supplementary gallery placeholders until real photography lands), description/price/material, color swatches, and an "Đặt Hàng Ngay" button that closes the modal, pre-fills the order form via `prefillOrderForm(productId, colorName)`, and smooth-scrolls to `#order`. Flat styling: 0 radius, hairline border, no shadow; carousel prev/next are 44px ink-filled circles (touch target + contrast over photography).
- **Timeline (How It Works):** 4 numbered cards, black-outline circle numerals, connected by a thin black dashed connector (desktop only).
- **Testimonial carousel:** Bootstrap Carousel, avatar circle with black ring + 5-star rating + short Vietnamese quote.
- **FAQ:** Bootstrap Accordion, hairline-bordered items, muted-surface fill on open (no colored icon filter).
- **Live order preview:** hairline-bordered neutral card, engraved name text updating live via `input` event, black divider line, centered.
