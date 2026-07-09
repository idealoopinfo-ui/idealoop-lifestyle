import {useEffect,useState} from "react";
import {Link} from "react-router-dom";
import {supabase} from "../../lib/supabase";
import "./CategoryShowcase.css";

export default function CategoryShowcase(){

const [sections,setSections]=useState<any[]>([]);

const categories=[
    {
    title:"Women's Fashion",
    category:"women",
    link:"/category/women"
    },
    {
    title:"Men's Fashion",
    category:"men",
    link:"/category/men"
    },
    {
    title:"Home Decor",
    category:"home",
    link:"/category/home"
    },
    {
    title:"Beauty",
    category:"beauty",
    link:"/category/beauty"
    }
    ];


useEffect(()=>{

loadProducts();

},[]);


const loadProducts=async()=>{

const result:any[]=[];

for(const item of categories){

const {data,error}=await supabase
.from("products")
.select("product_id,title,image_1")
.eq("category",item.category)
.not("image_1","is",null)
.limit(4);


if(error){

console.log(error);
continue;

}


result.push({

...item,
products:data||[]

});


}


setSections(result);

};


return(

<section className="category-showcase">

<h2>
Shop By Category
</h2>


{
sections.map((section)=>(

<div className="category-container" key={section.category}>


<h3>
{section.title}
</h3>


<div className="category-grid">


{
section.products.map((product:any)=>(

<Link
to={`/product/${product.product_id}`}
className="category-product"
key={product.product_id}
>


<img
src={product.image_1}
alt={product.title}
/>

</Link>

))
}


</div>


<Link
className="category-more"
to={section.link}
>
View All {section.title} →
</Link>


</div>

))
}


</section>

);

}