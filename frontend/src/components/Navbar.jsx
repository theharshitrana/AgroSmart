import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        🌱 AgroSmart AI
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/prediction">Prediction</Link>
        <Link to="/analytics">Analytics</Link>
      </div>

      <div className="auth-buttons">
        <Link to="/login" className="login-button">
          Login
        </Link>

        <Link to="/register" className="register-button">
          Register
        </Link>
      </div>

    </nav>
  );
}

export default Navbar;