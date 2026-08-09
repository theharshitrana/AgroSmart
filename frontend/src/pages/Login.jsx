import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    // Basic validation
    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            data.message ||
            "Login failed. Please check your credentials."
        );
      }

      // Make sure backend actually returned a token
      if (!data.token) {
        throw new Error(
          "Login succeeded but no authentication token was returned."
        );
      }

      // Save JWT
      localStorage.setItem("token", data.token);

      // Save user information
      if (data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      // Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.message ||
          "Unable to connect to the server."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* =========================================
          LEFT SIDE
      ========================================= */}

      <div className="auth-brand">

        <Link
          to="/"
          className="auth-logo"
        >
          🌱 AgroSmart AI
        </Link>

        <div className="auth-brand-content">

          <span className="auth-badge">
            🌾 Smart Agriculture Platform
          </span>

          <h1>
            Grow smarter.
            <br />
            Farm better.
          </h1>

          <p>
            Use AI-powered crop prediction,
            weather intelligence, and irrigation
            recommendations to make better
            farming decisions.
          </p>

          <div className="auth-features">

            <div>
              ✓ AI Crop Prediction
            </div>

            <div>
              ✓ Smart Irrigation
            </div>

            <div>
              ✓ Real-time Weather
            </div>

          </div>

        </div>

      </div>


      {/* =========================================
          RIGHT SIDE
      ========================================= */}

      <div className="auth-form-section">

        <div className="auth-card">

          <div className="auth-card-header">

            <div className="auth-icon">
              🔐
            </div>

            <h2>
              Welcome back
            </h2>

            <p>
              Sign in to continue to your
              AgroSmart dashboard.
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="auth-error">
              ⚠️ {error}
            </div>
          )}


          {/* LOGIN FORM */}

          <form onSubmit={handleLogin}>

            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
              />

            </div>


            {/* PASSWORD */}

            <div className="form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="password-wrapper">

                <input
                  id="password"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword
                    ? "🙈"
                    : "👁️"}
                </button>

              </div>

            </div>


            {/* SUBMIT */}

            <button
              type="submit"
              className="auth-submit"
              disabled={loading}
            >
              {loading
                ? "Signing in..."
                : "Sign In →"}
            </button>

          </form>


          {/* REGISTER */}

          <div className="auth-divider">
            <span>
              New to AgroSmart?
            </span>
          </div>

          <Link
            to="/register"
            className="auth-register-link"
          >
            Create an account
          </Link>


          {/* HOME */}

          <Link
            to="/"
            className="back-home"
          >
            ← Back to home
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Login;