import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import { categories } from "../../data/categories";
import "./ProductManager.css";


export default function ProductManager() {


const [title,setTitle] = useState("");
const [description,setDescription] = useState("");
const [shortDescription,setShortDescription] = useState("");


const [image1,setImage1] = useState("");
const [image2,setImage2] = useState("");
const [image3,setImage3] = useState("");
const [image4,setImage4] = useState("");

const [affiliateUrl,setAffiliateUrl] = useState("");
const [marketplace,setMarketplace] = useState("");

const [productId,setProductId] = useState("");

const [featured,setFeatured] = useState(false);
const [trending,setTrending] = useState(false);
const [season,setSeason] = useState("");
const [style,setStyle] = useState("");
const [occasion,setOccasion] = useState("");

/* CATEGORY */

const [department,setDepartment] = useState("");
const [category,setCategory] = useState("");
const [subcategory,setSubcategory] = useState("");



const [products,setProducts] = useState<any[]>([]);



/* LOAD PRODUCTS */

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





/* =========================
CATEGORY DROPDOWN DATA
========================= */


const selectedMainCategory = categories.find(
(item:any)=>item.slug === department
);



const selectedCategory = selectedMainCategory?.children?.find(
(item:any)=>item.slug === category
);



const departmentList = categories;



const categoryList = selectedMainCategory?.children || [];



const subcategoryList = selectedCategory?.children || [];

/* RESET CHILDREN */

useEffect(()=>{

setCategory("");
setSubcategory("");

},[department]);
useEffect(()=>{

setSubcategory("");

},[category]);

/* ADD PRODUCT */

const addProduct = async()=>{


const {error}=await supabase
.from("products")
.insert([

{


product_id:productId,
title,
description,
short_description:shortDescription,
image_1:image1,
image_2:image2,
image_3:image3,
image_4:image4,
affiliate_url:affiliateUrl,

marketplace,
featured,
trending,
department,
category,
subcategory,

season,
style,
occasion,


}

]);
if(error){

console.log(error);

return;

}



setProductId("");
setTitle("");
setDescription("");
setShortDescription("");

setImage1("");
setImage2("");
setImage3("");
setImage4("");

setAffiliateUrl("");

setMarketplace("");
setDepartment("");
setCategory("");
setSubcategory("");
setSeason("");
setStyle("");
setOccasion("");
setFeatured(false);
setTrending(false);
fetchProducts();

};

const seasons = [
    "Spring",
    "Summer",
    "Fall",
    "Winter",
    "All Season"
    ];
    
    
    const styles = [
    "Casual",
    "Formal",
    "Streetwear",
    "Luxury",
    "Minimalist",
    "Sporty",
    "Vintage",
    "Boho"
    ];
    
    
    const occasions = [
    "Everyday",
    "Work",
    "Party",
    "Wedding",
    "Vacation",
    "Gym",
    "Outdoor"
    ];


return (

<div className="product-manager">


<h1>
Product Management
</h1>



<div className="admin-form">



<input
placeholder="Product ID"
value={productId}
onChange={(e)=>setProductId(e.target.value)}
/>



<input
placeholder="Product Title"
value={title}
onChange={(e)=>setTitle(e.target.value)}
/>



<textarea
placeholder="Full Description"
value={description}
onChange={(e)=>setDescription(e.target.value)}
/>



<input
placeholder="Short Description"
value={shortDescription}
onChange={(e)=>setShortDescription(e.target.value)}
/>



<input
placeholder="Main Image URL"
value={image1}
onChange={(e)=>setImage1(e.target.value)}
/>



<input
placeholder="Image 2 URL"
value={image2}
onChange={(e)=>setImage2(e.target.value)}
/>



<input
placeholder="Image 3 URL"
value={image3}
onChange={(e)=>setImage3(e.target.value)}
/>



<input
placeholder="Image 4 URL"
value={image4}
onChange={(e)=>setImage4(e.target.value)}
/>



<input
placeholder="Affiliate URL"
value={affiliateUrl}
onChange={(e)=>setAffiliateUrl(e.target.value)}
/>



<input
placeholder="Marketplace"
value={marketplace}
onChange={(e)=>setMarketplace(e.target.value)}
/>





<select

value={department}

onChange={(e)=>{

setDepartment(e.target.value);

}}

>

<option value="">
Select Department
</option>


{

departmentList.map((item:any)=>(

<option

key={item.slug}

value={item.slug}

>

{item.name}

</option>

))

}


</select>

<select
value={category}
disabled={!department}
onChange={(e)=>{

setCategory(e.target.value);

}}

>

<option value="">
Select Category
</option>


{

categoryList.map((item:any)=>(

<option

key={item.slug}

value={item.slug}

>

{item.name}

</option>

))

}


</select>

<select

value={subcategory}

disabled={!category}

onChange={(e)=>setSubcategory(e.target.value)}

>

<option value="">
Select Subcategory
</option>


{

subcategoryList.map((item:any)=>(

<option

key={item.slug}

value={item.slug}

>

{item.name}

</option>

))

}


</select>

<select

value={season}

onChange={(e)=>setSeason(e.target.value)}

>

<option value="">
Select Season
</option>


{

seasons.map((item)=>(

<option
key={item}
value={item}
>

{item}

</option>

))

}

</select>




<select

value={style}

onChange={(e)=>setStyle(e.target.value)}

>

<option value="">
Select Style
</option>


{

styles.map((item)=>(

<option
key={item}
value={item}
>

{item}

</option>

))

}

</select>





<select

value={occasion}

onChange={(e)=>setOccasion(e.target.value)}
>
<option value="">
Select Occasion
</option>

{

occasions.map((item)=>(

<option
key={item}
value={item}
>

{item}

</option>

))

}

</select>
<label>

<input

type="checkbox"

checked={featured}

onChange={(e)=>setFeatured(e.target.checked)}

 />

Featured Product

</label>
<label>

<input

type="checkbox"

checked={trending}

onChange={(e)=>setTrending(e.target.checked)}

 />

Trending Product

</label>
<button

className="add-btn"

onClick={addProduct}

>

Add Product

</button>
</div>


</div>

);


}