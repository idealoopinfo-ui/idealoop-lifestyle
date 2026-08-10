export function formatProductForFacebook(product) {
    if (!product) {
      throw new Error("Product is required");
    }
  
    const title = String(product.title || "").trim();
  
    if (!title) {
      throw new Error("Product title is required");
    }
  
    const shortDescription = String(
      product.short_description ||
        product.description ||
        ""
    ).trim();
  
    const affiliateUrl = String(
      product.affiliate_url || ""
    ).trim();
  
    if (!affiliateUrl) {
      throw new Error(
        `Affiliate URL is missing for: ${title}`
      );
    }
  
    // --------------------------------------------------
    // COLLECT UP TO 5 PRODUCT IMAGES
    // Supports comma-separated image URLs too.
    // --------------------------------------------------
  
    const images = [
      product.image_1,
      product.image_2,
      product.image_3,
      product.image_4,
      product.image_5,
    ]
      .filter(Boolean)
      .flatMap((value) =>
        String(value)
          .split(",")
          .map((url) => url.trim())
          .filter(Boolean)
      )
      .filter(
        (url, index, array) =>
          array.indexOf(url) === index
      )
      .slice(0, 5);
  
    // --------------------------------------------------
    // CATEGORY INFORMATION
    // --------------------------------------------------
  
    const department = String(
      product.department || ""
    ).trim();
  
    const category = String(
      product.category || ""
    ).trim();
  
    const subcategory = String(
      product.subcategory || ""
    ).trim();
  
    const collection = String(
      product.collection || ""
    ).trim();
  
    const gender = String(
      product.gender || ""
    ).trim();
  
    const context = [
      department,
      category,
      subcategory,
      collection,
      gender,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  
    // --------------------------------------------------
    // DETECT PRODUCT TYPE
    // --------------------------------------------------
  
    let productType = "general";
  
    if (
      context.includes("fitness") ||
      context.includes("wellness") ||
      context.includes("workout") ||
      context.includes("gym") ||
      context.includes("sports")
    ) {
      productType = "fitness";
    } else if (
      context.includes("beauty") ||
      context.includes("skin") ||
      context.includes("hair") ||
      context.includes("cosmetic")
    ) {
      productType = "beauty";
    } else if (
      context.includes("home") ||
      context.includes("living") ||
      context.includes("house")
    ) {
      productType = "home";
    } else if (
      context.includes("toy") ||
      context.includes("gift") ||
      context.includes("kids") ||
      context.includes("children")
    ) {
      productType = "toys";
    } else if (
      context.includes("fashion") ||
      context.includes("clothing") ||
      context.includes("women") ||
      context.includes("men") ||
      context.includes("kids") ||
      context.includes("apparel")
    ) {
      productType = "fashion";
    }
  
    // --------------------------------------------------
    // PRODUCT-SPECIFIC HIGHLIGHTS
    // --------------------------------------------------
  
    let productHighlights = [];
    let greatFor = [];
    let hashtags = [
      "IdealoopLifestyle",
      "ShoppingFinds",
    ];
  
    if (productType === "fashion") {
      productHighlights = [
        "Easy to style for different outfits",
        "Versatile design for everyday wear",
        gender
          ? `Designed with ${gender.toLowerCase()} styles in mind`
          : "Suitable for a variety of personal styles",
        collection
          ? `Part of the ${collection} collection`
          : "Easy to pair with wardrobe essentials",
        "A practical addition to your wardrobe",
      ];
  
      greatFor = [
        "Everyday outfits",
        "Work and office looks",
        "Weekend outings",
        "Vacation and seasonal styling",
        "Mix-and-match wardrobes",
      ];
  
      hashtags.push(
        "FashionFinds",
        "WomensFashion",
        "StyleFinds"
      );
    }
  
    if (productType === "beauty") {
      productHighlights = [
        "Designed for everyday beauty routines",
        "Easy to add to your personal care routine",
        "Practical format for regular use",
        "Suitable for beauty and self-care routines",
        "A convenient addition to your beauty collection",
      ];
  
      greatFor = [
        "Daily beauty routines",
        "Self-care routines",
        "Skincare and personal care",
        "Beauty enthusiasts",
        "At-home beauty routines",
      ];
  
      hashtags.push(
        "BeautyFinds",
        "BeautyProducts",
        "SelfCare"
      );
    }
  
    if (productType === "home") {
      productHighlights = [
        "Practical addition to your home",
        "Designed for everyday household use",
        "Easy to incorporate into your space",
        "Useful for creating a comfortable home",
        "A versatile home essential",
      ];
  
      greatFor = [
        "Home organization",
        "Everyday household use",
        "Room upgrades",
        "Home styling",
        "Practical home solutions",
      ];
  
      hashtags.push(
        "HomeFinds",
        "HomeAndLiving",
        "HomeEssentials"
      );
    }
  
    if (productType === "toys") {
      productHighlights = [
        "Designed for fun and engaging play",
        "A practical choice for children or gifting",
        "Suitable for entertainment and activities",
        "Great option for adding variety to playtime",
        "A fun gift idea for special occasions",
      ];
  
      greatFor = [
        "Birthday gifts",
        "Holiday gifting",
        "Family activities",
        "Playtime",
        "Kids and gift shoppers",
      ];
  
      hashtags.push(
        "ToyFinds",
        "GiftIdeas",
        "KidsGifts"
      );
    }
  
    if (productType === "fitness") {
      productHighlights = [
        "Designed for fitness and active routines",
        "Useful for home workouts and training",
        "Easy to incorporate into different exercises",
        "Suitable for regular fitness routines",
        "A practical addition to your workout setup",
      ];
  
      greatFor = [
        "Home workouts",
        "Strength training",
        "Resistance training",
        "Gym routines",
        "Fitness enthusiasts",
      ];
  
      hashtags.push(
        "FitnessFinds",
        "HomeWorkout",
        "WorkoutGear",
        "StrengthTraining",
        "Wellness"
      );
    }
  
    if (productType === "general") {
      productHighlights = [
        "Practical and versatile product",
        "Easy to incorporate into everyday life",
        "Designed for convenient everyday use",
        "A useful addition to your lifestyle",
        "Worth exploring for everyday needs",
      ];
  
      greatFor = [
        "Everyday use",
        "Lifestyle upgrades",
        "Shopping enthusiasts",
        "Gift ideas",
        "Everyday essentials",
      ];
  
      hashtags.push(
        "LifestyleFinds",
        "TrendingProducts"
      );
    }
  
    // --------------------------------------------------
    // COLLECTION HASHTAG
    // --------------------------------------------------
  
    if (collection) {
      const collectionTag = collection
        .replace(/[^a-zA-Z0-9]/g, "");
  
      if (collectionTag) {
        hashtags.push(collectionTag);
      }
    }
  
    // Remove duplicate hashtags
    hashtags = [
      ...new Set(
        hashtags.filter(Boolean)
      ),
    ];
  
    // --------------------------------------------------
    // RETURN FACEBOOK-READY PRODUCT DATA
    // --------------------------------------------------
  
    return {
      title,
      shortDescription,
      productHighlights,
      greatFor,
      affiliateUrl,
      images,
      hashtags,
      productType,
      department,
      category,
      subcategory,
      collection,
      gender,
    };
  }