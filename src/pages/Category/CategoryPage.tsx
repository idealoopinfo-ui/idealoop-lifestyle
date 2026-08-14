import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./CategoryPage.css";

export default function CategoryPage() {
  const {
    department,
    category,
    subcategory,
    collection,
    productType,
  } = useParams<{
    department?: string;
    category?: string;
    subcategory?: string;
    collection?: string;
    productType?: string;
  }>();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [
    department,
    category,
    subcategory,
    collection,
    productType,
  ]);

  const fetchProducts = async () => {
    setLoading(true);

    try {
      let query = supabase
        .from("products")
        .select("*");

      /*
       * ==========================================
       * DEPARTMENT
       * ==========================================
       */

      if (department) {
        query = query.eq(
          "department",
          department
        );
      }

      /*
       * ==========================================
       * CATEGORY
       * ==========================================
       */

      if (category) {
        query = query.eq(
          "category",
          category
        );
      }

      /*
       * ==========================================
       * SUBCATEGORY
       * ==========================================
       */

      if (subcategory) {
        query = query.eq(
          "subcategory",
          subcategory
        );
      }

      /*
       * ==========================================
       * COLLECTION
       * ==========================================
       */

      if (collection) {
        query = query.eq(
          "collection",
          collection
        );
      }

      /*
       * ==========================================
       * PRODUCT TYPE
       * ==========================================
       */

      if (productType) {
        query = query.eq(
          "product_type",
          productType
        );
      }

      /*
       * ==========================================
       * LOAD PRODUCTS
       * ==========================================
       */

      const {
        data,
        error,
      } = await query.order(
        "created_at",
        {
          ascending: false,
        }
      );

      if (error) {
        console.error(
          "Product loading error:",
          error
        );

        setProducts([]);
      } else {
        console.log(
          "CATEGORY PRODUCTS:",
          data
        );

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
   * PAGE TITLE
   * ==========================================
   */

  const getCategoryTitle = () => {

    const currentSlug =
      productType ||
      collection ||
      subcategory ||
      category ||
      department;

    if (!currentSlug) {
      return "Products";
    }

    return currentSlug
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

        <h1>
          {getCategoryTitle()}
        </h1>

      </div>

      {/* ======================================
          PRODUCT GRID
      ======================================= */}

      <div className="product-grid">

        {loading ? (

          <div className="category-loading">
            <p>
              Loading products...
            </p>
          </div>

        ) : products.length === 0 ? (

          <div className="empty-category-message">

            <h2>
              This collection is growing
            </h2>

            <p>
              New products are being added
              regularly. Check back soon for more.
            </p>

          </div>

        ) : (

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