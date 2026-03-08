import React from 'react';
import { CurrentWeatherData } from '../../types/weather';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import { formatDate } from '../../utils/formatters';
import './CurrentWeather.css';

interface Props {
  data: CurrentWeatherData;
}

const CurrentWeather: React.FC<Props> = ({ data }) => {
  const { name, sys, main, weather } = data;
  const condition = weather[0];

  return (
    <div className="current-weather">
      <div className="current-header">
        <div className="location-info">
          <h1 className="city-name">{name}, {sys.country}</h1>
          <p className="current-date">{formatDate(new Date())}</p>
          <p className="condition-desc">{condition.description}</p>
        </div>
        <WeatherIcon code={condition.icon} description={condition.description} size={4} className="main-icon" />
      </div>
      <div className="temp-row">
        <span className="main-temp">{Math.round(main.temp)}°F</span>
        <div className="temp-details">
          <span className="feels-like">Feels like {Math.round(main.feels_like)}°F</span>
          <span className="high-low">H: {Math.round(main.temp_max)}°&nbsp;&nbsp;L: {Math.round(main.temp_min)}°</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
