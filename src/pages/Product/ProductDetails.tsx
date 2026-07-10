import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { supabase } from "../../lib/supabase";
import ProductCard from "../../components/ProductCard/ProductCard";

import "./ProductDetails.css";


interface Product {

id:string;
product_id:string;

title:string;

description:string;
short_description:string;

image_1:string;
image_2:string;
image_3:string;
image_4:string;

affiliate_url:string;

department?:string;
category?:string;
subcategory?:string;

marketplace?:string;

material?:string;
fit?:string;

style?:string;
season?:string;
occasion?:string;

}



export default function ProductDetails(){


const { productId } = useParams();


const [product,setProduct] = useState<Product | null>(null);

const [selectedImage,setSelectedImage] = useState("");

const [related,setRelated] = useState<Product[]>([]);



useEffect(()=>{

if(productId){

fetchProduct();

}

},[productId]);



const fetchProduct = async()=>{


const {data,error}=await supabase

.from("products")

.select("*")

.eq("product_id",productId)

.maybeSingle();



if(error){

console.log(
"PRODUCT ERROR:",
error
);

return;

}



if(!data) return;



setProduct(data);

setSelectedImage(data.image_1);



fetchRelated(
data.subcategory,
data.product_id
);


};





const fetchRelated = async(
subcategory:string,
currentProductId:string
)=>{


const {data,error}=await supabase

.from("products")

.select("*")

.eq("subcategory",subcategory)

.neq("product_id",currentProductId)

.limit(5);



if(!error){

setRelated(data || []);

}


};




if(!product){

return (

<p>
Loading product...
</p>

);

}



return (


<div className="product-details-page">



{/* TOP SECTION */}


<div className="product-top-section">



{/* IMAGE GALLERY */}


<div className="product-gallery">


<img

src={
selectedImage || product.image_1
}

alt={product.title}

className="main-product-image"

/>



<div className="thumbnail-list">


{

[
product.image_1,
product.image_2,
product.image_3,
product.image_4

]

.filter(Boolean)

.map(
(image:string,index:number)=>(


<img

key={index}

src={image}

alt={product.title}

className={
selectedImage === image
?
"thumbnail active"
:
"thumbnail"
}

onClick={()=>setSelectedImage(image)}

/>


)

)

}



</div>


</div>






{/* PRODUCT INFORMATION */}



<div className="product-info">



<h1>

{product.title}

</h1>




<p className="product-id">

Product ID:
{" "}
{product.product_id}

</p>




<p className="short-description">

{product.short_description}

</p>





<div className="product-details-box">


<h3>

Product Information

</h3>




{
product.department &&

<p>

<strong>
Department:
</strong>
{" "}
{product.department}

</p>
}




{
product.category &&

<p>

<strong>
Category:
</strong>
{" "}
{product.category}

</p>
}




{
product.subcategory &&

<p>

<strong>
Subcategory:
</strong>
{" "}
{product.subcategory}

</p>
}




{
product.marketplace &&

<p>

<strong>
Marketplace:
</strong>
{" "}
{product.marketplace}

</p>
}





{

(
product.material ||
product.fit ||
product.style ||
product.season ||
product.occasion

)

&&

<hr />

}





{
product.material &&

<p>

<strong>
Material:
</strong>
{" "}
{product.material}

</p>

}




{
product.fit &&

<p>

<strong>
Fit:
</strong>
{" "}
{product.fit}

</p>

}




{
product.style &&

<p>

<strong>
Style:
</strong>
{" "}
{product.style}

</p>

}




{
product.season &&

<p>

<strong>
Season:
</strong>
{" "}
{product.season}

</p>

}




{
product.occasion &&

<p>

<strong>
Occasion:
</strong>
{" "}
{product.occasion}

</p>

}



</div>





<button

className="detail-shop-btn"

onClick={()=>

window.open(
product.affiliate_url,
"_blank"
)

}

>

Shop Now

</button>




</div>


</div>






{/* PRODUCT HIGHLIGHTS */}



{/* PRODUCT HIGHLIGHTS */}

<section className="highlights-section">

  <h2>
    Product Highlights
  </h2>


  <ul className="feature-list">

    {
      product.description
        ?.split("\n")
        .map((item:string)=>item.trim())
        .filter(Boolean)
        .map((item:string,index:number)=>(

          <li key={index}>
            {item.replace("- ","")}
          </li>

        ))
    }

  </ul>


</section>

{/* RELATED PRODUCTS */}
<section className="related-section">


<h2>

You May Also Like

</h2>
<div className="product-grid">

{

related.map((item)=>(


<ProductCard

key={item.id}

product={item}

/>


))

}

</div>

</section>
</div>


);


}