import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

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
  } = useParams();

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* =========================================================
     NORMALIZE
  ========================================================= */

  const normalize = (
    value: string | undefined | null
  ) => {
    if (!value) return null;

    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-");
  };

  /* =========================================================
     FORMAT TITLE
  ========================================================= */

  const formatTitle = (
    text: string | undefined | null
  ) => {
    if (!text) return "";

    return text
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) =>
        char.toUpperCase()
      );
  };

  /* =========================================================
     RESOLVE SUBCATEGORY
     
     URL:
     
     /fashion/men/clothing
     
     Database:
     
     category = men
     subcategory = men-clothing
     
     URL:
     
     /fashion/women/clothing
     
     Database:
     
     category = women
     subcategory = women-clothing
  ========================================================= */

  const resolveSubcategory = () => {
    const normalizedDepartment =
      normalize(department);
  
    const normalizedCategory =
      normalize(category);
  
    const normalizedSubcategory =
      normalize(subcategory);
  
    /* =====================================================
       FASHION → WOMEN
    ===================================================== */
  
    if (
      normalizedDepartment === "fashion" &&
      normalizedCategory === "women"
    ) {
      if (normalizedSubcategory === "clothing") {
        return "women-clothing";
      }
  
      if (normalizedSubcategory === "shoes") {
        return "women-shoes";
      }
  
      if (normalizedSubcategory === "accessories") {
        return "women-accessories";
      }
    }
  
    /* =====================================================
       FASHION → MEN
    ===================================================== */
  
    if (
      normalizedDepartment === "fashion" &&
      normalizedCategory === "men"
    ) {
      if (normalizedSubcategory === "clothing") {
        return "men-clothing";
      }
  
      if (normalizedSubcategory === "shoes") {
        return "men-shoes";
      }
  
      if (normalizedSubcategory === "accessories") {
        return "accessories";
      }
    }
  
    /* =====================================================
       TOYS & GIFTS → TOYS
       
       Database stores:
       "off road vehicle"
       
       URL uses:
       "off-road-vehicle"
    ===================================================== */
  
    if (
      normalizedDepartment === "toys-gifts" &&
      normalizedCategory === "toys" &&
      normalizedSubcategory === "off-road-vehicle"
    ) {
      return "off road vehicle";
    }
  
    /* =====================================================
       DEFAULT
    ===================================================== */
  
    return normalizedSubcategory;
  };
  /* =========================================================
     FETCH PRODUCTS
  ========================================================= */

  const fetchProducts = async () => {
    setLoading(true);

    try {
      const normalizedDepartment =
        normalize(department);

      const normalizedCategory =
        normalize(category);

      const resolvedSubcategory =
        resolveSubcategory();

      const normalizedCollection =
        normalize(collection);

        let normalizedProductType =
        normalize(productType);
      
      /* =====================================================
         TOYS & GIFTS SPECIAL SLUG
      ===================================================== */
      
      if (
        normalizedDepartment === "toys-gifts" &&
        normalizedCategory === "toys" &&
        normalizedProductType === "off-road-vehicle"
      ) {
        normalizedProductType = "off road vehicle";
      }

      console.log(
        "========================================"
      );

      console.log(
        "CATEGORY PAGE FILTER"
      );

      console.log(
        "department:",
        normalizedDepartment
      );

      console.log(
        "category:",
        normalizedCategory
      );

      console.log(
        "subcategory:",
        resolvedSubcategory
      );

      console.log(
        "collection:",
        normalizedCollection
      );

      console.log(
        "product_type:",
        normalizedProductType
      );

      console.log(
        "========================================"
      );

      /* =====================================================
         BASE QUERY
      ===================================================== */

      let query = supabase
        .from("products")
        .select("*");

      /* =====================================================
         LEVEL 1
         
         DEPARTMENT
         
         Example:
         /category/fashion
         
         Shows ALL Fashion products.
      ===================================================== */

      if (normalizedDepartment) {
        query = query.eq(
          "department",
          normalizedDepartment
        );
      }

      /* =====================================================
         LEVEL 2
         
         CATEGORY
         
         Example:
         /category/fashion/women
         
         Shows ALL products where:
         
         department = fashion
         category   = women
      ===================================================== */

      if (normalizedCategory) {
        query = query.eq(
          "category",
          normalizedCategory
        );
      }

      /* =====================================================
         LEVEL 3
         
         SUBCATEGORY
         
         Example:
         
         /fashion/women/clothing
         
         Database:
         
         subcategory = women-clothing
         
         IMPORTANT:
         
         We DO NOT filter collection here.
         
         Therefore all products belonging to
         women-clothing are returned.
      ===================================================== */

      if (resolvedSubcategory) {
        query = query.eq(
          "subcategory",
          resolvedSubcategory
        );
      }

      /* =====================================================
         LEVEL 4
         
         COLLECTION
         
         Example:
         
         /fashion/women/clothing/activewear
         
         This returns all products in:
         
         subcategory = women-clothing
         collection  = activewear
         
         It does NOT require product_type.
      ===================================================== */

      if (normalizedCollection) {
        query = query.eq(
          "collection",
          normalizedCollection
        );
      }

      /* =====================================================
         LEVEL 5
         
         PRODUCT TYPE
         
         Example:
         
         /fashion/women/clothing/activewear/sports-bras
         
         This is the most specific page.
         
         Exact product_type filtering is used here.
      ===================================================== */

      if (normalizedProductType) {
        query = query.eq(
          "product_type",
          normalizedProductType
        );
      }

      /* =====================================================
         EXECUTE
      ===================================================== */

      const {
        data,
        error,
      } = await query.order(
        "created_at",
        {
          ascending: false,
        }
      );

      /* =====================================================
         ERROR
      ===================================================== */

      if (error) {
        console.error(
          "PRODUCT FETCH ERROR:",
          error
        );

        setProducts([]);
        return;
      }

      /* =====================================================
         SUCCESS
      ===================================================== */

      console.log(
        "CATEGORY PRODUCTS:",
        data
      );

      console.log(
        "PRODUCT COUNT:",
        data?.length || 0
      );

      setProducts(data || []);

    } catch (error) {

      console.error(
        "CATEGORY PAGE ERROR:",
        error
      );

      setProducts([]);

    } finally {

      setLoading(false);

    }
  };

  /* =========================================================
     REFETCH WHEN URL CHANGES
  ========================================================= */

  useEffect(() => {
    fetchProducts();
  }, [
    department,
    category,
    subcategory,
    collection,
    productType,
  ]);

  /* =========================================================
     PAGE TITLE
  ========================================================= */

  const finalTitle =
    productType
      ? formatTitle(productType)
      : collection
        ? formatTitle(collection)
        : subcategory
          ? formatTitle(subcategory)
          : category
            ? formatTitle(category)
            : formatTitle(department || "");

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="category-page">

      {/* =====================================================
          BREADCRUMB
      ===================================================== */}

      <div className="breadcrumb">

        <Link to="/">
          Home
        </Link>

        {/* DEPARTMENT */}

        {department && (
          <>
            <span> / </span>

            <Link
              to={`/category/${department}`}
            >
              {formatTitle(department)}
            </Link>
          </>
        )}

        {/* CATEGORY */}

        {category && (
          <>
            <span> / </span>

            <Link
              to={`/category/${department}/${category}`}
            >
              {formatTitle(category)}
            </Link>
          </>
        )}

        {/* SUBCATEGORY */}

        {subcategory && (
          <>
            <span> / </span>

            <Link
              to={`/category/${department}/${category}/${subcategory}`}
            >
              {formatTitle(subcategory)}
            </Link>
          </>
        )}

        {/* COLLECTION */}

        {collection && (
          <>
            <span> / </span>

            <Link
              to={`/category/${department}/${category}/${subcategory}/${collection}`}
            >
              {formatTitle(collection)}
            </Link>
          </>
        )}

        {/* PRODUCT TYPE */}

        {productType && (
          <>
            <span> / </span>

            <span>
              {formatTitle(productType)}
            </span>
          </>
        )}

      </div>

      {/* =====================================================
          PAGE TITLE
      ===================================================== */}

      <h1>
        {finalTitle}
      </h1>

      {/* =====================================================
          PRODUCT COUNT
      ===================================================== */}

      {!loading && products.length > 0 && (
        <div className="product-count">
          {products.length}{" "}
          {products.length === 1
            ? "product"
            : "products"}
        </div>
      )}

      {/* =====================================================
          LOADING
      ===================================================== */}

      {loading ? (

        <div className="category-loading">
          <p>
            Loading products...
          </p>
        </div>

      ) : products.length === 0 ? (

        /* ===================================================
           EMPTY
        =================================================== */

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

        /* ===================================================
           PRODUCT GRID
        =================================================== */

        <div className="product-grid">

          {products.map((product) => (

            <ProductCard
              key={
                product.product_id ||
                product.id
              }
              product={product}
            />

          ))}

        </div>

      )}

    </div>
  );
}