import {
  FaSeedling,
  FaChartLine,
  FaTint,
  FaCloudSun,
} from "react-icons/fa";

function Stats() {
  const stats = [
    {
      icon: <FaSeedling size={35} color="#16a34a" />,
      value: "2,200+",
      title: "Training Samples",
    },
    {
      icon: <FaChartLine size={35} color="#16a34a" />,
      value: "22",
      title: "Crop Classes",
    },
    {
      icon: <FaTint size={35} color="#16a34a" />,
      value: "4",
      title: "Core Modules",
    },
    {
      icon: <FaCloudSun size={35} color="#16a34a" />,
      value: "Live",
      title: "Weather Integration",
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
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "25px",
          maxWidth: "1400px",
          margin: "0 auto",
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
              boxShadow:
                "0 8px 20px rgba(0,0,0,0.08)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform =
                "translateY(-5px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform =
                "translateY(0)";
            }}
          >
            {item.icon}

            <h1
              style={{
                marginTop: "20px",
                fontSize: "34px",
                color: "#166534",
                marginBottom: "10px",
              }}
            >
              {item.value}
            </h1>

            <p
              style={{
                margin: 0,
                color: "#555",
                fontSize: "16px",
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