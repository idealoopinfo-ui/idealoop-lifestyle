import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import "./JewelryCollection.css";


type JewelleryProduct = {
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

  for (let i = array.length - 1; i > 0; i--) {
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
   JEWELRY COLLECTION
========================================================= */

export default function JewelryCollection() {

  const [
    products,
    setProducts,
  ] = useState<JewelleryProduct[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);


  /* =======================================================
   LOAD JEWELRY PRODUCTS
======================================================= */

useEffect(() => {
    const fetchJewelryProducts = async () => {
      setLoading(true);
  
      const {
        data,
        error,
      } = await supabase
        .from("products")
        .select(
          "id,product_id,title,image_1,category,subcategory,department"
        )
        .not(
          "image_1",
          "is",
          null
        );
  
      if (error) {
        console.error(
          "Jewelry products error:",
          error
        );
  
        setLoading(false);
        return;
      }
  
      const allProducts =
        (data || []).filter(
          (product) =>
            product.image_1 &&
            product.subcategory === "jewelry"
        );
  
      // Continue with your existing
      // product processing code below...
  
      // Keep the rest of your existing code below this point

        /* ===============================================
           FIVE PRODUCTS EACH DAY
        =============================================== */

        const dailyProducts =
          dailyShuffle(
            allProducts,
            getDaySeed() + 9147
          ).slice(0, 5);


        setProducts(
          dailyProducts
        );

        setLoading(false);
      };


    fetchJewelryProducts();

  }, []);


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <section className="jewelry-collection">

      <div className="jewelry-collection-header">

        <span>
          JEWELLERY COLLECTION
        </span>

        <h2>
          Explore Jewellery
        </h2>

        <p>
          Discover beautiful jewellery pieces for every style and occasion.
        </p>

      </div>


      <div className="jewelry-collection-grid">

        {loading ? (

          Array.from({ length: 5 }).map(
            (_, index) => (

              <div
                className="jewelry-collection-card skeleton"
                key={index}
              />

            )
          )

        ) : (

          products.map(
            (product) => (

              <Link
                key={product.id}
                to="/category/jewellery"
                className="jewelry-collection-card"
                aria-label={
                  `Explore ${product.title}`
                }
              >

                <img
                  src={product.image_1}
                  alt={product.title}
                  className="jewelry-collection-image"
                  loading="lazy"
                />


                <div className="jewelry-category-overlay">

                  <span>
                    {product.category || "Jewellery"}
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