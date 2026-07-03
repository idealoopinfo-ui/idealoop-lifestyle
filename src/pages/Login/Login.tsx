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

  const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.3 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.6 13.09 17.77 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.64-.15-3.21-.42-4.73H24v9.24h12.94c-.56 2.99-2.24 5.52-4.77 7.22l7.34 5.7C43.98 37.12 46.98 31.35 46.98 24.55z"/>
      <path fill="#FBBC05" d="M10.54 28.42a14.5 14.5 0 0 1 0-9.24l-7.98-6.2A23.99 24 0 0 0 0 24c0 3.84.92 7.47 2.56 10.22l7.98-5.8z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.94-2.13 15.92-5.8l-7.34-5.7c-2.04 1.37-4.64 2.18-8.58 2.18-6.23 0-11.4-3.59-13.46-8.86l-7.98 5.8C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );

  return (
    <div>
      {/* your UI */}
      
      <button className="google-btn">
        <GoogleIcon />
        Continue with Google
      </button>
    </div>
  );

  return (
    <div className="auth-container">
      <div className="auth-box">
  
        <h2>Login</h2>
  
        <form onSubmit={handleLogin} className="auth-form">
  
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
  
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
  
            <span onClick={() => setShowPassword(!showPassword)}>
              👁
            </span>
          </div>
  
          <div className="auth-actions">
            <button className="auth-btn" type="submit">
              Login
            </button>
          </div>
  
        </form>
  
        {/* Google */}
        <button className="google-btn" onClick={handleGoogle}>
          Continue with Google
        </button>
  
        {error && <div className="error-popup">{error}</div>}
        {message && <div className="success-popup">{message}</div>}
  
        <p>
          <Link to="/register">Create account</Link>
        </p>
  
      </div>
    </div>
  );
}