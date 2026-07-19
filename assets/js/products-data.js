/* Shared product catalog — single source for index.html product groups, modal carousel, and order form. */
const PRODUCT_GROUPS = [
  { id: "combo", label: "Combo Set", eyebrow: "Trọn Bộ Tiết Kiệm", featured: true, badge: "Best Seller" },
  { id: "luoc", label: "Lược", eyebrow: "" },
  { id: "guong", label: "Gương", eyebrow: "Xinh Xắn Tiện Lợi" },
  { id: "kep-thuong", label: "Kẹp Thường", eyebrow: "Đơn Giản Mỗi Ngày" },
  { id: "kep-doi-mau", label: "Kẹp Đổi Màu & Form Dài", eyebrow: "Đổi Màu Diệu Kỳ" },
  { id: "charm", label: "Charm", eyebrow: "Điểm Nhấn Đáng Yêu" }
];

/*
  Combo products use `parts` instead of `colors`: each part (gương/lược/kẹp...) has its
  own color list, so the shopper picks a color per part in the product modal. Regular
  (non-combo) products keep the single top-level `colors` array as before.
*/
const PRODUCTS = [
  {
    id: "combo-1",
    name: "Combo Set 1 — Gương, Lược & 2 Kẹp",
    description: "Trọn bộ 4 món tiện lợi: 1 gương, 1 lược và 2 kẹp tóc — chọn màu riêng cho từng món.",
    priceVND: 199000,
    material: "Bộ 4 món",
    group: "combo",
    parts: [
      {
        label: "Gương",
        qty: 1,
        colors: [
          { name: "Hồng phấn", hex: "#F3A6C9" },
          { name: "Trắng ngà", hex: "#FAF6F0" },
          { name: "Vàng", hex: "#F5E1A4" }
        ]
      },
      {
        label: "Lược",
        qty: 1,
        colors: [
          { name: "Hồng phấn", hex: "#F3A6C9" },
          { name: "Trắng ngà", hex: "#FAF6F0" },
          { name: "Nâu gỗ", hex: "#C8956D" }
        ]
      },
      {
        label: "Kẹp 01",
        qty: 1,
        colors: [
          { name: "Hồng phấn", hex: "#F3A6C9" },
          { name: "Trắng ngà", hex: "#FAF6F0" },
          { name: "Vàng", hex: "#F5E1A4" }
        ]
      },
      {
        label: "Kẹp 02",
        qty: 1,
        colors: [
          { name: "Hồng phấn", hex: "#F3A6C9" },
          { name: "Trắng ngà", hex: "#FAF6F0" },
          { name: "Vàng", hex: "#F5E1A4" }
        ]
      }
    ],
    image: "assets/images/combo1.png",
    images: ["assets/images/combo1.png"]
  },
  {
    id: "combo-2",
    name: "Combo Set 2 — Gương & Lược Mini",
    description: "Bộ đôi nhỏ gọn: 1 gương và 1 lược mini, tiện mang theo mỗi ngày — chọn màu riêng cho từng món.",
    priceVND: 129000,
    material: "Bộ 2 món",
    group: "combo",
    parts: [
      {
        label: "Gương",
        qty: 1,
        colors: [
          { name: "Hồng phấn", hex: "#F3A6C9" },
          { name: "Trắng ngà", hex: "#FAF6F0" },
          { name: "Vàng", hex: "#F5E1A4" }
        ]
      },
      {
        label: "Lược Mini",
        qty: 1,
        colors: [
          { name: "Hồng phấn", hex: "#F3A6C9" },
          { name: "Trắng ngà", hex: "#FAF6F0" },
          { name: "Nâu gỗ", hex: "#C8956D" }
        ]
      }
    ],
    image: "assets/images/combo2.png",
    images: ["assets/images/combo2.png"]
  },
  {
    id: "combo-3",
    name: "Combo Set 3 — 3 Kẹp Tóc",
    description: "Bộ 3 kẹp đa phong cách: 1 kẹp thường, 1 kẹp đổi màu và 1 kẹp nơ — chọn màu riêng cho từng chiếc.",
    priceVND: 159000,
    material: "Bộ 3 món",
    group: "combo",
    parts: [
      {
        label: "Kẹp Thường",
        qty: 1,
        colors: [
          { name: "Hồng phấn", hex: "#F3A6C9" },
          { name: "Trắng ngà", hex: "#FAF6F0" },
          { name: "Nâu gỗ", hex: "#C8956D" }
        ]
      },
      {
        label: "Kẹp Đổi Màu",
        qty: 1,
        colors: [
          { name: "Tím đổi hồng", hex: "#B48BD1" },
          { name: "Xanh đổi tím", hex: "#8FB8D8" }
        ]
      },
      {
        label: "Kẹp Nơ",
        qty: 1,
        colors: [
          { name: "Hồng đào", hex: "#F3A6C9" },
          { name: "Đỏ đô", hex: "#B5495B" },
          { name: "Trắng kem", hex: "#FAF6F0" }
        ]
      }
    ],
    image: "assets/images/combo3.png",
    images: ["assets/images/combo3.png"]
  },

  {
    id: "luoc-to",
    name: "Lược To",
    description: "Lược gỗ nhỏ gọn, dễ mang theo, chải tóc mượt không gây tĩnh điện.",
    priceVND: 59000,
    material: "3 màu sắc",
    group: "luoc",
    colors: [
      { name: "B1", hex: "#EEF8CD" },
      { name: "B2", hex: "#95BDD7" },
      { name: "B3", hex: "#FFB6A6" }
    ],
    image: "assets/images/luocto.png",
    images: ["assets/images/luocto.png"]
  },
  {
    id: "luoc-mini",
    name: "Lược Mini",
    description: "Lược mini cầm chắc tay, phù hợp chải tóc dày và tóc dài.",
    priceVND: 79000,
    material: "2 màu sắc",
    group: "luoc",
    colors: [
      { name: "Hồng phấn", hex: "#F3A6C9" },
      { name: "Trắng ngà", hex: "#FAF6F0" },
      { name: "Vàng", hex: "#F5E1A4" }
    ],
    image: "assets/images/luocmini.png",
    images: ["assets/images/luocmini.png",]
  },

  {
    id: "guong-custom-01",
    name: "Gương Custom",
    description: "Gương nhỏ gọn bỏ túi, mặt gương tráng rõ nét, tiện dùng khi ra ngoài.",
    priceVND: 49000,
    material: "Nhựa cao cấp",
    group: "guong",
    colors: [
      { name: "Hồng", hex: "#F3A6C9" },
      { name: "Be", hex: "#eeeaafff" },
      { name: "Trắng", hex: "#f5f5f5ff" }
    ],
    image: "assets/images/guongcustomG_01.png",
    images: ["assets/images/guongcustomG_01.png"]
  },
  {
    id: "guong-custom-02",
    name: "Gương Công chúa",
    description: "Gương đứng để bàn trang điểm, chân đế chắc chắn, mặt gương lớn nhìn rõ toàn khuôn mặt.",
    priceVND: 99000,
    material: "Nhựa & kính cường lực",
    group: "guong",
    colors: [
      { name: "Vàng", hex: "#f0c88cff" },
      { name: "Vàng Hồng", hex: "#d6b458ff" },
      { name: "Bạc", hex: "#cacacaff" }
    ],
    image: "assets/images/guongcustomG_02.png",
    images: ["assets/images/guongcustomG_02.png"]
  },

  {
    id: "guong-gap",
    name: "Gương Gập Bỏ Túi",
    description: "Gương nhỏ gọn bỏ túi, mặt gương tráng rõ nét, tiện dùng khi ra ngoài.",
    priceVND: 49000,
    material: "Nhựa cao cấp",
    group: "guong",
    colors: [
      { name: "Holo 1 - Tím", hex: "#b48bd1ff" },
      { name: "Holo 2 - Bạc", hex: "#cacacaff" },
      { name: "Holo 3 - Trắng", hex: "#faf6f0ff" }
    ],
    image: "assets/images/guongapholo.png",
    images: ["assets/images/guongapholo.png"]
  },
  {
    id: "guong-mini",
    name: "Gương Mini",
    description: "Gương nhỏ gọn cầm tay, mặt gương tráng rõ nét, tiện dùng khi ra ngoài.",
    priceVND: 49000,
    material: "Nhựa cao cấp",
    group: "guong",
    colors: [
      { name: "Trắng", hex: "#faf6f0ff" }
    ],
    image: "assets/images/guongmini.png",
    images: ["assets/images/guongmini.png"]
  },
  {
    id: "guong-tim",
    name: "Gương Tim",
    description: "Gương nhỏ gọn cầm tay, mặt gương tráng rõ nét, tiện dùng khi ra ngoài.",
    priceVND: 59000,
    material: "Nhựa cao cấp",
    group: "guong",
    colors: [
      { name: "Trắng", hex: "#faf6f0ff" },
      { name: "Hồng", hex: "#faf6f0ff" }
    ],
    image: "assets/images/guongtim.png",
    images: ["assets/images/guongtim.png"]
  },

  {
    id: "kep-a",
    name: "Kẹp Custom A",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "Nhựa đổi màu nhiệt",
    group: "kep-thuong",
    colors: [
      { name: "A1 - Tím", hex: "#B48BD1" },
      { name: "A2 - Xanh Ngọc", hex: "#96e7bbff" },
      { name: "A3 - Hồng", hex: "#f6c4f6ff" },
      { name: "A4 - Trắng", hex: "rgba(240, 240, 240, 1)ff" },
      { name: "A5 - Than", hex: "#383d41ff" }
    ],
    image: "assets/images/kepa.png",
    images: ["assets/images/kepa.png"]
  },
  {
    id: "kep-form-dai",
    name: "Kẹp Form Dài Basic",
    description: "Kẹp form dài giữ tóc chắc, gọn gàng cả ngày, phù hợp tóc dày.",
    priceVND: 49000,
    material: "Hợp kim mạ",
    group: "kep-doi-mau",
    colors: [
      { name: "Vàng", hex: "#D4AF37" },
      { name: "Bạc", hex: "#C7C7C7" },
      { name: "Đen", hex: "#2B2B2B" }
    ],
    image: "assets/images/gallery-customer-02.svg",
    images: ["assets/images/gallery-customer-02.svg", "assets/images/gallery-lifestyle-02.svg", "assets/images/gallery-engraving-02.svg"]
  },

  {
    id: "charm-trai-tim",
    name: "Charm Trái Tim",
    description: "Charm hình trái tim đính kèm kẹp/lược, phong cách nhỏ xinh đáng yêu.",
    priceVND: 19000,
    material: "Hợp kim mạ",
    group: "charm",
    colors: [
      { name: "Vàng", hex: "#D4AF37" },
      { name: "Bạc", hex: "#C7C7C7" },
      { name: "Hồng vàng", hex: "#E8B4B8" }
    ],
    image: "assets/images/gallery-customer-03.svg",
    images: ["assets/images/gallery-customer-03.svg", "assets/images/gallery-lifestyle-03.svg", "assets/images/gallery-engraving-03.svg"]
  },
  {
    id: "charm-ngoi-sao",
    name: "Charm Ngôi Sao",
    description: "Charm hình ngôi sao lấp lánh, dễ dàng gắn thêm vào kẹp hoặc lược yêu thích.",
    priceVND: 19000,
    material: "Hợp kim mạ",
    group: "charm",
    colors: [
      { name: "Vàng", hex: "#D4AF37" },
      { name: "Bạc", hex: "#C7C7C7" }
    ],
    image: "assets/images/gallery-engraving-01.svg",
    images: ["assets/images/gallery-engraving-01.svg", "assets/images/gallery-lifestyle-01.svg", "assets/images/gallery-packaging-01.svg"]
  }
];

function formatVND(amount) {
  return amount.toLocaleString("vi-VN") + "₫";
}
