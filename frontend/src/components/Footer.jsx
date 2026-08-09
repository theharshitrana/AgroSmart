import { Link } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaLeaf,
} from "react-icons/fa";

function Footer() {
  return (
    <footer
      style={{
        background: "#14532d",
        color: "white",
        padding: "60px 50px 20px",
        marginTop: "60px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr",
          gap: "40px",
        }}
      >
        {/* Brand */}
        <div>
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <FaLeaf />
            AgroSmart AI
          </h2>

          <p
            style={{
              marginTop: "20px",
              lineHeight: "1.8",
              color: "#d1fae5",
            }}
          >
            AI-powered agriculture platform for crop yield prediction,
            irrigation optimization, soil analysis, and smart farming
            analytics.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3>Quick Links</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              marginTop: "20px",
            }}
          >
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              Home
            </Link>

            <Link
              to="/dashboard"
              style={{ color: "white", textDecoration: "none" }}
            >
              Dashboard
            </Link>

            <Link
              to="/crop-prediction"
              style={{ color: "white", textDecoration: "none" }}
            >
              Prediction
            </Link>

            <Link
              to="/analytics"
              style={{ color: "white", textDecoration: "none" }}
            >
              Analytics
            </Link>
          </div>
        </div>

        {/* Contact */}
        <div>
          <h3>Connect</h3>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <a
              href="https://github.com/Harsh587-star"
              target="_blank"
              rel="noreferrer"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              <FaGithub /> GitHub
            </a>

            <a
              href="#"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              <FaLinkedin /> LinkedIn
            </a>

            <a
              href="mailto:your@email.com"
              style={{
                color: "white",
                textDecoration: "none",
              }}
            >
              <FaEnvelope /> Email
            </a>
          </div>
        </div>
      </div>

      <hr
        style={{
          margin: "40px 0 20px",
          border: "1px solid rgba(255,255,255,0.2)",
        }}
      />

      <p
        style={{
          textAlign: "center",
          color: "#d1fae5",
        }}
      >
        © 2026 AgroSmart AI. All Rights Reserved.
      </p>
    </footer>
  );
}

export default Footer;