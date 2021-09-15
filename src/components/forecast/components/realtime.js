import { useEffect, useState } from "react";
import { realtime$ } from "../../../hooks/useWeatherAPIRealtime";
import SideInfo from "../../styles/SideInfo";
import { WeatherGIF } from "./WeatherGIF";
import { WeatherOverview } from "./WeatherOverview";

export function Realtime(forecastP) {
  const [state, setState] = useState({error: false, forecast: forecastP});
  const subscription = realtime$(forecastP.location.lat, forecastP.location.lon).subscribe({
    next: data => {
      setState({error: false, forecast: {...state.forecast, ...data}});
    },
    error: err => {
      setState({error: true, forecast: undefined});
      console.log(err);
    }
  });

  useEffect(() => {
    return () => subscription.unsubscribe();
  }, [subscription]);

  function writeErrorIfOccurred() {
    return state.error ? 'Loading current data failed' : '';
  }

  return (
    <div>
      <p>{writeErrorIfOccurred()}</p>
      <h1>{state.forecast.location.name}, {state.forecast.location.country}</h1>
      <SideInfo>
        <WeatherOverview {...state.forecast.forecast.forecastday} />
        <WeatherGIF condition={state.forecast.current.condition.text} />
      </SideInfo>
      <h2>{state.forecast.current.temp_c}°C</h2>
      <img src={`http:${state.forecast.current.condition.icon}`} alt="wether condition" />
      <p>{state.forecast.current.condition.text}</p>
    </div>
  );
}