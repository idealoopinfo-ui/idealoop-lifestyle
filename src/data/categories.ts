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
  level: CategoryLevel = "subcategory"
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
      {
        name: "Women",
        slug: "women",
        level: "category",
        children: [
          {
            name: "Clothing",
            slug: "women-clothing",
            level: "subcategory",
            children: [
              leaf("Dresses", "dresses"),
              leaf("Jeans", "jeans"),
              leaf("Skirts", "skirts"),
              leaf("Pants", "pants"),
              leaf("Shorts", "shorts"),
              leaf("Jackets", "jackets"),
              leaf("Hoodies", "hoodies"),
              leaf("T-Shirt", "t-shirt"),

              {
                name: "Tops",
                slug: "tops",
                level: "subcategory",
                children: [
                  leaf("Tank Tops", "tank-tops"),
                 
                ],
              },

              {
                name: "Activewear",
                slug: "women-activewear",
                level: "subcategory",
                children: [
                  leaf("Sports Bras", "sports-bras"),
                  leaf("Leggings", "leggings"),
                  leaf("Workout Shorts", "workout-shorts"),
                  leaf("Sports Tops", "sports-tops"),
                  leaf("Workout Shirts", "workout-shirts"),
                  leaf("Yoga Pants", "yoga-pants"),
                  leaf("Gym Sets", "gym-sets"),
                ],
              },
              leaf("Sleepwear", "women-sleepwear"),
              {
                name: "Under Garments",
                slug: "women-under-garments",
                level: "subcategory",
                children: [
                  leaf("Bras", "bras", "collection"),
                  leaf("Panties", "panties", "collection"),
                  leaf("Lingerie Sets", "lingerie-sets", "collection"),
                  leaf("Shapewear", "shapewear", "collection"),
                ],
              },
            ],
          },

          {
            name: "Shoes",
            slug: "women-shoes",
            level: "subcategory",
            children: [
              leaf("Sneakers", "women-sneakers"),
              leaf("Heels", "heels"),
              leaf("Boots", "women-boots"),
              leaf("Sandals", "women-sandals"),
              leaf("Flats", "flats"),
            ],
          },

          {
            name: "Accessories",
            slug: "women-accessories",
            level: "subcategory",
            children: [
              leaf("Handbags", "handbags"),
              leaf("Tote Bags", "tote-bags"),
              leaf("Crossbody Bags", "crossbody-bags"),
              leaf("Backpacks", "women-backpacks"),
              leaf("Wallets", "women-wallets"),
              leaf("Jewelry", "jewelry"),
            ],
          },
        ],
      },

      {
        name: "Men",
        slug: "men",
        level: "category",
        children: [
          {
            name: "Clothing",
            slug: "men-clothing",
            level: "subcategory",
            children: [
              leaf("Shirts", "shirts"),
              leaf("T-Shirts", "t-shirts"),
              leaf("Jeans", "men-jeans"),
              leaf("Trousers", "trousers"),
              leaf("Jackets", "men-jackets"),
              leaf("Hoodies", "men-hoodies"),
              {
                name: "Activewear",
                slug: "men-activewear",
                level: "subcategory",
                children: [
                  leaf("Gym Shorts", "gym-shorts"),
                  leaf("Training Shirts", "training-shirts"),
                  leaf("Compression Wear", "compression-wear"),
                  leaf("Joggers", "joggers"),
                  leaf("Gym Sets", "men-gym-sets"),
                ],
              },
              leaf("Sleepwear", "men-sleepwear"),
              {
                name: "Under Garments",
                slug: "men-under-garments",
                level: "subcategory",
                children: [
                  leaf("Boxers", "boxers", "collection"),
                  leaf("Briefs", "briefs", "collection"),
                  leaf("Undershirts", "undershirts", "collection"),
                  leaf("Underwear Sets", "underwear-sets", "collection"),
                ],
              },
            ],
          },

          {
            name: "Shoes",
            slug: "men-shoes",
            level: "subcategory",
            children: [
              leaf("Sneakers", "men-sneakers"),
              leaf("Formal Shoes", "formal-shoes"),
              leaf("Boots", "men-boots"),
              leaf("Sandals", "men-sandals"),
              leaf("Casual", "men-casual"),
            ],
          },

          {
            name: "Accessories",
            slug: "men-accessories",
            level: "subcategory",
            children: [
              leaf("Backpacks", "men-backpacks"),
              leaf("Messenger Bags", "messenger-bags"),
              leaf("Wallets", "men-wallets"),
              leaf("Watches", "men-watches"),
              leaf("Belts", "belts"),
            ],
          },
        ],
      },

      {
        name: "Kids & Baby",
        slug: "kids-baby",
        level: "category",
        children: [
          {
            name: "Boys",
            slug: "boys",
            level: "subcategory",
            children: [
              leaf("Clothing", "boys-clothing", "collection"),
              leaf("Shoes", "boys-shoes", "collection"),
              leaf("Accessories", "boys-accessories", "collection"),
            ],
          },
          {
            name: "Girls",
            slug: "girls",
            level: "subcategory",
            children: [
              leaf("Clothing", "girls-clothing", "collection"),
              leaf("Shoes", "girls-shoes", "collection"),
              leaf("Accessories", "girls-accessories", "collection"),
            ],
          },
          {
            name: "Baby",
            slug: "baby",
            level: "subcategory",
            children: [
              leaf("Baby Clothing", "baby-clothing", "collection"),
              leaf("Baby Shoes", "baby-shoes", "collection"),
              leaf("Baby Care", "baby-care", "collection"),
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
      {
        name: "Makeup",
        slug: "makeup",
        level: "category",
        children: [
          leaf("Face", "face"),
          leaf("Eyes", "eyes"),
          leaf("Lips", "lips"),
          leaf("Nails", "nails"),
          leaf("Tools", "makeup-tools"),
        ],
      },

      {
        name: "Skincare",
        slug: "skincare",
        level: "category",
        children: [
          leaf("Cleansers", "cleansers"),
          leaf("Moisturizers", "moisturizers"),
          leaf("Serums", "serums"),
          leaf("Sunscreen", "sunscreen"),
          leaf("Toners", "toners"),
          leaf("Masks", "masks"),
        ],
      },

      {
        name: "Hair Care",
        slug: "hair-care",
        level: "category",
        children: [
          leaf("Shampoo", "shampoo"),
          leaf("Conditioner", "conditioner"),
          leaf("Hair Oil", "hair-oil"),
          leaf("Styling", "styling"),
          leaf("Hair Tools", "hair-tools"),
        ],
      },

      leaf("Fragrances", "fragrances", "category"),
      leaf("Bath & Body", "bath-body", "category"),
      leaf("Personal Care", "personal-care", "category"),
      leaf("Beauty Tools", "beauty-tools", "category"),
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
          leaf("Off Road Vehicle", "off road vehicle"),
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
            leaf("Cable Machine Attachments", "cable-machine-attachments"),
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
            leaf("Candles & Fragrance", "candles-fragrance"),
          ],
        },

      ],
    },

  ],
},
];