import { Routes, Route, useLocation } from "react-router-dom";

import { ThemeProvider } from "./context/ThemeContext";
import { CountryProvider } from "./context/CountryContext";

import NoticePanel from "./components/NoticePanel/NoticePanel";
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
import CategoryPage from "./pages/CategoryPage/CategoryPage";
import Contact from "./pages/Contact/Contact";
import ClothingCategory from "./pages/ClothingCategory/ClothingCategory";
import DiscoverPage from "./pages/Discover/DiscoverPage";
import Privacy from "./pages/Legal/PrivacyPolicy";
import Terms from "./pages/Legal/TermsConditions";
import AffiliateDisclosure from "./pages/Legal/AffiliateDisclosure";

import "./styles/theme.css";

export default function App() {
  const location = useLocation();
  const isDiscover = location.pathname.startsWith("/discover");

  return (
    <ThemeProvider>
      <CountryProvider>
        <div className="app-layout">
        <NoticePanel />

          {/* 🔝 TOP NAVBAR */}
          <TopNavbar />

          {/* 📂 CATEGORY NAVBAR */}
          {!isDiscover && <CategoryNavbar />}

          {/* 📄 MAIN CONTENT */}
          <main className="app-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/product/:slug" element={<ProductDetails />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/category/:category/:subcategory" element={<CategoryPage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/clothing" element={<ClothingCategory />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/affiliate-disclosure" element={<AffiliateDisclosure />} />
            </Routes>
          </main>

          {/* 🔻 FOOTER */}
          {!isDiscover && <Footer />}

        </div>
      </CountryProvider>
    </ThemeProvider>
  );
}