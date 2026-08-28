import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../../lib/supabase";
import "./DiscoverPage.css";


/* =========================================================
   PRODUCT
========================================================= */

interface Product {
  id: string;
  product_id: string;
  image_1: string;
  department: string;
  category?: string;
  subcategory?: string;
}


/* =========================================================
   DAILY SEED
========================================================= */

const getDailySeed = () => {

  const today = new Date();

  return (
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate()
  );

};


/* =========================================================
   SEEDED SHUFFLE

   Same result for the same day.
   Different result on a new day.
========================================================= */

const dailyShuffle = <T,>(
  items: T[],
  seed: number
): T[] => {

  const array = [...items];

  let randomSeed = seed;

  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {

    randomSeed =
      (randomSeed * 9301 + 49297) % 233280;

    const random =
      randomSeed / 233280;

    const j =
      Math.floor(
        random * (i + 1)
      );

    [array[i], array[j]] =
      [array[j], array[i]];

  }

  return array;

};


/* =========================================================
   DISCOVER DEPARTMENTS

   Only these departments appear in Discover.
========================================================= */

const DISCOVER_DEPARTMENTS = [
  "fashion",
  "beauty",
  "fitness-wellness",
];


/* =========================================================
   FORMAT CATEGORY NAME
========================================================= */

const formatCategoryName = (
  category?: string,
  department?: string
) => {

  const value =
    category ||
    department ||
    "";

  return value
    .split("-")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
    )
    .join(" ");

};


/* =========================================================
   DISCOVER PAGE
========================================================= */

export default function DiscoverPage() {

  const [products, setProducts] =
    useState<Product[]>([]);


  const [selectedCategory, setSelectedCategory] =
    useState("fashion");


  const navigate =
    useNavigate();


  /* =======================================================
     LOAD PRODUCTS
  ======================================================= */

  useEffect(() => {

    const fetchProducts = async () => {

      /* =====================================================
         SAFETY CHECK
      ===================================================== */

      if (
        !DISCOVER_DEPARTMENTS.includes(
          selectedCategory
        )
      ) {

        setProducts([]);

        return;

      }


      /* =====================================================
         SUPABASE QUERY
      ===================================================== */

      const {
        data,
        error,
      } = await supabase

        .from("products")

        .select(`
          id,
          product_id,
          image_1,
          department,
          category,
          subcategory
        `)

        .eq(
          "department",
          selectedCategory
        )

        .not(
          "image_1",
          "is",
          null
        )

        .limit(200);


      /* =====================================================
         ERROR
      ===================================================== */

      if (error) {

        console.error(
          "Discover error:",
          error.message
        );

        setProducts([]);

        return;

      }


      /* =====================================================
         VALID PRODUCTS
      ===================================================== */

      const validProducts =
        (data || []).filter(
          (product: Product) =>
            product.id &&
            product.product_id &&
            product.image_1
        );


      /* =====================================================
         DAILY PRODUCT ROTATION
      ===================================================== */

      const dailySeed =
        getDailySeed();


      const rotatedProducts =
        dailyShuffle(
          validProducts,
          dailySeed
        );


      /* =====================================================
         SAVE PRODUCTS
      ===================================================== */

      setProducts(
        rotatedProducts
      );

    };


    fetchProducts();

  }, [selectedCategory]);


  /* =========================================================
     RENDER
  ========================================================= */

  return (

    <div className="discover-page">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="discover-header">

        <div className="discover-title-row">

          <h1>
            Discover
          </h1>


          <Link
            to="/"
            className="discover-home-button"
            aria-label="Go to homepage"
          >

            <svg
              className="discover-home-icon"
              width="17"
              height="17"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >

              <path
                d="M3 10.5L12 3L21 10.5V21H14.5V15H9.5V21H3V10.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

            </svg>


            <span>
              Home
            </span>

          </Link>

        </div>


        <p>
          Find inspiration for your lifestyle.
        </p>

      </div>


      {/* =====================================================
          CATEGORY NAVIGATION
      ===================================================== */}

      <div className="discover-nav">


        {/* =================================================
            FASHION
        ================================================= */}

        <button
          type="button"
          className={
            selectedCategory === "fashion"
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory(
              "fashion"
            )
          }
        >

          Fashion

        </button>


        {/* =================================================
            BEAUTY
        ================================================= */}

        <button
          type="button"
          className={
            selectedCategory === "beauty"
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory(
              "beauty"
            )
          }
        >

          Beauty

        </button>


        {/* =================================================
            FITNESS & WELLNESS
        ================================================= */}

        <button
          type="button"
          className={
            selectedCategory ===
            "fitness-wellness"
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory(
              "fitness-wellness"
            )
          }
        >

          Fitness & Wellness

        </button>

      </div>


      {/* =====================================================
          PINTEREST GRID
      ===================================================== */}

      <div className="pinterest-grid">

        {products.map(
          (
            product,
            index
          ) => {


            /* =================================================
               DAILY LAYOUT ROTATION
            ================================================= */

            const dailySeed =
              getDailySeed();


            const layoutIndex =
              (
                index +
                dailySeed
              ) % 10;


            let cardClass =
              "medium-pin";


            if (
              layoutIndex === 0 ||
              layoutIndex === 4
            ) {

              cardClass =
                "large-pin";

            }

            else if (
              layoutIndex === 2 ||
              layoutIndex === 7 ||
              layoutIndex === 9
            ) {

              cardClass =
                "small-pin";

            }


            /* =================================================
               PRODUCT CARD
            ================================================= */

            return (

              <div
                key={product.id}
                className={`pin-card ${cardClass}`}
                onClick={() =>
                  navigate(
                    `/product/${product.product_id}`
                  )
                }
              >


                <div className="pin-image-wrapper">


                  {/* =========================================
                      PRODUCT IMAGE
                  ========================================= */}

                  <img
                    src={
                      product.image_1 ||
                      "/placeholder.png"
                    }
                    alt={
                      product.product_id
                    }
                    className="pin-image"
                    loading="lazy"
                  />


                  {/* =========================================
                      CATEGORY BADGE
                  ========================================= */}

                  <div
                    className="pin-category-badge"
                  >

                    {formatCategoryName(
                      product.category,
                      product.department
                    )}

                  </div>


                </div>

              </div>

            );

          }
        )}

      </div>

    </div>

  );

}