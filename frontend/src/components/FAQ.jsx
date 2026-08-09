function FAQ() {
  const faqs = [
    "How does AI predict crop yield?",
    "How accurate is the prediction?",
    "Can I optimize irrigation?",
    "Which ML algorithms are used?",
    "Can I download reports?"
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
          color: "#166534",
          fontSize: "40px",
          marginBottom: "40px",
        }}
      >
        Frequently Asked Questions
      </h2>

      {faqs.map((faq, index) => (
        <div
          key={index}
          style={{
            background: "white",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,.08)",
          }}
        >
          <h3>{faq}</h3>
        </div>
      ))}
    </section>
  );
}

export default FAQ;