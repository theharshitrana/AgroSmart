from flask import Blueprint, request, jsonify
from database.db import get_db_connection
from ml.predict import predict_crop
import jwt
import os
from dotenv import load_dotenv

load_dotenv()

prediction_bp = Blueprint("prediction", __name__)


def get_user_from_token():
    auth_header = request.headers.get("Authorization")

    if not auth_header or not auth_header.startswith("Bearer "):
        return None

    token = auth_header.split(" ")[1]

    try:
        decoded = jwt.decode(
            token,
            os.getenv("SECRET_KEY"),
            algorithms=["HS256"]
        )
        return decoded["user_id"]

    except jwt.ExpiredSignatureError:
        return None

    except jwt.InvalidTokenError:
        return None


# =====================================
# CROP PREDICTION
# =====================================
@prediction_bp.route("/api/predict", methods=["POST"])
def predict():

    user_id = get_user_from_token()

    data = request.get_json()

    required_fields = [
        "N",
        "P",
        "K",
        "temperature",
        "humidity",
        "ph",
        "rainfall"
    ]

    if not all(field in data for field in required_fields):
        return jsonify({
            "error": "All prediction fields are required"
        }), 400

    try:

        result = predict_crop(
            N=data["N"],
            P=data["P"],
            K=data["K"],
            temperature=data["temperature"],
            humidity=data["humidity"],
            ph=data["ph"],
            rainfall=data["rainfall"]
        )

        # Save prediction if user is logged in
        if user_id:

            db = get_db_connection()
            cursor = db.cursor()

            cursor.execute(
                """
                INSERT INTO prediction_history
                (
                    user_id,
                    nitrogen,
                    phosphorus,
                    potassium,
                    temperature,
                    humidity,
                    ph,
                    rainfall,
                    predicted_crop,
                    confidence
                )
                VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
                """,
                (
                    user_id,
                    data["N"],
                    data["P"],
                    data["K"],
                    data["temperature"],
                    data["humidity"],
                    data["ph"],
                    data["rainfall"],
                    result["crop"],
                    result["confidence"]
                )
            )

            db.commit()
            cursor.close()
            db.close()

        return jsonify({
            "success": True,
            "crop": result["crop"],
            "confidence": result["confidence"]
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        }), 500


# =====================================
# PREDICTION HISTORY
# =====================================
@prediction_bp.route("/api/history", methods=["GET"])
def history():

    user_id = get_user_from_token()

    if not user_id:
        return jsonify({
            "error": "Authentication required"
        }), 401

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT
            id,
            nitrogen,
            phosphorus,
            potassium,
            temperature,
            humidity,
            ph,
            rainfall,
            predicted_crop,
            confidence,
            created_at
        FROM prediction_history
        WHERE user_id = %s
        ORDER BY created_at DESC
        """,
        (user_id,)
    )

    predictions = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "count": len(predictions),
        "predictions": predictions
    })