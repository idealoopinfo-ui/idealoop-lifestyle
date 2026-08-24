import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { supabase } from "../../lib/supabase";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./ProductDetails.css";

type AdditionalFeature = {
  feature: string;
  value: string;
};

type Product = {
  id: string;
  product_id: string;
  title: string;

  department?: string;
  category?: string;
  subcategory?: string;
  collection?: string;
  product_type?: string;

  description?: string;
  short_description?: string;

  image_1: string;
  image_2?: string;
  image_3?: string;
  image_4?: string;
  image_5?: string;

  affiliate_url: string;
  source_url?: string;

  brand?: string;
  shop_name?: string;
  marketplace?: string;

  /* =========================
     GENERAL
  ========================= */

  model?: string;
  warranty?: string;
  country_origin?: string;
  package_includes?: string;

  additional_features?: AdditionalFeature[];

  /* =========================
     FASHION
  ========================= */

  material?: string;
  fit?: string;
  style?: string;
  occasion?: string;
  season?: string;
  gender?: string;
  pattern?: string;
  fashion_type?: string;
  sleeve_type?: string;
  collar_style?: string;
  fabric?: string;
  fabric_type?: string;
  fashion_details?: string;
  printing_type?: string;
  sheer?: string;
  care_instructions?: string;

  size?: string;
  color?: string;
  clothing_length?: string;
  waist_type?: string;
  closure_type?: string;
  stretch?: string;
  age_group?: string;

  /* =========================
     BEAUTY
  ========================= */

  hair_type?: string;
  skin_type?: string;
  ingredients?: string;
  volume_size?: string;
  scent?: string;
  benefits?: string;
  suitable_for?: string;

  /* =========================
     HOME & LIVING
  ========================= */

  dimensions?: string;
  room_type?: string;
  weight?: string;

  /* =========================
     TOYS & GIFTS
  ========================= */

  age_range?: string;
  educational_features?: string;

  /* =========================
     FITNESS & WELLNESS
  ========================= */

  equipment_type?: string;
  workout_type?: string;
  sport_type?: string;
  weight_capacity?: string;
  skill_level?: string;
  target_area?: string;
  accessories?: string;

  wellness_type?: string;
  usage_area?: string;
  wellness_benefits?: string;

  power_source?: string;
  battery_capacity?: string;
  heat_function?: string;
  massage_type?: string;
};

