import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { supabase } from "../../lib/supabase";

import "./Wishlist.css";


export default function Wishlist(){


const [items,setItems] = useState<any[]>([]);

const [loading,setLoading] = useState(true);

const navigate = useNavigate();





useEffect(()=>{

fetchWishlist();

},[]);







const fetchWishlist = async()=>{


const {

data:{user}

}=await supabase.auth.getUser();




if(!user){

setLoading(false);

return;

}





const {data,error}=await supabase

.from("wishlist")

.select("*")

.eq("user_id",user.id)

.order("created_at",{ascending:false});





if(error){

console.log(
"WISHLIST ERROR:",
error
);

setLoading(false);

return;

}





setItems(data || []);

setLoading(false);



};







const removeWishlist = async(id:number)=>{


const {error}=await supabase

.from("wishlist")

.delete()

.eq("id",id);





if(error){

console.log(
"REMOVE ERROR:",
error
);

return;

}




setItems(

prev => prev.filter(item => item.id !== id)

);



};







if(loading){

return (

<div className="wishlist-loading">

Loading wishlist...

</div>

);

}






return (

<div className="wishlist-page">


<h1>
My Wishlist ❤️
</h1>





{

items.length === 0 ? (



<div className="empty-wishlist">


<h2>

Your wishlist is empty

</h2>


<p>

Save products you love and find them here later.

</p>




<Link

to="/"

className="continue-shopping-btn"

>

Continue Shopping

</Link>


</div>



)

:

(



<div className="wishlist-list">



{

items.map((item)=>(


<div

className="wishlist-item"

key={item.id}

>



<img

src={item.image_url}

alt={item.title}

className="wishlist-image"

/>




<div className="wishlist-info">


<h3>

{item.title}

</h3>



<button

className="wishlist-view-btn"

onClick={()=>navigate(`/product/${item.product_id}`)}

>

View Product

</button>



</div>





<button

className="remove-wishlist-btn"

onClick={()=>removeWishlist(item.id)}

>

Remove ❤️

</button>



</div>



))

}



</div>



)


}



</div>

);



}