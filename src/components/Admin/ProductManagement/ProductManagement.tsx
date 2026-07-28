import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

import ProductManager from "../ProductManager";

import "./ProductManagement.css";


interface Props {
  onEdit: (product: any) => void;
}

export default function ProductManagement({ onEdit }: Props){

const [products,setProducts] = useState<any[]>([]);

const [search,setSearch] = useState("");


useEffect(()=>{

fetchProducts();

},[]);



const fetchProducts = async()=>{

const {data,error}=await supabase

.from("products")

.select("*")

.order("created_at",{ascending:false});


if(error){

console.log(
"FETCH PRODUCTS ERROR:",
error
);

return;

}


setProducts(data || []);

};




const handleDelete = async(id:string)=>{


const confirmDelete = window.confirm(
"Delete this product?"
);


if(!confirmDelete) return;



const {error}=await supabase

.from("products")

.delete()

.eq("id",id);



if(error){

console.log(
"DELETE ERROR:",
error
);

return;

}



fetchProducts();


};





const filteredProducts = products.filter((product)=>{


const text = search.toLowerCase();



return (

product.title?.toLowerCase().includes(text)

||

product.product_id?.toLowerCase().includes(text)

||

product.brand?.toLowerCase().includes(text)

);


});

const startEdit = (product: any) => {
  console.log("Editing:", product);
  onEdit(product);
};

  return (

    <div className="product-management">
    
    
    <h2>
    Manage Products
    </h2>
    
    
    <button
type="button"
className="add-product-btn"
onClick={()=>onEdit(null)}
>
Add Product
</button>

  
<input

className="product-search"

placeholder="Search product ID, title, brand..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>




{/* ONLY ONE EDIT FORM */}

<div className="product-list">


{filteredProducts.map((product)=>(


<div

className="manage-product-card"

key={product.id}

>


<img

src={product.image_1 || "/placeholder.png"}

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


<button
  type="button"
  onClick={() => startEdit(product)}
>
  Edit
</button>



<button

type="button"

onClick={()=>handleDelete(product.id)}

>

Delete

</button>



</div>



</div>


))}



</div>


</div>

);


}