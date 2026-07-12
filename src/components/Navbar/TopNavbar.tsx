import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";

import CountryButton from "../Country/CountryButton";

import "./TopNavbar.css";


export default function TopNavbar() {


  const [isAdmin,setIsAdmin] = useState(false);
  const [profileOpen,setProfileOpen] = useState(false);
  
  const { user } = useAuth();

const profileRef = useRef<HTMLDivElement>(null);

const location = useLocation();
const navigate = useNavigate();

useEffect(() => {

  const checkAdmin = async () => {

    if (!user) {

      setIsAdmin(false);
      return;

    }


    const { data: profile, error } =
      await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();



    if (error) {

      console.log(
        "Admin check error:",
        error.message
      );

      setIsAdmin(false);
      return;

    }


    setIsAdmin(
      profile?.is_admin === true
    );

  };


  checkAdmin();


}, [user]);




useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileRef.current &&
      !profileRef.current.contains(event.target as Node)
    ) {
      setProfileOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

const isDiscover =
location.pathname.startsWith("/discover");

const handleToggle=()=>{
navigate(

isDiscover
?
"/"
:
"/discover"

);


};

const handleLogout = async () => {

  await supabase.auth.signOut();

  setProfileOpen(false);

  navigate("/");

};

return(

<div className="top-navbar">
<div className="top-left">


<Link
to="/"
className="logo"
>


<img

src="https://lxvoytlpnbzwxplxfnxj.supabase.co/storage/v1/object/public/my/Untitled_design-removebg-preview.png"

alt="Idealoop"

className="logo-img"

/>



<span className="company-name">

Idealoop Lifestyle Store

</span>


</Link>


</div>





<div className="top-right">


<button

className="nav-toggle-btn"

onClick={handleToggle}

>

{
isDiscover
?
"Home"
:
"Discover"
}


</button>

{!isDiscover && (

<>


{
user &&

<>

<Link
to="/wishlist"
className="nav-btn"
>

❤️ Wishlist

</Link>



<Link
to="/deals"
className="nav-btn highlight"
>

🔥 Deals

</Link>


</>

}





<CountryButton />





{
!user ?


<div className="auth-group">


<Link
to="/login"
className="auth-btn"
>

Login

</Link>



<Link
to="/register"
className="auth-btn"
>

Register

</Link>


</div>
:


<div
  className="profile-dropdown"
  ref={profileRef}
>
<button

className="profile-btn"

onClick={()=>setProfileOpen(!profileOpen)}

>


<div className="avatar">

{
user?.user_metadata?.first_name
?
user.user_metadata.first_name.charAt(0).toUpperCase()
:
"A"
}


</div>



<span>

{
user?.user_metadata?.first_name
||
"Account"
}


⌄

</span>



</button>





{
profileOpen &&


<div className="profile-menu">


<Link
to="/profile"
className="menu-item"
>

👤 Profile

</Link>


<Link
to="/wishlist"
className="menu-item"
>

❤️ Wishlist

</Link>

{
isAdmin &&

<Link

to="/admin"

className="menu-item"

>

⚙️ Admin Dashboard

</Link>

}



<button

className="logout-btn"

onClick={handleLogout}

>

🚪 Logout

</button>


</div>

}



</div>


}


</>

)}


</div>


</div>


);


}