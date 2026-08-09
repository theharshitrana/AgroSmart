from flask import Blueprint, request, jsonify

from services.weather import get_weather


weather_bp = Blueprint(
    "weather",
    __name__
)


@weather_bp.route("/api/weather", methods=["GET"])
def weather():

    city = request.args.get("city", "").strip()

    if not city:
        return jsonify({
            "success": False,
            "error": "City is required"
        }), 400

    try:

        result = get_weather(city)

        return jsonify({
            "success": True,
            "weather": result
        }), 200

    except ValueError as error:

        return jsonify({
            "success": False,
            "error": str(error)
        }), 400

    except Exception as error:

        print("Weather API error:", error)

        return jsonify({
            "success": False,
            "error": "Unable to fetch weather data"
        }), 500