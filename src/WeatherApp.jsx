import React, { useState } from "react";
import axios from "axios";
import "./WeatherApp.css"; // Stil uchun alohida faylni import qilyapmiz

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "b03a640e5ef6980o4da35b006t5f2942"; // OpenWeatherMap API kalitingizni joylang

  const fetchWeather = async () => {
    if (!city) return alert("Shahar nomini kiriting!");
    try {
      const response = await axios.get(
        `https://api.shecodes.io/weather/v1/current?query=Rabat&key=${API_KEY}`,
        {
          params: {
            q: city,
            units: "metric",
            appid: API_KEY,
          },
        }
      );
      setWeather(response.data);
    } catch (error) {
      alert("Shahar topilmadi yoki xatolik yuz berdi. Iltimos, qaytadan urinib ko'ring.");
      console.error(error);
    }
  };

  return (
    <div className="weather-container">
      <h1 className="heading">Ob-Havo Ilovasi</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Shahar nomini kiriting"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="input"
        />
        <button onClick={fetchWeather} className="button">
          Qidirish
        </button>
      </div>
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <h3>{weather.main.temp}°C</h3>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
