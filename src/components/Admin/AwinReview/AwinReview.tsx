import { useEffect, useMemo, useState } from "react";
import Papa from "papaparse";
import "./AwinReview.css";

interface AwinProduct {
  product_name?: string;
  aw_product_id?: string;
  merchant_product_id?: string;
  merchant_name?: string;
  brand_name?: string;
  category_name?: string;
  merchant_category?: string;
  description?: string;
  product_short_description?: string;

  merchant_image_url?: string;
  aw_image_url?: string;
  large_image?: string;
  alternate_image?: string;

  aw_deep_link?: string;
  merchant_deep_link?: string;

  currency?: string;
  search_price?: string;
  store_price?: string;

  [key: string]: string | undefined;
}

export default function AwinReview() {
  const [products, setProducts] = useState<AwinProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [advertiser, setAdvertiser] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const [hasSearched, setHasSearched] = useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<AwinProduct | null>(null);

  /* =========================================================
     LOAD AWIN FEED
  ========================================================= */

  const loadFeed = async () => {
    try {
      setLoading(true);
      setError("");

      console.log("Loading AWIN feed...");

      const response = await fetch("/awin-feed.csv.gz");

      if (!response.ok) {
        throw new Error(
          `Unable to load AWIN feed (${response.status})`
        );
      }

      const buffer = await response.arrayBuffer();

      console.log(
        "AWIN feed downloaded:",
        buffer.byteLength,
        "bytes"
      );

      const csvText = readFeed(buffer);

      console.log(
        "AWIN CSV TEXT LENGTH:",
        csvText.length
      );

      console.log(
        "AWIN CSV HEADER:",
        csvText.slice(0, 500)
      );

      const result = Papa.parse<AwinProduct>(
        csvText,
        {
          header: true,
          skipEmptyLines: true,
        }
      );

      console.log(
        "AWIN CSV rows:",
        result.data.length
      );

      if (result.errors.length > 0) {
        console.warn(
          "AWIN CSV parsing warnings:",
          result.errors.slice(0, 5)
        );
      }

      setProducts(result.data);
      setHasSearched(false);
    } catch (err) {
      console.error("AWIN FEED ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to load AWIN feed."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     LOAD ON PAGE OPEN
  ========================================================= */

  useEffect(() => {
    loadFeed();
  }, []);

  /* =========================================================
     ADVERTISERS
  ========================================================= */

  const advertisers = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map((product) => product.merchant_name)
          .filter(Boolean)
      )
    ).sort();
  }, [products]);

  /* =========================================================
     CATEGORIES
  ========================================================= */

  const categories = useMemo(() => {
    return Array.from(
      new Set(
        products
          .map(
            (product) =>
              product.category_name ||
              product.merchant_category
          )
          .filter(Boolean)
      )
    ).sort();
  }, [products]);

  /* =========================================================
     FILTER PRODUCTS
  ========================================================= */

  const filteredProducts = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !searchValue ||
        product.product_name
          ?.toLowerCase()
          .includes(searchValue) ||
        product.brand_name
          ?.toLowerCase()
          .includes(searchValue) ||
        product.merchant_product_id
          ?.toLowerCase()
          .includes(searchValue) ||
        product.aw_product_id
          ?.toLowerCase()
          .includes(searchValue);

      const matchesAdvertiser =
        !advertiser ||
        product.merchant_name === advertiser;

      const productCategory =
        product.category_name ||
        product.merchant_category;

      const matchesCategory =
        !category ||
        productCategory === category;

      /*
       * Status is currently UI-only.
       * AWIN feed does not contain Idealoop review status.
       */
      const matchesStatus = !status;

      return (
        matchesSearch &&
        matchesAdvertiser &&
        matchesCategory &&
        matchesStatus
      );
    });
  }, [
    products,
    search,
    advertiser,
    category,
    status,
  ]);

  /* =========================================================
     PRODUCT IMAGE
  ========================================================= */

  const getProductImage = (
    product: AwinProduct
  ) => {
    return (
      product.large_image ||
      product.merchant_image_url ||
      product.aw_image_url ||
      product.alternate_image ||
      ""
    );
  };

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = () => {
    setHasSearched(true);
  };

  /* =========================================================
     CLEAR SEARCH
  ========================================================= */

  const clearSearch = () => {
    setSearch("");
    setHasSearched(false);
  };

  /* =========================================================
     CLEAR ALL FILTERS
  ========================================================= */

  const clearFilters = () => {
    setSearch("");
    setAdvertiser("");
    setCategory("");
    setStatus("");
    setHasSearched(false);
    setSelectedProduct(null);
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <div className="awin-review">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="awin-review-header">

        <div>
          <h2>AWIN Product Review</h2>

          <p>
            Review AWIN products before adding
            them to the Idealoop posting queue.
          </p>
        </div>

        <div className="awin-feed-status">
          {loading
            ? "Loading AWIN feed..."
            : `${products.length.toLocaleString()} products loaded`}
        </div>

      </div>


      {/* =====================================================
          ERROR
      ===================================================== */}

      {error && (
        <div className="awin-error">
          {error}
        </div>
      )}


      {/* =====================================================
          FILTER AREA
      ===================================================== */}

      <div className="awin-review-filters">

        {/* ===================================================
            ROW 1
        =================================================== */}

        <div className="awin-filter-row awin-search-row">

          <div className="awin-search-box">

            <input
              type="text"
              placeholder="Search AWIN products..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            {search.length > 0 && (
              <button
                type="button"
                className="awin-clear-search"
                onClick={clearSearch}
              >
                Clear
              </button>
            )}

          </div>


          <button
            type="button"
            className="awin-search-button"
            onClick={handleSearch}
          >
            Search
          </button>

        </div>


        {/* ===================================================
            ROW 2
        =================================================== */}

        <div className="awin-filter-row awin-options-row">

          {/* ADVERTISER */}

          <select
            value={advertiser}
            onChange={(e) => {
              setAdvertiser(e.target.value);
              setHasSearched(true);
            }}
          >
            <option value="">
              All Advertisers
            </option>

            {advertisers.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>


          {/* CATEGORY */}

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setHasSearched(true);
            }}
          >
            <option value="">
              All Categories
            </option>

            {categories.map((item) => (
              <option
                key={item}
                value={item}
              >
                {item}
              </option>
            ))}
          </select>


          {/* STATUS */}

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setHasSearched(true);
            }}
          >
            <option value="">
              All Status
            </option>

            <option value="new">
              New
            </option>

            <option value="reviewing">
              Reviewing
            </option>

            <option value="queued">
              Queued
            </option>

            <option value="rejected">
              Rejected
            </option>
          </select>


          {/* CLEAR ALL */}

          <button
            type="button"
            className="awin-clear-button"
            onClick={clearFilters}
          >
            Clear All
          </button>

        </div>

      </div>


      {/* =====================================================
          RESULT COUNT
      ===================================================== */}

      {hasSearched && (
        <div className="awin-results-header">

          <strong>
            {filteredProducts.length.toLocaleString()}
          </strong>

          <span>
            products found
          </span>

        </div>
      )}


      {/* =====================================================
          PRODUCT LIST
      ===================================================== */}

      <div className="awin-product-list">

        {/* INITIAL STATE */}

        {!hasSearched &&
          !loading &&
          products.length > 0 && (

            <div className="awin-empty-state">

              <h3>
                Search AWIN Products
              </h3>

              <p>
                Use the search box, advertiser,
                or category filter to find products.
              </p>

              <p>
                {products.length.toLocaleString()}
                {" "}
                AWIN products are available.
              </p>

            </div>
          )}


        {/* LOADING */}

        {loading && (

          <div className="awin-empty-state">

            <h3>
              Loading AWIN Products...
            </h3>

            <p>
              Please wait while the AWIN feed
              is being processed.
            </p>

          </div>
        )}


        {/* PRODUCTS */}

        {hasSearched &&
          filteredProducts
            .slice(0, 50)
            .map((product, index) => {

              const image =
                getProductImage(product);

              return (
                <div
                  className="awin-product-card"
                  key={
                    product.aw_product_id ||
                    product.merchant_product_id ||
                    `${product.product_name}-${index}`
                  }
                >

                  <div className="awin-product-image">

                    {image ? (
                      <img
                        src={image}
                        alt={
                          product.product_name ||
                          "AWIN product"
                        }
                      />
                    ) : (
                      <div className="awin-no-image">
                        No Image
                      </div>
                    )}

                  </div>


                  <div className="awin-product-info">

                    <div className="awin-advertiser">
                      {product.merchant_name ||
                        "Unknown advertiser"}
                    </div>

                    <h3>
                      {product.product_name ||
                        "Untitled product"}
                    </h3>

                    <p className="awin-brand">
                      <strong>Brand:</strong>{" "}
                      {product.brand_name ||
                        "No brand"}
                    </p>

                    <p className="awin-category">
                      <strong>Category:</strong>{" "}
                      {product.category_name ||
                        product.merchant_category ||
                        "No category"}
                    </p>

                    {(product.search_price ||
                      product.store_price) && (
                      <p className="awin-price">
                        <strong>Price:</strong>{" "}
                        {product.search_price ||
                          product.store_price}
                        {" "}
                        {product.currency || ""}
                      </p>
                    )}

                  </div>


                  <div className="awin-product-actions">

                    <button
                      type="button"
                      onClick={() =>
                        setSelectedProduct(product)
                      }
                    >
                      Review
                    </button>

                  </div>

                </div>
              );
            })}


        {/* MORE THAN 50 */}

        {hasSearched &&
          filteredProducts.length > 50 && (

            <div className="awin-more-results">

              Showing the first{" "}
              <strong>50</strong>
              {" "}
              of{" "}
              <strong>
                {filteredProducts.length.toLocaleString()}
              </strong>
              {" "}
              matching products.

              <br />

              Refine your search to find
              the exact products you need.

            </div>
          )}


        {/* NO RESULTS */}

        {hasSearched &&
          !loading &&
          filteredProducts.length === 0 && (

            <div className="awin-empty-state">

              <h3>
                No AWIN products found
              </h3>

              <p>
                Try another product name,
                brand, advertiser, or category.
              </p>

            </div>
          )}

      </div>


      {/* =====================================================
          REVIEW PANEL
      ===================================================== */}

      {selectedProduct && (

        <div className="awin-review-panel">

          <div className="awin-review-panel-header">

            <h2>
              Product Review
            </h2>

            <button
              type="button"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              ×
            </button>

          </div>


          <div className="awin-review-product">

            <div className="awin-review-image">

              {getProductImage(
                selectedProduct
              ) ? (

                <img
                  src={getProductImage(
                    selectedProduct
                  )}
                  alt={
                    selectedProduct.product_name ||
                    "AWIN product"
                  }
                />

              ) : (

                <div className="awin-no-image">
                  No Image
                </div>

              )}

            </div>


            <div>

              <h3>
                {selectedProduct.product_name ||
                  "Untitled product"}
              </h3>

              <p>
                <strong>Brand:</strong>{" "}
                {selectedProduct.brand_name || "-"}
              </p>

              <p>
                <strong>Advertiser:</strong>{" "}
                {selectedProduct.merchant_name || "-"}
              </p>

              <p>
                <strong>Category:</strong>{" "}
                {selectedProduct.category_name ||
                  selectedProduct.merchant_category ||
                  "-"}
              </p>

              <p>
                <strong>AWIN Product ID:</strong>{" "}
                {selectedProduct.aw_product_id || "-"}
              </p>

              <p>
                <strong>Merchant Product ID:</strong>{" "}
                {selectedProduct.merchant_product_id ||
                  "-"}
              </p>

              {(selectedProduct.search_price ||
                selectedProduct.store_price) && (

                <p>
                  <strong>Price:</strong>{" "}
                  {selectedProduct.search_price ||
                    selectedProduct.store_price}
                  {" "}
                  {selectedProduct.currency || ""}
                </p>
              )}

            </div>

          </div>


          <div className="awin-review-description">

            <h3>
              Description
            </h3>

            <p>
              {selectedProduct.description ||
                selectedProduct.product_short_description ||
                "No description available."}
            </p>

          </div>


          <div className="awin-review-actions">

            <button
              type="button"
              onClick={() => {
                alert(
                  "Posting queue will be connected next."
                );
              }}
            >
              Add to Posting Queue
            </button>

            <button
              type="button"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              Close
            </button>

          </div>

        </div>
      )}

    </div>
  );
}


/* =========================================================
   READ AWIN CSV FILE
========================================================= */

function readFeed(
  buffer: ArrayBuffer
): string {
  return new TextDecoder("utf-8").decode(buffer);
}