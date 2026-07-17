import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { categories } from "../../data/categories";
import "./CategoryDrawer.css";

export default function CategoryDrawer() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* ☰ BUTTON */}
      <button className="cat-toggle" onClick={() => setOpen(true)}>
        ☰ Categories
      </button>

      {/* OVERLAY */}
      {open && <div className="overlay" onClick={() => setOpen(false)} />}

      {/* DRAWER */}
      <div className={`drawer ${open ? "open" : ""}`}>
        <div className="drawer-header">
          <h3>Categories</h3>
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="drawer-list">
          {categories.map((cat) => (
            <div
            key={cat.name}
              className="drawer-item"
              onClick={() => {
                navigate(`/category/${cat.slug}`);
                setOpen(false);
              }}
            >
              {cat.name}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}