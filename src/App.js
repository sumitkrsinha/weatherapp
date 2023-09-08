import React, {useState} from 'react';
import axios from 'axios';
import './App.css';
import search from "./assets/search.png";
function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  // const [icon, setIcon] = useState("");
  const[elementdisplay, setElementdisplay] = useState('flex');
  

  const API_KEY = 'eee54dc8ae136682e914fc2e904cbd51';

  const handleSearch = async () => {
    
    // setError(null);

    try { 
      setError(null);
      // setElementdisplay('none');     
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`);
      
      setWeatherData(response.data);
      // setIcon(weatherData.weather[0].icon);
      // const weather_icon = weatherData.weather[0].icon;
      // setElementdisplay('none');
    } catch (error) {
        setError('An error occurred while the is fetching weather data.');
        setWeatherData(null);
        setCity('');
    }
  };

  const close = () => {
    setElementdisplay('flex');
    setWeatherData(null);
    setCity('');
    setError(null);
  }

  return (
    <div className="App">
      <div className='main-container'>
        <h1 className='logo'>WeatherInsights</h1>
        <div className='top-container' style={{ display: elementdisplay }}>
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
          <div className="weather-info-card" >
            <div className='x'>
              <button onClick={close}>X</button>
            </div>
            <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="User Avatar" />
            <h2 className='city-name'>{weatherData.name}</h2>
            <div className='text'>
              {/* <h2 className='usrnm'>{weatherData.name}</h2> */}
              <p>Temperature: {weatherData.main.temp}°C</p>
              <p>Weather: {weatherData.weather[0].description}</p>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} km/h</p>
            </div>
          </div>        
        )}
        <div className='credit'>
          <a href='https://www.linkedin.com/in/sumit-kumar-sinha-676b1b216/'>Developed & maintained by @sumitkumarsinha</a>
        </div>
      </div>
    </div>
  );
}

export default App;
