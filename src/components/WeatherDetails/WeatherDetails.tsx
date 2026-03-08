import React from 'react';
import { CurrentWeatherData } from '../../types/weather';
import { hpaToInHg, degToCompass, metersToMiles, formatTime } from '../../utils/formatters';
import './WeatherDetails.css';

interface Props {
  data: CurrentWeatherData;
}

interface DetailCard {
  label: string;
  value: string;
  icon: string;
}

const WeatherDetails: React.FC<Props> = ({ data }) => {
  const { main, wind, visibility, sys } = data;

  const cards: DetailCard[] = [
    { icon: '💧', label: 'Humidity', value: `${main.humidity}%` },
    { icon: '🌬️', label: 'Wind', value: `${Math.round(wind.speed)} mph ${degToCompass(wind.deg)}` },
    { icon: '🌡️', label: 'Pressure', value: `${hpaToInHg(main.pressure)} inHg` },
    { icon: '👁️', label: 'Visibility', value: `${metersToMiles(visibility)} mi` },
    { icon: '🌅', label: 'Sunrise', value: formatTime(sys.sunrise) },
    { icon: '🌇', label: 'Sunset', value: formatTime(sys.sunset) },
  ];

  return (
    <div className="weather-details">
      {cards.map(card => (
        <div key={card.label} className="detail-card">
          <span className="detail-icon">{card.icon}</span>
          <span className="detail-label">{card.label}</span>
          <span className="detail-value">{card.value}</span>
        </div>
      ))}
    </div>
  );
};

export default WeatherDetails;
