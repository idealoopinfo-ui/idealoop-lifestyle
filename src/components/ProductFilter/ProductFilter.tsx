import './ProductFilter.css';

type Props = {
  search: string;
  setSearch: (value: string) => void;
  category: string;
  setCategory: (value: string) => void;
  subcategory: string;
  setSubcategory: (value: string) => void;
};


export default function ProductFilter(props: Props) {

  const {
    search,
    setSearch,
    category,
    setCategory,
    setSubcategory,
  } = props;


  const handleCategory = (cat: string) => {

    setCategory(cat);
    setSubcategory('');

  };


  return (

    <div className="product-filter">

      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />


      {/* MAIN CATEGORIES */}
      <div className="buttons">

        <button onClick={() => handleCategory('all')}>
          All
        </button>

        <button onClick={() => handleCategory('home')}>
          Home
        </button>

        <button onClick={() => handleCategory('clothing')}>
          Clothing
        </button>

        <button onClick={() => handleCategory('beauty')}>
          Beauty
        </button>

      </div>


      {/* HOME SUBCATEGORIES */}
      {
        category === 'home' && (

          <div className="buttons">

            <button onClick={() => setSubcategory('furniture')}>
              Furniture
            </button>

            <button onClick={() => setSubcategory('decor')}>
              Decor
            </button>

          </div>

        )
      }


      {/* CLOTHING SUBCATEGORIES */}
      {
        category === 'clothing' && (

          <div className="buttons">

            <button onClick={() => setSubcategory('men')}>
              Men
            </button>

            <button onClick={() => setSubcategory('women')}>
              Women
            </button>

          </div>

        )
      }


    </div>

  );

}