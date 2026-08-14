import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import "./CategoryShowcase.css";

type Product = {
  product_id: string;
  title: string;
  image_1: string;
};

type DepartmentConfig = {
  name: string;
  slug: string;
};

type CategorySection = {
  title: string;
  slug: string;
  products: Product[];
};


/* =========================================================
   MAIN DEPARTMENTS
========================================================= */

const DEPARTMENT_CONFIG: DepartmentConfig[] = [
  {
    name: "Fashion",
    slug: "fashion",
  },

  {
    name: "Beauty",
    slug: "beauty",
  },

  {
    name: "Home & Living",
    slug: "home-living",
  },

  {
    name: "Fitness & Wellness",
    slug: "fitness-wellness",
  },
];


/* =========================================================
   DAILY PRODUCT SELECTION
========================================================= */

function getDailyProducts(
  products: Product[],
  count = 4
): Product[] {

  if (products.length <= count) {
    return products;
  }

  const today = new Date();

  /*
   * Create a different seed every day.
   */

  const daySeed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  const shuffled = [...products];

  let seed = daySeed;

  /*
   * Deterministic daily shuffle.
   *
   * Same products during the same day.
   * Different arrangement on the next day.
   */

  for (
    let i = shuffled.length - 1;
    i > 0;
    i--
  ) {

    seed =
      (seed * 9301 + 49297) %
      233280;

    const j = Math.floor(
      (seed / 233280) *
      (i + 1)
    );

    [
      shuffled[i],
      shuffled[j],
    ] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled.slice(0, count);
}


/* =========================================================
   CATEGORY SHOWCASE
========================================================= */

export default function CategoryShowcase() {

  const [sections, setSections] =
    useState<CategorySection[]>([]);

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

      const result: CategorySection[] = [];


      /* =================================================
         PROCESS EACH MAIN DEPARTMENT
      ================================================= */

      for (
        const department of DEPARTMENT_CONFIG
      ) {

        console.log(
          `Loading ${department.name} products...`
        );


        /* ===============================================
           GET PRODUCTS BY MAIN DEPARTMENT
        =============================================== */

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
            title: department.name,
            slug: department.slug,
            products: [],
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
           DAILY PRODUCTS
        =============================================== */

        const dailyProducts =
          getDailyProducts(
            validProducts,
            4
          );


        console.log(
          `${department.name} today's products:`,
          dailyProducts
        );


        /* ===============================================
           ADD SECTION
        =============================================== */

        result.push({

          title: department.name,

          slug: department.slug,

          products: dailyProducts,

        });

      }


      /* =================================================
         SAVE RESULTS
      ================================================= */

      console.log(
        "FINAL CATEGORY SHOWCASE:",
        result
      );

      setSections(result);

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

        <div className="category-sections">

          {DEPARTMENT_CONFIG.map(
            (department) => (

              <div
                className="category-container category-skeleton"
                key={department.slug}
              >

                <div className="category-skeleton-grid">

                  <span />
                  <span />
                  <span />
                  <span />

                </div>

              </div>

            )
          )}

        </div>

      ) : (

        /* =================================================
           DEPARTMENT SECTIONS
        ================================================= */

        <div className="category-sections">

          {sections.map(
            (section) => (

              <div
                className="category-container"
                key={section.slug}
              >

                <div className="category-grid">

                  {section.products.map(
                    (product) => (

                      <Link
                        key={product.product_id}
                        to={`/category/${section.slug}`}
                        className="category-product"
                        aria-label={`View ${section.title}`}
                      >

                        <img
                          src={product.image_1}
                          alt={product.title}
                          loading="lazy"
                        />

                      </Link>

                    )
                  )}


                  {/* ====================================
                      FILL EMPTY POSITIONS
                  ==================================== */}

                  {Array.from({

                    length: Math.max(
                      0,
                      4 -
                        section.products.length
                    ),

                  }).map(
                    (_, index) => (

                      <div
                        className="category-product category-empty"
                        key={`empty-${index}`}
                      />

                    )
                  )}

                </div>

              </div>

            )
          )}

        </div>

      )}

    </section>

  );

}