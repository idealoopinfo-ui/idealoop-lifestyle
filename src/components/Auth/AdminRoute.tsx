import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";


export default function AdminRoute({
children
}:{
children:React.ReactNode
}){


const [loading,setLoading]=useState(true);

const [isAdmin,setIsAdmin]=useState(false);



useEffect(()=>{


const checkAdmin = async()=>{


const {
data:{
user
}

}=await supabase.auth.getUser();



if(!user){

setIsAdmin(false);

setLoading(false);

return;

}




const {
data:profile
}=await supabase

.from("profiles")

.select("is_admin")

.eq("id",user.id)

.single();



console.log("ADMIN CHECK:", profile);


if(profile?.is_admin){

setIsAdmin(true);

}



setLoading(false);



};



checkAdmin();



},[]);





if(loading){

return (

<div>

Checking access...

</div>

);

}




if(!isAdmin){

return (

<Navigate to="/" replace />

);

}



return children;


}