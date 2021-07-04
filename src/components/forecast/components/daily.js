import GridContainer from "../../styles/GridContainer";
import GridItem from "../../styles/GridItem";
import NightTemp from "../../styles/NightTemp";
import { WeatherOverview } from "./WeatherOverview";

export function Daily(props) {
  const days = ['Today', 'Tomorrow', 'The day after tomorrow'];

  return (
    <div>
      <h1>{props.location.name}, {props.location.country}</h1>
      <h4>
        <WeatherOverview {...props.forecast.forecastday} />
      </h4>
      <GridContainer>
        {props.forecast.forecastday.map((elem, i) =>
          <GridItem>
            <h2>{days[i]}</h2>
            <h3>
              {elem.day.maxtemp_c}°C
              <NightTemp>
                {elem.day.mintemp_c}°C
              </NightTemp>
            </h3>
            <img src={`http:${elem.day.condition.icon}`} alt="" />
            <p>{elem.day.condition.text}</p>
          </GridItem>
        )}
      </GridContainer>
    </div>
  );
}