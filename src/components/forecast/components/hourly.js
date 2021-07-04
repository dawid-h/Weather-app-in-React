import { WeatherOverview } from "./WeatherOverview";
import GridContainer from "../../styles/GridContainer";
import GridItem from "../../styles/GridItem";

export function Hourly(props) {
  return (
    <div>
      <h1>{props.location.name}, {props.location.country}</h1>
      <h4>
        <WeatherOverview {...props.forecast.forecastday} />
      </h4>
      <GridContainer moreCols>
        {props.forecast.forecastday[0].hour.map(x =>
          <GridItem key={x.time.substr(x.time.length - 5)}>
            <h2>{x.time.substr(x.time.length - 5)}</h2>
            <h3>{x.temp_c}°C</h3>
            <img src={`http:${x.condition.icon}`} alt="" />
            <p>{x.condition.text}</p>
          </GridItem>
        )}
      </GridContainer>
    </div>
  );
}