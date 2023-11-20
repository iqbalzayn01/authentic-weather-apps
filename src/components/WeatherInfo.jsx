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
  const [information, setInformation] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

  const getWeather = async (event) => {
    event.preventDefault();

    if (!city) {
      setInformation("Please enter a city name.");
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
        setInformation("City not found. Please try again.");
        setWeatherData(null);
      }
    } catch (error) {
      console.log("Error fetching weather data: " + error);
      setInformation("Error fetching weather data. Please try again.");
      setWeatherData(null);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      setInformation(null);
      setWeatherData(null);
    }
  };
  return (
    <>
      <main
        className={`relative container w-full h-[80px] bg-second-color rounded-2xl overflow-hidden transition-[height] duration-1000 ease-in-out ${
          weatherData || information ? "weather-info-open" : ""
        }`}
      >
        <form id="weatherForm" className="px-5 py-6 z-20" onSubmit={getWeather}>
          <div className="flex w-full items-center justify-center gap-5">
            <FontAwesomeIcon icon={faLocationDot} size="xl" color="#FA7070" />
            <input
              type="text"
              id="city"
              className="w-4/5 outline-none text-2xl font-medium uppercase bg-transparent placeholder:text-gray-300"
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

        <p className={`text-center ${!weatherData ? "block" : "hidden"}`}>
          {information}
        </p>

        <section
          className={`absolute flex w-full justify-between px-5 py-6 opacity-0 translate-y-full transition-transform duration-1000 ease-in-out ${
            weatherData ? "fade-in" : ""
          }`}
        >
          {weatherData && (
            <>
              <div className="flex flex-col w-full items-start gap-3">
                <div className="flex w-full justify-between">
                  <div className="flex flex-col gap-1">
                    <p className="flex items-center gap-2 text-4xl font-bold">
                      <FontAwesomeIcon
                        icon={faTemperatureHalf}
                        color="#FA7070"
                      />
                      {weatherData.temperature} °C
                    </p>
                    <p className="weather-desc">
                      {weatherData.weatherDescription}
                    </p>
                  </div>
                  <FontAwesomeIcon
                    icon={faCloudSun}
                    size="7x"
                    color="#EFD595"
                  />
                </div>
                <p className="flex items-center gap-3 font-semibold">
                  {weatherData.cityName}
                  <FontAwesomeIcon icon={faLocationDot} color="#FA7070" />
                </p>
                <div className="flex items-center gap-5">
                  <p className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faDroplet} color="#42C2FF" />
                    {weatherData.humidity} %
                  </p>
                  <p className="flex items-center gap-3">
                    <FontAwesomeIcon icon={faWind} color="#42C2FF" />
                    {weatherData.windSpeed} m/s
                  </p>
                </div>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
};
