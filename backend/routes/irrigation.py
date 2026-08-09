from flask import Blueprint, request, jsonify
from services.irrigation import calculate_irrigation

irrigation_bp = Blueprint(
    "irrigation",
    __name__
)


@irrigation_bp.route(
    "/api/irrigation",
    methods=["POST"]
)
def irrigation():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "success": False,
            "error": "JSON body is required"
        }), 400

    required_fields = [
        "crop",
        "temperature",
        "humidity",
        "rainfall",
        "soil_moisture",
        "soil_type",
        "growth_stage"
    ]

    missing = [
        field
        for field in required_fields
        if field not in data
    ]

    if missing:
        return jsonify({
            "success": False,
            "error": "Missing required fields",
            "fields": missing
        }), 400

    try:

        result = calculate_irrigation(
            crop=data["crop"],
            temperature=float(data["temperature"]),
            humidity=float(data["humidity"]),
            rainfall=float(data["rainfall"]),
            soil_moisture=float(data["soil_moisture"]),
            soil_type=data["soil_type"],
            growth_stage=data["growth_stage"]
        )

        return jsonify({
            "success": True,
            "irrigation": result
        }), 200

    except (TypeError, ValueError):

        return jsonify({
            "success": False,
            "error": "Numeric fields contain invalid values"
        }), 400