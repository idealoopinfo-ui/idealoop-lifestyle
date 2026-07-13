import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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

        .eq("department", selectedCategory);



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
  
        <h1>Discover</h1>
  
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
  
                src={product.image_1}
  
                alt={product.product_id}
  
                className="pin-image"
  
                loading="lazy"
  
              />
  
  
            </div>
  
  
          </div>
  
  
        ))}
  
  
      </div>
  
  
    </div>
  
  );
          }