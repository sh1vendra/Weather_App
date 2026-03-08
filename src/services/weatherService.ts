import { CurrentWeatherData, ForecastData } from '../types/weather';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

async function request<T>(url: string): Promise<T> {
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod === '404' || data.cod === 404) {
    throw new Error('City not found. Try a different search.');
  }
  if (data.cod === 401) {
    throw new Error('Weather service unavailable.');
  }
  if (!res.ok) {
    throw new Error('Failed to fetch weather data.');
  }
  return data as T;
}

export function fetchCurrentWeather(city: string): Promise<CurrentWeatherData> {
  return request(`${BASE_URL}/weather?q=${encodeURIComponent(city)}&units=imperial&APPID=${API_KEY}`);
}

export function fetchForecast(city: string): Promise<ForecastData> {
  return request(`${BASE_URL}/forecast?q=${encodeURIComponent(city)}&units=imperial&APPID=${API_KEY}`);
}

export function fetchCurrentWeatherByCoords(lat: number, lon: number): Promise<CurrentWeatherData> {
  return request(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=${API_KEY}`);
}

export function fetchForecastByCoords(lat: number, lon: number): Promise<ForecastData> {
  return request(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=imperial&APPID=${API_KEY}`);
}
