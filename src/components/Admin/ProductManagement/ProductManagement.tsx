import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

import "./ProductManagement.css";


export default function ProductManagement(){

const [products,setProducts]=useState<any[]>([]);
const [search,setSearch]=useState("");


useEffect(()=>{

fetchProducts();

},[]);



const fetchProducts = async()=>{

const {data,error}=await supabase
.from("products")
.select("*")
.order("created_at",{ascending:false});


if(error){

console.log(error);
return;

}


setProducts(data || []);

};



const filteredProducts = products.filter((product)=>{


const text = search.toLowerCase();


return (

product.title?.toLowerCase().includes(text) ||

product.product_id?.toLowerCase().includes(text) ||

product.brand?.toLowerCase().includes(text)

);


});



return (

<div className="product-management">


<h2>
Manage Products
</h2>


<input

className="product-search"

placeholder="Search product ID, title, brand..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>



<div className="product-list">


{filteredProducts.map((product)=>(


<div 
className="manage-product-card"
key={product.id}
>


<img

src={product.image_1}

alt={product.title}

/>


<div>

<h3>
{product.title}
</h3>


<p>
ID: {product.product_id}
</p>


<p>
Brand: {product.brand}
</p>


</div>



<div className="product-actions">


<button>
Edit
</button>


<button>
Delete
</button>


</div>


</div>


))}


</div>


</div>

)

}