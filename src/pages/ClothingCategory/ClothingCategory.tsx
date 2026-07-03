import { useState } from "react";
import CategoryNavbar from "../../components/Navbar/CategoryNavbar";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import "./ClothingCategory.css";

export default function ClothingCategory() {
  const [gender, setGender] = useState<string | null>(null);
  const [subcategory, setSubcategory] = useState<string | null>(null);
  const [season, setSeason] = useState<string | null>(null);

  return (
    <>
      {/* NAVBAR */}
      <CategoryNavbar />

      {/* FILTER BAR */}
      <div className="filters">
        {/* GENDER */}
        <button onClick={() => setGender(null)}>All</button>
        <button onClick={() => setGender("women")}>Women</button>
        <button onClick={() => setGender("men")}>Men</button>

        {/* SUBCATEGORY */}
        <button onClick={() => setSubcategory("casual")}>Casual</button>
        <button onClick={() => setSubcategory("party")}>Party</button>
        <button onClick={() => setSubcategory("wedding")}>Wedding</button>

        {/* SEASON */}
        <button onClick={() => setSeason(null)}>All Seasons</button>
        <button onClick={() => setSeason("summer")}>Summer</button>
        <button onClick={() => setSeason("winter")}>Winter</button>
      </div>

      {/* PRODUCT GRID */}
      <ProductGrid
        category="clothing"
        gender={gender}
        subcategory={subcategory}
        season={season}
      />
    </>
  );
}