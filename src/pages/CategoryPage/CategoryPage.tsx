import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import { supabase } from "../../lib/supabase";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./CategoryPage.css";


export default function CategoryPage() {

  const {
    department,
    category,
    subcategory
  } = useParams();


  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  const normalize = (str: string | null) => {

    return str
      ? str.toLowerCase().trim().replace(/\s+/g, "-")
      : null;

  };


  const formatTitle = (text: string | null) => {

    if (!text) return "";

    return text
      .replace(/-/g, " ")
      .replace(/\b\w/g, char => char.toUpperCase());

  };


  const fetchProducts = async () => {

    setLoading(true);


    let query = supabase
      .from("products")
      .select("*");


    if (department) {

      query = query.eq(
        "department",
        normalize(department)
      );

    }


    if (category) {

      query = query.eq(
        "category",
        normalize(category)
      );

    }


    if (subcategory) {

      query = query.eq(
        "subcategory",
        normalize(subcategory)
      );

    }


    const {
      data,
      error
    } = await query.order(
      "created_at",
      {
        ascending: false
      }
    );


    if (error) {

      console.log(
        "PRODUCT FETCH ERROR:",
        error
      );

    }


    setProducts(data || []);

    setLoading(false);

  };


  useEffect(() => {

    fetchProducts();

  }, [
    department,
    category,
    subcategory
  ]);



  return (

    <div className="category-page">


      <div className="breadcrumb">

        <Link to="/">
          Home
        </Link>


        {department && (

          <>
            <span> / </span>

            <Link to={`/category/${department}`}>
              {formatTitle(department)}
            </Link>
          </>

        )}


        {category && (

          <>
            <span> / </span>

            <Link to={`/category/${department}/${category}`}>
              {formatTitle(category)}
            </Link>
          </>

        )}


        {subcategory && (

          <>
            <span> / </span>

            <span>
              {formatTitle(subcategory)}
            </span>
          </>

        )}

      </div>



      <h1>

        {
          subcategory
            ? formatTitle(subcategory)
            : category
              ? formatTitle(category)
              : formatTitle(department || "")
        }

      </h1>



      {
        loading ? (

          <p>
            Loading products...
          </p>

        )

        :

        products.length === 0 ? (

          <p>
            No products found.
          </p>

        )

        :

        (

          <div className="product-grid">

            {
              products.map((product) => (

                <ProductCard
  key={product.product_id}
  product={product}
/>

              ))
            }

          </div>

        )

      }


    </div>

  );

}