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
        subject: `Đơn hàng mới — Tiệm Tí Be (${payload.customerName || "Khách hàng"})`,
        from_name: "Tiệm Tí Be — Website",
        "Họ và tên": payload.customerName,
        "Số điện thoại": payload.phone,
        "Facebook / Zalo": payload.contact || "(không có)",
        "Địa chỉ giao hàng": payload.address,
        "Sản phẩm": payload.productLabel,
        "Màu sắc": payload.color,
        "Tên khắc": payload.engraving,
        "Số lượng": payload.quantity,
        "Ghi chú": payload.note || "(không có)"
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
  if (window.AOS) {
    AOS.init({ disable: prefersReducedMotion, once: true, offset: 120, duration: 700 });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  initScrollProgress();
  initBackToTop();
  initNavbarShrink();
  initProductGroups();
  initProductModal();
  initGallery();
  initOrderPage();
  initTestimonialCarousel();

  if (window.AOS) AOS.refresh();
});

function initTestimonialCarousel() {
  const el = document.getElementById("testimonialCarousel");
  if (!el || !prefersReducedMotion || typeof bootstrap === "undefined") return;
  bootstrap.Carousel.getOrCreateInstance(el).pause();
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

/* ==========================================================================
   Product groups — card grid rendering
   ========================================================================== */

function initProductGroups() {
  const container = document.getElementById("productGroups");
  if (!container || typeof PRODUCTS === "undefined" || typeof PRODUCT_GROUPS === "undefined") return;

  container.innerHTML = PRODUCT_GROUPS.map((group, groupIndex) => {
    const groupProducts = PRODUCTS.filter((p) => p.group === group.id);
    const cards = groupProducts.map((p, i) => renderProductCard(p, i, group.featured)).join("");
    const badge = group.featured && group.badge
      ? `<span class="product-group__badge">${escapeHtml(group.badge)}</span>`
      : "";
    return `
      <div class="product-group mb-5${group.featured ? " product-group--featured" : ""}">
        <div class="product-group__header mb-4" data-aos="fade-up">
          <span class="product-group__index" aria-hidden="true">${String(groupIndex + 1).padStart(2, "0")}</span>
          <div>
            <p class="eyebrow mb-1">${escapeHtml(group.eyebrow)}</p>
            <h3 class="h4 mb-0">${escapeHtml(group.label)}${badge}</h3>
          </div>
        </div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
          ${cards}
        </div>
      </div>`;
  }).join("");
}

function renderProductCard(product, index, isFeatured) {
  const name = escapeHtml(product.name);
  const material = escapeHtml(product.material);
  const tag = isFeatured ? `<span class="product-card__tag">Best Seller</span>` : "";
  return `
    <div class="col">
      <div class="product-card hover-lift${isFeatured ? " product-card--featured" : ""}" role="button" tabindex="0" data-product-id="${product.id}"
        aria-label="Xem chi tiết ${name}" data-aos="fade-up" data-aos-delay="${(index % 3) * 80}">
        <div class="product-card__media">
          ${tag}
          <img src="${product.image}" alt="${name}" loading="lazy">
        </div>
        <div class="product-card__body" style="align-items: center">
          <p class="product-card__material mb-0">${material}</p>
          <h4 class="product-card__name mb-0">${name}</h4>
          <p class="product-card__price mb-0">${formatVND(product.priceVND)}</p>
        </div>
      </div>
    </div>`;
}

/* ==========================================================================
   Product detail modal — carousel + color pick + order handoff
   ========================================================================== */

function initProductModal() {
  const groupsContainer = document.getElementById("productGroups");
  const modalEl = document.getElementById("productModal");
  if (!groupsContainer || !modalEl || typeof PRODUCTS === "undefined" || typeof bootstrap === "undefined") return;

  const modalTitle = document.getElementById("productModalLabel");
  const modalMaterial = document.getElementById("productModalMaterial");
  const modalDesc = document.getElementById("productModalDesc");
  const modalPrice = document.getElementById("productModalPrice");
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

    modalTitle.textContent = product.name;
    modalMaterial.textContent = product.material;
    modalDesc.textContent = product.description;
    modalPrice.textContent = formatVND(product.priceVND);

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
    const productId = currentProduct.id;
    const colorSelection = selectedParts ? selectedParts.map(({ label, colorName }) => ({ label, colorName })) : selectedColor;
    modalEl.addEventListener("hidden.bs.modal", () => {
      orderInFlight = false;
      prefillOrderForm(productId, colorSelection);
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
   Gallery — GLightbox
   ========================================================================== */

function initGallery() {
  const gallery = document.querySelector(".gallery-masonry");
  if (!gallery || typeof GLightbox === "undefined") return;

  let lastFocusedTrigger = null;
  gallery.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => { lastFocusedTrigger = item; });
  });

  const lightbox = GLightbox({ selector: ".glightbox" });
  lightbox.on("close", () => {
    if (lastFocusedTrigger) lastFocusedTrigger.focus();
  });
}

/* ==========================================================================
   Order — form, live preview, product/color cascade, submit
   ========================================================================== */

function prefillOrderForm(productId, colorSelection) {
  const productSelect = document.getElementById("productSelect");
  const colorSelect = document.getElementById("colorSelect");
  if (!productSelect || !colorSelect || typeof PRODUCTS === "undefined") return;
  if (!PRODUCTS.some((p) => p.id === productId)) return;

  productSelect.value = productId;
  productSelect.dispatchEvent(new Event("change"));

  if (Array.isArray(colorSelection)) {
    colorSelection.forEach(({ label, colorName }) => {
      const partSelect = document.querySelector(`.combo-color-select[data-part-label="${CSS.escape(label)}"]`);
      if (partSelect && [...partSelect.options].some((o) => o.value === colorName)) {
        partSelect.value = colorName;
      }
    });
  } else if (colorSelection && [...colorSelect.options].some((o) => o.value === colorSelection)) {
    colorSelect.value = colorSelection;
  }
}

function initOrderPage() {
  const form = document.getElementById("orderForm");
  if (!form || typeof PRODUCTS === "undefined") return;

  const productSelect = document.getElementById("productSelect");
  const colorSelect = document.getElementById("colorSelect");
  const colorFieldWrap = document.getElementById("colorFieldWrap");
  const comboColorFields = document.getElementById("comboColorFields");
  const engravingInput = document.getElementById("engravingInput");
  const previewText = document.getElementById("previewText");
  const successPanel = document.getElementById("orderSuccess");

  PRODUCTS.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = `${p.name} — ${formatVND(p.priceVND)}`;
    productSelect.appendChild(opt);
  });

  function populateColors(productId) {
    const product = PRODUCTS.find((p) => p.id === productId);
    colorSelect.innerHTML = "";
    comboColorFields.innerHTML = "";

    if (product && product.parts) {
      colorFieldWrap.classList.add("d-none");
      comboColorFields.classList.remove("d-none");
      comboColorFields.innerHTML = product.parts.map((part, i) => `
        <div class="col-sm-6 mb-3">
          <label for="comboColor-${i}">Màu ${escapeHtml(part.label)}</label>
          <select class="form-select combo-color-select" id="comboColor-${i}" data-part-label="${escapeHtml(part.label)}">
            ${part.colors.map((c) => `<option value="${escapeHtml(c.name)}">${escapeHtml(c.name)}</option>`).join("")}
          </select>
        </div>`).join("");
      return;
    }

    comboColorFields.classList.add("d-none");
    colorFieldWrap.classList.remove("d-none");
    if (!product) return;
    product.colors.forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c.name;
      opt.textContent = c.name;
      colorSelect.appendChild(opt);
    });
  }

  productSelect.addEventListener("change", () => populateColors(productSelect.value));

  engravingInput.addEventListener("input", () => {
    previewText.textContent = engravingInput.value.trim() || "Sophia";
  });

  populateColors(productSelect.value);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const selectedProduct = PRODUCTS.find((p) => p.id === productSelect.value);
    const color = selectedProduct && selectedProduct.parts
      ? [...comboColorFields.querySelectorAll(".combo-color-select")]
          .map((s) => `${s.dataset.partLabel}: ${s.value}`).join(", ")
      : colorSelect.value;

    const payload = {
      customerName: document.getElementById("customerNameInput").value.trim(),
      phone: document.getElementById("phoneInput").value.trim(),
      contact: document.getElementById("contactInput").value.trim(),
      address: document.getElementById("addressInput").value.trim(),
      productId: productSelect.value,
      productLabel: productSelect.selectedOptions[0]?.textContent || productSelect.value,
      color: color,
      engraving: engravingInput.value.trim(),
      quantity: Number(document.getElementById("quantityInput").value) || 1,
      note: document.getElementById("noteInput").value.trim()
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = "Đang gửi đơn...";

    const result = await submitOrder(payload);

    if (!result.ok) {
      submitBtn.disabled = false;
      submitBtn.textContent = "Đặt Hàng Ngay";
      alert("Rất tiếc, có lỗi xảy ra khi gửi đơn. Vui lòng thử lại hoặc liên hệ trực tiếp qua Zalo/Facebook.");
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
      previewText.textContent = "Sophia";
      populateColors(productSelect.value);
      successPanel.classList.remove("is-visible");
      const submitBtn = form.querySelector('button[type="submit"]');
      submitBtn.disabled = false;
      submitBtn.textContent = "Đặt Hàng Ngay";
    });
  }
}
