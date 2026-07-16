---
phase: 5
title: "Order Page & JS Logic"
status: completed
priority: P1
dependencies: [1, 3]
---

# Phase 5: Order Page & JS Logic

## Overview

Build `order.html`: single order form with live-updating engraved-name preview,
preselection from `?product=` query param (set by Phase 3's Order Now buttons),
and submit logic that POSTs to `/api/order` with a `localStorage` fallback and
a visible success state. This is the only page with real interactive
form/API logic — most complex phase.

## Context Links

- Original brief's exact payload shape (see below — must match exactly)
- Phase 3's `PRODUCTS` data (for the product `<select>` options)

## Requirements

- Functional:
  - Form fields: Customer Name, Phone Number, Facebook/Zalo, Delivery Address, Select Product (populated from `PRODUCTS`), Choose Color (populated dynamically from selected product's `colors[]`), Engraved Name, Quantity, Special Notes.
  - Live preview: a mocked hair-clip shape showing the typed engraved name, updating on every `input` event on the Engraved Name field.
  - `?product={id}` query param on page load preselects the product dropdown and repopulates the color options for that product.
  - Submit ("Đặt Hàng Ngay" / Place My Order) button: client-side required-field validation (Bootstrap validation classes) → build payload → call `submitOrder(payload)`.
  - `submitOrder`: `fetch('/api/order', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(payload)})`; on network/non-2xx failure, fall back to reading/writing a `tiemtibe_orders` array in `localStorage`. Either path ends in the same success UI: "Đặt hàng thành công" (Order Successful) — confirmation panel/modal, do not silently swallow errors.
  - Payload shape (exact, per brief):
    ```json
    {
      "customerName": "",
      "phone": "",
      "address": "",
      "productId": "",
      "color": "",
      "engraving": "",
      "quantity": 1,
      "note": ""
    }
    ```
    Note: brief's payload omits Facebook/Zalo — decide whether to add a `contact` field or fold it into `note`; recommend adding `contact` as an extra field beyond the brief's minimal example (the brief explicitly collects "Facebook/Zalo" in the form fields list, so the payload needs somewhere to put it — extending the example object is reasonable, don't silently drop collected data). Flag this as resolved: add `"contact": ""` to the payload.
- Non-functional: form usable via keyboard only; all inputs have associated `<label>`s; validation errors are announced (use Bootstrap's `is-invalid` + `invalid-feedback` pattern, which is accessible via `aria-describedby`).

## Architecture

### Live Preview

- CSS-drawn hair-clip silhouette (simple shape: rounded rectangle + small circle/bow accent in pink+gold) containing a text element bound to the Engraved Name input.
- `engravingInput.addEventListener('input', e => previewText.textContent = e.target.value || 'Sophia')` (fallback example name shown when empty, matching brief's example).

### Product/Color Cascade

```js
productSelect.addEventListener('change', () => {
  const product = PRODUCTS.find(p => p.id === productSelect.value);
  renderColorOptions(product.colors); // repopulate color <select> or swatch buttons
});
```
On page load: read `new URLSearchParams(location.search).get('product')`, set `productSelect.value`, trigger the same cascade.

### submitOrder / localStorage Fallback

```js
// API module section of app.js
async function submitOrder(payload) {
  try {
    const res = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error('API responded with error status');
    return { ok: true, source: 'api' };
  } catch (err) {
    const orders = JSON.parse(localStorage.getItem('tiemtibe_orders') || '[]');
    orders.push({ ...payload, submittedAt: new Date().toISOString() });
    localStorage.setItem('tiemtibe_orders', JSON.stringify(orders));
    return { ok: true, source: 'localStorage' };
  }
}
```
Keep `submitOrder` isolated from DOM code (per `docs/tech-stack.md` future-backend note) — it takes a plain payload object and returns a result, no direct DOM manipulation inside it. The form-submit handler (DOM layer) calls it and then renders the success UI.

### Success State

- On successful `submitOrder` resolution, replace the form (or show an overlay/panel) with: checkmark icon, "Đặt hàng thành công!" heading, short confirmation text, "Đặt đơn khác" (place another order) button that resets the form.
- Do not use a payment gateway or redirect to any payment page — confirmed out of scope.

## Related Code Files

- Modify: `order.html` (`<main>` — form markup, live preview markup, success-state markup, hidden by default)
- Modify: `assets/css/style.css` (form input styling — 24px radius, focus-visible gold outline; live-preview clip mockup styles; success-state styles)
- Modify: `assets/js/app.js` (submitOrder API function, product/color cascade, live preview binding, form validation + submit handler, query-param preselection, success-state toggle)

## Implementation Steps

1. Build form markup: all required fields with `<label for>`, appropriate `type`/`required` attributes, Bootstrap form classes, product `<select>` populated from `PRODUCTS` (id/name), color `<select>` or swatch group populated dynamically, quantity `<input type="number" min="1" value="1">`.
2. Build live-preview markup (CSS clip shape + bound text span), place adjacent to the Engraved Name field so the preview updates visibly as the user types (per brief's explicit requirement).
3. Wire query-param preselection on `DOMContentLoaded`.
4. Wire product-change → color-cascade.
5. Wire engraving-input → live preview update.
6. Implement `submitOrder` in the API-module section of `app.js` (isolated, no DOM access inside it) exactly as specified above, including the `contact` field addition for Facebook/Zalo.
7. Implement form submit handler: `event.preventDefault()`, run Bootstrap-style validation (check `form.checkValidity()`, add `was-validated` class), if valid build the payload object from form values, call `submitOrder(payload)`, await result, show success state.
8. Test twice: (a) with no `/api/order` backend running — confirm it falls through to localStorage, check `localStorage.getItem('tiemtibe_orders')` in DevTools console shows the submitted order, success UI shown; (b) verify required-field validation blocks submit and shows accessible error messages when fields are empty.
9. Test query-param preselection: navigate to `order.html?product=<a-real-id-from-Phase-3>` and confirm the dropdown + colors are correct on load.

## Success Criteria

- [x] All form fields present, labelled, keyboard-accessible (verified: every input id cross-checked against a `<label for>`)
- [x] Live preview updates on every keystroke in Engraved Name field (verified via code: `input` event sets `previewText.textContent` directly)
- [x] `?product=` query param correctly preselects product + repopulates colors (verified via code trace, including invalid-id fallback guard)
- [x] Submit with backend absent falls back to localStorage and shows success state (verified: `curl -X POST /api/order` confirmed HTTP 501 → triggers catch → localStorage path; code-review also hardened this path against a localStorage-failure edge case)
- [x] Payload shape matches brief's example plus the added `contact` field (verified via code read)
- [x] Required-field validation blocks empty submits with accessible error messaging (verified: `required` + `.invalid-feedback` + `checkValidity()` gate present)
- [x] `submitOrder` contains no direct DOM manipulation (verified by code review — confirmed pure payload-in/result-out function)

## Risk Assessment

- **Risk:** brief's payload example doesn't include the Facebook/Zalo field the form explicitly collects. **Resolution:** add `contact` field to the payload (documented above) rather than silently dropping collected user data — flag this decision in the final report as an intentional deviation from the literal example.
- **Risk:** `fetch` to `/api/order` on a static host returns a 404 HTML page (not a network error), which some fetch error-handling misses (fetch only rejects on network failure, not HTTP error status). **Mitigation:** explicitly check `res.ok` and throw before falling back, as shown in the code sketch above.

## Next Steps

Phase 6 verifies this flow end-to-end as part of the full-site QA pass.
