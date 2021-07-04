import { WeatherOverview } from "./WeatherOverview";

export function Hourly(props) {
  return (
    <div>
      <h1>{props.location.name}, {props.location.country}</h1>
      <h4>
        <WeatherOverview {...props.forecast.forecastday} />
      </h4>
      {props.forecast.forecastday[0].hour.map(x =>
        <div key={x.time.substr(x.time.length - 5)}>
          <h2>{x.time.substr(x.time.length - 5)}</h2>
          <h3>{x.temp_c}°C</h3>
          <img src={`http:${x.condition.icon}`} alt="" />
          <p>{x.condition.text}</p>
        </div>
      )}
    </div>
  );
}