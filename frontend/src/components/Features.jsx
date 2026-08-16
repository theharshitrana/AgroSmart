import {
  FaSeedling,
  FaTint,
  FaChartBar,
  FaRobot,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaSeedling size={40} color="#16a34a" />,
      title: "Crop Yield Prediction",
      desc: "Predict crop production using AI based on weather, soil and farm conditions.",
    },
    {
      icon: <FaTint size={40} color="#16a34a" />,
      title: "Smart Irrigation",
      desc: "Optimize irrigation using graph algorithms to reduce water usage and cost.",
    },
    {
      icon: <FaRobot size={40} color="#16a34a" />,
      title: "AI Recommendations",
      desc: "Receive intelligent farming suggestions powered by machine learning.",
    },
    {
      icon: <FaChartBar size={40} color="#16a34a" />,
      title: "Analytics Dashboard",
      desc: "Visualize crop performance, weather insights and prediction history.",
    },
  ];

  return (
    <section
    id="features"
   style={{
    padding: "80px 60px",
    background: "#f8fffa",
   }}
      >
    {">"}
      <h2
        style={{
          textAlign: "center",
          fontSize: "40px",
          color: "#166534",
          marginBottom: "20px",
        }}
      >
        Core Features
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#555",
          marginBottom: "50px",
          fontSize: "18px",
        }}
      >
        Everything you need for intelligent agriculture in one platform.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
          gap: "30px",
        }}
      >
        {features.map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              padding: "30px",
              borderRadius: "18px",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
              transition: "0.3s",
            }}
          >
            {item.icon}

            <h3
              style={{
                marginTop: "20px",
                color: "#166534",
              }}
            >
              {item.title}
            </h3>

            <p
              style={{
                marginTop: "15px",
                color: "#555",
                lineHeight: "1.7",
              }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;