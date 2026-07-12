import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./DiscoverPage.css";


interface Product {
  id: number;
  product_id: string;
  image_1: string;
  departments: string;
}

export default function DiscoverPage() {


  const [products, setProducts] = useState<Product[]>([]);

  const [selectedCategory, setSelectedCategory] =
    useState("Fashion");


  const navigate = useNavigate();



  useEffect(() => {


    const fetchProducts = async () => {

      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          product_id,
          image_1,
          departments
        `)
        .eq("departments", selectedCategory);
    
    
      if (error) {
        console.error("Discover error:", error.message);
        return;
      }
    
    
      setProducts(data || []);
    
    };


    fetchProducts();


  }, [selectedCategory]);





  return (

    <div className="discover-page">


      {/* HEADER */}

      <div className="discover-header">

        <h1>
          Discover
        </h1>


        <p>
          Find inspiration for your lifestyle.
        </p>


      </div>





      {/* CATEGORY NAVIGATION */}

      <div className="discover-nav">


        <button

          className={
            selectedCategory === "Fashion"
              ? "active"
              : ""
          }

          onClick={() =>
            setSelectedCategory("Fashion")
          }

        >

          Fashion

        </button>





        <button

          className={
            selectedCategory === "Beauty"
              ? "active"
              : ""
          }

          onClick={() =>
            setSelectedCategory("Beauty")
          }

        >

          Beauty

        </button>





        <button

          className={
            selectedCategory === "Home & Living"
              ? "active"
              : ""
          }

          onClick={() =>
            setSelectedCategory("Home & Living")
          }

        >

          Home & Living

        </button>





        <button

          className={
            selectedCategory === "Toys & Gifts"
              ? "active"
              : ""
          }

          onClick={() =>
            setSelectedCategory("Toys & Gifts")
          }

        >

          Toys & Gifts

        </button>


      </div>





      {/* PINTEREST IMAGE GRID */}


      <div className="pinterest-grid">


        {products.map((product) => (


          <div

            key={product.id}

            className="pin-card"

            onClick={() =>
              navigate(
                `/product/${product.product_id}`
              )
            }

          >


<img
  src={product.image_1}
  alt="Lifestyle product"
  loading="lazy"
/>

          </div>


        ))}


      </div>



    </div>

  );

}