from flask import Blueprint, request, jsonify
import jwt
import os

from dotenv import load_dotenv
from database.db import get_db_connection

load_dotenv()

admin_bp = Blueprint("admin", __name__)


def get_admin_user():
    """
    Verify JWT and make sure the logged-in user is an admin.
    """

    auth_header = request.headers.get("Authorization")

    if not auth_header:
        return None, "Authentication required"

    if not auth_header.startswith("Bearer "):
        return None, "Invalid authorization header"

    token = auth_header.split(" ", 1)[1]

    try:
        decoded = jwt.decode(
            token,
            os.getenv("SECRET_KEY"),
            algorithms=["HS256"]
        )

        user_id = decoded.get("user_id")

        if not user_id:
            return None, "Invalid token"

        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT id, full_name, email, role
            FROM users
            WHERE id = %s
            """,
            (user_id,)
        )

        user = cursor.fetchone()

        cursor.close()
        db.close()

        if not user:
            return None, "User not found"

        if user["role"] != "admin":
            return None, "Admin access required"

        return user, None

    except jwt.ExpiredSignatureError:
        return None, "Token expired"

    except jwt.InvalidTokenError:
        return None, "Invalid token"

    except Exception as error:
        print("Admin authentication error:", error)
        return None, "Authentication failed"


# ============================================================
# ADMIN DASHBOARD
# ============================================================

@admin_bp.route("/api/admin/dashboard", methods=["GET"])
def admin_dashboard():

    user, error = get_admin_user()

    if error:

        status = 401 if error in [
            "Authentication required",
            "Invalid authorization header",
            "Invalid token",
            "Token expired",
            "Authentication failed"
        ] else 403

        return jsonify({
            "success": False,
            "error": error
        }), status

    try:

        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        # Total users
        cursor.execute(
            "SELECT COUNT(*) AS total_users FROM users"
        )

        total_users = cursor.fetchone()["total_users"]

        # Total predictions
        cursor.execute(
            "SELECT COUNT(*) AS total_predictions FROM prediction_history"
        )

        total_predictions = cursor.fetchone()["total_predictions"]

        # Average confidence
        cursor.execute(
            "SELECT AVG(confidence) AS average_confidence "
            "FROM prediction_history"
        )

        average_confidence = cursor.fetchone()["average_confidence"]

        # Most predicted crop
        cursor.execute(
            """
            SELECT predicted_crop, COUNT(*) AS count
            FROM prediction_history
            GROUP BY predicted_crop
            ORDER BY count DESC
            LIMIT 1
            """
        )

        most_predicted = cursor.fetchone()

        cursor.close()
        db.close()

        return jsonify({
            "success": True,

            "admin": {
                "id": user["id"],
                "name": user["full_name"],
                "email": user["email"]
            },

            "statistics": {
                "total_users": total_users,
                "total_predictions": total_predictions,
                "average_confidence": round(
                    float(average_confidence or 0),
                    2
                ),
                "most_predicted_crop": (
                    most_predicted["predicted_crop"]
                    if most_predicted
                    else None
                )
            }
        }), 200

    except Exception as error:

        print("Admin dashboard error:", error)

        return jsonify({
            "success": False,
            "error": "Unable to load admin dashboard"
        }), 500


# ============================================================
# GET ALL USERS
# ============================================================

@admin_bp.route("/api/admin/users", methods=["GET"])
def get_users():

    user, error = get_admin_user()

    if error:

        status = 401 if error in [
            "Authentication required",
            "Invalid authorization header",
            "Invalid token",
            "Token expired",
            "Authentication failed"
        ] else 403

        return jsonify({
            "success": False,
            "error": error
        }), status

    try:

        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT
                id,
                full_name,
                email,
                role,
                created_at
            FROM users
            ORDER BY created_at DESC
            """
        )

        users = cursor.fetchall()

        cursor.close()
        db.close()

        return jsonify({
            "success": True,
            "count": len(users),
            "users": users
        }), 200

    except Exception as error:

        print("Admin users error:", error)

        return jsonify({
            "success": False,
            "error": "Unable to load users"
        }), 500


# ============================================================
# GET ALL PREDICTIONS
# ============================================================

@admin_bp.route("/api/admin/predictions", methods=["GET"])
def get_all_predictions():

    user, error = get_admin_user()

    if error:

        status = 401 if error in [
            "Authentication required",
            "Invalid authorization header",
            "Invalid token",
            "Token expired",
            "Authentication failed"
        ] else 403

        return jsonify({
            "success": False,
            "error": error
        }), status

    try:

        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        cursor.execute(
            """
            SELECT
                p.id,
                p.user_id,
                u.full_name,
                u.email,
                p.predicted_crop,
                p.confidence,
                p.created_at
            FROM prediction_history p
            LEFT JOIN users u
                ON p.user_id = u.id
            ORDER BY p.created_at DESC
            """
        )

        predictions = cursor.fetchall()

        cursor.close()
        db.close()

        return jsonify({
            "success": True,
            "count": len(predictions),
            "predictions": predictions
        }), 200

    except Exception as error:

        print("Admin predictions error:", error)

        return jsonify({
            "success": False,
            "error": "Unable to load predictions"
        }), 500