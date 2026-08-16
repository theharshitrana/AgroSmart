import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Logo */}
        <Link to="/" className="navbar-logo">
          🌱 AgroSmart AI
        </Link>

        {/* Navigation */}
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/prediction">Prediction</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/weather">Weather</Link>
        </div>

        {/* Auth Buttons */}
        <div className="navbar-actions">
          <Link to="/login" className="login-button">
            Login
          </Link>

          <Link to="/register" className="register-button">
            Register
          </Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;