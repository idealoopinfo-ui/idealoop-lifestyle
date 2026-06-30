import { Routes, Route } from "react-router-dom";

import TopNavbar from "./components/Navbar/TopNavbar";
import CategoryNavbar from "./components/Navbar/CategoryNavbar";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";

import Profile from "./pages/Profile/Profile";
import ProductDetails from "./pages/Product/ProductDetails";

import Contact from "./pages/Contact/Contact";

export default function App() {
  return (
    <>
      {/* 🔝 GLOBAL NAVBAR */}
      <TopNavbar />

      {/* 📂 CATEGORY NAVBAR */}
      <CategoryNavbar />

      {/* 📄 MAIN CONTENT AREA */}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/profile" element={<Profile />} />
          <Route path="/product/:slug" element={<ProductDetails />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* 🔻 FOOTER */}
      <Footer />
    </>
  );
}