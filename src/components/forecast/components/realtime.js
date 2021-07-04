import { useRef, useState } from "react";
import { useWeatherAPI } from "../../../hooks/useWeatherAPI";
import { WeatherGIF } from "./WeatherGIF";
import { WeatherOverview } from "./WeatherOverview";

export function Realtime(forecast) {
  const FIFTEEN_MINUTES = 900000;
  const [error, setError] = useState(false);
  const key = useWeatherAPI();
  const refresh = useRef(null);
  const fetchDataFromAPI = () => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&q=` +
          `${forecast.location.lat},${forecast.location.lon}&days=3`
    ).then(response => {
      if (!response.ok)
        throw Error("No connection");
      return response.json();
    }).then(data => {
      forecast = {...forecast, ...data};
      setError(false);
    }).catch(() => {
      setError(true);
    });
  }

  if (refresh.current === null)
    fetchDataFromAPI();
  
  clearInterval(refresh.current);
  refresh.current = setInterval(() => fetchDataFromAPI(), FIFTEEN_MINUTES);

  function writeErrorIfOccurred() {
    return error ? 'Loading current data failed' : '';
  }

  return (
    <div>
      <p>{writeErrorIfOccurred()}</p>
      <h1>{forecast.location.name}, {forecast.location.country}</h1>
      <h4>
        <WeatherOverview {...forecast.forecast.forecastday} />
      </h4>
      <WeatherGIF condition={forecast.current.condition.text} />
      <h2>{forecast.current.temp_c}°C</h2>
      <img src={`http:${forecast.current.condition.icon}`} alt="current weather" />
      <p>{forecast.current.condition.text}</p>
    </div>
  );
}