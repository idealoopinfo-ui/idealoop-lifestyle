import{useEffect,useState}from"react";
import{useParams}from"react-router-dom";
import{supabase}from"../../lib/supabase";
import ProductCard from"../../components/ProductCard/ProductCard";
import"./ProductDetails.css";

type Product={
id:string;
product_id:string;
title:string;
description?:string;
short_description?:string;
image_1:string;
image_2?:string;
image_3?:string;
image_4?:string;
image_5?:string;
affiliate_url:string;
subcategory?:string;
brand?:string;
material?:string;
fit?:string;
style?:string;
occasion?:string;
season?:string;
gender?:string;
hair_type?:string;
skin_type?:string;
ingredients?:string;
volume_size?:string;
scent?:string;
benefits?:string;
suitable_for?:string;
dimensions?:string;
color?:string;
room_type?:string;
weight?:string;
age_range?:string;
educational_features?:string;
};

export default function ProductDetails(){

const{productId}=useParams();

const[product,setProduct]=useState<Product|null>(null);
const[selectedImage,setSelectedImage]=useState("");
const[related,setRelated]=useState<Product[]>([]);

useEffect(()=>{

if(!productId)return;

const loadProduct=async()=>{

const{data,error}=await supabase
.from("products")
.select("*")
.eq("product_id",productId)
.maybeSingle();

if(error||!data){
console.log(error);
return;
}

setProduct(data);
setSelectedImage(data.image_1);


const{data:relatedData}=await supabase
.from("products")
.select("*")
.eq("subcategory",data.subcategory)
.neq("product_id",data.product_id)
.limit(4);


setRelated(relatedData||[]);

};

loadProduct();

},[productId]);


if(!product){

return(
<div className="product-details-page">
Loading product...
</div>
);

}


const images=[
product.image_1,
product.image_2,
product.image_3,
product.image_4,
product.image_5
].filter(Boolean) as string[];


const specifications=[
["Brand",product.brand],
["Material",product.material],
["Fit",product.fit],
["Style",product.style],
["Occasion",product.occasion],
["Season",product.season],
["Gender",product.gender],
["Hair Type",product.hair_type],
["Skin Type",product.skin_type],
["Ingredients",product.ingredients],
["Volume",product.volume_size],
["Scent",product.scent],
["Benefits",product.benefits],
["Suitable For",product.suitable_for],
["Dimensions",product.dimensions],
["Color",product.color],
["Room Type",product.room_type],
["Weight",product.weight],
["Age Range",product.age_range],
["Educational Features",product.educational_features]
].filter(item=>item[1]);


return(

<div className="product-details-page">

<div className="product-top">


<div className="thumbnail-list">

{images.map(img=>(

<img
key={img}
src={img}
alt={product.title}
className={`thumbnail ${selectedImage===img?"active":""}`}
onClick={()=>setSelectedImage(img)}
/>

))}

</div>



<div className="image-area">

<img
src={selectedImage}
alt={product.title}
className="main-product-image"
/>

</div>



<div className="product-info">


<h1>{product.title}</h1>


<p>
<strong>Product ID:</strong> {product.product_id}
</p>


<p className="short-description">
{product.short_description}
</p>



<div className="details-list">

<h2>Product Specifications</h2>


{specifications.map(item=>(

<p key={item[0]}>
<strong>{item[0]}</strong>
{item[1]}
</p>

))}

</div>



<button
className="detail-shop-btn"
onClick={()=>window.open(product.affiliate_url,"_blank")}
>
Shop Now
</button>


</div>


</div>



<section className="product-highlights">

<h2>Product Highlights</h2>

<ul>

{product.description?.split("\n").filter(Boolean).map((line,index)=>(

<li key={index}>
{line.replace("- ","")}
</li>

))}

</ul>

</section>



<section className="related-products">

<h2>You May Also Like</h2>

<div className="related-grid">

{related.map(item=>(

<ProductCard
key={item.id}
product={item}
/>

))}

</div>

</section>


</div>

);

}