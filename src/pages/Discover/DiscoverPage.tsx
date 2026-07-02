import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import "./DiscoverPage.css";

interface Product {
  id: number;
  main_image_url: string;
}

export default function DiscoverPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("id, main_image_url");

      if (error) {
        console.error("Error fetching products:", error.message);
        return;
      }

      if (data) {
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="discover-page">
  
      {/* FLOATING TOP BAR */}
      <div className="top-bar">
        <h2>IDEALOOP</h2>
  
        <div className="categories">
          <button className="active">All</button>
          <button>Fashion</button>
          <button>Home</button>
          <button>Beauty</button>
          <button>Kitchen</button>
          <button>Travel</button>
        </div>
      </div>
  
      {/* PINTEREST GRID */}
      <div className="pinterest-grid">
        {products.map((product) => (
          <div
            key={product.id}
            className={`pin-card size-${(product.id % 4) + 1}`}
            onClick={() => navigate(`/product/${product.id}`)}
          >
            <img
              src={product.main_image_url}
              alt={`Product ${product.id}`}
              loading="lazy"
            />
          </div>
        ))}
      </div>
  
      {/* MINIMAL FOOTER */}
      <footer className="mini-footer">
        © {new Date().getFullYear()} Idealoop
      </footer>
  
    </div>
  );
        }