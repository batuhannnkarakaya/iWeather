const apiKey = '42be23829f77b28df036ab39f58d3628';

const fetchWeatherData = async (cityName) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch weather data');
    }

    const weatherData = await response.json();
    console.log(weatherData)
    return weatherData;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

const fetchForecastData = async (cityName) => {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;
  

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch forecast data');
    }

    const forecastData = await response.json();
    console.log(forecastData);
    return forecastData;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    return null;
  }
};

const loadOptions = async (userInput) => {
  const weatherData = await fetchWeatherData(userInput);
  if (!weatherData) {
    return [];
  }

  return [{
    value: weatherData.name,
    label: `${weatherData.name}, ${weatherData.sys.country}`
  }];
};

export { fetchWeatherData, fetchForecastData, loadOptions };
