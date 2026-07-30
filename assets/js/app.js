"use strict";

/* ==========================================================================
   API module — isolated from DOM so a real backend can replace localStorage
   ========================================================================== */

// Get your own key at https://web3forms.com (free, ~1 min, no card) — sign up with
// the email you want orders delivered to, then paste the access key it gives you here.
const WEB3FORMS_ACCESS_KEY = "fcdd079f-4125-4895-a2d6-c78cc60899bb";

async function submitOrder(payload) {
  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Yêu cầu liên hệ mới — Tiệm Tí Be (${payload.customerName || "Khách hàng"})`,
        from_name: "Tiệm Tí Be — Website",
        "Họ và tên": payload.customerName,
        "Số điện thoại": payload.phone,
        "Facebook / Zalo": payload.contact || "(không có)",
        "Nội dung": payload.note
      })
    });
    const result = await res.json();
    if (!res.ok || result.success === false) throw new Error(result.message || "Web3Forms request failed");
    return { ok: true, source: "web3forms" };
  } catch (apiErr) {
    try {
      const orders = JSON.parse(localStorage.getItem("tiemtibe_orders") || "[]");
      orders.push({ ...payload, submittedAt: new Date().toISOString() });
      localStorage.setItem("tiemtibe_orders", JSON.stringify(orders));
      return { ok: true, source: "localStorage" };
    } catch (storageErr) {
      return { ok: false, source: "none" };
    }
  }
}

/* ==========================================================================
   Shared chrome — runs on every page
   ========================================================================== */

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (ch) => HTML_ESCAPES[ch]);
}

document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initScrollProgress();
  initBackToTop();
  initNavbarShrink();
  initSmoothAnchors();
  initProductGroups();
  initProductModal();
  initGallery();
  initGalleryStrip();
  initOrderPage();
  initTestimonialCarousel();
  initBentoVideo();
  initHeroPreview();
  initMotion();
  initMagnetic();
});

function initTestimonialCarousel() {
  const el = document.getElementById("testimonialCarousel");
  if (!el || !prefersReducedMotion || typeof bootstrap === "undefined") return;
  bootstrap.Carousel.getOrCreateInstance(el).pause();
}

function initBentoVideo() {
  const video = document.querySelector(".bento__video");
  if (!video || !prefersReducedMotion) return;
  video.pause();
}

/* Engraving-preview tile next to the hero video: typing a name here carries it
   into the real order form's engraving field once the visitor picks a product. */
function initHeroPreview() {
  const input = document.getElementById("heroEngravingInput");
  const preview = document.getElementById("heroPreviewText");
  const cta = document.getElementById("heroPreviewCta");
  if (!input || !preview) return;

  input.addEventListener("input", () => {
    preview.textContent = input.value.trim() || "kl87";
  });

  if (cta) {
    cta.addEventListener("click", () => {
      const name = input.value.trim();
      if (name) appendToContactNote(`Tên muốn khắc: ${name}`);
    });
  }
}

/* Carries context (a product name, an engraving idea) from elsewhere on the page into
   the contact form's message field, without overwriting anything the visitor already
   typed there themselves. */
function appendToContactNote(line) {
  const noteInput = document.getElementById("noteInput");
  if (!noteInput) return;
  if (!noteInput.value.trim()) {
    noteInput.value = line;
  } else if (!noteInput.value.includes(line)) {
    noteInput.value = `${line}\n${noteInput.value}`;
  }
}

function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  if (!bar) return;
  const update = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? (window.scrollY / scrollHeight) * 100 : 0;
    bar.style.width = progress + "%";
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("is-visible", window.scrollY > 500);
  }, { passive: true });
  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

function initNavbarShrink() {
  const nav = document.querySelector(".navbar-glass");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  }, { passive: true });
}

/* Same-page section links (nav CTA, hero CTAs, floating order button) scroll to their
   target instead of doing a native hash navigation, so the URL bar never picks up a
   "#section" fragment. The "Bỏ qua đến nội dung chính" skip link is left alone — it's an
   accessibility feature that relies on the browser's native hash-focus behavior. */
function initSmoothAnchors() {
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link || link.getAttribute("href") === "#main") return;

    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    if (!targetId) {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
      return;
    }
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

/* ==========================================================================
   Motion — GSAP + ScrollTrigger scroll reveals, timeline progress, counters.
   Progressive enhancement: markup is fully visible by default, so a blocked
   CDN or prefers-reduced-motion simply leaves everything static in place.
   ========================================================================== */

function initMotion() {
  if (prefersReducedMotion || typeof gsap === "undefined") return;
  if (typeof ScrollTrigger !== "undefined") gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll(".reveal").forEach((el) => {
    gsap.from(el, {
      opacity: 0,
      y: 36,
      duration: 0.8,
      ease: "power3.out",
      immediateRender: false,
      scrollTrigger: { trigger: el, start: "top 88%" }
    });
  });

  document.querySelectorAll(".reveal-stagger").forEach((group) => {
    const children = [...group.children];
    if (!children.length) return;
    gsap.from(children, {
      opacity: 0,
      y: 36,
      duration: 0.7,
      ease: "power3.out",
      stagger: 0.05,
      immediateRender: false,
      scrollTrigger: { trigger: group, start: "top 88%" }
    });
  });

  const trackFill = document.querySelector(".timeline-track__fill");
  const timelineRow = document.querySelector(".timeline-row");
  if (trackFill && timelineRow) {
    gsap.to(trackFill, {
      width: "100%",
      ease: "none",
      scrollTrigger: { trigger: timelineRow, start: "top 75%", end: "bottom 55%", scrub: true }
    });
  }

  document.querySelectorAll(".counter").forEach((el) => {
    const target = Number(el.dataset.target) || 0;
    const counted = { value: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      once: true,
      onEnter: () => {
        gsap.to(counted, {
          value: target,
          duration: 1.3,
          ease: "power1.out",
          onUpdate: () => { el.textContent = Math.round(counted.value); }
        });
      }
    });
  });
}

/* Subtle cursor-follow effect on primary CTAs — desktop pointer devices only. */
function initMagnetic() {
  if (prefersReducedMotion || !window.matchMedia("(pointer: fine)").matches) return;
  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * 0.3;
      const y = (e.clientY - rect.top - rect.height / 2) * 0.3;
      if (typeof gsap !== "undefined") {
        gsap.to(el, { x, y, duration: 0.3, ease: "power2.out" });
      } else {
        el.style.transform = `translate(${x}px, ${y}px)`;
      }
    });
    el.addEventListener("mouseleave", () => {
      if (typeof gsap !== "undefined") {
        gsap.to(el, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" });
      } else {
        el.style.transform = "";
      }
    });
  });
}

/* ==========================================================================
   Product gallery — image-only cards (source images already bake in name,
   price, and material), with a chip filter across PRODUCT_GROUPS.
   ========================================================================== */

function initProductGroups() {
  const container = document.getElementById("productGroups");
  const chipsContainer = document.getElementById("filterChips");
  if (!container || typeof PRODUCTS === "undefined" || typeof PRODUCT_GROUPS === "undefined") return;

  container.innerHTML = PRODUCTS.map((p) => renderProductCard(p)).join("");

  if (!chipsContainer) return;
  const chips = [{ id: "all", label: "Tất Cả" }, ...PRODUCT_GROUPS.map((g) => ({ id: g.id, label: g.label }))];
  chipsContainer.innerHTML = chips.map((c, i) => `
    <button type="button" class="chip${i === 0 ? " is-active" : ""}" data-filter="${escapeHtml(c.id)}">${escapeHtml(c.label)}</button>`).join("");

  chipsContainer.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    chipsContainer.querySelectorAll(".chip").forEach((c) => c.classList.remove("is-active"));
    chip.classList.add("is-active");
    filterProducts(chip.dataset.filter);
  });
}

function renderProductCard(product) {
  const name = escapeHtml(product.name);
  const tag = product.group === "combo" ? `<span class="product-card__tag">Best Seller</span>` : "";
  // The image itself carries name/material/price visually — alt text repeats them as text
  // so screen-reader users (who can't read pixels) still get that info, not just the name.
  const altText = escapeHtml(`${product.name} — ${product.material} — ${formatVND(product.priceVND)}`);
  return `
    <div class="product-card" role="button" tabindex="0" data-product-id="${product.id}" data-group="${escapeHtml(product.group)}"
      aria-label="Xem chi tiết ${name}">
      <div class="product-card__media">
        ${tag}
        <img src="${product.image}" alt="${altText}" loading="lazy">
      </div>
    </div>`;
}

function filterProducts(groupId) {
  const cards = [...document.querySelectorAll("#productGroups .product-card")];
  const matching = cards.filter((card) => groupId === "all" || card.dataset.group === groupId);
  const nonMatching = cards.filter((card) => !matching.includes(card));

  const revealMatching = () => {
    matching.forEach((card) => card.classList.remove("is-hidden"));
    if (typeof gsap !== "undefined" && !prefersReducedMotion) {
      gsap.fromTo(matching, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, stagger: 0.025, ease: "power2.out" });
    }
  };

  if (typeof gsap !== "undefined" && !prefersReducedMotion && nonMatching.length) {
    gsap.to(nonMatching, {
      opacity: 0,
      scale: 0.92,
      duration: 0.2,
      stagger: 0.01,
      ease: "power1.in",
      onComplete: () => {
        nonMatching.forEach((card) => card.classList.add("is-hidden"));
        gsap.set(nonMatching, { clearProps: "opacity,scale" });
        revealMatching();
      }
    });
  } else {
    nonMatching.forEach((card) => card.classList.add("is-hidden"));
    revealMatching();
  }
}

/* ==========================================================================
   Product detail modal — carousel + color pick + order handoff
   ========================================================================== */

function initProductModal() {
  const groupsContainer = document.getElementById("productGroups");
  const modalEl = document.getElementById("productModal");
  if (!groupsContainer || !modalEl || typeof PRODUCTS === "undefined" || typeof bootstrap === "undefined") return;

  const modalTitle = document.getElementById("productModalLabel");
  const modalDesc = document.getElementById("productModalDesc");
  const carouselEl = document.getElementById("productModalCarousel");
  const carouselInner = document.getElementById("productModalCarouselInner");
  const swatchesEl = document.getElementById("productModalSwatches");
  const colorLabel = document.getElementById("productModalColorLabel");
  const colorNameEl = document.getElementById("productModalColorName");
  const orderBtn = document.getElementById("productModalOrderBtn");
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);

  let currentProduct = null;
  let selectedColor = null;
  let selectedParts = null;
  let orderInFlight = false;

  function openProduct(product) {
    currentProduct = product;
    const name = escapeHtml(product.name);

    // Both visually hidden — the carousel image shows name/price/material/description,
    // but a screen reader can't read pixels, so repeat that info as real text.
    modalTitle.textContent = product.name;
    if (modalDesc) {
      modalDesc.textContent = `${product.description} ${product.material} — ${formatVND(product.priceVND)}`;
    }

    carouselInner.innerHTML = product.images.map((img, i) => `
      <div class="carousel-item${i === 0 ? " active" : ""}">
        <img src="${img}" class="d-block w-100" alt="${name} — ảnh ${i + 1}">
      </div>`).join("");
    bootstrap.Carousel.getOrCreateInstance(carouselEl).to(0);

    if (product.parts) {
      selectedColor = null;
      selectedParts = product.parts.map((part) => ({ label: part.label, colorName: part.colors[0].name }));
      colorLabel.classList.add("d-none");
      swatchesEl.innerHTML = product.parts.map((part, pi) => `
        <div class="combo-part-swatches mb-3">
          <p class="small fw-semibold mb-2">${escapeHtml(part.label)}${part.qty > 1 ? ` (x${part.qty})` : ""}:
            <span class="fw-normal text-secondary" data-part-color-name="${pi}">${escapeHtml(part.colors[0].name)}</span></p>
          <div class="d-flex gap-2 flex-wrap">
            ${part.colors.map((c, ci) => `
              <button type="button" class="color-swatch${ci === 0 ? " is-selected" : ""}" style="background-color:${escapeHtml(c.hex)}"
                data-part-index="${pi}" data-color-name="${escapeHtml(c.name)}"
                aria-label="Chọn màu ${escapeHtml(c.name)} cho ${escapeHtml(part.label)}"></button>`).join("")}
          </div>
        </div>`).join("");
    } else {
      selectedParts = null;
      selectedColor = product.colors[0].name;
      colorLabel.classList.remove("d-none");
      if (colorNameEl) colorNameEl.textContent = product.colors[0].name;
      swatchesEl.innerHTML = `<div class="d-flex gap-2 flex-wrap">${product.colors.map((c, i) => `
        <button type="button" class="color-swatch${i === 0 ? " is-selected" : ""}" style="background-color:${escapeHtml(c.hex)}"
          data-color-name="${escapeHtml(c.name)}" aria-label="Chọn màu ${escapeHtml(c.name)}"></button>`).join("")}</div>`;
    }

    modal.show();
  }

  groupsContainer.addEventListener("click", (e) => {
    const card = e.target.closest("[data-product-id]");
    if (!card) return;
    const product = PRODUCTS.find((p) => p.id === card.dataset.productId);
    if (product) openProduct(product);
  });

  groupsContainer.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest("[data-product-id]");
    if (!card) return;
    e.preventDefault();
    const product = PRODUCTS.find((p) => p.id === card.dataset.productId);
    if (product) openProduct(product);
  });

  swatchesEl.addEventListener("click", (e) => {
    const swatch = e.target.closest(".color-swatch");
    if (!swatch) return;
    if (swatch.dataset.partIndex !== undefined) {
      const partIndex = Number(swatch.dataset.partIndex);
      swatchesEl.querySelectorAll(`.color-swatch[data-part-index="${partIndex}"]`).forEach((s) => s.classList.remove("is-selected"));
      swatch.classList.add("is-selected");
      if (selectedParts) selectedParts[partIndex].colorName = swatch.dataset.colorName;
      const partNameEl = swatchesEl.querySelector(`[data-part-color-name="${partIndex}"]`);
      if (partNameEl) partNameEl.textContent = swatch.dataset.colorName;
    } else {
      swatchesEl.querySelectorAll(".color-swatch").forEach((s) => s.classList.remove("is-selected"));
      swatch.classList.add("is-selected");
      selectedColor = swatch.dataset.colorName;
      if (colorNameEl) colorNameEl.textContent = swatch.dataset.colorName;
    }
  });

  orderBtn.addEventListener("click", () => {
    if (!currentProduct || orderInFlight) return;
    orderInFlight = true;
    const productName = currentProduct.name;
    const colorSelection = selectedParts ? selectedParts.map(({ label, colorName }) => ({ label, colorName })) : selectedColor;
    modalEl.addEventListener("hidden.bs.modal", () => {
      orderInFlight = false;
      const colorText = Array.isArray(colorSelection)
        ? colorSelection.map(({ label, colorName }) => `${label}: ${colorName}`).join(", ")
        : colorSelection;
      appendToContactNote(`Sản phẩm quan tâm: ${productName}${colorText ? ` — Màu: ${colorText}` : ""}`);
      const orderSection = document.getElementById("order");
      if (!orderSection) return;
      const scrollToOrder = () => orderSection.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
      scrollToOrder();
      // Web fonts finishing their (possibly staggered) load shortly after navigation
      // reflow the page and drift the target computed above — keep re-settling for a
      // short bounded window. Observes <html>, not <body>: Bootstrap toggles body's
      // padding-right/overflow while ANY modal is open (scrollbar compensation), which
      // would otherwise false-trigger this if the user reopens a different product.
      if (typeof ResizeObserver !== "undefined") {
        const resettle = new ResizeObserver(scrollToOrder);
        resettle.observe(document.documentElement);
        setTimeout(() => resettle.disconnect(), 2000);
      }
    }, { once: true });
    modal.hide();
  });
}

/* ==========================================================================
   Gallery — GLightbox + horizontal drag-to-scroll filmstrip
   ========================================================================== */

function initGallery() {
  const gallery = document.getElementById("galleryStrip");
  if (!gallery || typeof GLightbox === "undefined") return;

  let lastFocusedTrigger = null;
  gallery.querySelectorAll(".gallery-strip__item").forEach((item) => {
    item.addEventListener("click", () => { lastFocusedTrigger = item; });
  });

  const lightbox = GLightbox({ selector: ".glightbox" });
  lightbox.on("close", () => {
    if (lastFocusedTrigger) lastFocusedTrigger.focus();
  });
}

function initGalleryStrip() {
  const strip = document.getElementById("galleryStrip");
  if (!strip) return;

  const prevBtn = document.querySelector(".gallery-strip__nav--prev");
  const nextBtn = document.querySelector(".gallery-strip__nav--next");
  const scrollStep = () => strip.clientWidth * 0.6;

  prevBtn?.addEventListener("click", () => {
    strip.scrollBy({ left: -scrollStep(), behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
  nextBtn?.addEventListener("click", () => {
    strip.scrollBy({ left: scrollStep(), behavior: prefersReducedMotion ? "auto" : "smooth" });
  });

  // Click-and-drag scrolling for mouse users (touch/trackpad already scroll natively).
  let isDown = false;
  let dragged = false;
  let startX = 0;
  let startScroll = 0;

  strip.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "touch") return;
    isDown = true;
    dragged = false;
    startX = e.clientX;
    startScroll = strip.scrollLeft;
    strip.setPointerCapture(e.pointerId);
  });

  strip.addEventListener("pointermove", (e) => {
    if (!isDown) return;
    const dx = e.clientX - startX;
    if (Math.abs(dx) > 4) dragged = true;
    strip.scrollLeft = startScroll - dx;
  });

  const endDrag = () => { isDown = false; };
  strip.addEventListener("pointerup", endDrag);
  strip.addEventListener("pointerleave", endDrag);

  // A drag that just ended shouldn't also open the lightbox as a click.
  strip.addEventListener("click", (e) => {
    if (dragged) {
      e.preventDefault();
      e.stopPropagation();
      dragged = false;
    }
  }, true);
}

/* ==========================================================================
   Contact form — validation, submit. Product interest (from the product modal)
   and engraving ideas (from the hero preview) arrive here via appendToContactNote().
   ========================================================================== */

function initOrderPage() {
  const form = document.getElementById("orderForm");
  if (!form) return;

  const successPanel = document.getElementById("orderSuccess");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const payload = {
      customerName: document.getElementById("customerNameInput").value.trim(),
      phone: document.getElementById("phoneInput").value.trim(),
      contact: document.getElementById("contactInput").value.trim(),
      note: document.getElementById("noteInput").value.trim()
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Đang gửi...";

    const result = await submitOrder(payload);

    if (!result.ok) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Gửi Cho Mình Nha!";
      alert("Ui, có lỗi xíu khi gửi rồi 🥲 Bạn thử lại giúp mình hoặc nhắn trực tiếp qua Zalo/Facebook nha.");
      return;
    }

    form.classList.add("d-none");
    successPanel.classList.add("is-visible");
    successPanel.focus();
  });

  const resetBtn = document.getElementById("orderAnotherBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      form.reset();
      form.classList.remove("was-validated", "d-none");
      successPanel.classList.remove("is-visible");
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = false;
      submitBtn.textContent = "Gửi Cho Mình Nha!";
    });
  }
}
