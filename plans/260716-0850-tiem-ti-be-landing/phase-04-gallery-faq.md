---
phase: 4
title: "Gallery & FAQ Pages"
status: completed
priority: P2
dependencies: [1]
---

# Phase 4: Gallery & FAQ Pages

## Overview

Build `gallery.html` (masonry image gallery with GLightbox popup, 4 categories)
and `faq.html` (Bootstrap accordion with realistic Vietnamese Q&A). Both are
independent of Phases 2-3 and can be built in either order.

## Context Links

- `research/researcher-02-accessible-animation.md` — GLightbox masonry + grouping + focus-return fix

## Requirements

- Functional: gallery shows lifestyle / packaging / customer photos / close-up engraving categories, each image opens in GLightbox popup; FAQ accordion answers the 4 specified questions plus any reasonable additional ones.
- Non-functional: masonry layout responsive (CSS `columns`); GLightbox keyboard-accessible (built-in) with focus restored to trigger on close (known bug, needs explicit fix); FAQ accordion keyboard-operable (Bootstrap default is accessible).

## Architecture

### Gallery (`gallery.html`)

- CSS masonry via `columns: 1` (mobile) / `columns: 2` (tablet) / `columns: 3` (desktop) on `.gallery-masonry`, `break-inside: avoid` on items.
- Optional category filter buttons (Bootstrap button group: Tất cả/All, Đời thường/Lifestyle, Đóng gói/Packaging, Khách hàng/Customer, Cận cảnh khắc/Engraving close-up) — simple JS show/hide by `data-category` attribute (nice-to-have, not blocking if time-constrained; masonry works fine ungrouped too).
- Each item: `<a href="{full-image}" class="glightbox" data-gallery="{category}" data-title="{caption}"><img src="{thumb}" alt="{descriptive alt text}" loading="lazy"></a>`
- Init: `const lightbox = GLightbox({selector: '.glightbox'});` + focus-restore fix:
  ```js
  lightbox.on('close', () => {
    document.activeElement?.blur();
    lastFocusedTrigger?.focus();
  });
  ```
  (track `lastFocusedTrigger` on each `.glightbox` click, or use GLightbox's own active-slide element reference if it exposes the trigger — confirm exact API when implementing; fallback: refocus the gallery container.)
- ≥12-16 placeholder image slots across the 4 categories (real photos supplied later by business owner).

### FAQ (`faq.html`)

- Bootstrap Accordion (`accordion` component), gold `+`/`-` custom icon via CSS on `::after` or Bootstrap Icons swapped via JS on `data-bs-toggle`.
- Questions (Vietnamese, with realistic answers — no lorem ipsum):
  1. Khắc tên mất bao lâu? (How long does engraving take?) — e.g. "Kẹp tóc được khắc trong 1-2 ngày làm việc sau khi xác nhận đơn hàng."
  2. Khắc được tối đa bao nhiêu ký tự? (How many letters?) — e.g. state a realistic character limit based on clip size, note diacritics (Vietnamese accents) supported.
  3. Thời gian giao hàng là bao lâu? (Shipping time?) — e.g. "2-4 ngày nội thành, 3-6 ngày toàn quốc qua [carrier]."
  4. Tôi có thể xem trước mẫu khắc không? (Can I preview?) — reference the live preview on the Order page.
  - Add 2-3 more realistic questions if natural (payment method /cách đặt hàng, đổi trả /returns) — optional, don't pad artificially.

## Related Code Files

- Modify: `gallery.html`, `faq.html` (`<main>` content)
- Modify: `assets/css/style.css` (masonry columns, gallery item styles, accordion gold icon override)
- Modify: `assets/js/app.js` (GLightbox init + focus-restore fix, optional category filter logic)
- Create placeholder image slots: `assets/images/gallery-lifestyle-0{1-4}.jpg`, `gallery-packaging-0{1-4}.jpg`, `gallery-customer-0{1-4}.jpg`, `gallery-engraving-0{1-4}.jpg`

## Implementation Steps

1. Build `gallery.html` masonry markup with ≥12 image slots across 4 categories, correct `data-gallery` grouping.
2. Init GLightbox in `app.js`, implement focus-restore fix, verify ESC/arrow-key nav works.
3. (Optional) add category filter buttons + JS toggle.
4. Build `faq.html` accordion with the 4 required Q&A (+ optional extras), realistic Vietnamese answers.
5. Style accordion toggle icon with gold color per design guidelines.
6. Test: click through gallery images, verify lightbox opens/closes/navigates, focus returns to trigger; verify accordion expands/collapses, only one section open at a time (or independent, per Bootstrap default `accordion` behavior — confirm which is desired, default is exclusive).

## Success Criteria

- [ ] Gallery masonry responsive at 3 breakpoints, all images open in GLightbox — NOT verified live (visual/interactive)
- [ ] GLightbox keyboard nav + focus-restore-on-close — NOT verified live; focus-restore fix implemented per research (`lastFocusedTrigger.focus()` on close event)
- [x] FAQ accordion answers all 4 required questions with realistic Vietnamese copy, no lorem ipsum (verified via content read)
- [x] Accordion keyboard-operable (native Bootstrap `<button>`-based accordion markup, inherently keyboard-accessible)

## Risk Assessment

- **Risk:** GLightbox focus-restore API may differ slightly from the researched pattern by version. **Mitigation:** verify against the actual loaded GLightbox version's docs/console during implementation; fallback to manually tracking `lastFocusedTrigger` via each anchor's own click handler if the `close` event doesn't expose what's needed.

## Next Steps

None — independent leaf phase, feeds into Phase 6 polish pass.
