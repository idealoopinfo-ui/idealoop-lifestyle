import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { supabase } from "../../lib/supabase";

import "./Help.css";


export default function Help(){


const [visible,setVisible] = useState(true);

const [title,setTitle] = useState("");
const [description,setDescription] = useState("");

const [categories,setCategories] = useState<any[]>([]);
const [faqs,setFaqs] = useState<any[]>([]);

const [openFAQ,setOpenFAQ] = useState<number | null>(null);



useEffect(()=>{

fetchHelp();

},[]);



const fetchHelp = async()=>{


const {data:settings,error:settingsError}=await supabase

.from("help_settings")

.select("*")

.single();



if(settingsError){

console.log(settingsError);

return;

}



if(settings){

setVisible(settings.is_visible);

setTitle(settings.hero_title);

setDescription(settings.hero_description);

}




const {data:categoryData}=await supabase

.from("help_categories")

.select("*")

.order("priority",{ascending:true});



setCategories(categoryData || []);





const {data:faqData}=await supabase

.from("help_faqs")

.select("*")

.order("priority",{ascending:true});



setFaqs(faqData || []);



};





if(!visible){

return (

<div className="help-disabled">

<h2>
Help Center is currently unavailable
</h2>

<p>
Please check back later.
</p>

</div>

);

}





return (

<div className="help-page">



<section className="help-hero">


<h1>
{title}
</h1>


<p>
{description}
</p>


</section>





<section className="help-cards">


{
categories.map((item)=>(


<div

className="help-card"

key={item.id}

>


<h3>

{item.icon}

{" "}

{item.title}

</h3>


<p>

{item.description}

</p>


</div>


))

}


</section>






<section className="faq-section">


<h2>
Frequently Asked Questions
</h2>



{
faqs.map((item)=>(


<div

className="faq-item"

key={item.id}

>


<button

onClick={()=>setOpenFAQ(

openFAQ === item.id

?

null

:

item.id

)}

>


{item.question}


<span>

{
openFAQ === item.id

?

"-"

:

"+"

}

</span>


</button>





{
openFAQ === item.id && (

<p>

{item.answer}

</p>

)

}



</div>


))

}



</section>






<section className="help-contact">


<h2>
Need more help?
</h2>


<p>
Our team is ready to assist you.
</p>


<Link to="/contact">

Contact Us

</Link>


</section>




</div>

);


}