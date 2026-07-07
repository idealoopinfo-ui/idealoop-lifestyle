import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./Login.css";


export default function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");

  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);


  const navigate = useNavigate();



  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();


    setError("");

    setMessage("");

    setLoading(true);



    const { error } =
      await supabase.auth.signInWithPassword({

        email,

        password,

      });



    setLoading(false);



    if(error){

      setError(
        "Invalid login details"
      );

      return;

    }



    setMessage(
      "Login successful!"
    );


    setTimeout(()=>{

      navigate("/");

    },1200);


  };





  const handleGoogle = async()=>{

    await supabase.auth.signInWithOAuth({

      provider:"google"

    });

  };





  return (

    <div className="auth-container">


      <div className="auth-box">


        <h2>
          Login
        </h2>



        <form
          onSubmit={handleLogin}
          className="auth-form"
        >



          <input

            type="email"

            placeholder="Email"

            value={email}

            onChange={(e)=>
              setEmail(e.target.value)
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
                setPassword(
                  e.target.value
                )
              }


              required

            />



            <span

              onClick={()=>
                setShowPassword(
                  !showPassword
                )
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





          <button

            type="submit"

            className="login-submit-btn"

            disabled={loading}

          >

            {
              loading
              ?
              "Logging in..."
              :
              "Login"
            }


          </button>



        </form>






        {
          error &&
          <p className="error-popup">
            {error}
          </p>
        }



        {
          message &&
          <p className="success-popup">
            {message}
          </p>
        }







        <button

          className="google-btn"

          onClick={handleGoogle}

        >

          <FcGoogle size={22}/>

          Continue with Google


        </button>






        <p>

          <Link to="/forgot-password">

            Forgot Password?

          </Link>

        </p>





        <p>

          Don't have an account?

          {" "}

          <Link to="/register">

            Register
          </Link>
        </p>
      </div>
    </div>

  );

}