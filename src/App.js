import React, {useState} from 'react';
import axios from 'axios';
import './App.css';
import search from "./assets/search.png";
function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = 'eee54dc8ae136682e914fc2e904cbd51';

  const handleSearch = async () => {
    try {
      setError(null);      
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
      
      if (response.status !== 200) {
        setError('Weather data not found.');
        return;
      }
      setWeatherData(response.data);
    } catch (error) {
      setError('An error occurred while fetching weather data.');
    }
  };

  return (
    <div className="App">
      <div className='main-container'>
        <span className='logo'>WeatherInsights</span>
        <div className='top-container'>
          <div className='input-container'>
            <input type='text' 
                   placeholder='Enter City Name'
                   value={city}
                   onChange={(e)=> setCity(e.target.value)}></input>
            <button className='search-btn'
                    onClick={handleSearch}>
              <img className='search' src={search} alt=''/ >
            </button>
          </div> 
        </div>
        {error && <p className="error">{error}</p>}
        {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp}°C</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
