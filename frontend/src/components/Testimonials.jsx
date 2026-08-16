function Testimonials() {
  return (
    <section
      style={{
        padding: "80px 60px",
        background: "#f8fffa",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "40px",
          color: "#166534",
          marginBottom: "20px",
        }}
      >
        Built for Smarter Farming
      </h2>

      <p
        style={{
          color: "#555",
          fontSize: "18px",
          marginBottom: "50px",
        }}
      >
        AgroSmart AI combines machine learning, weather data and
        intelligent irrigation to support better farming decisions.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            background: "white",
            padding: "35px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontSize: "40px" }}>🌱</div>

          <h3 style={{ color: "#166534" }}>
            AI Crop Recommendation
          </h3>

          <p style={{ color: "#555", lineHeight: "1.7" }}>
            Get crop recommendations using soil and environmental
            conditions.
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "35px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontSize: "40px" }}>💧</div>

          <h3 style={{ color: "#166534" }}>
            Smart Irrigation
          </h3>

          <p style={{ color: "#555", lineHeight: "1.7" }}>
            Estimate irrigation requirements based on current
            field conditions.
          </p>
        </div>

        <div
          style={{
            background: "white",
            padding: "35px",
            borderRadius: "18px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
          }}
        >
          <div style={{ fontSize: "40px" }}>📊</div>

          <h3 style={{ color: "#166534" }}>
            Data-Driven Insights
          </h3>

          <p style={{ color: "#555", lineHeight: "1.7" }}>
            Analyze prediction history and farming activity
            through the analytics dashboard.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;