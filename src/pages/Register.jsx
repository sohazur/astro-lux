import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, signInWithGoogle } from "../utils/firebaseUtils";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validation
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const { user, error } = await registerUser(email, password);

    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    // Successful registration
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

    // Successful registration/login
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="auth-container fade-in">
      <h2 className="auth-title">Create Your Account</h2>

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

        <div className="form-group">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            disabled={loading}
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          style={{ width: "100%" }}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Register"}
        </button>
      </form>

      <div className="social-login">
        <p>Or register with</p>
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
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
