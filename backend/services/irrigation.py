def calculate_irrigation(
    crop,
    temperature,
    humidity,
    rainfall,
    soil_moisture,
    soil_type,
    growth_stage
):
    """
    Explainable irrigation recommendation engine.

    Returns water requirement, irrigation frequency,
    recommended amount, rainfall adjustment and priority.
    """

    # --------------------------------
    # 1. Crop water requirement
    # --------------------------------

    crop_water = {
        "rice": 1.30,
        "maize": 1.00,
        "wheat": 0.90,
        "cotton": 1.00,
        "sugarcane": 1.30,
        "banana": 1.20,
        "tomato": 0.90,
        "potato": 0.85,
        "chickpea": 0.65,
        "lentil": 0.60,
        "default": 0.85
    }

    crop_factor = crop_water.get(
        crop.lower(),
        crop_water["default"]
    )

    # --------------------------------
    # 2. Growth-stage factor
    # --------------------------------

    growth_factors = {
        "seedling": 0.70,
        "vegetative": 0.90,
        "flowering": 1.20,
        "fruiting": 1.15,
        "maturity": 0.80
    }

    stage_factor = growth_factors.get(
        growth_stage.lower(),
        1.0
    )

    # --------------------------------
    # 3. Soil retention factor
    # --------------------------------

    soil_factors = {
        "sandy": 1.20,
        "loamy": 1.00,
        "clay": 0.80
    }

    soil_factor = soil_factors.get(
        soil_type.lower(),
        1.0
    )

    # --------------------------------
    # 4. Temperature factor
    # --------------------------------

    if temperature >= 35:
        temperature_factor = 1.25
    elif temperature >= 30:
        temperature_factor = 1.15
    elif temperature >= 25:
        temperature_factor = 1.05
    elif temperature >= 18:
        temperature_factor = 1.00
    else:
        temperature_factor = 0.85

    # --------------------------------
    # 5. Humidity factor
    # --------------------------------

    if humidity >= 85:
        humidity_factor = 0.75
    elif humidity >= 70:
        humidity_factor = 0.90
    elif humidity >= 50:
        humidity_factor = 1.00
    else:
        humidity_factor = 1.15

    # --------------------------------
    # 6. Base water requirement
    # --------------------------------

    base_water = 20

    water_requirement = (
        base_water
        * crop_factor
        * stage_factor
        * soil_factor
        * temperature_factor
        * humidity_factor
    )

    # --------------------------------
    # 7. Soil moisture adjustment
    # --------------------------------

    if soil_moisture >= 80:
        moisture_adjustment = 0.50

    elif soil_moisture >= 60:
        moisture_adjustment = 0.75

    elif soil_moisture >= 40:
        moisture_adjustment = 1.00

    elif soil_moisture >= 25:
        moisture_adjustment = 1.20

    else:
        moisture_adjustment = 1.40

    water_requirement *= moisture_adjustment

    # --------------------------------
    # 8. Rainfall adjustment
    # --------------------------------

    if rainfall >= 50:
        rainfall_adjustment = 0.40

    elif rainfall >= 25:
        rainfall_adjustment = 0.60

    elif rainfall >= 10:
        rainfall_adjustment = 0.80

    else:
        rainfall_adjustment = 1.00

    water_requirement *= rainfall_adjustment

    # --------------------------------
    # 9. Determine priority
    # --------------------------------

    if soil_moisture < 25 and rainfall < 10:
        priority = "CRITICAL"

    elif soil_moisture < 40:
        priority = "HIGH"

    elif soil_moisture < 60:
        priority = "MEDIUM"

    else:
        priority = "LOW"

    # --------------------------------
    # 10. Irrigation frequency
    # --------------------------------

    if soil_moisture < 30:
        frequency = "Daily"

    elif soil_moisture < 50:
        frequency = "Every 2 days"

    elif soil_moisture < 70:
        frequency = "Every 3 days"

    else:
        frequency = "Every 4-5 days"

    # --------------------------------
    # 11. Final recommendation
    # --------------------------------

    water_requirement = round(
        max(0, water_requirement),
        2
    )

    return {
        "crop": crop,
        "water_requirement": water_requirement,
        "unit": "liters/m²",
        "frequency": frequency,
        "priority": priority,
        "rainfall_adjustment": rainfall_adjustment,
        "soil_moisture": soil_moisture,
        "soil_type": soil_type,
        "growth_stage": growth_stage
    }