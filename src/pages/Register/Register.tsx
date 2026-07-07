
import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Register.css";


export default function Register() {


const [firstName,setFirstName] = useState("");

const [lastName,setLastName] = useState("");

const [email,setEmail] = useState("");

const [password,setPassword] = useState("");

const [confirmPassword,setConfirmPassword] = useState("");

const [country,setCountry] = useState("");

const [countryCode,setCountryCode] = useState("");



const [showPassword,setShowPassword] = useState(false);

const [showConfirm,setShowConfirm] = useState(false);



const [message,setMessage] = useState("");

const [error,setError] = useState("");

const [loading,setLoading] = useState(false);



const navigate = useNavigate();





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

last_name:lastName


}


}


});





if(error){


setError(error.message);

setLoading(false);

return;


}





const user = data.user;





if(user){


const {
error:profileError

}=await supabase

.from("profiles")

.insert({


id:user.id,

email:email,

first_name:firstName,

last_name:lastName,

country:country,

country_code:countryCode,

avatar_url:null


});




if(profileError){


console.log(
"profile error:",
profileError.message
);


}



}






setLoading(false);


setMessage(
"Account created successfully!"
);





setTimeout(()=>{


navigate("/login");


},1200);




};








const handleGoogle = async()=>{


const {
error

}=await supabase.auth.signInWithOAuth({

provider:"google"

});



if(error){

setError(
"Google signup failed"
);

}


};

return (

<div className="auth-container">


<div className="auth-box">



<h2>
Create Account
</h2>

<form

className="auth-form"

onSubmit={handleRegister}

>

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

<input

type="email"

placeholder="Email"

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

placeholder="Country Code (example +94)"

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

className="register-submit-btn"

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
<button
className="google-btn"

onClick={handleGoogle}

>

<FcGoogle size={22}/>

Continue with Google


</button>
{
error &&

<div className="error-popup">

{error}

</div>

}

{
message &&

<div className="success-popup">

{message}

</div>

}

<p>

Already have an account?

{" "}

<Link to="/login">

Login

</Link>

</p>
</div>


</div>

);


}

