from flask import Flask
from flask_cors import CORS
from routes.auth import auth_bp
from routes.prediction import prediction_bp
from routes.dashboard import dashboard_bp
from routes.irrigation import irrigation_bp
from routes.weather import weather_bp
from routes.admin import admin_bp


app = Flask(__name__)
CORS(app)


# Authentication routes
app.register_blueprint(
    auth_bp,
    url_prefix="/api/auth"
)

# Prediction routes
app.register_blueprint(prediction_bp)

# Dashboard routes
app.register_blueprint(dashboard_bp)

# Irrigation routes
app.register_blueprint(irrigation_bp)

# Weather routes
app.register_blueprint(weather_bp)

# Admin routes
app.register_blueprint(admin_bp)


@app.route("/")
def home():
    return {
        "message": "AgroSmart API Running 🚀"
    }


if __name__ == "__main__":
    app.run(debug=True)