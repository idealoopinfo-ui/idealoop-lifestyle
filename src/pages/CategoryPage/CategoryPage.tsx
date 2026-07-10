import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { Link } from "react-router-dom";

import { supabase } from "../../lib/supabase";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./CategoryPage.css";


export default function CategoryPage() {

  const {
    department,
    category,
    subcategory
    }=useParams();


const [products,setProducts] = useState<any[]>([]);
const [loading,setLoading] = useState(true);



const normalize = (str:string | null)=>{

  const breadcrumb = () => {

    return (
    
    <div className="breadcrumb">
    
    <Link to="/">
    Home
    </Link>
    
    
    {department && (
    
    <>
    <span> / </span>
    
    <Link to={`/category/${department}`}>
    {formatTitle(department)}
    </Link>
    
    </>
    
    )}
    
    
    {category && (
    
    <>
    <span> / </span>
    
    <Link
    to={`/category/${department}/${category}`}
    >
    {formatTitle(category)}
    </Link>
    
    </>
    
    )}
    
    
    {subcategory && (
    
    <>
    <span> / </span>
    
    <span>
    {formatTitle(subcategory)}
    </span>
    
    </>
    
    )}
    
    
    </div>
    
    );
    
    };

return str
? str.toLowerCase().trim().replace(/\s+/g,"-")
: null;

};



useEffect(()=>{

fetchProducts();

},[
  department,
  category,
  subcategory
  ]);

const fetchProducts = async()=>{


setLoading(true);



let query = supabase
.from("products")
.select("*");



/*
 MAIN CATEGORY
 Example:
 /category/fashion

 DB:
 department = fashion
*/

if(department){

  query = query.eq(
  "department",
  normalize(department)
  );
  
  }
  
  
  if(category){
  
  query = query.eq(
  "category",
  normalize(category)
  );
  
  }
  
  
  if(subcategory){
  
  query = query.eq(
  "subcategory",
  normalize(subcategory)
  );
  
  }


const {data,error}=await query
.order("created_at",{
ascending:false
});



if(error){

console.log(
"PRODUCT FETCH ERROR:",
error
);

}



setProducts(data || []);

setLoading(false);



};




const formatTitle=(text:string|null)=>{

if(!text) return "";

return text
.replace(/-/g," ")
.replace(/\b\w/g,char=>char.toUpperCase());

};



return (

<div className="category-page">


<h1 className="category-title">

{
subcategory
?
formatTitle(subcategory)
:
category
?
formatTitle(category)
:
formatTitle(department || "")
}

</h1>



{
loading ? (

<p className="loading">
Loading products...
</p>


)

:

products.length === 0 ? (

<p className="no-products">
No products found
</p>


)

:

(

<div className="product-grid">

{
products.map((product)=>(

<ProductCard

key={product.id}

product={product}

/>

))
}

</div>

)

}



</div>

);


}