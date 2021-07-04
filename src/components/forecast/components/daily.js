import GridContainer from "../../styles/GridContainer";
import GridItem from "../../styles/GridItem";
import SideInfo from "../../styles/SideInfo";
import NightTemp from "../../styles/NightTemp";
import { WeatherOverview } from "./WeatherOverview";
import { WeatherGIF } from "./WeatherGIF";

export function Daily(props) {
  const days = ['Today', 'Tomorrow', 'The day after tomorrow'];

  return (
    <div>
      <h1>{props.location.name}, {props.location.country}</h1>
      <SideInfo>
        <WeatherOverview {...props.forecast.forecastday} />
        <WeatherGIF condition={props.current.condition.text} />
      </SideInfo>
      <GridContainer>
        {props.forecast.forecastday.map((elem, i) =>
          <GridItem key={i}>
            <h2>{days[i]}</h2>
            <h3>
              {elem.day.maxtemp_c}°C
              <NightTemp>
                {elem.day.mintemp_c}°C
              </NightTemp>
            </h3>
            <img src={`http:${elem.day.condition.icon}`} alt="weather condition" />
            <p>{elem.day.condition.text}</p>
          </GridItem>
        )}
      </GridContainer>
    </div>
  );
}