import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

import { supabase } from "./lib/supabase";

import { CountryProvider } from "./context/CountryContext";

import AdminRoute from "./components/Auth/AdminRoute";
import Maintenance from "./components/Maintenance/Maintenance";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import TopNavbar from "./components/Navbar/TopNavbar";
import NoticePanel from "./components/NoticePanel/NoticePanel";
import CategoryNavbar from "./components/Navbar/CategoryNavbar";

import Wishlist from "./pages/Wishlist/Wishlist";
import Footer from "./components/Footer/Footer";

import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition/PageTransition";

import "./styles/theme.css";



// ======================
// LAZY LOADED PAGES
// ======================


const Home = lazy(() =>
  import("./pages/Home/Home")
);

const Admin = lazy(() =>
  import("./pages/Admin/Admin")
);

const Login = lazy(() =>
  import("./pages/Login/Login")
);

const Register = lazy(() =>
  import("./pages/Register/Register")
);

const ForgotPassword = lazy(() =>
  import("./pages/ForgotPassword/ForgotPassword")
);

const Profile = lazy(() =>
  import("./pages/Profile/Profile")
);

const SearchPage = lazy(() =>
  import("./pages/Search/SearchPage")
);

const ProductDetails = lazy(() =>
  import("./pages/Product/ProductDetails")
);

const CategoryPage = lazy(() =>
  import("./pages/CategoryPage/CategoryPage")
);

const Contact = lazy(() =>
  import("./pages/Contact/Contact")
);

const ClothingCategory = lazy(() =>
  import("./pages/ClothingCategory/ClothingCategory")
);

const DiscoverPage = lazy(() =>
  import("./pages/Discover/DiscoverPage")
);

const About = lazy(() =>
  import("./pages/About/About")
);

const Privacy = lazy(() =>
  import("./pages/Legal/PrivacyPolicy")
);

const Terms = lazy(() =>
  import("./pages/Legal/TermsConditions")
);

const AffiliateDisclosure = lazy(() =>
  import("./pages/Legal/AffiliateDisclosure")
);

const Help = lazy(() =>
  import("./pages/Help/Help")
);





