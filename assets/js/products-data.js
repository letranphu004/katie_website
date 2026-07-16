/* Shared product catalog — single source for index.html product groups, modal carousel, and order form. */
const PRODUCT_GROUPS = [
  { id: "custom", label: "Kẹp Custom", eyebrow: "Mộc Mạc & Tự Nhiên" },
  { id: "van-da", label: "Kẹp Vân đá", eyebrow: "Sang Trọng & Nổi Bật" }
];

const PRODUCTS = [
  {
    id: "kep-custom-a",
    name: "Kẹp Custom A",
    description: "5 màu sắc",
    priceVND: 149000,
    material: "5 màu sắc",
    group: "custom",
    colors: [
      { name: "Gỗ tự nhiên", hex: "#C8956D" },
      { name: "Hồng phấn", hex: "#F3A6C9" },
      { name: "Trắng ngà", hex: "#FAF6F0" }
    ],
    image: "assets/images/tibeimg1.jpg",
    images: ["assets/images/tibeimg1.jpg", "assets/images/tibeimg1.jpg", "assets/images/gallery-engraving-01.svg"]
  },

  {
    id: "kep-custom-b",
    name: "Kẹp Custom B",
    description: "6 màu sắc",
    priceVND: 149000,
    material: "6 màu sắc",
    group: "custom",
    colors: [
      { name: "Gỗ tự nhiên", hex: "#C8956D" },
      { name: "Hồng phấn", hex: "#F3A6C9" },
      { name: "Trắng ngà", hex: "#FAF6F0" }
    ],
    image: "assets/images/tibeimg1.jpg",
    images: ["assets/images/tibeimg1.jpg", "assets/images/tibeimg1.jpg", "assets/images/gallery-engraving-01.svg"]
  },
  {
    id: "kep-custom-c",
    name: "Kẹp Custom C",
    description: "4 màu sắc",
    priceVND: 149000,
    material: "4 màu sắc",
    group: "custom",
    colors: [
      { name: "Gỗ tự nhiên", hex: "#C8956D" },
      { name: "Hồng phấn", hex: "#F3A6C9" },
      { name: "Trắng ngà", hex: "#FAF6F0" }
    ],
    image: "assets/images/tibeimg1.jpg",
    images: ["assets/images/tibeimg1.jpg", "assets/images/tibeimg1.jpg", "assets/images/gallery-engraving-01.svg"]
  },
  {
    id: "kep-custom-d",
    name: "Kẹp Custom D",
    description: "2 màu sắc",
    priceVND: 149000,
    material: "2 màu sắc",
    group: "custom",
    colors: [
      { name: "Gỗ tự nhiên", hex: "#C8956D" },
      { name: "Hồng phấn", hex: "#F3A6C9" },
      { name: "Trắng ngà", hex: "#FAF6F0" }
    ],
    image: "assets/images/tibeimg1.jpg",
    images: ["assets/images/tibeimg1.jpg", "assets/images/tibeimg1.jpg", "assets/images/gallery-engraving-01.svg"]
  },

  {
    id: "kep-da-khac-ten",
    name: "Kẹp Tóc Đính Đá Khắc Tên",
    description: "Kẹp hợp kim mạ vàng 18K, đính đá pha lê lấp lánh, khắc tên viền tinh tế sang trọng.",
    priceVND: 249000,
    material: "Hợp kim mạ vàng 18K",
    group: "van-da",
    colors: [
      { name: "Vàng 18K", hex: "#D4AF37" },
      { name: "Bạc", hex: "#C7C7C7" },
      { name: "Hồng vàng", hex: "#E8B4B8" }
    ],
    image: "assets/images/tibeimg1.jpg",
    images: ["assets/images/tibeimg1.jpg", "assets/images/gallery-engraving-03.svg", "assets/images/gallery-packaging-02.svg"]
  },
  {
    id: "kep-ruy-bang-lua",
    name: "Kẹp Tóc Ruy Băng Lụa Khắc Tên",
    description: "Kết hợp lụa mềm mại và nền gỗ chắc chắn, khắc tên nổi bật trên dải lụa satin.",
    priceVND: 169000,
    material: "Lụa satin & gỗ ép",
    group: "van-da",
    colors: [
      { name: "Hồng đào", hex: "#F3A6C9" },
      { name: "Đỏ đô", hex: "#B5495B" },
      { name: "Trắng kem", hex: "#FAF6F0" }
    ],
    image: "assets/images/tibeimg1.jpg",
    images: ["assets/images/tibeimg1.jpg", "assets/images/gallery-lifestyle-02.svg", "assets/images/gallery-packaging-03.svg"]
  },
  {
    id: "kep-hoa-cuc",
    name: "Kẹp Tóc Hoa Cúc Khắc Tên",
    description: "Thiết kế hoa cúc dễ thương từ nhựa acrylic trong, khắc tên ẩn tinh tế giữa cánh hoa.",
    priceVND: 119000,
    material: "Nhựa acrylic cao cấp",
    group: "van-da",
    colors: [
      { name: "Trắng trong", hex: "#FFFFFF" },
      { name: "Hồng trong", hex: "#F3A6C9" },
      { name: "Vàng trong", hex: "#F5E1A4" }
    ],
    image: "assets/images/product-06.svg",
    images: ["assets/images/product-06.svg", "assets/images/gallery-customer-02.svg", "assets/images/gallery-engraving-01.svg"]
  },
  {
    id: "kep-doi-cap-doi",
    name: "Bộ Kẹp Tóc Đôi Khắc Tên Cặp Đôi",
    description: "Bộ 2 kẹp gỗ óc chó khắc tên đôi, món quà ý nghĩa cho chị em hoặc bạn thân.",
    priceVND: 279000,
    material: "Gỗ óc chó tự nhiên",
    group: "custom-a",
    colors: [
      { name: "Gỗ óc chó", hex: "#6B4226" },
      { name: "Gỗ sồi", hex: "#C8956D" }
    ],
    image: "assets/images/product-07.svg",
    images: ["assets/images/product-07.svg", "assets/images/gallery-customer-03.svg", "assets/images/gallery-packaging-01.svg"]
  },
  {
    id: "kep-trong-suot",
    name: "Kẹp Tóc Trong Suốt Khắc Tên",
    description: "Phong cách tối giản với nhựa trong suốt cao cấp, khắc tên nổi hiệu ứng 3D tinh xảo.",
    priceVND: 129000,
    material: "Nhựa trong cao cấp (PETG)",
    group: "van-da",
    colors: [
      { name: "Trong suốt", hex: "#FFFFFF" },
      { name: "Ánh hồng", hex: "#F8D7E6" },
      { name: "Ánh vàng", hex: "#F5E1A4" }
    ],
    image: "assets/images/product-08.svg",
    images: ["assets/images/product-08.svg", "assets/images/gallery-lifestyle-01.svg", "assets/images/gallery-engraving-02.svg"]
  }
];

function formatVND(amount) {
  return amount.toLocaleString("vi-VN") + "₫";
}
