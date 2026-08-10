import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n/config";

import "./TopNavbar.css";

export default function TopNavbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user } = useAuth();

  const profileRef = useRef<HTMLDivElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const { t } = useTranslation();

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user.id)
        .single();

      if (error) {
        console.log(
          "Admin check error:",
          error.message
        );

        setIsAdmin(false);
        return;
      }

      setIsAdmin(profile?.is_admin === true);
    };

    checkAdmin();
  }, [user]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  const isDiscover =
    location.pathname.startsWith("/discover");

  const handleToggle = () => {
    navigate(
      isDiscover
        ? "/"
        : "/discover"
    );
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();

    setProfileOpen(false);

    navigate("/");
  };

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);

    localStorage.setItem(
      "idealoop-language",
      language
    );
  };

  return (
    <nav className="top-navbar">

      {/* LEFT LOGO */}

      <div className="top-left">

        <Link
          to="/"
          className="logo"
        >

          <img
            src="https://lxvoytlpnbzwxplxfnxj.supabase.co/storage/v1/object/public/my/Untitled_design-removebg-preview.png"
            alt="Idealoop"
            className="logo-img"
          />

          <span className="company-name">
            Idealoop Lifestyle Store
          </span>

        </Link>

      </div>


      {/* CENTER SEARCH */}

      <div className="top-center">

        {/* Keep your existing SearchBar here */}

      </div>
      
{/* RIGHT AREA */}

<div className="top-right">

  {/* LANGUAGE SELECTOR */}

  <div className="language-selector">

    <select
      value={i18n.language}
      onChange={(e) =>
        changeLanguage(e.target.value)
      }
      aria-label={t("common.language")}
    >

      <option value="en">
        English
      </option>

      <option value="es">
        Español
      </option>

      <option value="de">
        Deutsch
      </option>

      <option value="fr">
        Français
      </option>

      <option value="hi">
        हिन्दी
      </option>

    </select>

  </div>


  {/* DISCOVER / HOME */}

  <button
    type="button"
    className="nav-toggle-btn"
    onClick={handleToggle}
  >

    {isDiscover
      ? t("nav.home")
      : t("nav.discover")
    }

  </button>


  {/* WISHLIST */}

  {user && (

    <Link
      to="/wishlist"
      className="nav-btn"
    >

      ❤️ {t("nav.wishlist")}

    </Link>

  )}


  {/* LOGIN / REGISTER */}

  {!user ? (

    <div className="auth-group">

      <Link
        to="/login"
        className="auth-btn"
      >
        {t("nav.login")}
      </Link>

      <Link
        to="/register"
        className="auth-btn"
      >
        {t("nav.register")}
      </Link>

    </div>

  ) : (

    /* PROFILE */

    <div
      className="profile-dropdown"
      ref={profileRef}
    >

      <button
        type="button"
        className="profile-btn"
        onClick={() =>
          setProfileOpen(!profileOpen)
        }
      >

        <span className="avatar">

          {user?.user_metadata?.first_name
            ? user.user_metadata.first_name
                .charAt(0)
                .toUpperCase()
            : "A"
          }

        </span>

        <span>
          {user?.user_metadata?.first_name ||
            t("nav.profile")
          }
        </span>

        <span>
          ⌄
        </span>

      </button>


      {profileOpen && (

        <div className="profile-menu">

          <Link
            to="/profile"
            className="menu-item"
            onClick={() =>
              setProfileOpen(false)
            }
          >
            👤 {t("nav.profile")}
          </Link>


          <Link
            to="/wishlist"
            className="menu-item"
            onClick={() =>
              setProfileOpen(false)
            }
          >
            ❤️ {t("nav.wishlist")}
          </Link>


          {isAdmin && (

            <Link
              to="/admin"
              className="menu-item"
              onClick={() =>
                setProfileOpen(false)
              }
            >
              ⚙️ Admin Dashboard
            </Link>

          )}


          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
          >
            🚪 {t("nav.logout")}
          </button>

        </div>

      )}

    </div>

  )}

</div>


    </nav>
  );
}
