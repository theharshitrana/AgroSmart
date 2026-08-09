import {
  FaRobot,
  FaLeaf,
  FaChartLine,
  FaCloudSun,
} from "react-icons/fa";

function WhyChoose() {
  const cards = [
    {
      icon: <FaRobot size={45} color="#16a34a" />,
      title: "AI Powered",
      desc: "Machine learning predicts crop yield with high accuracy.",
    },
    {
      icon: <FaLeaf size={45} color="#16a34a" />,
      title: "Smart Farming",
      desc: "Improve productivity through intelligent recommendations.",
    },
    {
      icon: <FaChartLine size={45} color="#16a34a" />,
      title: "Data Analytics",
      desc: "Interactive dashboards help visualize farm performance.",
    },
    {
      icon: <FaCloudSun size={45} color="#16a34a" />,
      title: "Weather Intelligence",
      desc: "Weather information improves decision making.",
    },
  ];

  return (
    <section style={{ padding: "80px" }}>
      <h2
        style={{
          textAlign: "center",
          fontSize: "40px",
          color: "#166534",
          marginBottom: "50px",
        }}
      >
        Why Choose AgroSmart AI?
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "30px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,.08)",
            }}
          >
            {card.icon}
            <h3 style={{ marginTop: "20px" }}>{card.title}</h3>
            <p style={{ marginTop: "15px", color: "#555" }}>
              {card.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default WhyChoose;