from flask import Blueprint, jsonify, request
from database.db import get_db_connection
import jwt
import os
from dotenv import load_dotenv

load_dotenv()

dashboard_bp = Blueprint("dashboard", __name__)


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

    except jwt.InvalidTokenError:
        return None


@dashboard_bp.route("/api/dashboard", methods=["GET"])
def dashboard():

    user_id = get_user_from_token()

    if not user_id:
        return jsonify({
            "error": "Authentication required"
        }), 401

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    # Total predictions
    cursor.execute(
        """
        SELECT COUNT(*) AS total
        FROM prediction_history
        WHERE user_id = %s
        """,
        (user_id,)
    )

    total_predictions = cursor.fetchone()["total"]

    # Average confidence
    cursor.execute(
        """
        SELECT COALESCE(AVG(confidence), 0) AS average_confidence
        FROM prediction_history
        WHERE user_id = %s
        """,
        (user_id,)
    )

    average_confidence = cursor.fetchone()["average_confidence"]

    # Most predicted crop
    cursor.execute(
        """
        SELECT predicted_crop, COUNT(*) AS count
        FROM prediction_history
        WHERE user_id = %s
        GROUP BY predicted_crop
        ORDER BY count DESC
        LIMIT 1
        """,
        (user_id,)
    )

    most_predicted = cursor.fetchone()

    # Recent predictions
    cursor.execute(
        """
        SELECT
            id,
            predicted_crop,
            confidence,
            created_at
        FROM prediction_history
        WHERE user_id = %s
        ORDER BY created_at DESC
        LIMIT 5
        """,
        (user_id,)
    )

    recent_predictions = cursor.fetchall()

    cursor.close()
    db.close()

    return jsonify({
        "success": True,
        "statistics": {
            "total_predictions": total_predictions,
            "average_confidence": round(float(average_confidence), 2),
            "most_predicted_crop": (
                most_predicted["predicted_crop"]
                if most_predicted
                else None
            )
        },
        "recent_predictions": recent_predictions
    })