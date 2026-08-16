import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Irrigation() {
  const location = useLocation();

  // Get crop and land area from Crop Prediction page if available
  const prediction = location.state?.prediction || {};

   const [formData, setFormData] = useState({
   crop: prediction.crop || "Rice",
   area: prediction.area || 5,
  landUnit: prediction.landUnit || "acres",
  temperature: prediction.temperature || 25,
  humidity: prediction.humidity || 82,
  rainfall: prediction.rainfall || 200,
  soil_moisture: "",
  soil_type: "Loamy",
  growth_stage: "Vegetative",
 });

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);

    // Validation
    if (
      !formData.crop ||
      !formData.temperature ||
      !formData.humidity ||
      !formData.rainfall ||
      !formData.soil_moisture ||
      !formData.soil_type ||
      !formData.growth_stage
    ) {
      setError("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:5000/api/irrigation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
         crop: formData.crop,
         land_area: Number(formData.area),
          land_unit: formData.landUnit || "acres",
          temperature: Number(formData.temperature),
          humidity: Number(formData.humidity),
          rainfall: Number(formData.rainfall),
          soil_moisture: Number(formData.soil_moisture),
          soil_type: formData.soil_type,
           growth_stage: formData.growth_stage,
         }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to calculate irrigation."
        );
      }

      setResult(data.irrigation);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="irrigation-page">

      {/* Header */}
      <div className="irrigation-header">

        <div>
          <span className="irrigation-label">
            💧 SMART AGRICULTURE
          </span>

          <h1>Smart Irrigation</h1>

          <p>
            Optimize water usage based on crop, soil and
            environmental conditions.
          </p>
        </div>

        <Link to="/dashboard" className="back-dashboard">
          ← Dashboard
        </Link>

      </div>

      <div className="irrigation-container">

        {/* FORM */}
        <div className="irrigation-card">

          <div className="card-heading">
            <h2>💧 Irrigation Information</h2>

            <p>
              Enter your current field conditions to calculate
              irrigation requirements.
            </p>
          </div>

          {error && (
            <div className="irrigation-error">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Crop */}
            <div className="form-section">

              <h3>🌱 Crop Information</h3>

              <div className="form-grid">

                <div className="form-group">
                  <label>Crop</label>

                  <input
                    type="text"
                    name="crop"
                    value={formData.crop}
                    onChange={handleChange}
                    placeholder="Rice"
                  />
                </div>

                <div className="form-group">
                  <label>Land Area (Acres)</label>

                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    min="0"
                    step="0.1"
                  />
                </div>

              </div>

            </div>

            {/* Environment */}
            <div className="form-section">

              <h3>🌤️ Environmental Conditions</h3>

              <div className="form-grid">

                <div className="form-group">
                  <label>Temperature (°C)</label>

                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleChange}
                    step="0.1"
                  />
                </div>

                <div className="form-group">
                  <label>Humidity (%)</label>

                  <input
                    type="number"
                    name="humidity"
                    value={formData.humidity}
                    onChange={handleChange}
                    step="0.1"
                  />
                </div>

                <div className="form-group">
                  <label>Rainfall (mm)</label>

                  <input
                    type="number"
                    name="rainfall"
                    value={formData.rainfall}
                    onChange={handleChange}
                    step="0.1"
                  />
                </div>

                <div className="form-group">
                  <label>Soil Moisture (%)</label>

                  <input
                    type="number"
                    name="soil_moisture"
                    value={formData.soil_moisture}
                    onChange={handleChange}
                    placeholder="Example: 35"
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>

              </div>

            </div>

            {/* Soil */}
            <div className="form-section">

              <h3>🌍 Soil & Crop Stage</h3>

              <div className="form-grid">

                <div className="form-group">
                  <label>Soil Type</label>

                  <select
                    name="soil_type"
                    value={formData.soil_type}
                    onChange={handleChange}
                  >
                    <option value="Loamy">Loamy</option>
                    <option value="Clay">Clay</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Silty">Silty</option>
                    <option value="Black">Black Soil</option>
                    <option value="Red">Red Soil</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Growth Stage</label>

                  <select
                    name="growth_stage"
                    value={formData.growth_stage}
                    onChange={handleChange}
                  >
                    <option value="Seedling">Seedling</option>
                    <option value="Vegetative">
                      Vegetative
                    </option>
                    <option value="Flowering">
                      Flowering
                    </option>
                    <option value="Maturity">
                      Maturity
                    </option>
                  </select>
                </div>

              </div>

            </div>

            <button
              type="submit"
              className="irrigation-submit"
              disabled={loading}
            >
              {loading
                ? "Calculating..."
                : "💧 Calculate Irrigation →"}
            </button>

          </form>

        </div>

        {/* RESULT */}
        <div className="irrigation-result-card">

          {!result ? (
            <div className="empty-irrigation">

              <div className="result-icon">
                💧
              </div>

              <h2>Smart Water Recommendation</h2>

              <p>
                Enter your field conditions and calculate
                how much irrigation your crop needs.
              </p>

            </div>
          ) : (
            <div className="irrigation-result">

              <span className="result-label">
                💧 IRRIGATION RECOMMENDATION
              </span>

              <h2>Water Requirement</h2>

              {/* Show returned result dynamically */}
              {typeof result === "object" ? (
                <div className="result-grid">

                  {Object.entries(result).map(
                    ([key, value]) => (
                      <div
                        className="result-box"
                        key={key}
                      >
                        <span>
                          {key
                            .replaceAll("_", " ")
                            .replace(/\b\w/g, (c) =>
                              c.toUpperCase()
                            )}
                        </span>

                        <strong>
                          {String(value)}
                        </strong>
                      </div>
                    )
                  )}

                </div>
              ) : (
                <div className="main-result">
                  {String(result)}
                </div>
              )}

              <div className="result-note">
                🌱 Recommendation calculated using your
                crop, soil and environmental conditions.
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}

export default Irrigation;