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

      // Get child categories
      const { data: children } = await supabase
        .from("categories")
        .select("id")
        .eq("parent_id", mainCategory.id);

      const categoryIds = [
        mainCategory.id,
        ...(children || []).map((c: any) => c.id),
      ];

      // Get 5 products
      const { data: products } = await supabase
        .from("products")
        .select("product_id,title,image_1")
        .in("category_id", categoryIds)
        .not("image_1", "is", null)
        .limit(5);

      console.log(mainCategory.name, products?.length);

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
      <h2>Shop By Category</h2>

      {sections.map((section) => (
        <div className="category-container" key={section.title}>
          <h3>{section.title}</h3>

          <div className="category-grid">
            {section.products.map((product: any) => (
              <Link
                key={product.product_id}
                to={`/product/${product.product_id}`}
                className="category-product"
              >
                <img
                  src={product.image_1}
                  alt={product.title}
                  loading="lazy"
                />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}