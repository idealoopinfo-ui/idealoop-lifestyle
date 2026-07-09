import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import ProductCard from "../ProductCard/ProductCard";

import "./FeaturedProducts.css";


export default function FeaturedProducts() {


const [products,setProducts] = useState<any[]>([]);



useEffect(()=>{

fetchFeaturedProducts();

},[]);



const fetchFeaturedProducts = async()=>{


const {data,error}=await supabase
.from("products")
.select("*")
.eq("featured",true)
.limit(4);



if(error){

console.log(error);
return;

}



setProducts(data || []);


};



return (

<section className="featured-products">


<h2>
Featured Products
</h2>



<div className="featured-grid">


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