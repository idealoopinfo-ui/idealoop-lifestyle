import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Reset link sent to ${email}`);
  };

  return (
    <div className="auth-container">

      <h2>Forgot Password</h2>

      <p>Enter your email and we’ll send you a reset link.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit">Send Reset Link</button>
      </form>

      <p>
        Back to <Link to="/login">Login</Link>
      </p>

    </div>
  );
}