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

export const WeatherSearch = () => {
  const [city, setCity] = useState("");
  const [cityName, setCityName] = useState("");
  const [temperature, setTemperature] = useState("");
  const [weatherDescription, setWeatherDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [windSpeed, setWindSpeed] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

  const getWeather = async (event) => {
    event.preventDefault();

    if (!city) {
      alert("Please enter a city name.");
      return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.cod !== "404") {
        setCityName(data.name);
        setTemperature(data.main.temp);
        setWeatherDescription(data.weather[0].description);
        setHumidity(data.main.humidity);
        setWindSpeed(data.wind.speed);
      } else {
        alert("City not found. Please try again.");
      }
    } catch (error) {
      alert("Error fetching weather data: " + error);
      setWeatherDescription("An error occurred. Please try again later.");
    }
  };
  return (
    <>
      <section className="container seacrh">
        <form
          id="weather-container"
          className="weather-form"
          onSubmit={getWeather}
        >
          <div className="inputLocation">
            <FontAwesomeIcon icon={faLocationDot} size="xl" />
            <input
              type="text"
              id="city"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button id="btnSearch">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
            </button>
          </div>
        </form>
        {cityName && (
          <section className="weather-info">
            <div className="weather">
              <p className="temp">
                <FontAwesomeIcon icon={faTemperatureHalf} /> {temperature} °C
              </p>
              <p className="weather-desc">{weatherDescription}</p>
              <p className="location">
                {cityName}
                <FontAwesomeIcon icon={faLocationDot} />
              </p>
              <div className="weather-detail">
                <p>
                  <FontAwesomeIcon icon={faDroplet} />
                  {humidity} %
                </p>
                <p>
                  <FontAwesomeIcon icon={faWind} />
                  {windSpeed} m/s
                </p>
              </div>
            </div>
            <FontAwesomeIcon icon={faCloudSun} size="6x" />
          </section>
        )}
      </section>
    </>
  );
};
