import { useState } from "react";
import { supabase } from "../../../lib/supabase";

interface Props {
  product:any;
  onSaved:()=>void;
  onCancel:()=>void;
}

export default function ProductEditForm({
  product,
  onSaved,
  onCancel
}:Props){

const [title,setTitle]=useState(product.title || "");
const [brand,setBrand]=useState(product.brand || "");
const [description,setDescription]=useState(product.description || "");


const saveProduct = async()=>{


const {error}=await supabase
.from("products")
.update({

title,
brand,
description

})
.eq("id",product.id);



if(error){

console.log("UPDATE ERROR:",error);
return;

}


onSaved();


};



return (

<div className="product-edit-form">

<h3>Edit Product</h3>


<input
value={title}
onChange={(e)=>setTitle(e.target.value)}
placeholder="Title"
/>


<input
value={brand}
onChange={(e)=>setBrand(e.target.value)}
placeholder="Brand"
/>


<textarea

value={description}
onChange={(e)=>setDescription(e.target.value)}

placeholder="Description"

/>


<button onClick={saveProduct}>
Save
</button>


<button onClick={onCancel}>
Cancel
</button>


</div>

);


}