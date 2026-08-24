import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import "./BeautyComingSoon.css";


type BeautyProduct = {
  id: string;
  product_id: string;
  title: string;
  image_1: string;
  category: string;
};


/* =========================================================
   DAILY SEED
========================================================= */

function getDaySeed(): number {

  const today = new Date();

  return (
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate()
  );

}


/* =========================================================
   SEEDED SHUFFLE
========================================================= */

function dailyShuffle<T>(
  items: T[],
  seed: number
): T[] {

  const array = [...items];

  let randomSeed = seed;


  for (
    let i = array.length - 1;
    i > 0;
    i--
  ) {

    randomSeed =
      (
        randomSeed * 1664525 +
        1013904223
      ) >>> 0;


    const random =
      randomSeed / 4294967296;


    const j =
      Math.floor(
        random * (i + 1)
      );


    [
      array[i],
      array[j],
    ] = [
      array[j],
      array[i],
    ];

  }


  return array;

}


/* =========================================================
   BEAUTY COLLECTION
========================================================= */

export default function BeautyComingSoon() {

  const [
    products,
    setProducts,
  ] = useState<BeautyProduct[]>([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  /* =======================================================
     LOAD BEAUTY PRODUCTS
  ======================================================= */

  useEffect(() => {

    const fetchBeautyProducts =
      async () => {

        setLoading(true);


        const {
          data,
          error,
        } = await supabase

          .from("products")

          .select(
            "id,product_id,title,image_1,category"
          )

          .eq(
            "department",
            "beauty"
          )

          .not(
            "image_1",
            "is",
            null
          );


        if (error) {

          console.error(
            "Beauty products error:",
            error
          );

          setLoading(false);

          return;

        }


        const allProducts =
          (data || []).filter(
            (product) =>
              product.image_1
          );


        /* ===============================================
           FIVE RANDOM PRODUCTS EACH DAY
        =============================================== */

        const dailyProducts =
          dailyShuffle(
            allProducts,
            getDaySeed() + 7281
          ).slice(0, 5);


        setProducts(
          dailyProducts
        );


        setLoading(false);

      };


    fetchBeautyProducts();

  }, []);


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <section className="beauty-coming-soon">

<div className="beauty-coming-header">

<span>
  BEAUTY COLLECTION
</span>

<h2>
  Explore Beauty
</h2>

<p>
  Discover our latest beauty products and essentials.
</p>

</div>


      <div className="beauty-coming-grid">

        {loading ? (

          Array.from({ length: 5 }).map(
            (_, index) => (

              <div
                className="beauty-coming-card skeleton"
                key={index}
              />

            )
          )

        ) : (

          products.map(
            (product) => (

              <Link
                key={product.id}
                to={`/category/beauty`}
                className="beauty-coming-card"
                aria-label={
                  `Explore ${product.title}`
                }
              >

                <img
                  src={product.image_1}
                  alt={product.title}
                  className="beauty-coming-image"
                  loading="lazy"
                />


                {/* CATEGORY ON HOVER */}

                <div className="beauty-category-overlay">

                  <span>
                    {product.category || "Beauty"}
                  </span>

                </div>

              </Link>

            )
          )

        )}

      </div>

    </section>

  );

}