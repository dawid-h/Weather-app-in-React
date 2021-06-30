import React, { useEffect, useState } from "react";
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

export function Forecast(props) {
  const [state, setState] = useState({
    loading: true,
    forecast: {}
  });
  const key = useWeatherAPI();
  const fetchData = (position) => {
    fetch(`http://api.weatherapi.com/v1/current.json?key=${key}&lang=pl` +
          `&q=${position.coords.latitude},${position.coords.longitude}`)
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

  useEffect(() => {setState({
    loading: true,
    forecast: {}
  })}, [props.localization]);

  if (state.loading) {
    if (Object.keys(props.localization).length === 0)
      navigator.geolocation ?
        navigator.geolocation.getCurrentPosition(fetchData) :
        setState({loading: false, forecast: {}});
    else fetchData({coords: {
      latitude: props.localization.lat,
      longitude: props.localization.lon
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