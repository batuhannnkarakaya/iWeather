import React, { useState, useEffect } from 'react';
import './WeatherCard.css'
import clearday from "../assets/ClearDay.png"
import cloudday from "../assets/CloudDay.png"
import fewcloudday from "../assets/Few cloudDay.png"
import rainday from "../assets/RainDay.png"
import stormday from "../assets/StormDay.png"
import clearnight from "../assets/ClearNight.png"
import cloudnight from "../assets/CouldNight.png"
import fewcloudnight from "../assets/Few cloudNight.png"
import rainnight from "../assets/RainNight.png"
import stormnight from "../assets/StormNight.png"
import windIcon from "../assets/wind-light.png"
import humidityIcon from "../assets/humidity.svg"
import thermalIcon from "../assets/thermal.png"

const WeatherCard = ({ weatherData }) => {
  const [loading, setLoading] = useState(true);
  const [backgroundClass, setBackgroundClass] = useState(null);

  useEffect(() => {
    if (weatherData) {
      setLoading(false);
      setWeatherBackground(weatherData);
    }
  }, [weatherData]);

  // Hava durumuna göre arka plan sınıfını belirleyen fonksiyon
  const setWeatherBackground = (data) => {
    const sunrise = data.sys.sunrise * 1000;
    const sunset = data.sys.sunset * 1000;
    const currentTime = new Date().getTime();
    const isDayTime = currentTime > sunrise && currentTime < sunset;
    const description = data.weather[0].main;
    const backgroundClass = setBackground(isDayTime, description);
    setBackgroundClass(backgroundClass);
  };

  function setBackground(isDaytime, description) {
    if (isDaytime) {
      if (description === "Clear") {
        return "bg-clear-day";
      } else if (description === "Clouds") {
        return "bg-cloud-day";
      } else if (description === "Few Clouds") {
        return "bg-few-clouds-day";
      } else if (description === "Rain") {
        return "bg-rain-day";
      } else if (description === "Storm") {
        return "bg-storm-day";
      } else {
        return "bg-clear-day";
      }
    } else {
      if (description === "Clear") {
        return "bg-clear-night";
      } else if (description === "Clouds") {
        return "bg-cloud-night";
      } else if (description === "Few Clouds") {
        return "bg-few-clouds-night";
      } else if (description === "Rain") {
        return "bg-rain-night";
      } else if (description === "Storm") {
        return "bg-storm-night";
      } else {
        return "bg-clear-night"; 
      }
    }
  }

  if (loading) {
    return <div>Loading weather data...</div>;
  }

  const { name, weather, main, dt, wind ,sys} = weatherData;
  const { temp, temp_max, temp_min, feels_like, humidity } = main;
  const{country}= sys;
  const { speed } = wind;
  const date = new Date(dt * 1000);
console.log(backgroundClass)
  return (
    <div className="weather-card">
      <div className='top-container'>
      <div className={`top-card ${backgroundClass}`}>
        <div className="info">
          <h2>{name},{country}</h2>
          <p>{date.toLocaleDateString()}</p>
        </div>
        
        <div className="weather">
        <p>{temp.toFixed(0)}°c</p>
        <p>{temp_max.toFixed(0)}°c /</p>
        <p>{temp_min.toFixed(0)}°c</p>
        <p>{weather[0].main}</p>
        </div>
        <div className="icon" >
      {backgroundClass === 'bg-clear-day' && <img src={clearday} alt="Clear Day" />}
      {backgroundClass === 'bg-cloud-day' && <img src={cloudday} alt="Clear Day" />}
      {backgroundClass === 'bg-few-clouds-day' && <img src={fewcloudday} alt="Clear Day" />}
      {backgroundClass === 'bg-rain-day' && <img src={rainday} alt="Clear Day" />}
      {backgroundClass === 'bg-storm-day' && <img src={stormday} alt="Clear Day" />}
      {backgroundClass === 'bg-clear-night' && <img src={clearnight} alt="Clear Day" />}
      {backgroundClass === 'bg-cloud-night' && <img src={cloudnight} alt="Clear Day" />}
      {backgroundClass === 'bg-few-clouds-night' && <img src={fewcloudnight} alt="Clear Day" />}
      {backgroundClass === 'bg-rain-night' && <img src={rainnight} alt="Clear Day" />}
      {backgroundClass === 'bg-storm-night' && <img src={stormnight} alt="Clear Day" />}
      </div>
      </div>
      </div>
      <div className="middle-card">
        <div className='weather-details'>
        <p><img src={thermalIcon} alt="thermalIcon Icon" />Thermal Sensation: <span>{feels_like.toFixed(0)}°c</span></p>
        <p><img src={windIcon} alt="Wind Icon" />Wind Speed: <span>{speed} </span>m/s</p>
        <p><img src={humidityIcon} alt="Humidity Icon" />Humidity: <span>{humidity}</span>%</p>
      </div>
      </div>
    </div>
  );
};

export default WeatherCard;
