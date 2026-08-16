# 🌱 AgroSmart AI

AI-powered smart agriculture platform for crop recommendation, smart irrigation, real-time weather monitoring, and agricultural analytics.

## 🚀 Features

- 🌱 **AI Crop Recommendation**
  - Recommends suitable crops using soil and environmental conditions.
  - Uses Nitrogen, Phosphorus, Potassium, temperature, humidity, pH, and rainfall.
  - Displays the recommended crop and model confidence.

- 💧 **Smart Irrigation**
  - Provides irrigation recommendations based on crop and field conditions.
  - Considers land area, temperature, humidity, rainfall, soil moisture, soil type, and growth stage.

- 🌦️ **Real-Time Weather**
  - Integrated with the OpenWeather API.
  - Displays temperature, humidity, pressure, wind speed, weather condition, and location information.

- 📊 **Analytics Dashboard**
  - Total predictions
  - Average model confidence
  - Most recommended crop
  - Crop distribution
  - Prediction history

- 🔐 **Authentication**
  - User registration and login
  - JWT authentication
  - Password hashing using Flask-Bcrypt
  - User-specific prediction history

- 🗄️ **MySQL Database**
  - Stores users and prediction history.

---

## 🧠 Machine Learning

The crop recommendation model is trained using a crop recommendation dataset containing **2,200 samples and 22 crop classes**.

### Input Features

| Feature | Description |
|---|---|
| N | Nitrogen level |
| P | Phosphorus level |
| K | Potassium level |
| Temperature | Temperature in °C |
| Humidity | Relative humidity |
| pH | Soil pH |
| Rainfall | Rainfall in mm |

The model generates a suitable crop recommendation along with a confidence value for the individual prediction.

> **Note:** Model confidence should not be interpreted as overall real-world model accuracy.

---

## 🏗️ System Architecture

```text
                    AgroSmart AI
                         │
                         ▼
                 React Frontend
                         │
                         ▼
                  Flask REST API
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
      ML Model        MySQL        Weather API
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                Agricultural Insights
