import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./CategoryPage.css";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      let query = supabase.from("products").select("*");

      /*
       * Category URLs can contain multiple levels:
       *
       * /category/fashion
       * /category/fashion/women
       * /category/fashion/women/clothing
       * /category/fashion/women/clothing/dresses
       *
       * We use the last part of the URL as the
       * category/subcategory slug.
       */

      if (category) {
        const pathParts = category
          .split("/")
          .filter(Boolean);

        const currentSlug =
          pathParts[pathParts.length - 1];

        /*
         * ==========================================
         * 1. CHECK CATEGORIES TABLE
         * ==========================================
         */

        const {
          data: cat,
          error: categoryError,
        } = await supabase
          .from("categories")
          .select("id, name, slug")
          .eq("slug", currentSlug)
          .maybeSingle();

        if (categoryError) {
          console.error(
            "Category lookup error:",
            categoryError
          );
        }

        if (cat) {
          query = query.eq("category_id", cat.id);
        } else {
          /*
           * ==========================================
           * 2. CHECK SUBCATEGORIES TABLE
           * ==========================================
           */

          const {
            data: subcategory,
            error: subcategoryError,
          } = await supabase
            .from("subcategories")
            .select(
              "id, name, slug, category_id"
            )
            .eq("slug", currentSlug)
            .maybeSingle();

          if (subcategoryError) {
            console.error(
              "Subcategory lookup error:",
              subcategoryError
            );
          }

          if (subcategory) {
            /*
             * Products currently use category_id.
             *
             * Therefore a subcategory is matched
             * through its parent category.
             */

            query = query.eq(
              "category_id",
              subcategory.category_id
            );
          } else {
            /*
             * ==========================================
             * 3. NOTHING FOUND
             * ==========================================
             *
             * Show the "collection is growing"
             * message.
             */

            setProducts([]);
            setLoading(false);
            return;
          }
        }
      }

      /*
       * ==========================================
       * LOAD PRODUCTS
       * ==========================================
       */

      const {
        data,
        error,
      } = await query.order("created_at", {
        ascending: false,
      });

      if (error) {
        console.error(
          "Product loading error:",
          error
        );

        setProducts([]);
      } else {
        setProducts(data || []);
      }
    } catch (error) {
      console.error(
        "Unexpected category error:",
        error
      );

      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  /*
   * ==========================================
   * CATEGORY TITLE
   * ==========================================
   */

  const getCategoryTitle = () => {
    if (!category) {
      return "Products";
    }

    const parts = category
      .split("/")
      .filter(Boolean);

    const lastPart =
      parts[parts.length - 1];

    return lastPart
      .replace(/-/g, " ")
      .replace(/\b\w/g, (letter) =>
        letter.toUpperCase()
      );
  };

  return (
    <div className="category-page">

      {/* ======================================
          CATEGORY HEADER
      ======================================= */}

      <div className="category-header">
        <h1>{getCategoryTitle()}</h1>
      </div>

      {/* ======================================
          PRODUCT GRID
      ======================================= */}

      <div className="product-grid">

        {loading ? (
          <div className="category-loading">
            <p>Loading products...</p>
          </div>
        ) : products.length === 0 ? (

          /*
           * ====================================
           * EMPTY CATEGORY MESSAGE
           * ====================================
           */

          <div className="empty-category-message">
            <h2>This collection is growing</h2>

            <p>
              New products are being added regularly.
              Check back soon for more.
            </p>
          </div>

        ) : (

          /*
           * ====================================
           * PRODUCTS
           * ====================================
           */

          products.map((product) => (
            <ProductCard
              key={
                product.product_id ||
                product.id
              }
              product={product}
            />
          ))

        )}

      </div>
    </div>
  );
}

