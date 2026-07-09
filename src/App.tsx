import { Routes, Route, useLocation } from "react-router-dom";

import { CountryProvider } from "./context/CountryContext";
import AdminRoute from "./components/Auth/AdminRoute";

import TopNavbar from "./components/Navbar/TopNavbar";
import NoticePanel from "./components/NoticePanel/NoticePanel";
import CategoryNavbar from "./components/Navbar/CategoryNavbar";
import Footer from "./components/Footer/Footer";

import {AnimatePresence} from "framer-motion";
import PageTransition from "./components/PageTransition/PageTransition";

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

import "./styles/theme.css";


export default function App(){

const location=useLocation();

const isDiscover=location.pathname.startsWith("/discover");


return(

<CountryProvider>

<div className="app-layout">


<TopNavbar />


{!isDiscover && <NoticePanel />}


{!isDiscover && <CategoryNavbar />}



<main className="app-content">


<AnimatePresence mode="wait">


<Routes location={location} key={location.pathname}>


<Route
path="/"
element={
<PageTransition>
<Home/>
</PageTransition>
}
/>


<Route
path="/admin"
element={
<PageTransition>
<AdminRoute>
<Admin/>
</AdminRoute>
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
path="/product/:slug"
element={
<PageTransition>
<ProductDetails/>
</PageTransition>
}
/>


<Route
path="/category/:category/:subcategory"
element={
<PageTransition>
<CategoryPage/>
</PageTransition>
}
/>


<Route
path="/category/:category"
element={
<PageTransition>
<CategoryPage/>
</PageTransition>
}
/>

<Route
path="/product/:productid"
element={
<PageTransition>
<ProductDetails/>
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



{!isDiscover && <Footer />}


</div>

</CountryProvider>

);

}