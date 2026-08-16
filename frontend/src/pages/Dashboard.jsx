import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    fetchDashboard();
  }, [token, navigate]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "http://127.0.0.1:5000/api/dashboard",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return;
        }

        throw new Error(
          data.error || "Unable to load dashboard."
        );
      }

      setDashboard(data);
    } catch (err) {
      console.error("Dashboard error:", err);
      setError(
        err.message || "Unable to connect to the server."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error-page">
        <div className="dashboard-error-card">
          <div className="dashboard-error-icon">
            ⚠️
          </div>

          <h2>Unable to load dashboard</h2>

          <p>{error}</p>

          <button
            className="dashboard-primary-button"
            onClick={fetchDashboard}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const statistics = dashboard?.statistics || {};
  const recentPredictions =
    dashboard?.recent_predictions || [];

  return (
    <><div className="dashboard-page">

      {/* =========================================
        HEADER
    ========================================= */}

      <header className="dashboard-header">

        <div>
          <span className="dashboard-eyebrow">
            🌱 AgroSmart AI
          </span>

          <h1>
            Welcome back{user?.full_name
              ? `, ${user.full_name}`
              : ""}
          </h1>

          <p>
            Here's an overview of your smart
            agriculture activity.
          </p>
        </div>

        <div className="dashboard-header-actions">

          <Link
            to="/prediction"
            className="dashboard-primary-button"
          >
            + New Prediction
          </Link>

          <button
            className="dashboard-logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>


      {/* =========================================
        STATISTICS
    ========================================= */}

      <section className="dashboard-stats">

        <div className="dashboard-stat-card">

          <div className="stat-icon">
            🌾
          </div>

          <div>
            <span className="stat-label">
              Total Predictions
            </span>

            <strong>
              {statistics.total_predictions ?? 0}
            </strong>
          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="stat-icon">
            🎯
          </div>

          <div>
            <span className="stat-label">
              Average Confidence
            </span>

            <strong>
              {statistics.average_confidence ?? 0}%
            </strong>
          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="stat-icon">
            🌱
          </div>

          <div>
            <span className="stat-label">
              Most Predicted Crop
            </span>

            <strong className="crop-value">
              {statistics.most_predicted_crop ||
                "No data"}
            </strong>
          </div>

        </div>


        <div className="dashboard-stat-card">

          <div className="stat-icon">
            💧
          </div>

          <div>
            <span className="stat-label">
              Smart Irrigation
            </span>

            <strong>
              Active
            </strong>
          </div>

        </div>

      </section>


      {/* =========================================
        MAIN GRID
    ========================================= */}

      <section className="dashboard-main-grid">

        {/* Recent predictions */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <span className="panel-eyebrow">
                AI ANALYSIS
              </span>

              <h2>
                Recent Predictions
              </h2>
            </div>

            <Link to="/history">
              View all →
            </Link>

          </div>


          {recentPredictions.length === 0 ? (

            <div className="empty-state">

              <div>
                🌱
              </div>

              <h3>
                No predictions yet
              </h3>

              <p>
                Make your first crop prediction
                to see it here.
              </p>

              <Link
                to="/prediction"
                className="dashboard-primary-button"
              >
                Make Prediction
              </Link>

            </div>

          ) : (

            <div className="prediction-list">

              {recentPredictions.map(
                (prediction) => (

                  <div
                    className="prediction-item"
                    key={prediction.id}
                  >

                    <div className="prediction-crop-icon">
                      🌾
                    </div>

                    <div className="prediction-info">

                      <h3>
                        {prediction.predicted_crop}
                      </h3>

                      <span>
                        {prediction.created_at}
                      </span>

                    </div>

                    <div className="prediction-confidence">

                      <strong>
                        {prediction.confidence}%
                      </strong>

                      <span>
                        confidence
                      </span>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>


        {/* Quick actions */}

        <div className="dashboard-panel">

          <div className="panel-header">

            <div>
              <span className="panel-eyebrow">
                TOOLS
              </span>

              <h2>
                Smart Agriculture
              </h2>
            </div>

          </div>


          <div className="quick-actions">

            <Link
              to="/prediction"
              className="quick-action"
            >
              <span>🌾</span>

              <div>
                <strong>
                  Crop Prediction
                </strong>

                <small>
                  Find the best crop
                </small>
              </div>

              <b>→</b>
            </Link>


            <Link
              to="/weather"
              className="quick-action"
            >
              <span>☀️</span>

              <div>
                <strong>
                  Weather
                </strong>

                <small>
                  Check current conditions
                </small>
              </div>

              <b>→</b>
            </Link>


            <Link
              to="/irrigation"
              className="quick-action"
            >
              <span>💧</span>

              <div>
                <strong>
                  Smart Irrigation
                </strong>

                <small>
                  Optimize water usage
                </small>
              </div>

              <b>→</b>
            </Link>


            <Link
              to="/analytics"
              className="quick-action"
            >
              <span>📊</span>

              <div>
                <strong>
                  Analytics
                </strong>

                <small>
                  Analyze your farming data
                </small>
              </div>

              <b>→</b>
            </Link>

          </div>

        </div>

      </section>

    </div><div
      style={{
        marginTop: "40px",
        padding: "20px 24px",
        background: "#fffaf0",
        border: "1px solid #f1dfb5",
        borderRadius: "14px",
        display: "flex",
        gap: "15px",
        alignItems: "flex-start",
      }}
    >
        <div style={{ fontSize: "24px" }}>⚠️</div>

        <div>
          <h3
            style={{
              margin: "0 0 8px",
              color: "#7c5a00",
            }}
          >
            Important Disclaimer
          </h3>

          <p
            style={{
              margin: 0,
              color: "#665c45",
              lineHeight: "1.6",
              fontSize: "14px",
            }}
          >
            AgroSmart AI provides AI-based crop recommendations,
            weather information, and irrigation guidance for
            informational and decision-support purposes only.
            Results may vary depending on soil conditions, weather,
            farming practices, crop variety, and other environmental
            factors. Please verify recommendations with local
            agricultural experts before making important farming
            or financial decisions.
          </p>
        </div>
      </div></>
  );
}

export default Dashboard;