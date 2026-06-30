import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle } from "react-icons/fa";
import "./Register.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage("Account created successfully!");
      setTimeout(() => navigate("/login"), 2000);
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
        <h2>Create Account</h2>

        <form onSubmit={handleRegister}>
          <input placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
          <input placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />

          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button type="submit">Register</button>
        </form>

        {error && <div className="error-popup">{error}</div>}
        {message && <div className="success-popup">{message}</div>}

        <button className="google-btn">
  <span className="google-icon">
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.69 30.3 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.2C12.43 13.13 17.73 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.1 24.55c0-1.57-.14-3.09-.4-4.55H24v9.02h12.34c-.53 2.84-2.18 5.23-4.63 6.84l7.19 5.6C43.98 37.18 46.1 31.35 46.1 24.55z"/>
      <path fill="#FBBC05" d="M10.54 28.42c-.48-1.43-.76-2.95-.76-4.52s.28-3.09.76-4.52l-7.98-6.2C.86 16.18 0 20.01 0 24s.86 7.82 2.56 11.22l7.98-6.8z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.15 15.91-5.86l-7.19-5.6c-2 1.35-4.59 2.16-8.72 2.16-6.27 0-11.57-3.63-13.46-8.82l-7.98 6.2C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  </span>
  Continue with Google
</button>

        <p>
          Already have account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}