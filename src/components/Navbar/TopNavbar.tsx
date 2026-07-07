import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

import CountryButton from "../Country/CountryButton";

import "./TopNavbar.css";


export default function TopNavbar() {


  const [user, setUser] = useState<any>(null);


  const location = useLocation();

  const navigate = useNavigate();



  const isLoggedIn = Boolean(user);



  useEffect(() => {


    const getUser = async () => {

      const {
        data
      } = await supabase.auth.getUser();


      setUser(data.user);

    };


    getUser();



    const {
      data: listener
    } = supabase.auth.onAuthStateChange(
      
      (_event, session) => {

        setUser(
          session?.user ?? null
        );

      }

    );



    return () => {

      listener.subscription.unsubscribe();

    };


  }, []);





  const isDiscover =
    location.pathname.startsWith("/discover");





  const handleToggle = () => {

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


    setUser(null);


    navigate("/");


  };







  return (

    <div className="top-navbar">


      {/* LEFT */}

      <div className="top-left">


        <Link
          to="/"
          className="logo"
        >


          <img

            src="https://lxvoytlpnbzwxplxfnxj.supabase.co/storage/v1/object/public/my/Untitled_design-removebg-preview.png"

            alt="logo"

            className="logo-img"

          />



          <span className="company-name">

            Idealoop Lifestyle Store

          </span>



        </Link>


      </div>






      {/* RIGHT */}

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
              isLoggedIn && (

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

              )
            }






            <CountryButton />







            {
              !isLoggedIn ? (


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



              )

              :



              (

                <div className="profile-dropdown">



                  <div className="profile-btn">


                    <div className="avatar">

                      {
                        user?.user_metadata?.first_name
                        ?
                        user.user_metadata.first_name[0]
                        :
                        "A"
                      }


                    </div>




                    <span>


                      {
                        user?.user_metadata?.first_name
                        ||
                        "User"
                      }

                      ▾


                    </span>


                  </div>







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
                    <button

                      className="logout-btn"

                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>
                  </div>
                </div>

              )

            }
          </>
        )}
      </div>
    </div>
  );
}