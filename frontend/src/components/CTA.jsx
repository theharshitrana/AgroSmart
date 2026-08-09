import { Link } from "react-router-dom";

function CTA() {
  return (
    <section
      style={{
        padding: "90px 40px",
        background: "linear-gradient(135deg,#16a34a,#22c55e)",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "48px", marginBottom: "20px" }}>
        Ready to Modernize Your Farm?
      </h1>

      <p
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          lineHeight: "1.8",
          fontSize: "18px",
        }}
      >
        Predict crop yield, optimize irrigation, monitor soil health and make
        smarter farming decisions using Artificial Intelligence.
      </p>

      <div style={{ marginTop: "40px" }}>
        <Link to="/register">
          <button
            style={{
              padding: "15px 35px",
              border: "none",
              borderRadius: "10px",
              marginRight: "20px",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            Get Started
          </button>
        </Link>

        <Link to="/dashboard">
          <button
            style={{
              padding: "15px 35px",
              borderRadius: "10px",
              border: "2px solid white",
              background: "transparent",
              color: "white",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            Explore Dashboard
          </button>
        </Link>
      </div>
    </section>
  );
}

export default CTA;