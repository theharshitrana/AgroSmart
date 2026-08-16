# 🌱 AgroSmart AI

> An AI-powered smart agriculture platform that helps farmers make data-driven decisions through crop recommendation, smart irrigation, weather monitoring, and agricultural analytics.

---

## 📌 Overview

**AgroSmart AI** is a full-stack Artificial Intelligence and Machine Learning application designed to support smarter agricultural decision-making.

The platform combines:

- Machine Learning
- REST APIs
- React
- Flask
- MySQL
- Weather API integration
- JWT authentication
- Data analytics

Users can enter soil and environmental conditions to receive a suitable crop recommendation, calculate irrigation requirements, check current weather conditions, and analyze their prediction history.

---

## 🚀 Key Features

### 🌱 AI Crop Recommendation

The platform recommends a suitable crop based on:

- Nitrogen (N)
- Phosphorus (P)
- Potassium (K)
- Temperature
- Humidity
- Soil pH
- Rainfall

The prediction system returns:

- Recommended crop
- Prediction confidence

---

### 💧 Smart Irrigation

The irrigation module provides irrigation recommendations using field conditions such as:

- Crop
- Land area
- Temperature
- Humidity
- Rainfall
- Soil moisture
- Soil type
- Crop growth stage

This provides data-driven irrigation guidance and supports efficient water usage.

---

### 🌦️ Real-Time Weather

AgroSmart AI integrates with the **OpenWeather API** to provide current weather information.

The weather dashboard displays:

- Current temperature
- Feels-like temperature
- Humidity
- Atmospheric pressure
- Wind speed
- Weather condition
- City and country
- Geographic coordinates

---

### 📊 Analytics Dashboard

The analytics module provides insights from historical prediction data.

It includes:

- Total predictions
- Average prediction confidence
- Most frequently predicted crop
- Crop distribution
- Recent predictions
- Prediction history
- Soil and environmental input history

---

### 🔐 Authentication

The application includes user authentication using:

- User registration
- User login
- JWT-based authentication
- Password hashing
- Protected user-specific data

Prediction history is associated with the authenticated user.

---

### 🗄️ MySQL Database

MySQL is used to store application data such as:

- User accounts
- Prediction history
- Crop predictions
- Prediction input parameters
- Confidence values
- Prediction timestamps

---

# 🧠 Machine Learning

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

The trained model predicts a suitable crop based on the supplied agricultural conditions.

The application also returns a confidence value for the individual prediction.

> **Note:** Prediction confidence should not be interpreted as overall real-world model accuracy.

---

# 🔄 Application Workflow

```text
                         User
                           │
                           ▼
                   React Frontend
                           │
                           ▼
                   Flask REST API
                           │
             ┌─────────────┼─────────────┐
             │             │             │
             ▼             ▼             ▼
         ML Model        MySQL      Weather API
             │             │             │
             ▼             ▼             ▼
       Crop Prediction  User Data  Weather Data
             │
             ▼
     Smart Agriculture Insights
             │
             ▼
       Dashboard & Analytics
````

---

# 🏗️ System Architecture

```text
┌──────────────────────────────────────────────────────┐
│                    React Frontend                    │
│                                                      │
│ Home | Login | Register | Dashboard | Prediction    │
│ Analytics | Weather | Irrigation                    │
└─────────────────────────┬────────────────────────────┘
                          │
                          │ HTTP / REST API
                          ▼
┌──────────────────────────────────────────────────────┐
│                     Flask Backend                    │
│                                                      │
│ Authentication | Prediction | Irrigation | Weather  │
│ Dashboard | Analytics | History                     │
└───────────────┬──────────────────┬───────────────────┘
                │                  │
                ▼                  ▼
       ┌────────────────┐   ┌──────────────────┐
       │ Machine        │   │ MySQL Database   │
       │ Learning Model │   │                  │
       │                │   │ Users            │
       │ Crop           │   │ Predictions      │
       │ Recommendation │   │ History          │
       └────────────────┘   └──────────────────┘
                │
                ▼
       ┌──────────────────┐
       │ OpenWeather API  │
       │                  │
       │ Current Weather  │
       └──────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React
* Vite
* JavaScript
* React Router
* CSS
* React Icons
* Framer Motion

## Backend

* Python
* Flask
* REST API
* Flask-CORS
* PyJWT
* Flask-Bcrypt
* python-dotenv
* Requests

## Machine Learning

* Python
* Pandas
* NumPy
* Scikit-learn
* Joblib

## Database

* MySQL
* MySQL Connector

## External API

* OpenWeather API

## Development Tools

* VS Code
* Git
* GitHub
* npm
* Python Virtual Environment

---

# 📁 Project Structure

```text
AgroSmart/
│
├── backend/
│   ├── database/
│   ├── ml/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/
│   ├── package.json
│   └── vite.config.js
│
├── ml/
│   ├── train.py
│   ├── predict.py
│   └── model files
│
├── docs/
│
├── .env.example
├── .gitignore
└── README.md
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/AgroSmart.git
cd AgroSmart
```

> Replace `your-username` with your GitHub username.

---

## 2. Backend Setup

Create a Python virtual environment:

