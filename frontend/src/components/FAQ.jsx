import { useState } from "react";

function FAQ() {
  const faqs = [
    {
      question: "How does AI predict the suitable crop?",
      answer:
        "AgroSmart uses soil and environmental conditions such as nitrogen, phosphorus, potassium, temperature, humidity, soil pH and rainfall to generate a suitable crop recommendation using its trained machine-learning model.",
    },
    {
      question: "How accurate is the prediction?",
      answer:
        "The percentage shown for a prediction represents the model's confidence for that particular prediction. It should not be considered the overall real-world accuracy of the system.",
    },
    {
      question: "Can I optimize irrigation?",
      answer:
        "Yes. AgroSmart calculates irrigation requirements using crop, temperature, humidity, rainfall, soil moisture, soil type and crop growth stage.",
    },
    {
      question: "Which ML algorithms are used?",
      answer:
        "The current crop recommendation system uses a trained machine-learning model built using the crop recommendation dataset.",
    },
    {
      question: "Can I download reports?",
      answer:
        "Currently, AgroSmart provides prediction history and analytics within the application. Report downloading can be added as a future feature.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      style={{
        padding: "80px 60px",
        background: "#f8fffa",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#166534",
          fontSize: "40px",
          marginBottom: "40px",
        }}
      >
        Frequently Asked Questions
      </h2>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {faqs.map((faq, index) => (
          <div
            key={index}
            style={{
              background: "white",
              marginBottom: "16px",
              borderRadius: "12px",
              boxShadow: "0 5px 15px rgba(0,0,0,.08)",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() =>
                setOpenIndex(
                  openIndex === index ? null : index
                )
              }
              style={{
                width: "100%",
                padding: "22px 25px",
                border: "none",
                background: "white",
                cursor: "pointer",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                textAlign: "left",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              <span>{faq.question}</span>

              <span
                style={{
                  color: "#16a34a",
                  fontSize: "26px",
                }}
              >
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {openIndex === index && (
              <div
                style={{
                  padding: "0 25px 22px",
                  color: "#555",
                  lineHeight: "1.7",
                  fontSize: "16px",
                }}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default FAQ;