import {useEffect,useState} from "react";
import {supabase} from "../../lib/supabase";
import {useNavigate,Link} from "react-router-dom";
import "./Profile.css";

type ProfileData={
id:string;
first_name:string;
last_name:string;
email:string;
phone?:string;
country?:string;
country_code?:string;
avatar_url?:string;
created_at?:string;
};


export default function Profile(){

const navigate=useNavigate();

const[profile,setProfile]=useState<ProfileData|null>(null);
const[edit,setEdit]=useState(false);
const[loading,setLoading]=useState(true);



useEffect(()=>{

const loadProfile=async()=>{

const{
data:{user}
}=await supabase.auth.getUser();


if(!user){

navigate("/login");
return;

}


const{data,error}=await supabase
.from("profiles")
.select("*")
.eq("id",user.id)
.single();


if(error){

console.log(error);
return;

}


setProfile(data);
setLoading(false);

};


loadProfile();


},[navigate]);



const updateProfile=async()=>{

if(!profile)return;


const{error}=await supabase
.from("profiles")
.update({

first_name:profile.first_name,
last_name:profile.last_name,
phone:profile.phone,
country:profile.country,
country_code:profile.country_code

})
.eq("id",profile.id);



if(error){

console.log(error);
return;

}


setEdit(false);

};



const logout=async()=>{

await supabase.auth.signOut();

navigate("/login");

};



const deleteAccount=async()=>{

const confirmDelete=window.confirm(
"Are you sure you want to delete your account?"
);


if(!confirmDelete)return;


alert(
"Account deletion request received. Contact support for permanent deletion."
);

};



if(loading){

return(
<div className="profile-page">
Loading profile...
</div>
);

}



return(

<div className="profile-page">


<div className="profile-card">


<img

src={
profile?.avatar_url ||
"https://i.pravatar.cc/150?img=3"
}

alt="Profile"

className="profile-avatar"

/>


<h2>

{profile?.first_name} {profile?.last_name}

</h2>


<p>

{profile?.email}

</p>


</div>




<div className="profile-details">


<h3>
Profile Details
</h3>



<label>
First Name
</label>

<input

disabled={!edit}

value={profile?.first_name||""}

onChange={(e)=>setProfile({

...profile!,
first_name:e.target.value

})}

/>



<label>
Last Name
</label>

<input

disabled={!edit}

value={profile?.last_name||""}

onChange={(e)=>setProfile({

...profile!,
last_name:e.target.value

})}

/>



<label>
Email
</label>

<input

disabled

value={profile?.email||""}

/>



<label>
Phone
</label>

<input

disabled={!edit}

value={profile?.phone||""}

onChange={(e)=>setProfile({

...profile!,
phone:e.target.value

})}

/>



<label>
Country
</label>

<input

disabled={!edit}

value={profile?.country||""}

onChange={(e)=>setProfile({

...profile!,
country:e.target.value

})}

/>



<div className="profile-buttons">


{

edit?

<>

<button onClick={updateProfile}>
Save
</button>


<button
onClick={()=>setEdit(false)}
>
Cancel
</button>

</>

:

<button
onClick={()=>setEdit(true)}
>
Edit Profile
</button>

}


</div>


</div>





<div className="profile-actions">


<h3>
My Account
</h3>



<Link to="/wishlist">
❤️ Wishlist
</Link>


<Link to="/settings">
⚙️ Settings
</Link>



<button
className="logout-btn"
onClick={logout}
>
Logout
</button>



<button
className="delete-btn"
onClick={deleteAccount}
>
Delete Account
</button>



</div>



</div>

);

}