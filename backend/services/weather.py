import os
import requests

from dotenv import load_dotenv

load_dotenv()

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY")

BASE_URL = "https://api.openweathermap.org/data/2.5/weather"


def get_weather(city):

    if not OPENWEATHER_API_KEY:
        raise ValueError("OPENWEATHER_API_KEY is not configured")

    params = {
        "q": city,
        "appid": OPENWEATHER_API_KEY,
        "units": "metric"
    }

    response = requests.get(
        BASE_URL,
        params=params,
        timeout=10
    )

    if response.status_code == 404:
        raise ValueError("City not found")

    if response.status_code == 401:
        raise ValueError("Invalid Weather API key")

    response.raise_for_status()

    data = response.json()

    return {
        "city": data["name"],
        "country": data["sys"]["country"],
        "temperature": data["main"]["temp"],
        "feels_like": data["main"]["feels_like"],
        "humidity": data["main"]["humidity"],
        "pressure": data["main"]["pressure"],
        "wind_speed": data["wind"]["speed"],
        "weather": data["weather"][0]["description"],
        "weather_main": data["weather"][0]["main"],
        "latitude": data["coord"]["lat"],
        "longitude": data["coord"]["lon"]
    }