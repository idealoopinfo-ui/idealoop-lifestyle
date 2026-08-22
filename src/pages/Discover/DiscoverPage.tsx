import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../../lib/supabase";
import "./DiscoverPage.css";


interface Product {
  id: string;
  product_id: string;
  image_1: string;
  department: string;
}


/* =========================================================
   DAILY ROTATION
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

const dailyShuffle = <T,>(items: T[], seed: number): T[] => {

  const array = [...items];

  let randomSeed = seed;

  for (let i = array.length - 1; i > 0; i--) {

    randomSeed =
      (randomSeed * 9301 + 49297) % 233280;

    const random = randomSeed / 233280;

    const j = Math.floor(random * (i + 1));

    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};


/* =========================================================
   DISCOVER PAGE
========================================================= */

export default function DiscoverPage() {

  const [products, setProducts] = useState<Product[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState("fashion");

  const navigate = useNavigate();


  /* =========================================================
     LOAD PRODUCTS
  ========================================================= */

  useEffect(() => {

    const fetchProducts = async () => {

      const { data, error } = await supabase

        .from("products")

        .select(`
          id,
          product_id,
          image_1,
          department
        `)

        .eq(
          "department",
          selectedCategory
        )

        .limit(100);


      if (error) {

        console.error(
          "Discover error:",
          error.message
        );

        return;
      }


      /* =====================================================
         DAILY PRODUCT ROTATION
      ===================================================== */

      const dailySeed = getDailySeed();

      const rotatedProducts =
        dailyShuffle(
          data || [],
          dailySeed
        );


      setProducts(rotatedProducts);

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


        {/* FASHION */}

        <button
          className={
            selectedCategory === "fashion"
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory("fashion")
          }
        >
          Fashion
        </button>


        {/* BEAUTY */}

        <button
          className={
            selectedCategory === "beauty"
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory("beauty")
          }
        >
          Beauty
        </button>


        {/* FITNESS & WELLNESS */}

        <button
          className={
            selectedCategory === "fitness-wellness"
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory("fitness-wellness")
          }
        >
          Fitness & Wellness
        </button>


        {/* HOME & LIVING */}

        <button
          className={
            selectedCategory === "home-living"
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory("home-living")
          }
        >
          Home & Living
        </button>


        {/* TOYS & GIFTS */}

        <button
          className={
            selectedCategory === "toys-gifts"
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory("toys-gifts")
          }
        >
          Toys & Gifts
        </button>


      </div>


      {/* =====================================================
          PINTEREST GRID
      ===================================================== */}

      <div className="pinterest-grid">


        {products.map(
          (product, index) => {


            /*
             * Daily layout rotation.
             *
             * Because the product list itself is already
             * shuffled daily, the card sizes also move
             * around naturally.
             *
             * The additional daily offset makes the layout
             * pattern change from day to day.
             */

            const dailySeed = getDailySeed();

            const layoutIndex =
              (index + dailySeed) % 10;


            let cardClass = "medium-pin";


            if (
              layoutIndex === 0 ||
              layoutIndex === 4
            ) {

              cardClass = "large-pin";

            } else if (
              layoutIndex === 2 ||
              layoutIndex === 7 ||
              layoutIndex === 9
            ) {

              cardClass = "small-pin";

            }


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


                  <div className="pin-category-badge">

                    {product.department}

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