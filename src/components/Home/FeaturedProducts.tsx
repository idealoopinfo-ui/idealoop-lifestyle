import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ProductCard from "../ProductCard/ProductCard";

import "./FeaturedProducts.css";

const PRODUCTS_PER_VIEW = 8;


/* =========================================================
   ROTATION KEY
   Changes at 9:00 AM and 9:00 PM
========================================================= */

function getRotationKey() {

  const now = new Date();

  const year = now.getFullYear();

  const month =
    String(now.getMonth() + 1).padStart(2, "0");

  const day =
    String(now.getDate()).padStart(2, "0");

  const rotation =
    now.getHours() >= 21
      ? "pm"
      : "am";

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

    next.setDate(
      next.getDate() + 1
    );

    next.setHours(
      9,
      0,
      0,
      0
    );

  }


  return Math.max(
    next.getTime() - now.getTime(),
    1000
  );
}


/* =========================================================
   SELECT ROTATING PRODUCTS
========================================================= */

function selectProducts(
  allProducts: any[]
) {

  if (
    allProducts.length <=
    PRODUCTS_PER_VIEW
  ) {

    return allProducts;

  }


  const rotationKey =
    getRotationKey();


  let seed = 0;


  for (
    let i = 0;
    i < rotationKey.length;
    i++
  ) {

    seed =
      (
        seed * 31 +
        rotationKey.charCodeAt(i)
      ) >>> 0;

  }


  const shuffled =
    [...allProducts];


  /* =======================================================
     SEEDED SHUFFLE
  ======================================================= */

  for (
    let i = shuffled.length - 1;
    i > 0;
    i--
  ) {

    seed =
      (
        seed * 1664525 +
        1013904223
      ) >>> 0;


    const random =
      seed / 4294967296;


    const j =
      Math.floor(
        random * (i + 1)
      );


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
   FEATURED PRODUCTS
========================================================= */

export default function FeaturedProducts() {

  const [
    allProducts,
    setAllProducts,
  ] = useState<any[]>([]);


  const [
    products,
    setProducts,
  ] = useState<any[]>([]);


  /* =======================================================
     LOAD ALL FEATURED PRODUCTS
  ======================================================= */

  const fetchFeaturedProducts =
    async () => {

      const {
        data,
        error,
      } = await supabase

        .from("products")

        .select("*")

        .eq(
          "featured",
          true
        );


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
        "ALL FEATURED PRODUCTS:",
        featuredProducts
      );


      setAllProducts(
        featuredProducts
      );


      setProducts(
        selectProducts(
          featuredProducts
        )
      );

    };


  /* =======================================================
     INITIAL LOAD
  ======================================================= */

  useEffect(() => {

    fetchFeaturedProducts();

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


    const scheduleRotation =
      () => {

        const delay =
          getMillisecondsUntilNextRotation();


        timer = setTimeout(
          () => {

            console.log(
              "Rotating Featured Products..."
            );


            setProducts(
              selectProducts(
                allProducts
              )
            );


            scheduleRotation();

          },
          delay
        );

      };


    scheduleRotation();


    return () => {

      clearTimeout(
        timer
      );

    };

  }, [allProducts]);


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <section className="featured-products">

      <h2>
        Featured Products
      </h2>


      <div className="featured-grid">

        {products.length === 0 ? (

          <p>
            No featured products yet.
          </p>

        ) : (

          products.map(
            (product) => (

              <ProductCard
                key={product.id}
                product={product}
              />

            )
          )

        )}

      </div>

    </section>

  );
}