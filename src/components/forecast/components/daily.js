import { WeatherOverview } from "./WeatherOverview";

export function Daily(props) {
  return (
    <div>
      <h1>{props.location.name}, {props.location.country}</h1>
      <h4>
        <WeatherOverview {...props.forecast.forecastday} />
      </h4>
      <span>
        <h2>Dzisiaj</h2>
        <h3>
          {props.forecast.forecastday[0].day.maxtemp_c}°C
          <span>
            {props.forecast.forecastday[0].day.mintemp_c}°C
          </span>
        </h3>
        <img src={`http:${props.forecast.forecastday[0].day.condition.icon}`} alt="" />
        <p>{props.forecast.forecastday[0].day.condition.text}</p>
      </span>
      <span>
        <h2>Jutro</h2>
        <h3>
          {props.forecast.forecastday[1].day.maxtemp_c}°C
          <span>
            {props.forecast.forecastday[1].day.mintemp_c}°C
          </span>
        </h3>
        <img src={`http:${props.forecast.forecastday[1].day.condition.icon}`} alt="" />
        <p>{props.forecast.forecastday[1].day.condition.text}</p>
      </span>
      <span>
        <h2>Pojutrze</h2>
        <h3>
          {props.forecast.forecastday[2].day.maxtemp_c}°C
          <span>
            {props.forecast.forecastday[2].day.mintemp_c}°C
          </span>
        </h3>
        <img src={`http:${props.forecast.forecastday[2].day.condition.icon}`} alt="" />
        <p>{props.forecast.forecastday[2].day.condition.text}</p>
      </span>
    </div>
  );
}