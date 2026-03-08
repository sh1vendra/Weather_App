export function formatDate(date: Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${days[date.getDay()]} ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export function formatTime(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
}

export function hpaToInHg(hpa: number): string {
  return (hpa * 0.02953).toFixed(2);
}

export function degToCompass(deg: number): string {
  const dirs = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return dirs[Math.round(deg / 22.5) % 16];
}

export function metersToMiles(meters: number): string {
  return (meters / 1609.34).toFixed(1);
}

export function getDayName(timestamp: number): string {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[new Date(timestamp * 1000).getDay()];
}

export function getBackgroundClass(iconCode: string, conditionId: number): string {
  if (iconCode.endsWith('n')) return 'bg-night';
  if (conditionId >= 200 && conditionId < 300) return 'bg-thunder';
  if (conditionId >= 300 && conditionId < 600) return 'bg-rain';
  if (conditionId >= 600 && conditionId < 700) return 'bg-snow';
  if (conditionId >= 700 && conditionId < 800) return 'bg-fog';
  if (conditionId === 800) return 'bg-clear';
  return 'bg-cloudy';
}
