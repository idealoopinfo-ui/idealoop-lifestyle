import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

import "./HomepageCategoryManager.css";


export default function HomepageCategoryManager(){


const [categories,setCategories]=useState<any[]>([]);
const [settings,setSettings]=useState<any[]>([]);



useEffect(()=>{

loadData();

},[]);



const loadData=async()=>{


const {data:categoryData,error:categoryError}=await supabase

.from("categories")

.select("id,name")

.order("id");



if(categoryError){

console.log(categoryError);
return;

}


setCategories(categoryData || []);




const {data:settingData,error:settingError}=await supabase

.from("homepage_categories")

.select(`
id,
category_id,
position,
is_active
`)

.order("position");



if(settingError){

console.log(settingError);
return;

}


setSettings(settingData || []);


};





const updateCategory=(

position:number,

categoryId:number

)=>{


setSettings(prev=>{


const exists=prev.find(

item=>item.position===position

);



if(exists){


return prev.map(item=>

item.position===position

?

{
...item,
category_id:categoryId
}

:

item

);


}



return [

...prev,

{

position,

category_id:categoryId,

is_active:true

}

];


});


};





return(

<div className="homepage-category-manager">


<h2>
Homepage Category Control
</h2>



{

[1,2,3,4,5].map(position=>{


const current=settings.find(

item=>item.position===position

);



return(

<div

className="homepage-category-row"

key={position}

>


<h3>

Position {position}

</h3>



<select

value={current?.category_id || ""}

onChange={(e)=>

updateCategory(

position,

Number(e.target.value)

)

}

>


<option value="">

Select Category

</option>



{

categories.map((category)=>(


<option

key={category.id}

value={category.id}

>

{category.name}

</option>


))

}



</select>



</div>


);


})


}



</div>

);


}