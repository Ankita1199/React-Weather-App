import React, { useState } from 'react';

function Weather(){

    const apiKey=import.meta.env.VITE_API_KEY;

    const [city,setCity]=useState('');
    const [weather,setWeather]=useState(null);

    const getWeather = async () => {
        if (!city) return;
    
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
          );
          const data = await res.json();
          if (data.cod === 200) {
            setWeather(data);
          } else {
            alert('City not found');
          }
        } catch (err) {
          alert('Error fetching weather');
        }
      };

      return (
        <div>
          <input
            type="text"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          /><br></br>
          <button onClick={getWeather}>Get Weather</button>
    
          {weather && (
            <div style={{ marginTop: '20px' }}>
              <h2>{weather.name}</h2>
              <p>🌡 Temperature: {weather.main.temp} °C</p>
              <p>☁ Condition: {weather.weather[0].description}</p>
            </div>
          )}
        </div>
      );

    
}

export default Weather;