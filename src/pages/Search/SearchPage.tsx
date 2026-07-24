import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./SearchPage.css";


export default function SearchPage(){


const [searchParams] = useSearchParams();

const query =
searchParams.get("q") || "";


const [products,setProducts] =
useState<any[]>([]);

const [loading,setLoading] =
useState(true);



useEffect(()=>{


const fetchSearch = async()=>{


if(!query){

setProducts([]);

setLoading(false);

return;

}



setLoading(true);



const {data,error}=await supabase

.from("products")

.select("*")

.or(
`title.ilike.%${query}%,
category.ilike.%${query}%,
subcategory.ilike.%${query}%,
brand.ilike.%${query}%`
);



if(error){

console.log(
"SEARCH PAGE ERROR:",
error
);

setLoading(false);

return;

}



setProducts(data || []);

setLoading(false);


};



fetchSearch();


},[query]);





return(


<div className="search-page">


<h1>

Search Results For:

<span>
{" "}{query}

</span>

</h1>



{
loading ? (

<p className="search-loading">

Loading products...

</p>

)

:

products.length === 0 ? (

<p className="no-results">

No products found.

</p>

)

:

(

<div className="search-grid">


{

products.map(product=>(

<ProductCard

key={product.product_id}

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