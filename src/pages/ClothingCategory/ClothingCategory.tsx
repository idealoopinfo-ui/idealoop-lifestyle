import ProductGrid from "../../components/ProductGrid/ProductGrid";
import "./ClothingCategory.css";

export default function ClothingCategory() {

  return (

    <div className="clothing-category">


      {/* PRODUCT GRID */}
      <ProductGrid
        category="clothing"
        search=""
      />


    </div>

  );

}