import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

import { supabase } from "../../lib/supabase";

import "./ProductCard.css";


interface ProductCardProps {
  product: {
    product_id: string;
    title: string;
    main_image_url?: string;
    image?: string;
    image_1?: string;
    image_2?: string;
    image_3?: string;
    image_4?: string;
    affiliate_url?: string;
    product_url?: string;
  }
}


export default function ProductCard({ product }: ProductCardProps) {


const navigate = useNavigate();


const [user,setUser] = useState<any>(null);

const [liked,setLiked] = useState(false);





useEffect(()=>{

checkUser();

},[product.product_id]);





const checkUser = async()=>{


const {

data:{user}

}=await supabase.auth.getUser();



setUser(user);



if(user){

checkWishlist(user.id);

}


};







const checkWishlist = async(userId:string)=>{


const {data,error}=await supabase

.from("wishlist")

.select("id")

.eq("user_id",userId)

.eq("product_id",product.product_id);



if(error){

  console.log(
    "CHECK WISHLIST ERROR DETAILS:",
    error.message,
    error.details,
    error.hint,
    error.code
    );

return;

}



if(data && data.length > 0){

setLiked(true);

}


};







const handleWishlist = async()=>{


  if(!user){
  
  alert("Please login to add wishlist items");
  
  return;
  
  }
  
  
  // Immediately change UI
  
  const newLiked = !liked;
  
  setLiked(newLiked);
  
  
  
  if(liked){
  
  
  const {error}=await supabase
  
  .from("wishlist")
  
  .delete()
  
  .eq("user_id",user.id)
  
  .eq("product_id",product.product_id);
  
  
  
  if(error){
  
  console.log(
  "REMOVE ERROR:",
  error
  );
  
  
  // rollback if failed
  
  setLiked(true);
  
  return;
  
  }
  
  
  }
  
  else{
  
  
  const {error}=await supabase
  
  .from("wishlist")
  
  .insert({
  
  user_id:user.id,
  
  product_id:product.product_id,
  
  title:product.title,
  
  image_url:product.image_1
  
  });
  
  
  
  if(error){
  
  console.log(
  "ADD ERROR:",
  error
  );
  
  
  // rollback if failed
  
  setLiked(false);
  
  return;
  
  }
  
  
  }
  
  
  };


const handleShopNow = ()=>{

window.open(
product.affiliate_url,
"_blank"
);

};

const handleViewMore = ()=>{

navigate(
`/product/${product.product_id}`
);

};

return (

<div className="product-card">
<div className="product-image-wrapper">

  <img
    src={product.image_1}
    alt={product.title}
    className="product-image"
  />
 <button
  type="button"
  className={`wishlist-hover-btn ${liked ? "liked" : ""}`}
  onClick={handleWishlist}
>
  <FaHeart />
</button>


</div>

<h3 className="product-title">

{product.title}

</h3>
<button

className="view-more-btn"
onClick={handleViewMore}

>

View More →

</button>
<button

className="shop-now-btn"

onClick={handleShopNow}

>

Shop Now

</button>



</div>


);


}