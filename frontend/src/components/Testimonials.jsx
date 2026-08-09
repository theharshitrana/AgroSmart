function Testimonials() {
  const users = [
    {
      name: "Rahul Sharma",
      role: "Farmer",
      review:
        "AgroSmart AI helped me plan irrigation better and improve productivity.",
    },
    {
      name: "Priya Singh",
      role: "Agricultural Consultant",
      review:
        "The AI recommendations and analytics dashboard are very useful.",
    },
    {
      name: "Amit Patel",
      role: "Farm Owner",
      review:
        "Simple interface with excellent prediction results.",
    },
  ];

  return (
    <section
      style={{
        padding: "80px",
        background: "#f8fffa",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "40px",
          color: "#166534",
          marginBottom: "50px",
        }}
      >
        What Farmers Say
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "30px",
        }}
      >
        {users.map((user, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "18px",
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
            }}
          >
            <h3>{user.name}</h3>
            <small>{user.role}</small>
            <p style={{ marginTop: "20px", lineHeight: "1.8" }}>
              ⭐⭐⭐⭐⭐
              <br />
              {user.review}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;