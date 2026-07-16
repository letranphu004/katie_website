---
phase: 1
title: "Foundation & Shared Shell"
status: completed
priority: P1
dependencies: []
---

# Phase 1: Foundation & Shared Shell

## Overview

Set up the folder structure, CDN includes, CSS design-token foundation, the
canonical navbar/footer markup (duplicated per-page per research decision),
and the shared JS chrome (scroll progress bar, back-to-top, floating order
button, AOS init, reduced-motion handling). Every later phase builds on this.

## Context Links

- `docs/tech-stack.md` — CDN links, versions, branding placeholders
- `docs/design-guidelines.md` — color tokens, radius, shadow, glass, typography
- `research/researcher-01-component-includes.md` — why markup is duplicated, not fetched
- `research/researcher-02-accessible-animation.md` — reduced-motion + progress bar patterns

## Requirements

- Functional: 5 HTML page shells exist and share identical navbar/footer/head boilerplate; shared CSS/JS load correctly on every page.
- Non-functional: works via `file://` (no server needed to preview); mobile-first; semantic HTML5 landmarks (`header`, `nav`, `main`, `footer`).

## Architecture

```
/
├── index.html
├── products.html
├── gallery.html
├── faq.html
├── order.html
├── assets/
│   ├── css/style.css
│   ├── js/app.js
│   └── images/            (placeholder slots, populated in later phases)
├── components/
│   ├── navbar.html         (canonical source snippet — copy into each page's <header>)
│   └── footer.html          (canonical source snippet — copy into each page's <footer>)
```

`components/navbar.html` and `components/footer.html` are NOT loaded at runtime
(no fetch/build step). They exist as the single source a human copy-pastes from
when the navbar/footer needs to change — keep them in sync manually across the
5 pages when edited.

### CSS Token Foundation (`assets/css/style.css`)

```css
:root {
  --color-blush-bg: #FFF7FA;
  --color-pink-soft: #F8D7E6;
  --color-pink-primary: #F3A6C9;
  --color-white: #FFFFFF;
  --color-gold: #D4AF37;
  --color-ink: #3A2E33;
  --radius-lg: 24px;
  --shadow-soft: 0 20px 40px rgba(243,166,201,0.25);
  --shadow-soft-hover: 0 28px 56px rgba(243,166,201,0.35);
  --font-heading: 'Playfair Display', serif;
  --font-body: 'Poppins', sans-serif;
}
```

Bootstrap utility classes first; this stylesheet only adds what Bootstrap can't
do (glassmorphism, gold accents, sparkle/ribbon decorations, hover-lift,
parallax transform hook, timeline connector, live-preview clip mockup).

### Shared JS Chrome (`assets/js/app.js`)

Structure `app.js` into clearly separated sections (comments as section
dividers, not per-line comments):
1. **API module** — isolated functions (`submitOrder(payload)` etc.) added in
   Phase 5, stubbed here as a placeholder section so the file structure is set.
2. **UI init** — AOS init with reduced-motion check, scroll progress bar,
   back-to-top button show/hide + click handler, smooth anchor scroll,
   navbar shrink-on-scroll.
3. Reduced-motion gate at top of file:
   ```js
   const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
   AOS.init({ disable: prefersReducedMotion, once: true, offset: 120 });
   ```

## Related Code Files

- Create: `index.html`, `products.html`, `gallery.html`, `faq.html`, `order.html` (shells with shared head/nav/footer, empty `<main>` placeholders for later phases)
- Create: `assets/css/style.css`
- Create: `assets/js/app.js`
- Create: `components/navbar.html`, `components/footer.html` (canonical reference snippets)
- Create: `assets/images/` (dir, `.gitkeep` or README noting placeholder convention)

## Implementation Steps

1. Create folder structure above.
2. Write `components/navbar.html`: sticky glass navbar, brand "Tiệm Tí Bé" (Playfair), links to all 5 pages, floating "Đặt hàng" (Order) CTA button, mobile hamburger via Bootstrap collapse.
3. Write `components/footer.html`: Instagram/Facebook/TikTok icon links (Bootstrap Icons), phone, email, copyright line with current year via a tiny inline script or static year — prefer static text is fine for a no-build static site, but a 1-line JS `document.getElementById('year').textContent = new Date().getFullYear()` in app.js is cheap and avoids yearly manual edits.
4. Copy navbar/footer markup into all 5 page shells' `<header>`/`<footer>`.
5. Add shared `<head>` boilerplate to all 5 pages: charset, viewport, title (per-page, SEO-friendly), meta description (per-page), Open Graph basics, favicon link (placeholder), CDN `<link>`/`<script>` tags per `docs/tech-stack.md`, `assets/css/style.css` link.
6. Write `assets/css/style.css` token foundation + base rules (body font/colors, `.glass-card`, `.hover-lift`, `.section-padding`, `.btn-gold-outline`, sparkle/ribbon keyframes, `prefers-reduced-motion` media query disabling custom animations).
7. Write `assets/js/app.js`: reduced-motion-aware AOS init, scroll progress bar, back-to-top button, navbar scroll-shrink, smooth anchor scroll, footer year, empty `submitOrder` stub with a comment marking where Phase 5 wires it up.
8. Add floating "Order Now" button (fixed position, all pages) linking to `order.html`.
9. Open `index.html` via `file://` directly in a browser — verify navbar/footer render, no console errors, CDN assets load (network tab), scroll progress bar moves, back-to-top appears after scroll.

## Success Criteria

- [x] All 5 page shells exist with identical navbar/footer, valid semantic HTML5 (verified: grep diff + Python html.parser tag-balance check)
- [ ] `file://index.html` opens with zero console errors — NOT verified live (no display server in sandbox)
- [ ] AOS, Bootstrap JS, Swiper, GLightbox CDN scripts all load (check network tab) — NOT verified live; CDN URLs confirmed to match docs/tech-stack.md exactly
- [ ] Scroll progress bar, back-to-top, floating order button all function — NOT verified live; implementation code-reviewed
- [x] `prefers-reduced-motion: reduce` disables AOS and custom CSS animations (verified via code: AOS.init disable check, CSS media query, JS gates on parallax/Swiper/carousel)
- [ ] Mobile nav collapses correctly at <992px — NOT verified live; uses standard Bootstrap navbar-collapse markup

## Risk Assessment

- **Risk:** navbar/footer drift across 5 pages after edits. **Mitigation:** treat `components/*.html` as source of truth; note in `docs/README.md` (Phase 6) that any nav/footer change must be copied to all 5 pages.
- **Risk:** CDN outage breaks the whole site (no local fallback). **Mitigation:** acceptable for this phase per user's confirmed no-build/CDN-only stack; document as known trade-off, not a blocker.

## Next Steps

Phases 2-5 build page content inside each page's `<main>`.
