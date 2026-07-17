import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Register.css";


export default function Register(){


const navigate = useNavigate();



const [firstName,setFirstName] = useState("");
const [lastName,setLastName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");

const [country,setCountry] = useState("");
const [countryCode,setCountryCode] = useState("");


const [showPassword,setShowPassword] = useState(false);
const [showConfirm,setShowConfirm] = useState(false);


const [error,setError] = useState("");
const [message,setMessage] = useState("");

const [loading,setLoading] = useState(false);





const handleRegister = async(
e:React.FormEvent
)=>{


e.preventDefault();


setError("");
setMessage("");



if(password !== confirmPassword){

setError(
"Passwords do not match"
);

return;

}



setLoading(true);





const {
data,
error

}=await supabase.auth.signUp({


email,

password,


options:{


data:{


first_name:firstName,

last_name:lastName,

country,

country_code:countryCode


}


}


});





if(error){


setError(error.message);

setLoading(false);

return;


}





/*
 CREATE PROFILE
*/


if(data.user){



const {

error:profileError

}=await supabase


.from("profiles")


.insert({


id:data.user.id,


email:email,


first_name:firstName,


last_name:lastName,


country:country,


country_code:countryCode,


avatar_url:null,


is_admin:false


});




if(profileError){


console.log(
"profile creation error:",
profileError.message
);


}

}





setLoading(false);



setMessage(
"Account created successfully. Please login."
);




setTimeout(()=>{


navigate("/login");


},1500);



};

const handleGoogleRegister = async () => {

    setError("");
  
    const { error } = await supabase.auth.signInWithOAuth({
  
      provider: "google",
  
      options: {
  
        redirectTo: window.location.origin
  
      }
  
    });
  
    if (error) {
  
      setError(error.message);
  
    }
  
  };

return (

<div className="auth-container">


<div className="auth-card">



<h1>

Idealoop

</h1>



<h2>

Create Account

</h2>




<form onSubmit={handleRegister}>


<div className="name-row">


<input

placeholder="First Name"

value={firstName}

onChange={(e)=>
setFirstName(e.target.value)
}

required

/>



<input

placeholder="Last Name"

value={lastName}

onChange={(e)=>
setLastName(e.target.value)
}

required

/>


</div>





<input

type="email"

placeholder="Email Address"

value={email}

onChange={(e)=>
setEmail(e.target.value)
}

required

/>






<input

placeholder="Country"

value={country}

onChange={(e)=>
setCountry(e.target.value)
}

required

/>





<input

placeholder="Country Code (+94)"

value={countryCode}

onChange={(e)=>
setCountryCode(e.target.value)
}

required

/>

<div className="password-box">


<input

type={
showPassword
?
"text"
:
"password"
}

placeholder="Password"

value={password}

onChange={(e)=>
setPassword(e.target.value)
}

required

/>
<span

onClick={()=>
setShowPassword(!showPassword)
}

>

{
showPassword
?
<FaEyeSlash/>
:
<FaEye/>
}
</span>


</div>
<div className="password-box">


<input

type={
showConfirm
?
"text"
:
"password"
}

placeholder="Confirm Password"

value={confirmPassword}

onChange={(e)=>
setConfirmPassword(e.target.value)
}

required

/>
<span

onClick={()=>
setShowConfirm(!showConfirm)
}

>

{
showConfirm
?
<FaEyeSlash/>
:
<FaEye/>
}

</span>


</div>
<button

type="submit"

disabled={loading}

>


{

loading
?
"Creating..."
:
"Create Account"

}
</button>

</form>
<div className="divider">

OR

</div>
<button
  type="button"
  className="google-btn"
  onClick={handleGoogleRegister}
>
  <FcGoogle />
  Continue With Google
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


Already have an account?


<Link to="/login">

Login

</Link>


</p>
</div>

</div>

);


}