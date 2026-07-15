export type CategoryNode = {
  name: string;
  slug: string;
  children: CategoryNode[];
};

export const categories: CategoryNode[] = [
  {
    name: "Fashion",
    slug: "fashion",
    children: [
      {
        name: "Women",
        slug: "women",
        children: [
          { name: "Dresses", slug: "dresses", children: [] },
          { name: "Tops", slug: "tops", children: [] },
          { name: "Jeans", slug: "jeans", children: [] },
          { name: "Skirts", slug: "skirts", children: [] },
          { name: "Pants", slug: "pants", children: [] },
          { name: "Shorts", slug: "shorts", children: [] },
          { name: "Jackets", slug: "jackets", children: [] },
          { name: "Hoodies", slug: "hoodies", children: [] },
          { name: "Activewear", slug: "activewear", children: [] },
          { name: "Sleepwear", slug: "sleepwear", children: [] },
          { name: "Under Garments", slug: "under-garments", children: [] },
          { name: "Sneakers", slug: "sneakers", children: [] },
          { name: "Heels", slug: "heels", children: [] },
          { name: "Boots", slug: "boots", children: [] },
          { name: "Sandals", slug: "sandals", children: [] },
          { name: "Flats", slug: "flats", children: [] },
          { name: "Handbags", slug: "handbags", children: [] },
          { name: "Tote Bags", slug: "tote-bags", children: [] },
          { name: "Crossbody Bags", slug: "crossbody-bags", children: [] },
          { name: "Backpacks", slug: "backpacks", children: [] },
          { name: "Wallets", slug: "wallets", children: [] },
          { name: "Jewelry", slug: "jewelry", children: [] },
          { name: "Accessories", slug: "accessories", children: [] }
        ]
      },

      {
        name: "Men",
        slug: "men",
        children: [
          { name: "Shirts", slug: "shirts", children: [] },
          { name: "T-Shirts", slug: "t-shirts", children: [] },
          { name: "Jeans", slug: "jeans", children: [] },
          { name: "Trousers", slug: "trousers", children: [] },
          { name: "Jackets", slug: "jackets", children: [] },
          { name: "Hoodies", slug: "hoodies", children: [] },
          { name: "Under Garments", slug: "under-garments", children: [] },
          { name: "Sneakers", slug: "sneakers", children: [] },
          { name: "Formal Shoes", slug: "formal-shoes", children: [] },
          { name: "Boots", slug: "boots", children: [] },
          { name: "Sandals", slug: "sandals", children: [] },
          { name: "Backpacks", slug: "backpacks", children: [] },
          { name: "Messenger Bags", slug: "messenger-bags", children: [] },
          { name: "Wallets", slug: "wallets", children: [] },
          { name: "Watches", slug: "watches", children: [] },
          { name: "Accessories", slug: "accessories", children: [] }
        ]
      },

      {
        name: "Kids",
        slug: "kids",
        children: [
          { name: "Boys", slug: "boys", children: [] },
          { name: "Girls", slug: "girls", children: [] },
          { name: "Baby", slug: "baby", children: [] }
        ]
      },

      {
        name: "Unisex",
        slug: "unisex",
        children: [
          { name: "New Arrivals", slug: "new-arrivals", children: [] },
          { name: "Accessories", slug: "accessories", children: [] }
        ]
      }
    ]
  },
  {
    name: "Beauty",
    slug: "beauty",
    children: [
      {
        name: "Makeup",
        slug: "makeup",
        children: [
          { name: "Face", slug: "face", children: [] },
          { name: "Eyes", slug: "eyes", children: [] },
          { name: "Lips", slug: "lips", children: [] },
          { name: "Nails", slug: "nails", children: [] },
          { name: "Tools", slug: "tools", children: [] }
        ]
      },

      {
        name: "Skincare",
        slug: "skincare",
        children: [
          { name: "Cleansers", slug: "cleansers", children: [] },
          { name: "Moisturizers", slug: "moisturizers", children: [] },
          { name: "Serums", slug: "serums", children: [] },
          { name: "Sunscreen", slug: "sunscreen", children: [] },
          { name: "Toners", slug: "toners", children: [] },
          { name: "Masks", slug: "masks", children: [] }
        ]
      },

      {
        name: "Hair Care",
        slug: "hair-care",
        children: [
          { name: "Shampoo", slug: "shampoo", children: [] },
          { name: "Conditioner", slug: "conditioner", children: [] },
          { name: "Hair Oil", slug: "hair-oil", children: [] },
          { name: "Styling", slug: "styling", children: [] },
          { name: "Hair Tools", slug: "hair-tools", children: [] }
        ]
      },

      {
        name: "Fragrances",
        slug: "fragrances",
        children: []
      },

      {
        name: "Bath & Body",
        slug: "bath-body",
        children: []
      },

      {
        name: "Personal Care",
        slug: "personal-care",
        children: []
      },

      {
        name: "Beauty Tools",
        slug: "beauty-tools",
        children: []
      }
    ]
  },

  {
    name: "Fitness & Wellness",
    slug: "fitness-wellness",
    children: [
    
    {
    name: "Strength Training",
    slug: "strength-training",
    children: [
    { name: "Dumbbells", slug: "dumbbells", children: [] },
    { name: "Resistance Bands", slug: "resistance-bands", children: [] },
    { name: "Barbells", slug: "barbells", children: [] },
    { name: "Weight Benches", slug: "weight-benches", children: [] },
    { name: "Accessories", slug: "strength-accessories", children: [] }
    ]
    },
    
    {
    name: "Yoga",
    slug: "yoga",
    children: [
    { name: "Yoga Mats", slug: "yoga-mats", children: [] },
    { name: "Yoga Blocks", slug: "yoga-blocks", children: [] },
    { name: "Yoga Clothing", slug: "yoga-clothing", children: [] },
    { name: "Meditation", slug: "meditation", children: [] },
    { name: "Accessories", slug: "yoga-accessories", children: [] }
    ]
    },
    
    {
    name: "Home Gym",
    slug: "home-gym",
    children: [
    { name: "Cardio Equipment", slug: "cardio-equipment", children: [] },
    { name: "Gym Machines", slug: "gym-machines", children: [] },
    { name: "Foam Rollers", slug: "foam-rollers", children: [] },
    { name: "Exercise Balls", slug: "exercise-balls", children: [] },
    { name: "Storage", slug: "gym-storage", children: [] }
    ]
    },
    
    {
    name: "Fitness Ebooks",
    slug: "fitness-ebooks",
    children: [
    { name: "Workout Guides", slug: "workout-guides", children: [] },
    { name: "Weight Loss", slug: "weight-loss", children: [] },
    { name: "Muscle Building", slug: "muscle-building", children: [] },
    { name: "Nutrition", slug: "nutrition", children: [] },
    { name: "Yoga Programs", slug: "yoga-programs", children: [] }
    ]
    }
    
    ]
    },

  {
    name: "Home & Living",
    slug: "home-living",
    children: [
      {
        name: "Furniture",
        slug: "furniture",
        children: [
          { name: "Sofas", slug: "sofas", children: [] },
          { name: "Beds", slug: "beds", children: [] },
          { name: "Tables", slug: "tables", children: [] },
          { name: "Chairs", slug: "chairs", children: [] },
          { name: "Cabinets", slug: "cabinets", children: [] }
        ]
      },

      {
        name: "Home Decor",
        slug: "home-decor",
        children: [
          { name: "Wall Decor", slug: "wall-decor", children: [] },
          { name: "Clocks", slug: "clocks", children: [] },
          { name: "Mirrors", slug: "mirrors", children: [] },
          { name: "Vases", slug: "vases", children: [] },
          { name: "Decor Items", slug: "decor-items", children: [] }
        ]
      },

      {
        name: "Bedding",
        slug: "bedding",
        children: [
          { name: "Bedsheets", slug: "bedsheets", children: [] },
          { name: "Pillows", slug: "pillows", children: [] },
          { name: "Blankets", slug: "blankets", children: [] },
          { name: "Comforters", slug: "comforters", children: [] }
        ]
      },

      {
        name: "Kitchen & Dining",
        slug: "kitchen-dining",
        children: [
          { name: "Dinnerware", slug: "dinnerware", children: [] },
          { name: "Cookware", slug: "cookware", children: [] },
          { name: "Kitchen Tools", slug: "kitchen-tools", children: [] },
          { name: "Storage Containers", slug: "storage-containers", children: [] },
          { name: "Small Appliances", slug: "small-appliances", children: [] }
        ]
      },

      {
        name: "Lighting",
        slug: "lighting",
        children: [
          { name: "Ceiling Lights", slug: "ceiling-lights", children: [] },
          { name: "Table Lamps", slug: "table-lamps", children: [] },
          { name: "Outdoor Lights", slug: "outdoor-lights", children: [] }
        ]
      },

      {
        name: "Office Furniture",
        slug: "office-furniture",
        children: [
          { name: "Office Chairs", slug: "office-chairs", children: [] },
          { name: "Desks", slug: "desks", children: [] },
          { name: "Storage", slug: "storage", children: [] }
        ]
      }
    ]
  },
  {
    name: "Toys & Gifts",
    slug: "toys-gifts",
    children: [
      {
        name: "Toys",
        slug: "toys",
        children: [
          { name: "Action Figures", slug: "action-figures", children: [] },
          { name: "Educational Toys", slug: "educational-toys", children: [] },
          { name: "Dolls", slug: "dolls", children: [] },
          { name: "Building Blocks", slug: "building-blocks", children: [] },
          { name: "Remote Control Toys", slug: "remote-control-toys", children: [] },
          { name: "Plush Toys", slug: "plush-toys", children: [] }
        ]
      },

      {
        name: "Gifts",
        slug: "gifts",
        children: [
          { name: "Birthday Gifts", slug: "birthday-gifts", children: [] },
          { name: "Anniversary Gifts", slug: "anniversary-gifts", children: [] },
          { name: "Corporate Gifts", slug: "corporate-gifts", children: [] },
          { name: "Personalized Gifts", slug: "personalized-gifts", children: [] },
          { name: "Gift Cards", slug: "gift-cards", children: [] }
        ]
      },

      {
        name: "Stationery",
        slug: "stationery",
        children: [
          { name: "School Supplies", slug: "school-supplies", children: [] },
          { name: "Office Supplies", slug: "office-supplies", children: [] },
          { name: "Art Supplies", slug: "art-supplies", children: [] }
        ]
      }
    ]
  }
];