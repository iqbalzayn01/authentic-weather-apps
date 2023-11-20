import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faLocationDot,
  faTemperatureHalf,
  faCloudSun,
  faDroplet,
  faWind,
} from "@fortawesome/free-solid-svg-icons";

export const WeatherInfo = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = import.meta.env.VITE_API_KEY;

  const getWeather = async (event) => {
    event.preventDefault();

    if (!city) {
      alert("Please enter a city name.");
      setWeatherData(null);
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod !== "404") {
        setWeatherData({
          cityName: data.name,
          temperature: data.main.temp,
          weatherDescription: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        });
      } else {
        alert("City not found. Please try again.");
        setWeatherData(null);
      }
    } catch (error) {
      console.log("Error fetching weather data: " + error);
      setWeatherData(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      setWeatherData(null);
    }
  };
  return (
    <>
      <main className={`container ${weatherData ? "weather-info-open" : ""}`}>
        <form id="weatherForm" onSubmit={getWeather}>
          <div className="inputLocation">
            <FontAwesomeIcon icon={faLocationDot} size="xl" color="#FA7070" />
            <input
              type="text"
              id="city"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button id="btnSearch">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                size="xl"
                color="#FA7070"
              />
            </button>
          </div>
        </form>
        <section className={`weather-info ${weatherData ? "fade-in" : ""}`}>
          {weatherData && (
            <>
              <div className="weather">
                <p className="temp">
                  <FontAwesomeIcon icon={faTemperatureHalf} color="#FA7070" />{" "}
                  {weatherData.temperature} °C
                </p>
                <p className="weather-desc">{weatherData.weatherDescription}</p>
                <p className="location">
                  {weatherData.cityName}
                  <FontAwesomeIcon icon={faLocationDot} color="#FA7070" />
                </p>
                <div className="weather-detail">
                  <p>
                    <FontAwesomeIcon icon={faDroplet} color="#42C2FF" />
                    {weatherData.humidity} %
                  </p>
                  <p>
                    <FontAwesomeIcon icon={faWind} color="#42C2FF" />
                    {weatherData.windSpeed} m/s
                  </p>
                </div>
              </div>
              <FontAwesomeIcon icon={faCloudSun} size="6x" color="#EFD595" />
            </>
          )}
        </section>
      </main>
    </>
  );
};
