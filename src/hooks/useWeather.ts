import { useState, useCallback } from 'react';
import { CurrentWeatherData, ForecastData, DailyForecast, ForecastItem } from '../types/weather';
import { fetchCurrentWeather, fetchForecast, fetchCurrentWeatherByCoords, fetchForecastByCoords } from '../services/weatherService';
import { getDayName } from '../utils/formatters';

function groupForecastByDay(forecastData: ForecastData): DailyForecast[] {
  const grouped: Record<string, ForecastItem[]> = {};

  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push(item);
  });

  const today = new Date().toDateString();

  return Object.entries(grouped)
    .filter(([date]) => date !== today)
    .slice(0, 5)
    .map(([date, items]) => {
      const high = Math.round(Math.max(...items.map(i => i.main.temp_max)));
      const low = Math.round(Math.min(...items.map(i => i.main.temp_min)));
      const midday = items.find(i => {
        const hour = new Date(i.dt * 1000).getHours();
        return hour >= 11 && hour <= 14;
      }) || items[Math.floor(items.length / 2)];
      return {
        date,
        dayName: getDayName(midday.dt),
        high,
        low,
        icon: midday.weather[0].icon,
        description: midday.weather[0].description,
      };
    });
}

export function useWeather() {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherData | null>(null);
  const [forecast, setForecast] = useState<DailyForecast[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const searchByCity = useCallback(async (city: string) => {
    if (!city.trim()) {
      setError('Please enter a city name');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const [weather, forecastData] = await Promise.all([
        fetchCurrentWeather(city.trim()),
        fetchForecast(city.trim()),
      ]);
      setCurrentWeather(weather);
      setForecast(groupForecastByDay(forecastData));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setCurrentWeather(null);
      setForecast([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchByCoords = useCallback(async (lat: number, lon: number) => {
    setIsLoading(true);
    setError('');
    try {
      const [weather, forecastData] = await Promise.all([
        fetchCurrentWeatherByCoords(lat, lon),
        fetchForecastByCoords(lat, lon),
      ]);
      setCurrentWeather(weather);
      setForecast(groupForecastByDay(forecastData));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { currentWeather, forecast, isLoading, error, searchByCity, searchByCoords };
}
