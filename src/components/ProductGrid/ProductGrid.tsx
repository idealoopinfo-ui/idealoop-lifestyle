import ProductCard from "../ProductCard/ProductCard";
import "./ProductGrid.css";

type Product = {
  id: string;
  title: string;
  image: string;
};

const products: Product[] = [
  {
    id: "1",
    title: "Minimal Desk Lamp",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
  },
  {
    id: "2",
    title: "Modern Chair",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    id: "3",
    title: "Wood Table",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657",
  },
];

export default function ProductGrid() {
  return (
    <div className="pinterest-grid">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}