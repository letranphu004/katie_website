---
phase: 6
title: "Polish: A11y, SEO, Cross-Page QA"
status: completed
priority: P2
dependencies: [1, 2, 3, 4, 5]
---

# Phase 6: Polish — Accessibility, SEO, Cross-Page QA

## Overview

Final pass across all 5 pages: accessibility audit, SEO meta tags, performance
checks (lazy loading, image sizing), cross-page consistency (navbar/footer
identical, active-nav-link highlighting), and end-to-end manual QA of every
interactive feature. No new features — verification + targeted fixes only.

## Requirements

- Functional: every interactive element from Phases 1-5 works correctly together on a full pass through all 5 pages.
- Non-functional: WCAG-reasonable contrast, keyboard nav, screen-reader-sane markup (landmarks, alt text, labels), valid semantic HTML, per-page SEO meta, `prefers-reduced-motion` respected everywhere (not just Phase 1/2's animations — re-check Phase 4's gallery transitions too).

## Architecture

N/A — audit/fix phase, no new architecture.

## Related Code Files

- Modify: all 5 HTML pages (meta tags, alt text fixes, active-nav-link class, any a11y fixes found)
- Modify: `assets/css/style.css` (contrast fixes if found, focus-visible states)
- Modify: `assets/js/app.js` (any bug fixes found during QA)
- Create: `docs/README.md` (project overview, how to preview locally, how to deploy, how to swap in real images, how to swap in a real backend for `/api/order`)

## Implementation Steps

1. **Cross-page consistency:** diff navbar/footer markup across all 5 pages — must be identical (per Phase 1's duplication decision). Add `aria-current="page"` / active-link styling to the navbar item matching the current page.
2. **SEO meta pass:** unique `<title>` and `<meta name="description">` per page, matching actual page content (no generic copy-pasted description); Open Graph tags (`og:title`, `og:description`, `og:image` placeholder) on `index.html` at minimum.
3. **Accessibility pass:**
   - Run a contrast check on all text-over-background pink combinations (blush/pink-soft backgrounds with `--color-ink` text should already pass; verify gold-on-white and gold-on-pink for buttons/accents specifically, as gold accents are the most likely to fail contrast — adjust gold usage to text-on-white or keep as border/icon-only if body text contrast fails).
   - Verify every `<img>` has meaningful `alt` (empty `alt=""` only for decorative sparkle/ribbon images).
   - Verify every form input in `order.html` has an associated `<label>`.
   - Tab through every page keyboard-only; verify focus is visible (gold focus-visible outline per design guidelines) and tab order is logical.
   - Verify `prefers-reduced-motion: reduce` (DevTools emulation) disables: hero parallax, AOS fade-ins, sparkle/ribbon CSS keyframe drift, GLightbox transition (if it has one), any custom carousel auto-transition easing beyond a simple cut.
4. **Lazy loading / performance pass:** confirm `loading="lazy"` on all below-the-fold images across all pages; confirm hero image (above fold) does NOT have `loading="lazy"`; confirm CDN script tags don't block critical rendering unnecessarily (defer non-critical scripts if needed).
5. **End-to-end manual QA walkthrough** (document results, fix anything broken):
   - Home: hero CTA → Products page works; teaser slider Order Now → Order page with correct product preselected.
   - Products: all 8+ cards correct data; Order Now for 2-3 different products → verify correct preselection each time.
   - Gallery: every image opens in lightbox, closes correctly, keyboard nav works.
   - FAQ: accordion expands/collapses correctly.
   - Order: full submit flow with no backend (localStorage fallback), verify success state, verify required-field validation, verify live preview.
   - Mobile viewport (375px) walkthrough of all 5 pages: no horizontal scroll, nav collapses, floating order button doesn't overlap content awkwardly.
6. Write `docs/README.md`: project overview, folder structure, how to preview (`file://` — just open `index.html`; note no server required), how to deploy to a static host (mention Netlify/GitHub Pages/Vercel — drag-and-drop or connect repo, no build command needed), how to add real product/gallery photos (exact filenames expected per `assets/images/` convention from Phases 1-4), how to swap the localStorage fallback for a real `/api/order` backend later (point to the isolated `submitOrder` function in `assets/js/app.js`).
7. Run through `plan.md`'s Acceptance Criteria checklist explicitly; fix anything unmet.

## Success Criteria

- [x] Navbar/footer identical across all 5 pages, active-page link highlighted (verified via grep diff of `<header>` block; brand-name typo found and fixed)
- [x] Unique, accurate SEO title/description per page
- [x] All images have correct alt text; lazy loading applied correctly (except hero) — verified via grep
- [ ] Keyboard-only navigation works across all 5 pages with visible focus states — NOT verified live (no display server in sandbox); focus-visible CSS is in place, needs manual spot-check
- [x] `prefers-reduced-motion` verified disabling all custom animation, site-wide (code-review found Swiper/carousel autoplay gaps; fixed)
- [x] Gold-accent text-contrast checked and adjusted if failing (code-review found additional gold-on-white failures beyond the initial pass; all fixed — see plan.md Post-Implementation Notes)
- [ ] Full manual QA walkthrough passes with no broken links/interactions — NOT verified live; only static analysis (HTML validity, JS syntax, DOM id cross-reference, curl-confirmed localStorage fallback trigger) performed. User to spot-check.
- [x] `docs/README.md` written covering preview/deploy/image-swap/backend-swap instructions
- [x] plan.md Acceptance Criteria all checked off (to the extent verifiable without a live browser)

## Risk Assessment

- **Risk:** gold (#D4AF37) on white/pink fails WCAG AA for body text (likely, given gold's relatively light luminance). **Mitigation:** restrict gold to large text/icons/borders/accents (per design-guidelines.md's own note that gold is accent-only), use `--color-ink` for all body copy — verify this was followed and fix any regressions found in Phases 2-5.

## Next Steps

None — final phase. After this, plan is complete; main agent writes final report per `documentation-management.md` / shared-phases.md conventions.
