import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useWeatherAPI } from "../hooks/useWeatherAPI";

/* The example of an API answer:
{
  "location": {
    "name": "Mosty",
    "region": "",
    "country": "Poland",
    "lat": 54.62,
    "lon": 18.47,
    "tz_id": "Europe/Warsaw",
    "localtime_epoch": 1625041964,
    "localtime": "2021-06-30 10:32"
  },
  "current": {
    "last_updated_epoch": 1625040900,
    "last_updated": "2021-06-30 10:15",
    "temp_c": 26,
    "temp_f": 78.8,
    "is_day": 1,
    "condition": {
      "text": "Sunny",
      "icon": "//cdn.weatherapi.com/weather/64x64/day/113.png",
      "code": 1000
    },
    "wind_mph": 11.9,
    "wind_kph": 19.1,
    "wind_degree": 120,
    "wind_dir": "ESE",
    "pressure_mb": 1008,
    "pressure_in": 30.2,
    "precip_mm": 0,
    "precip_in": 0,
    "humidity": 39,
    "cloud": 0,
    "feelslike_c": 27.5,
    "feelslike_f": 81.5,
    "vis_km": 10,
    "vis_miles": 6,
    "uv": 6,
    "gust_mph": 8.9,
    "gust_kph": 14.4
  }
}
*/

export function Forecast() {
  const period = useSelector(x => x.period);
  const place = useSelector(x => x.place);
  useEffect(() => {
    console.log("hejka");
    setState({
      loading: true,
      forecast: {}
    });
  }, [period, place]);
  const [state, setState] = useState({
    loading: true,
    forecast: {}
  });
  const key = useWeatherAPI();
  const fetchData = (pos) => {
    fetch(`http://api.weatherapi.com/v1/${period === 'REALTIME' ? 'current.json?' :
          'forecast.json?days=3&'}key=${key}&lang=pl&q=${pos.coords.latitude},${
          pos.coords.longitude}`)
      .then(response => {
        if (!response.ok)
          throw Error("No connection");
        return response.json();
      })
      .then(data => {
        setState({loading: false, forecast: data});
      })
      .catch(() => {
        setState({loading: false, forecast: {}});
      });
  }

  if (state.loading) {
    if (Object.keys(place).length === 0)
      navigator.geolocation ?
        navigator.geolocation.getCurrentPosition(fetchData) :
        setState({loading: false, forecast: {}});
    else fetchData({coords: {
      latitude: place.lat,
      longitude: place.lon
    }});
    return (
      <div>loading...</div>
    );
  }
  else {
    if (Object.keys(state.forecast).length === 0) {
      return (
        <div>Loading data went wrong. Check if geolocation is supported.</div>
      );
    }
    else {
      console.log(state.forecast);
      switch (period) {
        case 'DAILY':
          return (
            <div>
              <h1>{state.forecast.location.name}, {state.forecast.location.country}</h1>
              <div>
                <h2>Dzisiaj</h2>
                <h3>
                  {state.forecast.forecast.forecastday[0].day.maxtemp_c}°C
                  <span>
                    {state.forecast.forecast.forecastday[0].day.mintemp_c}°C
                  </span>
                </h3>
                <img src={`http:${state.forecast.forecast.forecastday[0].day.condition.icon}`} alt="" />
                <p>{state.forecast.forecast.forecastday[0].day.condition.text}</p>
              </div>
              <div>
                <h2>Jutro</h2>
                <h3>
                  {state.forecast.forecast.forecastday[1].day.maxtemp_c}°C
                  <span>
                    {state.forecast.forecast.forecastday[1].day.mintemp_c}°C
                  </span>
                </h3>
                <img src={`http:${state.forecast.forecast.forecastday[1].day.condition.icon}`} alt="" />
                <p>{state.forecast.forecast.forecastday[1].day.condition.text}</p>
              </div>
              <div>
                <h2>Pojutrze</h2>
                <h3>
                  {state.forecast.forecast.forecastday[2].day.maxtemp_c}°C
                  <span>
                    {state.forecast.forecast.forecastday[2].day.mintemp_c}°C
                  </span>
                </h3>
                <img src={`http:${state.forecast.forecast.forecastday[2].day.condition.icon}`} alt="" />
                <p>{state.forecast.forecast.forecastday[2].day.condition.text}</p>
              </div>
            </div>
          );
        case 'HOURLY':
          return (
            <div>O tej porze nie wiem</div>
          );
        case 'REALTIME':
        default:
          return (
            <div>
              <h1>{state.forecast.location.name}, {state.forecast.location.country}</h1>
              <h2>{state.forecast.current.temp_c}°C</h2>
              <img src={`http:${state.forecast.current.condition.icon}`} alt="current weather" />
              <p>{state.forecast.current.condition.text}</p>
            </div>
          );
      }
    }
  }
}