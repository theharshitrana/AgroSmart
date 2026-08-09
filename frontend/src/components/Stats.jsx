import { FaSeedling, FaChartLine, FaTint, FaUsers } from "react-icons/fa";

function Stats() {
  const stats = [
    {
      icon: <FaSeedling size={35} color="#16a34a" />,
      value: "10,000+",
      title: "Agricultural Records",
    },
    {
      icon: <FaChartLine size={35} color="#16a34a" />,
      value: "95%",
      title: "Prediction Accuracy",
    },
    {
      icon: <FaTint size={35} color="#16a34a" />,
      value: "22%",
      title: "Water Saved",
    },
    {
      icon: <FaUsers size={35} color="#16a34a" />,
      value: "500+",
      title: "Farmers Supported",
    },
  ];

  return (
    <section
      style={{
        padding: "80px 60px",
        background: "#ffffff",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          fontSize: "40px",
          marginBottom: "50px",
          color: "#166534",
        }}
      >
        Platform Highlights
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "25px",
        }}
      >
        {stats.map((item, index) => (
          <div
            key={index}
            style={{
              background: "#f0fdf4",
              borderRadius: "16px",
              padding: "30px",
              textAlign: "center",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            {item.icon}

            <h1
              style={{
                marginTop: "20px",
                fontSize: "34px",
                color: "#166534",
              }}
            >
              {item.value}
            </h1>

            <p
              style={{
                marginTop: "10px",
                color: "#555",
              }}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;