export default function App(){


const [isAdmin,setIsAdmin] = useState(false);

const [checking,setChecking] = useState(true);

const [maintenance,setMaintenance] =
useState<boolean | null>(null);



const location = useLocation();


const isDiscover =
location.pathname.startsWith("/discover");





useEffect(()=>{


const initializeApp = async()=>{


try{


// ======================
// CHECK MAINTENANCE
// ======================


const {
data:settings,
error
}= await supabase

.from("site_settings")

.select("maintenance_mode")

.eq("id",1)

.single();



console.log(
"MAINTENANCE STATUS:",
settings
);



if(!error && settings){

setMaintenance(
settings.maintenance_mode
);

}
else{

setMaintenance(false);

}





// ======================
// CHECK USER
// ======================


const {
data:{
user
}

}= await supabase.auth.getUser();




if(user){



const {
data:profile
}= await supabase

.from("profiles")

.select("is_admin")

.eq("id",user.id)

.single();





if(profile?.is_admin === true){

setIsAdmin(true);

}





// ======================
// CREATE PROFILE
// ======================


if(!profile){



const metadata =
user.user_metadata || {};



await supabase

.from("profiles")

.insert({

id:user.id,

email:user.email,


first_name:
metadata.full_name
?.split(" ")[0] || "",


last_name:
metadata.full_name
?.split(" ")
.slice(1)
.join(" ") || "",


avatar_url:
metadata.avatar_url ||
metadata.picture ||
null


});


}



}




}

catch(error){


console.log(
"APP INITIALIZE ERROR:",
error
);


setMaintenance(false);


}


finally{


setChecking(false);


}



};



initializeApp();



},[]);





if(checking){

return null;

}



if(maintenance && !isAdmin){

return <Maintenance />;

}
return(

  <CountryProvider>
  
  
  <div className="app-layout">
  
  
  <ScrollToTop />
  
  
  <TopNavbar />
  
  
  
  {!isDiscover && <NoticePanel />}
  
  
  
  {!isDiscover && <CategoryNavbar />}
  
  
  
  
  
  <main className="app-content">
  
  
  <AnimatePresence
  mode="wait"
  >
  
  
  
  <Suspense
  
  fallback={
  
  <div className="page-loading">
  
  Loading...
  
  </div>
  
  }
  
  >
  
  
  <Routes>
  
  
  
  <Route
  
  path="/"
  
  element={
  
  <PageTransition>
  
  <Home/>
  
  </PageTransition>
  
  }
  
  />
  
  
  
  
  <Route
  
  path="/help"
  
  element={
  
  <PageTransition>
  
  <Help/>
  
  </PageTransition>
  
  }
  
  />
  
  
  
  
  
  <Route
  
  path="/admin"
  
  element={
  
  <AdminRoute>
  
  <PageTransition>
  
  <Admin/>
  
  </PageTransition>
  
  </AdminRoute>
  
  }
  
  />
  
  
  
  
  
  <Route
  
  path="/wishlist"
  
  element={
  
  <PageTransition>
  
  <Wishlist/>
  
  </PageTransition>
  
  }
  
  />
  
  
  
  
  
  <Route
  
  path="/login"
  
  element={
  
  <PageTransition>
  
  <Login/>
  
  </PageTransition>
  
  }
  
  />
  
  
  
  
  
  <Route
  
  path="/register"
  
  element={
  
  <PageTransition>
  
  <Register/>
  
  </PageTransition>
  
  }
  
  />
  
  
  
  
  
  <Route
  
  path="/forgot-password"
  
  element={
  
  <PageTransition>
  
  <ForgotPassword/>
  
  </PageTransition>
  
  }
  
  />
  
  
  
  
  
  <Route
  
  path="/profile"
  
  element={
  
  <PageTransition>
  
  <Profile/>
  
  </PageTransition>
  
  }
  
  />
  
  
  <Route

path="/search"

element={

<PageTransition>

<SearchPage/>

</PageTransition>

}

/>
  
  
  <Route
  
  path="/product/:productId"
  
  element={
  
  <PageTransition>
  
  <ProductDetails/>
  
  </PageTransition>
  
  }
  
  />
  
  
  
  
  
  <Route
  
  path="/category/:department/:category?/:subcategory?"
  
  element={
  
  <PageTransition>
  
  <CategoryPage/>
  
  </PageTransition>
  
  }
  
  />
  
  
  
  
  
  <Route
  
  path="/discover"
  
  element={
  
  <PageTransition>
  
  <DiscoverPage/>
  
  </PageTransition>
  
  }
  
  />
  
  
  
  
  
  <Route
  
  path="/clothing"
  
  element={
  
  <PageTransition>
  
  <ClothingCategory/>
  
  </PageTransition>
  
  }
  
  />
  
  
  
  
  
  <Route
  
  path="/about"
  
  element={
  
  <PageTransition>
  
  <About/>
  
  </PageTransition>
  
  }
  
  />
  
  
  
  
  
  <Route
  
  path="/contact"
  
  element={
  
  <PageTransition>
  
  <Contact/>
  
  </PageTransition>
  
  }
  
  />
  
  
  
  
  
  <Route
  
  path="/privacy"
  
  element={
  
  <PageTransition>
  
  <Privacy/>
  
  </PageTransition>
  
  }
  
  />
  
  
  
  
  
  <Route
  
  path="/terms"
  
  element={
  
  <PageTransition>
  
  <Terms/>
  
  </PageTransition>
  
  }
  
  />
  
  
  
  
  
  <Route
  
  path="/affiliate-disclosure"
  
  element={
  
  <PageTransition>
  
  <AffiliateDisclosure/>
  
  </PageTransition>
  
  }
  
  />
  
  
  
  
  
  </Routes>
  
  
  </Suspense>
  
  
  
  </AnimatePresence>
  
  
  
  </main>
  <Footer />


</div>


</CountryProvider>


);

}