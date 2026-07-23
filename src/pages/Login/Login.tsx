import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";


export default function Login() {


  const navigate = useNavigate();


  const [email,setEmail] = useState("");

  const [password,setPassword] = useState("");


  const [showPassword,setShowPassword] = useState(false);


  const [error,setError] = useState("");

  const [message,setMessage] = useState("");


  const [loading,setLoading] = useState(false);





  const handleLogin = async (
    e: React.FormEvent
  ) => {


    e.preventDefault();


    setError("");

    setMessage("");

    setLoading(true);





    const {
      data,
      error
    } = await supabase.auth.signInWithPassword({

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
        data: profile
      } = await supabase


        .from("profiles")


        .select("*")


        .eq("id",user.id)


        .single();





      if(!profile){



        const metadata = user.user_metadata;



        await supabase

        .from("profiles")

        .insert({


          id:user.id,


          email:user.email,



          first_name:

          metadata.first_name ||

          metadata.full_name?.split(" ")[0] ||

          "",



          last_name:

          metadata.last_name ||

          metadata.full_name?.split(" ").slice(1).join(" ") ||

          "",



          country:"",


          country_code:"",



          avatar_url:

          metadata.avatar_url ||

          metadata.picture ||

          null



        });



      }



    }





    setMessage("Login successful");



    setTimeout(()=>{


      navigate("/");


    },1000);




    setLoading(false);



  };








  const handleGoogle = async () => {


    setError("");



    const {

      error

    } = await supabase.auth.signInWithOAuth({


      provider:"google",


      options: {
        redirectTo: `${window.location.origin}/admin`
    }


    });





    if(error){


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

          Welcome Back

        </h2>





        <form onSubmit={handleLogin}>





          <input


            type="email"


            placeholder="Email Address"


            value={email}


            onChange={(e)=>

              setEmail(e.target.value)

            }


            required


          />






          <div className="password-wrapper">



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


              className="password-icon"


              onClick={()=>


                setShowPassword(!showPassword)


              }


            >



              {


                showPassword

                ?

                <FaEyeSlash />

                :

                <FaEye />


              }



            </span>



          </div>






          <Link to="/forgot-password">


            Forgot Password?


          </Link>







          <button


            type="submit"


            disabled={loading}


          >



            {


              loading

              ?

              "Signing in..."

              :

              "Sign In"


            }



          </button>







          <div className="divider">


            OR


          </div>







          <button


            type="button"


            className="google-btn"


            onClick={handleGoogle}


          >



            <FcGoogle size={22}/>



            Continue with Google



          </button>







          {


            error && (


              <p className="error-message">


                {error}


              </p>


            )


          }








          {


            message && (


              <p className="success-message">


                {message}


              </p>


            )


          }








          <p>


            Don't have an account?


            {" "}


            <Link to="/register">


              Create Account


            </Link>


          </p>







        </form>



      </div>



    </div>


  );


}