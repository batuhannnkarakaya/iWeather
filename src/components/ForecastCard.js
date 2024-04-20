import React, { useState, useEffect } from 'react';
import { fetchForecastData } from './api';
import ClearDay from '../assets/ClearDay.png';
import CloudDay from '../assets/CloudDay.png';
import FewCloudDay from '../assets/Few cloudDay.png';
import RainDay from '../assets/RainDay.png';
import StormDay from '../assets/StormDay.png';
import './ForecastCard.css'

const ForecastCard = ({ cityName, apiKey }) => {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchForecastData(cityName);
        setForecastData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [cityName]);
// Gece saatlerindeki hava durumu tahminlerini filtreleyen fonksiyon
  const getNoonForecasts = (forecastList) => {
    const noonForecasts = forecastList.filter(forecast => {
      const date = new Date(forecast.dt_txt);
      return date.getHours() === 12;
    });

    return noonForecasts;
  };

  const getNightForecasts = (forecastList) => {
    const nightForecasts = forecastList.filter(forecast => {
      const date = new Date(forecast.dt_txt);
      return date.getHours() === 3;
    });

    return nightForecasts;
  };

  if (loading) {
    return <div>Loading forecast...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!forecastData || !forecastData.list) {
    return <div>No forecast data available</div>;
  }

  const getWeatherIcon = (description) => {
    switch (description) {
      case 'Clear':
        return ClearDay;
      case 'Clouds':
        return CloudDay;
      case 'Few Clouds':
        return FewCloudDay;
      case 'Rain':
        return RainDay;
      case 'Storm':
        return StormDay;
      default:
        return '';
    }
  };

  const kelvinToCelsius = (kelvin) => {
    return (kelvin - 273.15).toFixed(0);
  };

  const noonForecasts = getNoonForecasts(forecastData.list);

  return (
    <div className="forecast">
      <div className="forecast-cards">
        {noonForecasts.map((forecast, index) => {
          const nightForecast = getNightForecasts(forecastData.list);
          return (
            <div key={index} className="forecast-card">
              <h3>{new Date(forecast.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' }).slice(0, 3)}</h3>
              <img src={getWeatherIcon(forecast.weather[0].main)} alt="Weather Icon" />
              <h1>{kelvinToCelsius(forecast.main.temp)}°C</h1>
              {nightForecast.length > 0 && <p>{kelvinToCelsius(nightForecast[0].main.temp)}°C</p>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ForecastCard;
