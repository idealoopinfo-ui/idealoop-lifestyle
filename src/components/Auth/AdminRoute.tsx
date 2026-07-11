import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";


interface AdminRouteProps {
  children: React.ReactNode;
}


export default function AdminRoute({
  children
}: AdminRouteProps) {


  const [loading,setLoading] = useState(true);

  const [isAdmin,setIsAdmin] = useState(false);



  useEffect(()=>{


    const checkAdmin = async()=>{


      try {


        const {
          data:{
            user
          }

        } = await supabase.auth.getUser();



        if(!user){

          setIsAdmin(false);

          setLoading(false);

          return;

        }




        const {
          data:profile,
          error

        } = await supabase


        .from("profiles")


        .select("is_admin")


        .eq("id",user.id)


        .single();




        if(error){

          console.log(
            "ADMIN PROFILE ERROR:",
            error
          );

        }



        console.log(
            "ADMIN CHECK:",
            profile?.is_admin,
            profile
          );



        if(profile?.is_admin === true){

          setIsAdmin(true);

        }
        else{

          setIsAdmin(false);

        }



      }

      catch(error){


        console.log(
          "ADMIN CHECK ERROR:",
          error
        );


        setIsAdmin(false);


      }


      finally{


        setLoading(false);


      }


    };



    checkAdmin();



  },[]);






  if(loading){


    return (

      <div className="admin-loading">

        Checking access...

      </div>

    );


  }






  if(!isAdmin){


    return (

      <Navigate 
        to="/" 
        replace 
      />

    );


  }






  return (

    <>

      {children}

    </>

  );


}