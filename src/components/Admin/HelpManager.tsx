import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function HelpManager(){

const [visible,setVisible] = useState(true);

const [heroTitle,setHeroTitle] = useState("");
const [heroDescription,setHeroDescription] = useState("");

const [faqs,setFaqs] = useState<any[]>([]);
const [categories,setCategories] = useState<any[]>([]);


const [faqQuestion,setFaqQuestion] = useState("");
const [faqAnswer,setFaqAnswer] = useState("");

const [categoryTitle,setCategoryTitle] = useState("");
const [categoryDescription,setCategoryDescription] = useState("");
const [categoryIcon,setCategoryIcon] = useState("");



useEffect(()=>{

fetchHelp();

},[]);



const fetchHelp = async()=>{


const {data:settings}=await supabase
.from("help_settings")
.select("*")
.single();


if(settings){

setVisible(settings.is_visible);
setHeroTitle(settings.hero_title);
setHeroDescription(settings.hero_description);

}



const {data:faqData}=await supabase
.from("help_faqs")
.select("*")
.order("priority");


setFaqs(faqData || []);



const {data:categoryData}=await supabase
.from("help_categories")
.select("*")
.order("priority");


setCategories(categoryData || []);


};




const saveSettings = async()=>{


await supabase
.from("help_settings")
.update({

is_visible:visible,
hero_title:heroTitle,
hero_description:heroDescription

})
.eq("id",1);


alert("Help settings saved");


};




const addFAQ = async()=>{


if(!faqQuestion || !faqAnswer) return;


await supabase
.from("help_faqs")
.insert({

question:faqQuestion,
answer:faqAnswer

});


setFaqQuestion("");
setFaqAnswer("");

fetchHelp();


};




const deleteFAQ = async(id:number)=>{


await supabase
.from("help_faqs")
.delete()
.eq("id",id);


fetchHelp();


};




const addCategory = async()=>{


await supabase
.from("help_categories")
.insert({

icon:categoryIcon,
title:categoryTitle,
description:categoryDescription

});


setCategoryIcon("");
setCategoryTitle("");
setCategoryDescription("");

fetchHelp();


};




const deleteCategory = async(id:number)=>{


await supabase
.from("help_categories")
.delete()
.eq("id",id);


fetchHelp();


};



return (

<div>


<section className="admin-section">


<h1>
Help Page Settings
</h1>


<label className="notice-label">

<input

type="checkbox"

checked={visible}

onChange={(e)=>setVisible(e.target.checked)}

/>

Show Help Page

</label>



<input

className="notice-textarea"

value={heroTitle}

onChange={(e)=>setHeroTitle(e.target.value)}

/>



<textarea

className="notice-textarea"

value={heroDescription}

onChange={(e)=>setHeroDescription(e.target.value)}

/>



<button

className="save-btn"

onClick={saveSettings}

>

Save Settings

</button>



</section>





<section className="admin-section">


<h1>
FAQ Manager
</h1>


<input

className="notice-textarea"

placeholder="Question"

value={faqQuestion}

onChange={(e)=>setFaqQuestion(e.target.value)}

/>



<textarea

className="notice-textarea"

placeholder="Answer"

value={faqAnswer}

onChange={(e)=>setFaqAnswer(e.target.value)}

/>



<button

className="save-btn"

onClick={addFAQ}

>

Add FAQ

</button>




<div className="all-notices">


{
faqs.map(item=>(

<div className="notice-card" key={item.id}>


<div className="notice-message">

{item.question}

</div>


<p>
{item.answer}
</p>


<button

className="edit-notice-btn"

onClick={()=>deleteFAQ(item.id)}

>

Delete

</button>


</div>


))
}


</div>


</section>






<section className="admin-section">


<h1>
Help Categories
</h1>



<input

className="notice-textarea"

placeholder="Icon"

value={categoryIcon}

onChange={(e)=>setCategoryIcon(e.target.value)}

/>



<input

className="notice-textarea"

placeholder="Title"

value={categoryTitle}

onChange={(e)=>setCategoryTitle(e.target.value)}

/>



<textarea

className="notice-textarea"

placeholder="Description"

value={categoryDescription}

onChange={(e)=>setCategoryDescription(e.target.value)}

/>



<button

className="save-btn"

onClick={addCategory}

>

Add Category

</button>



<div className="all-notices">


{
categories.map(item=>(


<div className="notice-card" key={item.id}>


<div className="notice-message">

{item.icon} {item.title}

</div>


<p>
{item.description}
</p>


<button

className="edit-notice-btn"

onClick={()=>deleteCategory(item.id)}

>

Delete

</button>


</div>


))
}


</div>


</section>



</div>

);


}