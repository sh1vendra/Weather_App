import React from 'react';
import { DailyForecast } from '../../types/weather';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import './Forecast.css';

interface Props {
  forecast: DailyForecast[];
}

const Forecast: React.FC<Props> = ({ forecast }) => {
  if (!forecast.length) return null;

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-list">
        {forecast.map(day => (
          <div key={day.date} className="forecast-card">
            <span className="forecast-day">{day.dayName}</span>
            <WeatherIcon code={day.icon} description={day.description} size={2} className="forecast-icon" />
            <div className="forecast-temps">
              <span className="forecast-high">{day.high}°</span>
              <span className="forecast-low">{day.low}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
