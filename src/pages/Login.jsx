import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, signInWithGoogle } from "../utils/firebaseUtils";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!email || !password) {
      setError("Please enter both email and password");
      setLoading(false);
      return;
    }

    const { user, error } = await loginUser(email, password);

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    // Successful login
    setLoading(false);
    navigate("/dashboard");
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setLoading(true);

    const { user, error } = await signInWithGoogle();

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    // Successful login
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="auth-container fade-in">
      <h2 className="auth-title">Login to Your Account</h2>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSubmit} className="auth-form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{ width: "100%" }}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="social-login">
        <p>Or login with</p>
        <button
          onClick={handleGoogleSignIn}
          className="social-btn"
          disabled={loading}
        >
          <span className="social-icon">G</span> Google
        </button>
      </div>

      <div className="auth-switch">
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
