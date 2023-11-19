import { useState } from "react";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import { WeatherInfo } from "./components/WeatherInfo";
export default function App() {
  const [weatherInfo, setWeatherInfo] = useState("");
  return (
    <>
      <Header />
      <Search setWeatherInfo={setWeatherInfo} />
      <WeatherInfo info={weatherInfo} />
    </>
  );
}
