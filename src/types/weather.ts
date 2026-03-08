export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface WeatherMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
}

export interface WeatherWind {
  speed: number;
  deg: number;
  gust?: number;
}

export interface WeatherSys {
  country: string;
  sunrise: number;
  sunset: number;
}

export interface CurrentWeatherData {
  name: string;
  cod: number | string;
  main: WeatherMain;
  wind: WeatherWind;
  clouds: { all: number };
  visibility: number;
  sys: WeatherSys;
  weather: WeatherCondition[];
  rain?: { '1h'?: number; '3h'?: number };
  snow?: { '1h'?: number; '3h'?: number };
}

export interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  wind: { speed: number; deg: number };
  pop: number;
}

export interface ForecastData {
  list: ForecastItem[];
  city: { name: string; country: string };
}

export interface DailyForecast {
  date: string;
  dayName: string;
  high: number;
  low: number;
  icon: string;
  description: string;
}
