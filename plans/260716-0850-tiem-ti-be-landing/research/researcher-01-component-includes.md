# Research: Component Include Pattern for Static HTML Site

**Date:** 2026-07-16 | **Scope:** Navbar/footer sharing without build tools | **Sources:** 3 authoritative (MDN, freeCodeCamp, WHATWG spec)

---

## 1. Fetch + file:// CORS Gotchas

**Direct Answer:** Fetch DOES NOT work with `file://` protocol in modern browsers.

### Why It Fails
- **Security boundary:** All browsers (Chrome, Firefox, Safari) treat `file://` URLs as opaque origins since CVE-2019-11730
- **Explicit restriction:** MDN (authoritative) states: "CORS requests may only use HTTP or HTTPS URL scheme"
- **Scope:** Affects `fetch()`, `XMLHttpRequest`, `@font-face`, WebGL textures

### Browser-Specific Behavior
- **Chrome:** No native workaround; requires `--disable-web-security` flag (dev-only, unsafe)
- **Firefox:** Blocks file→file CORS by default; user could disable `security.fileuri.strict_origin_policy` (not recommended)
- **Safari:** Allows bypass via Develop menu → "Disable Cross-Origin Restrictions" (debug-only)

### Real-World Impact
Opening `file:///Users/you/index.html` + attempting `fetch('/components/navbar.html')` = **blocked with CORS error**. No workaround for production-like local testing.

---

## 2. Ranked Alternatives (Simplicity First)

### Option A: Literal Duplication + Sync Script (RECOMMENDED)
**Simplicity:** ⭐⭐⭐⭐⭐ | **file:// compatible:** ✅ YES | **Maintenance:** Manual sync

- Copy navbar.html and footer.html markup directly into all 5 pages (index.html, products.html, etc.)
- Zero JavaScript required; works perfectly with `file://` (double-click to open)
- Create optional `.sync-components.js` script (run pre-commit or pre-deploy) to validate navbar/footer are identical across pages
- Deploy to static host unchanged; no build step needed

**Trade-offs:** Markup repetition in source, but sync script enforces DRY at deployment. Best compromise for "works offline AND will deploy."

---

### Option B: Web Components + Inline Template
**Simplicity:** ⭐⭐⭐ | **file:// compatible:** ✅ YES | **Requires JavaScript:** ✅

- Define navbar/footer as custom elements with inline `<template>` in shared `.js` file
- Include `<script src="components/navbar.js"></script>` on each page, then use `<navbar-component></navbar-component>`
- Template is inlined (no fetch), so works with `file://` and no server
- CSS scoped via Shadow DOM (no style conflicts)

**Trade-offs:** More code; JavaScript dependency; but cleaner than duplication. FreeCodeCamp confirms this is native browser solution.

---

### Option C: Fetch + Local Server Only
**Simplicity:** ⭐⭐ | **file:// compatible:** ❌ NO | **Requires:** Python/Node server

- Create `/components/navbar.html` and `/components/footer.html`; fetch + inject via JavaScript
- Clean separation of concerns; most maintainable code structure
- **REQUIRES local HTTP server for local testing** (python -m http.server, VS Code Live Server, etc.)
- Works seamlessly on static hosts (Netlify, GitHub Pages, Vercel) — all serve over HTTP(S)

**Trade-offs:** Developer must run local server; can't preview with double-click. Best DX once set up.

---

### Option D: Server-Side Includes (SSI)
**Simplicity:** ⭐⭐⭐ | **file:// compatible:** ❌ NO | **Requires:** Apache/server config

- Use `<!--#include file="navbar.html" -->` syntax; server processes before sending
- Works on some static hosts (mainly Apache); **GitHub Pages does NOT support SSI**
- No JavaScript; lightweight; fast (server-side processing)

**Trade-offs:** Host-dependent; not portable; overkill for this project.

---

### Option E: iFrame
**Simplicity:** ⭐ | **file:// compatible:** ✅ YES | **UX:** Poor

- Embed navbar/footer as `<iframe src="navbar.html"></iframe>`
- Works with `file://`; no JavaScript
- **Severe drawbacks:** SEO problems, poor UX, performance overhead, difficult styling

**Not recommended.** (Included for completeness.)

---

## 3. File:// vs Server Requirements Summary

| Approach | file:// Works? | Requires Server for Dev? | Static Host (Netlify/GitHub Pages) | Complexity |
|----------|---|---|---|---|
| **Duplication + Sync** | ✅ YES | ❌ NO | ✅ Works | Low |
| **Web Components** | ✅ YES | ❌ NO | ✅ Works | Medium |
| **Fetch + Server** | ❌ NO | ✅ YES | ✅ Works | Low-Medium |
| **SSI** | ❌ NO | ✅ Depends | ⚠️ Host-dependent | Low |
| **iFrame** | ✅ YES | ❌ NO | ✅ Works | Low (but poor UX) |

---

## 4. Recommended Approach: OPTION A (Duplication + Sync Script)

### Why This Project
1. **Developer experience:** Works immediately with `file://` — open index.html, test everything
2. **No build step:** Aligns with "no npm, no build tool" constraint
3. **Deployment-ready:** Copy-paste to static host unchanged; no server logic needed
4. **Maintenance:** One-time investment in sync script ($1 hour) prevents drift forever
5. **Bootstrap 5.3:** Navbar/footer markup is stable; not a moving target

### Implementation
1. Copy navbar/footer markup into all 5 pages (at top/bottom of `<body>` or in `<header>`/`<footer>` tags)
2. Create optional `.scripts/sync-components.js` to scan and verify navbar/footer HTML is identical across all pages
3. Run sync script locally before commit (or CI enforces it); document in README
4. Deploy as-is to Netlify/GitHub Pages/Vercel

### Alternative if Developer Prefers Fetch
If the user later decides fetch+local-server is worth the setup overhead, **Option C is the upgrade path** — just move navbar/footer to `/components/` and add fetch logic. The structure is future-proof.

---

## Key Gotchas Acknowledged

- **Deployment assumption:** This plan assumes static host (HTTP/HTTPS). If serverless backend is added later, revisit.
- **Sync script scope:** Must validate semantically (tag structure, class names); simple string-match is insufficient.
- **Bootstrap updates:** If BS 5.3 navbar is customized heavily, duplication cost rises; consider Web Components at that point.

---

## Sources

- [MDN: CORS Request Not HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CORS/Errors/CORSRequestNotHttp)
- [MDN: Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [WHATWG Fetch Standard](https://fetch.spec.whatwg.org/)
- [FreeCodeCamp: Reusable HTML Components](https://www.freecodecamp.org/news/reusable-html-components-how-to-reuse-a-header-and-footer-on-a-website/)
- [Codestudy: CORS Request Blocked Locally](https://www.codestudy.net/blog/cors-request-blocked-in-locally-opened-html-file/)

---

**Status:** Research complete. Ready for implementation planning.
