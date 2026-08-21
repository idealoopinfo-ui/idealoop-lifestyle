import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import "./FeaturedProducts.css";

type Product = {
  id: string;
  title: string;
  main_image_url?: string;
  image_1?: string;
  category?: string;
};

const PRODUCTS_PER_VIEW = 8;

/* =========================================================
   ROTATION TIME
   Changes at 9:00 AM and 9:00 PM
========================================================= */

function getRotationKey() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const rotation =
    now.getHours() >= 21 ? "pm" : "am";

  return `${year}-${month}-${day}-${rotation}`;
}


/* =========================================================
   TIME UNTIL NEXT ROTATION
========================================================= */

function getMillisecondsUntilNextRotation() {
  const now = new Date();
  const next = new Date(now);

  if (now.getHours() < 9) {

    next.setHours(9, 0, 0, 0);

  } else if (now.getHours() < 21) {

    next.setHours(21, 0, 0, 0);

  } else {

    next.setDate(next.getDate() + 1);
    next.setHours(9, 0, 0, 0);

  }

  return Math.max(
    next.getTime() - now.getTime(),
    1000
  );
}


/* =========================================================
   SELECT 8 PRODUCTS
========================================================= */

function selectProducts(
  allProducts: Product[]
): Product[] {

  if (allProducts.length <= PRODUCTS_PER_VIEW) {
    return allProducts;
  }

  const rotationKey = getRotationKey();

  let seed = 0;

  for (
    let i = 0;
    i < rotationKey.length;
    i++
  ) {

    seed =
      (seed * 31 +
        rotationKey.charCodeAt(i)) >>> 0;

  }


  /* =======================================================
     SEEDED SHUFFLE
  ======================================================= */

  const shuffled = [...allProducts];

  for (
    let i = shuffled.length - 1;
    i > 0;
    i--
  ) {

    seed =
      (seed * 1664525 +
        1013904223) >>> 0;

    const random =
      seed / 4294967296;

    const j =
      Math.floor(random * (i + 1));

    [
      shuffled[i],
      shuffled[j],
    ] = [
      shuffled[j],
      shuffled[i],
    ];

  }


  return shuffled.slice(
    0,
    PRODUCTS_PER_VIEW
  );
}


/* =========================================================
   COLLECTIONS
========================================================= */

export default function Collections() {

  const [
    allProducts,
    setAllProducts,
  ] = useState<Product[]>([]);

  const [
    products,
    setProducts,
  ] = useState<Product[]>([]);


  /* =======================================================
     LOAD FEATURED PRODUCTS
  ======================================================= */

  const fetchFeatured = async () => {

    const {
      data,
      error,
    } = await supabase
      .from("products")
      .select("*")
      .eq("featured", true);

    if (error) {

      console.error(
        "Error loading featured products:",
        error
      );

      return;
    }

    const featuredProducts =
      data || [];

    console.log(
      "Total featured products:",
      featuredProducts.length
    );

    const selectedProducts =
      selectProducts(
        featuredProducts
      );

    console.log(
      "Featured products displayed:",
      selectedProducts
    );

    setAllProducts(
      featuredProducts
    );

    setProducts(
      selectedProducts
    );

  };


  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {

    fetchFeatured();

  }, []);


  /* =======================================================
     AUTOMATIC ROTATION
  ======================================================= */

  useEffect(() => {

    if (
      allProducts.length <=
      PRODUCTS_PER_VIEW
    ) {
      return;
    }

    let timer:
      ReturnType<typeof setTimeout>;


    const scheduleRotation = () => {

      const delay =
        getMillisecondsUntilNextRotation();


      timer = setTimeout(() => {

        console.log(
          "Rotating Featured Products..."
        );

        setProducts(
          selectProducts(
            allProducts
          )
        );

        scheduleRotation();

      }, delay);

    };


    scheduleRotation();


    return () => {

      clearTimeout(timer);

    };

  }, [allProducts]);


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <section className="collections">

      <div className="section-header">

        <h2>
          Featured Products
        </h2>

        <p>
          Discover handpicked lifestyle collections
        </p>

      </div>


      <div className="featured-grid">

        {products.length === 0 ? (

          <p>
            No featured products yet
          </p>

        ) : (

          products.map((item) => (

            <div
              className="featured-card"
              key={item.id}
            >

              <img
                src={
                  item.main_image_url ||
                  item.image_1 ||
                  ""
                }
                alt={item.title}
              />


              <div className="overlay">

                <h3>
                  {item.title}
                </h3>

                <button>
                  Explore
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </section>

  );
}