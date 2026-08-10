import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { supabase } from "./lib/supabase.js";
import { startMonitoring } from "./monitor/index.js";
import { monitorProducts } from "./monitor/monitorProducts.js";
import { publishProductToFacebook } from "./facebook/publisher.js";
import { formatProductForFacebook } from "./facebook/productFormatter.js";

dotenv.config({
  path: new URL("./.env", import.meta.url),
});

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://idealoop-lifestyle.netlify.app",
    ],
  })
);

app.use(express.json());


// ==================================================
// HOME
// ==================================================

app.get("/", (req, res) => {
  res.send("Idealoop Backend Running");
});


// ==================================================
// MANUAL MONITORING
// ==================================================

app.post("/api/monitor/run", async (req, res) => {
  try {
    await monitorProducts();

    res.json({
      success: true,
      message: "Product monitoring completed",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});


// ==================================================
// MANUAL FACEBOOK PUBLISH
// ==================================================

app.post("/api/facebook/publish", async (req, res) => {
  try {
    console.log("📘 Facebook publish request received");

    const {
        title,
        shortDescription = "",
        productHighlights = [],
        greatFor = [],
        affiliateUrl,
        images = [],
        hashtags = [],
        department = "",
      } = req.body;

    console.log(
      "Product highlights:",
      productHighlights
    );

    console.log(
      "Great for:",
      greatFor
    );

    console.log(
      "Title:",
      title
    );

    console.log(
      "Affiliate URL:",
      affiliateUrl
    );

    console.log(
      "Image count:",
      Array.isArray(images)
        ? images.length
        : 0
    );

    console.log(
      "Hashtag count:",
      Array.isArray(hashtags)
        ? hashtags.length
        : 0
    );

    const result = await publishProductToFacebook({
        title,
        shortDescription,
        productHighlights,
        greatFor,
        affiliateUrl,
        images,
        hashtags,
        department,
      });
    console.log(
      "✅ Facebook publish successful"
    );

    res.json(result);

  } catch (error) {

    console.error(
      "❌ Facebook publishing error:"
    );

    console.error(error);

    if (error.response?.data) {
      console.error(
        "Facebook response:",
        JSON.stringify(
          error.response.data,
          null,
          2
        )
      );
    }

    res.status(500).json({
      success: false,
      error:
        error.response?.data?.error?.message ||
        error.message ||
        "Facebook publishing failed",
    });
  }
});


// ==================================================
// PUBLISH ONE SUPABASE PRODUCT TO FACEBOOK
// ==================================================

app.post(
  "/api/facebook/publish-product/:id",
  async (req, res) => {

    try {

      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          success: false,
          error: "Product ID is required",
        });
      }

      console.log(
        "📦 Facebook product publish request:",
        id
      );


      // --------------------------------------------
      // GET PRODUCT FROM SUPABASE
      // --------------------------------------------

      const {
        data: product,
        error,
      } = await supabase
        .from("products")
        .select(`
          id,
          title,
          short_description,
          description,
          marketplace,
          affiliate_url,
          source_url,
          shop_name,
          image_1,
          image_2,
          image_3,
          image_4,
          image_5,
          department,
          category,
          subcategory,
          collection,
          gender
        `)
        .eq("id", id)
        .single();


      // --------------------------------------------
      // SUPABASE ERROR
      // --------------------------------------------

      if (error) {

        console.error(
          "Supabase product error:",
          error
        );

        return res.status(404).json({
          success: false,
          error: error.message,
        });
      }


      // --------------------------------------------
      // PRODUCT NOT FOUND
      // --------------------------------------------

      if (!product) {

        return res.status(404).json({
          success: false,
          error: "Product not found",
        });
      }


      console.log(
        "✅ Product found:",
        product.title
      );


      // --------------------------------------------
      // FORMAT PRODUCT FOR FACEBOOK
      // --------------------------------------------

      const facebookProduct =
        formatProductForFacebook(
          product
        );


      console.log(
        "🏷️ Product type:",
        facebookProduct.productType
      );

      console.log(
        "📂 Department:",
        facebookProduct.department
      );

      console.log(
        "📂 Category:",
        facebookProduct.category
      );

      console.log(
        "📂 Subcategory:",
        facebookProduct.subcategory
      );

      console.log(
        "🗂️ Collection:",
        facebookProduct.collection
      );

      console.log(
        "👤 Gender:",
        facebookProduct.gender
      );

      console.log(
        "📸 Images:",
        facebookProduct.images.length
      );

      console.log(
        "⭐ Highlights:",
        facebookProduct.productHighlights.length
      );

      console.log(
        "🎯 Great for:",
        facebookProduct.greatFor.length
      );

      console.log(
        "🏷️ Hashtags:",
        facebookProduct.hashtags.length
      );


      // --------------------------------------------
      // PUBLISH TO FACEBOOK
      // --------------------------------------------

      const result =
        await publishProductToFacebook(
          facebookProduct
        );


      // --------------------------------------------
      // SUCCESS RESPONSE
      // --------------------------------------------

      res.json({
        ...result,

        productId:
          product.id,

        productTitle:
          product.title,

        productType:
          facebookProduct.productType,

        collection:
          facebookProduct.collection,

        imageCount:
          facebookProduct.images.length,
      });

    } catch (error) {

      console.error(
        "❌ Facebook product publishing error:"
      );

      console.error(error);

      if (error.response?.data) {

        console.error(
          "Facebook response:",
          JSON.stringify(
            error.response.data,
            null,
            2
          )
        );
      }

      res.status(500).json({
        success: false,
        error:
          error.response?.data?.error?.message ||
          error.message ||
          "Facebook product publishing failed",
      });
    }
  }
);


// ==================================================
// START SERVER
// ==================================================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

  startMonitoring();

});
