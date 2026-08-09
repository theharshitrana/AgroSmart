import os
import joblib
import numpy as np

# -----------------------------
# Paths
# -----------------------------
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

MODEL_PATH = os.path.join(BASE_DIR, "backend", "models", "crop_model.pkl")
ENCODER_PATH = os.path.join(BASE_DIR, "backend", "models", "label_encoder.pkl")

# -----------------------------
# Load Model
# -----------------------------
model = joblib.load(MODEL_PATH)
encoder = joblib.load(ENCODER_PATH)


def predict_crop(N, P, K, temperature, humidity, ph, rainfall):
    data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])

    prediction = model.predict(data)[0]
    crop = encoder.inverse_transform([prediction])[0]

    probability = model.predict_proba(data).max() * 100

    return {
        "crop": crop,
        "confidence": round(probability, 2)
    }


if __name__ == "__main__":

    result = predict_crop(
        N=90,
        P=42,
        K=43,
        temperature=20.8,
        humidity=82,
        ph=6.5,
        rainfall=202
    )

    print("\nPrediction Result")
    print("======================")
    print(result)