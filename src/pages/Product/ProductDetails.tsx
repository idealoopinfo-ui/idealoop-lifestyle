import {useEffect,useState} from "react";
import {useNavigate,useParams} from "react-router-dom";
import {supabase} from "../../lib/supabase";
import ProductCard from "../../components/ProductCard/ProductCard";
import "./ProductDetails.css";


export default function ProductDetails(){

const {productid}=useParams();

console.log("URL PRODUCT ID:",productid);

const navigate=useNavigate();

const [product,setProduct]=useState<any>(null);
const [selectedImage,setSelectedImage]=useState("");
const [related,setRelated]=useState<any[]>([]);



useEffect(()=>{

if(productid){
fetchProduct();
}

},[productid]);



const fetchProduct=async()=>{

  console.log("FETCHING PRODUCT:",productid);


const {data,error}=await supabase
.from("products")
.select("*")
.eq("product_id",productid)
.single();



if(error){

console.log("PRODUCT ERROR:",error);

return;

}



setProduct(data);

setSelectedImage(data.image_1);


fetchRelated(
data.subcategory,
data.product_id
);


};




const fetchRelated=async(
subcategory:string,
productid:string
)=>{


const {data,error}=await supabase
.from("products")
.select("*")
.eq("subcategory",subcategory)
.neq("product_id",productid)
.limit(4);



if(!error){

setRelated(data || []);

}


};



if(!product){

return(

<div className="loading">

Loading product...

</div>

);

}



return(


    <div className="product-details-page">
    
    
    <div className="breadcrumb">
    
    <span onClick={()=>navigate("/")}>
    Home
    </span>
    
    {" / "}
    
    {product.category}
    
    {" / "}
    
    {product.subcategory}
    
    </div>
    
    
    
    <button
    className="back-btn"
    onClick={()=>navigate(-1)}
    >
    ← Back
    </button>
    
    
    
    <div className="product-container">
    
    
    
    <div className="product-images">
    
    
    <div className="main-image">
    
    <img
    src={selectedImage}
    alt={product.title}
    />
    
    </div>
    
    
    
    <div className="thumbnail-row">
    
    {
    [
    product.image_1,
    product.image_2,
    product.image_3,
    product.image_4
    
    ]
    .filter(Boolean)
    .map((image:string,index:number)=>(
    
    
    <div
    className="thumbnail"
    key={index}
    onClick={()=>setSelectedImage(image)}
    >
    
    <img
    src={image}
    alt={product.title}
    />
    
    
    </div>
    
    
    ))
    
    }
    
    
    </div>
    
    
    </div>
    
    
    
    
    <div className="product-info">
    
    
    <h1>
    {product.title}
    </h1>
    
    
    
    <p className="product-id">
    
    Product ID: {product.product_id}
    
    </p>
    
    
    
    <p className="short-description">
    
    {product.short_description}
    
    </p>
    
    
    
    <h3>
    Product Highlights
    </h3>
    
    
    
    <ul className="feature-list">
    
    {
    product.description
    ?.split("\n")
    .filter(Boolean)
    .map((item:string,index:number)=>(
    
    <li key={index}>
    {item.replace("- ","")}
    </li>
    
    ))
    
    }
    
    </ul>
    
    
    
    <button
    
    className="shop-btn"
    
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
    
    
    
    
    <div className="description-section">
    
    <h2>
    Description
    </h2>
    
    
    <p>
    {product.description}
    </p>
    
    
    </div>
    
    
    
    
    <div className="related-section">
    
    <h2>
    You May Also Like
    </h2>
    
    
    <div className="related-grid">
    
    {
    related.map((item)=>(
    
    <ProductCard
    
    key={item.product_id}
    
    product={item}
    
    />
    
    ))
    
    }
    
    </div>
    
    </div>
    
    
    
    </div>
    
    );
  }