import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Validation
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (fullName.trim().length < 2) {
      setError("Please enter a valid full name.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: fullName.trim(),
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Registration failed."
        );
      }

      setSuccess(
        data.message || "Account created successfully!"
      );

      // Clear form
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      // Redirect to login after short delay
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      {/* LEFT SIDE */}
      <div className="auth-brand">

        <Link to="/" className="auth-logo">
          🌱 AgroSmart AI
        </Link>

        <div className="auth-brand-content">

          <span className="auth-badge">
            🌾 Smart Agriculture Platform
          </span>

          <h1>
            Start growing
            <br />
            smarter.
          </h1>

          <p>
            Create your AgroSmart account and get access to
            AI-powered crop prediction, weather intelligence,
            smart irrigation, and farming insights.
          </p>

          <div className="auth-features">
            <div>✓ AI Crop Prediction</div>
            <div>✓ Smart Irrigation Recommendations</div>
            <div>✓ Real-time Weather Intelligence</div>
            <div>✓ Personal Farming Dashboard</div>
          </div>

        </div>

      </div>


      {/* RIGHT SIDE */}
      <div className="auth-form-section">

        <div className="auth-card">

          <div className="auth-card-header">

            <div className="auth-icon">
              🌱
            </div>

            <h2>
              Create your account
            </h2>

            <p>
              Join AgroSmart and start making smarter
              farming decisions.
            </p>

          </div>


          {/* ERROR */}

          {error && (
            <div className="auth-error">
              ⚠️ {error}
            </div>
          )}


          {/* SUCCESS */}

          {success && (
            <div className="auth-success">
              ✓ {success}
            </div>
          )}


          <form onSubmit={handleRegister}>

            {/* FULL NAME */}

            <div className="form-group">

              <label htmlFor="fullName">
                Full name
              </label>

              <input
                id="fullName"
                type="text"
                placeholder="Harsh Kumar"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                autoComplete="name"
              />

            </div>


            {/* EMAIL */}

            <div className="form-group">

              <label htmlFor="registerEmail">
                Email address
              </label>

              <input
                id="registerEmail"
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

              <label htmlFor="registerPassword">
                Password
              </label>

              <div className="password-wrapper">

                <input
                  id="registerPassword"
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>

              </div>

            </div>


            {/* CONFIRM PASSWORD */}

            <div className="form-group">

              <label htmlFor="confirmPassword">
                Confirm password
              </label>

              <div className="password-wrapper">

                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword
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
                ? "Creating account..."
                : "Create Account →"}
            </button>

          </form>


          {/* LOGIN */}

          <div className="auth-divider">
            Already have an account?
          </div>

          <Link
            to="/login"
            className="auth-register-link"
          >
            Sign in to your account
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

export default Register;