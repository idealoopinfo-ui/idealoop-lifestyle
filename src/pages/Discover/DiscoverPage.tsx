import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../../lib/supabase";
import "./DiscoverPage.css";


interface Product {

  id: string;

  product_id: string;

  image_1: string;

  department: string;

}



export default function DiscoverPage() {


  const [products, setProducts] = useState<Product[]>([]);

  const [selectedCategory, setSelectedCategory] = useState("fashion");


  const navigate = useNavigate();



  useEffect(() => {


    const fetchProducts = async () => {


      const { data, error } = await supabase

      .from("products")

      .select(`
      id,
      product_id,
      image_1,
      department
      `)
      
      .eq("department", selectedCategory)
      
      .limit(40);



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
  
  <div className="discover-header">

<div className="discover-title-row">

  <h1>Discover</h1>

  <Link
    to="/"
    className="discover-home-button"
    aria-label="Go to homepage"
  >
    <svg
      className="discover-home-icon"
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 10.5L12 3L21 10.5V21H14.5V15H9.5V21H3V10.5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>

    <span>Home</span>
  </Link>

</div>

<p>
  Find inspiration for your lifestyle.
</p>

</div>
  
  
  
  
      <div className="discover-nav">
  
  
        <button
          className={
            selectedCategory === "fashion"
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory("fashion")
          }
        >
          Fashion
        </button>
  
  
  
        <button
          className={
            selectedCategory === "beauty"
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory("beauty")
          }
        >
          Beauty
        </button>
  
        <button
  className={
    selectedCategory === "fitness-wellness"
      ? "active"
      : ""
  }
  onClick={() =>
    setSelectedCategory("fitness-wellness")
  }
>
  Fitness & Wellness
</button>
  
        <button
          className={
            selectedCategory === "home-living"
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory("home-living")
          }
        >
          Home & Living
        </button>
  
  
  
        <button
          className={
            selectedCategory === "toys-gifts"
              ? "active"
              : ""
          }
          onClick={() =>
            setSelectedCategory("toys-gifts")
          }
        >
          Toys & Gifts
        </button>
  
  
      </div>
  
  
  
  
  
      <div className="pinterest-grid">
  
  
        {products.map((product,index)=>(
  
  
          <div
  
            key={product.id}
  
            className={`pin-card ${
              index % 5 === 0
                ? "large-pin"
                : index % 3 === 0
                ? "small-pin"
                : "medium-pin"
            }`}
  
            onClick={() =>
              navigate(`/product/${product.product_id}`)
            }
  
          >
  
  
  <div className="pin-image-wrapper">

<img
  src={product.image_1 || "/placeholder.png"}
  alt={product.product_id}
  className="pin-image"
  loading="lazy"
/>

<div className="pin-category-badge">
  {product.department}
</div>

</div>
  
  
            </div>
  
  
        
  
  
        ))}
  
  
      </div>
  
  
    </div>
  
  );
          }