
export function WeatherOverview(forecast) {
  forecast = Object.values(forecast);

  function noRainyDays() {
    for (const day of forecast)
      if (day.day.daily_will_it_rain === 1)
        return 0;
    return 1;
  }

  function optimumAveragegTemp() {
    for (const day of forecast)
      if (18 > day.day.avgtemp_c || day.day.avgtemp_c > 25)
        return 0;
    return 1;
  }

  function optimumTempAmplitude() {
    for (const day of forecast)
      if (day.day.mintemp_c < 15 || 30 < day.day.maxtemp_c)
        return 0;
    return 1;
  }

  function weatherSummary() {
    const points = noRainyDays() + optimumAveragegTemp() + optimumTempAmplitude();
    switch (points) {
      case 0:
      case 1:
        return 'not nice';
      case 2:
        return 'passable';
      default:
        return 'nice';
    }
  }

  return (
    <div>
      The weather will be {weatherSummary()}.
    </div>
  );
}