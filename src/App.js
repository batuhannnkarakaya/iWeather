import React, { useState } from 'react';
import AsyncSelect from 'react-select/async';
import { loadOptions } from './components/api';
import WeatherCard from './components/WeatherCard';
import ForecastCard from './components/ForecastCard';
import Logo from './components/images/Logo.png';
import './App.css';

const apiKey = '42be23829f77b28df036ab39f58d3628';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [welcomeHidden, setWelcomeHidden] = useState(false);
// AsyncSelect bileşeninde kullanılacak özel loadOptions fonksiyonu
  const customLoadOptions = async (inputValue, callback) => {
    const userInput = inputValue.trim();
    if (!userInput) {
      callback([]);
      return;
    }

    const options = await loadOptions(userInput);
    callback(options);
  };

  const handleCitySelect = async (selectedOption) => {
    if (selectedOption) {
      try {
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${selectedOption.value}&units=metric&appid=${apiKey}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        const weatherData = await response.json();
        setWeatherData(weatherData);
        setWelcomeHidden(true); // Arama yapıldığında welcome divini gizle
        
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    }
  };

  return (
    <div className="App">
     

      <div className={`welcome ${welcomeHidden ? 'hidden' : ''}`}>
      <div className='logo'>
        <img src={Logo} alt="iWeather Logo" />
        <h1>iWeather</h1>
      </div>
        <h1>Welcome to <span>TypeWeather</span></h1>
        <p>Choose a location to see the weather forecast</p>
        <div className="search-box-container">
          <div className="search-box">
            <AsyncSelect
              cacheOptions
              defaultOptions
              loadOptions={customLoadOptions}
              onChange={handleCitySelect}
            />
          </div>
        </div>
      </div>

      {weatherData && (
        <>
          <WeatherCard weatherData={weatherData} />
          <ForecastCard cityName={weatherData.name}  />
        </>
      )}
    </div>
  );
};

export default App;
