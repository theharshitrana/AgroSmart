from flask import Blueprint, request, jsonify
from database.db import get_db_connection
from flask_bcrypt import Bcrypt
import jwt
import os
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

auth_bp = Blueprint("auth", __name__)
bcrypt = Bcrypt()


# =========================
# REGISTER
# =========================
@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    full_name = data.get("full_name")
    email = data.get("email")
    password = data.get("password")

    if not full_name or not email or not password:
        return jsonify({
            "error": "All fields are required"
        }), 400

    if len(password) < 6:
        return jsonify({
            "error": "Password must be at least 6 characters"
        }), 400

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        "SELECT id FROM users WHERE email = %s",
        (email,)
    )

    existing_user = cursor.fetchone()

    if existing_user:
        cursor.close()
        db.close()

        return jsonify({
            "error": "Email already registered"
        }), 409

    hashed_password = bcrypt.generate_password_hash(
        password
    ).decode("utf-8")

    cursor.execute(
        """
        INSERT INTO users (full_name, email, password)
        VALUES (%s, %s, %s)
        """,
        (full_name, email, hashed_password)
    )

    db.commit()

    user_id = cursor.lastrowid

    cursor.close()
    db.close()

    return jsonify({
        "message": "Registration successful",
        "user": {
            "id": user_id,
            "full_name": full_name,
            "email": email
        }
    }), 201


# =========================
# LOGIN
# =========================
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({
            "error": "Email and password are required"
        }), 400

    db = get_db_connection()
    cursor = db.cursor(dictionary=True)

    cursor.execute(
        """
        SELECT id, full_name, email, password
        FROM users
        WHERE email = %s
        """,
        (email,)
    )

    user = cursor.fetchone()

    cursor.close()
    db.close()

    if not user:
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    password_valid = bcrypt.check_password_hash(
        user["password"],
        password
    )

    if not password_valid:
        return jsonify({
            "error": "Invalid email or password"
        }), 401

    # Create JWT token
    token = jwt.encode(
        {
            "user_id": user["id"],
            "email": user["email"],
            "exp": datetime.utcnow() + timedelta(hours=24)
        },
        os.getenv("SECRET_KEY"),
        algorithm="HS256"
    )

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user["id"],
            "full_name": user["full_name"],
            "email": user["email"]
        }
    }), 200