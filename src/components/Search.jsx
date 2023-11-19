import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

export const Search = ({ setWeatherInfo }) => {
  const [city, setCity] = useState("");

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
        const weatherDescription = data.weather[0].description;
        const temperature = data.main.temp;
        const cityName = data.name;

        const weatherInfo = `${cityName}: ${temperature}°C, ${weatherDescription}`;
        setWeatherInfo(weatherInfo);
      } else {
        setWeatherInfo("City not found. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      setWeatherInfo("An error occurred. Please try again later.");
    }
  };
  return (
    <>
      <form id="weather-container" className="weather" onSubmit={getWeather}>
        <label htmlFor="city">Enter City:</label>
        <div className="">
          <input
            type="text"
            id="city"
            placeholder="Enter city name"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button id="btnSearch">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
      </form>
    </>
  );
};

Search.propTypes = {
  setWeatherInfo: PropTypes.func.isRequired,
};
