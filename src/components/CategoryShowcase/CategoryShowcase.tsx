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
  id: number;
  name: string;
  slug: string;
};

type CategorySection = {
  title: string;
  slug: string;
  products: Product[];
};

/*
 * Actual departments from Supabase
 *
 * 1  = Fashion
 * 2  = Beauty
 * 3  = Home & Living
 * 10 = Fitness
 */
const DEPARTMENT_CONFIG: DepartmentConfig[] = [
  {
    id: 1,
    name: "Fashion",
    slug: "fashion",
  },
  {
    id: 2,
    name: "Beauty",
    slug: "beauty",
  },
  {
    id: 3,
    name: "Home & Living",
    slug: "home-living",
  },
  {
    id: 10,
    name: "Fitness",
    slug: "fitness",
  },
];

/*
 * Select four products.
 *
 * Products automatically change based
 * on the current date.
 */
function getDailyProducts(
  products: Product[],
  count = 4
): Product[] {
  if (products.length <= count) {
    return products;
  }

  const today = new Date();

  const daySeed =
    today.getFullYear() * 10000 +
    (today.getMonth() + 1) * 100 +
    today.getDate();

  const shuffled = [...products];

  let seed = daySeed;

  for (let i = shuffled.length - 1; i > 0; i--) {
    seed = (seed * 9301 + 49297) % 233280;

    const j = Math.floor(
      (seed / 233280) * (i + 1)
    );

    [shuffled[i], shuffled[j]] = [
      shuffled[j],
      shuffled[i],
    ];
  }

  return shuffled.slice(0, count);
}

export default function CategoryShowcase() {
  const [sections, setSections] = useState<CategorySection[]>(
    []
  );

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);

    try {
      const result: CategorySection[] = [];

      /*
       * Process each department.
       */
      for (const department of DEPARTMENT_CONFIG) {
        /*
         * ------------------------------------------------
         * STEP 1
         * Find categories directly belonging
         * to this department.
         * ------------------------------------------------
         */
        const {
          data: departmentCategories,
          error: departmentCategoryError,
        } = await supabase
          .from("categories")
          .select("id")
          .eq("department_id", department.id);

        if (departmentCategoryError) {
          console.error(
            `Department category error for ${department.name}:`,
            departmentCategoryError
          );

          continue;
        }

        const parentCategoryIds = (
          departmentCategories || []
        ).map((category: any) => category.id);

        /*
         * ------------------------------------------------
         * STEP 2
         * Find child categories.
         *
         * Example:
         *
         * Women Fashion = 1
         * Women = 10
         *
         * So both category IDs can contain products.
         * ------------------------------------------------
         */
        let childCategoryIds: number[] = [];

        if (parentCategoryIds.length > 0) {
          const {
            data: children,
            error: childrenError,
          } = await supabase
            .from("categories")
            .select("id")
            .in("parent_id", parentCategoryIds);

          if (childrenError) {
            console.error(
              `Child category error for ${department.name}:`,
              childrenError
            );
          } else {
            childCategoryIds = (
              children || []
            ).map((category: any) => category.id);
          }
        }

        /*
         * Combine parent + child category IDs.
         */
        const categoryIds = [
          ...parentCategoryIds,
          ...childCategoryIds,
        ];

        /*
         * Remove duplicates.
         */
        const uniqueCategoryIds = [
          ...new Set(categoryIds),
        ];

        console.log(
          `${department.name} CATEGORY IDS:`,
          uniqueCategoryIds
        );

        if (uniqueCategoryIds.length === 0) {
          console.warn(
            `No categories found for ${department.name}`
          );

          result.push({
            title: department.name,
            slug: department.slug,
            products: [],
          });

          continue;
        }

        /*
         * ------------------------------------------------
         * STEP 3
         * Get products belonging to those categories.
         * ------------------------------------------------
         */
        const {
          data: products,
          error: productError,
        } = await supabase
          .from("products")
          .select(
            "product_id,title,image_1"
          )
          .in(
            "category_id",
            uniqueCategoryIds
          )
          .not("image_1", "is", null)
          .limit(20);

        if (productError) {
          console.error(
            `Products error for ${department.name}:`,
            productError
          );

          continue;
        }

        /*
         * Only keep products with valid IDs
         * and images.
         */
        const validProducts = (
          products || []
        ).filter(
          (product: Product) =>
            product.product_id &&
            product.image_1
        );

        console.log(
          `${department.name} PRODUCTS:`,
          validProducts
        );

        /*
         * ------------------------------------------------
         * STEP 4
         * Select four products for today's display.
         * ------------------------------------------------
         */
        const dailyProducts =
          getDailyProducts(
            validProducts,
            4
          );

        result.push({
          title: department.name,
          slug: department.slug,
          products: dailyProducts,
        });
      }

      console.log(
        "FINAL DEPARTMENT SECTIONS:",
        result
      );

      setSections(result);
    } catch (error) {
      console.error(
        "Category showcase error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="category-showcase">

      {/* HEADER */}

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

      {/* LOADING */}

      {loading ? (
        <div className="category-sections">

          {DEPARTMENT_CONFIG.map(
            (department) => (
              <div
                className="category-container category-skeleton"
                key={department.id}
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

        /* DEPARTMENT SECTIONS */

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
                          alt=""
                          loading="lazy"
                        />

                      </Link>

                    )
                  )}

                  {/* Fill missing positions */}

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