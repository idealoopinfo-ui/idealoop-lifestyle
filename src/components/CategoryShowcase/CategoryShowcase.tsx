import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import "./CategoryShowcase.css";


/* =========================================================
   PRODUCT
========================================================= */

type Product = {
  product_id: string;
  title: string;
  image_1: string;
};


/* =========================================================
   DEPARTMENT CONFIG
========================================================= */

type DepartmentConfig = {
  name: string;
  slug: string;
};


type CategoryCard = DepartmentConfig & {
  product?: Product;
};


/* =========================================================
   MAIN CATEGORIES
========================================================= */

const DEPARTMENT_CONFIG: DepartmentConfig[] = [

  {
    name: "Fashion",
    slug: "fashion",
  },

  {
    name: "Fitness & Wellness",
    slug: "fitness-wellness",
  },

  {
    name: "Beauty",
    slug: "beauty",
  },


];


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
   SEEDED RANDOM
========================================================= */

function seededRandom(seed: number): number {

  const value =
    Math.sin(seed) * 10000;

  return value - Math.floor(value);

}


/* =========================================================
   DAILY RANDOM PRODUCT
========================================================= */

function getDailyRandomProduct(
  products: Product[],
  categoryIndex: number
): Product | undefined {

  if (!products.length) {

    return undefined;

  }


  const daySeed =
    getDaySeed();


  /*
   * Different seed for every category.
   *
   * This means Fashion, Beauty, Fitness,
   * Home and Toys don't all select
   * the same position.
   */

  const categorySeed =
    daySeed +
    (categoryIndex + 1) * 7919;


  const random =
    seededRandom(categorySeed);


  const index =
    Math.floor(
      random * products.length
    );


  return products[index];

}


/* =========================================================
   CATEGORY SHOWCASE
========================================================= */

export default function CategoryShowcase() {

  const [categories, setCategories] =
    useState<CategoryCard[]>([]);


  const [loading, setLoading] =
    useState(true);


  /* =======================================================
     LOAD PRODUCTS
  ======================================================= */

  useEffect(() => {

    loadProducts();

  }, []);


  const loadProducts = async () => {

    setLoading(true);


    try {

      const result: CategoryCard[] = [];


      /* =================================================
         LOAD EACH CATEGORY
      ================================================= */

      for (
        let i = 0;
        i < DEPARTMENT_CONFIG.length;
        i++
      ) {

        const department =
          DEPARTMENT_CONFIG[i];


        console.log(
          `Loading ${department.name} products...`
        );


        const {
          data,
          error,
        } = await supabase

          .from("products")

          .select(
            "product_id,title,image_1,department"
          )

          .eq(
            "department",
            department.slug
          )

          .not(
            "image_1",
            "is",
            null
          );


        /* ===============================================
           ERROR
        =============================================== */

        if (error) {

          console.error(
            `Products error for ${department.name}:`,
            error
          );


          result.push({

            ...department,

          });


          continue;

        }


        /* ===============================================
           VALID PRODUCTS
        =============================================== */

        const validProducts =
          (data || []).filter(
            (product: Product) =>
              product.product_id &&
              product.image_1
          );


        console.log(
          `${department.name} total products:`,
          validProducts.length
        );


        /* ===============================================
           DAILY RANDOM PRODUCT
        =============================================== */

        const product =
          getDailyRandomProduct(
            validProducts,
            i
          );


        result.push({

          ...department,

          product,

        });

      }


      /* =================================================
         SAVE
      ================================================= */

      console.log(
        "FINAL DAILY CATEGORY SHOWCASE:",
        result
      );


      setCategories(result);

    }

    catch (error) {

      console.error(
        "Category showcase error:",
        error
      );

    }

    finally {

      setLoading(false);

    }

  };


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <section className="category-showcase">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="category-showcase-header">

        <span className="category-eyebrow">
          Explore our collections
        </span>


        <h2>
          Shop By Category
        </h2>


        <p>
          Discover products curated for every
          part of your lifestyle.
        </p>

      </div>


      {/* =================================================
          LOADING
      ================================================= */}

      {loading ? (

        <div className="category-grid">

          {DEPARTMENT_CONFIG.map(
            (department) => (

              <div
                className="category-card category-skeleton"
                key={department.slug}
              >

                <div className="category-skeleton-image" />

                <div className="category-skeleton-content">

                  <span />
                  <span />

                </div>

              </div>

            )
          )}

        </div>

      ) : (

        /* =================================================
           CATEGORY CARDS
        ================================================= */

        <div className="category-grid">

          {categories.map(
            (category) => (

              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="category-card"
                aria-label={`Shop ${category.name}`}
              >

                {/* ======================================
                    IMAGE
                ====================================== */}

                <div className="category-image-wrapper">

                  {category.product ? (

                    <img
                      src={category.product.image_1}
                      alt={category.product.title}
                      className="category-image"
                      loading="lazy"
                    />

                  ) : (

                    <div className="category-image-placeholder">

                      No products available

                    </div>

                  )}

                </div>


                {/* ======================================
                    CATEGORY INFO
                ====================================== */}

                <div className="category-card-content">

                  <h3>
                    {category.name}
                  </h3>


                  <span className="category-shop-link">
                    Shop Now →
                  </span>

                </div>

              </Link>

            )
          )}

        </div>

      )}

    </section>

  );

}