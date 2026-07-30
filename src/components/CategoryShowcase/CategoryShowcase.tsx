
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import "./CategoryShowcase.css";

export default function CategoryShowcase() {
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const { data: homeCategories, error } = await supabase
      .from("homepage_category_view")
      .select("*")
      .order("position");

    if (error) {
      console.log(error);
      return;
    }

    const result: any[] = [];

    for (const item of homeCategories || []) {
      const { data: mainCategory } = await supabase
        .from("categories")
        .select("id,name")
        .eq("id", item.category_id)
        .single();

      if (!mainCategory) continue;

      const { data: children } = await supabase
        .from("categories")
        .select("id")
        .eq("parent_id", mainCategory.id);

      const categoryIds = [
        mainCategory.id,
        ...(children || []).map((c: any) => c.id),
      ];

      const { data: products } = await supabase
        .from("products")
        .select("product_id,title,image_1")
        .in("category_id", categoryIds)
        .not("image_1", "is", null)
        .limit(5);

      result.push({
        title: mainCategory.name,
        products: products || [],
      });
    }

    console.log("FINAL CATEGORY SECTIONS", result);

    setSections(result);
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
          Discover products curated for every part of your lifestyle.
        </p>

      </div>


      {/* CATEGORY SECTIONS */}

      <div className="category-sections">

        {sections.map((section) => (

          <div
            className="category-container"
            key={section.title}
          >

            <div className="category-heading">

              <h3>
                {section.title}
              </h3>

              <Link
                to={`/category/${section.title
                  .toLowerCase()
                  .replace(/ & /g, "-")
                  .replace(/\s+/g, "-")}`}
                className="category-view-link"
              >
                View All →
              </Link>

            </div>


            <div className="category-grid">

              {section.products.map((product: any) => (

                <Link
                  key={product.product_id}
                  to={`/product/${product.product_id}`}
                  className="category-product"
                >

                  <div className="category-image">

                    <img
                      src={product.image_1}
                      alt={product.title}
                      loading="lazy"
                    />

                  </div>

                </Link>

              ))}

            </div>

          </div>

        ))}

      </div>

    </section>
  );
}

