import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

import { supabase } from "./lib/supabase";

import AdminRoute from "./components/Auth/AdminRoute";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import Maintenance from "./components/Maintenance/Maintenance";

import TopNavbar from "./components/Navbar/TopNavbar";
import NoticePanel from "./components/NoticePanel/NoticePanel";
import CategoryNavbar from "./components/Navbar/CategoryNavbar";

import Wishlist from "./pages/Wishlist/Wishlist";
import Footer from "./components/Footer/Footer";

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


// ======================
// APP
// ======================

export default function App() {

  const [isAdmin, setIsAdmin] = useState(false);

  const [checking, setChecking] = useState(true);

  const [maintenance, setMaintenance] =
    useState<boolean | null>(null);

  const location = useLocation();

  const isDiscover = location.pathname === "/discover";


  // ======================
  // INITIALIZE APP
  // ======================

  useEffect(() => {

    let mounted = true;
  
    const initializeApp = async () => {
  
      try {
  
        // ======================
        // CHECK MAINTENANCE
        // ======================
  
        const {
          data: settings,
          error: settingsError
        } = await supabase
          .from("site_settings")
          .select("maintenance_mode")
          .eq("id", 1)
          .single();
  
        console.log(
          "MAINTENANCE STATUS:",
          settings
        );
  
        if (mounted) {
  
          if (!settingsError && settings) {
  
            setMaintenance(
              settings.maintenance_mode
            );
  
          } else {
  
            setMaintenance(false);
  
          }
  
        }
  
  
        // ======================
        // CHECK USER
        // ======================
  
        const {
          data: {
            user
          }
        } = await supabase.auth.getUser();
  
  
        if (user) {
  
          const {
            data: profile,
            error: profileError
          } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", user.id)
            .maybeSingle();
  
  
          // ======================
          // ADMIN
          // ======================
  
          if (
            mounted &&
            !profileError &&
            profile?.is_admin === true
          ) {
  
            setIsAdmin(true);
  
          }
  
  
          // ======================
          // CREATE PROFILE
          // ======================
  
          if (!profile && !profileError) {
  
            const metadata =
              user.user_metadata || {};
  
            await supabase
              .from("profiles")
              .insert({
  
                id: user.id,
  
                email: user.email,
  
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
  
      } catch (error) {
  
        console.error(
          "APP INITIALIZE ERROR:",
          error
        );
  
        if (mounted) {
          setMaintenance(false);
        }
  
      } finally {
  
        if (mounted) {
          setChecking(false);
        }
  
      }
  
    };
  
  
    initializeApp();
  
  
    // ======================
    // CLEANUP
    // ======================
  
    return () => {
  
      mounted = false;
  
    };
  
  }, []);


  // ======================
  // LOADING
  // ======================

  if (checking) {
    return (
      <div className="app-loading">
        Loading...
      </div>
    );
  }


  // ======================
  // MAINTENANCE
  // ======================

  if (maintenance && !isAdmin) {

    return <Maintenance />;

  }

  return (
    <div className="app-shell">
      <ScrollToTop />
  
      {/* ======================
          TOP NAVIGATION
      ====================== */}
  
      {!isDiscover && <TopNavbar />}
  
  
      {/* ======================
          NOTICE
      ====================== */}
  
      {!isDiscover && <NoticePanel />}
  
  
      {/* ======================
          CATEGORY NAVIGATION
      ====================== */}
  
      {!isDiscover && <CategoryNavbar />}
  
  
     {/* ======================
    MAIN PAGE AREA
====================== */}

<main className="route-container">

<Suspense
  fallback={
    <div className="page-loading">
      Loading...
    </div>
  }
>

  <Routes>
  
              {/* HOME */}
  
              <Route
                path="/"
                element={
                  <PageTransition>
                    <Home />
                  </PageTransition>
                }
              />
  
              {/* HELP */}
  
              <Route
                path="/help"
                element={
                  <PageTransition>
                    <Help />
                  </PageTransition>
                }
              />
  
              {/* ADMIN */}
  
              <Route
                path="/admin"
                element={
                  <AdminRoute>
                    <Admin />
                  </AdminRoute>
                }
              />
  
              {/* WISHLIST */}
  
              <Route
                path="/wishlist"
                element={
                  <PageTransition>
                    <Wishlist />
                  </PageTransition>
                }
              />
  
              {/* AUTH */}
  
              <Route
                path="/login"
                element={<Login />}
              />
  
              <Route
                path="/register"
                element={<Register />}
              />
  
              <Route
                path="/forgot-password"
                element={<ForgotPassword />}
              />
  
              {/* PROFILE */}
  
              <Route
                path="/profile"
                element={<Profile />}
              />
  
              {/* SEARCH */}
  
              <Route
                path="/search"
                element={<SearchPage />}
              />
  
              {/* PRODUCT */}
  
              <Route
                path="/product/:productId"
                element={<ProductDetails />}
              />
  
              {/* CATEGORY */}
  
              <Route
  path="/category/:department"
  element={<CategoryPage />}
/>

<Route
  path="/category/:department/:category"
  element={<CategoryPage />}
/>

<Route
  path="/category/:department/:category/:subcategory"
  element={<CategoryPage />}
/>

<Route
  path="/category/:department/:category/:subcategory/:collection"
  element={<CategoryPage />}
/>

<Route
  path="/category/:department/:category/:subcategory/:collection/:productType"
  element={<CategoryPage />}
/>
  
  
              {/* DISCOVER */}

<Route
  path="/discover"
  element={
    <PageTransition>
      <DiscoverPage />
    </PageTransition>
  }
/>
  
              {/* CLOTHING */}
  
              <Route
                path="/clothing"
                element={<ClothingCategory />}
              />
  
              {/* ABOUT */}
  
              <Route
                path="/about"
                element={<About />}
              />
  
              {/* CONTACT */}
  
              <Route
                path="/contact"
                element={<Contact />}
              />
  
              {/* LEGAL */}
  
              <Route
                path="/privacy"
                element={<Privacy />}
              />
  
              <Route
                path="/terms"
                element={<Terms />}
              />
  
              <Route
                path="/affiliate-disclosure"
                element={<AffiliateDisclosure />}
              />
  
  </Routes>

</Suspense>

</main>
  
  
      {/* ======================
          FOOTER
      ====================== */}
  
      {!isDiscover && <Footer />}
  
    </div>
  );
    }