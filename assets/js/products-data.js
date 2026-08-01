/* Shared product catalog — single source for the filter chips, product gallery, modal, and order form. */
const PRODUCT_GROUPS = [
  { id: "combo", label: "Combo" },
  { id: "luoc", label: "Comb" },
  { id: "guong", label: "Mirror" },
  { id: "kep-thuong", label: "Hair Claw" },
  { id: "kep-doi-mau", label: "Iridescent" },
  { id: "kep-dac-biet", label: "Grace Claw" },
  { id: "charm", label: "Charm" }
];

/*
  Combo products use `parts` instead of `colors`: each part (gương/lược/kẹp...) has its
  own color list, so the shopper picks a color per part in the product modal. Regular
  (non-combo) products keep the single top-level `colors` array as before.

  Each color entry is `{ name, hex?, image?, description? }`. `image` — a path under
  `assets/images/color/` (drop the actual photo there first) — shows a real photo swatch,
  useful when a color depends on texture/pattern (marble, glitter, iridescent) rather than
  a single flat tone; when set, `hex` isn't needed. Without `image`, `hex` is required as
  the flat-color swatch fill. `description` is optional — a short line about that specific
  color (e.g. its texture/finish); it's shown in the product modal and updates as the
  shopper clicks between colors.

  Below the color picker, the product modal shows an info block built from `material`
  (Chất liệu, already used elsewhere), plus two optional product-level fields — `size`
  (Kích thước) and `engraveLength` (Độ dài ký tự đẹp nhất, e.g. "6-8 ký tự") — each on
  its own line. Any of the three that's missing is skipped rather than shown blank.

  `intro` (optional, product-level) is a longer free-text description/introduction shown
  at the very top of the modal's right column, above the color picker. Mainly meant for
  combo products — a combo bundles several parts, so it benefits from an overview
  paragraph before the shopper starts picking a color per part. Omitted entirely (no
  empty line) when not set.
*/
const PRODUCTS = [
  {
    id: "combo-1",
    name: "Combo Set 1 — Gương, Lược & 2 Kẹp",
    description: "Trọn bộ 4 món tiện lợi: 1 gương, 1 lược và 2 kẹp tóc — chọn màu riêng cho từng món.",
    priceVND: 199000,
    group: "combo",
    intro: "Set này gồm đủ 4 món hay dùng chung: 1 gương, 1 lược và 2 chiếc kẹp, cho bạn nguyên một góc làm đẹp nhỏ xinh mang theo đâu cũng được. Mỗi món tự chọn màu riêng theo ý thích, làm quà tặng hay mua sẵn dùng dần đều hợp nha.",
    parts: [
      {
        label: "Mirror",
        qty: 1,
        colors: [
          { name: "pink", image: "assets/images/color/pink.png" },
          { name: "beige", image: "assets/images/color/begie.png" },
          { name: "white", image: "assets/images/color/white.png" },
          { name: "gold", image: "assets/images/color/classic_gold.png" },
          { name: "rose gold", image: "assets/images/color/classic_rose_gold.png" },
          { name: "silver", image: "assets/images/color/classic_silver.png" }
        ]
      },
      {
        label: "Comb",
        qty: 1,
        colors: [
          { name: "ivory pear", image: "assets/images/color/ivory_pearl.png" },
          { name: "pearl white", image: "assets/images/color/pearl_white.png" },
          { name: "pearl pink", image: "assets/images/color/pearl_pink.png" }
        ]
      },
      {
        label: "Hair Claw 1",
        qty: 1,
        colors: [
          { name: "marble edition", image: "assets/images/color/hair_claw_marble_pink.png" },
          { name: "baby edition", image: "assets/images/color/hair_claw_baby_white.png" },
          { name: "ribbon edition", image: "assets/images/color/hair_claw_ribbon_pink.png" },
          { name: "daisy edition", image: "assets/images/color/hair_claw_daisy_white.png" },
          { name: "rosie edition", image: "assets/images/color/hair_claw_rosie_pink.png" },
          { name: "luna edition", image: "assets/images/color/hair_claw_luna_purple.png" },
          { name: "minimal edition", image: "assets/images/color/hair_claw_minimal_blue.png" },
          { name: "aurora edition", image: "assets/images/color/hair_claw_aurora_mint.png" },
          { name: "bloom edition", image: "assets/images/color/hair_claw_bloom_pastel.png" }
        ]
      },
      {
        label: "Hair Claw 2",
        qty: 1,
        colors: [
          { name: "marble edition", image: "assets/images/color/hair_claw_marble_pink.png" },
          { name: "baby edition", image: "assets/images/color/hair_claw_baby_white.png" },
          { name: "ribbon edition", image: "assets/images/color/hair_claw_ribbon_pink.png" },
          { name: "daisy edition", image: "assets/images/color/hair_claw_daisy_white.png" },
          { name: "rosie edition", image: "assets/images/color/hair_claw_rosie_pink.png" },
          { name: "luna edition", image: "assets/images/color/hair_claw_luna_purple.png" },
          { name: "minimal edition", image: "assets/images/color/hair_claw_minimal_blue.png" },
          { name: "aurora edition", image: "assets/images/color/hair_claw_aurora_mint.png" },
          { name: "bloom edition", image: "assets/images/color/hair_claw_bloom_pastel.png" }
        ]
      }
    ],
    image: "assets/images/Combo1.png",
    images: ["assets/images/Combo1.png"]
  },
  {
    id: "combo-2",
    name: "Combo Set 2 — Gương & Lược Mini",
    description: "Bộ đôi nhỏ gọn: 1 gương và 1 lược mini, tiện mang theo mỗi ngày — chọn màu riêng cho từng món.",
    priceVND: 129000,
    group: "combo",
    intro: "Bộ đôi nhỏ gọn gồm 1 gương và 1 lược mini, bỏ vừa túi xách hay balo mang theo mỗi ngày không hề vướng víu. Gương với lược bạn chọn màu riêng, thích tone-sur-tone hay phối màu khác nhau đều được nha.",
    parts: [
      {
        label: "Mirror",
        qty: 1,
        colors: [
          { name: "pink", image: "assets/images/color/pink.png" },
          { name: "beige", image: "assets/images/color/begie.png" },
          { name: "white", image: "assets/images/color/white.png" },
          { name: "gold", image: "assets/images/color/classic_gold.png" },
          { name: "rose gold", image: "assets/images/color/classic_rose_gold.png" },
          { name: "silver", image: "assets/images/color/classic_silver.png" }
        ]
      },
      {
        label: "Comb",
        qty: 1,
        colors: [
          { name: "white marble", image: "assets/images/color/white_marble.png" },
          { name: "pink marble", image: "assets/images/color/pink_marble.png" },
        ]
      }
    ],
    image: "assets/images/Combo2.png",
    images: ["assets/images/Combo2.png"]
  },
  {
    id: "combo-3",
    name: "Combo Set 3 — Kẹp Tóc, Kẹp Đổi Màu & Gương",
    description: "Bộ 3 món đa phong cách: 1 kẹp tóc, 1 kẹp đổi màu và 1 gương — chọn màu riêng cho từng món.",
    priceVND: 159000,
    group: "combo",
    intro: "Set 3 món cho bạn nào thích đổi qua đổi lại nhiều kiểu: 1 kẹp tóc bình thường, 1 kẹp đổi màu theo nhiệt độ tay chơi vui vui, với 1 chiếc gương nhỏ bỏ túi tiện lắm. Mỗi món tự chọn màu riêng, tha hồ phối theo gu của bạn.",
    parts: [
      {
        label: "Hair Claw",
        qty: 1,
        colors: [
          { name: "marble edition", image: "assets/images/color/hair_claw_marble_pink.png" },
          { name: "baby edition", image: "assets/images/color/hair_claw_baby_white.png" },
          { name: "ribbon edition", image: "assets/images/color/hair_claw_ribbon_pink.png" },
          { name: "daisy edition", image: "assets/images/color/hair_claw_daisy_white.png" },
          { name: "rosie edition", image: "assets/images/color/hair_claw_rosie_pink.png" },
          { name: "luna edition", image: "assets/images/color/hair_claw_luna_purple.png" },
          { name: "minimal edition", image: "assets/images/color/hair_claw_minimal_blue.png" },
          { name: "aurora edition", image: "assets/images/color/hair_claw_aurora_mint.png" },
          { name: "bloom edition", image: "assets/images/color/hair_claw_bloom_pastel.png" }
        ]
      },
      {
        label: "Iridescent",
        qty: 1,
        colors: [
          { name: "iridescent one edition", image: "assets/images/color/iridescent_one_pink.png" },
          { name: "iridescent two edition", image: "assets/images/color/iridescent_two_candy.png" },
          { name: "iridescent three edition", image: "assets/images/color/iridescent_three_blue.png" },
          { name: "grace claw edition", image: "assets/images/color/dream_mist.png" },
        ]
      },
      {
        label: "Mirror",
        qty: 1,
        colors: [
          { name: "Hologram edition", image: "assets/images/color/holo_silver.png" },
          { name: "Heart edition", image: "assets/images/color/heart_rose.png" },
          { name: "Tiny edition", image: "assets/images/color/mirror_tiny.png" },
        ]
      }
    ],
    image: "assets/images/Combo3.png",
    images: ["assets/images/Combo3.png"]
  },

  {
    id: "comb_pearl",
    name: "Comb Pearl",
    description: "Lược gỗ nhỏ gọn, dễ mang theo, chải tóc mượt không gây tĩnh điện.",
    priceVND: 59000,
    material: "3 màu sắc",
    size: "22.5 x 6.2 cm",
    engraveLength: "6-8 ký tự",
    group: "luoc",
    colors: [
      { name: "ivory pear", image: "assets/images/color/ivory_pearl.png", description: "Màu ngọc trai" },
      { name: "pearl white", image: "assets/images/color/pearl_white.png" },
      { name: "pearl pink", image: "assets/images/color/pearl_pink.png" }
    ],
    image: "assets/images/comb_pearl.png",
    images: ["assets/images/comb_pearl.png"]
  },
  {
    id: "comb_tiny",
    name: "Comb Tiny",
    description: "Lược mini cầm chắc tay, phù hợp chải tóc dày và tóc dài.",
    priceVND: 79000,
    material: "2 màu sắc",
    size: "14 x 5.5 cm",
    engraveLength: "4-6 ký tự",
    group: "luoc",
    colors: [
      { name: "white marble", image: "assets/images/color/white_marble.png" },
      { name: "pink marble", image: "assets/images/color/pink_marble.png" },
    ],
    image: "assets/images/comb_tiny.png",
    images: ["assets/images/comb_tiny.png",]
  },

  {
    id: "mirror_minimal",
    name: "Mirror Minimal",
    description: "Gương nhỏ gọn bỏ túi, mặt gương tráng rõ nét, tiện dùng khi ra ngoài.",
    priceVND: 49000,
    material: "nhựa cao cấp , an toàn",
    size: "25 x 11.5 cm",
    engraveLength: "8-10 ký tự",
    group: "guong",
    colors: [
      { name: "pink", image: "assets/images/color/pink.png" },
      { name: "beige", image: "assets/images/color/begie.png" },
      { name: "white", image: "assets/images/color/white.png" },
    ],
    image: "assets/images/mirror_minimal.png",
    images: ["assets/images/mirror_minimal.png"]
  },
  {
    id: "mirror_classic",
    name: "Mirror Classic",
    description: "Gương đứng để bàn trang điểm, chân đế chắc chắn, mặt gương lớn nhìn rõ toàn khuôn mặt.",
    priceVND: 99000,
    material: "Nhựa & kính cường lực",
    size: "24.5 x 11 cm",
    engraveLength: "8-10 ký tự",
    group: "guong",
    colors: [
      { name: "gold", image: "assets/images/color/classic_gold.png" },
      { name: "rose gold", image: "assets/images/color/classic_rose_gold.png" },
      { name: "silver", image: "assets/images/color/classic_silver.png" }
    ],
    image: "assets/images/mirror_classic.png",
    images: ["assets/images/mirror_classic.png"]
  },

  {
    id: "mirror_hologram",
    name: "Mirror Hologram",
    description: "Gương nhỏ gọn bỏ túi, mặt gương tráng rõ nét, tiện dùng khi ra ngoài.",
    priceVND: 49000,
    material: "nhựa cao cấp , an toàn",
    group: "guong",
    colors: [
      { name: "holo purple", image: "assets/images/color/holo_purple.png" },
      { name: "holo silver", image: "assets/images/color/holo_silver.png" },
      { name: "holo white", image: "assets/images/color/holo_white.png" },
    ],
    image: "assets/images/mirror_hologram.png",
    images: ["assets/images/mirror_hologram.png"]
  },
  {
    id: "mirror_tiny",
    name: "Mirror Tiny",
    description: "Gương nhỏ gọn cầm tay, mặt gương tráng rõ nét, tiện dùng khi ra ngoài.",
    priceVND: 49000,
    material: "nhựa cao cấp , an toàn",
    size: "12.5 x 5.5 cm",
    engraveLength: "3-5 ký tự",
    group: "guong",
    colors: [
      { name: "Tiny", image: "assets/images/color/mirror_tiny.png" },
    ],
    image: "assets/images/mirror_tiny.png",
    images: ["assets/images/mirror_tiny.png"]
  },
  {
    id: "mirror_heart",
    name: "Mirror Heart",
    description: "Gương nhỏ gọn cầm tay, mặt gương tráng rõ nét, tiện dùng khi ra ngoài.",
    priceVND: 59000,
    material: "nhựa cao cấp , an toàn",
    group: "guong",
    colors: [
      { name: "heart silver", image: "assets/images/color/holo_silver.png" },
      { name: "heart rose", image: "assets/images/color/heart_rose.png" },
    ],
    image: "assets/images/mirror_heart.png",
    images: ["assets/images/mirror_heart.png"]
  },

  {
    id: "hair_claw_marble",
    name: "hair Claw Marble",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "nhựa cao cấp , an toàn",
    size: "8.8cm",
    engraveLength: "6-7 ký tự",
    group: "kep-thuong",
    colors: [
      { name: "purple marble", image: "assets/images/color/hair_claw_marble_purple.png" },
      { name: "mint marble", image: "assets/images/color/hair_claw_marble_mint.png" },
      { name: "pink marble", image: "assets/images/color/hair_claw_marble_pink.png" },
      { name: "white marble", image: "assets/images/color/hair_claw_marble_white.png" },
      { name: "black marble", image: "assets/images/color/hair_claw_marble_black.png" }
    ],
    image: "assets/images/hair_claw_marble.png",
    images: ["assets/images/hair_claw_marble.png"]
  },
  {
    id: "hair_claw_baby",
    name: "hair Claw Baby",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "nhựa cao cấp , an toàn",
    size: "8.3cm",
    engraveLength: "6-7 ký tự",
    group: "kep-thuong",
    colors: [
      { name: "white baby", image: "assets/images/color/hair_claw_baby_white.png" },
      { name: "pink baby", image: "assets/images/color/hair_claw_baby_pink.png" },
      { name: "blue baby", image: "assets/images/color/hair_claw_baby_blue.png" }

    ],
    image: "assets/images/hair_claw_baby.png",
    images: ["assets/images/hair_claw_baby.png"]
  },
  {
    id: "hair_claw_ribbon",
    name: "hair Claw Ribbon",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "nhựa cao cấp , an toàn",
    size: "8.3cm",
    engraveLength: "6-7 ký tự",
    group: "kep-thuong",
    colors: [
      { name: "ribbon pink", image: "assets/images/color/hair_claw_ribbon_pink.png" },
      { name: "ribbon white", image: "assets/images/color/hair_claw_ribbon_white.png" }
    ],
    image: "assets/images/hair_claw_ribbon.png",
    images: ["assets/images/hair_claw_ribbon.png"]
  },
  {
    id: "hair_claw_daisy",
    name: "hair Claw Daisy",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "nhựa cao cấp , an toàn",
    size: "7.7cm",
    engraveLength: "6-7 ký tự",
    group: "kep-thuong",
    colors: [
      { name: "daisy pink", image: "assets/images/color/hair_claw_daisy_pink.png" },
      { name: "daisy white", image: "assets/images/color/hair_claw_daisy_white.png" }
    ],
    image: "assets/images/hair_claw_daisy.png",
    images: ["assets/images/hair_claw_daisy.png"]
  },
  {
    id: "hair_claw_rosie",
    name: "hair Claw Rosie",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "nhựa cao cấp , an toàn",
    size: "8.8cm",
    engraveLength: "6-7 ký tự",
    group: "kep-thuong",
    colors: [
      { name: "rosie white", image: "assets/images/color/hair_claw_rosie_white.png" },
      { name: "rosie pink", image: "assets/images/color/hair_claw_rosie_pink.png" }
    ],
    image: "assets/images/hair_claw_rosie.png",
    images: ["assets/images/hair_claw_rosie.png"]
  },
  {
    id: "hair_claw_luna",
    name: "hair Claw Luna",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "nhựa cao cấp , an toàn",
    size: "8.3cm",
    engraveLength: "6-7 ký tự",
    group: "kep-thuong",
    colors: [
      { name: "luna pink", image: "assets/images/color/hair_claw_luna_pink.png" },
      { name: "luna blue", image: "assets/images/color/hair_claw_luna_blue.png" },
      { name: "luna begie", image: "assets/images/color/hair_claw_luna_begie.png" },
      { name: "luna purple", image: "assets/images/color/hair_claw_luna_purple.png" },
    ],
    image: "assets/images/hair_claw_luna.png",
    images: ["assets/images/hair_claw_luna.png"]
  },
  {
    id: "hair_claw_minimal",
    name: "hair Claw Minimal",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "nhựa cao cấp , an toàn",
    size: "10.5cm",
    engraveLength: "8 - 9 ký tự",
    group: "kep-thuong",
    colors: [
      { name: "minimal white", image: "assets/images/color/hair_claw_minimal_white.png" },
      { name: "minimal pink", image: "assets/images/color/hair_claw_minimal_pink.png" },
      { name: "minimal blue", image: "assets/images/color/hair_claw_minimal_blue.png" },
    ],
    image: "assets/images/hair_claw_minimal.png",
    images: ["assets/images/hair_claw_minimal.png"]
  },
  {
    id: "hair_claw_aurora",
    name: "hair Claw Aurora",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "nhựa cao cấp , an toàn",
    size: "8.3cm",
    engraveLength: "6-7 ký tự",
    group: "kep-thuong",
    colors: [
      { name: "aurora white", image: "assets/images/color/hair_claw_aurora_white.png" },
      { name: "aurora mint", image: "assets/images/color/hair_claw_aurora_mint.png" },
      { name: "aurora pink", image: "assets/images/color/hair_claw_aurora_pink.png" },
    ],
    image: "assets/images/hair_claw_aurora.png",
    images: ["assets/images/hair_claw_aurora.png"]
  },
  {
    id: "hair_claw_bloom",
    name: "hair Claw Bloom",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "nhựa cao cấp , an toàn",
    size: "8.5cm",
    engraveLength: "6-7 ký tự",
    group: "kep-thuong",
    colors: [
      { name: "bloom pastel", image: "assets/images/color/hair_claw_bloom_pastel.png" },
      { name: "bloom pink", image: "assets/images/color/hair_claw_bloom_pink.png" },
      { name: "bloom white", image: "assets/images/color/hair_claw_bloom_white.png" },
      { name: "bloom blue", image: "assets/images/color/hair_claw_bloom_blue.png" },
      { name: "bloom purple", image: "assets/images/color/hair_claw_bloom_purple.png" },
      { name: "bloom mint", image: "assets/images/color/hair_claw_bloom_mint.png" }
    ],
    image: "assets/images/hair_claw_bloom.png",
    images: ["assets/images/hair_claw_bloom.png"]
  },

  {
    id: "iridescent_one",
    name: "iridescent One",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "nhựa cao cấp , an toàn",
    size: "8cm",
    engraveLength: "6 - 7 ký tự",
    group: "kep-doi-mau",
    colors: [
      { name: "iridescent one deep blue", image: "assets/images/color/iridescent_one_deep_blue.png" },
      { name: "iridescent one orange", image: "assets/images/color/iridescent_one_orange.png" },
      { name: "iridescent one pink", image: "assets/images/color/iridescent_one_pink.png" },
      { name: "iridescent one lemon", image: "assets/images/color/iridescent_one_lemon.png" },
      { name: "iridescent one white", image: "assets/images/color/iridescent_one_white.png" },
      { name: "iridescent one sky blue", image: "assets/images/color/iridescent_one_sky_blue.png" }
    ],
    image: "assets/images/iridescent_one.png",
    images: ["assets/images/iridescent_one.png"]
  },
  {
    id: "iridescent_two",
    name: "iridescent Two",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "nhựa cao cấp , an toàn",
    size: "8.3cm",
    engraveLength: "6-7 ký tự",
    group: "kep-doi-mau",
    colors: [
      { name: "iridescent two pink", image: "assets/images/color/iridescent_two_pink.png" },
      { name: "iridescent two candy", image: "assets/images/color/iridescent_two_candy.png" },
      { name: "iridescent two blue", image: "assets/images/color/iridescent_two_blue.png" },
      { name: "iridescent two white", image: "assets/images/color/iridescent_two_white.png" },
    ],
    image: "assets/images/iridescent_two.png",
    images: ["assets/images/iridescent_two.png"]
  },
  {
    id: "iridescent_three",
    name: "iridescent Three",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "nhựa cao cấp , an toàn",
    size: "7.8cm",
    engraveLength: "6-7 ký tự",
    group: "kep-doi-mau",
    colors: [
      { name: "iridescent three pink", image: "assets/images/color/iridescent_three_pink.png" },
      { name: "iridescent three blue", image: "assets/images/color/iridescent_three_blue.png" },
      { name: "iridescent three white", image: "assets/images/color/iridescent_three_white.png" },
      { name: "iridescent three purple", image: "assets/images/color/iridescent_three_purple.png" },
    ],
    image: "assets/images/iridescent_three.png",
    images: ["assets/images/iridescent_three.png"]
  },
  {
    id: "iridescent_velvet",
    name: "iridescent Velvet",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "nhựa cao cấp , an toàn",
    size: "10cm",
    engraveLength: "8-9 ký tự",
    group: "kep-doi-mau",
    colors: [
      { name: "soft whispers", image: "assets/images/color/soft_whispers.png" },
      { name: "blush garden", image: "assets/images/color/blush_garden.png" },
      { name: "midnight pastels", image: "assets/images/color/midnight_pastels.png" }
    ],
    image: "assets/images/iridescent_velvet.png",
    images: ["assets/images/iridescent_velvet.png"]
  },
  {
    id: "grace_claw_bloom",
    name: "Grace Claw Bloom",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "nhựa cao cấp , an toàn",
    size: "10cm",
    engraveLength: "8-9 ký tự",
    group: "kep-dac-biet",
    colors: [
      { name: "lace whisper", image: "assets/images/color/lace_whisper.png" },
      { name: "blush petal", image: "assets/images/color/blush_petal.png" },
      { name: "dream mist", image: "assets/images/color/dream_mist.png" }
    ],
    image: "assets/images/grace_claw_bloom.png",
    images: ["assets/images/grace_claw_bloom.png"]
  },
  {
    id: "grace_claw_special",
    name: "Grace Claw Special",
    description: "Kẹp tóc đổi màu theo nhiệt độ cơ thể, bất ngờ và thú vị mỗi lần đeo.",
    priceVND: 55000,
    material: "nhựa cao cấp , an toàn",
    size: "10cm",
    engraveLength: "8-9 ký tự",
    group: "kep-dac-biet",
    colors: [
      { name: "special", image: "assets/images/color/hair_claw_spec.png" },
    ],
    image: "assets/images/grace_claw_special.png",
    images: ["assets/images/grace_claw_special.png"]
  },
];

function formatVND(amount) {
  return amount.toLocaleString("vi-VN") + "₫";
}
