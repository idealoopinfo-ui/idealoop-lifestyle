import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import DiscoverNavbar from "./components/Navbar/DiscoverNavbar";
import TopNavbar from "./components/Navbar/TopNavbar";
import CategoryNavbar from "./components/Navbar/CategoryNavbar";
import DiscoverPage from "./pages/Discover/DiscoverPage";
import Footer from "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Admin from "./pages/Admin/Admin";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Profile from "./pages/Profile/Profile";
import ProductDetails from "./pages/Product/ProductDetails";
import ProductCard from "./components/ProductCard/ProductCard";
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import Contact from "./pages/Contact/Contact";

import { CountryProvider } from "./context/CountryContext";

import "./styles/theme.css";

export default function App() {
  const location = useLocation();

  return (
    <ThemeProvider>
      <CountryProvider>

        {/* 🔝 NAVBAR SWITCH */}
        {location.pathname.startsWith("/discover") ? (
          <DiscoverNavbar />
        ) : (
          <TopNavbar />
        )}

        {/* 📂 CATEGORY NAVBAR (OPTIONAL: you can hide later on discover too) */}
        <CategoryNavbar />

        {/* 📄 MAIN CONTENT */}
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/product/:slug" element={<ProductDetails />} />

            {/* 🧭 CATEGORY ROUTES */}
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/category/:category/:subcategory" element={<CategoryPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/contact" element={<Contact />} />

            {/* 📌 DISCOVER PAGE */}
            <Route path="/discover" element={<DiscoverPage />} />
          </Routes>
        </main>

        {/* 🔻 FOOTER */}
        <Footer />

      </CountryProvider>
    </ThemeProvider>
  );
}