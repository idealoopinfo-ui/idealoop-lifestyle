import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./Register.css";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    const user = data.user;

    if (user) {
      await supabase.from("profiles").insert([
        {
          id: user.id,
          email: user.email,
          first_name: firstName,
          last_name: lastName,
        },
      ]);
    }

    setMessage("Account created successfully!");
    setTimeout(() => navigate("/"), 1200);
  };

  const handleGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  };

  // ✅ Multicolor Google Icon
  const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.9-6.9C35.98 2.69 30.36 0 24 0 14.62 0 6.51 5.38 2.56 13.22l8.05 6.26C12.44 13.13 17.77 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.14-3.08-.4-4.55H24v9.1h12.94c-.56 3-2.24 5.54-4.78 7.25l7.34 5.7C43.98 37.15 46.98 31.37 46.98 24.55z"/>
      <path fill="#FBBC05" d="M10.61 28.48a14.5 14.5 0 010-8.96L2.56 13.22A24 24 0 000 24c0 3.84.92 7.45 2.56 10.78l8.05-6.3z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.91-5.8l-7.34-5.7c-2.04 1.37-4.65 2.2-8.57 2.2-6.23 0-11.56-3.63-13.39-8.85l-8.05 6.3C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );

  return (
    <div className="auth-container">
      <div className="auth-box">

        <h2>Create Account</h2>

        <form className="auth-form" onSubmit={handleRegister}>
          <input
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <input
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

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
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="password-box">
            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <button className="auth-btn" disabled={loading} type="submit">
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        {/* GOOGLE LOGIN */}
        <button className="google-btn" onClick={handleGoogle}>
          <GoogleIcon />
          Continue with Google
        </button>

        {/* MESSAGES */}
        {error && <div className="error-popup">{error}</div>}
        {message && <div className="success-popup">{message}</div>}

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}