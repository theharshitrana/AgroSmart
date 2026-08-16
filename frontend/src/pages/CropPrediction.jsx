import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CropPrediction() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    landArea: "",
    landUnit: "acres",
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setResult(null);

    if (
      !formData.landArea ||
      !formData.nitrogen ||
      !formData.phosphorus ||
      !formData.potassium ||
      !formData.temperature ||
      !formData.humidity ||
      !formData.ph ||
      !formData.rainfall
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await fetch(
        "http://127.0.0.1:5000/api/predict",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token
              ? {
                  Authorization: `Bearer ${token}`,
                }
              : {}),
          },
          body: JSON.stringify({
          N: Number(formData.nitrogen),
          P: Number(formData.phosphorus),
          K: Number(formData.potassium),
          temperature: Number(formData.temperature),
          humidity: Number(formData.humidity),
          ph: Number(formData.ph),
          rainfall: Number(formData.rainfall),
       }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to make prediction."
        );
      }

      setResult({
        ...data,
        landArea: formData.landArea,
        landUnit: formData.landUnit,
      });
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="prediction-page">

      <div className="prediction-header">
        <div>
          <span className="prediction-badge">
            🌱 AI AGRICULTURE
          </span>

          <h1>Crop Prediction</h1>

          <p>
            Enter your soil and environmental conditions to
            find the most suitable crop for your land.
          </p>
        </div>
      </div>

      <div className="prediction-container">

        {/* FORM */}

        <div className="prediction-card">

          <div className="card-title">
            <h2>Farm & Soil Information</h2>

            <p>
              Provide accurate values for better prediction.
            </p>
          </div>

          {error && (
            <div className="prediction-error">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Land Area */}

            <div className="form-section">

              <h3>🌾 Farm Area</h3>

              <div className="form-row">

                <div className="prediction-field">
                  <label>Land Area</label>

                  <input
                    type="number"
                    name="landArea"
                    min="0.1"
                    step="0.1"
                    placeholder="e.g. 5"
                    value={formData.landArea}
                    onChange={handleChange}
                  />
                </div>

                <div className="prediction-field">
                  <label>Unit</label>

                  <select
                    name="landUnit"
                    value={formData.landUnit}
                    onChange={handleChange}
                  >
                    <option value="acres">
                      Acres
                    </option>

                    <option value="hectares">
                      Hectares
                    </option>
                  </select>
                </div>

              </div>

            </div>

            {/* Soil */}

            <div className="form-section">

              <h3>🧪 Soil Nutrients</h3>

              <div className="form-grid">

                <div className="prediction-field">
                  <label>Nitrogen (N)</label>

                  <input
                    type="number"
                    name="nitrogen"
                    step="0.1"
                    placeholder="e.g. 90"
                    value={formData.nitrogen}
                    onChange={handleChange}
                  />
                </div>

                <div className="prediction-field">
                  <label>Phosphorus (P)</label>

                  <input
                    type="number"
                    name="phosphorus"
                    step="0.1"
                    placeholder="e.g. 42"
                    value={formData.phosphorus}
                    onChange={handleChange}
                  />
                </div>

                <div className="prediction-field">
                  <label>Potassium (K)</label>

                  <input
                    type="number"
                    name="potassium"
                    step="0.1"
                    placeholder="e.g. 43"
                    value={formData.potassium}
                    onChange={handleChange}
                  />
                </div>

                <div className="prediction-field">
                  <label>Soil pH</label>

                  <input
                    type="number"
                    name="ph"
                    min="0"
                    max="14"
                    step="0.1"
                    placeholder="e.g. 6.5"
                    value={formData.ph}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </div>

            {/* Environment */}

            <div className="form-section">

              <h3>🌤️ Environmental Conditions</h3>

              <div className="form-grid">

                <div className="prediction-field">
                  <label>Temperature (°C)</label>

                  <input
                    type="number"
                    name="temperature"
                    step="0.1"
                    placeholder="e.g. 25"
                    value={formData.temperature}
                    onChange={handleChange}
                  />
                </div>

                <div className="prediction-field">
                  <label>Humidity (%)</label>

                  <input
                    type="number"
                    name="humidity"
                    step="0.1"
                    placeholder="e.g. 80"
                    value={formData.humidity}
                    onChange={handleChange}
                  />
                </div>

                <div className="prediction-field">
                  <label>Rainfall (mm)</label>

                  <input
                    type="number"
                    name="rainfall"
                    step="0.1"
                    placeholder="e.g. 200"
                    value={formData.rainfall}
                    onChange={handleChange}
                  />
                </div>

              </div>

            </div>

            <button
              type="submit"
              className="prediction-submit"
              disabled={loading}
            >
              {loading
                ? "🔄 Predicting..."
                : "🌱 Predict Crop"}
            </button>

          </form>
        </div>

        {/* RESULT */}

        {result && (
          <div className="prediction-result">

            <div className="result-icon">
              🌾
            </div>

            <span className="result-label">
              RECOMMENDED CROP
            </span>

            <h2>
              {result.crop ||
                result.predicted_crop ||
                result.prediction ||
                "Unknown"}
            </h2>

            <div className="result-details">

              <div>
                <span>Confidence</span>

                <strong>
                  {result.confidence !== undefined
                    ? `${result.confidence}%`
                    : "N/A"}
                </strong>
              </div>

              <div>
                <span>Farm Area</span>

                <strong>
                  {result.landArea}{" "}
                  {result.landUnit}
                </strong>
              </div>

            </div>

            <button
            type="button"
            className="irrigation-button"
            onClick={() =>
            navigate("/irrigation", {
            state: {
            prediction: {
            crop:
            result.crop ||
            result.predicted_crop ||
            result.prediction,

          area: result.landArea,

          landUnit: result.landUnit,

          temperature: formData.temperature,

          humidity: formData.humidity,

          rainfall: formData.rainfall,
        },
      },
    })
  }
>
  💧 Calculate Smart Irrigation →
</button>

          </div>
        )}

      </div>
    </div>
  );
}

export default CropPrediction;