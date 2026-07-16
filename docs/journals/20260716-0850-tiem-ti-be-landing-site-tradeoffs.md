# Tiệm Tí Bé Landing Site: Accessibility and Testing Tradeoffs

**Date**: 2026-07-16 08:50
**Severity**: Medium
**Component**: Static HTML/CSS/JS landing site (5 pages)
**Status**: Resolved with documented constraints

## What Happened

Built a complete 5-page static landing site for "Tiệm Tí Bé" (Vietnamese personalized engraved hair-clip business) using Bootstrap 5.3.8 and vanilla JavaScript. No build tools, pure markup and script. The site runs offline via double-click (file:// protocol). Went through full workflow: bootstrap discovery → parallel research → code implementation → code review pass → verification limitations forced a fallback to static analysis only.

## The Brutal Truth

This session exposed a painful gap between "the site works" and "we can actually verify it works." I built a product optimized for user constraints (no dev server required, runs anywhere) that created opposite-side testing constraints (no display server to run browser tests). The compromise hurt: we shipped with static analysis only, not real browser testing. The code reviewers caught real bugs I'd missed in self-review, which means we got lucky — the fallback wasn't comprehensive enough to guarantee correctness.

## Technical Details

### 1. Markup Duplication Over Fetch + CORS

**Decision**: Navbar and footer duplicated in all 5 HTML files instead of loaded via `fetch()`.

**Why it hurt**: This is a classic DRY violation. But the alternative broke:

```javascript
// This fails silently under file:// protocol
fetch('/components/navbar.html')
  .then(r => r.text())
  .then(html => document.querySelector('nav').innerHTML = html)
  // Error: Uncaught TypeError: Failed to fetch
  // (Reason: CORS policy blocks file:// to file:// requests in most browsers)
```

The user's requirement was "double-click index.html and it works." That requirement killed dynamic loading. Documented in `plans/260716-0850-tiem-ti-be-landing/research/` as a research-backed decision, but it still feels wrong.

### 2. WCAG Contrast Fix Without Silencing User Intent

**The bug**: User locked the brand color to `#D4AF37` (gold). Tested foreground text in default styling:
- Gold text on white background: 2.1:1 contrast ratio
- WCAG AA requires 4.5:1 for text
- Failure rate: ~100% of text using that color

**The trap**: Override the color and you're silencing the user's brand lock. Don't fix it and you ship inaccessible.

**The fix**: Added a new design token `--color-gold-text: #7A5F19` (darker gold derivative) for text-only use. Preserved the exact `#D4AF37` for borders, icon backgrounds, and decorative elements (where contrast rules don't apply). This required editing the color palette documentation to explain the dual-use rule.

**Why this matters**: Code audit (code-reviewer subagent) caught additional gold-on-white failures I missed in self-review:
- Floating CTA button (white text on gold background — inverted the problem)
- Outline button hover/focus states
Both fixed by applying `--color-gold-text` consistently.

### 3. Code Review Caught Gaps in Self-Review

The subagent review (after my self-review) found:
- Brand name typo in navbar: "Tiệm Tí Be" vs correct "Tiệm Tí Bé" (missing accent)
- `prefers-reduced-motion` CSS in place but Swiper carousel still autoplays (violates user intent for motion-sensitive visitors)
- Unhandled exception in order form catch block: if `localStorage.setItem()` fails (quota exceeded, private browsing, etc.), the submit button stays disabled with no user feedback. Customer is stranded.

All three were real bugs. I caught zero of them in self-review. The code reviewer caught all three.

### 4. Verification Fell Back to Static Analysis — A Painful Workaround

**Environment facts**:
- Sandbox has no display server (no GUI environment)
- Node v11 (7+ years EOL) — can't install agent-browser or Playwright
- Headless Safari via AppleScript failed with error -1719 (no document exists — no GUI session to render to)
- User declined a Chrome extension workaround

**What we did instead**:
- HTML tag-balance parsing (Python `html.parser`)
- JavaScript syntax checking (`node --check`)
- DOM id/class cross-referencing between `app.js` and all HTML files
- Curl confirmation of `/api/order` 501 response correctly triggers localStorage fallback

**What we didn't do**:
- Actual browser rendering of the site
- Interactive form testing
- CSS layout/spacing visual verification
- Carousel animation behavior
- Responsive layout at different breakpoints

This is frustrating because the site is meant to be user-facing, visual, interactive. Static analysis caught logic errors and some accessibility issues, but can't catch "the CTA button is visually hidden behind the navbar" or "the carousel doesn't work on mobile."

## Root Cause Analysis

1. **Markup duplication**: User's offline requirement (file:// protocol) collides with the modern web's move to dynamic components. fetch() works great in a server context; it doesn't work at all for static files.

2. **Contrast oversight**: I tested color compliance manually but didn't run a systematic WCAG audit tool (no CLI tool available in this sandbox that I checked). Assumed my spot-check was sufficient. Code review discipline caught what laziness missed.

3. **Verification gap**: The environment constraint (no display server) wasn't negotiable. Rather than pretend full testing happened, we documented the fallback and asked the user to spot-check manually. This is honest but risky — user testing is better than developer testing, but it's not a systematic guarantee.

## Lessons Learned

1. **Duplication for constraints is a real choice, not a failure**: Sometimes your environment or user requirements force DRY violations. Document *why* (the CORS issue, the file:// protocol limit), not just *that* you did it. Future maintainers need to understand the constraint is real, not a missed refactoring.

2. **Code review discipline > self-review completeness**: I did a self-review and thought I was done. A different pair of eyes found typos, accessibility gaps, and exception-handling bugs. For user-facing work, require review. Don't trust self-review on visual/UX artifacts.

3. **Static analysis isn't the same as browser testing**: We can verify logic, syntax, and some accessibility via static checking. We cannot verify visual layout, animation behavior, interaction flows, or responsive behavior without rendering. If the codebase lands in a better-equipped environment, full browser testing should be job one.

4. **Transparency about limitations beats false confidence**: We told the user "we can't run a display server, so verification is static-analysis only, here are the gaps, please spot-check manually afterward." That's better than shipping with "fully tested" in the README when it wasn't.

## Next Steps

1. **User spot-check** (in-flight): User to manually test the site in a real browser (desktop, mobile) against the design spec. Looking for visual alignment, interaction behavior, responsive layout.

2. **Create a browser-test plan** (for next iteration if site evolves): If the sandbox environment improves (display server, modern Node), add Playwright tests for:
   - Responsive layout (mobile, tablet, desktop breakpoints)
   - Carousel behavior (autoplay respects prefers-reduced-motion)
   - Form submission (including localStorage fallback on API failure)
   - Keyboard navigation (tab order, focus states)

3. **Archive this constraint**: Document the file:// protocol limitation and markup duplication decision in `docs/` so future maintainers understand why the site is structured this way and what would need to change if we ever add a build tool or dev server.

4. **Add WCAG audit tooling**: Next static site project, include a pre-commit check (e.g., Pa11y CLI or similar) to catch contrast/accessibility issues automatically, not manually.

---

**Owner**: This session (Claude Code)  
**Affected files**: `index.html`, `pages/*`, `css/styles.css`, `js/app.js`, `docs/design-guidelines.md`
