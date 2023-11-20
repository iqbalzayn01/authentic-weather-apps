import { useEffect, useState } from "react";

export const CurrentWeather = () => {
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const getWeather = async () => {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;

        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);
        const data = await response.json();

        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const loc = data.name;

        setTemperature(`${temp}°C`);
        setDescription(desc);
        setLocation(loc);
      } catch (error) {
        setLocation("Unable to retrieve your location");
        console.error("Error fetching weather data:", error);
      }
    };

    getWeather();
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  return (
    <section className="container current-weather">
      <h2 id="location">{location}</h2>
      <h1 id="temperature">{temperature}</h1>
      <p id="description">{description}</p>
    </section>
  );
};
