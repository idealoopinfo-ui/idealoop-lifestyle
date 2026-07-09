import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";


export default function Login(){

const navigate = useNavigate();


const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [showPassword,setShowPassword] = useState(false);

const [error,setError] = useState("");
const [message,setMessage] = useState("");

const [loading,setLoading] = useState(false);



const handleLogin = async(
e:React.FormEvent
)=>{

e.preventDefault();


setError("");
setMessage("");

setLoading(true);



const {
data,
error
}=await supabase.auth.signInWithPassword({

email,
password

});



if(error){

setError(error.message);
setLoading(false);
return;

}



const user = data.user;



if(user){


const {
data:profile
}=await supabase

.from("profiles")

.select("*")

.eq("id",user.id)

.single();



if(!profile){


await supabase

.from("profiles")

.insert({

id:user.id,

email:user.email,

first_name:
user.user_metadata.first_name || "",

last_name:
user.user_metadata.last_name || "",

country:
user.user_metadata.country || "",

country_code:
user.user_metadata.country_code || "",

avatar_url:null

});


}



}



setMessage("Login successful");


setTimeout(()=>{

navigate("/");

},1000);



setLoading(false);



};





const handleGoogle = async()=>{


const {
error
}=await supabase.auth.signInWithOAuth({

provider:"google"

});


if(error){

setError(error.message);

}


};





return (

<div className="auth-container">


<div className="auth-card">


<h1>Idealoop</h1>


<h2>Welcome Back</h2>



<form onSubmit={handleLogin}>


<input

type="email"

placeholder="Email Address"

value={email}

onChange={(e)=>setEmail(e.target.value)}

required

/>




<div className="password-box">


<input

type={
showPassword?
"text":
"password"
}

placeholder="Password"

value={password}

onChange={(e)=>setPassword(e.target.value)}

required

/>



<span

onClick={()=>
setShowPassword(!showPassword)
}

>

{
showPassword?
<FaEyeSlash/>
:
<FaEye/>
}

</span>


</div>




<div className="forgot-link">

<Link to="/forgot-password">

Forgot Password?

</Link>

</div>




<button disabled={loading}>


{
loading?
"Signing in..."
:
"Sign In"
}


</button>



</form>




<div className="divider">

OR

</div>




<button

className="google-btn"

onClick={handleGoogle}

>


<FcGoogle/>

Continue with Google


</button>





{
error &&

<p className="error">

{error}

</p>

}



{
message &&

<p className="success">

{message}

</p>

}





<p>

Don't have an account?

<Link to="/register">

Create Account

</Link>

</p>




</div>


</div>

);


}