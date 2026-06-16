import './ProductFilter.css';

type Props = {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
};

export default function ProductFilter({
  search,
  setSearch,
  category,
  setCategory,
}: Props) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="buttons">
        <button onClick={() => setCategory('all')}>All</button>
        <button onClick={() => setCategory('home')}>Home</button>
        <button onClick={() => setCategory('clothing')}>Clothing</button>
        <button onClick={() => setCategory('beauty')}>Beauty</button>
      </div>
    </div>
  );
}
