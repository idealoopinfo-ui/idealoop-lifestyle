import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { supabase } from "../../lib/supabase";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./ProductDetails.css";

type Product = {
  id: string;
  product_id: string;
  title: string;

  department?: string;
  category?: string;
  subcategory?: string;

  description?: string;
  short_description?: string;

  image_1: string;
  image_2?: string;
  image_3?: string;
  image_4?: string;
  image_5?: string;

  affiliate_url: string;

  brand?: string;
  material?: string;
  fit?: string;
  style?: string;
  occasion?: string;
  season?: string;
  gender?: string;

  // Beauty
  hair_type?: string;
  skin_type?: string;
  ingredients?: string;
  volume_size?: string;
  scent?: string;
  benefits?: string;
  suitable_for?: string;

  // Home & Living
  dimensions?: string;
  color?: string;
  room_type?: string;
  weight?: string;

  // Toys & Gifts
  age_range?: string;
  educational_features?: string;

  // Fitness & Wellness
  equipment_type?: string;
  workout_type?: string;
  sport_type?: string;
  size?: string;
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

  useEffect(() => {
    if (!productId) return;

    const loadProduct = async () => {
      // =========================
      // LOAD MAIN PRODUCT
      // =========================
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

      // =========================
      // LOAD RELATED PRODUCTS
      // =========================
      let relatedData: Product[] = [];

      // First preference:
      // same subcategory
      if (data.subcategory) {
        const { data: subcategoryProducts, error: subcategoryError } =
          await supabase
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

      // =========================
      // FALLBACK:
      // SAME CATEGORY
      // =========================
      if (relatedData.length === 0 && data.category) {
        const { data: categoryProducts, error: categoryError } =
          await supabase
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

      // =========================
      // FALLBACK:
      // SAME DEPARTMENT
      // =========================
      if (relatedData.length === 0 && data.department) {
        const { data: departmentProducts, error: departmentError } =
          await supabase
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

  // =========================
  // LOADING
  // =========================

  if (!product) {
    return (
      <div className="product-loading">
        Loading product...
      </div>
    );
  }

  // =========================
  // PRODUCT IMAGES
  // =========================

  const images = [
    product.image_1,
    product.image_2,
    product.image_3,
    product.image_4,
    product.image_5,
  ].filter(Boolean) as string[];

  // =========================
  // PRODUCT SPECIFICATIONS
  // =========================

  const specifications = [
    // General
    ["Brand", product.brand],
    ["Material", product.material],
    ["Fit", product.fit],
    ["Style", product.style],
    ["Occasion", product.occasion],
    ["Season", product.season],
    ["Gender", product.gender],

    // Beauty
    ["Hair Type", product.hair_type],
    ["Skin Type", product.skin_type],
    ["Ingredients", product.ingredients],
    ["Volume", product.volume_size],
    ["Scent", product.scent],
    ["Benefits", product.benefits],
    ["Suitable For", product.suitable_for],

    // Home & Living
    ["Dimensions", product.dimensions],
    ["Color", product.color],
    ["Room Type", product.room_type],
    ["Weight", product.weight],

    // Toys & Gifts
    ["Age Range", product.age_range],
    ["Educational Features", product.educational_features],

    // Fitness & Wellness
    ["Equipment Type", product.equipment_type],
    ["Workout Type", product.workout_type],
    ["Sport Type", product.sport_type],
    ["Size", product.size],
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
  ].filter((item) => item[1]);

  // =========================
  // DESCRIPTION POINTS
  // =========================

  const descriptionPoints =
    product.description
      ?.split("\n")
      .map((line) => line.trim())
      .filter(Boolean) || [];

  // =========================
  // FACEBOOK SHARE
  // =========================

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

      {/* =========================
          PRODUCT TOP
      ========================= */}

      <div className="product-top">

        {/* =========================
            THUMBNAILS
        ========================= */}

        <div className="thumbnail-list">
          {images.map((img) => (
            <img
              key={img}
              src={img}
              alt={product.title}
              className={`thumbnail ${
                selectedImage === img ? "active" : ""
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>

        {/* =========================
            MAIN IMAGE
        ========================= */}

        <div className="main-image-area">
          <img
            src={selectedImage}
            alt={product.title}
            className="main-product-image"
          />
        </div>

        {/* =========================
            PRODUCT INFORMATION
        ========================= */}

        <div className="product-info">

          <h1>{product.title}</h1>

          <p className="product-id">
            Product ID: {product.product_id}
          </p>

          {product.short_description && (
            <div className="short-description">
              {product.short_description}
            </div>
          )}

          {/* =========================
              SHOP BUTTON
          ========================= */}

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

          {/* =========================
              FACEBOOK SHARE
          ========================= */}

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


      {/* =========================
          PRODUCT DETAILS
      ========================= */}

      {specifications.length > 0 && (
        <div className="product-specifications">

          <h2>Product Details</h2>

          <div className="spec-grid">

            {specifications.map(
              ([label, value], index) => (
                <div
                  className="spec-item"
                  key={index}
                >
                  <strong>{label}</strong>

                  <span>{value}</span>
                </div>
              )
            )}

          </div>

        </div>
      )}

      {/* =========================
          DESCRIPTION
      ========================= */}

      {descriptionPoints.length > 0 && (
        <div className="product-description">

          <h2>Description</h2>

          <div className="description-list">

            {descriptionPoints.map((line, index) => (
              <div
                className="description-item"
                key={index}
              >
                <span>•</span>

                <p>{line}</p>
              </div>
            ))}

          </div>

        </div>
      )}

      {/* =========================
          YOU MAY ALSO LIKE
      ========================= */}

      <section className="related-products">

        <h2>You May Also Like</h2>

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