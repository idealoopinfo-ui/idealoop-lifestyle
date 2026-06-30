import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";

// Auth
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ForgotPassword";

// Profile
import Profile from "./pages/Profile/Profile";

// Product
import ProductDetails from "./pages/Product/ProductDetails";

// Contact
import Contact from "./pages/Contact/Contact";

// Legal
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import TermsConditions from "./pages/Legal/TermsConditions";
import AffiliateDisclosure from "./pages/Legal/AffiliateDisclosure";
import CookiePolicy from "./pages/Legal/CookiePolicy";
import Disclaimer from "./pages/Legal/Disclaimer";

export default function App() {
  return (
    <Routes>
      {/* Home */}
      <Route path="/" element={<Home />} />

      {/* Admin */}
      <Route path="/admin" element={<Admin />} />

      {/* Authentication */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* User */}
      <Route path="/profile" element={<Profile />} />

      {/* Product */}
      <Route path="/product/:slug" element={<ProductDetails />} />

      {/* Contact */}
      <Route path="/contact" element={<Contact />} />

      {/* Legal */}
      <Route path="/privacy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<TermsConditions />} />
      <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
      <Route path="/cookie-policy" element={<CookiePolicy />} />
      <Route path="/disclaimer" element={<Disclaimer />} />
    </Routes>
  );
}