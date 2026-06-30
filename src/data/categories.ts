export type Category = {
    title: string;
    gendered: boolean;
    items: string[] | Record<string, string[]>;
  };
  
  export const categories: Category[] = [
    {
      title: "Furniture",
      gendered: false,
      items: [
        "Sofas",
        "Beds",
        "Dining Tables",
        "Chairs",
        "Coffee Tables",
        "TV Units",
        "Wardrobes",
        "Office Furniture"
      ]
    },
    {
      title: "Home Decor",
      gendered: false,
      items: [
        "Wall Art",
        "Mirrors",
        "Rugs",
        "Curtains",
        "Vases",
        "Candles",
        "Decor Accents"
      ]
    },
    {
      title: "Lighting",
      gendered: false,
      items: [
        "Ceiling Lights",
        "Table Lamps",
        "Floor Lamps",
        "Wall Lights",
        "Pendant Lights",
        "Outdoor Lighting"
      ]
    },
    {
      title: "Kitchen",
      gendered: false,
      items: [
        "Cookware",
        "Dinnerware",
        "Storage",
        "Kitchen Tools",
        "Small Appliances"
      ]
    },
    {
      title: "Beauty",
      gendered: true,
      items: {
        Women: [
          "Skincare",
          "Makeup",
          "Hair Care",
          "Fragrance"
        ],
        Men: [
          "Skincare",
          "Hair Care",
          "Beard Care",
          "Fragrance"
        ]
      }
    },
    {
      title: "Fashion",
      gendered: true,
      items: {
        Women: [
          "Dresses",
          "Tops",
          "Shoes",
          "Bags",
          "Accessories"
        ],
        Men: [
          "Shirts",
          "T-Shirts",
          "Shoes",
          "Watches",
          "Accessories"
        ]
      }
    }
  ];