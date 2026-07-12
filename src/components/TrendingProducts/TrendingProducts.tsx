import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import "./TrendingProducts.css";

export default function TrendingProducts() {

const [products,setProducts] = useState<any[]>([]);
const navigate = useNavigate();


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

<section className="trending-section">


<h2>
🔥 Trending Now
</h2>



<div className="trending-wrapper">


{
products.map((product,index)=>(


<div 
className="trending-card"
key={product.id}
>



<div className="trending-image">


<img
src={product.image_1}
alt={product.title}
/>


<span>
#{index + 1}
</span>


</div>



<h3>
{product.title}
</h3>




<button 
className="view-more-btn"
onClick={()=>navigate(`/product/${product.product_id}`)}
>
View More →
</button>



</div>


))
}


</div>


</section>


);

}