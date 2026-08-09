import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.metrics import accuracy_score, classification_report

from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression

from xgboost import XGBClassifier

# ----------------------------
# Load Dataset
# ----------------------------

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
DATASET_PATH = os.path.join(BASE_DIR, "dataset", "Crop_recommendation.csv")

df = pd.read_csv(DATASET_PATH)

print("✅ Dataset Loaded")

# ----------------------------
# Features & Target
# ----------------------------

X = df.drop("label", axis=1)
y = df["label"]

# ----------------------------
# Encode Labels
# ----------------------------

encoder = LabelEncoder()
y = encoder.fit_transform(y)

# ----------------------------
# Train Test Split
# ----------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

print(f"Training Samples : {len(X_train)}")
print(f"Testing Samples  : {len(X_test)}")

# ----------------------------
# Models
# ----------------------------

models = {
    "Decision Tree": DecisionTreeClassifier(random_state=42),

    "Random Forest": RandomForestClassifier(
        n_estimators=200,
        random_state=42
    ),

    "Logistic Regression": LogisticRegression(
        max_iter=5000
    ),

    "XGBoost": XGBClassifier(
        eval_metric="mlogloss",
        random_state=42
    )
}

best_model = None
best_accuracy = 0

print("\n===============================")
print("Model Performance")
print("===============================\n")

for name, model in models.items():

    model.fit(X_train, y_train)

    prediction = model.predict(X_test)

    accuracy = accuracy_score(y_test, prediction)

    print(f"{name}")
    print(f"Accuracy : {accuracy:.4f}")
    print("-" * 40)

    if accuracy > best_accuracy:
        best_accuracy = accuracy
        best_model = model

# ----------------------------
# Save Best Model
# ----------------------------

MODEL_DIR = os.path.join(BASE_DIR, "backend", "models")
os.makedirs(MODEL_DIR, exist_ok=True)

joblib.dump(best_model, os.path.join(MODEL_DIR, "crop_model.pkl"))
joblib.dump(encoder, os.path.join(MODEL_DIR, "label_encoder.pkl"))

print("\n===================================")
print("Best Accuracy :", round(best_accuracy*100,2), "%")
print("Model Saved Successfully")
print("===================================")