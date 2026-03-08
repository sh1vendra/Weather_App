import React from 'react';

interface Props {
  code: string;
  description: string;
  size?: 2 | 4;
  className?: string;
}

const WeatherIcon: React.FC<Props> = ({ code, description, size = 2, className }) => (
  <img
    src={`https://openweathermap.org/img/wn/${code}@${size}x.png`}
    alt={description}
    className={className}
  />
);

export default WeatherIcon;
