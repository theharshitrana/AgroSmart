import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";

function Hero() {
  return (
    <section
      style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "70px",
        background: "linear-gradient(135deg,#F0FFF4,#DCFCE7)"
      }}
    >
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{ width: "50%" }}
      >
        <h1
          style={{
            fontSize: "60px",
            color: "#166534",
            fontWeight: "bold"
          }}
        >
          AI Powered
          <br />
          Smart Agriculture
        </h1>

        <p
          style={{
            marginTop: "20px",
            fontSize: "20px",
            color: "#555",
            lineHeight: "1.8"
          }}
        >
          Predict crop yield, optimize irrigation, analyze soil
          and help farmers make smarter decisions using AI.
        </p>

        <div
          style={{
            marginTop: "40px",
            display: "flex",
            gap: "20px"
          }}
        >
          <button
            style={{
              padding: "15px 35px",
              background: "#16a34a",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "18px"
            }}
          >
            Get Started
          </button>

          <button
            style={{
              padding: "15px 35px",
              background: "white",
              border: "2px solid #16a34a",
              color: "#16a34a",
              borderRadius: "12px",
              cursor: "pointer",
              fontSize: "18px"
            }}
          >
            Learn More <FaArrowRight />
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <img
          src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800"
          alt="Agriculture"
          style={{
            width: "550px",
            borderRadius: "20px",
            boxShadow: "0 20px 40px rgba(0,0,0,.2)"
          }}
        />
      </motion.div>
    </section>
  );
}

export default Hero;