```bash
python -m venv .venv
```

Activate it on Windows:

```powershell
.venv\Scripts\Activate.ps1
```

Install backend dependencies:

```bash
cd backend
pip install -r requirements.txt
```

---

## 3. Database Setup

Make sure MySQL is installed and running.

Create the database:

```sql
CREATE DATABASE agrosmart;
```

Configure your database credentials in the `.env` file.

---

## 4. Environment Variables

Create a `.env` file based on `.env.example`.

```env
SECRET_KEY=your_secret_key

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=agrosmart

OPENWEATHER_API_KEY=your_openweather_api_key
```

> ⚠️ Never commit your `.env` file or API keys to GitHub.

---

## 5. Start Backend

From the `backend` directory:

```bash
python app.py
```

The backend runs on:

```text
http://127.0.0.1:5000
```

---

## 6. Start Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

Example:

```text
http://localhost:5173
```

---

# 🔌 Main API Endpoints

| Method   | Endpoint          | Purpose                          |
| -------- | ----------------- | -------------------------------- |
| POST     | `/api/register`   | Register a user                  |
| POST     | `/api/login`      | Authenticate a user              |
| POST     | `/api/predict`    | Predict suitable crop            |
| GET      | `/api/history`    | Retrieve prediction history      |
| POST     | `/api/irrigation` | Calculate irrigation requirement |
| GET/POST | `/api/weather`    | Retrieve weather information     |
| GET      | `/api/dashboard`  | Retrieve dashboard statistics    |

---

# 🌱 Crop Prediction API Flow

```text
User enters:

N
P
K
Temperature
Humidity
pH
Rainfall

        │
        ▼
React Frontend
        │
        ▼
POST /api/predict
        │
        ▼
Flask Backend
        │
        ▼
ML Prediction Model
        │
        ▼
Recommended Crop + Confidence
        │
        ▼
MySQL Prediction History
        │
        ▼
Dashboard / Analytics
```

---

# 💧 Smart Irrigation Flow

```text
Crop
Land Area
Temperature
Humidity
Rainfall
Soil Moisture
Soil Type
Growth Stage

        │
        ▼
POST /api/irrigation
        │
        ▼
Irrigation Calculation Service
        │
        ▼
Irrigation Recommendation
```

---

# 🔐 Security

AgroSmart AI uses several basic security practices:

* JWT authentication
* Password hashing
* Environment variables for secrets
* Protected user-specific prediction history
* API key protection through `.env`
* `.gitignore` for sensitive and generated files

Sensitive files should never be committed to the repository.

---

# 📊 Dashboard

The dashboard provides a quick overview of the user's agricultural activity.

It displays:

* Total predictions
* Average confidence
* Most predicted crop
* Smart irrigation availability
* Recent predictions
* Quick access to agriculture tools

---

# 📈 Analytics

The analytics page converts prediction history into useful insights.

It provides:

* Crop distribution
* Prediction counts
* Average confidence
* Recent prediction records
* Historical agricultural input data

This allows users to understand their previous crop recommendations.

---

# 🌦️ Weather Intelligence

The weather module retrieves real-time weather information using the OpenWeather API.

The application uses weather information as an additional source of context for agricultural decision-making.

> Weather data is provided by an external API and may change over time.

---

# 🎯 Project Objectives

The main objectives of AgroSmart AI are:

1. Provide AI-assisted crop recommendations.
2. Help farmers make informed irrigation decisions.
3. Provide accessible weather information.
4. Store and analyze historical prediction data.
5. Demonstrate the integration of AI with full-stack web development.
6. Build a practical application around a real-world agricultural problem.

---

# 💡 What I Learned

Through this project, I worked with:

* Full-stack application development
* React component architecture
* REST API development
* Flask backend development
* Machine Learning model integration
* MySQL database integration
* JWT authentication
* External API integration
* Frontend-backend communication
* Data visualization and analytics
* Git and GitHub project management

---

# 🔮 Future Improvements

Possible future enhancements include:

* 🌿 Plant disease detection using CNNs
* 📷 Crop and leaf image analysis
* 📈 Advanced crop yield prediction
* 🛰️ Satellite data integration
* 🌍 Location-based agricultural recommendations
* 💧 IoT-based soil moisture monitoring
* 🤖 AI farming assistant
* 📄 PDF agricultural reports
* 📱 Mobile application
* ☁️ Cloud deployment
* 🔔 Smart farming alerts and notifications

---

# ⚠️ Disclaimer

AgroSmart AI provides AI-based crop recommendations, weather information, and irrigation guidance for informational and decision-support purposes only.
Results may vary depending on local soil conditions, weather, farming practices, crop variety, and other environmental factors.
Users should verify recommendations with qualified agricultural experts before making important farming or financial decisions.

---

# 📌 Project Status

Current implementation includes:

* ✅ AI Crop Recommendation
* ✅ Smart Irrigation
* ✅ Weather Dashboard
* ✅ Analytics Dashboard
* ✅ User Authentication
* ✅ JWT Authentication
* ✅ MySQL Database
* ✅ Prediction History
* ✅ REST APIs
* ✅ Responsive Web Interface
* ✅ Agricultural Disclaimer
