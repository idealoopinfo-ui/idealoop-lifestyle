import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ProductCard from "../ProductCard/ProductCard";

import "./TrendingProducts.css";


const PRODUCTS_PER_VIEW = 10;


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
   SELECT DAILY TRENDING PRODUCTS
========================================================= */

function selectDailyTrending(
  allProducts: any[]
): any[] {

  if (
    allProducts.length <=
    PRODUCTS_PER_VIEW
  ) {

    return allProducts;

  }


  const dailySeed =
    getDaySeed();


  /*
   * Use a different seed from Featured
   * so the two sections don't naturally
   * follow the same random pattern.
   */

  const trendingSeed =
    dailySeed + 3571;


  const shuffled =
    dailyShuffle(
      allProducts,
      trendingSeed
    );


  return shuffled.slice(
    0,
    PRODUCTS_PER_VIEW
  );

}


/* =========================================================
   TRENDING PRODUCTS
========================================================= */

export default function TrendingProducts() {

  const [
    products,
    setProducts,
  ] = useState<any[]>([]);


  const [
    loading,
    setLoading,
  ] = useState(true);


  /* =======================================================
     LOAD TRENDING PRODUCTS
  ======================================================= */

  useEffect(() => {

    const fetchTrending =
      async () => {

        setLoading(true);


        const {
          data,
          error,
        } = await supabase

          .from("products")

          .select("*")

          .eq(
            "trending",
            true
          );


        if (error) {

          console.error(
            "Error loading trending products:",
            error
          );


          setLoading(false);

          return;

        }


        const allProducts =
          data || [];


        console.log(
          "ALL TRENDING PRODUCTS:",
          allProducts
        );


        /* ===============================================
           DAILY RANDOM SELECTION
        =============================================== */

        const dailyProducts =
          selectDailyTrending(
            allProducts
          );


        console.log(
          "TODAY'S TRENDING PRODUCTS:",
          dailyProducts
        );


        setProducts(
          dailyProducts
        );


        setLoading(false);

      };


    fetchTrending();

  }, []);


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <section className="trending-products">

      <h2>
        🔥 Trending Now
      </h2>


      <div className="trending-grid">

        {loading ? (

          <p>
            Loading trending products...
          </p>

        ) : products.length === 0 ? (

          <p>
            No trending products yet.
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