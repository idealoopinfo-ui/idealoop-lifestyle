import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";

import CategoryManager from "../../components/Admin/CategoryManager";
import ProductManager from "../../components/Admin/ProductManager";
import HelpManager from "../../components/Admin/HelpManager";

import "./Admin.css";


export default function Admin() {


const [activeTab,setActiveTab] = useState("dashboard");


// DASHBOARD STATS

const [stats,setStats] = useState({

products:0,

users:0,

messages:0,

blogs:0

});


// NOTICE STATES

const [notices,setNotices] = useState<any[]>([]);

const [noticeMessage,setNoticeMessage] = useState("");

const [noticeActive,setNoticeActive] = useState(false);

const [noticePriority,setNoticePriority] = useState(1);

const [savingNotice,setSavingNotice] = useState(false);

const [editingNoticeId,setEditingNoticeId] = useState<number|null>(null);





// FETCH STATS

const fetchStats = async()=>{


const {
count:productCount,
error:productError

}=await supabase

.from("products")

.select("*",{

count:"exact",

head:true

});



if(productError){

console.log(
"PRODUCT COUNT ERROR:",
productError
);

}





const {
count:userCount,
error:userError

}=await supabase

.from("profiles")

.select("*",{

count:"exact",

head:true

});



if(userError){

console.log(
"USER COUNT ERROR:",
userError
);

}




setStats({

products:productCount || 0,

users:userCount || 0,

messages:0,

blogs:0

});


};




// FETCH NOTICES

const fetchNotices = async()=>{


const {
data,
error

}=await supabase

.from("notice_panels")

.select("*")

.order("priority",{

ascending:true

});



if(error){

console.log(
"NOTICE FETCH ERROR:",
error
);

return;

}



console.log(
"FETCHED NOTICES:",
data
);


setNotices(data || []);



};





// SAVE NOTICE

const saveNotice = async()=>{


setSavingNotice(true);



const noticeData={


message:noticeMessage,

is_active:noticeActive,

priority:noticePriority


};




let query;



if(editingNoticeId){


query = supabase

.from("notice_panels")

.update(noticeData)

.eq(
"id",
editingNoticeId
);



}else{


query = supabase

.from("notice_panels")

.insert(noticeData);


}





const {error}=await query;



if(error){


console.log(
"NOTICE SAVE ERROR:",
error
);


alert(
"Failed to save notice"
);



}else{


alert(
"Notice saved successfully"
);


setNoticeMessage("");

setNoticeActive(false);

setNoticePriority(1);

setEditingNoticeId(null);


fetchNotices();


}



setSavingNotice(false);


};





// EDIT NOTICE

const editNotice=(notice:any)=>{


setEditingNoticeId(
notice.id
);


setNoticeMessage(
notice.message
);


setNoticeActive(
notice.is_active
);


setNoticePriority(
notice.priority
);


};





useEffect(()=>{


fetchStats();

fetchNotices();


},[]);






return (


<div className="admin-layout">



{/* SIDEBAR */}

<aside className="admin-sidebar">


<h2>
Admin Panel
</h2>



<button

className={
activeTab==="dashboard"
?
"active"
:
""
}

onClick={()=>setActiveTab("dashboard")}

>

Dashboard

</button>




<button

className={
activeTab==="products"
?
"active"
:
""
}

onClick={()=>setActiveTab("products")}

>

Products

</button>


<button 
onClick={()=>setActiveTab("categories")}
>
 Categories
</button>


<button

className={
activeTab==="messages"
?
"active"
:
""
}

onClick={()=>setActiveTab("messages")}

>

Messages

</button>





<button

className={
activeTab==="notice"
?
"active"
:
""
}

onClick={()=>setActiveTab("notice")}

>

Notice Panel

</button>





<button

className={
activeTab==="maintenance"
?
"active"
:
""
}

onClick={()=>setActiveTab("maintenance")}

>

Maintenance

</button>





<button

className={
activeTab==="users"
?
"active"
:
""
}

onClick={()=>setActiveTab("users")}

>

Users

</button>

<button

className={
activeTab==="help"
?
"active"
:
""
}

onClick={()=>setActiveTab("help")}

>

Help Page

</button>



</aside>







{/* CONTENT */}


<main className="admin-content">





{
activeTab==="dashboard" && (


<div className="admin-section">


<h1>
Dashboard
</h1>


<div className="stats-grid">


<div className="stat-card">

<h3>
Products
</h3>

<p>
{stats.products}
</p>

</div>



<div className="stat-card">

<h3>
Users
</h3>

<p>
{stats.users}
</p>

</div>




<div className="stat-card">

<h3>
Messages
</h3>

<p>
{stats.messages}
</p>

</div>




<div className="stat-card">

<h3>
Blogs
</h3>

<p>
{stats.blogs}
</p>

</div>


</div>


</div>


)

}







{
activeTab==="products" && (


<div className="admin-section">


<ProductManager/>


</div>


)

}



{
activeTab==="categories" &&
<CategoryManager/>
}



{
activeTab==="notice" && (


<div className="admin-section">


<h1>
Notice Panel
</h1>



<label className="notice-label">


<input

type="checkbox"

checked={noticeActive}

onChange={(e)=>
setNoticeActive(
e.target.checked
)
}

/>


Active Notice


</label>





<textarea

className="notice-textarea"

value={noticeMessage}

onChange={(e)=>
setNoticeMessage(
e.target.value
)
}

placeholder="Enter notice message"

/>





<label className="notice-label">


Priority


<input

type="number"

value={noticePriority}

onChange={(e)=>
setNoticePriority(
Number(e.target.value)
)
}

/>


</label>





<button

className="save-btn"

onClick={saveNotice}

disabled={savingNotice}

>


{
savingNotice
?
"Saving..."
:
editingNoticeId
?
"Update Notice"
:
"Add Notice"
}



</button>








<div className="all-notices">


<h2>
All Notices
</h2>



{
notices.map((notice)=>(


<div

key={notice.id}

className="notice-card"


>


<p>

{notice.message}

</p>


<p>

Priority: {notice.priority}

</p>



<p>

{
notice.is_active
?
"Active"
:
"Inactive"
}

</p>




<button

className="edit-notice-btn"

onClick={()=>editNotice(notice)}

>

Edit

</button>



</div>



))

}



</div>




</div>


)

}







{
activeTab==="messages" && (

<div className="admin-section">

<h1>
Messages
</h1>

</div>

)

}




{
activeTab==="maintenance" && (

<div className="admin-section">

<h1>
Maintenance
</h1>

</div>

)

}




{
activeTab==="users" && (

<div className="admin-section">

<h1>
Users
</h1>

</div>

)

}

{
activeTab==="help" && (

<HelpManager />

)
}


</main>



</div>


);


}