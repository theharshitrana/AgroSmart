import { useEffect, useState } from "react";

function Analytics() {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to view your analytics.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          "http://127.0.0.1:5000/api/history",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error || "Unable to load analytics."
          );
        }

        setPredictions(data.predictions || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const totalPredictions = predictions.length;

  const averageConfidence =
    totalPredictions > 0
      ? (
          predictions.reduce(
            (sum, item) => sum + Number(item.confidence || 0),
            0
          ) / totalPredictions
        ).toFixed(1)
      : 0;

  const cropCounts = predictions.reduce((acc, item) => {
    const crop = item.predicted_crop || "Unknown";

    acc[crop] = (acc[crop] || 0) + 1;

    return acc;
  }, {});

  const mostRecommendedCrop =
    Object.keys(cropCounts).length > 0
      ? Object.keys(cropCounts).reduce((a, b) =>
          cropCounts[a] > cropCounts[b] ? a : b
        )
      : "N/A";

  return (
    <div className="analytics-page">

      {/* Header */}

      <div className="analytics-header">

        <div>
          <span className="analytics-badge">
            📊 FARM INTELLIGENCE
          </span>

          <h1>Analytics</h1>

          <p>
            Understand your crop predictions and farming
            activity using your historical data.
          </p>
        </div>

      </div>

      {error && (
        <div className="analytics-error">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="analytics-loading">
          Loading your analytics...
        </div>
      ) : (
        <>
          {/* STAT CARDS */}

          <div className="analytics-stats">

            <div className="analytics-stat-card">
              <span>🌱</span>

              <div>
                <p>Total Predictions</p>
                <strong>{totalPredictions}</strong>
              </div>
            </div>

            <div className="analytics-stat-card">
              <span>📈</span>

              <div>
                <p>Average Confidence</p>
                <strong>{averageConfidence}%</strong>
              </div>
            </div>

            <div className="analytics-stat-card">
              <span>🌾</span>

              <div>
                <p>Top Crop</p>
                <strong>
                  {mostRecommendedCrop}
                </strong>
              </div>
            </div>

            <div className="analytics-stat-card">
              <span>📊</span>

              <div>
                <p>Crop Types</p>
                <strong>
                  {Object.keys(cropCounts).length}
                </strong>
              </div>
            </div>

          </div>

          {/* MAIN CONTENT */}

          <div className="analytics-grid">

            {/* CROP DISTRIBUTION */}

            <div className="analytics-card">

              <div className="analytics-card-header">
                <h2>🌾 Crop Distribution</h2>

                <span>
                  {totalPredictions} predictions
                </span>
              </div>

              {totalPredictions === 0 ? (
                <div className="analytics-empty">
                  <div>🌱</div>
                  <h3>No predictions yet</h3>
                  <p>
                    Make your first crop prediction to
                    see analytics here.
                  </p>
                </div>
              ) : (
                <div className="crop-distribution">

                  {Object.entries(cropCounts)
                    .sort((a, b) => b[1] - a[1])
                    .map(([crop, count]) => {

                      const percentage = Math.round(
                        (count / totalPredictions) * 100
                      );

                      return (
                        <div
                          className="crop-row"
                          key={crop}
                        >

                          <div className="crop-row-top">
                            <span>
                              {crop}
                            </span>

                            <strong>
                              {percentage}%
                            </strong>
                          </div>

                          <div className="crop-bar">
                            <div
                              className="crop-bar-fill"
                              style={{
                                width: `${percentage}%`,
                              }}
                            />
                          </div>

                          <small>
                            {count} prediction
                            {count !== 1 ? "s" : ""}
                          </small>

                        </div>
                      );
                    })}

                </div>
              )}

            </div>

            {/* RECENT PREDICTIONS */}

            <div className="analytics-card">

              <div className="analytics-card-header">
                <h2>🕒 Recent Predictions</h2>
              </div>

              {predictions.length === 0 ? (
                <div className="analytics-empty">
                  <div>📋</div>
                  <h3>No history</h3>
                  <p>
                    Your recent predictions will appear
                    here.
                  </p>
                </div>
              ) : (
                <div className="prediction-history">

                  {predictions
                    .slice(0, 6)
                    .map((item) => (

                      <div
                        className="history-row"
                        key={item.id}
                      >

                        <div className="history-crop">
                          <div>
                            🌾
                          </div>

                          <span>
                            {item.predicted_crop}
                          </span>
                        </div>

                        <strong>
                          {item.confidence}%
                        </strong>

                      </div>

                    ))}

                </div>
              )}

            </div>

          </div>

          {/* TABLE */}

          <div className="analytics-card analytics-table-card">

            <div className="analytics-card-header">
              <h2>📋 Prediction History</h2>
            </div>

            {predictions.length === 0 ? (
              <div className="analytics-empty">
                No prediction history available.
              </div>
            ) : (
              <div className="table-wrapper">

                <table>

                  <thead>
                    <tr>
                      <th>Crop</th>
                      <th>Confidence</th>
                      <th>N</th>
                      <th>P</th>
                      <th>K</th>
                      <th>Temperature</th>
                      <th>Rainfall</th>
                    </tr>
                  </thead>

                  <tbody>

                    {predictions.map((item) => (

                      <tr key={item.id}>

                        <td>
                          🌾 {item.predicted_crop}
                        </td>

                        <td>
                          <span className="confidence">
                            {item.confidence}%
                          </span>
                        </td>

                        <td>{item.nitrogen}</td>

                        <td>{item.phosphorus}</td>

                        <td>{item.potassium}</td>

                        <td>
                          {item.temperature}°C
                        </td>

                        <td>
                          {item.rainfall} mm
                        </td>

                      </tr>

                    ))}

                  </tbody>

                </table>

              </div>
            )}

          </div>

        </>
      )}

    </div>
  );
}

export default Analytics;