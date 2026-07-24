import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ProductCard from "../ProductCard/ProductCard";

import "./TrendingProducts.css";


export default function TrendingProducts() {

const [products,setProducts] = useState<any[]>([]);


useEffect(()=>{

fetchTrending();

},[]);



const fetchTrending = async()=>{

const {data,error}=await supabase
.from("products")
.select("*")
.eq("trending",true)
.limit(8);



if(error){

console.log(error);
return;

}


setProducts(data || []);

};



return (

<section className="trending-products">


<h2>
🔥 Trending Now
</h2>



<div className="trending-grid">


{
products.map((product)=>(

<ProductCard

key={product.id}

product={product}

/>

))

}


</div>


</section>

);

}