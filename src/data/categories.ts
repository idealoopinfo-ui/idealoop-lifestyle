export type Category = {
    title: string;
    gendered: boolean;
    items: string[] | Record<string, string[]>;
  };
  
  export const categories: Category[] = [
    
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