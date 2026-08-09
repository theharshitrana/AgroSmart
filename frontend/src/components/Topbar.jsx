function Topbar() {
  return (
    <div
      style={{
        background: "white",
        padding: "20px",
        borderRadius: "12px",
        marginBottom: "20px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <h1 style={{ margin: 0 }}>👋 Welcome Back, Harsh</h1>

      <p style={{ color: "#666", marginTop: "8px" }}>
        Here's your farm overview for today.
      </p>
    </div>
  );
}

export default Topbar;
