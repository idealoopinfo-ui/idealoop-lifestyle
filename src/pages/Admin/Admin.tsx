import { useState } from "react";

import ProductManager from "../../components/Admin/ProductManager";

import "./Admin.css";


export default function Admin() {


const [activeTab,setActiveTab] = useState("dashboard");



return (

<div className="admin-layout">



{/* SIDEBAR */}

<div className="admin-sidebar">


<h2>
Idealoop Admin
</h2>



<button

onClick={()=>setActiveTab("dashboard")}

>

Dashboard

</button>




<button

onClick={()=>setActiveTab("products")}

>

Products

</button>




<button

onClick={()=>setActiveTab("messages")}

>

Messages

</button>




<button

onClick={()=>setActiveTab("notice")}

>

Notice Panel

</button>




<button

onClick={()=>setActiveTab("maintenance")}

>

Maintenance

</button>




<button

onClick={()=>setActiveTab("users")}

>

Users

</button>



</div>





{/* MAIN CONTENT */}

<div className="admin-content">





{
activeTab==="dashboard" && (

<div>


<h1>
Dashboard Overview
</h1>



<div className="stats-grid">



<div className="stat-card">

<h3>
Products
</h3>

<p>
0
</p>

</div>




<div className="stat-card">

<h3>
Users
</h3>

<p>
0
</p>

</div>





<div className="stat-card">

<h3>
New Messages
</h3>

<p>
0
</p>

</div>





<div className="stat-card">

<h3>
Messages
</h3>

<p>
0
</p>

</div>



</div>



</div>

)

}





{
activeTab==="products" && (

<ProductManager />

)

}





{
activeTab==="messages" && (

<div>

<h1>
Messages
</h1>


<p>
Message management will be added here.
</p>


</div>

)

}





{
activeTab==="notice" && (

<div>

<h1>
Notice Panel
</h1>


<p>
Notice controls will be added here.
</p>


</div>

)

}





{
activeTab==="maintenance" && (

<div>

<h1>
Maintenance Mode
</h1>


<p>
Maintenance controls will be added here.
</p>


</div>

)

}





{
activeTab==="users" && (

<div>

<h1>
Users
</h1>


<p>
User management will be added here.
</p>


</div>

)

}





</div>



</div>

);


}