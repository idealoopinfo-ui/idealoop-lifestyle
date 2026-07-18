import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { supabase } from "./lib/supabase";

import { CountryProvider } from "./context/CountryContext";
import AdminRoute from "./components/Auth/AdminRoute";
import Maintenance from "./components/Maintenance/Maintenance";

import TopNavbar from "./components/Navbar/TopNavbar";
import NoticePanel from "./components/NoticePanel/NoticePanel";
import CategoryNavbar from "./components/Navbar/CategoryNavbar";
import Wishlist from "./pages/Wishlist/Wishlist";
import Footer from "./components/Footer/Footer";

import { AnimatePresence } from "framer-motion";
import PageTransition from "./components/PageTransition/PageTransition";

import About from "./pages/About/About";
import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Profile from "./pages/Profile/Profile";
import ProductDetails from "./pages/Product/ProductDetails";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import Contact from "./pages/Contact/Contact";
import ClothingCategory from "./pages/ClothingCategory/ClothingCategory";
import DiscoverPage from "./pages/Discover/DiscoverPage";

import Privacy from "./pages/Legal/PrivacyPolicy";
import Terms from "./pages/Legal/TermsConditions";
import AffiliateDisclosure from "./pages/Legal/AffiliateDisclosure";

import Help from "./pages/Help/Help";

import "./styles/theme.css";

export default function App(){
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  const location = useLocation();
  
  const isDiscover = location.pathname.startsWith("/discover");
  const [maintenance,setMaintenance] = useState<boolean | null>(null);
  
  useEffect(()=>{
  
  
  const checkMaintenance = async()=>{
  
  
  const {data,error}=await supabase
  
  .from("site_settings")
  
  .select("maintenance_mode")
  
  .eq("id",1)
  
  .single();
  
  
  
  console.log(
  "MAINTENANCE STATUS:",
  data
  );
  
  
  
  if(!error && data){

    setMaintenance(data.maintenance_mode);
    
    }else{
    
    setMaintenance(false);
    
    }
  
  
  };
  
  
  checkMaintenance();
  
  
  },[]);

  useEffect(() => {

    const checkAccess = async()=>{
    
    
    // Get maintenance status
    
    const {data: settings} = await supabase
    .from("site_settings")
    .select("maintenance_mode")
    .eq("id",1)
    .single();
    
    
    if(settings?.maintenance_mode){
    
    setMaintenance(true);
    
    }
    
    
    // Check logged user
    
    const {
    data:{
    user
    }
    
    }= await supabase.auth.getUser();
    
    
    
    if(user){
    
      const {data:profile}=await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id",user.id)
      .single();
    
    
    
    if(profile?.is_admin === true){

      setIsAdmin(true);
      
      }
    
    }
    
    
    setChecking(false);
    
    
    };
    
    
    checkAccess();
    
    
    },[]);
  
  
  
  
  useEffect(()=>{
  
  
  const createProfile = async()=>{
  
  
  const {
  data:{
  session
  }
  }=await supabase.auth.getSession();
  
  
  
  const user=session?.user;
  
  
  if(!user) return;
  
  
  
  const {data:profile}=await supabase
  .from("profiles")
  .select("is_admin")
  .eq("id",user.id)
  .single();
  
  
  
  if(!profile){
  
  
  const metadata=user.user_metadata;
  
  
  
  await supabase
  
  .from("profiles")
  
  .insert({
  
  id:user.id,
  
  email:user.email,
  
  first_name:
  metadata.full_name?.split(" ")[0] || "",
  
  
  last_name:
  metadata.full_name?.split(" ").slice(1).join(" ") || "",
  
  
  avatar_url:
  metadata.avatar_url ||
  metadata.picture ||
  null
  
  });
  
  
  }
  
  
  };
  
  
  createProfile();
  
  
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
    
    
    <TopNavbar />
    
    
    {!isDiscover && <NoticePanel />}
    
    
    {!isDiscover && <CategoryNavbar />}
    
    
    
    <main className="app-content">
    
    
    <AnimatePresence
    mode="wait"
    >
    
    
    <Routes
    location={location}
    key={location.pathname}
    >
    
    
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
    
    
    </AnimatePresence>
    
    
    </main>
    
    
    
    <Footer />
    
    
    </div>
    
    
    </CountryProvider>
    
    
    );
    
    }