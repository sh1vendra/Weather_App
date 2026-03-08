import React, { useEffect, useRef } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import WeatherDetails from './components/WeatherDetails/WeatherDetails';
import Forecast from './components/Forecast/Forecast';
import { useWeather } from './hooks/useWeather';
import { useGeolocation } from './hooks/useGeolocation';
import { getBackgroundClass } from './utils/formatters';
import './App.css';

const App: React.FC = () => {
  const { currentWeather, forecast, isLoading, error, searchByCity, searchByCoords } = useWeather();
  const { latitude, longitude, isLoading: geoLoading } = useGeolocation();
  const geoFetched = useRef(false);

  useEffect(() => {
    if (!geoLoading && latitude && longitude && !geoFetched.current) {
      geoFetched.current = true;
      searchByCoords(latitude, longitude);
    }
  }, [latitude, longitude, geoLoading, searchByCoords]);

  const bgClass = currentWeather
    ? getBackgroundClass(currentWeather.weather[0].icon, currentWeather.weather[0].id)
    : 'bg-default';

  const handleLocationClick = () => {
    if (latitude && longitude) searchByCoords(latitude, longitude);
  };

  return (
    <div className={`app ${bgClass}`}>
      <div className="app-container">
        <SearchBar onSearch={searchByCity} onLocationClick={handleLocationClick} />

        {isLoading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Fetching weather...</p>
          </div>
        )}

        {!isLoading && error && (
          <div className="error-state">
            <span>⚠️</span>
            <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && !currentWeather && (
          <div className="empty-state">
            <div className="empty-icon">🌤️</div>
            <p>Search for a city or allow location access to get started</p>
          </div>
        )}

        {!isLoading && currentWeather && (
          <div className="weather-content">
            <CurrentWeather data={currentWeather} />
            <WeatherDetails data={currentWeather} />
            <Forecast forecast={forecast} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
