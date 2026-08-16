import { useState } from "react";

function Weather() {
  const [city, setCity] = useState("Chandigarh");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city.trim()) {
      setError("Please enter a city.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://127.0.0.1:5000/api/weather?city=${encodeURIComponent(city)}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to fetch weather.");
      }

      setWeather(data.weather || data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-page">

      <div className="weather-header">
        <span className="weather-badge">
          🌤️ WEATHER INTELLIGENCE
        </span>

        <h1>Weather Dashboard</h1>

        <p>
          Check current weather conditions for better
          farming decisions.
        </p>
      </div>

      <div className="weather-search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getWeather();
            }
          }}
          placeholder="Enter city name"
        />

        <button
          onClick={getWeather}
          disabled={loading}
        >
          {loading ? "Loading..." : "🔍 Search"}
        </button>
      </div>

      {error && (
        <div className="weather-error">
          ⚠️ {error}
        </div>
      )}

      {weather && (
        <div className="weather-card">

          <div className="weather-main">

            <div>
              <span className="weather-location">
                📍 {weather.city}, {weather.country}
              </span>

              <h2>
                {Math.round(weather.temperature)}°C
              </h2>

              <p>
                {weather.weather}
              </p>
            </div>

            <div className="weather-icon">
              {weather.weather_main === "Clear"
                ? "☀️"
                : weather.weather_main === "Clouds"
                ? "☁️"
                : weather.weather_main === "Rain"
                ? "🌧️"
                : weather.weather_main === "Thunderstorm"
                ? "⛈️"
                : weather.weather_main === "Snow"
                ? "❄️"
                : "🌤️"}
            </div>

          </div>

          <div className="weather-details">

            <div className="weather-detail">
              <span>🌡️ Feels Like</span>
              <strong>{Math.round(weather.feels_like)}°C</strong>
            </div>

            <div className="weather-detail">
              <span>💧 Humidity</span>
              <strong>{weather.humidity}%</strong>
            </div>

            <div className="weather-detail">
              <span>💨 Wind Speed</span>
              <strong>{weather.wind_speed} m/s</strong>
            </div>

            <div className="weather-detail">
              <span>🔵 Pressure</span>
              <strong>{weather.pressure} hPa</strong>
            </div>

          </div>

          <div className="farming-tip">
            <strong>🌱 Farming Insight</strong>

            <p>
              Current weather conditions can help you
              decide whether irrigation is required.
              Check soil moisture before watering your crop.
            </p>
          </div>

        </div>
      )}

      {!weather && !loading && !error && (
        <div className="weather-empty">
          🌤️
          <h2>Search for a city</h2>
          <p>
            Enter your location to view current weather
            conditions.
          </p>
        </div>
      )}

    </div>
  );
}

export default Weather;