import { useState } from "react";
import { realtime$ } from "../../../hooks/useWeatherAPIRealtime";
import SideInfo from "../../styles/SideInfo";
import { WeatherGIF } from "./WeatherGIF";
import { WeatherOverview } from "./WeatherOverview";

export function Realtime(forecast) {
  const [error, setError] = useState(false);
  
  realtime$(forecast.location.lat, forecast.location.lon).subscribe({
    next: data => {
      forecast = {...forecast, ...data};
      setError(false);
    },
    error: err => {
      setError(true);
      console.log(err);
    }
  });

  function writeErrorIfOccurred() {
    return error ? 'Loading current data failed' : '';
  }

  return (
    <div>
      <p>{writeErrorIfOccurred()}</p>
      <h1>{forecast.location.name}, {forecast.location.country}</h1>
      <SideInfo>
        <WeatherOverview {...forecast.forecast.forecastday} />
        <WeatherGIF condition={forecast.current.condition.text} />
      </SideInfo>
      <h2>{forecast.current.temp_c}°C</h2>
      <img src={`http:${forecast.current.condition.icon}`} alt="wether condition" />
      <p>{forecast.current.condition.text}</p>
    </div>
  );
}