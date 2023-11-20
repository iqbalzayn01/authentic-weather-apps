import { Header } from "./components/Header";
import { WeatherSearch } from "./components/WeatherSearch";
import { CurrentWeather } from "./components/CurrentWeather";

export default function App() {
  return (
    <>
      <Header />
      <CurrentWeather />
      <WeatherSearch />
    </>
  );
}
