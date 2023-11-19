import PropTypes from "prop-types";

export const WeatherInfo = ({ info }) => {
  return <p id="weather-info">{info}</p>;
};

WeatherInfo.propTypes = {
  info: PropTypes.string.isRequired,
};
