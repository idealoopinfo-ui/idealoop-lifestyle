import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import "./Login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Invalid login details");
    } else {
      setMessage("Login successful!");
      setTimeout(() => navigate("/"), 1500);
    }
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>Login</h2>

        <form onSubmit={handleLogin} className="auth-form">

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* LOGIN BUTTON */}
          <div className="auth-actions">
            <button type="submit" className="auth-btn">
              Login
            </button>
          </div>

        </form>

        {/* MESSAGES */}
        {error && <div className="error-popup">{error}</div>}
        {message && <div className="success-popup">{message}</div>}

        {/* GOOGLE LOGIN */}
        <button className="google-btn" onClick={handleGoogle}>
          <FaGoogle /> Continue with Google
        </button>

        {/* LINKS */}
        <p>
          <Link to="/forgot-password">Forgot Password?</Link>
        </p>

        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}