import './ProductFilter.css';

type Props = {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  subcategory: string;
  setSubcategory: (value: string) => void;
};

export default function ProductFilter({
  search,
  setSearch,
  category,
  setCategory,
  subcategory,
  setSubcategory,
}: Props) {

  const handleCategory = (cat: string) => {
    setCategory(cat);
    setSubcategory(''); // reset subcategory when main changes
  };

  return (
    <div className="filter">

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* MAIN CATEGORIES */}
      <div className="buttons">
        <button onClick={() => handleCategory('all')}>All</button>
        <button onClick={() => handleCategory('home')}>Home</button>
        <button onClick={() => handleCategory('clothing')}>Clothing</button>
        <button onClick={() => handleCategory('beauty')}>Beauty</button>
      </div>

      {/* SUBCATEGORIES (example for HOME) */}
      {category === 'home' && (
        <div className="buttons">
          <button onClick={() => setSubcategory('furniture')}>Furniture</button>
          <button onClick={() => setSubcategory('decor')}>Decor</button>
        </div>
      )}

      {/* SUBCATEGORIES (clothing) */}
      {category === 'clothing' && (
        <div className="buttons">
          <button onClick={() => setSubcategory('men')}>Men</button>
          <button onClick={() => setSubcategory('women')}>Women</button>
        </div>
      )}

    </div>
  );
}