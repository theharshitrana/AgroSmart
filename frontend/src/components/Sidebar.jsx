import { Link } from "react-router-dom";
import {
  FaHome,
  FaSeedling,
  FaTint,
  FaChartBar,
  FaUser,
} from "react-icons/fa";

function Sidebar() {
  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        background: "#166534",
        color: "white",
        padding: "30px",
      }}
    >
      <h2 style={{ marginBottom: "40px" }}>🌿 AgroSmart AI</h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <Link to="/dashboard" style={{ color: "white" }}>
          <FaHome /> Dashboard
        </Link>

        <Link to="/crop-prediction" style={{ color: "white" }}>
          <FaSeedling /> Crop Prediction
        </Link>

        <Link to="/irrigation" style={{ color: "white" }}>
          <FaTint /> Irrigation
        </Link>

        <Link to="/analytics" style={{ color: "white" }}>
          <FaChartBar /> Analytics
        </Link>

        <Link to="/profile" style={{ color: "white" }}>
          <FaUser /> Profile
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;