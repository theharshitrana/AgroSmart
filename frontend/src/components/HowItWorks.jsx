import { FaDatabase, FaBrain, FaProjectDiagram, FaChartLine } from "react-icons/fa";

function HowItWorks() {
  const steps = [
    {
      icon: <FaDatabase size={45} color="#16a34a" />,
      title: "Collect Farm Data",
      description:
        "Enter soil nutrients, weather conditions, and crop information.",
    },
    {
      icon: <FaBrain size={45} color="#16a34a" />,
      title: "AI Processing",
      description:
        "Machine learning models analyze the data to predict crop yield.",
    },
    {
      icon: <FaProjectDiagram size={45} color="#16a34a" />,
      title: "Optimize Irrigation",
      description:
        "Graph algorithms generate the most efficient irrigation network.",
    },
    {
      icon: <FaChartLine size={45} color="#16a34a" />,
      title: "View Analytics",
      description:
        "Interactive dashboard provides insights and recommendations.",
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
          color: "#166534",
          marginBottom: "15px",
        }}
      >
        How AgroSmart Works
      </h2>

      <p
        style={{
          textAlign: "center",
          color: "#666",
          marginBottom: "50px",
        }}
      >
        Four simple steps to intelligent farming.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
          gap: "30px",
        }}
      >
        {steps.map((step, index) => (
          <div
            key={index}
            style={{
              background: "#f8fffa",
              borderRadius: "18px",
              padding: "30px",
              textAlign: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
            }}
          >
            {step.icon}

            <h3
              style={{
                marginTop: "20px",
                color: "#166534",
              }}
            >
              {step.title}
            </h3>

            <p
              style={{
                marginTop: "15px",
                color: "#555",
                lineHeight: "1.7",
              }}
            >
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;