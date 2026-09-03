export type CategoryLevel =
  | "department"
  | "category"
  | "subcategory"
  | "collection"
  | "product-type";

export type CategoryNode = {
  name: string;
  slug: string;
  children: CategoryNode[];
  level?: CategoryLevel;
};

const leaf = (
  name: string,
  slug: string,
  level: CategoryLevel = "product-type"
): CategoryNode => ({
  name,
  slug,
  children: [],
  level,
});

export const categories: CategoryNode[] = [

  /* =========================================================
     FASHION
  ========================================================= */

  {
    name: "Fashion",
    slug: "fashion",
    level: "department",

    children: [

      /* =====================================================
         WOMEN
      ===================================================== */

      {
        name: "Women",
        slug: "women",
        level: "category",

        children: [

          /* ================= SHOES ================= */

          {
            name: "Shoes",
            slug: "shoes",
            level: "subcategory",

            children: [
              leaf("Boots", "boots"),
              leaf("Sneakers", "sneakers"),
              leaf("Casual", "casual"),
              leaf("Sandals", "sandals"),
              leaf("Flats", "flats"),
              leaf("Heels", "heels"),
            ],
          },

          /* ================= ACCESSORIES ================= */

          {
            name: "Accessories",
            slug: "accessories",
            level: "subcategory",

            children: [
              leaf("Tote Bags", "tote-bags"),
              leaf("Backpacks", "backpacks"),
              leaf("Crossbody Bags", "crossbody-bags"),
              leaf("Handbags", "handbags"),
              leaf("Wallets", "wallets"),
              leaf("Belts", "belts"),
              leaf("Eyewear", "eyewear"),
              leaf("Caps & Hats", "caps-hats"),
            ],
          },

          /* ================= JEWELRY ================= */

          {
            name: "Jewelry",
            slug: "jewelry",
            level: "subcategory",

            children: [
              leaf("Earrings", "earrings"),
              leaf("Necklaces", "necklaces"),
              leaf("Bracelets", "bracelets"),
              leaf("Rings", "rings"),
              leaf("Jewelry Sets", "jewelry-sets"),
              leaf("Hair Jewelry & Accessories", "hair-jewelry"),
              leaf("Brooches & Pins", "brooches-pins"),
              leaf("Anklets", "anklets"),
              leaf("Body Jewelry", "body-jewelry"),
            ],
          },

          /* ================= CLOTHING ================= */

          {
            name: "Clothing",
            slug: "clothing",
            level: "subcategory",

            children: [

              leaf("Pants", "pants"),
              leaf("Skirts", "skirts"),
              leaf("Sleepwear", "sleepwear"),
              leaf("Jackets", "jackets"),
              leaf("T-Shirt", "t-shirt"),
              leaf("Shorts", "shorts"),
              leaf("Jumpsuits & Rompers", "jumpsuits-rompers"),
              leaf("Sweaters", "sweaters"),
              leaf("Jeans", "jeans"),
              leaf("Matching Sets", "matching sets"),

              /* ================= TOPS ================= */

              {
                name: "Tops",
                slug: "tops",
                level: "collection",

                children: [
                  leaf("Tank Tops", "tank-tops"),
                  leaf("Vest", "vest"),
                ],
              },

              /* ================= ACTIVEWEAR ================= */

              {
                name: "Activewear",
                slug: "activewear",
                level: "collection",

                children: [
                  leaf("Sports Tops", "sports-tops"),
                  leaf("Workout Shorts", "workout-shorts"),
                  leaf("Sports Bras", "sports-bras"),
                  leaf("Leggings", "leggings"),
                  leaf("Yoga Pants", "yoga-pants"),
                  leaf("Gym Sets", "gym-sets"),
                  leaf("Workout Shirts", "workout-shirts"),
                ],
              },

              leaf("Blouse", "blouse"),
              leaf("Cami Top", "cami-top"),
              leaf("Shirt", "shirt"),
              leaf("Hoodies", "hoodies"),

              /* ================= DRESSES ================= */

              {
                name: "Dresses",
                slug: "dresses",
                level: "collection",

                children: [
                  leaf("Bodycon Dresses", "bodycon-dresses"),
                  leaf("Summer Dresses", "summer-dresses"),
                  leaf("Mini Dresses", "mini-dresses"),
                  leaf("Maxi Dresses", "maxi-dresses"),
                  leaf("Midi Dresses", "midi-dresses"),
                  leaf("Casual Dresses", "casual-dresses"),
                  leaf("Cami Dresses", "cami-dresses"),
                ],
              },

              /* ================= UNDER GARMENTS ================= */

              {
                name: "Under Garments",
                slug: "under-garments",
                level: "collection",

                children: [
                  leaf("Bras", "bras", "product-type"),
                  leaf("Bralette", "bralette", "product-type"),
                  leaf("Shapewear", "shapewear", "product-type"),
                  leaf("Lingerie Sets", "lingerie-sets", "product-type"),
                  leaf("Panties", "panties", "product-type"),
                  leaf("Vest", "vest", "product-type"),
                ],
              },
            ],
          },
        ],
      },

      /* =====================================================
         MEN
      ===================================================== */

      {
        name: "Men",
        slug: "men",
        level: "category",

        children: [

          /* ================= JEWELRY ================= */

          {
            name: "Jewelry",
            slug: "jewelry",
            level: "subcategory",

            children: [
              leaf("Earrings", "earrings"),
              leaf("Necklaces", "necklaces"),
              leaf("Bracelets", "bracelets"),
              leaf("Rings", "rings"),
              leaf("Jewelry Sets", "jewelry-sets"),
              leaf("Brooches & Pins", "brooches-pins"),
              leaf("Anklets", "anklets"),
              leaf("Body Jewelry", "body-jewelry"),
            ],
          },

          /* ================= ACCESSORIES ================= */

          {
            name: "Accessories",
            slug: "accessories",
            level: "subcategory",

            children: [
              leaf("Backpacks", "backpacks"),
              leaf("Messenger Bags", "messenger-bags"),
              leaf("Wallets", "wallets"),
              leaf("Watches", "watches"),
              leaf("Belts", "belts"),
              leaf("Eyewear", "eyewear"),
              leaf("Caps & Hats", "caps-hats"),
            ],
          },

          /* ================= SHOES ================= */

          {
            name: "Shoes",
            slug: "shoes",
            level: "subcategory",

            children: [
              leaf("Sneakers", "sneakers"),
              leaf("Formal Shoes", "formal-shoes"),
              leaf("Boots", "boots"),
              leaf("Sandals", "sandals"),
              leaf("Casual", "casual"),
            ],
          },

          /* ================= CLOTHING ================= */

          {
            name: "Clothing",
            slug: "clothing",
            level: "subcategory",

            children: [

              leaf("T-Shirts", "t-shirts"),
              leaf("Sleepwear", "sleepwear"),
              leaf("Hoodies", "hoodies"),
              leaf("Jeans", "jeans"),
              leaf("Trousers", "trousers"),
              leaf("Jackets", "jackets"),
              leaf("Shirts", "shirts"),

              /* ================= ACTIVEWEAR ================= */

              {
                name: "Activewear",
                slug: "activewear",
                level: "collection",

                children: [
                  leaf("Compression Wear", "compression-wear"),
                  leaf("Gym Shorts", "gym-shorts"),
                  leaf("Training Shirts", "training-shirts"),
                  leaf("Joggers", "joggers"),
                  leaf("Gym Sets", "gym-sets"),
                ],
              },

              /* ================= UNDER GARMENTS ================= */

              {
                name: "Under Garments",
                slug: "under-garments",
                level: "collection",

                children: [
                  leaf("Boxers", "boxers"),
                  leaf("Briefs", "briefs"),
                  leaf("Undershirts", "undershirts"),
                  leaf("Underwear Sets", "underwear-sets"),
                ],
              },

              /* ================= SHORTS ================= */

              {
                name: "Shorts",
                slug: "shorts",
                level: "collection",

                children: [
                  leaf("Cargo Shorts", "cargo-shorts"),
                ],
              },
            ],
          },
        ],
      },

      /* =====================================================
         KIDS & BABY
      ===================================================== */

      {
        name: "Kids & Baby",
        slug: "kids-baby",
        level: "category",

        children: [

          {
            name: "Girls",
            slug: "girls",
            level: "subcategory",

            children: [
              leaf("Girls Clothing", "girls-clothing", "collection"),
              leaf("Girls Shoes", "girls-shoes", "collection"),
            ],
          },

          {
            name: "Boys",
            slug: "boys",
            level: "subcategory",

            children: [
              leaf("Boys Shoes", "boys-shoes", "collection"),
            ],
          },

          {
            name: "Baby",
            slug: "baby",
            level: "subcategory",

            children: [
              leaf("Baby Shoes", "baby-shoes", "collection"),
            ],
          },
        ],
      },
    ],
  },

/* =========================================================
   BEAUTY
========================================================= */

{
  name: "Beauty",
  slug: "beauty",
  level: "department",

  children: [

    /* =====================================================
       MAKEUP
    ===================================================== */

    {
      name: "Makeup",
      slug: "makeup",
      level: "category",

      children: [

        /* ================= FACE ================= */

        {
          name: "Face",
          slug: "face",
          level: "subcategory",

          children: [
            leaf("Foundation", "foundation"),
            leaf("Concealer", "concealer"),
            leaf("Powder", "powder"),
            leaf("Blush", "blush"),
            leaf("Bronzer", "bronzer"),
            leaf("Highlighter", "highlighter"),
            leaf("Primer", "makeup-primer"),
            leaf("Setting Spray", "setting-spray"),
          ],
        },

        /* ================= EYES ================= */

        {
          name: "Eyes",
          slug: "eyes",
          level: "subcategory",

          children: [
            leaf("Eyeshadow", "eyeshadow"),
            leaf("Eyeliner", "eyeliner"),
            leaf("Mascara", "mascara"),
            leaf("Eyebrow Products", "eyebrow-products"),
            leaf("False Eyelashes", "false-eyelashes"),
          ],
        },

        /* ================= LIPS ================= */

        {
          name: "Lips",
          slug: "lips",
          level: "subcategory",

          children: [
            leaf("Lipstick", "lipstick"),
            leaf("Lip Gloss", "lip-gloss"),
            leaf("Lip Liner", "lip-liner"),
            leaf("Lip Tint", "lip-tint"),
          ],
        },

        /* ================= NAILS ================= */

        {
          name: "Nails",
          slug: "nails",
          level: "subcategory",

          children: [
            leaf("Nail Polish", "nail-polish"),
            leaf("Gel Nail Polish", "gel-nail-polish"),
            leaf("Press-On Nails", "press-on-nails"),
            leaf("Nail Art", "nail-art"),
          ],
        },

        /* ================= MAKEUP TOOLS ================= */

        {
          name: "Makeup Tools",
          slug: "makeup-tools",
          level: "subcategory",

          children: [
            leaf("Makeup Brushes", "makeup-brushes"),
            leaf("Makeup Sponges", "makeup-sponges"),
            leaf("Eyelash Tools", "eyelash-tools"),
            leaf("Makeup Organizers", "makeup-organizers"),
          ],
        },
      ],
    },

    /* =====================================================
       SKINCARE
    ===================================================== */

    {
      name: "Skincare",
      slug: "skincare",
      level: "category",

      children: [

        /* ================= FACE CARE ================= */

        {
          name: "Face Care",
          slug: "face-care",
          level: "subcategory",

          children: [
            leaf("Cleansers", "cleansers"),
            leaf("Toners", "toners"),
            leaf("Serums", "serums"),
            leaf("Moisturizers", "moisturizers"),
            leaf("Sunscreen", "sunscreen"),
            leaf("Face Masks", "face-masks"),
            leaf("Facial Kits", "facial-kits"),
            leaf("Face Treatments", "face-treatments"),
          ],
        },

        /* ================= LIP CARE ================= */

        {
          name: "Lip Care",
          slug: "lip-care",
          level: "subcategory",

          children: [
            leaf("Lip Balm", "lip-balm"),
            leaf("Lip Scrub", "lip-scrub"),
            leaf("Lip Mask", "lip-mask"),
            leaf("Lip Oil", "lip-oil"),
            leaf("Lip Treatment", "lip-treatment"),
            leaf("Lip Plumper", "lip-plumper"),
            leaf("Lip SPF", "lip-spf"),
          ],
        },

        /* ================= EYE CARE ================= */

        {
          name: "Eye Care",
          slug: "eye-care",
          level: "subcategory",

          children: [
            leaf("Eye Cream", "eye-cream"),
            leaf("Eye Serum", "eye-serum"),
            leaf("Under Eye Treatment", "under-eye-treatment"),
            leaf("Eye Masks", "eye-masks"),
          ],
        },

        /* ================= SUN CARE ================= */

        {
          name: "Sun Care",
          slug: "sun-care",
          level: "subcategory",

          children: [
            leaf("Sunscreen", "sunscreen"),
            leaf("Sun Protection", "sun-protection"),
            leaf("After Sun Care", "after-sun-care"),
          ],
        },

        /* ================= HAND CARE ================= */

        {
          name: "Hand Care",
          slug: "hand-care",
          level: "subcategory",

          children: [
            leaf("Hand Cream", "hand-cream"),
            leaf("Hand Lotion", "hand-lotion"),
            leaf("Hand Masks", "hand-masks"),
            leaf("Hand Treatment", "hand-treatment"),
          ],
        },

        /* ================= FOOT CARE ================= */

        {
          name: "Foot Care",
          slug: "foot-care",
          level: "subcategory",

          children: [
            leaf("Foot Cream", "foot-cream"),
            leaf("Foot Masks", "foot-masks"),
            leaf("Foot Scrubs", "foot-scrubs"),
            leaf("Heel Care", "heel-care"),
            leaf("Foot Treatments", "foot-treatments"),
          ],
        },

        /* ================= BODY CARE ================= */

        {
          name: "Body Care",
          slug: "body-care",
          level: "subcategory",

          children: [
            leaf("Body Lotion", "body-lotion"),
            leaf("Body Cream", "body-cream"),
            leaf("Body Oil", "body-oil"),
            leaf("Body Scrub", "body-scrub"),
            leaf("Body Butter", "body-butter"),
            leaf("Talc & Body Powder", "talc-body-powder"),
          ],
        },
      ],
    },

    /* =====================================================
       HAIR CARE
    ===================================================== */

    {
      name: "Hair Care",
      slug: "hair-care",
      level: "category",

      children: [
        leaf("Shampoo", "shampoo"),
        leaf("Shampoo Conditioner Set", "shampoo conditioner set"),
        leaf("Conditioner", "conditioner"),
        leaf("Hair Mask", "hair-mask"),
        leaf("Hair Oil", "hair-oil"),
        leaf("Hair Serum", "hair-serum"),
        leaf("Hair Treatments", "hair-treatments"),
        leaf("Hair Styling", "hair-styling"),
        leaf("Hair Tools", "hair-tools"),
        leaf(
          "Chemical Hair Straighteners",
          "chemical-hair-straighteners"
        ),
      ],
    },

    /* =====================================================
       FRAGRANCES
    ===================================================== */

    {
      name: "Fragrances",
      slug: "fragrances",
      level: "category",

      children: [
        leaf("Women's Fragrance", "womens-fragrance"),
        leaf("Men's Fragrance", "mens-fragrance"),
        leaf("Perfume", "perfume"),
        leaf("Cologne", "cologne"),
        leaf("Body Mists", "body-mists"),
        leaf("Fragrance Sets", "fragrance-sets"),
      ],
    },

    /* =====================================================
       BATH & BODY
    ===================================================== */

    {
      name: "Bath & Body",
      slug: "bath-body",
      level: "category",

      children: [
        leaf("Body Wash", "body-wash"),
        leaf("Bath Products", "bath-products"),
        leaf("Body Soap", "body-soap"),
        leaf("Shower Products", "shower-products"),
      ],
    },

    /* =====================================================
       PERSONAL CARE
    ===================================================== */

    {
      name: "Personal Care",
      slug: "personal-care",
      level: "category",

      children: [

        /* ================= NAIL CARE ================= */

        {
          name: "Nail Care",
          slug: "nail-care",
          level: "subcategory",

          children: [
            leaf("Nail Clippers", "nail-clippers"),
            leaf("Nail Files & Buffers", "nail-files-buffers"),
            leaf("Cuticle Care", "cuticle-care"),
            leaf("Nail Care Tools", "nail-care-tools"),
            leaf("Nail Polish Remover", "nail-polish-remover"),
            leaf("Manicure Tools", "manicure-tools"),
            leaf("Pedicure Tools", "pedicure-tools"),
          ],
        },

        /* ================= ORAL CARE ================= */

        leaf("Oral Care", "oral-care"),

        /* ================= FEMININE CARE ================= */

        leaf("Feminine Care", "feminine-care"),

        /* ================= PERSONAL HYGIENE ================= */

        leaf("Personal Hygiene", "personal-hygiene"),
      ],
    },

    /* =====================================================
       BEAUTY TOOLS
    ===================================================== */

    {
      name: "Beauty Tools",
      slug: "beauty-tools",
      level: "category",

      children: [
        leaf("Facial Tools", "facial-tools"),
        leaf("Hair Removal Tools", "hair-removal-tools"),
        leaf(
          "Manicure & Pedicure Tools",
          "manicure-pedicure-tools"
        ),
        leaf("Beauty Devices", "beauty-devices"),
        leaf("Beauty Accessories", "beauty-accessories"),
      ],
    },
  ],
},


  /* =========================================================
     HOME & LIVING
  ========================================================= */

  {
    name: "Home & Living",
    slug: "home-living",
    level: "department",

    children: [

      {
        name: "Furniture",
        slug: "furniture",
        level: "category",

        children: [
          leaf("Sofas", "sofas"),
          leaf("Beds", "beds"),
          leaf("Tables", "tables"),
          leaf("Chairs", "chairs"),
          leaf("Cabinets", "cabinets"),
        ],
      },

      {
        name: "Home Decor",
        slug: "home-decor",
        level: "category",

        children: [
          leaf("Wall Decor", "wall-decor"),
          leaf("Clocks", "clocks"),
          leaf("Mirrors", "mirrors"),
          leaf("Vases", "vases"),
          leaf("Decor Items", "decor-items"),

          {
            name: "Floor Mats",
            slug: "floor-mats",
            level: "subcategory",

            children: [
              leaf("Bath Mats", "bath-mats", "collection"),
            ],
          },
        ],
      },

      {
        name: "Bedding",
        slug: "bedding",
        level: "category",

        children: [
          leaf("Bedsheets", "bedsheets"),
          leaf("Pillows", "pillows"),
          leaf("Blankets", "blankets"),
          leaf("Comforters", "comforters"),
        ],
      },

      {
        name: "Kitchen & Dining",
        slug: "kitchen-dining",
        level: "category",

        children: [
          leaf("Dinnerware", "dinnerware"),
          leaf("Cookware", "cookware"),
          leaf("Kitchen Tools", "kitchen-tools"),
          leaf("Storage Containers", "storage-containers"),
          leaf("Small Appliances", "small-appliances"),
        ],
      },

      {
        name: "Lighting",
        slug: "lighting",
        level: "category",

        children: [
          leaf("Ceiling Lights", "ceiling-lights"),
          leaf("Table Lamps", "table-lamps"),
          leaf("Outdoor Lights", "outdoor-lights"),
        ],
      },

      {
        name: "Office Furniture",
        slug: "office-furniture",
        level: "category",

        children: [
          leaf("Office Chairs", "office-chairs"),
          leaf("Desks", "desks"),
          leaf("Storage", "office-storage"),
        ],
      },
    ],
  },

  /* =========================================================
     TOYS & GIFTS
  ========================================================= */

  {
    name: "Toys & Gifts",
    slug: "toys-gifts",
    level: "department",

    children: [

      {
        name: "Toys",
        slug: "toys",
        level: "category",

        children: [
          leaf("Action Figures", "action-figures"),
          leaf("Educational Toys", "educational-toys"),
          leaf("Dolls", "dolls"),
          leaf("Building Blocks", "building-blocks"),
          leaf("Remote Control Toys", "remote-control-toys"),
          leaf("Plush Toys", "plush-toys"),
          leaf("Off Road Vehicle", "off-road-vehicle"),
        ],
      },

      {
        name: "Gifts",
        slug: "gifts",
        level: "category",

        children: [
          leaf("Birthday Gifts", "birthday-gifts"),
          leaf("Anniversary Gifts", "anniversary-gifts"),
          leaf("Corporate Gifts", "corporate-gifts"),
          leaf("Personalized Gifts", "personalized-gifts"),
          leaf("Gift Cards", "gift-cards"),
        ],
      },

      {
        name: "Stationery",
        slug: "stationery",
        level: "category",

        children: [
          leaf("School Supplies", "school-supplies"),
          leaf("Office Supplies", "office-supplies"),
          leaf("Art Supplies", "art-supplies"),
        ],
      },
    ],
  },

  /* =========================================================
     FITNESS & WELLNESS
  ========================================================= */

  {
    name: "Fitness & Wellness",
    slug: "fitness-wellness",
    level: "department",

    children: [

      {
        name: "Strength Training",
        slug: "strength-training",
        level: "category",

        children: [
          leaf("Dumbbells", "dumbbells"),
          leaf("Resistance Bands", "resistance-bands"),
          leaf("Weight Benches", "weight-benches"),

          {
            name: "Abdominal Training",
            slug: "abdominal-training",
            level: "subcategory",

            children: [
              leaf("Abdominal Wheels", "abdominal-wheels"),
            ],
          },

          {
            name: "Training Accessories",
            slug: "training-accessories",
            level: "subcategory",

            children: [
              leaf("Workout Gloves", "workout-gloves"),
              leaf(
                "Cable Machine Attachments",
                "cable-machine-attachments"
              ),
              leaf("Wristbands", "wristbands"),
            ],
          },

          leaf("Strength Accessories", "strength-accessories"),
        ],
      },

      {
        name: "Yoga",
        slug: "yoga",
        level: "category",

        children: [
          leaf("Yoga Mats", "yoga-mats"),
          leaf("Yoga Blocks", "yoga-blocks"),
          leaf("Yoga Clothing", "yoga-clothing"),
          leaf("Accesssories", "accessories"),
        ],
      },

      {
        name: "Home Gym",
        slug: "home-gym",
        level: "category",

        children: [
          leaf("Cardio Equipment", "cardio-equipment"),
          leaf("Gym Machines", "gym-machines"),
          leaf("Exercise Accessories", "exercise-accessories"),
          leaf("Pull Up Bar", "pull up bar"),
        ],
      },

      {
        name: "Fitness Ebooks",
        slug: "fitness-ebooks",
        level: "category",

        children: [
          leaf("Workout Guides", "workout-guides"),
          leaf("Weight Loss", "weight-loss"),
          leaf("Muscle Building", "muscle-building"),
          leaf("Nutrition", "nutrition"),
        ],
      },

      {
        name: "Wellness",
        slug: "wellness",
        level: "category",

        children: [

          {
            name: "Massage & Relaxation",
            slug: "massage-relaxation",
            level: "subcategory",

            children: [
              leaf("Neck Massagers", "neck-massagers"),
              leaf("Massage Guns", "massage-guns"),
              leaf("Massage Pillows", "massage-pillows"),
            ],
          },

          {
            name: "Aromatherapy",
            slug: "aromatherapy",
            level: "subcategory",

            children: [
              leaf("Essential Oils", "essential-oils"),
              leaf("Diffusers", "diffusers"),
              leaf(
                "Candles & Fragrance",
                "candles-fragrance"
              ),
            ],
          },
        ],
      },
    ],
  },
]
  

