import React, { useState, useEffect } from 'react';
import './WeatherWidget.css';

// Simulate fetching weather data
const fetchWeatherData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const conditions = ['Sunny', 'Cloudy', 'Rainy'];
      const randomCondition = conditions[Math.floor(Math.random() * conditions.length)];
      const temperature = Math.floor(Math.random() * (35 - 15 + 1)) + 15; // Random temperature between 15 and 35

      if (Math.random() < 0.2) {
        // Simulate a 20% chance of error
        reject("Failed to fetch weather data");
      } else {
        resolve({ condition: randomCondition, temperature });
      }
    }, 2000); // Simulate a 2 second delay
  });
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState({
    condition: 'Sunny', // Default to Sunny in case of error
    temperature: 25,    // Default temperature
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getWeather = async () => {
      setLoading(true);

      try {
        const data = await fetchWeatherData();
        setWeather(data);
      } catch (err) {
        console.error("Weather fetch error:", err);
        // Optionally log the error or show a fallback
      } finally {
        setLoading(false);
      }
    };

    getWeather();
  }, []); // Run once when the component is mounted

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case 'Sunny':
        return '☀️'; // Sun emoji for sunny
      case 'Cloudy':
        return '☁️'; // Cloud emoji for cloudy
      case 'Rainy':
        return '🌧️'; // Rain emoji for rainy
      default:
        return '❓'; // Question mark for unknown
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="weather-widget">
      <h2>Weather Widget</h2>
      <div>
        <div className="condition">
          {getWeatherIcon(weather.condition)} {weather.condition}
        </div>
        <div className="temperature">
          {weather.temperature}°C
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;