export default function ProductDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [related, setRelated] = useState<Product[]>([]);

  /* =========================
     LOAD PRODUCT
  ========================= */

  useEffect(() => {
    if (!productId) return;

    const loadProduct = async () => {
      /* =========================
         MAIN PRODUCT
      ========================= */

      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("product_id", productId)
        .maybeSingle();

      if (error) {
        console.error("PRODUCT LOAD ERROR:", error);
        return;
      }

      if (!data) {
        console.log("PRODUCT NOT FOUND:", productId);
        return;
      }

      setProduct(data);
      setSelectedImage(data.image_1 || "");

      console.log("PRODUCT DATA:", data);
      console.log("MARKETPLACE:", data.marketplace);

      /* =========================
         RELATED PRODUCTS
      ========================= */

      let relatedData: Product[] = [];

      /* SAME SUBCATEGORY */

      if (data.subcategory) {
        const {
          data: subcategoryProducts,
          error: subcategoryError,
        } = await supabase
          .from("products")
          .select("*")
          .eq("subcategory", data.subcategory)
          .neq("product_id", data.product_id)
          .limit(5);

        if (subcategoryError) {
          console.error(
            "SUBCATEGORY RELATED PRODUCTS ERROR:",
            subcategoryError
          );
        } else {
          relatedData = subcategoryProducts || [];
        }
      }

      /* SAME CATEGORY */

      if (relatedData.length === 0 && data.category) {
        const {
          data: categoryProducts,
          error: categoryError,
        } = await supabase
          .from("products")
          .select("*")
          .eq("category", data.category)
          .neq("product_id", data.product_id)
          .limit(5);

        if (categoryError) {
          console.error(
            "CATEGORY RELATED PRODUCTS ERROR:",
            categoryError
          );
        } else {
          relatedData = categoryProducts || [];
        }
      }

      /* SAME DEPARTMENT */

      if (relatedData.length === 0 && data.department) {
        const {
          data: departmentProducts,
          error: departmentError,
        } = await supabase
          .from("products")
          .select("*")
          .eq("department", data.department)
          .neq("product_id", data.product_id)
          .limit(5);

        if (departmentError) {
          console.error(
            "DEPARTMENT RELATED PRODUCTS ERROR:",
            departmentError
          );
        } else {
          relatedData = departmentProducts || [];
        }
      }

      setRelated(relatedData);
    };

    loadProduct();
  }, [productId]);

  /* =========================
     LOADING
  ========================= */

  if (!product) {
    return (
      <div className="product-loading">
        Loading product...
      </div>
    );
  }

  /* =========================
     PRODUCT IMAGES
  ========================= */

  const images = [
    product.image_1,
    product.image_2,
    product.image_3,
    product.image_4,
    product.image_5,
  ].filter(Boolean) as string[];

  /* =========================
     PRODUCT SPECIFICATIONS
  ========================= */

  const specifications = [

    /* =========================
       GENERAL
    ========================= */

    ["Marketplace", product.marketplace],
    ["Brand", product.brand],
    ["Model", product.model],
    ["Warranty", product.warranty],
    ["Country of Origin", product.country_origin],
    ["Package Includes", product.package_includes],

    /* =========================
       FASHION
    ========================= */

    ["Material", product.material],
    ["Fit", product.fit],
    ["Style", product.style],
    ["Occasion", product.occasion],
    ["Season", product.season],
    ["Gender", product.gender],
    ["Pattern", product.pattern],
    ["Fashion Type", product.fashion_type],
    ["Sleeve Type", product.sleeve_type],
    ["Collar Style", product.collar_style],
    ["Fabric", product.fabric],
    ["Fabric Type", product.fabric_type],
    ["Fashion Details", product.fashion_details],
    ["Printing Type", product.printing_type],
    ["Sheer", product.sheer],
    ["Care Instructions", product.care_instructions],
    ["Size", product.size],
    ["Color", product.color],
    ["Clothing Length", product.clothing_length],
    ["Waist Type", product.waist_type],
    ["Closure Type", product.closure_type],
    ["Stretch", product.stretch],
    ["Age Group", product.age_group],

    /* =========================
       BEAUTY
    ========================= */

    ["Hair Type", product.hair_type],
    ["Skin Type", product.skin_type],
    ["Ingredients", product.ingredients],
    ["Volume", product.volume_size],
    ["Scent", product.scent],
    ["Benefits", product.benefits],
    ["Suitable For", product.suitable_for],

    /* =========================
       HOME & LIVING
    ========================= */

    ["Dimensions", product.dimensions],
    ["Color", product.color],
    ["Room Type", product.room_type],
    ["Weight", product.weight],

    /* =========================
       TOYS & GIFTS
    ========================= */

    ["Age Range", product.age_range],
    ["Educational Features", product.educational_features],

    /* =========================
       FITNESS
    ========================= */

    ["Equipment Type", product.equipment_type],
    ["Workout Type", product.workout_type],
    ["Sport Type", product.sport_type],
    ["Weight Capacity", product.weight_capacity],
    ["Skill Level", product.skill_level],
    ["Target Area", product.target_area],
    ["Accessories", product.accessories],

    ["Wellness Type", product.wellness_type],
    ["Usage Area", product.usage_area],
    ["Wellness Benefits", product.wellness_benefits],

    ["Power Source", product.power_source],
    ["Battery Capacity", product.battery_capacity],
    ["Heat Function", product.heat_function],
    ["Massage Type", product.massage_type],
  ].filter(
    ([, value]) =>
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
  );

  /* =========================
     DESCRIPTION
  ========================= */

  const descriptionPoints =
    product.description
      ?.split("\n")
      .map((line) => line.trim())
      .filter(Boolean) || [];

  /* =========================
     ADDITIONAL FEATURES
  ========================= */

  const additionalFeatures =
    product.additional_features?.filter(
      (item) =>
        item?.feature?.trim() ||
        item?.value?.trim()
    ) || [];

  /* =========================
     FACEBOOK SHARE
  ========================= */

  const shareOnFacebook = () => {
    const productUrl = window.location.href;

    const facebookUrl =
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        productUrl
      )}`;

    window.open(
      facebookUrl,
      "_blank",
      "width=700,height=600"
    );
  };

  return (
    <div className="product-details-page">

      {/* =====================================================
    PRODUCT NAVIGATION
===================================================== */}

<nav className="product-breadcrumb" aria-label="Product navigation">

<Link to="/">
  Home
</Link>

{product.department && (
  <>
    <span>›</span>

    <Link
      to={`/category/${product.department}`}
    >
      {product.department
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) =>
          letter.toUpperCase()
        )}
    </Link>
  </>
)}

{product.category && (
  <>
    <span>›</span>

    <Link
      to={`/category/${product.department}/${product.category}`}
    >
      {product.category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) =>
          letter.toUpperCase()
        )}
    </Link>
  </>
)}

{product.subcategory && (
  <>
    <span>›</span>

    <Link
      to={`/category/${product.department}/${product.category}/${product.subcategory}`}
    >
      {product.subcategory
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) =>
          letter.toUpperCase()
        )}
    </Link>
  </>
)}

{product.collection && (
  <>
    <span>›</span>

    <Link
      to={`/category/${product.department}/${product.category}/${product.subcategory}/${product.collection}`}
    >
      {product.collection
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) =>
          letter.toUpperCase()
        )}
    </Link>
  </>
)}

{product.product_type && (
  <>
    <span>›</span>

    <Link
      to={`/category/${product.department}/${product.category}/${product.subcategory}/${product.collection}/${product.product_type}`}
    >
      {product.product_type
        .replace(/-/g, " ")
        .replace(/\b\w/g, (letter) =>
          letter.toUpperCase()
        )}
    </Link>
  </>
)}

</nav>

      {/* =====================================================
          PRODUCT TOP
      ===================================================== */}

      <div className="product-top">

        {/* =================================================
            THUMBNAILS
        ================================================= */}

        <div className="thumbnail-list">

          {images.map((img) => (
            <img
              key={img}
              src={img}
              alt={product.title}
              className={`thumbnail ${
                selectedImage === img ? "active" : ""
              }`}
              onClick={() =>
                setSelectedImage(img)
              }
            />
          ))}

        </div>

        {/* =================================================
            MAIN IMAGE
        ================================================= */}

        <div className="main-image-area">

          <img
            src={selectedImage}
            alt={product.title}
            className="main-product-image"
          />

        </div>

        {/* =================================================
            PRODUCT INFORMATION
        ================================================= */}

        <div className="product-info">

          <h1>{product.title}</h1>

          <p className="product-id">
            Product ID: {product.product_id}
          </p>

          {product.marketplace && (
            <div className="product-marketplace">

              <span className="marketplace-label">
                Marketplace :
              </span>

              <span className="marketplace-value">
                {product.marketplace}
              </span>

            </div>
          )}

          {product.short_description && (
            <div className="short-description">
              {product.short_description}
            </div>
          )}

          {/* SHOP */}

          <button
            type="button"
            className="detail-shop-btn"
            onClick={() =>
              window.open(
                product.affiliate_url,
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            Shop Now
          </button>

          {/* FACEBOOK */}

          <button
            type="button"
            className="facebook-share-btn"
            onClick={shareOnFacebook}
          >

            <span className="facebook-share-icon">
              f
            </span>

            Share on Facebook

          </button>

        </div>

      </div>

      {/* =====================================================
          PRODUCT DETAILS
      ===================================================== */}

      {specifications.length > 0 && (
        <div className="product-specifications">

          <h2>Product Details</h2>

          <div className="spec-grid">

            {specifications.map(
              ([label, value], index) => (
                <div
                  className="spec-item"
                  key={`${label}-${index}`}
                >

                  <strong>
                    {label}
                  </strong>

                  <span>
                    {value}
                  </span>

                </div>
              )
            )}

          </div>

        </div>
      )}

      {/* =====================================================
          ADDITIONAL FEATURES
      ===================================================== */}

      {additionalFeatures.length > 0 && (
        <div className="product-specifications">

          <h2>Additional Features</h2>

          <div className="spec-grid">

            {additionalFeatures.map(
              (item, index) => (
                <div
                  className="spec-item"
                  key={index}
                >

                  <strong>
                    {item.feature}
                  </strong>

                  <span>
                    {item.value}
                  </span>

                </div>
              )
            )}

          </div>

        </div>
      )}

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      {descriptionPoints.length > 0 && (
        <div className="product-description">

          <h2>Description</h2>

          <div className="description-list">

            {descriptionPoints.map(
              (line, index) => (
                <div
                  className="description-item"
                  key={index}
                >

                  <span>
                    •
                  </span>

                  <p>
                    {line}
                  </p>

                </div>
              )
            )}

          </div>

        </div>
      )}

      {/* =====================================================
          YOU MAY ALSO LIKE
      ===================================================== */}

      <section className="related-products">

        <h2>
          You May Also Like
        </h2>

        {related.length > 0 ? (
          <div className="related-grid">

            {related.map((item) => (
              <ProductCard
                key={item.product_id}
                product={item}
              />
            ))}

          </div>
        ) : (
          <p className="no-related-products">
            No related products available.
          </p>
        )}

      </section>

    </div>
  );
}