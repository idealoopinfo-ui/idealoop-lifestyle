import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import "./SpotlightSection.css";

export default function SpotlightSection() {

  const navigate = useNavigate();

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetchSpotlightProducts();
  }, []);

  const fetchSpotlightProducts = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("spotlight", true);

    if (error) {
      console.log(error);
      return;
    }

    if (!data) return;

    // Randomize products
    const shuffled = [...data].sort(() => Math.random() - 0.5);

    // Keep only first 3
    setProducts(shuffled.slice(0, 3));
  };

  return (

    <section className="spotlight-section">

  <h2 className="spotlight-title">
    Spotlight
  </h2>


  <div className="spotlight-grid">


    {products[0] && (

      <div
        className="spotlight-large"
        onClick={() =>
          navigate(`/product/${products[0].product_id}`)
        }
      >

        <img
          src={products[0].image_1}
          alt={products[0].title}
        />

      </div>

    )}



    <div className="spotlight-small-container">


      {products.slice(1,3).map((product)=>(

        <div

          key={product.id}

          className="spotlight-small"

          onClick={() =>
            navigate(`/product/${product.product_id}`)
          }

        >

          <img
            src={product.image_1}
            alt={product.title}
          />

        </div>

      ))}


    </div>


  </div>


</section>

  );

}